import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
// import { authGuardMiddleware } from './middleware/auth';
// eslint-disable-next-line no-console
console.log(`process.env.NODE_ENV - ${process.env.NODE_ENV}`);

export default function configureStore(initialState) {
  if (process.env.NODE_ENV === 'development') {
    return createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunk /* authGuardMiddleware */))
    );
  }
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk /* authGuardMiddleware */))
  );
}
