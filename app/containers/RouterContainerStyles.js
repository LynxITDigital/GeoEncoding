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

const navBarStyle = (Platform.OS == 'ios') ? {backgroundColor: "#E94"} : { alignItems: "stretch", justifyContent: "center", marginLeft: 0, paddingTop: 10, backgroundColor: "#E94", height: 55}

const navTextStyle = (Platform.OS == 'ios') ? {color: "#000"} : {alignSelf: "center", marginLeft: -80, marginBottom: -50, fontSize: 20, fontWeight: "bold", color: "#000"}

const barButtonIcon = {color: "#000"};


module.exports = {
  sceneStyle: styles.sceneStyle,
  getTabBarStyle,
  navBarStyle,
  navTextStyle,
  barButtonIcon
};
