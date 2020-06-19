const naf = (sequelize, DataTypes) => {
  const Naf = sequelize.define(
    "naf",
    {
      code: DataTypes.STRING,
      libelle: DataTypes.STRING,
      nomenclature: DataTypes.STRING,
      recherche: DataTypes.BOOLEAN,
    },
    {
      tableName: "naf",
    }
  );

  return Naf;
};

export default naf;
