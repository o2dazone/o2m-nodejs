import React from 'react';
import { Album } from 'icons';

const AlbumArt = ({ art, onClickAlbum }) => {
  const albumArt = art ?
    <span onClick={onClickAlbum} className="albumart" style={{backgroundImage: `url(${art}=w120-c-h120-e100)`}} /> :
    <Album onClick={onClickAlbum} className="albumart" color="#444" size={54} />;

  return albumArt;
};

export default AlbumArt;
