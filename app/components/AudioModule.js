import { useEffect } from 'react';
import { soundManager as sm } from 'soundmanager2';

const AudioModule = ({ onNextTrack, onPercentUpdate, onSoundCreated, streamUrl }) => {
  useEffect(() => {
    sm.setup({
      'useHTML5Audio': true,
      'preferFlash': false,
      'debugMode': false,
      'forceUseGlobalHTML5Audio': true
    });

    sm.createSound({
      id: 'smTrack',
      onfinish: () => {
        onNextTrack();
      },
      whileplaying: () => {
        onPercentUpdate();
      }
    });

    onSoundCreated(sm.getSoundById('smTrack'));
  }, [onNextTrack, onPercentUpdate, onSoundCreated]);

  useEffect(() => {
    sm.getSoundById('smTrack').play({
      url: streamUrl
    });
  }, [streamUrl]);

  return null;
};

export default AudioModule;