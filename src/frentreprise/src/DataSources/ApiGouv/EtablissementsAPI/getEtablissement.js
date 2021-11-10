import utils from "../../../Utils/utils";
import getData from "../../getData";

const getEtablissement = async (SIRET, Axios, params) => {
  return await utils
    .requestAPI(Axios, `etablissements/${SIRET}`, params)
    .then((data) => {
      const fields = [
        "siret",
        "siege_social",
        {
          in: "siege_social",
          out: "categorie_etablissement",
          callback: (siege_social) =>
            utils.isEmpty(siege_social)
              ? undefined
              : siege_social
                ? "Siège social"
                : "Établissement",
        },
        "enseigne",
        "naf",
        "libelle_naf",
        {
          in: "date_creation_etablissement",
          out: "date_creation",
          callback: (date) => utils.convertDate(date),
        },
        {
          in: "region_implantation.code",
          out: "code_region",
          callback: (code) => code && +code,
        },
        {
          in: "region_implantation.value",
          out: "region",
        },
        {
          in: "tranche_effectif_salarie_etablissement",
          out: "etablissement_employeur",
          callback: (trancheEffectif) =>
            trancheEffectif && +trancheEffectif.a > 0,
        },
        {
          in: "tranche_effectif_salarie_etablissement.intitule",
          out: "tranche_effectif_insee",
        },
        {
          in: "tranche_effectif_salarie_etablissement.date_reference",
          out: "annee_tranche_effectif_insee",
          callback: (annee) => annee && +annee,
        },
        {
          in: "adresse",
          out: "adresse",
          callback: (adresse) =>
            typeof adresse === "object"
              ? utils.getCleanAddress(adresse)
              : undefined,
        },
        {
          in: "adresse",
          out: "adresse_composant",
        },
        {
          in: "etat_administratif.value",
          out: "etat_etablissement"
        },
        "diffusable_commercialement",
        {
          in: "adresse",
          out: "departement",
          callback: (adresse) =>
            typeof adresse === "object"
              ? typeof adresse.code_insee_localite === "string" &&
              adresse.code_insee_localite.length > 1 &&
              adresse.code_insee_localite.substr(0, 2)
              : undefined,
        },
      ];
      getData(data.etablissement, fields).then(console.log);
      return data && data.etablissement
        ? getData(data.etablissement, fields)
        : {};
    });
};

export default getEtablissement;
