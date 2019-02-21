import utils from "../../../Utils/utils";
import getData from "../../getData";
import axios from "../../../../lib/axios";

const formatEtab = async (etab, params) => {
  const getAdresseComponent = adresse => {
    return (
      adresse && {
        numero_voie: adresse.numeroVoieEtablissement,
        indice_repetition: adresse.indiceRepetitionEtablissement,
        type_voie: adresse.typeVoieEtablissement,
        nom_voie: adresse.libelleVoieEtablissement,
        complement_adresse: adresse.complementAdresseEtablissement,
        code_postal: adresse.codePostalEtablissement,
        code_insee_localite: adresse.codeCommuneEtablissement,
        localite: adresse.libelleCommuneEtablissement
      }
    );
  };

  const fields = [
    "siret",
    {
      in: "periodesEtablissement[0].etatAdministratifEtablissement",
      out: "actif",
      callback: etat => etat && etat === "A"
    },
    {
      in: "periodesEtablissement[0].etatAdministratifEtablissement",
      out: "etat_etablissement"
    },
    {
      in: "periodesEtablissement[0].dateDebut",
      out: "date_fin"
    },
    {
      in: "dateDernierTraitementEtablissement",
      out: "date_dernier_traitement_etablissement"
    },
    "enseigne",
    {
      in: "uniteLegale.activitePrincipaleUniteLegale",
      out: "naf"
    },
    {
      in: "uniteLegale.activitePrincipaleUniteLegale",
      out: "libelle_naf",
      callback: async naf =>
        utils.isEmpty(naf) ? undefined : await getLibelleNaf(naf, params)
    },
    {
      in: "etablissementSiege",
      out: "siege_social"
    },
    {
      in: "etablissementSiege",
      out: "categorie_etablissement",
      callback: siege_social =>
        utils.isEmpty(siege_social)
          ? undefined
          : siege_social
          ? "Siège social"
          : "Établissement secondaire"
    },
    {
      in: "dateCreationEtablissement",
      out: "date_creation"
    },
    {
      in: "trancheEffectifsEtablissement",
      out: "tranche_effectif_insee"
    },
    {
      in: "anneeEffectifsEtablissement",
      out: "annee_tranche_effectif_insee"
    },
    {
      in: "adresseEtablissement",
      out: "adresse_components",
      callback: adresse => {
        const adresseComponent = getAdresseComponent(adresse);
        return utils.isEmpty(adresseComponent) ? undefined : adresseComponent;
      }
    },
    {
      in: "adresseEtablissement",
      out: "adresse",
      callback: adresse => {
        const adresseComponent = getAdresseComponent(adresse);
        return utils.isEmpty(adresseComponent)
          ? undefined
          : utils.getCleanAddress(adresseComponent);
      }
    },
    {
      in: "periodesEtablissement[0].caractereEmployeurEtablissement",
      out: "etablissement_employeur"
    }
  ];
  return typeof etab === "object" ? await getData(etab, fields) : {};
};

const formatEnt = async (ent, params) => {
  const fields = [
    "siren",
    {
      in: "periodesUniteLegale[0].denominationUniteLegale",
      out: "raison_sociale"
    },
    { in: "sigleUniteLegale", out: "sigle" },
    { in: "periodesUniteLegale[0]nomUniteLegale", out: "nom" },
    {
      in: "prenom1UniteLegale",
      out: "prenom",
      callback: (p1, ent) =>
        utils.isEmpty(
          [
            ent.prenom1UniteLegale,
            ent.prenom2UniteLegale,
            ent.prenom3UniteLegale,
            ent.prenom4UniteLegale
          ]
            .filter(a => a)
            .join(" ")
        )
          ? undefined
          : [
              ent.prenom1UniteLegale,
              ent.prenom2UniteLegale,
              ent.prenom3UniteLegale,
              ent.prenom4UniteLegale
            ]
              .filter(a => a)
              .join(" ")
    },
    {
      in: "periodesUniteLegale[0].nomUsageUniteLegale",
      out: "nom_commercial"
    },
    {
      in: "categorieEntreprise",
      out: "categorie_entreprise"
    },
    {
      in: "periodesUniteLegale[0]",
      out: "siret_siege_social",
      defaultValue: {},
      callback: (uniteLegale, ent) =>
        utils.isEmpty(ent.siren) ||
        utils.isEmpty(uniteLegale.nicSiegeUniteLegale)
          ? undefined
          : `${ent.siren}${uniteLegale.nicSiegeUniteLegale}`
    },
    {
      in: "periodesUniteLegale[0].categorieJuridiqueUniteLegale",
      out: "categorie_juridique",
      callback: async category =>
        utils.isEmpty(category)
          ? undefined
          : await getLegalCode(category, params)
    },
    {
      in: "periodesUniteLegale[0].categorieJuridiqueUniteLegale",
      out: "categorie_juridique_code"
    },
    {
      in: "periodesUniteLegale[0].activitePrincipaleUniteLegale",
      out: "naf"
    },
    {
      in: "periodesUniteLegale[0].activitePrincipaleUniteLegale",
      out: "libelle_naf",
      callback: async naf =>
        utils.isEmpty(naf) ? undefined : await getLibelleNaf(naf, params)
    },
    {
      in: "dateCreationUniteLegale",
      out: "date_de_creation"
    },
    {
      in: "periodesUniteLegale[0].etatAdministratifUniteLegale",
      out: "etat_entreprise"
    },
    {
      in: "periodesUniteLegale[0]",
      out: "date_mise_a_jour",
      defaultValue: {},
      callback: (uniteLegale, ent) =>
        uniteLegale.etatAdministratifUniteLegale === "C"
          ? uniteLegale.dateFin
          : ent.dateDernierTraitementUniteLegale
    },
    {
      in: "periodesUniteLegale[0].dateFin",
      out: "date_de_radiation"
    },
    {
      in: "periodesUniteLegale[0].caractereEmployeurUniteLegale",
      out: "entreprise_employeur"
    },
    {
      in: "anneeEffectifsUniteLegale",
      out: "annee_tranche_effectif"
    },
    {
      in: "trancheEffectifsUniteLegale",
      out: "tranche_effectif"
    }
  ];

  return typeof ent === "object" ? await getData(ent, fields) : {};
};

const getLibelleNaf = async (codeNaf, params) => {
  const Axios = axios.create({
    baseURL:
      "https://api.insee.fr/metadonnees/nomenclatures/v1/codes/nafr2/sousClasse/",
    timeout: 5000
  });
  params.timeout = 5000;

  return await utils
    .requestAPI(Axios, `${codeNaf}`, params)
    .then(data => (utils.isEmpty(data.intitule) ? undefined : data.intitule));
};

const getLegalCode = async (category, params) => {
  const Axios = axios.create({
    baseURL: "https://api.insee.fr/metadonnees/nomenclatures/v1/codes/cj/n3/",
    timeout: 5000
  });
  params.timeout = 5000;

  return await utils
    .requestAPI(Axios, `${category}`, params)
    .then(data => (utils.isEmpty(data.intitule) ? undefined : data.intitule));
};

export default {
  formatEtab,
  formatEnt
};
