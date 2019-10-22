$_mod.def("/marko$4.18.16/dist/runtime/vdom/helpers", function(require, exports, module, __filename, __dirname) { "use strict";

var vdom = require('/marko$4.18.16/dist/runtime/vdom/vdom'/*"./vdom"*/);
var VElement = vdom.aT_;
var VText = vdom.aW_;

var commonHelpers = require('/marko$4.18.16/dist/runtime/helpers'/*"../helpers"*/);
var extend = require('/raptor-util$3.2.0/extend'/*"raptor-util/extend"*/);

var classList = commonHelpers.cl;

var helpers = extend({
    e: function (tagName, attrs, key, component, childCount, flags, props) {
        return new VElement(tagName, attrs, key, component, childCount, flags, props);
    },

    t: function (value) {
        return new VText(value);
    },

    const: function (id) {
        var i = 0;
        return function () {
            return id + i++;
        };
    },

    /**
     * Internal helper method to handle the "class" attribute. The value can either
     * be a string, an array or an object. For example:
     *
     * ca('foo bar') ==> ' class="foo bar"'
     * ca({foo: true, bar: false, baz: true}) ==> ' class="foo baz"'
     * ca(['foo', 'bar']) ==> ' class="foo bar"'
     */
    ca: function (classNames) {
        if (!classNames) {
            return null;
        }

        if (typeof classNames === "string") {
            return classNames;
        } else {
            return classList(classNames);
        }
    },

    as: require('/marko$4.18.16/dist/runtime/vdom/helper-attrs'/*"./helper-attrs"*/)
}, commonHelpers);

module.exports = helpers;
});