const AWS = require('aws-sdk'),
pm = new(require('playmusic'));

var playCredentials = {  
  email: process.env.GOOGLE_PLAY_EMAIL,
  password: process.env.GOOGLE_PLAY_PASSWORD
};

var s3 = new AWS.S3();

const BUCKET_NAME = 'o2dazone.com';
const FILENAME = 'api/musicIndex.json';
const STOP_WORDS = ['a', 'the', 'of', 'is'];

function getWords(title) {
  var rval = [];
  var words = title.toLowerCase().replace(/-|&|\//g, ' ').replace(/'|\(|\)|\.|!/g, '').split(/ +/);
  words.forEach(w => {
    if( STOP_WORDS.indexOf(w) == -1 && rval.indexOf(w) == -1 ) {
      rval.push(w);
    }
  });
  return rval;
}

function indexAll(callback) {
  const done = (err, msg) => {
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : msg,
      headers: {
          'Content-Type': 'text/plain'
      }
    });
  };

  pm.init(playCredentials, err => {
    if (err) console.log(err);
    var timeStart = (new Date).getTime();
    pm.getAllTracks({"limit": 10000}, (err, library) => {
      if (err) console.log(err);

      searchData = { words: {}, tracks: {} };
      library.data.items.forEach(track => {
        var t = `${track.artist} ${track.title} ${track.album}`;
        var parts = getWords(t);
        parts.forEach(w => {
          if( !searchData.words[w] ) {
            searchData.words[w] = [];
          }
          if( searchData.words[w].indexOf(track.id) == -1 ) {
            searchData.words[w].push(track.id);
          }
        });
        searchData.tracks[track.id] = {
          title:track.title,
          artist:track.artist,
          album:track.album,
          albumArtRef:track.albumArtRef,
          durationMillis:track.durationMillis
        };
      });

      var params = {
        Bucket: BUCKET_NAME,
        Key: FILENAME,
        Body: JSON.stringify(searchData)
      };
      s3.putObject(params, function(err, data) {
        if( err ) {
          console.log('error on s3 PUT', err);
          done(err);
        } else if( data ) {
          var duration = (new Date).getTime() - timeStart;
          var msg = `Wrote ${Object.keys(searchData.words).length} words and ${Object.keys(searchData.tracks).length} tracks (${params.Body.length} bytes) in ${duration} ms`;
          console.log(msg);
          done(null, msg);
        }
      });
      
    });
  });  
}

exports.handler = (event, context, callback) => {
  indexAll(callback);
}

exports.setPlayCredentials = (email, password) => {
  playCredentials.email = email;
  playCredentials.password = password;
}

exports.setAWSCredentials = (access, secret) => {
  s3.config.credentials = new AWS.Credentials(access, secret);
}
