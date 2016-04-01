/* eslint no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const pageSize = 50;
const isDeveloping = process.env.NODE_ENV !== 'production';
const cfg = isDeveloping ? require('./dev.json') : require('./prod.json');
const config = isDeveloping ? require('../../webpack.config.js') : require('../../webpack.production.config.js');
const port = process.env.PORT || cfg.port;
const app = express();

const pm = new (require('playmusic'));
const searchIndex = require('search-index');

const credentials = JSON.parse(fs.readFileSync('./app/server/credentials.json'));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
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

let searchService;
function indexTracks(tracks) {
  searchService.add(tracks, {}, function(err) {
    err ? console.log('Error indexing tracks', err) : console.log('All tracks indexed');
  });
}

function getTracks(callback) {
  pm.getAllTracks(cfg.apiOpts, function(err, library) {
    if (err) console.log(err);

    console.log('indexing tracks...(this will take a while)');
    indexTracks(library.data.items);

    if (callback) callback();
  });
}

function initializeSearch() {
  searchIndex({}, function(err, sind) {
    if (err) {
      console.log('Error creating searchService', err);
    } else {
      console.log('!!!! Search service initialized !!!!');
      searchService = sind;
    }
  });
}

// app initialization
pm.init({email: credentials.email, password: credentials.password}, function(err) {
  if (err) console.error(err);

  initializeSearch();
  getTracks();
});

// main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// re-index all results
app.get('/index-all', function(req, res) {
  getTracks(function() {
    res.send('Indexing new tracks, they will appear in about 2 minutes...');
  });
});

// get stream url
app.get('/stream', function(req, res) {
  pm.getStreamUrl(req.query.id, function(err, streamUrl) {
    if (err) {
      console.error(err);
    } else {
      res.json(streamUrl);
    }
  });
});

// search
app.get('/search', function(req, res) {
  const query = req.query.str.split(' ');
  // const resultsPerPage = req.query.page * pageSize;
  const opts = {
    'query': {'*': query},
    'offset': (req.query.page - 1) * pageSize,
    'pageSize': pageSize,
    'sort': ['creationTimestamp', 'desc']
  };

  searchService.search(opts, function(err, results) {
    if (err) console.log('Error executing search', err);

    const hits = [];
    results.hits.forEach(function(hit) {
      hits.push(hit.document);
    });
    res.json(hits);
  });
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info('==> Server started on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
