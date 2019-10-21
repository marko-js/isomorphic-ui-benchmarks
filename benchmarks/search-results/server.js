"use strict";
require("marko/node-require");

var searchService = require("./util/search");

module.exports = function(bench) {
  var serverFactory = bench.serverFactory;

  var pageIndex = 0;

  function getNextSearchResults() {
    return searchService.performSearch({ pageIndex: pageIndex++ });
  }

  var fn = serverFactory(getNextSearchResults);

  return {
    onWarmup() {
      pageIndex = 0;
    },
    onStart() {
      pageIndex = 0;
    },
    fn
  };
};
