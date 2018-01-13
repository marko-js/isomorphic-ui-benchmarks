var Inferno = require('inferno');
var linkEvent = Inferno.linkEvent;
var createTextVNode = Inferno.createTextVNode;

function handleColorClick({ component, colorIndex }) {
  component.setState({
    selectedColorIndex: colorIndex
  });
}

module.exports = class extends Inferno.Component {
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
    var style = {
      backgroundColor: color.hex
    };

    var className = 'color';
    if (this.state.selectedColorIndex === i) {
      className += ' selected';
    }

    return (
      <li
        $NoNormalize
        className={className}
        style={style}
        onClick={linkEvent({ component: this, colorIndex: i }, handleColorClick)}>
        {createTextVNode(color.name)}
      </li>
    );
  }

  renderColors(colors) {
    var len = colors.length;

    if (len > 0) {
      var listItems = [];

      for (let i = 0; i < len; i++) {
        listItems.push(
          this.renderColor(colors[i], i)
        );
      }

      /*
       * We can optimize here by predefining children type for ul
       * list elements <li>'s dont have keys so $HasNonKeyedChildren is correct type here
       *
       * We dont need to define children types for <div>No colors!</div> because it has static children
       */
      return (
        <ul
          $HasNonKeyedChildren
          $NoNormalize>
          {listItems}
        </ul>);
    } else {
      return <div>No colors!</div>
    }
  }

  render(props, state) {
    var colors = props.colors;
    var selectedColorIndex = state.selectedColorIndex;
    var selectedColor = colors[selectedColorIndex];

    /*
     * We can optimize here by telling that "colors" div will always have single node as children
     * ($NoNormalize + not defining type)
     *
     * "chodren color" element is optimized by using $NoNormalize and manually creating textVNode
     * that needs to be done when rendering text and ignoring Normalization process, see search-results bench for more info.
     */
    return (
      <div class="colors">
        <h1>Choose your favorite color:</h1>
        <div class="colors" $NoNormalize>
          {this.renderColors(colors)}
        </div>
        <div>
          You chose:
          <div className="chosen-color" $NoNormalize>{createTextVNode(selectedColor.name)}</div>
        </div>
      </div>
    );
  }
};