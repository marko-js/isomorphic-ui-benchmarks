"use strict";
require("marko/node-require");

var colors = require("./colors.json");
module.exports = function(bench) {
  var serverFactory = bench.serverFactory;
  var fn = serverFactory(colors);
  return {
    fn
  };
};
