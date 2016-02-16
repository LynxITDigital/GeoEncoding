'use strict';

import React, {
    StyleSheet,
    Component,
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

import Spinner from 'react-native-spinkit';
var EntypoIcon = require('react-native-vector-icons/Entypo');

class AddressDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {menu: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']}

        this.menuDataSource = new ListView.DataSource( {
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    renderRow(rowData){
      return (
        <View style={styles.menuContainer}>
          <TouchableHighlight style={styles.menuRow} underlayColor="3a3843">
            <Text style={styles.menu}>
              {rowData}
            </Text>
          </TouchableHighlight>
        </View>
      )
    }

    render() {
      var facebook = (<EntypoIcon name = "facebook" style={styles.menuItem} size = {20} color = "ffffff" allowFontScaling={false}/>);
      var google = (<EntypoIcon name = "google-" style={styles.menuItem} size = {20} color = "ffffff" allowFontScaling={false}/>);
      var linkedin = (<EntypoIcon name = "linkedin" style={styles.menuItem} size = {20} color = "ffffff" allowFontScaling={false}/>);

      return (
        <View style={styles.container}>
          <Text style={styles.header}>
            LynxReact
          </Text>
          <ListView
              dataSource={this.menuDataSource.cloneWithRows(this.state.menu)}
              renderRow={this.renderRow}
          />
          <View style={styles.horizRowContainer}>
            <TouchableHighlight style={styles.menuRow} underlayColor="3a3843">
              { facebook }
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuRow} underlayColor="3a3843">
              { google }
            </TouchableHighlight>
            <TouchableHighlight style={styles.menuRow} underlayColor="3a3843">
              { linkedin }
            </TouchableHighlight>
          </View>
        </View>
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#484953',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      paddingTop: 30,
      paddingBottom: 30,
      color: '#ffffff'
    },
    horizRowContainer: {
      flexDirection:'row',
      justifyContent: 'center'
    },
    menu: {
      color:'#ffffff',
      fontSize: 14,
      paddingLeft: 10,
    },
    menuContainer: {
      borderBottomWidth: 1,
      borderColor:"#54535d"
    },
    menuItem: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    menuRow: {
      paddingTop: 15,
      paddingBottom: 15,
      justifyContent: 'center'
    }
});

module.exports = AddressDrawer
