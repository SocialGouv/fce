import Sequelize from "sequelize";

const { PG_HOST, PG_USER, PG_PASSWORD, PG_DB } = process.env;

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  host: PG_HOST,
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  },
  define: {
    timestamps: false,
  },
  logging: console.log,
});

const models = {};

const context = require.context("./", true, /\.(js)$/);
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
