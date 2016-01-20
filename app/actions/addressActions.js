import * as types from './actionTypes';

function requestPosts(url) {
  return {
    type: types.REQUEST_ADDRESS,
    url
  };
}

function receivePosts(results) {
  console.log("Action - receive posts :" + results);
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
export function resetState(){
  return dispatch=>{
    dispatch(reset())

  }
}

function getDetials(routerAction){
  return{
    type: types.ROW_PRESS,
    routerAction: routerAction
  }

}

export function rowPress(routerAction){
  return dispatch=>{
    dispatch(getDetials(routerAction))
    // routerAction()
  }
}

function routePop(fnPop, num){
  return{
    type: types.ROUTE_POP,
    num : num,
    fnPop : fnPop
  }
}

export function onRoutePop(fnPop, num){

  console.log("Actions - onRoutePop :" + num);

  return dispatch=>{
    dispatch(routePop(fnPop, num))
  }
}

export function changeSearchText(searchString){
    return dispatch=>{
      dispatch(updateSearchText(searchString))
    };
}

export function fetchAddresses(searchString){

    console.log("Action - fetchAddresses with searchString : " + searchString);

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
