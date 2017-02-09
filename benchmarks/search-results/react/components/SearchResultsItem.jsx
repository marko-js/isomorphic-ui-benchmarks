var React = require('react');

module.exports = class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            purchased: false,
            item: this.props.item
        };

        this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            purchased: false
        });
    }

    handleBuyButtonClick() {
        this.setState({ 'purchased': true });
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
                   <button className="buy-now" type="button" onClick={this.handleBuyButtonClick}>
                       Buy now!
                   </button>
                }

            </div>
        );
    }
};