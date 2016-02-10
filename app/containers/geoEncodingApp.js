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
import * as assets from '../../assets';


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

//leftButtonStyle={{width: 0}} barButtonTextStyle={{color: "#090"}}

     return(<Router hideNavBar={true}
       navigationBarStyle={styles.navBarStyle} //Nav Bar Container
       barButtonTextStyle={{color: "#090"}} //No Effect?
       //style={{backgroundColor: "#090"}} //Behing Nav Bar / Behind Tab Bar
       //sceneStyle={{backgroundColor: "#090"}} //Entire background

       titleStyle={styles.navTextStyle} //Main Title Text
       barButtonIconStyle={styles.barButtonIconStyle} // E.g. Back button
       onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
       onPop={()=>{this.props.routerActions.onPop(); return true}}
       onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
       >
         <Schema name="modal" sceneConfig={Animations.FlatFloatFromRight} hideNavBar={false}/>
         <Schema name="default" sceneConfig={Animations.FlatFloatFromRight}/>
         <Schema name="tab" icon={TabBarItem} type="replace" hideNavBar={false} />
         <Schema name="withoutAnimation"/>

         <Route name="tabbar" hideNavBar={true} >
             <Router hideNavBar={true} footer={TabBar} tabBarStyle={styles.getTabBarStyle(this.props)} sceneStyle={styles.sceneStyle}
                     onPush={(route)=>{this.props.routerActions.onPush(route.name); return true}}
                     onPop={()=>{this.props.routerActions.onPop(); return true}}
                     onReplace={(route)=>{this.props.routerActions.onReplace(route.name); return true}}
             >

               <Route name="launch"  schema="tab" component={addrComp} title="Geo Encoding" tabBarItem={{icon: assets.home, title: 'Geo Encoding'}}  initial={true} />
               <Route name="favourites" schema="tab" component={favComp} title="Favourites" tabBarItem={{icon: assets.favourites, title: 'Favourites'}} />
               <Route name="video" schema="tab" component={VideoPage} title="Video" tabBarItem={{icon: assets.video, title: 'Video'}}/>
               <Route name="download" schema="tab" component={dlComp} title="Download" tabBarItem={{icon: assets.download, title: 'Download'}}/>
             </Router>
          </Route>
          <Route name="details" component={AddressDetails}  title="Details" schema="modal"/>
          <Route name="dlvideo" schema="modal" component={VideoPage}  title="Downloaded Video"/>


     </Router>
   );
   }

}


// export default connect((state) => (
//   {addressesByGeoEncoding: state.addressesByGeoEncoding,
//   router: Object.assign({},state,{router:state.router}).router}), mapDispatchToProps)(GeoEncodingApp);

 export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
