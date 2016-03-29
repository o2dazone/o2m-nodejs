import fetch from 'isomorphic-fetch';
import { RECEIVE_SEARCH_RESULTS } from 'constants';

function receiveSearchResults(results, query, page) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results,
    query: query,
    page: page
  };
}

export function fetchSearchResults(query, page = 1) {
  return function (dispatch) {
    if (query) {
      const reqUrl = `/search?str=${query}&page=${page}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveSearchResults(response, query, page));
        });
    }
  };
}
