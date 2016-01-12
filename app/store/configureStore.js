import { createStore, applyMiddleware,combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
// import invariant from 'redux-immutable-state-invariant';
import devTools from 'remote-redux-devtools';
import * as reducers from '../reducers';

export default function configureStore(initialState) {

  const finalCreateStore = compose(
    applyMiddleware(thunk),
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
