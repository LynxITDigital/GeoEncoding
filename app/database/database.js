var SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);
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
      // console.log("error: ",err);
  },

  initDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS Favourites( '
        + 'id INTEGER PRIMARY KEY NOT NULL, '
        + 'address VARCHAR(256), '
        + 'longtitude FLOAT, '
        + 'latitude FLOAT ) ; ');
  },

  loadDB() {
    return SQLite.openDatabase(database_name, database_version, database_displayname, database_size).then((DB) => {
        db = DB;
        that = this;
        // console.log(db);
        // console.log("Opened Database!");
        //Init DB
        return db.transaction(that.initDB);

    }).catch((error) => {
        // console.log(error);
    });
  },

  insertAddress(address) {
      db.executeSql("INSERT INTO Favourites(address) VALUES(?)", [address]);
  },

  removeAddress(id) {
      return db.transaction((tx) => {
                tx.executeSql("DELETE FROM Favourites WHERE id=?", [id])

                })

  },

  removeAddressDB(id) {
      return db.executeSql("DELETE FROM Favourites WHERE id=?", [id])
        .catch((error) => {
          // console.log("CAUGHT ERROR");
          // console.log(error);
        });
  },


  queryFavourites(tx) {

      // console.log('QUERYING FAVS');
      return tx.executeSql('SELECT id, address FROM favourites').then(([tx,results]) => {
        var len = results.rows.length;
        favourites = [];
        for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            // console.log(`Address: ${row.address}`);
            favourites.push({id: row.id, address: row.address});
        }
        return favourites;
    }).catch((error) => {
        // console.log(error);
    });
  },

  getFavourites() {
    // console.log("FAVE");
      return db.transaction(this.queryFavourites);
  },

  getFav() {
    return favourites;
  }

};

module.exports = Database;
