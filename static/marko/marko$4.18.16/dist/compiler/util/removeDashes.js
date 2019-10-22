$_mod.def("/marko$4.18.16/dist/compiler/util/removeDashes", function(require, exports, module, __filename, __dirname) { module.exports = function removeDashes(str) {
    return str.replace(/-([a-z])/g, function (match, lower) {
        return lower.toUpperCase();
    });
};
});