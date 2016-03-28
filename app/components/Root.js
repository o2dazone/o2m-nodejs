import React from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'styles/app.scss';

import { fetchSearchResults } from 'actions/search';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { player, store, fetchSearchResults } = this.props;

    const splitter = /\&|\=|\?\_k=\w+/;
    const loc = this.props.location[0].split(splitter);
    switch (true)  {
    case (loc.indexOf('search') === 0):
      fetchSearchResults(loc[loc.indexOf('search') + 1]);
      break;
    default:
      break;
    }

    return (
      <Provider store={store}>
        <div className={styles.wrap}>
          <Header />
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

export default connect(mapStateToProps, { fetchSearchResults })(App);
