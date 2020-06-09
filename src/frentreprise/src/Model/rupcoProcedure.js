const rupcoProcedure = (sequelize, DataTypes) => {
  const RupcoProcedure = sequelize.define(
    "rupcoProcedure",
    {
      numero: DataTypes.INTEGER,
      type: DataTypes.STRING,
      date_enregistrement: DataTypes.STRING,
      etat: DataTypes.STRING,
      siren: DataTypes.STRING,
      effectif_entreprise: DataTypes.INTEGER,
      effectif_groupe: DataTypes.INTEGER,
      nom_groupe: DataTypes.STRING,
      date_jugement: DataTypes.STRING,
      situation_juridique: DataTypes.STRING,
      historique_si: DataTypes.BOOLEAN,
    },
    {
      tableName: "rupco_procedures",
    }
  );

  return RupcoProcedure;
};

export default rupcoProcedure;
