import fetch from 'isomorphic-fetch';
import { INDEX_URL } from 'constants';

import {
  RECEIVE_INDEX
} from 'constants';

export function receiveIndex(index) {
  return {
    type: RECEIVE_INDEX,
    index
  };
}

export function getSearchData() {
  return function (dispatch) {
    return fetch(INDEX_URL)
      .then(response => response.json())
      .then(response => {
        dispatch(receiveIndex(response));
      });
  };
}
