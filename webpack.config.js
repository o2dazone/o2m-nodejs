'use strict';

var path = require('path');
var webpack = require('webpack');
var srcPath = path.join(__dirname, '/app');
var HappyPack = require('happypack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  cache: true,
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'app']
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dist/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new AddAssetHtmlPlugin({ filepath: require.resolve('./dist/vendor.bundle.js'), includeSourcemap: false }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HappyPack({
      id: 'css-loaders',
      loaders: [
        'style-loader','css-loader?localIdentName=[local]___[hash:base64:5]',
        'sass-loader?outputStyle=expanded'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: { "presets": ["react", "es2015", "stage-0", "react-hmre"] } },
      { test: /\.json?$/, loader: 'json'},
      { test: /\.scss$/, loaders: ['happypack/loader?id=css-loaders'] },
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=[name].[hash].[ext]'}
    ]
  }
};
