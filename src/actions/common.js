import * as types from '../constants/ActionTypes';

export const preloaderStartAction = () => ({
    type: types.PRELOADER_START
});

export const preloaderStopAction = () => ({
    type: types.PRELOADER_STOP
});

export const asyncAction = () => {
    return (dispatch) => {
         return dispatch(preloaderStartAction())
    }
};