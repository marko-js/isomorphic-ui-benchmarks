const Vue = require("vue");
const renderToString = require("vue-server-renderer").createRenderer()
  .renderToString;

var App = require("./components/App.server").default;

module.exports = function(colors) {
  return function benchFn(done) {
    const vm = new Vue({
      render(h) {
        return <App colors={colors} />;
      }
    });

    renderToString(vm, function(err, html) {
      if (err) {
        throw err;
      }

      // If we just call `done` without process.nextTick() then we get
      // "Maximum call stack size exceeded"
      // ...and it is only for the color-picker benchmark
      // ¯\_(ツ)_/¯
      process.nextTick(done);

      return html;
    });
  };
};
