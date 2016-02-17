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

var login = 'oliver';
var password = 'test';
var pwConfirm = 'test';
var fullname = 'O J';
var email = 'oli@oli.com';
var dob = '';

class SignUp extends Component {

  constructor(props) {
    super(props);

    // Early binding
    this.onSignUpPressed = this.onSignUpPressed.bind(this)
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  onSignUpPressed() {
    if(password == pwConfirm) {
      this.props.actions.signUp({'login':login, 'password':password, 'name': fullname, 'email': email, 'dob': dob});
        this.props.navActions.account();
    }
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

    componentWillReceiveProps() {
      // if(this.props.user._id !== undefined) {
      //   this.props.navActions.account();
      // }
    }

  render(){
        var Actions = this.props.routes;
        var error = this.props.accountState.error;
        // // console.log("Launc : " + this.props)
        return (
                <View style={styles.container}>
                  <Text style={styles.error}>{error ? error : ''}</Text>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={(event) => { login = event.nativeEvent.text }}
                          placeholder="Login"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          secureTextEntry={true}
                          onChange={(event) => { password = event.nativeEvent.text }}
                          placeholder="password"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          secureTextEntry={true}
                          onChange={(event) => { pwConfirm = event.nativeEvent.text }}
                          placeholder="confirm password"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          onChange={this.onfullnameTextChanged}
                          placeholder="Full Name"/>
                  </View>
                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={this.onEmailTextChanged}
                          placeholder="email"/>
                  </View>


                  <View style={styles.inputContainer}>
                      <TextInput
                          style={styles.textInput}
                          autoCapitalize='none'
                          onChange={this.onDOBTextChanged}
                          placeholder="D.O.B dd/mm/yyyy"/>
                  </View>

                  <View style = {styles.buttonRow} >
                    <TouchableHighlight style = {styles.button}
                               underlayColor = '#ffc266'
                               onPress = {this.onSignUpPressed}>
                               <Text style = {styles.buttonText}>Sign Up</Text>
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


module.exports = SignUp
