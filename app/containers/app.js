import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';

import configureStore from '../store/configureStore';
import GeoEncodingApp from './geoEncodingApp';

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
