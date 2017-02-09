var preact = require('preact');
var h = preact.h;
var renderToString = require('preact-render-to-string');

var App = require('./components/App');

module.exports = function(colors) {
    return function benchFn() {

        var html = renderToString(
                <App colors={colors}/>);

        return html;
    };
};