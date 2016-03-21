import styles from 'styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import { playSong } from 'actions/player';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onPlaySong = this.onPlaySong.bind(this);
    this.makeTerm = this.makeTerm.bind(this);
  }

  onPlaySong(e) {
    const track = getTrackById(e.target.parentNode.dataset.trackid, this.props.search.results);
    this.props.playSong(track);
  }

  makeTerm(query) {
    return (
      <span className={styles.term}>{query}</span>
    );
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
