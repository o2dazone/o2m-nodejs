import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { index } from './app';
import search from './search';
import player from './player';

const reducers = {
  index,
  player,
  search
};

const store = createStore(
  combineReducers(reducers),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;