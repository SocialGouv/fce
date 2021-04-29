import utils from "../../../Utils/utils";
import getData from "../../getData";
import sourcesFormat from "./establishmentSources";

export default async (establishment) => {
  const getAdresseComponent = ({
    numerovoieetablissement,
    indicerepetitionetablissement,
    typevoieetablissement,
    libellevoieetablissement,
    complementadresseetablissement,
    codepostaletablissement,
    codecommuneetablissement,
    libellecommuneetablissement,
  }) => {
    return {
      numero_voie: numerovoieetablissement,
      indice_repetition: indicerepetitionetablissement,
      type_voie: typevoieetablissement,
      nom_voie: libellevoieetablissement,
      complement_adresse: complementadresseetablissement,
      code_postal: codepostaletablissement,
      code_insee_localite: codecommuneetablissement,
      localite: libellecommuneetablissement,
    };
  };

  let establismentFormatted = await getData(establishment, [
    "siret",
    {
      in: "etatadministratifetablissement",
      out: "actif",
      callback: (etat) => etat && etat === "A",
    },
    {
      in: "etatadministratifetablissement",
      out: "etat_etablissement",
    },
    {
      in: "etatadministratifetablissement",
      out: "etat_etablissement_libelle",
      callback: (etat) => {
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
      },
    },
    {
      in: "datedebut",
      out: "date_fin",
    },
    {
      in: "datederniertraitementetablissement",
      out: "date_dernier_traitement_etablissement",
    },
    {
      in: "enseigne1etablissement",
      out: "enseigne",
    },
    {
      in: "naf.code",
      out: "naf",
    },
    {
      in: "naf.libelle",
      out: "libelle_naf",
    },
    {
      in: "etablissementsiege",
      out: "siege_social",
      callback: (siege) => siege === "true",
    },
    {
      in: "etablissementsiege",
      out: "categorie_etablissement",
      callback: (siege_social) =>
        utils.isEmpty(siege_social)
          ? undefined
          : siege_social === "true"
          ? "Siège social"
          : "Établissement",
    },
    {
      in: "datecreationetablissement",
      out: "date_creation",
    },
    {
      in: "trancheeffectifsetablissement",
      out: "tranche_effectif_insee",
    },
    {
      in: "anneeeffectifsetablissement",
      out: "annee_tranche_effectif_insee",
    },
    {
      in: "complementadresseetablissement",
      out: "adresse_composant",
      callback: (complementAdresse, etab) => {
        const adresseComponent = getAdresseComponent(etab);
        return utils.isEmpty(adresseComponent) ? undefined : adresseComponent;
      },
    },
    {
      in: "complementadresseetablissement",
      out: "adresse",
      callback: (complementAdresse, etab) => {
        const adresseComponent = getAdresseComponent(etab);
        return utils.isEmpty(adresseComponent)
          ? undefined
          : utils.getCleanAddress(adresseComponent);
      },
    },
    {
      in: "caractereemployeuretablissement",
      out: "etablissement_employeur",
    },
    {
      in: "entreprise.denominationunitelegale",
      out: "nom_commercial",
    },
    {
      in: "entreprise.nomunitelegale",
      out: "nom",
    },
    {
      in: "entreprise.prenom1unitelegale",
      out: "prenom",
    },
  ]);

  Object.entries(sourcesFormat).forEach(([field, method]) => {
    const rawValue = establishment[field];

    if (!rawValue) {
      return false;
    }

    if (Array.isArray(rawValue) && !rawValue.length) {
      return false;
    }

    establismentFormatted = {
      ...establismentFormatted,
      ...method(establishment),
    };
  });

  return establismentFormatted;
};
