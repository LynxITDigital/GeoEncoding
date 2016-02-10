'use strict';

import React from 'react-native'
const {
  View,
  Image,
  Text,
  Component,
  StyleSheet,
  Platform
} = React;

const styles = StyleSheet.create({
  tabContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

const getTabImageStyle = props => ({
  height: 25,
  resizeMode: 'contain',
  tintColor: props.selected ? '#ffc266' : '#929292',
  width: 30,
  marginTop: 5
});

const getTabTextStyle = props => ({
  color: props.selected ? '#ffc266' : '#929292',
  fontSize: (Platform.OS ==='ios') ? 10 : 14,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 5,
});


export default class TabBarItem extends Component {
  render() {
    const { tabBarItem } = this.props;

    return (
      <View style={styles.tabContainerStyle}>
        {(Platform.OS ==='ios') &&
          tabBarItem.icon &&
          <Image
            source={tabBarItem.icon}
            style={getTabImageStyle(this.props)}
            />
        }
        {tabBarItem.title &&
          <Text style={getTabTextStyle(this.props)}>{tabBarItem.title}</Text>
        }
      </View>
    );
  }
}
