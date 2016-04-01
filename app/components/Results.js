import styles from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong } from 'actions/player';
import { fetchSearchResults } from 'actions/search';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

class Results extends Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.onScrollSongs = this.onScrollSongs.bind(this);
  }

  componentDidUpdate(nextState) {
    const { results } = this.props.search;
    // set scrollTimeout to false when new results come in
    if (nextState.search.results && results.length !== nextState.search.results.length) {
      this.scrollTimeout = null;
      this.fetching = null;
    }
  }

  static scrollTimeout = null;
  static fetching = null;

  onPlaySong(e) {
    const { playSong, search } = this.props;
    const track = getTrackById(e.target.parentNode.dataset.trackid, search.results);
    playSong(track);
  }

  onScrollSongs(e) {
    if (!self.scrollTimeout) {
      const self = this;
      const { search, fetchSearchResults } = this.props;
      const srcEle = e.nativeEvent.srcElement;
      // firing scroll event
      self.scrollTimeout = setTimeout(function() {
        // its time to load more results
        if (srcEle.scrollTop + srcEle.clientHeight > srcEle.scrollHeight - 400) {
          if (!self.fetching) {
            fetchSearchResults(search.query, search.page + 1);
            self.fetching = true;
          }
        } else {
          // it's not time to load more results, clear the timeout
          self.scrollTimeout = null;
        }
      }, 500);
    }
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

export default connect(mapStateToProps, { playSong, fetchSearchResults })(Results);
