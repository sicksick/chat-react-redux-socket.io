import { checkLoginRequest } from '../actions/auth';

function select(state) {
  return state.auth.login;
}

export const authGuardMiddleware = store => next => action => {
  const token = localStorage.getItem('token');
  const login_status = select(store.getState());

  if (login_status === false && !token) {
    window.location.replace('/');
  }

  if (login_status === false && token) {
    checkLoginRequest(store.dispatch, token);
  }

  return next(action);
};
