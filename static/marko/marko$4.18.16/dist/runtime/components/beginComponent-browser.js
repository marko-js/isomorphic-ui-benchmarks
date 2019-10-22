$_mod.def("/marko$4.18.16/dist/runtime/components/beginComponent-browser", function(require, exports, module, __filename, __dirname) { var ComponentDef = require('/marko$4.18.16/dist/runtime/components/ComponentDef'/*"./ComponentDef"*/);

module.exports = function beginComponent(componentsContext, component, key, ownerComponentDef) {
    var componentId = component.id;

    var globalContext = componentsContext.l_;
    var componentDef = componentsContext.j_ = new ComponentDef(component, componentId, globalContext);
    globalContext.q_[componentId] = true;
    componentsContext.i_.push(componentDef);

    var out = componentsContext.z_;
    out.bc(component, key, ownerComponentDef && ownerComponentDef.k_);
    return componentDef;
};
});