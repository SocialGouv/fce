import utils from "../utils";

const getLegacy = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `etablissements_legacy/${SIRET}`,
    params,
    (out, data) => {
      if (data && data.etablissement) {
        const legacy_et = data.etablissement;

        [
          "siret",
          "siege_social",
          "enseigne",
          "nom_commercial",
          "nom",
          "prenom",
          "siret_siege_social"
        ].forEach(key => {
          if (typeof legacy_et[key] === "boolean") out[key] = legacy_et[key];
          else out[key] = legacy_et[key] || undefined;
        });

        if (
          !legacy_et.etat_administratif_etablissement ||
          typeof legacy_et.etat_administratif_etablissement !== "object"
        ) {
          legacy_et.etat_administratif_etablissement = {};
        }

        out.etat_etablissement = {
          label: legacy_et.etat_administratif_etablissement.value || "N/A",
          date: utils.convertDate(
            legacy_et.etat_administratif_etablissement.date_mise_a_jour
          )
        };
      }
    }
  );
};

export default getLegacy;
