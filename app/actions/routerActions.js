exports.ON_PUSH = "ON_PUSH";
exports.ON_POP = "ON_POP";

exports.onPush = function onPush(route, routerState){
  return {
    type: exports.ON_PUSH,
    route: route,
    routerState: routerState
  }
}


exports.onPop = function onPop(route, routerState){
  return {
    type: exports.ON_POP,
    routerState: routerState
  }
}
