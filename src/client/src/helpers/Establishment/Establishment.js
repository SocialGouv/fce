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

export const getHasApprentissage = apprentissage => {
  const total = apprentissage
    ? Object.values(apprentissage).reduce(
        (total, { signes }) => total + signes,
        0
      )
    : 0;

  return !!total;
};
