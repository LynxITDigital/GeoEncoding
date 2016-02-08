import React, { ScrollView } from 'react-native';
var { Animated, Component } = React;

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// var _ = require('lodash');

export default class CustomScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1)
        };
    }

    /*
    componentDidMount() {
        this.debouncedFade = _.debounce(this.fadeOut, 50);
    } */

    fadeOut() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0,
            duration: 500,},
        ).start();
    }

    componentWillUpdate() {
        this.fadeOut();
    }

    render() {
        return (
            <AnimatedScrollView
                style = {{opacity: this.state.fadeAnim}}>
                {this.props.children}
            </AnimatedScrollView>
        );
    }
}

module.exports = CustomScrollView;
