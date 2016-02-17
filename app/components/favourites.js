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
  Image,
  Button,
  Platform,
  ToastAndroid
} from 'react-native';
// var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview')
var Icon = require('react-native-vector-icons/FontAwesome');
var SGListView = require('react-native-sglistview');
import Toast from './toast.ios';

import Database from '../database/database';

import globals from '../store/globals';

class Favourites extends Component {

  constructor(props) {
    super(props);
    this.favDataSource = new ListView.DataSource( {
        rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {toastText: '',isVisible: false};

    // Early binding
    this.renderFav = this.renderFav.bind(this)
    this.hideToast = this.hideToast.bind(this)
  }

  componentDidMount() {
    Database.loadDB().then((db) => {
      //this.loadFavourites();
      // // console.log(Database);
        this.props.actions.fetchFavourites(Database);
    });
  }

  loadFavourites() {
    var favs = Database.getFavourites();
    this.favDataSource.cloneWithRows(favs);
  }

  onRemovePressed(addressID, i) {
    let message = "Removed";
    if(Platform.OS ==='ios') {
        this.setState({toastText: message});
        this.setState({isVisible: true});
        setTimeout(this.hideToast, 800);
    }
    else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    this.props.actions.removeFavourite(Database, addressID, i, this.props.addresses._dataBlob.s1);
  }

  hideToast() {
      if(this.props.routerState[0] == 'favourites'){
          this.setState({isVisible: false});
      }
  }

  renderFav(rowData, i, j) {
    return(
        <View>
            <Toast isVisible = {this.state.isVisible} onDismiss = {this.hideTopToast} position = 'top'>
                <View>
                    <Text style = {styles.toastText}>{this.state.toastText}</Text>
                </View>
            </Toast>
            <View style={styles.rowAddress}>
                <View style={styles.addressWrap}>
                    <Text style={styles.address}>
                        {rowData.address}
                    </Text>
                </View>
                <TouchableHighlight onPress={this.onRemovePressed.bind(this, rowData.id, j)} underlayColor='#fff'>
                    <Icon name = "times" size = {20} color = "rgba(200,0,0,1)" style = {styles.button} allowFontScaling={false}/>
                </TouchableHighlight>
            </View>
            <View style={styles.separator}/>
        </View>
   );
  }


  render() {
    const { favourites } = this.props;
    return (
        <ScrollView style={styles.container}>
          <View style={styles.listContainer}>
            <SGListView
              dataSource={favourites}
              renderRow={this.renderFav}
              />
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        marginBottom: (Platform.OS ==='ios') ? 55 : 0,
        marginTop: (Platform.OS ==='ios') ? 80 : 100
    },
    listContainer: {
        flexDirection:'row',
        alignItems: 'center',
        alignSelf:'stretch',
    },
    separator:{
        height:1,
        backgroundColor:'gray'
    },
    addressWrap: {
        flex: 9
    },
    rowAddress:{
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    address: {
        fontSize: 14,
    },
    button: {
        alignSelf: 'center',
        width: 20,
        height: 20,
        flex: 1
    },
});
module.exports = Favourites
