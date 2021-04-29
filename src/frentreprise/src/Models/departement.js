const departement = (sequelize, DataTypes) => {
  const Departement = sequelize.define("departements", {
    code: DataTypes.STRING,
    nom: DataTypes.STRING,
  });

  return Departement;
};

export default departement;
