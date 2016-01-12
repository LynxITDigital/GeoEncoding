'use strict';

var React = require('react-native');

var {
StyleSheet,
Image,
View,
Text,
Component,
MapView
} = React

class AddressDetails extends Component {
   render(){

    const rowData =  this.props.data;
    const { lat, lng } = rowData.geometry.location;

    var title = rowData.formatted_address;
    var latLong = 'Lat : ' + lat + ' : Long :' + lng;
    // var latLong = 'Lat - xxx : Long - xxx ';

    var region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }

    var markers = [
                    {
                    latitude: lat,
                    longitude: lng,
                    title: title,
                    subtitle: title
                    }
                  ];

    return (
     <View style={styles.container}>
       <View style={styles.heading}>
      <Text style={styles.title}>{title}</Text>
         <View style={styles.separator}/>
       </View>
       <Text style={styles.description}>{latLong}</Text>

       <MapView style={styles.map}
         region = {region}

         annotations={markers}
       />

     </View>
   );

   }
}

var styles = StyleSheet.create({
  container: {
    flex:1,
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
  },
  map: {
   height: 350,
   margin: 10,
   borderWidth: 1,
   borderColor: '#000000',
 }
});


module.exports = AddressDetails
