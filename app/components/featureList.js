'use strict';

import React, {
    StyleSheet,
    Component,
    Platform,
    View,
    Text
} from 'react-native';
import Video from '../lib/Video';
import Spinner from 'react-native-spinkit';


var isTab = true;

class FeatureList extends Component {
    constructor(props) {
        super(props);

        this.state = {paused: true, loading: true, isTab: true};

        if(props.uri) {
          this.uri = props.uri;
          this.state.isTab = false
        } else {
          this.uri = "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4";
          this.state.isTab = true
        }
    }

    render() {

        return (
          <View style={styles.container}>
            <View style={styles.button}>
              <Text style={styles.buttonText}
                    onPress={() => { this.props.navActions.loginpage() } }>
                  Account
              </Text>
            </View>
            <View style={styles.button}>
                <Text style={styles.buttonText}
                      onPress={() => { this.props.navActions.picker() } }>
                    Camera / Image Picker
                </Text>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS ==='ios') ? 50 : 50,
         flexDirection:'column',
         alignItems:'center',
         justifyContent:'center'
    },
    button:{
      padding :5,
      height: 36,
      backgroundColor:'#F90',
      alignSelf:'stretch',
      justifyContent:'center',
      borderRadius: 8,
      margin: 10
    },
    buttonText:{
      fontSize:18,
      color:'white'
    },
});

module.exports = FeatureList
