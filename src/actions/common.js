import * as types from '../constants/ActionTypes';

export const preloaderStartAction = () => ({
  type: types.PRELOADER_START
});

export const preloaderStopAction = () => ({
  type: types.PRELOADER_STOP
});

export const asyncAction = () => dispatch => dispatch(preloaderStartAction());

export const asyncActionPreloaderStopAction = () => dispatch => dispatch(preloaderStopAction());
