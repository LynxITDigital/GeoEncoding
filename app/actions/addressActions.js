import * as types from './actionTypes';
// var fetch = require('isomorphic-fetch')

function requestPosts(url) {
  return {
    type: types.REQUEST_ADDRESS,
    url
  };
}

function receivePosts(json) {
  return {
    type: types.RECEIVE_ADDRESS,
    addresses: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchAddresses(url){

    return dispatch=>{
      dispatch(requestPosts(url))

      return fetch(url)
      .then(response=>response.json())
      .then(json=> dispatch(receivePosts(json)))
    };
}
