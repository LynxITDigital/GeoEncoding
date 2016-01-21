var configuerMockStore = require('redux-mock-store')
var nock = require('nock')
var thunk = require('redux-thunk')
var actionTypes = require('../app/actions/actionTypes')
var actions = require('../app/actions/addressActions')
var responseMock = require('./mock/response')
require('es6-promise').polyfill();
require('isomorphic-fetch');

const middlewares = [thunk]
const mockStore = configuerMockStore(middlewares)
const searchString = "melbourne";

function setupStore(expectedActions,done){
  return mockStore({
    addresses : [],
    searchString : searchString,
    routes : {}
  }, expectedActions, done)
}

describe('Enter searchString action', ()=>{
  afterEach(()=> {
    nock.cleanAll()
  })

  it('creates an action to change search text',(done)=>{
    const expectedActions = [
      { type: actionTypes.CHANGE_SEARCH_TEXT, searchString},
    ]
    var store = setupStore(expectedActions,done)
    store.dispatch(actions.changeSearchText(searchString))
  })
})

describe('Fetch addres async action', ()=>{
  afterEach(()=> {
    nock.cleanAll()
  })

  it('creates an action to fetchAddresses',(done)=>{
    const url = 'https://maps.googleapis.com'
    const getString = '/maps/api/geocode/json?address='
    nock(url)
    .get(getString + searchString)
    .reply(200, responseMock.response)

    const expectedActions = [
      { type: actionTypes.REQUEST_ADDRESS, url : url+ getString + searchString},
      { type: actionTypes.RECEIVE_ADDRESS, addresses: responseMock.response.results}
    ]
    // var store = setupStore(expectedActions,done)
    const store = mockStore({
      addresses : [],
      searchString : searchString,
      routes : {}
    }, expectedActions, done)

    store.dispatch(actions.fetchAddresses(searchString))
  })
})
