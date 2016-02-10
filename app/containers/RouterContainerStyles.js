'use strict';

import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  sceneStyle: {
    marginTop: (Platform.OS ==='ios') ? 0 : 50,
  },
});

const getTabBarStyle = props => ({
  top: (Platform.OS ==='ios') ? undefined : 50,
  backgroundColor: '#F9F9F9',
  borderTopColor: '#D8D8D8',
  borderTopWidth: 1,
  borderBottomColor: '#D8D8D8',
  borderBottomWidth: 1,
  height: 55
});

const navBarStyle = (Platform.OS == 'ios') ? {backgroundColor: "#F98B30"} : { alignItems: "stretch", justifyContent: "center", marginLeft: 0, paddingTop: 10, backgroundColor: "#F98B30", height: 55}

const navTextStyle = (Platform.OS == 'ios') ? {color: "#FFF"} : {alignSelf: "center", marginLeft: -80, marginBottom: -50, fontSize: 20, fontWeight: "bold", color: "#FFF"}

const barButtonIconStyle =  { tintColor: "#FFF" }; //, backgroundColor: "#F00"} ;


module.exports = {
  sceneStyle: styles.sceneStyle,
  getTabBarStyle,
  navBarStyle,
  navTextStyle,
  barButtonIconStyle
};
