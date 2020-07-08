const idcc = (sequelize, DataTypes) => {
  const Idcc = sequelize.define(
    "idcc",
    {
      siret: DataTypes.STRING,
      idcc: DataTypes.STRING,
      date_maj: DataTypes.STRING,
      mois: DataTypes.STRING,
    },
    {
      tableName: "etablissements_idcc",
    }
  );

  Idcc.associate = (models) => {
    Idcc.hasOne(models.IdccDefinition, {
      foreignKey: "code",
      sourceKey: "idcc",
    });
  };

  return Idcc;
};

export default idcc;
