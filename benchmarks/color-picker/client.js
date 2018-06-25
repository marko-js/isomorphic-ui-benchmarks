const colors = require('./colors.json')

window.registerBenchmark(function(helpers) {
  return {
    createBench: function(libName, factoryFunc) {
      const mountEl = helpers.createMountEl(libName)
      let pageIndex = 0

      const fn = factoryFunc(mountEl, colors)

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
