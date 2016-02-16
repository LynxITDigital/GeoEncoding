import * as types from '../actions/actionTypes';
import {ListView} from 'react-native';
import _ from 'underscore';

// TODO: a logic layer redux store should be UI independent
var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });
var initialState = {isLoading:false, isLoadingDB: false, isEmpty: false, searchString: '', addresses:ds.cloneWithRows([]), favourites:ds.cloneWithRows([])};


export default function addressesByGeoEncoding(state = initialState, action = {}){
  // // console.log("Receiver executed for action : " + action.type);
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
        return Object.assign({},state, { searchString: action.searchString});
    case types.REQUEST_ADDRESS:
        return Object.assign({},state, { isLoading:true});
    case types.RECEIVE_ADDRESS:
      return Object.assign({},state, { isEmpty: false, isLoading:false, addresses: ds.cloneWithRows(action.addresses)});
    case types.RECEIVE_EMPTY:
      return Object.assign({}, state, { isEmpty: true, isLoading: false} )
    case types.DB_FAV_ADDED:
      //copy current address list
      var newAddresses = _.clone(state.addresses._dataBlob.s1);
      //Update favourite for row
      newAddresses[action.index].isFav = true;
      //Add to favourites list as well, in case tab is switched
      var newFavourites = _.clone(state.favourites._dataBlob.s1);
      if(newFavourites != undefined) {
        newFavourites.push({id: action.id, address: newAddresses[action.index].formatted_address});
      }
      //update list provider
      return Object.assign({}, state, { addresses: ds.cloneWithRows(newAddresses), favourites: ds.cloneWithRows(newFavourites)});
    case types.DB_UNFAV:
        //copy current address list
        var newAddresses = _.clone(state.addresses._dataBlob.s1);
        //Update favourite for row
        newAddresses[action.index].isFav = false;
        //Remove from favourites list as well, in case tab is switched
        var newFavourites = _.clone(state.favourites._dataBlob.s1);
        if(newFavourites != undefined) {
          //Find in favourites list and remove
          for(i in newFavourites) {
            if(newFavourites[i].address == action.address) {
                newFavourites.splice(i, 1);
                break;
            }
          }
        }
        //update list provider
        return Object.assign({}, state, { addresses: ds.cloneWithRows(newAddresses), favourites: ds.cloneWithRows(newFavourites)});
    case types.DB_FAV_REMOVED:
        var newFavourites = _.clone(state.favourites._dataBlob.s1);
        newFavourites.splice(action.index, 1);

        return Object.assign({}, state, { favourites: ds.cloneWithRows(newFavourites)});
    case types.REQUEST_DB_DATA:
        return Object.assign({},state, { });
    case types.RECEIVE_DB_DATA:
      return Object.assign({},state, { favourites: ds.cloneWithRows(action.results)});
    case types.RESET_STATE:
      return Object.assign({},state, initialState);
    case types.ROW_PRESS:
      action.routerAction()
      return state;
    case types.ROUTE_POP:
      // // console.log("POP : " +  action);
      action.fnPop();
      return state;
    default:
      return state;
  }
}
