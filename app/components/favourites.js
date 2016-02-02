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

class Favourites extends View {

  constructor(props) {
    super(props);
    this.favDataSource = new ListView.DataSource( {
        rowHasChanged: (row1, row2) => row1 !== row2
    });
  }

  componentDidMount() {
    Database.loadDB().then((db) => {
      //this.loadFavourites();
      console.log(Database);
        this.props.actions.fetchFavourites(Database);
    });
  }

  loadFavourites() {
    var favs = Database.getFavourites();
    this.favDataSource.cloneWithRows(favs);
      /*.then( (result) => {
        console.log(result)
        dataSource: this.dataSource.cloneWithRows(result[0].rows);
      } )
      .done();*/
  }


  onRowPressed(rowData){
      //console.log(this.props);
      this.props.navActions.details({data:rowData});
  }

  onRemovePressed(address) {
    Database.removeAddress(address);
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
      <TouchableHighlight onPress={this.onRowPressed.bind(this, rowData)}
          underlayColor='#dddddd'>
          <View>
            <View>
                <Text style={styles.address}>ADDRESS: {rowData}</Text>

                <Text style={styles.button}
                        onPress={this.onRemovePressed.bind(this, rowData)}>
                        Remove From Favourites
                        </Text>
            </View>
            <View style={styles.separator}/>

      </View>
  </TouchableHighlight>
   );
  }

  render() {
    const { searchString,addresses } = this.props;
    return (
      <View>
          <View style={styles.listContainer}>
            <ListView
              dataSource={addresses}
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
    listContainer: {
      marginTop:80,
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
      margin : 5,
      padding :5,
      height: 30,
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
module.exports = Favourites
