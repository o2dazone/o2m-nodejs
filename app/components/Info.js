import React from 'react';
import styles from '../styles/info.scss';

import AlbumArt from './AlbumArt';


const Info = ({track}) => {
  return (
    <div className={styles.info}>
      <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
      <name>{track.title}</name>
      <artistalbum>{track.artist} {track.album}</artistalbum>
    </div>
  );
};

export default Info;
