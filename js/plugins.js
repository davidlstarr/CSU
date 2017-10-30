function onYouTubeIframeAPIReady() {
    ytp.YTAPIReady || (ytp.YTAPIReady = !0, jQuery(document).trigger("YTAPIReady"))
}

function uncamel(t) {
    return t.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase()
    })
}

function setUnit(t, e) {
    return "string" != typeof t || t.match(/^[\-0-9\.]+jQuery/) ? "" + t + e : t
}

function setFilter(t, e, i) {
    var n = uncamel(e), r = jQuery.browser.mozilla ? "" : jQuery.CSS.sfx;
    t[r + "filter"] = t[r + "filter"] || "", i = setUnit(i > jQuery.CSS.filters[e].max ? jQuery.CSS.filters[e].max : i, jQuery.CSS.filters[e].unit), t[r + "filter"] += n + "(" + i + ") ", delete t[e]
}

if (!function (t) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
    }(function (t) {
        "use strict";
        var e = "animsition", i = {
            init: function (n) {
                n = t.extend({
                    inClass: "fade-in",
                    outClass: "fade-out",
                    inDuration: 1500,
                    outDuration: 800,
                    linkElement: ".animsition-link",
                    loading: !0,
                    loadingParentElement: "body",
                    loadingClass: "animsition-loading",
                    loadingInner: "",
                    timeout: !1,
                    timeoutCountdown: 5e3,
                    onLoadEvent: !0,
                    browser: ["animation-duration", "-webkit-animation-duration"],
                    overlay: !1,
                    overlayClass: "animsition-overlay-slide",
                    overlayParentElement: "body",
                    transition: function (t) {
                        window.location.href = t
                    }
                }, n), i.settings = {
                    timer: !1,
                    data: {
                        inClass: "animsition-in-class",
                        inDuration: "animsition-in-duration",
                        outClass: "animsition-out-class",
                        outDuration: "animsition-out-duration",
                        overlay: "animsition-overlay"
                    },
                    events: {
                        inStart: "animsition.inStart",
                        inEnd: "animsition.inEnd",
                        outStart: "animsition.outStart",
                        outEnd: "animsition.outEnd"
                    }
                };
                var r = i.supportCheck.call(this, n);
                if (!r && n.browser.length > 0 && (!r || !this.length)) return "console" in window || (window.console = {}, window.console.log = function (t) {
                    return t
                }), this.length || console.log("Animsition: Element does not exist on page."), r || console.log("Animsition: Does not support this browser."), i.destroy.call(this);
                var o = i.optionCheck.call(this, n);
                return o && t("." + n.overlayClass).length <= 0 && i.addOverlay.call(this, n), n.loading && t("." + n.loadingClass).length <= 0 && i.addLoading.call(this, n), this.each(function () {
                    var r = this, o = t(this), s = t(window), a = t(document), l = o.data(e);
                    l || (n = t.extend({}, n), o.data(e, {options: n}), n.timeout && i.addTimer.call(r), n.onLoadEvent && s.on("load." + e, function () {
                        i.settings.timer && clearTimeout(i.settings.timer), i["in"].call(r)
                    }), s.on("pageshow." + e, function (t) {
                        t.originalEvent.persisted && i["in"].call(r)
                    }), s.on("unload." + e, function () {
                    }), a.on("click." + e, n.linkElement, function (e) {
                        e.preventDefault();
                        var n = t(this), o = n.attr("href");
                        2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(o, "_blank") : i.out.call(r, n, o)
                    }))
                })
            }, addOverlay: function (e) {
                t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
            }, addLoading: function (e) {
                t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingInner + "</div>")
            }, removeLoading: function () {
                var i = t(this), n = i.data(e).options, r = t(n.loadingParentElement).children("." + n.loadingClass);
                r.fadeOut().remove()
            }, addTimer: function () {
                var n = this, r = t(this), o = r.data(e).options;
                i.settings.timer = setTimeout(function () {
                    i["in"].call(n), t(window).off("load." + e)
                }, o.timeoutCountdown)
            }, supportCheck: function (e) {
                var i = t(this), n = e.browser, r = n.length, o = !1;
                0 === r && (o = !0);
                for (var s = 0; r > s; s++) if ("string" == typeof i.css(n[s])) {
                    o = !0;
                    break
                }
                return o
            }, optionCheck: function (e) {
                var n, r = t(this);
                return n = !(!e.overlay && !r.data(i.settings.data.overlay))
            }, animationCheck: function (i, n, r) {
                var o = t(this), s = o.data(e).options, a = typeof i, l = !n && "number" === a,
                    u = n && "string" === a && i.length > 0;
                return l || u ? i = i : n && r ? i = s.inClass : !n && r ? i = s.inDuration : n && !r ? i = s.outClass : n || r || (i = s.outDuration), i
            }, "in": function () {
                var n = this, r = t(this), o = r.data(e).options, s = r.data(i.settings.data.inDuration),
                    a = r.data(i.settings.data.inClass), l = i.animationCheck.call(n, s, !1, !0),
                    u = i.animationCheck.call(n, a, !0, !0), c = i.optionCheck.call(n, o), d = r.data(e).outClass;
                o.loading && i.removeLoading.call(n), d && r.removeClass(d), c ? i.inOverlay.call(n, u, l) : i.inDefault.call(n, u, l)
            }, inDefault: function (e, n) {
                var r = t(this);
                r.css({"animation-duration": n + "ms"}).addClass(e).trigger(i.settings.events.inStart).animateCallback(function () {
                    r.removeClass(e).css({opacity: 1}).trigger(i.settings.events.inEnd)
                })
            }, inOverlay: function (n, r) {
                var o = t(this), s = o.data(e).options;
                o.css({opacity: 1}).trigger(i.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({"animation-duration": r + "ms"}).addClass(n).animateCallback(function () {
                    o.trigger(i.settings.events.inEnd)
                })
            }, out: function (n, r) {
                var o = this, s = t(this), a = s.data(e).options, l = n.data(i.settings.data.outClass),
                    u = s.data(i.settings.data.outClass), c = n.data(i.settings.data.outDuration),
                    d = s.data(i.settings.data.outDuration), h = l ? l : u, p = c ? c : d,
                    f = i.animationCheck.call(o, h, !0, !1), m = i.animationCheck.call(o, p, !1, !1),
                    g = i.optionCheck.call(o, a);
                s.data(e).outClass = f, g ? i.outOverlay.call(o, f, m, r) : i.outDefault.call(o, f, m, r)
            }, outDefault: function (n, r, o) {
                var s = t(this), a = s.data(e).options;
                s.css({"animation-duration": r + 1 + "ms"}).addClass(n).trigger(i.settings.events.outStart).animateCallback(function () {
                    s.trigger(i.settings.events.outEnd), a.transition(o)
                })
            }, outOverlay: function (n, r, o) {
                var s = this, a = t(this), l = a.data(e).options, u = a.data(i.settings.data.inClass),
                    c = i.animationCheck.call(s, u, !0, !0);
                t(l.overlayParentElement).children("." + l.overlayClass).css({"animation-duration": r + 1 + "ms"}).removeClass(c).addClass(n).trigger(i.settings.events.outStart).animateCallback(function () {
                    a.trigger(i.settings.events.outEnd), l.transition(o)
                })
            }, destroy: function () {
                return this.each(function () {
                    var i = t(this);
                    t(window).off("." + e), i.css({opacity: 1}).removeData(e)
                })
            }
        };
        t.fn.animateCallback = function (e) {
            var i = "animationend webkitAnimationEnd";
            return this.each(function () {
                var n = t(this);
                n.on(i, function () {
                    return n.off(i), e.call(this)
                })
            })
        }, t.fn.animsition = function (n) {
            return i[n] ? i[n].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof n && n ? void t.error("Method " + n + " does not exist on jQuery." + e) : i.init.apply(this, arguments)
        }
    }), !function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], function (e) {
            return t(e)
        }) : "object" == typeof module && "object" == typeof module.exports ? exports = t(require("jquery")) : t(jQuery)
    }(function (t) {
        function e(t) {
            var e = 7.5625, i = 2.75;
            return 1 / i > t ? e * t * t : 2 / i > t ? e * (t -= 1.5 / i) * t + .75 : 2.5 / i > t ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375
        }

        t.easing.jswing = t.easing.swing;
        var i = Math.pow, n = Math.sqrt, r = Math.sin, o = Math.cos, s = Math.PI, a = 1.70158, l = 1.525 * a,
            u = 2 * s / 3, c = 2 * s / 4.5;
        t.extend(t.easing, {
            def: "easeOutQuad", swing: function (e) {
                return t.easing[t.easing.def](e)
            }, easeInQuad: function (t) {
                return t * t
            }, easeOutQuad: function (t) {
                return 1 - (1 - t) * (1 - t)
            }, easeInOutQuad: function (t) {
                return .5 > t ? 2 * t * t : 1 - i(-2 * t + 2, 2) / 2
            }, easeInCubic: function (t) {
                return t * t * t
            }, easeOutCubic: function (t) {
                return 1 - i(1 - t, 3)
            }, easeInOutCubic: function (t) {
                return .5 > t ? 4 * t * t * t : 1 - i(-2 * t + 2, 3) / 2
            }, easeInQuart: function (t) {
                return t * t * t * t
            }, easeOutQuart: function (t) {
                return 1 - i(1 - t, 4)
            }, easeInOutQuart: function (t) {
                return .5 > t ? 8 * t * t * t * t : 1 - i(-2 * t + 2, 4) / 2
            }, easeInQuint: function (t) {
                return t * t * t * t * t
            }, easeOutQuint: function (t) {
                return 1 - i(1 - t, 5)
            }, easeInOutQuint: function (t) {
                return .5 > t ? 16 * t * t * t * t * t : 1 - i(-2 * t + 2, 5) / 2
            }, easeInSine: function (t) {
                return 1 - o(t * s / 2)
            }, easeOutSine: function (t) {
                return r(t * s / 2)
            }, easeInOutSine: function (t) {
                return -(o(s * t) - 1) / 2
            }, easeInExpo: function (t) {
                return 0 === t ? 0 : i(2, 10 * t - 10)
            }, easeOutExpo: function (t) {
                return 1 === t ? 1 : 1 - i(2, -10 * t)
            }, easeInOutExpo: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : .5 > t ? i(2, 20 * t - 10) / 2 : (2 - i(2, -20 * t + 10)) / 2
            }, easeInCirc: function (t) {
                return 1 - n(1 - i(t, 2))
            }, easeOutCirc: function (t) {
                return n(1 - i(t - 1, 2))
            }, easeInOutCirc: function (t) {
                return .5 > t ? (1 - n(1 - i(2 * t, 2))) / 2 : (n(1 - i(-2 * t + 2, 2)) + 1) / 2
            }, easeInElastic: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : -i(2, 10 * t - 10) * r((10 * t - 10.75) * u)
            }, easeOutElastic: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : i(2, -10 * t) * r((10 * t - .75) * u) + 1
            }, easeInOutElastic: function (t) {
                return 0 === t ? 0 : 1 === t ? 1 : .5 > t ? -(i(2, 20 * t - 10) * r((20 * t - 11.125) * c)) / 2 : i(2, -20 * t + 10) * r((20 * t - 11.125) * c) / 2 + 1
            }, easeInBack: function (t) {
                return (a + 1) * t * t * t - a * t * t
            }, easeOutBack: function (t) {
                return 1 + (a + 1) * i(t - 1, 3) + a * i(t - 1, 2)
            }, easeInOutBack: function (t) {
                return .5 > t ? i(2 * t, 2) * (7.189819 * t - l) / 2 : (i(2 * t - 2, 2) * ((l + 1) * (2 * t - 2) + l) + 2) / 2
            }, easeInBounce: function (t) {
                return 1 - e(1 - t)
            }, easeOutBounce: e, easeInOutBounce: function (t) {
                return .5 > t ? (1 - e(1 - 2 * t)) / 2 : (1 + e(2 * t - 1)) / 2
            }
        })
    }), "undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");
