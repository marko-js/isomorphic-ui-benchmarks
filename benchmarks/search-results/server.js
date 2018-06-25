'use strict'
require('marko/node-require')

const searchService = require('./util/search')

module.exports = function(bench) {
  const serverFactory = bench.serverFactory

  let pageIndex = 0

  function getNextSearchResults() {
    return searchService.performSearch({ pageIndex: pageIndex++ })
  }

  const fn = serverFactory(getNextSearchResults)

  return {
    onWarmup() {
      pageIndex = 0
    },
    onStart() {
      pageIndex = 0
    },
    fn
  }
}
