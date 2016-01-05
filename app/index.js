/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import 'babel/polyfill';

import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk'

import createLogger from 'redux-logger';
import fetchAddresses from './actions/addressActions';
import * as rootReducer from './reducers';

// var ThunkMiddleware = require('redux-thunk')
// var Add = require('./actions/addressActions')
var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');


var {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
  ListView,
  ActivityIndicatorIOS,
  Platform
} = React;

class GeoEncoding extends React.Component{

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });
    this.state={
      dataSource: ds.cloneWithRows([]),
      searchString: '135 city road',
      isLoading:false,
      message:''
    }
  }
  render() {
      var spinner = this.state.isLoading?
        ((Platform.OS==='ios')? <ActivityIndicatorIOS
          hidden='false'
          size = 'large'/>: <ProgressBar styleAttr="Inverse" />):
        (<View/>);

    return (
      <View>
        <View style={styles.inputContainer}>
        <TextInput
        style={styles.searchInput}
        value={this.state.searchString}
        onChange={this.onSearchTextChanged.bind(this)}
        placeholder="Search location"/>

        <TouchableHighlight
        style={styles.button}
        onPress={this.encodeLocation.bind(this)}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>

        <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)} />
        </View>
        {spinner}
      </View>
    );
  }

  renderRow(rowData){
    var address = rowData.formatted_address;
    return(
      <View style={styles.row}>
      <Text>{address}</Text>
      </View>
    )
  }

  onSearchTextChanged(event){
    this.setState({ searchString: event.nativeEvent.text});
  }

  encodeLocation(){
    console.log('SearchString : ' + this.state.searchString);
    var query = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(this.state.searchString);
    this._executeQuery(query);
  }

  _executeQuery(query){
      this.setState({isLoading:true});

      fetch(query)
      .then(results => results.json())
      .then(json => this._handleResponse(json.results))
      .catch(error => this.setState({
        isLoading: false,
        message: 'Failed to load with - ' + error
      }));
  }

  _handleResponse(results){
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.setState({dataSource:dataSource.cloneWithRows(results),isLoading: false, message:''});
  }

};

var styles = StyleSheet.create({
  inputContainer: {
    marginTop:40,
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    marginTop:40,
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor: '#F5FCFF',
  },
  searchInput: {
    height: 36,
    width:300,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#48BBEC'
  },
  button:{
    height: 36,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor:'#48BBEC',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18
  },
  row:{
    height: 40,
    borderWidth:1,
    borderColor:'#fff',

  }
});
module.exports = GeoEncoding;
