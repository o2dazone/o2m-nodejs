const path = require('path');
const webpack = require('webpack');
const srcPath = path.join(__dirname, '/app');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.noDeprecation = true;
module.exports = {
  mode: 'development',
  devtool: 'eval',
  cache: true,
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?quiet=true',
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
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
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
            ],
            plugins: ['react-hot-loader/babel']
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
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
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
