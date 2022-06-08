import {
  capitalize,
  equals,
  filter,
  isEmpty,
  join,
  negate,
  pipe,
  prop,
  toLower,
} from "lodash/fp";

export const getSirenFromSiret = (siret) => siret.substring(0, 9);

export const getSiret = prop("siret");

export const getState = prop("etatadministratifetablissement");

export const isActive = pipe(getState, equals("A"));

export const isSiege = pipe(prop("etablissementsiege"), equals("true"));

export const getCategoryLabel = (etablissement) =>
  isSiege(etablissement) ? "Siège Social" : "Établissement";

export const getCodePostal = (etablissement) =>
  prop("codepostaletablissement", etablissement) ||
  prop("codepostal2etablissement", etablissement);

export const getCity = (etablissement) =>
  prop("libellecommuneetablissement", etablissement) ||
  prop("libellecommune2etablissement", etablissement);

const getNumero = prop("numerovoieetablissement");
const getIndiceRepetition = prop("indicerepetitionetablissement");
const getTypeVoie = pipe(prop("typevoieetablissement"), toLower);
const getNomVoie = pipe(prop("libellevoieetablissement"), capitalize);

export const getDateCreation = prop("datecreationetablissement");

const getDateDernierTraitement = prop("datederniertraitementetablissement");
const getDateDebut = prop("datedebut");

export const getDateFermetureEtablissement = (etablissement) =>
  isActive(etablissement)
    ? ""
    : getDateDebut(etablissement) || getDateDernierTraitement(etablissement);

const groupDefined = (separator = "") =>
  pipe(filter(negate(isEmpty)), join(separator));

export const getAdresse = (etablissement) => {
  return [
    groupDefined()([
      getNumero(etablissement),
      getIndiceRepetition(etablissement),
    ]),
    getTypeVoie(etablissement),
    getNomVoie(etablissement),
    "-",
    getCodePostal(etablissement),
    getCity(etablissement),
  ].join(" ");
};
