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

  return InteractionsPoleC;
};

export default interactionsPoleC;
