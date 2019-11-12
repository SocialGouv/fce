import Config from "../../services/Config";

export const getSuccession = (successeur, predecesseur) => {
  if (successeur !== null) {
    return { label: "SIRET successeur", datas: successeur };
  }
  return { label: "SIRET prédecesseur", datas: predecesseur } || null;
};

export const isActiveEstablishment = establishment => {
  return (
    establishment.etat_etablissement === Config.get("establishmentState").actif
  );
};
