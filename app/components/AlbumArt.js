import React from 'react';
import { Album } from 'icons';

const AlbumArt = ({ art, onClickAlbum, size = 50, customClassName = 'aa' }) => {
  const albumArt = art ?
    <span onClick={onClickAlbum} className={customClassName} style={{backgroundImage: `url(${art}=w${size}-c-h${size}-e100)`}} /> :
    <Album onClick={onClickAlbum} className={customClassName} color="#444" size={54} />;

  return albumArt;
};

export default AlbumArt;
