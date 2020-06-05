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
      tableName: "interactions_pole_c",
    }
  );

  return InteractionsPoleT;
};

export default interactionsPoleT;
