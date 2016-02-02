'use strict';

var React = require('react-native');

var MapView = require('react-native-maps');

var {
    StyleSheet,
    Image,
    View,
    Text,
    Component,
    TouchableHighlight,
    PropTypes,
    LinkingIOS
} = React

/*
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1;
const SPACE = 0.01;
*/

class AddressDetails extends Component {
  onTitlePress(){
    console.log("onTitlePress : "  + this.props.route);
    this.props.routes.pop();
  }

  onDirectionPressed(){
      var url = 'http://maps.apple.com/?daddr=' + this.props.data.geometry.location.lat + ',' + this.props.data.geometry.location.lng + '&dirflg=d';
      LinkingIOS.openURL(url);
  }

   render(){

    const rowData =  this.props.data;
    const { lat, lng } = rowData.geometry.location;

    var title = rowData.formatted_address;
    var latLong = 'Lat : ' + lat + '\nLong :' + lng;
    // var latLong = 'Lat - xxx : Long - xxx ';

    var region = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    };

    var latlng = {
        latitude: lat,
        longitude: lng,
    };

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
         >
           <MapView.Marker
               coordinate = {latlng}
               title = {title}/>
         </MapView>

         <TouchableHighlight style = {styles.button}
                    underlayColor = '#99d9f4'
                    onPress = {this.onDirectionPressed.bind(this)}>
                    <Text style = {styles.buttonText}>Direction</Text>
          </TouchableHighlight>

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
    marginTop: 80
    // flexDirection:'column'
  },
  heading: {
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  title: {
    fontSize: 20,
    margin: 10,
    color: '#656565'
  },
  description: {
    fontSize: 16,
    margin: 10,
    color: '#656565'
  },
  map: {
   height: 300,
   marginRight: 10,
   marginLeft: 10,
   marginBottom: 10,
   borderWidth: 1,
   borderColor: '#000000',
 },
 buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
 button: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
}
});


module.exports = AddressDetails
