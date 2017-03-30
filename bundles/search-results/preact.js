var app = (function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var preact = createCommonjsModule(function (module, exports) {
!function (global, factory) {
    factory(exports);
}(commonjsGlobal, function (exports) {
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
        this.key = attributes && attributes.key;
    }
    function h(nodeName, attributes) {
        var children, lastSimple, child, simple, i;
        for (i = arguments.length; i-- > 2;) stack.push(arguments[i]);
        if (attributes && attributes.children) {
            if (!stack.length) stack.push(attributes.children);
            delete attributes.children;
        }
        while (stack.length) if ((child = stack.pop()) instanceof Array) for (i = child.length; i--;) stack.push(child[i]);else if (null != child && child !== !0 && child !== !1) {
            if ('number' == typeof child) child = String(child);
            simple = 'string' == typeof child;
            if (simple && lastSimple) children[children.length - 1] += child;else {
                (children || (children = [])).push(child);
                lastSimple = simple;
            }
        }
        var p = new VNode(nodeName, attributes || void 0, children || EMPTY_CHILDREN);
        if (options.vnode) options.vnode(p);
        return p;
    }
    function extend(obj, props) {
        if (props) for (var i in props) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        return extend({}, obj);
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function isFunction(obj) {
        return 'function' == typeof obj;
    }
    function isString(obj) {
        return 'string' == typeof obj;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function cloneElement(vnode, props) {
        return h(vnode.nodeName, extend(clone(vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.');
        return function (e) {
            var t = e && e.target || this,
                state = {},
                obj = state,
                v = isString(eventPath) ? delve(e, eventPath) : t.nodeName ? t.type.match(/^che|rad/) ? t.checked : t.value : e,
                i = 0;
            for (; i < path.length - 1; i++) obj = obj[path[i]] || (obj[path[i]] = !i && component.state[path[i]] || {});
            obj[path[i]] = v;
            component.setState(state);
        };
    }
    function enqueueRender(component) {
        if (!component._dirty && (component._dirty = !0) && 1 == items.push(component)) (options.debounceRendering || defer)(rerender);
    }
    function rerender() {
        var p,
            list = items;
        items = [];
        while (p = list.pop()) if (p._dirty) renderComponent(p);
    }
    function isFunctionalComponent(vnode) {
        var nodeName = vnode && vnode.nodeName;
        return nodeName && isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY);
    }
    function isSameNodeType(node, vnode) {
        if (isString(vnode)) return node instanceof Text;
        if (isString(vnode.nodeName)) return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
        if (isFunction(vnode.nodeName)) return (node._componentConstructor ? node._componentConstructor === vnode.nodeName : !0) || isFunctionalComponent(vnode);else return;
    }
    function isNamedNode(node, nodeName) {
        return node.normalizedNodeName === nodeName || toLowerCase(node.nodeName) === toLowerCase(nodeName);
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes);
        props.children = vnode.children;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (void 0 === props[i]) props[i] = defaultProps[i];
        return props;
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function setAccessor(node, name, old, value, isSvg) {
        if ('className' === name) name = 'class';
        if ('class' === name && value && 'object' == typeof value) value = hashToClassName(value);
        if ('key' === name) ;else if ('class' === name && !isSvg) node.className = value || '';else if ('style' === name) {
            if (!value || isString(value) || isString(old)) node.style.cssText = value || '';
            if (value && 'object' == typeof value) {
                if (!isString(old)) for (var i in old) if (!(i in value)) node.style[i] = '';
                for (var i in value) node.style[i] = 'number' == typeof value[i] && !NON_DIMENSION_PROPS[i] ? value[i] + 'px' : value[i];
            }
        } else if ('dangerouslySetInnerHTML' === name) {
            if (value) node.innerHTML = value.__html || '';
        } else if ('o' == name[0] && 'n' == name[1]) {
            var l = node._listeners || (node._listeners = {});
            name = toLowerCase(name.substring(2));
            if (value) {
                if (!l[name]) node.addEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            } else if (l[name]) node.removeEventListener(name, eventProxy, !!NON_BUBBLING_EVENTS[name]);
            l[name] = value;
        } else if ('list' !== name && 'type' !== name && !isSvg && name in node) {
            setProperty(node, name, null == value ? '' : value);
            if (null == value || value === !1) node.removeAttribute(name);
        } else {
            var ns = isSvg && name.match(/^xlink\:?(.+)/);
            if (null == value || value === !1) {
                if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]));else node.removeAttribute(name);
            } else if ('object' != typeof value && !isFunction(value)) if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', toLowerCase(ns[1]), value);else node.setAttribute(name, value);
        }
    }
    function setProperty(node, name, value) {
        try {
            node[name] = value;
        } catch (e) {}
    }
    function eventProxy(e) {
        return this._listeners[e.type](options.event && options.event(e) || e);
    }
    function collectNode(node) {
        removeNode(node);
        if (node instanceof Element) {
            node._component = node._componentConstructor = null;
            var _name = node.normalizedNodeName || toLowerCase(node.nodeName);
            (nodes[_name] || (nodes[_name] = [])).push(node);
        }
    }
    function createNode(nodeName, isSvg) {
        var name = toLowerCase(nodeName),
            node = nodes[name] && nodes[name].pop() || (isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName));
        node.normalizedNodeName = name;
        return node;
    }
    function flushMounts() {
        var c;
        while (c = mounts.pop()) {
            if (options.afterMount) options.afterMount(c);
            if (c.componentDidMount) c.componentDidMount();
        }
    }
    function diff(dom, vnode, context, mountAll, parent, componentRoot) {
        if (!diffLevel++) {
            isSvgMode = parent && void 0 !== parent.ownerSVGElement;
            hydrating = dom && !(ATTR_KEY in dom);
        }
        var ret = idiff(dom, vnode, context, mountAll);
        if (parent && ret.parentNode !== parent) parent.appendChild(ret);
        if (! --diffLevel) {
            hydrating = !1;
            if (!componentRoot) flushMounts();
        }
        return ret;
    }
    function idiff(dom, vnode, context, mountAll) {
        var ref = vnode && vnode.attributes && vnode.attributes.ref;
        while (isFunctionalComponent(vnode)) vnode = buildFunctionalComponent(vnode, context);
        if (null == vnode) vnode = '';
        if (isString(vnode)) {
            if (dom && dom instanceof Text && dom.parentNode) {
                if (dom.nodeValue != vnode) dom.nodeValue = vnode;
            } else {
                if (dom) recollectNodeTree(dom);
                dom = document.createTextNode(vnode);
            }
            return dom;
        }
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context, mountAll);
        var out = dom,
            nodeName = String(vnode.nodeName),
            prevSvgMode = isSvgMode,
            vchildren = vnode.children;
        isSvgMode = 'svg' === nodeName ? !0 : 'foreignObject' === nodeName ? !1 : isSvgMode;
        if (!dom) out = createNode(nodeName, isSvgMode);else if (!isNamedNode(dom, nodeName)) {
            out = createNode(nodeName, isSvgMode);
            while (dom.firstChild) out.appendChild(dom.firstChild);
            if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
            recollectNodeTree(dom);
        }
        var fc = out.firstChild,
            props = out[ATTR_KEY];
        if (!props) {
            out[ATTR_KEY] = props = {};
            for (var a = out.attributes, i = a.length; i--;) props[a[i].name] = a[i].value;
        }
        if (!hydrating && vchildren && 1 === vchildren.length && 'string' == typeof vchildren[0] && fc && fc instanceof Text && !fc.nextSibling) {
            if (fc.nodeValue != vchildren[0]) fc.nodeValue = vchildren[0];
        } else if (vchildren && vchildren.length || fc) innerDiffNode(out, vchildren, context, mountAll, !!props.dangerouslySetInnerHTML);
        diffAttributes(out, vnode.attributes, props);
        if (ref) (props.ref = ref)(out);
        isSvgMode = prevSvgMode;
        return out;
    }
    function innerDiffNode(dom, vchildren, context, mountAll, absorb) {
        var j,
            c,
            vchild,
            child,
            originalChildren = dom.childNodes,
            children = [],
            keyed = {},
            keyedLen = 0,
            min = 0,
            len = originalChildren.length,
            childrenLen = 0,
            vlen = vchildren && vchildren.length;
        if (len) for (var i = 0; i < len; i++) {
            var _child = originalChildren[i],
                props = _child[ATTR_KEY],
                key = vlen ? (c = _child._component) ? c.__key : props ? props.key : null : null;
            if (null != key) {
                keyedLen++;
                keyed[key] = _child;
            } else if (hydrating || absorb || props || _child instanceof Text) children[childrenLen++] = _child;
        }
        if (vlen) for (var i = 0; i < vlen; i++) {
            vchild = vchildren[i];
            child = null;
            var key = vchild.key;
            if (null != key) {
                if (keyedLen && key in keyed) {
                    child = keyed[key];
                    keyed[key] = void 0;
                    keyedLen--;
                }
            } else if (!child && min < childrenLen) for (j = min; j < childrenLen; j++) {
                c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = void 0;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = idiff(child, vchild, context, mountAll);
            if (child && child !== dom) if (i >= len) dom.appendChild(child);else if (child !== originalChildren[i]) {
                if (child === originalChildren[i + 1]) removeNode(originalChildren[i]);
                dom.insertBefore(child, originalChildren[i] || null);
            }
        }
        if (keyedLen) for (var i in keyed) if (keyed[i]) recollectNodeTree(keyed[i]);
        while (min <= childrenLen) {
            child = children[childrenLen--];
            if (child) recollectNodeTree(child);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly);else {
            if (node[ATTR_KEY] && node[ATTR_KEY].ref) node[ATTR_KEY].ref(null);
            if (!unmountOnly) collectNode(node);
            var c;
            while (c = node.lastChild) recollectNodeTree(c, unmountOnly);
        }
    }
    function diffAttributes(dom, attrs, old) {
        var name;
        for (name in old) if (!(attrs && name in attrs) && null != old[name]) setAccessor(dom, name, old[name], old[name] = void 0, isSvgMode);
        if (attrs) for (name in attrs) if (!('children' === name || 'innerHTML' === name || name in old && attrs[name] === ('value' === name || 'checked' === name ? dom[name] : old[name]))) setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
    }
    function collectComponent(component) {
        var name = component.constructor.name,
            list = components[name];
        if (list) list.push(component);else components[name] = [component];
    }
    function createComponent(Ctor, props, context) {
        var inst = new Ctor(props, context),
            list = components[Ctor.name];
        Component.call(inst, props, context);
        if (list) for (var i = list.length; i--;) if (list[i].constructor === Ctor) {
            inst.nextBase = list[i].nextBase;
            list.splice(i, 1);
            break;
        }
        return inst;
    }
    function setComponentProps(component, props, opts, context, mountAll) {
        if (!component._disable) {
            component._disable = !0;
            if (component.__ref = props.ref) delete props.ref;
            if (component.__key = props.key) delete props.key;
            if (!component.base || mountAll) {
                if (component.componentWillMount) component.componentWillMount();
            } else if (component.componentWillReceiveProps) component.componentWillReceiveProps(props, context);
            if (context && context !== component.context) {
                if (!component.prevContext) component.prevContext = component.context;
                component.context = context;
            }
            if (!component.prevProps) component.prevProps = component.props;
            component.props = props;
            component._disable = !1;
            if (0 !== opts) if (1 === opts || options.syncComponentUpdates !== !1 || !component.base) renderComponent(component, 1, mountAll);else enqueueRender(component);
            if (component.__ref) component.__ref(component);
        }
    }
    function renderComponent(component, opts, mountAll, isChild) {
        if (!component._disable) {
            var skip,
                rendered,
                inst,
                cbase,
                props = component.props,
                state = component.state,
                context = component.context,
                previousProps = component.prevProps || props,
                previousState = component.prevState || state,
                previousContext = component.prevContext || context,
                isUpdate = component.base,
                nextBase = component.nextBase,
                initialBase = isUpdate || nextBase,
                initialChildComponent = component._component;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (2 !== opts && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === !1) skip = !0;else if (component.componentWillUpdate) component.componentWillUpdate(props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                if (component.render) rendered = component.render(props, state, context);
                if (component.getChildContext) context = extend(clone(context), component.getChildContext());
                while (isFunctionalComponent(rendered)) rendered = buildFunctionalComponent(rendered, context);
                var toUnmount,
                    base,
                    childComponent = rendered && rendered.nodeName;
                if (isFunction(childComponent)) {
                    var childProps = getNodeProps(rendered);
                    inst = initialChildComponent;
                    if (inst && inst.constructor === childComponent && childProps.key == inst.__key) setComponentProps(inst, childProps, 1, context);else {
                        toUnmount = inst;
                        inst = createComponent(childComponent, childProps, context);
                        inst.nextBase = inst.nextBase || nextBase;
                        inst._parentComponent = component;
                        component._component = inst;
                        setComponentProps(inst, childProps, 0, context);
                        renderComponent(inst, 1, mountAll, !0);
                    }
                    base = inst.base;
                } else {
                    cbase = initialBase;
                    toUnmount = initialChildComponent;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || 1 === opts) {
                        if (cbase) cbase._component = null;
                        base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, !0);
                    }
                }
                if (initialBase && base !== initialBase && inst !== initialChildComponent) {
                    var baseParent = initialBase.parentNode;
                    if (baseParent && base !== baseParent) {
                        baseParent.replaceChild(base, initialBase);
                        if (!toUnmount) {
                            initialBase._component = null;
                            recollectNodeTree(initialBase);
                        }
                    }
                }
                if (toUnmount) unmountComponent(toUnmount, base !== initialBase);
                component.base = base;
                if (base && !isChild) {
                    var componentRef = component,
                        t = component;
                    while (t = t._parentComponent) (componentRef = t).base = base;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
            }
            if (!isUpdate || mountAll) mounts.unshift(component);else if (!skip) {
                if (component.componentDidUpdate) component.componentDidUpdate(previousProps, previousState, previousContext);
                if (options.afterUpdate) options.afterUpdate(component);
            }
            var fn,
                cb = component._renderCallbacks;
            if (cb) while (fn = cb.pop()) fn.call(component);
            if (!diffLevel && !isChild) flushMounts();
        }
    }
    function buildComponentFromVNode(dom, vnode, context, mountAll) {
        var c = dom && dom._component,
            originalComponent = c,
            oldDom = dom,
            isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
            isOwner = isDirectOwner,
            props = getNodeProps(vnode);
        while (c && !isOwner && (c = c._parentComponent)) isOwner = c.constructor === vnode.nodeName;
        if (c && isOwner && (!mountAll || c._component)) {
            setComponentProps(c, props, 3, context, mountAll);
            dom = c.base;
        } else {
            if (originalComponent && !isDirectOwner) {
                unmountComponent(originalComponent, !0);
                dom = oldDom = null;
            }
            c = createComponent(vnode.nodeName, props, context);
            if (dom && !c.nextBase) {
                c.nextBase = dom;
                oldDom = null;
            }
            setComponentProps(c, props, 1, context, mountAll);
            dom = c.base;
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function unmountComponent(component, remove) {
        if (options.beforeUnmount) options.beforeUnmount(component);
        var base = component.base;
        component._disable = !0;
        if (component.componentWillUnmount) component.componentWillUnmount();
        component.base = null;
        var inner = component._component;
        if (inner) unmountComponent(inner, remove);else if (base) {
            if (base[ATTR_KEY] && base[ATTR_KEY].ref) base[ATTR_KEY].ref(null);
            component.nextBase = base;
            if (remove) {
                removeNode(base);
                collectComponent(component);
            }
            var c;
            while (c = base.lastChild) recollectNodeTree(c, !remove);
        }
        if (component.__ref) component.__ref(null);
        if (component.componentDidUnmount) component.componentDidUnmount();
    }
    function Component(props, context) {
        this._dirty = !0;
        this.context = context;
        this.props = props;
        if (!this.state) this.state = {};
    }
    function render(vnode, parent, merge) {
        return diff(merge, vnode, {}, !1, parent);
    }
    var options = {};
    var stack = [];
    var EMPTY_CHILDREN = [];
    var lcCache = {};
    var toLowerCase = function (s) {
        return lcCache[s] || (lcCache[s] = s.toLowerCase());
    };
    var resolved = 'undefined' != typeof Promise && Promise.resolve();
    var defer = resolved ? function (f) {
        resolved.then(f);
    } : setTimeout;
    var EMPTY = {};
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol.for('preactattr') : '__preactattr_';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var NON_BUBBLING_EVENTS = {
        blur: 1,
        error: 1,
        focus: 1,
        load: 1,
        resize: 1,
        scroll: 1
    };
    var items = [];
    var nodes = {};
    var mounts = [];
    var diffLevel = 0;
    var isSvgMode = !1;
    var hydrating = !1;
    var components = {};
    extend(Component.prototype, {
        linkState: function (key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {});
            return c[key + eventPath] || (c[key + eventPath] = createLinkedState(this, key, eventPath));
        },
        setState: function (state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            enqueueRender(this);
        },
        forceUpdate: function () {
            renderComponent(this, 2);
        },
        render: function () {}
    });
    exports.h = h;
    exports.cloneElement = cloneElement;
    exports.Component = Component;
    exports.render = render;
    exports.rerender = rerender;
    exports.options = options;
});
});

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var h$2 = preact.h;
var Component$1 = preact.Component;

