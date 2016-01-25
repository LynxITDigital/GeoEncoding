// import React from 'react-native';
var React = require('react-native')
const {
    View,
    TouchableWithoutFeedback,
    Text,
    StyleSheet
} = React;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4b91df',
        padding: 20
    }
});

class Banner extends View {
    static get defaultProps() {
        return {
            title: 'MyBanner'
        };
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string
        };
    }

    constructor(props) {
        super(props);

        this.state = {
            clicks: 0
        };
    }

    onClick() {
        this.setState({
            clicks: this.state.clicks + 1
        });
    }

    render() {
        const title = this.props.title;
        const clicks = this.state.clicks;

        return (
            <TouchableWithoutFeedback onPress={(e) => this.onClick(e)} style={styles.container}>
               <View>
               <Text>{title}</Text>
                <Text>Clicks: {clicks}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
module.exports = Banner
