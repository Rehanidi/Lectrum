const Path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ASSET_PATH = process.env.ASSET_PATH || '';

const entry = {
  index: Path.resolve(__dirname, "../src/pages/index/scripts/index.js"),
  taskBoard: Path.resolve(__dirname, "../src/pages/taskBoard/scripts/index.js"),
  taskDescription: Path.resolve(__dirname, "../src/pages/taskDescription/scripts/index.js"),
  team: Path.resolve(__dirname, "../src/pages/team/scripts/index.js"),
  calendar: Path.resolve(__dirname, "../src/pages/calendar/scripts/index.js"),
  profileSettings: Path.resolve(__dirname, "../src/pages/profileSettings/scripts/index.js"),
};

module.exports = {
  entry: entry,
  output: {
    path: Path.join(__dirname, "../build"),
    filename: "js/[name].js",
    publicPath: ASSET_PATH
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: Path.resolve(__dirname, "../public"), to: "." }],
    }),
    new HtmlWebpackPlugin({
      chunks: ["index"],
      filename: "index.html",
      template: Path.resolve(__dirname, "../src/pages/index/index.html"),
    }),    
    new HtmlWebpackPlugin({
      chunks: ["taskBoard"],
      filename: "task-board.html",
      template: Path.resolve(__dirname, "../src/pages/taskBoard/index.html"),
    }),    
    new HtmlWebpackPlugin({
      chunks: ["taskDescription"],
      filename: "task-description.html",
      template: Path.resolve(__dirname, "../src/pages/taskDescription/index.html"),
    }),
    new HtmlWebpackPlugin({
      chunks: ["team"],
      filename: "team.html",
      template: Path.resolve(__dirname, "../src/pages/team/index.html"),
    }),
    new HtmlWebpackPlugin({
      chunks: ["calendar"],
      filename: "calendar.html",
      template: Path.resolve(__dirname, "../src/pages/calendar/index.html"),
    }),
    new HtmlWebpackPlugin({
      chunks: ["profileSettings"],
      filename: "profile-settings.html",
      template: Path.resolve(__dirname, "../src/pages/profileSettings/index.html"),
    }),
  ],
  resolve: {
    alias: {
      "~": Path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
          },
        },
      },
    ],
  },
};
