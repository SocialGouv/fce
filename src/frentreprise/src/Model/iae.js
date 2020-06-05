const iae = (sequelize, DataTypes) => {
  const Iae = sequelize.define(
    "iae",
    {
      siret: DataTypes.STRING,
      EI: DataTypes.BOOLEAN,
      ACI: DataTypes.BOOLEAN,
      AI: DataTypes.BOOLEAN,
      ETTI: DataTypes.BOOLEAN,
      EI_SI2018: DataTypes.INTEGER,
      ACI_SI2018: DataTypes.INTEGER,
      AI_SI2018: DataTypes.INTEGER,
      ETTI_SI2018: DataTypes.INTEGER,
      EI_ETP2018: DataTypes.FLOAT,
      sACI_ETP2018iret: DataTypes.FLOAT,
      AI_ETP2018: DataTypes.FLOAT,
      ETTI_ETP2018: DataTypes.FLOAT,
    },
    {
      tableName: "etablissements_iae",
    }
  );

  return Iae;
};

export default iae;
