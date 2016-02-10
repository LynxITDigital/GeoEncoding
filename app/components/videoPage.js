'use strict';

import React, {
    StyleSheet,
    Component,
    Platform,
    View
} from 'react-native';
import Video from 'react-native-video';
import Spinner from 'react-native-spinkit';


var isTab = true;

class VideoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {paused: true, loading: true};

        if(props.uri) {
          this.uri = props.uri;
          isTab = false;
        } else {
          this.uri = "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4";
        }
    }

    render() {
      if(Platform.OS ==='ios') {
        // on iOS there is already visual feedback that there is a video loading,
        // so do not require a spinner
          var spinner =
          ( <View/> );
      } else {
          var spinner =
          ( <View style = {styles.spinner}>
              <Spinner
              style = {styles.spinner}
              isVisible = {true}
              size = {50}
              type = 'ThreeBounce'
              color = '#4da6ff' />
            </View>);
      }


      var isLoading = this.state.loading ?
      ( <View>
          {spinner}
        </View>):
      (<View/>);


      var videoForPlatform = Platform.OS === 'ios' ?
        (<View style = {styles.container}>
            <Video source = {{uri: this.uri}}
                    rate = {1.0}
                    volume = {0.0}
                    muted = {false}
                    paused = {this.state.paused}
                    resizeMode = "contain"
                    repeat = {true}
                    style = { isTab ? styles.fullScreenTab : styles.fullScreen }
                    controls = {true}/>
          </View>):
        (<View style = {styles.container}>
            <Video source = {{uri: this.uri}}
                    rate = {1.0}
                    volume = {0.0}
                    muted = {false}
                    paused = {false}
                    resizeMode = "contain"
                    repeat = {true}
                    style = {styles.fullScreen}
                    onLoad = {() => this.setState({loading: false})}
                    />
          </View>);

        return (
          <View style={styles.container}>
            { isLoading }
            { videoForPlatform }
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // flexDirection:'row',
        // alignItems:'center',
        // justifyContent:'center'
    },
    fullScreenTab: {
      position: 'absolute',
      top: 50,
      left: 0,
      bottom: 55,
      right: 0
    },
    fullScreen: {
      position: 'absolute',
      top: 50,
      left: 0,
      bottom: 0,
      right: 0
    },
    spinner: {
      marginTop: 50,
      alignSelf: 'center'
    },
});

module.exports = VideoPage
