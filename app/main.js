import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

const location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

ReactDOM.render(
  <App store={store} location={location} />, document.getElementById('app')
);
