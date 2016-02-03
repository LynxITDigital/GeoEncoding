'use strict';

import React, {
    StyleSheet,
    Component,
    View
} from 'react-native';
import Video from 'react-native-video';

class VideoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style = {styles.container}>
                <Video source = {{uri: "http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4"}}
                    rate = {1.0}
                    volume = {0.0}
                    muted = {false}
                    paused = {false}
                    resizeMode = "cover"
                    repeat = {true}
                    onLoadStart={console.log("Loaded")}
                    onEnd={console.log("Ended")}
                    onError={console.log("Error")}
                    style = {styles.backgroundVideo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    container: {
        flex: 1
    }
});

module.exports = VideoPage
