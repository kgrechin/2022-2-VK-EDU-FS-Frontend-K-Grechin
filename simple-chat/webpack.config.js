const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: './src/js/index.js',
    chats: './src/js/chats.js',
    messages: './src/js/messages.js'
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          }
        ]
      },
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "css/[name].css",
      chunks: ['chats']
    }),
    new MiniCSSExtractPlugin({
      filename: "css/[name].css",
      chunks: ['messages']
    }),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ['index']
    }),
    new HTMLWebpackPlugin({
      filename: "chats.html",
      template: "./src/chats.html",
      chunks: ['chats']
    }),
    new HTMLWebpackPlugin({
      filename: "messages.html",
      template: "./src/messages.html",
      chunks: ['messages']
    }),
  ],
}
