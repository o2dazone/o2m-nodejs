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
      id: 'smTrack'
    });

    sm.getSoundById('smTrack').play({
      url: this.props.streamUrl
    });
  }

  componentWillReceiveProps(nextState) {
    if (nextState.trackId === this.props.trackId ) {
      sm.getSoundById('smTrack').play({
        url: nextState.streamUrl
      });
    }
  }

  render() {
    return <div />;
  }
}

function mapStateToProps() {
  return { };
}


export default connect(mapStateToProps, { })(AudioModule);
