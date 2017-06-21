var Inferno = require('inferno');
var Component = require('inferno-component');
var linkEvent = Inferno.linkEvent;

function handleColorClick({component, colorIndex}) {
    component.setStateSync({
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
            backgroundColor: color.hex
        };

        var className = 'color';
        if (selectedColorIndex === i) {
            className += ' selected';
        }

        return (<li className={className} style={style} onClick={linkEvent({component: this, colorIndex: i}, handleColorClick)}>
                {color.name}
            </li>)
    }

    renderColors(colors) {
        if (colors.length) {
            return (<ul>{colors.map((color, i) => {
                return this.renderColor(color, i);
            })}</ul>);
        } else {
            return <div>No colors!</div>
        }
    }

    render() {
        var colors = this.props.colors;
        var selectedColorIndex = this.state.selectedColorIndex;
        var selectedColor = colors[selectedColorIndex];

        return (
            <div class="colors">
                <h1>Choose your favorite color:</h1>
                <div class="colors">
                    {this.renderColors(colors)}
                </div>
                <div>
                    You chose:
                    <div className="chosen-color">{selectedColor.name}</div>
                </div>
            </div>
        );
    }
};