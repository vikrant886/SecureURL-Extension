const path = require('path');

module.exports = {
  entry: {
    popup:'./src/Appp.js',
    background:'./src/'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js',
  },
};