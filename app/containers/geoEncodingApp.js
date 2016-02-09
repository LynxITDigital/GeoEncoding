'use strict';
import React, {
  Component,
  Navigator,
  Text,
  StyleSheet,
  View,
  Image,
  Platform
} from 'react-native';
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
import * as databaseActions from '../actions/databaseActions';
import * as routerActions from '../actions/routerActions';
import AddressList from '../components/addressList';
import Favourites from '../components/favourites';
import AddressDetails from '../components/addressDetails';
import Launch from '../components/launch';
import VideoPage from '../components/videoPage';

const mapStateToProps = state => ({
  addresses : state.addressesByGeoEncoding.addresses,
  favourites : state.addressesByGeoEncoding.favourites,
  searchString : state.addressesByGeoEncoding.searchString,
  routes : state.routes,
  routerState: state.router.routerState,
  isLoading: state.addressesByGeoEncoding.isLoading
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions,
    ...databaseActions
  }, dispatch),
  routerActions:  bindActionCreators({
    ...routerActions,
  }, dispatch),
  navActions: Actions
});





const defaultSchema = {
  statusStyle: 'light-content',
};

const favComp = connect(mapStateToProps,mapDispatchToProps)(Favourites);
const addrComp = connect(mapStateToProps,mapDispatchToProps)(AddressList);


const styles = StyleSheet.create({
  tabContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sceneStyle: {
    marginTop: (Platform.OS ==='ios') ? 0 : 56,
  }
});

const tabBarStyle = props => ({
  backgroundColor: '#F9F9F9',

  top: (Platform.OS ==='ios') ? undefined : 56,

  borderTopColor: '#D8D8D8',
  borderTopWidth: 1,
  borderBottomColor: '#D8D8D8',
  borderBottomWidth: 1,
  height: 51,
});

const tabTextStyle = props => ({
  color: props.selected ? '#4da6ff' : '#929292',
  fontSize: (Platform.OS ==='ios') ? 10 : 14,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 4,
});

const tabImageStyle = props => ({
  height: 25,
  resizeMode: 'contain',
  tintColor: props.selected ? '#4da6ff' : '#929292',
  width: 30,
});

const sceneStyle = props => ({
  marginTop: Platform.OS ==='ios' ? 65 : 48,
});

const assets = {
  'home': require('../../assets/thin-0046_home_house.png'),
  'profile': require('../../assets/thin-0091_file_profile_user_personal.png'),
  'video': require('../../assets/thin-0592_tv_televison_movie_news.png'),
};

// class TabIcon extends React.Component {
//     render(){
//         return (
//             <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
//         );
//     }
// }

class TabIcon extends Component {
  render() {
    const { tabItem } = this.props;

    return (
      <View style={styles.tabContainerStyle}>
        {(Platform.OS ==='ios') &&
          tabItem.icon &&
          <Image
            source={tabItem.icon}
            style={tabImageStyle(this.props)}
            />
        }
        {tabItem.title &&
          <Text style={tabTextStyle(this.props)}>{tabItem.title}</Text>
        }
      </View>
    );
  }
}


class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }
   render(){
     return(<Router hideNavBar={true}
       onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
       onPop={()=>{this.props.routerActions.onPop(); return true}}
       onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
       assets={assets}
       >
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBarModal}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar}/>
         <Schema name="tab" icon={TabIcon} type="replace" hideNavBar={false} />
         <Schema name="withoutAnimation"/>

         <Route name="tabbar" hideNavBar={true}>
             <Router hideNavBar={true} footer={TabBar} tabBarStyle={tabBarStyle(this.props)} sceneStyle={styles.sceneStyle}
                     onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
                     onPop={()=>{this.props.routerActions.onPop(); return true}}
                     onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
             >
               <Route name="launch"  schema="tab" component={addrComp} title="Geo Encoding" tabItem={{icon: assets['home'], title: 'Geo Encoding'}}  initial={true} />
               <Route name="favourites" schema="tab" component={favComp} title="Favourites" tabItem={{icon: assets['profile'], title: 'Favourites'}} />
               <Route name="video" schema="tab" component={VideoPage} title="Video" tabItem={{icon: assets['video'], title: 'Video'}}/>
             </Router>
          </Route>
          <Route name="details" component={AddressDetails} hideNavBar={false}  title="Details" schema="modal"/>


     </Router>
   );
   }

}


// export default connect((state) => (
//   {addressesByGeoEncoding: state.addressesByGeoEncoding,
//   router: Object.assign({},state,{router:state.router}).router}), mapDispatchToProps)(GeoEncodingApp);

 export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
