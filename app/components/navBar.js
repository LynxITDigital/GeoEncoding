'use strict';

var NavigationBar = require('react-native-navbar');
var React = require('react-native');
var {StyleSheet,View} = React;
var {Router, Route, Animations, Schema} = require('react-native-redux-router');

class NavBarBase extends React.Component {
    onPrev(){
        var Actions = this.props.routes;
        if (this.props.onPrev){
            this.props.onPrev();
            return;
        }
        if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
            Actions.pop();
        }
    }
    render() {
        var Actions = this.props.routes;
        return <NavigationBar style={styles.navBar}
                              titleColor='white'
                              buttonsColor='white'
                              statusBar='lightContent'
                              prevTitle={this.props.initial ? " " : null}
                              onPrev={this.props.onPrev || Actions.pop}
                              onNext={this.props.onNext || Actions.pop}
            {...this.props}
            />
    }
}
class NavBar extends React.Component {
    render() {
        return <NavBarBase customNext={<View/>} {...this.props}/>
    }
}

class NavBarBack extends React.Component {
    render() {
        return <NavBarBase customNext={<View/>} prevTitle="Back" {...this.props}/>
    }
}


class NavBarModal extends React.Component {
    render() {
        return <NavBarBase customPrev={<View/>} nextTitle="Close" {...this.props}/>
    }
}

var styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#0db0d9',
    },
});


module.exports = {NavBar,NavBarBack, NavBarModal};
