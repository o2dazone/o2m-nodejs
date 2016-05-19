import styles from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { hashHistory } from 'react-router';
import { playSong } from 'actions/player';
import { appendSearchResults } from 'actions/search';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

class Results extends Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.onScrollSongs = this.onScrollSongs.bind(this);
    this.loadMoreSongs = throttle(this.loadMoreSongs, 1000);
    this.fetching = null;
  }

  componentDidUpdate() {
    // reset fetch event on component update
    this.fetching = null;
  }

  onPlaySong(e) {
    const { playSong, search } = this.props;
    const trackId = e.target.parentNode.dataset.trackid;
    const track = getTrackById(trackId, search.results);
    hashHistory.replace(`search=${search.query}&track=${trackId}`);
    playSong(track);
  }

  loadMoreSongs(e) {
    if (e) {
      const srcEle = e.nativeEvent.srcElement;
      if (srcEle.scrollTop + srcEle.clientHeight > srcEle.scrollHeight - 250) {
        const { search, appendSearchResults } = this.props;
        if (!this.fetching) {
          appendSearchResults(search.query, search.page + 1);
          this.fetching = true;
        }
      }
    }
  }

  onScrollSongs(e) {
    e.persist();
    this.loadMoreSongs(e);
  }

  makeResultsHeader() {
    const { search } = this.props;

    if (search.hasResults) {
      const resultsLength = search.results.length;

      return (
        <span>You found {resultsLength}{resultsLength === (search.page * 50) ? '+' : ''} results for
          <span className={styles.term}>{search.query}</span>
        </span>
      );
    }

    if (search.query) {
      return (
        <span>No results for
          <span className={styles.term}>{search.query}</span>
        </span>
      );
    }
  }

  render() {
    const { search, player } = this.props;
    return (
      <div className={styles.results}>

        <div className={styles.head}>
          {this.makeResultsHeader()}
        </div>

        { search.hasResults ? <SongLegends /> : ''}
        { search.hasResults ? <Songs results={search.results} onScrollSongs={this.onScrollSongs} playingTrack={player.track ? player.track.id : null} onClickTrack={this.onPlaySong} /> : '' }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    player: state.player
  };
}

export default connect(mapStateToProps, { playSong, appendSearchResults })(Results);
