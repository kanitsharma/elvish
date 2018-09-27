module.exports = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  return (
    (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) ||
        Object.defineProperty(e, t, {
          configurable: !1,
          enumerable: !0,
          get: r
        });
    }),
    (n.r = function(e) {
      Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = "/"),
    n((n.s = 1))
  );
})([
  function(e, t, n) {
    "use strict";
    n.r(t);
    const r = (e, t, ...n) => ({ type: e, props: t || {}, children: n }),
      o = (e, t, n) => ({
        type: e,
        props: (e => e.reduce((e, t) => Object.assign({}, e, t), {}))(t),
        children: n
      });
    const c = e => /^on/.test(e),
      i = e => e.slice(2).toLowerCase(),
      s = e => c(e) || "forceUpdate" === e;
    function u(e, t, n) {
      s(t) ||
        ("className" === t
          ? e.setAttribute("class", n)
          : "boolean" == typeof n
            ? (function(e, t, n) {
                n ? (e.setAttribute(t, n), (e[t] = !0)) : (e[t] = !1);
              })(e, t, n)
            : e.setAttribute(t, n));
    }
    const p = e => {
        if ("string" == typeof e) return document.createTextNode(e);
        const t = document.createElement(e.type);
        return (
          (function(e, t) {
            Object.keys(t).forEach(n => {
              u(e, n, t[n]);
            });
          })(t, e.props),
          (function(e, t) {
            Object.keys(t).forEach(n => {
              c(n) && e.addEventListener(i(n), t[n]);
            });
          })(t, e.props),
          e.children.map(p).forEach(t.appendChild.bind(t)),
          t
        );
      },
      d = (e, t) =>
        typeof e != typeof t ||
        ("string" == typeof e && e !== t) ||
        e.type !== t.type ||
        (e.props && e.props.forceUpdate);
    function l(e, t, n, r = 0) {
      if (n)
        if (t) {
          if (d(t, n)) e.replaceChild(p(t), e.childNodes[r]);
          else if (t.type) {
            l(e.childNodes[r], t.props, n.props);
            const o = t.children.length,
              c = n.children.length;
            for (let i = 0; i < o || i < c; i++)
              l(e.childNodes[r], t.children[i], n.children[i], i);
          }
        } else e.removeChild(e.childNodes[r]);
      else e.appendChild(p(t));
    }
    const f = e => ({ class: e }),
      a = e => ({ id: e }),
      h = e => ({ onClick: e });
    n.d(t, "render", function() {
      return l;
    }),
      n.d(t, "h", function() {
        return r;
      }),
      n.d(t, "f", function() {
        return o;
      }),
      n.d(t, "className", function() {
        return f;
      }),
      n.d(t, "onClick", function() {
        return h;
      }),
      n.d(t, "id", function() {
        return a;
      });
  },
  function(e, t, n) {
    e.exports = n(0);
  }
]);
