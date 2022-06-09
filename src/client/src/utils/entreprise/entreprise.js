import {
  equals,
  filter,
  find,
  groupBy,
  map,
  maxBy,
  negate,
  pipe,
  prop,
  replace,
  reverse,
  size,
  sortBy,
  values,
} from "lodash/fp";
import { isUndefined } from "lodash/lang";

import {
  isActive as isActiveEtablissement,
  isSiege,
} from "../establishment/establishment";
import {
  normalizeInteractions3E,
  normalizeInteractions3ESRC,
  normalizeInteractionsC,
  normalizeInteractionsT,
} from "../interactions/interactions";

export const isActive = pipe(prop("etatadministratifunitelegale"), equals("A"));

export const getOrganismesFormations = prop("organismes_formation");
export const getRupco = prop("rupco");

export const getName = (entreprise) => {
  const personneUniteLegale = [
    prop("prenom1unitelegale", entreprise),
    prop("nomunitelegale", entreprise),
  ]
    .filter(negate(isUndefined))
    .join(" ");

  return (
    getRaisonSociale(entreprise) ||
    prop("denominationunitelegale", entreprise) ||
    prop("denominationusuelle1unitelegale", entreprise) ||
    personneUniteLegale
  );
};

export const getSiren = prop("siren");
export const getOpeningDate = prop("datecreationunitelegale");
export const getClosingDate = prop("datederniertraitementunitelegale");
export const getAccidentsTravail = prop("accidents_travail");
export const getEtablissements = prop("etablissements");
export const getRaisonSociale = pipe(
  prop("api.raison_sociale"),
  replace("*/")(" "),
  replace("/", "")
);
const getInteractionsT = pipe(prop("interactions_T"), normalizeInteractionsT);

const getInteractionsC = pipe(prop("interactions_C"), normalizeInteractionsC);
const getInteractions3E = pipe(
  prop("interactions_3E_SEER"),
  normalizeInteractions3E
);

const getInteractions3ESRC = pipe(
  prop("interactions_3E_SRC"),
  normalizeInteractions3ESRC
);

export const getNafCode = prop("naf.code");
export const getNafLabel = prop("naf.libelle");
export const getCapitalSocial = prop("api.capital_social");
export const getMandatairesSociaux = prop("api.mandataires_sociaux");
export const getNumeroTvaIntracommunautaire = prop(
  "api.numero_tva_intracommunautaire"
);

export const getDonneesEcofi = prop("api.donnees_ecofi");

export const getRcsInfo = prop("api.extraits_rcs_infogreffe");
export const getRcsObservations = pipe(getRcsInfo, prop("observations"));
export const getDateImmatriculationRcs = pipe(
  getRcsInfo,
  prop("date_immatriculation")
);

export const getSiretSiegeSocial = prop("api.siret_siege_social");

const getEffectifsAnnuel = prop("api.effectifs_annuel");
export const getEffectifsAnnuelValue = pipe(
  getEffectifsAnnuel,
  prop("effectifs_annuels")
);
export const getEffectifsAnnuelAnnee = pipe(getEffectifsAnnuel, prop("annee"));

export const getEffectifsMensuels = prop("api.effectifs_mensuels");

export const getSiegeSocial = pipe(getEtablissements, find(isSiege));

const getActiveEtablissements = pipe(
  getEtablissements,
  filter(isActiveEtablissement)
);

export const getActiveEtablissementsCount = pipe(getActiveEtablissements, size);
export const getEstablishmentsCount = pipe(getEtablissements, size);

export const getCategorieJuridiqueLabel = prop("categorie_juridique.libelle");
export const getCategorie = prop("categorieentreprise");
export const getTrancheEffectifs = prop("trancheeffectifsunitelegale");

const defaultToArray = (value) => value || [];

export const getInteractions = (entreprise) =>
  [
    getInteractionsT,
    getInteractionsC,
    getInteractions3E,
    getInteractions3ESRC,
  ].flatMap((selector) => defaultToArray(selector(entreprise)));

export const formatInteractions = pipe(
  groupBy("siret"),
  values,
  map(maxBy("date")),
  sortBy("date"),
  reverse
);
