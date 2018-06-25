'use strict'
require('marko/node-require')
const pageLayoutTemplate = require('./page.marko')

const colors = require('./colors.json')

module.exports = function createRoute(libName, options) {
  const pageTemplate = require(`./${libName}/page.marko`)

  return function(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    pageTemplate.render(
      {
        $global: {
          jsBundle: options.jsBundle,
          title: libName
        },
        pageLayout: pageLayoutTemplate,
        colors: colors
      },
      res
    )

    res.on('error', function(err) {
      console.error('ERROR:', err)
    })
  }
}
