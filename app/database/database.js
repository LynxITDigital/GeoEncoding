var SQLite = require('react-native-sqlite-storage');
var path = require('path');
var RNFS = require('react-native-fs');
const dlPath = RNFS.DocumentDirectoryPath + '/downloads';

SQLite.DEBUG(false);
SQLite.enablePromise(true);


var database_name = "GeoEncoding.db";
var database_version = "1.0";
var database_displayname = "GeoEncoding Database";
var database_size = 200000;
var db;

  var favourites;

var Database = {


  componentWillUnmount(){
      this.closeDatabase();
  },

  errorCB(err) {
      // // console.log("error: ",err);
  },

  checkDB() {
    return new Promise((resolve, reject) => {
        db.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='Downloads'")
          .then((results) => {
            if(results[0].rows.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(err => {
            resolve(false);
          })
    });
  },

  initDB(tx) {
    var that = this;
    tx.executeSql('CREATE TABLE IF NOT EXISTS Favourites( '
        + 'id INTEGER PRIMARY KEY NOT NULL, '
        + 'address VARCHAR(256), '
        + 'longtitude FLOAT, '
        + 'latitude FLOAT ) ; ');

    tx.executeSql('CREATE TABLE IF NOT EXISTS Downloads( '
            + 'id INTEGER PRIMARY KEY NOT NULL, '
            + 'url VARCHAR(256), '
            + 'filepath VARCHAR(256), '
            + 'displayname VARCHAR(128), '
            + 'jobId INTEGER, '
            + 'status INT DEFAULT 0 ) ; ');
            /*Status: 0 - not downloaded
                      1 - download requested
                      2 - download started
                      3 - downloaded */

      tx.executeSql('INSERT INTO Downloads (url, filepath, displayname, status) VALUES (?, ?, ?, 0)', ['https://www.dropbox.com/s/gzf7bel1a1nyyof/Sample480.mov?dl=1', dlPath+'/Sample480.mov', 'Sample 480p (6Mb)']);
      tx.executeSql('INSERT INTO Downloads (url, filepath, displayname, status) VALUES (?, ?, ?, 0)', ['https://www.dropbox.com/s/tyhk1xwuw3mhqe9/Sample1080.mov?dl=1', dlPath+'/Sample1080.mov', 'Sample 1080p (21Mb)']);
      tx.executeSql('INSERT INTO Downloads (url, filepath, displayname, status) VALUES (?, ?, ?, 0)', ['https://www.dropbox.com/s/41zc3h93y138g65/Sample.mp4?dl=1', dlPath+'/Sample.mp4', 'Sample Large (120Mb)']);


  },

  loadDB() {
    return new Promise((resolve, reject) => {
      SQLite.openDatabase(database_name, database_version, database_displayname, database_size)
      .then((DB) => {
        db = DB;
        that = this;
         // console.log(db);
         that.checkDB().then(exists => {
           if(!exists) {
             db.transaction(that.initDB);
             resolve(db);
           } else {
             resolve(db);
           }
         });
        // // console.log("Opened Database!");
        //Init DB
      })
      .catch((error) => {
        // // console.log(error);
        reject(error);
    });
  });
},


  /*** Favourites ***/
  insertAddress(address) {
      return new Promise((resolve, reject) => {
          db.executeSql("INSERT INTO Favourites(address) VALUES(?)", [address]).then((results) => {
              console.log('inserted' + results);
              resolve(results[0].insertId);
          }
          );
        });
  },

  removeAddress(id) {
      return new Promise((resolve, reject) => {
          db.transaction((tx) => {
                tx.executeSql("DELETE FROM Favourites WHERE id=?", [id])
              })
              .then(() => {
                resolve();
              });
            });

  },

  removeFavourite(address) {

      return new Promise((resolve, reject) => {
          db.executeSql("DELETE FROM Favourites WHERE address=?", [address])
            .then(() => {
              resolve();
            })
            .catch((error) => {
              // // console.log("CAUGHT ERROR");
              // // console.log(error);
              reject();
            });
        });
  },


  getFavourites() {
      // // console.log('QUERYING FAVS');
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT id, address FROM favourites')
          .then((results) => {
              var len = results[0].rows.length;
              favourites = [];
              for (let i = 0; i < len; i++) {
                  let row = results[0].rows.item(i);
                  // // console.log(`Address: ${row.address}`);
                  favourites.push({id: row.id, address: row.address});
              }
              resolve(favourites);
        }).catch((error) => {
            // // console.log(error);
            reject(error);
        });
    });
  },


  isFav(address) {
      return db.executeSql("SELECT id FROM favourites WHERE address = ?", [address]);
  },

  /*** Downloads ***/
  getDownloads() {
      // // console.log('QUERYING FAVS');
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT id, url, filepath, displayname, jobId, status FROM Downloads')
          .then((results) => {
              var len = results[0].rows.length;
              downloads = [];
              for (let i = 0; i < len; i++) {
                  let row = results[0].rows.item(i);
                  // // console.log(`Address: ${row.address}`);
                  downloads.push(row);
              }
              resolve(downloads);
        }).catch((error) => {
            // // console.log(error);
            reject(error);
        });
    });
  },

    insertDownload(url) {
        // // console.log('QUERYING FAVS');
        var basename = path.basename(url.substring(url.indexOf('?')));
        return new Promise((resolve, reject) => {
          db.executeSql('INSERT INTO Downloads (url, filepath, displayname, status) VALUES (?, ?, ?, 2)', [url, dlPath + '/' + basename, basename])
            .then((results) => {
                resolve(results.id);
          }).catch((error) => {
              // // console.log(error);
              reject(error);
          });
      });
    },


    updateDownloadStatus(id, status) {
            // // console.log('QUERYING FAVS');
            return new Promise((resolve, reject) => {
              db.executeSql('UPDATE Downloads SET status = ?, jobId = NULL WHERE id = ?', [status, id])
                .then((results) => {
                    resolve();
              }).catch((error) => {
                  // // console.log(error);
                  reject(error);
              });
          });
        },


      startDownload(id, jobId) {
              // // console.log('QUERYING FAVS');
              return new Promise((resolve, reject) => {
                db.executeSql('UPDATE Downloads SET status = 2, jobId = ? WHERE id = ?', [jobId, id])
                  .then((results) => {
                      resolve();
                }).catch((error) => {
                    // // console.log(error);
                    reject(error);
                });
            });
          },

    downloadComplete(id, success) {
        // // console.log('QUERYING FAVS');
        return new Promise((resolve, reject) => {
          db.executeSql('UPDATE Downloads SET status = 3, jobId = NULL WHERE id = ?', [id])
            .then((results) => {
                resolve();
          }).catch((error) => {
              // // console.log(error);
              reject(error);
          });
      });
    },

      removeDownload(id) {
          // // console.log('QUERYING FAVS');
          return new Promise((resolve, reject) => {
            db.executeSql('DELETE FROM Downloads WHERE id = ?', [id])
              .then((results) => {
                  resolve();
            }).catch((error) => {
                // // console.log(error);
                reject(error);
            });
        });
      }

};

module.exports = Database;
