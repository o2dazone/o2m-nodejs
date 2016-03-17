/* eslint no-console: 0 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const pm = new (require('playmusic'));
const fs = require('fs');
const searchIndex = require('search-index');

const appConfig = JSON.parse(fs.readFileSync('./app/server/config.json'));
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
  // app.get('*', function response(req, res) {
  //   res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
  //   res.end();
  // });
} else {
  app.use(express.static(__dirname + '/dist'));
  // app.get('*', function response(req, res) {
  //   res.sendFile(path.join(__dirname, 'dist/index.html'));
  // });
}

let allTracks;
let searchService;
function getTracks(callback) {
  pm.getAllTracks({'limit': appConfig.allTracks.limit}, function(err, library) {
    allTracks = library.data.items;
    console.log('all tracks loaded!');
    indexTracks(allTracks);

    if (callback) callback();
  });
}

function indexTracks(tracks) {
  searchIndex({}, function(err, sind) { 
    if (err) {
      console.log("Error creating searchService", err);
    } else {
      searchService = sind;
      searchService.add(tracks, {}, function(err) { 
        if (err) {
          console.log("Error indexing tracks", err);
        } else {
          console.log("All tracks indexed");
        }
      });
    }
  });
}

// app initialization
pm.init({email: credentials.email, password: credentials.password}, function(err) {
  if (err) console.error(err);
  getTracks();
});

// main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// re-index all results
app.get('/index-all', function(req, res) {
  getTracks(function() {
    res.send('Re-indexed all tracks: ' + allTracks.length + ' songs.');
  });
});

// get stream url
app.get('/stream', function(req, res) {
  pm.getStreamUrl(req.query.id, function(err, streamUrl) {
    if (err) console.error(err);
    res.json(streamUrl);
  });
});

// create regex partial for searching
function partialSearch(param, query) {
  const partialRegex = new RegExp(query, 'i');
  return param.match(partialRegex);
}

// search
app.get('/search', function(req, res) {
  searchService.search({"query" : {"*": [req.query.str]}}, function(err, results) {
    if(err) {
      console.log("Error executing search", q, err);
    }
    let hits = [];
    results.hits.forEach(function(hit) {
      hits.push(hit.document);
    });
    res.json(hits);
  });
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> Server started on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
