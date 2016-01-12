import { createStore, applyMiddleware,combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import * as reducers from '../reducers';
import globals from './globals'

export default function configureStore(initialState) {

  function logger({ getState }) {
    console.log("GetStae : " + getState )
    return (next) => (action) => {
      console.log('will dispatch', action)

      // Call the next dispatch method in the middleware chain.
      let returnValue = next(action)

      console.log('state after dispatch', getState())

      // function replayAsync() {
      //   return dispatch => {
      //     setTimeout(() => {
      //       // Yay! Can invoke sync or async actions with `dispatch`
      //       next(action);
      //     }, 1000);
      //   };
      // }

      var replay = {action:action,next:next};
      globals.replayCache.push(replay);
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }

  const finalCreateStore = compose(
    applyMiddleware(thunk, logger),
    devTools()
  )(createStore);

  const reducer = combineReducers(reducers);
  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
