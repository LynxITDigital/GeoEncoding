import * as types from '../actions/actionTypes';
import {ListView, Alert} from 'react-native';
import _ from 'underscore';

var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });
var initialState = {isLoading:false, downloaded:ds.cloneWithRows([])};


export default function downloadState(state = initialState, action = {}){
  // console.log("Receiver executed for action : " + action.type);
  switch (action.type) {
    case types.REQUEST_DOWNLOAD_LIST:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_DOWNLOAD_LIST:
      console.log("RECEIVE DOWNLOAD REDUCER: ");
      console.log(action.downloads);
      return Object.assign({},state, { isLoading:false, downloaded: ds.cloneWithRows(action.downloads)});
    case types.UPDATE_DOWNLOAD_ITEM:
        console.log("RECEIVE DOWNLOAD ITEM REDUCER: ");
        var newDownloads = _.clone(state.downloaded._dataBlob.s1);
        newDownloads[action.idx].status = action.status;
        newDownloads[action.idx].jobId = action.jobId;
        if(action.status == 3) {
          Alert.alert('Download Complete', "'" + action.displayname + "' downloaded successfully");
        }
        return Object.assign({},state, { downloaded: ds.cloneWithRows(newDownloads)});
    case types.DELETE_DOWNLOAD_ITEM:
        var newDownloads = _.clone(state.downloaded._dataBlob.s1);
        newDownloads.splice(action.idx, 1);
        return Object.assign({},state, { downloaded: ds.cloneWithRows(newDownloads)});
    default:
      return state;
  }
}
