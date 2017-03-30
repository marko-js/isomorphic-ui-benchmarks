console.log('Minifying JavaScript bundles...');

require('../init');

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const UglifyJS = require("uglify-js");
const formatNumber = require('format-number')();

function leftPad(str, padding) {
    if (str.length < padding) {
        str = new Array(padding - str.length).join(' ') + str;
    }

    return str;
}

var minifiers = {
    gcc: function minifyGCC(src, file) {
        const gcc = require('google-closure-compiler-js');
        const options = {
            jsCode: [{src: src}],
            languageIn: 'ES5'
        };

        const out = gcc.compile(options);

        // if (out.errors && out.errors.length) {
        //     console.error(out.errors);
        //     throw new Error(`Minification failed for ${file}`);
        // }
        return out.compiledCode;
    },
    uglify: function minifyUglifyJS(src, file) {
        try {
            return UglifyJS.minify(src, {
                fromString: true
            }).code;
        } catch(e) {
            if (e.line != null) {
                console.error(`Failed to minify ${file}`);
                console.error(` Location: ${file}:${e.line}:${e.col}`);
                console.error(` Message: ${e.message}`);
                process.exit(1);
            }
            throw e;
        }

    },
    both: function(src, file) {
        var withGCC = minifiers.gcc(src, file);
        var withBoth = minifiers.uglify(withGCC, file);
        return withBoth.length < withGCC.length ? withBoth : withGCC;
    }
};

var minifier = minifiers.both;

var targetLib = process.argv[2];

var promiseChain = Promise.resolve();


var benchmarks = require('../benchmarks');
var targetLib = process.argv[2];
var sizes = {};

benchmarks.forEach((benchmark) => {
    var benchmarkName = benchmark.name;

    benchmark.benches.forEach((bench) => {
        var libName = bench.name;
        if (targetLib && libName !== targetLib) {
            return;
        }

        var inputFile = path.join(__dirname, `../build/bundles/${benchmarkName}/${libName}.js`);

        if (!fs.existsSync(inputFile)) {
            return;
        }

        var outputFile = path.join(__dirname, `../build/bundles/${benchmarkName}/${libName}.min.js`);

        console.log(`Minifying ${inputFile}...`);

        var src = fs.readFileSync(inputFile, { encoding: 'utf8' });

        var minifiedSrc = minifier(src, inputFile);

        console.log(`Done minifying ${inputFile}`);


        fs.writeFileSync(outputFile, minifiedSrc, { encoding: 'utf8' });

        var sizeInfo = sizes[libName] = {};

        promiseChain = promiseChain.then(() => {
            return new Promise((resolve, reject) => {
                console.log(`Compressing and calculating size of ${outputFile}...`);
                zlib.gzip(minifiedSrc, function(err, gzippedBuffer) {
                    if (err) {
                        return reject(err);
                    }

                    // Compare the sizes
                    var minifiedBuffer = new Buffer(minifiedSrc, 'utf8');
                    // console.log(nodePath.basename(templateInfo.outputCompileMinifiedFile) + ': ' + gzippedBuffer.length + ' bytes gzipped (' + minifiedBuffer.length + ' bytes uncompressed)');

                    sizeInfo.gzipped = gzippedBuffer.length;
                    sizeInfo.min = minifiedBuffer.length;

                    var sizeFilename = libName + '.json';

                    fs.writeFileSync(path.join(__dirname, `../build/bundles/${benchmarkName}`, sizeFilename), JSON.stringify(sizeInfo, null, 4), { encoding: 'utf8' });

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
        console.log('[' + lib + ']');
        console.log('  gzip: ' + leftPad(formatNumber(sizeInfo.gzipped), 8) + ' bytes');
        console.log('   min: ' + leftPad(formatNumber(sizeInfo.min), 8) + ' bytes');
        console.log();
    }

    console.log('Minification complete.');
});

