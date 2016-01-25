const React = require('react-native');
const { Text, View, TouchableWithoutFeedback } = React;
const Banner = require.requireActual('../../app/components/Banner');

const shallowHelpers = require('react-shallow-renderer-helpers');
const shallowRenderer = shallowHelpers.createRenderer();

describe('Banner', function() {
    it('should render TouchableWithoutFeedback component', () => {

        shallowRenderer.render(() => <Banner title="Hi" />);
        let output = shallowRenderer.getRenderOutput();
        expect(output.props.children.props.children[0].props.children).toBe("Hi")
    });

    // it('should use default title', () => {
    //     shallowRenderer.render(() => <Banner />);
    //     let output = shallowRenderer.getRenderOutput();
    //
    //     expect(output).toContainReactNodeInTreeLike(<Text>MyBanner</Text>);
    // });
    //
    // it('should use pass title if set', () => {
    //     shallowRenderer.render(() => <Banner title="Hello" />);
    //     let output = shallowRenderer.getRenderOutput();
    //
    //     expect(output).toContainReactNodeInTreeLike(<Text>Hello</Text>);
    // });
    //
    // describe('clicks', () => {
    //     it('should increase clicks counter on every onClick call', () => {
    //         shallowRenderer.render(() => <Banner />);
    //
    //         let instance = shallowRenderer.getMountedInstance();
    //         let output;
    //
    //         output = shallowRenderer.getRenderOutput();
    //         expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {0}</Text>);
    //
    //         instance.onClick();
    //
    //         output = shallowRenderer.getRenderOutput();
    //         expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {1}</Text>);
    //     });
    // });
});
