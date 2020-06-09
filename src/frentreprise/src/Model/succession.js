const succession = (sequelize, DataTypes) => {
  const Succession = sequelize.define(
    "succession",
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

  return Succession;
};

export default succession;
