const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'babel-cli',
      'babel-preset-react',
      'babel-preset-react-hmre',
      'chai',
      'eslint-plugin-react',
      'isomorphic-fetch',
      'lodash.throttle',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'soundmanager2'
    ]
  },

  output: {
    filename: '[name].bundle.js',
    path: 'dist/',
    library: '[name]_lib'
  },

  plugins: [
    new webpack.DllPlugin({
      path: 'dist/[name]-manifest.json',
      name: '[name]_lib'
    })
  ]
};
