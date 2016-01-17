import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  RecyclerViewBackedScrollView
} from 'react-native';
// var Actions = require('react-native-router-flux').Actions;
var {Actions} = require('react-native-redux-router');

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
         }, 500 * timeoutIndex);
      }
    })
  }

  onRowPressed(rowData){
      console.log("RowPressed : " + this.props);
      Actions.details({data:rowData});
  }

  renderRow(rowData){
    var address = rowData.formatted_address;
    return(
      <TouchableHighlight onPress={()=>this.onRowPressed(rowData)}
          underlayColor='#dddddd'>
<View>
        <View style={styles.row}>
        <Text>{address}</Text>
        </View>
        <View style={styles.separator}/>
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
          renderRow={this.renderRow.bind(this)}

          />
        </View>
      </View>
    );
  }
}

  const styles = StyleSheet.create({
    scrollView: {
    height: 600,
  },
    inputContainer: {
      marginTop:10,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch',
      backgroundColor: '#F5FCFF',
    },
    listContainer: {
      marginTop:20,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch',
      backgroundColor: '#F5FCFF',
    },
    searchInput: {
      height: 36,
      width:220,
      padding: 4,
      marginLeft : 10,
      marginRight: 5,
      fontSize: 18,
      color: 'gray',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8

    },
    button:{
      marginLeft : 5,
      padding :5,
      height: 36,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      backgroundColor:'#097591',
      alignSelf:'stretch',
      justifyContent:'center'
    },
    buttonText:{
      fontSize:18,
      color:'white'
    },
    row:{
      padding :10,
      height: 50,

    },separator:{
      height:1,
      backgroundColor:'gray'
    }
  });
