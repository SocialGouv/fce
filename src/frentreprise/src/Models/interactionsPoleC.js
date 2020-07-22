const interactionsPoleC = (sequelize, DataTypes) => {
  const InteractionsPoleC = sequelize.define(
    "interactionsPoleC",
    {
      siret: DataTypes.STRING,
      annee: DataTypes.STRING,
      mois: DataTypes.STRING,
      jour: DataTypes.STRING,
      suite: DataTypes.BOOLEAN,
      unite: DataTypes.STRING,
      messagerie: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      tableName: "interactions_pole_c",
    }
  );

  InteractionsPoleC.associate = (models) => {
    InteractionsPoleC.hasOne(models.Etablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return InteractionsPoleC;
};

export default interactionsPoleC;
