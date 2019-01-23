import utils from "../../../Utils/utils";

import getNAF from './getNAF';

const formatEtab = (etab) => {
  const adresse_components = {
    numero_voie: etab.adresseEtablissement.numeroVoieEtablissement,
    indice_repetition: etab.adresseEtablissement.indiceRepetitionEtablissement,
    type_voie: etab.adresseEtablissement.typeVoieEtablissement,
    nom_voie: etab.adresseEtablissement.libelleVoieEtablissement,
    complement_adresse: etab.adresseEtablissement.complementAdresseEtablissement,
    code_postal: etab.adresseEtablissement.codePostalEtablissement,
    code_insee_localite: etab.adresseEtablissement.codeCommuneEtablissement,
    localite: etab.adresseEtablissement.libelleCommuneEtablissement
  }

  return {
    siret: etab.siret,
    actif: etab.uniteLegale.etatAdministratifUniteLegale === "A",
    etat_etablissement: etab.uniteLegale.etatAdministratifUniteLegale,
    enseigne: etab.enseigne,
    naf: etab.uniteLegale.activitePrincipaleUniteLegale,
    libelle_naf: getNAF(etab.uniteLegale.activitePrincipaleUniteLegale.replace(".", "")),
    siege_social: etab.etablissementSiege,
    date_creation: etab.dateCreationEtablissement,
    tranche_effectif_insee: etab.trancheEffectifsEtablissement,
    annee_tranche_effectif_insee: etab.anneeEffectifsEtablissement,
    adresse_components,
    adresse: utils.getCleanAddress(adresse_components),
    etablissement_employeur: etab.periodesEtablissement[0].caractereEmployeurEtablissement,
    _raw: etab,
  }
}

const getSettlement = async (SIRET, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `siret/${SIRET}`,
    params
  ).then((data) => {
    return formatEtab(data.etablissement);
  });
};

export default getSettlement;
