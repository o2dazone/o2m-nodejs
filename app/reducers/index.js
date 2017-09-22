import { combineReducers } from 'redux';

import { index } from './app';
import search from './search';
import player from './player';

const rootReducer = combineReducers({
  index,
  player,
  search
});

export default rootReducer;
