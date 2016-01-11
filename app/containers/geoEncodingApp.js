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

import {Router, Route, Schema, Animations, TabBar} from 'react-native-router-flux'
import * as addressActions from '../actions/addressActions';
import AddressList from '../components/addressList';
import AddressDetails from '../components/addressDetails';

const mapStateToProps = state => ({
  state: state.addressesByGeoEncoding,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...addressActions,
  }, dispatch),
  dispatch,
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
//         {...bindActionCreators(addressActions, dispatch)} />
//     );
//   }

   render(){
     const { state, dispatch } = this.props;
     console.log("state :" + state);



     var boundCreators = bindActionCreators(addressActions, dispatch);

     return(<Router hideNavBar={true} >
         <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
         <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
         <Schema name="withoutAnimation"/>

         <Route name="details" component={AddressDetails} title="Details" type="modal"/>
         <Route name="launch" component={connect(mapStateToProps)(AddressList)}
                     searchString={state.searchString}
                     addresses={state.addresses}
                     {...boundCreators}
                     wrapRouter={false} title="Geo Encoding" hideNavBar={true}  initial={true}/>
     </Router>
   );
   }

}

export default connect(state => ({
  state: state.addressesByGeoEncoding
}))(GeoEncodingApp);

// export default connect(mapStateToProps, mapDispatchToProps)(GeoEncodingApp);
