'use strict';

var React = require('react-native');

var MapView = require('react-native-maps');

var {
StyleSheet,
Image,
View,
Text,
Component,
PropTypes
} = React

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1;
const SPACE = 0.01;

class AddressDetails extends Component {
  onTitlePress(){
    console.log("onTitlePress : "  + this.props.route);
    this.props.routes.pop();
  }
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
                          console.log(MapView);
    return (
     <View style={styles.container}>
       <View style={styles.heading}>
         <Text style={styles.title} onPress={this.onTitlePress.bind(this)}>{title}</Text>
         <View style={styles.separator}></View>
       </View>
       <Text style={styles.description}>{latLong}</Text>

         <MapView
           ref="map"
           style={styles.map}
           initialRegion={region}
         />

     </View>
   );

   }
}

AddressDetails.propTypes = {
  data : PropTypes.object,
  routes : PropTypes.objectOf(PropTypes.func)
}

var styles = StyleSheet.create({
  container: {
    flex:1,
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
