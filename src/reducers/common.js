import * as types from '../constants/ActionTypes';

const initialState = {
  preload: false
};

export default function common(state = initialState, action) {
  switch (action.type) {
    case types.PRELOADER_START:
      return {
        ...state,
        preload: true
      };

    case types.PRELOADER_STOP:
      return {
        ...state,
        preload: false
      };

    default:
      return state;
  }
}
