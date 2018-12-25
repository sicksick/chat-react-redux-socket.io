import * as types from '../constants/ActionTypes';

export const setTokenToSocketStateAction = token => ({
  type: types.SET_TOKEN_TO_SOCKET,
  payload: {
    token
  }
});

export const setDataAfterAuth = data => ({
  type: types.SET_DATA_AFTER_AUTH,
  payload: {
    roles: data.roles,
    user: {
      email: data.email,
      id: data.id
    },
    login: true,
    socket: data.socket
  }
});

export const changeChat = chatId => ({
  type: types.CHANGE_CHAT,
  payload: {
    chat: chatId
  }
});

export const createChat = usersId => ({
  type: types.CREATE_CHAT,
  payload: {
    usersId
  }
});

export const newMessage = data => ({
  type: types.NEW_MESSAGE,
  payload: data
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
    login: false,
    user: null,
    token: null,
    roles: []
  }
});
