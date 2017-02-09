var preact = require('preact');
var h = preact.h;
var renderToString = require('preact-render-to-string');

module.exports = function reactRender(App, colors) {
    return renderToString(
            <App colors={colors}/>);
};