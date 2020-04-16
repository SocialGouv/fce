import _get from "lodash.get";

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
