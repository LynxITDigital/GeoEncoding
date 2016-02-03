var types = require('./actionTypes');


function requestFavDB() {
  return {
    type: types.REQUEST_DB_DATA
  };
}

function receiveFavDB(results) {
  return {
    type: types.RECEIVE_DB_DATA,
    results
  };
}

function insertFavDB(address) {
  return {
    type: types.REQUEST_DB_INSERT,
    address
  };
}

function removeFavDB(results) {
  return {
    type: types.REQUEST_DB_DELETE,
    results
  };
}

function dbUpdated(results) {
  return {
    type: types.DB_UPDATED,
  }
}


module.exports.insertFavourites = function(db){

console.log("FETCHING FAVS");
    return dispatch=>{
      dispatch(requestFavDB())

      return db.getFavourites().then((tx, result) => {
          console.log('FETCHED FAVS');
          console.log(db.getFav());
          //console.log(favourites);
          //console.log(db.favourites);

          dispatch(receiveFavDB(db.getFav()));
      })
      .catch((error) => {
        console.log("Action - DB ERROR " + error);
      })
    };
}




module.exports.removeFavourites = function(db, id){

console.log("REMOVING FAVS");
    return dispatch=>{
      
        return db.removeAddress(id)
          .then((tx, result) => {
            dispatch(dbUpdated());
          })
          .catch((error) => {
            console.log("Action - DB REMOVE ERROR " + error);
          })
    };
}




module.exports.fetchFavourites = function(db){

console.log("FETCHING FAVS");
    return dispatch=>{
      dispatch(requestFavDB())

      return db.getFavourites().then((tx, result) => {
          console.log('FETCHED FAVS');
          console.log(db.getFav());
          //console.log(favourites);
          //console.log(db.favourites);

          dispatch(receiveFavDB(db.getFav()));
      })
      .catch((error) => {
        console.log("Action - DB ERROR " + error);
      })
    };
}
