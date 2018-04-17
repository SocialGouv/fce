import utils from "../utils";

const getLegacy = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `entreprises_legacy/${SIREN}`,
    params,
    (out, data) => {
      if (data && data.entreprise) {
        const legacy_ent = data.entreprise;
        [
          "siren",
          "raison_sociale",
          "nombre_etablissements_actifs",
          "nom_commercial",
          "nom",
          "prenom",
          "siret_siege_social"
        ].forEach(key => {
          if (typeof legacy_ent[key] === "boolean") out[key] = legacy_ent[key];
          else out[key] = legacy_ent[key] || undefined;
        });

        out.categorie_juridique = legacy_ent.forme_juridique;
        out.date_de_creation = utils.convertDate(legacy_ent.date_creation);
        out.date_de_radiation = utils.convertDate(legacy_ent.date_radiation);

        if (
          !legacy_ent.etat_administratif ||
          typeof legacy_ent.etat_administratif !== "object"
        ) {
          legacy_ent.etat_administratif = {};
        }

        out.etat_entreprise = {
          label: legacy_ent.etat_administratif.value || "N/A",
          date: utils.convertDate(
            legacy_ent.etat_administratif.date_mise_a_jour
          )
        };
      }
    }
  );
};

export default getLegacy;
