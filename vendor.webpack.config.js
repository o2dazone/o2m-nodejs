const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    vendor: [
      'add-asset-html-webpack-plugin',
      'babel-preset-react',
      'babel-preset-react-hmre',
      'eslint-plugin-react',
      'lodash.throttle',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'soundmanager2'
    ]
  },

  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, './node_modules'),
    library: '[name]_lib'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './node_modules/[name]-manifest.json'),
      name: '[name]_lib'
    })
  ]
};

