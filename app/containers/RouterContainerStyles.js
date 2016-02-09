'use strict';

import {
  StyleSheet,
  Platform
} from 'react-native';

const styles = StyleSheet.create({
  sceneStyle: {
    marginTop: (Platform.OS ==='ios') ? 0 : 56,
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

module.exports = {
  sceneStyle: styles.sceneStyle,
  getTabBarStyle,
};
