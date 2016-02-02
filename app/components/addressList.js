import React, {
  StyleSheet,
  Component,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  PropTypes,
  Image,
  AsyncStorage
} from 'react-native';
var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview');
var { createAnimatableComponent, View } = require('react-native-animatable');
const STORAGE_KEY = '@GeoEncoding:address'


import Database from '../database/database';

import globals from '../store/globals';

class AddressList extends Component {

  constructor(props) {
    super(props);
    Database.loadDB();
  }

  componentDidMount() {
      this.loadAddress().done();
      this.debouncedFetch = _.debounce(this.props.actions.fetchAddresses, 500);
  }

  async loadAddress() {
      try {
          let value = await AsyncStorage.getItem(STORAGE_KEY);
          this.props.actions.changeSearchText(value);
      } catch(error) {
          console.log(error);
      }
  }

  onSearchTextChanged(event){
    // Fire change text action
    this.props.actions.changeSearchText(event.nativeEvent.text);

    // Store value in AsyncStorage
    try {
        AsyncStorage.setItem(STORAGE_KEY, event.nativeEvent.text);
    } catch (error){
        console.log(error.message);
    }

    // Call debounced function
    event.persist()
    var address = this.props.searchString;
    this.debouncedFetch(address);
  }

  updateList(){
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

  onFavPressed(address) {
    Database.insertAddress(address);
  }

  renderRow(rowData){
    var address = rowData.formatted_address;
    var imageURI = 'https://maps.googleapis.com/maps/api/streetview?size=800x800&location=' + rowData.geometry.location.lat + ',' + rowData.geometry.location.lng;
    return(
      <TouchableHighlight onPress={this.onRowPressed.bind(this, rowData)}
          underlayColor='#dddddd'>
          <View animation="fadeIn" duration={800} delay={200}>
                <View style={styles.row}>
                    <Text style={styles.address}>{address}</Text>
                    <Image style = {styles.thumb} source = {{uri: imageURI}}/>
                    <Text style={styles.button}
                            onPress={this.onFavPressed.bind(this, address)}>
                            Add to Favourites
                    </Text>
                </View>
                <View style={styles.separator}/>
          </View>
      </TouchableHighlight>
    )
  }

  renderFav(rowData) {
    return(
    <View>
        <Text style={styles.address}>{rowData.address}</Text>
    </View>
   );
  }

  render() {
    console.log("RENDERING")
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
          <ScrollView style={styles.listContainer}>
          <RefreshableListView
            dataSource={addresses}
            renderRow={this.renderRow.bind(this)}
            loadData={this.updateList.bind(this)}
            refreshDescription="Refreshing articles"
          />
          </ScrollView>
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
    inputContainer: {
      marginTop:80,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    listContainer: {
      marginTop:20,
      flexDirection:'column',
      height: 600
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
        fontSize: 14
    }
  });
module.exports = AddressList
