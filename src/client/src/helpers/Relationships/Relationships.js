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

// sort by category first (Siège before Etablissement secondaire)
// then sort by date
export const sortAgreements = (agreements, establishments) =>
  Object.entries(agreements)
    .map(([siret, { count: totalEtab, lastDate }]) => {
      const establishment = establishments.find(
        etab => etab.siret.trim() === siret.trim()
      );
      const etat = _get(establishment, "etat_etablissement");
      const categorie = _get(establishment, "categorie_etablissement");
      const date = lastDate;

      return {
        siret,
        categorie,
        etat,
        date,
        totalEtab
      };
    })
    .sort(
      (a, b) =>
        b.categorie.localeCompare(a.categorie) || b.date.localeCompare(a.date)
    );
