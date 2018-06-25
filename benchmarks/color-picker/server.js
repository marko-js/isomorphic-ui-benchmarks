'use strict'
require('marko/node-require')

const colors = require('./colors.json')
module.exports = function(bench) {
  const serverFactory = bench.serverFactory
  const fn = serverFactory(colors)
  return {
    fn
  }
}
