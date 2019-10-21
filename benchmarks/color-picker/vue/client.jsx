var Vue = require("vue");
var App = require("./components/App");

var mountNode = document.getElementById("mount");

if (window.colors) {
  var colors = window.colors;
  const app = new Vue({
    render(h) {
      return <App colors={colors} />;
    }
  });

  app.$mount("#mount");

  console.log("Re-rendering on client completed");
}

window.addBench("vue", function(el, colors) {
  var widget;
  var currentDone;
  var selectedColorIndex = 0;

  function onMount(instance) {
    widget = instance;
  }

  // function onUpdate() {
  //     currentDone();
  // }

  const app = new Vue({
    data: {
      colors: colors
    },

    render(h) {
      return <App colors={colors} handleMount={onMount} />;
    }
  });

  app.$mount(el);

  return function(done) {
    widget.selectedColorIndex = ++selectedColorIndex % colors.length;
    widget.$nextTick(done);
  };
});
