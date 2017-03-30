$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmarks/color-picker/client", function(require, exports, module, __filename, __dirname) { var colors = require('/isomorphic-ui-benchmarks$1.0.0/benchmarks/color-picker/colors'/*'./colors.json'*/);

window.registerBenchmark(function(helpers) {
    return {
        createBench: function(libName, factoryFunc) {
            var mountEl = helpers.createMountEl(libName);
            var pageIndex = 0;


            var fn = factoryFunc(mountEl, colors);

            return {
                onWarmup: function() {
                    pageIndex = 0;
                    helpers.showMountEl(libName);
                },
                onStart: function() {
                    pageIndex = 0;
                    helpers.showSingleMountEl(libName);
                },
                fn
            };
        }
    };
});
});