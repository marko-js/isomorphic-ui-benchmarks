var Inferno = require("inferno");
var Component = Inferno.Component;
var createVNode = Inferno.createVNode;
var createTextVNode = Inferno.createTextVNode;
var linkEvent = Inferno.linkEvent;

function handleColorClick({ component, colorIndex }) {
  component.setState({
    selectedColorIndex: colorIndex
  });
}

module.exports = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColorIndex: 0
    };
  }

  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount(this);
    }

    window.onMount();
  }

  renderColor(color, i) {
    var selectedColorIndex = this.state.selectedColorIndex;
    var style = {
      "background-color": color.hex
    };

    var className = "color";
    if (selectedColorIndex === i) {
      className += " selected";
    }

    return (
      <li
        $HasVNodeChildren
        className={className}
        style={style}
        onClick={linkEvent(
          { component: this, colorIndex: i },
          handleColorClick
        )}
      >
        {createTextVNode(color.name)}
      </li>
    );
  }

  renderColors(colors) {
    if (colors.length) {
      return (
        <ul $HasNonKeyedChildren>
          {colors.map((color, i) => {
            return this.renderColor(color, i);
          })}
        </ul>
      );
    } else {
      return <div>No colors!</div>;
    }
  }

  render() {
    var colors = this.props.colors;
    var selectedColorIndex = this.state.selectedColorIndex;
    var selectedColor = colors[selectedColorIndex];

    return (
      <div class="colors">
        <h1>Choose your favorite color:</h1>
        <div class="colors" $HasVNodeChildren>{this.renderColors(colors)}</div>
        <div>
          You chose:
          <div className="chosen-color" $HasVNodeChildren>{createTextVNode(selectedColor.name)}</div>
        </div>
      </div>
    );
  }
};
