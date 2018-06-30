import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from 'components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';

const store = () => {
  const finalCreateStore = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);
  return finalCreateStore(rootReducer, window.__INITIAL_STATE__);
};

const renderApp = () => {
  render(
    <Provider store={store()}>
      <AppContainer>
        <App />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept(App, () => {
    renderApp();
  });
}