import utils from "../../../Utils/utils";
import getData from "../../getData";

const formatEtab = async etab => {
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

const formatEnt = async ent => {
  const fields = [
    "siren",
    {
      in: "denominationunitelegale",
      out: "raison_sociale"
    },
    { in: "sigleunitelegale", out: "sigle" },
    { in: "nomunitelegale", out: "nom" },
    {
      in: "prenom1unitelegale",
      out: "prenom",
      callback: (p1, ent) =>
        utils.isEmpty(
          [
            ent.prenom1unitelegale,
            ent.prenom2unitelegale,
            ent.prenom3unitelegale,
            ent.prenom4unitelegale
          ]
            .filter(a => a)
            .join(" ")
        )
          ? undefined
          : [
              ent.prenom1unitelegale,
              ent.prenom2unitelegale,
              ent.prenom3unitelegale,
              ent.prenom4unitelegale
            ]
              .filter(a => a)
              .join(" ")
    },
    {
      in: "nomusageunitelegale",
      out: "nom_commercial"
    },
    {
      in: "categorieentreprise",
      out: "categorie_entreprise"
    },
    {
      in: "siren",
      out: "siret_siege_social",
      callback: (siren, { nicsiegeunitelegale }) =>
        utils.isEmpty(siren) || utils.isEmpty(nicsiegeunitelegale)
          ? undefined
          : `${siren}${nicsiegeunitelegale}`
    },
    {
      in: "categoriejuridiqueunitelegale_libelle",
      out: "categorie_juridique"
    },
    {
      in: "categoriejuridiqueunitelegale",
      out: "categorie_juridique_code"
    },
    {
      in: "activiteprincipaleunitelegale",
      out: "naf"
    },
    {
      in: "activiteprincipaleunitelegale_libelle",
      out: "libelle_naf"
    },
    {
      in: "datecreationunitelegale",
      out: "date_de_creation"
    },
    {
      in: "etatadministratifunitelegale",
      out: "etat_entreprise"
    },
    {
      in: "etatadministratifunitelegale",
      out: "date_mise_a_jour",
      callback: (
        etatadministratifunitelegale,
        { datedebut, datederniertraitementunitelegale }
      ) =>
        etatadministratifunitelegale === "C"
          ? datedebut
          : datederniertraitementunitelegale
    },
    {
      in: "datedebut",
      out: "date_de_radiation"
    },
    {
      in: "caractereemployeurunitelegale",
      out: "entreprise_employeur"
    },
    {
      in: "anneeeffectifsunitelegale",
      out: "annee_tranche_effectif"
    },
    {
      in: "trancheeffectifsunitelegale",
      out: "tranche_effectif"
    }
  ];

  return typeof ent === "object" ? await getData(ent, fields) : {};
};

export default {
  formatEtab,
  formatEnt
};
