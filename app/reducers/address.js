import { combineReducers } from 'redux'
import * as types from '../actions/actionTypes'

function addressesByGeoEncoding(state={isLoading:false,addresses:[]}, action){
  switch (action.type) {
    case types.REQUEST_ADDRESS:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ADDRESS:
      return Object.assign({},state, { isLoading:false, addresses: action.addresses});
    default:
      return state

  }
}

const rootReducer = combineReducers({ addressesByGeoEncoding})

export default rootReducer
