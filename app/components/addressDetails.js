'use strict';

var React = require('react-native');

var {
StyleSheet,
Image,
View,
Text,
Component
} = React

class AddressDetails extends Component {
   render(){

    // const {rowData} =  this.props;

    var title = "TESTING" //rowData.formatted_address;
    // var latLong = 'Lat - ' + rowData.geometry.location.lat + ' : Long -' + rowData.geometry.location.lat;
    var latLong = 'Lat - xxx : Long - xxx ';

    return (
     <View style={styles.container}>
       <View style={styles.heading}>
         <View style={styles.separator}/>
       </View>
       <Text style={styles.description}>{latLong}</Text>
     </View>
   );

   }
}

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    // flexDirection:'column'
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});


module.exports = AddressDetails
