const interactionsPole3ESEER = (sequelize, DataTypes) => {
  const InteractionsPole3ESEER = sequelize.define(
    "interactionsPole3ESEER",
    {
      siret: DataTypes.STRING,
      date_visite: DataTypes.STRING,
      region: DataTypes.STRING,
      inspecteurs: DataTypes.STRING,
      filieres: DataTypes.STRING,
      type_suivi: DataTypes.STRING,
      suivi_eti: DataTypes.STRING,
    },
    {
      tableName: "interactions_pole_3e",
    }
  );

  return InteractionsPole3ESEER;
};

export default interactionsPole3ESEER;
