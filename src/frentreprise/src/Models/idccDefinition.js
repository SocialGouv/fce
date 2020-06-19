const idccDefinition = (sequelize, DataTypes) => {
  const IdccDefinition = sequelize.define(
    "idccDefinition",
    {
      code: DataTypes.STRING,
      libelle: DataTypes.STRING,
    },
    {
      tableName: "idcc",
    }
  );

  return IdccDefinition;
};

export default idccDefinition;
