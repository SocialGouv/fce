import _get from "lodash.get";

// sort by category first (Siège before Etablissement secondaire)
// then sort by date
export const sortAgreements = agreements =>
  Object.entries(agreements)
    .map(([siret, { count: totalEtab, lastDate, etablissement }]) => {
      const etat = _get(etablissement, "etat_etablissement");
      const categorie =
        _get(etablissement, "categorie_etablissement", "") || "";
      const date = lastDate || "";

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
