$_mod.def("/isomorphic-ui-benchmarks$1.0.0/benchmark-client/components/app/component", function(require, exports, module, __filename, __dirname) { var runBenchmark = require('/isomorphic-ui-benchmarks$1.0.0/util/runBenchmark'/*"../../../util/runBenchmark"*/);
var client = require('/isomorphic-ui-benchmarks$1.0.0/benchmark-client/client'/*"../../client"*/);

var Benchmark = typeof window !== "undefined" && window.Benchmark;

module.exports = {
  onInput: function(input) {
    this.state = {
      running: false,
      benchmarkName: input.benchmark.name
    };
  },

  handleBenchmarkButtonClick: function(_, el) {
    if (this.state.running) {
      return;
    }

    var benchmarkName = this.state.benchmarkName;

    var oldButtonLabel = el.innerHTML;
    el.innerHTML = oldButtonLabel + " - running...";

    var resultsEl = this.getEl("results");
    resultsEl.innerHTML = "";

    var self = this;

    runBenchmark(benchmarkName, client.benchmark, Benchmark)
      .on("start", function() {
        resultsEl.innerHTML += 'Running "' + benchmarkName + '"...\n';
      })
      .on("startBench", function(bench) {
        resultsEl.innerHTML += 'Running benchmark "' + bench.name + '"...\n';
      })
      .on("warmup", function() {
        resultsEl.innerHTML += "Warming up...\n";
      })
      .on("warmupComplete", function() {
        resultsEl.innerHTML += "Warmup complete.\n";
      })
      .on("cycle", function(event) {
        resultsEl.innerHTML += event.resultsString + "\n";
      })
      .on("complete", function(event) {
        resultsEl.innerHTML += event.resultsString + "\n";
        el.innerHTML = oldButtonLabel;
        self.running = false;
      })
      .run()
      .catch(function(err) {
        resultsEl.innerHTML = err.stack || err;
        console.error("ERROR:", err.stack || err);
      });
  }
};

});