'use strict';

import React, {
  Component,
  Navigator,
  BackAndroid,
  View
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
import Drawer from 'react-native-drawer'



//import TabBar from '../components/tabBar';

import * as addressActions from '../actions/addressActions';
import * as databaseActions from '../actions/databaseActions';
import * as downloadActions from '../actions/downloadActions';
import * as routerActions from '../actions/routerActions';
import AddressList from '../components/addressList';
import Favourites from '../components/favourites';
import AddressDetails from '../components/addressDetails';
import Launch from '../components/launch';
import VideoPage from '../components/videoPage';
import DownloadList from '../components/downloadList';
import AddressDrawer from '../components/addressDrawer';
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
  isEmpty: state.addressesByGeoEncoding.isEmpty
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions,
    ...databaseActions,
    ...downloadActions
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



class GeoEncodingApp extends Component {
    constructor(props) {
        super(props);

        // Drawer state
        this.state = {drawerOpen: false}
    }

    componentDidMount() {
        Orientation.lockToPortrait();
    }

  closeControlPanel() {
    this.drawer.close()
  }
  openControlPanel() {
    this.drawer.open()
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

     return(
       <Drawer
        ref="drawer"
        content={<AddressDrawer/>}
        openDrawerOffset={.55}
        panCloseMask={.55}
        styles={{main: {shadowColor: "#000000", shadowOpacity: 0.4, shadowRadius: 3}}}
        tweenHandler={Drawer.tweenPresets.parallax}
        negotiatePan={true}
        captureGestures={this.state.drawerOpen}
        onOpen={()=>{this.setState({drawerOpen: true})}}
        onClose={()=>{this.setState({drawerOpen: false})}}
        >
           <Router hideNavBar={true}
               navigationBarStyle={styles.navBarStyle} //Nav Bar Container
               barButtonTextStyle={{color: "#000"}} //No Effect?
               titleStyle={styles.navTextStyle} //Main Title Text
               barButtonIconStyle={styles.barButtonIconStyle} // E.g. Back button
               onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
               onPop={()=>{this.props.routerActions.onPop(); return true}}
               onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
           >
              <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} hideNavBar={false}/>
              <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} hideNavBar={false}/>
              <Schema name="tab" icon={TabBarItem} type="replace" hideNavBar={false} />
              <Schema name="withoutAnimation"/>

              <Route name="tabbar" hideNavBar={true}>
                  <Router hideNavBar={true} footer={TabBar} tabBarStyle={styles.getTabBarStyle(this.props)} sceneStyle={styles.sceneStyle}
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
                      <Route name="download" schema="tab" component={dlComp} hideNavBar={false} title="Download" tabBarItem={{title: 'Download'}}/>
                  </Router>
              </Route>
              <Route name="dlvideo" schema="modal" component={VideoPage} title="Downloaded Video"/>
          </Router>
      </Drawer>
   );
   }

}


// export default connect((state) => (
//   {addressesByGeoEncoding: state.addressesByGeoEncoding,
//   router: Object.assign({},state,{router:state.router}).router}), mapDispatchToProps)(GeoEncodingApp);

 export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
