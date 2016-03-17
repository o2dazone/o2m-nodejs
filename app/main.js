import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.js';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(<App store={store} />, document.getElementById('app'));
