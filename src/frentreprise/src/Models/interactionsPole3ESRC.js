const interactionsPole3ESRC = (sequelize, DataTypes) => {
  const InteractionsPole3ESRC = sequelize.define(
    "interactionsPole3ESRC",
    {
      siret: DataTypes.STRING,
      region: DataTypes.STRING,
      libelle_region: DataTypes.STRING,
      numero_dossier: DataTypes.STRING,
      type_controle: DataTypes.STRING,
      nature_controle: DataTypes.STRING,
      cible_controle: DataTypes.STRING,
      date: DataTypes.STRING,
    },
    {
      tableName: "interactions_pole_3e_src",
    }
  );

  InteractionsPole3ESRC.associate = (models) => {
    InteractionsPole3ESRC.hasOne(models.Etablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return InteractionsPole3ESRC;
};

export default interactionsPole3ESRC;
