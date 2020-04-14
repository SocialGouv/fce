import _get from "lodash.get";

export const getCompanyName = data => {
  const raisonSociale = _get(data, "raison_sociale");
  const sigle = _get(data, "sigle");
  const nomCommercial = _get(data, "nom_commercial");
  const nom = _get(data, "nom");
  const prenom = _get(data, "prenom");

  return (
    raisonSociale ||
    sigle ||
    nomCommercial ||
    `${nom || ""} ${prenom || ""}`.trim() ||
    null
  ).toLowerCase();
};
