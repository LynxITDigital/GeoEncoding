'use strict';
import React, { Component,Navigator,Text,StyleSheet } from 'react-native';
import {bindActionCreators} from 'redux';

import { connect } from 'react-redux/native';
// import {
//   actions as routerActions,
//   Route,
//   Router,
//   Schema
// } from 'react-native-router-redux';

import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux'
//import {Router, Route, Animations, Schema, TabBar, Actions} from 'react-native-redux-router';
var {NavBar,NavBarBack, NavBarModal} = require('../components/navBar');

//import TabBar from '../components/tabBar';

import * as addressActions from '../actions/addressActions';
import * as routerActions from '../actions/routerActions';
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
  navActions: Actions
});

const defaultSchema = {
  statusStyle: 'light-content',
};

const favComp = connect(mapStateToProps,mapDispatchToProps)(Favourites);
const addrComp = connect(mapStateToProps,mapDispatchToProps)(AddressList);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
        );
    }
}


class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }
   render(){
     return(<Router hideNavBar={true}>
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
         <Schema name="tab" type="switch" icon={TabIcon} />
         <Schema name="withoutAnimation"/>

         <Route name="tabbar" hideNavBar={true}
           onPush={(route)=>{routerActions.onPush(route.name, this.props.routerState); return true}}
           onPop={()=>{routerActions.onPop(this.props.routerState); return true}}>
             <Router hideNavBar={true} footer={TabBar} tabBarStyle={{borderTopColor:'#00bb00',borderTopWidth:1,backgroundColor:'white'}} >
               <Route name="launch"  schema="tab" component={addrComp} title="Geo Encoding" hideNavBar={false} initial={true}/>
               <Route name="favourites" schema="tab" component={favComp} title="Favourites" hideNavBar={false}  />
               <Route name="video" schema="tab" component={VideoPage} hideNavBar={false} title="Video"/>
             </Router>
          </Route>
          <Route name="favourites2" schema="tab" component={favComp} title="Favourites2" hideNavBar={false}  />
          <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="modal"/>


     </Router>
   );
   }

}


export default connect(state => ({
  state: state.addressesByGeoEncoding
}), mapDispatchToProps)(GeoEncodingApp);

// export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
