'use strict';

import * as actionTypes from '../../app/actions/actionTypes';

// use dontMock+require syntax to fix coverage disappearing bug
jest.dontMock('../../app/reducers/address');
const addressReducer = require('../../app/reducers/address').default;
// require.requireActual works fine for tests, however it makes test coverage disappearing currently
// const addressReducer = require.requireActual('../../app/reducers/address').default;

// TODO: a logic layer redux store should be UI independent
import {ListView} from 'react-native';
var ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });

describe('address reducer', () => {

  // TODO: a logic layer redux store should be UI independent
  const initialState = {isLoading:false, isLoadingDB: false, isEmpty: false, searchString: ''
    , addresses:ds.cloneWithRows([]), favourites:ds.cloneWithRows([])
  };
  const searchString = "melbourne";


  it('should return the initialState', () => {
    expect(
      addressReducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should response to action: change search text', () => {
    const action = {
      type: actionTypes.CHANGE_SEARCH_TEXT,
      searchString: searchString
    };

    expect(
      addressReducer(initialState, action)
    ).toEqual({
      ...initialState,
      searchString: action.searchString
    });
  });



});
