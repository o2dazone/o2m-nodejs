/* eslint no-console: 0 */
const pm = new(require('playmusic'));

const playCredentials = {
  email: process.env.GOOGLE_PLAY_EMAIL,
  password: process.env.GOOGLE_PLAY_PASSWORD
};

function getStreamUrl(id, callback) {
  const done = (err, msg) => {
    callback(null, {
      statusCode: err ? '400' : '200',
      body: err ? err.message : JSON.stringify(msg),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  };

  pm.init(playCredentials, err => {
    if (err) {
      console.log(err);
    } else {
      pm.getStreamUrl(id, function(err, streamUrl) {
        if (err) {
          console.log('error getting stream URL', err);
          done(err);
        } else if ( streamUrl ) {
          done(null, streamUrl);
        }
      });
    }
  });
}

exports.handler = (event, context, callback) => {
  console.log(event, context);
  getStreamUrl(event.queryStringParameters.id, callback);
};

exports.setPlayCredentials = (email, password) => {
  playCredentials.email = email;
  playCredentials.password = password;
};
