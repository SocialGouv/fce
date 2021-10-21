const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

const buildDir = path.join(__dirname, "build");
const buildFilename = "server.js";

const PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",

  externals: [nodeExternals()],

  entry: "./src/index.js",

  output: {
    path: buildDir,
    filename: buildFilename,
  },

  context: __dirname,
  node: {
    __filename: false,
    __dirname: false,
  },

  resolve: {
    alias: {
      frentreprise: path.resolve(
        __dirname,
        "../frentreprise/dist/frentreprise"
      ),
    },
    extensions: [".js"],
  },

  mode: PRODUCTION ? "production" : "development",

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./config",
          to: "./config",
        },
      ],
    }),
  ],
};
