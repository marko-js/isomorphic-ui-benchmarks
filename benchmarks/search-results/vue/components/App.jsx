var Vue = require("vue");
var SearchResultsItem = require("./SearchResultsItem");
var Footer = require("./Footer");

module.exports = {
  mounted() {
    window.onMount();
  },
  props: ["searchResultsData"],
  render(h) {
    var searchResultsData = this.searchResultsData;

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
