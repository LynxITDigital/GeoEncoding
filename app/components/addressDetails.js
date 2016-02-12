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
    LinkingIOS,
    Platform,
    ScrollView
} = React

/*
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * 1;
const SPACE = 0.01;
*/

class AddressDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {appleMaps: false, googleMaps: false};

    // Early binding
    this.onApplePressed = this.onApplePressed.bind(this)
    this.onGooglePressed = this.onGooglePressed.bind(this)
    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
      if(Platform.OS ==='ios') {
          let apple = 'http://maps.apple.com/?q=Lynx+office';
          let google = 'comgooglemaps://?daddr=Lynx+office';
          LinkingIOS.canOpenURL(apple, (supported) => {
              if(supported){
                  this.setState({appleMaps: true});
              } else {
                  this.setState({appleMaps: false});
              }
          });

          LinkingIOS.canOpenURL(google, (supported) => {
              if(supported){
                  this.setState({googleMaps: true});
              } else {
                  this.setState({googleMaps: false});
              }
          });
      }
  }

  onApplePressed(){
      var url = 'http://maps.apple.com/?daddr=' + this.props.data.geometry.location.lat + ',' + this.props.data.geometry.location.lng + '&dirflg=d';
      LinkingIOS.openURL(url);
  }

  onGooglePressed(){
      var url = 'comgooglemaps://?daddr=' + this.props.data.geometry.location.lat + ',' + this.props.data.geometry.location.lng;
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

    var appleButton = this.state.appleMaps ?
    (<TouchableHighlight style = {styles.button}
               underlayColor = '#ffc266'
               onPress = {this.onApplePressed}>
               <Text style = {styles.buttonText}>Apple</Text>
     </TouchableHighlight>):
    ( <View/> );

    var googleButton = this.state.googleMaps ?
    (<TouchableHighlight style = {styles.button}
               underlayColor = '#ffc266'
               onPress = {this.onGooglePressed}>
               <Text style = {styles.buttonText}>Google</Text>
     </TouchableHighlight>):
    ( <View/> );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.heading}>
                <Text style={styles.title}>{title}</Text>
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

            <View style = {styles.buttonContainer}>
                {appleButton}
                {googleButton}
            </View>

        </ScrollView>
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
    marginTop: (Platform.OS ==='ios') ? 80 : 120,
    marginBottom: (Platform.OS ==='ios') ? 55 : 0
  },
  heading: {
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    color: '#656565'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
    flex: 1,
    backgroundColor: '#ff9900',
    borderRadius: 8,
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
}
});


module.exports = AddressDetails
