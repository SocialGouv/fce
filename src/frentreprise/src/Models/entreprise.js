const associatedSources = [
  { type: "hasMany", model: "ActivitePartielle", entity: "activitePartielles" },
  { type: "hasMany", model: "Apprentissage", entity: "apprentissages" },
];

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

  Entreprise.associatedSources = associatedSources;

  Entreprise.associate = (models) => {
    Entreprise.belongsTo(models.Naf, {
      foreignKey: "activiteprincipaleunitelegale",
      targetKey: "code",
    });
    Entreprise.belongsTo(models.CategorieJuridique, {
      foreignKey: "categoriejuridiqueunitelegale",
      targetKey: "code",
    });
    Entreprise.hasMany(models.RupcoEtablissement, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
    Entreprise.hasMany(models.Idcc, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
    Entreprise.hasMany(models.InteractionsPole3ESEER, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
    Entreprise.hasMany(models.InteractionsPole3ESRC, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
    Entreprise.hasMany(models.InteractionsPoleC, {
      foreignKey: "siren",
      sourceKey: "siren",
    });
    Entreprise.hasMany(models.InteractionsPoleT, {
      foreignKey: "siren",
      sourceKey: "siren",
    });

    associatedSources.forEach(({ type, model }) => {
      Entreprise[type](models[model], {
        foreignKey: "siren",
        sourceKey: "siren",
      });
    });
  };

  return Entreprise;
};

export default entreprise;
