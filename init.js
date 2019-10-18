var path = require('path');

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

require('lasso').configure({
    plugins: [
        {
            plugin: 'lasso-marko',
            config: {
                output: 'vdom'
            }
        }
    ],
    bundlingEnabled: false,
    minify: false,//isProduction ? true : false,
    fingerprintsEnabled: false,
    urlPrefix: (process.env.URL_PREFIX || '') + '/static',
    outputDir: path.join(__dirname, 'build/static')
});

require('lasso/node-require-no-op').enable('.less', '.css');
require('marko/express');
require("babel-register")({
    // and .js so you'll have to add them back if you want them to be used again.
    extensions: [".jsx"]
});

require('marko/node-require').install();

require('marko/compiler').configure({
    assumeUpToDate: false
});