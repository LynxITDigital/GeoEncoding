var React = require('react-native');
import {ON_PUSH, ON_POP} from '../actions/routerActions';
const initialState = {
  routerState: ['geoLocationSearch']
}

function router(state = initialState, action) {
  switch (action.type) {
    case ON_PUSH:
      var newRouterState = action.routerState
      newRouterState.push(action.route)
      return {
        ...state,
        routerState: newRouterState
      };
    case ON_POP:
    var newRouterState = action.routerState
    newRouterState = newRouterState.slice(0, -1)
      return {
        ...state,
        routerState: newRouterState
      };
    default:
      return state;
    }
}

module.exports = router;
