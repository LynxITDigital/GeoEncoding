'use strict';

import React, {
    StyleSheet,
    Component,
    Text,
    Platform,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';
var Button = require('react-native-button');

var fullname = '';
var email = '';
var dob = '';

class MyAccount extends Component {

  constructor(props) {
    super(props);

    // Early binding
    //this.onSavePressed = this.onSavePressed.bind(this)
    this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }


  onSavePressed(user) {
    this.props.actions.updateAccount({'_id':user._id, 'login':user.login, 'password': user.password, 'fullname': fullname, 'email': email, 'dob': dob});
  }


  onfullnameTextChanged(event) {
    fullname = event.nativeEvent.text;
  }

  onEmailTextChanged(event) {
    email = event.nativeEvent.text;
  }

  onDOBTextChanged(event) {
    dob = event.nativeEvent.text;
  }



  componentDidUpdate() {
      // if(!this.props.user._id && (this.props.routerState.length == 2)) {
      //   this.props.navActions.pop();
      // }
  }


  render(){
        var account = this.props.user;
        var error = this.props.accountState.error;

        // // console.log("Launc : " + this.props)
        return (
            <View style={styles.container}>
                  <Text style={styles.error}>{error ? error : ''}</Text>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          onChange={this.onfullnameTextChanged}
                          defaultValue={account.name}
                          placeholder="Name"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={this.onEmailTextChanged}
                          defaultValue={account.email}
                          placeholder="email"/>
                  </View>


                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={this.onDOBTextChanged}
                          defaultValue={account.dob}
                          placeholder="D.O.B dd/mm/yyyy"/>
                  </View>

                  <View style = {styles.buttonRow} >
                    <TouchableHighlight style = {styles.button}
                               underlayColor = '#ffc266'
                               onPress = {this.onSavePressed.bind(this, account)}>
                               <Text style = {styles.buttonText}>Save</Text>
                     </TouchableHighlight>

                  </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS ==='ios') ? 80 : 120,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    inputContainer: {
      // marginTop:80,
      flexDirection:'row',
      alignItems: 'center',
      alignSelf:'stretch'
    },
    error: {
      color: "red"
    },
    textInput: {
      flex: 1,
      height: 36,
      padding: 4,
      margin : 10,
      fontSize: 18,
      color: 'gray',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      backgroundColor: '#fff5e6'
    },
    buttonRow: {
      flexDirection: 'row',
      alignSelf: 'stretch',
    },
    button: {
      flex: 1,
       height: 36,
       backgroundColor: '#ff9900',
       borderColor: '#F90',
       borderWidth: 1,
       borderRadius: 8,
       margin: 10,
       alignSelf: 'stretch',
       justifyContent: 'center'
   },
   buttonOther: {
     flex: 1,
      height: 36,
      backgroundColor: '#FFF',
      borderColor: '#F90',
      borderWidth: 1,
      borderRadius: 8,
      margin: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
   },
   buttonText: {
          fontSize: 18,
          color: 'white',
          alignSelf: 'center'
    },
  buttonOtherText: {
         fontSize: 18,
         color: '#F90',
         alignSelf: 'center'
     },
});


module.exports = MyAccount
