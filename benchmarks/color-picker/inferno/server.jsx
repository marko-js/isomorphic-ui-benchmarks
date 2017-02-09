var Inferno = require('inferno');
var InfernoServer = require('inferno-server');
var App = require('./components/App');

module.exports = function(colors) {
    return function benchFn() {
        var html = InfernoServer.renderToString(
                <App colors={colors}/>);

        return html;
    };
};