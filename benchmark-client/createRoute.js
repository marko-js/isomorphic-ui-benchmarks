const template = require('./page.marko')

const isProduction = process.env.NODE_ENV === 'production'

function createRoute(benchmark, routeOptions) {
  const bundles = []
  benchmark.benches.forEach(bench => {
    // if (bench.name !== 'marko') {
    //     return;
    // }
    bundles.push(
      `${process.env.URL_PREFIX || ''}/bundles/${benchmark.name}/${bench.name}${
        isProduction ? '.min' : ''
      }.js`
    )
  })

  return function(req, res) {
    res.marko(template, {
      $global: {
        benchmark
      },
      bundles
    })
  }
}

module.exports = createRoute
