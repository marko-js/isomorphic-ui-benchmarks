var Inferno = require('inferno');
var Component = require('inferno-component');

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

    componentDidUpdate() {
        if (this.props.onUpdate) {
            this.props.onUpdate(this);
        }
    }

    handleColorClick(colorIndex) {
        this.setState({
            selectedColorIndex: colorIndex
        });
    }

    render() {
        var colors = this.props.colors;
        var handleColorClick = this.handleColorClick;
        var selectedColorIndex = this.state.selectedColorIndex;
        var selectedColor = colors[selectedColorIndex];
        var self = this;

        function renderColor(color, i) {
            var style = {
                backgroundColor: color.hex
            };

            var className = 'color';
            if (selectedColorIndex === i) {
                className += ' selected';
            }

            return (<li className={className} style={style} onClick={handleColorClick.bind(self, i)}>
                    {color.name}
                </li>)
        }

        function renderColors(colors) {
            if (colors.length) {
                return (<ul>{colors.map(function(color, i) {
                    return renderColor(color, i);
                })}</ul>);
            } else {
                return <div>No colors!</div>
            }
        }

        return (
            <div class="colors">
                <h1>Choose your favorite color:</h1>
                <div class="colors">
                    {renderColors(colors)}
                </div>
                <div>
                    You chose:
                    <div class="chosen-color">{selectedColor.name}</div>
                </div>
            </div>
        );
    }
};