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

//import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux'
import {Router, Route, Animations, Schema, TabBar, Actions} from 'react-native-redux-router';
var {NavBar,NavBarBack, NavBarModal} = require('../components/navBar');

//import TabBar from '../components/tabBar';

import * as addressActions from '../actions/addressActions';
import AddressList from '../components/addressList';
import Favourites from '../components/favourites';
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


class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>title</Text>
        );
    }
}


class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }
  // <Route name="tabbar" >
  //     <Router footer={TabBar} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}}>
  //        <Route name="launch-tab" schema="tab" component={connect(mapStateToProps,mapDispatchToProps)(AddressList)} title="Geo Encoding" hideNavBar={false} initial={true}/>
  //     </Router>
  //  </Route>
   render(){
     return(<Router>
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
         <Schema name="tab" type="switch" icon={TabIcon} />
         <Schema name="withoutAnimation"/>

         <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="modal"/>
         <Route name="launch" component={connect(mapStateToProps,mapDispatchToProps)(AddressList)} title="Geo Encoding" hideNavBar={false} initial={true}/>
         <Route name="favourites" component={connect(mapStateToProps,mapDispatchToProps)(Favourites)} title="Favourites" hideNavBar={false} />
         <Route name="video" component={VideoPage} hideNavBar={false} title="Video"/>



     </Router>
   );
   }

}

export default connect(state => ({
  state: state.addressesByGeoEncoding
}), mapDispatchToProps)(GeoEncodingApp);

// export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
