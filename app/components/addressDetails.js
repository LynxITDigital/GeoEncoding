'use strict';

var React = require('react-native');
var MapBoxView = require('react-native-mapbox-gl');
var {
StyleSheet,
Image,
View,
Text,
Component,
PropTypes
} = React

class AddressDetails extends Component {
  mixins:[MapBoxView.Mixin];
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
    var center = {
      latitude: -32.940371,
      longitude: 151.742358
    }

    var region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }

    var markers = [
                    {
                    coordinates:[lat,lng],
                    title: title,
                    subtitle: title,
                    type:'point',
                    id:'marker'
                    }
                  ];

    return (
     <View style={styles.container}>
       <View style={styles.heading}>
      <Text style={styles.title} onPress={this.onTitlePress.bind(this)}>{title}</Text>
         <View style={styles.separator}/>
       </View>
       <Text style={styles.description}>{latLong}</Text>

       <MapBoxView style={styles.map}
         direction = {0}
         rotateEnabled={true}
         showUserLocation={true}
         accessToken={'pk.eyJ1IjoicmVldHVwZXRlciIsImEiOiJjaWp4b3dmMHUxNzk4dm9raWNtOWtxemM1In0.BTALbIWw8khnomnKJULRdg'}
         styleURL={'mapbox://styles/reetupeter/cijxrwa6400f1qtkql7drtsug'}
         annotations={markers}
         centerCoordinate={center}
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
