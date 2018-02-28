const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const PostCompile = require("post-compile-webpack-plugin");
const fse = require("fs-extra");

const buildDir = path.join(__dirname, "build");

module.exports = {
  target: "node",

  externals: [nodeExternals()],

  entry: "./src/index.js",

  output: {
    path: buildDir,
    filename: "server.js"
  },

  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },

  resolve: {
    extensions: [".js"]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DIST: true
    }),
    new PostCompile(() => {
      console.log("toto");
      ["config", "htdocs"].forEach(dir => {
        console.log("toto : ", dir);
        fse.copySync(
          path.resolve(__dirname, `./${dir}`),
          path.resolve(buildDir, `./${dir}`)
        );
      });
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
