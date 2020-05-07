const path = require("path");

module.exports = {
  entry: {
    main: "./src/client/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // remove jsx?
        exclude: /node_modules/,
        loader: "babel-loader",
      }
    ],
  },
  resolve: {
    extensions: [".js", ".css"],
  },
};
