'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import AddressList from '../components/addressList';
import * as addressActions from '../actions/addressActions';
import { connect } from 'react-redux/native';


class GeoEncodingApp extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { state, dispatch } = this.props;

    console.log("state :" + state);
    // let boundActionCreators = bindActionCreators(addressActions, dispatch)
    return (
      <AddressList
      searchString={state.searchString}
      addresses={state.addresses}
        {...bindActionCreators(addressActions, dispatch)} />
    );
  }
}

export default connect(state => ({
  state: state.addressesByGeoEncoding
}))(GeoEncodingApp);
