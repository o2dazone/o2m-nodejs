import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'styles/app.scss';
import 'roboto-fontface/css/roboto-fontface.scss';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

class App extends Component {
  render() {
    const { player, store } = this.props;

    const splitter = /\&|\=|\?\_k=\w+/;
    const loc = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')[0].split(splitter);

    return (
      <Provider store={store}>
        <div className={styles.wrap}>
          <Header query={loc[loc.indexOf('search') + 1]} />
          <Container />
          { player.track ? <Footer /> : '' }
        </div>
      </Provider>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps)(App);
