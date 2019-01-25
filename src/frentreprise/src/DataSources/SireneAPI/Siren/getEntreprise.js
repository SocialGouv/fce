import utils from "../../../Utils/utils";
import helpers from "../Helpers/helpers";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `siren/${SIREN}`,
    params
  ).then((data) => {
    let out = {};

    const ent = data.uniteLegale;

    if (ent) {
      const uniteLegale = Array.isArray(ent.periodesUniteLegale) && ent.periodesUniteLegale.length ? ent.periodesUniteLegale[0] : {};

      out = {
        siren: ent.siren,
        raison_sociale: uniteLegale.denominationUniteLegale,
        sigle: ent.sigleUniteLegale,
        nom: uniteLegale.nomUniteLegale,
        prenom: utils.isEmpty([ent.prenom1UniteLegale, ent.prenom2UniteLegale, ent.prenom3UniteLegale, ent.prenom4UniteLegale].filter(a => a).join(" ")) ? undefined : [ent.prenom1UniteLegale, ent.prenom2UniteLegale, ent.prenom3UniteLegale, ent.prenom4UniteLegale].filter(a => a).join(" "),
        nom_commercial: uniteLegale.nomUsageUniteLegale,
        categorie_entreprise: ent.categorieEntreprise,
        siret_siege_social: utils.isEmpty(ent.siren) || utils.isEmpty(uniteLegale.nicSiegeUniteLegale) ? undefined : `${ent.siren}${uniteLegale.nicSiegeUniteLegale}`,
        forme_juridique: utils.isEmpty(uniteLegale.categorieJuridiqueUniteLegale) ? undefined : helpers.getLegalCode(uniteLegale.categorieJuridiqueUniteLegale),
        forme_juridique_code: uniteLegale.categorieJuridiqueUniteLegale,
        naf: uniteLegale.activitePrincipaleUniteLegale,
        date_de_creation: ent.dateCreationUniteLegale,
        etat_entreprise: uniteLegale.etatAdministratifUniteLegale,
        date_mise_a_jour: uniteLegale.etatAdministratifUniteLegale === "C" ? uniteLegale.dateFin : ent.dateDernierTraitementUniteLegale,
        date_de_radiation: uniteLegale.dateFin,
        entreprise_employeur: uniteLegale.caractereEmployeurUniteLegale,
        annee_tranche_effectif: ent.anneeEffectifsUniteLegale,
        _raw: ent
      };
    }

    return out;
  });
};

export default getEntreprise;
