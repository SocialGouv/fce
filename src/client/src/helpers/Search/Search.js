import Config from "../../services/Config";

export const isActiveEstablishment = etat =>
  etat === Config.get("establishmentState").actif;

export const isSiret = (value) => value.match(/^\s*(\d\s*){14}$/);
export const isSiren = (value) => value.match(/^\s*(\d\s*){9}$/);

export const formatSearchInput = query => {
  if (query === "") {
    return query;
  }
  /* remove spaces in SIRET and SIREN */
  const queryWithoutWhitespace = query.replace(/\s/g, "");
  const isSirenOrSiret = /^(\d{14}|\d{9})$/.test(queryWithoutWhitespace);

  return isSirenOrSiret ? `"${queryWithoutWhitespace}"` : `"${query}"`;
};
