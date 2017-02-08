import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { isResultsVisible } from './results';
import { index } from './app';
import search from './search';
import player from './player';

const rootReducer = combineReducers({
  isResultsVisible,
  index,
  player,
  search,
  routerReducer
});

export default rootReducer;
