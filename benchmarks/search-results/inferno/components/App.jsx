var Inferno = require('inferno');
var Component = require('inferno-component');
var SearchResultsItem = require('./SearchResultsItem');
var Footer = require('./Footer');

module.exports = class extends Component {
    componentDidMount() {
        window.onMount();
    }

    render() {
        var searchResultsData = this.props.searchResultsData;

        return (
            <div className="search-results">
                <div noNormalize hasKeyedChildren>
                    {searchResultsData.items.map(function(item, i) {
                        return <SearchResultsItem key={i} item={item} noNormalize/>
                    })}
                </div>
                <Footer/>
            </div>
        );
    }
};