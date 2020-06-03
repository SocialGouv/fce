import Sequelize from "sequelize";

const sequelize = new Sequelize("fce", "postgres", "root", {
  host: "db",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});

const models = {};

var context = require.context("./", true, /\.(js)$/);
context.keys().forEach((filenameWithPath) => {
  const filename = filenameWithPath.split("/").pop();
  const filenameWithoutExtension = filename.split(".").shift();
  const modelName =
    filenameWithoutExtension.charAt(0).toUpperCase() +
    filenameWithoutExtension.slice(1);

  try {
    if (modelName === "Index") {
      return;
    }

    models[modelName] = context(filenameWithPath).default(
      sequelize,
      Sequelize.DataTypes
    );
  } catch (error) {
    console.error(`Cannot load model ${modelName}`);
  }
});

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
