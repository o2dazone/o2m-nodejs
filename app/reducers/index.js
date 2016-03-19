import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';

import { isResultsVisible } from './results';
import search from './search';
import player from './player';
import queue from './queue';

const rootReducer = combineReducers({
  isResultsVisible,
  player,
  search,
  queue,
  router
});

export default rootReducer;
