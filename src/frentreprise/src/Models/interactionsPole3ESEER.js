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

  InteractionsPole3ESEER.associate = (models) => {
    InteractionsPole3ESEER.hasOne(models.Etablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return InteractionsPole3ESEER;
};

export default interactionsPole3ESEER;
