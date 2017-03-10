var fs = require('fs');
var path = require('path');

var benchmarksDir = path.join(__dirname, 'benchmarks');

var benchmarks = [];



var enabledLibs = null;
var enabledBenchmarks = null;

enabledLibs = {
    marko: true,
    preact: true,
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
        createRoute: require(path.join(benchmarkDir, 'createRoute')),
        serverFactory: require(path.join(benchmarkDir, 'server'))
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
            serverFactory: require(path.join(libDir, 'server'))

        };

        benchmark.benches.push(bench);
    });
});

module.exports = benchmarks;