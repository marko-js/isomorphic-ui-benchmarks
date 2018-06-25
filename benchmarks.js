const fs = require('fs')
const path = require('path')

const benchmarksDir = path.join(__dirname, 'benchmarks')

const benchmarks = []

let enabledLibs = null
let enabledBenchmarks = null

enabledLibs = {
  marko: true,
  react: true,
  vue: true
}

enabledBenchmarks = {
  'search-results': true,
  'color-picker': true
}

Object.keys(enabledBenchmarks).forEach(benchmarkName => {
  const benchmarkDir = path.join(benchmarksDir, benchmarkName)

  if (!fs.statSync(benchmarkDir).isDirectory()) {
    // Only look at directories
    return
  }

  if (enabledBenchmarks && !enabledBenchmarks[benchmarkName]) {
    return
  }

  const benchmark = {
    name: benchmarkName,
    dir: benchmarkDir,
    benches: [],
    createRoute: function() {
      const createRoute = require(path.join(benchmarkDir, 'createRoute'))
      return createRoute.apply(this, arguments)
    },
    serverFactory: function() {
      const serverFactory = require(path.join(benchmarkDir, 'server'))
      return serverFactory.apply(this, arguments)
    }
  }

  benchmarks.push(benchmark)

  Object.keys(enabledLibs).forEach(libName => {
    if (enabledLibs && !enabledLibs[libName]) {
      return
    }

    const libDir = path.join(benchmarkDir, libName)
    if (!fs.statSync(libDir).isDirectory()) {
      // Only look at directories
      return
    }
    const bench = {
      dir: libDir,
      name: libName,
      url: `/${benchmarkName}/${libName}`,
      serverFactory: function() {
        const serverFactory = require(path.join(libDir, 'server'))
        return serverFactory.apply(this, arguments)
      }
    }

    benchmark.benches.push(bench)
  })
})

module.exports = benchmarks
