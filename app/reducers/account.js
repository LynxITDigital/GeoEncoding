import * as types from '../actions/actionTypes';
import _ from 'underscore';


var initialState = {isLoading:false, user:{}, error: false};


export default function account(state = initialState, action = {}){
  switch (action.type) {
    case types.REQUEST_ACCOUNT_DATA:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ACCOUNT_DATA:
  //     console.log("RECEIVE ACCOUNT DATA: ");
      return Object.assign({},state, { isLoading:false, user: action.response, error: false});
    case types.RECEIVE_LOGIN:
        if(action.response.error != undefined) {
            return Object.assign({},state, { isLoading:false, user: [], error: action.response.error});
        } else {
            //console.log("LOGIN SUCCESS");
            return Object.assign({},state, { isLoading:false, user: action.response, error: false});
        }
    default:
      return state;
  }
}
