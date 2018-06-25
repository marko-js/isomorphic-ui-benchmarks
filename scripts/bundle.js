require('../init')

const execSync = require('child_process').execSync

const benchmarks = require('../benchmarks')
const targetLib = process.argv[2]

benchmarks.forEach(benchmark => {
  benchmark.benches.forEach(bench => {
    const libName = bench.name
    if (targetLib && libName !== targetLib) {
      return
    }

    console.log('------')
    console.log(`Bundling ${libName}...`)
    execSync(`npm run bundle-${libName}`)
  })
})
