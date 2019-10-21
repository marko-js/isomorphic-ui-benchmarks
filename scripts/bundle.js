require("../init");

var execSync = require("child_process").execSync;

var benchmarks = require("../benchmarks");
var targetLib = process.argv[2];

benchmarks.forEach(benchmark => {
  benchmark.benches.forEach(bench => {
    var libName = bench.name;
    if (targetLib && libName !== targetLib) {
      return;
    }

    console.log("------");
    console.log(`Bundling ${libName}...`);
    execSync(`npm run bundle-${libName}`);
  });
});
