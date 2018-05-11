import css from 'styles/duration.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {rootReducers as reducers} from 'reducers';

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
      <div className={css.container} onClick={onDurationClicked}>
        <div style={percent} className={css.elapsed} data-elapsed>
          <div className={css.time} data-timer>
            {percent ? this.makeTime() : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(reducers)(Duration);
