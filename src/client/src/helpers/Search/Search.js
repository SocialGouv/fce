import Config from "../../services/Config";

export const isActiveEstablishment = etat =>
  etat === Config.get("establishmentState").actif;

export const isSiren = siren => {
  // SIREN is 9 numeric characters only
  const regex = /^[0-9]{9}$/;
  return regex.test(siren);
};

export const isSiret = siret => {
  // SIRET is 14 numeric characters only
  const regex = /^[0-9]{14}$/;
  return regex.test(siret);
};

export const isSirenOrSiret = query => {
  return isSiren(query) || isSiret(query);
};
