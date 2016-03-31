'use strict';
import { RECEIVE_MAIN_INFO } from '../actions';

let userObj = {
  avatar:'http://forexmaster.oss-cn-beijing.aliyuncs.com/fdt_hz%2Fdefault_head_img%402x.png',
  cash:100000,
  code:'你还没有兑换奖品,快去兑换吧',
  exFlag:0,
  leftCash:0,
  school:'未知学校',
  userName: '游客',
  verify:0
}

function user(state = userObj, action) {
  switch (action.type) {
    case RECEIVE_MAIN_INFO:
      return Object.assign({}, state, action.activityInfo.user);
    default:
      return state;
  }
}

export default user;
