'use strict';
import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  sceneStyle: {
    marginTop: (Platform.OS ==='ios') ? 0 : 56,
  },
  tabContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getTabBarStyle = props => ({
  top: (Platform.OS ==='ios') ? undefined : 56,
  backgroundColor: '#F9F9F9',
  borderTopColor: '#D8D8D8',
  borderTopWidth: 1,
  borderBottomColor: '#D8D8D8',
  borderBottomWidth: 1,
  height: 51,
});

const getTabImageStyle = props => ({
  height: 25,
  resizeMode: 'contain',
  tintColor: props.selected ? '#4da6ff' : '#929292',
  width: 30,
});

const getTabTextStyle = props => ({
  color: props.selected ? '#4da6ff' : '#929292',
  fontSize: (Platform.OS ==='ios') ? 10 : 14,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 4,
});

module.exports = {
  sceneStyle: styles.sceneStyle,
  tabContainerStyle: styles.tabContainerStyle,
  getTabBarStyle,
  getTabImageStyle,
  getTabTextStyle,
};
