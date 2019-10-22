$_mod.def("/marko$4.18.16/dist/runtime/components/renderer", function(require, exports, module, __filename, __dirname) { var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var componentLookup = componentsUtil.h_;
var emitLifecycleEvent = componentsUtil.E_;

var ComponentsContext = require('/marko$4.18.16/dist/runtime/components/ComponentsContext'/*"./ComponentsContext"*/);
var getComponentsContext = ComponentsContext.D_;
var registry = require('/marko$4.18.16/dist/runtime/components/registry-browser'/*"./registry"*/);
var copyProps = require('/raptor-util$3.2.0/copyProps'/*"raptor-util/copyProps"*/);
var isServer = componentsUtil.az_ === true;
var beginComponent = require('/marko$4.18.16/dist/runtime/components/beginComponent-browser'/*"./beginComponent"*/);
var endComponent = require('/marko$4.18.16/dist/runtime/components/endComponent-browser'/*"./endComponent"*/);

var COMPONENT_BEGIN_ASYNC_ADDED_KEY = "$wa";

function resolveComponentKey(key, parentComponentDef) {
    if (key[0] === "#") {
        return key.substring(1);
    } else {
        return parentComponentDef.id + "-" + parentComponentDef.c_(key);
    }
}

function trackAsyncComponents(out) {
    if (out.isSync() || out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY]) {
        return;
    }

    out.on("beginAsync", handleBeginAsync);
    out.on("beginDetachedAsync", handleBeginDetachedAsync);
    out.global[COMPONENT_BEGIN_ASYNC_ADDED_KEY] = true;
}

function handleBeginAsync(event) {
    var parentOut = event.parentOut;
    var asyncOut = event.out;
    var componentsContext = parentOut.i_;

    if (componentsContext !== undefined) {
        // We are going to start a nested ComponentsContext
        asyncOut.i_ = new ComponentsContext(asyncOut, componentsContext);
    }
    // Carry along the component arguments
    asyncOut.c(parentOut.ax_, parentOut.an_, parentOut.ay_);
}

function handleBeginDetachedAsync(event) {
    var asyncOut = event.out;
    handleBeginAsync(event);
    asyncOut.on("beginAsync", handleBeginAsync);
    asyncOut.on("beginDetachedAsync", handleBeginDetachedAsync);
}

function createRendererFunc(templateRenderFunc, componentProps, renderingLogic) {
    renderingLogic = renderingLogic || {};
    var onInput = renderingLogic.onInput;
    var typeName = componentProps.f_;
    var isSplit = componentProps.d_ === true;
    var isImplicitComponent = componentProps.e_ === true;

    var shouldApplySplitMixins = isSplit;

    return function renderer(input, out) {
        trackAsyncComponents(out);

        var componentsContext = getComponentsContext(out);
        var globalComponentsContext = componentsContext.l_;

        var component = globalComponentsContext._q_;
        var isRerender = component !== undefined;
        var id;
        var isExisting;
        var customEvents;
        var parentComponentDef = componentsContext.j_;
        var ownerComponentDef = out.ax_;
        var ownerComponentId = ownerComponentDef && ownerComponentDef.id;
        var key = out.an_;

        if (component) {
            // If component is provided then we are currently rendering
            // the top-level UI component as part of a re-render
            id = component.id; // We will use the ID of the component being re-rendered
            isExisting = true; // This is a re-render so we know the component is already in the DOM
            globalComponentsContext._q_ = null;
        } else {
            // Otherwise, we are rendering a nested UI component. We will need
            // to match up the UI component with the component already in the
            // DOM (if any) so we will need to resolve the component ID from
            // the assigned key. We also need to handle any custom event bindings
            // that were provided.
            if (parentComponentDef) {
                // console.log('componentArgs:', componentArgs);
                customEvents = out.ay_;

                if (key != null) {
                    id = resolveComponentKey(key.toString(), parentComponentDef);
                } else {
                    id = parentComponentDef._H_();
                }
            } else {
                id = globalComponentsContext._H_();
            }
        }

        if (isServer) {
            // If we are rendering on the server then things are simplier since
            // we don't need to match up the UI component with a previously
            // rendered component already mounted to the DOM. We also create
            // a lightweight ServerComponent
            component = registry._J_(renderingLogic, id, input, out, typeName, customEvents, ownerComponentId);

            // This is the final input after running the lifecycle methods.
            // We will be passing the input to the template for the `input` param
            input = component._R_;

            component._R_ = undefined; // We don't want ___updatedInput to be serialized to the browser
        } else {
            if (!component) {
                if (isRerender && (component = componentLookup[id]) && component.f_ !== typeName) {
                    // Destroy the existing component since
                    component.destroy();
                    component = undefined;
                }

                if (component) {
                    isExisting = true;
                } else {
                    isExisting = false;
                    // We need to create a new instance of the component
                    component = registry._J_(typeName, id);

                    if (shouldApplySplitMixins === true) {
                        shouldApplySplitMixins = false;

                        var renderingLogicProps = typeof renderingLogic == "function" ? renderingLogic.prototype : renderingLogic;

                        copyProps(renderingLogicProps, component.constructor.prototype);
                    }
                }

                // Set this flag to prevent the component from being queued for update
                // based on the new input. The component is about to be rerendered
                // so we don't want to queue it up as a result of calling `setInput()`
                component.U_ = true;

                if (customEvents !== undefined) {
                    component._v_(customEvents, ownerComponentId);
                }

                if (isExisting === false) {
                    emitLifecycleEvent(component, "create", input, out);
                }

                input = component._g_(input, onInput, out);

                if (isExisting === true) {
                    if (component._j_ === false || component.shouldUpdate(input, component.J_) === false) {
                        // We put a placeholder element in the output stream to ensure that the existing
                        // DOM node is matched up correctly when using morphdom. We flag the VElement
                        // node to track that it is a preserve marker
                        out.p_(component);
                        globalComponentsContext.q_[id] = true;
                        component.I_(); // The component is no longer dirty so reset internal flags
                        return;
                    }
                }
            }

            component.S_ = out.global;

            emitLifecycleEvent(component, "render", out);
        }

        var componentDef = beginComponent(componentsContext, component, key, ownerComponentDef, isSplit, isImplicitComponent);

        componentDef._C_ = isExisting;

        // Render the template associated with the component using the final template
        // data that we constructed
        templateRenderFunc(input, out, componentDef, component, component._t_);

        endComponent(out, componentDef);
        componentsContext.j_ = parentComponentDef;
    };
}

module.exports = createRendererFunc;

// exports used by the legacy renderer
createRendererFunc.ak_ = resolveComponentKey;
createRendererFunc.aw_ = trackAsyncComponents;
});