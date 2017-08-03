import styles from 'styles/duration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Duration extends Component {
  makeTime() {
    const { player, audioModule } = this.props;
    if (audioModule) {
      const t = (audioModule.position + player.begin) * 0.001;
      const hr =  t / 3600 >> 0;
      const min = (t % 3600) / 60 >> 0;
      const sec = (t % 60) >> 0;

      return ((hr ? hr + ':' : '') + (min ? min + ':' : '0:') + (sec < 10 ? '0' : '') + sec);
    }
  }

  render() {
    const { player, onDurationClicked } = this.props;
    const percent = { width: `${player.percent}%` };

    return (
      <div className={styles.duration} onClick={onDurationClicked}>
        <div style={percent} className={styles.elapsed} data-elapsed>
          <div className={styles.time} data-timer>
            {player.percent ? this.makeTime() : ''}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  const { player } = state;
  return {
    player
  };
};

export default connect(mapStateToProps)(Duration);
