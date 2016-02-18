import { createStore, applyMiddleware,combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import globals from './globals';
import createLogger from 'redux-logger';

const loggerMiddleWare = createLogger();

export default function configureStore(initialState) {

  const finalCreateStore = compose(
    applyMiddleware(thunk)
  )(createStore);

  const reducer = combineReducers(reducers);
  const store = finalCreateStore(reducer, initialState);

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers');
  //     store.replaceReducer(nextReducer);
  //   });
  // }

  return store;
}
