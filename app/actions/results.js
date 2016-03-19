import { TOGGLE_RESULTS } from 'constants';

export function toggleResults(visible) {
  return {
    type: TOGGLE_RESULTS,
    visible: visible
  };
}
