const { h } = require('hyperapp');
const Footer = require('./Footer');
const SearchResultsItem = require('./SearchResultsItem');

const state = {
    searchResultsData: {
        items: [],
    },
    purchased: {
        // id-1: true,
        // id-2: false
    },
};

const actions = {
    setSearchResults(searchResultsData) {
        return { searchResultsData };
    },
    onUpdate() {
        // for benchmark
    },
    purchased: {
        buy(id) {
            return { [id]: true };
        }
    }
};

function view(state, actions) {
    return (
        <div class="search-results">
            <div>
                {state.searchResultsData.items.map((item) => (
                    <SearchResultsItem
                        item={item}
                        purchased={state.purchased[item.id]}
                        buy={actions.purchased.buy}
                    />
                ))}
            </div>
            <Footer/>
        </div>
    );
}

module.exports = {
    state,
    actions,
    view,
};
