import fetch from 'isomorphic-fetch';

import {
  getWords,
  intersection
} from 'helpers';

import {
  RECEIVE_SEARCH_RESULTS,
  PLAY_SONG
} from 'constants';

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

export function fetchSearchResults(query) {
  if (query) {
    return function(dispatch, getState) {
      const { index } = getState();
      const words = getWords(query);
      let ids;

      words.forEach(word => {
        if (!ids) {
          ids = index.words[word];
        } else {
          ids = intersection(ids, index.words[word]);
        }
      });

      const results = [];
      if (ids) {
        ids.forEach( id => {
          index.tracks[id].id = id;
          results.push(index.tracks[id]);
        });
      }

      dispatch(receiveSearchResults(results, query));
    };
  }
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
