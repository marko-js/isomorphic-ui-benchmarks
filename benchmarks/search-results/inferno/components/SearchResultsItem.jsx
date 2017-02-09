var Inferno = require('inferno');
var Component = require('inferno-component');
var linkEvent = Inferno.linkEvent;

function handleBuyButtonClick(instance, event) {
    instance.setState({ 'purchased': true });
}

module.exports = class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            purchased: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            purchased: false
        });
    }

    render() {
        var item = this.props.item;
        var style = { backgroundColor: this.state.purchased ? '#f1c40f' : ''};

        return (
            <div className="search-results-item" style={style}>
                <h2>{item.title}</h2>

                <div className="lvpic pic img left">
            		<div className="lvpicinner full-width picW">
                        <a href={"/buy/" + item.id} className="img imgWr2">
            			     <img src={item.image} alt={item.title}/>
            			</a>
            		</div>
                </div>

                <span className="price">{item.price}</span>

                {this.state.purchased ?
                   <div className="purchased">Purchased!</div> :
                   <button className="buy-now" type="button" onClick={ linkEvent(this, handleBuyButtonClick) }>
                       Buy now!
                   </button>
                }

            </div>
        );
    }
};