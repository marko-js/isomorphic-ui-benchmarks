var React = require('react');
var ReactDOMServer = require('react-dom/server');

module.exports = function reactRender(App, colors) {
    return ReactDOMServer.renderToString(
            <App colors={colors}/>);
};