'use strict';

import React, {
    StyleSheet,
    Component,
    Platform,
    View,
    Text
} from 'react-native';


var isTab = true;

class FeatureList extends Component {
    constructor(props) {
        super(props);
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
