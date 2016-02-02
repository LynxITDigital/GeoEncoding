import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';

import configureStore from '../store/configureStore';
import GeoEncodingApp from './geoEncodingApp';
import CodePush from 'react-native-code-push';

const store = configureStore();
export default class App extends Component {
  componentDidMount(){
    CodePush.sync({ updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE });
  }
  render() {
    return (
      <Provider store={store}>
       {()=>  <GeoEncodingApp />}
      </Provider>
    );
  }
}
