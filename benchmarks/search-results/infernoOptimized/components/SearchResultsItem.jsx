var Inferno = require('inferno');
var Component = Inferno.Component;
var linkEvent = Inferno.linkEvent;
var createTextVNode = Inferno.createTextVNode;

function handleBuyButtonClick(instance, event) {
  event.stopPropagation();

  instance.setState({ 'purchased': true });
}

module.exports = class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchased: false
    };
  }

  componentWillReceiveProps() {
    this.setState({
      purchased: false
    });
  }

  render(props) {
    var item = props.item;
    var style = { backgroundColor: this.state.purchased ? '#f1c40f' : '' };

    /**
     * Again we can optimize performance of rendering this Component by pre-defining compile time flags
     * This pattern can always be used when there is JSX pattern and keyes/holes are correctly handled at application level
     * This is example how to get more performance
     *
     * When we are telling Inferno not to normalize, we need to manually create required textNodes
     * $NoNormalize is not needed when there is no dynamic JSX children expression
     * - See <button> for example. It does not need any flags because children is static
     */
    return (
      <div
        $NoNormalize
        $HasNonKeyedChildren
        className="search-results-item"
        style={style}>
        <h2 $NoNormalize>{createTextVNode(item.title)}</h2>
        <div className="lvpic pic img left">
          <div className="lvpicinner full-width picW">
            <a href={"/buy/" + item.id} className="img imgWr2">
              <img src={item.image} alt={item.title}/>
            </a>
          </div>
        </div>
        <span $NoNormalize className="price">{createTextVNode(item.price)}</span>
        {this.state.purchased ? (
          <div className="purchased">Purchased!</div>
        ) : (
          <button className="buy-now" type="button" onClick={linkEvent(this, handleBuyButtonClick)}>
            Buy now!
          </button>
        )}
      </div>
    );
  }
};