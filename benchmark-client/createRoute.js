var template = require('./page.marko');

var isProduction = process.env.NODE_ENV === 'production';

function createRoute(benchmark, routeOptions) {
    var bundles = [];
    benchmark.benches.forEach((bench) => {
        // if (bench.name !== 'marko') {
        //     return;
        // }
        bundles.push(`/build/${benchmark.name}/bundles${isProduction ? '.min' : ''}/${bench.name}.js`);
    });

    return function(req, res) {
        res.marko(template, {
            $global: {
                benchmark
            },
            bundles
        });
    };
}

module.exports = createRoute;
