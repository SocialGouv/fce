const accord = (sequelize, DataTypes) => {
  const Accord = sequelize.define(
    "accord",
    {
      num_dos: DataTypes.STRING,
      siret: DataTypes.STRING,
      dt_sign: DataTypes.STRING,
      epargne: DataTypes.INTEGER,
      remuneration: DataTypes.INTEGER,
      temps_travail: DataTypes.INTEGER,
      conditions_travail: DataTypes.INTEGER,
      emploi: DataTypes.INTEGER,
      egalite_pro: DataTypes.INTEGER,
      classifications: DataTypes.INTEGER,
      formation: DataTypes.INTEGER,
      protection_sociale: DataTypes.INTEGER,
      droit_syndical: DataTypes.INTEGER,
      autres: DataTypes.INTEGER,
      nouvelles_technologies: DataTypes.INTEGER,
    },
    {
      tableName: "etablissements_accords",
    }
  );

  Accord.associate = (models) => {
    Accord.hasOne(models.Etablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return Accord;
};

export default accord;
