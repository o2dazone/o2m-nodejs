'use strict';

const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, '/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
process.noDeprecation = true;
module.exports = {
  mode: 'development',
  devtool: 'eval',
  cache: true,
  entry: [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
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
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./node_modules/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new AddAssetHtmlPlugin({
      filepath: require.resolve('./node_modules/vendor.bundle.js'),
      includeSourcemap: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    rules: [
      { test: /\.js?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env',
              [
                '@babel/preset-stage-0', {
                  'decoratorsLegacy': true
                }
              ]
            ]
          }
        },
        {
          loader: 'eslint-loader',
          options: {
            emitWarning: true
          }
        }]
      },
      { test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              data: '@import "app/styles/variables.scss";'
            }
          }
        ]
      },
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=[name].[hash].[ext]'
      }
    ]
  }
};
