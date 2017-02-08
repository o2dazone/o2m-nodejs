import * as actionTypes from 'constants';

export function index(state = {}, action) {
  const { type, index } = action;

  switch (type) {
  case actionTypes.RECEIVE_INDEX:
    return index;
  default:
    return state;
  }
}
