var actions = exports = module.exports

exports.ON_PUSH = "ON_PUSH";
exports.ON_POP = "ON_POP";
exports.ON_REPLACE = "ON_REPLACE";

exports.onPush = function onPush(route){
  console.log("PUSH ACTION");
  return {
    type: actions.ON_PUSH,
    route: route
  }
}


exports.onPop = function onPop(){
  console.log("POP ACTION");
  return {
    type: actions.ON_POP
  }
}




exports.onReplace = function onPop(route){
  console.log("REPLACE ACTION");
  return {
    type: actions.ON_REPLACE,
    route: route
  }
}
