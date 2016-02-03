var React = require('react-native');
var _ = require('underscore')

import {ON_PUSH, ON_POP, ON_REPLACE} from '../actions/routerActions';
const initialState = {
  routerState: ['launch'],
  count: 1
}

function router(state = initialState, action) {
  switch (action.type) {
    case ON_PUSH:

      var newRouterState = _.clone(state.routerState);
      newRouterState.push(action.route);
      var newCount = state.count + 1;

      return Object.assign({}, state, {routerState: newRouterState, count: newCount});
    case ON_POP:
      var newRouterState = _.clone(state.routerState);
      newRouterState = newRouterState.slice(0,-1);
      var newCount = state.count + 1;

      return Object.assign({}, state, {routerState: newRouterState, count: newCount});
    case ON_REPLACE:
      var newCount = state.count + 1;

      return Object.assign({}, state, {routerState: [action.route], count: newCount});
    default:
      return state;
    }
}

module.exports = router;
