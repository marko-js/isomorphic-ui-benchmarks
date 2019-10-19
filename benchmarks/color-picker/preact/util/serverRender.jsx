const preact = require('preact');
const renderToString = require('preact-render-to-string');

module.exports = function reactRender(App, colors) {
    return renderToString(
            <App colors={colors}/>);
};