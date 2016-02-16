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
var IonIcon = require('react-native-vector-icons/Ionicons');


const styles = StyleSheet.create({
  tabContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

const getTabImageStyle = props => ({
  color: props.selected ? '#ff9900' : "#929292",
  height: 25,
  width: 30,
  marginLeft: 3
});

const getTabTextStyle = props => ({
  color: props.selected ? '#ff9900' : '#929292',
  fontSize: (Platform.OS ==='ios') ? 10 : 14,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 5
});


export default class TabBarItem extends Component {
  render() {
    const { tabBarItem } = this.props;
    var icon;
    var selected = this.props.selected;
    let title = tabBarItem.title;
    if (selected){
        switch (title) {
            case "Geo Encoding":
                icon = <IonIcon name = "ios-home" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Favourites":
                icon = <IonIcon name = "ios-star" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Video":
                icon = <IonIcon name = "social-youtube" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Download":
                icon = <IonIcon name = "ios-cloud-download" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Image":
                icon = <IonIcon name = "ios-photos" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
                /*
            case "Camera":
                icon = <IonIcon name = "ios-camera" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
                */

        }
    } else {
        switch (title) {
            case "Geo Encoding":
                icon = <IonIcon name = "ios-home-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Favourites":
                icon = <IonIcon name = "ios-star-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Video":
                icon = <IonIcon name = "social-youtube-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Download":
                icon = <IonIcon name = "ios-cloud-download-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
            case "Image":
                icon = <IonIcon name = "ios-photos-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
                /*
            case "Camera":
                icon = <IonIcon name = "ios-camera-outline" size = {28} color = "ff9900" style = {getTabImageStyle(this.props)} allowFontScaling={false}/>;
                break;
                */
        }
    }

    return (
      <View style={styles.tabContainerStyle}>
        {icon}
        {Platform.OS === 'ios' && tabBarItem.title &&
          <Text style={getTabTextStyle(this.props)} allowFontScaling={false}>{tabBarItem.title} </Text>
        }
      </View>
    );
  }
}
