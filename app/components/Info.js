import css from 'styles/info.scss';

import React from 'react';
import AlbumArt from './AlbumArt';

const Info = ({track}) => (
  <div className={css.container}>
    <AlbumArt size={100} art={track.albumArtRef ? track.albumArtRef[0].url : null} />
    <span className={css.name}>{track.title}</span>
    <span className={css.artistalbum}>{track.artist} {track.album}</span>
  </div>
);

export default Info;
