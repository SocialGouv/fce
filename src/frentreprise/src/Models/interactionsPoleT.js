const interactionsPoleT = (sequelize, DataTypes) => {
  const InteractionsPoleT = sequelize.define(
    "interactionsPoleT",
    {
      siret: DataTypes.STRING,
      type_intervention: DataTypes.STRING,
      date: DataTypes.STRING,
      realise_pour: DataTypes.STRING,
      action_sur: DataTypes.STRING,
      intervenant: DataTypes.STRING,
    },
    {
      tableName: "interactions_pole_t",
    }
  );

  InteractionsPoleT.associate = (models) => {
    InteractionsPoleT.hasOne(models.Etablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return InteractionsPoleT;
};

export default interactionsPoleT;
