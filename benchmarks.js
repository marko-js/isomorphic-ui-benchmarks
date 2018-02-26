var fs = require('fs');
var path = require('path');

var benchmarksDir = path.join(__dirname, 'benchmarks');

var benchmarks = [];



var enabledLibs = null;
var enabledBenchmarks = null;

enabledLibs = {
    marko: true,
    preact: true,
    hyperapp: true,
    react: true,
    vue: true,
    inferno: true
};

enabledBenchmarks = {
    'search-results': true,
    'color-picker': true
};

Object.keys(enabledBenchmarks).forEach((benchmarkName) => {
    var benchmarkDir = path.join(benchmarksDir, benchmarkName);

    if (!fs.statSync(benchmarkDir).isDirectory()) {
        // Only look at directories
        return;
    }

    if (enabledBenchmarks && !enabledBenchmarks[benchmarkName]) {
        return;
    }

    var benchmark = {
        name: benchmarkName,
        dir: benchmarkDir,
        benches: [],
        createRoute: function() {
          var createRoute = require(path.join(benchmarkDir, 'createRoute'));
          return createRoute.apply(this, arguments);
        },
        serverFactory: function() {
          var serverFactory = require(path.join(benchmarkDir, 'server'));
          return serverFactory.apply(this, arguments);
        }
    };

    benchmarks.push(benchmark);

    Object.keys(enabledLibs).forEach((libName) => {
        if (enabledLibs && !enabledLibs[libName]) {
            return;
        }

        var libDir = path.join(benchmarkDir, libName);
        if (!fs.statSync(libDir).isDirectory()) {
            // Only look at directories
            return;
        }
        var bench = {
            dir: libDir,
            name: libName,
            url: `/${benchmarkName}/${libName}`,
            serverFactory: function() {
              var serverFactory = require(path.join(libDir, 'server'));
              return serverFactory.apply(this, arguments);
            }
        };

        benchmark.benches.push(bench);
    });
});

module.exports = benchmarks;
