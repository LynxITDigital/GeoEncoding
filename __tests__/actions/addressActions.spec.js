'use strict';

const nock = require('nock');
const mockStore = require('../../__mocks__/mockStore').default;

import fetch from 'isomorphic-fetch';
const mockResponse = require('../../__mocks__/mockResponse');

import * as actionTypes from '../../app/actions/actionTypes';

// use dontMock+require syntax to fix coverage disappearing bug
jest.dontMock('../../app/actions/addressActions');
const actions = require('../../app/actions/addressActions');
// require.requireActual works fine for tests, however it makes test coverage disappearing currently
// const actions = require.requireActual('../../app/actions/addressActions');

describe('addressActions', () => {
  let searchString;

  /**
   * setup
   */
  beforeEach(() => {
    searchString = "melbourne";
  });

  /**
   * teardown
   */
  afterEach(() => {
    // cleanup for network mocks
    nock.cleanAll();
  });

  /**
   * sync ations
   */
  it('should creates an action to change search text', () => {
    const expectedAction = {
        type: actionTypes.CHANGE_SEARCH_TEXT,
        searchString: searchString
      };

    expect(actions.changeSearchText(searchString)).toEqual(expectedAction);
  });

  /**
   * async actions
   */
  pit('should creates an action to fetchAddresses', () => {
    const url = 'https://maps.googleapis.com'
    const getString = '/maps/api/geocode/json?address='
    nock(url)
    .get(getString + searchString)
    .reply(200, mockResponse.response);

    const prevState = {
      addresses : [],
      searchString : searchString,
      routes : {}
    };
    const expectedActions = [
      { type: actionTypes.REQUEST_ADDRESS, url : url + getString + searchString},
      { type: actionTypes.RECEIVE_ADDRESS, addresses: mockResponse.response1.results}
    ];

    const store = mockStore(prevState, expectedActions);
    return store.dispatch(actions.fetchAddresses(searchString));
  });

});
