$_mod.def("/marko$4.2.0/components/renderer", function(require, exports, module, __filename, __dirname) { var componentsUtil = require('/marko$4.2.0/components/util-browser'/*'./util'*/);
var componentLookup = componentsUtil.P;
var emitLifecycleEvent = componentsUtil._l;
var nextRepeatedId = require('/marko$4.2.0/components/nextRepeatedId'/*'./nextRepeatedId'*/);
var repeatedRegExp = /\[\]$/;
var ComponentsContext = require('/marko$4.2.0/components/ComponentsContext'/*'./ComponentsContext'*/);
var registry = require('/marko$4.2.0/components/registry-browser'/*'./registry'*/);
var copyProps = require('/raptor-util$3.2.0/copyProps'/*'raptor-util/copyProps'*/);

var COMPONENT_BEGIN_ASYNC_ADDED_KEY = '$wa';

function resolveComponentKey(out, key, scope) {
    if (key[0] == '#') {
        return key.substring(1);
    } else {
        var resolvedId;

        if (repeatedRegExp.test(key)) {
            resolvedId = nextRepeatedId(out, scope, key);
        } else {
            resolvedId = scope + '-' + key;
        }

        return resolvedId;
    }
}

function preserveComponentEls(existingComponent, out, componentsContext) {
    var rootEls = existingComponent._R({});

    for (var elId in rootEls) {
        var el = rootEls[elId];

        // We put a placeholder element in the output stream to ensure that the existing
        // DOM node is matched up correctly when using morphdom.
        out.element(el.tagName, { id: elId });

        componentsContext.aF(elId); // Mark the element as being preserved (for morphdom)
    }

    existingComponent._d(); // The component is no longer dirty so reset internal flags
    return true;
}

function handleBeginAsync(event) {
    var parentOut = event.parentOut;
    var asyncOut = event.out;
    var componentsContext = asyncOut.global.components;
    var componentStack;

    if (componentsContext && (componentStack = componentsContext.a_)) {
        // All of the components in this async block should be
        // initialized after the components in the parent. Therefore,
        // we will create a new ComponentsContext for the nested
        // async block and will create a new component stack where the current
        // component in the parent block is the only component in the nested
        // stack (to begin with). This will result in top-level components
        // of the async block being added as children of the component in the
        // parent block.
        var nestedComponentsContext = new ComponentsContext(asyncOut, componentStack[componentStack.length-1]);
        asyncOut.data.components = nestedComponentsContext;
    }
    asyncOut.$c = parentOut.$c;
}

function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
    renderingLogic = renderingLogic || {};
    var onInput = renderingLogic.onInput;
    var typeName = componentProps.type;
    var roots = componentProps.roots;
    var assignedId = componentProps.id;
    var split = componentProps.split;

    return function renderer(input, out) {
        var outGlobal = out.global;

        if (!out.isSync()) {
            if (!outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
                outGlobal[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
                out.on('beginAsync', handleBeginAsync);
            }
        }

        var component = outGlobal.$w;
        var isRerender = component !== undefined;
        var id = assignedId;
        var isExisting;
        var customEvents;
        var scope;

        if (component) {
            id = component.id;
            isExisting = true;
            outGlobal.$w = null;
        } else {
            var componentArgs = out.$c;

            if (componentArgs) {
                out.$c = null;

                scope = componentArgs[0];

                if (scope) {
                    scope = scope.id;
                }

                var key = componentArgs[1];
                if (key != null) {
                    key = key.toString();
                }
                id = id || resolveComponentKey(out, key, scope);
                customEvents = componentArgs[2];
            }
        }

        var componentsContext = ComponentsContext.aG(out);
        id = id || componentsContext._Y();

        if (registry.aH) {
            component = registry._X(
                renderingLogic,
                id,
                input,
                out,
                typeName,
                customEvents,
                scope);
            input = component.aI;
            component.aI = undefined; // We don't want aI to be serialized to the browser
        } else {
            if (!component) {
                if (isRerender) {
                    // Look in in the DOM to see if a component with the same ID and type already exists.
                    component = componentLookup[id];
                    if (component && component._q !== typeName) {
                        component = undefined;
                    }
                }

                if (component) {
                    isExisting = true;
                } else {
                    isExisting = false;
                    // We need to create a new instance of the component
                    component = registry._X(typeName, id);

                    if (split) {
                        split = false;

                        var renderingLogicProps = typeof renderingLogic == 'function' ?
                            renderingLogic.prototype :
                            renderingLogic;

                        copyProps(renderingLogicProps, component.constructor.prototype);
                    }
                }

                // Set this flag to prevent the component from being queued for update
                // based on the new input. The component is about to be rerendered
                // so we don't want to queue it up as a result of calling `setInput()`
                component._F = true;

                if (customEvents !== undefined) {
                    component._V(customEvents, scope);
                }


                if (isExisting === false) {
                    emitLifecycleEvent(component, 'create', input, out);
                }

                input = component._N(input, onInput, out);

                if (isExisting === true) {
                    if (component._O === false || component.shouldUpdate(input, component._x) === false) {
                        preserveComponentEls(component, out, componentsContext);
                        return;
                    }
                }
            }

            emitLifecycleEvent(component, 'render', out);
        }

        var componentDef = componentsContext.aD(component);
        componentDef._y = roots;
        componentDef.ad = isExisting;

        // Render the template associated with the component using the final template
        // data that we constructed
        templateRenderFunc(input, out, componentDef, component, component._U);

        componentDef.af();
    };
}

module.exports = createRendererFunc;

// exports used by the legacy renderer
createRendererFunc.aJ = resolveComponentKey;
createRendererFunc.aK = preserveComponentEls;
createRendererFunc.aL = handleBeginAsync;

});