export default async (SIRET, rows) => {
  return rows.getBySIRET(SIRET).then(pse => {
    if (!pse) {
      return {};
    }

    return {
      pse: {
        rupture_contrat_debut: pse.rupturecontratdebut,
        rupture_contrat_fin: pse.rupturecontratfin
      }
    };
  });
};
