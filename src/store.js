import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { authGuardMiddleware } from './middleware/auth';
console.log("process.env.NODE_ENV - " + process.env.NODE_ENV);

export default function configureStore(initialState) {
    if (process.env.NODE_ENV == 'development') {
        return createStore(rootReducer, initialState, composeWithDevTools(
            applyMiddleware(thunk, /* authGuardMiddleware*/)
        ));
    }
    return createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk, /*authGuardMiddleware*/)
    ));
}