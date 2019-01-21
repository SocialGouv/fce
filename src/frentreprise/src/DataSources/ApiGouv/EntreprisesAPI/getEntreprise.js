import utils from "../../../Utils/utils";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils
    .requestAPI(Axios, `entreprises/${SIREN}`, params)
    .then(data => {
      const out = {};
      if (data && data.entreprise) {
        const ent = data.entreprise;

        [
          "categorie_entreprise",
          "siren",
          "raison_sociale",
          "nom_commercial",
          "nom",
          "prenom",
          "siret_siege_social",
          "capital_social",
          "forme_juridique",
          "forme_juridique_code",
          { in: "naf_entreprise", out: "naf" },
          { in: "libelle_naf_entreprise", out: "libelle_naf" }
        ].forEach(key => {
          const inKey = typeof key === "object" ? key.in : key;
          const outKey = typeof key === "object" ? key.out : key;
          const value = ent[inKey];

          if (typeof value === "boolean") out[outKey] = value;
          else out[outKey] = value || undefined;
        });

        if (
          ent.tranche_effectif_salarie_entreprise &&
          typeof ent.tranche_effectif_salarie_entreprise === "object"
        ) {
          out.annee_tranche_effectif =
            +ent.tranche_effectif_salarie_entreprise.date_reference ||
            undefined;
          out.tranche_effectif =
            ent.tranche_effectif_salarie_entreprise.intitule || undefined;
        }

        if (Array.isArray(ent.mandataires_sociaux)) {
          out.mandataires_sociaux = [];
          ent.mandataires_sociaux.forEach(manso => {
            out.mandataires_sociaux.push({
              nom: manso.nom,
              prenom: manso.prenom,
              fonction: manso.fonction,
              raison_sociale: manso.raison_sociale
            });
          });
        }

        if (ent.date_creation) {
          out.date_de_creation = utils.convertDate(ent.date_creation);
        }
      }

      return out;
    });
};

export default getEntreprise;
