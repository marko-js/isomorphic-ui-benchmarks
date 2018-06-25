const path = require('path')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production'
}

const isProduction = process.env.NODE_ENV === 'production'

require('lasso').configure({
  plugins: [
    {
      plugin: 'lasso-marko',
      config: {
        output: 'vdom'
      }
    },
    {
      plugin: 'minprops/lasso',
      enabled: isProduction
    }
  ],
  bundlingEnabled: false,
  minify: false, //isProduction ? true : false,
  fingerprintsEnabled: false,
  urlPrefix: (process.env.URL_PREFIX || '') + '/static',
  outputDir: path.join(__dirname, 'build/static')
})

require('require-self-ref')
require('lasso/node-require-no-op').enable('.less', '.css')
require('marko/express')
require('babel-register')({
  // and .js so you'll have to add them back if you want them to be used again.
  extensions: ['.jsx']
})

require('marko/node-require').install()
// require('lasso/node-require-no-op').enable('.less', '.css');

require('marko/compiler').configure({
  assumeUpToDate: false
})
