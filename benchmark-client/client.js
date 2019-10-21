var helpers = require("./helpers");

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

if (typeof window !== "undefined") {
  window.addBench = addBench;
  window.registerBenchmark = registerBenchmark;
  window.onMount = function() {};
}
