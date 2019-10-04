export default async (SIRET, rows) => {
  return rows.getBySIRET(SIRET).then(pseRows => {
    if (!pseRows || pseRows.length === 0) {
      return {};
    }

    const pse = pseRows.map(pseRow => {
      [
        "numero_de_dossier",
        "type_de_dossier",
        "etat_du_dossier",
        "situation_juridique"
      ].forEach(field => {
        pseRow[field] =
          typeof pseRow[field] === "string" && pseRow[field].trim();
      });

      pseRow.rupture_contrat_debut =
        pseRow.nombre_de_ruptures_de_contrats_en_debut_de_procedure;
      pseRow.rupture_contrat_fin =
        pseRow.nombre_de_ruptures_de_contrats_en_fin_de_procedure;

      return pseRow;
    });

    return {
      pse
    };
  });
};
