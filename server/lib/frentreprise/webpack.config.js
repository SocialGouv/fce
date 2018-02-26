var path = require("path");
var webpack = require("webpack");
var nodeExternals = require("webpack-node-externals");

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

  mode: "development",

  resolve: {
    extensions: [".js"]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DIST: true
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
