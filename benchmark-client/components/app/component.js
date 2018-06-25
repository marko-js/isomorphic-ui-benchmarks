const runBenchmark = require('~/util/runBenchmark')
const client = require('../../client')

const Benchmark = typeof window !== 'undefined' && window.Benchmark

module.exports = {
  onInput: function(input) {
    this.state = {
      running: false,
      benchmarkName: input.benchmark.name
    }
  },

  handleBenchmarkButtonClick: function(event, el) {
    if (this.state.running) {
      return
    }

    const benchmarkName = this.state.benchmarkName

    const oldButtonLabel = el.innerHTML
    el.innerHTML = oldButtonLabel + ' - running...'

    const resultsEl = this.getEl('results')
    resultsEl.innerHTML = ''

    const self = this

    runBenchmark(benchmarkName, client.benchmark, Benchmark)
      .on('start', function(event) {
        resultsEl.innerHTML += 'Running "' + benchmarkName + '"...\n'
      })
      .on('startBench', function(bench) {
        resultsEl.innerHTML += 'Running benchmark "' + bench.name + '"...\n'
      })
      .on('warmup', function() {
        resultsEl.innerHTML += 'Warming up...\n'
      })
      .on('warmupComplete', function() {
        resultsEl.innerHTML += 'Warmup complete.\n'
      })
      .on('cycle', function(event) {
        resultsEl.innerHTML += event.resultsString + '\n'
      })
      .on('complete', function(event) {
        resultsEl.innerHTML += event.resultsString + '\n'
        el.innerHTML = oldButtonLabel
        self.running = false
      })
      .run()
      .catch(function(err) {
        resultsEl.innerHTML = err.stack || err
        console.error('ERROR:', err.stack || err)
      })
  }
}
