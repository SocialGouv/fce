const successions = (sequelize, DataTypes) => {
  const Successions = sequelize.define(
    "successions",
    {
      siretetablissementpredecesseur: DataTypes.STRING,
      siretetablissementsuccesseur: DataTypes.STRING,
      dateliensuccession: DataTypes.DATEONLY,
      transfertsiege: DataTypes.BOOLEAN,
      continuiteeconomique: DataTypes.BOOLEAN,
      datederniertraitementliensuccession: DataTypes.DATE,
    },
    {
      tableName: "etablissements_successions",
    }
  );

  return Successions;
};

export default successions;
