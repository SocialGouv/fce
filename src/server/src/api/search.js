import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";
import withAuth from "../middlewares/auth";
import NotFoundException from "../Exceptions/NotFoundException";
// eslint-disable-next-line node/no-missing-import
import frentreprise, { isSIRET, isSIREN } from "frentreprise";
import Establishment from "../models/Establishment";
import { limitRate } from "../middlewares/limit-rate";
import { formatEntrepriseResponse, formatEtablissementResponse, searchSiren, searchSiret } from "../utils/api-gouv";

const express = require("express");
const xlsx = require("xlsx");
const router = express.Router();
const config = require("config");
const AppSearchClient = require("@elastic/app-search-node");

const logError = (data, err) => {
  console.error({ logError: err });
  data.error = true;
  try {
    data.message = err.toString();
  } catch (Exception) {
    console.error({ logErrorCatch: Exception });
    data.message = "Unknown";
  }
};

const getAppSearchClient = () => {
  const apiKey = config.elasticIndexer.appsearch_apiKey;
  const baseUrlFn = () => config.elasticIndexer.appsearch_address;
  return new AppSearchClient(undefined, apiKey, baseUrlFn);
};

const isSuccessEnterprise = (data) => {
  return !!data.results?.[0]._success;
};

const isSuccessEstablishment = (data, siret) => {
  const establishments = data?.results?.[0]?.etablissements;
  if (!Array.isArray(establishments)) {
    return false;
  }

  const establishment = establishments.find(
    (establishment) => establishment?.siret === siret
  );

  return !!establishment?._success;
};

router.get("/entity", withAuth, limitRate({
  count: 2 * config.get("api.requestsPer10Seconds"),
  period: 10000
}), function (req, res) {
  const query = (req.query["q"] || "").trim();
  const dataSource = (req.query["dataSource"] || "").trim();

  const data = {
    query: {
      format: "json",
      terms: {
        q: query,
      },
      isSIRET: isSIRET(query),
      isSIREN: isSIREN(query),
      dataSource,
    },
  };

  const freCall = frentreprise
    .getEntreprise(query, dataSource)
    .then((entreprise) => {
      data.results = [entreprise.export()];
      const success = isSIREN(query)
        ? isSuccessEnterprise(data)
        : isSuccessEstablishment(data, query);

      if (!success) {
        data.code = 404;
        throw new NotFoundException(`${query} in ${dataSource}`);
      }
    }, logError.bind(this, data));

  freCall
    .then(() => {
      data.size = (data.results && data.results.length) || 0;
      sendResult(data, res);
    })
    .catch((e) => {
      logError(data, e);
      sendResult(data, res);
    });
});

router.get("/search", async (req, res) => {
  const siret = (req.query["siret"] || "").trim();
  const siren = siret
    ? siret.slice(0, 9)
    : (req.query["siren"] || "").trim();

  if (!siret && !siren) {
    return res.status(400).json({
      message: "Paramètre manquant : numéro siret ou siren"
    });
  }

  const requests = [
    searchSiren(siren),
    ...(siret ? [searchSiret(siret)] : []),
  ];

  try {
    const [entrepriseResponse, etablissementResponse] = await Promise.all(requests);

    const result = {
      ...formatEntrepriseResponse(entrepriseResponse.entreprise),
      ...formatEtablissementResponse(etablissementResponse?.etablissement ?? entrepriseResponse.etablissement_siege),
    };

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post("/downloadXlsx", withAuth, async function (req, res) {
  const payload = req.body.payload;

  if (!payload || !payload.totalItems) {
    return res
      .status(404)
      .send("Export impossible, cette recherche n'a donné aucun résultat.");
  }

  const searchTerm = payload.searchTerm;
  const totalItems = payload.totalItems;

  const client = getAppSearchClient();
  const establishmentModel = new Establishment();
  const engineName = config.get("elasticIndexer.appsearch_engineName");
  const pageLimit = config.get("elasticIndexer.appsearch_pageLimit");
  const pages = Math.ceil(totalItems / pageLimit);
  const xlsxConfig = config.xlsxExport;

  let establishments = [];

  for (let page = 1; page <= pages; page++) {
    try {
      const response = await client.search(
        engineName,
        searchTerm === "" ? searchTerm : `"${searchTerm}"`,
        {
          filters: payload.filters,
          page: { current: page, size: pageLimit },
        }
      );

      establishments = [...establishments, ...response.results];

      if (!establishments.length) {
        return res
          .status(404)
          .send("Export impossible, cette recherche n'a donné aucun résultat.");
      }

      try {
        const dataJson = await Promise.all(
          establishments.map(async (establishment) => {
            const cleanedData = Object.entries(establishment).reduce(
              (acc, [key, value]) => ({ ...acc, [key]: value.raw }),
              {}
            );

            const addressInformations = await establishmentModel.getAddress(
              cleanedData.siret
            );

            return {
              Siret: cleanedData.siret,
              Etat:
                xlsxConfig.establishmentState[
                cleanedData.etatadministratifetablissement
                ],
              "Raison sociale": cleanedData.establishment_name
                ? cleanedData.establishment_name
                : cleanedData.enterprise_name,
              "Categorie établissement": cleanedData.etablissementsiege
                ? "Siège social"
                : "Établissement",
              Adresse: addressInformations && addressInformations.adresse,
              "Complément d'adresse":
                addressInformations && addressInformations.complement_adresse,
              "Code postal": cleanedData.codepostaletablissement,
              Ville: cleanedData.libellecommuneetablissement,
              "Dernier effectif DSN connu":
                xlsxConfig.inseeSizeRanges[
                cleanedData.lastdsntrancheeffectifsetablissement
                ],
              Activité:
                cleanedData.activiteprincipaleetablissement +
                " - " +
                cleanedData.activiteprincipaleetablissement_libelle,
            };
          })
        );
        if (pages === page) {
          const wb = { SheetNames: [], Sheets: {} };
          const ws = xlsx.utils.json_to_sheet(dataJson);
          const wsName = "FceExport";
          xlsx.utils.book_append_sheet(wb, ws, wsName);

          const wbout = Buffer.from(
            xlsx.write(wb, { bookType: "xlsx", type: "buffer" })
          );
          res.set({
            "Content-type": "application/octet-stream",
          });

          res.send(wbout);
        }
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .send("Une erreur est survenue, l'export a échoué.");
      }
    } catch (error) {
      console.error(error);
      return res
        .status(400)
        .send("Une erreur est survenue, l'export a échoué.");
    }
  }
});

const sendResult = (data, response) => {
  if (data?.error) {
    return response.status(data.code || 400).send(data);
  }

  return response.send(data);
};

router.get("/communes", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  if (query.length < 2) {
    return res.send({ success: false, message: "query too short" });
  }

  const communes = new Communes();

  communes.search(query).then((communes) => {
    const success = Array.isArray(communes);
    return res.send({ success, results: communes });
  });
});

router.get("/naf", withAuth, function (req, res) {
  const naf = new Naf();

  naf.findAll().then((nafs) => {
    const success = Array.isArray(nafs);
    if (success) {
      return res.send({ success, results: nafs });
    }

    return res.send({
      success,
      results: [],
      message: "Une erreur est survenue lors de la recherche d'un code NAF",
    });
  });
});

router.get("/departements", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  const departements = new Departements();

  departements.search(query).then((departements) => {
    const success = Array.isArray(departements);
    return res.send({ success, results: departements });
  });
});

export default router;
