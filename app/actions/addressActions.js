var types = require('./actionTypes');
var queryFavourites = require('../database/database');

function requestPosts(url) {
  return {
    type: types.REQUEST_ADDRESS,
    url
  };
}

function receivePosts(results) {
  return {
    type: types.RECEIVE_ADDRESS,
    addresses: results
  };
}


function requestFavDB() {
  return {
    type: types.REQUEST_FAV_DB
  };
}



function receiveFavDB(results) {
  return {
    type: types.RECEIVE_FAV_DB,
    addresses: results
  };
}



function updateSearchText(searchString){
  return{
    type: types.CHANGE_SEARCH_TEXT,
    searchString: searchString
  }
}

function reset(){
  return{
    type: types.RESET_STATE
  }
}

function getDetials(routerAction){
  return{
    type: types.ROW_PRESS,
    routerAction: routerAction
  }

}

function routePop(fnPop, num){
  return{
    type: types.ROUTE_POP,
    num : num,
    fnPop : fnPop
  }
}

module.exports.resetState = function(){
  return dispatch=>{
    dispatch(reset())

  }
}

module.exports.rowPress = function(routerAction){
  return dispatch=>{
    dispatch(getDetials(routerAction))
    // routerAction()
  }
}

module.exports.onRoutePop = function(fnPop, num){
  return dispatch=>{
    dispatch(routePop(fnPop, num))
  }
}

module.exports.changeSearchText = function (searchString){
    return dispatch=>{
      dispatch(updateSearchText(searchString))
    };
}

module.exports.fetchAddresses = function(searchString){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(searchString);
    return dispatch=>{
      dispatch(requestPosts(url))

      return fetch(url)
      .then(response=>response.json())
      .then(json=>
        dispatch(receivePosts(json.results))
      )
      .catch((error) => {
        console.log("Action - FETCH ERROR " + error);
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
