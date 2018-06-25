require('./init')

const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const compression = require('compression')
const benchmarks = require('./benchmarks')
const benchmarkClientCreateRoute = require('./benchmark-client/createRoute')
const indexTemplate = require('./index.marko')

const isProduction = process.env.NODE_ENV === 'production'
const minify = isProduction

const urlPrefix = process.env.URL_PREFIX || ''

const app = express()
app.use(compression())

benchmarks.forEach(benchmark => {
  const benchmarkName = benchmark.name

  benchmark.benches.forEach(bench => {
    const libName = bench.name
    const jsBundle = `${urlPrefix}/bundles/${benchmarkName}/${libName}${minify ? '.min' : ''}.js`

    const routeOptions = {
      jsBundle: jsBundle
    }

    app.get(`/${benchmarkName}/${libName}`, benchmark.createRoute(libName, routeOptions))
    app.get(`/benchmark/${benchmarkName}`, benchmarkClientCreateRoute(benchmark, routeOptions))
  })
})

app.use('/static', serveStatic(path.join(__dirname, 'static')))
app.use('/isomorphic-ui-benchmarks/static', serveStatic(path.join(__dirname, 'static')))

app.use(require('lasso/middleware').serveStatic())

// app.get('/react', require('./src/react/pages/search-results'));
app.use('/bundles', serveStatic(path.join(__dirname, 'build/bundles')))
app.use('/isomorphic-ui-benchmarks/bundles', serveStatic(path.join(__dirname, 'build/bundles')))

app.get('/', function(req, res) {
  res.marko(indexTemplate, {
    benchmarks
  })
})
// app.get('/', require('./src/shared/pages/index'));

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080

module.exports = new Promise((resolve, reject) => {
  app.listen(port, function(err) {
    if (err) {
      return reject(err)
    }

    console.log('Listening on port ' + port)

    if (process.send) {
      console.log('Server online')
      process.send('online') // Let browser-refresh know we are ready to serve traffic
    }

    resolve(port)
  })
}).catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

process.on('SIGTERM', function() {
  process.exit(0)
})
