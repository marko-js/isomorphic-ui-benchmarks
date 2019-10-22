$_mod.def("/marko$4.18.16/dist/core-tags/components/preserve-tag-browser", function(require, exports, module, __filename, __dirname) { var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"../../runtime/components/util"*/);
var componentLookup = componentsUtil.h_;

module.exports = function render(input, out) {
    var componentsContext = out.i_;

    if (componentsContext) {
        // See if the DOM node with the given ID already exists.
        // If so, then reuse the existing DOM node instead of re-rendering
        // the children. We have to put a placeholder node that will get
        // replaced out if we find that the DOM node has already been rendered
        if (!("if" in input) || input["if"]) {
            var component = componentsContext.j_.k_;
            var globalComponentsContext = componentsContext.l_;
            var key = input.key;
            var componentId;

            if (key) {
                if (component.m_[key]) {
                    var bodyOnly = input.bodyOnly === true;
                    // Don't actually render anything since the element is already in the DOM,
                    // but keep track that the node is being preserved so that we can ignore
                    // it while transforming the old DOM
                    if (bodyOnly) {
                        globalComponentsContext.n_[component.id + "-" + key] = true;
                    } else {
                        // If we are preserving the entire DOM node (not just the body)
                        // then that means that we have need to render a placeholder to
                        // mark the target location. We can then replace the placeholder
                        // node with the existing DOM node
                        out.element("", null, key, null, 0, 2 /* FLAG_PRESERVE */
                        );
                        globalComponentsContext.o_[component.id + "-" + key] = true;
                    }

                    return;
                }
            } else if (componentId = input.cid) {
                var existingComponent = componentLookup[componentId];
                if (existingComponent) {
                    out.p_(existingComponent);
                    globalComponentsContext.q_[componentId] = true;
                    return;
                }
            }
        }
    }

    if (input.renderBody) {
        input.renderBody(out);
    }
};
});