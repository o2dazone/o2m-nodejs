
const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, './app');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IncrementalCSS  = require('webpack-incremental-ident');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const publicPath = 'http://d2phn2ea0nqfsq.cloudfront.net/m/';

module.exports = {
  mode: 'production',
  optimization: {
    splitChunks: false
  },
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
              '@babel/preset-react',
              '@babel/preset-env',
              [
                '@babel/preset-stage-0', {
                  'decoratorsLegacy': true
                }
              ]
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
              modules: {
                mode: 'local',
                getLocalIdent: IncrementalCSS.getLocalIdent
              },
              importLoaders: true,
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              importLoaders: true,
              sourceMap: false,
              outputStyle: 'compressed',
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
