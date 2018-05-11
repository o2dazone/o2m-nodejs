import * as appActions from 'actions/app';
import * as playerActions from 'actions/player';
import * as searchActions from 'actions/search';

const allActions = {};

[appActions, playerActions, searchActions].forEach(a => {
  Object.keys(a).forEach(c => {
    if (allActions[c]) {
      throw `duplicate action ${c}`;
    } else {
      allActions[c] = a[c];
    }
  });
});

module.exports = allActions;