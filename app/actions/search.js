import fetch from 'isomorphic-fetch';
import { RECEIVE_SEARCH_RESULTS, RECEIVE_APPENDED_SEARCH_RESULTS, PLAY_SONG } from 'constants';

function receiveSearchResults(results, query, page) {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results,
    query: query,
    page: page
  };
}

function receiveAutoplayTrack(track) {
  return {
    type: PLAY_SONG,
    track: track
  };
}

function receiveAppendedSearchResults(results, query, page) {
  return {
    type: RECEIVE_APPENDED_SEARCH_RESULTS,
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

export function fetchAutoplayTrack(trackId) {
  return function (dispatch) {
    if (trackId) {
      const reqUrl = `/search?str=${trackId}&page=1`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          dispatch(receiveAutoplayTrack(response[0]));
        });
    }
  };
}

export function appendSearchResults(query, page = 1) {
  return function (dispatch) {
    if (query) {
      const reqUrl = `/search?str=${query}&page=${page}`;
      return fetch(reqUrl)
        .then(response => response.json())
        .then(response => {
          if (response.length) dispatch(receiveAppendedSearchResults(response, query, page));
        });
    }
  };
}
