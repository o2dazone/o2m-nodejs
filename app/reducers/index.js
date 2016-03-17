import { combineReducers } from 'redux';
import { routeReducer as router } from 'redux-simple-router';

import { isResultsVisible } from './results';
import search from './search';

const rootReducer = combineReducers({
  isResultsVisible,
  search,
  router
});

export default rootReducer;
