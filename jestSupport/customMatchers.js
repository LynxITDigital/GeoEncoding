import shallowHelpers from 'react-shallow-renderer-helpers';
import objectMatches from 'object-matches';
import indent from 'indent';
import inspectReactElement from 'inspect-react-element';

function findMatching(component, expectedChild) {
    let filteredComponents = shallowHelpers.filterType(component, expectedChild.type);
    let found = false;

    filteredComponents.forEach((el) => {
        found = found || objectMatches(el.props, expectedChild.props);
    });

    return found;
}

jasmine.getEnv().beforeEach(function () {
    let matchers = {
        toContainReactNodeInTreeLike(expectedChild) {
            const {actual, isNot} = this;

            let actualCode = indent(inspectReactElement(actual), 1);
            let expectedCode = indent(inspectReactElement(expectedChild), 1);

            this.message = () =>
            `Expected \n${actualCode}\n ${isNot ? 'not ' : ''}to contain a ReactNode in its tree like \n${expectedCode}\n`;

            return findMatching(actual, expectedChild);
        }
    };

    this.addMatchers(matchers);
});
