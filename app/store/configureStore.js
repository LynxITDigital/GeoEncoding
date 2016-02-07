import { createStore, applyMiddleware,combineReducers, compose } from 'redux';
import {routerReducer} from 'react-native-redux-router';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import globals from './globals';
import createLogger from 'redux-logger';

const loggerMiddleWare = createLogger();

export default function configureStore(initialState) {

  function logger({ getState }) {
    return (next) => (action) => {

      if(action){
        // console.log('Middleware - will dispatch action :', action)

        // Call the next dispatch method in the middleware chain.
        let returnValue = next(action)

        // console.log('Middleware - state after dispatch :', getState())

        var replay = {action:action,next:next};
        globals.replayCache.push(replay);
        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
      }
      return
    }
  }

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
