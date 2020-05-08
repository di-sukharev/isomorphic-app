// SPA bundling

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
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};
