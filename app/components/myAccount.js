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

class LoginPage extends Component {

  constructor(props) {
    super(props);

    // Early binding
    this.onLoginPressed = this.onLoginPressed.bind(this)
    this.onSignUpPressed = this.onSignUpPressed.bind(this)
    //this.componentWillMount = this.componentWillMount.bind(this)
  }


  onSavePressed() {
    this.props.actions.updateAccount({'id':this.props.state.user.id, 'fullname': fullname, 'email': email, 'dob': dob});
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


  render(){
        var Actions = this.props.routes;
        account = this.props.state.user;
        // // console.log("Launc : " + this.props)
        return (
            <View style={styles.container}>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          onChange={this.onfullnameTextChanged}
                          value={account.fullname}
                          placeholder="Full Name"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={this.onEmailTextChanged}
                          value={account.email}
                          placeholder="email"/>
                  </View>


                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'=
                          onChange={this.onDOBTextChanged}
                          value={account.dob}
                          placeholder="D.O.B dd/mm/yyyy"/>
                  </View>

                  <View style = {styles.buttonRow} >
                    <TouchableHighlight style = {styles.button}
                               underlayColor = '#ffc266'
                               onPress = {this.onLoginPressed}>
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


module.exports = LoginPage
