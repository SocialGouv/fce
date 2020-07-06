import utils from "../../../Utils/utils";
import getData from "../../getData";
import sourcesFormat from "./enterpriseSources";

export default async (enterprise) => {
  let enterpriseFormatted = await getData(enterprise, [
    "siren",
    {
      in: "denominationunitelegale",
      out: "raison_sociale",
    },
    { in: "sigleunitelegale", out: "sigle" },
    { in: "nomunitelegale", out: "nom" },
    {
      in: "prenom1unitelegale",
      out: "prenom",
      callback: (p1, ent) => {
        const prenoms = [
          ent.prenom1unitelegale,
          ent.prenom2unitelegale,
          ent.prenom3unitelegale,
          ent.prenom4unitelegale,
        ]
          .filter((a) => a)
          .join(" ");

        return utils.isEmpty(prenoms) ? undefined : prenoms;
      },
    },
    {
      in: "nomusageunitelegale",
      out: "nom_commercial",
    },
    {
      in: "categorieentreprise",
      out: "categorie_entreprise",
    },
    {
      in: "siren",
      out: "siret_siege_social",
      callback: (siren, { nicsiegeunitelegale }) =>
        utils.isEmpty(siren) || utils.isEmpty(nicsiegeunitelegale)
          ? undefined
          : `${siren}${nicsiegeunitelegale}`,
    },
    {
      in: "categorie_juridique.libelle",
      out: "categorie_juridique",
    },
    {
      in: "categorie_juridique.code",
      out: "categorie_juridique_code",
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
      in: "datecreationunitelegale",
      out: "date_de_creation",
    },
    {
      in: "etatadministratifunitelegale",
      out: "etat_entreprise",
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
          : datederniertraitementunitelegale,
    },
    {
      in: "datedebut",
      out: "date_de_radiation",
    },
    {
      in: "caractereemployeurunitelegale",
      out: "entreprise_employeur",
    },
    {
      in: "anneeeffectifsunitelegale",
      out: "annee_tranche_effectif",
    },
    {
      in: "trancheeffectifsunitelegale",
      out: "tranche_effectif",
    },
  ]);

  Object.entries(sourcesFormat).forEach(([field, method]) => {
    const rawValue = enterprise[field];

    if (!rawValue) {
      return false;
    }

    if (Array.isArray(rawValue) && !rawValue.length) {
      return false;
    }

    enterpriseFormatted = {
      ...enterpriseFormatted,
      ...method(enterprise),
    };
  });

  return enterpriseFormatted;
};
