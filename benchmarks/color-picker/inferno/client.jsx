var Inferno = require("inferno");
var hydrate = require("inferno-hydrate").hydrate;
var createVNode = Inferno;
var render = Inferno.render;

var App = require("./components/App");

var mountNode = document.getElementById("mount");

if (window.colors) {
  hydrate(<App colors={window.colors} />, mountNode);

  console.log("Re-rendering on client completed");
}

window.addBench("inferno", function(el, colors) {
  var widget;
  var selectedColorIndex = 0;

  function onMount(instance) {
    widget = instance;
  }

  render(<App colors={colors} onMount={onMount} />, el);

  return function(done) {
    widget.setState(
      {
        selectedColorIndex: ++selectedColorIndex % colors.length
      },
      done
    );
  };
});
