import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';
var Actions = require('react-native-router-flux').Actions;

// import { createStore, combineReducers } from 'redux';
// import * as reducers from '../reducers';
// const reducer = combineReducers(reducers);
// var store = createStore(reducer);

import globals from '../store/globals';


export default class AddressList extends Component {

  constructor(props) {
    super(props);
  }

  onSearchTextChanged(event){
    this.props.actions.changeSearchText(event.nativeEvent.text);
  }

  onFindPressed(){
    this.props.actions.fetchAddresses(this.props.searchString);
  }

  onReplayPressed(){
    this.props.actions.resetState();

    var timeoutIndex = 0
    globals.replayCache.map(function(action){
      if( action.action.type !== 'RESET_STATE'){
        console.log("Run Replay Action : " + action.action.type);
        timeoutIndex++;
        var dispatch = action.next;

         setTimeout(() => {
           dispatch(action.action);
         }, 300 * timeoutIndex);
      }
    })
  }

  onRowPressed(rowData){
      var routerAction = function(){
        Actions.details({data:rowData});
      }
      this.props.actions.rowPress(routerAction)
  }

  renderRow(rowData){
    var address = rowData.formatted_address;
    return(
      <TouchableHighlight onPress={()=>this.onRowPressed(rowData)}
          underlayColor='#dddddd'>
        <View style={styles.row}>
        <Text>{address}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { searchString,addresses } = this.props;
    console.log("Render Address List with : " + searchString);

    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.searchInput}
          value= {searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder="Search location"/>

          <TouchableHighlight
          style={styles.button}
          onPress={this.onFindPressed.bind(this)}>
            <Text style={styles.buttonText}>Find</Text>
          </TouchableHighlight>

          <TouchableHighlight
          style={styles.button}
          onPress={this.onReplayPressed.bind(this)}>
            <Text style={styles.buttonText}>Replay</Text>
          </TouchableHighlight>

        </View>
        <View style={styles.listContainer}>
          <ListView
          dataSource={addresses}
          renderRow={this.renderRow.bind(this)} />
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    inputContainer: {
      marginTop:80,
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
      width:250,
      padding: 4,
      marginRight: 5,
      fontSize: 18,
      color: 'gray',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8

    },
    button:{
      marginLeft : 10,
      height: 36,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      backgroundColor:'#48BBEC',
      alignSelf:'stretch',
      justifyContent:'center'
    },
    buttonText:{
      fontSize:18,
      color:'brown'
    },
    row:{
      height: 40,
      borderWidth:1,
      borderColor:'#fff',

    }
  });
