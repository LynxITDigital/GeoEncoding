'use strict';

var React = require('react/addons');
var ReactNative = React;

ReactNative.StyleSheet = {
    create: function(styles) {
        return styles;
    }
};

class View extends React.Component {}
class TouchableWithoutFeedback extends React.Component {}
class Text extends React.Component {}
class TextInput extends React.Component {}
class ListView extends React.Component {}
class Easing extends React.Component {}
class Animated extends React.Component {}

ReactNative.View = View;
ReactNative.TouchableWithoutFeedback = TouchableWithoutFeedback;
ReactNative.Text = Text;
ReactNative.TextInput = TextInput;
ReactNative.ListView = ListView;
ReactNative.Easing = Easing;
ReactNative.Easing.in = () => {};
ReactNative.Easing.out = () => {};
ReactNative.Easing.inOut = () => {};
ReactNative.Animated = Animated;
ReactNative.Animated.createAnimatedComponent = () => {};

module.exports = ReactNative;
