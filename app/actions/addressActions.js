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


function checkFav(database, address, index, json, jsonData) {
  return new Promise((resolve, reject) => {
              database.isFav(address)
              .then((results) => {
                  if(results[0].rows.length > 0) {
                    jsonData.push(Object.assign({}, json.results[index], {isFav: true}));
                  } else {
                    jsonData.push(Object.assign({}, json.results[index], {isFav: false}));
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
        jsonData = [];
        var promises = [];
        for(i in json.results) {
          var address = json.results[i].formatted_address;
          promises.push(checkFav(database, address, i, json, jsonData));
        }
        Promise.all(promises).then(() => {
              dispatch(receivePosts(jsonData));
        });
      })
      .catch((error) => {
        // console.log("Action - FETCH ERROR " + error);
      })
    };
}
