import styles from 'styles/results.scss';

import React from 'react';
import { connect } from 'react-redux';

import { playSong } from 'actions/player';
import { addToQueue } from 'actions/queue';
import { getTrackById } from 'helpers';
import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAlbum = this.onClickAlbum.bind(this);
    this.onClickTitle = this.onClickTitle.bind(this);
    this.makeTerm = this.makeTerm.bind(this);
  }

  onClickAlbum(e) {
    const track = getTrackById(e.target.parentNode.dataset.trackid, this.props.search.results);
    this.props.playSong(track);
  }

  onClickTitle(e) {
    const track = getTrackById(e.target.parentNode.dataset.trackid, this.props.search.results);
    this.props.addToQueue(track);
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
          { search.hasResults ? <span>You found {search.results.length} results for {this.makeTerm(search.query)}</span> : ''}
          { search.query && !search.hasResults ? <span>No results for {this.makeTerm(search.query)}</span> : ''}
          { !search.query && !search.hasResults ? <span /> : '' }
          {/* { !search ? <span>Nothing in your queue</span> : '' }*/}
        </div>

        <SongLegends />
        {search.hasResults ? <Songs results={search.results} playingTrack={player.track ? player.track.id : null} onClickTitle={this.onClickTitle} onClickAlbum={this.onClickAlbum} /> : ''}
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

export default connect(mapStateToProps, { playSong, addToQueue })(Results);
