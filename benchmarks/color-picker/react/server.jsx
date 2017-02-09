var React = require('react');
var ReactDOMServer = require('react-dom/server');

var App = require('./components/App');

module.exports = function(colors) {
    return function benchFn() {

        var html = ReactDOMServer.renderToString(
                <App colors={colors}/>);

        return html;
    };
};