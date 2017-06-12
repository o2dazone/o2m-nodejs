import {
  STOP_WORDS,
  REPLACE_WEIRD_CHARACTERS,
  REPLACE_MORE_WEIRD_CHARACTERS
} from 'constants';

import { hashHistory } from 'react-router';

export const getTrackById = (id, results) => {
  for (let i = 0; i < results.length; i++) {
    if (results[i].id === id) {
      return results[i];
    }
  }
};

export const getWords = str => {
  const rval = [];
  const words = str.toLowerCase().replace(REPLACE_WEIRD_CHARACTERS, ' ').replace(REPLACE_MORE_WEIRD_CHARACTERS, '').split(/ +/);
  words.forEach(w => {
    if (STOP_WORDS.indexOf(w) === -1 && rval.indexOf(w) === -1) {
      rval.push(w);
    }
  });
  return rval;
};

export const intersection = (set1, set2) => {
  const rval = [];
  if ( set1 && set2 ) {
    set1.forEach(e => {
      if (set2.indexOf(e) !== -1) {
        rval.push(e);
      }
    });
  }
  return rval;
};

export const makeHistory = (searchTerm, track) => {
  hashHistory.replace(`search=${encodeURI(searchTerm)}${track ? `&track=${track}` : ''}`);
};
