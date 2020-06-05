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

  Etablissement.associate = (models) => {
    Etablissement.belongsTo(models.Naf, {
      foreignKey: "activiteprincipaleetablissement",
      targetKey: "code",
    });
    Etablissement.belongsTo(models.Entreprise, {
      foreignKey: "siren",
      targetKey: "siren",
    });
    Etablissement.hasMany(models.Accord, {
      foreignKey: "siret",
      sourceKey: "siret",
    });
  };

  return Etablissement;
};

export default etablissement;
