import React from 'react';
import { Provider } from 'react-redux';

import styles from 'styles/app.scss';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <div className={styles.wrap}>
        <Header />
        <Container />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
