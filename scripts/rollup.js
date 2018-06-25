require('../init')

const execSync = require('child_process').execSync
const path = require('path')

const benchmarks = require('../benchmarks')
const targetLib = process.argv[2]

benchmarks.forEach(benchmark => {
  const benchmarkName = benchmark.name

  benchmark.benches.forEach(bench => {
    const libName = bench.name
    if (targetLib && libName !== targetLib) {
      return
    }

    process.env.BUNDLES_DIR = path.join(__dirname, `../build/bundles/${benchmarkName}`)
    execSync(`rollup -c ${bench.dir}/rollup.config.js`)
  })
})
