import React, {
    View,
    ActivityIndicatorIOS,
    StyleSheet,
    TouchableOpacity,
    Text,
    Component,
    Dimensions
} from 'react-native';
var Overlay = require('react-native-overlay');
var BlurView = require('react-native-blur').BlurView;
var Icon = require('react-native-vector-icons/FontAwesome');

class Toast extends Component {
    render() {
        var positionStyle;
        if(this.props.position == 'top' || !this.props.position){
            positionStyle = styles.top;
        } else {
            positionStyle = styles.bottom;
        }

        var top = (Dimensions.get('window').height/2) - 75;
        console.log(top);
        var added = false;
        if(this.props.children.props.children.props.children == "Added"){
            added = true;
        }
        var icon = added ?
        ( <Icon name = "check-circle-o" size = {80} color = "rgba(255,255,255,0.8)" style = {styles.icon}/> ):
        ( <Icon name = "times-circle-o" size = {80} color = "rgba(255,255,255,0.8)" style = {styles.icon}/> );
        return (
            <Overlay isVisible = {this.props.isVisible} aboveStatusBar = {false}>
                <BlurView style = {[positionStyle, {top: top}]} blurType = "dark">
                        {icon}
                        <View style = {styles.content}>
                            {this.props.children}
                        </View>
                </BlurView>
            </Overlay>
        );
    }
}

var styles = StyleSheet.create({
    top: {
        width: 150,
        height: 150,
        borderRadius: 20,
        flexDirection: 'column',
        overflow: 'hidden',
        alignItems: 'center',
        alignSelf: 'center'
    },
    icon: {
        flex: 9,
        marginTop: 25
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content: {
        flex: 3,
        marginBottom: 20
    }
});

module.exports = Toast;
