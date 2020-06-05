const rupcoEtablissement = (sequelize, DataTypes) => {
  const RupcoEtablissement = sequelize.define(
    "rupcoEtablissement",
    {
      siret: DataTypes.STRING,
      numero: DataTypes.INTEGER,
      type: DataTypes.STRING,
      date_enregistrement: DataTypes.STRING,
      siren: DataTypes.STRING,
      date_jugement: DataTypes.STRING,
      situation_juridique: DataTypes.STRING,
      siren_etablissement: DataTypes.STRING,
      effectif_etablissement: DataTypes.INTEGER,
      nombre_de_ruptures_de_contrats_en_debut_de_procedure: DataTypes.INTEGER,
      nombre_de_ruptures_de_contrats_en_fin_de_procedure: DataTypes.INTEGER,
      historique_si: DataTypes.BOOLEAN,
    },
    {
      tableName: "rupco_etablissements",
    }
  );

  return RupcoEtablissement;
};

export default rupcoEtablissement;
