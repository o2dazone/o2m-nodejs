import React from 'react';
import { connect } from 'react-redux';
import { soundManager as sm } from 'soundmanager2';

export default class AudioModule extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    sm.setup({
      'useHTML5Audio': true,
      'preferFlash': false,
      'debugMode': false,
      'forceUseGlobalHTML5Audio': true
    });

    sm.createSound({
      id: 'smTrack',
      onfinish: function() {
        this.props.onNextTrack();
      }
    });
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

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { })(AudioModule);
