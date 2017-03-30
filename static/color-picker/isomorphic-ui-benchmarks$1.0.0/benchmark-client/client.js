$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/client", function(require, exports, module, __filename, __dirname) { var helpers = require('/isomorphic-ui-benchmarks$1.0.0/benchmark-client/helpers'/*'./helpers'*/);

function addBench(libName, factoryFunc) {
    var benchmark = exports.benchmark;
    var bench = benchmark.createBench(libName, factoryFunc);
    benchmark.benches[libName] = bench;
}

function registerBenchmark(factoryFunc) {
    var benchmark = factoryFunc(helpers);
    benchmark.benches = {};
    exports.benchmark = benchmark;
}

if (typeof window !== 'undefined') {
    window.addBench = addBench;
    window.registerBenchmark = registerBenchmark;
    window.onMount = function() {};
}
});