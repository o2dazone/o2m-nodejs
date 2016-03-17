import * as actionTypes from '../constants';

export default function search(state = { hasResults: false }, action) {
  const { type, results } = action;

  switch (type) {
  case actionTypes.RECEIVE_SEARCH_RESULTS:
    return {...state, results, hasResults: true};
  default:
    return state;
  }
}
