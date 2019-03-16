import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

export default (initialState: Object) => {
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk),
  ];

  return createStore(rootReducer, initialState, compose(...enhancers));
};
