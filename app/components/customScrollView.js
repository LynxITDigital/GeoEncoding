import React, { ScrollView } from 'react-native';
var { Animated, Component } = React;

var AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default class CustomScrollView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(1)
        };
    }

    componentWillUnmount() {
        // console.log('UNMOUNT')
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 0,
            duration: 1000,},
        ).start();
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
