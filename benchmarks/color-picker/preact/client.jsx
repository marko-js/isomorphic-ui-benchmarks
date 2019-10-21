const preact = require("preact");
const App = require("./components/App");

const mountNode = document.getElementById("mount");

if (window.colors) {
  preact.render(
    <App colors={window.colors} />,
    mountNode,
    mountNode.firstChild
  );

  console.log("Re-rendering on client completed");
}

window.addBench("preact", function(el, colors) {
  var widget;
  var currentDone;
  var selectedColorIndex = 0;

  function onMount(instance) {
    widget = instance;
  }

  function onUpdate() {
    currentDone();
  }

  preact.render(
    <App colors={colors} onMount={onMount} onUpdate={onUpdate} />,
    el
  );

  return function(done) {
    widget.setState({
      selectedColorIndex: ++selectedColorIndex % colors.length
    });

    currentDone = done;
  };
});
