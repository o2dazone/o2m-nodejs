import styles from 'styles/duration.scss';

import { Component } from 'preact';
import { connect } from 'preact-redux';

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
    const { onDurationClicked, playerPercent } = this.props;
    const percent = { width: `${playerPercent}%` };

    return (
      <div className={styles.container} onClick={onDurationClicked}>
        <div style={percent} className={styles.elapsed} data-elapsed>
          <div className={styles.time} data-timer>
            {percent ? this.makeTime() : ''}
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
