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

var app = express();
app.use(compression());

benchmarks.forEach((benchmark) => {
    var benchmarkName = benchmark.name;

    benchmark.benches.forEach((bench) => {
        var libName = bench.name;
        var jsBundle = `/build/${benchmarkName}/bundles${minify ? '.min' : ''}/${libName}.js`;

        var routeOptions = {
            jsBundle: jsBundle
        };

        app.get(`/${benchmarkName}/${libName}`, benchmark.createRoute(libName, routeOptions));
        app.get(`/benchmark/${benchmarkName}`, benchmarkClientCreateRoute(benchmark, routeOptions));
    });
});

app.use(require('lasso/middleware').serveStatic());

// app.get('/react', require('./src/react/pages/search-results'));
app.use('/build', serveStatic(path.join(__dirname, 'build')));
app.use('/static', serveStatic(path.join(__dirname, 'static')));
app.use('/images', serveStatic(path.join(__dirname, 'images')));
app.use('/benchmarks', serveStatic(path.join(__dirname, 'benchmarks')));
app.get('/', function(req, res) {
    res.marko(indexTemplate, {
        benchmarks
    });
});
// app.get('/', require('./src/shared/pages/index'));

var port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app.listen(port, function(err) {
    if (err) {
        throw err;
    }

    console.log('Listening on port ' + port);

    if (process.send) {
        console.log('Server online');
        process.send('online'); // Let browser-refresh know we are ready to serve traffic
    }
});

process.on('SIGTERM', function() {
    process.exit(0);
});