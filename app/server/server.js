/* eslint no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fs = require('fs');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const songLimit = 10000;
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const apiOpts = isDeveloping ? { 'limit': 1000 } : { 'limit': songLimit };
const config = isDeveloping ? require('../../webpack.config.js') : require('../../webpack.production.config.js');
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
  const opts = {
    deletable: false,
    fieldedSearch: false,
    fieldOptions: [{
      fieldName: 'creationTimestamp',
      sortable: true
    }],
    fieldsToStore: ['artist', 'title', 'album', 'id', 'durationMillis', 'albumArtRef', 'genre', 'creationTimestamp']
  };

  searchIndex({opts}, function(err, sind) {
    if (err) {
      console.log('Error creating searchService', err);
    } else {
      searchService = sind;
      searchService.add(tracks, {}, function(err) {
        err ? console.log('Error indexing tracks', err) : console.log('All tracks indexed');
      });
    }
  });
}

function getTracks(callback) {
  pm.getAllTracks(apiOpts, function(err, library) {
    indexTracks(library.data.items);

    if (callback) callback();
  });
}

// app initialization
pm.init({email: credentials.email, password: credentials.password}, function(err) {
  if (err) console.error(err);
  getTracks();
});

// main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// re-index all results
app.get('/index-all', function(req, res) {
  getTracks(function() {
    res.send('Re-indexed all tracks');
  });
});

// get stream url
app.get('/stream', function(req, res) {
  pm.getStreamUrl(req.query.id, function(err, streamUrl) {
    if (err) console.error(err);
    res.json(streamUrl);
  });
});

// search
app.get('/search', function(req, res) {
  const query = req.query.str.split(' ');
  const opts = {
    'query': {'*': query},
    'pageSize': songLimit,
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
