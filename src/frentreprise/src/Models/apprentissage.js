const apprentissage = (sequelize, DataTypes) => {
  const Apprentissage = sequelize.define(
    "apprentissage",
    {
      siret: DataTypes.STRING,
      type_contrat: DataTypes.INTEGER,
      numero_enregistrement: DataTypes.STRING,
      date_debut: DataTypes.STRING,
      date_rupture: DataTypes.STRING,
    },
    {
      tableName: "etablissements_apprentissage",
    }
  );

  return Apprentissage;
};

export default apprentissage;
