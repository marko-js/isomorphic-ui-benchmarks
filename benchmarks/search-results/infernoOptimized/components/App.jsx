var Inferno = require('inferno');
var SearchResultsItem = require('./SearchResultsItem');
var Footer = require('./Footer');

module.exports = class extends Inferno.Component {
    componentDidMount() {
        window.onMount();
    }

    render(props) {
        var searchResultsData = props.searchResultsData.items;

        var resultRows = [];
        for (var i = 0; i < searchResultsData.length; i++) {
          resultRows.push(
            <SearchResultsItem key={i} item={searchResultsData[i]}/>
          )
        }

        /*
         * We can optimize here by defining children types by using Infernos JSX flags
         * When adding those flags we need to make sure there are no holes in the array,
         * and all nodes have correct key
         */
        return (
            <div className="search-results">
                <div $HasKeyedChildren>
                  {resultRows}
                </div>
                <Footer/>
            </div>
        );
    }
};
