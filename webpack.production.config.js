'use strict';

var path = require('path');
var webpack = require('webpack');
var srcPath = path.join(__dirname, '/app');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  resolve: {
    root: srcPath,
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'app']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: { "presets": ["es2015", "stage-0", "react"]}},
      { test: /\.json?$/, loader: 'json' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?localIdentName=[hash:base64:5]&sourceMap!sass-loader?sourceMap&outputStyle=expanded')},
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?name=[name].[hash].[ext]'}
    ]
  },
  postcss: [
    require('autoprefixer')
  ]
};
