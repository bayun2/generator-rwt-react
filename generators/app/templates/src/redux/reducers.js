import {combineReducers} from 'redux';
import merge from 'lodash/merge.js';

const a = (state = {}, action) => {
  if (action.type === 'A_CHANGE') {
    return merge({}, state, action.data);
  }
  return state;
};

const b = (state = 0, action) => {
  if (action.type === 'B_CHANGE') {
    return action.data;
  }
  return state;
};

const c = (state = '', action) => {
  if (action.type === 'C_CHANGE') {
    return action.data;
  }
  return state;
};

const reducers = {
  a,
  b,
  c,
};

export default combineReducers(reducers);
