const EventEmitter = require('events').EventEmitter

function addListeners(eventEmitter, config) {
  Object.keys(config).forEach(function(name) {
    if (name.startsWith('on')) {
      const listener = config[name]
      const eventName = name.charAt(2).toLowerCase() + name.substring(3)
      eventEmitter.on(eventName, listener)
    }
  })
}

function delay(durationMillis) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, durationMillis)
  })
}

module.exports = function runBenchmark(name, options, Benchmark) {
  const Suite = Benchmark.Suite
  const suite = new Suite(name)

  const benches = []

  const suiteEvents = new EventEmitter()
  let userSetup

  function load() {
    return Promise.resolve()
      .then(function() {
        if (typeof options === 'function') {
          return options()
        } else {
          return options
        }
      })
      .then(function(options) {
        addListeners(suiteEvents, options)

        let benchPromiseChain = Promise.resolve()

        Object.keys(options.benches).forEach(function(name) {
          benchPromiseChain = benchPromiseChain
            .then(function() {
              const bench = options.benches[name]
              if (typeof bench === 'function') {
                return bench(name)
              } else {
                return bench
              }
            })
            .then(function(bench) {
              const benchFn = bench.fn
              userSetup = bench.setup

              const benchEvents = new EventEmitter()

              addListeners(benchEvents, bench)

              let actualFn

              const defer = benchFn.length === 1

              if (defer) {
                actualFn = function(deferred) {
                  function done() {
                    deferred.resolve()
                  }

                  benchFn(done)
                }
              } else {
                actualFn = function(deferred) {
                  benchFn()
                }
              }

              bench = Object.assign({ name: name }, bench)
              bench.events = benchEvents

              suite.add(name, {
                // a flag to indicate the benchmark is deferred
                defer: defer,
                // benchmark test function
                fn: actualFn,

                onStart: function() {
                  benchEvents.emit('start')
                  suiteEvents.emit('startBench', bench)
                }
              })

              benches.push(bench)
            })
        })

        return benchPromiseChain
      })
  }

  function setup() {
    let promiseChain = Promise.resolve()

    if (userSetup) {
      promiseChain = promiseChain.then(userSetup)
    }

    benches.forEach(function(bench) {
      if (bench.setup) {
        promiseChain = promiseChain.then(function() {
          bench.setup()
        })
      }
    })

    return promiseChain
  }

  function warmupCycle() {
    let promiseChain = Promise.resolve()
    benches.forEach(function(bench) {
      const benchFn = bench.fn
      promiseChain = promiseChain.then(function() {
        if (benchFn.length === 1) {
          return new Promise(function(resolve, reject) {
            benchFn(resolve)
          })
        } else {
          benchFn()
        }
      })
    })

    return promiseChain
  }

  function warmup() {
    suiteEvents.emit('warmup')

    benches.forEach(function(bench) {
      bench.events.emit('warmup')
    })

    let index = 0
    const totalCount = 100

    function next() {
      return warmupCycle().then(function() {
        if (++index === totalCount) {
          suiteEvents.emit('warmupComplete')
          return delay(1000)
        } else {
          return delay(10).then(next)
        }
      })
    }

    return next()
  }

  function run() {
    return new Promise(function(resolve, reject) {
      suite
        .on('start', function(event) {
          suiteEvents.emit('start', {
            suite: suite
          })
        })
        .on('cycle', function(event) {
          suiteEvents.emit('cycle', {
            suite: suite,
            resultsString: String(event.target)
          })
        })
        .on('complete', function() {
          suiteEvents.emit('complete', {
            suite: suite,
            resultsString:
              'Fastest is ' + this.filter('fastest').map('name') + '\n\n--------------\n'
          })

          suite.off('start cycle complete')
          resolve()
        })
        .on('error', function(e) {
          suite.off('start cycle complete error')
          reject(e.target.error)
        })
        .run({ async: true })
    })
  }

  return {
    on: function(eventName, listener) {
      suiteEvents.on(eventName, listener)
      return this
    },

    run: function() {
      return Promise.resolve()
        .then(load)
        .then(setup)
        .then(warmup)
        .then(run)
    }
  }
}
