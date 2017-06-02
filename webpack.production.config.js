'use strict';

var path = require('path');
var webpack = require('webpack');
var srcPath = path.join(__dirname, '/app');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: ''
  },
  resolve: {
    modules: [
      srcPath,
      'node_modules',
      'app'
    ],
    extensions: ['.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: '[name]-[hash].min.css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      sourceMap: false,
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        postcss: [ require('autoprefixer') ]
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js?$/, exclude: /node_modules/, use: 'babel-loader?cacheDirectory'},
      { test: /\.json?$/, loader: 'json-loader' },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?localIdentName=[hash:base64:5]&sourceMap!sass-loader?sourceMap&outputStyle=expanded'})},
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader?name=[name].[hash].[ext]'}
    ]
  }
};
