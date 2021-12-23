import withAuth from "../middlewares/auth";
import config from "config";

import { getElasticQueryParams, requestElastic } from "../utils/elastic";

import xlsx from "xlsx";

const express = require("express");
const router = express.Router();

const fetchAllResults = async (params) => {
  let results, total;
  let resultsList = [];

  let from = 0;
  const size = 100;

  do {
    ({ results, total } = await requestElastic(params, { from, size }));

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

router.get("/downloadXlsx", withAuth, async (req, res) => {
  const params = getElasticQueryParams(req);

  try {
    const results = await fetchAllResults(params);

    const formattedResults = results.map(
      ({
        siret,
        etatAdministratifEtablissement,
        denominationUniteLegale,
        enseigneEtablissement,
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
        "Raison sociale": enseigneEtablissement || denominationUniteLegale,
        "Categorie établissement": etablissementSiege
          ? "Siège Social"
          : "Établissement",
        Adresse: adresseEtablissement,
        "Complément d'adresse": complementAdresseEtablissement,
        "Code postal": codePostalEtablissement,
        Ville: libelleCommuneEtablissement,
        "Dernier effectif DSN connu": trancheEffectifsEtablissement,
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
