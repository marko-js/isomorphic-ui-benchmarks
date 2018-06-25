require('require-self-ref')

require('babel-register')({
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: ['.jsx']
})

const benchmarks = require('../benchmarks')
const util_runBenchmark = require('~/util/runBenchmark')
const Benchmark = require('benchmark')

function runBenchmark(benchmark) {
  const benchmarkConfig = {
    benches: {}
  }

  benchmark.benches.forEach(bench => {
    benchmarkConfig.benches[bench.name] = benchmark.serverFactory(bench)
  })

  return util_runBenchmark(benchmark.name, benchmarkConfig, Benchmark)
    .on('start', function(event) {
      console.log('Running "' + benchmark.name + '"...\n')
    })
    .on('startBench', function(bench) {
      if (global.gc) {
        // Run garbage collection before each bench
        global.gc()
      }

      console.log('Running benchmark "' + bench.name + '"...\n')
    })
    .on('warmup', function() {
      console.log('Warming up...\n')
    })
    .on('warmupComplete', function() {
      console.log('Warmup complete.\n')
    })
    .on('cycle', function(event) {
      console.log(event.resultsString + '\n')
    })
    .on('complete', function(event) {
      console.log(event.resultsString + '\n')
    })
    .run()
}

function runAll() {
  let promiseChain = Promise.resolve()

  benchmarks.forEach(benchmark => {
    promiseChain = promiseChain.then(() => {
      return runBenchmark(benchmark)
    })
  })

  return promiseChain
}

runAll()
  .then(() => {
    console.log('DONE!')
  })
  .catch(err => {
    console.error('ERROR:', err.stack || err)
    process.exit(1)
  })
