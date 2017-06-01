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
  return function(dispatch, getState) {
    if (query) {
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
    }
  };
}

export function fetchAutoplayTrack(trackId) {
  return function (dispatch, getState) {
    if (trackId) {
      const { index } = getState();
      dispatch(receiveAutoplayTrack(index.tracks[trackId]));
    }
  };
}
