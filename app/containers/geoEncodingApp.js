'use strict';
import React, { Component,Navigator } from 'react-native';
import {bindActionCreators} from 'redux';

import { connect } from 'react-redux/native';
// import {
//   actions as routerActions,
//   Route,
//   Router,
//   Schema
// } from 'react-native-router-redux';

// import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import {Router, Route, Container, Animations, Schema, Actions} from 'react-native-redux-router';
var {NavBar,NavBarBack, NavBarModal} = require('../components/navBar');

import * as addressActions from '../actions/addressActions';
import AddressList from '../components/addressList';
import AddressDetails from '../components/addressDetails';
import Launch from '../components/launch';
import VideoPage from '../components/videoPage';

const mapStateToProps = state => ({
  addresses : state.addressesByGeoEncoding.addresses,
  searchString : state.addressesByGeoEncoding.searchString,
  routes : state.routes
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions
  }, dispatch),
  navActions:bindActionCreators({
    ...Actions
  }, dispatch)
});

const defaultSchema = {
  statusStyle: 'light-content',
};

class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }
   render(){
     return(<Router>
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
         <Schema name="withoutAnimation"/>

         <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="modal"/>
         <Route name="launch" component={connect(mapStateToProps,mapDispatchToProps)(AddressList)} title="Geo Encoding" hideNavBar={false} initial={true}/>
         <Route name="video" component={VideoPage} hideNavBar={false} title="Video"/>
     </Router>
   );
   }

}

export default connect(state => ({
  state: state.addressesByGeoEncoding
}), mapDispatchToProps)(GeoEncodingApp);

// export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
