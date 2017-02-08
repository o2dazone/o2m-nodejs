import fetch from 'isomorphic-fetch';
import { RECEIVE_SEARCH_RESULTS, PLAY_SONG } from 'constants';

function receiveSearchResults(results, query) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results,
    query: query
  };
}

function receiveAutoplayTrack(track) {
  return {
    type: PLAY_SONG,
    track: track
  };
}
// ==================================
const SEARCH_DATA_URL = 'https://s3-us-west-1.amazonaws.com/o2dazone.com/api/musicIndex.json';
const STOP_WORDS = ['a', 'the', 'of', 'is'];
var searchData;

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

function search(query) {
  var words = getWords(query);
  var ids;
  words.forEach(word => {
    if( !ids ) {
      ids = searchData.words[word];
    } else {
      ids = intersection(ids, searchData.words[word]);
    }
  });

  var rval = [];
  if( ids ) {
    ids.forEach( id => {
      rval.push(searchData.tracks[id]);
    });
  }
  return rval;
}

function intersection(set1, set2) {
  var rval = [];
  if ( set1 && set2 ) {
    set1.forEach(e => {
      if( set2.indexOf(e) != -1 ) {
        rval.push(e);
      }
    });
  }
  return rval;
}

function getSearchData(callback) {
  if( !searchData ) {
    return fetch(SEARCH_DATA_URL)
      .then(response => response.json())
      .then(response => {
        searchData = response;
        callback();
      });
  } else {
    callback();
  }
}
// ==================================
export function fetchSearchResults(query) {
  return function (dispatch) {
    if (query) {
      getSearchData(function() {
        const results = search(query);
        dispatch(receiveSearchResults(results, query));
      });
    }
  };
}

export function fetchAutoplayTrack(trackId) {
  return function (dispatch) {
    if (trackId) {
      const reqUrl = `/search?str=${trackId}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveAutoplayTrack(response[0]));
        });
    }
  };
}