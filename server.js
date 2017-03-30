require('./init');

var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var compression = require('compression');
var benchmarks = require('./benchmarks');
var benchmarkClientCreateRoute = require('./benchmark-client/createRoute');
var indexTemplate = require('./index.marko');

var isProduction = process.env.NODE_ENV === 'production';
var minify = isProduction;

var urlPrefix = process.env.URL_PREFIX || '';

var app = express();
app.use(compression());

benchmarks.forEach((benchmark) => {
    var benchmarkName = benchmark.name;

    benchmark.benches.forEach((bench) => {
        var libName = bench.name;
        var jsBundle = `${urlPrefix}/bundles/${benchmarkName}/${libName}${minify ? '.min' : ''}.js`;

        var routeOptions = {
            jsBundle: jsBundle
        };

        app.get(`/${benchmarkName}/${libName}`, benchmark.createRoute(libName, routeOptions));
        app.get(`/benchmark/${benchmarkName}`, benchmarkClientCreateRoute(benchmark, routeOptions));
    });
});

app.use('/static', serveStatic(path.join(__dirname, 'static')));
app.use('/isomorphic-ui-benchmarks/static', serveStatic(path.join(__dirname, 'static')));

app.use(require('lasso/middleware').serveStatic());

// app.get('/react', require('./src/react/pages/search-results'));
app.use('/bundles', serveStatic(path.join(__dirname, 'build/bundles')));
app.use('/isomorphic-ui-benchmarks/bundles', serveStatic(path.join(__dirname, 'build/bundles')));

app.get('/', function(req, res) {
    res.marko(indexTemplate, {
        benchmarks
    });
});
// app.get('/', require('./src/shared/pages/index'));

var port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

module.exports = new Promise((resolve, reject) => {
        app.listen(port, function(err) {
            if (err) {
                return reject(err);
            }

            console.log('Listening on port ' + port);

            if (process.send) {
                console.log('Server online');
                process.send('online'); // Let browser-refresh know we are ready to serve traffic
            }

            resolve(port);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });

process.on('SIGTERM', function() {
    process.exit(0);
});