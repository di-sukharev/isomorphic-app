const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  devtool: mode === "development" ? "eval-source-map" : false,
  entry: {
    main: "./src/client/index.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
  },
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
  // plugins: [new BundleAnalyzerPlugin()],
};
