var types = require('./actionTypes');
var RNFS = require('react-native-fs');
var path = require('path');
/*var PushNotification = require('react-native-push-notification');

PushNotification.configure({
  onRegister: function(token) {
    console.log("REGISTER: "  + token);
  },
  getNotifications: function(notification) {
    console.log("NOTIFICATION: " + notification);
  },
  permissions: {
      alert: true
  },
  requestPermissions: true
});
*/
import Database from '../database/database';


function requestDownloadList() {
  return {
    type: types.REQUEST_DOWNLOAD_LIST
  };
}


function receiveDownloadList(downloads) {
  return {
    type: types.RECEIVE_DOWNLOAD_LIST,
    downloads
  };
}

function requestDownloadItem(idx) {
  return {
    type: types.REQUEST_DOWNLOAD_ITEM,
    idx
  };
}




function updateDownloadItem(idx, status, displayname = null, jobId = null) {
  return {
    type: types.UPDATE_DOWNLOAD_ITEM,
    idx,
    status,
    displayname,
    jobId
  };
}


function deleteDownloadItem(idx, status) {
  return {
    type: types.DELETE_DOWNLOAD_ITEM,
    idx
  };
}


module.exports.resetDownload = function(id, idx, jobId) {
  return dispatch => {
    if(jobId) {
      RNFS.stopDownload(jobId);
    }
    Database.updateDownloadStatus(id, 0).then(
      dispatch(updateDownloadItem(idx, 0))
    );
  }
}


module.exports.removeDownload = function(id, idx) {
  return dispatch => {
    Database.removeDownload(id).then(dispatch(deleteDownloadItem(idx)));
  }
}





module.exports.downloadItem = function(item, idx) {
  var parentDir = path.dirname(item.filepath);

    return dispatch=>{
          //dispatch(requestDownloadItem);
          dispatch(updateDownloadItem(idx, 1));
          RNFS.mkdir(parentDir).then(() => {
            RNFS.downloadFile(item.url, item.filepath, function(info){
                Database.startDownload(item.id, info.jobId);
                dispatch(updateDownloadItem(idx, 2, null, info.jobId));
                }
              )
              .then((result) => {
                Database.downloadComplete(item.id, true);
              /*  PushNotification.localNotification({
                    message: "Background download complete: " + path.basename(item.filepath),
                });
                PushNotification.localNotificationSchedule({
                	message: "download complete",
                	date: new Date()
                });*/
                dispatch(updateDownloadItem(idx, 3, item.displayname));

                      //module.exports.fetchDownloads();
                  });
          })
          .catch((error) => {
            console.error(error);
          });
        }
}

/**
Fetch download records from DB
**/
module.exports.fetchDownloads = function() {

  console.log("GETTING FILES");
    return dispatch=>{
      dispatch(requestDownloadList())
      Database.loadDB()
      .then(Database.getDownloads()
      .then((files) => {
          console.log("GOT FILES");
          console.log(files);
          dispatch(receiveDownloadList(files));
      }))
      .catch((error) => {
         console.log("Fetch Download - DB ERROR: " + error);
      })
    };
}

/**
Note Currently used - an example of printing directory listing
**/
module.exports.fetchDownloadFiles = function(){

  console.log("GETTING FILES");
    return dispatch=>{
      dispatch(requestDownloadList())

      return RNFS.readDir(dlPath).then((files) => {
          allFiles = files.map(file => file.name + ' (' + Math.round(file.size / 1024 / 1024, 2) + 'Mb) ');
          console.log("GOT FILES");
          console.log(allFiles);
          dispatch(receiveDownloadList(allFiles));
      })
      .catch((error) => {
        // console.log("Action - DB ERROR " + error);
      })
    };
}
