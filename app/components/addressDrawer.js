'use strict';

import React, {
    StyleSheet,
    Component,
    View
} from 'react-native';

import Spinner from 'react-native-spinkit';

class AddressDrawer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <View style={styles.container}>

          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#484953',
    }
});

module.exports = AddressDrawer
