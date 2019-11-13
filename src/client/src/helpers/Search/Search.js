import Config from "../../services/Config";

export const isActiveEstablishment = etat =>
  etat === Config.get("establishmentState").actif;
