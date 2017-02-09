var preact = require('preact');
var h = preact.h;
var Component = preact.Component;

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
                <div>
                {searchResultsData.items.map(function(item, i) {
                    return <SearchResultsItem key={i} item={item}/>
                })}
                </div>
                <Footer/>
            </div>
        );
    }
};