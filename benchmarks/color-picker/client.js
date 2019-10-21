var colors = require("./colors.json");

window.registerBenchmark(function(helpers) {
  return {
    createBench: function(libName, factoryFunc) {
      var mountEl = helpers.createMountEl(libName);
      var fn = factoryFunc(mountEl, colors);

      return {
        onWarmup: function() {
          helpers.showMountEl(libName);
        },
        onStart: function() {
          helpers.showSingleMountEl(libName);
        },
        fn
      };
    }
  };
});
