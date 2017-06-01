import React from 'react';
import { render } from 'react-dom';

import App from './components/App.js';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

render(<App store={store} />, document.getElementById('app'));
