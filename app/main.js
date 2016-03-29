import React from 'react';
import { render } from 'react-dom';

import Root from './components/Root.js';
import configureStore from './store/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

render(<Root store={store} />, document.getElementById('app'));
