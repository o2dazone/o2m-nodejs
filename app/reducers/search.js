import * as actionTypes from 'constants';

export default function search(state = { hasResults: false, results: [] }, action) {
  const { type, results, query, page } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    return {...state, results, query, page, hasResults: results.length ? true : false};
  case actionTypes.RECEIVE_APPENDED_SEARCH_RESULTS:
    return {...state, results: [...state.results, ...results], query, page, hasResults: results.length ? true : false};
  default:
    return state;
  }
}