var SearchResultsItem = function (_Component) {
    _inherits$1(_class, _Component);

    function _class(props) {
        _classCallCheck$1(this, _class);

        var _this = _possibleConstructorReturn$1(this, _Component.call(this, props));

        _this.state = {
            purchased: false,
            item: _this.props.item
        };

        _this.handleBuyButtonClick = _this.handleBuyButtonClick.bind(_this);
        return _this;
    }

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
        this.state = {
            purchased: false
        };
    };

    _class.prototype.handleBuyButtonClick = function handleBuyButtonClick() {
        this.setState({ 'purchased': true });
    };

    _class.prototype.render = function render() {
        var item = this.props.item;
        var style = { backgroundColor: this.state.purchased ? '#f1c40f' : '' };

        return h$2(
            'div',
            { className: 'search-results-item', style: style },
            h$2(
                'h2',
                null,
                item.title
            ),
            h$2(
                'div',
                { 'class': 'lvpic pic img left' },
                h$2(
                    'div',
                    { 'class': 'lvpicinner full-width picW' },
                    h$2(
                        'a',
                        { href: "/buy/" + item.id, 'class': 'img imgWr2' },
                        h$2('img', { src: item.image, alt: item.title })
                    )
                )
            ),
            h$2(
                'span',
                { 'class': 'price' },
                item.price
            ),
            this.state.purchased ? h$2(
                'div',
                { 'class': 'purchased' },
                'Purchased!'
            ) : h$2(
                'button',
                { 'class': 'buy-now', type: 'button', onClick: this.handleBuyButtonClick },
                'Buy now!'
            )
        );
    };

    return _class;
}(Component$1);

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var h$3 = preact.h;
var Component$2 = preact.Component;

