/** @jsx h */

import { h } from 'preact';
import { Album } from 'icons';

const AlbumArt = ({ art, className, onClickAlbum, size = 50 }) => {
  const albumArt = art ?
    <span onClick={onClickAlbum} className={className} style={{backgroundImage: `url(${art}=w${size}-c-h${size}-e100)`}} /> :
    <Album onClick={onClickAlbum} className={className} color="#444" size={54} />;

  return albumArt;
};

export default AlbumArt;
