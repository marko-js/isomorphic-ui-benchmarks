$_mod.def("/marko$4.18.16/dist/runtime/vdom/helper-attrs", function(require, exports, module, __filename, __dirname) { var complain;

/**
 * Helper for processing dynamic attributes
 */
module.exports = function (attributes) {
    if (typeof attributes === "string") {
        return parseAttrs(attributes);
        // eslint-disable-next-line no-constant-condition
    }

    if (attributes && (attributes.style || attributes.class)) {
        var newAttributes = {};
        Object.keys(attributes).forEach(function (name) {
            if (name === "class") {
                newAttributes[name] = classAttr(attributes[name]);
            } else if (name === "style") {
                newAttributes[name] = styleAttr(attributes[name]);
            } else {
                newAttributes[name] = attributes[name];
            }
        });
        return newAttributes;
    }
    return attributes;
};

var styleAttr = require('/marko$4.18.16/dist/runtime/vdom/helper-styleAttr'/*"./helper-styleAttr"*/);
var classAttr = require('/marko$4.18.16/dist/runtime/vdom/helpers'/*"./helpers"*/).ca;
var parseContainer;
function parseAttrs(str) {
    if (str === "") {
        return {};
    }

    parseContainer = parseContainer || document.createElement("div");
    parseContainer.innerHTML = "<a " + str + ">";
    var attrs = parseContainer.firstChild.attributes;
    var result = {};
    var attr;

    for (var len = attrs.length, i = 0; i < len; i++) {
        attr = attrs[i];
        result[attr.name] = attr.value;
    }

    return result;
}
});