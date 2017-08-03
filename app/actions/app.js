import fetch from 'isomorphic-fetch';

import {
  INDEX_URL,
  RECEIVE_INDEX
} from 'constants';

export const receiveIndex = index => {
  return {
    type: RECEIVE_INDEX,
    index
  };
};

export const getSearchData = () => {
  return dispatch => {
    return fetch(INDEX_URL)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveIndex(response));
      });
  };
};
