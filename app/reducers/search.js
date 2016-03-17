import * as actionTypes from '../constants';

export default function search(state = { hasResults: false }, action) {
  const { type, results, query } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    return {...state, results, query, hasResults: true};
  default:
    return state;
  }
}
