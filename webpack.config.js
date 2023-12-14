const path = require('path');

module.exports = {
mode: "development", //"production"
  entry: './skybox.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname),
  },
};