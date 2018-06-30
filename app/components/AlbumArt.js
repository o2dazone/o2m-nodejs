import React from 'react';
import { EMPTY_IMG } from 'constants';
import { Album } from 'icons';
import LazyImage from 'components/LazyImage';

const AlbumArt = ({ art, className, onClickAlbum, size = 50 }) => {
  const albumArt = art ?
    <LazyImage>
      <img
        src={EMPTY_IMG}
        data-src={`${art}=w${size}-c-h${size}-e100`}
        className={className}
        onClick={onClickAlbum}
        width={size}
        height={size} />
    </LazyImage> :
    <Album onClick={onClickAlbum} className={className} color="#444" size={54} />;

  return albumArt;
};

export default AlbumArt;
