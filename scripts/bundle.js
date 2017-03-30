require('../init');

var execSync = require('child_process').execSync;
var path = require('path');

var benchmarks = require('../benchmarks');
var targetLib = process.argv[2];

benchmarks.forEach((benchmark) => {
    var benchmarkName = benchmark.name;

    benchmark.benches.forEach((bench) => {
        var libName = bench.name;
        if (targetLib && libName !== targetLib) {
            return;
        }

        process.env.BUNDLES_DIR = path.join(__dirname, `../build/bundles/${benchmarkName}`);
        execSync(`rollup -c ${bench.dir}/rollup.config.js`);
    });
});
