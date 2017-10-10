/* eslint no-console: 0 */
const AWS = require('aws-sdk');
const pm = new(require('playmusic'));

const playCredentials = {
  email: process.env.GOOGLE_PLAY_EMAIL,
  password: process.env.GOOGLE_PLAY_PASSWORD,
  masterToken: process.env.GOOGLE_PLAY_MASTERTOKEN
};

const s3 = new AWS.S3();
var cloudfront = new AWS.CloudFront();

const BUCKET_NAME = 'o2dazone.com';
const FILENAME = 'api/musicIndex.json';
const STOP_WORDS = ['a', 'the', 'of', 'is'];

const CLOUDFRONT_DISTRIBUTION_ID = 'EDAT3HCZVKRZQ';


function getWords(title) {
  const rval = [];
  const words = title.toLowerCase().replace(/-|&|\//g, ' ').replace(/'|\(|\)|\.|!/g, '').split(/ +/);
  words.forEach(w => {
    if ( STOP_WORDS.indexOf(w) === -1 && rval.indexOf(w) === -1 ) {
      rval.push(w);
    }
  });
  return rval;
}

function indexAll(callback) {
  let searchData;

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
    const timeStart = (new Date).getTime();
    pm.getAllTracks({'limit': 10000}, (err, library) => {
      if (err) console.log(err);

      searchData = { words: {}, tracks: {} };
      library.data.items.forEach(track => {
        const t = `${track.artist} ${track.title} ${track.album}`;
        const parts = getWords(t);
        parts.forEach(w => {
          if ( !searchData.words[w] ) {
            searchData.words[w] = [];
          }
          if ( searchData.words[w].indexOf(track.id) === -1 ) {
            searchData.words[w].push(track.id);
          }
        });
        searchData.tracks[track.id] = {
          title: track.title,
          artist: track.artist,
          album: track.album,
          albumArtRef: track.albumArtRef,
          durationMillis: track.durationMillis,
          creationTimestamp: track.creationTimestamp,
          trackNumber: track.trackNumber
        };
      });

      const params = {
        Bucket: BUCKET_NAME,
        Key: FILENAME,
        Body: JSON.stringify(searchData),
        ContentType: 'application/json'
      };
      s3.putObject(params, function(err, data) {
        if ( err ) {
          console.log('error on s3 PUT', err);
          done(err);
        } else if ( data ) {
          const duration = (new Date).getTime() - timeStart;
          const msg = `Wrote ${Object.keys(searchData.words).length} words and ${Object.keys(searchData.tracks).length} tracks (${params.Body.length} bytes) in ${duration} ms.`;
          console.log(msg);

          // Invalidate File in cloudfront
          const cfparams = {
            DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
            InvalidationBatch: {
              CallerReference: new Date().toString(),
              Paths: {
                Quantity: 1,
                Items: [ '/' + FILENAME ]
              }
            }
          };
          cloudfront.createInvalidation(cfparams, function(err, data) {
            if (err) {
              console.log('error on CloudFront invalidation', err, err.stack);
              done(err);
            } else {
              done(null, msg + ` Invalidated ${FILENAME}`);
            }
          });
          
        }
      });
    });
  });
}

exports.handler = (event, context, callback) => {
  indexAll(callback);
};

exports.setPlayCredentials = (email, password, masterToken) => {
  playCredentials.email = email;
  playCredentials.password = password;
  playCredentials.masterToken = masterToken;
};

exports.setAWSCredentials = (access, secret) => {
  s3.config.credentials = new AWS.Credentials(access, secret);
  cloudfront = new AWS.CloudFront({credentials: new AWS.Credentials(access, secret)});
};

exports.extraExports = () => {
  exports.getWords = getWords;
};
