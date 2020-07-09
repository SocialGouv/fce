const contratAide = (sequelize, DataTypes) => {
  const ContratAide = sequelize.define(
    "contratAide",
    {
      siret: DataTypes.STRING,
      CA_stock_12_2018: DataTypes.INTEGER,
      CA_contrat_2018: DataTypes.INTEGER,
      CA_entree_2018: DataTypes.INTEGER,
      contrat_aide: DataTypes.BOOLEAN,
    },
    {
      tableName: "etablissements_contrats_aides",
    }
  );

  return ContratAide;
};

export default contratAide;
