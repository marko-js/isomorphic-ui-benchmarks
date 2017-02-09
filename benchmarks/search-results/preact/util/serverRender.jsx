var preact = require('preact');
var h = preact.h;
var renderToString = require('preact-render-to-string');

module.exports = function reactRender(App, searchResultsData) {
    return renderToString(
            <App searchResultsData={searchResultsData}/>);
};