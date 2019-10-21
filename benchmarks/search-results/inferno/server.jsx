var Inferno = require("inferno");
var createVNode = Inferno.createVNode;
var InfernoServer = require("inferno-server");
var App = require("./components/App");

module.exports = function(getNextSearchResults) {
  return function benchFn() {
    var html = InfernoServer.renderToString(
      <App searchResultsData={getNextSearchResults()} />
    );

    return html;
  };
};
