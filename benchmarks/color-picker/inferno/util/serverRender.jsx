var Inferno = require("inferno");
var InfernoServer = require("inferno-server");

module.exports = function infernoRender(App, colors) {
  return InfernoServer.renderToString(<App colors={colors} />);
};
