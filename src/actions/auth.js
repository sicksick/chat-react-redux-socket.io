import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { preloaderStartAction, preloaderStopAction, asyncAction} from './common';

export const checkLoginRequest = (dispatch, token) => {
    dispatch(checkLoginRequestAction());
    dispatch(preloaderStartAction());
    return axios.get(`/api/user/me?token=${token}`)
        .then(response => {
            dispatch(checkLoginSuccess(true, response.data));
            dispatch(preloaderStopAction());
        })
        .catch(error => {
            localStorage.removeItem("token");

            dispatch(checkLoginFailed(false));
            dispatch(checkLoginRequestAction());
            dispatch(preloaderStopAction());
        });
};

export const checkLoginRequestAction = () => {
    return {
        type: types.CHECK_LOGIN_REQUEST
    }
};

export const checkLoginSuccess =  (status, data) => {
    return {
        type: types.CHECK_LOGIN_SUCCESS,
        payload: {
            login: true,
            user: data.user,
            token: data.token,
            roles: data.roles
        }
    }
};

export const checkLoginFailed = status => {
    return {
        type: types.CHECK_LOGIN_FAILED,
        payload: {
            login: false
        }
    }
};