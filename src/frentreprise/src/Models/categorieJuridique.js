const categorieJuridique = (sequelize, DataTypes) => {
  const CategorieJuridique = sequelize.define(
    "categorie_juridique",
    {
      code: DataTypes.STRING,
      libelle: DataTypes.STRING,
    },
    {
      tableName: "categorie_juridique",
    }
  );

  return CategorieJuridique;
};

export default categorieJuridique;
