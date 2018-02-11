const { app } = require('hyperapp');
const { renderToString } = require('hyperapp-render');
const { state, actions, view } = require('./components/App');

module.exports = function(colors) {
    return function benchFn() {
        const initialState = Object.assign({}, state, { colors });
        return renderToString(view(initialState, actions));
    };
};
