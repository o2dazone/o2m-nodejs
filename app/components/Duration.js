import React from 'react';
import { connect } from 'react-redux';
import styles from 'styles/duration.scss';

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { player } = this.props;
    const percent = { width: `${player.percent}%` };

    return (
      <div className={styles.duration}>
        <div style={percent} className={styles.elapsed}>
          {/* <div className={styles.time} />*/}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps, { })(Duration);
