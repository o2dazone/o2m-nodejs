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

let searchService;

function rmDir(dirPath) {
  let files;
  try { files = fs.readdirSync(dirPath); } catch (e) {
    console.log(e);
    return;
  }

  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
      } else {
        rmDir(filePath);
      }
    }
  }
  fs.rmdirSync(dirPath);
}

// app initialization
pm.init({email: credentials.email, password: credentials.password}, function(err) {
  if (err) console.error(err);

  rmDir(path.join(__dirname, '../../si'));

  const opts = {
    fieldedSearch: false
  };

  searchIndex(opts, function(err, sind) {
    if (err) {
      console.log('Error creating searchService', err);
    } else {
      searchService = sind;

      pm.getAllTracks(cfg.apiOpts, function(err, library) {
        if (err) console.log(err);

        console.log('indexing tracks...(this will take a while)');

        searchService.callbackyAdd({}, library.data.items, function(err) {
          err ? console.log('Error indexing tracks', err) : console.log('All tracks indexed');
        });
      });
    }
  });
});

// main page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

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

// search
app.get('/search', function(req, res) {
  const query = req.query.str.split(/\-|\s/);
  const opts = {
    'query': { AND: {'*': query}},
    'offset': (req.query.page - 1) * pageSize,
    'pageSize': pageSize
  };

  const allResults = [];

  searchService
    .search(opts)
    .on('data', function(results) {
      allResults.push(results.document);
    })
    .on('end', function() {
      res.json(allResults);
    });
});

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) console.log(err);
  console.info('==> Server started on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
