import React from 'react';
import styles from 'styles/info.scss';

import AlbumArt from './AlbumArt';

const Info = ({track}) => {
  return (
    <div className={styles.container}>
      <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
      <span className={styles.name}>{track.title}</span>
      <span className={styles.artistalbum}>{track.artist} {track.album}</span>
    </div>
  );
};

export default Info;
