import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

import Root from 'components/Root';

const store = () => {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  return finalCreateStore(rootReducer, window.__INITIAL_STATE__);
};

render(<Provider store={store()}><Root /></Provider>, document.getElementById('app'));

