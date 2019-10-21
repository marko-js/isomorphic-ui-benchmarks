var React = require("react");
var ReactDOMServer = require("react-dom/server");

var App = require("./components/App");

module.exports = function(getNextSearchResults) {
  return function benchFn() {
    var html = ReactDOMServer.renderToString(
      <App searchResultsData={getNextSearchResults()} />
    );

    return html;
  };
};
