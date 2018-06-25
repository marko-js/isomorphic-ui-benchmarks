const helpers = require('./helpers')

function addBench(libName, factoryFunc) {
  const benchmark = exports.benchmark
  const bench = benchmark.createBench(libName, factoryFunc)
  benchmark.benches[libName] = bench
}

function registerBenchmark(factoryFunc) {
  const benchmark = factoryFunc(helpers)
  benchmark.benches = {}
  exports.benchmark = benchmark
}

if (typeof window !== 'undefined') {
  window.addBench = addBench
  window.registerBenchmark = registerBenchmark
  window.onMount = function() {}
}
