var path = require("path");
var glob = require("glob");

module.exports = {
  entry: {
    main: "./index.js",
    libs: "./libs.js",
    modules: glob.sync("./modules/**/*.js").map((path) => `./${path}`),
  },
  output: {
    filename: "[name].js",
  },
  devServer: {
    watchFiles: ["js/**/*", "css/**/*"],

    historyApiFallback: true,
    hot: true,
    compress: false,
    static: {
      directory: "./",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff2?|ttf|eot|svg)$/, // Handle fonts/icons used by TinyMCE
        type: "asset/resource",
      },
    ],
  },
};
