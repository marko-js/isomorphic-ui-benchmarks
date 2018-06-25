const searchService = require('./util/search')

window.registerBenchmark(function(helpers) {
  return {
    createBench: function(libName, factoryFunc) {
      const mountEl = helpers.createMountEl(libName)
      let pageIndex = 0

      function getNextSearchResults() {
        return searchService.performSearch({ pageIndex: pageIndex++ })
      }

      const fn = factoryFunc(mountEl, getNextSearchResults)

      return {
        onWarmup: function() {
          pageIndex = 0
          helpers.showMountEl(libName)
        },
        onStart: function() {
          pageIndex = 0
          helpers.showSingleMountEl(libName)
        },
        fn
      }
    }
  }
})
