/* eslint no-console: 0 */
'use strict';

const path = require('path');
const proxy = require('express-request-proxy');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const isDeveloping = process.env.NODE_ENV !== 'production';
const envConfig = isDeveloping ? require('./dev.json') : require('./prod.json');
const cfg = Object.assign(envConfig, require('./base.json'));
const config = isDeveloping ? require('../../webpack.config.js') : require('../../webpack.production.config.js');
const port = process.env.PORT || cfg.port;
const app = express();

const pm = new (require('playmusic'));
const credentials = JSON.parse(fs.readFileSync('./app/server/credentials.json'));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      version: false,
      assets: false,
      colors: true,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static('./dist'));
  app.get('/', function response(req, res) {
    res.sendFile('/dist/index.html');
  });
}

// app initialization
pm.init({email: credentials.email, password: credentials.password}, function(err) {
  if (err) console.error(err);
});

// main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/getIndex', proxy({
  url: cfg.indexData
}));

// get stream url
app.get('/stream', function(req, res) {
  try {
    pm.getStreamUrl(req.query.id, function(err, streamUrl) {
      if (err) {
        console.error(err);
      } else {
        res.json(streamUrl);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info('==> Server started on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
