import utils from "../../../Utils/utils";
import getData from "../../getData";
import axios from "../../../../lib/axios";
import NafModel from "../../../Models/Naf";

const formatEtab = async (etab, params, db) => {
  const getAdresseComponent = ({
    numerovoieetablissement,
    indicerepetitionetablissement,
    typevoieetablissement,
    libellevoieetablissement,
    complementadresseetablissement,
    codepostaletablissement,
    codecommuneetablissement,
    libellecommuneetablissement
  }) => {
    return {
      numero_voie: numerovoieetablissement,
      indice_repetition: indicerepetitionetablissement,
      type_voie: typevoieetablissement,
      nom_voie: libellevoieetablissement,
      complement_adresse: complementadresseetablissement,
      code_postal: codepostaletablissement,
      code_insee_localite: codecommuneetablissement,
      localite: libellecommuneetablissement
    };
  };

  const fields = [
    "siret",
    {
      in: "etatadministratifetablissement",
      out: "actif",
      callback: etat => etat && etat === "A"
    },
    {
      in: "etatadministratifetablissement",
      out: "etat_etablissement"
    },
    {
      in: "etatadministratifetablissement",
      out: "etat_etablissement_libelle",
      callback: etat => {
        switch (etat) {
          case "A":
            return "Actif";
          case "F":
            return "Fermé";
          case "C":
            return "Cessé";
          default:
            return undefined;
        }
      }
    },
    {
      in: "datedebut",
      out: "date_fin"
    },
    {
      in: "datederniertraitementetablissement",
      out: "date_dernier_traitement_etablissement"
    },
    {
      in: "enseigne1etablissement",
      out: "enseigne"
    },
    {
      in: "activiteprincipaleetablissement",
      out: "naf"
    },
    {
      in: "activiteprincipaleetablissement_libelle",
      out: "libelle_naf"
    },
    {
      in: "etablissementsiege",
      out: "siege_social",
      callback: siege => siege === "true"
    },
    {
      in: "etablissementsiege",
      out: "categorie_etablissement",
      callback: siege_social =>
        utils.isEmpty(siege_social)
          ? undefined
          : siege_social === "true"
          ? "Siège social"
          : "Établissement secondaire"
    },
    {
      in: "datecreationetablissement",
      out: "date_creation"
    },
    {
      in: "trancheeffectifsetablissement",
      out: "tranche_effectif_insee"
    },
    {
      in: "anneeeffectifsetablissement",
      out: "annee_tranche_effectif_insee"
    },
    {
      in: "complementadresseetablissement",
      out: "adresse_components",
      callback: (complementAdresse, etab) => {
        const adresseComponent = getAdresseComponent(etab);
        return utils.isEmpty(adresseComponent) ? undefined : adresseComponent;
      }
    },
    {
      in: "complementadresseetablissement",
      out: "adresse",
      callback: (complementAdresse, etab) => {
        const adresseComponent = getAdresseComponent(etab);
        return utils.isEmpty(adresseComponent)
          ? undefined
          : utils.getCleanAddress(adresseComponent);
      }
    },
    {
      in: "caractereemployeuretablissement",
      out: "etablissement_employeur"
    },
    {
      in: "entreprise_denominationunitelegale",
      out: "nom_commercial"
    },
    {
      in: "entreprise_nomunitelegale",
      out: "nom"
    },
    {
      in: "entreprise_prenom1unitelegale",
      out: "prenom"
    }
  ];
  return typeof etab === "object" ? await getData(etab, fields) : {};
};

const formatEnt = async (ent, params, db) => {
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
        utils.isEmpty(naf) ? undefined : await getLibelleNaf(naf, db)
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
          ? uniteLegale.dateDebut
          : ent.dateDernierTraitementUniteLegale
    },
    {
      in: "periodesUniteLegale[0].dateDebut",
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

const getLibelleNaf = async (codeNaf, db) => {
  if (!db) {
    return undefined;
  }
  const nafModel = new NafModel(db);
  const naf = await nafModel.getByCode(codeNaf);

  return naf ? naf.libelle : null;
};

const getLegalCode = async (category, params) => {
  if (!params) {
    return undefined;
  }
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
