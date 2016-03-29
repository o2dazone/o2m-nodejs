import styles from 'styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';
import { playSong } from 'actions/player';
import { fetchSearchResults } from 'actions/search';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.makeTerm = this.makeTerm.bind(this);
    this.onScrollSongs = this.onScrollSongs.bind(this);
  }

  componentDidUpdate(nextState) {
    const { results } = this.props.search;
    // set scrollTimeout to false when new results come in
    if (nextState.search.results && results.length !== nextState.search.results.length) {
      this.scrollTimeout = null;
    }
  }

  static scrollTimeout = null;

  onPlaySong(e) {
    const { playSong, search } = this.props;
    const track = getTrackById(e.target.parentNode.dataset.trackid, search.results);
    playSong(track);
  }

  makeTerm(query) {
    return (
      <span className={styles.term}>{query}</span>
    );
  }

  onScrollSongs(e) {
    const self = this;

    if (!self.scrollTimeout) {
      const { search, fetchSearchResults } = this.props;
      const srcEle = e.nativeEvent.srcElement;
      // firing scroll event
      self.scrollTimeout = setTimeout(function() {
        // its time to load more results
        if (srcEle.scrollTop + srcEle.clientHeight > srcEle.scrollHeight - 400) {
          fetchSearchResults(search.query, search.page + 1);
        } else {
          // it's not time to load more results, clear the timeout
          self.scrollTimeout = null;
        }
      }, 1000);
    }
  }

  render() {
    const { search, player } = this.props;
    return (
      <div className={styles.results}>

        <div className={styles.head}>
          { search.hasResults ? <span>You found {search.results.length} results for {this.makeTerm(search.query)}</span> : '' }
          { search.query && !search.hasResults ? <span>No results for {this.makeTerm(search.query)}</span> : '' }
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
