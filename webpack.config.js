const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
mode: "production", //"development"
  entry: './skybox.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
        { from: "audio", to: "audio" },
        { from: "style.css", to: "./" },
        { from: "index.html", to: "./" },
      ],
    }),
  ],
};