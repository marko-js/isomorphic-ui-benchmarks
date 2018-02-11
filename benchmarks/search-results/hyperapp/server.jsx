const { app } = require('hyperapp');
const { renderToString } = require('hyperapp-render');
const { state, actions, view } = require('./components/App');

module.exports = function(getNextSearchResults) {
    return function benchFn() {
        const initialState = Object.assign({}, state, {
            getNextSearchResults: getNextSearchResults(),
        });
        return renderToString(view(initialState, actions))
    };
};
