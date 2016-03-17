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
          return (
            <p key={track.id}>{track.artist}</p>
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
