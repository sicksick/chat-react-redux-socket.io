import * as types from "../constants/ActionTypes";

const initialState = {
    login: false,
    user: {},
    token: null,
    roles: []
};

export default function socket(state = initialState, action) {
    switch (action.type) {

        case types.SET_TOKEN_TO_SOCKET:
            return {...state, ...action.payload};

        case types.SET_DATA_AFTER_AUTH:
            return {...state, ...action.payload};

        default:
            return state;
    }
}