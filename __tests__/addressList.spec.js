const React = require('react-native');
const { Text,TextInput, TouchableWithoutFeedback, View } = React;
const AddressList = require.requireActual('../app/components/addressList');
const shallowHelpers = require('react-shallow-renderer-helpers');
const shallowRenderer = shallowHelpers.createRenderer();
// const TestUtils = require('react-addons-test-utils')
// const ReactDOM = require('react-dom')
// const expect = require('expect')

describe('AddressList', function() {
    it('should render TextInput placeholder', () => {
      shallowRenderer.render(() => <AddressList />);
      let output = shallowRenderer.getRenderOutput();
      expect("Search location").toBe(output.props.children[1].props.children.props.placeholder);
    });

    it('should render searchString property', () => {
      shallowRenderer.render(() => <AddressList searchString="melbourne"/>);
      let output = shallowRenderer.getRenderOutput();
      expect("melbourne").toBe(output.props.children[1].props.children.props.value);
    });

});
