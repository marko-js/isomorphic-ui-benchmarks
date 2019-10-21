const React = require("react");
const ReactDOMServer = require("react-dom/server");

const App = require("./components/App");

module.exports = function(colors) {
  return function benchFn() {
    return ReactDOMServer.renderToString(<App colors={colors} />);
  };
};
