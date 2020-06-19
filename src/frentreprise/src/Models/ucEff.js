const ucEff = (sequelize, DataTypes) => {
  const UcEff = sequelize.define(
    "ucEff",
    {
      siret: DataTypes.STRING,
      cod_section: DataTypes.STRING,
      nme_ddtefp3: DataTypes.STRING,
      nme_region: DataTypes.STRING,
      dereffphy: DataTypes.INTEGER,
      date_effphy_et: DataTypes.STRING,
      source_effphy_et: DataTypes.INTEGER,
    },
    {
      tableName: "etablissements_uc_eff",
    }
  );

  return UcEff;
};

export default ucEff;
