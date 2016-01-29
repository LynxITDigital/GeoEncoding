import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  PropTypes,
  Image
} from 'react-native';
// var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview')


import globals from '../store/globals';

class AddressList extends View {

  constructor(props) {
    super(props);
  }

  onSearchTextChanged(event){
    this.props.actions.changeSearchText(event.nativeEvent.text);
    this.onFindPressed();
    /*
    var debouncedFetch = function(){
        return _.debounce(this.onFindPressed(), 100);
    }
    console.log(debouncedFetch);
    debouncedFetch();
    */
  }

  onFindPressed(){
    this.props.actions.fetchAddresses(this.props.searchString);
  }

  onReplayPressed(){
    this.props.actions.resetState();

    var timeoutIndex = 0
    globals.replayCache.map(function(action){
      if( action.action.type !== 'RESET_STATE'){
        timeoutIndex++;
        var dispatch = action.next;

         setTimeout(() => {
           dispatch(action.action);
         }, 500 * timeoutIndex);
      }
    })
  }

  onRowPressed(rowData){
      //console.log(this.props);
      this.props.navActions.details({data:rowData});

  }

  renderRow(rowData){
    var address = rowData.formatted_address;
    var imageURI = 'https://maps.googleapis.com/maps/api/streetview?size=800x800&location=' + rowData.geometry.location.lat + ',' + rowData.geometry.location.lng;
    return(
      <TouchableHighlight onPress={this.onRowPressed.bind(this, rowData)}
          underlayColor='#dddddd'>
          <View>
                <View style={styles.row}>
                    <Text style={styles.address}>{address}</Text>
                    <Image style = {styles.thumb} source = {{uri: imageURI}}/>
                </View>
                <View style={styles.separator}/>
          </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { searchString,addresses } = this.props;
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.searchInput}
          value= {searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder="Search location"/>

          </View>
          <View style={styles.listContainer}>
          <RefreshableListView
            dataSource={addresses}
            renderRow={this.renderRow.bind(this)}
            loadData={this.onFindPressed.bind(this)}
            refreshDescription="Refreshing articles"
          />
          </View>
        </View>
    );
  }
}
// AddressList.propTypes = {
//   searchString : PropTypes.string,
//   addresses : PropTypes.object,
//   actions : PropTypes.objectOf(PropTypes.func)
// }

  const styles = StyleSheet.create({
    scrollView: {
    height: 600,
  },
    inputContainer: {
      marginTop:10,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    listContainer: {
      marginTop:20,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    searchInput: {
      flex: 1,
      height: 36,
      padding: 4,
      marginLeft : 10,
      marginRight: 10,
      fontSize: 18,
      color: 'gray',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      backgroundColor: '#F5FCFF'
    },
    button:{
      marginLeft : 5,
      padding :5,
      height: 36,
      borderWidth: 1,
      borderColor: '#48BBEC',
      borderRadius: 8,
      backgroundColor:'#48BBEC',
      alignSelf:'stretch',
      justifyContent:'center'
    },
    buttonText:{
      fontSize:18,
      color:'white'
    },
    row:{
      padding :10,
      flexDirection: 'column'

    },separator:{
      height:1,
      backgroundColor:'gray'
  },
  thumb: {
        height: 100,
        marginTop: 10
    },
    address: {
        fontSize: 10
    }
  });
module.exports = AddressList
