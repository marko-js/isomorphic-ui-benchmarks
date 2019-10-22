$_mod.def("/marko$4.18.16/dist/runtime/components/event-delegation", function(require, exports, module, __filename, __dirname) { var componentsUtil = require('/marko$4.18.16/dist/runtime/components/util-browser'/*"./util"*/);
var runtimeId = componentsUtil.ab_;
var componentLookup = componentsUtil.h_;
var getMarkoPropsFromEl = componentsUtil.ac_;

// We make our best effort to allow multiple marko runtimes to be loaded in the
// same window. Each marko runtime will get its own unique runtime ID.
var listenersAttachedKey = "$MDE" + runtimeId;
var delegatedEvents = {};

function getEventFromEl(el, eventName) {
    var virtualProps = getMarkoPropsFromEl(el);
    var eventInfo = virtualProps[eventName];

    if (typeof eventInfo === "string") {
        eventInfo = eventInfo.split(" ");
        if (eventInfo[2]) {
            eventInfo[2] = eventInfo[2] === "true";
        }
        if (eventInfo.length == 4) {
            eventInfo[3] = parseInt(eventInfo[3], 10);
        }
    }

    return eventInfo;
}

function delegateEvent(node, eventName, target, event) {
    var targetMethod = target[0];
    var targetComponentId = target[1];
    var isOnce = target[2];
    var extraArgs = target[3];

    if (isOnce) {
        var virtualProps = getMarkoPropsFromEl(node);
        delete virtualProps[eventName];
    }

    var targetComponent = componentLookup[targetComponentId];

    if (!targetComponent) {
        return;
    }

    var targetFunc = typeof targetMethod === "function" ? targetMethod : targetComponent[targetMethod];
    if (!targetFunc) {
        throw Error("Method not found: " + targetMethod);
    }

    if (extraArgs != null) {
        if (typeof extraArgs === "number") {
            extraArgs = targetComponent.N_[extraArgs];
        }
    }

    // Invoke the component method
    if (extraArgs) {
        targetFunc.apply(targetComponent, extraArgs.concat(event, node));
    } else {
        targetFunc.call(targetComponent, event, node);
    }
}

function addDelegatedEventHandler(eventType) {
    if (!delegatedEvents[eventType]) {
        delegatedEvents[eventType] = true;
    }
}

function addDelegatedEventHandlerToDoc(eventType, doc) {
    var body = doc.body || doc;
    var listeners = doc[listenersAttachedKey] = doc[listenersAttachedKey] || {};
    if (!listeners[eventType]) {
        body.addEventListener(eventType, listeners[eventType] = function (event) {
            var propagationStopped = false;

            // Monkey-patch to fix #97
            var oldStopPropagation = event.stopPropagation;

            event.stopPropagation = function () {
                oldStopPropagation.call(event);
                propagationStopped = true;
            };

            var curNode = event.target;
            if (!curNode) {
                return;
            }

            // event.target of an SVGElementInstance does not have a
            // `getAttribute` function in IE 11.
            // See https://github.com/marko-js/marko/issues/796
            curNode = curNode.correspondingUseElement || curNode;

            // Search up the tree looking DOM events mapped to target
            // component methods
            var propName = "on" + eventType;
            var target;

            // Attributes will have the following form:
            // on<event_type>("<target_method>|<component_id>")

            do {
                if (target = getEventFromEl(curNode, propName)) {
                    delegateEvent(curNode, propName, target, event);

                    if (propagationStopped) {
                        break;
                    }
                }
            } while ((curNode = curNode.parentNode) && curNode.getAttribute);
        }, true);
    }
}

function noop() {}

exports._X_ = noop;
exports._a_ = noop;
exports._U_ = delegateEvent;
exports._V_ = getEventFromEl;
exports._z_ = addDelegatedEventHandler;
exports.ad_ = function (doc) {
    Object.keys(delegatedEvents).forEach(function (eventType) {
        addDelegatedEventHandlerToDoc(eventType, doc);
    });
};
});