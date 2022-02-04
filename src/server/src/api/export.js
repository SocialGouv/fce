import withAuth from "../middlewares/auth";
import config from "config";

import { getElasticQueryParams, requestElastic } from "../utils/elastic";

import xlsx from "xlsx";
import {getTrancheLibelleFromCode} from "../utils/trancheEffectif";

const express = require("express");
const router = express.Router();

const fetchAllResults = async (params) => {
  let results, total;
  let resultsList = [];

  let from = 0;
  const size = 100;

  do {
    ({ results, total: { value: total } } = await requestElastic(params, { from, size }));
    resultsList = resultsList.concat(results);

    from += size;
  } while (from < total);

  return resultsList;
};

const xlsxConfig = config.xlsxExport;

const exportToXlsx = (data) => {
  const wb = { SheetNames: [], Sheets: {} };
  const ws = xlsx.utils.json_to_sheet(data);
  const wsName = "FceExport";
  xlsx.utils.book_append_sheet(wb, ws, wsName);

  const wbout = Buffer.from(
    xlsx.write(wb, { bookType: "xlsx", type: "buffer" })
  );

  return wbout;
};

const formatNameData = ({
                          denominationUniteLegale,
                          denominationUsuelleUniteLegale,
                          enseigneEtablissement,
                          prenomUniteLegale,
                          nomUniteLegale
                        }) => {
  const personneUniteLegale = [prenomUniteLegale, nomUniteLegale]
    .join(" ")
    .trim();
  const data = [
    denominationUniteLegale,
    denominationUsuelleUniteLegale,
    enseigneEtablissement,
    personneUniteLegale
  ].filter(value => !!value);

  const additionalNameData = data.slice(1);

  const additionalNameDataString =
    additionalNameData.length > 0 ? `(${additionalNameData.join(" - ")})` : "";

  return [data[0], additionalNameDataString].join(" ");
};

router.get("/downloadXlsx", withAuth, async (req, res) => {
  const params = getElasticQueryParams(req);

  try {
    const results = await fetchAllResults(params);

    const formattedResults = results.map(
      ({
        siret,
        etatAdministratifEtablissement,
        denominationUniteLegale,
        denominationUsuelleUniteLegale,
        enseigneEtablissement,
        prenomUniteLegale,
        nomUniteLegale,
        etablissementSiege,
        codePostalEtablissement,
        libelleCommuneEtablissement,
        trancheEffectifsEtablissement,
        codeActivitePrincipale,
        adresseEtablissement,
        complementAdresseEtablissement,
        libelleActivitePrincipale,
      }) => ({
        Siret: siret,
        Etat: xlsxConfig.establishmentState[etatAdministratifEtablissement],
        "Raison sociale": formatNameData({
          denominationUniteLegale,
          denominationUsuelleUniteLegale,
          enseigneEtablissement,
          prenomUniteLegale,
          nomUniteLegale
        }),
        "Categorie établissement": etablissementSiege
          ? "Siège Social"
          : "Établissement",
        Adresse: adresseEtablissement,
        "Complément d'adresse": complementAdresseEtablissement,
        "Code postal": codePostalEtablissement,
        Ville: libelleCommuneEtablissement,
        "Dernier effectif DSN connu": getTrancheLibelleFromCode(trancheEffectifsEtablissement),
        Activité: `${codeActivitePrincipale} - ${libelleActivitePrincipale}`,
      })
    );

    const outputBuffer = exportToXlsx(formattedResults);

    res.set({
      "Content-type": "application/octet-stream",
    });
    res.send(outputBuffer);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

export default router;
