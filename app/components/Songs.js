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
          let art;
          if (track.albumArtRef) {
            art = track.albumArtRef[0].url;
          }
          const albumArt = {
            backgroundImage: `url(${art}=w120-c-h120-e100)`
          };

          return (
            <song>
              {track.albumArtRef ? <albumart style={albumArt}></albumart> : <albumart></albumart>}
            </song>
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
