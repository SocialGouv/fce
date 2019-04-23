export default async (SIRET, polesCompetitivite) => {
  return polesCompetitivite.findAllBySIRET(SIRET).then(rows => {
    if (!rows || !rows.length) {
      return {};
    }

    const poles = rows.map(pole => {
      return pole.designation_pole;
    });

    return { pole_competitivite: poles };
  });
};