+function (t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 3) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.alert");
            r || i.data("bs.alert", r = new n(this)), "string" == typeof e && r[e].call(i)
        })
    }

    var i = '[data-dismiss="alert"]', n = function (e) {
        t(e).on("click", i, this.close)
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 150, n.prototype.close = function (e) {
        function i() {
            s.detach().trigger("closed.bs.alert").remove()
        }

        var r = t(this), o = r.attr("data-target");
        o || (o = r.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t("#" === o ? [] : o);
        e && e.preventDefault(), s.length || (s = r.closest(".alert")), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) : i())
    };
    var r = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = n, t.fn.alert.noConflict = function () {
        return t.fn.alert = r, this
    }, t(document).on("click.bs.alert.data-api", i, n.prototype.close)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.button"), o = "object" == typeof e && e;
            r || n.data("bs.button", r = new i(this, o)), "toggle" == e ? r.toggle() : e && r.setState(e)
        })
    }

    var i = function (e, n) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, n), this.isLoading = !1
    };
    i.VERSION = "3.3.7", i.DEFAULTS = {loadingText: "loading..."}, i.prototype.setState = function (e) {
        var i = "disabled", n = this.$element, r = n.is("input") ? "val" : "html", o = n.data();
        e += "Text", null == o.resetText && n.data("resetText", n[r]()), setTimeout(t.proxy(function () {
            n[r](null == o[e] ? this.options[e] : o[e]), "loadingText" == e ? (this.isLoading = !0, n.addClass(i).attr(i, i).prop(i, !0)) : this.isLoading && (this.isLoading = !1, n.removeClass(i).removeAttr(i).prop(i, !1))
        }, this), 0)
    }, i.prototype.toggle = function () {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change")
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var n = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function () {
        return t.fn.button = n, this
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function (i) {
        var n = t(i.target).closest(".btn");
        e.call(n, "toggle"), t(i.target).is('input[type="radio"], input[type="checkbox"]') || (i.preventDefault(), n.is("input,button") ? n.trigger("focus") : n.find("input:visible,button:visible").first().trigger("focus"))
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function (e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type))
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.carousel"),
                o = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e),
                s = "string" == typeof e ? e : o.slide;
            r || n.data("bs.carousel", r = new i(this, o)), "number" == typeof e ? r.to(e) : s ? r[s]() : o.interval && r.pause().cycle()
        })
    }

    var i = function (e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, i.prototype.cycle = function (e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, i.prototype.getItemIndex = function (t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active)
    }, i.prototype.getItemForDirection = function (t, e) {
        var i = this.getItemIndex(e), n = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (n && !this.options.wrap) return e;
        var r = "prev" == t ? -1 : 1, o = (i + r) % this.$items.length;
        return this.$items.eq(o)
    }, i.prototype.to = function (t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function () {
            e.to(t)
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t))
    }, i.prototype.pause = function (e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, i.prototype.next = function () {
        return this.sliding ? void 0 : this.slide("next")
    }, i.prototype.prev = function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, i.prototype.slide = function (e, n) {
        var r = this.$element.find(".item.active"), o = n || this.getItemForDirection(e, r), s = this.interval,
            a = "next" == e ? "left" : "right", l = this;
        if (o.hasClass("active")) return this.sliding = !1;
        var u = o[0], c = t.Event("slide.bs.carousel", {relatedTarget: u, direction: a});
        if (this.$element.trigger(c), !c.isDefaultPrevented()) {
            if (this.sliding = !0, s && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var d = t(this.$indicators.children()[this.getItemIndex(o)]);
                d && d.addClass("active")
            }
            var h = t.Event("slid.bs.carousel", {relatedTarget: u, direction: a});
            return t.support.transition && this.$element.hasClass("slide") ? (o.addClass(e), o[0].offsetWidth, r.addClass(a), o.addClass(a), r.one("bsTransitionEnd", function () {
                o.removeClass([e, a].join(" ")).addClass("active"), r.removeClass(["active", a].join(" ")), l.sliding = !1, setTimeout(function () {
                    l.$element.trigger(h)
                }, 0)
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (r.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger(h)), s && this.cycle(), this
        }
    };
    var n = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function () {
        return t.fn.carousel = n, this
    };
    var r = function (i) {
        var n, r = t(this), o = t(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""));
        if (o.hasClass("carousel")) {
            var s = t.extend({}, o.data(), r.data()), a = r.attr("data-slide-to");
            a && (s.interval = !1), e.call(o, s), a && o.data("bs.carousel").to(a), i.preventDefault()
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", r).on("click.bs.carousel.data-api", "[data-slide-to]", r), t(window).on("load", function () {
        t('[data-ride="carousel"]').each(function () {
            var i = t(this);
            e.call(i, i.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }

    function i(i) {
        i && 3 === i.which || (t(r).remove(), t(o).each(function () {
            var n = t(this), r = e(n), o = {relatedTarget: this};
            r.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(r[0], i.target) || (r.trigger(i = t.Event("hide.bs.dropdown", o)), i.isDefaultPrevented() || (n.attr("aria-expanded", "false"), r.removeClass("open").trigger(t.Event("hidden.bs.dropdown", o)))))
        }))
    }

    function n(e) {
        return this.each(function () {
            var i = t(this), n = i.data("bs.dropdown");
            n || i.data("bs.dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }

    var r = ".dropdown-backdrop", o = '[data-toggle="dropdown"]', s = function (e) {
        t(e).on("click.bs.dropdown", this.toggle)
    };
    s.VERSION = "3.3.7", s.prototype.toggle = function (n) {
        var r = t(this);
        if (!r.is(".disabled, :disabled")) {
            var o = e(r), s = o.hasClass("open");
            if (i(), !s) {
                "ontouchstart" in document.documentElement && !o.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var a = {relatedTarget: this};
                if (o.trigger(n = t.Event("show.bs.dropdown", a)), n.isDefaultPrevented()) return;
                r.trigger("focus").attr("aria-expanded", "true"), o.toggleClass("open").trigger(t.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, s.prototype.keydown = function (i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var n = t(this);
            if (i.preventDefault(), i.stopPropagation(), !n.is(".disabled, :disabled")) {
                var r = e(n), s = r.hasClass("open");
                if (!s && 27 != i.which || s && 27 == i.which) return 27 == i.which && r.find(o).trigger("focus"), n.trigger("click");
                var a = " li:not(.disabled):visible a", l = r.find(".dropdown-menu" + a);
                if (l.length) {
                    var u = l.index(i.target);
                    38 == i.which && u > 0 && u--, 40 == i.which && u < l.length - 1 && u++, ~u || (u = 0), l.eq(u).trigger("focus")
                }
            }
        }
    };
    var a = t.fn.dropdown;
    t.fn.dropdown = n, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function () {
        return t.fn.dropdown = a, this
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function (t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, s.prototype.toggle).on("keydown.bs.dropdown.data-api", o, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
}(jQuery), +function (t) {
    "use strict";

    function e(e, n) {
        return this.each(function () {
            var r = t(this), o = r.data("bs.modal"), s = t.extend({}, i.DEFAULTS, r.data(), "object" == typeof e && e);
            o || r.data("bs.modal", o = new i(this, s)), "string" == typeof e ? o[e](n) : s.show && o.show(n)
        })
    }

    var i = function (e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function () {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function (t) {
        return this.isShown ? this.hide() : this.show(t)
    }, i.prototype.show = function (e) {
        var n = this, r = t.Event("show.bs.modal", {relatedTarget: e});
        this.$element.trigger(r), this.isShown || r.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function () {
            n.$element.one("mouseup.dismiss.bs.modal", function (e) {
                t(e.target).is(n.$element) && (n.ignoreBackdropClick = !0)
            })
        }), this.backdrop(function () {
            var r = t.support.transition && n.$element.hasClass("fade");
            n.$element.parent().length || n.$element.appendTo(n.$body), n.$element.show().scrollTop(0), n.adjustDialog(), r && n.$element[0].offsetWidth, n.$element.addClass("in"), n.enforceFocus();
            var o = t.Event("shown.bs.modal", {relatedTarget: e});
            r ? n.$dialog.one("bsTransitionEnd", function () {
                n.$element.trigger("focus").trigger(o)
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : n.$element.trigger("focus").trigger(o)
        }))
    }, i.prototype.hide = function (e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal())
    }, i.prototype.enforceFocus = function () {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function (t) {
            document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus")
        }, this))
    }, i.prototype.escape = function () {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function (t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal")
    }, i.prototype.resize = function () {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal")
    }, i.prototype.hideModal = function () {
        var t = this;
        this.$element.hide(), this.backdrop(function () {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal")
        })
    }, i.prototype.removeBackdrop = function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, i.prototype.backdrop = function (e) {
        var n = this, r = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var o = t.support.transition && r;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + r).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", t.proxy(function (t) {
                    return this.ignoreBackdropClick ? void(this.ignoreBackdropClick = !1) : void(t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()))
                }, this)), o && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            o ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var s = function () {
                n.removeBackdrop(), e && e()
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", s).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : s()
        } else e && e()
    }, i.prototype.handleUpdate = function () {
        this.adjustDialog()
    }, i.prototype.adjustDialog = function () {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        })
    }, i.prototype.resetAdjustments = function () {
        this.$element.css({paddingLeft: "", paddingRight: ""})
    }, i.prototype.checkScrollbar = function () {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, i.prototype.setScrollbar = function () {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, i.prototype.resetScrollbar = function () {
        this.$body.css("padding-right", this.originalBodyPad)
    }, i.prototype.measureScrollbar = function () {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var n = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function () {
        return t.fn.modal = n, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function (i) {
        var n = t(this), r = n.attr("href"), o = t(n.attr("data-target") || r && r.replace(/.*(?=#[^\s]+$)/, "")),
            s = o.data("bs.modal") ? "toggle" : t.extend({remote: !/#/.test(r) && r}, o.data(), n.data());
        n.is("a") && i.preventDefault(), o.one("show.bs.modal", function (t) {
            t.isDefaultPrevented() || o.one("hidden.bs.modal", function () {
                n.is(":visible") && n.trigger("focus")
            })
        }), e.call(o, s, this)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.tooltip"), o = "object" == typeof e && e;
            !r && /destroy|hide/.test(e) || (r || n.data("bs.tooltip", r = new i(this, o)), "string" == typeof e && r[e]())
        })
    }

    var i = function (t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {selector: "body", padding: 0}
    }, i.prototype.init = function (e, i, n) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n), this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = {
                click: !1,
                hover: !1,
                focus: !1
            }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var r = this.options.trigger.split(" "), o = r.length; o--;) {
            var s = r[o];
            if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != s) {
                var a = "hover" == s ? "mouseenter" : "focusin", l = "hover" == s ? "mouseleave" : "focusout";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.getOptions = function (e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, i.prototype.getDelegateOptions = function () {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function (t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, i.prototype.enter = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), i.tip().hasClass("in") || "in" == i.hoverState ? void(i.hoverState = "in") : (clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function () {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show())
    }, i.prototype.isInStateTrue = function () {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1
    }, i.prototype.leave = function (e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function () {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide())
    }, i.prototype.show = function () {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var n = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !n) return;
            var r = this, o = this.tip(), s = this.getUID(this.type);
            this.setContent(), o.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && o.addClass("fade");
            var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) : this.options.placement,
                l = /\s?auto?\s?/i, u = l.test(a);
            u && (a = a.replace(l, "") || "top"), o.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) : o.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var c = this.getPosition(), d = o[0].offsetWidth, h = o[0].offsetHeight;
            if (u) {
                var p = a, f = this.getPosition(this.$viewport);
                a = "bottom" == a && c.bottom + h > f.bottom ? "top" : "top" == a && c.top - h < f.top ? "bottom" : "right" == a && c.right + d > f.width ? "left" : "left" == a && c.left - d < f.left ? "right" : a, o.removeClass(p).addClass(a)
            }
            var m = this.getCalculatedOffset(a, c, d, h);
            this.applyPlacement(m, a);
            var g = function () {
                var t = r.hoverState;
                r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r)
            };
            t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", g).emulateTransitionEnd(i.TRANSITION_DURATION) : g()
        }
    }, i.prototype.applyPlacement = function (e, i) {
        var n = this.tip(), r = n[0].offsetWidth, o = n[0].offsetHeight, s = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top += s, e.left += a, t.offset.setOffset(n[0], t.extend({
            using: function (t) {
                n.css({top: Math.round(t.top), left: Math.round(t.left)})
            }
        }, e), 0), n.addClass("in");
        var l = n[0].offsetWidth, u = n[0].offsetHeight;
        "top" == i && u != o && (e.top = e.top + o - u);
        var c = this.getViewportAdjustedDelta(i, e, l, u);
        c.left ? e.left += c.left : e.top += c.top;
        var d = /top|bottom/.test(i), h = d ? 2 * c.left - r + l : 2 * c.top - o + u,
            p = d ? "offsetWidth" : "offsetHeight";
        n.offset(e), this.replaceArrow(h, n[0][p], d)
    }, i.prototype.replaceArrow = function (t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "")
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, i.prototype.hide = function (e) {
        function n() {
            "in" != r.hoverState && o.detach(), r.$element && r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), e && e()
        }

        var r = this, o = t(this.$tip), s = t.Event("hide.bs." + this.type);
        return this.$element.trigger(s), s.isDefaultPrevented() ? void 0 : (o.removeClass("in"), t.support.transition && o.hasClass("fade") ? o.one("bsTransitionEnd", n).emulateTransitionEnd(i.TRANSITION_DURATION) : n(), this.hoverState = null, this)
    }, i.prototype.fixTitle = function () {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, i.prototype.hasContent = function () {
        return this.getTitle()
    }, i.prototype.getPosition = function (e) {
        e = e || this.$element;
        var i = e[0], n = "BODY" == i.tagName, r = i.getBoundingClientRect();
        null == r.width && (r = t.extend({}, r, {width: r.right - r.left, height: r.bottom - r.top}));
        var o = window.SVGElement && i instanceof window.SVGElement, s = n ? {top: 0, left: 0} : o ? null : e.offset(),
            a = {scroll: n ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()},
            l = n ? {width: t(window).width(), height: t(window).height()} : null;
        return t.extend({}, r, a, l, s)
    }, i.prototype.getCalculatedOffset = function (t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {top: e.top + e.height / 2 - n / 2, left: e.left - i} : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, i.prototype.getViewportAdjustedDelta = function (t, e, i, n) {
        var r = {top: 0, left: 0};
        if (!this.$viewport) return r;
        var o = this.options.viewport && this.options.viewport.padding || 0, s = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var a = e.top - o - s.scroll, l = e.top + o - s.scroll + n;
            a < s.top ? r.top = s.top - a : l > s.top + s.height && (r.top = s.top + s.height - l)
        } else {
            var u = e.left - o, c = e.left + o + i;
            u < s.left ? r.left = s.left - u : c > s.right && (r.left = s.left + s.width - c)
        }
        return r
    }, i.prototype.getTitle = function () {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, i.prototype.getUID = function (t) {
        do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
        return t
    }, i.prototype.tip = function () {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, i.prototype.enable = function () {
        this.enabled = !0
    }, i.prototype.disable = function () {
        this.enabled = !1
    }, i.prototype.toggleEnabled = function () {
        this.enabled = !this.enabled
    }, i.prototype.toggle = function (e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, i.prototype.destroy = function () {
        var t = this;
        clearTimeout(this.timeout), this.hide(function () {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null, t.$element = null
        })
    };
    var n = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function () {
        return t.fn.tooltip = n, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.popover"), o = "object" == typeof e && e;
            !r && /destroy|hide/.test(e) || (r || n.data("bs.popover", r = new i(this, o)), "string" == typeof e && r[e]())
        })
    }

    var i = function (t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.7", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, i.prototype.getDefaults = function () {
        return i.DEFAULTS
    }, i.prototype.setContent = function () {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, i.prototype.hasContent = function () {
        return this.getTitle() || this.getContent()
    }, i.prototype.getContent = function () {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, i.prototype.arrow = function () {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    };
    var n = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function () {
        return t.fn.popover = n, this
    }
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.tab");
            r || n.data("bs.tab", r = new i(this)), "string" == typeof e && r[e]()
        })
    }

    var i = function (e) {
        this.element = t(e)
    };
    i.VERSION = "3.3.7", i.TRANSITION_DURATION = 150, i.prototype.show = function () {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var r = i.find(".active:last a"), o = t.Event("hide.bs.tab", {relatedTarget: e[0]}),
                s = t.Event("show.bs.tab", {relatedTarget: r[0]});
            if (r.trigger(o), e.trigger(s), !s.isDefaultPrevented() && !o.isDefaultPrevented()) {
                var a = t(n);
                this.activate(e.closest("li"), i), this.activate(a, a.parent(), function () {
                    r.trigger({type: "hidden.bs.tab", relatedTarget: e[0]}), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: r[0]
                    })
                })
            }
        }
    }, i.prototype.activate = function (e, n, r) {
        function o() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), r && r()
        }

        var s = n.find("> .active"),
            a = r && t.support.transition && (s.length && s.hasClass("fade") || !!n.find("> .fade").length);
        s.length && a ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), s.removeClass("in")
    };
    var n = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function () {
        return t.fn.tab = n, this
    };
    var r = function (i) {
        i.preventDefault(), e.call(t(this), "show")
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', r).on("click.bs.tab.data-api", '[data-toggle="pill"]', r)
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.affix"), o = "object" == typeof e && e;
            r || n.data("bs.affix", r = new i(this, o)), "string" == typeof e && r[e]()
        })
    }

    var i = function (e, n) {
        this.options = t.extend({}, i.DEFAULTS, n), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition()
    };
    i.VERSION = "3.3.7", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function (t, e, i, n) {
        var r = this.$target.scrollTop(), o = this.$element.offset(), s = this.$target.height();
        if (null != i && "top" == this.affixed) return i > r ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? r + this.unpin <= o.top ? !1 : "bottom" : t - n >= r + s ? !1 : "bottom";
        var a = null == this.affixed, l = a ? r : o.top, u = a ? s : e;
        return null != i && i >= r ? "top" : null != n && l + u >= t - n ? "bottom" : !1
    }, i.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, i.prototype.checkPositionWithEventLoop = function () {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, i.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), n = this.options.offset, r = n.top, o = n.bottom,
                s = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof n && (o = r = n), "function" == typeof r && (r = n.top(this.$element)), "function" == typeof o && (o = n.bottom(this.$element));
            var a = this.getState(s, e, r, o);
            if (this.affixed != a) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (a ? "-" + a : ""), u = t.Event(l + ".bs.affix");
                if (this.$element.trigger(u), u.isDefaultPrevented()) return;
                this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == a && this.$element.offset({top: s - e - o})
        }
    };
    var n = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function () {
        return t.fn.affix = n, this
    }, t(window).on("load", function () {
        t('[data-spy="affix"]').each(function () {
            var i = t(this), n = i.data();
            n.offset = n.offset || {}, null != n.offsetBottom && (n.offset.bottom = n.offsetBottom), null != n.offsetTop && (n.offset.top = n.offsetTop), e.call(i, n)
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e(e) {
        var i, n = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(n)
    }

    function i(e) {
        return this.each(function () {
            var i = t(this), r = i.data("bs.collapse"),
                o = t.extend({}, n.DEFAULTS, i.data(), "object" == typeof e && e);
            !r && o.toggle && /show|hide/.test(e) && (o.toggle = !1), r || i.data("bs.collapse", r = new n(this, o)), "string" == typeof e && r[e]()
        })
    }

    var n = function (e, i) {
        this.$element = t(e), this.options = t.extend({}, n.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle()
    };
    n.VERSION = "3.3.7", n.TRANSITION_DURATION = 350, n.DEFAULTS = {toggle: !0}, n.prototype.dimension = function () {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, n.prototype.show = function () {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, r = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(r && r.length && (e = r.data("bs.collapse"), e && e.transitioning))) {
                var o = t.Event("show.bs.collapse");
                if (this.$element.trigger(o), !o.isDefaultPrevented()) {
                    r && r.length && (i.call(r, "hide"), e || r.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function () {
                        this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                    };
                    if (!t.support.transition) return a.call(this);
                    var l = t.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(a, this)).emulateTransitionEnd(n.TRANSITION_DURATION)[s](this.$element[0][l])
                }
            }
        }
    }, n.prototype.hide = function () {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var r = function () {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(n.TRANSITION_DURATION) : r.call(this)
            }
        }
    }, n.prototype.toggle = function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }, n.prototype.getParent = function () {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function (i, n) {
            var r = t(n);
            this.addAriaAndCollapsedClass(e(r), r)
        }, this)).end()
    }, n.prototype.addAriaAndCollapsedClass = function (t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var r = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = n, t.fn.collapse.noConflict = function () {
        return t.fn.collapse = r, this
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function (n) {
        var r = t(this);
        r.attr("data-target") || n.preventDefault();
        var o = e(r), s = o.data("bs.collapse"), a = s ? "toggle" : r.data();
        i.call(o, a)
    })
}(jQuery), +function (t) {
    "use strict";

    function e(i, n) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), this.process()
    }

    function i(i) {
        return this.each(function () {
            var n = t(this), r = n.data("bs.scrollspy"), o = "object" == typeof i && i;
            r || n.data("bs.scrollspy", r = new e(this, o)), "string" == typeof i && r[i]()
        })
    }

    e.VERSION = "3.3.7", e.DEFAULTS = {offset: 10}, e.prototype.getScrollHeight = function () {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, e.prototype.refresh = function () {
        var e = this, i = "offset", n = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), t.isWindow(this.$scrollElement[0]) || (i = "position", n = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function () {
            var e = t(this), r = e.data("target") || e.attr("href"), o = /^#./.test(r) && t(r);
            return o && o.length && o.is(":visible") && [[o[i]().top + n, r]] || null
        }).sort(function (t, e) {
            return t[0] - e[0]
        }).each(function () {
            e.offsets.push(this[0]), e.targets.push(this[1])
        })
    }, e.prototype.process = function () {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(),
            n = this.options.offset + i - this.$scrollElement.height(), r = this.offsets, o = this.targets,
            s = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= n) return s != (t = o[o.length - 1]) && this.activate(t);
        if (s && e < r[0]) return this.activeTarget = null, this.clear();
        for (t = r.length; t--;) s != o[t] && e >= r[t] && (void 0 === r[t + 1] || e < r[t + 1]) && this.activate(o[t])
    }, e.prototype.activate = function (e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate.bs.scrollspy")
    }, e.prototype.clear = function () {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active")
    };
    var n = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function () {
        return t.fn.scrollspy = n, this
    }, t(window).on("load.bs.scrollspy.data-api", function () {
        t('[data-spy="scroll"]').each(function () {
            var e = t(this);
            i.call(e, e.data())
        })
    })
}(jQuery), +function (t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e) if (void 0 !== t.style[i]) return {end: e[i]};
        return !1
    }

    t.fn.emulateTransitionEnd = function (e) {
        var i = !1, n = this;
        t(this).one("bsTransitionEnd", function () {
            i = !0
        });
        var r = function () {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(r, e), this
    }, t(function () {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function (e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), !function (t, e, i) {
    "object" == typeof module && module && "object" == typeof module.exports ? module.exports = i : (t[e] = i, "function" == typeof define && define.amd && define(e, [], function () {
        return i
    }))
}(this, "jRespond", function (t, e, i) {
    "use strict";
    return function (t) {
        var e = [], n = [], r = t, o = "", s = "", a = 0, l = 100, u = 500, c = u, d = function () {
            var t = 0;
            return t = "number" != typeof window.innerWidth ? 0 !== document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth : window.innerWidth
        }, h = function (t) {
            if (t.length === i) p(t); else for (var e = 0; e < t.length; e++) p(t[e])
        }, p = function (t) {
            var r = t.breakpoint, a = t.enter || i;
            e.push(t), n.push(!1), g(r) && (a !== i && a.call(null, {entering: o, exiting: s}), n[e.length - 1] = !0)
        }, f = function () {
            for (var t = [], r = [], a = 0; a < e.length; a++) {
                var l = e[a].breakpoint, u = e[a].enter || i, c = e[a].exit || i;
                "*" === l ? (u !== i && t.push(u), c !== i && r.push(c)) : g(l) ? (u === i || n[a] || t.push(u), n[a] = !0) : (c !== i && n[a] && r.push(c), n[a] = !1)
            }
            for (var d = {entering: o, exiting: s}, h = 0; h < r.length; h++) r[h].call(null, d);
            for (var p = 0; p < t.length; p++) t[p].call(null, d)
        }, m = function (t) {
            for (var e = !1, i = 0; i < r.length; i++) if (t >= r[i].enter && t <= r[i].exit) {
                e = !0;
                break
            }
            e && o !== r[i].label ? (s = o, o = r[i].label, f()) : e || "" === o || (o = "", f())
        }, g = function (t) {
            if ("object" == typeof t) {
                if (t.join().indexOf(o) >= 0) return !0
            } else {
                if ("*" === t) return !0;
                if ("string" == typeof t && o === t) return !0
            }
        }, y = function () {
            var t = d();
            t !== a ? (c = l, m(t)) : c = u, a = t, setTimeout(y, c)
        };
        return y(), {
            addFunc: function (t) {
                h(t)
            }, getBreakpoint: function () {
                return o
            }
        }
    }
}(this, this.document)), function (t) {
    t.fn.appear = function (e, i) {
        var n = t.extend({data: void 0, one: !0, accX: 0, accY: 0}, i);
        return this.each(function () {
            var i = t(this);
            if (i.appeared = !1, !e) return void i.trigger("appear", n.data);
            var r = t(window), o = function () {
                if (!i.is(":visible")) return void(i.appeared = !1);
                var t = r.scrollLeft(), e = r.scrollTop(), o = i.offset(), s = o.left, a = o.top, l = n.accX,
                    u = n.accY, c = i.height(), d = r.height(), h = i.width(), p = r.width();
                a + c + u >= e && e + d + u >= a && s + h + l >= t && t + p + l >= s ? i.appeared || i.trigger("appear", n.data) : i.appeared = !1
            }, s = function () {
                if (i.appeared = !0, n.one) {
                    r.unbind("scroll", o);
                    var s = t.inArray(o, t.fn.appear.checks);
                    s >= 0 && t.fn.appear.checks.splice(s, 1)
                }
                e.apply(this, arguments)
            };
            n.one ? i.one("appear", n.data, s) : i.bind("appear", n.data, s), r.scroll(o), t.fn.appear.checks.push(o), o()
        })
    }, t.extend(t.fn.appear, {
        checks: [], timeout: null, checkAll: function () {
            var e = t.fn.appear.checks.length;
            if (e > 0) for (; e--;) t.fn.appear.checks[e]()
        }, run: function () {
            t.fn.appear.timeout && clearTimeout(t.fn.appear.timeout), t.fn.appear.timeout = setTimeout(t.fn.appear.checkAll, 20)
        }
    }), t.each(["append", "prepend", "after", "before", "attr", "removeAttr", "addClass", "removeClass", "toggleClass", "remove", "css", "show", "hide"], function (e, i) {
        var n = t.fn[i];
        n && (t.fn[i] = function () {
            var e = n.apply(this, arguments);
            return t.fn.appear.run(), e
        })
    })
}(jQuery), !function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, o, a) {
        function l(t, e, n) {
            var r, o = "$()." + i + '("' + e + '")';
            return t.each(function (t, l) {
                var u = a.data(l, i);
                if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + o);
                var c = u[e];
                if (!c || "_" == e.charAt(0)) return void s(o + " is not a valid method");
                var d = c.apply(u, n);
                r = void 0 === r ? d : r
            }), void 0 !== r ? r : t
        }

        function u(t, e) {
            t.each(function (t, n) {
                var r = a.data(n, i);
                r ? (r.option(e), r._init()) : (r = new o(n, e), a.data(n, i, r))
            })
        }

        a = a || e || t.jQuery, a && (o.prototype.option || (o.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = r.call(arguments, 1);
                return l(this, t, e)
            }
            return u(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }

    var r = Array.prototype.slice, o = t.console, s = "undefined" == typeof o ? function () {
    } : function (t) {
        o.error(t)
    };
    return n(e || t.jQuery), i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {
    }

    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {}, n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {}, n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = 0, r = i[n];
            e = e || [];
            for (var o = this._onceEvents && this._onceEvents[t]; r;) {
                var s = o && o[r];
                s && (this.off(t, r), delete o[r]), r.apply(this, e), n += s ? 0 : 1, r = i[n]
            }
            return this
        }
    }, t
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function () {
        return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t), i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0; u > e; e++) {
            var i = l[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }

    function r() {
        if (!c) {
            c = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var r = n(e);
            o.isBoxSizeOuter = s = 200 == t(r.width), i.removeChild(e)
        }
    }

    function o(e) {
        if (r(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var o = n(e);
            if ("none" == o.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var c = a.isBorderBox = "border-box" == o.boxSizing, d = 0; u > d; d++) {
                var h = l[d], p = o[h], f = parseFloat(p);
                a[h] = isNaN(f) ? 0 : f
            }
            var m = a.paddingLeft + a.paddingRight, g = a.paddingTop + a.paddingBottom,
                y = a.marginLeft + a.marginRight, v = a.marginTop + a.marginBottom,
                b = a.borderLeftWidth + a.borderRightWidth, T = a.borderTopWidth + a.borderBottomWidth, w = c && s,
                P = t(o.width);
            P !== !1 && (a.width = P + (w ? 0 : m + b));
            var x = t(o.height);
            return x !== !1 && (a.height = x + (w ? 0 : g + T)), a.innerWidth = a.width - (m + b), a.innerHeight = a.height - (g + T), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
        }
    }

    var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = l.length, c = !1;
    return o
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i], r = n + "MatchesSelector";
            if (t[r]) return r
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}), function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    }, i.makeArray = function (t) {
        var e = [];
        if (Array.isArray(t)) e = t; else if (t && "object" == typeof t && "number" == typeof t.length) for (var i = 0; i < t.length; i++) e.push(t[i]); else e.push(t);
        return e
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var r = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void r.push(t);
                e(t, n) && r.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++) r.push(i[o])
            }
        }), r
    }, i.debounceMethod = function (t, e, i) {
        var n = t.prototype[e], r = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[r];
            t && clearTimeout(t);
            var e = arguments, o = this;
            this[r] = setTimeout(function () {
                n.apply(o, e), delete o[r]
            }, i || 100)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function (e, r) {
        i.docReady(function () {
            var o = i.toDashed(r), s = "data-" + o, a = document.querySelectorAll("[" + s + "]"),
                l = document.querySelectorAll(".js-" + o), u = i.makeArray(a).concat(i.makeArray(l)),
                c = s + "-options", d = t.jQuery;
            u.forEach(function (t) {
                var i, o = t.getAttribute(s) || t.getAttribute(c);
                try {
                    i = o && JSON.parse(o)
                } catch (a) {
                    return void(n && n.error("Error parsing " + s + " on " + t.className + ": " + a))
                }
                var l = new e(t, i);
                d && d.data(t, r, l)
            })
        })
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
    }

    function r(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }

    var o = document.documentElement.style, s = "string" == typeof o.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof o.transform ? "transform" : "WebkitTransform",
        l = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[s], u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        }, c = n.prototype = Object.create(t.prototype);
    c.constructor = n, c._create = function () {
        this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
    }, c.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, c.getSize = function () {
        this.size = e(this.element)
    }, c.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var n = u[i] || i;
            e[n] = t[i]
        }
    }, c.getPosition = function () {
        var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], r = t[i ? "top" : "bottom"],
            o = this.layout.size, s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * o.width : parseInt(n, 10),
            a = -1 != r.indexOf("%") ? parseFloat(r) / 100 * o.height : parseInt(r, 10);
        s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? o.paddingLeft : o.paddingRight, a -= i ? o.paddingTop : o.paddingBottom, this.position.x = s, this.position.y = a
    }, c.layoutPosition = function () {
        var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"), r = i ? "paddingLeft" : "paddingRight", o = i ? "left" : "right",
            s = i ? "right" : "left", a = this.position.x + t[r];
        e[o] = this.getXValue(a), e[s] = "";
        var l = n ? "paddingTop" : "paddingBottom", u = n ? "top" : "bottom", c = n ? "bottom" : "top",
            d = this.position.y + t[l];
        e[u] = this.getYValue(d), e[c] = "", this.css(e), this.emitEvent("layout", [this])
    }, c.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, c.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, c._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x, n = this.position.y, r = parseInt(t, 10), o = parseInt(e, 10),
            s = r === this.position.x && o === this.position.y;
        if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
        var a = t - i, l = e - n, u = {};
        u.transform = this.getTranslate(a, l), this.transition({
            to: u,
            onTransitionEnd: {transform: this.layoutPosition},
            isCleaning: !0
        })
    }, c.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, c.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, c.moveTo = c._transitionTo, c.setPosition = function (t, e) {
        this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, c._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, c.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var d = "opacity," + r(a);
    c.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: d,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(l, this, !1)
        }
    }, c.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, c.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var h = {"-webkit-transform": "transform"};
    c.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn, n = h[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var r = e.onEnd[n];
                r.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, c.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(l, this, !1), this.isTransitioning = !1
    }, c._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var p = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
    return c.removeTransitionStyles = function () {
        this.css(p)
    }, c.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, c.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
    }, c.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, c.reveal = function () {
        delete this.isHidden, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, c.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, c.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, c.hide = function () {
        this.isHidden = !0, this.css({display: ""});
        var t = this.layout.options, e = {}, i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, c.onHideTransitionEnd = function () {
        this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
    }, c.destroy = function () {
        this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
    }, n
}), function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, r, o) {
        return e(t, i, n, r, o)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, r) {
    "use strict";

    function o(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var r = ++d;
        this.element.outlayerGUID = r, h[r] = this, this._create();
        var o = this._getOption("initLayout");
        o && this.layout()
    }

    function s(t) {
        function e() {
            t.apply(this, arguments)
        }

        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var r = f[n] || 1;
        return i * r
    }

    var l = t.console, u = t.jQuery, c = function () {
    }, d = 0, h = {};
    o.namespace = "outlayer", o.Item = r, o.defaults = {
        containerStyle: {position: "relative"},
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
        visibleStyle: {opacity: 1, transform: "scale(1)"}
    };
    var p = o.prototype;
    n.extend(p, e.prototype), p.option = function (t) {
        n.extend(this.options, t)
    }, p._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, o.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, p._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, p.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, p._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], r = 0; r < e.length; r++) {
            var o = e[r], s = new i(o, this);
            n.push(s)
        }
        return n
    }, p._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, p.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, p.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, p._init = p.layout, p._resetLayout = function () {
        this.getSize()
    }, p.getSize = function () {
        this.size = i(this.element)
    }, p._getMeasurement = function (t, e) {
        var n, r = this.options[t];
        r ? ("string" == typeof r ? n = this.element.querySelector(r) : r instanceof HTMLElement && (n = r), this[t] = n ? i(n)[e] : r) : this[t] = 0
    }, p.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, p._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, p._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, p._getItemLayoutPosition = function () {
        return {x: 0, y: 0}
    }, p._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, p.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, p._positionItem = function (t, e, i, n, r) {
        n ? t.goTo(e, i) : (t.stagger(r * this.stagger), t.moveTo(e, i))
    }, p._postLayout = function () {
        this.resizeContainer()
    }, p.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, p._getContainerSize = c, p._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, p._emitCompleteOnItems = function (t, e) {
        function i() {
            r.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            s++, s == o && i()
        }

        var r = this, o = e.length;
        if (!e || !o) return void i();
        var s = 0;
        e.forEach(function (e) {
            e.once(t, n)
        })
    }, p.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u) if (this.$element = this.$element || u(this.element), e) {
            var r = u.Event(e);
            r.type = t, this.$element.trigger(r, i)
        } else this.$element.trigger(t, i)
    }, p.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, p.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, p.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, p.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, p._find = function (t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, p._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, p._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(), e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, p._manageStamp = c, p._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(), n = this._boundingRect, r = i(t), o = {
            left: e.left - n.left - r.marginLeft,
            top: e.top - n.top - r.marginTop,
            right: n.right - e.right - r.marginRight,
            bottom: n.bottom - e.bottom - r.marginBottom
        };
        return o
    }, p.handleEvent = n.handleEvent, p.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, p.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, p.onresize = function () {
        this.resize()
    }, n.debounceMethod(o, "onresize", 100), p.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, p.needsResizeLayout = function () {
        var t = i(this.element), e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, p.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, p.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, p.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, p.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, p.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, p.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, p.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, p.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, p.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, p.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, p.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete h[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, o.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && h[e]
    }, o.create = function (t, e) {
        var i = s(o);
        return i.defaults = n.extend({}, o.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, o.compatOptions), i.namespace = t, i.data = o.data, i.Item = s(r), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var f = {ms: 1, s: 1e3};
    return o.Item = r, o
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function (t) {
    "use strict";

    function e() {
        t.Item.apply(this, arguments)
    }

    var i = e.prototype = Object.create(t.Item.prototype), n = i._create;
    i._create = function () {
        this.id = this.layout.itemGUID++, n.call(this), this.sortData = {}
    }, i.updateSortData = function () {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var t = this.layout.options.getSortData, e = this.layout._sorters;
            for (var i in t) {
                var n = e[i];
                this.sortData[i] = n(this.element, this)
            }
        }
    };
    var r = i.destroy;
    return i.destroy = function () {
        r.apply(this, arguments), this.css({display: ""})
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
    }

    var n = i.prototype,
        r = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
    return r.forEach(function (t) {
        n[t] = function () {
            return e.prototype[t].apply(this.isotope, arguments)
        }
    }), n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element), i = this.isotope.size && e;
        return i && e.innerHeight != this.isotope.size.innerHeight
    }, n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments)
    }, n.getColumnWidth = function () {
        this.getSegmentSize("column", "Width")
    }, n.getRowHeight = function () {
        this.getSegmentSize("row", "Height")
    }, n.getSegmentSize = function (t, e) {
        var i = t + e, n = "outer" + e;
        if (this._getMeasurement(i, n), !this[i]) {
            var r = this.getFirstItemSize();
            this[i] = r && r[n] || this.isotope.size["inner" + e]
        }
    }, n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element)
    }, n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments)
    }, n.getSize = function () {
        this.isotope.getSize(), this.size = this.isotope.size
    }, i.modes = {}, i.create = function (t, e) {
        function r() {
            i.apply(this, arguments)
        }

        return r.prototype = Object.create(n), r.prototype.constructor = r, e && (r.options = e), r.prototype.namespace = t, i.modes[t] = r, r
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0], i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter, r = this.containerWidth + this.gutter, o = r / n, s = n - r % n,
            a = s && 1 > s ? "round" : "floor";
        o = Math[a](o), this.cols = Math.max(o, 1)
    }, n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
        this.containerWidth = n && n.innerWidth
    }, n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var r = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", o = this[r](n, t), s = {
            x: this.columnWidth * o.col,
            y: o.y
        }, a = o.y + t.size.outerHeight, l = n + o.col, u = o.col; l > u; u++) this.colYs[u] = a;
        return s
    }, n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
        return {col: e.indexOf(i), y: i}
    }, n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
        return e
    }, n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols, n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var r = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = r ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
    }, n._manageStamp = function (t) {
        var i = e(t), n = this._getElementOffset(t), r = this._getOption("originLeft"), o = r ? n.left : n.right,
            s = o + i.outerWidth, a = Math.floor(o / this.columnWidth);
        a = Math.max(0, a);
        var l = Math.floor(s / this.columnWidth);
        l -= s % this.columnWidth ? 0 : 1, l = Math.min(this.cols - 1, l);
        for (var u = this._getOption("originTop"), c = (u ? n.top : n.bottom) + i.outerHeight, d = a; l >= d; d++) this.colYs[d] = Math.max(c, this.colYs[d])
    }, n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {height: this.maxY};
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"), n = i.prototype, r = {_getElementOffset: !0, layout: !0, _getMeasurement: !0};
    for (var o in e.prototype) r[o] || (n[o] = e.prototype[o]);
    var s = n.measureColumns;
    n.measureColumns = function () {
        this.items = this.isotope.filteredItems, s.call(this)
    };
    var a = n._getOption;
    return n._getOption = function (t) {
        return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
    }, i
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("fitRows"), i = e.prototype;
    return i._resetLayout = function () {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter, i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
        var n = {x: this.x, y: this.y};
        return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, n
    }, i._getContainerSize = function () {
        return {height: this.maxY}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function (t) {
    "use strict";
    var e = t.create("vertical", {horizontalAlignment: 0}), i = e.prototype;
    return i._resetLayout = function () {
        this.y = 0
    }, i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment, i = this.y;
        return this.y += t.size.outerHeight, {x: e, y: i}
    }, i._getContainerSize = function () {
        return {height: this.y}
    }, e
}), function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function (i, n, r, o, s, a) {
        return e(t, i, n, r, o, s, a)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope/js/item"), require("isotope/js/layout-mode"), require("isotope/js/layout-modes/masonry"), require("isotope/js/layout-modes/fit-rows"), require("isotope/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function (t, e, i, n, r, o, s) {
    function a(t, e) {
        return function (i, n) {
            for (var r = 0; r < t.length; r++) {
                var o = t[r], s = i.sortData[o], a = n.sortData[o];
                if (s > a || a > s) {
                    var l = void 0 !== e[o] ? e[o] : e, u = l ? 1 : -1;
                    return (s > a ? 1 : -1) * u
                }
            }
            return 0
        }
    }

    var l = t.jQuery, u = String.prototype.trim ? function (t) {
        return t.trim()
    } : function (t) {
        return t.replace(/^\s+|\s+$/g, "")
    }, c = e.create("isotope", {layoutMode: "masonry", isJQueryFiltering: !0, sortAscending: !0});
    c.Item = o, c.LayoutMode = s;
    var d = c.prototype;
    d._create = function () {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
        for (var t in s.modes) this._initLayoutMode(t)
    }, d.reloadItems = function () {
        this.itemGUID = 0, e.prototype.reloadItems.call(this)
    }, d._itemize = function () {
        for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
            var n = t[i];
            n.id = this.itemGUID++
        }
        return this._updateItemsSortData(t), t
    }, d._initLayoutMode = function (t) {
        var e = s.modes[t], i = this.options[t] || {};
        this.options[t] = e.options ? r.extend(e.options, i) : i, this.modes[t] = new e(this)
    }, d.layout = function () {
        return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
    }, d._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
    }, d.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
    }, d._init = d.arrange, d._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide)
    }, d._getIsInstant = function () {
        var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
        return this._isInstant = e, e
    }, d._bindArrangeComplete = function () {
        function t() {
            e && i && n && r.dispatchEvent("arrangeComplete", null, [r.filteredItems])
        }

        var e, i, n, r = this;
        this.once("layoutComplete", function () {
            e = !0, t()
        }), this.once("hideComplete", function () {
            i = !0, t()
        }), this.once("revealComplete", function () {
            n = !0, t()
        })
    }, d._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (var i = [], n = [], r = [], o = this._getFilterTest(e), s = 0; s < t.length; s++) {
            var a = t[s];
            if (!a.isIgnored) {
                var l = o(a);
                l && i.push(a), l && a.isHidden ? n.push(a) : l || a.isHidden || r.push(a)
            }
        }
        return {matches: i, needReveal: n, needHide: r}
    }, d._getFilterTest = function (t) {
        return l && this.options.isJQueryFiltering ? function (e) {
            return l(e.element).is(t)
        } : "function" == typeof t ? function (e) {
            return t(e.element)
        } : function (e) {
            return n(e.element, t)
        }
    }, d.updateSortData = function (t) {
        var e;
        t ? (t = r.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
    }, d._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
            var i = t[e];
            this._sorters[e] = h(i)
        }
    }, d._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && e > i; i++) {
            var n = t[i];
            n.updateSortData()
        }
    };
    var h = function () {
        function t(t) {
            if ("string" != typeof t) return t;
            var i = u(t).split(" "), n = i[0], r = n.match(/^\[(.+)\]$/), o = r && r[1], s = e(o, n),
                a = c.sortDataParsers[i[1]];
            return t = a ? function (t) {
                return t && a(s(t))
            } : function (t) {
                return t && s(t)
            }
        }

        function e(t, e) {
            return t ? function (e) {
                return e.getAttribute(t)
            } : function (t) {
                var i = t.querySelector(e);
                return i && i.textContent
            }
        }

        return t
    }();
    c.sortDataParsers = {
        parseInt: function (t) {
            return parseInt(t, 10)
        }, parseFloat: function (t) {
            return parseFloat(t)
        }
    }, d._sort = function () {
        if (this.options.sortBy) {
            var t = r.makeArray(this.options.sortBy);
            this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
            var e = a(this.sortHistory, this.options.sortAscending);
            this.filteredItems.sort(e)
        }
    }, d._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++) if (t[e] != this.sortHistory[e]) return !1;
        return !0
    }, d._mode = function () {
        var t = this.options.layoutMode, e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return e.options = this.options[t], e
    }, d._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout()
    }, d._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t)
    }, d._manageStamp = function (t) {
        this._mode()._manageStamp(t)
    }, d._getContainerSize = function () {
        return this._mode()._getContainerSize()
    }, d.needsResizeLayout = function () {
        return this._mode().needsResizeLayout()
    }, d.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(i)
        }
    }, d.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            this._resetLayout(), this._manageStamps();
            var i = this._filterRevealAdded(e);
            this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
        }
    }, d._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
    }, d.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
            var i, n, r = e.length;
            for (i = 0; r > i; i++) n = e[i], this.element.appendChild(n.element);
            var o = this._filter(e).matches;
            for (i = 0; r > i; i++) e[i].isLayoutInstant = !0;
            for (this.arrange(), i = 0; r > i; i++) delete e[i].isLayoutInstant;
            this.reveal(o)
        }
    };
    var p = d.remove;
    return d.remove = function (t) {
        t = r.makeArray(t);
        var e = this.getItems(t);
        p.call(this, t);
        for (var i = e && e.length, n = 0; i && i > n; n++) {
            var o = e[n];
            r.removeFrom(this.filteredItems, o)
        }
    }, d.shuffle = function () {
        for (var t = 0; t < this.items.length; t++) {
            var e = this.items[t];
            e.sortData.random = Math.random()
        }
        this.options.sortBy = "random", this._sort(), this._layout()
    }, d._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return this.options.transitionDuration = i, n
    }, d.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
            return t.element
        })
    }, c
}), !function (t, e, i, n) {
    function r(e, i) {
        this.settings = null, this.options = t.extend({}, r.Defaults, i), this.$element = t(e), this.drag = t.extend({}, h), this.state = t.extend({}, p), this.e = t.extend({}, f), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], t.each(r.Plugins, t.proxy(function (t, e) {
            this._plugins[t[0].toLowerCase() + t.slice(1)] = new e(this)
        }, this)), t.each(r.Pipe, t.proxy(function (e, i) {
            this._pipe.push({filter: i.filter, run: t.proxy(i.run, this)})
        }, this)), this.setup(), this.initialize()
    }

    function o(t) {
        if (t.touches !== n) return {x: t.touches[0].pageX, y: t.touches[0].pageY};
        if (t.touches === n) {
            if (t.pageX !== n) return {x: t.pageX, y: t.pageY};
            if (t.pageX === n) return {x: t.clientX, y: t.clientY}
        }
    }

    function s(t) {
        var e, n, r = i.createElement("div"), o = t;
        for (e in o) if (n = o[e], "undefined" != typeof r.style[n]) return r = null, [n, e];
        return [!1]
    }

    function a() {
        return s(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }

    function l() {
        return s(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }

    function u() {
        return s(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }

    function c() {
        return "ontouchstart" in e || !!navigator.msMaxTouchPoints
    }

    function d() {
        return e.navigator.msPointerEnabled
    }

    var h, p, f;
    h = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    }, p = {isTouch: !1, isScrolling: !1, isSwiping: !1, direction: !1, inMotion: !1}, f = {
        _onDragStart: null,
        _onDragMove: null,
        _onDragEnd: null,
        _transitionEnd: null,
        _resizer: null,
        _responsiveCall: null,
        _goToLoop: null,
        _checkVisibile: null
    }, r.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    }, r.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    }, r.Plugins = {}, r.Pipe = [{
        filter: ["width", "items", "settings"], run: function (t) {
            t.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var t = this._clones, e = this.$stage.children(".cloned");
            (e.length !== t.length || !this.settings.loop && t.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var t, e, i = this._clones, n = this._items,
                r = this.settings.loop ? i.length - Math.max(2 * this.settings.items, 4) : 0;
            for (t = 0, e = Math.abs(r / 2); e > t; t++) r > 0 ? (this.$stage.children().eq(n.length + i.length - 1).remove(), i.pop(), this.$stage.children().eq(0).remove(), i.pop()) : (i.push(i.length / 2), this.$stage.append(n[i[i.length - 1]].clone().addClass("cloned")), i.push(n.length - 1 - (i.length - 1) / 2), this.$stage.prepend(n[i[i.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var t, e, i, n = this.settings.rtl ? 1 : -1, r = (this.width() / this.settings.items).toFixed(3), o = 0;
            for (this._coordinates = [], e = 0, i = this._clones.length + this._items.length; i > e; e++) t = this._mergers[this.relative(e)], t = this.settings.mergeFit && Math.min(t, this.settings.items) || t, o += (this.settings.autoWidth ? this._items[this.relative(e)].width() + this.settings.margin : r * t) * n, this._coordinates.push(o)
        }
    }, {
        filter: ["width", "items", "settings"], run: function () {
            var e, i, n = (this.width() / this.settings.items).toFixed(3), r = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            if (this.$stage.css(r), r = {width: this.settings.autoWidth ? "auto" : n - this.settings.margin}, r[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && t.grep(this._mergers, function (t) {
                    return t > 1
                }).length > 0) for (e = 0, i = this._coordinates.length; i > e; e++) r.width = Math.abs(this._coordinates[e]) - Math.abs(this._coordinates[e - 1] || 0) - this.settings.margin, this.$stage.children().eq(e).css(r); else this.$stage.children().css(r)
        }
    }, {
        filter: ["width", "items", "settings"], run: function (t) {
            t.current && this.reset(this.$stage.children().index(t.current))
        }
    }, {
        filter: ["position"], run: function () {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"], run: function () {
            var t, e, i, n, r = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding,
                s = this.coordinates(this.current()) + o, a = s + this.width() * r, l = [];
            for (i = 0, n = this._coordinates.length; n > i; i++) t = this._coordinates[i - 1] || 0, e = Math.abs(this._coordinates[i]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && l.push(i);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }], r.prototype.initialize = function () {
        if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
            var e, i, r;
            if (e = this.$element.find("img"), i = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : n, r = this.$element.children(i).width(), e.length && 0 >= r) return this.preloadAutoWidthImages(e), !1
        }
        this.$element.addClass("owl-loading"), this.$stage = t("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, r.prototype.setup = function () {
        var e = this.viewport(), i = this.options.responsive, n = -1, r = null;
        i ? (t.each(i, function (t) {
            e >= t && t > n && (n = Number(t))
        }), r = t.extend({}, this.options, i[n]), delete r.responsive, r.responsiveClass && this.$element.attr("class", function (t, e) {
            return e.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + n)) : r = t.extend({}, this.options), (null === this.settings || this._breakpoint !== n) && (this.trigger("change", {
            property: {
                name: "settings",
                value: r
            }
        }), this._breakpoint = n, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
            property: {
                name: "settings",
                value: this.settings
            }
        }))
    }, r.prototype.optionsLogic = function () {
        this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, r.prototype.prepare = function (e) {
        var i = this.trigger("prepare", {content: e});
        return i.data || (i.data = t("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(e)), this.trigger("prepared", {content: i.data}), i.data
    }, r.prototype.update = function () {
        for (var e = 0, i = this._pipe.length, n = t.proxy(function (t) {
            return this[t]
        }, this._invalidated), r = {}; i > e;) (this._invalidated.all || t.grep(this._pipe[e].filter, n).length > 0) && this._pipe[e].run(r), e++;
        this._invalidated = {}
    }, r.prototype.width = function (t) {
        switch (t = t || r.Width.Default) {
            case r.Width.Inner:
            case r.Width.Outer:
                return this._width;
            default:
                return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }, r.prototype.refresh = function () {
        return 0 === this._items.length ? !1 : ((new Date).getTime(), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = e.orientation, this.watchVisibility(), this.trigger("refreshed"), void 0)
    }, r.prototype.eventsCall = function () {
        this.e._onDragStart = t.proxy(function (t) {
            this.onDragStart(t)
        }, this), this.e._onDragMove = t.proxy(function (t) {
            this.onDragMove(t)
        }, this), this.e._onDragEnd = t.proxy(function (t) {
            this.onDragEnd(t)
        }, this), this.e._onResize = t.proxy(function (t) {
            this.onResize(t)
        }, this), this.e._transitionEnd = t.proxy(function (t) {
            this.transitionEnd(t)
        }, this), this.e._preventClick = t.proxy(function (t) {
            this.preventClick(t)
        }, this)
    }, r.prototype.onThrottledResize = function () {
        e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, r.prototype.onResize = function () {
        return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, r.prototype.eventsRouter = function (t) {
        var e = t.type;
        "mousedown" === e || "touchstart" === e ? this.onDragStart(t) : "mousemove" === e || "touchmove" === e ? this.onDragMove(t) : "mouseup" === e || "touchend" === e ? this.onDragEnd(t) : "touchcancel" === e && this.onDragEnd(t)
    }, r.prototype.internalEvents = function () {
        var i = (c(), d());
        this.settings.mouseDrag ? (this.$stage.on("mousedown", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this)), this.$stage.on("dragstart", function () {
            return !1
        }), this.$stage.get(0).onselectstart = function () {
            return !1
        }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !i && this.$stage.on("touchstart touchcancel", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(e, "resize", t.proxy(this.onThrottledResize, this))
    }, r.prototype.onDragStart = function (n) {
        var r, s, a, l;
        if (r = n.originalEvent || n || e.event, 3 === r.which || this.state.isTouch) return !1;
        if ("mousedown" === r.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, s = o(r).x, a = o(r).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) l = this.getTransformProperty(), this.drag.offsetX = l, this.animate(l), this.state.inMotion = !0; else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
        this.drag.startX = s - this.drag.offsetX, this.drag.startY = a - this.drag.offsetY, this.drag.start = s - this.drag.startX, this.drag.targetEl = r.target || r.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), t(i).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", t.proxy(function (t) {
            this.eventsRouter(t)
        }, this))
    }, r.prototype.onDragMove = function (t) {
        var i, r, s, a, l, u;
        this.state.isTouch && (this.state.isScrolling || (i = t.originalEvent || t || e.event, r = o(i).x, s = o(i).y, this.drag.currentX = r - this.drag.startX, this.drag.currentY = s - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (a = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), l = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), u = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, a + u), l + u)), (this.drag.distance > 8 || this.drag.distance < -8) && (i.preventDefault !== n ? i.preventDefault() : i.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, r.prototype.onDragEnd = function (e) {
        var n, r, o;
        if (this.state.isTouch) {
            if ("mouseup" === e.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
            this.drag.endTime = (new Date).getTime(), n = this.drag.endTime - this.drag.startTime, r = Math.abs(this.drag.distance), (r > 3 || n > 300) && this.removeClick(this.drag.targetEl), o = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(o), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(o) || this.transitionEnd(), this.drag.distance = 0, t(i).off(".owl.dragEvents")
        }
    }, r.prototype.removeClick = function (i) {
        this.drag.targetEl = i, t(i).on("click.preventClick", this.e._preventClick), e.setTimeout(function () {
            t(i).off("click.preventClick")
        }, 300)
    }, r.prototype.preventClick = function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.stopPropagation && e.stopPropagation(), t(e.target).off("click.preventClick")
    }, r.prototype.getTransformProperty = function () {
        var t, i;
        return t = e.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), t = t.replace(/matrix(3d)?\(|\)/g, "").split(","), i = 16 === t.length, i !== !0 ? t[4] : t[12]
    }, r.prototype.closest = function (e) {
        var i = -1, n = 30, r = this.width(), o = this.coordinates();
        return this.settings.freeDrag || t.each(o, t.proxy(function (t, s) {
            return e > s - n && s + n > e ? i = t : this.op(e, "<", s) && this.op(e, ">", o[t + 1] || s - r) && (i = "left" === this.state.direction ? t + 1 : t), -1 === i
        }, this)), this.settings.loop || (this.op(e, ">", o[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", o[this.maximum()]) && (i = e = this.maximum())), i
    }, r.prototype.animate = function (e) {
        this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
            transform: "translate3d(" + e + "px,0px, 0px)",
            transition: this.speed() / 1e3 + "s"
        }) : this.state.isTouch ? this.$stage.css({left: e + "px"}) : this.$stage.animate({left: e}, this.speed() / 1e3, this.settings.fallbackEasing, t.proxy(function () {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }, r.prototype.current = function (t) {
        if (t === n) return this._current;
        if (0 === this._items.length) return n;
        if (t = this.normalize(t), this._current !== t) {
            var e = this.trigger("change", {property: {name: "position", value: t}});
            e.data !== n && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }, r.prototype.invalidate = function (t) {
        this._invalidated[t] = !0
    }, r.prototype.reset = function (t) {
        t = this.normalize(t), t !== n && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, r.prototype.normalize = function (e, i) {
        var r = i ? this._items.length : this._items.length + this._clones.length;
        return !t.isNumeric(e) || 1 > r ? n : e = this._clones.length ? (e % r + r) % r : Math.max(this.minimum(i), Math.min(this.maximum(i), e))
    }, r.prototype.relative = function (t) {
        return t = this.normalize(t), t -= this._clones.length / 2, this.normalize(t, !0)
    }, r.prototype.maximum = function (t) {
        var e, i, n, r = 0, o = this.settings;
        if (t) return this._items.length - 1;
        if (!o.loop && o.center) e = this._items.length - 1; else if (o.loop || o.center) if (o.loop || o.center) e = this._items.length + o.items; else {
            if (!o.autoWidth && !o.merge) throw"Can not detect maximum absolute position.";
            for (revert = o.rtl ? 1 : -1, i = this.$stage.width() - this.$element.width(); (n = this.coordinates(r)) && !(n * revert >= i);) e = ++r
        } else e = this._items.length - o.items;
        return e
    }, r.prototype.minimum = function (t) {
        return t ? 0 : this._clones.length / 2
    }, r.prototype.items = function (t) {
        return t === n ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
    }, r.prototype.mergers = function (t) {
        return t === n ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
    }, r.prototype.clones = function (e) {
        var i = this._clones.length / 2, r = i + this._items.length, o = function (t) {
            return t % 2 === 0 ? r + t / 2 : i - (t + 1) / 2
        };
        return e === n ? t.map(this._clones, function (t, e) {
            return o(e)
        }) : t.map(this._clones, function (t, i) {
            return t === e ? o(i) : null
        })
    }, r.prototype.speed = function (t) {
        return t !== n && (this._speed = t), this._speed
    }, r.prototype.coordinates = function (e) {
        var i = null;
        return e === n ? t.map(this._coordinates, t.proxy(function (t, e) {
            return this.coordinates(e)
        }, this)) : (this.settings.center ? (i = this._coordinates[e], i += (this.width() - i + (this._coordinates[e - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : i = this._coordinates[e - 1] || 0, i)
    }, r.prototype.duration = function (t, e, i) {
        return Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(i || this.settings.smartSpeed)
    }, r.prototype.to = function (i, n) {
        if (this.settings.loop) {
            var r = i - this.relative(this.current()), o = this.current(), s = this.current(), a = this.current() + r,
                l = 0 > s - a, u = this._clones.length + this._items.length;
            a < this.settings.items && l === !1 ? (o = s + this._items.length, this.reset(o)) : a >= u - this.settings.items && l === !0 && (o = s - this._items.length, this.reset(o)), e.clearTimeout(this.e._goToLoop), this.e._goToLoop = e.setTimeout(t.proxy(function () {
                this.speed(this.duration(this.current(), o + r, n)), this.current(o + r), this.update()
            }, this), 30)
        } else this.speed(this.duration(this.current(), i, n)), this.current(i), this.update()
    }, r.prototype.next = function (t) {
        t = t || !1, this.to(this.relative(this.current()) + 1, t)
    }, r.prototype.prev = function (t) {
        t = t || !1, this.to(this.relative(this.current()) - 1, t)
    }, r.prototype.transitionEnd = function (t) {
        return t !== n && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, r.prototype.viewport = function () {
        var n;
        if (this.options.responsiveBaseElement !== e) n = t(this.options.responsiveBaseElement).width(); else if (e.innerWidth) n = e.innerWidth; else {
            if (!i.documentElement || !i.documentElement.clientWidth) throw"Can not detect viewport width.";
            n = i.documentElement.clientWidth
        }
        return n
    }, r.prototype.replace = function (e) {
        this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
            return 1 === this.nodeType
        }).each(t.proxy(function (t, e) {
            e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this)), this.reset(t.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, r.prototype.add = function (t, e) {
        e = e === n ? this._items.length : this.normalize(e, !0), this.trigger("add", {
            content: t,
            position: e
        }), 0 === this._items.length || e === this._items.length ? (this.$stage.append(t), this._items.push(t), this._mergers.push(1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[e].before(t), this._items.splice(e, 0, t), this._mergers.splice(e, 0, 1 * t.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
            content: t,
            position: e
        })
    }, r.prototype.remove = function (t) {
        t = this.normalize(t, !0), t !== n && (this.trigger("remove", {
            content: this._items[t],
            position: t
        }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
            content: null,
            position: t
        }))
    }, r.prototype.addTriggerableEvents = function () {
        var e = t.proxy(function (e, i) {
            return t.proxy(function (t) {
                t.relatedTarget !== this && (this.suppress([i]), e.apply(this, [].slice.call(arguments, 1)), this.release([i]))
            }, this)
        }, this);
        t.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, t.proxy(function (t, i) {
            this.$element.on(t + ".owl.carousel", e(i, t + ".owl.carousel"))
        }, this))
    }, r.prototype.watchVisibility = function () {
        function i(t) {
            return t.offsetWidth > 0 && t.offsetHeight > 0
        }

        function n() {
            i(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), e.clearInterval(this.e._checkVisibile))
        }

        i(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), e.clearInterval(this.e._checkVisibile), this.e._checkVisibile = e.setInterval(t.proxy(n, this), 500))
    }, r.prototype.preloadAutoWidthImages = function (e) {
        var i, n, r, o;
        i = 0, n = this, e.each(function (s, a) {
            r = t(a), o = new Image, o.onload = function () {
                i++, r.attr("src", o.src), r.css("opacity", 1), i >= e.length && (n.state.imagesLoaded = !0, n.initialize())
            }, o.src = r.attr("src") || r.attr("data-src") || r.attr("data-src-retina")
        })
    }, r.prototype.destroy = function () {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && t(e).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var n in this._plugins) this._plugins[n].destroy();
        (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), t(i).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function () {
        }, this.$stage.off("dragstart", function () {
            return !1
        })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, r.prototype.op = function (t, e, i) {
        var n = this.settings.rtl;
        switch (e) {
            case"<":
                return n ? t > i : i > t;
            case">":
                return n ? i > t : t > i;
            case">=":
                return n ? i >= t : t >= i;
            case"<=":
                return n ? t >= i : i >= t
        }
    }, r.prototype.on = function (t, e, i, n) {
        t.addEventListener ? t.addEventListener(e, i, n) : t.attachEvent && t.attachEvent("on" + e, i)
    }, r.prototype.off = function (t, e, i, n) {
        t.removeEventListener ? t.removeEventListener(e, i, n) : t.detachEvent && t.detachEvent("on" + e, i)
    }, r.prototype.trigger = function (e, i, n) {
        var r = {item: {count: this._items.length, index: this.current()}},
            o = t.camelCase(t.grep(["on", e, n], function (t) {
                return t
            }).join("-").toLowerCase()),
            s = t.Event([e, "owl", n || "carousel"].join(".").toLowerCase(), t.extend({relatedTarget: this}, r, i));
        return this._supress[e] || (t.each(this._plugins, function (t, e) {
            e.onTrigger && e.onTrigger(s)
        }), this.$element.trigger(s), this.settings && "function" == typeof this.settings[o] && this.settings[o].apply(this, s)), s
    }, r.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = !0
        }, this))
    }, r.prototype.release = function (e) {
        t.each(e, t.proxy(function (t, e) {
            delete this._supress[e]
        }, this))
    }, r.prototype.browserSupport = function () {
        if (this.support3d = u(), this.support3d) {
            this.transformVendor = l();
            var t = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
            this.transitionEndVendor = t[a()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
        }
        this.state.orientation = e.orientation
    }, t.fn.owlCarousel = function (e) {
        return this.each(function () {
            t(this).data("owlCarousel") || t(this).data("owlCarousel", new r(this, e))
        })
    }, t.fn.owlCarousel.Constructor = r
}(window.Zepto || window.jQuery, window, document), function (t, e) {
    var i = function (e) {
        this._core = e, this._loaded = [], this._handlers = {
            "initialized.owl.carousel change.owl.carousel": t.proxy(function (e) {
                if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) for (var i = this._core.settings, n = i.center && Math.ceil(i.items / 2) || i.items, r = i.center && -1 * n || 0, o = (e.property && e.property.value || this._core.current()) + r, s = this._core.clones().length, a = t.proxy(function (t, e) {
                    this.load(e)
                }, this); r++ < n;) this.load(s / 2 + this._core.relative(o)), s && t.each(this._core.clones(this._core.relative(o++)), a)
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    i.Defaults = {lazyLoad: !1}, i.prototype.load = function (i) {
        var n = this._core.$stage.children().eq(i), r = n && n.find(".owl-lazy");
        !r || t.inArray(n.get(0), this._loaded) > -1 || (r.each(t.proxy(function (i, n) {
            var r, o = t(n), s = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
            this._core.trigger("load", {
                element: o,
                url: s
            }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
                o.css("opacity", 1), this._core.trigger("loaded", {element: o, url: s}, "lazy")
            }, this)).attr("src", s) : (r = new Image, r.onload = t.proxy(function () {
                o.css({"background-image": "url(" + s + ")", opacity: "1"}), this._core.trigger("loaded", {
                    element: o,
                    url: s
                }, "lazy")
            }, this), r.src = s)
        }, this)), this._loaded.push(n.get(0)))
    }, i.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Lazy = i
}(window.Zepto || window.jQuery, window, document), function (t) {
    var e = function (i) {
        this._core = i, this._handlers = {
            "initialized.owl.carousel": t.proxy(function () {
                this._core.settings.autoHeight && this.update()
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                this._core.settings.autoHeight && "position" == t.property.name && this.update()
            }, this), "loaded.owl.lazy": t.proxy(function (t) {
                this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    e.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, e.prototype.update = function () {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, e.prototype.destroy = function () {
        var t, e;
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
    var n = function (e) {
        this._core = e, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
            "resize.owl.carousel": t.proxy(function (t) {
                this._core.settings.video && !this.isInFullScreen() && t.preventDefault()
            }, this), "refresh.owl.carousel changed.owl.carousel": t.proxy(function () {
                this._playing && this.stop()
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                var i = t(e.content).find(".owl-video");
                i.length && (i.css("display", "none"), this.fetch(i, t(e.content)))
            }, this)
        }, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
            this.play(t)
        }, this))
    };
    n.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, n.prototype.fetch = function (t, e) {
        var i = t.attr("data-vimeo-id") ? "vimeo" : "youtube", n = t.attr("data-vimeo-id") || t.attr("data-youtube-id"),
            r = t.attr("data-width") || this._core.settings.videoWidth,
            o = t.attr("data-height") || this._core.settings.videoHeight, s = t.attr("href");
        if (!s) throw new Error("Missing video URL.");
        if (n = s.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), n[3].indexOf("youtu") > -1) i = "youtube"; else {
            if (!(n[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
            i = "vimeo"
        }
        n = n[6], this._videos[s] = {
            type: i,
            id: n,
            width: r,
            height: o
        }, e.attr("data-video", s), this.thumbnail(t, this._videos[s])
    }, n.prototype.thumbnail = function (e, i) {
        var n, r, o, s = i.width && i.height ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"' : "",
            a = e.find("img"), l = "src", u = "", c = this._core.settings, d = function (t) {
                r = '<div class="owl-video-play-icon"></div>', n = c.lazyLoad ? '<div class="owl-video-tn ' + u + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(n), e.after(r)
            };
        return e.wrap('<div class="owl-video-wrapper"' + s + "></div>"), this._core.settings.lazyLoad && (l = "data-src", u = "owl-lazy"), a.length ? (d(a.attr(l)), a.remove(), !1) : void("youtube" === i.type ? (o = "http://img.youtube.com/vi/" + i.id + "/hqdefault.jpg", d(o)) : "vimeo" === i.type && t.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + i.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function (t) {
                o = t[0].thumbnail_large, d(o)
            }
        }))
    }, n.prototype.stop = function () {
        this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, n.prototype.play = function (e) {
        this._core.trigger("play", null, "video"), this._playing && this.stop();
        var i, n, r = t(e.target || e.srcElement), o = r.closest("." + this._core.settings.itemClass),
            s = this._videos[o.attr("data-video")], a = s.width || "100%", l = s.height || this._core.$stage.height();
        "youtube" === s.type ? i = '<iframe width="' + a + '" height="' + l + '" src="http://www.youtube.com/embed/' + s.id + "?autoplay=1&v=" + s.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === s.type && (i = '<iframe src="http://player.vimeo.com/video/' + s.id + '?autoplay=1" width="' + a + '" height="' + l + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), o.addClass("owl-video-playing"), this._playing = o, n = t('<div style="height:' + l + "px; width:" + a + 'px" class="owl-video-frame">' + i + "</div>"), r.after(n)
    }, n.prototype.isInFullScreen = function () {
        var n = i.fullscreenElement || i.mozFullScreenElement || i.webkitFullscreenElement;
        return n && t(n).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), n && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== e.orientation ? (this._core.state.orientation = e.orientation, !1) : !0
    }, n.prototype.destroy = function () {
        var t, e;
        this._core.$element.off("click.owl.video");
        for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Video = n
}(window.Zepto || window.jQuery, window, document), function (t, e, i, n) {
    var r = function (e) {
        this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = n, this.next = n, this.handlers = {
            "change.owl.carousel": t.proxy(function (t) {
                "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
            }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                this.swapping = "translated" == t.type
            }, this), "translate.owl.carousel": t.proxy(function () {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    r.Defaults = {animateOut: !1, animateIn: !1}, r.prototype.swap = function () {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var e, i = t.proxy(this.clear, this), n = this.core.$stage.children().eq(this.previous),
                r = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn,
                s = this.core.settings.animateOut;
            this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), n.css({left: e + "px"}).addClass("animated owl-animated-out").addClass(s).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i)), o && r.addClass("animated owl-animated-in").addClass(o).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", i))
        }
    }, r.prototype.clear = function (e) {
        t(e.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, r.prototype.destroy = function () {
        var t, e;
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Animate = r
}(window.Zepto || window.jQuery, window, document), function (t, e, i) {
    var n = function (e) {
        this.core = e, this.core.options = t.extend({}, n.Defaults, this.core.options), this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": t.proxy(function () {
                this.autoplay()
            }, this), "play.owl.autoplay": t.proxy(function (t, e, i) {
                this.play(e, i)
            }, this), "stop.owl.autoplay": t.proxy(function () {
                this.stop()
            }, this), "mouseover.owl.autoplay": t.proxy(function () {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this), "mouseleave.owl.autoplay": t.proxy(function () {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        }, this.core.$element.on(this.handlers)
    };
    n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    }, n.prototype.autoplay = function () {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (e.clearInterval(this.interval), this.interval = e.setInterval(t.proxy(function () {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : e.clearInterval(this.interval)
    }, n.prototype.play = function () {
        return i.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void e.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, n.prototype.stop = function () {
        e.clearInterval(this.interval)
    }, n.prototype.pause = function () {
        e.clearInterval(this.interval)
    }, n.prototype.destroy = function () {
        var t, i;
        e.clearInterval(this.interval);
        for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.autoplay = n
}(window.Zepto || window.jQuery, window, document), function (t) {
    "use strict";
    var e = function (i) {
        this._core = i, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        }, this._handlers = {
            "prepared.owl.carousel": t.proxy(function (e) {
                this._core.settings.dotsData && this._templates.push(t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "add.owl.carousel": t.proxy(function (e) {
                this._core.settings.dotsData && this._templates.splice(e.position, 0, t(e.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this), "remove.owl.carousel prepared.owl.carousel": t.proxy(function (t) {
                this._core.settings.dotsData && this._templates.splice(t.position, 1)
            }, this), "change.owl.carousel": t.proxy(function (t) {
                if ("position" == t.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var e = this._core.current(), i = this._core.maximum(), n = this._core.minimum();
                    t.data = t.property.value > i ? e >= i ? n : i : t.property.value < n ? i : t.property.value
                }
            }, this), "changed.owl.carousel": t.proxy(function (t) {
                "position" == t.property.name && this.draw()
            }, this), "refreshed.owl.carousel": t.proxy(function () {
                this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
            }, this)
        }, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    }, e.prototype.initialize = function () {
        var e, i, n = this._core.settings;
        n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), n.navContainer && n.dotsContainer || (this._controls.$container = t("<div>").addClass(n.controlsClass).appendTo(this.$element)), this._controls.$indicators = n.dotsContainer ? t(n.dotsContainer) : t("<div>").hide().addClass(n.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", t.proxy(function (e) {
            var i = t(e.target).parent().is(this._controls.$indicators) ? t(e.target).index() : t(e.target).parent().index();
            e.preventDefault(), this.to(i, n.dotsSpeed)
        }, this)), e = n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).prependTo(this._controls.$container), this._controls.$next = t("<" + n.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(n.navClass[0]).html(n.navText[0]).hide().prependTo(e).on("click", t.proxy(function () {
            this.prev(n.navSpeed)
        }, this)), this._controls.$next.addClass(n.navClass[1]).html(n.navText[1]).hide().appendTo(e).on("click", t.proxy(function () {
            this.next(n.navSpeed)
        }, this));
        for (i in this._overrides) this._core[i] = t.proxy(this[i], this)
    }, e.prototype.destroy = function () {
        var t, e, i, n;
        for (t in this._handlers) this.$element.off(t, this._handlers[t]);
        for (e in this._controls) this._controls[e].remove();
        for (n in this.overides) this._core[n] = this._overrides[n];
        for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
    }, e.prototype.update = function () {
        var t, e, i, n = this._core.settings, r = this._core.clones().length / 2, o = r + this._core.items().length,
            s = n.center || n.autoWidth || n.dotData ? 1 : n.dotsEach || n.items;
        if ("page" !== n.slideBy && (n.slideBy = Math.min(n.slideBy, n.items)), n.dots || "page" == n.slideBy) for (this._pages = [], t = r, e = 0, i = 0; o > t; t++) (e >= s || 0 === e) && (this._pages.push({
            start: t - r,
            end: t - r + s - 1
        }), e = 0, ++i), e += this._core.mergers(this._core.relative(t))
    }, e.prototype.draw = function () {
        var e, i, n = "", r = this._core.settings,
            o = (this._core.$stage.children(), this._core.relative(this._core.current()));
        if (!r.nav || r.loop || r.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= o), this._controls.$next.toggleClass("disabled", o >= this._core.maximum())), this._controls.$previous.toggle(r.nav), this._controls.$next.toggle(r.nav), r.dots) {
            if (e = this._pages.length - this._controls.$indicators.children().length, r.dotData && 0 !== e) {
                for (i = 0; i < this._controls.$indicators.children().length; i++) n += this._templates[this._core.relative(i)];
                this._controls.$indicators.html(n)
            } else e > 0 ? (n = new Array(e + 1).join(this._templates[0]), this._controls.$indicators.append(n)) : 0 > e && this._controls.$indicators.children().slice(e).remove();
            this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(t.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(r.dots)
    }, e.prototype.onTrigger = function (e) {
        var i = this._core.settings;
        e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: i && (i.center || i.autoWidth || i.dotData ? 1 : i.dotsEach || i.items)
        }
    }, e.prototype.current = function () {
        var e = this._core.relative(this._core.current());
        return t.grep(this._pages, function (t) {
            return t.start <= e && t.end >= e
        }).pop()
    }, e.prototype.getPosition = function (e) {
        var i, n, r = this._core.settings;
        return "page" == r.slideBy ? (i = t.inArray(this.current(), this._pages), n = this._pages.length, e ? ++i : --i, i = this._pages[(i % n + n) % n].start) : (i = this._core.relative(this._core.current()), n = this._core.items().length, e ? i += r.slideBy : i -= r.slideBy), i
    }, e.prototype.next = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
    }, e.prototype.prev = function (e) {
        t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
    }, e.prototype.to = function (e, i, n) {
        var r;
        n ? t.proxy(this._overrides.to, this._core)(e, i) : (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, i))
    }, t.fn.owlCarousel.Constructor.Plugins.Navigation = e
}(window.Zepto || window.jQuery, window, document), function (t, e) {
    "use strict";
    var i = function (n) {
        this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
            "initialized.owl.carousel": t.proxy(function () {
                "URLHash" == this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
            }, this), "prepared.owl.carousel": t.proxy(function (e) {
                var i = t(e.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[i] = e.content
            }, this)
        }, this._core.options = t.extend({}, i.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function () {
            var t = e.location.hash.substring(1), i = this._core.$stage.children(),
                n = this._hashes[t] && i.index(this._hashes[t]) || 0;
            return t ? void this._core.to(n, !1, !0) : !1
        }, this))
    };
    i.Defaults = {URLhashListener: !1}, i.prototype.destroy = function () {
        var i, n;
        t(e).off("hashchange.owl.navigation");
        for (i in this._handlers) this._core.$element.off(i, this._handlers[i]);
        for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
    }, t.fn.owlCarousel.Constructor.Plugins.Hash = i
}(window.Zepto || window.jQuery, window, document), !function (t) {
    "use strict";
    t.fn.fitVids = function (e) {
        var i = {customSelector: null, ignore: null};
        if (!document.getElementById("fit-vids-style")) {
            var n = document.head || document.getElementsByTagName("head")[0],
                r = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                o = document.createElement("div");
            o.innerHTML = '<p>x</p><style id="fit-vids-style">' + r + "</style>", n.appendChild(o.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function () {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var n = ".fitvidsignore";
            i.ignore && (n = n + ", " + i.ignore);
            var r = t(this).find(e.join(","));
            r = r.not("object object"), r = r.not(n), r.each(function (e) {
                var i = t(this);
                if (!(i.parents(n).length > 0 || "embed" === this.tagName.toLowerCase() && i.parent("object").length || i.parent(".fluid-width-video-wrapper").length)) {
                    i.css("height") || i.css("width") || !isNaN(i.attr("height")) && !isNaN(i.attr("width")) || (i.attr("height", 9), i.attr("width", 16));
                    var r = "object" === this.tagName.toLowerCase() || i.attr("height") && !isNaN(parseInt(i.attr("height"), 10)) ? parseInt(i.attr("height"), 10) : i.height(),
                        o = isNaN(parseInt(i.attr("width"), 10)) ? i.width() : parseInt(i.attr("width"), 10), s = r / o;
                    if (!i.attr("id")) {
                        var a = "fitvid" + e;
                        i.attr("id", a)
                    }
                    i.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * s + "%"), i.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto), !function (t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : t.jQuery)
}(this, function (t) {
    "use strict";

    function e(t) {
        var e, i, n, r, o, s, a, l = {};
        for (o = t.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ",").split(","), a = 0, s = o.length; s > a && (i = o[a], -1 === i.search(/^(http|https|ftp):\/\//) && -1 !== i.search(":")); a++) e = i.indexOf(":"), n = i.substring(0, e), r = i.substring(e + 1), r || (r = void 0), "string" == typeof r && (r = "true" === r || "false" !== r && r), "string" == typeof r && (r = isNaN(r) ? r : +r), l[n] = r;
        return null == n && null == r ? t : l
    }

    function i(t) {
        t = "" + t;
        var e, i, n, r = t.split(/\s+/), o = "50%", s = "50%";
        for (n = 0, e = r.length; e > n; n++) i = r[n], "left" === i ? o = "0%" : "right" === i ? o = "100%" : "top" === i ? s = "0%" : "bottom" === i ? s = "100%" : "center" === i ? 0 === n ? o = "50%" : s = "50%" : 0 === n ? o = i : s = i;
        return {x: o, y: s}
    }

    function n(e, i) {
        var n = function () {
            i(this.src)
        };
        t('<img src="' + e + '.gif">').on("load", n), t('<img src="' + e + '.jpg">').on("load", n), t('<img src="' + e + '.jpeg">').on("load", n), t('<img src="' + e + '.png">').on("load", n)
    }

    function r(i, n, r) {
        if (this.$element = t(i), "string" == typeof n && (n = e(n)), r ? "string" == typeof r && (r = e(r)) : r = {}, "string" == typeof n) n = n.replace(/\.\w*$/, ""); else if ("object" == typeof n) for (var o in n) n.hasOwnProperty(o) && (n[o] = n[o].replace(/\.\w*$/, ""));
        this.settings = t.extend({}, s, r), this.path = n;
        try {
            this.init()
        } catch (l) {
            if (l.message !== a) throw l
        }
    }

    var o = "vide", s = {
        volume: 1,
        playbackRate: 1,
        muted: !0,
        loop: !0,
        autoplay: !0,
        position: "50% 50%",
        posterType: "detect",
        resizing: !0,
        bgColor: "transparent",
        className: ""
    }, a = "Not implemented";
    r.prototype.init = function () {
        var e, r, o = this, s = o.path, l = s, u = "", c = o.$element, d = o.settings, h = i(d.position),
            p = d.posterType;
        r = o.$wrapper = t("<div>").addClass(d.className).css({
            position: "absolute",
            "z-index": -1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            "-webkit-background-size": "cover",
            "-moz-background-size": "cover",
            "-o-background-size": "cover",
            "background-size": "cover",
            "background-color": d.bgColor,
            "background-repeat": "no-repeat",
            "background-position": h.x + " " + h.y
        }), "object" == typeof s && (s.poster ? l = s.poster : s.mp4 ? l = s.mp4 : s.webm ? l = s.webm : s.ogv && (l = s.ogv)), "detect" === p ? n(l, function (t) {
            r.css("background-image", "url(" + t + ")")
        }) : "none" !== p && r.css("background-image", "url(" + l + "." + p + ")"), "static" === c.css("position") && c.css("position", "relative"), c.prepend(r), "object" == typeof s ? (s.mp4 && (u += '<source src="' + s.mp4 + '.mp4" type="video/mp4">'), s.webm && (u += '<source src="' + s.webm + '.webm" type="video/webm">'), s.ogv && (u += '<source src="' + s.ogv + '.ogv" type="video/ogg">'), e = o.$video = t("<video>" + u + "</video>")) : e = o.$video = t('<video><source src="' + s + '.mp4" type="video/mp4"><source src="' + s + '.webm" type="video/webm"><source src="' + s + '.ogv" type="video/ogg"></video>');
        try {
            e.prop({
                autoplay: d.autoplay,
                loop: d.loop,
                volume: d.volume,
                muted: d.muted,
                defaultMuted: d.muted,
                playbackRate: d.playbackRate,
                defaultPlaybackRate: d.playbackRate
            })
        } catch (f) {
            throw new Error(a)
        }
        e.css({
            margin: "auto",
            position: "absolute",
            "z-index": -1,
            top: h.y,
            left: h.x,
            "-webkit-transform": "translate(-" + h.x + ", -" + h.y + ")",
            "-ms-transform": "translate(-" + h.x + ", -" + h.y + ")",
            "-moz-transform": "translate(-" + h.x + ", -" + h.y + ")",
            transform: "translate(-" + h.x + ", -" + h.y + ")",
            visibility: "hidden",
            opacity: 0
        }).one("canplaythrough.vide", function () {
            o.resize()
        }).one("playing.vide", function () {
            e.css({visibility: "visible", opacity: 1}), r.css("background-image", "none")
        }), c.on("resize.vide", function () {
            d.resizing && o.resize()
        }), r.append(e)
    }, r.prototype.getVideoObject = function () {
        return this.$video[0]
    }, r.prototype.resize = function () {
        if (this.$video) {
            var t = this.$wrapper, e = this.$video, i = e[0], n = i.videoHeight, r = i.videoWidth, o = t.height(),
                s = t.width();
            s / r > o / n ? e.css({width: s + 2, height: "auto"}) : e.css({width: "auto", height: o + 2})
        }
    }, r.prototype.destroy = function () {
        delete t[o].lookup[this.index], this.$video && this.$video.off(o), this.$element.off(o).removeData(o), this.$wrapper.remove()
    }, t[o] = {lookup: []}, t.fn[o] = function (e, i) {
        var n;
        return this.each(function () {
            n = t.data(this, o), n && n.destroy(), n = new r(this, e, i), n.index = t[o].lookup.push(n) - 1, t.data(this, o, n)
        }), this
    }, t(document).ready(function () {
        var e = t(window);
        e.on("resize.vide", function () {
            for (var e, i = t[o].lookup.length, n = 0; i > n; n++) e = t[o].lookup[n], e && e.settings.resizing && e.resize()
        }), e.on("unload.vide", function () {
            return !1
        }), t(document).find("[data-vide-bg]").each(function (e, i) {
            var n = t(i), r = n.data("vide-options"), s = n.data("vide-bg");
            n[o](s, r)
        })
    })
});
var ytp = ytp || {}, getYTPVideoID = function (t) {
    var e, i;
    return t.indexOf("youtu.be") > 0 ? (e = t.substr(t.lastIndexOf("/") + 1, t.length), i = e.indexOf("?list=") > 0 ? e.substr(e.lastIndexOf("="), e.length) : null, e = i ? e.substr(0, e.lastIndexOf("?")) : e) : t.indexOf("http") > -1 ? (e = t.match(/[\\?&]v=([^&#]*)/)[1], i = t.indexOf("list=") > 0 ? t.match(/[\\?&]list=([^&#]*)/)[1] : null) : (e = t.length > 15 ? null : t, i = e ? null : t), {
        videoID: e,
        playlistID: i
    }
};
!function (jQuery, ytp) {
    jQuery.mbYTPlayer = {
        name: "jquery.mb.YTPlayer",
        version: "3.0.18",
        build: "6220",
        author: "Matteo Bicocchi (pupunzi)",
        apiKey: "",
        defaults: {
            containment: "body",
            ratio: "auto",
            videoURL: null,
            playlistURL: null,
            startAt: 0,
            stopAt: 0,
            autoPlay: !0,
            vol: 50,
            addRaster: !1,
            mask: !1,
            opacity: 1,
            quality: "default",
            mute: !1,
            loop: !0,
            fadeOnStartTime: 500,
            showControls: !0,
            showAnnotations: !1,
            showYTLogo: !0,
            stopMovieOnBlur: !0,
            realfullscreen: !0,
            mobileFallbackImage: null,
            gaTrack: !0,
            optimizeDisplay: !0,
            remember_last_time: !1,
            anchor: "center,center",
            onReady: function () {
            },
            onError: function () {
            }
        },
        controls: {play: "P", pause: "p", mute: "M", unmute: "A", onlyYT: "O", showSite: "R", ytLogo: "Y"},
        controlBar: null,
        loading: null,
        locationProtocol: "https:",
        filters: {
            grayscale: {value: 0, unit: "%"},
            hue_rotate: {value: 0, unit: "deg"},
            invert: {value: 0, unit: "%"},
            opacity: {value: 0, unit: "%"},
            saturate: {value: 0, unit: "%"},
            sepia: {value: 0, unit: "%"},
            brightness: {value: 0, unit: "%"},
            contrast: {value: 0, unit: "%"},
            blur: {value: 0, unit: "px"}
        },
        buildPlayer: function (options) {
            return this.each(function () {
                var YTPlayer = this, $YTPlayer = jQuery(YTPlayer);
                YTPlayer.loop = 0, YTPlayer.opt = {}, YTPlayer.state = {}, YTPlayer.filters = jQuery.mbYTPlayer.filters, YTPlayer.filtersEnabled = !0, YTPlayer.id = YTPlayer.id || "YTP_" + (new Date).getTime(), $YTPlayer.addClass("mb_YTPlayer");
                var property = $YTPlayer.data("property") && "string" == typeof $YTPlayer.data("property") ? eval("(" + $YTPlayer.data("property") + ")") : $YTPlayer.data("property");
                "undefined" != typeof property && "undefined" != typeof property.vol && (property.vol = 0 === property.vol ? property.vol = 1 : property.vol), jQuery.extend(YTPlayer.opt, jQuery.mbYTPlayer.defaults, options, property), YTPlayer.hasChanged || (YTPlayer.defaultOpt = {}, jQuery.extend(YTPlayer.defaultOpt, jQuery.mbYTPlayer.defaults, options)), "true" == YTPlayer.opt.loop && (YTPlayer.opt.loop = 9999), YTPlayer.isRetina = window.retina || window.devicePixelRatio > 1;
                var isIframe = function () {
                    var t = !1;
                    try {
                        self.location.href != top.location.href && (t = !0)
                    } catch (e) {
                        t = !0
                    }
                    return t
                };
                YTPlayer.canGoFullScreen = !(jQuery.browser.msie || jQuery.browser.opera || isIframe()), YTPlayer.canGoFullScreen || (YTPlayer.opt.realfullscreen = !1), $YTPlayer.attr("id") || $YTPlayer.attr("id", "ytp_" + (new Date).getTime());
                var playerID = "iframe_" + YTPlayer.id;
                YTPlayer.isAlone = !1, YTPlayer.hasFocus = !0, YTPlayer.videoID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).videoID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).videoID : !1, YTPlayer.playlistID = this.opt.videoURL ? getYTPVideoID(this.opt.videoURL).playlistID : $YTPlayer.attr("href") ? getYTPVideoID($YTPlayer.attr("href")).playlistID : !1, YTPlayer.opt.showAnnotations = YTPlayer.opt.showAnnotations ? "1" : "3";
                var start_from_last = 0;
                jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID) && (start_from_last = parseFloat(jQuery.mbCookie.get("YTPlayer_" + YTPlayer.videoID))), YTPlayer.opt.remember_last_time && start_from_last && (YTPlayer.start_from_last = start_from_last, jQuery.mbCookie.remove("YTPlayer_" + YTPlayer.videoID));
                var playerVars = {
                    modestbranding: 1,
                    autoplay: 0,
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    enablejsapi: 1,
                    version: 3,
                    playerapiid: playerID,
                    origin: "*",
                    allowfullscreen: !0,
                    wmode: "transparent",
                    iv_load_policy: YTPlayer.opt.showAnnotations
                };
                if (document.createElement("video").canPlayType && jQuery.extend(playerVars, {html5: 1}), jQuery.browser.msie && jQuery.browser.version < 9 && (this.opt.opacity = 1), YTPlayer.isSelf = "self" == YTPlayer.opt.containment, YTPlayer.defaultOpt.containment = YTPlayer.opt.containment = jQuery("self" == YTPlayer.opt.containment ? this : YTPlayer.opt.containment), YTPlayer.isBackground = YTPlayer.opt.containment.is("body"), !YTPlayer.isBackground || !ytp.backgroundIsInited) {
                    var isPlayer = YTPlayer.opt.containment.is(jQuery(this));
                    YTPlayer.canPlayOnMobile = isPlayer && 0 === jQuery(this).children().length, YTPlayer.isPlayer = !1, isPlayer ? YTPlayer.isPlayer = !0 : $YTPlayer.hide();
                    var overlay = jQuery("<div/>").css({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }).addClass("YTPOverlay");
                    YTPlayer.isPlayer && overlay.on("click", function () {
                        $YTPlayer.YTPTogglePlay()
                    });
                    var wrapper = jQuery("<div/>").addClass("mbYTP_wrapper").attr("id", "wrapper_" + YTPlayer.id);
                    wrapper.css({
                        position: "absolute",
                        zIndex: 0,
                        minWidth: "100%",
                        minHeight: "100%",
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        opacity: 0
                    });
                    var playerBox = jQuery("<div/>").attr("id", playerID).addClass("playerBox");
                    if (playerBox.css({
                            position: "absolute",
                            zIndex: 0,
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            overflow: "hidden"
                        }), wrapper.append(playerBox), YTPlayer.opt.containment.children().not("script, style").each(function () {
                            "static" == jQuery(this).css("position") && jQuery(this).css("position", "relative")
                        }), YTPlayer.isBackground ? (jQuery("body").css({boxSizing: "border-box"}), wrapper.css({
                            position: "fixed",
                            top: 0,
                            left: 0,
                            zIndex: 0
                        }), $YTPlayer.hide()) : "static" == YTPlayer.opt.containment.css("position") && YTPlayer.opt.containment.css({position: "relative"}), YTPlayer.opt.containment.prepend(wrapper), YTPlayer.wrapper = wrapper, playerBox.css({opacity: 1}), jQuery.browser.mobile || (playerBox.after(overlay), YTPlayer.overlay = overlay), YTPlayer.isBackground || overlay.on("mouseenter", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.addClass("visible")
                        }).on("mouseleave", function () {
                            YTPlayer.controlBar && YTPlayer.controlBar.length && YTPlayer.controlBar.removeClass("visible")
                        }), ytp.YTAPIReady) setTimeout(function () {
                        jQuery(document).trigger("YTAPIReady")
                    }, 100); else {
                        jQuery("#YTAPI").remove();
                        var tag = jQuery("<script></script>").attr({
                            src: jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/iframe_api?v=" + jQuery.mbYTPlayer.version,
                            id: "YTAPI"
                        });
                        jQuery("head").prepend(tag)
                    }
                    if (jQuery.browser.mobile && !YTPlayer.canPlayOnMobile) return YTPlayer.opt.mobileFallbackImage && wrapper.css({
                        backgroundImage: "url(" + YTPlayer.opt.mobileFallbackImage + ")",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        opacity: 1
                    }), $YTPlayer.remove(), void jQuery(document).trigger("YTPUnavailable");
                    jQuery(document).on("YTAPIReady", function () {
                        YTPlayer.isBackground && ytp.backgroundIsInited || YTPlayer.isInit || (YTPlayer.isBackground && (ytp.backgroundIsInited = !0), YTPlayer.opt.autoPlay = "undefined" == typeof YTPlayer.opt.autoPlay ? !!YTPlayer.isBackground : YTPlayer.opt.autoPlay, YTPlayer.opt.vol = YTPlayer.opt.vol ? YTPlayer.opt.vol : 100, jQuery.mbYTPlayer.getDataFromAPI(YTPlayer), jQuery(YTPlayer).on("YTPChanged", function () {
                            if (!YTPlayer.isInit) {
                                if (YTPlayer.isInit = !0, jQuery.browser.mobile && YTPlayer.canPlayOnMobile) {
                                    if (YTPlayer.opt.containment.outerWidth() > jQuery(window).width()) {
                                        YTPlayer.opt.containment.css({maxWidth: "100%"});
                                        var h = .563 * YTPlayer.opt.containment.outerWidth();
                                        YTPlayer.opt.containment.css({maxHeight: h})
                                    }
                                    return void new YT.Player(playerID, {
                                        videoId: YTPlayer.videoID.toString(),
                                        width: "100%",
                                        height: h,
                                        playerVars: playerVars,
                                        events: {
                                            onReady: function (t) {
                                                YTPlayer.player = t.target, playerBox.css({opacity: 1}), YTPlayer.wrapper.css({opacity: 1})
                                            }
                                        }
                                    })
                                }
                                new YT.Player(playerID, {
                                    videoId: YTPlayer.videoID.toString(),
                                    playerVars: playerVars,
                                    events: {
                                        onReady: function (t) {
                                            YTPlayer.player = t.target, YTPlayer.isReady || (YTPlayer.isReady = !YTPlayer.isPlayer || YTPlayer.opt.autoPlay, YTPlayer.playerEl = YTPlayer.player.getIframe(), jQuery(YTPlayer.playerEl).unselectable(), $YTPlayer.optimizeDisplay(), jQuery(window).off("resize.YTP_" + YTPlayer.id).on("resize.YTP_" + YTPlayer.id, function () {
                                                $YTPlayer.optimizeDisplay()
                                            }), YTPlayer.opt.remember_last_time && jQuery(window).on("unload.YTP_" + YTPlayer.id, function () {
                                                var t = YTPlayer.player.getCurrentTime();
                                                jQuery.mbCookie.set("YTPlayer_" + YTPlayer.videoID, t, 1)
                                            }), jQuery.mbYTPlayer.checkForState(YTPlayer))
                                        }, onStateChange: function (event) {
                                            if ("function" == typeof event.target.getPlayerState) {
                                                var state = event.target.getPlayerState();
                                                if (YTPlayer.preventTrigger) return void(YTPlayer.preventTrigger = !1);
                                                YTPlayer.state = state;
                                                var eventType;
                                                switch (state) {
                                                    case-1:
                                                        eventType = "YTPUnstarted";
                                                        break;
                                                    case 0:
                                                        eventType = "YTPEnd";
                                                        break;
                                                    case 1:
                                                        eventType = "YTPPlay", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.pause), "undefined" != typeof _gaq && eval(YTPlayer.opt.gaTrack) && _gaq.push(["_trackEvent", "YTPlayer", "Play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString()]), "undefined" != typeof ga && eval(YTPlayer.opt.gaTrack) && ga("send", "event", "YTPlayer", "play", YTPlayer.hasData ? YTPlayer.videoData.title : YTPlayer.videoID.toString());
                                                        break;
                                                    case 2:
                                                        eventType = "YTPPause", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 3:
                                                        YTPlayer.player.setPlaybackQuality(YTPlayer.opt.quality), eventType = "YTPBuffering", YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                                                        break;
                                                    case 5:
                                                        eventType = "YTPCued"
                                                }
                                                var YTPEvent = jQuery.Event(eventType);
                                                YTPEvent.time = YTPlayer.currentTime, YTPlayer.canTrigger && jQuery(YTPlayer).trigger(YTPEvent)
                                            }
                                        }, onPlaybackQualityChange: function (t) {
                                            var e = t.target.getPlaybackQuality(), i = jQuery.Event("YTPQualityChange");
                                            i.quality = e, jQuery(YTPlayer).trigger(i)
                                        }, onError: function (t) {
                                            150 == t.data && (console.log("Embedding this video is restricted by Youtube."), YTPlayer.isPlayList && jQuery(YTPlayer).playNext()), 2 == t.data && YTPlayer.isPlayList && jQuery(YTPlayer).playNext(), "function" == typeof YTPlayer.opt.onError && YTPlayer.opt.onError($YTPlayer, t)
                                        }
                                    }
                                })
                            }
                        }))
                    }), $YTPlayer.off("YTPTime.mask"), jQuery.mbYTPlayer.applyMask(YTPlayer)
                }
            })
        },
        getDataFromAPI: function (t) {
            if (t.videoData = jQuery.mbStorage.get("YTPlayer_data_" + t.videoID), jQuery(t).off("YTPData.YTPlayer").on("YTPData.YTPlayer", function () {
                    if (t.hasData && t.isPlayer && !t.opt.autoPlay) {
                        var e = t.videoData.thumb_max || t.videoData.thumb_high || t.videoData.thumb_medium;
                        t.opt.containment.css({
                            background: "rgba(0,0,0,0.5) url(" + e + ") center center",
                            backgroundSize: "cover"
                        }), t.opt.backgroundUrl = e
                    }
                }), t.videoData) setTimeout(function () {
                t.opt.ratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio, t.dataReceived = !0, jQuery(t).trigger("YTPChanged");
                var e = jQuery.Event("YTPData");
                e.prop = {};
                for (var i in t.videoData) e.prop[i] = t.videoData[i];
                jQuery(t).trigger(e)
            }, t.opt.fadeOnStartTime), t.hasData = !0; else if (jQuery.mbYTPlayer.apiKey) jQuery.getJSON(jQuery.mbYTPlayer.locationProtocol + "//www.googleapis.com/youtube/v3/videos?id=" + t.videoID + "&key=" + jQuery.mbYTPlayer.apiKey + "&part=snippet", function (e) {
                function i(e) {
                    t.videoData = {}, t.videoData.id = t.videoID, t.videoData.channelTitle = e.channelTitle, t.videoData.title = e.title, t.videoData.description = e.description.length < 400 ? e.description : e.description.substring(0, 400) + " ...", t.videoData.aspectratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio, t.opt.ratio = t.videoData.aspectratio, t.videoData.thumb_max = e.thumbnails.maxres ? e.thumbnails.maxres.url : null, t.videoData.thumb_high = e.thumbnails.high ? e.thumbnails.high.url : null, t.videoData.thumb_medium = e.thumbnails.medium ? e.thumbnails.medium.url : null, jQuery.mbStorage.set("YTPlayer_data_" + t.videoID, t.videoData)
                }

                t.dataReceived = !0, jQuery(t).trigger("YTPChanged"), i(e.items[0].snippet), t.hasData = !0;
                var n = jQuery.Event("YTPData");
                n.prop = {};
                for (var r in t.videoData) n.prop[r] = t.videoData[r];
                jQuery(t).trigger(n)
            }); else {
                if (setTimeout(function () {
                        jQuery(t).trigger("YTPChanged")
                    }, 50), t.isPlayer && !t.opt.autoPlay) {
                    var e = jQuery.mbYTPlayer.locationProtocol + "//i.ytimg.com/vi/" + t.videoID + "/hqdefault.jpg";
                    e && t.opt.containment.css({
                        background: "rgba(0,0,0,0.5) url(" + e + ") center center",
                        backgroundSize: "cover"
                    }), t.opt.backgroundUrl = e
                }
                t.videoData = null, t.opt.ratio = "auto" == t.opt.ratio ? "16/9" : t.opt.ratio
            }
            !t.isPlayer || t.opt.autoPlay || jQuery.browser.mobile || (t.loading = jQuery("<div/>").addClass("loading").html("Loading").hide(), jQuery(t).append(t.loading), t.loading.fadeIn())
        },
        removeStoredData: function () {
            jQuery.mbStorage.remove()
        },
        getVideoData: function () {
            var t = this.get(0);
            return t.videoData
        },
        getVideoID: function () {
            var t = this.get(0);
            return t.videoID || !1
        },
        setVideoQuality: function (t) {
            var e = this.get(0);
            e.player.setPlaybackQuality(t)
        },
        playlist: function (t, e, i, n) {
            var r = this, o = r.get(0);
            return o.isPlayList = !0, e && (t = jQuery.shuffle(t)), o.videoID || (o.videos = t, o.videoCounter = 0, o.videoLength = t.length, jQuery(o).data("property", t[0]), jQuery(o).mb_YTPlayer()), "function" == typeof i && jQuery(o).one("YTPChanged", function () {
                i(o)
            }), jQuery(o).on("YTPEnd", function () {
                n = "undefined" == typeof n ? !0 : n, jQuery(o).playNext(n)
            }), this
        },
        playNext: function (t) {
            var e = this.get(0);
            return e.checkForStartAt && (clearTimeout(e.checkForStartAt), clearInterval(e.getState)), e.videoCounter++, e.videoCounter >= e.videoLength && t && (e.videoCounter = 0), e.videoCounter < e.videoLength ? jQuery(e).YTPChangeMovie(e.videos[e.videoCounter]) : e.videoCounter--, this
        },
        playPrev: function () {
            var t = this.get(0);
            return t.checkForStartAt && (clearInterval(t.checkForStartAt), clearInterval(t.getState)), t.videoCounter--, t.videoCounter < 0 && (t.videoCounter = t.videoLength - 1), jQuery(t).YTPChangeMovie(t.videos[t.videoCounter]), this
        },
        playIndex: function (t) {
            var e = this.get(0);
            return t -= 1, e.checkForStartAt && (clearInterval(e.checkForStartAt), clearInterval(e.getState)), e.videoCounter = t, e.videoCounter >= e.videoLength - 1 && (e.videoCounter = e.videoLength - 1), jQuery(e).YTPChangeMovie(e.videos[e.videoCounter]), this
        },
        changeMovie: function (t) {
            var e = this, i = e.get(0);
            i.opt.startAt = 0, i.opt.stopAt = 0, i.opt.mask = !1, i.opt.mute = !0, i.hasData = !1, i.hasChanged = !0, i.player.loopTime = void 0, t && jQuery.extend(i.opt, t), i.videoID = getYTPVideoID(i.opt.videoURL).videoID, "true" == i.opt.loop && (i.opt.loop = 9999), jQuery(i.playerEl).CSSAnimate({opacity: 0}, i.opt.fadeOnStartTime, function () {
                var t = jQuery.Event("YTPChangeMovie");
                t.time = i.currentTime, t.videoId = i.videoID, jQuery(i).trigger(t), jQuery(i).YTPGetPlayer().cueVideoByUrl(encodeURI(jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/v/" + i.videoID), 1, i.opt.quality), jQuery(i).optimizeDisplay(), jQuery.mbYTPlayer.checkForState(i), jQuery.mbYTPlayer.getDataFromAPI(i)
            }), jQuery.mbYTPlayer.applyMask(i)
        },
        getPlayer: function () {
            return jQuery(this).get(0).player
        },
        playerDestroy: function () {
            var t = this.get(0);
            ytp.YTAPIReady = !0, ytp.backgroundIsInited = !1, t.isInit = !1, t.videoID = null, t.isReady = !1;
            var e = t.wrapper;
            return e.remove(), jQuery("#controlBar_" + t.id).remove(), clearInterval(t.checkForStartAt), clearInterval(t.getState), this
        },
        fullscreen: function (real) {
            function hideMouse() {
                YTPlayer.overlay.css({cursor: "none"})
            }

            function RunPrefixMethod(t, e) {
                for (var i, n, r = ["webkit", "moz", "ms", "o", ""], o = 0; o < r.length && !t[i];) {
                    if (i = e, "" == r[o] && (i = i.substr(0, 1).toLowerCase() + i.substr(1)), i = r[o] + i, n = typeof t[i], "undefined" != n) return r = [r[o]], "function" == n ? t[i]() : t[i];
                    o++
                }
            }

            function launchFullscreen(t) {
                RunPrefixMethod(t, "RequestFullScreen")
            }

            function cancelFullscreen() {
                (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) && RunPrefixMethod(document, "CancelFullScreen")
            }

            var YTPlayer = this.get(0);
            "undefined" == typeof real && (real = YTPlayer.opt.realfullscreen), real = eval(real);
            var controls = jQuery("#controlBar_" + YTPlayer.id), fullScreenBtn = controls.find(".mb_OnlyYT"),
                videoWrapper = YTPlayer.isSelf ? YTPlayer.opt.containment : YTPlayer.wrapper;
            if (real) {
                var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
                jQuery(document).off(fullscreenchange).on(fullscreenchange, function () {
                    var t = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");
                    t ? (jQuery(YTPlayer).YTPSetVideoQuality("default"), jQuery(YTPlayer).trigger("YTPFullScreenStart")) : (YTPlayer.isAlone = !1, fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), jQuery(YTPlayer).YTPSetVideoQuality(YTPlayer.opt.quality), videoWrapper.removeClass("YTPFullscreen"), videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({zIndex: 0}), YTPlayer.isBackground ? jQuery("body").after(controls) : YTPlayer.wrapper.before(controls), jQuery(window).resize(), jQuery(YTPlayer).trigger("YTPFullScreenEnd"))
                })
            }
            return YTPlayer.isAlone ? (jQuery(document).off("mousemove.YTPlayer"), clearTimeout(YTPlayer.hideCursor), YTPlayer.overlay.css({cursor: "auto"}), real ? cancelFullscreen() : (videoWrapper.CSSAnimate({opacity: YTPlayer.opt.opacity}, YTPlayer.opt.fadeOnStartTime), videoWrapper.css({zIndex: 0})), fullScreenBtn.html(jQuery.mbYTPlayer.controls.onlyYT), YTPlayer.isAlone = !1) : (jQuery(document).on("mousemove.YTPlayer", function (t) {
                YTPlayer.overlay.css({cursor: "auto"}), clearTimeout(YTPlayer.hideCursor), jQuery(t.target).parents().is(".mb_YTPBar") || (YTPlayer.hideCursor = setTimeout(hideMouse, 3e3))
            }), hideMouse(), real ? (videoWrapper.css({opacity: 0}), videoWrapper.addClass("YTPFullscreen"), launchFullscreen(videoWrapper.get(0)), setTimeout(function () {
                videoWrapper.CSSAnimate({opacity: 1}, 2 * YTPlayer.opt.fadeOnStartTime), YTPlayer.wrapper.append(controls), jQuery(YTPlayer).optimizeDisplay(), YTPlayer.player.seekTo(YTPlayer.player.getCurrentTime() + .1, !0)
            }, YTPlayer.opt.fadeOnStartTime)) : videoWrapper.css({zIndex: 1e4}).CSSAnimate({opacity: 1}, 2 * YTPlayer.opt.fadeOnStartTime), fullScreenBtn.html(jQuery.mbYTPlayer.controls.showSite), YTPlayer.isAlone = !0), this
        },
        toggleLoops: function () {
            var t = this.get(0), e = t.opt;
            return 1 == e.loop ? e.loop = 0 : (e.startAt ? t.player.seekTo(e.startAt) : t.player.playVideo(), e.loop = 1), this
        },
        play: function () {
            var t = this.get(0);
            if (!t.isReady) return this;
            t.player.playVideo(), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 4 * t.opt.fadeOnStartTime), jQuery(t.playerEl).CSSAnimate({opacity: 1}, 2 * t.opt.fadeOnStartTime);
            var e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPPlaypause");
            return i.html(jQuery.mbYTPlayer.controls.pause), t.state = 1, t.orig_background = jQuery(t).css("background-image"), this
        },
        togglePlay: function (t) {
            var e = this.get(0);
            return 1 == e.state ? this.YTPPause() : this.YTPPlay(), "function" == typeof t && t(e.state), this
        },
        stop: function () {
            var t = this.get(0), e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPPlaypause");
            return i.html(jQuery.mbYTPlayer.controls.play), t.player.stopVideo(), this
        },
        pause: function () {
            var t = this.get(0);
            return t.player.pauseVideo(), t.state = 2, this
        },
        seekTo: function (t) {
            var e = this.get(0);
            return e.player.seekTo(t, !0), this
        },
        setVolume: function (t) {
            var e = this.get(0);
            return t || e.opt.vol || 0 != e.player.getVolume() ? !t && e.player.getVolume() > 0 || t && e.opt.vol == t ? e.isMute ? jQuery(e).YTPUnmute() : jQuery(e).YTPMute() : (e.opt.vol = t, e.player.setVolume(e.opt.vol), e.volumeBar && e.volumeBar.length && e.volumeBar.updateSliderVal(t)) : jQuery(e).YTPUnmute(), this
        },
        toggleVolume: function () {
            var t = this.get(0);
            return t ? t.player.isMuted() ? (jQuery(t).YTPUnmute(), !0) : (jQuery(t).YTPMute(), !1) : void 0
        },
        mute: function () {
            var t = this.get(0);
            if (!t.isMute) {
                t.player.mute(), t.isMute = !0, t.player.setVolume(0), t.volumeBar && t.volumeBar.length && t.volumeBar.width() > 10 && t.volumeBar.updateSliderVal(0);
                var e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPMuteUnmute");
                i.html(jQuery.mbYTPlayer.controls.unmute), jQuery(t).addClass("isMuted"), t.volumeBar && t.volumeBar.length && t.volumeBar.addClass("muted");
                var n = jQuery.Event("YTPMuted");
                return n.time = t.currentTime, t.canTrigger && jQuery(t).trigger(n), this
            }
        },
        unmute: function () {
            var t = this.get(0);
            if (t.isMute) {
                t.player.unMute(), t.isMute = !1, t.player.setVolume(t.opt.vol), t.volumeBar && t.volumeBar.length && t.volumeBar.updateSliderVal(t.opt.vol > 10 ? t.opt.vol : 10);
                var e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPMuteUnmute");
                i.html(jQuery.mbYTPlayer.controls.mute), jQuery(t).removeClass("isMuted"), t.volumeBar && t.volumeBar.length && t.volumeBar.removeClass("muted");
                var n = jQuery.Event("YTPUnmuted");
                return n.time = t.currentTime, t.canTrigger && jQuery(t).trigger(n), this
            }
        },
        applyFilter: function (t, e) {
            return this.each(function () {
                var i = this;
                i.filters[t].value = e, i.filtersEnabled && jQuery(i).YTPEnableFilters()
            })
        },
        applyFilters: function (t) {
            return this.each(function () {
                var e = this;
                if (!e.isReady) return void jQuery(e).on("YTPReady", function () {
                    jQuery(e).YTPApplyFilters(t)
                });
                for (var i in t) jQuery(e).YTPApplyFilter(i, t[i]);
                jQuery(e).trigger("YTPFiltersApplied")
            })
        },
        toggleFilter: function (t, e) {
            return this.each(function () {
                var i = this;
                i.filters[t].value ? i.filters[t].value = 0 : i.filters[t].value = e, i.filtersEnabled && jQuery(this).YTPEnableFilters()
            })
        },
        toggleFilters: function (t) {
            return this.each(function () {
                var e = this;
                e.filtersEnabled ? (jQuery(e).trigger("YTPDisableFilters"), jQuery(e).YTPDisableFilters()) : (jQuery(e).YTPEnableFilters(), jQuery(e).trigger("YTPEnableFilters")), "function" == typeof t && t(e.filtersEnabled)
            })
        },
        disableFilters: function () {
            return this.each(function () {
                var t = this, e = jQuery(t.playerEl);
                e.css("-webkit-filter", ""), e.css("filter", ""), t.filtersEnabled = !1
            })
        },
        enableFilters: function () {
            return this.each(function () {
                var t = this, e = jQuery(t.playerEl), i = "";
                for (var n in t.filters) t.filters[n].value && (i += n.replace("_", "-") + "(" + t.filters[n].value + t.filters[n].unit + ") ");
                e.css("-webkit-filter", i), e.css("filter", i), t.filtersEnabled = !0
            })
        },
        removeFilter: function (t, e) {
            return this.each(function () {
                var i = this;
                if ("function" == typeof t && (e = t, t = null), t) jQuery(this).YTPApplyFilter(t, 0), "function" == typeof e && e(t); else for (var n in i.filters) jQuery(this).YTPApplyFilter(n, 0), "function" == typeof e && e(n)
            })
        },
        getFilters: function () {
            var t = this.get(0);
            return t.filters
        },
        addMask: function (t) {
            var e = this.get(0), i = e.overlay;
            t || (t = e.actualMask);
            var n = jQuery("<img/>").attr("src", t).on("load", function () {
                i.CSSAnimate({opacity: 0}, e.opt.fadeOnStartTime, function () {
                    e.hasMask = !0, n.remove(), i.css({
                        backgroundImage: "url(" + t + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }), i.CSSAnimate({opacity: 1}, e.opt.fadeOnStartTime)
                })
            });
            return this
        },
        removeMask: function () {
            var t = this.get(0), e = t.overlay;
            return e.CSSAnimate({opacity: 0}, t.opt.fadeOnStartTime, function () {
                t.hasMask = !1, e.css({
                    backgroundImage: "",
                    backgroundRepeat: "",
                    backgroundPosition: "",
                    backgroundSize: ""
                }), e.CSSAnimate({opacity: 1}, t.opt.fadeOnStartTime)
            }), this
        },
        applyMask: function (t) {
            var e = jQuery(t);
            if (e.off("YTPTime.mask"), t.opt.mask) if ("string" == typeof t.opt.mask) e.YTPAddMask(t.opt.mask), t.actualMask = t.opt.mask; else if ("object" == typeof t.opt.mask) {
                for (var i in t.opt.mask) t.opt.mask[i] && jQuery("<img/>").attr("src", t.opt.mask[i]);
                t.opt.mask[0] && e.YTPAddMask(t.opt.mask[0]), e.on("YTPTime.mask", function (i) {
                    for (var n in t.opt.mask) i.time == n && (t.opt.mask[n] ? (e.YTPAddMask(t.opt.mask[n]), t.actualMask = t.opt.mask[n]) : e.YTPRemoveMask())
                })
            }
        },
        toggleMask: function () {
            var t = this.get(0), e = $(t);
            return t.hasMask ? e.YTPRemoveMask() : e.YTPAddMask(), this
        },
        manageProgress: function () {
            var t = this.get(0), e = jQuery("#controlBar_" + t.id), i = e.find(".mb_YTPProgress"),
                n = e.find(".mb_YTPLoaded"), r = e.find(".mb_YTPseekbar"), o = i.outerWidth(),
                s = Math.floor(t.player.getCurrentTime()), a = Math.floor(t.player.getDuration()), l = s * o / a, u = 0,
                c = 100 * t.player.getVideoLoadedFraction();
            return n.css({left: u, width: c + "%"}), r.css({left: 0, width: l}), {totalTime: a, currentTime: s}
        },
        buildControls: function (YTPlayer) {
            var data = YTPlayer.opt;
            if (data.showYTLogo = data.showYTLogo || data.printUrl, !jQuery("#controlBar_" + YTPlayer.id).length) {
                YTPlayer.controlBar = jQuery("<span/>").attr("id", "controlBar_" + YTPlayer.id).addClass("mb_YTPBar").css({
                    whiteSpace: "noWrap",
                    position: YTPlayer.isBackground ? "fixed" : "absolute",
                    zIndex: YTPlayer.isBackground ? 1e4 : 1e3
                }).hide();
                var buttonBar = jQuery("<div/>").addClass("buttonBar"),
                    playpause = jQuery("<span>" + jQuery.mbYTPlayer.controls.play + "</span>").addClass("mb_YTPPlaypause ytpicon").click(function () {
                        1 == YTPlayer.player.getPlayerState() ? jQuery(YTPlayer).YTPPause() : jQuery(YTPlayer).YTPPlay()
                    }),
                    MuteUnmute = jQuery("<span>" + jQuery.mbYTPlayer.controls.mute + "</span>").addClass("mb_YTPMuteUnmute ytpicon").click(function () {
                        0 == YTPlayer.player.getVolume() ? jQuery(YTPlayer).YTPUnmute() : jQuery(YTPlayer).YTPMute()
                    }), volumeBar = jQuery("<div/>").addClass("mb_YTPVolumeBar").css({display: "inline-block"});
                YTPlayer.volumeBar = volumeBar;
                var idx = jQuery("<span/>").addClass("mb_YTPTime"), vURL = data.videoURL ? data.videoURL : "";
                vURL.indexOf("http") < 0 && (vURL = jQuery.mbYTPlayer.locationProtocol + "//www.youtube.com/watch?v=" + data.videoURL);
                var movieUrl = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.ytLogo).addClass("mb_YTPUrl ytpicon").attr("title", "view on YouTube").on("click", function () {
                        window.open(vURL, "viewOnYT")
                    }),
                    onlyVideo = jQuery("<span/>").html(jQuery.mbYTPlayer.controls.onlyYT).addClass("mb_OnlyYT ytpicon").on("click", function () {
                        jQuery(YTPlayer).YTPFullscreen(data.realfullscreen)
                    }),
                    progressBar = jQuery("<div/>").addClass("mb_YTPProgress").css("position", "absolute").click(function (t) {
                        timeBar.css({width: t.clientX - timeBar.offset().left}), YTPlayer.timeW = t.clientX - timeBar.offset().left, YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0});
                        var e = Math.floor(YTPlayer.player.getDuration());
                        YTPlayer["goto"] = timeBar.outerWidth() * e / progressBar.outerWidth(), YTPlayer.player.seekTo(parseFloat(YTPlayer["goto"]), !0), YTPlayer.controlBar.find(".mb_YTPLoaded").css({width: 0})
                    }), loadedBar = jQuery("<div/>").addClass("mb_YTPLoaded").css("position", "absolute"),
                    timeBar = jQuery("<div/>").addClass("mb_YTPseekbar").css("position", "absolute");
                progressBar.append(loadedBar).append(timeBar), buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx), data.showYTLogo && buttonBar.append(movieUrl), (YTPlayer.isBackground || eval(YTPlayer.opt.realfullscreen) && !YTPlayer.isBackground) && buttonBar.append(onlyVideo), YTPlayer.controlBar.append(buttonBar).append(progressBar), YTPlayer.isBackground ? jQuery("body").after(YTPlayer.controlBar) : (YTPlayer.controlBar.addClass("inlinePlayer"), YTPlayer.wrapper.before(YTPlayer.controlBar)), volumeBar.simpleSlider({
                    initialval: YTPlayer.opt.vol,
                    scale: 100,
                    orientation: "h",
                    callback: function (t) {
                        0 == t.value ? jQuery(YTPlayer).YTPMute() : jQuery(YTPlayer).YTPUnmute(), YTPlayer.player.setVolume(t.value), YTPlayer.isMute || (YTPlayer.opt.vol = t.value)
                    }
                })
            }
        },
        checkForState: function (YTPlayer) {
            var interval = YTPlayer.opt.showControls ? 100 : 400;
            return clearInterval(YTPlayer.getState), jQuery.contains(document, YTPlayer) ? (jQuery.mbYTPlayer.checkForStart(YTPlayer), void(YTPlayer.getState = setInterval(function () {
                var prog = jQuery(YTPlayer).YTPManageProgress(), $YTPlayer = jQuery(YTPlayer), data = YTPlayer.opt,
                    startAt = YTPlayer.opt.startAt ? YTPlayer.start_from_last ? YTPlayer.start_from_last : YTPlayer.opt.startAt : 1;
                YTPlayer.start_from_last = null;
                var stopAt = YTPlayer.opt.stopAt > YTPlayer.opt.startAt ? YTPlayer.opt.stopAt : 0;
                if (stopAt = stopAt < YTPlayer.player.getDuration() ? stopAt : 0, YTPlayer.currentTime != prog.currentTime) {
                    var YTPEvent = jQuery.Event("YTPTime");
                    YTPEvent.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(YTPEvent)
                }
                if (YTPlayer.currentTime = prog.currentTime, YTPlayer.totalTime = YTPlayer.player.getDuration(), 0 == YTPlayer.player.getVolume() ? $YTPlayer.addClass("isMuted") : $YTPlayer.removeClass("isMuted"), YTPlayer.opt.showControls && (prog.totalTime ? YTPlayer.controlBar.find(".mb_YTPTime").html(jQuery.mbYTPlayer.formatTime(prog.currentTime) + " / " + jQuery.mbYTPlayer.formatTime(prog.totalTime)) : YTPlayer.controlBar.find(".mb_YTPTime").html("-- : -- / -- : --")), eval(YTPlayer.opt.stopMovieOnBlur) && (document.hasFocus() ? document.hasFocus() && !YTPlayer.hasFocus && -1 != YTPlayer.state && 0 != YTPlayer.state && (YTPlayer.hasFocus = !0, $YTPlayer.YTPPlay()) : 1 == YTPlayer.state && (YTPlayer.hasFocus = !1, $YTPlayer.YTPPause())), YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() <= 400 && !YTPlayer.isCompact ? (YTPlayer.controlBar.addClass("compact"), YTPlayer.isCompact = !0, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)) : YTPlayer.controlBar.length && YTPlayer.controlBar.outerWidth() > 400 && YTPlayer.isCompact && (YTPlayer.controlBar.removeClass("compact"), YTPlayer.isCompact = !1, !YTPlayer.isMute && YTPlayer.volumeBar && YTPlayer.volumeBar.updateSliderVal(YTPlayer.opt.vol)), 1 == YTPlayer.player.getPlayerState() && (parseFloat(YTPlayer.player.getDuration() - .5) < YTPlayer.player.getCurrentTime() || stopAt > 0 && parseFloat(YTPlayer.player.getCurrentTime()) > stopAt)) {
                    if (YTPlayer.isEnded) return;
                    if (YTPlayer.isEnded = !0, setTimeout(function () {
                            YTPlayer.isEnded = !1
                        }, 1e3), YTPlayer.isPlayList) {
                        if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) {
                            YTPlayer.player.loopTime = void 0, clearInterval(YTPlayer.getState);
                            var YTPEnd = jQuery.Event("YTPEnd");
                            return YTPEnd.time = YTPlayer.currentTime, void jQuery(YTPlayer).trigger(YTPEnd)
                        }
                    } else if (!data.loop || data.loop > 0 && YTPlayer.player.loopTime === data.loop - 1) return YTPlayer.player.loopTime = void 0, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), void YTPlayer.wrapper.CSSAnimate({opacity: 0}, YTPlayer.opt.fadeOnStartTime, function () {
                        YTPlayer.controlBar.length && YTPlayer.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                        var t = jQuery.Event("YTPEnd");
                        t.time = YTPlayer.currentTime, jQuery(YTPlayer).trigger(t), YTPlayer.player.seekTo(startAt, !0), YTPlayer.isBackground ? YTPlayer.orig_background && jQuery(YTPlayer).css("background-image", YTPlayer.orig_background) : YTPlayer.opt.backgroundUrl && YTPlayer.isPlayer && (YTPlayer.opt.backgroundUrl = YTPlayer.opt.backgroundUrl || YTPlayer.orig_background, YTPlayer.opt.containment.css({
                            background: "url(" + YTPlayer.opt.backgroundUrl + ") center center",
                            backgroundSize: "cover"
                        }))
                    });
                    YTPlayer.player.loopTime = YTPlayer.player.loopTime ? ++YTPlayer.player.loopTime : 1, startAt = startAt || 1, YTPlayer.preventTrigger = !0, YTPlayer.state = 2, jQuery(YTPlayer).YTPPause(), YTPlayer.player.seekTo(startAt, !0), $YTPlayer.YTPPlay()
                }
            }, interval))) : (jQuery(YTPlayer).YTPPlayerDestroy(), clearInterval(YTPlayer.getState), void clearInterval(YTPlayer.checkForStartAt))
        },
        getTime: function () {
            var t = this.get(0);
            return jQuery.mbYTPlayer.formatTime(t.currentTime)
        },
        getTotalTime: function () {
            var t = this.get(0);
            return jQuery.mbYTPlayer.formatTime(t.totalTime)
        },
        checkForStart: function (t) {
            var e = jQuery(t);
            if (!jQuery.contains(document, t)) return void jQuery(t).YTPPlayerDestroy();
            if (t.preventTrigger = !0, t.state = 2, jQuery(t).YTPPause(), jQuery(t).muteYTPVolume(), jQuery("#controlBar_" + t.id).remove(), t.controlBar = !1, t.opt.showControls && jQuery.mbYTPlayer.buildControls(t), t.opt.addRaster) {
                var i = "dot" == t.opt.addRaster ? "raster-dot" : "raster";
                t.overlay.addClass(t.isRetina ? i + " retina" : i)
            } else t.overlay.removeClass(function (t, e) {
                var i = e.split(" "), n = [];
                return jQuery.each(i, function (t, e) {
                    /raster.*/.test(e) && n.push(e)
                }), n.push("retina"), n.join(" ")
            });
            var n = t.opt.startAt ? t.start_from_last ? t.start_from_last : t.opt.startAt : 1;
            t.start_from_last = null, t.player.playVideo(), t.player.seekTo(n, !0), t.checkForStartAt = setInterval(function () {
                jQuery(t).YTPMute();
                var i = t.player.getVideoLoadedFraction() >= n / t.player.getDuration();
                if (t.player.getDuration() > 0 && t.player.getCurrentTime() >= n && i) {
                    clearInterval(t.checkForStartAt), "function" == typeof t.opt.onReady && t.opt.onReady(t), t.isReady = !0;
                    var r = jQuery.Event("YTPReady");
                    if (r.time = t.currentTime, jQuery(t).trigger(r), t.preventTrigger = !0, t.state = 2, jQuery(t).YTPPause(), t.opt.mute || jQuery(t).YTPUnmute(), t.canTrigger = !0, t.opt.autoPlay) {
                        var o = jQuery.Event("YTPStart");
                        o.time = t.currentTime, jQuery(t).trigger(o), jQuery(t.playerEl).CSSAnimate({opacity: 1}, 1e3), e.YTPPlay(), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, 2 * t.opt.fadeOnStartTime), "mac" == jQuery.browser.os.name && jQuery.browser.safari && jQuery.browser.versionCompare(jQuery.browser.fullVersion, "10.1") < 0 && (t.safariPlay = setInterval(function () {
                            1 != t.state ? e.YTPPlay() : clearInterval(t.safariPlay)
                        }, 10)), e.one("YTPReady", function () {
                            e.YTPPlay()
                        })
                    } else t.player.pauseVideo(), t.isPlayer || (jQuery(t.playerEl).CSSAnimate({opacity: 1}, t.opt.fadeOnStartTime), t.wrapper.CSSAnimate({opacity: t.isAlone ? 1 : t.opt.opacity}, t.opt.fadeOnStartTime)), t.controlBar.length && t.controlBar.find(".mb_YTPPlaypause").html(jQuery.mbYTPlayer.controls.play);
                    t.isPlayer && !t.opt.autoPlay && t.loading && t.loading.length && (t.loading.html("Ready"), setTimeout(function () {
                        t.loading.fadeOut()
                    }, 100)), t.controlBar && t.controlBar.length && t.controlBar.slideDown(1e3)
                } else "mac" == jQuery.browser.os.name && jQuery.browser.safari && jQuery.browser.fullVersion && jQuery.browser.versionCompare(jQuery.browser.fullVersion, "10.1") < 0 && (t.player.playVideo(), n >= 0 && t.player.seekTo(n, !0))
            }, 10)
        },
        setAnchor: function (t) {
            var e = this;
            e.optimizeDisplay(t)
        },
        getAnchor: function () {
            var t = this.get(0);
            return t.opt.anchor
        },
        formatTime: function (t) {
            var e = Math.floor(t / 60), i = Math.floor(t - 60 * e);
            return (9 >= e ? "0" + e : e) + " : " + (9 >= i ? "0" + i : i)
        }
    }, jQuery.fn.optimizeDisplay = function (anchor) {
        var YTPlayer = this.get(0), playerBox = jQuery(YTPlayer.playerEl), vid = {};
        YTPlayer.opt.anchor = anchor || YTPlayer.opt.anchor, YTPlayer.opt.anchor = "undefined " != typeof YTPlayer.opt.anchor ? YTPlayer.opt.anchor : "center,center";
        var YTPAlign = YTPlayer.opt.anchor.split(",");
        if (YTPlayer.opt.optimizeDisplay) {
            var abundance = YTPlayer.isPlayer ? 0 : 80, win = {}, el = YTPlayer.wrapper;
            win.width = el.outerWidth(), win.height = el.outerHeight() + abundance, YTPlayer.opt.ratio = eval(YTPlayer.opt.ratio), vid.width = win.width, vid.height = Math.ceil(vid.width / YTPlayer.opt.ratio), vid.marginTop = Math.ceil(-((vid.height - win.height) / 2)), vid.marginLeft = 0;
            var lowest = vid.height < win.height;
            lowest && (vid.height = win.height, vid.width = Math.ceil(vid.height * YTPlayer.opt.ratio), vid.marginTop = 0, vid.marginLeft = Math.ceil(-((vid.width - win.width) / 2)));
            for (var a in YTPAlign) if (YTPAlign.hasOwnProperty(a)) {
                var al = YTPAlign[a].replace(/ /g, "");
                switch (al) {
                    case"top":
                        vid.marginTop = lowest ? -((vid.height - win.height) / 2) : 0;
                        break;
                    case"bottom":
                        vid.marginTop = lowest ? 0 : -(vid.height - win.height);
                        break;
                    case"left":
                        vid.marginLeft = 0;
                        break;
                    case"right":
                        vid.marginLeft = lowest ? -(vid.width - win.width) : 0;
                        break;
                    default:
                        vid.width > win.width && (vid.marginLeft = -((vid.width - win.width) / 2))
                }
            }
        } else vid.width = "100%", vid.height = "100%", vid.marginTop = 0, vid.marginLeft = 0;
        playerBox.css({
            width: vid.width,
            height: vid.height,
            marginTop: vid.marginTop,
            marginLeft: vid.marginLeft,
            maxWidth: "initial"
        })
    }, jQuery.shuffle = function (t) {
        for (var e = t.slice(), i = e.length, n = i; n--;) {
            var r = parseInt(Math.random() * i), o = e[n];
            e[n] = e[r], e[r] = o
        }
        return e
    }, jQuery.fn.unselectable = function () {
        return this.each(function () {
            jQuery(this).css({
                "-moz-user-select": "none",
                "-webkit-user-select": "none",
                "user-select": "none"
            }).attr("unselectable", "on")
        })
    }, jQuery.fn.YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.YTPGetPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.YTPGetVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.YTPChangeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.YTPPlayerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.YTPPlay = jQuery.mbYTPlayer.play, jQuery.fn.YTPTogglePlay = jQuery.mbYTPlayer.togglePlay, jQuery.fn.YTPStop = jQuery.mbYTPlayer.stop, jQuery.fn.YTPPause = jQuery.mbYTPlayer.pause, jQuery.fn.YTPSeekTo = jQuery.mbYTPlayer.seekTo, jQuery.fn.YTPlaylist = jQuery.mbYTPlayer.playlist, jQuery.fn.YTPPlayNext = jQuery.mbYTPlayer.playNext, jQuery.fn.YTPPlayPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.YTPPlayIndex = jQuery.mbYTPlayer.playIndex, jQuery.fn.YTPMute = jQuery.mbYTPlayer.mute, jQuery.fn.YTPUnmute = jQuery.mbYTPlayer.unmute, jQuery.fn.YTPToggleVolume = jQuery.mbYTPlayer.toggleVolume, jQuery.fn.YTPSetVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.YTPGetVideoData = jQuery.mbYTPlayer.getVideoData, jQuery.fn.YTPFullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.YTPToggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.YTPSetVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.YTPManageProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPApplyFilter = jQuery.mbYTPlayer.applyFilter, jQuery.fn.YTPApplyFilters = jQuery.mbYTPlayer.applyFilters, jQuery.fn.YTPToggleFilter = jQuery.mbYTPlayer.toggleFilter, jQuery.fn.YTPToggleFilters = jQuery.mbYTPlayer.toggleFilters, jQuery.fn.YTPRemoveFilter = jQuery.mbYTPlayer.removeFilter, jQuery.fn.YTPDisableFilters = jQuery.mbYTPlayer.disableFilters, jQuery.fn.YTPEnableFilters = jQuery.mbYTPlayer.enableFilters, jQuery.fn.YTPGetFilters = jQuery.mbYTPlayer.getFilters, jQuery.fn.YTPGetTime = jQuery.mbYTPlayer.getTime, jQuery.fn.YTPGetTotalTime = jQuery.mbYTPlayer.getTotalTime, jQuery.fn.YTPAddMask = jQuery.mbYTPlayer.addMask, jQuery.fn.YTPRemoveMask = jQuery.mbYTPlayer.removeMask, jQuery.fn.YTPToggleMask = jQuery.mbYTPlayer.toggleMask, jQuery.fn.YTPSetAnchor = jQuery.mbYTPlayer.setAnchor, jQuery.fn.YTPGetAnchor = jQuery.mbYTPlayer.getAnchor, jQuery.fn.mb_YTPlayer = jQuery.mbYTPlayer.buildPlayer, jQuery.fn.playNext = jQuery.mbYTPlayer.playNext, jQuery.fn.playPrev = jQuery.mbYTPlayer.playPrev, jQuery.fn.changeMovie = jQuery.mbYTPlayer.changeMovie, jQuery.fn.getVideoID = jQuery.mbYTPlayer.getVideoID, jQuery.fn.getPlayer = jQuery.mbYTPlayer.getPlayer, jQuery.fn.playerDestroy = jQuery.mbYTPlayer.playerDestroy, jQuery.fn.fullscreen = jQuery.mbYTPlayer.fullscreen, jQuery.fn.buildYTPControls = jQuery.mbYTPlayer.buildControls, jQuery.fn.playYTP = jQuery.mbYTPlayer.play, jQuery.fn.toggleLoops = jQuery.mbYTPlayer.toggleLoops, jQuery.fn.stopYTP = jQuery.mbYTPlayer.stop, jQuery.fn.pauseYTP = jQuery.mbYTPlayer.pause, jQuery.fn.seekToYTP = jQuery.mbYTPlayer.seekTo, jQuery.fn.muteYTPVolume = jQuery.mbYTPlayer.mute, jQuery.fn.unmuteYTPVolume = jQuery.mbYTPlayer.unmute, jQuery.fn.setYTPVolume = jQuery.mbYTPlayer.setVolume, jQuery.fn.setVideoQuality = jQuery.mbYTPlayer.setVideoQuality, jQuery.fn.manageYTPProgress = jQuery.mbYTPlayer.manageProgress, jQuery.fn.YTPGetDataFromFeed = jQuery.mbYTPlayer.getVideoData
}(jQuery, ytp), jQuery.support.CSStransition = function () {
    var t = document.body || document.documentElement, e = t.style;
    return void 0 !== e.transition || void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.MsTransition || void 0 !== e.OTransition
}(), jQuery.CSS = {
    name: "mb.CSSAnimate",
    author: "Matteo Bicocchi",
    version: "2.0.0",
    transitionEnd: "transitionEnd",
    sfx: "",
    filters: {
        blur: {min: 0, max: 100, unit: "px"},
        brightness: {min: 0, max: 400, unit: "%"},
        contrast: {min: 0, max: 400, unit: "%"},
        grayscale: {min: 0, max: 100, unit: "%"},
        hueRotate: {min: 0, max: 360, unit: "deg"},
        invert: {min: 0, max: 100, unit: "%"},
        saturate: {min: 0, max: 400, unit: "%"},
        sepia: {min: 0, max: 100, unit: "%"}
    },
    normalizeCss: function (t) {
        var e = jQuery.extend(!0, {}, t);
        jQuery.browser.webkit || jQuery.browser.opera ? jQuery.CSS.sfx = "-webkit-" : jQuery.browser.mozilla ? jQuery.CSS.sfx = "-moz-" : jQuery.browser.msie && (jQuery.CSS.sfx = "-ms-");
        for (var i in e) {
            "transform" === i && (e[jQuery.CSS.sfx + "transform"] = e[i], delete e[i]), "transform-origin" === i && (e[jQuery.CSS.sfx + "transform-origin"] = t[i], delete e[i]), "filter" !== i || jQuery.browser.mozilla || (e[jQuery.CSS.sfx + "filter"] = t[i], delete e[i]), "blur" === i && setFilter(e, "blur", t[i]), "brightness" === i && setFilter(e, "brightness", t[i]), "contrast" === i && setFilter(e, "contrast", t[i]), "grayscale" === i && setFilter(e, "grayscale", t[i]), "hueRotate" === i && setFilter(e, "hueRotate", t[i]), "invert" === i && setFilter(e, "invert", t[i]), "saturate" === i && setFilter(e, "saturate", t[i]), "sepia" === i && setFilter(e, "sepia", t[i]);
            var n = "";
            "x" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateX(" + setUnit(t[i], "px") + ")", delete e[i]), "y" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateY(" + setUnit(t[i], "px") + ")", delete e[i]), "z" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " translateZ(" + setUnit(t[i], "px") + ")", delete e[i]), "rotate" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotate(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateX(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateY(" + setUnit(t[i], "deg") + ")", delete e[i]), "rotateZ" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " rotateZ(" + setUnit(t[i], "deg") + ")", delete e[i]), "scale" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scale(" + setUnit(t[i], "") + ")", delete e[i]), "scaleX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleX(" + setUnit(t[i], "") + ")", delete e[i]), "scaleY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleY(" + setUnit(t[i], "") + ")", delete e[i]), "scaleZ" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " scaleZ(" + setUnit(t[i], "") + ")", delete e[i]), "skew" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skew(" + setUnit(t[i], "deg") + ")", delete e[i]), "skewX" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skewX(" + setUnit(t[i], "deg") + ")", delete e[i]), "skewY" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " skewY(" + setUnit(t[i], "deg") + ")", delete e[i]), "perspective" === i && (n = jQuery.CSS.sfx + "transform", e[n] = e[n] || "", e[n] += " perspective(" + setUnit(t[i], "px") + ")", delete e[i])
        }
        return e
    },
    getProp: function (t) {
        var e = [];
        for (var i in t) e.indexOf(i) < 0 && e.push(uncamel(i));
        return e.join(",")
    },
    animate: function (t, e, i, n, r) {
        return this.each(function () {
            function o() {
                s.called = !0, s.CSSAIsRunning = !1, a.off(jQuery.CSS.transitionEnd + "." + s.id), clearTimeout(s.timeout), a.css(jQuery.CSS.sfx + "transition", ""), "function" == typeof r && r.apply(s), "function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)
            }

            var s = this, a = jQuery(this);
            s.id = s.id || "CSSA_" + (new Date).getTime();
            var l = l || {type: "noEvent"};
            if (s.CSSAIsRunning && s.eventType == l.type && !jQuery.browser.msie && jQuery.browser.version <= 9) return void(s.CSSqueue = function () {
                a.CSSAnimate(t, e, i, n, r)
            });
            if (s.CSSqueue = null, s.eventType = l.type, 0 !== a.length && t) {
                if (t = jQuery.normalizeCss(t), s.CSSAIsRunning = !0, "function" == typeof e && (r = e, e = jQuery.fx.speeds._default), "function" == typeof i && (n = i, i = 0), "string" == typeof i && (r = i, i = 0), "function" == typeof n && (r = n, n = "cubic-bezier(0.65,0.03,0.36,0.72)"), "string" == typeof e) for (var u in jQuery.fx.speeds) {
                    if (e == u) {
                        e = jQuery.fx.speeds[u];
                        break
                    }
                    e = jQuery.fx.speeds._default
                }
                if (e || (e = jQuery.fx.speeds._default), "string" == typeof r && (n = r, r = null), !jQuery.support.CSStransition) {
                    for (var c in t) {
                        if ("transform" === c && delete t[c], "filter" === c && delete t[c], "transform-origin" === c && delete t[c], "auto" === t[c] && delete t[c], "x" === c) {
                            var d = t[c], h = "left";
                            t[h] = d, delete t[c]
                        }
                        if ("y" === c) {
                            var d = t[c], h = "top";
                            t[h] = d, delete t[c]
                        }
                        ("-ms-transform" === c || "-ms-filter" === c) && delete t[c]
                    }
                    return void a.delay(i).animate(t, e, r)
                }
                var p = {
                    "default": "ease",
                    "in": "ease-in",
                    out: "ease-out",
                    "in-out": "ease-in-out",
                    snap: "cubic-bezier(0,1,.5,1)",
                    easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
                    easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
                    easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
                    easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
                    easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
                    easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
                    easeOutExpo: "cubic-bezier(.19,1,.22,1)",
                    easeInOutExpo: "cubic-bezier(1,0,0,1)",
                    easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
                    easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
                    easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
                    easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
                    easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
                    easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
                    easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
                    easeOutQuint: "cubic-bezier(.23,1,.32,1)",
                    easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
                    easeInSine: "cubic-bezier(.47,0,.745,.715)",
                    easeOutSine: "cubic-bezier(.39,.575,.565,1)",
                    easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
                    easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
                    easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
                    easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
                };
                p[n] && (n = p[n]), a.off(jQuery.CSS.transitionEnd + "." + s.id);
                var f = jQuery.CSS.getProp(t), m = {};
                jQuery.extend(m, t), m[jQuery.CSS.sfx + "transition-property"] = f, m[jQuery.CSS.sfx + "transition-duration"] = e + "ms", m[jQuery.CSS.sfx + "transition-delay"] = i + "ms", m[jQuery.CSS.sfx + "transition-timing-function"] = n, setTimeout(function () {
                    a.one(jQuery.CSS.transitionEnd + "." + s.id, o), a.css(m)
                }, 1), s.timeout = setTimeout(function () {
                    return s.called || !r ? (s.called = !1, void(s.CSSAIsRunning = !1)) : (a.css(jQuery.CSS.sfx + "transition", ""), r.apply(s), s.CSSAIsRunning = !1, void("function" == typeof s.CSSqueue && (s.CSSqueue(), s.CSSqueue = null)))
                }, e + i + 10)
            }
        })
    }
}, jQuery.fn.CSSAnimate = jQuery.CSS.animate, jQuery.normalizeCss = jQuery.CSS.normalizeCss, jQuery.fn.css3 = function (t) {
    return this.each(function () {
        var e = jQuery(this), i = jQuery.normalizeCss(t);
        e.css(i)
    })
};
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
    var isTouchSupported = function () {
        var t = nAgt.msMaxTouchPoints, e = "ontouchstart" in document.createElement("div");
        return !(!t && !e)
    };
    jQuery.browser = {}, jQuery.browser.mozilla = !1, jQuery.browser.webkit = !1, jQuery.browser.opera = !1, jQuery.browser.safari = !1, jQuery.browser.chrome = !1, jQuery.browser.androidStock = !1, jQuery.browser.msie = !1, jQuery.browser.edge = !1;
    var getOS = function () {
        var t = {version: "Unknown version", name: "Unknown OS"};
        return -1 != navigator.appVersion.indexOf("Win") && (t.name = "Windows"), -1 == navigator.appVersion.indexOf("Mac") || navigator.appVersion.indexOf("Mobile") || (t.name = "Mac"), -1 != navigator.appVersion.indexOf("Linux") && (t.name = "Linux"), t.name = t.name.toLowerCase(), "mac" == t.name && (t.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1], t.version = t.version.replace(/_/g, ".").substring(0, 5)), "windows" == t.name && (t.version = "Unknown.Unknown"), /Windows NT 5.1/.test(nAgt) && (t.version = "5.1"), /Windows NT 6.0/.test(nAgt) && (t.version = "6.0"), /Windows NT 6.1/.test(nAgt) && (t.version = "6.1"), /Windows NT 6.2/.test(nAgt) && (t.version = "6.2"), /Windows NT 10.0/.test(nAgt) && (t.version = "10.0"), /Linux/.test(nAgt) && /Linux/.test(nAgt) && (t.version = "Unknown.Unknown"), t.major_version = "Unknown", t.minor_version = "Unknown", "Unknown.Unknown" != t.version && (t.major_version = parseFloat(t.version.split(".")[0]), t.minor_version = parseFloat(t.version.split(".")[1])), t
    };
    jQuery.browser.ua = nAgt, jQuery.browser.os = getOS(), jQuery.browser.hasTouch = isTouchSupported(), jQuery.browser.name = navigator.appName, jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if (-1 != (verOffset = nAgt.indexOf("Opera"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("OPR"))) jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 4); else if (-1 != (verOffset = nAgt.indexOf("MSIE"))) jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
        jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer";
        var start = nAgt.indexOf("rv:") + 3, end = start + 4;
        jQuery.browser.fullVersion = nAgt.substring(start, end)
    } else -1 != (verOffset = nAgt.indexOf("Edge")) ? (jQuery.browser.edge = !0, jQuery.browser.name = "Microsoft Edge", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5)) : -1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 < nAgt.indexOf("mozilla/5.0") && -1 < nAgt.indexOf("android ") && -1 < nAgt.indexOf("applewebkit") && !(-1 < nAgt.indexOf("chrome")) ? (verOffset = nAgt.indexOf("Chrome"), jQuery.browser.webkit = !0, jQuery.browser.androidStock = !0, jQuery.browser.name = "androidStock", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
    -1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), -1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix)), jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10), isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10)), jQuery.browser.version = jQuery.browser.majorVersion, jQuery.browser.android = /Android/i.test(nAgt), jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt), jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt), jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt), jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt), jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt), jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle, jQuery.isMobile = jQuery.browser.mobile, jQuery.isTablet = jQuery.browser.mobile && 765 < jQuery(window).width(), jQuery.isAndroidDefault = jQuery.browser.android && !/chrome/i.test(nAgt)
}
jQuery.browser.versionCompare = function (t, e) {
    if ("stringstring" != typeof t + typeof e) return !1;
    for (var i = t.split("."), n = e.split("."), r = 0, o = Math.max(i.length, n.length); o > r; r++) {
        if (i[r] && !n[r] && 0 < parseInt(i[r]) || parseInt(i[r]) > parseInt(n[r])) return 1;
        if (n[r] && !i[r] && 0 < parseInt(n[r]) || parseInt(i[r]) < parseInt(n[r])) return -1
    }
    return 0
}, function (t) {
    t.simpleSlider = {
        defaults: {initialval: 0, scale: 100, orientation: "h", readonly: !1, callback: !1},
        events: {
            start: t.browser.mobile ? "touchstart" : "mousedown",
            end: t.browser.mobile ? "touchend" : "mouseup",
            move: t.browser.mobile ? "touchmove" : "mousemove"
        },
        init: function (e) {
            return this.each(function () {
                var i = this, n = t(i);
                n.addClass("simpleSlider"), i.opt = {}, t.extend(i.opt, t.simpleSlider.defaults, e), t.extend(i.opt, n.data());
                var r = "h" == i.opt.orientation ? "horizontal" : "vertical",
                    r = t("<div/>").addClass("level").addClass(r);
                n.prepend(r), i.level = r, n.css({cursor: "default"}), "auto" == i.opt.scale && (i.opt.scale = t(i).outerWidth()), n.updateSliderVal(), i.opt.readonly || (n.on(t.simpleSlider.events.start, function (e) {
                    t.browser.mobile && (e = e.changedTouches[0]), i.canSlide = !0, n.updateSliderVal(e), "h" == i.opt.orientation ? n.css({cursor: "col-resize"}) : n.css({cursor: "row-resize"}), e.preventDefault(), e.stopPropagation()
                }), t(document).on(t.simpleSlider.events.move, function (e) {
                    t.browser.mobile && (e = e.changedTouches[0]), i.canSlide && (t(document).css({cursor: "default"}), n.updateSliderVal(e), e.preventDefault(), e.stopPropagation())
                }).on(t.simpleSlider.events.end, function () {
                    t(document).css({cursor: "auto"}), i.canSlide = !1, n.css({cursor: "auto"})
                }))
            })
        },
        updateSliderVal: function (e) {
            var i = this.get(0);
            if (i.opt) {
                i.opt.initialval = "number" == typeof i.opt.initialval ? i.opt.initialval : i.opt.initialval(i);
                var n = t(i).outerWidth(), r = t(i).outerHeight();
                i.x = "object" == typeof e ? e.clientX + document.body.scrollLeft - this.offset().left : "number" == typeof e ? e * n / i.opt.scale : i.opt.initialval * n / i.opt.scale, i.y = "object" == typeof e ? e.clientY + document.body.scrollTop - this.offset().top : "number" == typeof e ? (i.opt.scale - i.opt.initialval - e) * r / i.opt.scale : i.opt.initialval * r / i.opt.scale, i.y = this.outerHeight() - i.y, i.scaleX = i.x * i.opt.scale / n, i.scaleY = i.y * i.opt.scale / r, i.outOfRangeX = i.scaleX > i.opt.scale ? i.scaleX - i.opt.scale : 0 > i.scaleX ? i.scaleX : 0, i.outOfRangeY = i.scaleY > i.opt.scale ? i.scaleY - i.opt.scale : 0 > i.scaleY ? i.scaleY : 0, i.outOfRange = "h" == i.opt.orientation ? i.outOfRangeX : i.outOfRangeY, i.value = "undefined" != typeof e ? "h" == i.opt.orientation ? i.x >= this.outerWidth() ? i.opt.scale : 0 >= i.x ? 0 : i.scaleX : i.y >= this.outerHeight() ? i.opt.scale : 0 >= i.y ? 0 : i.scaleY : "h" == i.opt.orientation ? i.scaleX : i.scaleY, "h" == i.opt.orientation ? i.level.width(Math.floor(100 * i.x / n) + "%") : i.level.height(Math.floor(100 * i.y / r)), "function" == typeof i.opt.callback && i.opt.callback(i)
            }
        }
    }, t.fn.simpleSlider = t.simpleSlider.init, t.fn.updateSliderVal = t.simpleSlider.updateSliderVal
}(jQuery), function (t) {
    t.mbCookie = {
        set: function (t, e, i, n) {
            "object" == typeof e && (e = JSON.stringify(e)), i || (i = 7), n = n ? "; domain=" + n : "";
            var r = new Date;
            r.setTime(r.getTime() + 864e5 * i), i = "; expires=" + r.toGMTString(), document.cookie = t + "=" + e + i + "; path=/" + n
        }, get: function (t) {
            t += "=";
            for (var e = document.cookie.split(";"), i = 0; i < e.length; i++) {
                for (var n = e[i]; " " == n.charAt(0);) n = n.substring(1, n.length);
                if (0 == n.indexOf(t)) try {
                    return JSON.parse(n.substring(t.length, n.length))
                } catch (r) {
                    return n.substring(t.length, n.length)
                }
            }
            return null
        }, remove: function (e) {
            t.mbCookie.set(e, "", -1)
        }
    }, t.mbStorage = {
        set: function (t, e) {
            "object" == typeof e && (e = JSON.stringify(e)), localStorage.setItem(t, e)
        }, get: function (t) {
            if (!localStorage[t]) return null;
            try {
                return JSON.parse(localStorage[t])
            } catch (e) {
                return localStorage[t]
            }
        }, remove: function (t) {
            t ? localStorage.removeItem(t) : localStorage.clear()
        }
    }
}(jQuery), !function (t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(t.jQuery)
}(this, function (t) {
    "use strict";

    function e(e, r) {
        this.element = e, this.$element = t(this.element), this.options = t.extend({}, n, r), this._defaults = n, this._name = i, this.init()
    }

    var i = "scrolly", n = {bgParallax: !1};
    e.prototype.init = function () {
        var e = this;
        this.startPosition = this.$element.position().top, this.offsetTop = this.$element.offset().top, this.height = this.$element.outerHeight(!0), this.velocity = this.$element.attr("data-velocity"), this.bgStart = parseInt(this.$element.attr("data-fit"), 10), t(document).scroll(function () {
            e.didScroll = !0
        }), setInterval(function () {
            e.didScroll && (e.didScroll = !1, e.scrolly())
        }, 10)
    }, e.prototype.scrolly = function () {
        var e = t(window).scrollTop(), i = t(window).height(), n = this.startPosition;
        this.offsetTop >= e + i ? this.$element.addClass("scrolly-invisible") : n = this.$element.hasClass("scrolly-invisible") ? this.startPosition + (e + (i - this.offsetTop)) * this.velocity : this.startPosition + e * this.velocity, this.bgStart && (n += this.bgStart), this.options.bgParallax === !0 ? this.$element.css({backgroundPositionY: n + "px"}) : this.$element.css({top: n})
    }, t.fn[i] = function (n) {
        return this.each(function () {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(this, n))
        })
    }
}), !function (t) {
    t.fn.gMap = function (e, i) {
        switch (e) {
            case"addMarker":
                return t(this).trigger("gMap.addMarker", [i.latitude, i.longitude, i.content, i.icon, i.popup]);
            case"centerAt":
                return t(this).trigger("gMap.centerAt", [i.latitude, i.longitude, i.zoom]);
            case"clearMarkers":
                return t(this).trigger("gMap.clearMarkers")
        }
        var n = t.extend({}, t.fn.gMap.defaults, e);
        return this.each(function () {
            var e = new google.maps.Map(this);
            t(this).data("gMap.reference", e);
            var i = new google.maps.Geocoder;
            n.address ? i.geocode({address: n.address}, function (t) {
                t && t.length && e.setCenter(t[0].geometry.location)
            }) : n.latitude && n.longitude ? e.setCenter(new google.maps.LatLng(n.latitude, n.longitude)) : t.isArray(n.markers) && n.markers.length > 0 ? n.markers[0].address ? i.geocode({address: n.markers[0].address}, function (t) {
                t && t.length > 0 && e.setCenter(t[0].geometry.location)
            }) : e.setCenter(new google.maps.LatLng(n.markers[0].latitude, n.markers[0].longitude)) : e.setCenter(new google.maps.LatLng(34.885931, 9.84375)), e.setZoom(n.zoom), e.setMapTypeId(google.maps.MapTypeId[n.maptype]);
            var r = {scrollwheel: n.scrollwheel, disableDoubleClickZoom: !n.doubleclickzoom};
            n.controls === !1 ? t.extend(r, {disableDefaultUI: !0}) : 0 !== n.controls.length && t.extend(r, n.controls, {disableDefaultUI: !0}), e.setOptions(r), e.setOptions({styles: n.styles});
            var o, s, a = new google.maps.Marker;
            o = new google.maps.MarkerImage(n.icon.image), o.size = new google.maps.Size(n.icon.iconsize[0], n.icon.iconsize[1]), o.anchor = new google.maps.Point(n.icon.iconanchor[0], n.icon.iconanchor[1]), a.setIcon(o), n.icon.shadow && (s = new google.maps.MarkerImage(n.icon.shadow), s.size = new google.maps.Size(n.icon.shadowsize[0], n.icon.shadowsize[1]), s.anchor = new google.maps.Point(n.icon.shadowanchor[0], n.icon.shadowanchor[1]), a.setShadow(s)), t(this).bind("gMap.centerAt", function (t, i, n, r) {
                r && e.setZoom(r), e.panTo(new google.maps.LatLng(parseFloat(i), parseFloat(n)))
            });
            var l = [];
            t(this).bind("gMap.clearMarkers", function () {
                for (; l[0];) l.pop().setMap(null)
            });
            var u;
            t(this).bind("gMap.addMarker", function (t, i, r, o, s, c) {
                var d, h, p = new google.maps.LatLng(parseFloat(i), parseFloat(r)),
                    f = new google.maps.Marker({position: p});
                if (s ? (d = new google.maps.MarkerImage(s.image), d.size = new google.maps.Size(s.iconsize[0], s.iconsize[1]), d.anchor = new google.maps.Point(s.iconanchor[0], s.iconanchor[1]), f.setIcon(d), s.shadow && (h = new google.maps.MarkerImage(s.shadow), h.size = new google.maps.Size(s.shadowsize[0], s.shadowsize[1]), h.anchor = new google.maps.Point(s.shadowanchor[0], s.shadowanchor[1]), a.setShadow(h))) : (f.setIcon(a.getIcon()), f.setShadow(a.getShadow())), o) {
                    "_latlng" === o && (o = i + ", " + r);
                    var m = new google.maps.InfoWindow({content: n.html_prepend + o + n.html_append});
                    google.maps.event.addListener(f, "click", function () {
                        u && u.close(), m.open(e, f), u = m
                    }), c && google.maps.event.addListenerOnce(e, "tilesloaded", function () {
                        m.open(e, f)
                    })
                }
                f.setMap(e), l.push(f)
            });
            for (var c, d = this, h = function (e) {
                return function (i) {
                    i && i.length > 0 && t(d).trigger("gMap.addMarker", [i[0].geometry.location.lat(), i[0].geometry.location.lng(), e.html, e.icon, e.popup])
                }
            }, p = 0; p < n.markers.length; p++) c = n.markers[p], c.address ? ("_address" === c.html && (c.html = c.address), i.geocode({address: c.address}, h(c))) : t(this).trigger("gMap.addMarker", [c.latitude, c.longitude, c.html, c.icon, c.popup])
        })
    }, t.fn.gMap.defaults = {
        address: "",
        latitude: 0,
        longitude: 0,
        zoom: 1,
        markers: [],
        controls: [],
        styles: [],
        scrollwheel: !1,
        doubleclickzoom: !0,
        maptype: "ROADMAP",
        html_prepend: '<div class="gmap_marker">',
        html_append: "</div>",
        icon: {
            image: "http://www.google.com/mapfiles/marker.png",
            shadow: "http://www.google.com/mapfiles/shadow50.png",
            iconsize: [20, 34],
            shadowsize: [37, 34],
            iconanchor: [9, 34],
            shadowanchor: [6, 34]
        }
    }
}(jQuery), !function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function (t) {
    var e, i, n, r, o, s, a = "Close", l = "BeforeClose", u = "AfterClose", c = "BeforeAppend", d = "MarkupParse",
        h = "Open", p = "Change", f = "mfp", m = "." + f, g = "mfp-ready", y = "mfp-removing", v = "mfp-prevent-close",
        b = function () {
        }, T = !!window.jQuery, w = t(window), P = function (t, i) {
            e.ev.on(f + t + m, i)
        }, x = function (e, i, n, r) {
            var o = document.createElement("div");
            return o.className = "mfp-" + e, n && (o.innerHTML = n), r ? i && i.appendChild(o) : (o = t(o), i && o.appendTo(i)), o
        }, _ = function (i, n) {
            e.ev.triggerHandler(f + i, n), e.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), e.st.callbacks[i] && e.st.callbacks[i].apply(e, t.isArray(n) ? n : [n]))
        }, C = function (i) {
            return i === s && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), s = i), e.currTemplate.closeBtn
        }, S = function () {
            t.magnificPopup.instance || (e = new b, e.init(), t.magnificPopup.instance = e)
        }, j = function () {
            var t = document.createElement("p").style, e = ["ms", "O", "Moz", "Webkit"];
            if (void 0 !== t.transition) return !0;
            for (; e.length;) if (e.pop() + "Transition" in t) return !0;
            return !1
        };
    b.prototype = {
        constructor: b, init: function () {
            var i = navigator.appVersion;
            e.isLowIE = e.isIE8 = document.all && !document.addEventListener, e.isAndroid = /android/gi.test(i), e.isIOS = /iphone|ipad|ipod/gi.test(i), e.supportsTransition = j(), e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), n = t(document), e.popupsCache = {}
        }, open: function (i) {
            var r;
            if (i.isObj === !1) {
                e.items = i.items.toArray(), e.index = 0;
                var s, a = i.items;
                for (r = 0; r < a.length; r++) if (s = a[r], s.parsed && (s = s.el[0]), s === i.el[0]) {
                    e.index = r;
                    break
                }
            } else e.items = t.isArray(i.items) ? i.items : [i.items], e.index = i.index || 0;
            if (e.isOpen) return void e.updateItemHTML();
            e.types = [], o = "", i.mainEl && i.mainEl.length ? e.ev = i.mainEl.eq(0) : e.ev = n, i.key ? (e.popupsCache[i.key] || (e.popupsCache[i.key] = {}), e.currTemplate = e.popupsCache[i.key]) : e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, i), e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile : e.st.fixedContentPos, e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = x("bg").on("click" + m, function () {
                e.close()
            }), e.wrap = x("wrap").attr("tabindex", -1).on("click" + m, function (t) {
                e._checkIfClose(t.target) && e.close()
            }), e.container = x("container", e.wrap)), e.contentContainer = x("content"), e.st.preloader && (e.preloader = x("preloader", e.container, e.st.tLoading));
            var l = t.magnificPopup.modules;
            for (r = 0; r < l.length; r++) {
                var u = l[r];
                u = u.charAt(0).toUpperCase() + u.slice(1), e["init" + u].call(e)
            }
            _("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (P(d, function (t, e, i, n) {
                i.close_replaceWith = C(n.type)
            }), o += " mfp-close-btn-in") : e.wrap.append(C())), e.st.alignTop && (o += " mfp-align-top"), e.fixedContentPos ? e.wrap.css({
                overflow: e.st.overflowY,
                overflowX: "hidden",
                overflowY: e.st.overflowY
            }) : e.wrap.css({
                top: w.scrollTop(),
                position: "absolute"
            }), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
                height: n.height(),
                position: "absolute"
            }), e.st.enableEscapeKey && n.on("keyup" + m, function (t) {
                27 === t.keyCode && e.close()
            }), w.on("resize" + m, function () {
                e.updateSize()
            }), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
            var c = e.wH = w.height(), p = {};
            if (e.fixedContentPos && e._hasScrollBar(c)) {
                var f = e._getScrollbarSize();
                f && (p.marginRight = f)
            }
            e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") : p.overflow = "hidden");
            var y = e.st.mainClass;
            return e.isIE7 && (y += " mfp-ie7"), y && e._addClassToMFP(y), e.updateItemHTML(), _("BuildControls"), t("html").css(p), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), e._lastFocusedEl = document.activeElement, setTimeout(function () {
                e.content ? (e._addClassToMFP(g), e._setFocus()) : e.bgOverlay.addClass(g), n.on("focusin" + m, e._onFocusIn)
            }, 16), e.isOpen = !0, e.updateSize(c), _(h), i
        }, close: function () {
            e.isOpen && (_(l), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(y), setTimeout(function () {
                e._close()
            }, e.st.removalDelay)) : e._close())
        }, _close: function () {
            _(a);
            var i = y + " " + g + " ";
            if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (i += e.st.mainClass + " "), e._removeClassFromMFP(i), e.fixedContentPos) {
                var r = {marginRight: ""};
                e.isIE7 ? t("body, html").css("overflow", "") : r.overflow = "", t("html").css(r)
            }
            n.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), !e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), e.st.autoFocusLast && e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, e.currTemplate = null, e.prevHeight = 0, _(u)
        }, updateSize: function (t) {
            if (e.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth, n = window.innerHeight * i;
                e.wrap.css("height", n), e.wH = n
            } else e.wH = t || w.height();
            e.fixedContentPos || e.wrap.css("height", e.wH), _("Resize")
        }, updateItemHTML: function () {
            var i = e.items[e.index];
            e.contentContainer.detach(), e.content && e.content.detach(), i.parsed || (i = e.parseEl(e.index));
            var n = i.type;
            if (_("BeforeChange", [e.currItem ? e.currItem.type : "", n]), e.currItem = i, !e.currTemplate[n]) {
                var o = e.st[n] ? e.st[n].markup : !1;
                _("FirstMarkupParse", o), o ? e.currTemplate[n] = t(o) : e.currTemplate[n] = !0
            }
            r && r !== i.type && e.container.removeClass("mfp-" + r + "-holder");
            var s = e["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, e.currTemplate[n]);
            e.appendContent(s, n), i.preloaded = !0, _(p, i), r = i.type, e.container.prepend(e.contentContainer), _("AfterChange")
        }, appendContent: function (t, i) {
            e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[i] === !0 ? e.content.find(".mfp-close").length || e.content.append(C()) : e.content = t : e.content = "", _(c), e.container.addClass("mfp-" + i + "-holder"), e.contentContainer.append(e.content)
        }, parseEl: function (i) {
            var n, r = e.items[i];
            if (r.tagName ? r = {el: t(r)} : (n = r.type, r = {data: r, src: r.src}), r.el) {
                for (var o = e.types, s = 0; s < o.length; s++) if (r.el.hasClass("mfp-" + o[s])) {
                    n = o[s];
                    break
                }
                r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"))
            }
            return r.type = n || e.st.type || "inline", r.index = i, r.parsed = !0, e.items[i] = r, _("ElementParse", r), e.items[i]
        }, addGroup: function (t, i) {
            var n = function (n) {
                n.mfpEl = this, e._openClick(n, t, i)
            };
            i || (i = {});
            var r = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(r).on(r, n)) : (i.isObj = !1, i.delegate ? t.off(r).on(r, i.delegate, n) : (i.items = t, t.off(r).on(r, n)))
        }, _openClick: function (i, n, r) {
            var o = void 0 !== r.midClick ? r.midClick : t.magnificPopup.defaults.midClick;
            if (o || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var s = void 0 !== r.disableOn ? r.disableOn : t.magnificPopup.defaults.disableOn;
                if (s) if (t.isFunction(s)) {
                    if (!s.call(e)) return !0
                } else if (w.width() < s) return !0;
                i.type && (i.preventDefault(), e.isOpen && i.stopPropagation()), r.el = t(i.mfpEl), r.delegate && (r.items = n.find(r.delegate)), e.open(r)
            }
        }, updateStatus: function (t, n) {
            if (e.preloader) {
                i !== t && e.container.removeClass("mfp-s-" + i), n || "loading" !== t || (n = e.st.tLoading);
                var r = {status: t, text: n};
                _("UpdateStatus", r), t = r.status, n = r.text, e.preloader.html(n), e.preloader.find("a").on("click", function (t) {
                    t.stopImmediatePropagation()
                }), e.container.addClass("mfp-s-" + t), i = t
            }
        }, _checkIfClose: function (i) {
            if (!t(i).hasClass(v)) {
                var n = e.st.closeOnContentClick, r = e.st.closeOnBgClick;
                if (n && r) return !0;
                if (!e.content || t(i).hasClass("mfp-close") || e.preloader && i === e.preloader[0]) return !0;
                if (i === e.content[0] || t.contains(e.content[0], i)) {
                    if (n) return !0
                } else if (r && t.contains(document, i)) return !0;
                return !1
            }
        }, _addClassToMFP: function (t) {
            e.bgOverlay.addClass(t), e.wrap.addClass(t)
        }, _removeClassFromMFP: function (t) {
            this.bgOverlay.removeClass(t), e.wrap.removeClass(t)
        }, _hasScrollBar: function (t) {
            return (e.isIE7 ? n.height() : document.body.scrollHeight) > (t || w.height())
        }, _setFocus: function () {
            (e.st.focus ? e.content.find(e.st.focus).eq(0) : e.wrap).focus()
        }, _onFocusIn: function (i) {
            return i.target === e.wrap[0] || t.contains(e.wrap[0], i.target) ? void 0 : (e._setFocus(), !1)
        }, _parseMarkup: function (e, i, n) {
            var r;
            n.data && (i = t.extend(n.data, i)), _(d, [e, i, n]), t.each(i, function (i, n) {
                if (void 0 === n || n === !1) return !0;
                if (r = i.split("_"), r.length > 1) {
                    var o = e.find(m + "-" + r[0]);
                    if (o.length > 0) {
                        var s = r[1];
                        "replaceWith" === s ? o[0] !== n[0] && o.replaceWith(n) : "img" === s ? o.is("img") ? o.attr("src", n) : o.replaceWith(t("<img>").attr("src", n).attr("class", o.attr("class"))) : o.attr(r[1], n)
                    }
                } else e.find(m + "-" + i).html(n)
            })
        }, _getScrollbarSize: function () {
            if (void 0 === e.scrollbarSize) {
                var t = document.createElement("div");
                t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t)
            }
            return e.scrollbarSize
        }
    }, t.magnificPopup = {
        instance: null,
        proto: b.prototype,
        modules: [],
        open: function (e, i) {
            return S(), e = e ? t.extend(!0, {}, e) : {}, e.isObj = !0, e.index = i || 0, this.instance.open(e)
        },
        close: function () {
            return t.magnificPopup.instance && t.magnificPopup.instance.close()
        },
        registerModule: function (e, i) {
            i.options && (t.magnificPopup.defaults[e] = i.options), t.extend(this.proto, i.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, t.fn.magnificPopup = function (i) {
        S();
        var n = t(this);
        if ("string" == typeof i) if ("open" === i) {
            var r, o = T ? n.data("magnificPopup") : n[0].magnificPopup, s = parseInt(arguments[1], 10) || 0;
            o.items ? r = o.items[s] : (r = n, o.delegate && (r = r.find(o.delegate)), r = r.eq(s)), e._openClick({mfpEl: r}, n, o)
        } else e.isOpen && e[i].apply(e, Array.prototype.slice.call(arguments, 1)); else i = t.extend(!0, {}, i), T ? n.data("magnificPopup", i) : n[0].magnificPopup = i, e.addGroup(n, i);
        return n
    };
    var Y, k, I, Q = "inline", E = function () {
        I && (k.after(I.addClass(Y)).detach(), I = null)
    };
    t.magnificPopup.registerModule(Q, {
        options: {hiddenClass: "hide", markup: "", tNotFound: "Content not found"},
        proto: {
            initInline: function () {
                e.types.push(Q), P(a + "." + Q, function () {
                    E()
                })
            }, getInline: function (i, n) {
                if (E(), i.src) {
                    var r = e.st.inline, o = t(i.src);
                    if (o.length) {
                        var s = o[0].parentNode;
                        s && s.tagName && (k || (Y = r.hiddenClass, k = x(Y), Y = "mfp-" + Y), I = o.after(k).detach().removeClass(Y)), e.updateStatus("ready")
                    } else e.updateStatus("error", r.tNotFound), o = t("<div>");
                    return i.inlineElement = o, o
                }
                return e.updateStatus("ready"), e._parseMarkup(n, {}, i), n
            }
        }
    });
    var $, A = "ajax", D = function () {
        $ && t(document.body).removeClass($)
    }, z = function () {
        D(), e.req && e.req.abort()
    };
    t.magnificPopup.registerModule(A, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        }, proto: {
            initAjax: function () {
                e.types.push(A), $ = e.st.ajax.cursor, P(a + "." + A, z), P("BeforeChange." + A, z)
            }, getAjax: function (i) {
                $ && t(document.body).addClass($), e.updateStatus("loading");
                var n = t.extend({
                    url: i.src, success: function (n, r, o) {
                        var s = {data: n, xhr: o};
                        _("ParseAjax", s), e.appendContent(t(s.data), A), i.finished = !0, D(), e._setFocus(), setTimeout(function () {
                            e.wrap.addClass(g)
                        }, 16), e.updateStatus("ready"), _("AjaxContentAdded")
                    }, error: function () {
                        D(), i.finished = i.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", i.src))
                    }
                }, e.st.ajax.settings);
                return e.req = t.ajax(n), ""
            }
        }
    });
    var O, M = function (i) {
        if (i.data && void 0 !== i.data.title) return i.data.title;
        var n = e.st.image.titleSrc;
        if (n) {
            if (t.isFunction(n)) return n.call(e, i);
            if (i.el) return i.el.attr(n) || ""
        }
        return ""
    };
    t.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        }, proto: {
            initImage: function () {
                var i = e.st.image, n = ".image";
                e.types.push("image"), P(h + n, function () {
                    "image" === e.currItem.type && i.cursor && t(document.body).addClass(i.cursor)
                }), P(a + n, function () {
                    i.cursor && t(document.body).removeClass(i.cursor), w.off("resize" + m)
                }), P("Resize" + n, e.resizeImage), e.isLowIE && P("AfterChange", e.resizeImage)
            }, resizeImage: function () {
                var t = e.currItem;
                if (t && t.img && e.st.image.verticalFit) {
                    var i = 0;
                    e.isLowIE && (i = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), t.img.css("max-height", e.wH - i)
                }
            }, _onImageHasSize: function (t) {
                t.img && (t.hasSize = !0, O && clearInterval(O), t.isCheckingImgSize = !1, _("ImageHasSize", t), t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1))
            }, findImageSize: function (t) {
                var i = 0, n = t.img[0], r = function (o) {
                    O && clearInterval(O), O = setInterval(function () {
                        return n.naturalWidth > 0 ? void e._onImageHasSize(t) : (i > 200 && clearInterval(O), i++, void(3 === i ? r(10) : 40 === i ? r(50) : 100 === i && r(500)))
                    }, o)
                };
                r(1)
            }, getImage: function (i, n) {
                var r = 0, o = function () {
                    i && (i.img[0].complete ? (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, _("ImageLoadComplete")) : (r++, 200 > r ? setTimeout(o, 100) : s()))
                }, s = function () {
                    i && (i.img.off(".mfploader"), i === e.currItem && (e._onImageHasSize(i), e.updateStatus("error", a.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
                }, a = e.st.image, l = n.find(".mfp-img");
                if (l.length) {
                    var u = document.createElement("img");
                    u.className = "mfp-img", i.el && i.el.find("img").length && (u.alt = i.el.find("img").attr("alt")), i.img = t(u).on("load.mfploader", o).on("error.mfploader", s), u.src = i.src, l.is("img") && (i.img = i.img.clone()), u = i.img[0], u.naturalWidth > 0 ? i.hasSize = !0 : u.width || (i.hasSize = !1)
                }
                return e._parseMarkup(n, {
                    title: M(i),
                    img_replaceWith: i.img
                }, i), e.resizeImage(), i.hasSize ? (O && clearInterval(O), i.loadError ? (n.addClass("mfp-loading"), e.updateStatus("error", a.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), e.updateStatus("ready")), n) : (e.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, n.addClass("mfp-loading"), e.findImageSize(i)), n)
            }
        }
    });
    var L, R = function () {
        return void 0 === L && (L = void 0 !== document.createElement("p").style.MozTransform), L
    };
    t.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (t) {
                return t.is("img") ? t : t.find("img")
            }
        }, proto: {
            initZoom: function () {
                var t, i = e.st.zoom, n = ".zoom";
                if (i.enabled && e.supportsTransition) {
                    var r, o, s = i.duration, u = function (t) {
                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            n = "all " + i.duration / 1e3 + "s " + i.easing, r = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            }, o = "transition";
                        return r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[o] = n, e.css(r), e
                    }, c = function () {
                        e.content.css("visibility", "visible")
                    };
                    P("BuildControls" + n, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), !t) return void c();
                            o = u(t), o.css(e._getOffset()), e.wrap.append(o), r = setTimeout(function () {
                                o.css(e._getOffset(!0)), r = setTimeout(function () {
                                    c(), setTimeout(function () {
                                        o.remove(), t = o = null, _("ZoomAnimationEnded")
                                    }, 16)
                                }, s)
                            }, 16)
                        }
                    }), P(l + n, function () {
                        if (e._allowZoom()) {
                            if (clearTimeout(r), e.st.removalDelay = s, !t) {
                                if (t = e._getItemToZoom(), !t) return;
                                o = u(t)
                            }
                            o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), setTimeout(function () {
                                o.css(e._getOffset())
                            }, 16)
                        }
                    }), P(a + n, function () {
                        e._allowZoom() && (c(), o && o.remove(), t = null)
                    })
                }
            }, _allowZoom: function () {
                return "image" === e.currItem.type
            }, _getItemToZoom: function () {
                return e.currItem.hasSize ? e.currItem.img : !1
            }, _getOffset: function (i) {
                var n;
                n = i ? e.currItem.img : e.st.zoom.opener(e.currItem.el || e.currItem);
                var r = n.offset(), o = parseInt(n.css("padding-top"), 10), s = parseInt(n.css("padding-bottom"), 10);
                r.top -= t(window).scrollTop() - o;
                var a = {width: n.width(), height: (T ? n.innerHeight() : n[0].offsetHeight) - s - o};
                return R() ? a["-moz-transform"] = a.transform = "translate(" + r.left + "px," + r.top + "px)" : (a.left = r.left, a.top = r.top), a
            }
        }
    });
    var F = "iframe", B = "//about:blank", N = function (t) {
        if (e.currTemplate[F]) {
            var i = e.currTemplate[F].find("iframe");
            i.length && (t || (i[0].src = B), e.isIE8 && i.css("display", t ? "block" : "none"))
        }
    };
    t.magnificPopup.registerModule(F, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1"},
                vimeo: {index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1"},
                gmaps: {index: "//maps.google.", src: "%id%&output=embed"}
            }
        }, proto: {
            initIframe: function () {
                e.types.push(F), P("BeforeChange", function (t, e, i) {
                    e !== i && (e === F ? N() : i === F && N(!0))
                }), P(a + "." + F, function () {
                    N()
                })
            }, getIframe: function (i, n) {
                var r = i.src, o = e.st.iframe;
                t.each(o.patterns, function () {
                    return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) : this.id.call(this, r)), r = this.src.replace("%id%", r), !1) : void 0
                });
                var s = {};
                return o.srcAction && (s[o.srcAction] = r), e._parseMarkup(n, s, i), e.updateStatus("ready"), n
            }
        }
    });
    var W = function (t) {
        var i = e.items.length;
        return t > i - 1 ? t - i : 0 > t ? i + t : t
    }, V = function (t, e, i) {
        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
    };
    t.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        }, proto: {
            initGallery: function () {
                var i = e.st.gallery, r = ".mfp-gallery";
                return e.direction = !0, i && i.enabled ? (o += " mfp-gallery", P(h + r, function () {
                    i.navigateByImgClick && e.wrap.on("click" + r, ".mfp-img", function () {
                        return e.items.length > 1 ? (e.next(), !1) : void 0
                    }), n.on("keydown" + r, function (t) {
                        37 === t.keyCode ? e.prev() : 39 === t.keyCode && e.next()
                    })
                }), P("UpdateStatus" + r, function (t, i) {
                    i.text && (i.text = V(i.text, e.currItem.index, e.items.length))
                }), P(d + r, function (t, n, r, o) {
                    var s = e.items.length;
                    r.counter = s > 1 ? V(i.tCounter, o.index, s) : ""
                }), P("BuildControls" + r, function () {
                    if (e.items.length > 1 && i.arrows && !e.arrowLeft) {
                        var n = i.arrowMarkup,
                            r = e.arrowLeft = t(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(v),
                            o = e.arrowRight = t(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(v);
                        r.click(function () {
                            e.prev()
                        }), o.click(function () {
                            e.next()
                        }), e.container.append(r.add(o))
                    }
                }), P(p + r, function () {
                    e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function () {
                        e.preloadNearbyImages(), e._preloadTimeout = null
                    }, 16)
                }), void P(a + r, function () {
                    n.off(r), e.wrap.off("click" + r), e.arrowRight = e.arrowLeft = null
                })) : !1
            }, next: function () {
                e.direction = !0, e.index = W(e.index + 1), e.updateItemHTML()
            }, prev: function () {
                e.direction = !1, e.index = W(e.index - 1), e.updateItemHTML()
            }, goTo: function (t) {
                e.direction = t >= e.index, e.index = t, e.updateItemHTML()
            }, preloadNearbyImages: function () {
                var t, i = e.st.gallery.preload, n = Math.min(i[0], e.items.length), r = Math.min(i[1], e.items.length);
                for (t = 1; t <= (e.direction ? r : n); t++) e._preloadItem(e.index + t);
                for (t = 1; t <= (e.direction ? n : r); t++) e._preloadItem(e.index - t)
            }, _preloadItem: function (i) {
                if (i = W(i), !e.items[i].preloaded) {
                    var n = e.items[i];
                    n.parsed || (n = e.parseEl(i)), _("LazyLoad", n), "image" === n.type && (n.img = t('<img class="mfp-img" />').on("load.mfploader", function () {
                        n.hasSize = !0
                    }).on("error.mfploader", function () {
                        n.hasSize = !0, n.loadError = !0, _("LazyLoadError", n)
                    }).attr("src", n.src)), n.preloaded = !0
                }
            }
        }
    });
    var H = "retina";
    t.magnificPopup.registerModule(H, {
        options: {
            replaceSrc: function (t) {
                return t.src.replace(/\.\w+$/, function (t) {
                    return "@2x" + t
                })
            }, ratio: 1
        }, proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var t = e.st.retina, i = t.ratio;
                    i = isNaN(i) ? i() : i, i > 1 && (P("ImageHasSize." + H, function (t, e) {
                        e.img.css({"max-width": e.img[0].naturalWidth / i, width: "100%"})
                    }), P("ElementParse." + H, function (e, n) {
                        n.src = t.replaceSrc(n, i)
                    }))
                }
            }
        }
    }), S()
}), !function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
}(function (t) {
    function e(t) {
        return a.raw ? t : encodeURIComponent(t)
    }

    function i(t) {
        return a.raw ? t : decodeURIComponent(t)
    }

    function n(t) {
        return e(a.json ? JSON.stringify(t) : String(t))
    }

    function r(t) {
        0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return t = decodeURIComponent(t.replace(s, " ")), a.json ? JSON.parse(t) : t
        } catch (e) {
        }
    }

    function o(e, i) {
        var n = a.raw ? e : r(e);
        return t.isFunction(i) ? i(n) : n
    }

    var s = /\+/g, a = t.cookie = function (r, s, l) {
        if (arguments.length > 1 && !t.isFunction(s)) {
            if (l = t.extend({}, a.defaults, l), "number" == typeof l.expires) {
                var u = l.expires, c = l.expires = new Date;
                c.setMilliseconds(c.getMilliseconds() + 864e5 * u)
            }
            return document.cookie = [e(r), "=", n(s), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
        }
        for (var d = r ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], p = 0, f = h.length; f > p; p++) {
            var m = h[p].split("="), g = i(m.shift()), y = m.join("=");
            if (r === g) {
                d = o(y, s);
                break
            }
            r || void 0 === (y = o(y)) || (d[g] = y)
        }
        return d
    };
    a.defaults = {}, t.removeCookie = function (e, i) {
        return t.cookie(e, "", t.extend({}, i, {expires: -1})), !t.cookie(e)
    }
}), !function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("undefined" != typeof jQuery ? jQuery : window.Zepto)
}(function (t) {
    "use strict";

    function e(e) {
        var i = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), t(e.target).ajaxSubmit(i))
    }

    function i(e) {
        var i = e.target, n = t(i);
        if (!n.is("[type=submit],[type=image]")) {
            var r = n.closest("[type=submit]");
            if (0 === r.length) return;
            i = r[0]
        }
        var o = this;
        if (o.clk = i, "image" == i.type) if (void 0 !== e.offsetX) o.clk_x = e.offsetX, o.clk_y = e.offsetY; else if ("function" == typeof t.fn.offset) {
            var s = n.offset();
            o.clk_x = e.pageX - s.left, o.clk_y = e.pageY - s.top
        } else o.clk_x = e.pageX - i.offsetLeft, o.clk_y = e.pageY - i.offsetTop;
        setTimeout(function () {
            o.clk = o.clk_x = o.clk_y = null
        }, 100)
    }

    function n() {
        if (t.fn.ajaxSubmit.debug) {
            var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
        }
    }

    var r = {};
    r.fileapi = void 0 !== t("<input type='file'/>").get(0).files, r.formdata = void 0 !== window.FormData;
    var o = !!t.fn.prop;
    t.fn.attr2 = function () {
        if (!o) return this.attr.apply(this, arguments);
        var t = this.prop.apply(this, arguments);
        return t && t.jquery || "string" == typeof t ? t : this.attr.apply(this, arguments)
    }, t.fn.ajaxSubmit = function (e) {
        function i(i) {
            var n, r, o = t.param(i, e.traditional).split("&"), s = o.length, a = [];
            for (n = 0; s > n; n++) o[n] = o[n].replace(/\+/g, " "), r = o[n].split("="), a.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
            return a
        }

        function s(n) {
            for (var r = new FormData, o = 0; o < n.length; o++) r.append(n[o].name, n[o].value);
            if (e.extraData) {
                var s = i(e.extraData);
                for (o = 0; o < s.length; o++) s[o] && r.append(s[o][0], s[o][1])
            }
            e.data = null;
            var a = t.extend(!0, {}, t.ajaxSettings, e, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: l || "POST"
            });
            e.uploadProgress && (a.xhr = function () {
                var i = t.ajaxSettings.xhr();
                return i.upload && i.upload.addEventListener("progress", function (t) {
                    var i = 0, n = t.loaded || t.position, r = t.total;
                    t.lengthComputable && (i = Math.ceil(n / r * 100)), e.uploadProgress(t, n, r, i)
                }, !1), i
            }), a.data = null;
            var u = a.beforeSend;
            return a.beforeSend = function (t, i) {
                i.data = e.formData ? e.formData : r, u && u.call(this, t, i)
            }, t.ajax(a)
        }

        function a(i) {
            function r(t) {
                var e = null;
                try {
                    t.contentWindow && (e = t.contentWindow.document)
                } catch (i) {
                    n("cannot get iframe.contentWindow document: " + i)
                }
                if (e) return e;
                try {
                    e = t.contentDocument ? t.contentDocument : t.document
                } catch (i) {
                    n("cannot get iframe.contentDocument: " + i), e = t.document
                }
                return e
            }

            function s() {
                function e() {
                    try {
                        var t = r(y).readyState;
                        n("state = " + t), t && "uninitialized" == t.toLowerCase() && setTimeout(e, 50)
                    } catch (i) {
                        n("Server abort: ", i, " (", i.name, ")"), a(S), P && clearTimeout(P), P = void 0
                    }
                }

                var i = d.attr2("target"), o = d.attr2("action"), s = "multipart/form-data",
                    u = d.attr("enctype") || d.attr("encoding") || s;
                x.setAttribute("target", f), (!l || /post/i.test(l)) && x.setAttribute("method", "POST"), o != h.url && x.setAttribute("action", h.url), h.skipEncodingOverride || l && !/post/i.test(l) || d.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), h.timeout && (P = setTimeout(function () {
                    w = !0, a(C)
                }, h.timeout));
                var c = [];
                try {
                    if (h.extraData) for (var p in h.extraData) h.extraData.hasOwnProperty(p) && c.push(t.isPlainObject(h.extraData[p]) && h.extraData[p].hasOwnProperty("name") && h.extraData[p].hasOwnProperty("value") ? t('<input type="hidden" name="' + h.extraData[p].name + '">').val(h.extraData[p].value).appendTo(x)[0] : t('<input type="hidden" name="' + p + '">').val(h.extraData[p]).appendTo(x)[0]);
                    h.iframeTarget || g.appendTo("body"), y.attachEvent ? y.attachEvent("onload", a) : y.addEventListener("load", a, !1), setTimeout(e, 15);
                    try {
                        x.submit()
                    } catch (m) {
                        var v = document.createElement("form").submit;
                        v.apply(x)
                    }
                } finally {
                    x.setAttribute("action", o), x.setAttribute("enctype", u), i ? x.setAttribute("target", i) : d.removeAttr("target"), t(c).remove()
                }
            }

            function a(e) {
                if (!v.aborted && !Q) {
                    if (I = r(y), I || (n("cannot access response document"), e = S), e === C && v) return v.abort("timeout"), void _.reject(v, "timeout");
                    if (e == S && v) return v.abort("server abort"), void _.reject(v, "error", "server abort");
                    if (I && I.location.href != h.iframeSrc || w) {
                        y.detachEvent ? y.detachEvent("onload", a) : y.removeEventListener("load", a, !1);
                        var i, o = "success";
                        try {
                            if (w) throw"timeout";
                            var s = "xml" == h.dataType || I.XMLDocument || t.isXMLDoc(I);
                            if (n("isXml=" + s), !s && window.opera && (null === I.body || !I.body.innerHTML) && --E) return n("requeing onLoad callback, DOM not available"), void setTimeout(a, 250);
                            var l = I.body ? I.body : I.documentElement;
                            v.responseText = l ? l.innerHTML : null, v.responseXML = I.XMLDocument ? I.XMLDocument : I, s && (h.dataType = "xml"), v.getResponseHeader = function (t) {
                                var e = {"content-type": h.dataType};
                                return e[t.toLowerCase()]
                            }, l && (v.status = Number(l.getAttribute("status")) || v.status, v.statusText = l.getAttribute("statusText") || v.statusText);
                            var u = (h.dataType || "").toLowerCase(), c = /(json|script|text)/.test(u);
                            if (c || h.textarea) {
                                var d = I.getElementsByTagName("textarea")[0];
                                if (d) v.responseText = d.value, v.status = Number(d.getAttribute("status")) || v.status, v.statusText = d.getAttribute("statusText") || v.statusText; else if (c) {
                                    var f = I.getElementsByTagName("pre")[0], m = I.getElementsByTagName("body")[0];
                                    f ? v.responseText = f.textContent ? f.textContent : f.innerText : m && (v.responseText = m.textContent ? m.textContent : m.innerText)
                                }
                            } else "xml" == u && !v.responseXML && v.responseText && (v.responseXML = $(v.responseText));
                            try {
                                k = D(v, u, h)
                            } catch (b) {
                                o = "parsererror", v.error = i = b || o
                            }
                        } catch (b) {
                            n("error caught: ", b), o = "error", v.error = i = b || o
                        }
                        v.aborted && (n("upload aborted"), o = null), v.status && (o = v.status >= 200 && v.status < 300 || 304 === v.status ? "success" : "error"), "success" === o ? (h.success && h.success.call(h.context, k, "success", v), _.resolve(v.responseText, "success", v), p && t.event.trigger("ajaxSuccess", [v, h])) : o && (void 0 === i && (i = v.statusText), h.error && h.error.call(h.context, v, o, i), _.reject(v, "error", i), p && t.event.trigger("ajaxError", [v, h, i])), p && t.event.trigger("ajaxComplete", [v, h]), p && !--t.active && t.event.trigger("ajaxStop"), h.complete && h.complete.call(h.context, v, o), Q = !0, h.timeout && clearTimeout(P), setTimeout(function () {
                            h.iframeTarget ? g.attr("src", h.iframeSrc) : g.remove(), v.responseXML = null
                        }, 100)
                    }
                }
            }

            var u, c, h, p, f, g, y, v, b, T, w, P, x = d[0], _ = t.Deferred();
            if (_.abort = function (t) {
                    v.abort(t)
                }, i) for (c = 0; c < m.length; c++) u = t(m[c]), o ? u.prop("disabled", !1) : u.removeAttr("disabled");
            if (h = t.extend(!0, {}, t.ajaxSettings, e), h.context = h.context || h, f = "jqFormIO" + (new Date).getTime(), h.iframeTarget ? (g = t(h.iframeTarget), T = g.attr2("name"), T ? f = T : g.attr2("name", f)) : (g = t('<iframe name="' + f + '" src="' + h.iframeSrc + '" />'), g.css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                })), y = g[0], v = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {
                    },
                    getResponseHeader: function () {
                    },
                    setRequestHeader: function () {
                    },
                    abort: function (e) {
                        var i = "timeout" === e ? "timeout" : "aborted";
                        n("aborting upload... " + i), this.aborted = 1;
                        try {
                            y.contentWindow.document.execCommand && y.contentWindow.document.execCommand("Stop")
                        } catch (r) {
                        }
                        g.attr("src", h.iframeSrc), v.error = i, h.error && h.error.call(h.context, v, i, e), p && t.event.trigger("ajaxError", [v, h, i]), h.complete && h.complete.call(h.context, v, i)
                    }
                }, p = h.global, p && 0 === t.active++ && t.event.trigger("ajaxStart"), p && t.event.trigger("ajaxSend", [v, h]), h.beforeSend && h.beforeSend.call(h.context, v, h) === !1) return h.global && t.active--, _.reject(), _;
            if (v.aborted) return _.reject(), _;
            b = x.clk, b && (T = b.name, T && !b.disabled && (h.extraData = h.extraData || {}, h.extraData[T] = b.value, "image" == b.type && (h.extraData[T + ".x"] = x.clk_x, h.extraData[T + ".y"] = x.clk_y)));
            var C = 1, S = 2, j = t("meta[name=csrf-token]").attr("content"),
                Y = t("meta[name=csrf-param]").attr("content");
            Y && j && (h.extraData = h.extraData || {}, h.extraData[Y] = j), h.forceSync ? s() : setTimeout(s, 10);
            var k, I, Q, E = 50, $ = t.parseXML || function (t, e) {
                return window.ActiveXObject ? (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(t)) : e = (new DOMParser).parseFromString(t, "text/xml"), e && e.documentElement && "parsererror" != e.documentElement.nodeName ? e : null
            }, A = t.parseJSON || function (t) {
                return window.eval("(" + t + ")")
            }, D = function (e, i, n) {
                var r = e.getResponseHeader("content-type") || "", o = "xml" === i || !i && r.indexOf("xml") >= 0,
                    s = o ? e.responseXML : e.responseText;
                return o && "parsererror" === s.documentElement.nodeName && t.error && t.error("parsererror"), n && n.dataFilter && (s = n.dataFilter(s, i)), "string" == typeof s && ("json" === i || !i && r.indexOf("json") >= 0 ? s = A(s) : ("script" === i || !i && r.indexOf("javascript") >= 0) && t.globalEval(s)), s
            };
            return _
        }

        if (!this.length) return n("ajaxSubmit: skipping submit process - no element selected"), this;
        var l, u, c, d = this;
        "function" == typeof e ? e = {success: e} : void 0 === e && (e = {}), l = e.type || this.attr2("method"), u = e.url || this.attr2("action"), c = "string" == typeof u ? t.trim(u) : "", c = c || window.location.href || "", c && (c = (c.match(/^([^#]+)/) || [])[1]), e = t.extend(!0, {
            url: c,
            success: t.ajaxSettings.success,
            type: l || t.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, e);
        var h = {};
        if (this.trigger("form-pre-serialize", [this, e, h]), h.veto) return n("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (e.beforeSerialize && e.beforeSerialize(this, e) === !1) return n("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var p = e.traditional;
        void 0 === p && (p = t.ajaxSettings.traditional);
        var f, m = [], g = this.formToArray(e.semantic, m);
        if (e.data && (e.extraData = e.data, f = t.param(e.data, p)), e.beforeSubmit && e.beforeSubmit(g, this, e) === !1) return n("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [g, this, e, h]), h.veto) return n("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var y = t.param(g, p);
        f && (y = y ? y + "&" + f : f), "GET" == e.type.toUpperCase() ? (e.url += (e.url.indexOf("?") >= 0 ? "&" : "?") + y, e.data = null) : e.data = y;
        var v = [];
        if (e.resetForm && v.push(function () {
                d.resetForm()
            }), e.clearForm && v.push(function () {
                d.clearForm(e.includeHidden)
            }), !e.dataType && e.target) {
            var b = e.success || function () {
            };
            v.push(function (i) {
                var n = e.replaceTarget ? "replaceWith" : "html";
                t(e.target)[n](i).each(b, arguments)
            })
        } else e.success && v.push(e.success);
        if (e.success = function (t, i, n) {
                for (var r = e.context || this, o = 0, s = v.length; s > o; o++) v[o].apply(r, [t, i, n || d, d])
            }, e.error) {
            var T = e.error;
            e.error = function (t, i, n) {
                var r = e.context || this;
                T.apply(r, [t, i, n, d])
            }
        }
        if (e.complete) {
            var w = e.complete;
            e.complete = function (t, i) {
                var n = e.context || this;
                w.apply(n, [t, i, d])
            }
        }
        var P = t("input[type=file]:enabled", this).filter(function () {
                return "" !== t(this).val()
            }), x = P.length > 0, _ = "multipart/form-data", C = d.attr("enctype") == _ || d.attr("encoding") == _,
            S = r.fileapi && r.formdata;
        n("fileAPI :" + S);
        var j, Y = (x || C) && !S;
        e.iframe !== !1 && (e.iframe || Y) ? e.closeKeepAlive ? t.get(e.closeKeepAlive, function () {
            j = a(g)
        }) : j = a(g) : j = (x || C) && S ? s(g) : t.ajax(e), d.removeData("jqxhr").data("jqxhr", j);
        for (var k = 0; k < m.length; k++) m[k] = null;
        return this.trigger("form-submit-notify", [this, e]), this
    }, t.fn.ajaxForm = function (r) {
        if (r = r || {}, r.delegation = r.delegation && t.isFunction(t.fn.on), !r.delegation && 0 === this.length) {
            var o = {s: this.selector, c: this.context};
            return !t.isReady && o.s ? (n("DOM not ready, queuing ajaxForm"), t(function () {
                t(o.s, o.c).ajaxForm(r)
            }), this) : (n("terminating; zero elements found by selector" + (t.isReady ? "" : " (DOM not ready)")), this)
        }
        return r.delegation ? (t(document).off("submit.form-plugin", this.selector, e).off("click.form-plugin", this.selector, i).on("submit.form-plugin", this.selector, r, e).on("click.form-plugin", this.selector, r, i), this) : this.ajaxFormUnbind().bind("submit.form-plugin", r, e).bind("click.form-plugin", r, i)
    }, t.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin")
    }, t.fn.formToArray = function (e, i) {
        var n = [];
        if (0 === this.length) return n;
        var o, s = this[0], a = this.attr("id"), l = e ? s.getElementsByTagName("*") : s.elements;
        if (l && !/MSIE [678]/.test(navigator.userAgent) && (l = t(l).get()), a && (o = t(':input[form="' + a + '"]').get(), o.length && (l = (l || []).concat(o))), !l || !l.length) return n;
        var u, c, d, h, p, f, m;
        for (u = 0, f = l.length; f > u; u++) if (p = l[u], d = p.name, d && !p.disabled) if (e && s.clk && "image" == p.type) s.clk == p && (n.push({
            name: d,
            value: t(p).val(),
            type: p.type
        }), n.push({name: d + ".x", value: s.clk_x}, {
            name: d + ".y",
            value: s.clk_y
        })); else if (h = t.fieldValue(p, !0), h && h.constructor == Array) for (i && i.push(p), c = 0, m = h.length; m > c; c++) n.push({
            name: d,
            value: h[c]
        }); else if (r.fileapi && "file" == p.type) {
            i && i.push(p);
            var g = p.files;
            if (g.length) for (c = 0; c < g.length; c++) n.push({
                name: d,
                value: g[c],
                type: p.type
            }); else n.push({name: d, value: "", type: p.type})
        } else null !== h && "undefined" != typeof h && (i && i.push(p), n.push({
            name: d,
            value: h,
            type: p.type,
            required: p.required
        }));
        if (!e && s.clk) {
            var y = t(s.clk), v = y[0];
            d = v.name, d && !v.disabled && "image" == v.type && (n.push({
                name: d,
                value: y.val()
            }), n.push({name: d + ".x", value: s.clk_x}, {name: d + ".y", value: s.clk_y}))
        }
        return n
    }, t.fn.formSerialize = function (e) {
        return t.param(this.formToArray(e))
    }, t.fn.fieldSerialize = function (e) {
        var i = [];
        return this.each(function () {
            var n = this.name;
            if (n) {
                var r = t.fieldValue(this, e);
                if (r && r.constructor == Array) for (var o = 0, s = r.length; s > o; o++) i.push({
                    name: n,
                    value: r[o]
                }); else null !== r && "undefined" != typeof r && i.push({name: this.name, value: r})
            }
        }), t.param(i)
    }, t.fn.fieldValue = function (e) {
        for (var i = [], n = 0, r = this.length; r > n; n++) {
            var o = this[n], s = t.fieldValue(o, e);
            null === s || "undefined" == typeof s || s.constructor == Array && !s.length || (s.constructor == Array ? t.merge(i, s) : i.push(s))
        }
        return i
    }, t.fieldValue = function (e, i) {
        var n = e.name, r = e.type, o = e.tagName.toLowerCase();
        if (void 0 === i && (i = !0), i && (!n || e.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r) && !e.checked || ("submit" == r || "image" == r) && e.form && e.form.clk != e || "select" == o && -1 == e.selectedIndex)) return null;
        if ("select" == o) {
            var s = e.selectedIndex;
            if (0 > s) return null;
            for (var a = [], l = e.options, u = "select-one" == r, c = u ? s + 1 : l.length, d = u ? s : 0; c > d; d++) {
                var h = l[d];
                if (h.selected) {
                    var p = h.value;
                    if (p || (p = h.attributes && h.attributes.value && !h.attributes.value.specified ? h.text : h.value), u) return p;
                    a.push(p)
                }
            }
            return a
        }
        return t(e).val()
    }, t.fn.clearForm = function (e) {
        return this.each(function () {
            t("input,select,textarea", this).clearFields(e)
        })
    }, t.fn.clearFields = t.fn.clearInputs = function (e) {
        var i = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var n = this.type, r = this.tagName.toLowerCase();
            i.test(n) || "textarea" == r ? this.value = "" : "checkbox" == n || "radio" == n ? this.checked = !1 : "select" == r ? this.selectedIndex = -1 : "file" == n ? /MSIE/.test(navigator.userAgent) ? t(this).replaceWith(t(this).clone(!0)) : t(this).val("") : e && (e === !0 && /hidden/.test(n) || "string" == typeof e && t(this).is(e)) && (this.value = "")
        })
    }, t.fn.resetForm = function () {
        return this.each(function () {
            ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
        })
    }, t.fn.enable = function (t) {
        return void 0 === t && (t = !0), this.each(function () {
            this.disabled = !t
        })
    }, t.fn.selected = function (e) {
        return void 0 === e && (e = !0), this.each(function () {
            var i = this.type;
            if ("checkbox" == i || "radio" == i) this.checked = e; else if ("option" == this.tagName.toLowerCase()) {
                var n = t(this).parent("select");
                e && n[0] && "select-one" == n[0].type && n.find("option").selected(!1), this.selected = e
            }
        })
    }, t.fn.ajaxSubmit.debug = !1
}), !function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    t.extend(t.fn, {
        validate: function (e) {
            if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function (e) {
                function n() {
                    var n, r;
                    return i.settings.submitHandler ? (i.submitButton && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && n.remove(), void 0 !== r ? r : !1) : !0
                }

                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
            })), i)
        }, valid: function () {
            var e, i, n;
            return t(this[0]).is("form") ? e = this.validate().form() : (n = [], e = !0, i = t(this[0].form).validate(), this.each(function () {
                e = i.element(this) && e, n = n.concat(i.errorList)
            }), i.errorList = n), e
        }, rules: function (e, i) {
            var n, r, o, s, a, l, u = this[0];
            if (e) switch (n = t.data(u.form, "validator").settings, r = n.rules, o = t.validator.staticRules(u), e) {
                case"add":
                    t.extend(o, t.validator.normalizeRule(i)), delete o.messages, r[u.name] = o, i.messages && (n.messages[u.name] = t.extend(n.messages[u.name], i.messages));
                    break;
                case"remove":
                    return i ? (l = {}, t.each(i.split(/\s/), function (e, i) {
                        l[i] = o[i], delete o[i], "required" === i && t(u).removeAttr("aria-required")
                    }), l) : (delete r[u.name], o)
            }
            return s = t.validator.normalizeRules(t.extend({}, t.validator.classRules(u), t.validator.attributeRules(u), t.validator.dataRules(u), t.validator.staticRules(u)), u), s.required && (a = s.required, delete s.required, s = t.extend({required: a}, s), t(u).attr("aria-required", "true")), s.remote && (a = s.remote, delete s.remote, s = t.extend(s, {remote: a})), s
        }
    }), t.extend(t.expr[":"], {
        blank: function (e) {
            return !t.trim("" + t(e).val())
        }, filled: function (e) {
            return !!t.trim("" + t(e).val())
        }, unchecked: function (e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function (e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function (e, i) {
        return 1 === arguments.length ? function () {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (t) {
                this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            },
            onfocusout: function (t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function (e, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(e) || -1 !== t.inArray(i.keyCode, n) || (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function (t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function (e, i, n) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
            },
            unhighlight: function (e, i, n) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
            }
        },
        setDefaults: function (e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function e(e) {
                    var i = t.data(this.form, "validator"), n = "on" + e.type.replace(/^validate/, ""), r = i.settings;
                    r[n] && !t(this).is(r.ignore) && r[n].call(i, this, e)
                }

                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, n = this.groups = {};
                t.each(this.settings.groups, function (e, i) {
                    "string" == typeof i && (i = i.split(/\s/)), t.each(i, function (t, i) {
                        n[i] = e
                    })
                }), i = this.settings.rules, t.each(i, function (e, n) {
                    i[e] = t.validator.normalizeRule(n)
                }), t(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e), this.settings.invalidHandler && t(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function () {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                return this.valid()
            }, element: function (e) {
                var i = this.clean(e), n = this.validationTargetFor(i), r = !0;
                return this.lastElement = n, void 0 === n ? delete this.invalid[i.name] : (this.prepareElement(n), this.currentElements = t(n), r = this.check(n) !== !1, r ? delete this.invalid[n.name] : this.invalid[n.name] = !0), t(e).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            }, showErrors: function (e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e) this.errorList.push({message: e[i], element: this.findByName(i)[0]});
                    this.successList = t.grep(this.successList, function (t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors();
                var e, i = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight) for (e = 0; i[e]; e++) this.settings.unhighlight.call(this, i[e], this.settings.errorClass, ""); else i.removeClass(this.settings.errorClass)
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (t) {
                var e, i = 0;
                for (e in t) i++;
                return i
            }, hideErrors: function () {
                this.hideThese(this.toHide)
            }, hideThese: function (t) {
                t.not(this.containers).text(""), this.addWrapper(t).hide()
            }, valid: function () {
                return 0 === this.size()
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {
                }
            }, findLastActive: function () {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function (t) {
                    return t.element.name === e.name
                }).length && e
            }, elements: function () {
                var e = this, i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            }, clean: function (e) {
                return t(e)[0]
            }, errors: function () {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            }, reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            }, prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (t) {
                this.reset(), this.toHide = this.errorsFor(t)
            }, elementValue: function (e) {
                var i, n = t(e), r = e.type;
                return "radio" === r || "checkbox" === r ? this.findByName(e.name).filter(":checked").val() : "number" === r && "undefined" != typeof e.validity ? e.validity.badInput ? !1 : n.val() : (i = n.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            }, check: function (e) {
                e = this.validationTargetFor(this.clean(e));
                var i, n, r, o = t(e).rules(), s = t.map(o, function (t, e) {
                    return e
                }).length, a = !1, l = this.elementValue(e);
                for (n in o) {
                    r = {method: n, parameters: o[n]};
                    try {
                        if (i = t.validator.methods[n].call(this, l, e, r.parameters), "dependency-mismatch" === i && 1 === s) {
                            a = !0;
                            continue
                        }
                        if (a = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!i) return this.formatAndAdd(e, r), !1
                    } catch (u) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", u), u instanceof TypeError && (u.message += ".  Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method."), u
                    }
                }
                return a ? void 0 : (this.objectLength(o) && this.successList.push(e), !0)
            }, customDataMessage: function (e, i) {
                return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            }, customMessage: function (t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            }, findDefined: function () {
                for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t]
            }, defaultMessage: function (e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            }, formatAndAdd: function (e, i) {
                var n = this.defaultMessage(e, i.method), r = /\$?\{(\d+)\}/g;
                "function" == typeof n ? n = n.call(this, i.parameters, e) : r.test(n) && (n = t.validator.format(n.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                    message: n,
                    element: e,
                    method: i.method
                }), this.errorMap[e.name] = n, this.submitted[e.name] = n
            }, addWrapper: function (t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            }, defaultShowErrors: function () {
                var t, e, i;
                for (t = 0; this.errorList[t]; t++) i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                if (this.settings.unhighlight) for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return t(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (e, i) {
                var n, r, o, s = this.errorsFor(e), a = this.idOrName(e), l = t(e).attr("aria-describedby");
                s.length ? (s.removeClass(this.settings.validClass).addClass(this.settings.errorClass), s.html(i)) : (s = t("<" + this.settings.errorElement + ">").attr("id", a + "-error").addClass(this.settings.errorClass).html(i || ""), n = s, this.settings.wrapper && (n = s.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e), s.is("label") ? s.attr("for", a) : 0 === s.parents("label[for='" + a + "']").length && (o = s.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), l ? l.match(new RegExp("\\b" + o + "\\b")) || (l += " " + o) : l = o, t(e).attr("aria-describedby", l), r = this.groups[e.name], r && t.each(this.groups, function (e, i) {
                    i === r && t("[name='" + e + "']", this.currentForm).attr("aria-describedby", s.attr("id"))
                }))), !i && this.settings.success && (s.text(""), "string" == typeof this.settings.success ? s.addClass(this.settings.success) : this.settings.success(s, e)), this.toShow = this.toShow.add(s)
            }, errorsFor: function (e) {
                var i = this.idOrName(e), n = t(e).attr("aria-describedby"),
                    r = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (r = r + ", #" + n.replace(/\s+/g, ", #")), this.errors().filter(r)
            }, idOrName: function (t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            }, validationTargetFor: function (e) {
                return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            }, checkable: function (t) {
                return /radio|checkbox/i.test(t.type)
            }, findByName: function (e) {
                return t(this.currentForm).find("[name='" + e + "']")
            }, getLength: function (e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case"select":
                        return t("option:selected", i).length;
                    case"input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            }, depend: function (t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            }, dependTypes: {
                "boolean": function (t) {
                    return t
                }, string: function (e, i) {
                    return !!t(e, i.form).length
                }, "function": function (t, e) {
                    return t(e)
                }
            }, optional: function (e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            }, startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            }, stopRequest: function (e, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(e, "remote")
                })
            }, destroy: function () {
                this.resetForm(), t(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function (e) {
            var i = {}, n = t(e).attr("class");
            return n && t.each(n.split(" "), function () {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function (t, e, i, n) {
            /min|max/.test(i) && (null === e || /number|range|text/.test(e)) && (n = Number(n), isNaN(n) && (n = void 0)), n || 0 === n ? t[i] = n : e === i && "range" !== e && (t[i] = !0)
        },
        attributeRules: function (e) {
            var i, n, r = {}, o = t(e), s = e.getAttribute("type");
            for (i in t.validator.methods) "required" === i ? (n = e.getAttribute(i), "" === n && (n = !0), n = !!n) : n = o.attr(i), this.normalizeAttributeRule(r, s, i, n);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function (e) {
            var i, n, r = {}, o = t(e), s = e.getAttribute("type");
            for (i in t.validator.methods) n = o.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(r, s, i, n);
            return r
        },
        staticRules: function (e) {
            var i = {}, n = t.data(e.form, "validator");
            return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function (e, i) {
            return t.each(e, function (n, r) {
                if (r === !1) return void delete e[n];
                if (r.param || r.depends) {
                    var o = !0;
                    switch (typeof r.depends) {
                        case"string":
                            o = !!t(r.depends, i.form).length;
                            break;
                        case"function":
                            o = r.depends.call(i, i)
                    }
                    o ? e[n] = void 0 !== r.param ? r.param : !0 : delete e[n]
                }
            }), t.each(e, function (n, r) {
                e[n] = t.isFunction(r) ? r(i) : r
            }), t.each(["minlength", "maxlength"], function () {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function () {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function (e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function () {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function (e, i, n) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function (e, i, n) {
                if (!this.depend(n, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : e.length > 0
            }, email: function (t, e) {
                return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            }, url: function (t, e) {
                return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)
            }, date: function (t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            }, dateISO: function (t, e) {
                return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            }, number: function (t, e) {
                return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            }, digits: function (t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            }, creditcard: function (t, e) {
                if (this.optional(e)) return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t)) return !1;
                var i, n, r = 0, o = 0, s = !1;
                if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19) return !1;
                for (i = t.length - 1; i >= 0; i--) n = t.charAt(i), o = parseInt(n, 10), s && (o *= 2) > 9 && (o -= 9), r += o, s = !s;
                return r % 10 === 0
            }, minlength: function (e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= n
            }, maxlength: function (e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || n >= r
            }, rangelength: function (e, i, n) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= n[0] && r <= n[1]
            }, min: function (t, e, i) {
                return this.optional(e) || t >= i
            }, max: function (t, e, i) {
                return this.optional(e) || i >= t
            }, range: function (t, e, i) {
                return this.optional(e) || t >= i[0] && t <= i[1]
            }, equalTo: function (e, i, n) {
                var r = t(n);
                return this.settings.onfocusout && r.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                    t(i).valid()
                }), e === r.val()
            }, remote: function (e, i, n) {
                if (this.optional(i)) return "dependency-mismatch";
                var r, o, s = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), s.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = s.message, n = "string" == typeof n && {url: n} || n, s.old === e ? s.valid : (s.old = e, r = this, this.startRequest(i), o = {}, o[i.name] = e, t.ajax(t.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: o,
                    context: r.currentForm,
                    success: function (n) {
                        var o, a, l, u = n === !0 || "true" === n;
                        r.settings.messages[i.name].remote = s.originalMessage, u ? (l = r.formSubmitted, r.prepareElement(i), r.formSubmitted = l, r.successList.push(i), delete r.invalid[i.name], r.showErrors()) : (o = {}, a = n || r.defaultMessage(i, "remote"), o[i.name] = s.message = t.isFunction(a) ? a(e) : a, r.invalid[i.name] = !0, r.showErrors(o)), s.valid = u, r.stopRequest(i, u)
                    }
                }, n)), "pending")
            }
        }
    });
    var e, i = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function (t, e, n) {
        var r = t.port;
        "abort" === t.mode && (i[r] && i[r].abort(), i[r] = n)
    }) : (e = t.ajax, t.ajax = function (n) {
        var r = ("mode" in n ? n : t.ajaxSettings).mode, o = ("port" in n ? n : t.ajaxSettings).port;
        return "abort" === r ? (i[o] && i[o].abort(), i[o] = e.apply(this, arguments), i[o]) : e.apply(this, arguments)
    })
}), !function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : jQuery)
}(function (t) {
    function e(e) {
        var i = !1;
        return t('[data-notify="container"]').each(function (n, r) {
            var o = t(r), s = o.find('[data-notify="title"]').html().trim(),
                a = o.find('[data-notify="message"]').html().trim(),
                l = s === t("<div>" + e.settings.content.title + "</div>").html().trim(),
                u = a === t("<div>" + e.settings.content.message + "</div>").html().trim(),
                c = o.hasClass("alert-" + e.settings.type);
            return l && u && c && (i = !0), !i
        }), i
    }

    function i(i, r, o) {
        var s = {
            content: {
                message: "object" == typeof r ? r.message : r,
                title: r.title ? r.title : "",
                icon: r.icon ? r.icon : "",
                url: r.url ? r.url : "#",
                target: r.target ? r.target : "-"
            }
        };
        o = t.extend(!0, {}, s, o), this.settings = t.extend(!0, {}, n, o), this._defaults = n, "-" === this.settings.content.target && (this.settings.content.target = this.settings.url_target), this.animations = {
            start: "webkitAnimationStart oanimationstart MSAnimationStart animationstart",
            end: "webkitAnimationEnd oanimationend MSAnimationEnd animationend"
        }, "number" == typeof this.settings.offset && (this.settings.offset = {
            x: this.settings.offset,
            y: this.settings.offset
        }), (this.settings.allow_duplicates || !this.settings.allow_duplicates && !e(this)) && this.init()
    }

    var n = {
        element: "body",
        position: null,
        type: "info",
        allow_dismiss: !0,
        allow_duplicates: !0,
        newest_on_top: !1,
        showProgressbar: !1,
        placement: {from: "top", align: "right"},
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5e3,
        timer: 1e3,
        url_target: "_blank",
        mouse_over: null,
        animate: {enter: "animated fadeInDown", exit: "animated fadeOutUp"},
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        onClick: null,
        icon_type: "class",
        template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
    };
    String.format = function () {
        var t = arguments, e = arguments[0];
        return e.replace(/(\{\{\d\}\}|\{\d\})/g, function (e) {
            if ("{{" === e.substring(0, 2)) return e;
            var i = parseInt(e.match(/\d/)[0]);
            return t[i + 1]
        })
    }, t.extend(i.prototype, {
        init: function () {
            var t = this;
            this.buildNotify(), this.settings.content.icon && this.setIcon(), "#" != this.settings.content.url && this.styleURL(), this.styleDismiss(), this.placement(), this.bind(), this.notify = {
                $ele: this.$ele,
                update: function (e, i) {
                    var n = {};
                    "string" == typeof e ? n[e] = i : n = e;
                    for (var r in n) switch (r) {
                        case"type":
                            this.$ele.removeClass("alert-" + t.settings.type), this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-" + t.settings.type), t.settings.type = n[r], this.$ele.addClass("alert-" + n[r]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-" + n[r]);
                            break;
                        case"icon":
                            var o = this.$ele.find('[data-notify="icon"]');
                            "class" === t.settings.icon_type.toLowerCase() ? o.removeClass(t.settings.content.icon).addClass(n[r]) : (o.is("img") || o.find("img"), o.attr("src", n[r])), t.settings.content.icon = n[e];
                            break;
                        case"progress":
                            var s = t.settings.delay - t.settings.delay * (n[r] / 100);
                            this.$ele.data("notify-delay", s), this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", n[r]).css("width", n[r] + "%");
                            break;
                        case"url":
                            this.$ele.find('[data-notify="url"]').attr("href", n[r]);
                            break;
                        case"target":
                            this.$ele.find('[data-notify="url"]').attr("target", n[r]);
                            break;
                        default:
                            this.$ele.find('[data-notify="' + r + '"]').html(n[r])
                    }
                    var a = this.$ele.outerHeight() + parseInt(t.settings.spacing) + parseInt(t.settings.offset.y);
                    t.reposition(a)
                },
                close: function () {
                    t.close()
                }
            }
        }, buildNotify: function () {
            var e = this.settings.content;
            this.$ele = t(String.format(this.settings.template, this.settings.type, e.title, e.message, e.url, e.target)), this.$ele.attr("data-notify-position", this.settings.placement.from + "-" + this.settings.placement.align), this.settings.allow_dismiss || this.$ele.find('[data-notify="dismiss"]').css("display", "none"), (this.settings.delay <= 0 && !this.settings.showProgressbar || !this.settings.showProgressbar) && this.$ele.find('[data-notify="progressbar"]').remove()
        }, setIcon: function () {
            "class" === this.settings.icon_type.toLowerCase() ? this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').is("img") ? this.$ele.find('[data-notify="icon"]').attr("src", this.settings.content.icon) : this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />')
        }, styleDismiss: function () {
            this.$ele.find('[data-notify="dismiss"]').css({
                position: "absolute",
                right: "10px",
                top: "5px",
                zIndex: this.settings.z_index + 2
            })
        }, styleURL: function () {
            this.$ele.find('[data-notify="url"]').css({
                backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",
                height: "100%",
                left: 0,
                position: "absolute",
                top: 0,
                width: "100%",
                zIndex: this.settings.z_index + 1
            })
        }, placement: function () {
            var e = this, i = this.settings.offset.y, n = {
                display: "inline-block",
                margin: "0px auto",
                position: this.settings.position ? this.settings.position : "body" === this.settings.element ? "fixed" : "absolute",
                transition: "all .5s ease-in-out",
                zIndex: this.settings.z_index
            }, r = !1, o = this.settings;
            switch (t('[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                i = Math.max(i, parseInt(t(this).css(o.placement.from)) + parseInt(t(this).outerHeight()) + parseInt(o.spacing))
            }), this.settings.newest_on_top === !0 && (i = this.settings.offset.y), n[this.settings.placement.from] = i + "px", this.settings.placement.align) {
                case"left":
                case"right":
                    n[this.settings.placement.align] = this.settings.offset.x + "px";
                    break;
                case"center":
                    n.left = 0, n.right = 0
            }
            this.$ele.css(n).addClass(this.settings.animate.enter), t.each(Array("webkit-", "moz-", "o-", "ms-", ""), function (t, i) {
                e.$ele[0].style[i + "AnimationIterationCount"] = 1
            }), t(this.settings.element).append(this.$ele), this.settings.newest_on_top === !0 && (i = parseInt(i) + parseInt(this.settings.spacing) + this.$ele.outerHeight(), this.reposition(i)), t.isFunction(e.settings.onShow) && e.settings.onShow.call(this.$ele), this.$ele.one(this.animations.start, function () {
                r = !0
            }).one(this.animations.end, function () {
                e.$ele.removeClass(e.settings.animate.enter), t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }), setTimeout(function () {
                r || t.isFunction(e.settings.onShown) && e.settings.onShown.call(this)
            }, 600)
        }, bind: function () {
            var e = this;
            if (this.$ele.find('[data-notify="dismiss"]').on("click", function () {
                    e.close()
                }), t.isFunction(e.settings.onClick) && this.$ele.on("click", function (t) {
                    t.target != e.$ele.find('[data-notify="dismiss"]')[0] && e.settings.onClick.call(this, t)
                }), this.$ele.mouseover(function () {
                    t(this).data("data-hover", "true")
                }).mouseout(function () {
                    t(this).data("data-hover", "false")
                }), this.$ele.data("data-hover", "false"), this.settings.delay > 0) {
                e.$ele.data("notify-delay", e.settings.delay);
                var i = setInterval(function () {
                    var t = parseInt(e.$ele.data("notify-delay")) - e.settings.timer;
                    if ("false" === e.$ele.data("data-hover") && "pause" === e.settings.mouse_over || "pause" != e.settings.mouse_over) {
                        var n = (e.settings.delay - t) / e.settings.delay * 100;
                        e.$ele.data("notify-delay", t), e.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow", n).css("width", n + "%")
                    }
                    t <= -e.settings.timer && (clearInterval(i), e.close())
                }, e.settings.timer)
            }
        }, close: function () {
            var e = this, i = parseInt(this.$ele.css(this.settings.placement.from)), n = !1;
            this.$ele.attr("data-closing", "true").addClass(this.settings.animate.exit), e.reposition(i), t.isFunction(e.settings.onClose) && e.settings.onClose.call(this.$ele), this.$ele.one(this.animations.start, function () {
                n = !0
            }).one(this.animations.end, function () {
                t(this).remove(), t.isFunction(e.settings.onClosed) && e.settings.onClosed.call(this)
            }), setTimeout(function () {
                n || (e.$ele.remove(), e.settings.onClosed && e.settings.onClosed(e.$ele))
            }, 600)
        }, reposition: function (e) {
            var i = this,
                n = '[data-notify-position="' + this.settings.placement.from + "-" + this.settings.placement.align + '"]:not([data-closing="true"])',
                r = this.$ele.nextAll(n);
            this.settings.newest_on_top === !0 && (r = this.$ele.prevAll(n)), r.each(function () {
                t(this).css(i.settings.placement.from, e), e = parseInt(e) + parseInt(i.settings.spacing) + t(this).outerHeight()
            })
        }
    }), t.notify = function (t, e) {
        var n = new i(this, t, e);
        return n.notify
    }, t.notifyDefaults = function (e) {
        return n = t.extend(!0, {}, n, e)
    }, t.notifyClose = function (e) {
        "undefined" == typeof e || "all" === e ? t("[data-notify]").find('[data-notify="dismiss"]').trigger("click") : "success" === e || "info" === e || "warning" === e || "danger" === e ? t(".alert-" + e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : e ? t(e + "[data-notify]").find('[data-notify="dismiss"]').trigger("click") : t('[data-notify-position="' + e + '"]').find('[data-notify="dismiss"]').trigger("click")
    }, t.notifyCloseExcept = function (e) {
        "success" === e || "info" === e || "warning" === e || "danger" === e ? t("[data-notify]").not(".alert-" + e).find('[data-notify="dismiss"]').trigger("click") : t("[data-notify]").not(e).find('[data-notify="dismiss"]').trigger("click")
    }
}), !function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function (i) {
        return e(i, t, t.document)
    }) : "object" == typeof module && module.exports ? module.exports = e(require("jquery"), t, t.document) : e(jQuery, t, t.document)
}("undefined" != typeof window ? window : this, function (t, e, i, n) {
    "use strict";

    function r(t, i, n, r) {
        if (y === t && (n = !1), C === !0) return !0;
        if (p[t]) {
            if (P = !1, n && E.before(t, f), v = 1, I = h[t], Y === !1 && y > t && r === !1 && m[t] && (v = parseInt(f[t].outerHeight() / T.height()), I = parseInt(h[t]) + (f[t].outerHeight() - T.height())), E.updateHash && E.sectionName && (Y !== !0 || 0 !== t)) if (history.pushState) try {
                history.replaceState(null, null, p[t])
            } catch (o) {
                e.console && console.warn("Scrollify warning: Page must be hosted to manipulate the hash value.")
            } else e.location.hash = p[t];
            if (Y && (E.afterRender(), Y = !1), y = t, i) o(E.target).stop().scrollTop(I), n && E.after(t, f); else {
                if (x = !0, o().velocity ? o(E.target).stop().velocity("scroll", {
                        duration: E.scrollSpeed,
                        easing: E.easing,
                        offset: I,
                        mobileHA: !1
                    }) : o(E.target).stop().animate({scrollTop: I}, E.scrollSpeed, E.easing), e.location.hash.length && E.sectionName && e.console) try {
                    o(e.location.hash).length && console.warn("Scrollify warning: ID matches hash value - this will cause the page to anchor.")
                } catch (o) {
                }
                o(E.target).promise().done(function () {
                    x = !1, Y = !1, n && E.after(t, f)
                })
            }
        }
    }

    function o(t) {
        function e(e) {
            for (var i = 0, n = t.slice(Math.max(t.length - e, 1)), r = 0; r < n.length; r++) i += n[r];
            return Math.ceil(i / e)
        }

        var i = e(10), n = e(70);
        return i >= n
    }

    function s(t, e) {
        for (var i = p.length; i >= 0; i--) "string" == typeof t ? p[i] === t && (g = i, r(i, e, !0, !0)) : i === t && (g = i, r(i, e, !0, !0))
    }

    var a, l, u, c, d, h = [], p = [], f = [], m = [], g = 0, y = 0, v = 1, b = !1, T = t(e), w = T.scrollTop(), P = !1,
        x = !1, _ = !1, C = !1, S = [], j = (new Date).getTime(), Y = !0, k = !1, I = 0,
        Q = "onwheel" in i ? "wheel" : i.onmousewheel !== n ? "mousewheel" : "DOMMouseScroll", E = {
            section: ".section",
            sectionName: "section-name",
            interstitialSection: "",
            easing: "easeOutExpo",
            scrollSpeed: 1100,
            offset: 0,
            scrollbars: !0,
            target: "html,body",
            standardScrollElements: !1,
            setHeights: !0,
            overflowScroll: !0,
            updateHash: !0,
            touchScroll: !0,
            before: function () {
            },
            after: function () {
            },
            afterResize: function () {
            },
            afterRender: function () {
            }
        }, $ = function (n) {
            function s(e) {
                t().velocity ? t(E.target).stop().velocity("scroll", {
                    duration: E.scrollSpeed,
                    easing: E.easing,
                    offset: e,
                    mobileHA: !1
                }) : t(E.target).stop().animate({scrollTop: e}, E.scrollSpeed, E.easing)
            }

            function y(e) {
                e && (w = T.scrollTop());
                var i = E.section;
                m = [], E.interstitialSection.length && (i += "," + E.interstitialSection), E.scrollbars === !1 && (E.overflowScroll = !1), t(i).each(function (e) {
                    var i = t(this);
                    E.setHeights ? i.is(E.interstitialSection) ? m[e] = !1 : i.css("height", "auto").outerHeight() < T.height() || "hidden" === i.css("overflow") ? (i.css({height: T.height()}), m[e] = !1) : (i.css({height: i.height()}), E.overflowScroll ? m[e] = !0 : m[e] = !1) : i.outerHeight() < T.height() || E.overflowScroll === !1 ? m[e] = !1 : m[e] = !0
                }), e && T.scrollTop(w)
            }

            function Y(i) {
                var n = E.section;
                E.interstitialSection.length && (n += "," + E.interstitialSection), h = [], p = [], f = [], t(n).each(function (t) {
                    var i = r(this);
                    t > 0 ? h[t] = parseInt(i.offset().top) + E.offset : h[t] = parseInt(i.offset().top), E.sectionName && i.data(E.sectionName) ? p[t] = "#" + i.data(E.sectionName).toString().replace(/ /g, "-") : i.is(E.interstitialSection) === !1 ? p[t] = "#" + (t + 1) : (p[t] = "#", t === r(n).length - 1 && t > 1 && (h[t] = h[t - 1] + (parseInt(r(r(n)[t - 1]).outerHeight()) - parseInt(r(e).height())) + parseInt(i.outerHeight()))), f[t] = i;
                    try {
                        r(p[t]).length && e.console && console.warn("Scrollify warning: Section names can't match IDs - this will cause the browser to anchor.")
                    } catch (r) {
                    }
                    e.location.hash === p[t] && (g = t, b = !0)
                }), !0 === i && r(g, !1, !1, !1)
            }

            function I() {
                return !(m[g] && (w = T.scrollTop(), w > parseInt(h[g])))
            }

            function $() {
                return !(m[g] && (w = T.scrollTop(), w < parseInt(h[g]) + (f[g].outerHeight() - T.height()) - 28))
            }

            k = !0, t.easing.easeOutExpo = function (t, e, i, n, r) {
                return e == r ? i + n : n * (-Math.pow(2, -10 * e / r) + 1) + i
            }, u = {
                handleMousedown: function () {
                    return C === !0 || (P = !1, void(_ = !1))
                }, handleMouseup: function () {
                    return C === !0 || (P = !0, void(_ && u.calculateNearest(!1, !0)))
                }, handleScroll: function () {
                    return C === !0 || (a && clearTimeout(a), void(a = setTimeout(function () {
                        return _ = !0, P !== !1 && (P = !1, void u.calculateNearest(!1, !0))
                    }, 200)))
                }, calculateNearest: function (t, e) {
                    w = T.scrollTop();
                    for (var i, n = 1, o = h.length, s = 0, a = Math.abs(h[0] - w); o > n; n++) i = Math.abs(h[n] - w), a > i && (a = i, s = n);
                    ($() && s > g || I()) && (g = s, r(s, t, e, !1))
                }, wheelHandler: function (i) {
                    if (C === !0) return !0;
                    if (E.standardScrollElements && (t(i.target).is(E.standardScrollElements) || t(i.target).closest(E.standardScrollElements).length)) return !0;
                    m[g] || i.preventDefault();
                    var n = (new Date).getTime();
                    i = i || e.event;
                    var s = i.originalEvent.wheelDelta || -i.originalEvent.deltaY || -i.originalEvent.detail,
                        a = Math.max(-1, Math.min(1, s));
                    if (S.length > 149 && S.shift(), S.push(Math.abs(s)), n - j > 200 && (S = []), j = n, x) return !1;
                    if (0 > a) {
                        if (g < h.length - 1 && $()) {
                            if (!o(S)) return !1;
                            i.preventDefault(), g++, x = !0, r(g, !1, !0, !1)
                        }
                    } else if (a > 0 && g > 0 && I()) {
                        if (!o(S)) return !1;
                        i.preventDefault(), g--, x = !0, r(g, !1, !0, !1)
                    }
                }, keyHandler: function (t) {
                    return C === !0 || x !== !0 && void(38 == t.keyCode || 33 == t.keyCode ? g > 0 && I() && (t.preventDefault(), g--, r(g, !1, !0, !1)) : 40 != t.keyCode && 34 != t.keyCode || g < h.length - 1 && $() && (t.preventDefault(), g++, r(g, !1, !0, !1)))
                }, init: function () {
                    E.scrollbars ? (T.on("mousedown", u.handleMousedown), T.on("mouseup", u.handleMouseup), T.on("scroll", u.handleScroll)) : t("body").css({overflow: "hidden"}), T.on(Q, u.wheelHandler), T.on("keydown", u.keyHandler)
                }
            }, c = {
                touches: {
                    touchstart: {y: -1, x: -1},
                    touchmove: {y: -1, x: -1},
                    touchend: !1,
                    direction: "undetermined"
                }, options: {distance: 30, timeGap: 800, timeStamp: (new Date).getTime()}, touchHandler: function (e) {
                    if (C === !0) return !0;
                    if (E.standardScrollElements && (t(e.target).is(E.standardScrollElements) || t(e.target).closest(E.standardScrollElements).length)) return !0;
                    var i;
                    if ("undefined" != typeof e && "undefined" != typeof e.touches) switch (i = e.touches[0], e.type) {
                        case"touchstart":
                            c.touches.touchstart.y = i.pageY, c.touches.touchmove.y = -1, c.touches.touchstart.x = i.pageX, c.touches.touchmove.x = -1, c.options.timeStamp = (new Date).getTime(), c.touches.touchend = !1;
                        case"touchmove":
                            c.touches.touchmove.y = i.pageY, c.touches.touchmove.x = i.pageX, c.touches.touchstart.y !== c.touches.touchmove.y && Math.abs(c.touches.touchstart.y - c.touches.touchmove.y) > Math.abs(c.touches.touchstart.x - c.touches.touchmove.x) && (e.preventDefault(), c.touches.direction = "y", c.options.timeStamp + c.options.timeGap < (new Date).getTime() && 0 == c.touches.touchend && (c.touches.touchend = !0, c.touches.touchstart.y > -1 && Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) > c.options.distance && (c.touches.touchstart.y < c.touches.touchmove.y ? c.up() : c.down())));
                            break;
                        case"touchend":
                            c.touches[e.type] === !1 && (c.touches[e.type] = !0, c.touches.touchstart.y > -1 && c.touches.touchmove.y > -1 && "y" === c.touches.direction && (Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) > c.options.distance && (c.touches.touchstart.y < c.touches.touchmove.y ? c.up() : c.down()), c.touches.touchstart.y = -1, c.touches.touchstart.x = -1, c.touches.direction = "undetermined"))
                    }
                }, down: function () {
                    g < h.length - 1 && ($() && g < h.length - 1 ? (g++, r(g, !1, !0, !1)) : Math.floor(f[g].height() / T.height()) > v ? (s(parseInt(h[g]) + T.height() * v), v += 1) : s(parseInt(h[g]) + (f[g].outerHeight() - T.height())))
                }, up: function () {
                    g >= 0 && (I() && g > 0 ? (g--, r(g, !1, !0, !1)) : v > 2 ? (v -= 1, s(parseInt(h[g]) + T.height() * v)) : (v = 1, s(parseInt(h[g]))))
                }, init: function () {
                    i.addEventListener && E.touchScroll && (i.addEventListener("touchstart", c.touchHandler, !1), i.addEventListener("touchmove", c.touchHandler, !1), i.addEventListener("touchend", c.touchHandler, !1))
                }
            }, d = {
                refresh: function (t, e) {
                    clearTimeout(l), l = setTimeout(function () {
                        y(!0), Y(e, !1), t && E.afterResize()
                    }, 400)
                }, handleUpdate: function () {
                    d.refresh(!1, !1)
                }, handleResize: function () {
                    d.refresh(!0, !1)
                }, handleOrientation: function () {
                    d.refresh(!0, !0)
                }
            }, E = t.extend(E, n), y(!1), Y(!1, !0), !0 === b ? r(g, !1, !0, !0) : setTimeout(function () {
                u.calculateNearest(!0, !1)
            }, 200), h.length && (u.init(), c.init(), T.on("resize", d.handleResize), i.addEventListener && e.addEventListener("orientationchange", d.handleOrientation, !1))
        };
    return $.move = function (e) {
        return e !== n && (e.originalEvent && (e = t(this).attr("href")), void s(e, !1))
    }, $.instantMove = function (t) {
        return t !== n && void s(t, !0)
    }, $.next = function () {
        g < p.length && (g += 1, r(g, !1, !0, !0))
    }, $.previous = function () {
        g > 0 && (g -= 1, r(g, !1, !0, !0))
    }, $.instantNext = function () {
        g < p.length && (g += 1, r(g, !0, !0, !0))
    }, $.instantPrevious = function () {
        g > 0 && (g -= 1, r(g, !0, !0, !0))
    }, $.destroy = function () {
        return !!k && (E.setHeights && t(E.section).each(function () {
            t(this).css("height", "auto")
        }), T.off("resize", d.handleResize), E.scrollbars && (T.off("mousedown", u.handleMousedown), T.off("mouseup", u.handleMouseup), T.off("scroll", u.handleScroll)), T.off(Q, u.wheelHandler), T.off("keydown", u.keyHandler), i.addEventListener && E.touchScroll && (i.removeEventListener("touchstart", c.touchHandler, !1), i.removeEventListener("touchmove", c.touchHandler, !1), i.removeEventListener("touchend", c.touchHandler, !1)), h = [], p = [], f = [], void(m = []))
    }, $.update = function () {
        return !!k && void d.handleUpdate()
    }, $.current = function () {
        return f[g]
    }, $.disable = function () {
        C = !0
    }, $.enable = function () {
        C = !1, k && u.calculateNearest(!1, !1)
    }, $.isDisabled = function () {
        return C
    }, $.setOptions = function (i) {
        return !!k && void("object" == typeof i ? (E = t.extend(E, i), d.handleUpdate()) : e.console && console.warn("Scrollify warning: setOptions expects an object."))
    }, t.scrollify = $, $
}), !function (t) {
    "use strict";
    t.fn.twittie = function () {
        var e = arguments[0] instanceof Object ? arguments[0] : {},
            i = "function" == typeof arguments[0] ? arguments[0] : arguments[1], n = t.extend({
                username: null,
                list: null,
                hashtag: null,
                count: 10,
                hideReplies: !1,
                dateFormat: "%b/%d/%Y",
                template: "{{date}} - {{tweet}}",
                apiPath: "api/tweet.php",
                loadingText: "Loading..."
            }, e);
        n.list && !n.username && t.error("If you want to fetch tweets from a list, you must define the username of the list owner.");
        var r = function (t) {
            var e = t.replace(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi, '<a href="$1" target="_blank" title="Visit this link">$1</a>').replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>');
            return e
        }, o = function (t) {
            var e = t.split(" ");
            t = new Date(Date.parse(e[1] + " " + e[2] + ", " + e[5] + " " + e[3] + " UTC"));
            for (var i = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], r = {
                "%d": t.getDate(),
                "%m": t.getMonth() + 1,
                "%b": i[t.getMonth()].substr(0, 3),
                "%B": i[t.getMonth()],
                "%y": String(t.getFullYear()).slice(-2),
                "%Y": t.getFullYear()
            }, o = n.dateFormat, s = n.dateFormat.match(/%[dmbByY]/g), a = 0, l = s.length; l > a; a++) o = o.replace(s[a], r[s[a]]);
            return o
        }, s = function (t) {
            for (var e = n.template, i = ["date", "tweet", "avatar", "url", "retweeted", "screen_name", "user_name"], r = 0, o = i.length; o > r; r++) e = e.replace(new RegExp("{{" + i[r] + "}}", "gi"), t[i[r]]);
            return e
        };
        this.html("<span>" + n.loadingText + "</span>");
        var a = this;
        t.getJSON(n.apiPath, {
            username: n.username,
            list: n.list,
            hashtag: n.hashtag,
            count: n.count,
            exclude_replies: n.hideReplies
        }, function (t) {
            a.find("span").fadeOut("fast", function () {
                a.html("<ul></ul>");
                for (var e = 0; e < n.count; e++) {
                    var l = !1;
                    if (t[e]) l = t[e]; else {
                        if (void 0 === t.statuses || !t.statuses[e]) break;
                        l = t.statuses[e]
                    }
                    var u = {
                        user_name: l.user.name,
                        date: o(l.created_at),
                        tweet: r(l.retweeted ? "RT @" + l.user.screen_name + ": " + l.retweeted_status.text : l.text),
                        avatar: '<img src="' + l.user.profile_image_url + '" />',
                        url: "https://twitter.com/" + l.user.screen_name + "/status/" + l.id_str,
                        retweeted: l.retweeted,
                        screen_name: r("@" + l.user.screen_name)
                    };
                    a.find("ul").append("<li>" + s(u) + "</li>")
                }
                "function" == typeof i && i()
            })
        })
    }
}(jQuery), function (t) {
    t.fn.jflickrfeed = function (e, i) {
        e = t.extend(!0, {
            flickrbase: "http://api.flickr.com/services/feeds/",
            feedapi: "photos_public.gne",
            limit: 20,
            qstrings: {lang: "en-us", format: "json", jsoncallback: "?"},
            cleanDescription: !0,
            useTemplate: !0,
            itemTemplate: "",
            itemCallback: function () {
            }
        }, e);
        var n = e.flickrbase + e.feedapi + "?", r = !0;
        for (var o in e.qstrings) r || (n += "&"), n += o + "=" + e.qstrings[o], r = !1;
        return t(this).each(function () {
            var r = t(this), o = this;
            t.getJSON(n, function (n) {
                t.each(n.items, function (t, i) {
                    if (t < e.limit) {
                        if (e.cleanDescription) {
                            var n = /<p>(.*?)<\/p>/g, s = i.description;
                            n.test(s) && (i.description = s.match(n)[2], void 0 != i.description && (i.description = i.description.replace("<p>", "").replace("</p>", "")))
                        }
                        if (i.image_s = i.media.m.replace("_m", "_s"), i.image_t = i.media.m.replace("_m", "_t"), i.image_m = i.media.m.replace("_m", "_m"), i.image = i.media.m.replace("_m", ""), i.image_b = i.media.m.replace("_m", "_b"), delete i.media, e.useTemplate) {
                            var a = e.itemTemplate;
                            for (var l in i) {
                                var u = new RegExp("{{" + l + "}}", "g");
                                a = a.replace(u, i[l])
                            }
                            r.append(a)
                        }
                        e.itemCallback.call(o, i)
                    }
                }), t.isFunction(i) && i.call(o, n)
            })
        })
    }
}(jQuery), function (t) {
    function e(t, e) {
        return t.toFixed(e.decimals)
    }

    t.fn.countTo = function (e) {
        return e = e || {}, t(this).each(function () {
            function i() {
                c += s, u++, n(c), "function" == typeof r.onUpdate && r.onUpdate.call(a, c), u >= o && (l.removeData("countTo"), clearInterval(d.interval), c = r.to, "function" == typeof r.onComplete && r.onComplete.call(a, c))
            }

            function n(t) {
                var e = r.formatter.call(a, t, r);
                l.text(e)
            }

            var r = t.extend({}, t.fn.countTo.defaults, {
                    from: t(this).data("from"),
                    to: t(this).data("to"),
                    speed: t(this).data("speed"),
                    refreshInterval: t(this).data("refresh-interval"),
                    decimals: t(this).data("decimals")
                }, e), o = Math.ceil(r.speed / r.refreshInterval), s = (r.to - r.from) / o, a = this, l = t(this), u = 0,
                c = r.from, d = l.data("countTo") || {};
            l.data("countTo", d), d.interval && clearInterval(d.interval), d.interval = setInterval(i, r.refreshInterval), n(c)
        })
    }, t.fn.countTo.defaults = {
        from: 0,
        to: 0,
        speed: 1e3,
        refreshInterval: 100,
        decimals: 0,
        formatter: e,
        onUpdate: null,
        onComplete: null
    }
}(jQuery), !function (t) {
    "use strict";

    function e(e, i) {
        this.element = t(e), this.settings = t.extend({}, n, i), this._defaults = n, this._init()
    }

    var i = "Morphext", n = {animation: "bounceIn", separator: ",", speed: 2e3, complete: t.noop};
    e.prototype = {
        _init: function () {
            var e = this;
            this.phrases = [], this.element.addClass("morphext"), t.each(this.element.text().split(this.settings.separator), function (i, n) {
                e.phrases.push(t.trim(n))
            }), this.index = -1, this.animate(), this.start()
        }, animate: function () {
            this.index = ++this.index % this.phrases.length, this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>", t.isFunction(this.settings.complete) && this.settings.complete.call(this)
        }, start: function () {
            var t = this;
            this._interval = setInterval(function () {
                t.animate()
            }, this.settings.speed)
        }, stop: function () {
            this._interval = clearInterval(this._interval)
        }
    }, t.fn[i] = function (n) {
        return this.each(function () {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new e(this, n))
        })
    }
}(jQuery), !function (t, e) {
    "function" == typeof define && define.amd ? define(["jquery"], function (t) {
        return e(t)
    }) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(jQuery)
}(this, function (t) {
    var e = function (t, e) {
        var i, n = document.createElement("canvas");
        t.appendChild(n), "object" == typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(n);
        var r = n.getContext("2d");
        n.width = n.height = e.size;
        var o = 1;
        window.devicePixelRatio > 1 && (o = window.devicePixelRatio, n.style.width = n.style.height = [e.size, "px"].join(""), n.width = n.height = e.size * o, r.scale(o, o)), r.translate(e.size / 2, e.size / 2), r.rotate((-.5 + e.rotate / 180) * Math.PI);
        var s = (e.size - e.lineWidth) / 2;
        e.scaleColor && e.scaleLength && (s -= e.scaleLength + 2), Date.now = Date.now || function () {
            return +new Date
        };
        var a = function (t, e, i) {
            i = Math.min(Math.max(-1, i || 0), 1);
            var n = 0 >= i;
            r.beginPath(), r.arc(0, 0, s, 0, 2 * Math.PI * i, n), r.strokeStyle = t, r.lineWidth = e, r.stroke()
        }, l = function () {
            var t, i;
            r.lineWidth = 1, r.fillStyle = e.scaleColor, r.save();
            for (var n = 24; n > 0; --n) n % 6 === 0 ? (i = e.scaleLength, t = 0) : (i = .6 * e.scaleLength, t = e.scaleLength - i), r.fillRect(-e.size / 2 + t, 0, i, 1), r.rotate(Math.PI / 12);
            r.restore()
        }, u = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (t) {
                window.setTimeout(t, 1e3 / 60)
            }
        }(), c = function () {
            e.scaleColor && l(), e.trackColor && a(e.trackColor, e.trackWidth || e.lineWidth, 1)
        };
        this.getCanvas = function () {
            return n
        }, this.getCtx = function () {
            return r
        }, this.clear = function () {
            r.clearRect(e.size / -2, e.size / -2, e.size, e.size)
        }, this.draw = function (t) {
            e.scaleColor || e.trackColor ? r.getImageData && r.putImageData ? i ? r.putImageData(i, 0, 0) : (c(), i = r.getImageData(0, 0, e.size * o, e.size * o)) : (this.clear(), c()) : this.clear(), r.lineCap = e.lineCap;
            var n;
            n = "function" == typeof e.barColor ? e.barColor(t) : e.barColor, a(n, e.lineWidth, t / 100)
        }.bind(this), this.animate = function (t, i) {
            var n = Date.now();
            e.onStart(t, i);
            var r = function () {
                var o = Math.min(Date.now() - n, e.animate.duration),
                    s = e.easing(this, o, t, i - t, e.animate.duration);
                this.draw(s), e.onStep(t, i, s), o >= e.animate.duration ? e.onStop(t, i) : u(r)
            }.bind(this);
            u(r)
        }.bind(this)
    }, i = function (t, i) {
        var n = {
            barColor: "#ef1e25",
            trackColor: "#f9f9f9",
            scaleColor: "#dfe0e0",
            scaleLength: 5,
            lineCap: "round",
            lineWidth: 3,
            trackWidth: void 0,
            size: 110,
            rotate: 0,
            animate: {duration: 1e3, enabled: !0},
            easing: function (t, e, i, n, r) {
                return e /= r / 2, 1 > e ? n / 2 * e * e + i : -n / 2 * (--e * (e - 2) - 1) + i
            },
            onStart: function () {
            },
            onStep: function () {
            },
            onStop: function () {
            }
        };
        if ("undefined" != typeof e) n.renderer = e; else {
            if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
            n.renderer = SVGRenderer
        }
        var r = {}, o = 0, s = function () {
            this.el = t, this.options = r;
            for (var e in n) n.hasOwnProperty(e) && (r[e] = i && "undefined" != typeof i[e] ? i[e] : n[e], "function" == typeof r[e] && (r[e] = r[e].bind(this)));
            "string" == typeof r.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[r.easing]) ? r.easing = jQuery.easing[r.easing] : r.easing = n.easing, "number" == typeof r.animate && (r.animate = {
                duration: r.animate,
                enabled: !0
            }), "boolean" != typeof r.animate || r.animate || (r.animate = {
                duration: 1e3,
                enabled: r.animate
            }), this.renderer = new r.renderer(t, r), this.renderer.draw(o), t.dataset && t.dataset.percent ? this.update(parseFloat(t.dataset.percent)) : t.getAttribute && t.getAttribute("data-percent") && this.update(parseFloat(t.getAttribute("data-percent")))
        }.bind(this);
        this.update = function (t) {
            return t = parseFloat(t), r.animate.enabled ? this.renderer.animate(o, t) : this.renderer.draw(t), o = t, this
        }.bind(this), this.disableAnimation = function () {
            return r.animate.enabled = !1, this
        }, this.enableAnimation = function () {
            return r.animate.enabled = !0, this
        }, s()
    };
    t.fn.easyPieChart = function (e) {
        return this.each(function () {
            var n;
            t.data(this, "easyPieChart") || (n = t.extend({}, e, t(this).data()), t.data(this, "easyPieChart", new i(this, n)))
        })
    }
}), !function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    "use strict";

    function e(t) {
        if (t instanceof Date) return t;
        if (String(t).match(s)) return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
        throw new Error("Couldn't cast `" + t + "` to a date object.")
    }

    function i(t) {
        var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(e)
    }

    function n(t) {
        return function (e) {
            var n = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (n) for (var o = 0, s = n.length; s > o; ++o) {
                var a = n[o].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), u = i(a[0]), c = a[1] || "", d = a[3] || "",
                    h = null;
                a = a[2], l.hasOwnProperty(a) && (h = l[a], h = Number(t[h])), null !== h && ("!" === c && (h = r(d, h)), "" === c && 10 > h && (h = "0" + h.toString()), e = e.replace(u, h.toString()))
            }
            return e = e.replace(/%%/, "%")
        }
    }

    function r(t, e) {
        var i = "s", n = "";
        return t && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === t.length ? i = t[0] : (n = t[0], i = t[1])), Math.abs(e) > 1 ? i : n
    }

    var o = [], s = [], a = {precision: 100, elapse: !1, defer: !1};
    s.push(/^[0-9]*$/.source), s.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), s = new RegExp(s.join("|"));
    var l = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        d: "daysToWeek",
        w: "weeks",
        W: "weeksToMonth",
        H: "hours",
        M: "minutes",
        S: "seconds",
        D: "totalDays",
        I: "totalHours",
        N: "totalMinutes",
        T: "totalSeconds"
    }, u = function (e, i, n) {
        this.el = e, this.$el = t(e), this.interval = null, this.offset = {}, this.options = t.extend({}, a), this.firstTick = !0, this.instanceNumber = o.length, o.push(this), this.$el.data("countdown-instance", this.instanceNumber), n && ("function" == typeof n ? (this.$el.on("update.countdown", n), this.$el.on("stoped.countdown", n), this.$el.on("finish.countdown", n)) : this.options = t.extend({}, a, n)), this.setFinalDate(i), this.options.defer === !1 && this.start()
    };
    t.extend(u.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(), this.interval = setInterval(function () {
                t.update.call(t)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), o[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (t) {
            this.finalDate = e(t)
        }, update: function () {
            if (0 === this.$el.closest("html").length) return void this.remove();
            var t, e = new Date;
            return t = this.finalDate.getTime() - e.getTime(), t = Math.ceil(t / 1e3), t = !this.options.elapse && 0 > t ? 0 : Math.abs(t), this.totalSecsLeft === t || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = t, this.elapsed = e >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - e.getFullYear()),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
                totalMinutes: Math.floor(this.totalSecsLeft / 60),
                totalSeconds: this.totalSecsLeft
            }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))))
        }, dispatchEvent: function (e) {
            var i = t.Event(e + ".countdown");
            i.finalDate = this.finalDate, i.elapsed = this.elapsed, i.offset = t.extend({}, this.offset), i.strftime = n(this.offset), this.$el.trigger(i)
        }
    }), t.fn.countdown = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var i = t(this).data("countdown-instance");
            if (void 0 !== i) {
                var n = o[i], r = e[0];
                u.prototype.hasOwnProperty(r) ? n[r].apply(n, e.slice(1)) : null === String(r).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, r), n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, r))
            } else new u(this, e[0], e[1])
        })
    }
}), function (t, e, i) {
    "use strict";
    e.infinitescroll = function (t, i, n) {
        this.element = e(n), this._create(t, i) || (this.failed = !0)
    }, e.infinitescroll.defaults = {
        loading: {
            finished: i,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.44</em>",
            img: "",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: i
        },
        state: {
            isDuringAjax: !1,
            isInvalidPage: !1,
            isDestroyed: !1,
            isDone: !1,
            isPaused: !1,
            isBeyondMaxPage: !1,
            currPage: 1
        },
        debug: !1,
        behavior: i,
        binder: e(t),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: !1,
        pathParse: i,
        dataType: "html",
        appendCallback: !0,
        bufferPx: 40,
        errorCallback: function () {
        },
        infid: 0,
        pixelsFromNavToBottom: i,
        path: i,
        prefill: !1,
        maxPage: i
    }, e.infinitescroll.prototype = {
        _binding: function (t) {
            var e = this, n = e.options;
            return n.v = "2.0b2.120520", n.behavior && this["_binding_" + n.behavior] !== i ? void this["_binding_" + n.behavior].call(this) : "bind" !== t && "unbind" !== t ? (this._debug("Binding value  " + t + " not valid"), !1) : ("unbind" === t ? this.options.binder.unbind("smartscroll.infscr." + e.options.infid) : this.options.binder[t]("smartscroll.infscr." + e.options.infid, function () {
                e.scroll()
            }), void this._debug("Binding", t))
        }, _create: function (n, r) {
            var o = e.extend(!0, {}, e.infinitescroll.defaults, n);
            this.options = o;
            var s = e(t), a = this;
            if (!a._validate(n)) return !1;
            var l = e(o.nextSelector).attr("href");
            if (!l) return this._debug("Navigation selector not found"), !1;
            o.path = o.path || this._determinepath(l), o.contentSelector = o.contentSelector || this.element, o.loading.selector = o.loading.selector || o.contentSelector, o.loading.msg = o.loading.msg || e('<div id="infscr-loading"><img alt="Loading..." src="' + o.loading.img + '" /><div>' + o.loading.msgText + "</div></div>"), (new Image).src = o.loading.img, o.pixelsFromNavToBottom === i && (o.pixelsFromNavToBottom = e(document).height() - e(o.navSelector).offset().top, this._debug("pixelsFromNavToBottom: " + o.pixelsFromNavToBottom));
            var u = this;
            return o.loading.start = o.loading.start || function () {
                e(o.navSelector).hide(), o.loading.msg.appendTo(o.loading.selector).show(o.loading.speed, e.proxy(function () {
                    this.beginAjax(o)
                }, u))
            }, o.loading.finished = o.loading.finished || function () {
                o.state.isBeyondMaxPage || o.loading.msg.fadeOut(o.loading.speed)
            }, o.callback = function (t, n, a) {
                o.behavior && t["_callback_" + o.behavior] !== i && t["_callback_" + o.behavior].call(e(o.contentSelector)[0], n, a), r && r.call(e(o.contentSelector)[0], n, o, a), o.prefill && s.bind("resize.infinite-scroll", t._prefill)
            }, n.debug && (!Function.prototype.bind || "object" != typeof console && "function" != typeof console || "object" != typeof console.log || ["log", "info", "warn", "error", "assert", "dir", "clear", "profile", "profileEnd"].forEach(function (t) {
                console[t] = this.call(console[t], console)
            }, Function.prototype.bind)), this._setup(), o.prefill && this._prefill(), !0
        }, _prefill: function () {
            function i() {
                return n.options.contentSelector.height() <= r.height()
            }

            var n = this, r = e(t);
            this._prefill = function () {
                i() && n.scroll(), r.bind("resize.infinite-scroll", function () {
                    i() && (r.unbind("resize.infinite-scroll"), n.scroll())
                })
            }, this._prefill()
        }, _debug: function () {
            !0 === this.options.debug && ("undefined" != typeof console && "function" == typeof console.log ? 1 === Array.prototype.slice.call(arguments).length && "string" == typeof Array.prototype.slice.call(arguments)[0] ? console.log(Array.prototype.slice.call(arguments).toString()) : console.log(Array.prototype.slice.call(arguments)) : Function.prototype.bind || "undefined" == typeof console || "object" != typeof console.log || Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments)))
        }, _determinepath: function (t) {
            var e = this.options;
            if (e.behavior && this["_determinepath_" + e.behavior] !== i) return this["_determinepath_" + e.behavior].call(this, t);
            if (e.pathParse) return this._debug("pathParse manual"), e.pathParse(t, this.options.state.currPage + 1);
            if (t.match(/^(.*?)\b2\b(.*?$)/)) t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1); else if (t.match(/^(.*?)2(.*?$)/)) {
                if (t.match(/^(.*?page=)2(\/.*|$)/)) return t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1);
                t = t.match(/^(.*?)2(.*?$)/).slice(1)
            } else {
                if (t.match(/^(.*?page=)1(\/.*|$)/)) return t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1);
                this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), e.state.isInvalidPage = !0
            }
            return this._debug("determinePath", t), t
        }, _error: function (t) {
            var e = this.options;
            return e.behavior && this["_error_" + e.behavior] !== i ? void this["_error_" + e.behavior].call(this, t) : ("destroy" !== t && "end" !== t && (t = "unknown"), this._debug("Error", t), ("end" === t || e.state.isBeyondMaxPage) && this._showdonemsg(), e.state.isDone = !0, e.state.currPage = 1, e.state.isPaused = !1, e.state.isBeyondMaxPage = !1, void this._binding("unbind"))
        }, _loadcallback: function (n, r, o) {
            var s, a = this.options, l = this.options.callback,
                u = a.state.isDone ? "done" : a.appendCallback ? "append" : "no-append";
            if (a.behavior && this["_loadcallback_" + a.behavior] !== i) return void this["_loadcallback_" + a.behavior].call(this, n, r);
            switch (u) {
                case"done":
                    return this._showdonemsg(), !1;
                case"no-append":
                    "html" === a.dataType && (r = "<div>" + r + "</div>", r = e(r).find(a.itemSelector));
                    break;
                case"append":
                    var c = n.children();
                    if (0 === c.length) return this._error("end");
                    for (s = document.createDocumentFragment(); n[0].firstChild;) s.appendChild(n[0].firstChild);
                    this._debug("contentSelector", e(a.contentSelector)[0]), e(a.contentSelector)[0].appendChild(s), r = c.get()
            }
            if (a.loading.finished.call(e(a.contentSelector)[0], a), a.animate) {
                var d = e(t).scrollTop() + e(a.loading.msg).height() + a.extraScrollPx + "px";
                e("html,body").animate({scrollTop: d}, 800, function () {
                    a.state.isDuringAjax = !1
                })
            }
            a.animate || (a.state.isDuringAjax = !1), l(this, r, o), a.prefill && this._prefill()
        }, _nearbottom: function () {
            var n = this.options, r = 0 + e(document).height() - n.binder.scrollTop() - e(t).height();
            return n.behavior && this["_nearbottom_" + n.behavior] !== i ? this["_nearbottom_" + n.behavior].call(this) : (this._debug("math:", r, n.pixelsFromNavToBottom), r - n.bufferPx < n.pixelsFromNavToBottom)
        }, _pausing: function (t) {
            var e = this.options;
            if (e.behavior && this["_pausing_" + e.behavior] !== i) return void this["_pausing_" + e.behavior].call(this, t);
            switch ("pause" !== t && "resume" !== t && null !== t && this._debug("Invalid argument. Toggling pause value instead"), t = !t || "pause" !== t && "resume" !== t ? "toggle" : t) {
                case"pause":
                    e.state.isPaused = !0;
                    break;
                case"resume":
                    e.state.isPaused = !1;
                    break;
                case"toggle":
                    e.state.isPaused = !e.state.isPaused
            }
            return this._debug("Paused", e.state.isPaused), !1
        }, _setup: function () {
            var t = this.options;
            return t.behavior && this["_setup_" + t.behavior] !== i ? void this["_setup_" + t.behavior].call(this) : (this._binding("bind"), !1)
        }, _showdonemsg: function () {
            var t = this.options;
            return t.behavior && this["_showdonemsg_" + t.behavior] !== i ? void this["_showdonemsg_" + t.behavior].call(this) : (t.loading.msg.find("img").hide().parent().find("div").html(t.loading.finishedMsg).animate({opacity: 1}, 2e3, function () {
                e(this).parent().fadeOut(t.loading.speed)
            }), void t.errorCallback.call(e(t.contentSelector)[0], "done"))
        }, _validate: function (t) {
            for (var i in t) if (i.indexOf && i.indexOf("Selector") > -1 && 0 === e(t[i]).length) return this._debug("Your " + i + " found no elements."), !1;
            return !0
        }, bind: function () {
            this._binding("bind")
        }, destroy: function () {
            return this.options.state.isDestroyed = !0, this.options.loading.finished(), this._error("destroy")
        }, pause: function () {
            this._pausing("pause")
        }, resume: function () {
            this._pausing("resume")
        }, beginAjax: function (t) {
            var n, r, o, s, a = this, l = t.path;
            if (t.state.currPage++, t.maxPage != i && t.state.currPage > t.maxPage) return t.state.isBeyondMaxPage = !0, void this.destroy();
            switch (n = e(e(t.contentSelector).is("table, tbody") ? "<tbody/>" : "<div/>"), r = "function" == typeof l ? l(t.state.currPage) : l.join(t.state.currPage), a._debug("heading into ajax", r), o = "html" === t.dataType || "json" === t.dataType ? t.dataType : "html+callback", t.appendCallback && "html" === t.dataType && (o += "+callback"), o) {
                case"html+callback":
                    a._debug("Using HTML via .load() method"), n.load(r + " " + t.itemSelector, i, function (t) {
                        a._loadcallback(n, t, r)
                    });
                    break;
                case"html":
                    a._debug("Using " + o.toUpperCase() + " via $.ajax() method"), e.ajax({
                        url: r,
                        dataType: t.dataType,
                        complete: function (t, e) {
                            s = "undefined" != typeof t.isResolved ? t.isResolved() : "success" === e || "notmodified" === e, s ? a._loadcallback(n, t.responseText, r) : a._error("end")
                        }
                    });
                    break;
                case"json":
                    a._debug("Using " + o.toUpperCase() + " via $.ajax() method"), e.ajax({
                        dataType: "json",
                        type: "GET",
                        url: r,
                        success: function (e, o, l) {
                            if (s = "undefined" != typeof l.isResolved ? l.isResolved() : "success" === o || "notmodified" === o, t.appendCallback) if (t.template !== i) {
                                var u = t.template(e);
                                n.append(u), s ? a._loadcallback(n, u) : a._error("end")
                            } else a._debug("template must be defined."), a._error("end"); else s ? a._loadcallback(n, e, r) : a._error("end")
                        },
                        error: function () {
                            a._debug("JSON ajax request failed."), a._error("end")
                        }
                    })
            }
        }, retrieve: function (t) {
            t = t || null;
            var n = this, r = n.options;
            return r.behavior && this["retrieve_" + r.behavior] !== i ? void this["retrieve_" + r.behavior].call(this, t) : r.state.isDestroyed ? (this._debug("Instance is destroyed"), !1) : (r.state.isDuringAjax = !0, void r.loading.start.call(e(r.contentSelector)[0], r))
        }, scroll: function () {
            var t = this.options, e = t.state;
            return t.behavior && this["scroll_" + t.behavior] !== i ? void this["scroll_" + t.behavior].call(this) : void(e.isDuringAjax || e.isInvalidPage || e.isDone || e.isDestroyed || e.isPaused || this._nearbottom() && this.retrieve())
        }, toggle: function () {
            this._pausing()
        }, unbind: function () {
            this._binding("unbind")
        }, update: function (t) {
            e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
        }
    }, e.fn.infinitescroll = function (t, i) {
        var n = typeof t;
        switch (n) {
            case"string":
                var r = Array.prototype.slice.call(arguments, 1);
                this.each(function () {
                    var i = e.data(this, "infinitescroll");
                    return i && e.isFunction(i[t]) && "_" !== t.charAt(0) ? void i[t].apply(i, r) : !1
                });
                break;
            case"object":
                this.each(function () {
                    var n = e.data(this, "infinitescroll");
                    n ? n.update(t) : (n = new e.infinitescroll(t, i, this), n.failed || e.data(this, "infinitescroll", n))
                })
        }
        return this
    };
    var n, r = e.event;
    r.special.smartscroll = {
        setup: function () {
            e(this).bind("scroll", r.special.smartscroll.handler)
        }, teardown: function () {
            e(this).unbind("scroll", r.special.smartscroll.handler)
        }, handler: function (t, i) {
            var r = this, o = arguments;
            t.type = "smartscroll", n && clearTimeout(n), n = setTimeout(function () {
                e(r).trigger("smartscroll", o)
            }, "execAsap" === i ? 0 : 100)
        }
    }, e.fn.smartscroll = function (t) {
        return t ? this.bind("smartscroll", t) : this.trigger("smartscroll", ["execAsap"])
    }
}(window, jQuery), !function (t) {
    t.fn.hover3d = function (e) {
        var i = t.extend({
            selector: null,
            perspective: 1e3,
            sensitivity: 20,
            invert: !1,
            shine: !1,
            hoverInClass: "hover-in",
            hoverOutClass: "hover-out",
            hoverClass: "hover-3d"
        }, e);
        return this.each(function () {
            function e() {
                s.addClass(i.hoverInClass + " " + i.hoverClass), currentX = currentY = 0, setTimeout(function () {
                    s.removeClass(i.hoverInClass)
                }, 1e3)
            }

            function n(t) {
                var e = s.innerWidth(), n = s.innerHeight(), r = Math.round(t.pageX - s.offset().left),
                    o = Math.round(t.pageY - s.offset().top),
                    l = i.invert ? (e / 2 - r) / i.sensitivity : -(e / 2 - r) / i.sensitivity,
                    u = i.invert ? -(n / 2 - o) / i.sensitivity : (n / 2 - o) / i.sensitivity, c = r - e / 2,
                    d = o - n / 2, h = Math.atan2(d, c), p = 180 * h / Math.PI - 90;
                0 > p && (p += 360), s.css({
                    perspective: i.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateY(" + l + "deg) rotateX(" + u + "deg)"
                }), a.css("background", "linear-gradient(" + p + "deg, rgba(255,255,255," + t.offsetY / n * .5 + ") 0%,rgba(255,255,255,0) 80%)")
            }

            function r() {
                s.addClass(i.hoverOutClass + " " + i.hoverClass), s.css({
                    perspective: i.perspective + "px",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(0) rotateY(0)"
                }), setTimeout(function () {
                    s.removeClass(i.hoverOutClass + " " + i.hoverClass), currentX = currentY = 0
                }, 1e3)
            }

            var o = t(this), s = o.find(i.selector);
            currentX = 0, currentY = 0, i.shine && s.append('<div class="shine"></div>');
            var a = t(this).find(".shine");
            o.css({
                perspective: i.perspective + "px",
                transformStyle: "preserve-3d"
            }), s.css({perspective: i.perspective + "px", transformStyle: "preserve-3d"}), a.css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                transform: "translateZ(1px)",
                "z-index": 9
            }), o.on("mouseenter", function () {
                return e()
            }), o.on("mousemove", function (t) {
                return n(t)
            }), o.on("mouseleave", function () {
                return r()
            })
        })
    }
}(jQuery)