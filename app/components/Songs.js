import styles from 'styles/songs.scss';
import React from 'react';

import AlbumArt from './AlbumArt';

function makeTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

const Songs = ({results, playingTrack, onClickTrack }) => {
  return (
    <div className={styles.container}>
      {results.map((track) => {
        return (
          <div className={playingTrack === track.id ? styles.playing : null} onClick={onClickTrack} key={track.id} data-trackid={track.id}>
            <AlbumArt art={track.albumArtRef ? track.albumArtRef[0].url : null} />
            <div>
              <div>{track.title}</div>
              <div>{`${track.artist}${track.album ? ' · ' + track.album : ''}`}</div>
              <div>{makeTime(track.durationMillis)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Songs;
