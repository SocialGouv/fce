const activitePartielle = (sequelize, DataTypes) => {
  const ActivitePartielle = sequelize.define(
    "activitePartielle",
    {
      siret: DataTypes.STRING,
      num_convention: DataTypes.STRING,
      date_decision: DataTypes.STRING,
      num_avenant: DataTypes.INTEGER,
      da_init: DataTypes.STRING,
      nb_h_auto_avn: DataTypes.FLOAT,
      nb_h_auto_cum: DataTypes.FLOAT,
      nb_h_conso_cum: DataTypes.FLOAT,
      cause: DataTypes.STRING,
    },
    {
      tableName: "etablissements_activite_partielle",
    }
  );

  return ActivitePartielle;
};

export default activitePartielle;
