var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

const PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",

  externals: [nodeExternals()],

  entry: {
    index: ["./src/frentreprise.js"]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "frentreprise.js",
    library: "frentreprise",
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  resolve: {
    extensions: [".js"]
  },

  mode: PRODUCTION ? "production" : "development",

  plugins: [
    new webpack.DefinePlugin({
      __DIST: PRODUCTION
    })
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
