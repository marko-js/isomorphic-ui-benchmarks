const React = require("react");
const { useState, useEffect } = React;

function App({ onMount, colors }) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = colors[selectedColorIndex];
  useEffect(() => {
    onMount(setSelectedColorIndex);
    window.onMount();
  }, []);

  return (
    <div className="colors">
      <h1>Choose your favorite color:</h1>
      <div className="colors">{colors.length ? (
          <ul>
          {colors.map((color, i) => (
              <li
                className={"color" + (selectedColorIndex === i ? " selected" : "")}
                key={i}
                style={{
                  backgroundColor: color.hex
                }}
                onClick={() => setSelectedColorIndex(i)}
              >
                {color.name}
              </li>
            ))}
        </ul>
      ): <div>No colors!</div>}</div>
      <div>
        You chose:
        <div className="chosen-color">{selectedColor.name}</div>
      </div>
    </div>
  );
}

module.exports = App;
