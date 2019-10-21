"use strict";

var Vue = require("vue");

module.exports = {
  mounted() {
    if (this.handleMount) {
      this.handleMount(this);
    }
    window.onMount();
  },
  updated() {
    if (this.handleUpdate) {
      this.handleUpdate(this);
    }
  },
  props: ["colors", "handleMount", "handleUpdate"],
  data: function() {
    return {
      selectedColorIndex: 0
    };
  },
  methods: {
    handleColorClick: function(colorIndex) {
      this.selectedColorIndex = colorIndex;
    }
  },
  render(h) {
    var colors = this.colors;
    var handleColorClick = this.handleColorClick;
    var selectedColorIndex = this.selectedColorIndex;
    var selectedColor = colors[selectedColorIndex];
    var self = this;

    function renderColor(color, i) {
      var style = {
        backgroundColor: color.hex
      };

      return (
        <li
          class={["color", selectedColorIndex === i && "selected"]}
          key={i}
          style={style}
          onClick={handleColorClick.bind(self, i)}
        >
          {color.name}
        </li>
      );
    }

    function renderColors(h, colors) {
      if (colors.length) {
        return (
          <ul>
            {colors.map(function(color, i) {
              return renderColor(color, i);
            })}
          </ul>
        );
      } else {
        return <div>No colors!</div>;
      }
    }

    return (
      <div class="colors">
        <h1>Choose your favorite color:</h1>
        <div>{renderColors(h, colors)}</div>
        <div>
          You chose:
          <div class="chosen-color">{selectedColor.name}</div>
        </div>
      </div>
    );
  }
};
