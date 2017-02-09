import fetch from 'isomorphic-fetch';
import urls from 'server/urls.json';

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
    return fetch(urls.index)
      .then(response => response.json())
      .then(response => {
        window.localStorage.index = JSON.stringify(response);
        dispatch(receiveIndex(response));
      });
  };
}
