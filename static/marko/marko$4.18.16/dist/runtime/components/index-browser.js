$_mod.def("/marko$4.18.16/dist/runtime/components/index-browser", function(require, exports, module, __filename, __dirname) { var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var initComponents = require('/marko$4.18.16/dist/runtime/components/init-components-browser'/*"./init-components"*/);
var registry = require('/marko$4.18.16/dist/runtime/components/registry-browser'/*"./registry"*/);

require('/marko$4.18.16/dist/runtime/components/ComponentsContext'/*"./ComponentsContext"*/)._M_ = initComponents._M_;

exports.getComponentForEl = componentsUtil.af_;
exports.init = window.$initComponents = initComponents.ag_;

exports.register = function (id, component) {
    registry.ae_(id, function () {
        return component;
    });
};
});