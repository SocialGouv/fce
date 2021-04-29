const polesCompetitivite = (sequelize, DataTypes) => {
  const PolesCompetitivite = sequelize.define(
    "polesCompetitivite",
    {
      siret: DataTypes.STRING,
      designation_pole: DataTypes.STRING,
    },
    {
      tableName: "poles_competitivite",
    }
  );

  return PolesCompetitivite;
};

export default polesCompetitivite;
