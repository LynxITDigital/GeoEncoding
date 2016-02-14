'use strict';

var React = require('react');
var ReactNative = React;

ReactNative.StyleSheet = {
    create: function(styles) {
        return styles;
    }
};

class View extends React.Component {}
class TouchableWithoutFeedback extends React.Component {}
class TouchableHighlight extends React.Component {}
class TouchableOpacity extends React.Component {}
class ScrollView extends React.Component {}
class ActivityIndicatorIOS extends React.Component {}
class Text extends React.Component {}
class TextInput extends React.Component {}
class ListView extends React.Component {}
class Easing extends React.Component {}
class Animated extends React.Component {}

// class requireNativeComponent extends React.Component {}
// class Platform extends React.Component {}

ReactNative.View = View;
ReactNative.TouchableWithoutFeedback = TouchableWithoutFeedback;
ReactNative.TouchableHighlight = TouchableHighlight;
ReactNative.ScrollView = ScrollView;
ReactNative.TouchableOpacity = TouchableOpacity;
ReactNative.ActivityIndicatorIOS = ActivityIndicatorIOS;
ReactNative.Text = Text;
ReactNative.TextInput = TextInput;

// mocks for ListView
ReactNative.ListView = ListView;
class ListViewDataSource {
  cloneWithRows() {
    return new ListViewDataSource();
  }
}
ReactNative.ListView.DataSource = () => {
  return new ListViewDataSource();
};

ReactNative.Easing = Easing;
ReactNative.Easing.in = () => {};
ReactNative.Easing.out = () => {};
ReactNative.Easing.inOut = () => {};
ReactNative.Animated = Animated;
ReactNative.Animated.createAnimatedComponent = () => {};

ReactNative.requireNativeComponent = () => {};
ReactNative.Platform = {};

// mocks for react-native-fs
ReactNative.NativeModules = {};
ReactNative.NativeModules.RNFSManager = {};
ReactNative.NativeModules.RNFSManager.readDir = () => {};
ReactNative.NativeModules.RNFSManager.stat = () => {};
ReactNative.NativeModules.RNFSManager.readFile = () => {};
ReactNative.NativeModules.RNFSManager.writeFile = () => {};
ReactNative.NativeModules.RNFSManager.moveFile = () => {};
ReactNative.NativeModules.RNFSManager.unlink = () => {};
ReactNative.NativeModules.RNFSManager.mkdir = () => {};
ReactNative.NativeModules.RNFSManager.downloadFile = () => {};
ReactNative.NativeModules.RNFSManager.pathForBundle = () => {};

module.exports = ReactNative;
