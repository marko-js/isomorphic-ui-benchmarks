var fs = require('fs');
var path = require('path');

var benchmarksDir = path.join(__dirname, 'benchmarks');

var benchmarks = [];



var enabledLibs = null;
var enabledBenchmarks = null;

// enabledLibs = {
//     preact: false,
//     react: false,
//     marko: true,
//     vue: false,
//     inferno: false
// };
//
// enabledBenchmarks = {
//     'search-results': true,
//     'color-picker': false
// };

fs.readdirSync(benchmarksDir).forEach((benchmarkName) => {
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

    fs.readdirSync(benchmarkDir).forEach((libName) => {
        if (libName === 'util') {
            return;
        }

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