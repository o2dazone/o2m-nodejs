import fetch from 'isomorphic-fetch';
import { RECEIVE_SEARCH_RESULTS } from '../constants';

function receiveSearchResults(results) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results
  };
}

export function fetchSearchResults(query) {
  return function (dispatch) {
    if (query) {
      const reqUrl = `/search?str=${query}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveSearchResults(response));
        });
    }
  };
}
