const preact = require("preact");

module.exports = class extends preact.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this);
    }
    window.onMount();
  }

  componentDidUpdate() {
    if (this.props.onUpdate) {
      this.props.onUpdate(this);
    }
  }

  handleColorClick(colorIndex) {
    this.setState({
      selectedColorIndex: colorIndex,
    });
  }

  render() {
    var colors = this.props.colors;
    var handleColorClick = this.handleColorClick;
    var selectedColorIndex = this.state.selectedColorIndex;
    var selectedColor = colors[selectedColorIndex];
    var self = this;

    return (
      <div class="colors">
        <h1>Choose your favorite color:</h1>
        <div class="colors">
          {colors.length ? (
            <ul>
              {colors.map(function(color, i) {
                var className = "color";
                if (selectedColorIndex === i) {
                  className += " selected";
                }
                return (
                  <li
                    className={className}
                    style={{
                      backgroundColor: color.hex,
                    }}
                    onClick={handleColorClick.bind(self, i)}
                  >
                    {color.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>No colors!</div>
          )}
        </div>
        <div>
          You chose:
          <div class="chosen-color">{selectedColor.name}</div>
        </div>
      </div>
    );
  }
};
