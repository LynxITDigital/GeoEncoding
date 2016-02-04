'use strict';

var React = require('react-native');
var {View, Text, StyleSheet, TouchableHighlight} = React;
var Button = require('react-native-button');

class Launch extends React.Component {
    render(){
        var Actions = this.props.routes;
        // console.log("Launc : " + this.props)
        return (
            <View style={styles.container}>
                <Text>Launch page</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});

module.exports = Launch;
