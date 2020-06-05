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

  return Idcc;
};

export default idcc;
