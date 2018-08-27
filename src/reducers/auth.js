import * as types from "../constants/ActionTypes";

const initialState = {
    login: false,
    user: {},
    token: null,
    roles: []
};

export default function auth(state = initialState, action) {
    switch (action.type) {

        case types.CHECK_LOGIN_REQUEST:
            return {...state, ...action.payload};

        case types.CHECK_LOGIN_SUCCESS:
            return {...state, ...action.payload};

        case types.CHECK_LOGIN_FAILED:
            return {...state, ...action.payload};

        default:
            return state;
    }
}