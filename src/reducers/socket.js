import * as types from '../constants/ActionTypes';

const initialState = {
  login: false,
  user: {},
  token: null,
  roles: [],
  socket: null
};

export default function socket(state = initialState, action) {
  switch (action.type) {
    case types.SET_TOKEN_TO_SOCKET:
      return { ...state, ...action.payload };

    case types.SET_DATA_AFTER_AUTH:
      return { ...state, ...action.payload };

    case types.CHANGE_CHAT:
      state.socket.emit('chat:change', { id: action.payload.chat });
      return { ...state };

    case types.CREATE_CHAT:
      state.socket.emit('chat:create', { id: action.payload.users_id });
      return { ...state };

    case types.NEW_MESSAGE:
      state.socket.emit('chat:message:new', action.payload);
      return { ...state };

    default:
      return state;
  }
}
