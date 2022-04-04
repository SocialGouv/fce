import Config from "../../services/Config";

export const getSuccession = (successeur, predecesseur) =>
  successeur !== null
    ? { datas: successeur, label: "SIRET successeur" }
    : { datas: predecesseur, label: "SIRET prédecesseur" };

export const isActiveEstablishment = (establishment) =>
  establishment.etat_etablissement === Config.get("establishmentState").actif;

export const hasApprentissage = (apprentissage) =>
  apprentissage &&
  Object.values(apprentissage).find(({ signes }) => signes > 0);
