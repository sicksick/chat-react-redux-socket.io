import { combineReducers } from 'redux';
import auth from './auth';
import common from './common';
import socket from './socket';

const rootReducer = combineReducers({
  auth,
  common,
  socket
});

export default rootReducer;
