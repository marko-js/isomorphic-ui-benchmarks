const preact = require("preact");
const renderToString = require("preact-render-to-string");
const App = require("./components/App");

module.exports = function(colors) {
  return function benchFn() {
    var html = renderToString(<App colors={colors} />);

    return html;
  };
};
