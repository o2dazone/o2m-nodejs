import fetch from 'isomorphic-fetch';

import {
  getWords,
  intersection
} from 'helpers';

import {
  RECEIVE_SEARCH_RESULTS,
  PLAY_SONG
} from 'constants';

let searchData;

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

function search(query) {
  const words = getWords(query);
  let ids;
  words.forEach(word => {
    if (!ids) {
      ids = searchData.words[word];
    } else {
      ids = intersection(ids, searchData.words[word]);
    }
  });

  const rval = [];
  if (ids) {
    ids.forEach( id => {
      rval.push(searchData.tracks[id]);
    });
  }
  return rval;
}

function getSearchData(callback) {
  if (searchData) {
    callback();
  } else {
    return fetch('/getIndex')
      .then(response => response.json())
      .then(response => {
        searchData = response;
        callback();
      });
  }
}

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