var Footer = function (_Component) {
  _inherits$2(_class, _Component);

  function _class() {
    _classCallCheck$2(this, _class);

    return _possibleConstructorReturn$2(this, _Component.apply(this, arguments));
  }

  _class.prototype.render = function render() {
    return h$3(
      "footer",
      { id: "glbfooter", role: "contentinfo", className: "gh-w" },
      h$3(
        "div",
        null,
        h$3(
          "div",
          { id: "rtm_html_1650" },
          h$3("div", { id: "rtm_html_1651" }),
          h$3(
            "h2",
            { className: "gh-ar-hdn" },
            "Additional site navigation"
          ),
          h$3(
            "div",
            { id: "gf-BIG", className: "gffoot" },
            h$3(
              "table",
              { className: "gf-t" },
              h$3(
                "tbody",
                null,
                h$3(
                  "tr",
                  null,
                  h$3(
                    "td",
                    null,
                    h$3(
                      "ul",
                      null,
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          h$3(
                            "a",
                            { href: "http://www.ebay.com/sch/allcategories/all-categories", _sp: "m571.l3601", className: "gf-bttl thrd" },
                            "Buy"
                          )
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/help/account/registration.html", _sp: "m571.l2895", className: "thrd" },
                          "Registration"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/ebay-money-back-guarantee/", _sp: "m571.l4539", className: "thrd" },
                          "eBay Money Back Guarantee"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/help/buy/basics.html", _sp: "m571.l2897", className: "thrd" },
                          "Bidding & buying help"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://stores.ebay.com", _sp: "m571.l2899", className: "thrd" },
                          "Stores"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebay.com/local", _sp: "m571.l3221", className: "thrd" },
                          "eBay Local"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebay.com/gds", _sp: "m571.l5360", className: "thrd" },
                          "eBay guides"
                        )
                      )
                    )
                  ),
                  h$3(
                    "td",
                    null,
                    h$3(
                      "ul",
                      null,
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          h$3(
                            "a",
                            { href: "http://www.ebay.com/sl/sell", _sp: "m571.l2903", className: "gf-bttl thrd" },
                            "Sell"
                          )
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebay.com/sl/sell", _sp: "m571.l2904", className: "thrd" },
                          "Start selling"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sellerinformation/howtosell/sellingbasics.html", _sp: "m571.l2905", className: "thrd" },
                          "Learn to sell"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sellerinformation/ebayforbusiness/essentials.html", _sp: "m571.l2906", className: "thrd" },
                          "Business sellers"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html", _exsp: "m571.l2921", className: "thrd" },
                          "Affiliates"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li", style: { paddingTop: 8 } },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          "Tools & apps"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://anywhere.ebay.com/mobile/", _sp: "m571.l2944", className: "thrd" },
                          "Mobile apps"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://anywhere.ebay.com", _exsp: "m571.l2923", className: "thrd" },
                          "Downloads"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://developer.ebay.com", _exsp: "m571.l2924", className: "thrd" },
                          "Developers"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/securitycenter/index.html", _sp: "m571.l2907", className: "thrd" },
                          "Security center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://viv.ebay.com/ws/eBayISAPI.dll?EbayTime", _sp: "m571.l2908", className: "thrd" },
                          "eBay official time"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sitemap.html", _sp: "m571.l2909", className: "thrd" },
                          "Site map"
                        )
                      )
                    )
                  ),
                  h$3(
                    "td",
                    null,
                    h$3(
                      "ul",
                      null,
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          "eBay companies"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebayclassifiedsgroup.com/", _exsp: "m571.l2927", className: "thrd" },
                          "eBay Classifieds"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.stubhub.com", _exsp: "m571.l3208", className: "thrd" },
                          "StubHub"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.close5.com", _exsp: "m571.l3360", className: "thrd" },
                          "Close5"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.ebayinc.com/our-company/our-other-businesses/", _exsp: "m571.l2931", className: "thrd" },
                          "See all companies"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li", style: { paddingTop: 8 } },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          "Stay connected"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebay.com/stories/", _sp: "m571.l2940", className: "thrd" },
                          "eBay's Blogs"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.facebook.com/eBay", _exsp: "m571.l2942", className: "thrd gf-i" },
                          h$3(
                            "i",
                            { className: "gspr icfbg" },
                            "Facebook"
                          )
                        ),
                        h$3("i", { className: "gspr icfbg" })
                      ),
                      h$3(
                        "i",
                        { className: "gspr icfbg" },
                        h$3(
                          "li",
                          { className: "gf-li" },
                          h$3(
                            "a",
                            { href: "http://twitter.com/#!/eBay", _exsp: "m571.l2943", className: "thrd gf-i" },
                            h$3(
                              "i",
                              { className: "gspr ictwg" },
                              "Twitter"
                            )
                          ),
                          h$3("i", { className: "gspr ictwg" })
                        ),
                        h$3(
                          "i",
                          { className: "gspr ictwg" },
                          h$3(
                            "li",
                            { className: "gf-li" },
                            h$3(
                              "a",
                              { href: "https://plus.google.com/+eBay/posts", _exsp: "m571.l3223", className: "thrd gf-i" },
                              h$3(
                                "i",
                                { className: "gspr icgpg" },
                                "Google+"
                              )
                            ),
                            h$3("i", { className: "gspr icgpg" })
                          ),
                          h$3("i", { className: "gspr icgpg" })
                        )
                      )
                    ),
                    h$3(
                      "i",
                      { className: "gspr icfbg" },
                      h$3(
                        "i",
                        { className: "gspr ictwg" },
                        h$3("i", { className: "gspr icgpg" })
                      )
                    )
                  ),
                  h$3(
                    "td",
                    null,
                    h$3(
                      "ul",
                      null,
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          h$3(
                            "a",
                            { href: "http://www.ebayinc.com", _exsp: "m571.l2932", className: "gf-bttl thrd" },
                            "About eBay"
                          )
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.ebayinc.com/our-company/", _exsp: "m571.l2933", className: "thrd" },
                          "Company info"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.ebayinc.com/stories/news/", _exsp: "m571.l2934", className: "thrd" },
                          "News"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://investors.ebayinc.com", _exsp: "m571.l3269", className: "thrd" },
                          "Investors"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://careers.ebayinc.com/", _exsp: "m571.l2937", className: "thrd" },
                          "Careers"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebaymainstreet.com", _exsp: "m571.l2936", className: "thrd" },
                          "Government relations"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://cc.ebay.com", _exsp: "m571.l2938", className: "thrd" },
                          "Advertise with us"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/help/policies/overview.html", _sp: "m571.l2910", className: "thrd" },
                          "Policies"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/help/policies/programs-vero-ov.html", _sp: "m571.l3418", className: "thrd" },
                          "Verified Rights Owner (VeRO) Program"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://qu.ebay.com/survey?srvName=globalheader+%28footer-US%29", className: "thrd gh-survey", title: "opens in a new window or tab" },
                          "Tell us what you think"
                        )
                      )
                    )
                  ),
                  h$3(
                    "td",
                    null,
                    h$3(
                      "ul",
                      null,
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          h$3(
                            "a",
                            { href: "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport", _sp: "m571.l1545", className: "gf-bttl thrd" },
                            "Help & Contact"
                          )
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://resolutioncenter.ebay.com/", _sp: "m571.l1619", className: "thrd" },
                          "Resolution Center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sellerinformation/index.html", _sp: "m571.l1613", className: "thrd" },
                          "Seller Information Center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://ocsnext.ebay.com/ocs/cuhome", _sp: "m571.l2911", className: "thrd" },
                          "Contact us"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li", style: { paddingTop: 8 } },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          h$3(
                            "a",
                            { href: "http://community.ebay.com", _sp: "m571.l2912", className: "gf-bttl thrd" },
                            "Community"
                          )
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://announcements.ebay.com", _sp: "m571.l2913", className: "thrd" },
                          "Announcements"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/community/answercenter/index.html", _sp: "m571.l2914", className: "thrd" },
                          "Answer center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://forums.ebay.com", _exsp: "m571.l2939", className: "thrd" },
                          "Discussion boards"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://givingworks.ebay.com", _exsp: "m571.l3271", className: "thrd" },
                          "eBay Giving Works"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://givingworks.ebay.com/browse/celebrities", _exsp: "m571.l3272", className: "thrd" },
                          "eBay Celebrity"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://groups.ebay.com/groups/EbayGroups/1?redirected=1", _exsp: "m571.l2941", className: "thrd" },
                          "Groups"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebay.com/ets/eBayTopShared", _sp: "m571.l2916", className: "thrd" },
                          "eBay top shared"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li", style: { paddingTop: 8 } },
                        h$3(
                          "h3",
                          { className: "gf-bttl" },
                          "eBay Sites"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "div",
                          { className: "gf-flags-wpr" },
                          h$3(
                            "a",
                            { "aria-expanded": "false", "aria-controls": "gf-f", role: "button", className: "thrd", title: "eBay country sites", _sp: "m571.l2586", href: "http://www.ebay.com", id: "gf-fbtn" },
                            "United States",
                            h$3("b", { className: "gf-if gspr flus" }),
                            " ",
                            h$3("b", { id: "gf-fbtn-arr", className: "gh-sprRetina" })
                          ),
                          h$3(
                            "div",
                            { id: "gf-f", style: { display: 'none' } },
                            h$3(
                              "ul",
                              { className: "gf-ful", role: "navigation" },
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.com.au", className: "gf-if-a", title: "eBay Australia" },
                                  h$3("b", { className: "flau gf-if gspr" }),
                                  "Australia"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.at", className: "gf-if-a", title: "eBay Austria" },
                                  h$3("b", { className: "flat gf-if gspr" }),
                                  "Austria"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.be", className: "gf-if-a", title: "eBay Belgium" },
                                  h$3("b", { className: "flbe gf-if gspr" }),
                                  "Belgium"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.ca", className: "gf-if-a", title: "eBay Canada" },
                                  h$3("b", { className: "flca gf-if gspr" }),
                                  "Canada"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.cn", className: "gf-if-a", title: "eBay China" },
                                  h$3("b", { className: "flcn gf-if gspr" }),
                                  "China"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.fr", className: "gf-if-a", title: "eBay France" },
                                  h$3("b", { className: "flfr gf-if gspr" }),
                                  "France"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li0" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.de", className: "gf-if-a", title: "eBay Germany" },
                                  h$3("b", { className: "flde gf-if gspr" }),
                                  "Germany"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1 gf-f-li-top" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.com.hk", className: "gf-if-a", title: "eBay Hong Kong" },
                                  h$3("b", { className: "flhk gf-if gspr" }),
                                  "Hong Kong"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.in", className: "gf-if-a", title: "eBay India" },
                                  h$3("b", { className: "flin gf-if gspr" }),
                                  "India"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.ie", className: "gf-if-a", title: "eBay Ireland" },
                                  h$3("b", { className: "flie gf-if gspr" }),
                                  "Ireland"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.it", className: "gf-if-a", title: "eBay Italy" },
                                  h$3("b", { className: "flit gf-if gspr" }),
                                  "Italy"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.co.jp", className: "gf-if-a", title: "eBay Japan" },
                                  h$3("b", { className: "fljp gf-if gspr" }),
                                  "Japan"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://global.gmarket.co.kr/Home/Main", className: "gf-if-a", title: "eBay Korea" },
                                  h$3("b", { className: "flkr gf-if gspr" }),
                                  "Korea"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li1" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.com.my", className: "gf-if-a", title: "eBay Malaysia" },
                                  h$3("b", { className: "flmy gf-if gspr" }),
                                  "Malaysia"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2 gf-f-li-top" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.nl", className: "gf-if-a", title: "eBay Netherlands" },
                                  h$3("b", { className: "flnl gf-if gspr" }),
                                  "Netherlands"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.ph", className: "gf-if-a", title: "eBay Philippines" },
                                  h$3("b", { className: "flph gf-if gspr" }),
                                  "Philippines"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.pl", className: "gf-if-a", title: "eBay Poland" },
                                  h$3("b", { className: "flpl gf-if gspr" }),
                                  "Poland"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.com.sg", className: "gf-if-a", title: "eBay Singapore" },
                                  h$3("b", { className: "flsg gf-if gspr" }),
                                  "Singapore"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.es", className: "gf-if-a", title: "eBay Spain" },
                                  h$3("b", { className: "fles gf-if gspr" }),
                                  "Spain"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.se", className: "gf-if-a", title: "eBay Sweden" },
                                  h$3("b", { className: "flse gf-if gspr" }),
                                  "Sweden"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li2" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.ch", className: "gf-if-a", title: "eBay Switzerland" },
                                  h$3("b", { className: "flch gf-if gspr" }),
                                  "Switzerland"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li3 gf-f-li-top" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.com.tw", className: "gf-if-a", title: "eBay Taiwan" },
                                  h$3("b", { className: "fltw gf-if gspr" }),
                                  "Taiwan"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li3" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.co.th", className: "gf-if-a", title: "eBay Thailand" },
                                  h$3("b", { className: "flth gf-if gspr" }),
                                  "Thailand"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li3" },
                                h$3(
                                  "a",
                                  { href: "http://www.gittigidiyor.com", className: "gf-if-a", title: "eBay Turkey" },
                                  h$3("b", { className: "fltr gf-if gspr" }),
                                  "Turkey"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li3" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.co.uk", className: "gf-if-a", title: "eBay United Kingdom" },
                                  h$3("b", { className: "flgb gf-if gspr" }),
                                  "United Kingdom"
                                )
                              ),
                              h$3(
                                "li",
                                { className: "gf-f-li3" },
                                h$3(
                                  "a",
                                  { href: "http://www.ebay.vn", className: "gf-if-a", title: "eBay Vietnam" },
                                  h$3("b", { className: "flvn gf-if gspr" }),
                                  "Vietnam"
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          ),
          h$3(
            "div",
            { id: "gf-t-box" },
            h$3(
              "table",
              { className: "gf-t" },
              h$3(
                "tbody",
                null,
                h$3(
                  "tr",
                  null,
                  h$3(
                    "td",
                    { colSpan: 2 },
                    h$3(
                      "ul",
                      { id: "gf-l", className: "gf-lb" },
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://www.ebayinc.com", _exsp: "m571.l2602", className: "thrd gf-bar-a" },
                          "About eBay"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://announcements.ebay.com", _exsp: "m571.l2935", className: "thrd gf-bar-a" },
                          "Announcements"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://community.ebay.com", _exsp: "m571.l1540", className: "thrd gf-bar-a" },
                          "Community"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/securitycenter/index.html", _exsp: "m571.l2616", className: "thrd gf-bar-a" },
                          "Security Center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://resolutioncenter.ebay.com/", _sp: "m571.l1619", className: "thrd gf-bar-a" },
                          "Resolution Center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sellerinformation/index.html", _exsp: "m571.l1613", className: "thrd gf-bar-a" },
                          "Seller Information Center"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/help/policies/overview.html", _exsp: "m571.l2604", className: "thrd gf-bar-a" },
                          "Policies"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html", _exsp: "m571.l3947", className: "thrd gf-bar-a" },
                          "Affiliates"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport", _sp: "m571.l1545", className: "thrd gf-bar-a" },
                          "Help & Contact"
                        )
                      ),
                      h$3(
                        "li",
                        { className: "gf-li" },
                        h$3(
                          "a",
                          { href: "http://pages.ebay.com/sitemap.html", _exsp: "m571.l2909", className: "thrd gf-bar-a" },
                          "Site Map"
                        )
                      )
                    )
                  )
                ),
                h$3(
                  "tr",
                  { valign: "top" },
                  h$3(
                    "td",
                    { className: "gf-legal" },
                    "Copyright \xA9 1995-2016 eBay Inc. All Rights Reserved.",
                    h$3(
                      "a",
                      { href: "http://pages.ebay.com/help/policies/user-agreement.html" },
                      "User Agreement"
                    ),
                    ",",
                    h$3(
                      "a",
                      { href: "http://pages.ebay.com/help/policies/privacy-policy.html" },
                      "Privacy"
                    ),
                    ",",
                    h$3(
                      "a",
                      { href: "http://pages.ebay.com/help/account/cookies-web-beacons.html" },
                      "Cookies"
                    ),
                    "and",
                    h$3(
                      "a",
                      { href: "http://cgi6.ebay.com/ws/eBayISAPI.dll?AdChoiceLandingPage&partner=0", id: "gf-AdChoice" },
                      "AdChoice"
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  };

  return _class;
}(Component$2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var h$1 = preact.h;
var Component = preact.Component;




var App = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    _class.prototype.componentDidMount = function componentDidMount() {
        window.onMount();
    };

    _class.prototype.render = function render() {
        var searchResultsData = this.props.searchResultsData;

        return h$1(
            'div',
            { className: 'search-results' },
            h$1(
                'div',
                null,
                searchResultsData.items.map(function (item, i) {
                    return h$1(SearchResultsItem, { key: i, item: item });
                })
            ),
            h$1(Footer, null)
        );
    };

    return _class;
}(Component);

var h = preact.h;
var render = preact.render;



var mountNode = document.getElementById("searchResultsMount");

if (mountNode) {
    render(h(App, { searchResultsData: window.searchResultsData }), mountNode, mountNode.firstChild);

    console.log('Re-rendering on client completed');
}

window.addBench('preact', function (el, getNextSearchResults) {
    render(h(App, { searchResultsData: getNextSearchResults() }), el);

    return function (done) {
        render(h(App, { searchResultsData: getNextSearchResults() }), el, el.firstChild);

        done();
    };
});

var client = {

};

return client;

}());
