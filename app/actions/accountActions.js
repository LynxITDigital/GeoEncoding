var types = require('./actionTypes');
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



/**
Fetch download records from DB
**/
module.exports.doLogin = function(data) {

   console.log("LOGGING IN");
    return dispatch=>{
      dispatch(requestData())

      return fetch("http://localhost:3000/ws/login", {
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
          dispatch(receiveLogin(json));
      })
      .catch((error) => {
          // // console.log("Action - FETCH ERROR " + error);
      })


      //Send Login Request
    };
}

module.exports.signUp = function(){

   console.log("SIGNING UP");
    return dispatch=>{
      dispatch(requestData())
    };
}



module.exports.updateAccount = function(){

   console.log("UPDATING ACCOUNT");
    return dispatch=>{
      dispatch(requestData())
    };
}
