import styles from '../styles/songs.scss';
import React from 'react';

import AlbumArt from './AlbumArt';

const Songs = ({results, playingTrack, onPlaySong}) => {
  console.log(playingTrack);
  return (
    <div className={styles.songs}>
      {results.map(track => {
        return (
          <div className={playingTrack === track.id ? `${styles.song} ${styles.playing}` : styles.song} onClick={onPlaySong} key={track.id} data-trackid={track.id}>
            <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
            <span className={styles.name}>{track.title}</span>
            <span className={styles.artist}>{track.artist}</span>
            <span className={styles.album}>{track.album}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
