import styles from '../styles/songs.scss';


import React from 'react';
import { connect } from 'react-redux';

export default class Songs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { results } = this.props;

    return (
      <div className={styles.songs}>
        {results.map(track => {
          let albumArt;
          if (track.albumArtRef) {
            const artUrl = track.albumArtRef[0].url;
            albumArt = {
              backgroundImage: `url(${artUrl}=w120-c-h120-e100)`
            };
          }


          return (
            <div className={styles.song} key={track.id}>
              <span className={styles.albumart} style={track.albumArtRef ? albumArt : {}} ></span>
              <span className={styles.name}>{track.title}</span>
              <span className={styles.artist}>{track.artist}</span>
              <span className={styles.album}>{track.album}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps() {
  return { };
}

export default connect(mapStateToProps, { })(Songs);
