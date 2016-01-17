// 'use strict';
//
// var React = require('react-native');
// var GeoEncoding = require('./app/index');
//
// var {
//   AppRegistry
// } = React;
//
//
// AppRegistry.registerComponent('GeoEncoding', () => GeoEncoding);


'use strict';

import React from 'react-native';
import App from './app/containers/app';

var {
  AppRegistry
} = React;

AppRegistry.registerComponent('GeoEncoding', () => App);
