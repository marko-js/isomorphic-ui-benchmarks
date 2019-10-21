const React = require("react");
const ReactDOM = require("react-dom");
const App = require("./components/App");

const mountNode = document.getElementById("mount");

if (window.colors) {
  ReactDOM.hydrate(<App colors={window.colors} />, mountNode);

  console.log("Re-rendering on client completed");
}

window.addBench("react", function(el, colors) {
  let setSelectedColorIndex;
  let selectedColorIndex = 0;

  ReactDOM.render(
    <App colors={colors} onMount={_set => (setSelectedColorIndex = _set)} />,
    el
  );

  return done => {
    setSelectedColorIndex(++selectedColorIndex % colors.length);
    done();
  };
});
