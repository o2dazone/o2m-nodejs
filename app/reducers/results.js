import * as actionTypes from 'constants';

export function isResultsVisible(state = true, action) {
  const { type, visible } = action;

  switch (type) {
  case actionTypes.TOGGLE_RESULTS:
    return visible;
  default:
    return state;
  }
}
