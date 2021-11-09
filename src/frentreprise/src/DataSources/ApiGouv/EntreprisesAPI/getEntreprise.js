import utils from "../../../Utils/utils";
import getData from "../../getData";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils
    .requestAPI(Axios, `entreprises/${SIREN}`, params)
    .then((data) => {
      const fields = [
        "categorie_entreprise",
        "siren",
        {
          in: "raison_sociale",
          out: "raison_sociale",
          callback: (raisonSociale) =>
            raisonSociale &&
            raisonSociale.replace("*/", " ").replace("/", "").trim(),
        },
        "nom_commercial",
        "nom",
        "prenom",
        "siret_siege_social",
        "capital_social",
        "numero_tva_intracommunautaire",
        { in: "forme_juridique", out: "categorie_juridique" },
        { in: "forme_juridique_code", out: "categorie_juridique_code" },
        { in: "naf_entreprise", out: "naf" },
        { in: "libelle_naf_entreprise", out: "libelle_naf" },
        {
          in: "tranche_effectif_salarie_entreprise.date_reference",
          out: "annee_tranche_effectif",
        },
        {
          in: "tranche_effectif_salarie_entreprise.intitule",
          out: "tranche_effectif",
        },
        {
          in: "etat_administratif.value",
          out: "etat_entreprise"
        },
        {
          in: "tranche_effectif_salarie_entreprise",
          out: "entreprise_employeur",
          callback: (trancheEffectif) =>
            trancheEffectif && +trancheEffectif.a > 0,
        },
        {
          in: "mandataires_sociaux",
          out: "mandataires_sociaux",
          callback: (mandataires) => {
            if (!Array.isArray(mandataires)) {
              return null;
            }

            return mandataires.map((mandataire) => {
              return {
                nom: mandataire.nom,
                prenom: mandataire.prenom,
                fonction: mandataire.fonction,
                raison_sociale: mandataire.raison_sociale,
              };
            });
          },
        },
        {
          in: "date_creation",
          out: "date_de_creation",
          callback: (date) => utils.convertDate(date),
        },
        {
          in: "date_radiation",
          out: "date_de_radiation",
          callback: (date) => utils.convertDate(date),
        },
      ];

      return data && data.entreprise ? getData(data.entreprise, fields) : {};
    });
};

export default getEntreprise;
