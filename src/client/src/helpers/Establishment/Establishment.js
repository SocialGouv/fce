export const getSuccession = (successeur, predecesseur) => {
  if (successeur !== null) {
    return { label: "SIRET successeur", datas: successeur };
  }
  return { label: "SIRET prédecesseur", datas: predecesseur } || null;
};

export const getEstablishmentIsActive = establishment => {
  return establishment.etat_etablissement === "A";
};
