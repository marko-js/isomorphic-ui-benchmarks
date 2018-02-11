const { h } = require('hyperapp');

function SearchResultsItem(props) {
    const { item, purchased, buy } = props;
    return (
        <div
            key={item.id}
            class="search-results-item"
            style={purchased ? { backgroundColor: '#f1c40f' } : null}
        >
            <h2>{item.title}</h2>
            <div class="lvpic pic img left">
                <div class="lvpicinner full-width picW">
                    <a href={`/buy/${item.id}`} class="img imgWr2">
                        <img src={item.image} alt={item.title}/>
                    </a>
                </div>
            </div>
            <span class="price">{item.price}</span>
            {purchased ? (
                <div class="purchased">Purchased!</div>
            ) : (
                <button class="buy-now" type="button" onclick={() => buy(item.id)}>
                    Buy now!
                </button>
            )}
        </div>
    );
}

module.exports = SearchResultsItem;
