$_mod.def("/isomorphic-ui-benchmarks$1.0.0/util/runBenchmark", function(require, exports, module, __filename, __dirname) { var EventEmitter = require('/events$1.1.1/events'/*"events"*/).EventEmitter;

function addListeners(eventEmitter, config) {
  Object.keys(config).forEach(function(name) {
    if (name.startsWith("on")) {
      var listener = config[name];
      var eventName = name.charAt(2).toLowerCase() + name.substring(3);
      eventEmitter.on(eventName, listener);
    }
  });
}

function delay(durationMillis) {
  return new Promise(function(resolve) {
    setTimeout(resolve, durationMillis);
  });
}

module.exports = function runBenchmark(name, options, Benchmark) {
  var Suite = Benchmark.Suite;
  var suite = new Suite(name);

  var benches = [];

  var suiteEvents = new EventEmitter();
  var userSetup;

  function load() {
    return Promise.resolve()
      .then(function() {
        if (typeof options === "function") {
          return options();
        } else {
          return options;
        }
      })
      .then(function(options) {
        addListeners(suiteEvents, options);

        var benchPromiseChain = Promise.resolve();

        Object.keys(options.benches).forEach(function(name) {
          benchPromiseChain = benchPromiseChain
            .then(function() {
              var bench = options.benches[name];
              if (typeof bench === "function") {
                return bench(name);
              } else {
                return bench;
              }
            })
            .then(function(bench) {
              var benchFn = bench.fn;
              userSetup = bench.setup;

              var benchEvents = new EventEmitter();

              addListeners(benchEvents, bench);

              var actualFn;

              var defer = benchFn.length === 1;

              if (defer) {
                actualFn = function(deferred) {
                  function done() {
                    deferred.resolve();
                  }

                  benchFn(done);
                };
              } else {
                actualFn = function() {
                  benchFn();
                };
              }

              bench = Object.assign({ name: name }, bench);
              bench.events = benchEvents;

              suite.add(name, {
                // a flag to indicate the benchmark is deferred
                defer: defer,
                // benchmark test function
                fn: actualFn,

                onStart: function() {
                  benchEvents.emit("start");
                  suiteEvents.emit("startBench", bench);
                }
              });

              benches.push(bench);
            });
        });

        return benchPromiseChain;
      });
  }

  function setup() {
    var promiseChain = Promise.resolve();

    if (userSetup) {
      promiseChain = promiseChain.then(userSetup);
    }

    benches.forEach(function(bench) {
      if (bench.setup) {
        promiseChain = promiseChain.then(function() {
          bench.setup();
        });
      }
    });

    return promiseChain;
  }

  function warmupCycle() {
    var promiseChain = Promise.resolve();
    benches.forEach(function(bench) {
      var benchFn = bench.fn;
      promiseChain = promiseChain.then(function() {
        if (benchFn.length === 1) {
          return new Promise(function(resolve) {
            benchFn(resolve);
          });
        } else {
          benchFn();
        }
      });
    });

    return promiseChain;
  }

  function warmup() {
    suiteEvents.emit("warmup");

    benches.forEach(function(bench) {
      bench.events.emit("warmup");
    });

    var index = 0;
    var totalCount = 100;

    function next() {
      return warmupCycle().then(function() {
        if (++index === totalCount) {
          suiteEvents.emit("warmupComplete");
          return delay(1000);
        } else {
          return delay(10).then(next);
        }
      });
    }

    return next();
  }

  function run() {
    return new Promise(function(resolve, reject) {
      suite
        .on("start", function() {
          suiteEvents.emit("start", {
            suite: suite
          });
        })
        .on("cycle", function(event) {
          suiteEvents.emit("cycle", {
            suite: suite,
            resultsString: String(event.target)
          });
        })
        .on("complete", function() {
          suiteEvents.emit("complete", {
            suite: suite,
            resultsString:
              "Fastest is " +
              this.filter("fastest").map("name") +
              "\n\n--------------\n"
          });

          suite.off("start cycle complete");
          resolve();
        })
        .on("error", function(e) {
          suite.off("start cycle complete error");
          reject(e.target.error);
        })
        .run({ async: true });
    });
  }

  return {
    on: function(eventName, listener) {
      suiteEvents.on(eventName, listener);
      return this;
    },

    run: function() {
      return Promise.resolve()
        .then(load)
        .then(setup)
        .then(warmup)
        .then(run);
    }
  };
};

});