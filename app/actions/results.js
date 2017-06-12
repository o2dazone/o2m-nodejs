import { TOGGLE_RESULTS } from 'constants';

export const toggleResults = visible => {
  return {
    type: TOGGLE_RESULTS,
    visible
  };
};
