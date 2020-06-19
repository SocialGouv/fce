const dsnEff = (sequelize, DataTypes) => {
  const DsnEff = sequelize.define(
    "dsnEff",
    {
      siret: DataTypes.STRING,
      eff: DataTypes.INTEGER,
      mois: DataTypes.STRING,
      hommes: DataTypes.INTEGER,
      femmes: DataTypes.INTEGER,
      cdd: DataTypes.INTEGER,
      cdi: DataTypes.INTEGER,
      cdi_inter: DataTypes.INTEGER,
      inter_mission: DataTypes.INTEGER,
      interim: DataTypes.INTEGER,
      date_maj: DataTypes.STRING,
    },
    {
      tableName: "etablissements_dsn_eff",
    }
  );

  return DsnEff;
};

export default dsnEff;
