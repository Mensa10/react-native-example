import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default (initialState: Object) => {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  let composeEnhancers = compose;

  if (__DEV__) {
    const w = window as any
    composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  }

  return createStore(rootReducer, initialState, composeEnhancers(...enhancers));
};
