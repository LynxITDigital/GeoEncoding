// GLOBAL.__DEV__ = true
// require("babel-register")({
//   // This will override `node_modules` ignoring - you can alternatively pass
//   // an array of strings to be explicitly matched or a regex / glob
//   ignore: false
// });
//
// // require("babel-core").transform("code", options);
//
// var expect = require('expect')
// var actionTypes = require('../app/actions/actionTypes')
// var reducer = require('../app/reducers/address')
//
// // let expect = require('chai').use(require("sinon-chai")).expect;
// // let proxyquire = require('proxyquire');
// // let sinon = require('sinon');
// const initialState = {isLoading:false, searchString: '153 city road',addresses:[]};
//
// describe('Address reducer', ()=>{
//
//   // let configureSpy;
//   // let authorizeSpy;
//   // let simpleAuthClient;
//   //
//   // before(() => {
//   //   configureSpy = sinon.spy();
//   //   authorizeSpy = sinon.spy();
//   //   simpleAuthClient = proxyquire({
//   //     'react-native': {
//   //       NativeModules: {},
//   //       '@noCallThru': true
//   //     }
//   //   });
//   //
//   //   // var ds = new simpleAuthClient.ListView.DataSource({ rowHasChanged:(r1,r2) => r1.place_id !== r2.place_id });
//   //   // const initialState = {isLoading:false, searchString: '153 city road',addresses:ds.cloneWithRows([])};
//   //
//   //
//   // });
//
//   // afterEach(() => {
//   //   configureSpy.reset();
//   //   authorizeSpy.reset();
//   // });
//   //
//   // after(() => {
//   //   configureSpy = null;
//   //   authorizeSpy = null;
//   //   simpleAuthClient = null;
//   // });
//
//   it('should return the initial state', ()=>{
//     expect(reducer.addressesByGeoEncoding(undefined,{}))
//     .toEqual(initialState)
//   })
//
//
//
//
// })
