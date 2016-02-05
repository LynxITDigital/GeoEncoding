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
  AsyncStorage,
  TouchableOpacity,
  ToastAndroid,
  Platform
} from 'react-native';
var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview');
var { createAnimatableComponent, View } = require('react-native-animatable');
var Spinner = require('react-native-spinkit');
var Overlay = require('react-native-overlay');
import Toast from './toast.ios';
const STORAGE_KEY = '@GeoEncoding:address'


import Database from '../database/database';

import globals from '../store/globals';

class AddressList extends Component {

  constructor(props) {
    super(props);
    Database.loadDB();

    // Local state to show/hide Toast box
    this.state = {isVisible: false};
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
          // console.log(error);
      }
  }

  hideTopToast() {
      this.setState({isVisible: false});
  }

  onSearchTextChanged(event){
    // Fire change text action
    this.props.actions.changeSearchText(event.nativeEvent.text);

    // Store value in AsyncStorage
    try {
        AsyncStorage.setItem(STORAGE_KEY, event.nativeEvent.text);
    } catch (error){
        // console.log(error.message);
    }

    // Call debounced function
    event.persist()
    var address = this.props.searchString;
    this.debouncedFetch(address, Database);
  }

  updateList(){
    //this.props.actions.fetchAddresses(this.props.searchString);

    var address = this.props.searchString;
    this.debouncedFetch(address, Database);
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
      //// console.log(this.props);
      this.props.navActions.details({data:rowData});
  }

  onFavPressed(rowData) {
      if(Platform.OS ==='ios') {
          this.setState({isVisible: true});
          setTimeout(this.hideTopToast.bind(this), 2000);
      }
      else {
          ToastAndroid.show('Added to favourites', ToastAndroid.SHORT);
      }
      Database.insertAddress(rowData.formatted_address).then(() => {

      });

      //rowData.isFav = true;

  }


  onRemovePressed(rowData) {
      Database.removeFavourite(rowData.formatted_address)
      .then(() => {
        console.log("DELETED.  LOADING FAVS");

      });
    }


  renderRow(rowData, i){
    var address = rowData.formatted_address;
    var imageURI = 'https://maps.googleapis.com/maps/api/streetview?size=800x800&location=' + rowData.geometry.location.lat + ',' + rowData.geometry.location.lng;
    return(
      <TouchableHighlight onPress={this.onRowPressed.bind(this, rowData)}
          underlayColor='#dddddd'>
          <View animation="fadeIn" duration={800} delay={200}>
                <View style={styles.row}>
                    <View style={styles.rowAddress}>
                        <Text style={styles.address}>{address}</Text>

                        <TouchableHighlight onPress={(rowData.isFav) ?  this.onRemovePressed.bind(this, rowData) : this.onFavPressed.bind(this, rowData)} underlayColor='#fff'>
                            <Image style={styles.fav}
                            source= {(rowData.isFav) ? require('../../assets/ic_stat_fav.png') : require('../../assets/ic_stat_notfav.png')}
                            />
                        </TouchableHighlight>
                    </View>
                    <Image style = {styles.thumb}
                           source = {{uri: imageURI}}
                           defaultSource = {require('../../assets/loading_streetview.png')}
                           loadingIndicatorSource = {require('../../assets/loading_streetview.png')} />
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
    const { searchString,addresses } = this.props;

    var scroll = !this.props.isLoading ?
    (<ScrollView style={styles.listContainer}>
                <RefreshableListView
                    dataSource={addresses}
                    renderRow={this.renderRow.bind(this)}
                    loadData={this.updateList.bind(this)}
                    refreshDescription="Refreshing articles"
                    automaticallyAdjustContentInsets = {false}
                />
            </ScrollView>):
    ( <View/> );

    if(Platform.OS ==='ios') {
        var spinner = this.props.isLoading ?
        ( <Spinner
            style = {styles.spinner}
            isVisible = {true}
            size = {50}
            type = 'Pulse'
            color = '#4da6ff' />):
        ( <View/> );
    } else {
        var spinner = this.props.isLoading ?
        ( <Spinner
            style = {styles.spinner}
            isVisible = {true}
            size = {50}
            type = 'ThreeBounce'
            color = '#4da6ff' />):
        ( <View/> );
    }
    // console.log(this.props.isLoading);
    return (
        <View style={styles.pageContainer}>
            <Toast isVisible = {this.state.isVisible} onDismiss = {this.hideTopToast.bind(this)} position = 'top'>
                <View>
                    <Text style = {styles.toastText}>Added to favourites</Text>
                </View>
            </Toast>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.searchInput}
                    value= {searchString}
                    onChange={this.onSearchTextChanged.bind(this)}
                    onSubmitEditing={this.onSearchTextChanged.bind(this)}
                    placeholder="Search location"/>
            </View>
            {spinner}
            {scroll}
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
    pageContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    inputContainer: {
      marginTop:80,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    toastText: {
        color: '#777777',
        padding: 15,
        backgroundColor: 'transparent',
        fontSize: 14
    },
    spinner: {
        marginTop: 40,
        alignSelf: 'center'
    },
    listContainer: {
      flex:1,
      marginTop:20,
      flexDirection:'column',
      marginBottom:50
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
      padding :5,
      height: 26,
      color: 'white',
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
    rowAddress:{
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'

    },
    address: {
        fontSize: 14,
        alignSelf: 'center'
    },
    fav: {
      alignSelf: 'center',
      width: 25,
      height: 25
    }
  });
module.exports = AddressList
