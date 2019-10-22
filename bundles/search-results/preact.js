var app = (function () {
  'use strict';

  var n,
      l,
      u,
      t,
      i,
      r,
      o,
      f = {},
      e = [],
      c = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

  function s(n, l) {
    for (var u in l) n[u] = l[u];

    return n;
  }

  function a(n) {
    var l = n.parentNode;
    l && l.removeChild(n);
  }

  function h(n, l, u) {
    var t,
        i,
        r,
        o,
        f = arguments;
    if (l = s({}, l), arguments.length > 3) for (u = [u], t = 3; t < arguments.length; t++) u.push(f[t]);
    if (null != u && (l.children = u), null != n && null != n.defaultProps) for (i in n.defaultProps) void 0 === l[i] && (l[i] = n.defaultProps[i]);
    return o = l.key, null != (r = l.ref) && delete l.ref, null != o && delete l.key, v(n, l, o, r);
  }

  function v(l, u, t, i) {
    var r = {
      type: l,
      props: u,
      key: t,
      ref: i,
      __k: null,
      __p: null,
      __b: 0,
      __e: null,
      l: null,
      __c: null,
      constructor: void 0
    };
    return n.vnode && n.vnode(r), r;
  }

  function p() {
    return {};
  }

  function d(n) {
    return n.children;
  }

  function y(n) {
    if (null == n || "boolean" == typeof n) return null;
    if ("string" == typeof n || "number" == typeof n) return v(null, n, null, null);

    if (null != n.__e || null != n.__c) {
      var l = v(n.type, n.props, n.key, null);
      return l.__e = n.__e, l;
    }

    return n;
  }

  function m(n, l) {
    this.props = n, this.context = l;
  }

  function w(n, l) {
    if (null == l) return n.__p ? w(n.__p, n.__p.__k.indexOf(n) + 1) : null;

    for (var u; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) return u.__e;

    return "function" == typeof n.type ? w(n) : null;
  }

  function g(n) {
    var l, u;

    if (null != (n = n.__p) && null != n.__c) {
      for (n.__e = n.__c.base = null, l = 0; l < n.__k.length; l++) if (null != (u = n.__k[l]) && null != u.__e) {
        n.__e = n.__c.base = u.__e;
        break;
      }

      return g(n);
    }
  }

  function k(l) {
    (!l.__d && (l.__d = !0) && 1 === u.push(l) || i !== n.debounceRendering) && (i = n.debounceRendering, (n.debounceRendering || t)(_));
  }

  function _() {
    var n, l, t, i, r, o, f;

    for (u.sort(function (n, l) {
      return l.__v.__b - n.__v.__b;
    }); n = u.pop();) n.__d && (t = void 0, i = void 0, o = (r = (l = n).__v).__e, (f = l.__P) && (t = [], i = $(f, r, s({}, r), l.__n, void 0 !== f.ownerSVGElement, null, t, null == o ? w(r) : o), j(t, r), i != o && g(r)));
  }

  function b(n, l, u, t, i, r, o, c, s) {
    var h,
        v,
        p,
        d,
        y,
        m,
        g,
        k = u && u.__k || e,
        _ = k.length;
    if (c == f && (c = null != r ? r[0] : _ ? w(u, 0) : null), h = 0, l.__k = x(l.__k, function (u) {
      if (null != u) {
        if (u.__p = l, u.__b = l.__b + 1, null === (p = k[h]) || p && u.key == p.key && u.type === p.type) k[h] = void 0;else for (v = 0; v < _; v++) {
          if ((p = k[v]) && u.key == p.key && u.type === p.type) {
            k[v] = void 0;
            break;
          }

          p = null;
        }

        if (d = $(n, u, p = p || f, t, i, r, o, c, s), (v = u.ref) && p.ref != v && (g || (g = [])).push(v, u.__c || d, u), null != d) {
          if (null == m && (m = d), null != u.l) d = u.l, u.l = null;else if (r == p || d != c || null == d.parentNode) {
            n: if (null == c || c.parentNode !== n) n.appendChild(d);else {
              for (y = c, v = 0; (y = y.nextSibling) && v < _; v += 2) if (y == d) break n;

              n.insertBefore(d, c);
            }

            "option" == l.type && (n.value = "");
          }
          c = d.nextSibling, "function" == typeof l.type && (l.l = d);
        }
      }

      return h++, u;
    }), l.__e = m, null != r && "function" != typeof l.type) for (h = r.length; h--;) null != r[h] && a(r[h]);

    for (h = _; h--;) null != k[h] && D(k[h], k[h]);

    if (g) for (h = 0; h < g.length; h++) A(g[h], g[++h], g[++h]);
  }

  function x(n, l, u) {
    if (null == u && (u = []), null == n || "boolean" == typeof n) l && u.push(l(null));else if (Array.isArray(n)) for (var t = 0; t < n.length; t++) x(n[t], l, u);else u.push(l ? l(y(n)) : n);
    return u;
  }

  function C(n, l, u, t, i) {
    var r;

    for (r in u) r in l || N(n, r, null, u[r], t);

    for (r in l) i && "function" != typeof l[r] || "value" === r || "checked" === r || u[r] === l[r] || N(n, r, l[r], u[r], t);
  }

  function P(n, l, u) {
    "-" === l[0] ? n.setProperty(l, u) : n[l] = "number" == typeof u && !1 === c.test(l) ? u + "px" : null == u ? "" : u;
  }

  function N(n, l, u, t, i) {
    var r, o, f, e, c;
    if ("key" === (l = i ? "className" === l ? "class" : l : "class" === l ? "className" : l) || "children" === l) ;else if ("style" === l) {
      if (r = n.style, "string" == typeof u) r.cssText = u;else {
        if ("string" == typeof t && (r.cssText = "", t = null), t) for (o in t) u && o in u || P(r, o, "");
        if (u) for (f in u) t && u[f] === t[f] || P(r, f, u[f]);
      }
    } else "o" === l[0] && "n" === l[1] ? (e = l !== (l = l.replace(/Capture$/, "")), c = l.toLowerCase(), l = (c in n ? c : l).slice(2), u ? (t || n.addEventListener(l, T, e), (n.u || (n.u = {}))[l] = u) : n.removeEventListener(l, T, e)) : "list" !== l && "tagName" !== l && "form" !== l && !i && l in n ? n[l] = null == u ? "" : u : "function" != typeof u && "dangerouslySetInnerHTML" !== l && (l !== (l = l.replace(/^xlink:?/, "")) ? null == u || !1 === u ? n.removeAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase()) : n.setAttributeNS("http://www.w3.org/1999/xlink", l.toLowerCase(), u) : null == u || !1 === u ? n.removeAttribute(l) : n.setAttribute(l, u));
  }

  function T(l) {
    return this.u[l.type](n.event ? n.event(l) : l);
  }

  function $(l, u, t, i, r, o, f, e, c) {
    var a,
        h,
        v,
        p,
        y,
        w,
        g,
        k,
        _,
        C,
        P = u.type;

    if (void 0 !== u.constructor) return null;
    (a = n.__b) && a(u);

    try {
      n: if ("function" == typeof P) {
        if (k = u.props, _ = (a = P.contextType) && i[a.__c], C = a ? _ ? _.props.value : a.__p : i, t.__c ? g = (h = u.__c = t.__c).__p = h.__E : ("prototype" in P && P.prototype.render ? u.__c = h = new P(k, C) : (u.__c = h = new m(k, C), h.constructor = P, h.render = H), _ && _.sub(h), h.props = k, h.state || (h.state = {}), h.context = C, h.__n = i, v = h.__d = !0, h.__h = []), null == h.__s && (h.__s = h.state), null != P.getDerivedStateFromProps && s(h.__s == h.state ? h.__s = s({}, h.__s) : h.__s, P.getDerivedStateFromProps(k, h.__s)), v) null == P.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && f.push(h);else {
          if (null == P.getDerivedStateFromProps && null == h.t && null != h.componentWillReceiveProps && h.componentWillReceiveProps(k, C), !h.t && null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(k, h.__s, C)) {
            for (h.props = k, h.state = h.__s, h.__d = !1, h.__v = u, u.__e = t.__e, u.__k = t.__k, a = 0; a < u.__k.length; a++) u.__k[a] && (u.__k[a].__p = u);

            break n;
          }

          null != h.componentWillUpdate && h.componentWillUpdate(k, h.__s, C);
        }
        p = h.props, y = h.state, h.context = C, h.props = k, h.state = h.__s, (a = n.__r) && a(u), h.__d = !1, h.__v = u, h.__P = l, a = h.render(h.props, h.state, h.context), u.__k = x(null != a && a.type == d && null == a.key ? a.props.children : a), null != h.getChildContext && (i = s(s({}, i), h.getChildContext())), v || null == h.getSnapshotBeforeUpdate || (w = h.getSnapshotBeforeUpdate(p, y)), b(l, u, t, i, r, o, f, e, c), h.base = u.__e, a = h.__h, h.__h = [], a.some(function (n) {
          n.call(h);
        }), v || null == p || null == h.componentDidUpdate || h.componentDidUpdate(p, y, w), g && (h.__E = h.__p = null), h.t = null;
      } else u.__e = z(t.__e, u, t, i, r, o, f, c);

      (a = n.diffed) && a(u);
    } catch (l) {
      n.__e(l, u, t);
    }

    return u.__e;
  }

  function j(l, u) {
    for (var t; t = l.pop();) try {
      t.componentDidMount();
    } catch (l) {
      n.__e(l, t.__v);
    }

    n.__c && n.__c(u);
  }

  function z(n, l, u, t, i, r, o, c) {
    var s,
        a,
        h,
        v,
        p,
        d = u.props,
        y = l.props;
    if (i = "svg" === l.type || i, null == n && null != r) for (s = 0; s < r.length; s++) if (null != (a = r[s]) && (null === l.type ? 3 === a.nodeType : a.localName === l.type)) {
      n = a, r[s] = null;
      break;
    }

    if (null == n) {
      if (null === l.type) return document.createTextNode(y);
      n = i ? document.createElementNS("http://www.w3.org/2000/svg", l.type) : document.createElement(l.type), r = null;
    }

    if (null === l.type) null != r && (r[r.indexOf(n)] = null), d !== y && (n.data = y);else if (l !== u) {
      if (null != r && (r = e.slice.call(n.childNodes)), h = (d = u.props || f).dangerouslySetInnerHTML, v = y.dangerouslySetInnerHTML, !c) {
        if (d === f) for (d = {}, p = 0; p < n.attributes.length; p++) d[n.attributes[p].name] = n.attributes[p].value;
        (v || h) && (v && h && v.__html == h.__html || (n.innerHTML = v && v.__html || ""));
      }

      C(n, y, d, i, c), l.__k = l.props.children, v || b(n, l, u, t, "foreignObject" !== l.type && i, r, o, f, c), c || ("value" in y && void 0 !== y.value && y.value !== n.value && (n.value = null == y.value ? "" : y.value), "checked" in y && void 0 !== y.checked && y.checked !== n.checked && (n.checked = y.checked));
    }
    return n;
  }

  function A(l, u, t) {
    try {
      "function" == typeof l ? l(u) : l.current = u;
    } catch (l) {
      n.__e(l, t);
    }
  }

  function D(l, u, t) {
    var i, r, o;

    if (n.unmount && n.unmount(l), (i = l.ref) && A(i, null, u), t || "function" == typeof l.type || (t = null != (r = l.__e)), l.__e = l.l = null, null != (i = l.__c)) {
      if (i.componentWillUnmount) try {
        i.componentWillUnmount();
      } catch (l) {
        n.__e(l, u);
      }
      i.base = i.__P = null;
    }

    if (i = l.__k) for (o = 0; o < i.length; o++) i[o] && D(i[o], u, t);
    null != r && a(r);
  }

  function H(n, l, u) {
    return this.constructor(n, u);
  }

  function I(l, u, t) {
    var i, o, c;
    n.__p && n.__p(l, u), o = (i = t === r) ? null : t && t.__k || u.__k, l = h(d, null, [l]), c = [], $(u, i ? u.__k = l : (t || u).__k = l, o || f, f, void 0 !== u.ownerSVGElement, t && !i ? [t] : o ? null : e.slice.call(u.childNodes), c, t || f, i), j(c, l);
  }

  function L(n, l) {
    I(n, l, r);
  }

  function M(n, l) {
    return l = s(s({}, n.props), l), arguments.length > 2 && (l.children = e.slice.call(arguments, 2)), v(n.type, l, l.key || n.key, l.ref || n.ref);
  }

  function O(n) {
    var l = {},
        u = {
      __c: "__cC" + o++,
      __p: n,
      Consumer: function (n, l) {
        return n.children(l);
      },
      Provider: function (n) {
        var t,
            i = this;
        return this.getChildContext || (t = [], this.getChildContext = function () {
          return l[u.__c] = i, l;
        }, this.shouldComponentUpdate = function (l) {
          n.value !== l.value && t.some(function (n) {
            n.__P && (n.context = l.value, k(n));
          });
        }, this.sub = function (n) {
          t.push(n);
          var l = n.componentWillUnmount;

          n.componentWillUnmount = function () {
            t.splice(t.indexOf(n), 1), l && l.call(n);
          };
        }), n.children;
      }
    };
    return u.Consumer.contextType = u, u;
  }

  n = {}, l = function (n) {
    return null != n && void 0 === n.constructor;
  }, m.prototype.setState = function (n, l) {
    var u = this.__s !== this.state && this.__s || (this.__s = s({}, this.state));
    ("function" != typeof n || (n = n(u, this.props))) && s(u, n), null != n && this.__v && (this.t = !1, l && this.__h.push(l), k(this));
  }, m.prototype.forceUpdate = function (n) {
    this.__v && (this.t = !0, n && this.__h.push(n), k(this));
  }, m.prototype.render = d, u = [], t = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, i = n.debounceRendering, n.__e = function (n, l, u) {
    for (var t; l = l.__p;) if ((t = l.__c) && !t.__p) try {
      if (t.constructor && null != t.constructor.getDerivedStateFromError) t.setState(t.constructor.getDerivedStateFromError(n));else {
        if (null == t.componentDidCatch) continue;
        t.componentDidCatch(n);
      }
      return k(t.__E = t);
    } catch (l) {
      n = l;
    }

    throw n;
  }, r = f, o = 0;

  var preact_module = /*#__PURE__*/Object.freeze({
    __proto__: null,
    render: I,
    hydrate: L,
    createElement: h,
    h: h,
    Fragment: d,
    createRef: p,
    get isValidElement () { return l; },
    Component: m,
    cloneElement: M,
    createContext: O,
    toChildArray: x,
    _unmount: D,
    get options () { return n; }
  });

  var h$1 = preact_module.h;
  var Component = preact_module.Component;
  var SearchResultsItem = class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        purchased: false,
        item: this.props.item
      };
      this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
    }

    componentWillReceiveProps(props) {
      this.state = {
        purchased: false
      };
    }

    handleBuyButtonClick() {
      this.setState({
        purchased: true
      });
    }

    render() {
      var item = this.props.item;
      var style = {
        backgroundColor: this.state.purchased ? "#f1c40f" : ""
      };
      return preact_module.h("div", {
        className: "search-results-item",
        style: style
      }, preact_module.h("h2", null, item.title), preact_module.h("div", {
        class: "lvpic pic img left"
      }, preact_module.h("div", {
        class: "lvpicinner full-width picW"
      }, preact_module.h("a", {
        href: "/buy/" + item.id,
        class: "img imgWr2"
      }, preact_module.h("img", {
        src: item.image,
        alt: item.title
      })))), preact_module.h("span", {
        class: "price"
      }, item.price), this.state.purchased ? preact_module.h("div", {
        class: "purchased"
      }, "Purchased!") : preact_module.h("button", {
        class: "buy-now",
        type: "button",
        onClick: this.handleBuyButtonClick
      }, "Buy now!"));
    }

  };

  var h$2 = preact_module.h;
  var Component$1 = preact_module.Component;
  var Footer = class extends Component$1 {
    render() {
      return preact_module.h("footer", {
        id: "glbfooter",
        role: "contentinfo",
        className: "gh-w"
      }, preact_module.h("div", null, preact_module.h("div", {
        id: "rtm_html_1650"
      }, preact_module.h("div", {
        id: "rtm_html_1651"
      }), preact_module.h("h2", {
        className: "gh-ar-hdn"
      }, "Additional site navigation"), preact_module.h("div", {
        id: "gf-BIG",
        className: "gffoot"
      }, preact_module.h("table", {
        className: "gf-t"
      }, preact_module.h("tbody", null, preact_module.h("tr", null, preact_module.h("td", null, preact_module.h("ul", null, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/sch/allcategories/all-categories",
        _sp: "m571.l3601",
        className: "gf-bttl thrd"
      }, "Buy"))), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/help/account/registration.html",
        _sp: "m571.l2895",
        className: "thrd"
      }, "Registration")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/ebay-money-back-guarantee/",
        _sp: "m571.l4539",
        className: "thrd"
      }, "eBay Money Back Guarantee")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/help/buy/basics.html",
        _sp: "m571.l2897",
        className: "thrd"
      }, "Bidding & buying help")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://stores.ebay.com",
        _sp: "m571.l2899",
        className: "thrd"
      }, "Stores")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/local",
        _sp: "m571.l3221",
        className: "thrd"
      }, "eBay Local")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/gds",
        _sp: "m571.l5360",
        className: "thrd"
      }, "eBay guides")))), preact_module.h("td", null, preact_module.h("ul", null, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/sl/sell",
        _sp: "m571.l2903",
        className: "gf-bttl thrd"
      }, "Sell"))), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/sl/sell",
        _sp: "m571.l2904",
        className: "thrd"
      }, "Start selling")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sellerinformation/howtosell/sellingbasics.html",
        _sp: "m571.l2905",
        className: "thrd"
      }, "Learn to sell")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sellerinformation/ebayforbusiness/essentials.html",
        _sp: "m571.l2906",
        className: "thrd"
      }, "Business sellers")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html",
        _exsp: "m571.l2921",
        className: "thrd"
      }, "Affiliates")), preact_module.h("li", {
        className: "gf-li",
        style: {
          paddingTop: 8
        }
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, "Tools & apps")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://anywhere.ebay.com/mobile/",
        _sp: "m571.l2944",
        className: "thrd"
      }, "Mobile apps")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://anywhere.ebay.com",
        _exsp: "m571.l2923",
        className: "thrd"
      }, "Downloads")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://developer.ebay.com",
        _exsp: "m571.l2924",
        className: "thrd"
      }, "Developers")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/securitycenter/index.html",
        _sp: "m571.l2907",
        className: "thrd"
      }, "Security center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://viv.ebay.com/ws/eBayISAPI.dll?EbayTime",
        _sp: "m571.l2908",
        className: "thrd"
      }, "eBay official time")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sitemap.html",
        _sp: "m571.l2909",
        className: "thrd"
      }, "Site map")))), preact_module.h("td", null, preact_module.h("ul", null, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, "eBay companies")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebayclassifiedsgroup.com/",
        _exsp: "m571.l2927",
        className: "thrd"
      }, "eBay Classifieds")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.stubhub.com",
        _exsp: "m571.l3208",
        className: "thrd"
      }, "StubHub")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.close5.com",
        _exsp: "m571.l3360",
        className: "thrd"
      }, "Close5")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.ebayinc.com/our-company/our-other-businesses/",
        _exsp: "m571.l2931",
        className: "thrd"
      }, "See all companies")), preact_module.h("li", {
        className: "gf-li",
        style: {
          paddingTop: 8
        }
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, "Stay connected")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/stories/",
        _sp: "m571.l2940",
        className: "thrd"
      }, "eBay's Blogs")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.facebook.com/eBay",
        _exsp: "m571.l2942",
        className: "thrd gf-i"
      }, preact_module.h("i", {
        className: "gspr icfbg"
      }, "Facebook")), preact_module.h("i", {
        className: "gspr icfbg"
      })), preact_module.h("i", {
        className: "gspr icfbg"
      }, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://twitter.com/#!/eBay",
        _exsp: "m571.l2943",
        className: "thrd gf-i"
      }, preact_module.h("i", {
        className: "gspr ictwg"
      }, "Twitter")), preact_module.h("i", {
        className: "gspr ictwg"
      })), preact_module.h("i", {
        className: "gspr ictwg"
      }, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://plus.google.com/+eBay/posts",
        _exsp: "m571.l3223",
        className: "thrd gf-i"
      }, preact_module.h("i", {
        className: "gspr icgpg"
      }, "Google+")), preact_module.h("i", {
        className: "gspr icgpg"
      })), preact_module.h("i", {
        className: "gspr icgpg"
      })))), preact_module.h("i", {
        className: "gspr icfbg"
      }, preact_module.h("i", {
        className: "gspr ictwg"
      }, preact_module.h("i", {
        className: "gspr icgpg"
      })))), preact_module.h("td", null, preact_module.h("ul", null, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, preact_module.h("a", {
        href: "http://www.ebayinc.com",
        _exsp: "m571.l2932",
        className: "gf-bttl thrd"
      }, "About eBay"))), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.ebayinc.com/our-company/",
        _exsp: "m571.l2933",
        className: "thrd"
      }, "Company info")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.ebayinc.com/stories/news/",
        _exsp: "m571.l2934",
        className: "thrd"
      }, "News")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://investors.ebayinc.com",
        _exsp: "m571.l3269",
        className: "thrd"
      }, "Investors")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://careers.ebayinc.com/",
        _exsp: "m571.l2937",
        className: "thrd"
      }, "Careers")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebaymainstreet.com",
        _exsp: "m571.l2936",
        className: "thrd"
      }, "Government relations")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://cc.ebay.com",
        _exsp: "m571.l2938",
        className: "thrd"
      }, "Advertise with us")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/help/policies/overview.html",
        _sp: "m571.l2910",
        className: "thrd"
      }, "Policies")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/help/policies/programs-vero-ov.html",
        _sp: "m571.l3418",
        className: "thrd"
      }, "Verified Rights Owner (VeRO) Program")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://qu.ebay.com/survey?srvName=globalheader+%28footer-US%29",
        className: "thrd gh-survey",
        title: "opens in a new window or tab"
      }, "Tell us what you think")))), preact_module.h("td", null, preact_module.h("ul", null, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, preact_module.h("a", {
        href: "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport",
        _sp: "m571.l1545",
        className: "gf-bttl thrd"
      }, "Help & Contact"))), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://resolutioncenter.ebay.com/",
        _sp: "m571.l1619",
        className: "thrd"
      }, "Resolution Center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sellerinformation/index.html",
        _sp: "m571.l1613",
        className: "thrd"
      }, "Seller Information Center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://ocsnext.ebay.com/ocs/cuhome",
        _sp: "m571.l2911",
        className: "thrd"
      }, "Contact us")), preact_module.h("li", {
        className: "gf-li",
        style: {
          paddingTop: 8
        }
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, preact_module.h("a", {
        href: "http://community.ebay.com",
        _sp: "m571.l2912",
        className: "gf-bttl thrd"
      }, "Community"))), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://announcements.ebay.com",
        _sp: "m571.l2913",
        className: "thrd"
      }, "Announcements")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/community/answercenter/index.html",
        _sp: "m571.l2914",
        className: "thrd"
      }, "Answer center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://forums.ebay.com",
        _exsp: "m571.l2939",
        className: "thrd"
      }, "Discussion boards")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://givingworks.ebay.com",
        _exsp: "m571.l3271",
        className: "thrd"
      }, "eBay Giving Works")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://givingworks.ebay.com/browse/celebrities",
        _exsp: "m571.l3272",
        className: "thrd"
      }, "eBay Celebrity")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://groups.ebay.com/groups/EbayGroups/1?redirected=1",
        _exsp: "m571.l2941",
        className: "thrd"
      }, "Groups")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebay.com/ets/eBayTopShared",
        _sp: "m571.l2916",
        className: "thrd"
      }, "eBay top shared")), preact_module.h("li", {
        className: "gf-li",
        style: {
          paddingTop: 8
        }
      }, preact_module.h("h3", {
        className: "gf-bttl"
      }, "eBay Sites")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("div", {
        className: "gf-flags-wpr"
      }, preact_module.h("a", {
        "aria-expanded": "false",
        "aria-controls": "gf-f",
        role: "button",
        className: "thrd",
        title: "eBay country sites",
        _sp: "m571.l2586",
        href: "http://www.ebay.com",
        id: "gf-fbtn"
      }, "United States", preact_module.h("b", {
        className: "gf-if gspr flus"
      }), " ", preact_module.h("b", {
        id: "gf-fbtn-arr",
        className: "gh-sprRetina"
      })), preact_module.h("div", {
        id: "gf-f",
        style: {
          display: "none"
        }
      }, preact_module.h("ul", {
        className: "gf-ful",
        role: "navigation"
      }, preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.com.au",
        className: "gf-if-a",
        title: "eBay Australia"
      }, preact_module.h("b", {
        className: "flau gf-if gspr"
      }), "Australia")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.at",
        className: "gf-if-a",
        title: "eBay Austria"
      }, preact_module.h("b", {
        className: "flat gf-if gspr"
      }), "Austria")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.be",
        className: "gf-if-a",
        title: "eBay Belgium"
      }, preact_module.h("b", {
        className: "flbe gf-if gspr"
      }), "Belgium")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.ca",
        className: "gf-if-a",
        title: "eBay Canada"
      }, preact_module.h("b", {
        className: "flca gf-if gspr"
      }), "Canada")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.cn",
        className: "gf-if-a",
        title: "eBay China"
      }, preact_module.h("b", {
        className: "flcn gf-if gspr"
      }), "China")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.fr",
        className: "gf-if-a",
        title: "eBay France"
      }, preact_module.h("b", {
        className: "flfr gf-if gspr"
      }), "France")), preact_module.h("li", {
        className: "gf-f-li0"
      }, preact_module.h("a", {
        href: "http://www.ebay.de",
        className: "gf-if-a",
        title: "eBay Germany"
      }, preact_module.h("b", {
        className: "flde gf-if gspr"
      }), "Germany")), preact_module.h("li", {
        className: "gf-f-li1 gf-f-li-top"
      }, preact_module.h("a", {
        href: "http://www.ebay.com.hk",
        className: "gf-if-a",
        title: "eBay Hong Kong"
      }, preact_module.h("b", {
        className: "flhk gf-if gspr"
      }), "Hong Kong")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://www.ebay.in",
        className: "gf-if-a",
        title: "eBay India"
      }, preact_module.h("b", {
        className: "flin gf-if gspr"
      }), "India")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://www.ebay.ie",
        className: "gf-if-a",
        title: "eBay Ireland"
      }, preact_module.h("b", {
        className: "flie gf-if gspr"
      }), "Ireland")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://www.ebay.it",
        className: "gf-if-a",
        title: "eBay Italy"
      }, preact_module.h("b", {
        className: "flit gf-if gspr"
      }), "Italy")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://www.ebay.co.jp",
        className: "gf-if-a",
        title: "eBay Japan"
      }, preact_module.h("b", {
        className: "fljp gf-if gspr"
      }), "Japan")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://global.gmarket.co.kr/Home/Main",
        className: "gf-if-a",
        title: "eBay Korea"
      }, preact_module.h("b", {
        className: "flkr gf-if gspr"
      }), "Korea")), preact_module.h("li", {
        className: "gf-f-li1"
      }, preact_module.h("a", {
        href: "http://www.ebay.com.my",
        className: "gf-if-a",
        title: "eBay Malaysia"
      }, preact_module.h("b", {
        className: "flmy gf-if gspr"
      }), "Malaysia")), preact_module.h("li", {
        className: "gf-f-li2 gf-f-li-top"
      }, preact_module.h("a", {
        href: "http://www.ebay.nl",
        className: "gf-if-a",
        title: "eBay Netherlands"
      }, preact_module.h("b", {
        className: "flnl gf-if gspr"
      }), "Netherlands")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.ph",
        className: "gf-if-a",
        title: "eBay Philippines"
      }, preact_module.h("b", {
        className: "flph gf-if gspr"
      }), "Philippines")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.pl",
        className: "gf-if-a",
        title: "eBay Poland"
      }, preact_module.h("b", {
        className: "flpl gf-if gspr"
      }), "Poland")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.com.sg",
        className: "gf-if-a",
        title: "eBay Singapore"
      }, preact_module.h("b", {
        className: "flsg gf-if gspr"
      }), "Singapore")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.es",
        className: "gf-if-a",
        title: "eBay Spain"
      }, preact_module.h("b", {
        className: "fles gf-if gspr"
      }), "Spain")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.se",
        className: "gf-if-a",
        title: "eBay Sweden"
      }, preact_module.h("b", {
        className: "flse gf-if gspr"
      }), "Sweden")), preact_module.h("li", {
        className: "gf-f-li2"
      }, preact_module.h("a", {
        href: "http://www.ebay.ch",
        className: "gf-if-a",
        title: "eBay Switzerland"
      }, preact_module.h("b", {
        className: "flch gf-if gspr"
      }), "Switzerland")), preact_module.h("li", {
        className: "gf-f-li3 gf-f-li-top"
      }, preact_module.h("a", {
        href: "http://www.ebay.com.tw",
        className: "gf-if-a",
        title: "eBay Taiwan"
      }, preact_module.h("b", {
        className: "fltw gf-if gspr"
      }), "Taiwan")), preact_module.h("li", {
        className: "gf-f-li3"
      }, preact_module.h("a", {
        href: "http://www.ebay.co.th",
        className: "gf-if-a",
        title: "eBay Thailand"
      }, preact_module.h("b", {
        className: "flth gf-if gspr"
      }), "Thailand")), preact_module.h("li", {
        className: "gf-f-li3"
      }, preact_module.h("a", {
        href: "http://www.gittigidiyor.com",
        className: "gf-if-a",
        title: "eBay Turkey"
      }, preact_module.h("b", {
        className: "fltr gf-if gspr"
      }), "Turkey")), preact_module.h("li", {
        className: "gf-f-li3"
      }, preact_module.h("a", {
        href: "http://www.ebay.co.uk",
        className: "gf-if-a",
        title: "eBay United Kingdom"
      }, preact_module.h("b", {
        className: "flgb gf-if gspr"
      }), "United Kingdom")), preact_module.h("li", {
        className: "gf-f-li3"
      }, preact_module.h("a", {
        href: "http://www.ebay.vn",
        className: "gf-if-a",
        title: "eBay Vietnam"
      }, preact_module.h("b", {
        className: "flvn gf-if gspr"
      }), "Vietnam")))))))))))), preact_module.h("div", {
        id: "gf-t-box"
      }, preact_module.h("table", {
        className: "gf-t"
      }, preact_module.h("tbody", null, preact_module.h("tr", null, preact_module.h("td", {
        colSpan: 2
      }, preact_module.h("ul", {
        id: "gf-l",
        className: "gf-lb"
      }, preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://www.ebayinc.com",
        _exsp: "m571.l2602",
        className: "thrd gf-bar-a"
      }, "About eBay")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://announcements.ebay.com",
        _exsp: "m571.l2935",
        className: "thrd gf-bar-a"
      }, "Announcements")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://community.ebay.com",
        _exsp: "m571.l1540",
        className: "thrd gf-bar-a"
      }, "Community")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/securitycenter/index.html",
        _exsp: "m571.l2616",
        className: "thrd gf-bar-a"
      }, "Security Center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://resolutioncenter.ebay.com/",
        _sp: "m571.l1619",
        className: "thrd gf-bar-a"
      }, "Resolution Center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sellerinformation/index.html",
        _exsp: "m571.l1613",
        className: "thrd gf-bar-a"
      }, "Seller Information Center")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/help/policies/overview.html",
        _exsp: "m571.l2604",
        className: "thrd gf-bar-a"
      }, "Policies")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "https://www.ebaypartnernetwork.com/files/hub/en-US/index.html",
        _exsp: "m571.l3947",
        className: "thrd gf-bar-a"
      }, "Affiliates")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://ocs.ebay.com/ws/eBayISAPI.dll?CustomerSupport",
        _sp: "m571.l1545",
        className: "thrd gf-bar-a"
      }, "Help & Contact")), preact_module.h("li", {
        className: "gf-li"
      }, preact_module.h("a", {
        href: "http://pages.ebay.com/sitemap.html",
        _exsp: "m571.l2909",
        className: "thrd gf-bar-a"
      }, "Site Map"))))), preact_module.h("tr", {
        valign: "top"
      }, preact_module.h("td", {
        className: "gf-legal"
      }, "Copyright \xA9 1995-2016 eBay Inc. All Rights Reserved.", preact_module.h("a", {
        href: "http://pages.ebay.com/help/policies/user-agreement.html"
      }, "User Agreement"), ",", preact_module.h("a", {
        href: "http://pages.ebay.com/help/policies/privacy-policy.html"
      }, "Privacy"), ",", preact_module.h("a", {
        href: "http://pages.ebay.com/help/account/cookies-web-beacons.html"
      }, "Cookies"), "and", preact_module.h("a", {
        href: "http://cgi6.ebay.com/ws/eBayISAPI.dll?AdChoiceLandingPage&partner=0",
        id: "gf-AdChoice"
      }, "AdChoice")))))))));
    }

  };

  var h$3 = preact_module.h;
  var Component$2 = preact_module.Component;





  var App = class extends Component$2 {
    componentDidMount() {
      window.onMount();
    }

    render() {
      var searchResultsData = this.props.searchResultsData;
      return preact_module.h("div", {
        className: "search-results"
      }, preact_module.h("div", null, searchResultsData.items.map(function (item, i) {
        return preact_module.h(SearchResultsItem, {
          key: i,
          item: item
        });
      })), preact_module.h(Footer, null));
    }

  };

  var h$4 = preact_module.h;
  var render = preact_module.render;



  var mountNode = document.getElementById("searchResultsMount");

  if (mountNode) {
    render(preact_module.h(App, {
      searchResultsData: window.searchResultsData
    }), mountNode, mountNode.firstChild);
    console.log("Re-rendering on client completed");
  }

  window.addBench("preact", function (el, getNextSearchResults) {
    render(preact_module.h(App, {
      searchResultsData: getNextSearchResults()
    }), el);
    return function (done) {
      render(preact_module.h(App, {
        searchResultsData: getNextSearchResults()
      }), el, el.firstChild);
      done();
    };
  });

  var client = {

  };

  return client;

}());
