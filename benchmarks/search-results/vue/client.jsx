var Vue = require("vue");
var App = require("./components/App");

var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
  const app = new Vue({
    render(h) {
      return <App searchResultsData={window.searchResultsData} />;
    }
  });

  app.$mount("#searchResultsMount");

  console.log("Re-rendering on client completed");
}

window.addBench("vue", function(el, getNextSearchResults) {
  const app = new Vue({
    data: {
      searchResultsData: getNextSearchResults()
    },

    render(h) {
      var searchResultsData = this.searchResultsData;

      return <App searchResultsData={searchResultsData} />;
    },

    methods: {
      updateSearchResults(searchResultsData, done) {
        this.searchResultsData = searchResultsData;
        this.$nextTick(done);
      }
    }
  });

  app.$mount(el);

  return function(done) {
    app.updateSearchResults(getNextSearchResults(), done);
  };
});
