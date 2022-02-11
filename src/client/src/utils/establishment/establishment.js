import { equals, pipe, prop } from "lodash/fp";

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
