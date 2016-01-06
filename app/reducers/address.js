import * as types from '../actions/actionTypes';

const initialState = {isLoading:false, searchString: '153 city road',addresses:[]};

export default function addressesByGeoEncoding(state = initialState, action = {}){
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
        return Object.assign({},state, { searchString: action.searchString});
    case types.REQUEST_ADDRESS:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ADDRESS:
      return Object.assign({},state, { isLoading:false, addresses: action.addresses});
    default:
      return state;
  }
}
