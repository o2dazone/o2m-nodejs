/** @jsx h */
import { render, h } from 'preact';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'preact-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

import App from 'components/App';

const store = () => {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  return finalCreateStore(rootReducer, window.__INITIAL_STATE__);
};

render(<Provider store={store()}><App /></Provider>, document.getElementById('app'));

