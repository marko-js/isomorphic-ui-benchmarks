$_mod.def("/marko$4.2.0/components/index-browser", function(require, exports, module, __filename, __dirname) { var events = require('/marko$4.2.0/runtime/events'/*'../runtime/events'*/);
var Component = require('/marko$4.2.0/components/Component'/*'./Component'*/);
var componentsUtil = require('/marko$4.2.0/components/util-browser'/*'./util'*/);

function onInitComponent(listener) {
    events.on('initComponent', listener);
}

exports.onInitComponent = onInitComponent;
exports.Component = Component;
exports.getComponentForEl = componentsUtil.al;
exports.init = require('/marko$4.2.0/components/init-components-browser'/*'./init-components'*/).ak;

exports.c = require('/marko$4.2.0/components/defineComponent'/*'./defineComponent'*/); // Referenced by compiled templates
exports.r = require('/marko$4.2.0/components/renderer'/*'./renderer'*/); // Referenced by compiled templates
exports.rc = require('/marko$4.2.0/components/registry-browser'/*'./registry'*/)._W;  // Referenced by compiled templates

window.aM = exports; // Helpful when debugging... WARNING: DO NOT USE IN REAL CODE!
});