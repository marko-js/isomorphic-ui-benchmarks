var React = require("react");
var ReactDOMServer = require("react-dom/server");

module.exports = function reactRender(App, searchResultsData) {
  return ReactDOMServer.renderToString(
    <App searchResultsData={searchResultsData} />
  );
};
