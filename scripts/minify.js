console.log("Minifying JavaScript bundles...");

require("../init");

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const Terser = require("terser");
const formatNumber = require("format-number")();

function leftPad(str, padding) {
  if (str.length < padding) {
    str = new Array(padding - str.length).join(" ") + str;
  }

  return str;
}

function minifier(src, file) {
  try {
    var result = Terser.minify(src);

    if (result.error) {
      throw result.error;
    }

    return result.code;
  } catch (e) {
    if (e.line != null) {
      console.error(`Failed to minify ${file}`);
      console.error(` Location: ${file}:${e.line}:${e.col}`);
      console.error(` Message: ${e.message}`);
      process.exit(1);
    }
    throw e;
  }
}

var promiseChain = Promise.resolve();

var benchmarks = require("../benchmarks");
var targetLib = process.argv[2];
var sizes = {};

benchmarks.forEach(benchmark => {
  var benchmarkName = benchmark.name;

  benchmark.benches.forEach(bench => {
    var libName = bench.name;
    if (targetLib && libName !== targetLib) {
      return;
    }

    var inputFile = path.join(
      __dirname,
      `../build/bundles/${benchmarkName}/${libName}.js`
    );

    if (!fs.existsSync(inputFile)) {
      return;
    }

    var outputFile = path.join(
      __dirname,
      `../build/bundles/${benchmarkName}/${libName}.min.js`
    );

    console.log(`Minifying ${inputFile}...`);

    var src = fs.readFileSync(inputFile, { encoding: "utf8" });

    var minifiedSrc = minifier(src, inputFile);

    console.log(`Done minifying ${inputFile}`);

    fs.writeFileSync(outputFile, minifiedSrc, { encoding: "utf8" });

    var sizeInfo = (sizes[libName] = {});

    promiseChain = promiseChain.then(() => {
      return new Promise((resolve, reject) => {
        console.log(`Compressing and calculating size of ${outputFile}...`);
        zlib.gzip(minifiedSrc, function(err, gzippedBuffer) {
          if (err) {
            return reject(err);
          }

          // Compare the sizes
          var minifiedBuffer = new Buffer(minifiedSrc, "utf8");
          // console.log(nodePath.basename(templateInfo.outputCompileMinifiedFile) + ': ' + gzippedBuffer.length + ' bytes gzipped (' + minifiedBuffer.length + ' bytes uncompressed)');

          sizeInfo.gzipped = gzippedBuffer.length;
          sizeInfo.min = minifiedBuffer.length;

          var sizeFilename = libName + ".json";

          fs.writeFileSync(
            path.join(
              __dirname,
              `../build/bundles/${benchmarkName}`,
              sizeFilename
            ),
            JSON.stringify(sizeInfo, null, 4),
            { encoding: "utf8" }
          );

          resolve();
        });
      });
    });
  });
});

promiseChain.then(() => {
  console.log();

  for (var lib in sizes) {
    var sizeInfo = sizes[lib];
    console.log("[" + lib + "]");
    console.log(
      "  gzip: " + leftPad(formatNumber(sizeInfo.gzipped), 8) + " bytes"
    );
    console.log("   min: " + leftPad(formatNumber(sizeInfo.min), 8) + " bytes");
    console.log();
  }

  console.log("Minification complete.");
});
