/* eslint no-console: 0 */
const webpackConfig = require('../../webpack.config.js');

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const port = 3000;
const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  contentBase: 'src',
  stats: 'minimal'
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info('==> Server started on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});