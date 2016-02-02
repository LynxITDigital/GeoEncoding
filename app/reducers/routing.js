const React = require('react-native');
const {AppRegistry, Navigator, StyleSheet,Text,View} = React;
const { bindActionCreators }  = require ('redux')
const { connect } = require ('react-redux/native')
const GeoLocationSearch = require('../components/GeoLocationSearch')
const LocationDetail = require('../components/LocationDetail')
const locationActions = require('../actions/locationActions')
var {Router, Route, Schema, Animations, TabBar} = require('react-native-router-flux');

const mapStateToProps = state => ({
    locations:      state.location.locations,
    isLoading:      state.location.isLoading,
    searchString:   state.location.searchString,
    routerState:    state.router.routerState
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...locationActions,
  }, dispatch),
  dispatch
});

class Routing extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("---ROUTER STATE---")
    console.log(this.props.routerState)
      return (
          <Router
                  onPush={(route)=>{
                    this.props.actions.onPush(route.name, this.props.routerState); return true}}
                  onPop={()=>{
                    this.props.actions.onPop(this.props.routerState); return true}}>
              <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
              <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>

              <Route name="geoLocationSearch" component={connect(mapStateToProps, mapDispatchToProps)(GeoLocationSearch)} title="Geo Location Search" hideNavBar={false} initial={true}/>
              <Route name="locationDetail" component={(LocationDetail)} title="Location Detail"/>
          </Router>
      );
  }
}

module.exports = Routing
