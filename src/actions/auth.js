import axios from 'axios';
import * as types from '../constants/ActionTypes';
import { preloaderStartAction, preloaderStopAction } from './common';

export const checkLoginRequestAction = () => ({
  type: types.CHECK_LOGIN_REQUEST
});

export const checkLoginSuccess = (status, data) => ({
  type: types.CHECK_LOGIN_SUCCESS,
  payload: {
    login: true,
    user: data.user,
    token: data.token,
    roles: data.roles
  }
});

export const checkLoginFailed = () => ({
  type: types.CHECK_LOGIN_FAILED,
  payload: {
    login: false
  }
});

export const checkLoginRequest = (dispatch, token) => {
  dispatch(checkLoginRequestAction());
  dispatch(preloaderStartAction());
  return axios
    .get(`/api/user/me?token=${token}`)
    .then(response => {
      dispatch(checkLoginSuccess(true, response.data));
      dispatch(preloaderStopAction());
    })
    .catch(() => {
      localStorage.removeItem('token');

      dispatch(checkLoginFailed(false));
      dispatch(checkLoginRequestAction());
      dispatch(preloaderStopAction());
    });
};

