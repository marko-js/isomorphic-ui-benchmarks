console.log('Minifying JavaScript bundles...');

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const UglifyJS = require("uglify-js");
const formatNumber = require('format-number')();
const mkdirp = require('mkdirp');
const outputDir = path.join(__dirname, '../build');

function getVersion(name) {
    return require(name + '/package.json').version;
}

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
var benchmarkBuildDirs = fs.readdirSync(outputDir);

benchmarkBuildDirs.forEach((benchmarkName) => {
    if (benchmarkName === 'static') {
        return;
    }

    var bundlesOutputDir = path.join(outputDir, benchmarkName, 'bundles');
    var bundlesMinOutputDir = path.join(outputDir, benchmarkName, 'bundles.min');
    var sizes = {};

    try {
        mkdirp.sync(bundlesMinOutputDir);
    } catch(e) {}


    var bundleFiles = fs.readdirSync(bundlesOutputDir);

    bundleFiles.forEach((filename) => {
        if (!filename.endsWith('.js')) {
            return;
        }

        var file = path.join(bundlesOutputDir, filename);
        var ext = path.extname(filename);
        var lib = filename.slice(0, 0-ext.length);

        if (targetLib && lib !== targetLib) {
            return;
        }

        console.log(`Minifying ${file}...`);

        var src = fs.readFileSync(file, { encoding: 'utf8' });

        var minifiedSrc = minifier(src, file);

        console.log(`Done minifying ${file}`);

        var minFile = path.join(bundlesMinOutputDir, filename);
        fs.writeFileSync(minFile, minifiedSrc, { encoding: 'utf8' });

        var sizeInfo = sizes[lib] = {};

        promiseChain = promiseChain.then(() => {
            return new Promise((resolve, reject) => {
                console.log(`Compressing and calculating size of ${file}...`);
                zlib.gzip(minifiedSrc, function(err, gzippedBuffer) {
                    if (err) {
                        return reject(err);
                    }

                    // Compare the sizes
                    var minifiedBuffer = new Buffer(minifiedSrc, 'utf8');
                    // console.log(nodePath.basename(templateInfo.outputCompileMinifiedFile) + ': ' + gzippedBuffer.length + ' bytes gzipped (' + minifiedBuffer.length + ' bytes uncompressed)');

                    sizeInfo.gzipped = gzippedBuffer.length;
                    sizeInfo.min = minifiedBuffer.length;

                    var libVersion = getVersion(lib);
                    var sizeFilename = lib + (libVersion ? '-' + libVersion : '') + '.json';

                    fs.writeFileSync(path.join(outputDir, benchmarkName, sizeFilename), JSON.stringify(sizeInfo, null, 4), { encoding: 'utf8' });

                    resolve();
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
});



