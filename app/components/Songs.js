import styles from 'styles/songs.scss';
import React from 'react';

import AlbumArt from './AlbumArt';

const Songs = ({results, playingTrack, onClickAlbum, onClickTrack, onClickTitle, onClickArtist }) => {
  return (
    <div className={styles.songs}>
      {results.map((track, index) => {
        return (
          <div className={playingTrack === track.id ? `${styles.song} ${styles.playing}` : styles.song} onClick={onClickTrack} key={track.id} data-trackid={track.id}>
            <AlbumArt onClickAlbum={onClickAlbum} art={track.albumArtRef ? track.albumArtRef[0].url : null} />
            <span onClick={onClickTitle} className={styles.name}>{track.title}</span>
            <span onClick={onClickArtist} className={styles.artist}>{track.artist}</span>
            <span onClick={onClickAlbum} className={styles.album}>{track.album}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
