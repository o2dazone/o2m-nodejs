import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import styles from 'styles/app.scss';

import Header from './Header';
import Container from './Container';
import Footer from './Footer';

import { receiveIndex, getSearchData } from 'actions/app';
import { fetchAutoplayTrack } from 'actions/search';

class App extends Component {
  constructor(props) {
    super(props);
    this.searchQuery = null;
    this.getAutoPlayTrack = this.getAutoPlayTrack.bind(this);
  }

  componentWillMount() {
    this.props.getSearchData();
    // this.getAutoPlayTrack();
  }

  getAutoPlayTrack() {
    const splitter = /\&|\=|\?\_k=\w+/;
    const locQuery = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')[0].split(splitter);

    const trackId = (this.isInArray('track', locQuery)) ? locQuery[locQuery.indexOf('track') + 1] : null;
    this.searchQuery = (this.isInArray('search', locQuery)) ? locQuery[locQuery.indexOf('search') + 1] : null;

    if (trackId) {
      this.props.fetchAutoplayTrack(trackId);
    }
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  render() {
    const { player, store } = this.props;

    return (
      <Provider store={store}>
        <div className={styles.wrap}>
          <Header query={this.searchQuery} />
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

export default connect(mapStateToProps, { fetchAutoplayTrack, receiveIndex, getSearchData })(App);
