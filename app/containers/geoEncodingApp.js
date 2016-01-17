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
// render() {
//     const { state, dispatch } = this.props;
//
//     console.log("state :" + state);
//     // let boundActionCreators = bindActionCreators(addressActions, dispatch)
//     return (
//       <AddressList
//       searchString={state.searchString}
//       addresses={state.addresses}
//         {...bindActionCreators(addressActions, dispatch)}
//         {...bindActionCreators(Actions, dispatch)} />
//     );
//   }

  // render(){
  //      const { state, dispatch } = this.props;
  //      console.log("GeoEncodingApp Render :" + state);
  //
  //   return(<Router>
  //       <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
  //       <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
  //       <Schema name="withoutAnimation" navBar={NavBar}/>
  //       <Schema name="tab" navBar={NavBar}/>
  //
  //       <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
  //
  //   </Router>);
  // }

  // <Router>
  //     <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal}/>
  //     <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
  //     <Schema name="withoutAnimation" navBar={NavBar}/>
  //     <Schema name="tab" navBar={NavBar}/>
  //
  //     <Route name="launch" component={Launch} initial={true} hideNavBar={true} title="Launch"/>
  //     <Route name="register" component={Register} title="Register"/>
  //     <Route name="home" component={Home} title="Home" type="replace"/>
  //     <Route name="login" component={Login} schema="modal"/>
  //     <Route name="register2" component={Register} schema="withoutAnimation"/>
  //     <Route name="error" component={Error} schema="popup"/>
  // </Router>

   render(){
    //  const { state, dispatch } = this.props;
    //  console.log("GeoEncodingApp Render :" + state);

    //  var boundCreators = bindActionCreators(addressActions, dispatch);

     return(<Router>
         <Schema name="modal" sceneConfig={Animations.FloatFromBottom} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FloatFromRight} navBar={NavBar}/>
         <Schema name="right" sceneConfig={Animations.FloatFromRight} navBar={NavBarBack}/>
         <Schema name="withoutAnimation"/>

         <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="right"/>
         <Route name="launch" component={connect(mapStateToProps,mapDispatchToProps)(AddressList)} title="Geo Encoding" hideNavBar={false} initial={true}/>
     </Router>
   );
   }

}

export default connect(state => ({
  state: state.addressesByGeoEncoding
}), mapDispatchToProps)(GeoEncodingApp);

// export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
