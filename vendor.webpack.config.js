const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    vendor: [
      'lodash.throttle',
      'preact',
      'preact-redux',
      'query-string',
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

