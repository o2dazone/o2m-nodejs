import React from 'react';
import styles from 'styles/landing.scss';
import AlbumArt from './AlbumArt';


const Landing = ({latest}) => {
  return (
    <div className={styles.container}>
      {latest.map(track => {
        const { id, albumArtRef, artist, album } = track;
        return (
          <div key={id} data-id={id}>
            <AlbumArt art={albumArtRef ? albumArtRef[0].url : null} size={500} customClassName={styles.art} />

            <div className={styles.info}>
              <p>{artist}</p>
              <p>{album}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Landing;
