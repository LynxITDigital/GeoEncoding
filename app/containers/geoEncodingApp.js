'use strict';

import React, {
  Component,
  Navigator,
  BackAndroid
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
import {ExRouter} from 'react-native-router-flux/ExRouter'
import * as styles from './RouterContainerStyles';
import TabBarItem from '../components/TabBarItem';


//import TabBar from '../components/tabBar';

import * as addressActions from '../actions/addressActions';
import * as databaseActions from '../actions/databaseActions';
import * as downloadActions from '../actions/downloadActions';
import * as routerActions from '../actions/routerActions';
import * as accountActions from '../actions/accountActions';
import AddressList from '../components/addressList';
import Favourites from '../components/favourites';
import AddressDetails from '../components/addressDetails';
import Launch from '../components/launch';
import VideoPage from '../components/videoPage';
import LoginPage from '../components/login';
import SignUp from '../components/signUp';
import MyAccount from '../components/myAccount';
import DownloadList from '../components/downloadList';
import FeatureList from '../components/featureList';
//import CameraPage from '../components/cameraPage';

var Orientation = require('react-native-orientation');


const mapStateToProps = state => ({
  addresses : state.addressesByGeoEncoding.addresses,
  favourites : state.addressesByGeoEncoding.favourites,
  searchString : state.addressesByGeoEncoding.searchString,
  downloaded : state.downloadState.downloaded,
  routes : state.routes,
  routerState: state.router.routerState,
  isLoading: state.addressesByGeoEncoding.isLoading,
  isEmpty: state.addressesByGeoEncoding.isEmpty,
  accountState : state.account,
  user : state.account.user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions,
    ...databaseActions,
    ...downloadActions,
    ...accountActions,
  }, dispatch),
  routerActions:  bindActionCreators({
    ...routerActions,
  }, dispatch),
  navActions: Actions
});

// const defaultSchema = {
//   statusStyle: 'light-content',
// };

const favComp = connect(mapStateToProps,mapDispatchToProps)(Favourites);
const addrComp = connect(mapStateToProps,mapDispatchToProps)(AddressList);
const dlComp = connect(mapStateToProps,mapDispatchToProps)(DownloadList);
const featureComp = connect(mapStateToProps,mapDispatchToProps)(FeatureList);
const loginComp = connect(mapStateToProps,mapDispatchToProps)(LoginPage);
const signUpComp = connect(mapStateToProps,mapDispatchToProps)(SignUp);
const myAccountComp = connect(mapStateToProps,mapDispatchToProps)(MyAccount);



class GeoEncodingApp extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

   render(){
     BackAndroid.addEventListener('hardwareBackPress', () => {
            try {
              return Actions.pop();
            }
            catch (err) {
                return false;
            }
        });

      var login = (this.props.user._id == undefined);

     return(
         <Router hideNavBar={true}
             navigationBarStyle={styles.navBarStyle} //Nav Bar Container
             barButtonTextStyle={{color: "#FFF"}} //Text on button e.g. Back
             titleStyle={styles.navTextStyle} //Main Title Text
             barButtonIconStyle={styles.barButtonIconStyle} // E.g. Back button icon
             onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
             onPop={()=>{this.props.routerActions.onPop(); return true}}
             onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
             renderScene={() => { console.log("RENDER SCNENE LOGIN (TAB)");}}
         >
            <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} hideNavBar={false}/>
            <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} hideNavBar={false}/>
            <Schema name="tab" icon={TabBarItem} type="switch" hideNavBar={false} />
            <Schema name="withoutAnimation"/>


            <Route name="tabbar" hideNavBar={true}>
                <Router hideNavBar={true} showNavigationBar={false} footer={TabBar} tabBarStyle={styles.getTabBarStyle(this.props)} sceneStyle={styles.sceneStyle}
                     onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
                     onPop={()=>{this.props.routerActions.onPop(); return true}}
                     onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
                >
                    <Route name="geo"  hideNavBar={true} schema="tab" tabBarItem={{title: 'Geo Encoding'}}>
                      <Router>
                          <Route name="launch"  hideNavBar={false} title="Geo Encoding" schema="default" component={addrComp} initial={true} />
                          <Route name="details"  hideNavBar={false} component={AddressDetails} title="Details" schema="default"/>
                      </Router>
                    </Route>
                    <Route name="favourites" schema="tab" component={favComp} title="Favourites" tabBarItem={{title: 'Favourites'}} />
                    <Route name="video" schema="tab" component={VideoPage} title="Video" tabBarItem={{ title: 'Video'}}/>
                    <Route name="download" schema="tab" component={dlComp} title="Download" tabBarItem={{title: 'Download'}}/>

                    <Route name="more" schema="tab" hideNavBar={false}  tabBarItem={{title: 'More'}} >
                      <Router>
                        <Route name="morePage" component={featureComp} title="More" initial={true}/>
                        <Route name="loginpage" schema="default"  component={loginComp} title="Login" hideNavBar={false} />
                        <Route name="signup" schema="default" component={signUpComp} title="Sign Up" />
                        <Route name="account" schema="modal" component={myAccountComp} title="My Account" showNavigationBar={false} type="replace"/>
                    </Router>
                </Route>
                </Router>
            </Route>
            <Route name="dlvideo" schema="modal" component={VideoPage} title="Downloaded Video"/>
        </Router>

   );
   }

}


// export default connect((state) => (
//   {addressesByGeoEncoding: state.addressesByGeoEncoding,
//   router: Object.assign({},state,{router:state.router}).router}), mapDispatchToProps)(GeoEncodingApp);

 export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
