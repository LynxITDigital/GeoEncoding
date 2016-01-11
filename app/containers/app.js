import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux/native';
import thunk from 'redux-thunk';
// import createLogger from 'redux-logger';

import * as reducers from '../reducers';
import GeoEncodingApp from './geoEncodingApp';

// const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
       {()=>  <GeoEncodingApp />}
      </Provider>
    );
  }
}
