var downloads = [ {title: "Sample 480", url: "https://www.dropbox.com/s/gzf7bel1a1nyyof/Sample480.mov?dl=0"} ];

import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView,
  ScrollView,
  PropTypes,
  Image,
  Button,
  Platform
} from 'react-native';

var RNFS = require('react-native-fs');

import Toast from './toast.ios';
import globals from '../store/globals';
var Icon = require('react-native-vector-icons/FontAwesome');

//const dlPath = RNFS.DocumentDirectoryPath + '/downloads/';

class DownloadList extends Component {

  constructor(props) {
    super(props);

    // Early binding
    this.renderDownload = this.renderDownload.bind(this)
    this.startDownload = this.startDownload.bind(this)
    this.viewDownload = this.viewDownload.bind(this)
    this.resetDownload = this.resetDownload.bind(this)
    this.deleteDownload = this.deleteDownload.bind(this)
  }

  componentDidMount() {
    this.props.actions.fetchDownloads();
  }


    hideTopToast() {
        if(this.props.routerState[0] == 'launch'){
            this.setState({isVisible: false});
        }
    }


  startDownload(rowData, idx) {
      this.props.actions.downloadItem(rowData, idx);
  }

  viewDownload(filepath) {
      this.props.navActions.dlvideo({uri:filepath});
  }

  resetDownload(rowData, idx) {
      this.props.actions.resetDownload(rowData.id, idx, rowData.jobId);
  }

  deleteDownload(id, idx) {
      this.props.actions.removeDownload(id, idx);
  }


  renderDownload(rowData, section, row) {
    var status;
    var style;
    var onClick;
    switch(rowData.status) {
      case(0):
        status = 'Tap to Download';
        style= styles.new;
        onClick = this.startDownload.bind(this, rowData, row);
        break;
      case(1):
          status = 'Download Pending'
          style = styles.inProgress;
          onClick = this.resetDownload.bind(this, rowData, row);
          break;
      case(2):
        status = 'Download in progress (Tap to Cancel)'
        style = styles.inProgress;
        onClick = this.resetDownload.bind(this, rowData, row);
        break;
      case(3):
        status = 'Downloaded (Tap to View)'
        style = styles.complete;
        onClick = this.viewDownload.bind(this, rowData.filepath);;
        break;
    }

    return (
        <TouchableHighlight onPress={onClick} underlayColor="#FFF">
            <View>
                <View style={styles.rowAddress}>
                    <Text style={styles.url}>{rowData.displayname}</Text>

                    <TouchableHighlight onPress={this.resetDownload.bind(this, rowData, row)} underlayColor="#FFF">
                        <Icon name = "repeat" size = {20} color = "rgba(100,100,100,1)" style = {styles.imgButton} allowFontScaling={false}/>
                    </TouchableHighlight>
                </View>
                <View style={styles.rowAddress}>
                    <Text style={style}>{status}</Text>
                </View>
                <View style={styles.rowAddress}/>

                <View style={styles.separator}/>
            </View>
        </TouchableHighlight>
    );
  }

  render() {
      const { downloaded } = this.props;
      const url = "https://www.dropbox.com/s/gzf7bel1a1nyyof/Sample480.mov?dl=1";
      return (
          <View style={styles.container}>
              <View style={styles.listContainer}>
                  <ListView
                      style={styles.ListView}
                      dataSource={downloaded}
                      renderRow={this.renderDownload}
                  />
              </View>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:70,
    flexDirection:'column',
    marginTop: (Platform.OS ==='ios') ? 70 : 110
  },
  listContainer: {
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'stretch',
    flex: 1
  },
  separator:{
    height:1,
    backgroundColor:'gray'
  },
  addressWrap: {
    flex: 9
  },
  rowAddress:{
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  url: {
    fontSize: 14,
  },
  new: {
    color: '#000'
  },
  inProgress: {
    color: '#AA4'
  },
  complete: {
    color: '#090'
  },
  imgButton: {
    alignSelf: 'center',
    width: 20,
    height: 20,
    flex: 1
  }
});
module.exports = DownloadList;
