var Inferno = require("inferno");
var Component = Inferno.Component;
var createVNode = Inferno.createVNode;
var createComponentVNode = Inferno.createComponentVNode;
var SearchResultsItem = require("./SearchResultsItem");
var Footer = require("./Footer");

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
            return <SearchResultsItem key={i} item={item} />;
          })}
        </div>
        <Footer />
      </div>
    );
  }
};
