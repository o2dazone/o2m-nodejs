import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import { MATCH_HASH, SPLIT_URL_PARAM } from 'constants';

import styles from 'styles/app.scss';

import Header from './Header';
import Results from './Results';
import Landing from './Landing';
import Footer from './Footer';
import LoadingIcon from './LoadingIcon';

import { receiveIndex, getSearchData } from 'actions/app';
import { receiveAutoplayTrackId } from 'actions/player';

class App extends Component {
  constructor(props) {
    super(props);
    this.searchQuery = null;
    this.locQuery = null;
    this.latest = [];
    this.getParam = this.getParam.bind(this);
    this.getLatest = this.getLatest.bind(this);
  }

  componentWillMount() {
    this.props.getSearchData();
    this.locQuery = window.location.hash.replace(MATCH_HASH, '').split('/')[0].split(SPLIT_URL_PARAM);
  }

  componentDidMount() {
    const { getParam, props: { receiveAutoplayTrackId } } = this;
    const searchParam = getParam('search');
    const trackIdParam = getParam('track');

    if (searchParam) {
      this.searchQuery = decodeURI(searchParam);
    }

    if (trackIdParam) {
      receiveAutoplayTrackId(trackIdParam);
    }
  }

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  }

  getParam(key) {
    const { isInArray, locQuery } = this;
    return isInArray(key, locQuery) ? locQuery[locQuery.indexOf(key) + 1] : null;
  }

  getLatest() {
    const { index: { tracks } } = this.props;
    const keys = Object.keys(tracks);
    keys.sort((a, b) => {
      return tracks[b].lastModifiedTimestamp - tracks[a].lastModifiedTimestamp;
    });

    let prev = 'ASDASDASDASDASDASDASDASDASD';

    for (let i = 0; this.latest.length < 20; i++) {
      const track = tracks[keys[i]];

      if (track.album !== prev && track.albumArtRef) {
        track.id = keys[i];
        this.latest.push(track);
        prev = track.album;
      }
    }
  }

  render() {
    const { player, store, search, index } = this.props;

    if (!Object.keys(index).length) {
      return <LoadingIcon />;
    }

    this.getLatest();

    return (
      <Provider store={store}>
        <div className={styles.container}>
          <Header query={this.searchQuery} />
          { search.showLanding ? <Landing latest={this.latest} /> : <Results /> }
          { player.track || player.autoplay ? <Footer /> : '' }
        </div>
      </Provider>
    );
  }
}


const mapStateToProps = state => {
  const { player, index, search } = state;
  return {
    player,
    search,
    index
  };
};

export default connect(mapStateToProps, { receiveAutoplayTrackId, receiveIndex, getSearchData })(App);
