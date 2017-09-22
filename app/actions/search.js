import {
  getWords,
  intersection
} from 'helpers';

import {
  RECEIVE_SEARCH_RESULTS,
  PLAY_SONG
} from 'constants';

const receiveSearchResults = (results, query) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results,
    query
  };
};

const receiveAutoplayTrack = track => {
  return {
    type: PLAY_SONG,
    track
  };
};

export const fetchSearchResults = query => {
  return (dispatch, getState) => {
    if (query) {
      const { index: { words, tracks } } = getState();
      const searchWords = getWords(query);
      let ids;

      searchWords.forEach( searchWord => {
        ids = !ids ? words[searchWord] : intersection(ids, words[searchWord]);
      });

      const results = [];
      if (ids) {
        ids.forEach( id => {
          tracks[id].id = id;
          results.push(tracks[id]);
        });
      }

      dispatch(receiveSearchResults(results, query));
    }
  };
};

export const fetchAutoplayTrack = trackId => {
  return (dispatch, getState) => {
    if (trackId) {
      const { index } = getState();
      dispatch(receiveAutoplayTrack(index.tracks[trackId]));
    }
  };
};
