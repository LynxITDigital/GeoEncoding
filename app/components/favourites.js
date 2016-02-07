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
  Button
} from 'react-native';
// var _ = require('lodash');
var RefreshableListView = require('react-native-refreshable-listview')

import Database from '../database/database';

import globals from '../store/globals';

class Favourites extends Component {

  constructor(props) {
    super(props);
    this.favDataSource = new ListView.DataSource( {
        rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  componentDidMount() {
    Database.loadDB().then((db) => {
      //this.loadFavourites();
      // console.log(Database);
        this.props.actions.fetchFavourites(Database);
    });
  }

  loadFavourites() {
    var favs = Database.getFavourites();
    this.favDataSource.cloneWithRows(favs);
      /*.then( (result) => {
        // console.log(result)
        dataSource: this.dataSource.cloneWithRows(result[0].rows);
      } )
      .done();*/
  }


  onRowPressed(rowData){
      //// console.log(this.props);
      this.props.navActions.details({data:rowData});
  }

  onRemovePressed(addressID) {
    Database.removeAddress(addressID)
    .then(() => {
      // console.log("DELETED.  LOADING FAVS");
        this.props.actions.fetchFavourites(Database);
    });
  }

  renderFav(rowData) {
    return(
      <TouchableHighlight onPress={this.onRowPressed.bind(this, rowData)}
          underlayColor='#dddddd'>
          <View>
            <View style = {styles.addressContainer}>
                <Text style={styles.address}>{rowData.id}: {rowData.address}</Text>
                <View style = {styles.buttonContainer}>
                    <Text style={styles.button}
                            onPress={this.onRemovePressed.bind(this, rowData.id)}>
                            Remove From Favourites
                            </Text>
                </View>
            </View>
            <View style={styles.separator}/>

      </View>
  </TouchableHighlight>
   );
  }


  render() {
    const { favourites } = this.props;
    return (
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <ListView
              dataSource={favourites}
              renderRow={this.renderFav.bind(this)}
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
  container: {
      marginTop:80,
  },
    listContainer: {
      marginTop:10,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch',
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
      backgroundColor:'#48BBEC',
      fontSize:14,
      color:'white'
    },
    addressContainer: {
        margin: 5,
        padding: 5
    },
    buttonContainer: {
        padding: 5,
        marginTop: 5,
        backgroundColor: '#48BBEC'
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
module.exports = Favourites
