export default ({ polesCompetitivites }) => ({
  pole_competitivite: polesCompetitivites.map((pole) => {
    return pole.designation_pole;
  }),
});
