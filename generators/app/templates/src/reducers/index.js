import {combineReducers} from 'redux';
import user from './user';
import rewards from './rewards';
import other from './other';

const changeActivityApp = combineReducers({
  user,
  rewards,
  other
})

export default changeActivityApp;
