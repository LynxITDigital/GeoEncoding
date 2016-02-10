var types = require('./actionTypes');

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

function receiveEmpty() {
    return {
        type: types.RECEIVE_EMPTY
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

module.exports.checkAllFav = function(addresses, database, dispatch) {
  newAddresses = [];
  var promises = [];
      for(i in addresses) {
        var address = addresses[i].formatted_address;
        promises.push(checkFav(database, address, i, addresses, newAddresses));
      }

      Promise.all(promises).then(() => {
          // // console.log("CHECKED FAVS: " + newAddresses);
            dispatch(receivePosts(newAddresses));
      });
}

function checkFav(database, address, index, addresses, newAddresses) {
  return new Promise((resolve, reject) => {
              database.isFav(address)
              .then((results) => {
                  if(results[0].rows.length > 0) {
                    newAddresses.push(Object.assign({}, addresses[index], {isFav: true}));
                  } else {
                    newAddresses.push(Object.assign({}, addresses[index], {isFav: false}));
                  }
                  resolve();
                })
              .catch((error) => {
                console.error("Action - FETCH ERROR " + error);
                reject();
              })
          });
}

module.exports.fetchAddresses = function(searchString, database){
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(searchString);
    return dispatch=>{
      dispatch(requestPosts(url))

      var jsonData;
      return fetch(url)
      .then(response =>
            response.json()
          )
      .then((json) => {
        if(json.status == "OK"){
            module.exports.checkAllFav(json.results, database, dispatch);
        } else {
            dispatch(receiveEmpty());
        }
      })
      .catch((error) => {
          // // console.log("Action - FETCH ERROR " + error);
      })
    };
}
