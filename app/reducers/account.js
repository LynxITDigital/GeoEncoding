import * as types from '../actions/actionTypes';
import _ from 'underscore';


var initialState = {isLoading:false, user:{}};


export default function account(state = initialState, action = {}){
  // // console.log("Receiver executed for action : " + action.type);
  switch (action.type) {
    case types.REQUEST_ACCOUNT_DATA:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ACCOUNT_DATA:
      // console.log("RECEIVE DOWNLOAD REDUCER: ");
      // console.log(action.downloads);
      return Object.assign({},state, { isLoading:false, user: action.user});
    case types.RECEIVE_LOGIN:
        // console.log("RECEIVE DOWNLOAD ITEM REDUCER: ");
        return Object.assign({},state, { user: action.response});
    default:
      return state;
  }
}
