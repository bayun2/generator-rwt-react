'use strict';
import { RECEIVE_MAIN_INFO, CHANGE_REWARD } from '../actions';
let rewardsArr = [];

function rewards(state = rewardsArr, action) {
  switch (action.type) {
    case RECEIVE_MAIN_INFO:
      return action.activityInfo.rewards;
    case CHANGE_REWARD:
      return state.filter((val, idx) => {
        if (idx >= action.index) {
          return true;
        } else {
          return false;
        }
      })
    default:
      return state;
  }
}

export default rewards;
