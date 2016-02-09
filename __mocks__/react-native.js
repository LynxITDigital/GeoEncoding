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
class Text extends React.Component {}
class TextInput extends React.Component {}
class ListView extends React.Component {}
class Easing extends React.Component {}
class Animated extends React.Component {}
class requireNativeComponent extends React.Component {}
class Platform extends React.Component {}

ReactNative.View = View;
ReactNative.TouchableWithoutFeedback = TouchableWithoutFeedback;
ReactNative.TouchableHighlight = TouchableHighlight;
ReactNative.ScrollView = ScrollView;
ReactNative.TouchableOpacity = TouchableOpacity;
ReactNative.Text = Text;
ReactNative.TextInput = TextInput;
ReactNative.ListView = ListView;
ReactNative.Easing = Easing;
ReactNative.Easing.in = () => {};
ReactNative.Easing.out = () => {};
ReactNative.Easing.inOut = () => {};
ReactNative.Animated = Animated;
ReactNative.Animated.createAnimatedComponent = () => {};
ReactNative.requireNativeComponent = () => {};
ReactNative.Platform = Platform;


module.exports = ReactNative;
