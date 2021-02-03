const associatedSources = [
  { type: "hasMany", model: "Accord" },
  { type: "hasMany", model: "ActivitePartielle" },
  { type: "hasMany", model: "Apprentissage" },
  { type: "hasOne", model: "ContratAide" },
  { type: "hasOne", model: "DsnEff" },
  { type: "hasOne", model: "Iae" },
  { type: "hasMany", model: "InteractionsPole3ESEER" },
  { type: "hasMany", model: "InteractionsPole3ESRC" },
  { type: "hasMany", model: "InteractionsPoleC" },
  { type: "hasMany", model: "InteractionsPoleT" },
  { type: "hasMany", model: "PolesCompetitivite" },
  { type: "hasOne", model: "UcEff" },
];

const etablissement = (sequelize, DataTypes) => {
  const Etablissement = sequelize.define(
    "etablissement",
    {
      siret: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      siren: DataTypes.STRING,
      nic: DataTypes.STRING,
      statutdiffusionetablissement: DataTypes.STRING,
      datecreationetablissement: DataTypes.DATEONLY,
      trancheeffectifsetablissement: DataTypes.STRING,
      anneeeffectifsetablissement: DataTypes.STRING,
      activiteprincipaleregistremetiersetablissement: DataTypes.STRING,
      datederniertraitementetablissement: DataTypes.DATEONLY,
      etablissementsiege: DataTypes.STRING,
      nombreperiodesetablissement: DataTypes.INTEGER,
      complementadresseetablissement: DataTypes.STRING,
      numerovoieetablissement: DataTypes.STRING,
      indicerepetitionetablissement: DataTypes.STRING,
      typevoieetablissement: DataTypes.STRING,
      libellevoieetablissement: DataTypes.STRING,
      codepostaletablissement: DataTypes.STRING,
      libellecommuneetablissement: DataTypes.STRING,
      libellecommuneetrangeretablissement: DataTypes.STRING,
      distributionspecialeetablissement: DataTypes.STRING,
      codecommuneetablissement: DataTypes.STRING,
      codecedexetablissement: DataTypes.STRING,
      libellecedexetablissement: DataTypes.STRING,
      codepaysetrangeretablissement: DataTypes.STRING,
      libellepaysetrangeretablissement: DataTypes.STRING,
      complementadresse2etablissement: DataTypes.STRING,
      numerovoie2etablissement: DataTypes.STRING,
      indicerepetition2etablissement: DataTypes.STRING,
      typevoie2etablissement: DataTypes.STRING,
      libellevoie2etablissement: DataTypes.STRING,
      codepostal2etablissement: DataTypes.STRING,
      libellecommune2etablissement: DataTypes.STRING,
      libellecommuneetranger2etablissement: DataTypes.STRING,
      distributionspeciale2etablissement: DataTypes.STRING,
      codecommune2etablissement: DataTypes.STRING,
      codecedex2etablissement: DataTypes.STRING,
      libellecedex2etablissement: DataTypes.STRING,
      codepaysetranger2etablissement: DataTypes.STRING,
      libellepaysetranger2etablissement: DataTypes.STRING,
      datedebut: DataTypes.DATEONLY,
      etatadministratifetablissement: DataTypes.STRING,
      enseigne1etablissement: DataTypes.STRING,
      enseigne2etablissement: DataTypes.STRING,
      enseigne3etablissement: DataTypes.STRING,
      denominationusuelleetablissement: DataTypes.STRING,
      activiteprincipaleetablissement: DataTypes.STRING,
      nomenclatureactiviteprincipaleetablissement: DataTypes.STRING,
      caractereemployeuretablissement: DataTypes.STRING,
    },
    {
      tableName: "etablissements",
    }
  );

  Etablissement.associatedSources = associatedSources;

  Etablissement.associate = (models) => {
    Etablissement.belongsTo(models.Naf, {
      foreignKey: "activiteprincipaleetablissement",
      targetKey: "code",
    });
    Etablissement.belongsTo(models.Entreprise, {
      foreignKey: "siren",
      targetKey: "siren",
    });
    Etablissement.hasMany(models.RupcoEtablissement, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
    Etablissement.hasMany(models.Idcc, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
    associatedSources.forEach(({ type, model }) => {
      Etablissement[type](models[model], {
        foreignKey: "siret",
        sourceKey: "siret",
      });
    });

    Etablissement.Successeur = Etablissement.hasOne(models.Succession, {
      as: "successeur",
      foreignKey: "siretetablissementpredecesseur",
      targetKey: "siret",
    });
    Etablissement.Predecesseur = Etablissement.hasOne(models.Succession, {
      as: "predecesseur",
      foreignKey: "siretetablissementsuccesseur",
      targetKey: "siret",
    });
  };

  return Etablissement;
};

export default etablissement;
