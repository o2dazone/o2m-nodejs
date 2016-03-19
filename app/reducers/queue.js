import * as actionTypes from 'constants';

export default function queue(state = { hasResults: false }, action) {
  const { type, results } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    return {...state, results, hasResults: results.length ? true : false};
  default:
    return state;
  }
}
