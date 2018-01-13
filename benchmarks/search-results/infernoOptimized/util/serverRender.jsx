var Inferno = require('inferno');
var InfernoServer = require('inferno-server');

module.exports = function infernoRender(App, searchResultsData) {
    return InfernoServer.renderToString(
            <App searchResultsData={searchResultsData}/>);
};