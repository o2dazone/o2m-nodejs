import styles from 'styles/results.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playSong } from 'actions/player';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

class Results extends Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
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
    playSong(track);
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
        { search.hasResults ? <Songs results={search.results} playingTrack={player.track ? player.track.id : null} onClickTrack={this.onPlaySong} /> : '' }
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

export default connect(mapStateToProps, { playSong })(Results);
