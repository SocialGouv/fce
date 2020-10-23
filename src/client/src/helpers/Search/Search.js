import Config from "../../services/Config";

export const isActiveEstablishment = etat =>
  etat === Config.get("establishmentState").actif;

export const formatSearchInput = query => {
  if (query === "") {
    return query;
  }
  /* remove spaces in SIRET and SIREN */
  const queryWithoutWhitespace = query.replace(/\s/g, "");
  const isSirenOrSiret = [9, 14].includes(queryWithoutWhitespace.length);

  return isSirenOrSiret ? `"${queryWithoutWhitespace}"` : `"${query}"`;
};
