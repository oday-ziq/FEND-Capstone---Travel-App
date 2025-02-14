const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  mode: "development",
  devServer: {
    static: "./dist",
    port: 8080
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] },
      { test: /\.(png|jpg|jpeg|gif)$/, use: "file-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/client/views/index.html" }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new CleanWebpackPlugin()
  ]
};
