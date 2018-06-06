/** @jsx h */

import { h } from 'preact';
import { hot } from 'react-hot-loader';
import App from 'components/App.js';

const Root = () => <App />;

export default hot(module)(Root);