import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  PropTypes,
  Image,
  Platform
} from 'react-native';

var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

class ImagePicker extends Component {

    constructor(props) {
        super(props);

        this.state = {imgSource: {}};
        this.onPickPressed = this.onPickPressed.bind(this);
    }


    onPickPressed(){
        let options = {
            title: 'Select Image', // specify null or empty string to remove the title
            cancelButtonTitle: 'Cancel',
            takePhotoButtonTitle: 'Take Photo', // specify null or empty string to remove this button
            chooseFromLibraryButtonTitle: 'Choose from Library', // specify null or empty string to remove this button
            cameraType: 'back', // 'front' or 'back'
            mediaType: 'photo', // 'photo' or 'video'
            videoQuality: 'high', // 'low', 'medium', or 'high'
            aspectX: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            aspectY: 1, // aspectX:aspectY, the cropping image's ratio of width to height
            quality: 100, // photos only
            angle: 0, // photos only
            allowsEditing: false, // Built in functionality to resize/reposition the image
            noData: true, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
            storageOptions: { // if this key is provided, the image will get saved in the documents/pictures directory (rather than a temporary directory)
                skipBackup: true, // image will NOT be backed up to icloud
                path: 'images' // will save image at /Documents/images rather than the root
            }
        };

        UIImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('UIImagePickerManager Error: ', response.error);
            } else {
                var source;
                if(Platform.OS === 'ios'){
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    imgSource: source
                });
            }
        });
    }

    render() {
        return (
            <View style = {styles.container}>
                <TouchableHighlight style = {styles.button} underlayColor='#ffc266' onPress = {this.onPickPressed}>
                    <Text style = {styles.buttonText}>Select Image</Text>
                </TouchableHighlight>
                <Image source = {this.state.imgSource} style = {styles.image} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        marginBottom: (Platform.OS ==='ios') ? 55 : 0,
        marginTop: (Platform.OS ==='ios') ? 80 : 120,
    },
    buttonText: {
           fontSize: 18,
           color: 'white',
           alignSelf: 'center'
       },
    button: {
       height: 36,
       flexDirection: 'row',
       backgroundColor: '#ff9900',
       borderRadius: 8,
       marginLeft: 10,
       marginRight: 10,
       alignSelf: 'stretch',
       justifyContent: 'center'
   },
   image: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
module.exports = ImagePicker
