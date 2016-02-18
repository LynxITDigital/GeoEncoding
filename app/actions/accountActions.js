var types = require('./actionTypes');
import * as routerActions from '../actions/routerActions';
import Database from '../database/database';


function requestData() {
  return {
    type: types.REQUEST_ACCOUNT_DATA
  };
}


function receiveLogin(response) {
  return {
    type: types.RECEIVE_LOGIN,
    response
  };
}

function receiveAccountData(response) {
  return {
    type: types.RECEIVE_ACCOUNT_DATA,
    response
  };
}

var host = '192.168.48.17';

/**
Fetch download records from DB
**/
module.exports.doLogin = function(data) {

   //console.log("LOGGING IN");
    return dispatch=>{
      dispatch(requestData())
      return fetch("http://" + host + ":3000/ws/login", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response =>
            response.json()
      )
      .then((json) => {
          console.log(json);
          dispatch(receiveLogin(json))
      })
      .catch((error) => {
         console.log("Action - FETCH ERROR " + error);
      })


      //Send Login Request
    };
}

module.exports.signUp = function(data){

   //console.log("SIGNING UP");
    return dispatch=>{
      dispatch(requestData())

      return fetch("http://" + host + ":3000/db/users", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response =>
            response.json()
          )
      .then((json) => {
          console.log(json);
          dispatch(receiveAccountData(json));
      })
      .catch((error) => {
          console.log("Action - FETCH ERROR " + error);
          dispatch(receiveAccountData(json));
      })


      //Send Login Request
    };
}



module.exports.updateAccount = function(data){

//   console.log("UPDATING ACCOUNT");
    return dispatch=>{
      dispatch(requestData())

      return fetch("http://" + host + ":3000/db/users/"+data._id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response =>
            response.json()
          )
      .then((json) => {
          console.log(json);
          dispatch(receiveAccountData(json));
      })
      .catch((error) => {
           console.log("Action - FETCH ERROR " + error);
      })

    };
}
