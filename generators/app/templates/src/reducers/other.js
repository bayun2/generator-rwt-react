'use strict';
import { RECEIVE_MAIN_INFO } from '../actions';
let otherObj = {
  logo: 'http://dev.img.investmaster.cn/187c5389-e2b0-4bb0-8d1d-d071af1c6910-1448424653760f1dab321-381d-4af6-b111-df28e05f66f7@720w_1l_70q',
  description: 'other init!'
};

function other(state = otherObj, action) {
  switch (action.type) {
    case RECEIVE_MAIN_INFO:
      return {
        logo: action.activityInfo.logo,
        description: action.activityInfo.description
      }
    default:
      return state;
  }
}

export default other;
