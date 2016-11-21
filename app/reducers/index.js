import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { isResultsVisible } from './results';
import search from './search';
import player from './player';

const rootReducer = combineReducers({
  isResultsVisible,
  player,
  search,
  routerReducer
});

export default rootReducer;
