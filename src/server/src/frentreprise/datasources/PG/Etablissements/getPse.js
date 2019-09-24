export default async (SIRET, rows) => {
  return rows.getBySIRET(SIRET).then(row => {
    if (!row || !row.length) {
      return {};
    }

    const pse = row[0];

    return {
      pse: {
        rupture_contrat_debut: pse.rupturecontratdebut,
        rupture_contrat_fin: pse.rupturecontratfin
      }
    };
  });
};
