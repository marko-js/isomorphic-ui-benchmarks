const Vue = require("vue");
const renderToString = require("vue-server-renderer").createRenderer()
  .renderToString;

module.exports = function serverRender(App, searchResultsData, out) {
  const vm = new Vue({
    render(h) {
      return <App searchResultsData={searchResultsData} />;
    }
  });

  var asyncOut = out.beginAsync();

  return renderToString(vm, function(err, html) {
    if (err) {
      throw err;
    }

    asyncOut.end(html);
  });
};
