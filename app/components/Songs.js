import styles from 'styles/songs.scss';
import React from 'react';

import AlbumArt from './AlbumArt';

const Songs = ({results, playingTrack, onClickTrack }) => {
  return (
    <div className={styles.songs}>
      {results.map((track) => {
        return (
          <div className={playingTrack === track.id ? styles.playing : null} onClick={onClickTrack} key={track.id} data-trackid={track.id}>
            <div className={styles.eq} />
            <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
            <span className={styles.title}>{track.title}</span>
            <span className={styles.artist}>{track.artist}</span>
            <span className={styles.album}>{track.album}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
