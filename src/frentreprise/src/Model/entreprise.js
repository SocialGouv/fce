const entreprise = (sequelize, DataTypes) => {
  const Entreprise = sequelize.define(
    "entreprise",
    {
      siren: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      statutdiffusionunitelegale: DataTypes.STRING,
      unitepurgeeunitelegale: DataTypes.STRING,
      datecreationunitelegale: DataTypes.DATEONLY,
      sigleunitelegale: DataTypes.STRING,
      sexeunitelegale: DataTypes.STRING,
      prenom1unitelegale: DataTypes.STRING,
      prenom2unitelegale: DataTypes.STRING,
      prenom3unitelegale: DataTypes.STRING,
      prenom4unitelegale: DataTypes.STRING,
      pseudonymeunitelegale: DataTypes.STRING,
      identifiantassociationunitelegale: DataTypes.STRING,
      trancheeffectifsunitelegale: DataTypes.STRING,
      anneeeffectifsunitelegale: DataTypes.STRING,
      datederniertraitementunitelegale: DataTypes.DATEONLY,
      nombreperiodesunitelegale: DataTypes.INTEGER,
      categorieentreprise: DataTypes.STRING,
      anneecategorieentreprise: DataTypes.STRING,
      datedebut: DataTypes.DATEONLY,
      etatadministratifunitelegale: DataTypes.STRING,
      nomunitelegale: DataTypes.STRING,
      nomusageunitelegale: DataTypes.STRING,
      denominationunitelegale: DataTypes.STRING,
      denominationusuelle1unitelegale: DataTypes.STRING,
      denominationusuelle2unitelegale: DataTypes.STRING,
      denominationusuelle3unitelegale: DataTypes.STRING,
      categoriejuridiqueunitelegale: DataTypes.STRING,
      activiteprincipaleunitelegale: DataTypes.STRING,
      nomenclatureactiviteprincipaleunitelegale: DataTypes.STRING,
      nicsiegeunitelegale: DataTypes.STRING,
      economiesocialesolidaireunitelegale: DataTypes.STRING,
      caractereemployeurunitelegale: DataTypes.STRING,
      prenomusuelunitelegale: DataTypes.STRING,
    },
    {
      tableName: "entreprises",
    }
  );

  Entreprise.associate = (models) => {
    Entreprise.hasMany(models.Etablissement, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
  };

  return Entreprise;
};

export default entreprise;
