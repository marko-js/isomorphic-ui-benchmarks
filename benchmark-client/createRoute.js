var template = require("./page.marko");

var isProduction = process.env.NODE_ENV === "production";

function createRoute(benchmark) {
  var bundles = [];
  benchmark.benches.forEach(bench => {
    bundles.push(
      `${process.env.URL_PREFIX || ""}/bundles/${benchmark.name}/${bench.name}${
        isProduction ? ".min" : ""
      }.js`
    );
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
