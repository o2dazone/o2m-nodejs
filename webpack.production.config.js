const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, './app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const publicPath = 'http://d2phn2ea0nqfsq.cloudfront.net/m/';

module.exports = {
  mode: 'production',
  entry: [
    path.join(__dirname, './app/main.js')
  ],
  output: {
    path: path.join(__dirname, './dist/'),
    filename: '[name]-[hash].js',
    publicPath
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
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
      disable: false,
      allChunks: true,
      publicPath
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.ProvidePlugin({
      preact: 'preact'
    }),
    process.env.NODE_ENV === 'analyze'
      ? new BundleAnalyzerPlugin({
        generateStatsFile: true
      }) : f => f
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
            ],
            plugins: [
              ['transform-react-jsx', {
                pragma: 'preact.h'
              }]
            ]
          }
        }
      },
      { test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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

      },
      { test: /\.(woff|woff2|ttf|eot|svg|gif|png|jpge?g)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=[name].[hash].[ext]'
      }
    ]
  }
};
