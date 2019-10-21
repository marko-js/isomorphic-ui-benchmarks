var Inferno = require("inferno");
var hydrate = require("inferno-hydrate").hydrate;
var createVNode = Inferno.createVNode;

var App = require("./components/App");

var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
  hydrate(<App searchResultsData={window.searchResultsData} />, mountNode);

  console.log("Re-rendering on client completed");
}

window.addBench("inferno", function(el, getNextSearchResults) {
  Inferno.render(<App searchResultsData={getNextSearchResults()} />, el);

  return function(done) {
    Inferno.render(<App searchResultsData={getNextSearchResults()} />, el);

    done();
  };
});
