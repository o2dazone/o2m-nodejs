import { render } from 'preact';
import store from 'store';
import { Provider } from 'preact-redux';
import App from 'components/App.js';

if (module.hot) {
  document.getElementById('app').innerHTML = '';
  module.hot.accept();
}

render(<Provider store={store()}><App /></Provider>, document.getElementById('app'));
