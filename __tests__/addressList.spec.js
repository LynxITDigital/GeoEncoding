// const React = require('react-native');
// const { Text, View, TouchableWithoutFeedback } = React;
// const AddressList = require.requireActual('../app/components/addressList');
//
// const shallowHelpers = require('react-shallow-renderer-helpers');
// const shallowRenderer = shallowHelpers.createRenderer();
// console.log("TESTXXX");
// describe('AddressList', function() {
//     it('should render View component', () => {
//         shallowRenderer.render(() => <AddressList />);
//         let output = shallowRenderer.getRenderOutput();
//
//         expect(output).toContainReactNodeInTreeLike(<View />);
//     });
//     //
//     // it('should use default title', () => {
//     //     shallowRenderer.render(() => <Banner />);
//     //     let output = shallowRenderer.getRenderOutput();
//     //
//     //     expect(output).toContainReactNodeInTreeLike(<Text>MyBanner</Text>);
//     // });
//     //
//     // it('should use pass title if set', () => {
//     //     shallowRenderer.render(() => <Banner title="Hello" />);
//     //     let output = shallowRenderer.getRenderOutput();
//     //
//     //     expect(output).toContainReactNodeInTreeLike(<Text>Hello</Text>);
//     // });
//     //
//     // describe('clicks', () => {
//     //     it('should increase clicks counter on every onClick call', () => {
//     //         shallowRenderer.render(() => <Banner />);
//     //
//     //         let instance = shallowRenderer.getMountedInstance();
//     //         let output;
//     //
//     //         output = shallowRenderer.getRenderOutput();
//     //         expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {0}</Text>);
//     //
//     //         instance.onClick();
//     //
//     //         output = shallowRenderer.getRenderOutput();
//     //         expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {1}</Text>);
//     //     });
//     // });
// });
//
// //
// // const React = require('react-native');
// // const { Text, View, TouchableWithoutFeedback } = React;
// // const Banner = require.requireActual('../../src/components/Banner');
// //
// // const shallowHelpers = require('react-shallow-renderer-helpers');
// // const shallowRenderer = shallowHelpers.createRenderer();
// //
// // describe('Banner', function() {
// //     it('should render TouchableWithoutFeedback component', () => {
// //         shallowRenderer.render(() => <Banner />);
// //         let output = shallowRenderer.getRenderOutput();
// //
// //         expect(output).toContainReactNodeInTreeLike(<TouchableWithoutFeedback />);
// //     });
// //
// //     it('should use default title', () => {
// //         shallowRenderer.render(() => <Banner />);
// //         let output = shallowRenderer.getRenderOutput();
// //
// //         expect(output).toContainReactNodeInTreeLike(<Text>MyBanner</Text>);
// //     });
// //
// //     it('should use pass title if set', () => {
// //         shallowRenderer.render(() => <Banner title="Hello1" />);
// //         let output = shallowRenderer.getRenderOutput();
// //
// //         expect(output).toContainReactNodeInTreeLike(<Text>Hello</Text>);
// //     });
// //
// //     describe('clicks', () => {
// //         it('should increase clicks counter on every onClick call', () => {
// //             shallowRenderer.render(() => <Banner />);
// //
// //             let instance = shallowRenderer.getMountedInstance();
// //             let output;
// //
// //             output = shallowRenderer.getRenderOutput();
// //             expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {0}</Text>);
// //
// //             instance.onClick();
// //
// //             output = shallowRenderer.getRenderOutput();
// //             expect(output).toContainReactNodeInTreeLike(<Text>Clicks: {1}</Text>);
// //         });
// //     });
// // });
