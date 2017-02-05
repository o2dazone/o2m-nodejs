var assert = require('assert'),
index = require('../index.js');

index.extraExports();

describe('index', function () {
    describe('#getWords', function () {
        it('should create an entry for each word, breaking on - and /, consolidating whitespace and excluding other symbols', function () {
          var expected = ['tracks', 'title', 'artist', 'album'];
          assert.deepEqual(expected, index.getWords('track\'s/title -  artist -   album'));
        });
        it('should exclude duplicate words', function () {
          var expected = ['track', 'title', 'artist'];
          assert.deepEqual(expected, index.getWords('track title track artist'));
        });
        it('should exclude stop words', function () {
          var expected = ['track', 'title'];
          assert.deepEqual(expected, index.getWords('a track of the title is'));
        });
        it('should lower case words', function () {
          var expected = ['track', 'title'];
          assert.deepEqual(expected, index.getWords('TRACK Title'));
        });
    });
});

