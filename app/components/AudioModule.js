import { Component } from 'react';
import { connect } from 'react-redux';
import { soundManager as sm } from 'soundmanager2';

class AudioModule extends Component {
  componentWillMount() {
    const { onNextTrack, onPercentUpdate, onSoundCreated } = this.props;

    sm.setup({
      'useHTML5Audio': true,
      'preferFlash': false,
      'debugMode': false,
      'forceUseGlobalHTML5Audio': true
    });

    sm.createSound({
      id: 'smTrack',
      onfinish: function() {
        onNextTrack();
      },
      whileplaying: function() {
        onPercentUpdate();
      }
    });

    onSoundCreated(sm.getSoundById('smTrack'));
  }

  componentWillReceiveProps(nextState) {
    sm.getSoundById('smTrack').play({
      url: nextState.streamUrl
    });
  }

  render() {
    return null;
  }
}

export default connect()(AudioModule);
