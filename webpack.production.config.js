'use strict';

var path = require('path');
var webpack = require('webpack');
var srcPath = path.join(__dirname, './app');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './app/main.js')
  ],
  output: {
    path: path.join(__dirname, './dist/'),
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
    })
  ],
  module: {
    rules: [
      { test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              "react",
              "es2015",
              "stage-0",
              "react-hmre"
            ]
          }
        }
      },
      { test: /\.json?$/,
        loader: 'json-loader'
      },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: true,
                localIdentName: '[hash:base64:5]',
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
                options: {
                    minimize: true,
                    debug: false,
                    plugins: function () {
                        return [
                            require("autoprefixer")
                        ];
                    }
                }
            },
            {
              loader: 'sass-loader',
              options: {
                importLoaders: true,
                sourceMap: true,
                outputStyle: 'compressed'
              }
            }
          ]
        })
      },
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=[name].[hash].[ext]'
      }
    ]
  }
};
