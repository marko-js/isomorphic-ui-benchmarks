$_mod.def("/marko$4.18.16/dist/runtime/components/registry-browser", function(require, exports, module, __filename, __dirname) { var complain;
var defineComponent = require('/marko$4.18.16/dist/runtime/components/defineComponent'/*"./defineComponent"*/);
var loader = require('/marko$4.18.16/dist/loader/index-browser'/*"../../loader"*/);

var registered = {};
var loaded = {};
var componentTypes = {};

function register(componentId, def) {
    registered[componentId] = def;
    delete loaded[componentId];
    delete componentTypes[componentId];
    return componentId;
}

function load(typeName, isLegacy) {
    var target = loaded[typeName];
    if (!target) {
        target = registered[typeName];

        if (target) {
            target = target();
        } else if (isLegacy) {
            target = window.$markoLegacy.load(typeName);
        } else {
            target = loader(typeName);
            // eslint-disable-next-line no-constant-condition
        }

        if (!target) {
            throw Error("Component not found: " + typeName);
        }

        loaded[typeName] = target;
    }

    return target;
}

function getComponentClass(typeName, isLegacy) {
    var ComponentClass = componentTypes[typeName];

    if (ComponentClass) {
        return ComponentClass;
    }

    ComponentClass = load(typeName, isLegacy);

    ComponentClass = ComponentClass.Component || ComponentClass;

    if (!ComponentClass.Z_) {
        ComponentClass = defineComponent(ComponentClass, ComponentClass.renderer);
    }

    // Make the component "type" accessible on each component instance
    ComponentClass.prototype.f_ = typeName;

    // eslint-disable-next-line no-constant-condition


    componentTypes[typeName] = ComponentClass;

    return ComponentClass;
}

function createComponent(typeName, id, isLegacy) {
    var ComponentClass = getComponentClass(typeName, isLegacy);
    return new ComponentClass(id);
}

exports.ae_ = register;
exports._J_ = createComponent;
});