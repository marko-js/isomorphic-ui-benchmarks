const React = require("react");
const ReactDOMServer = require("react-dom/server");

module.exports = function reactRender(App, colors) {
  return ReactDOMServer.renderToString(<App colors={colors} />);
};
