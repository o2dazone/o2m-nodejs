import React from 'react';
import { connect } from 'react-redux';
import styles from 'styles/duration.scss';

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
  }

  makeTime() {
    const { player } = this.props;
    if (player.obj) {
      const t = player.obj.position * 0.001;
      const hr =  t / 3600 >> 0;
      const th = t % 3600;
      const min = th / 60 >> 0;
      const tm = t % 60;
      const sec = tm >> 0;

      return ((hr > 0 ? hr + ':' : '') + (min > 0 ? (hr > 0 && min < 10 ? '0' : '') + min + ':' : '0:') + (sec < 10 ? '0' : '') + sec);
    }
  }

  render() {
    const { player } = this.props;
    const percent = { width: `${player.percent}%` };

    return (
      <div className={styles.duration}>
        <div style={percent} className={styles.elapsed}>
           <div className={styles.time}>
            {this.makeTime()}
           </div>
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
