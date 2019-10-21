var preact = require("preact");
var h = preact.h;
var renderToString = require("preact-render-to-string");

var App = require("./components/App");

module.exports = function(getNextSearchResults) {
  return function benchFn() {
    var html = renderToString(
      <App searchResultsData={getNextSearchResults()} />
    );

    return html;
  };
};
