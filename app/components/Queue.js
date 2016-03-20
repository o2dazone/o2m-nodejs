import styles from 'styles/queue.scss';

import React from 'react';
import { connect } from 'react-redux';

import Songs from './Songs';
import SongLegends from './SongLegends';

export default class Queue extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAlbum = this.onClickAlbum.bind(this);
    this.onClickTitle = this.onClickTitle.bind(this);
  }

  onClickAlbum(e) {
    console.log('clicking album');
  }

  onClickTitle(e) {
    console.log('clicking title');
  }

  render() {
    const { queue, player } = this.props;

    return (
      <div className={styles.queue}>
        <div className={styles.head}>
          {queue.tracks ? <span>You have {queue.tracks.length} songs in your queue.</span> : <span>No songs in your queue</span>}
        </div>
        <SongLegends />
        {queue.tracks ? <Songs results={queue.tracks} playingTrack={player.track ? player.track.id : null} onClickTitle={this.onClickTitle} onClickAlbum={this.onClickAlbum} /> : ''}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    queue: state.queue,
    player: state.player
  };
}

export default connect(mapStateToProps, { })(Queue);
