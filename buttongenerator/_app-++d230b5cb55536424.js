(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2888], {
        7544: function (t, e, n) {
            t.exports = n(74297)
        },
        23837: function (t, e, n) {
            (window.__NEXT_P = window.__NEXT_P || []).push(["/_app", function () {
                return n(73675)
            }])
        },
        74297: function (t, e, n) {
            "use strict";
            var r, o = (r = n(34051)) && r.__esModule ? r : {
                default: r
            };

            function c(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }

            function u(t) {
                return (u = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function a(t, e) {
                return !e || "object" !== f(e) && "function" !== typeof e ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }

            function s(t, e) {
                return (s = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = function (t) {
                return t && "undefined" !== typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
            };

            function l(t) {
                var e = function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var n, r = u(t);
                    if (e) {
                        var o = u(this).constructor;
                        n = Reflect.construct(r, arguments, o)
                    } else n = r.apply(this, arguments);
                    return a(this, n)
                }
            }
            e.default = void 0;
            var p = function (t) {
                    return t && t.__esModule ? t : {
                        default: t
                    }
                }(n(67294)),
                y = n(670);

            function h(t, e, n, r, o, c, i) {
                try {
                    var u = t[c](i),
                        a = u.value
                } catch (s) {
                    return void n(s)
                }
                u.done ? e(a) : Promise.resolve(a).then(r, o)
            }

            function v(t) {
                return function () {
                    var e = this,
                        n = arguments;
                    return new Promise((function (r, o) {
                        var c = t.apply(e, n);

                        function i(t) {
                            h(c, r, o, i, u, "next", t)
                        }

                        function u(t) {
                            h(c, r, o, i, u, "throw", t)
                        }
                        i(void 0)
                    }))
                }
            }

            function b(t) {
                return d.apply(this, arguments)
            }

            function d() {
                return (d = v(o.default.mark((function t(e) {
                    var n, r, c;
                    return o.default.wrap((function (t) {
                        for (;;) switch (t.prev = t.next) {
                        case 0:
                            return n = e.Component, r = e.ctx, t.next = 3, y.loadGetInitialProps(n, r);
                        case 3:
                            return c = t.sent, t.abrupt("return", {
                                pageProps: c
                            });
                        case 5:
                        case "end":
                            return t.stop()
                        }
                    }), t)
                })))).apply(this, arguments)
            }
            var m = function (t) {
                ! function (t, e) {
                    if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && s(t, e)
                }(u, t);
                var e, n, r, o = l(u);

                function u() {
                    return c(this, u), o.apply(this, arguments)
                }
                return e = u, (n = [{
                    key: "render",
                    value: function () {
                        var t = this.props,
                            e = t.Component,
                            n = t.pageProps;
                        return p.default.createElement(e, Object.assign({}, n))
                    }
                }]) && i(e.prototype, n), r && i(e, r), u
            }(p.default.Component);
            e.default = m, m.origGetInitialProps = b, m.getInitialProps = b
        },
        73675: function (t, e, n) {
            "use strict";
            n.r(e), n.d(e, {
                default: function () {
                    return g
                }
            });
            var r = n(34051),
                o = n.n(r),
                c = n(85893),
                i = (n(67294), n(7544)),
                u = n(9008),
                a = n.n(u);
            n(8831), n(8383);

            function s(t, e, n, r, o, c, i) {
                try {
                    var u = t[c](i),
                        a = u.value
                } catch (s) {
                    return void n(s)
                }
                u.done ? e(a) : Promise.resolve(a).then(r, o)
            }

            function f(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function l(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var r = e[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
                }
            }

            function p(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t
            }

            function y(t) {
                return (y = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = null != arguments[e] ? arguments[e] : {},
                        r = Object.keys(n);
                    "function" === typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (t) {
                        return Object.getOwnPropertyDescriptor(n, t).enumerable
                    })))), r.forEach((function (e) {
                        p(t, e, n[e])
                    }))
                }
                return t
            }

            function v(t, e) {
                return !e || "object" !== d(e) && "function" !== typeof e ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }

            function b(t, e) {
                return (b = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var d = function (t) {
                return t && "undefined" !== typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
            };

            function m(t) {
                var e = function () {
                    if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
                    if (Reflect.construct.sham) return !1;
                    if ("function" === typeof Proxy) return !0;
                    try {
                        return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function () {}))), !0
                    } catch (t) {
                        return !1
                    }
                }();
                return function () {
                    var n, r = y(t);
                    if (e) {
                        var o = y(this).constructor;
                        n = Reflect.construct(r, arguments, o)
                    } else n = r.apply(this, arguments);
                    return v(this, n)
                }
            }
            var g = function (t) {
                ! function (t, e) {
                    if ("function" !== typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && b(t, e)
                }(u, t);
                var e, n, r, i = m(u);

                function u() {
                    return f(this, u), i.apply(this, arguments)
                }
                return e = u, r = [{
                    key: "getInitialProps",
                    value: function (t) {
                        var e, n = t.Component,
                            r = t.ctx;
                        return (e = o().mark((function t() {
                            var e;
                            return o().wrap((function (t) {
                                for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (e = {}, !n.getInitialProps) {
                                        t.next = 5;
                                        break
                                    }
                                    return t.next = 4, n.getInitialProps(r);
                                case 4:
                                    e = t.sent;
                                case 5:
                                    return t.abrupt("return", {
                                        pageProps: e
                                    });
                                case 6:
                                case "end":
                                    return t.stop()
                                }
                            }), t)
                        })), function () {
                            var t = this,
                                n = arguments;
                            return new Promise((function (r, o) {
                                var c = e.apply(t, n);

                                function i(t) {
                                    s(c, r, o, i, u, "next", t)
                                }

                                function u(t) {
                                    s(c, r, o, i, u, "throw", t)
                                }
                                i(void 0)
                            }))
                        })()
                    }
                }], (n = [{
                    key: "render",
                    value: function () {
                        var t = this.props,
                            e = t.Component,
                            n = t.pageProps;
                        return (0, c.jsxs)(c.Fragment, {
                            children: [(0, c.jsxs)(a(), {
                                children: [(0, c.jsx)("html", {
                                    lang: "en"
                                }), (0, c.jsx)("meta", {
                                    name: "viewport",
                                    content: "width=device-width, initial-scale=1, shrink-to-fit=no"
                                }), (0, c.jsx)("meta", {
                                    name: "keywords",
                                    content: "css button generator, css button maker, css button creator, cssbuttongenerator, Premium CSS Button Generator"
                                }), (0, c.jsx)("meta", {
                                    name: "description",
                                    content: "Premium CSS Button Generator is a free online tool to create Premium CSS buttons without code. Use our premade templates to easily generate CSS buttons"
                                }), (0, c.jsx)("meta", {
                                    name: "robots",
                                    content: "index, follow"
                                }), (0, c.jsx)("meta", {
                                    name: "theme-color",
                                    content: "#000000"
                                }), (0, c.jsx)("meta", {
                                    charSet: "utf-8"
                                }), (0, c.jsx)("link", {
                                    rel: "canonical",
                                    href: "https://premiumcssbuttongenerator.blogspot.com/"
                                }), (0, c.jsx)("title", {
                                    children: "Premium CSS Button Generator | create Premium CSS buttons without code"
                                }), (0, c.jsx)("link", {
                                    rel: "apple-touch-icon",
                                    sizes: "180x180",
                                    href: "/static/favicon/apple-touch-icon.png"
                                }), (0, c.jsx)("link", {
                                    rel: "icon",
                                    type: "image/png",
                                    sizes: "32x32",
                                    href: "/static/favicon/favicon-32x32.png"
                                }), (0, c.jsx)("link", {
                                    rel: "icon",
                                    type: "image/png",
                                    sizes: "16x16",
                                    href: "/static/favicon/favicon-16x16.png"
                                }), (0, c.jsx)("link", {
                                    rel: "manifest",
                                    href: "/static/favicon/site.webmanifest"
                                }), (0, c.jsx)("link", {
                                    rel: "mask-icon",
                                    href: "/static/favicon/safari-pinned-tab.svg",
                                    color: "#000000"
                                }), (0, c.jsx)("link", {
                                    rel: "shortcut icon",
                                    href: "/static/favicon/favicon.png"
                                }), (0, c.jsx)("script", {
                                    async: !0,
                                    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                                })]
                            }), (0, c.jsx)(e, h({}, n))]
                        })
                    }
                }]) && l(e.prototype, n), r && l(e, r), u
            }(i.default)
        },
        8831: function () {},
        8383: function () {},
        9008: function (t, e, n) {
            t.exports = n(83121)
        }
    },
    function (t) {
        var e = function (e) {
            return t(t.s = e)
        };
        t.O(0, [9774, 179], (function () {
            return e(23837), e(80880)
        }));
        var n = t.O();
        _N_E = n
    }
]);
