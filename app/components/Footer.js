import styles from '../styles/footer.scss';

import React from 'react';
import { connect } from 'react-redux';

import Info from './Info';
import Player from './Player';
// import Duration from './Duration';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { player } = this.props;
    if (player.track) {
      return (
        <div className={styles.footer}>
          {/* <Duration />*/}
          <Info track={player.track} />
          <Player player={player} />
        </div>
      );
    }

    return (
      <div className={styles.footer}></div>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps, { })(Footer);
