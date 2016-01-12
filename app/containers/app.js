import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
// import createLogger from 'redux-logger';
import configureStore from '../store/configureStore';

import * as reducers from '../reducers';
import GeoEncodingApp from './geoEncodingApp';

// const logger = createLogger();
const tools = devTools();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
// const store =  createStoreWithMiddleware(reducer);
const store = configureStore();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
       {()=>  <GeoEncodingApp />}
      </Provider>
    );
  }
}
