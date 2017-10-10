
const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, './app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const publicPath = 'http://d2phn2ea0nqfsq.cloudfront.net/m/';

module.exports = {
  entry: [
    path.join(__dirname, './app/main.js')
  ],
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: publicPath
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
      allChunks: true,
      publicPath: publicPath
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
            presets: [
              'react',
              'es2015',
              'stage-0'
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
                modules: true,
                importLoaders: true,
                localIdentName: '[hash:base64:3]',
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                importLoaders: true,
                sourceMap: false,
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
