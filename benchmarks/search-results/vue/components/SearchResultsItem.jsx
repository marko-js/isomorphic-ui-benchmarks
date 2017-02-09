var Vue = require('vue');

module.exports = {
    methods: {
        handleBuyButtonClick: function(instance) {
            this.purchased = true;
        }
    },
    props: ['item', 'purchased'],
    render(h) {
        var item = this.item;
        var purchased = this.purchased;
        var style = { backgroundColor: this.purchased ? '#f1c40f' : ''};
        var handleBuyButtonClick = this.handleBuyButtonClick;
        
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

                {purchased ?
                   <div className="purchased">Purchased!</div> :
                   <button className="buy-now" type="button" onClick={ handleBuyButtonClick }>
                       Buy now!
                   </button>
                }

            </div>
        );
    }
};