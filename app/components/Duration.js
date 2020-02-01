import css from 'styles/duration.scss';

import React from 'react';
import { connect } from 'react-redux';

const Duration = ({ player, audioModule, playerPercent }) => {
  const makeTime = () => {
    if (audioModule) {
      const t = (audioModule.position + player.begin) * 0.001;
      const hr =  t / 3600 >> 0;
      const min = (t % 3600) / 60 >> 0;
      const sec = (t % 60) >> 0;

      return ((hr ? hr + ':' : '') + (min ? min + ':' : '0:') + (sec < 10 ? '0' : '') + sec);
    }
  };

  const percent = { width: `${playerPercent}%` };

  return (
    <div className={css.container}>
      <div style={percent} className={css.elapsed} data-elapsed>
        <div className={css.time} data-timer>
          {percent ? makeTime() : ''}
        </div>
      </div>
    </div>
  );
};

const stateToProps = ({ player }) => ({
  player
});

export default connect(stateToProps, {})(Duration);
