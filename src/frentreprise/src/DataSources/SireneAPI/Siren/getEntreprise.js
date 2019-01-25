import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";
import getData from "../../getData";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils.requestAPI(Axios, `siren/${SIREN}`, params).then(data => {
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
        out: "forme_juridique",
        callback: category =>
          utils.isEmpty(category) ? undefined : helpers.getLegalCode(category)
      },
      {
        in: "periodesUniteLegale[0].categorieJuridiqueUniteLegale",
        out: "forme_juridique_code"
      },
      {
        in: "periodesUniteLegale[0].activitePrincipaleUniteLegale",
        out: "naf"
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
      }
    ];

    return data && data.uniteLegale ? getData(data.uniteLegale, fields) : {};

    let out = {};

    const ent = data.uniteLegale;

    if (ent) {
      const uniteLegale =
        Array.isArray(ent.periodesUniteLegale) && ent.periodesUniteLegale.length
          ? ent.periodesUniteLegale[0]
          : {};

      out = {
        // siren: ent.siren,
        // raison_sociale: uniteLegale.denominationUniteLegale,
        // sigle: ent.sigleUniteLegale,
        // nom: uniteLegale.nomUniteLegale,
        // prenom: utils.isEmpty(
        //   [
        //     ent.prenom1UniteLegale,
        //     ent.prenom2UniteLegale,
        //     ent.prenom3UniteLegale,
        //     ent.prenom4UniteLegale
        //   ]
        //     .filter(a => a)
        //     .join(" ")
        // )
        //   ? undefined
        //   : [
        //       ent.prenom1UniteLegale,
        //       ent.prenom2UniteLegale,
        //       ent.prenom3UniteLegale,
        //       ent.prenom4UniteLegale
        //     ]
        //       .filter(a => a)
        //       .join(" "),
        // nom_commercial: uniteLegale.nomUsageUniteLegale,
        // categorie_entreprise: ent.categorieEntreprise,
        // siret_siege_social:
        //   utils.isEmpty(ent.siren) ||
        //   utils.isEmpty(uniteLegale.nicSiegeUniteLegale)
        //     ? undefined
        //     : `${ent.siren}${uniteLegale.nicSiegeUniteLegale}`,
        // forme_juridique: utils.isEmpty(
        //   uniteLegale.categorieJuridiqueUniteLegale
        // )
        //   ? undefined
        //   : helpers.getLegalCode(uniteLegale.categorieJuridiqueUniteLegale),
        // forme_juridique_code: uniteLegale.categorieJuridiqueUniteLegale,
        // naf: uniteLegale.activitePrincipaleUniteLegale,
        // date_de_creation: ent.dateCreationUniteLegale,
        // etat_entreprise: uniteLegale.etatAdministratifUniteLegale,
        // date_mise_a_jour:
        //   uniteLegale.etatAdministratifUniteLegale === "C"
        //     ? uniteLegale.dateFin
        //     : ent.dateDernierTraitementUniteLegale,
        // date_de_radiation: uniteLegale.dateFin,
        // entreprise_employeur: uniteLegale.caractereEmployeurUniteLegale,
        // annee_tranche_effectif: ent.anneeEffectifsUniteLegale,
        // _raw: ent
      };
    }

    return out;
  });
};

export default getEntreprise;
