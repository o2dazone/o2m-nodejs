import React from 'react';

const AlbumArt = ({art}) => {
  const albumArt = (art) ? { backgroundImage: `url(${art}=w120-c-h120-e100)` } : {};

  return (
    <span className="albumart" style={albumArt} />
  );
};

export default AlbumArt;
