'use strict';
import $ from 'zepto';

export const GET_REWARDS = 'GET_REWARDS';
export function getRewardsList(rewardsList) {
  return {
    type: GET_REWARDS,
    rewardsList
  }
}

export function fetchToken(url) {
  return (dispatch, getState) => {
    dispatch(requestToken(0, ''));
    window.setToken = function(token) {
      dispatch(receiveToken(1, token))
    }
    location.href = url;
  }
}

export const RECEIVE_MAIN_INFO = 'RECEIVE_MAIN_INFO';
export function receiveMainInfo(activityInfo) {
  return {
    type: RECEIVE_MAIN_INFO,
    activityInfo: activityInfo
  }
}

export const RECEIVE_MAIN_INFO_ERROR = 'RECEIVE_MAIN_INFO_ERROR';
export function receiveMainInfoError(errMsg) {
  return {
    type: RECEIVE_MAIN_INFO_ERROR,
    errMsg: errMsg
  }
}

export function fetchMainInfo() {
  return (dispatch, getState) => {
    $.ajax({
      url: '/data/activity-data.json',
      type:'GET',
      dataType:'json',
      success: function(data) {
        if (data.meta.code === 200) {
          dispatch(receiveMainInfo(data.activityInfo))
        }
      },
      error: function() {
        dispatch(receiveMainInfoError('失败'))
      }
    })
  }
}

export const CHANGE_REWARD = 'CHANGE_REWARD';
export function changeReward(index) {
  return {
    type: CHANGE_REWARD,
    index: index
  }
}
