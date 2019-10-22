$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/util/search", function(require, exports, module, __filename, __dirname) { var searchResultsData = require('/isomorphic-ui-benchmarks$1.0.0/benchmarks/search-results/util/search-results-data'/*"./search-results-data.json"*/);

exports.performSearch = function(input) {
  var pageIndex = input.pageIndex || 0;
  var pageSize = 100;
  var start = pageIndex * pageSize;

  var items = [];

  for (var i = start; i < start + pageSize; i++) {
    items.push(searchResultsData.items[i % searchResultsData.items.length]);
  }

  var results = {
    pageIndex: pageIndex,
    totalMatches: searchResultsData.items.length,
    items: items
  };

  return results;
};

});