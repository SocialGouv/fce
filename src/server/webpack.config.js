const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const PostCompile = require("post-compile-webpack-plugin");
const fs = require("fs-extra");

const buildDir = path.join(__dirname, "build");
const buildFilename = "server.js";

const PRODUCTION = process.env.NODE_ENV === "production";

module.exports = {
  target: "node",

  externals: [nodeExternals()],

  entry: "./src/index.js",

  output: {
    path: buildDir,
    filename: buildFilename
  },

  context: __dirname,
  node: {
    __filename: false,
    __dirname: false
  },

  resolve: {
    alias: {
      frentreprise: path.resolve(__dirname, "../frentreprise/src/frentreprise")
    },
    extensions: [".js"]
  },

  mode: PRODUCTION ? "production" : "development",

  plugins: [
    new webpack.DefinePlugin({
      __DIST: JSON.stringify(PRODUCTION)
    }),
    new PostCompile(() => {
      ["config", "lib"].forEach(dir => {
        fs.copySync(
          path.resolve(__dirname, `./${dir}`),
          path.resolve(buildDir, `./${dir}`)
        );
      });

      const dist_package = {
        name: "direccte",
        main: buildFilename,
        license: "private",
        private: true,
        scripts: {
          start: `node ${buildFilename}`
        }
      };

      const self_package = require(path.resolve(__dirname, "./package.json"));

      const release_package = Object.assign({}, self_package, dist_package);
      if (release_package.devDependencies) {
        delete release_package.devDependencies;
      }

      fs.writeFileSync(
        path.resolve(buildDir, "./package.json"),
        JSON.stringify(release_package, null, 2)
      );
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
