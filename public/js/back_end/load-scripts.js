if (typeof (jQuery) != "undefined") {
    if (typeof (jQuery.fn.hoverIntent) == "undefined") {
        (function (b) {
            b.fn.hoverIntent = function (p, r) {
                var g = {
                    sensitivity: 7,
                    interval: 100,
                    timeout: 0
                };
                g = b.extend(g, r ? {
                    over: p,
                    out: r
                } : p);
                var a, f, t, v;
                var u = function (c) {
                        a = c.pageX;
                        f = c.pageY
                    };
                var w = function (c, d) {
                        d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
                        if ((Math.abs(t - a) + Math.abs(v - f)) < g.sensitivity) {
                            b(d).unbind("mousemove", u);
                            d.hoverIntent_s = 1;
                            return g.over.apply(d, [c])
                        } else {
                            t = a;
                            v = f;
                            d.hoverIntent_t = setTimeout(function () {
                                w(c, d)
                            }, g.interval)
                        }
                    };
                var s = function (c, d) {
                        d.hoverIntent_t = clearTimeout(d.hoverIntent_t);
                        d.hoverIntent_s = 0;
                        return g.out.apply(d, [c])
                    };
                var x = function (e) {
                        var d = this;
                        var c = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
                        while (c && c != this) {
                            try {
                                c = c.parentNode
                            } catch (e) {
                                c = this
                            }
                        }
                        if (c == this) {
                            if (b.browser.mozilla) {
                                if (e.type == "mouseout") {
                                    d.mtout = setTimeout(function () {
                                        q(e, d)
                                    }, 30)
                                } else {
                                    if (d.mtout) {
                                        d.mtout = clearTimeout(d.mtout)
                                    }
                                }
                            }
                            return
                        } else {
                            if (d.mtout) {
                                d.mtout = clearTimeout(d.mtout)
                            }
                            q(e, d)
                        }
                    };
                var q = function (e, d) {
                        var c = jQuery.extend({}, e);
                        if (d.hoverIntent_t) {
                            d.hoverIntent_t = clearTimeout(d.hoverIntent_t)
                        }
                        if (e.type == "mouseover") {
                            t = c.pageX;
                            v = c.pageY;
                            b(d).bind("mousemove", u);
                            if (d.hoverIntent_s != 1) {
                                d.hoverIntent_t = setTimeout(function () {
                                    w(c, d)
                                }, g.interval)
                            }
                        } else {
                            b(d).unbind("mousemove", u);
                            if (d.hoverIntent_s == 1) {
                                d.hoverIntent_t = setTimeout(function () {
                                    s(c, d)
                                }, g.timeout)
                            }
                        }
                    };
                return this.mouseover(x).mouseout(x)
            }
        })(jQuery)
    }
    jQuery(document).ready(function (b) {
        var a = function (c, e) {
                var f = b(e),
                    d = f.attr("tabindex");
                if (d) {
                    f.attr("tabindex", "0").attr("tabindex", d)
                }
            };
        b("#imbulladminbar").removeClass("nojq").removeClass("nojs").find("li.menupop").hoverIntent({
            over: function (c) {
                b(this).addClass("hover")
            },
            out: function (c) {
                b(this).removeClass("hover")
            },
            timeout: 180,
            sensitivity: 7,
            interval: 100
        });
        b("#imbull-admin-bar-get-shortlink").click(function (c) {
            c.preventDefault();
            b(this).addClass("selected").children(".shortlink-input").blur(function () {
                b(this).parents("#imbull-admin-bar-get-shortlink").removeClass("selected")
            }).focus().select()
        });
        b("#imbulladminbar li.menupop > .ab-item").bind("keydown.adminbar", function (f) {
            if (f.which != 13) {
                return
            }
            var d = b(f.target),
                c = d.closest("ab-sub-wrapper");
            f.stopPropagation();
            f.preventDefault();
            if (!c.length) {
                c = b("#imbulladminbar .quicklinks")
            }
            c.find(".menupop").removeClass("hover");
            d.parent().toggleClass("hover");
            d.siblings(".ab-sub-wrapper").find(".ab-item").each(a)
        }).each(a);
        b("#imbulladminbar .ab-item").bind("keydown.adminbar", function (d) {
            if (d.which != 27) {
                return
            }
            var c = b(d.target);
            d.stopPropagation();
            d.preventDefault();
            c.closest(".hover").removeClass("hover").children(".ab-item").focus();
            c.siblings(".ab-sub-wrapper").find(".ab-item").each(a)
        })
    })
} else {
    (function (i, k) {
        var c = function (n, m, d) {
                if (n.addEventListener) {
                    n.addEventListener(m, d, false)
                } else {
                    if (n.attachEvent) {
                        n.attachEvent("on" + m, function () {
                            return d.call(n, window.event)
                        })
                    }
                }
            },
            e, f = new RegExp("\\bhover\\b", "g"),
            a = [],
            j = new RegExp("\\bselected\\b", "g"),
            g = function (m) {
                var d = a.length;
                while (d--) {
                    if (a[d] && m == a[d][1]) {
                        return a[d][0]
                    }
                }
                return false
            },
            h = function (s) {
                var n, d, q, m, p, r, u = [],
                    o = 0;
                while (s && s != e && s != i) {
                    if ("LI" == s.nodeName.toUpperCase()) {
                        u[u.length] = s;
                        d = g(s);
                        if (d) {
                            clearTimeout(d)
                        }
                        s.className = s.className ? (s.className.replace(f, "") + " hover") : "hover";
                        m = s
                    }
                    s = s.parentNode
                }
                if (m && m.parentNode) {
                    p = m.parentNode;
                    if (p && "UL" == p.nodeName.toUpperCase()) {
                        n = p.childNodes.length;
                        while (n--) {
                            r = p.childNodes[n];
                            if (r != m) {
                                r.className = r.className ? r.className.replace(j, "") : ""
                            }
                        }
                    }
                }
                n = a.length;
                while (n--) {
                    q = false;
                    o = u.length;
                    while (o--) {
                        if (u[o] == a[n][1]) {
                            q = true
                        }
                    }
                    if (!q) {
                        a[n][1].className = a[n][1].className ? a[n][1].className.replace(f, "") : ""
                    }
                }
            },
            l = function (d) {
                while (d && d != e && d != i) {
                    if ("LI" == d.nodeName.toUpperCase()) {
                        (function (m) {
                            var n = setTimeout(function () {
                                m.className = m.className ? m.className.replace(f, "") : ""
                            }, 500);
                            a[a.length] = [n, m]
                        })(d)
                    }
                    d = d.parentNode
                }
            },
            b = function (p) {
                var n, d, o, m = p.target || p.srcElement;
                while (true) {
                    if (!m || m == i || m == e) {
                        return
                    }
                    if (m.id && m.id == "imbull-admin-bar-get-shortlink") {
                        break
                    }
                    m = m.parentNode
                }
                if (p.preventDefault) {
                    p.preventDefault()
                }
                p.returnValue = false;
                if (-1 == m.className.indexOf("selected")) {
                    m.className += " selected"
                }
                for (n = 0, d = m.childNodes.length; n < d; n++) {
                    o = m.childNodes[n];
                    if (o.className && -1 != o.className.indexOf("shortlink-input")) {
                        o.focus();
                        o.select();
                        o.onblur = function () {
                            m.className = m.className ? m.className.replace(j, "") : ""
                        };
                        break
                    }
                }
                return false
            };
        c(k, "load", function () {
            e = i.getElementById("imbulladminbar");
            if (i.body && e) {
                i.body.appendChild(e);
                if (e.className) {
                    e.className = e.className.replace(/nojs/, "")
                }
                c(e, "mouseover", function (d) {
                    h(d.target || d.srcElement)
                });
                c(e, "mouseout", function (d) {
                    l(d.target || d.srcElement)
                });
                c(e, "click", b)
            }
            if (k.location.hash) {
                k.scrollBy(0, -32)
            }
        })
    })(document, window)
};
(function (a) {
    a.fn.hoverIntent = function (l, j) {
        var m = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        m = a.extend(m, j ? {
            over: l,
            out: j
        } : l);
        var o, n, h, d;
        var e = function (f) {
                o = f.pageX;
                n = f.pageY
            };
        var c = function (g, f) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
                if ((Math.abs(h - o) + Math.abs(d - n)) < m.sensitivity) {
                    a(f).unbind("mousemove", e);
                    f.hoverIntent_s = 1;
                    return m.over.apply(f, [g])
                } else {
                    h = o;
                    d = n;
                    f.hoverIntent_t = setTimeout(function () {
                        c(g, f)
                    }, m.interval)
                }
            };
        var i = function (g, f) {
                f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
                f.hoverIntent_s = 0;
                return m.out.apply(f, [g])
            };
        var b = function (q) {
                var f = this;
                var g = (q.type == "mouseover" ? q.fromElement : q.toElement) || q.relatedTarget;
                while (g && g != this) {
                    try {
                        g = g.parentNode
                    } catch (q) {
                        g = this
                    }
                }
                if (g == this) {
                    if (a.browser.mozilla) {
                        if (q.type == "mouseout") {
                            f.mtout = setTimeout(function () {
                                k(q, f)
                            }, 30)
                        } else {
                            if (f.mtout) {
                                f.mtout = clearTimeout(f.mtout)
                            }
                        }
                    }
                    return
                } else {
                    if (f.mtout) {
                        f.mtout = clearTimeout(f.mtout)
                    }
                    k(q, f)
                }
            };
        var k = function (p, f) {
                var g = jQuery.extend({}, p);
                if (f.hoverIntent_t) {
                    f.hoverIntent_t = clearTimeout(f.hoverIntent_t)
                }
                if (p.type == "mouseover") {
                    h = g.pageX;
                    d = g.pageY;
                    a(f).bind("mousemove", e);
                    if (f.hoverIntent_s != 1) {
                        f.hoverIntent_t = setTimeout(function () {
                            c(g, f)
                        }, m.interval)
                    }
                } else {
                    a(f).unbind("mousemove", e);
                    if (f.hoverIntent_s == 1) {
                        f.hoverIntent_t = setTimeout(function () {
                            i(g, f)
                        }, m.timeout)
                    }
                }
            };
        return this.mouseover(b).mouseout(b)
    }
})(jQuery);
var showNotice, adminMenu, columns, validateForm, screenMeta, autofold_menu;
(function (a) {
    adminMenu = {
        init: function () {},
        fold: function () {},
        restoreMenuState: function () {},
        toggle: function () {},
        favorites: function () {}
    };
    columns = {
        init: function () {
            var b = this;
            a(".hide-column-tog", "#adv-settings").click(function () {
                var d = a(this),
                    c = d.val();
                if (d.prop("checked")) {
                    b.checked(c)
                } else {
                    b.unchecked(c)
                }
                columns.saveManageColumnsState()
            })
        },
        saveManageColumnsState: function () {
            var b = this.hidden();
            a.post(ajaxurl, {
                action: "hidden-columns",
                hidden: b,
                screenoptionnonce: a("#screenoptionnonce").val(),
                page: pagenow
            })
        },
        checked: function (b) {
            a(".column-" + b).show();
            this.colSpanChange(+1)
        },
        unchecked: function (b) {
            a(".column-" + b).hide();
            this.colSpanChange(-1)
        },
        hidden: function () {
            return a(".manage-column").filter(":hidden").map(function () {
                return this.id
            }).get().join(",")
        },
        useCheckboxesForHidden: function () {
            this.hidden = function () {
                return a(".hide-column-tog").not(":checked").map(function () {
                    var b = this.id;
                    return b.substring(b, b.length - 5)
                }).get().join(",")
            }
        },
        colSpanChange: function (b) {
            var d = a("table").find(".colspanchange"),
                c;
            if (!d.length) {
                return
            }
            c = parseInt(d.attr("colspan"), 10) + b;

            d.attr("colspan", c.toString())
        }
    };
    a(document).ready(function () {
        columns.init()
    });
    validateForm = function (b) {
        return !a(b).find(".form-required").filter(function () {
            return a("input:visible", this).val() == ""
        }).addClass("form-invalid").find("input:visible").change(function () {
            a(this).closest(".form-invalid").removeClass("form-invalid")
        }).size()
    };
    showNotice = {
        warn: function () {
            var b = commonL10n.warnDelete || "";
            if (confirm(b)) {
                return true
            }
            return false
        },
        note: function (b) {
            alert(b)
        }
    };
    screenMeta = {
        element: null,
        toggles: null,
        page: null,
        init: function () {
            this.element = a("#screen-meta");
            this.toggles = a(".screen-meta-toggle a");
            this.page = a("#imbullcontent");
            this.toggles.click(this.toggleEvent)
        },
        toggleEvent: function (c) {
            var b = a(this.href.replace(/.+#/, "#"));
            c.preventDefault();
            if (!b.length) {
                return
            }
            if (b.is(":visible")) {
                screenMeta.close(b, a(this))
            } else {
                screenMeta.open(b, a(this))
            }
        },
        open: function (b, c) {
            a(".screen-meta-toggle").not(c.parent()).css("visibility", "hidden");
            b.parent().show();
            b.slideDown("fast", function () {
                c.addClass("screen-meta-active")
            })
        },
        close: function (b, c) {
            b.slideUp("fast", function () {
                c.removeClass("screen-meta-active");
                a(".screen-meta-toggle").css("visibility", "");
                b.parent().hide()
            })
        }
    };
    a(".contextual-help-tabs").delegate("a", "click focus", function (d) {
        var c = a(this),
            b;
        d.preventDefault();
        if (c.is(".active a")) {
            return false
        }
        a(".contextual-help-tabs .active").removeClass("active");
        c.parent("li").addClass("active");
        b = a(c.attr("href"));
        a(".help-tab-content").not(b).removeClass("active").hide();
        b.addClass("active").show()
    });
    a(document).ready(function () {
        var j = false,
            c, e, k, i, b = a("#adminmenu"),
            d = a("input.current-page"),
            f = d.val(),
            h, g;
        g = function (l, n) {
            var o = a(n),
                m = o.attr("tabindex");
            if (m) {
                o.attr("tabindex", "0").attr("tabindex", m)
            }
        };
        a("#collapse-menu", b).click(function () {
            var l = a(document.body);
            if (l.hasClass("folded")) {
                l.removeClass("folded");
                setUserSetting("mfold", "o")
            } else {
                l.addClass("folded");
                setUserSetting("mfold", "f")
            }
            return false
        });
        a("li.imbull-has-submenu", b).hoverIntent({
            over: function (t) {
                var u, r, l, s, n = a(this).find(".imbull-submenu"),
                    v, p, q;
                if (!a(document.body).hasClass("folded") && a(this).hasClass("imbull-menu-open")) {
                    return
                }
                v = a(this).offset().top;
                p = a(window).scrollTop();
                q = v - p - 30;
                u = v + n.height() + 1;
                r = a("#imbullwrap").height();
                l = 60 + u - r;
                s = a(window).height() + p - 15;
                if (s < (u - l)) {
                    l = u - s
                }
                if (l > q) {
                    l = q
                }
                if (l > 1) {
                    n.css({
                        marginTop: "-" + l + "px"
                    })
                } else {
                    if (n.css("marginTop")) {
                        n.css({
                            marginTop: ""
                        })
                    }
                }
                b.find(".imbull-submenu").removeClass("sub-open");
                n.addClass("sub-open")
            },
            out: function () {
                a(this).find(".imbull-submenu").removeClass("sub-open")
            },
            timeout: 200,
            sensitivity: 7,
            interval: 90
        });
        a("li.imbull-has-submenu > a.imbull-not-current-submenu", b).bind("keydown.adminmenu", function (m) {
            if (m.which != 13) {
                return
            }
            var l = a(m.target);
            m.stopPropagation();
            m.preventDefault();
            b.find(".imbull-submenu").removeClass("sub-open");
            l.siblings(".imbull-submenu").toggleClass("sub-open").find('a[role="menuitem"]').each(g)
        }).each(g);
        a('a[role="menuitem"]', b).bind("keydown.adminmenu", function (m) {
            if (m.which != 27) {
                return
            }
            var l = a(m.target);
            m.stopPropagation();
            m.preventDefault();
            l.add(l.siblings()).closest(".sub-open").removeClass("sub-open").siblings("a.imbull-not-current-submenu").focus()
        });
        a("div.wrap h2:first").nextAll("div.updated, div.error").addClass("below-h2");
        a("div.updated, div.error").not(".below-h2, .inline").insertAfter(a("div.wrap h2:first"));
        screenMeta.init();
        a("tbody").children().children(".check-column").find(":checkbox").click(function (l) {
            if ("undefined" == l.shiftKey) {
                return true
            }
            if (l.shiftKey) {
                if (!j) {
                    return true
                }
                c = a(j).closest("form").find(":checkbox");
                e = c.index(j);
                k = c.index(this);
                i = a(this).prop("checked");
                if (0 < e && 0 < k && e != k) {
                    c.slice(e, k).prop("checked", function () {
                        if (a(this).closest("tr").is(":visible")) {
                            return i
                        }
                        return false
                    })
                }
            }
            j = this;
            return true
        });
        a("thead, tfoot").find(".check-column :checkbox").click(function (n) {
            var o = a(this).prop("checked"),
                m = "undefined" == typeof toggleWithKeyboard ? false : toggleWithKeyboard,
                l = n.shiftKey || m;
            a(this).closest("table").children("tbody").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function () {
                if (a(this).closest("tr").is(":hidden")) {
                    return false
                }
                if (l) {
                    return a(this).prop("checked")
                } else {
                    if (o) {
                        return true
                    }
                }
                return false
            });
            a(this).closest("table").children("thead,  tfoot").filter(":visible").children().children(".check-column").find(":checkbox").prop("checked", function () {
                if (l) {
                    return false
                } else {
                    if (o) {
                        return true
                    }
                }
                return false
            })
        });
        a("#default-password-nag-no").click(function () {
            setUserSetting("default_password_nag", "hide");
            a("div.default-password-nag").hide();
            return false
        });
        a("#newcontent").bind("keydown.imbullevent_InsertTab", function (q) {
            if (q.keyCode != 9) {
                return true
            }
            var n = q.target,
                s = n.selectionStart,
                m = n.selectionEnd,
                r = n.value,
                l, p;
            try {
                this.lastKey = 9
            } catch (o) {}
            if (document.selection) {
                n.focus();
                p = document.selection.createRange();
                p.text = "\t"
            } else {
                if (s >= 0) {
                    l = this.scrollTop;
                    n.value = r.substring(0, s).concat("\t", r.substring(m));
                    n.selectionStart = n.selectionEnd = s + 1;
                    this.scrollTop = l
                }
            }
            if (q.stopPropagation) {
                q.stopPropagation()
            }
            if (q.preventDefault) {
                q.preventDefault()
            }
        });
        a("#newcontent").bind("blur.imbullevent_InsertTab", function (l) {
            if (this.lastKey && 9 == this.lastKey) {
                this.focus()
            }
        });
        if (d.length) {
            d.closest("form").submit(function (l) {
                if (a('select[name="action"]').val() == -1 && a('select[name="action2"]').val() == -1 && d.val() == f) {
                    d.val("1")
                }
            })
        }
        a(window).bind("resize.autofold", function () {
            if (getUserSetting("mfold") == "f") {
                return
            }
            var l = a(window).width();
            if (l <= 100) {
                if (!h) {
                    a(document.body).addClass("folded");
                    h = true
                }
            } else {
                if (h) {
                    a(document.body).removeClass("folded");
                    h = false
                }
            }
        }).triggerHandler("resize")
    });
    a(document).bind("imbull_CloseOnEscape", function (c, b) {
        if (typeof (b.cb) != "function") {
            return
        }
        if (typeof (b.condition) != "function" || b.condition()) {
            b.cb()
        }
        return true
    })
})(jQuery);
(function (d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
        d.fx.step[e] = function (g) {
            if (g.state == 0) {
                g.start = c(g.elem, e);
                g.end = b(g.end)
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }function c(g, e) {
        var f;
        do {
            f = d.curCSS(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);

(function ($) {
    $.scheduler = function () {
        this.bucket = {};
        return;
    };
    $.scheduler.prototype = {
        schedule: function () {
            var ctx = {
                "id": null,
                "time": 1000,
                "repeat": false,
                "protect": false,
                "obj": null,
                "func": function () {},
                "args": []
            };

            function _isfn(fn) {
                return ( !! fn && typeof fn != "string" && typeof fn[0] == "undefined" && RegExp("function", "i").test(fn + ""));
            };
            var i = 0;
            var override = false;
            if (typeof arguments[i] == "object" && arguments.length > 1) {
                override = true;
                i++;
            }
            if (typeof arguments[i] == "object") {
                for (var option in arguments[i])
                if (typeof ctx[option] != "undefined") ctx[option] = arguments[i][option];
                i++;
            }
            if (typeof arguments[i] == "number" || (typeof arguments[i] == "string" && arguments[i].match(RegExp("^[0-9]+[smhdw]$")))) ctx["time"] = arguments[i++];
            if (typeof arguments[i] == "boolean") ctx["repeat"] = arguments[i++];
            if (typeof arguments[i] == "boolean") ctx["protect"] = arguments[i++];
            if (typeof arguments[i] == "object" && typeof arguments[i + 1] == "string" && _isfn(arguments[i][arguments[i + 1]])) {
                ctx["obj"] = arguments[i++];
                ctx["func"] = arguments[i++];
            } else if (typeof arguments[i] != "undefined" && (_isfn(arguments[i]) || typeof arguments[i] == "string")) ctx["func"] = arguments[i++];
            while (typeof arguments[i] != "undefined")
            ctx["args"].push(arguments[i++]);
            if (override) {
                if (typeof arguments[1] == "object") {
                    for (var option in arguments[0])
                    if (typeof ctx[option] != "undefined" && typeof arguments[1][option] == "undefined") ctx[option] = arguments[0][option];
                } else {
                    for (var option in arguments[0])
                    if (typeof ctx[option] != "undefined") ctx[option] = arguments[0][option];
                }
                i++;
            }
            ctx["_scheduler"] = this;
            ctx["_handle"] = null;
            var match = String(ctx["time"]).match(RegExp("^([0-9]+)([smhdw])$"));
            if (match && match[0] != "undefined" && match[1] != "undefined") ctx["time"] = String(parseInt(match[1]) * {
                s: 1000,
                m: 1000 * 60,
                h: 1000 * 60 * 60,
                d: 1000 * 60 * 60 * 24,
                w: 1000 * 60 * 60 * 24 * 7
            }[match[2]]);
            if (ctx["id"] == null) ctx["id"] = (String(ctx["repeat"]) + ":" + String(ctx["protect"]) + ":" + String(ctx["time"]) + ":" + String(ctx["obj"]) + ":" + String(ctx["func"]) + ":" + String(ctx["args"]));
            if (ctx["protect"]) if (typeof this.bucket[ctx["id"]] != "undefined") return this.bucket[ctx["id"]];
            if (!_isfn(ctx["func"])) {
                if (ctx["obj"] != null && typeof ctx["obj"] == "object" && typeof ctx["func"] == "string" && _isfn(ctx["obj"][ctx["func"]])) ctx["func"] = ctx["obj"][ctx["func"]];
                else ctx["func"] = eval("function () { " + ctx["func"] + " }");
            }
            ctx["_handle"] = this._schedule(ctx);
            this.bucket[ctx["id"]] = ctx;
            return ctx;
        },
        reschedule: function (ctx) {
            if (typeof ctx == "string") ctx = this.bucket[ctx];
            ctx["_handle"] = this._schedule(ctx);
            return ctx;
        },
        _schedule: function (ctx) {
            var trampoline = function () {
                    var obj = (ctx["obj"] != null ? ctx["obj"] : ctx);
                    (ctx["func"]).apply(obj, ctx["args"]);
                    if (typeof (ctx["_scheduler"]).bucket[ctx["id"]] != "undefined" && ctx["repeat"])
                    (ctx["_scheduler"])._schedule(ctx);
                    else delete(ctx["_scheduler"]).bucket[ctx["id"]];
                };
            return setTimeout(trampoline, ctx["time"]);
        },
        cancel: function (ctx) {
            if (typeof ctx == "string") ctx = this.bucket[ctx];
            if (typeof ctx == "object") {
                clearTimeout(ctx["_handle"]);
                delete this.bucket[ctx["id"]];
            }
        }
    };
    $.extend({
        scheduler$: new $.scheduler(),
        schedule: function () {
            return $.scheduler$.schedule.apply($.scheduler$, arguments)
        },
        reschedule: function () {
            return $.scheduler$.reschedule.apply($.scheduler$, arguments)
        },
        cancel: function () {
            return $.scheduler$.cancel.apply($.scheduler$, arguments)
        }
    });
    $.fn.extend({
        schedule: function () {
            var a = [{}];
            for (var i = 0; i < arguments.length; i++)
            a.push(arguments[i]);
            return this.each(function () {
                a[0] = {
                    "id": this,
                    "obj": this
                };
                return $.schedule.apply($, a);
            });
        }
    });
})(jQuery);
var imbullAjax = jQuery.extend({
    unserialize: function (c) {
        var d = {},
            e, a, b, f;
        if (!c) {
            return d
        }
        e = c.split("?");
        if (e[1]) {
            c = e[1]
        }
        a = c.split("&");
        for (b in a) {
            if (jQuery.isFunction(a.hasOwnProperty) && !a.hasOwnProperty(b)) {
                continue
            }
            f = a[b].split("=");
            d[f[0]] = f[1]
        }
        return d
    },
    parseAjaxResponse: function (a, f, g) {
        var b = {},
            c = jQuery("#" + f).html(""),
            d = "";
        if (a && typeof a == "object" && a.getElementsByTagName("imbull_ajax")) {
            b.responses = [];
            b.errors = false;
            jQuery("response", a).each(function () {
                var h = jQuery(this),
                    i = jQuery(this.firstChild),
                    e;
                e = {
                    action: h.attr("action"),
                    what: i.get(0).nodeName,
                    id: i.attr("id"),
                    oldId: i.attr("old_id"),
                    position: i.attr("position")
                };
                e.data = jQuery("response_data", i).text();
                e.supplemental = {};
                if (!jQuery("supplemental", i).children().each(function () {
                    e.supplemental[this.nodeName] = jQuery(this).text()
                }).size()) {
                    e.supplemental = false
                }
                e.errors = [];
                if (!jQuery("imbull_error", i).each(function () {
                    var j = jQuery(this).attr("code"),
                        m, l, k;
                    m = {
                        code: j,
                        message: this.firstChild.nodeValue,
                        data: false
                    };
                    l = jQuery('imbull_error_data[code="' + j + '"]', a);
                    if (l) {
                        m.data = l.get()
                    }
                    k = jQuery("form-field", l).text();
                    if (k) {
                        j = k
                    }
                    if (g) {
                        imbullAjax.invalidateForm(jQuery("#" + g + ' :input[name="' + j + '"]').parents(".form-field:first"))
                    }
                    d += "<p>" + m.message + "</p>";
                    e.errors.push(m);
                    b.errors = true
                }).size()) {
                    e.errors = false
                }
                b.responses.push(e)
            });
            if (d.length) {
                c.html('<div class="error">' + d + "</div>")
            }
            return b
        }
        if (isNaN(a)) {
            return !c.html('<div class="error"><p>' + a + "</p></div>")
        }
        a = parseInt(a, 10);
        if (-1 == a) {
            return !c.html('<div class="error"><p>' + imbullAjax.noPerm + "</p></div>")
        } else {
            if (0 === a) {
                return !c.html('<div class="error"><p>' + imbullAjax.broken + "</p></div>")
            }
        }
        return true
    },
    invalidateForm: function (a) {
        return jQuery(a).addClass("form-invalid").find("input:visible").change(function () {
            jQuery(this).closest(".form-invalid").removeClass("form-invalid")
        })
    },
    validateForm: function (a) {
        a = jQuery(a);
        return !imbullAjax.invalidateForm(a.find(".form-required").filter(function () {
            return jQuery("input:visible", this).val() == ""
        })).size()
    }
}, imbullAjax || {
    noPerm: "You do not have permission to do that.",
    broken: "An unidentified error has occurred."
});
jQuery(document).ready(function (a) {
    a("form.validate").submit(function () {
        return imbullAjax.validateForm(a(this))
    })
});
var autosave, autosaveLast = "",
    autosavePeriodical, autosaveOldMessage = "",
    autosaveDelayPreview = false,
    notSaved = true,
    blockSave = false,
    fullscreen, autosaveLockRelease = true;
jQuery(document).ready(function (b) {
    var a = true;
    autosaveLast = b("#post #title").val() + b("#post #content").val();
    autosavePeriodical = b.schedule({
        time: autosaveL10n.autosaveInterval * 1000,
        func: function () {
            autosave()
        },
        repeat: true,
        protect: true
    });
    b("#post").submit(function () {
        b.cancel(autosavePeriodical);
        autosaveLockRelease = false
    });
    b('input[type="submit"], a.submitdelete', "#submitpost").click(function () {
        blockSave = true;
        window.onbeforeunload = null;
        b(":button, :submit", "#submitpost").each(function () {
            var c = b(this);
            if (c.hasClass("button-primary")) {
                c.addClass("button-primary-disabled")
            } else {
                c.addClass("button-disabled")
            }
        });
        if (b(this).attr("id") == "publish") {
            b("#ajax-loading").css("visibility", "visible")
        } else {
            b("#draft-ajax-loading").css("visibility", "visible")
        }
    });
    window.onbeforeunload = function () {
        var c = typeof (tinyMCE) != "undefined" ? tinyMCE.activeEditor : false,
            e, d;
        if (c && !c.isHidden()) {
            if (c.isDirty()) {
                return autosaveL10n.saveAlert
            }
        } else {
            if (fullscreen && fullscreen.settings.visible) {
                e = b("#imbull-fullscreen-title").val();
                d = b("#imbull_mce_fullscreen").val()
            } else {
                e = b("#post #title").val();
                d = b("#post #content").val()
            }
            if ((e || d) && e + d != autosaveLast) {
                return autosaveL10n.saveAlert
            }
        }
    };
    b(window).unload(function (c) {
        if (!autosaveLockRelease) {
            return
        }
        if (c.target && c.target.nodeName != "#document") {
            return
        }
        b.ajax({
            type: "POST",
            url: ajaxurl,
            async: false,
            data: {
                action: "imbull-remove-post-lock",
                _imbullnonce: b("#_imbullnonce").val(),
                post_ID: b("#post_ID").val(),
                active_post_lock: b("#active_post_lock").val()
            }
        })
    });
    b("#post-preview").click(function () {
        if (b("#auto_draft").val() == "1" && notSaved) {
            autosaveDelayPreview = true;
            autosave();
            return false
        }
        doPreview();
        return false
    });
    doPreview = function () {
        b("input#imbull-preview").val("dopreview");
        b("form#post").attr("target", "imbull-preview").submit().attr("target", "");
        if (b.browser.safari) {
            b("form#post").attr("action", function (c, d) {
                return d + "?t=" + new Date().getTime()
            })
        }
        b("input#imbull-preview").val("")
    };
    if (typeof tinyMCE != "undefined") {
        b("#title")[b.browser.opera ? "keypress" : "keydown"](function (c) {
            if (c.which == 9 && !c.shiftKey && !c.controlKey && !c.altKey) {
                if ((b("#auto_draft").val() == "1") && (b("#title").val().length > 0)) {
                    autosave()
                }
                if (tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden() && a) {
                    c.preventDefault();
                    a = false;
                    tinyMCE.activeEditor.focus();
                    return false
                }
            }
        })
    }
    if ("1" == b("#auto_draft").val()) {
        b("#title").blur(function () {
            if (!this.value || b("#auto_draft").val() != "1") {
                return
            }
            delayed_autosave()
        })
    }
});

function autosave_parse_response(c) {
    var d = imbullAjax.parseAjaxResponse(c, "autosave"),
        e = "",
        a, b;
    if (d && d.responses && d.responses.length) {
        e = d.responses[0].data;
        if (d.responses[0].supplemental) {
            b = d.responses[0].supplemental;
            if ("disable" == b.disable_autosave) {
                autosave = function () {};
                autosaveLockRelease = false;
                d = {
                    errors: true
                }
            }
            if (b["active-post-lock"]) {
                jQuery("#active_post_lock").val(b["active-post-lock"])
            }
            if (b.alert) {
                jQuery("#autosave-alert").remove();
                jQuery("#titlediv").after('<div id="autosave-alert" class="error below-h2"><p>' + b.alert + "</p></div>")
            }
            jQuery.each(b, function (f, g) {
                if (f.match(/^replace-/)) {
                    jQuery("#" + f.replace("replace-", "")).val(g)
                }
            })
        }
        if (!d.errors) {
            a = parseInt(d.responses[0].id, 10);
            if (!isNaN(a) && a > 0) {
                autosave_update_slug(a)
            }
        }
    }
    if (e) {
        jQuery(".autosave-message").html(e)
    } else {
        if (autosaveOldMessage && d) {
            jQuery(".autosave-message").html(autosaveOldMessage)
        }
    }
    return d
}function autosave_saved(a) {
    blockSave = false;
    autosave_parse_response(a);
    autosave_enable_buttons()
}function autosave_saved_new(b) {
    blockSave = false;
    var c = autosave_parse_response(b),
        a;
    if (c && c.responses.length && !c.errors) {
        a = parseInt(c.responses[0].id, 10);
        if (!isNaN(a) && a > 0) {
            notSaved = false;
            jQuery("#auto_draft").val("0")
        }
        autosave_enable_buttons();
        if (autosaveDelayPreview) {
            autosaveDelayPreview = false;
            doPreview()
        }
    } else {
        autosave_enable_buttons()
    }
}function autosave_update_slug(a) {
    if ("undefined" != makeSlugeditClickable && jQuery.isFunction(makeSlugeditClickable) && !jQuery("#edit-slug-box > *").size()) {
        jQuery.post(ajaxurl, {
            action: "sample-permalink",
            post_id: a,
            new_title: fullscreen && fullscreen.settings.visible ? jQuery("#imbull-fullscreen-title").val() : jQuery("#title").val(),
            samplepermalinknonce: jQuery("#samplepermalinknonce").val()
        }, function (b) {
            if (b !== "-1") {
                jQuery("#edit-slug-box").html(b);
                makeSlugeditClickable()
            }
        })
    }
}function autosave_loading() {
    jQuery(".autosave-message").html(autosaveL10n.savingText)
}function autosave_enable_buttons() {
    setTimeout(function () {
        jQuery(":button, :submit", "#submitpost").removeAttr("disabled");
        jQuery(".ajax-loading").css("visibility", "hidden")
    }, 500)
}function autosave_disable_buttons() {
    jQuery(":button, :submit", "#submitpost").prop("disabled", true);
    setTimeout(autosave_enable_buttons, 5000)
}function delayed_autosave() {
    setTimeout(function () {
        if (blockSave) {
            return
        }
        autosave()
    }, 200)
}
autosave = function () {
    blockSave = true;
    var c = (typeof tinyMCE != "undefined") && tinyMCE.activeEditor && !tinyMCE.activeEditor.isHidden(),
        d, f, b, e, a;
    autosave_disable_buttons();
    d = {
        action: "autosave",
        post_ID: jQuery("#post_ID").val() || 0,
        autosavenonce: jQuery("#autosavenonce").val(),
        post_type: jQuery("#post_type").val() || "",
        autosave: 1
    };
    jQuery(".tags-input").each(function () {
        d[this.name] = this.value
    });
    f = true;
    if (jQuery("#TB_window").css("display") == "block") {
        f = false
    }
    if (c && f) {
        b = tinyMCE.activeEditor;
        if (b.plugins.spellchecker && b.plugins.spellchecker.active) {
            f = false
        } else {
            if ("mce_fullscreen" == b.id || "imbull_mce_fullscreen" == b.id) {
                tinyMCE.get("content").setContent(b.getContent({
                    format: "raw"
                }), {
                    format: "raw"
                })
            }
            tinyMCE.triggerSave()
        }
    }
    if (fullscreen && fullscreen.settings.visible) {
        d.post_title = jQuery("#imbull-fullscreen-title").val() || "";
        d.content = jQuery("#imbull_mce_fullscreen").val() || ""
    } else {
        d.post_title = jQuery("#title").val() || "";
        d.content = jQuery("#content").val() || ""
    }
    if (jQuery("#post_name").val()) {
        d.post_name = jQuery("#post_name").val()
    }
    if ((d.post_title.length == 0 && d.content.length == 0) || d.post_title + d.content == autosaveLast) {
        f = false
    }
    e = jQuery("#original_post_status").val();
    goodcats = ([]);
    jQuery("[name='post_category[]']:checked").each(function (g) {
        goodcats.push(this.value)
    });
    d.catslist = goodcats.join(",");
    if (jQuery("#comment_status").prop("checked")) {
        d.comment_status = "open"
    }
    if (jQuery("#ping_status").prop("checked")) {
        d.ping_status = "open"
    }
    if (jQuery("#excerpt").size()) {
        d.excerpt = jQuery("#excerpt").val()
    }
    if (jQuery("#post_author").size()) {
        d.post_author = jQuery("#post_author").val()
    }
    if (jQuery("#parent_id").val()) {
        d.parent_id = jQuery("#parent_id").val()
    }
    d.user_ID = jQuery("#user-id").val();
    if (jQuery("#auto_draft").val() == "1") {
        d.auto_draft = "1"
    }
    if (f) {
        autosaveLast = d.post_title + d.content;
        jQuery(document).triggerHandler("imbullcountwords", [d.content])
    } else {
        d.autosave = 0
    }
    if (d.auto_draft == "1") {
        a = autosave_saved_new
    } else {
        a = autosave_saved
    }
    autosaveOldMessage = jQuery("#autosave").html();
    jQuery.ajax({
        data: d,
        beforeSend: f ? autosave_loading : null,
        type: "POST",
        url: ajaxurl,
        success: a
    })
};
(function (b) {
    var a = {
        add: "ajaxAdd",
        del: "ajaxDel",
        dim: "ajaxDim",
        process: "process",
        recolor: "recolor"
    },
        c;
    c = {
        settings: {
            url: ajaxurl,
            type: "POST",
            response: "ajax-response",
            what: "",
            alt: "alternate",
            altOffset: 0,
            addColor: null,
            delColor: null,
            dimAddColor: null,
            dimDelColor: null,
            confirm: null,
            addBefore: null,
            addAfter: null,
            delBefore: null,
            delAfter: null,
            dimBefore: null,
            dimAfter: null
        },
        nonce: function (g, f) {
            var d = imbullAjax.unserialize(g.attr("href"));
            return f.nonce || d._ajax_nonce || b("#" + f.element + ' input[name="_ajax_nonce"]').val() || d._imbullnonce || b("#" + f.element + ' input[name="_imbullnonce"]').val() || 0
        },
        parseClass: function (h, f) {
            var i = [],
                d;
            try {
                d = b(h).attr("class") || "";
                d = d.match(new RegExp(f + ":[\\S]+"));
                if (d) {
                    i = d[0].split(":")
                }
            } catch (g) {}
            return i
        },
        pre: function (i, g, d) {
            var f, h;
            g = b.extend({}, this.imbullList.settings, {
                element: null,
                nonce: 0,
                target: i.get(0)
            }, g || {});
            if (b.isFunction(g.confirm)) {
                if ("add" != d) {
                    f = b("#" + g.element).css("backgroundColor");
                    b("#" + g.element).css("backgroundColor", "#FF9966")
                }
                h = g.confirm.call(this, i, g, d, f);
                if ("add" != d) {
                    b("#" + g.element).css("backgroundColor", f)
                }
                if (!h) {
                    return false
                }
            }
            return g
        },
        ajaxAdd: function (g, m) {
            g = b(g);
            m = m || {};
            var h = this,
                l = c.parseClass(g, "add"),
                j, d, f, i, k;
            m = c.pre.call(h, g, m, "add");
            m.element = l[2] || g.attr("id") || m.element || null;
            if (l[3]) {
                m.addColor = "#" + l[3]
            } else {
                m.addColor = m.addColor || "#FFFF33"
            }
            if (!m) {
                return false
            }
            if (!g.is('[class^="add:' + h.id + ':"]')) {
                return !c.add.call(h, g, m)
            }
            if (!m.element) {
                return true
            }
            m.action = "add-" + m.what;
            m.nonce = c.nonce(g, m);
            j = b("#" + m.element + " :input").not('[name="_ajax_nonce"], [name="_imbullnonce"], [name="action"]');
            d = imbullAjax.validateForm("#" + m.element);
            if (!d) {
                return false
            }
            m.data = b.param(b.extend({
                _ajax_nonce: m.nonce,
                action: m.action
            }, imbullAjax.unserialize(l[4] || "")));
            f = b.isFunction(j.fieldSerialize) ? j.fieldSerialize() : j.serialize();
            if (f) {
                m.data += "&" + f
            }
            if (b.isFunction(m.addBefore)) {
                m = m.addBefore(m);
                if (!m) {
                    return true
                }
            }
            if (!m.data.match(/_ajax_nonce=[a-f0-9]+/)) {
                return true
            }
            m.success = function (e) {
                i = imbullAjax.parseAjaxResponse(e, m.response, m.element);
                k = e;
                if (!i || i.errors) {
                    return false
                }
                if (true === i) {
                    return true
                }
                jQuery.each(i.responses, function () {
                    c.add.call(h, this.data, b.extend({}, m, {
                        pos: this.position || 0,
                        id: this.id || 0,
                        oldId: this.oldId || null
                    }))
                });
                h.imbullList.recolor();
                b(h).trigger("imbullListAddEnd", [m, h.imbullList]);
                c.clear.call(h, "#" + m.element)
            };
            m.complete = function (e, n) {
                if (b.isFunction(m.addAfter)) {
                    var o = b.extend({
                        xml: e,
                        status: n,
                        parsed: i
                    }, m);
                    m.addAfter(k, o)
                }
            };
            b.ajax(m);
            return false
        },
        ajaxDel: function (k, i) {
            k = b(k);
            i = i || {};
            var j = this,
                d = c.parseClass(k, "delete"),
                h, g, f;
            i = c.pre.call(j, k, i, "delete");
            i.element = d[2] || i.element || null;
            if (d[3]) {
                i.delColor = "#" + d[3]
            } else {
                i.delColor = i.delColor || "#faa"
            }
            if (!i || !i.element) {
                return false
            }
            i.action = "delete-" + i.what;
            i.nonce = c.nonce(k, i);
            i.data = b.extend({
                action: i.action,
                id: i.element.split("-").pop(),
                _ajax_nonce: i.nonce
            }, imbullAjax.unserialize(d[4] || ""));
            if (b.isFunction(i.delBefore)) {
                i = i.delBefore(i, j);
                if (!i) {
                    return true
                }
            }
            if (!i.data._ajax_nonce) {
                return true
            }
            h = b("#" + i.element);
            if ("none" != i.delColor) {
                h.css("backgroundColor", i.delColor).fadeOut(350, function () {
                    j.imbullList.recolor();
                    b(j).trigger("imbullListDelEnd", [i, j.imbullList])
                })
            } else {
                j.imbullList.recolor();
                b(j).trigger("imbullListDelEnd", [i, j.imbullList])
            }
            i.success = function (e) {
                g = imbullAjax.parseAjaxResponse(e, i.response, i.element);
                f = e;
                if (!g || g.errors) {
                    h.stop().stop().css("backgroundColor", "#faa").show().queue(function () {
                        j.imbullList.recolor();
                        b(this).dequeue()
                    });
                    return false
                }
            };
            i.complete = function (e, l) {
                if (b.isFunction(i.delAfter)) {
                    h.queue(function () {
                        var m = b.extend({
                            xml: e,
                            status: l,
                            parsed: g
                        }, i);
                        i.delAfter(f, m)
                    }).dequeue()
                }
            };
            b.ajax(i);
            return false
        },
        ajaxDim: function (h, n) {
            if (b(h).parent().css("display") == "none") {
                return false
            }
            h = b(h);
            n = n || {};
            var i = this,
                m = c.parseClass(h, "dim"),
                g, d, f, k, j, l;
            n = c.pre.call(i, h, n, "dim");
            n.element = m[2] || n.element || null;
            n.dimClass = m[3] || n.dimClass || null;
            if (m[4]) {
                n.dimAddColor = "#" + m[4]
            } else {
                n.dimAddColor = n.dimAddColor || "#FFFF33"
            }
            if (m[5]) {
                n.dimDelColor = "#" + m[5]
            } else {
                n.dimDelColor = n.dimDelColor || "#FF3333"
            }
            if (!n || !n.element || !n.dimClass) {
                return true
            }
            n.action = "dim-" + n.what;
            n.nonce = c.nonce(h, n);
            n.data = b.extend({
                action: n.action,
                id: n.element.split("-").pop(),
                dimClass: n.dimClass,
                _ajax_nonce: n.nonce
            }, imbullAjax.unserialize(m[6] || ""));
            if (b.isFunction(n.dimBefore)) {
                n = n.dimBefore(n);
                if (!n) {
                    return true
                }
            }
            g = b("#" + n.element);
            d = g.toggleClass(n.dimClass).is("." + n.dimClass);
            f = c.getColor(g);
            g.toggleClass(n.dimClass);
            k = d ? n.dimAddColor : n.dimDelColor;
            if ("none" != k) {
                g.animate({
                    backgroundColor: k
                }, "fast").queue(function () {
                    g.toggleClass(n.dimClass);
                    b(this).dequeue()
                }).animate({
                    backgroundColor: f
                }, {
                    complete: function () {
                        b(this).css("backgroundColor", "");
                        b(i).trigger("imbullListDimEnd", [n, i.imbullList])
                    }
                })
            } else {
                b(i).trigger("imbullListDimEnd", [n, i.imbullList])
            }
            if (!n.data._ajax_nonce) {
                return true
            }
            n.success = function (e) {
                j = imbullAjax.parseAjaxResponse(e, n.response, n.element);
                l = e;
                if (!j || j.errors) {
                    g.stop().stop().css("backgroundColor", "#FF3333")[d ? "removeClass" : "addClass"](n.dimClass).show().queue(function () {
                        i.imbullList.recolor();
                        b(this).dequeue()
                    });
                    return false
                }
            };
            n.complete = function (e, o) {
                if (b.isFunction(n.dimAfter)) {
                    g.queue(function () {
                        var p = b.extend({
                            xml: e,
                            status: o,
                            parsed: j
                        }, n);
                        n.dimAfter(l, p)
                    }).dequeue()
                }
            };
            b.ajax(n);
            return false
        },
        getColor: function (e) {
            var d = jQuery(e).css("backgroundColor");
            return d || "#ffffff"
        },
        add: function (k, g) {
            k = b(k);
            var i = b(this),
                d = false,
                j = {
                    pos: 0,
                    id: 0,
                    oldId: null
                },
                l, h, f;
            if ("string" == typeof g) {
                g = {
                    what: g
                }
            }
            g = b.extend(j, this.imbullList.settings, g);
            if (!k.size() || !g.what) {
                return false
            }
            if (g.oldId) {
                d = b("#" + g.what + "-" + g.oldId)
            }
            if (g.id && (g.id != g.oldId || !d || !d.size())) {
                b("#" + g.what + "-" + g.id).remove()
            }
            if (d && d.size()) {
                d.before(k);
                d.remove()
            } else {
                if (isNaN(g.pos)) {
                    l = "after";
                    if ("-" == g.pos.substr(0, 1)) {
                        g.pos = g.pos.substr(1);
                        l = "before"
                    }
                    h = i.find("#" + g.pos);
                    if (1 === h.size()) {
                        h[l](k)
                    } else {
                        i.append(k)
                    }
                } else {
                    if ("comment" != g.what || 0 === b("#" + g.element).length) {
                        if (g.pos < 0) {
                            i.prepend(k)
                        } else {
                            i.append(k)
                        }
                    }
                }
            }
            if (g.alt) {
                if ((i.children(":visible").index(k[0]) + g.altOffset) % 2) {
                    k.removeClass(g.alt)
                } else {
                    k.addClass(g.alt)
                }
            }
            if ("none" != g.addColor) {
                f = c.getColor(k);
                k.css("backgroundColor", g.addColor).animate({
                    backgroundColor: f
                }, {
                    complete: function () {
                        b(this).css("backgroundColor", "")
                    }
                })
            }
            i.each(function () {
                this.imbullList.process(k)
            });
            return k
        },
        clear: function (h) {
            var g = this,
                f, d;
            h = b(h);
            if (g.imbullList && h.parents("#" + g.id).size()) {
                return
            }
            h.find(":input").each(function () {
                if (b(this).parents(".form-no-clear").size()) {
                    return
                }
                f = this.type.toLowerCase();
                d = this.tagName.toLowerCase();
                if ("text" == f || "password" == f || "textarea" == d) {
                    this.value = ""
                } else {
                    if ("checkbox" == f || "radio" == f) {
                        this.checked = false
                    } else {
                        if ("select" == d) {
                            this.selectedIndex = null
                        }
                    }
                }
            })
        },
        process: function (e) {
            var f = this,
                d = b(e || document);
            d.delegate('form[class^="add:' + f.id + ':"]', "submit", function () {
                return f.imbullList.add(this)
            });
            d.delegate('[class^="add:' + f.id + ':"]:not(form)', "click", function () {
                return f.imbullList.add(this)
            });
            d.delegate('[class^="delete:' + f.id + ':"]', "click", function () {
                return f.imbullList.del(this)
            });
            d.delegate('[class^="dim:' + f.id + ':"]', "click", function () {
                return f.imbullList.dim(this)
            })
        },
        recolor: function () {
            var f = this,
                e, d;
            if (!f.imbullList.settings.alt) {
                return
            }
            e = b(".list-item:visible", f);
            if (!e.size()) {
                e = b(f).children(":visible")
            }
            d = [":even", ":odd"];
            if (f.imbullList.settings.altOffset % 2) {
                d.reverse()
            }
            e.filter(d[0]).addClass(f.imbullList.settings.alt).end().filter(d[1]).removeClass(f.imbullList.settings.alt)
        },
        init: function () {
            var d = this;
            d.imbullList.process = function (e) {
                d.each(function () {
                    this.imbullList.process(e)
                })
            };
            d.imbullList.recolor = function () {
                d.each(function () {
                    this.imbullList.recolor()
                })
            }
        }
    };
    b.fn.imbullList = function (d) {
        this.each(function () {
            var e = this;
            this.imbullList = {
                settings: b.extend({}, c.settings, {
                    what: c.parseClass(this, "list")[1] || ""
                }, d)
            };
            b.each(a, function (g, h) {
                e.imbullList[g] = function (i, f) {
                    return c[h].call(e, i, f)
                }
            })
        });
        c.init.call(this);
        this.imbullList.process();
        return this
    }
})(jQuery);
var QTags, edButtons = [],
    edCanvas, edAddTag = function () {},
    edCheckOpenTags = function () {},
    edCloseAllTags = function () {},
    edInsertImage = function () {},
    edInsertLink = function () {},
    edInsertTag = function () {},
    edLink = function () {},
    edQuickLink = function () {},
    edRemoveTag = function () {},
    edShowButton = function () {},
    edShowLinks = function () {},
    edSpell = function () {},
    edToolbar = function () {};

function quicktags(a) {
    return new QTags(a)
}function edInsertContent(b, a) {
    return QTags.insertContent(a)
}function edButton(f, e, c, b, a, d) {
    return QTags.addButton(f, e, c, b, a, "", -1)
}(function () {
    var b = function (g) {
            var f, e, d;
            if (typeof jQuery != "undefined") {
                jQuery(document).ready(g)
            } else {
                f = b;
                f.funcs = [];
                f.ready = function () {
                    if (!f.isReady) {
                        f.isReady = true;
                        for (e = 0; e < f.funcs.length; e++) {
                            f.funcs[e]()
                        }
                    }
                };
                if (f.isReady) {
                    g()
                } else {
                    f.funcs.push(g)
                }
                if (!f.eventAttached) {
                    if (document.addEventListener) {
                        d = function () {
                            document.removeEventListener("DOMContentLoaded", d, false);
                            f.ready()
                        };
                        document.addEventListener("DOMContentLoaded", d, false);
                        window.addEventListener("load", f.ready, false)
                    } else {
                        if (document.attachEvent) {
                            d = function () {
                                if (document.readyState === "complete") {
                                    document.detachEvent("onreadystatechange", d);
                                    f.ready()
                                }
                            };
                            document.attachEvent("onreadystatechange", d);
                            window.attachEvent("onload", f.ready);
                            (function () {
                                try {
                                    document.documentElement.doScroll("left")
                                } catch (h) {
                                    setTimeout(arguments.callee, 50);
                                    return
                                }
                                f.ready()
                            })()
                        }
                    }
                    f.eventAttached = true
                }
            }
        },
        a = (function () {
            var d = new Date(),
                e;
            e = function (f) {
                var g = f.toString();
                if (g.length < 2) {
                    g = "0" + g
                }
                return g
            };
            return d.getUTCFullYear() + "-" + e(d.getUTCMonth() + 1) + "-" + e(d.getUTCDate()) + "T" + e(d.getUTCHours()) + ":" + e(d.getUTCMinutes()) + ":" + e(d.getUTCSeconds()) + "+00:00"
        })(),
        c;
    c = QTags = function (j) {
        if (typeof (j) == "string") {
            j = {
                id: j
            }
        } else {
            if (typeof (j) != "object") {
                return false
            }
        }
        var i = this,
            k = j.id,
            h = document.getElementById(k),
            g = "qt_" + k,
            d, f, e;
        if (!k || !h) {
            return false
        }
        i.name = g;
        i.id = k;
        i.canvas = h;
        i.settings = j;
        if (k == "content" && typeof (adminpage) == "string" && (adminpage == "post-new-php" || adminpage == "post-php")) {
            edCanvas = h;
            e = "ed_toolbar"
        } else {
            e = g + "_toolbar"
        }
        d = document.createElement("div");
        d.id = e;
        d.className = "quicktags-toolbar";
        h.parentNode.insertBefore(d, h);
        i.toolbar = d;
        f = function (n) {
            n = n || window.event;
            var m = n.target || n.srcElement,
                l;
            if (/ ed_button /.test(" " + m.className + " ")) {
                i.canvas = h = document.getElementById(k);
                l = m.id.replace(g + "_", "");
                if (i.theButtons[l]) {
                    i.theButtons[l].callback.call(i.theButtons[l], m, h, i)
                }
            }
        };
        if (d.addEventListener) {
            d.addEventListener("click", f, false)
        } else {
            if (d.attachEvent) {
                d.attachEvent("onclick", f)
            }
        }
        i.getButton = function (l) {
            return i.theButtons[l]
        };
        i.getButtonElement = function (l) {
            return document.getElementById(g + "_" + l)
        };
        c.instances[k] = i;
        if (!c.instances[0]) {
            c.instances[0] = c.instances[k];
            b(function () {
                c._buttonsInit()
            })
        }
    };
    c.instances = {};
    c.getInstance = function (d) {
        return c.instances[d]
    };
    c._buttonsInit = function () {
        var p = this,
            g, e, h, o, m, l, n, f, k, d, j = ",strong,em,link,block,del,ins,img,ul,ol,li,code,more,spell,close,";
        for (l in p.instances) {
            if (l == 0) {
                continue
            }
            n = p.instances[l];
            g = n.canvas;
            e = n.name;
            h = n.settings;
            m = "";
            o = {};
            d = "";
            if (h.buttons) {
                d = "," + h.buttons + ","
            }
            for (k in edButtons) {
                if (!edButtons[k]) {
                    continue
                }
                f = edButtons[k].id;
                if (d && j.indexOf("," + f + ",") != -1 && d.indexOf("," + f + ",") == -1) {
                    continue
                }
                if (!edButtons[k].instance || edButtons[k].instance == l) {
                    o[f] = edButtons[k];
                    if (edButtons[k].html) {
                        m += edButtons[k].html(e + "_")
                    }
                }
            }
            if (d && d.indexOf(",fullscreen,") != -1) {
                o.fullscreen = new c.FullscreenButton();
                m += o.fullscreen.html(e + "_")
            }
            n.toolbar.innerHTML = m;
            n.theButtons = o
        }
        p.buttonsInitDone = true
    };
    c.addButton = function (e, i, h, g, d, j, k, l) {
        var f;
        if (!e || !i) {
            return
        }
        k = k || 0;
        g = g || "";
        if (typeof (h) === "function") {
            f = new c.Button(e, i, d, j, l);
            f.callback = h
        } else {
            if (typeof (h) === "string") {
                f = new c.TagButton(e, i, h, g, d, j, l)
            } else {
                return
            }
        }
        if (k == -1) {
            return f
        }
        if (k > 0) {
            while (typeof (edButtons[k]) != "undefined") {
                k++
            }
            edButtons[k] = f
        } else {
            edButtons[edButtons.length] = f
        }
        if (this.buttonsInitDone) {
            this._buttonsInit()
        }
    };
    c.insertContent = function (g) {
        var h, f, e, i, j, d = document.getElementById(imbullActiveEditor);
        if (!d) {
            return false
        }
        if (document.selection) {
            d.focus();
            h = document.selection.createRange();
            h.text = g;
            d.focus()
        } else {
            if (d.selectionStart || d.selectionStart == "0") {
                j = d.value;
                f = d.selectionStart;
                e = d.selectionEnd;
                i = d.scrollTop;
                d.value = j.substring(0, f) + g + j.substring(e, j.length);
                d.focus();
                d.selectionStart = f + g.length;
                d.selectionEnd = f + g.length;
                d.scrollTop = i
            } else {
                d.value += g;
                d.focus()
            }
        }
        return true
    };
    c.Button = function (i, g, e, h, d) {
        var f = this;
        f.id = i;
        f.display = g;
        f.access = e;
        f.title = h || "";
        f.instance = d || ""
    };
    c.Button.prototype.html = function (e) {
        var d = this.access ? ' accesskey="' + this.access + '"' : "";
        return '<input type="button" id="' + e + this.id + '"' + d + ' class="ed_button" title="' + this.title + '" value="' + this.display + '" />'
    };
    c.Button.prototype.callback = function () {};
    c.TagButton = function (k, i, g, f, e, j, d) {
        var h = this;
        c.Button.call(h, k, i, e, j, d);
        h.tagStart = g;
        h.tagEnd = f
    };
    c.TagButton.prototype = new c.Button();
    c.TagButton.prototype.openTag = function (g, d) {
        var f = this;
        if (!d.openTags) {
            d.openTags = []
        }
        if (f.tagEnd) {
            d.openTags.push(f.id);
            g.value = "/" + g.value
        }
    };
    c.TagButton.prototype.closeTag = function (h, d) {
        var g = this,
            f = g.isOpen(d);
        if (f !== false) {
            d.openTags.splice(f, 1)
        }
        h.value = g.display
    };
    c.TagButton.prototype.isOpen = function (d) {
        var g = this,
            f = 0,
            e = false;
        if (d.openTags) {
            while (e === false && f < d.openTags.length) {
                e = d.openTags[f] == g.id ? f : false;
                f++
            }
        } else {
            e = false
        }
        return e
    };
    c.TagButton.prototype.callback = function (o, h, p) {
        var u = this,
            q, e, m, g, s = h.value,
            j, d, n, f, k = s ? u.tagEnd : "";
        if (document.selection) {
            h.focus();
            f = document.selection.createRange();
            if (f.text.length > 0) {
                if (!u.tagEnd) {
                    f.text = f.text + u.tagStart
                } else {
                    f.text = u.tagStart + f.text + k
                }
            } else {
                if (!u.tagEnd) {
                    f.text = u.tagStart
                } else {
                    if (u.isOpen(p) === false) {
                        f.text = u.tagStart;
                        u.openTag(o, p)
                    } else {
                        f.text = k;
                        u.closeTag(o, p)
                    }
                }
            }
            h.focus()
        } else {
            if (h.selectionStart || h.selectionStart == "0") {
                q = h.selectionStart;
                e = h.selectionEnd;
                m = e;
                g = h.scrollTop;
                j = s.substring(0, q);
                d = s.substring(e, s.length);
                n = s.substring(q, e);
                if (q != e) {
                    if (!u.tagEnd) {
                        h.value = j + n + u.tagStart + d;
                        m += u.tagStart.length
                    } else {
                        h.value = j + u.tagStart + n + k + d;
                        m += u.tagStart.length + k.length
                    }
                } else {
                    if (!u.tagEnd) {
                        h.value = j + u.tagStart + d;
                        m = q + u.tagStart.length
                    } else {
                        if (u.isOpen(p) === false) {
                            h.value = j + u.tagStart + d;
                            u.openTag(o, p);
                            m = q + u.tagStart.length
                        } else {
                            h.value = j + k + d;
                            m = q + k.length;
                            u.closeTag(o, p)
                        }
                    }
                }
                h.focus();
                h.selectionStart = m;
                h.selectionEnd = m;
                h.scrollTop = g
            } else {
                if (!k) {
                    h.value += u.tagStart
                } else {
                    if (u.isOpen(p) !== false) {
                        h.value += u.tagStart;
                        u.openTag(o, p)
                    } else {
                        h.value += k;
                        u.closeTag(o, p)
                    }
                }
                h.focus()
            }
        }
    };
    c.SpellButton = function () {
        c.Button.call(this, "spell", quicktagsL10n.lookup, "", quicktagsL10n.dictionaryLookup)
    };
    c.SpellButton.prototype = new c.Button();
    c.SpellButton.prototype.callback = function (h, g, d) {
        var j = "",
            i, f, e;
        if (document.selection) {
            g.focus();
            i = document.selection.createRange();
            if (i.text.length > 0) {
                j = i.text
            }
        } else {
            if (g.selectionStart || g.selectionStart == "0") {
                f = g.selectionStart;
                e = g.selectionEnd;
                if (f != e) {
                    j = g.value.substring(f, e)
                }
            }
        }
        if (j === "") {
            j = prompt(quicktagsL10n.wordLookup, "")
        }
        if (j !== null && /^\w[\w ]*$/.test(j)) {
            window.open("http://www.answers.com/" + encodeURIComponent(j))
        }
    };
    c.CloseButton = function () {
        c.Button.call(this, "close", quicktagsL10n.closeTags, "", quicktagsL10n.closeAllOpenTags)
    };
    c.CloseButton.prototype = new c.Button();
    c._close = function (i, j, d) {
        var g, f, h = d.openTags;
        if (h) {
            while (h.length > 0) {
                g = d.getButton(h[h.length - 1]);
                f = document.getElementById(d.name + "_" + g.id);
                if (i) {
                    g.callback.call(g, f, j, d)
                } else {
                    g.closeTag(f, d)
                }
            }
        }
    };
    c.CloseButton.prototype.callback = c._close;
    c.closeAllTags = function (e) {
        var d = this.getInstance(e);
        c._close("", d.canvas, d)
    };
    c.LinkButton = function () {
        c.TagButton.call(this, "link", "link", "", "</a>", "a")
    };
    c.LinkButton.prototype = new c.TagButton();
    c.LinkButton.prototype.callback = function (i, j, g, f) {
        var d, h = this;
        if (typeof (imbullLink) != "undefined") {
            imbullLink.open();
            return
        }
        if (!f) {
            f = "http://"
        }
        if (h.isOpen(g) === false) {
            d = prompt(quicktagsL10n.enterURL, f);
            if (d) {
                h.tagStart = '<a href="' + d + '">';
                c.TagButton.prototype.callback.call(h, i, j, g)
            }
        } else {
            c.TagButton.prototype.callback.call(h, i, j, g)
        }
    };
    c.ImgButton = function () {
        c.TagButton.call(this, "img", "img", "", "", "m")
    };
    c.ImgButton.prototype = new c.TagButton();
    c.ImgButton.prototype.callback = function (h, j, f, d) {
        if (!d) {
            d = "http://"
        }
        var i = prompt(quicktagsL10n.enterImageURL, d),
            g;
        if (i) {
            g = prompt(quicktagsL10n.enterImageDescription, "");
            this.tagStart = '<img src="' + i + '" alt="' + g + '" />';
            c.TagButton.prototype.callback.call(this, h, j, f)
        }
    };
    c.FullscreenButton = function () {
        c.Button.call(this, "fullscreen", quicktagsL10n.fullscreen, "f", quicktagsL10n.toggleFullscreen)
    };
    c.FullscreenButton.prototype = new c.Button();
    c.FullscreenButton.prototype.callback = function (d, f) {
        if (f.id != "content" || typeof (fullscreen) == "undefined") {
            return
        }
        fullscreen.on()
    };
    edButtons[10] = new c.TagButton("strong", "b", "<strong>", "</strong>", "b");
    edButtons[20] = new c.TagButton("em", "i", "<em>", "</em>", "i"), edButtons[30] = new c.LinkButton(), edButtons[40] = new c.TagButton("block", "b-quote", "\n\n<blockquote>", "</blockquote>\n\n", "q"), edButtons[50] = new c.TagButton("del", "del", '<del datetime="' + a + '">', "</del>", "d"), edButtons[60] = new c.TagButton("ins", "ins", '<ins datetime="' + a + '">', "</ins>", "s"), edButtons[70] = new c.ImgButton(), edButtons[80] = new c.TagButton("ul", "ul", "<ul>\n", "</ul>\n\n", "u"), edButtons[90] = new c.TagButton("ol", "ol", "<ol>\n", "</ol>\n\n", "o"), edButtons[100] = new c.TagButton("li", "li", "\t<li>", "</li>\n", "l"), edButtons[110] = new c.TagButton("code", "code", "<code>", "</code>", "c"), edButtons[120] = new c.TagButton("more", "more", "<!--more-->", "", "t"), edButtons[130] = new c.SpellButton(), edButtons[140] = new c.CloseButton()
})();﻿
/**
 * jQuery.query - Query String Modification and Creation for jQuery
 * Written by Blair Mitchelmore (blair DOT mitchelmore AT gmail DOT com)
 * Licensed under the WTFPL (http://sam.zoy.org/wtfpl/).
 * Date: 2009/8/13
 *
 * @author Blair Mitchelmore
 * @version 2.1.7
 *
 **/
new function (e) {
    var d = e.separator || "&";
    var c = e.spaces === false ? false : true;
    var a = e.suffix === false ? "" : "[]";
    var g = e.prefix === false ? false : true;
    var b = g ? e.hash === true ? "#" : "?" : "";
    var f = e.numbers === false ? false : true;
    jQuery.query = new function () {
        var h = function (m, l) {
                return m != undefined && m !== null && ( !! l ? m.constructor == l : true)
            };
        var i = function (r) {
                var l, q = /\[([^[]*)\]/g,
                    n = /^([^[]+)(\[.*\])?$/.exec(r),
                    o = n[1],
                    p = [];
                while (l = q.exec(n[2])) {
                    p.push(l[1])
                }
                return [o, p]
            };
        var k = function (s, r, q) {
                var t, p = r.shift();
                if (typeof s != "object") {
                    s = null
                }
                if (p === "") {
                    if (!s) {
                        s = []
                    }
                    if (h(s, Array)) {
                        s.push(r.length == 0 ? q : k(null, r.slice(0), q))
                    } else {
                        if (h(s, Object)) {
                            var n = 0;
                            while (s[n++] != null) {}
                            s[--n] = r.length == 0 ? q : k(s[n], r.slice(0), q)
                        } else {
                            s = [];
                            s.push(r.length == 0 ? q : k(null, r.slice(0), q))
                        }
                    }
                } else {
                    if (p && p.match(/^\s*[0-9]+\s*$/)) {
                        var m = parseInt(p, 10);
                        if (!s) {
                            s = []
                        }
                        s[m] = r.length == 0 ? q : k(s[m], r.slice(0), q)
                    } else {
                        if (p) {
                            var m = p.replace(/^\s*|\s*$/g, "");
                            if (!s) {
                                s = {}
                            }
                            if (h(s, Array)) {
                                var l = {};
                                for (var n = 0; n < s.length; ++n) {
                                    l[n] = s[n]
                                }
                                s = l
                            }
                            s[m] = r.length == 0 ? q : k(s[m], r.slice(0), q)
                        } else {
                            return q
                        }
                    }
                }
                return s
            };
        var j = function (l) {
                var m = this;
                m.keys = {};
                if (l.queryObject) {
                    jQuery.each(l.get(), function (n, o) {
                        m.SET(n, o)
                    })
                } else {
                    jQuery.each(arguments, function () {
                        var n = "" + this;
                        n = n.replace(/^[?#]/, "");
                        n = n.replace(/[;&]$/, "");
                        if (c) {
                            n = n.replace(/[+]/g, " ")
                        }
                        jQuery.each(n.split(/[&;]/), function () {
                            var o = decodeURIComponent(this.split("=")[0] || "");
                            var p = decodeURIComponent(this.split("=")[1] || "");
                            if (!o) {
                                return
                            }
                            if (f) {
                                if (/^[+-]?[0-9]+\.[0-9]*$/.test(p)) {
                                    p = parseFloat(p)
                                } else {
                                    if (/^[+-]?[0-9]+$/.test(p)) {
                                        p = parseInt(p, 10)
                                    }
                                }
                            }
                            p = (!p && p !== 0) ? true : p;
                            if (p !== false && p !== true && typeof p != "number") {
                                p = p
                            }
                            m.SET(o, p)
                        })
                    })
                }
                return m
            };
        j.prototype = {
            queryObject: true,
            has: function (l, m) {
                var n = this.get(l);
                return h(n, m)
            },
            GET: function (m) {
                if (!h(m)) {
                    return this.keys
                }
                var l = i(m),
                    n = l[0],
                    p = l[1];
                var o = this.keys[n];
                while (o != null && p.length != 0) {
                    o = o[p.shift()]
                }
                return typeof o == "number" ? o : o || ""
            },
            get: function (l) {
                var m = this.GET(l);
                if (h(m, Object)) {
                    return jQuery.extend(true, {}, m)
                } else {
                    if (h(m, Array)) {
                        return m.slice(0)
                    }
                }
                return m
            },
            SET: function (m, r) {
                var o = !h(r) ? null : r;
                var l = i(m),
                    n = l[0],
                    q = l[1];
                var p = this.keys[n];
                this.keys[n] = k(p, q.slice(0), o);
                return this
            },
            set: function (l, m) {
                return this.copy().SET(l, m)
            },
            REMOVE: function (l) {
                return this.SET(l, null).COMPACT()
            },
            remove: function (l) {
                return this.copy().REMOVE(l)
            },
            EMPTY: function () {
                var l = this;
                jQuery.each(l.keys, function (m, n) {
                    delete l.keys[m]
                });
                return l
            },
            load: function (l) {
                var n = l.replace(/^.*?[#](.+?)(?:\?.+)?$/, "$1");
                var m = l.replace(/^.*?[?](.+?)(?:#.+)?$/, "$1");
                return new j(l.length == m.length ? "" : m, l.length == n.length ? "" : n)
            },
            empty: function () {
                return this.copy().EMPTY()
            },
            copy: function () {
                return new j(this)
            },
            COMPACT: function () {function l(o) {
                    var n = typeof o == "object" ? h(o, Array) ? [] : {} : o;
                    if (typeof o == "object") {function m(r, p, q) {
                            if (h(r, Array)) {
                                r.push(q)
                            } else {
                                r[p] = q
                            }
                        }
                        jQuery.each(o, function (p, q) {
                            if (!h(q)) {
                                return true
                            }
                            m(n, p, l(q))
                        })
                    }
                    return n
                }
                this.keys = l(this.keys);
                return this
            },
            compact: function () {
                return this.copy().COMPACT()
            },
            toString: function () {
                var n = 0,
                    r = [],
                    q = [],
                    m = this;
                var o = function (s) {
                        s = s + "";
                        if (c) {
                            s = s.replace(/ /g, "+")
                        }
                        return encodeURIComponent(s)
                    };
                var l = function (s, t, u) {
                        if (!h(u) || u === false) {
                            return
                        }
                        var v = [o(t)];
                        if (u !== true) {
                            v.push("=");
                            v.push(o(u))
                        }
                        s.push(v.join(""))
                    };
                var p = function (t, s) {
                        var u = function (v) {
                                return !s || s == "" ? [v].join("") : [s, "[", v, "]"].join("")
                            };
                        jQuery.each(t, function (v, w) {
                            if (typeof w == "object") {
                                p(w, u(v))
                            } else {
                                l(q, u(v), w)
                            }
                        })
                    };
                p(this.keys);
                if (q.length > 0) {
                    r.push(b)
                }
                r.push(q.join(d));
                return r.join("")
            }
        };
        return new j(location.search, location.hash)
    }
}(jQuery.query || {});

var theList, theExtraList, toggleWithKeyboard = false,
    getCount, updateCount, updatePending, dashboardTotals;
(function ($) {
    setCommentsList = function () {
        var totalInput, perPageInput, pageInput, lastConfidentTime = 0,
            dimAfter, delBefore, updateTotalCount, delAfter, refillTheExtraList;
        totalInput = $('input[name="_total"]', "#comments-form");
        perPageInput = $('input[name="_per_page"]', "#comments-form");
        pageInput = $('input[name="_page"]', "#comments-form");
        dimAfter = function (r, settings) {
            var c = $("#" + settings.element),
                editRow, replyID, replyButton;
            editRow = $("#replyrow");
            replyID = $("#comment_ID", editRow).val();
            replyButton = $("#replybtn", editRow);
            if (c.is(".unapproved")) {
                if (settings.data.id == replyID) {
                    replyButton.text(adminCommentsL10n.replyApprove)
                }
                c.find("div.comment_status").html("0")
            } else {
                if (settings.data.id == replyID) {
                    replyButton.text(adminCommentsL10n.reply)
                }
                c.find("div.comment_status").html("1")
            }
            $("span.pending-count").each(function () {
                var a = $(this),
                    n, dif;
                n = a.html().replace(/[^0-9]+/g, "");
                n = parseInt(n, 10);
                if (isNaN(n)) {
                    return
                }
                dif = $("#" + settings.element).is("." + settings.dimClass) ? 1 : -1;
                n = n + dif;
                if (n < 0) {
                    n = 0
                }
                a.closest(".awaiting-mod")[0 == n ? "addClass" : "removeClass"]("count-0");
                updateCount(a, n);
                dashboardTotals()
            })
        };
        delBefore = function (settings, list) {
            var cl = $(settings.target).attr("class"),
                id, el, n, h, a, author, action = false;
            settings.data._total = totalInput.val() || 0;
            settings.data._per_page = perPageInput.val() || 0;
            settings.data._page = pageInput.val() || 0;
            settings.data._url = document.location.href;
            settings.data.comment_status = $('input[name="comment_status"]', "#comments-form").val();
            if (cl.indexOf(":trash=1") != -1) {
                action = "trash"
            } else {
                if (cl.indexOf(":spam=1") != -1) {
                    action = "spam"
                }
            }
            if (action) {
                id = cl.replace(/.*?comment-([0-9]+).*/, "$1");
                el = $("#comment-" + id);
                note = $("#" + action + "-undo-holder").html();
                el.find(".check-column :checkbox").prop("checked", false);
                if (el.siblings("#replyrow").length && commentReply.cid == id) {
                    commentReply.close()
                }
                if (el.is("tr")) {
                    n = el.children(":visible").length;
                    author = $(".author strong", el).text();
                    h = $('<tr id="undo-' + id + '" class="undo un' + action + '" style="display:none;"><td colspan="' + n + '">' + note + "</td></tr>")
                } else {
                    author = $(".comment-author", el).text();
                    h = $('<div id="undo-' + id + '" style="display:none;" class="undo un' + action + '">' + note + "</div>")
                }
                el.before(h);
                $("strong", "#undo-" + id).text(author + " ");
                a = $(".undo a", "#undo-" + id);
                a.attr("href", "comment.php?action=un" + action + "comment&c=" + id + "&_imbullnonce=" + settings.data._ajax_nonce);
                a.attr("class", "delete:the-comment-list:comment-" + id + "::un" + action + "=1 vim-z vim-destructive");
                $(".avatar", el).clone().prependTo("#undo-" + id + " ." + action + "-undo-inside");
                a.click(function () {
                    list.imbullList.del(this);
                    $("#undo-" + id).css({
                        backgroundColor: "#ceb"
                    }).fadeOut(350, function () {
                        $(this).remove();
                        $("#comment-" + id).css("backgroundColor", "").fadeIn(300, function () {
                            $(this).show()
                        })
                    });
                    return false
                })
            }
            return settings
        };
        updateTotalCount = function (total, time, setConfidentTime) {
            if (time < lastConfidentTime) {
                return
            }
            if (setConfidentTime) {
                lastConfidentTime = time
            }
            totalInput.val(total.toString())
        };
        dashboardTotals = function (n) {
            var dash = $("#dashboard_right_now"),
                total, appr, totalN, apprN;
            n = n || 0;
            if (isNaN(n) || !dash.length) {
                return
            }
            total = $("span.total-count", dash);
            appr = $("span.approved-count", dash);
            totalN = getCount(total);
            totalN = totalN + n;
            apprN = totalN - getCount($("span.pending-count", dash)) - getCount($("span.spam-count", dash));
            updateCount(total, totalN);
            updateCount(appr, apprN)
        };
        getCount = function (el) {
            var n = parseInt(el.html().replace(/[^0-9]+/g, ""), 10);
            if (isNaN(n)) {
                return 0
            }
            return n
        };
        updateCount = function (el, n) {
            var n1 = "";
            if (isNaN(n)) {
                return
            }
            n = n < 1 ? "0" : n.toString();
            if (n.length > 3) {
                while (n.length > 3) {
                    n1 = thousandsSeparator + n.substr(n.length - 3) + n1;
                    n = n.substr(0, n.length - 3)
                }
                n = n + n1
            }
            el.html(n)
        };
        updatePending = function (n) {
            $("span.pending-count").each(function () {
                var a = $(this);
                if (n < 0) {
                    n = 0
                }
                a.closest(".awaiting-mod")[0 == n ? "addClass" : "removeClass"]("count-0");
                updateCount(a, n);
                dashboardTotals()
            })
        };
        delAfter = function (r, settings) {
            var total, N, spam, trash, pending, untrash = $(settings.target).parent().is("span.untrash"),
                unspam = $(settings.target).parent().is("span.unspam"),
                unapproved = $("#" + settings.element).is(".unapproved");

            function getUpdate(s) {
                if ($(settings.target).parent().is("span." + s)) {
                    return 1
                } else {
                    if ($("#" + settings.element).is("." + s)) {
                        return -1
                    }
                }
                return 0
            }
            if (untrash) {
                trash = -1
            } else {
                trash = getUpdate("trash")
            }
            if (unspam) {
                spam = -1
            } else {
                spam = getUpdate("spam")
            }
            pending = getCount($("span.pending-count").eq(0));
            if ($(settings.target).parent().is("span.unapprove") || ((untrash || unspam) && unapproved)) {
                pending = pending + 1
            } else {
                if (unapproved) {
                    pending = pending - 1
                }
            }
            updatePending(pending);
            $("span.spam-count").each(function () {
                var a = $(this),
                    n = getCount(a) + spam;
                updateCount(a, n)
            });
            $("span.trash-count").each(function () {
                var a = $(this),
                    n = getCount(a) + trash;
                updateCount(a, n)
            });
            if ($("#dashboard_right_now").length) {
                N = trash ? -1 * trash : 0;
                dashboardTotals(N)
            } else {
                total = totalInput.val() ? parseInt(totalInput.val(), 10) : 0;
                if ($(settings.target).parent().is("span.undo")) {
                    total++
                } else {
                    total--
                }
                if (total < 0) {
                    total = 0
                }
                if (("object" == typeof r) && lastConfidentTime < settings.parsed.responses[0].supplemental.time) {
                    total_items_i18n = settings.parsed.responses[0].supplemental.total_items_i18n || "";
                    if (total_items_i18n) {
                        $(".displaying-num").text(total_items_i18n);
                        $(".total-pages").text(settings.parsed.responses[0].supplemental.total_pages_i18n);
                        $(".tablenav-pages").find(".next-page, .last-page").toggleClass("disabled", settings.parsed.responses[0].supplemental.total_pages == $(".current-page").val())
                    }
                    updateTotalCount(total, settings.parsed.responses[0].supplemental.time, true)
                } else {
                    updateTotalCount(total, r, false)
                }
            }
            if (!theExtraList || theExtraList.size() == 0 || theExtraList.children().size() == 0 || untrash || unspam) {
                return
            }
            theList.get(0).imbullList.add(theExtraList.children(":eq(0)").remove().clone());
            refillTheExtraList()
        };
        refillTheExtraList = function (ev) {
            var args = $.query.get(),
                total_pages = $(".total-pages").text(),
                per_page = $('input[name="_per_page"]', "#comments-form").val();
            if (!args.paged) {
                args.paged = 1
            }
            if (args.paged > total_pages) {
                return
            }
            if (ev) {
                theExtraList.empty();
                args.number = Math.min(8, per_page)
            } else {
                args.number = 1;
                args.offset = Math.min(8, per_page) - 1
            }
            args.no_placeholder = true;
            args.paged++;
            if (true === args.comment_type) {
                args.comment_type = ""
            }
            args = $.extend(args, {
                action: "fetch-list",
                list_args: list_args,
                _ajax_fetch_list_nonce: $("#_ajax_fetch_list_nonce").val()
            });
            $.ajax({
                url: ajaxurl,
                global: false,
                dataType: "json",
                data: args,
                success: function (response) {
                    theExtraList.get(0).imbullList.add(response.rows)
                }
            })
        };
        theExtraList = $("#the-extra-comment-list").imbullList({
            alt: "",
            delColor: "none",
            addColor: "none"
        });
        theList = $("#the-comment-list").imbullList({
            alt: "",
            delBefore: delBefore,
            dimAfter: dimAfter,
            delAfter: delAfter,
            addColor: "none"
        }).bind("imbullListDelEnd", function (e, s) {
            var id = s.element.replace(/[^0-9]+/g, "");
            if (s.target.className.indexOf(":trash=1") != -1 || s.target.className.indexOf(":spam=1") != -1) {
                $("#undo-" + id).fadeIn(300, function () {
                    $(this).show()
                })
            }
        })
    };
    commentReply = {
        cid: "",
        act: "",
        init: function () {
            var row = $("#replyrow");
            $("a.cancel", row).click(function () {
                return commentReply.revert()
            });
            $("a.save", row).click(function () {
                return commentReply.send()
            });
            $("input#author, input#author-email, input#author-url", row).keypress(function (e) {
                if (e.which == 13) {
                    commentReply.send();
                    e.preventDefault();
                    return false
                }
            });
            $("#the-comment-list .column-comment > p").dblclick(function () {
                commentReply.toggle($(this).parent())
            });
            $("#doaction, #doaction2, #post-query-submit").click(function (e) {
                if ($("#the-comment-list #replyrow").length > 0) {
                    commentReply.close()
                }
            });
            this.comments_listing = $('#comments-form > input[name="comment_status"]').val() || ""
        },
        addEvents: function (r) {
            r.each(function () {
                $(this).find(".column-comment > p").dblclick(function () {
                    commentReply.toggle($(this).parent())
                })
            })
        },
        toggle: function (el) {
            if ($(el).css("display") != "none") {
                $(el).find("a.vim-q").click()
            }
        },
        revert: function () {
            if ($("#the-comment-list #replyrow").length < 1) {
                return false
            }
            $("#replyrow").fadeOut("fast", function () {
                commentReply.close()
            });
            return false
        },
        close: function () {
            var c;
            if (this.cid) {
                c = $("#comment-" + this.cid);
                if (typeof QTags != "undefined") {
                    QTags.closeAllTags("replycontent")
                }
                if (this.act == "edit-comment") {
                    c.fadeIn(300, function () {
                        c.show()
                    }).css("backgroundColor", "")
                }
                $("#replyrow").hide();
                $("#com-reply").append($("#replyrow"));
                $("#replycontent").val("");
                $("input", "#edithead").val("");
                $(".error", "#replysubmit").html("").hide();
                $(".waiting", "#replysubmit").hide();
                $("#replycontent").css("height", "");
                this.cid = ""
            }
        },
        open: function (id, p, a) {
            var t = this,
                editRow, rowData, act, c = $("#comment-" + id),
                h = c.height(),
                replyButton;
            t.close();
            t.cid = id;
            editRow = $("#replyrow");
            rowData = $("#inline-" + id);
            act = t.act = (a == "edit") ? "edit-comment" : "replyto-comment";
            $("#action", editRow).val(act);
            $("#comment_post_ID", editRow).val(p);
            $("#comment_ID", editRow).val(id);
            if (h > 120) {
                $("#replycontent", editRow).css("height", (35 + h) + "px")
            }
            if (a == "edit") {
                $("#author", editRow).val($("div.author", rowData).text());
                $("#author-email", editRow).val($("div.author-email", rowData).text());
                $("#author-url", editRow).val($("div.author-url", rowData).text());
                $("#status", editRow).val($("div.comment_status", rowData).text());
                $("#replycontent", editRow).val($("textarea.comment", rowData).val());
                $("#edithead, #savebtn", editRow).show();
                $("#replyhead, #replybtn", editRow).hide();
                c.after(editRow).fadeOut("fast", function () {
                    $("#replyrow").fadeIn(300, function () {
                        $(this).show()
                    })
                })
            } else {
                replyButton = $("#replybtn", editRow);
                $("#edithead, #savebtn", editRow).hide();
                $("#replyhead, #replybtn", editRow).show();
                c.after(editRow);
                if (c.hasClass("unapproved")) {
                    replyButton.text(adminCommentsL10n.replyApprove)
                } else {
                    replyButton.text(adminCommentsL10n.reply)
                }
                $("#replyrow").fadeIn(300, function () {
                    $(this).show()
                })
            }
            setTimeout(function () {
                var rtop, rbottom, scrollTop, vp, scrollBottom;
                rtop = $("#replyrow").offset().top;
                rbottom = rtop + $("#replyrow").height();
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                vp = document.documentElement.clientHeight || self.innerHeight || 0;
                scrollBottom = scrollTop + vp;
                if (scrollBottom - 20 < rbottom) {
                    window.scroll(0, rbottom - vp + 35)
                } else {
                    if (rtop - 20 < scrollTop) {
                        window.scroll(0, rtop - 35)
                    }
                }
                $("#replycontent").focus().keyup(function (e) {
                    if (e.which == 27) {
                        commentReply.revert()
                    }
                })
            }, 600);
            return false
        },
        send: function () {
            var post = {};
            $("#replysubmit .error").hide();
            $("#replysubmit .waiting").show();
            $("#replyrow input").not(":button").each(function () {
                post[$(this).attr("name")] = $(this).val()
            });
            post.content = $("#replycontent").val();
            post.id = post.comment_post_ID;
            post.comments_listing = this.comments_listing;
            post.p = $('[name="p"]').val();
            if ($("#comment-" + $("#comment_ID").val()).hasClass("unapproved")) {
                post.approve_parent = 1
            }
            $.ajax({
                type: "POST",
                url: ajaxurl,
                data: post,
                success: function (x) {
                    commentReply.show(x)
                },
                error: function (r) {
                    commentReply.error(r)
                }
            });
            return false
        },
        show: function (xml) {
            var t = this,
                r, c, id, bg, pid;
            if (typeof (xml) == "string") {
                t.error({
                    responseText: xml
                });
                return false
            }
            r = imbullAjax.parseAjaxResponse(xml);
            if (r.errors) {
                t.error({
                    responseText: imbullAjax.broken
                });
                return false
            }
            t.revert();
            r = r.responses[0];
            c = r.data;
            id = "#comment-" + r.id;
            if ("edit-comment" == t.act) {
                $(id).remove()
            }
            if (r.supplemental.parent_approved) {
                pid = $("#comment-" + r.supplemental.parent_approved);
                updatePending(getCount($("span.pending-count").eq(0)) - 1);
                if (this.comments_listing == "moderated") {
                    pid.animate({
                        backgroundColor: "#CCEEBB"
                    }, 400, function () {
                        pid.fadeOut()
                    });
                    return
                }
            }
            $(c).hide();
            $("#replyrow").after(c);
            id = $(id);
            t.addEvents(id);
            bg = id.hasClass("unapproved") ? "#FFFFE0" : id.closest(".widefat, .postbox").css("backgroundColor");
            id.animate({
                backgroundColor: "#CCEEBB"
            }, 300).animate({
                backgroundColor: bg
            }, 300, function () {
                if (pid && pid.length) {
                    pid.animate({
                        backgroundColor: "#CCEEBB"
                    }, 300).animate({
                        backgroundColor: bg
                    }, 300).removeClass("unapproved").addClass("approved").find("div.comment_status").html("1")
                }
            })
        },
        error: function (r) {
            var er = r.statusText;
            $("#replysubmit .waiting").hide();
            if (r.responseText) {
                er = r.responseText.replace(/<.[^<>]*?>/g, "")
            }
            if (er) {
                $("#replysubmit .error").html(er).show()
            }
        }
    };
    $(document).ready(function () {
        var make_hotkeys_redirect, edit_comment, toggle_all, make_bulk;
        setCommentsList();
        commentReply.init();
        $(document).delegate("span.delete a.delete", "click", function () {
            return false
        });
        if (typeof $.table_hotkeys != "undefined") {
            make_hotkeys_redirect = function (which) {
                return function () {
                    var first_last, l;
                    first_last = "next" == which ? "first" : "last";
                    l = $(".tablenav-pages ." + which + "-page:not(.disabled)");
                    if (l.length) {
                        window.location = l[0].href.replace(/\&hotkeys_highlight_(first|last)=1/g, "") + "&hotkeys_highlight_" + first_last + "=1"
                    }
                }
            };
            edit_comment = function (event, current_row) {
                window.location = $("span.edit a", current_row).attr("href")
            };
            toggle_all = function () {
                toggleWithKeyboard = true;
                $("input:checkbox", "#cb").click().prop("checked", false);
                toggleWithKeyboard = false
            };
            make_bulk = function (value) {
                return function () {
                    var scope = $('select[name="action"]');
                    $('option[value="' + value + '"]', scope).prop("selected", true);
                    $("#doaction").click()
                }
            };
            $.table_hotkeys($("table.widefat"), ["a", "u", "s", "d", "r", "q", "z", ["e", edit_comment],
                ["shift+x", toggle_all],
                ["shift+a", make_bulk("approve")],
                ["shift+s", make_bulk("spam")],
                ["shift+d", make_bulk("delete")],
                ["shift+t", make_bulk("trash")],
                ["shift+z", make_bulk("untrash")],
                ["shift+u", make_bulk("unapprove")]
            ], {
                highlight_first: adminCommentsL10n.hotkeys_highlight_first,
                highlight_last: adminCommentsL10n.hotkeys_highlight_last,
                prev_page_link_cb: make_hotkeys_redirect("prev"),
                next_page_link_cb: make_hotkeys_redirect("next")
            })
        }
    })
})(jQuery);
(function (a) {
    a.suggest = function (o, g) {
        var c, f, n, d, q, p;
        c = a(o).attr("autocomplete", "off");
        f = a(document.createElement("ul"));
        n = false;
        d = 0;
        q = [];
        p = 0;
        f.addClass(g.resultsClass).appendTo("body");
        j();
        a(window).load(j).resize(j);
        c.blur(function () {
            setTimeout(function () {
                f.hide()
            }, 200)
        });
        if (a.browser.msie) {
            try {
                f.bgiframe()
            } catch (s) {}
        }
        if (a.browser.mozilla) {
            c.keypress(m)
        } else {
            c.keydown(m)
        }function j() {
            var e = c.offset();
            f.css({
                top: (e.top + o.offsetHeight) + "px",
                left: e.left + "px"
            })
        }function m(w) {
            if ((/27$|38$|40$/.test(w.keyCode) && f.is(":visible")) || (/^13$|^9$/.test(w.keyCode) && u())) {
                if (w.preventDefault) {
                    w.preventDefault()
                }
                if (w.stopPropagation) {
                    w.stopPropagation()
                }
                w.cancelBubble = true;
                w.returnValue = false;
                switch (w.keyCode) {
                case 38:
                    k();
                    break;
                case 40:
                    t();
                    break;
                case 9:
                case 13:
                    r();
                    break;
                case 27:
                    f.hide();
                    break
                }
            } else {
                if (c.val().length != d) {
                    if (n) {
                        clearTimeout(n)
                    }
                    n = setTimeout(l, g.delay);
                    d = c.val().length
                }
            }
        }function l() {
            var x = a.trim(c.val()),
                w, e;
            if (g.multiple) {
                w = x.lastIndexOf(g.multipleSep);
                if (w != -1) {
                    x = a.trim(x.substr(w + g.multipleSep.length))
                }
            }
            if (x.length >= g.minchars) {
                cached = v(x);
                if (cached) {
                    i(cached.items)
                } else {
                    a.get(g.source, {
                        q: x
                    }, function (y) {
                        f.hide();
                        e = b(y, x);
                        i(e);
                        h(x, e, y.length)
                    })
                }
            } else {
                f.hide()
            }
        }function v(w) {
            var e;
            for (e = 0; e < q.length; e++) {
                if (q[e]["q"] == w) {
                    q.unshift(q.splice(e, 1)[0]);
                    return q[0]
                }
            }
            return false
        }function h(y, e, w) {
            var x;
            while (q.length && (p + w > g.maxCacheSize)) {
                x = q.pop();
                p -= x.size
            }
            q.push({
                q: y,
                size: w,
                items: e
            });
            p += w
        }function i(e) {
            var x = "",
                w;
            if (!e) {
                return
            }
            if (!e.length) {
                f.hide();
                return
            }
            j();
            for (w = 0; w < e.length; w++) {
                x += "<li>" + e[w] + "</li>"
            }
            f.html(x).show();
            f.children("li").mouseover(function () {
                f.children("li").removeClass(g.selectClass);
                a(this).addClass(g.selectClass)
            }).click(function (y) {
                y.preventDefault();
                y.stopPropagation();
                r()
            })
        }function b(e, z) {
            var w = [],
                A = e.split(g.delimiter),
                y, x;
            for (y = 0; y < A.length; y++) {
                x = a.trim(A[y]);
                if (x) {
                    x = x.replace(new RegExp(z, "ig"), function (B) {
                        return '<span class="' + g.matchClass + '">' + B + "</span>"
                    });
                    w[w.length] = x
                }
            }
            return w
        }function u() {
            var e;
            if (!f.is(":visible")) {
                return false
            }
            e = f.children("li." + g.selectClass);
            if (!e.length) {
                e = false
            }
            return e
        }function r() {
            $currentResult = u();
            if ($currentResult) {
                if (g.multiple) {
                    if (c.val().indexOf(g.multipleSep) != -1) {
                        $currentVal = c.val().substr(0, (c.val().lastIndexOf(g.multipleSep) + g.multipleSep.length))
                    } else {
                        $currentVal = ""
                    }
                    c.val($currentVal + $currentResult.text() + g.multipleSep);
                    c.focus()
                } else {
                    c.val($currentResult.text())
                }
                f.hide();
                if (g.onSelect) {
                    g.onSelect.apply(c[0])
                }
            }
        }function t() {
            $currentResult = u();
            if ($currentResult) {
                $currentResult.removeClass(g.selectClass).next().addClass(g.selectClass)
            } else {
                f.children("li:first-child").addClass(g.selectClass)
            }
        }function k() {
            var e = u();
            if (e) {
                e.removeClass(g.selectClass).prev().addClass(g.selectClass)
            } else {
                f.children("li:last-child").addClass(g.selectClass)
            }
        }
    };
    a.fn.suggest = function (c, b) {
        if (!c) {
            return
        }
        b = b || {};
        b.multiple = b.multiple || false;
        b.multipleSep = b.multipleSep || ", ";
        b.source = c;
        b.delay = b.delay || 100;
        b.resultsClass = b.resultsClass || "ac_results";
        b.selectClass = b.selectClass || "ac_over";
        b.matchClass = b.matchClass || "ac_match";
        b.minchars = b.minchars || 2;
        b.delimiter = b.delimiter || "\n";
        b.onSelect = b.onSelect || false;
        b.maxCacheSize = b.maxCacheSize || 65536;
        this.each(function () {
            new a.suggest(this, b)
        });
        return this
    }
})(jQuery);
/*!
 * jQuery UI 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */ (function (c, j) {function k(a, b) {
        var d = a.nodeName.toLowerCase();
        if ("area" === d) {
            b = a.parentNode;
            d = b.name;
            if (!a.href || !d || b.nodeName.toLowerCase() !== "map") return false;
            a = c("img[usemap=#" + d + "]")[0];
            return !!a && l(a)
        }
        return (/input|select|textarea|button|object/.test(d) ? !a.disabled : "a" == d ? a.href || b : b) && l(a)
    }function l(a) {
        return !c(a).parents().andSelf().filter(function () {
            return c.curCSS(this, "visibility") === "hidden" || c.expr.filters.hidden(this)
        }).length
    }
    c.ui = c.ui || {};
    if (!c.ui.version) {
        c.extend(c.ui, {
            version: "1.8.16",
            keyCode: {
                ALT: 18,
                BACKSPACE: 8,
                CAPS_LOCK: 20,
                COMMA: 188,
                COMMAND: 91,
                COMMAND_LEFT: 91,
                COMMAND_RIGHT: 93,
                CONTROL: 17,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                INSERT: 45,
                LEFT: 37,
                MENU: 93,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SHIFT: 16,
                SPACE: 32,
                TAB: 9,
                UP: 38,
                WINDOWS: 91
            }
        });
        c.fn.extend({
            propAttr: c.fn.prop || c.fn.attr,
            _focus: c.fn.focus,
            focus: function (a, b) {
                return typeof a === "number" ? this.each(function () {
                    var d = this;
                    setTimeout(function () {
                        c(d).focus();
                        b && b.call(d)
                    }, a)
                }) : this._focus.apply(this, arguments)
            },
            scrollParent: function () {
                var a;
                a = c.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1))
                }).eq(0);
                return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
            },
            zIndex: function (a) {
                if (a !== j) return this.css("zIndex", a);
                if (this.length) {
                    a = c(this[0]);
                    for (var b; a.length && a[0] !== document;) {
                        b = a.css("position");
                        if (b === "absolute" || b === "relative" || b === "fixed") {
                            b = parseInt(a.css("zIndex"), 10);
                            if (!isNaN(b) && b !== 0) return b
                        }
                        a = a.parent()
                    }
                }
                return 0
            },
            disableSelection: function () {
                return this.bind((c.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
                    a.preventDefault()
                })
            },
            enableSelection: function () {
                return this.unbind(".ui-disableSelection")
            }
        });
        c.each(["Width", "Height"], function (a, b) {function d(f, g, m, n) {
                c.each(e, function () {
                    g -= parseFloat(c.curCSS(f, "padding" + this, true)) || 0;
                    if (m) g -= parseFloat(c.curCSS(f, "border" + this + "Width", true)) || 0;
                    if (n) g -= parseFloat(c.curCSS(f, "margin" + this, true)) || 0
                });
                return g
            }
            var e = b === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                h = b.toLowerCase(),
                i = {
                    innerWidth: c.fn.innerWidth,
                    innerHeight: c.fn.innerHeight,
                    outerWidth: c.fn.outerWidth,
                    outerHeight: c.fn.outerHeight
                };
            c.fn["inner" + b] = function (f) {
                if (f === j) return i["inner" + b].call(this);
                return this.each(function () {
                    c(this).css(h, d(this, f) + "px")
                })
            };
            c.fn["outer" + b] = function (f, g) {
                if (typeof f !== "number") return i["outer" + b].call(this, f);
                return this.each(function () {
                    c(this).css(h, d(this, f, true, g) + "px")
                })
            }
        });
        c.extend(c.expr[":"], {
            data: function (a, b, d) {
                return !!c.data(a, d[3])
            },
            focusable: function (a) {
                return k(a, !isNaN(c.attr(a, "tabindex")))
            },
            tabbable: function (a) {
                var b = c.attr(a, "tabindex"),
                    d = isNaN(b);
                return (d || b >= 0) && k(a, !d)
            }
        });
        c(function () {
            var a = document.body,
                b = a.appendChild(b = document.createElement("div"));
            c.extend(b.style, {
                minHeight: "100px",
                height: "auto",
                padding: 0,
                borderWidth: 0
            });
            c.support.minHeight = b.offsetHeight === 100;
            c.support.selectstart = "onselectstart" in b;
            a.removeChild(b).style.display = "none"
        });
        c.extend(c.ui, {
            plugin: {
                add: function (a, b, d) {
                    a = c.ui[a].prototype;
                    for (var e in d) {
                        a.plugins[e] = a.plugins[e] || [];
                        a.plugins[e].push([b, d[e]])
                    }
                },
                call: function (a, b, d) {
                    if ((b = a.plugins[b]) && a.element[0].parentNode) for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d)
                }
            },
            contains: function (a, b) {
                return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
            },
            hasScroll: function (a, b) {
                if (c(a).css("overflow") === "hidden") return false;
                b = b && b === "left" ? "scrollLeft" : "scrollTop";
                var d = false;
                if (a[b] > 0) return true;
                a[b] = 1;
                d = a[b] > 0;
                a[b] = 0;
                return d
            },
            isOverAxis: function (a, b, d) {
                return a > b && a < b + d
            },
            isOver: function (a, b, d, e, h, i) {
                return c.ui.isOverAxis(a, d, h) && c.ui.isOverAxis(b, e, i)
            }
        })
    }
})(jQuery);

/*!
 * jQuery UI Widget 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */ (function (b, j) {
    if (b.cleanData) {
        var k = b.cleanData;
        b.cleanData = function (a) {
            for (var c = 0, d;
            (d = a[c]) != null; c++) try {
                b(d).triggerHandler("remove")
            } catch (e) {}
            k(a)
        }
    } else {
        var l = b.fn.remove;
        b.fn.remove = function (a, c) {
            return this.each(function () {
                if (!c) if (!a || b.filter(a, [this]).length) b("*", this).add([this]).each(function () {
                    try {
                        b(this).triggerHandler("remove")
                    } catch (d) {}
                });
                return l.call(b(this), a, c)
            })
        }
    }
    b.widget = function (a, c, d) {
        var e = a.split(".")[0],
            f;
        a = a.split(".")[1];
        f = e + "-" + a;
        if (!d) {
            d = c;
            c = b.Widget
        }
        b.expr[":"][f] = function (h) {
            return !!b.data(h, a)
        };
        b[e] = b[e] || {};
        b[e][a] = function (h, g) {
            arguments.length && this._createWidget(h, g)
        };
        c = new c;
        c.options = b.extend(true, {}, c.options);
        b[e][a].prototype = b.extend(true, c, {
            namespace: e,
            widgetName: a,
            widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a,
            widgetBaseClass: f
        }, d);
        b.widget.bridge(a, b[e][a])
    };
    b.widget.bridge = function (a, c) {
        b.fn[a] = function (d) {
            var e = typeof d === "string",
                f = Array.prototype.slice.call(arguments, 1),
                h = this;

            d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d;
            if (e && d.charAt(0) === "_") return h;
            e ? this.each(function () {
                var g = b.data(this, a),
                    i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g;
                if (i !== g && i !== j) {
                    h = i;
                    return false
                }
            }) : this.each(function () {
                var g = b.data(this, a);
                g ? g.option(d || {})._init() : b.data(this, a, new c(d, this))
            });
            return h
        }
    };
    b.Widget = function (a, c) {
        arguments.length && this._createWidget(a, c)
    };
    b.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (a, c) {
            b.data(c, this.widgetName, this);
            this.element = b(c);
            this.options = b.extend(true, {}, this.options, this._getCreateOptions(), a);
            var d = this;
            this.element.bind("remove." + this.widgetName, function () {
                d.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        },
        _getCreateOptions: function () {
            return b.metadata && b.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function () {},
        _init: function () {},
        destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        },
        widget: function () {
            return this.element
        },
        option: function (a, c) {
            var d = a;
            if (arguments.length === 0) return b.extend({}, this.options);
            if (typeof a === "string") {
                if (c === j) return this.options[a];
                d = {};
                d[a] = c
            }
            this._setOptions(d);
            return this
        },
        _setOptions: function (a) {
            var c = this;
            b.each(a, function (d, e) {
                c._setOption(d, e)
            });
            return this
        },
        _setOption: function (a, c) {
            this.options[a] = c;
            if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c);
            return this
        },
        enable: function () {
            return this._setOption("disabled", false)
        },
        disable: function () {
            return this._setOption("disabled", true)
        },
        _trigger: function (a, c, d) {
            var e = this.options[a];
            c = b.Event(c);
            c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase();
            d = d || {};
            if (c.originalEvent) {
                a = b.event.props.length;
                for (var f; a;) {
                    f = b.event.props[--a];
                    c[f] = c.originalEvent[f]
                }
            }
            this.element.trigger(c, d);
            return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);

/*!
 * jQuery UI Mouse 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */ (function (b) {
    var d = false;
    b(document).mouseup(function () {
        d = false
    });
    b.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var a = this;
            this.element.bind("mousedown." + this.widgetName, function (c) {
                return a._mouseDown(c)
            }).bind("click." + this.widgetName, function (c) {
                if (true === b.data(c.target, a.widgetName + ".preventClickEvent")) {
                    b.removeData(c.target, a.widgetName + ".preventClickEvent");
                    c.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function (a) {
            if (!d) {
                this._mouseStarted && this._mouseUp(a);
                this._mouseDownEvent = a;
                var c = this,
                    f = a.which == 1,
                    g = typeof this.options.cancel == "string" && a.target.nodeName ? b(a.target).closest(this.options.cancel).length : false;
                if (!f || g || !this._mouseCapture(a)) return true;
                this.mouseDelayMet = !this.options.delay;
                if (!this.mouseDelayMet) this._mouseDelayTimer = setTimeout(function () {
                    c.mouseDelayMet = true
                }, this.options.delay);
                if (this._mouseDistanceMet(a) && this._mouseDelayMet(a)) {
                    this._mouseStarted = this._mouseStart(a) !== false;
                    if (!this._mouseStarted) {
                        a.preventDefault();
                        return true
                    }
                }
                true === b.data(a.target, this.widgetName + ".preventClickEvent") && b.removeData(a.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function (e) {
                    return c._mouseMove(e)
                };
                this._mouseUpDelegate = function (e) {
                    return c._mouseUp(e)
                };
                b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                a.preventDefault();
                return d = true
            }
        },
        _mouseMove: function (a) {
            if (b.browser.msie && !(document.documentMode >= 9) && !a.button) return this._mouseUp(a);
            if (this._mouseStarted) {
                this._mouseDrag(a);
                return a.preventDefault()
            }
            if (this._mouseDistanceMet(a) && this._mouseDelayMet(a))(this._mouseStarted = this._mouseStart(this._mouseDownEvent, a) !== false) ? this._mouseDrag(a) : this._mouseUp(a);
            return !this._mouseStarted
        },
        _mouseUp: function (a) {
            b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                a.target == this._mouseDownEvent.target && b.data(a.target, this.widgetName + ".preventClickEvent", true);
                this._mouseStop(a)
            }
            return false
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return true
        }
    })
})(jQuery);

/*
 * jQuery UI Sortable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */ (function (d) {
    d.widget("ui.sortable", d.ui.mouse, {
        widgetEventPrefix: "sort",
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3
        },
        _create: function () {
            var a = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? a.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit()
        },
        destroy: function () {
            this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
            this._mouseDestroy();
            for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData("sortable-item");
            return this
        },
        _setOption: function (a, b) {
            if (a === "disabled") {
                this.options[a] = b;
                this.widget()[b ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else d.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function (a, b) {
            if (this.reverting) return false;
            if (this.options.disabled || this.options.type == "static") return false;
            this._refreshItems(a);
            var c = null,
                e = this;
            d(a.target).parents().each(function () {
                if (d.data(this, "sortable-item") == e) {
                    c = d(this);
                    return false
                }
            });
            if (d.data(a.target, "sortable-item") == e) c = d(a.target);
            if (!c) return false;
            if (this.options.handle && !b) {
                var f = false;
                d(this.options.handle, c).find("*").andSelf().each(function () {
                    if (this == a.target) f = true
                });
                if (!f) return false
            }
            this.currentItem = c;
            this._removeCurrentsFromItems();
            return true
        },
        _mouseStart: function (a, b, c) {
            b = this.options;
            var e = this;
            this.currentContainer = this;
            this.refreshPositions();
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] != this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            b.containment && this._setContainment();
            if (b.cursor) {
                if (d("body").css("cursor")) this._storedCursor = d("body").css("cursor");
                d("body").css("cursor", b.cursor)
            }
            if (b.opacity) {
                if (this.helper.css("opacity")) this._storedOpacity = this.helper.css("opacity");
                this.helper.css("opacity", b.opacity)
            }
            if (b.zIndex) {
                if (this.helper.css("zIndex")) this._storedZIndex = this.helper.css("zIndex");
                this.helper.css("zIndex", b.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") this.overflowOffset = this.scrollParent.offset();
            this._trigger("start", a, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!c) for (c = this.containers.length - 1; c >= 0; c--) this.containers[c]._trigger("activate", a, e._uiHash(this));
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(a);
            return true
        },
        _mouseDrag: function (a) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) this.lastPositionAbs = this.positionAbs;
            if (this.options.scroll) {
                var b = this.options,
                    c = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - a.pageY < b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + b.scrollSpeed;
                    else if (a.pageY - this.overflowOffset.top < b.scrollSensitivity) this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - b.scrollSpeed;
                    if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - a.pageX < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + b.scrollSpeed;
                    else if (a.pageX - this.overflowOffset.left < b.scrollSensitivity) this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - b.scrollSpeed
                } else {
                    if (a.pageY - d(document).scrollTop() < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() - b.scrollSpeed);
                    else if (d(window).height() - (a.pageY - d(document).scrollTop()) < b.scrollSensitivity) c = d(document).scrollTop(d(document).scrollTop() + b.scrollSpeed);
                    if (a.pageX - d(document).scrollLeft() < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() - b.scrollSpeed);
                    else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < b.scrollSensitivity) c = d(document).scrollLeft(d(document).scrollLeft() + b.scrollSpeed)
                }
                c !== false && d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a)
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            for (b = this.items.length - 1; b >= 0; b--) {
                c = this.items[b];
                var e = c.item[0],
                    f = this._intersectsWithPointer(c);
                if (f) if (e != this.currentItem[0] && this.placeholder[f == 1 ? "next" : "prev"]()[0] != e && !d.ui.contains(this.placeholder[0], e) && (this.options.type == "semi-dynamic" ? !d.ui.contains(this.element[0], e) : true)) {
                    this.direction = f == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(c)) this._rearrange(a, c);
                    else break;
                    this._trigger("change", a, this._uiHash());
                    break
                }
            }
            this._contactContainers(a);
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            this._trigger("sort", a, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        },
        _mouseStop: function (a, b) {
            if (a) {
                d.ui.ddmanager && !this.options.dropBehaviour && d.ui.ddmanager.drop(this, a);
                if (this.options.revert) {
                    var c = this;
                    b = c.placeholder.offset();
                    c.reverting = true;
                    d(this.helper).animate({
                        left: b.left - this.offset.parent.left - c.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                        top: b.top - this.offset.parent.top - c.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                    }, parseInt(this.options.revert, 10) || 500, function () {
                        c._clear(a)
                    })
                } else this._clear(a, b);
                return false
            }
        },
        cancel: function () {
            var a = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; b >= 0; b--) {
                    this.containers[b]._trigger("deactivate", null, a._uiHash(this));
                    if (this.containers[b].containerCache.over) {
                        this.containers[b]._trigger("out", null, a._uiHash(this));
                        this.containers[b].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
                this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
                d.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                this.domPosition.prev ? d(this.domPosition.prev).after(this.currentItem) : d(this.domPosition.parent).prepend(this.currentItem)
            }
            return this
        },
        serialize: function (a) {
            var b = this._getItemsAsjQuery(a && a.connected),
                c = [];
            a = a || {};
            d(b).each(function () {
                var e = (d(a.item || this).attr(a.attribute || "id") || "").match(a.expression || /(.+)[-=_](.+)/);
                if (e) c.push((a.key || e[1] + "[]") + "=" + (a.key && a.expression ? e[1] : e[2]))
            });
            !c.length && a.key && c.push(a.key + "=");
            return c.join("&")
        },
        toArray: function (a) {
            var b = this._getItemsAsjQuery(a && a.connected),
                c = [];
            a = a || {};
            b.each(function () {
                c.push(d(a.item || this).attr(a.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function (a) {
            var b = this.positionAbs.left,
                c = b + this.helperProportions.width,
                e = this.positionAbs.top,
                f = e + this.helperProportions.height,
                g = a.left,
                h = g + a.width,
                i = a.top,
                k = i + a.height,
                j = this.offset.click.top,
                l = this.offset.click.left;
            j = e + j > i && e + j < k && b + l > g && b + l < h;
            return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? j : g < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < h && i < e + this.helperProportions.height / 2 && f - this.helperProportions.height / 2 < k
        },
        _intersectsWithPointer: function (a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left, a.width);
            b = b && a;
            a = this._getDragVerticalDirection();
            var c = this._getDragHorizontalDirection();
            if (!b) return false;
            return this.floating ? c && c == "right" || a == "down" ? 2 : 1 : a && (a == "down" ? 2 : 1)
        },
        _intersectsWithSides: function (a) {
            var b = d.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height);
            a = d.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width);
            var c = this._getDragVerticalDirection(),
                e = this._getDragHorizontalDirection();
            return this.floating && e ? e == "right" && a || e == "left" && !a : c && (c == "down" && b || c == "up" && !b)
        },
        _getDragVerticalDirection: function () {
            var a = this.positionAbs.top - this.lastPositionAbs.top;
            return a != 0 && (a > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function () {
            var a = this.positionAbs.left - this.lastPositionAbs.left;
            return a != 0 && (a > 0 ? "right" : "left")
        },
        refresh: function (a) {
            this._refreshItems(a);
            this.refreshPositions();
            return this
        },
        _connectWith: function () {
            var a = this.options;
            return a.connectWith.constructor == String ? [a.connectWith] : a.connectWith
        },
        _getItemsAsjQuery: function (a) {
            var b = [],
                c = [],
                e = this._connectWith();
            if (e && a) for (a = e.length - 1; a >= 0; a--) for (var f = d(e[a]), g = f.length - 1; g >= 0; g--) {
                var h = d.data(f[g], "sortable");
                if (h && h != this && !h.options.disabled) c.push([d.isFunction(h.options.items) ? h.options.items.call(h.element) : d(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
            }
            c.push([d.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : d(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (a = c.length - 1; a >= 0; a--) c[a][0].each(function () {
                b.push(this)
            });
            return d(b)
        },
        _removeCurrentsFromItems: function () {
            for (var a = this.currentItem.find(":data(sortable-item)"), b = 0; b < this.items.length; b++) for (var c = 0; c < a.length; c++) a[c] == this.items[b].item[0] && this.items.splice(b, 1)
        },
        _refreshItems: function (a) {
            this.items = [];
            this.containers = [this];
            var b = this.items,
                c = [
                    [d.isFunction(this.options.items) ? this.options.items.call(this.element[0], a, {
                        item: this.currentItem
                    }) : d(this.options.items, this.element), this]
                ],
                e = this._connectWith();
            if (e) for (var f = e.length - 1; f >= 0; f--) for (var g = d(e[f]), h = g.length - 1; h >= 0; h--) {
                var i = d.data(g[h], "sortable");
                if (i && i != this && !i.options.disabled) {
                    c.push([d.isFunction(i.options.items) ? i.options.items.call(i.element[0], a, {
                        item: this.currentItem
                    }) : d(i.options.items, i.element), i]);
                    this.containers.push(i)
                }
            }
            for (f = c.length - 1; f >= 0; f--) {
                a = c[f][1];
                e = c[f][0];
                h = 0;
                for (g = e.length; h < g; h++) {
                    i = d(e[h]);
                    i.data("sortable-item", a);
                    b.push({
                        item: i,
                        instance: a,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        },
        refreshPositions: function (a) {
            if (this.offsetParent && this.helper) this.offset.parent = this._getParentOffset();
            for (var b = this.items.length - 1; b >= 0; b--) {
                var c = this.items[b];
                if (!(c.instance != this.currentContainer && this.currentContainer && c.item[0] != this.currentItem[0])) {
                    var e = this.options.toleranceElement ? d(this.options.toleranceElement, c.item) : c.item;
                    if (!a) {
                        c.width = e.outerWidth();
                        c.height = e.outerHeight()
                    }
                    e = e.offset();
                    c.left = e.left;
                    c.top = e.top
                }
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else for (b = this.containers.length - 1; b >= 0; b--) {
                e = this.containers[b].element.offset();
                this.containers[b].containerCache.left = e.left;
                this.containers[b].containerCache.top = e.top;
                this.containers[b].containerCache.width = this.containers[b].element.outerWidth();
                this.containers[b].containerCache.height = this.containers[b].element.outerHeight()
            }
            return this
        },
        _createPlaceholder: function (a) {
            var b = a || this,
                c = b.options;
            if (!c.placeholder || c.placeholder.constructor == String) {
                var e = c.placeholder;
                c.placeholder = {
                    element: function () {
                        var f = d(document.createElement(b.currentItem[0].nodeName)).addClass(e || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!e) f.style.visibility = "hidden";
                        return f
                    },
                    update: function (f, g) {
                        if (!(e && !c.forcePlaceholderSize)) {
                            g.height() || g.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10));
                            g.width() || g.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            b.placeholder = d(c.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function (a) {
            for (var b = null, c = null, e = this.containers.length - 1; e >= 0; e--) if (!d.ui.contains(this.currentItem[0], this.containers[e].element[0])) if (this._intersectsWith(this.containers[e].containerCache)) {
                if (!(b && d.ui.contains(this.containers[e].element[0], b.element[0]))) {
                    b = this.containers[e];
                    c = e
                }
            } else if (this.containers[e].containerCache.over) {
                this.containers[e]._trigger("out", a, this._uiHash(this));
                this.containers[e].containerCache.over = 0
            }
            if (b) if (this.containers.length === 1) {
                this.containers[c]._trigger("over", a, this._uiHash(this));
                this.containers[c].containerCache.over = 1
            } else if (this.currentContainer != this.containers[c]) {
                b = 1E4;
                e = null;
                for (var f = this.positionAbs[this.containers[c].floating ? "left" : "top"], g = this.items.length - 1; g >= 0; g--) if (d.ui.contains(this.containers[c].element[0], this.items[g].item[0])) {
                    var h = this.items[g][this.containers[c].floating ? "left" : "top"];
                    if (Math.abs(h - f) < b) {
                        b = Math.abs(h - f);
                        e = this.items[g]
                    }
                }
                if (e || this.options.dropOnEmpty) {
                    this.currentContainer = this.containers[c];
                    e ? this._rearrange(a, e, null, true) : this._rearrange(a, null, this.containers[c].element, true);
                    this._trigger("change", a, this._uiHash());
                    this.containers[c]._trigger("change", a, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[c]._trigger("over", a, this._uiHash(this));
                    this.containers[c].containerCache.over = 1
                }
            }
        },
        _createHelper: function (a) {
            var b = this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a, this.currentItem])) : b.helper == "clone" ? this.currentItem.clone() : this.currentItem;
            a.parents("body").length || d(b.appendTo != "parent" ? b.appendTo : this.currentItem[0].parentNode)[0].appendChild(a[0]);
            if (a[0] == this.currentItem[0]) this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            };
            if (a[0].style.width == "" || b.forceHelperSize) a.width(this.currentItem.width());
            if (a[0].style.height == "" || b.forceHelperSize) a.height(this.currentItem.height());
            return a
        },
        _adjustOffsetFromHelper: function (a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] || 0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var a = this.currentItem.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var a = this.options;
            if (a.containment == "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment)) {
                var b = d(a.containment)[0];
                a = d(a.containment).offset();
                var c = d(b).css("overflow") != "hidden";
                this.containment = [a.left + (parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0) - this.margins.left, a.top + (parseInt(d(b).css("borderTopWidth"), 10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0) - this.margins.top, a.left + (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, a.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        },
        _convertPositionTo: function (a, b) {
            if (!b) b = this.position;
            a = a == "absolute" ? 1 : -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : c.scrollLeft()) * a)
            }
        },
        _generatePosition: function (a) {
            var b = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(c[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) this.offset.relative = this._getRelativeOffset();
            var f = a.pageX,
                g = a.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (a.pageX - this.offset.click.left < this.containment[0]) f = this.containment[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < this.containment[1]) g = this.containment[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > this.containment[2]) f = this.containment[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > this.containment[3]) g = this.containment[3] + this.offset.click.top
                }
                if (b.grid) {
                    g = this.originalPageY + Math.round((g - this.originalPageY) / b.grid[1]) * b.grid[1];
                    g = this.containment ? !(g - this.offset.click.top < this.containment[1] || g - this.offset.click.top > this.containment[3]) ? g : !(g - this.offset.click.top < this.containment[1]) ? g - b.grid[1] : g + b.grid[1] : g;
                    f = this.originalPageX + Math.round((f - this.originalPageX) / b.grid[0]) * b.grid[0];
                    f = this.containment ? !(f - this.offset.click.left < this.containment[0] || f - this.offset.click.left > this.containment[2]) ? f : !(f - this.offset.click.left < this.containment[0]) ? f - b.grid[0] : f + b.grid[0] : f
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : c.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : c.scrollLeft())
            }
        },
        _rearrange: function (a, b, c, e) {
            c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? b.item[0] : b.item[0].nextSibling);
            this.counter = this.counter ? ++this.counter : 1;
            var f = this,
                g = this.counter;
            window.setTimeout(function () {
                g == f.counter && f.refreshPositions(!e)
            }, 0)
        },
        _clear: function (a, b) {
            this.reverting = false;
            var c = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS) if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") this._storedCSS[e] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !b && c.push(function (f) {
                this._trigger("receive", f, this._uiHash(this.fromOutside))
            });
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !b) c.push(function (f) {
                this._trigger("update", f, this._uiHash())
            });
            if (!d.ui.contains(this.element[0], this.currentItem[0])) {
                b || c.push(function (f) {
                    this._trigger("remove", f, this._uiHash())
                });
                for (e = this.containers.length - 1; e >= 0; e--) if (d.ui.contains(this.containers[e].element[0], this.currentItem[0]) && !b) {
                    c.push(function (f) {
                        return function (g) {
                            f._trigger("receive", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    c.push(function (f) {
                        return function (g) {
                            f._trigger("update", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]))
                }
            }
            for (e = this.containers.length - 1; e >= 0; e--) {
                b || c.push(function (f) {
                    return function (g) {
                        f._trigger("deactivate", g, this._uiHash(this))
                    }
                }.call(this, this.containers[e]));
                if (this.containers[e].containerCache.over) {
                    c.push(function (f) {
                        return function (g) {
                            f._trigger("out", g, this._uiHash(this))
                        }
                    }.call(this, this.containers[e]));
                    this.containers[e].containerCache.over = 0
                }
            }
            this._storedCursor && d("body").css("cursor", this._storedCursor);
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            if (this._storedZIndex) this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex);
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!b) {
                    this._trigger("beforeStop", a, this._uiHash());
                    for (e = 0; e < c.length; e++) c[e].call(this, a);
                    this._trigger("stop", a, this._uiHash())
                }
                return false
            }
            b || this._trigger("beforeStop", a, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] != this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!b) {
                for (e = 0; e < c.length; e++) c[e].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            this.fromOutside = false;
            return true
        },
        _trigger: function () {
            d.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
        },
        _uiHash: function (a) {
            var b = a || this;
            return {
                helper: b.helper,
                placeholder: b.placeholder || d([]),
                position: b.position,
                originalPosition: b.originalPosition,
                offset: b.positionAbs,
                item: b.currentItem,
                sender: a ? a.element : null
            }
        }
    });
    d.extend(d.ui.sortable, {
        version: "1.8.16"
    })
})(jQuery);

var postboxes, is_iPad = navigator.userAgent.match(/iPad/);
(function (a) {
    postboxes = {
        add_postbox_toggles: function (c, b) {
            this.init(c, b);
            a(".postbox h3, .postbox .handlediv").bind("click.postboxes", function () {
                var d = a(this).parent(".postbox"),
                    e = d.attr("id");
                if ("dashboard_browser_nag" == e) {
                    return
                }
                d.toggleClass("closed");
                postboxes.save_state(c);
                if (e) {
                    if (!d.hasClass("closed") && a.isFunction(postboxes.pbshow)) {
                        postboxes.pbshow(e)
                    } else {
                        if (d.hasClass("closed") && a.isFunction(postboxes.pbhide)) {
                            postboxes.pbhide(e)
                        }
                    }
                }
            });
            a(".postbox h3 a").click(function (d) {
                d.stopPropagation()
            });
            a(".postbox a.dismiss").bind("click.postboxes", function (f) {
                var d = a(this).parents(".postbox").attr("id") + "-hide";
                a("#" + d).prop("checked", false).triggerHandler("click");
                return false
            });
            a(".hide-postbox-tog").bind("click.postboxes", function () {
                var d = a(this).val();
                if (a(this).prop("checked")) {
                    a("#" + d).show();
                    if (a.isFunction(postboxes.pbshow)) {
                        postboxes.pbshow(d)
                    }
                } else {
                    a("#" + d).hide();
                    if (a.isFunction(postboxes.pbhide)) {
                        postboxes.pbhide(d)
                    }
                }
                postboxes.save_state(c);
                postboxes._mark_area()
            });
            a('.columns-prefs input[type="radio"]').bind("click.postboxes", function () {
                var e = parseInt(a(this).val(), 10),
                    d = postboxes;
                if (e) {
                    d._pb_edit(e);
                    d.save_order(c)
                }
            })
        },
        init: function (c, b) {
            a.extend(this, b || {});
            a("#imbullbody-content").css("overflow", "hidden");
            a(".meta-box-sortables").sortable({
                placeholder: "sortable-placeholder",
                connectWith: ".meta-box-sortables",
                items: ".postbox",
                handle: ".hndle",
                cursor: "move",
                distance: 2,
                tolerance: "pointer",
                forcePlaceholderSize: true,
                helper: "clone",
                opacity: 0.65,
                stop: function (f, d) {
                    if (a(this).find("#dashboard_browser_nag").is(":visible") && "dashboard_browser_nag" != this.firstChild.id) {
                        a(this).sortable("cancel");
                        return
                    }
                    postboxes.save_order(c)
                },
                receive: function (f, d) {
                    if ("dashboard_browser_nag" == d.item[0].id) {
                        a(d.sender).sortable("cancel")
                    }
                    postboxes._mark_area()
                }
            });
            if (navigator.userAgent.match(/iPad/)) {
                a(document.body).bind("orientationchange", function () {
                    postboxes._pb_change()
                });
                this._pb_change()
            }
            this._mark_area()
        },
        save_state: function (d) {
            var b = a(".postbox").filter(".closed").map(function () {
                return this.id
            }).get().join(","),
                c = a(".postbox").filter(":hidden").map(function () {
                    return this.id
                }).get().join(",");
            a.post(ajaxurl, {
                action: "closed-postboxes",
                closed: b,
                hidden: c,
                closedpostboxesnonce: jQuery("#closedpostboxesnonce").val(),
                page: d
            })
        },
        save_order: function (c) {
            var b, d = a(".columns-prefs input:checked").val() || 0;
            b = {
                action: "meta-box-order",
                _ajax_nonce: a("#meta-box-order-nonce").val(),
                page_columns: d,
                page: c
            };
            a(".meta-box-sortables").each(function () {
                b["order[" + this.id.split("-")[0] + "]"] = a(this).sortable("toArray").join(",")
            });
            a.post(ajaxurl, b)
        },
        _colname: function (b) {
            switch (b) {
            case 1:
                return "normal";
                break;
            case 2:
                return "side";
                break;
            case 3:
                return "column3";
                break;
            case 4:
                return "column4";
                break;
            default:
                return ""
            }
        },
        _mark_area: function () {
            a("#side-info-column .meta-box-sortables:visible, #dashboard-widgets .meta-box-sortables:visible").each(function (d, c) {
                var b = a(this);
                if (!b.children(".postbox:visible").length) {
                    b.addClass("empty-container")
                } else {
                    b.removeClass("empty-container")
                }
            })
        },
        _pb_edit: function (h) {
            var g = a("#poststuff"),
                d, e, b, c = postboxes,
                f = a(".postbox-container:visible").length;
            if (h == f) {
                return
            }
            if (g.length) {
                if (h == 2) {
                    a(".wrap").removeClass("columns-1").addClass("columns-2");
                    g.addClass("has-right-sidebar");
                    if (!a("#side-info-column #side-sortables").length) {
                        a("#side-info-column").append(a("#side-sortables"))
                    }
                } else {
                    if (h == 1) {
                        a(".wrap").removeClass("columns-2").addClass("columns-1");
                        g.removeClass("has-right-sidebar");
                        if (!a("#post-body-content #side-sortables").length) {
                            a("#normal-sortables").before(a("#side-sortables"))
                        }
                    }
                }
            } else {
                for (d = 4;
                (d > h && d > 1); d--) {
                    e = a("#" + postboxes._colname(d) + "-sortables");
                    a("#" + postboxes._colname(d - 1) + "-sortables").append(e.children(".postbox"));
                    e.parent().hide()
                }
                for (d = h; d > 0; d--) {
                    e = a("#" + postboxes._colname(d) + "-sortables");
                    b = false;
                    if (e.parent().is(":hidden")) {
                        switch (d) {
                        case 4:
                            b = c._move_one(e, a(".postbox:visible", a("#column3-sortables")));
                        case 3:
                            if (!b) {
                                b = c._move_one(e, a(".postbox:visible", a("#side-sortables")))
                            }
                        case 2:
                            if (!b) {
                                b = c._move_one(e, a(".postbox:visible", a("#normal-sortables")))
                            }
                        default:
                            if (!b) {
                                e.addClass("empty-container")
                            }
                        }
                        e.parent().show()
                    }
                }
                a(".postbox-container:visible").css("width", 100 / h + "%")
            }
        },
        _pb_change: function () {
            switch (window.orientation) {
            case 90:
            case -90:
                this._pb_edit(2);
                break;
            case 0:
            case 180:
                if (a("#poststuff").length) {
                    this._pb_edit(1)
                } else {
                    this._pb_edit(2)
                }
                break
            }
        },
        _move_one: function (c, b) {
            if (b.length > 1) {
                c.append(b.last());
                return true
            }
            return false
        },
        pbshow: false,
        pbhide: false
    }
}(jQuery));
var tagBox, commentsBox, editPermalink, makeSlugeditClickable, imbullSetThumbnailHTML, imbullSetThumbnailID, imbullRemoveThumbnail, imbulltitlehint;

function array_unique_noempty(a) {
    var out = [];
    jQuery.each(a, function (key, val) {
        val = jQuery.trim(val);
        if (val && jQuery.inArray(val, out) == -1) {
            out.push(val);
        }
    });
    return out;
}(function ($) {
    tagBox = {
        clean: function (tags) {
            return tags.replace(/\s*,\s*/g, ",").replace(/,+/g, ",").replace(/[,\s]+$/, "").replace(/^[,\s]+/, "");
        },
        parseTags: function (el) {
            var id = el.id,
                num = id.split("-check-num-")[1],
                taxbox = $(el).closest(".tagsdiv"),
                thetags = taxbox.find(".the-tags"),
                current_tags = thetags.val().split(","),
                new_tags = [];
            delete current_tags[num];
            $.each(current_tags, function (key, val) {
                val = $.trim(val);
                if (val) {
                    new_tags.push(val);
                }
            });
            thetags.val(this.clean(new_tags.join(",")));
            this.quickClicks(taxbox);
            return false;
        },
        quickClicks: function (el) {
            var thetags = $(".the-tags", el),
                tagchecklist = $(".tagchecklist", el),
                id = $(el).attr("id"),
                current_tags, disabled;
            if (!thetags.length) {
                return;
            }
            disabled = thetags.prop("disabled");
            current_tags = thetags.val().split(",");
            tagchecklist.empty();
            $.each(current_tags, function (key, val) {
                var span, xbutton;
                val = $.trim(val);
                if (!val) {
                    return;
                }
                span = $("<span />").text(val);
                if (!disabled) {
                    xbutton = $('<a id="' + id + "-check-num-" + key + '" class="ntdelbutton">X</a>');
                    xbutton.click(function () {
                        tagBox.parseTags(this);
                    });
                    span.prepend("&nbsp;").prepend(xbutton);
                }
                tagchecklist.append(span);
            });
        },
        flushTags: function (el, a, f) {
            a = a || false;
            var text, tags = $(".the-tags", el),
                newtag = $("input.newtag", el),
                newtags;
            text = a ? $(a).text() : newtag.val();
            tagsval = tags.val();
            newtags = tagsval ? tagsval + "," + text : text;
            newtags = this.clean(newtags);
            newtags = array_unique_noempty(newtags.split(",")).join(",");
            tags.val(newtags);
            this.quickClicks(el);
            if (!a) {
                newtag.val("");
            }
            if ("undefined" == typeof (f)) {
                newtag.focus();
            }
            return false;
        },
        get: function (id) {
            var tax = id.substr(id.indexOf("-") + 1);
            $.post(ajaxurl, {
                action: "get-tagcloud",
                tax: tax
            }, function (r, stat) {
                if (0 == r || "success" != stat) {
                    r = imbullAjax.broken;
                }
                r = $('<p id="tagcloud-' + tax + '" class="the-tagcloud">' + r + "</p>");
                $("a", r).click(function () {
                    tagBox.flushTags($(this).closest(".inside").children(".tagsdiv"), this);
                    return false;
                });
                $("#" + id).after(r);
            });
        },
        init: function () {
            var t = this,
                ajaxtag = $("div.ajaxtag");
            $(".tagsdiv").each(function () {
                tagBox.quickClicks(this);
            });
            $("input.tagadd", ajaxtag).click(function () {
                t.flushTags($(this).closest(".tagsdiv"));
            });
            $("div.taghint", ajaxtag).click(function () {
                $(this).css("visibility", "hidden").parent().siblings(".newtag").focus();
            });
            $("input.newtag", ajaxtag).blur(function () {
                if (this.value == "") {
                    $(this).parent().siblings(".taghint").css("visibility", "");
                }
            }).focus(function () {
                $(this).parent().siblings(".taghint").css("visibility", "hidden");
            }).keyup(function (e) {
                if (13 == e.which) {
                    tagBox.flushTags($(this).closest(".tagsdiv"));
                    return false;
                }
            }).keypress(function (e) {
                if (13 == e.which) {
                    e.preventDefault();
                    return false;
                }
            }).each(function () {
                var tax = $(this).closest("div.tagsdiv").attr("id");
                $(this).suggest(ajaxurl + "?action=ajax-tag-search&tax=" + tax, {
                    delay: 500,
                    minchars: 2,
                    multiple: true,
                    multipleSep: ","
                });
            });
            $("#post").submit(function () {
                $("div.tagsdiv").each(function () {
                    tagBox.flushTags(this, false, 1);
                });
            });
            $("a.tagcloud-link").click(function () {
                tagBox.get($(this).attr("id"));
                $(this).unbind().click(function () {
                    $(this).siblings(".the-tagcloud").toggle();
                    return false;
                });
                return false;
            });
        }
    };
    commentsBox = {
        st: 0,
        get: function (total, num) {
            var st = this.st,
                data;
            if (!num) {
                num = 20;
            }
            this.st += num;
            this.total = total;
            $("#commentsdiv img.waiting").show();
            data = {
                action: "get-comments",
                mode: "single",
                _ajax_nonce: $("#add_comment_nonce").val(),
                p: $("#post_ID").val(),
                start: st,
                number: num
            };
            $.post(ajaxurl, data, function (r) {
                r = imbullAjax.parseAjaxResponse(r);
                $("#commentsdiv .widefat").show();
                $("#commentsdiv img.waiting").hide();
                if ("object" == typeof r && r.responses[0]) {
                    $("#the-comment-list").append(r.responses[0].data);
                    theList = theExtraList = null;
                    $("a[className*=':']").unbind();
                    if (commentsBox.st > commentsBox.total) {
                        $("#show-comments").hide();
                    } else {
                        $("#show-comments").html(postL10n.showcomm);
                    }
                    return;
                } else {
                    if (1 == r) {
                        $("#show-comments").parent().html(postL10n.endcomm);
                        return;
                    }
                }
                $("#the-comment-list").append('<tr><td colspan="2">' + imbullAjax.broken + "</td></tr>");
            });
            return false;
        }
    };
    imbullSetThumbnailHTML = function (html) {
        $(".inside", "#postimagediv").html(html);
    };
    imbullSetThumbnailID = function (id) {
        var field = $('input[value="_thumbnail_id"]', "#list-table");
        if (field.size() > 0) {
            $("#meta\\[" + field.attr("id").match(/[0-9]+/) + "\\]\\[value\\]").text(id);
        }
    };
    imbullRemoveThumbnail = function (nonce) {
        $.post(ajaxurl, {
            action: "set-post-thumbnail",
            post_id: $("#post_ID").val(),
            thumbnail_id: -1,
            _ajax_nonce: nonce,
            cookie: encodeURIComponent(document.cookie)
        }, function (str) {
            if (str == "0") {
                alert(setPostThumbnailL10n.error);
            } else {
                imbullSetThumbnailHTML(str);
            }
        });
    };
})(jQuery);
jQuery(document).ready(function ($) {
    var stamp, visibility, sticky = "",
        last = 0,
        co = $("#content");
    postboxes.add_postbox_toggles(pagenow);
    if ($("#tagsdiv-post_tag").length) {
        tagBox.init();
    } else {
        $("#side-sortables, #normal-sortables, #advanced-sortables").children("div.postbox").each(function () {
            if (this.id.indexOf("tagsdiv-") === 0) {
                tagBox.init();
                return false;
            }
        });
    }
    $(".categorydiv").each(function () {
        var this_id = $(this).attr("id"),
            noSyncChecks = false,
            syncChecks, catAddAfter, taxonomyParts, taxonomy, settingName;
        taxonomyParts = this_id.split("-");
        taxonomyParts.shift();
        taxonomy = taxonomyParts.join("-");
        settingName = taxonomy + "_tab";
        if (taxonomy == "category") {
            settingName = "cats";
        }
        $("a", "#" + taxonomy + "-tabs").click(function () {
            var t = $(this).attr("href");
            $(this).parent().addClass("tabs").siblings("li").removeClass("tabs");
            $("#" + taxonomy + "-tabs").siblings(".tabs-panel").hide();
            $(t).show();
            if ("#" + taxonomy + "-all" == t) {
                deleteUserSetting(settingName);
            } else {
                setUserSetting(settingName, "pop");
            }
            return false;
        });
        if (getUserSetting(settingName)) {
            $('a[href="#' + taxonomy + '-pop"]', "#" + taxonomy + "-tabs").click();
        }
        $("#new" + taxonomy).one("focus", function () {
            $(this).val("").removeClass("form-input-tip");
        });
        $("#" + taxonomy + "-add-submit").click(function () {
            $("#new" + taxonomy).focus();
        });
        syncChecks = function () {
            if (noSyncChecks) {
                return;
            }
            noSyncChecks = true;
            var th = jQuery(this),
                c = th.is(":checked"),
                id = th.val().toString();
            $("#in-" + taxonomy + "-" + id + ", #in-" + taxonomy + "-category-" + id).prop("checked", c);
            noSyncChecks = false;
        };
        catAddBefore = function (s) {
            if (!$("#new" + taxonomy).val()) {
                return false;
            }
            s.data += "&" + $(":checked", "#" + taxonomy + "checklist").serialize();
            return s;
        };
        catAddAfter = function (r, s) {
            var sup, drop = $("#new" + taxonomy + "_parent");
            if ("undefined" != s.parsed.responses[0] && (sup = s.parsed.responses[0].supplemental.newcat_parent)) {
                drop.before(sup);
                drop.remove();
            }
        };
        $("#" + taxonomy + "checklist").imbullList({
            alt: "",
            response: taxonomy + "-ajax-response",
            addBefore: catAddBefore,
            addAfter: catAddAfter
        });
        $("#" + taxonomy + "-add-toggle").click(function () {
            $("#" + taxonomy + "-adder").toggleClass("imbull-hidden-children");
            $('a[href="#' + taxonomy + '-all"]', "#" + taxonomy + "-tabs").click();
            $("#new" + taxonomy).focus();
            return false;
        });
        $("#" + taxonomy + "checklist li.popular-category :checkbox, #" + taxonomy + "checklist-pop :checkbox").live("click", function () {
            var t = $(this),
                c = t.is(":checked"),
                id = t.val();
            if (id && t.parents("#taxonomy-" + taxonomy).length) {
                $("#in-" + taxonomy + "-" + id + ", #in-popular-" + taxonomy + "-" + id).prop("checked", c);
            }
        });
    });
    if ($("#postcustom").length) {
        $("#the-list").imbullList({
            addAfter: function (xml, s) {
                $("table#list-table").show();
            },
            addBefore: function (s) {
                s.data += "&post_id=" + $("#post_ID").val();
                return s;
            }
        });
    }
    if ($("#submitdiv").length) {
        stamp = $("#timestamp").html();
        visibility = $("#post-visibility-display").html();

        function updateVisibility() {
            var pvSelect = $("#post-visibility-select");
            if ($("input:radio:checked", pvSelect).val() != "public") {
                $("#sticky").prop("checked", false);
                $("#sticky-span").hide();
            } else {
                $("#sticky-span").show();
            }
            if ($("input:radio:checked", pvSelect).val() != "password") {
                $("#password-span").hide();
            } else {
                $("#password-span").show();
            }
        }function updateText() {
            var attemptedDate, originalDate, currentDate, publishOn, postStatus = $("#post_status"),
                optPublish = $('option[value="publish"]', postStatus),
                aa = $("#aa").val(),
                mm = $("#mm").val(),
                jj = $("#jj").val(),
                hh = $("#hh").val(),
                mn = $("#mn").val();
            attemptedDate = new Date(aa, mm - 1, jj, hh, mn);
            originalDate = new Date($("#hidden_aa").val(), $("#hidden_mm").val() - 1, $("#hidden_jj").val(), $("#hidden_hh").val(), $("#hidden_mn").val());
            currentDate = new Date($("#cur_aa").val(), $("#cur_mm").val() - 1, $("#cur_jj").val(), $("#cur_hh").val(), $("#cur_mn").val());
            if (attemptedDate.getFullYear() != aa || (1 + attemptedDate.getMonth()) != mm || attemptedDate.getDate() != jj || attemptedDate.getMinutes() != mn) {
                $(".timestamp-wrap", "#timestampdiv").addClass("form-invalid");
                return false;
            } else {
                $(".timestamp-wrap", "#timestampdiv").removeClass("form-invalid");
            }
            if (attemptedDate > currentDate && $("#original_post_status").val() != "future") {
                publishOn = postL10n.publishOnFuture;
                $("#publish").val(postL10n.schedule);
            } else {
                if (attemptedDate <= currentDate && $("#original_post_status").val() != "publish") {
                    publishOn = postL10n.publishOn;
                    $("#publish").val(postL10n.publish);
                } else {
                    publishOn = postL10n.publishOnPast;
                    $("#publish").val(postL10n.update);
                }
            }
            if (originalDate.toUTCString() == attemptedDate.toUTCString()) {
                $("#timestamp").html(stamp);
            } else {
                $("#timestamp").html(publishOn + " <b>" + $('option[value="' + $("#mm").val() + '"]', "#mm").text() + " " + jj + ", " + aa + " @ " + hh + ":" + mn + "</b> ");
            }
            if ($("input:radio:checked", "#post-visibility-select").val() == "private") {
                $("#publish").val(postL10n.update);
                if (optPublish.length == 0) {
                    postStatus.append('<option value="publish">' + postL10n.privatelyPublished + "</option>");
                } else {
                    optPublish.html(postL10n.privatelyPublished);
                }
                $('option[value="publish"]', postStatus).prop("selected", true);
                $(".edit-post-status", "#misc-publishing-actions").hide();
            } else {
                if ($("#original_post_status").val() == "future" || $("#original_post_status").val() == "draft") {
                    if (optPublish.length) {
                        optPublish.remove();
                        postStatus.val($("#hidden_post_status").val());
                    }
                } else {
                    optPublish.html(postL10n.published);
                }
                if (postStatus.is(":hidden")) {
                    $(".edit-post-status", "#misc-publishing-actions").show();
                }
            }
            $("#post-status-display").html($("option:selected", postStatus).text());
            if ($("option:selected", postStatus).val() == "private" || $("option:selected", postStatus).val() == "publish") {
                $("#save-post").hide();
            } else {
                $("#save-post").show();
                if ($("option:selected", postStatus).val() == "pending") {
                    $("#save-post").show().val(postL10n.savePending);
                } else {
                    $("#save-post").show().val(postL10n.saveDraft);
                }
            }
            return true;
        }
        $(".edit-visibility", "#visibility").click(function () {
            if ($("#post-visibility-select").is(":hidden")) {
                updateVisibility();
                $("#post-visibility-select").slideDown("fast");
                $(this).hide();
            }
            return false;
        });
        $(".cancel-post-visibility", "#post-visibility-select").click(function () {
            $("#post-visibility-select").slideUp("fast");
            $("#visibility-radio-" + $("#hidden-post-visibility").val()).prop("checked", true);
            $("#post_password").val($("#hidden_post_password").val());
            $("#sticky").prop("checked", $("#hidden-post-sticky").prop("checked"));
            $("#post-visibility-display").html(visibility);
            $(".edit-visibility", "#visibility").show();
            updateText();
            return false;
        });
        $(".save-post-visibility", "#post-visibility-select").click(function () {
            var pvSelect = $("#post-visibility-select");
            pvSelect.slideUp("fast");
            $(".edit-visibility", "#visibility").show();
            updateText();
            if ($("input:radio:checked", pvSelect).val() != "public") {
                $("#sticky").prop("checked", false);
            }
            if (true == $("#sticky").prop("checked")) {
                sticky = "Sticky";
            } else {
                sticky = "";
            }
            $("#post-visibility-display").html(postL10n[$("input:radio:checked", pvSelect).val() + sticky]);
            return false;
        });
        $("input:radio", "#post-visibility-select").change(function () {
            updateVisibility();
        });
        $("#timestampdiv").siblings("a.edit-timestamp").click(function () {
            if ($("#timestampdiv").is(":hidden")) {
                $("#timestampdiv").slideDown("fast");
                $(this).hide();
            }
            return false;
        });
        $(".cancel-timestamp", "#timestampdiv").click(function () {
            $("#timestampdiv").slideUp("fast");
            $("#mm").val($("#hidden_mm").val());
            $("#jj").val($("#hidden_jj").val());
            $("#aa").val($("#hidden_aa").val());
            $("#hh").val($("#hidden_hh").val());
            $("#mn").val($("#hidden_mn").val());
            $("#timestampdiv").siblings("a.edit-timestamp").show();
            updateText();
            return false;
        });
        $(".save-timestamp", "#timestampdiv").click(function () {
            if (updateText()) {
                $("#timestampdiv").slideUp("fast");
                $("#timestampdiv").siblings("a.edit-timestamp").show();
            }
            return false;
        });
        $("#post-status-select").siblings("a.edit-post-status").click(function () {
            if ($("#post-status-select").is(":hidden")) {
                $("#post-status-select").slideDown("fast");
                $(this).hide();
            }
            return false;
        });
        $(".save-post-status", "#post-status-select").click(function () {
            $("#post-status-select").slideUp("fast");
            $("#post-status-select").siblings("a.edit-post-status").show();
            updateText();
            return false;
        });
        $(".cancel-post-status", "#post-status-select").click(function () {
            $("#post-status-select").slideUp("fast");
            $("#post_status").val($("#hidden_post_status").val());
            $("#post-status-select").siblings("a.edit-post-status").show();
            updateText();
            return false;
        });
    }
    if ($("#edit-slug-box").length) {
        editPermalink = function (post_id) {
            var i, c = 0,
                e = $("#editable-post-name"),
                revert_e = e.html(),
                real_slug = $("#post_name"),
                revert_slug = real_slug.val(),
                b = $("#edit-slug-buttons"),
                revert_b = b.html(),
                full = $("#editable-post-name-full").html();
            $("#view-post-btn").hide();
            b.html('<a href="#" class="save button">' + postL10n.ok + '</a> <a class="cancel" href="#">' + postL10n.cancel + "</a>");
            b.children(".save").click(function () {
                var new_slug = e.children("input").val();
                if (new_slug == $("#editable-post-name-full").text()) {
                    return $(".cancel", "#edit-slug-buttons").click();
                }
                $.post(ajaxurl, {
                    action: "sample-permalink",
                    post_id: post_id,
                    new_slug: new_slug,
                    new_title: $("#title").val(),
                    samplepermalinknonce: $("#samplepermalinknonce").val()
                }, function (data) {
                    $("#edit-slug-box").html(data);
                    b.html(revert_b);
                    real_slug.val(new_slug);
                    makeSlugeditClickable();
                    $("#view-post-btn").show();
                });
                return false;
            });
            $(".cancel", "#edit-slug-buttons").click(function () {
                $("#view-post-btn").show();
                e.html(revert_e);
                b.html(revert_b);
                real_slug.val(revert_slug);
                return false;
            });
            for (i = 0; i < full.length; ++i) {
                if ("%" == full.charAt(i)) {
                    c++;
                }
            }
            slug_value = (c > full.length / 4) ? "" : full;
            e.html('<input type="text" id="new-post-slug" value="' + slug_value + '" />').children("input").keypress(function (e) {
                var key = e.keyCode || 0;
                if (13 == key) {
                    b.children(".save").click();
                    return false;
                }
                if (27 == key) {
                    b.children(".cancel").click();
                    return false;
                }
                real_slug.val(this.value);
            }).focus();
        };
        makeSlugeditClickable = function () {
            $("#editable-post-name").click(function () {
                $("#edit-slug-buttons").children(".edit-slug").click();
            });
        };
        makeSlugeditClickable();
    }
    if (typeof (imbullWordCount) != "undefined") {
        $(document).triggerHandler("imbullcountwords", [co.val()]);
        co.keyup(function (e) {
            var k = e.keyCode || e.charCode;
            if (k == last) {
                return true;
            }
            if (13 == k || 8 == last || 46 == last) {
                $(document).triggerHandler("imbullcountwords", [co.val()]);
            }
            last = k;
            return true;
        });
    }
    imbulltitlehint = function (id) {
        id = id || "title";
        var title = $("#" + id),
            titleprompt = $("#" + id + "-prompt-text");
        if (title.val() == "") {
            titleprompt.css("visibility", "");
        }
        titleprompt.click(function () {
            $(this).css("visibility", "hidden");
            title.focus();
        });
        title.blur(function () {
            if (this.value == "") {
                titleprompt.css("visibility", "");
            }
        }).focus(function () {
            titleprompt.css("visibility", "hidden");
        }).keydown(function (e) {
            titleprompt.css("visibility", "hidden");
            $(this).unbind(e);
        });
    };
    imbulltitlehint();
});
/*
 * Thickbox 3.1 - One Box To Rule Them All.
 * By Cody Lindley (http://www.codylindley.com)
 * Copyright (c) 2007 cody lindley
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 */

if (typeof tb_pathToImage != 'string') {
    var tb_pathToImage = thickboxL10n.loadingAnimation;
}
if (typeof tb_closeImage != 'string') {
    var tb_closeImage = thickboxL10n.closeImage;
}

/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/

//on page load call tb_init
jQuery(document).ready(function () {
    tb_init('a.thickbox, area.thickbox, input.thickbox'); //pass where to apply thickbox
    imgLoader = new Image(); // preload image
    imgLoader.src = tb_pathToImage;
});

//add thickbox to href & area elements that have a class of .thickbox
function tb_init(domChunk) {
    jQuery(domChunk).live('click', tb_click);
}

function tb_click() {
    var t = this.title || this.name || null;
    var a = this.href || this.alt;
    var g = this.rel || false;
    tb_show(t, a, g);
    this.blur();
    return false;
}

function tb_show(caption, url, imageGroup) { //function called when the user clicks on a thickbox link

    try {
        if (typeof document.body.style.maxHeight === "undefined") { //if IE 6
            jQuery("body", "html").css({
                height: "100%",
                width: "100%"
            });
            jQuery("html").css("overflow", "hidden");
            if (document.getElementById("TB_HideSelect") === null) { //iframe to hide select elements in ie6
                jQuery("body").append("<iframe id='TB_HideSelect'>" + thickboxL10n.noiframes + "</iframe><div id='TB_overlay'></div><div id='TB_window'></div>");
                jQuery("#TB_overlay").click(tb_remove);
            }
        } else { //all others
            if (document.getElementById("TB_overlay") === null) {
                jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window'></div>");
                jQuery("#TB_overlay").click(tb_remove);
            }
        }

        if (tb_detectMacXFF()) {
            jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack"); //use png overlay so hide flash
        } else {
            jQuery("#TB_overlay").addClass("TB_overlayBG"); //use background and opacity
        }

        if (caption === null) {
            caption = "";
        }
        jQuery("body").append("<div id='TB_load'><img src='" + imgLoader.src + "' /></div>"); //add loader to the page
        jQuery('#TB_load').show(); //show loader

        var baseURL;
        if (url.indexOf("?") !== -1) { //ff there is a query string involved
            baseURL = url.substr(0, url.indexOf("?"));
        } else {
            baseURL = url;
        }

        var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
        var urlType = baseURL.toLowerCase().match(urlString);

        if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') { //code to show images

            TB_PrevCaption = "";
            TB_PrevURL = "";
            TB_PrevHTML = "";
            TB_NextCaption = "";
            TB_NextURL = "";
            TB_NextHTML = "";
            TB_imageCount = "";
            TB_FoundURL = false;
            if (imageGroup) {
                TB_TempArray = jQuery("a[rel=" + imageGroup + "]").get();
                for (TB_Counter = 0;
                ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
                    var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
                    if (!(TB_TempArray[TB_Counter].href == url)) {
                        if (TB_FoundURL) {
                            TB_NextCaption = TB_TempArray[TB_Counter].title;
                            TB_NextURL = TB_TempArray[TB_Counter].href;
                            TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>" + thickboxL10n.next + "</a></span>";
                        } else {
                            TB_PrevCaption = TB_TempArray[TB_Counter].title;
                            TB_PrevURL = TB_TempArray[TB_Counter].href;
                            TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>" + thickboxL10n.prev + "</a></span>";
                        }
                    } else {
                        TB_FoundURL = true;
                        TB_imageCount = thickboxL10n.image + ' ' + (TB_Counter + 1) + ' ' + thickboxL10n.of + ' ' + (TB_TempArray.length);
                    }
                }
            }

            imgPreloader = new Image();
            imgPreloader.onload = function () {
                imgPreloader.onload = null;

                // Resizing large images - orginal by Christian Montoya edited by me.
                var pagesize = tb_getPageSize();
                var x = pagesize[0] - 150;
                var y = pagesize[1] - 150;
                var imageWidth = imgPreloader.width;
                var imageHeight = imgPreloader.height;
                if (imageWidth > x) {
                    imageHeight = imageHeight * (x / imageWidth);
                    imageWidth = x;
                    if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y;
                    }
                } else if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x;
                    }
                }
                // End Resizing

                TB_WIDTH = imageWidth + 30;
                TB_HEIGHT = imageHeight + 60;
                jQuery("#TB_window").append("<a href='' id='TB_ImageOff' title='" + thickboxL10n.close + "'><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + caption + "'/></a>" + "<div id='TB_caption'>" + caption + "<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><a href='#' id='TB_closeWindowButton' title='" + thickboxL10n.close + "'><img src='" + tb_closeImage + "' /></a></div>");

                jQuery("#TB_closeWindowButton").click(tb_remove);

                if (!(TB_PrevHTML === "")) {
                    function goPrev() {
                        if (jQuery(document).unbind("click", goPrev)) {
                            jQuery(document).unbind("click", goPrev);
                        }
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
                        return false;
                    }
                    jQuery("#TB_prev").click(goPrev);
                }

                if (!(TB_NextHTML === "")) {
                    function goNext() {
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_NextCaption, TB_NextURL, imageGroup);
                        return false;
                    }
                    jQuery("#TB_next").click(goNext);

                }

                jQuery(document).bind('keydown.thickbox', function (e) {
                    e.stopImmediatePropagation();

                    if (e.which == 27) { // close
                        if (!jQuery(document).triggerHandler('imbull_CloseOnEscape', [{
                            event: e,
                            what: 'thickbox',
                            cb: tb_remove
                        }])) tb_remove();

                    } else if (e.which == 190) { // display previous image
                        if (!(TB_NextHTML == "")) {
                            jQuery(document).unbind('thickbox');
                            goNext();
                        }
                    } else if (e.which == 188) { // display next image
                        if (!(TB_PrevHTML == "")) {
                            jQuery(document).unbind('thickbox');
                            goPrev();
                        }
                    }
                    return false;
                });

                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_ImageOff").click(tb_remove);
                jQuery("#TB_window").css({
                    'visibility': 'visible'
                }); //for safari using css instead of show
            };

            imgPreloader.src = url;
        } else { //code to show html

            var queryString = url.replace(/^[^\?]+\??/, '');
            var params = tb_parseQuery(queryString);

            TB_WIDTH = (params['width'] * 1) + 30 || 630; //defaults to 630 if no paramaters were added to URL
            TB_HEIGHT = (params['height'] * 1) + 40 || 440; //defaults to 440 if no paramaters were added to URL
            ajaxContentW = TB_WIDTH - 30;
            ajaxContentH = TB_HEIGHT - 45;

            if (url.indexOf('TB_iframe') != -1) { // either iframe or ajax window
                urlNoQuery = url.split('TB_');
                jQuery("#TB_iframeContent").remove();
                if (params['modal'] != "true") { //iframe no modal
                    jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton' title='" + thickboxL10n.close + "'><img src='" + tb_closeImage + "' /></a></div></div><iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' >" + thickboxL10n.noiframes + "</iframe>");
                } else { //iframe modal
                    jQuery("#TB_overlay").unbind();
                    jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;'>" + thickboxL10n.noiframes + "</iframe>");
                }
            } else { // not an iframe, ajax
                if (jQuery("#TB_window").css("visibility") != "visible") {
                    if (params['modal'] != "true") { //ajax no modal
                        jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><a href='#' id='TB_closeWindowButton'><img src='" + tb_closeImage + "' /></a></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>");
                    } else { //ajax modal
                        jQuery("#TB_overlay").unbind();
                        jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>");
                    }
                } else { //this means the window is already up, we are just loading new content via ajax
                    jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
                    jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
                    jQuery("#TB_ajaxContent")[0].scrollTop = 0;
                    jQuery("#TB_ajaxWindowTitle").html(caption);
                }
            }

            jQuery("#TB_closeWindowButton").click(tb_remove);

            if (url.indexOf('TB_inline') != -1) {
                jQuery("#TB_ajaxContent").append(jQuery('#' + params['inlineId']).children());
                jQuery("#TB_window").bind('tb_unload', function () {
                    jQuery('#' + params['inlineId']).append(jQuery("#TB_ajaxContent").children()); // move elements back when you're finished
                });
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_window").css({
                    'visibility': 'visible'
                });
            } else if (url.indexOf('TB_iframe') != -1) {
                tb_position();
                if (jQuery.browser.safari) { //safari needs help because it will not fire iframe onload
                    jQuery("#TB_load").remove();
                    jQuery("#TB_window").css({
                        'visibility': 'visible'
                    });
                }
            } else {
                jQuery("#TB_ajaxContent").load(url += "&random=" + (new Date().getTime()), function () { //to do a post change this load method
                    tb_position();
                    jQuery("#TB_load").remove();
                    tb_init("#TB_ajaxContent a.thickbox");
                    jQuery("#TB_window").css({
                        'visibility': 'visible'
                    });
                });
            }

        }

        if (!params['modal']) {
            jQuery(document).bind('keyup.thickbox', function (e) {

                if (e.which == 27) { // close
                    e.stopImmediatePropagation();
                    if (!jQuery(document).triggerHandler('imbull_CloseOnEscape', [{
                        event: e,
                        what: 'thickbox',
                        cb: tb_remove
                    }])) tb_remove();

                    return false;
                }
            });
        }

    } catch (e) {
        //nothing here
    }
}

//helper functions below
function tb_showIframe() {
    jQuery("#TB_load").remove();
    jQuery("#TB_window").css({
        'visibility': 'visible'
    });
}

function tb_remove() {
    jQuery("#TB_imageOff").unbind("click");
    jQuery("#TB_closeWindowButton").unbind("click");
    jQuery("#TB_window").fadeOut("fast", function () {
        jQuery('#TB_window,#TB_overlay,#TB_HideSelect').trigger("tb_unload").unbind().remove();
    });
    jQuery("#TB_load").remove();
    if (typeof document.body.style.maxHeight == "undefined") { //if IE 6
        jQuery("body", "html").css({
            height: "auto",
            width: "auto"
        });
        jQuery("html").css("overflow", "");
    }
    jQuery(document).unbind('.thickbox');
    return false;
}

function tb_position() {
    var isIE6 = typeof document.body.style.maxHeight === "undefined";
    jQuery("#TB_window").css({
        marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px',
        width: TB_WIDTH + 'px'
    });
    if (!isIE6) { // take away IE6
        jQuery("#TB_window").css({
            marginTop: '-' + parseInt((TB_HEIGHT / 2), 10) + 'px'
        });
    }
}

function tb_parseQuery(query) {
    var Params = {};
    if (!query) {
        return Params;
    } // return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) {
            continue;
        }
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}

function tb_getPageSize() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w, h];
    return arrayPageSize;
}

function tb_detectMacXFF() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
        return true;
    }
}

var imbullActiveEditor;

function send_to_editor(c) {
    var b, a = typeof (tinymce) != "undefined",
        f = typeof (QTags) != "undefined";
    if (!imbullActiveEditor) {
        if (a && tinymce.activeEditor) {
            b = tinymce.activeEditor;
            imbullActiveEditor = b.id
        } else {
            if (!f) {
                return false
            }
        }
    } else {
        if (a) {
            if (tinymce.activeEditor && (tinymce.activeEditor.id == "mce_fullscreen" || tinymce.activeEditor.id == "imbull_mce_fullscreen")) {
                b = tinymce.activeEditor
            } else {
                b = tinymce.get(imbullActiveEditor)
            }
        }
    }
    if (b && !b.isHidden()) {
        if (tinymce.isIE && b.windowManager.insertimagebookmark) {
            b.selection.moveToBookmark(b.windowManager.insertimagebookmark)
        }
        if (c.indexOf("[caption") === 0) {
            if (b.plugins.imbulleditimage) {
                c = b.plugins.imbulleditimage._do_shcode(c)
            }
        } else {
            if (c.indexOf("[gallery") === 0) {
                if (b.plugins.imbullgallery) {
                    c = b.plugins.imbullgallery._do_gallery(c)
                }
            } else {
                if (c.indexOf("[embed") === 0) {
                    if (b.plugins.wordpress) {
                        c = b.plugins.wordpress._setEmbed(c)
                    }
                }
            }
        }
        b.execCommand("mceInsertContent", false, c)
    } else {
        if (f) {
            QTags.insertContent(c)
        } else {
            document.getElementById(imbullActiveEditor).value += c
        }
    }
    try {
        tb_remove()
    } catch (d) {}
}
var tb_position;
(function (a) {
    tb_position = function () {
        var f = a("#TB_window"),
            e = a(window).width(),
            d = a(window).height(),
            c = (720 < e) ? 720 : e,
            b = 0;
        if (a("body.admin-bar").length) {
            b = 28
        }
        if (f.size()) {
            f.width(c - 50).height(d - 45 - b);
            a("#TB_iframeContent").width(c - 50).height(d - 75 - b);
            f.css({
                "margin-left": "-" + parseInt(((c - 50) / 2), 10) + "px"
            });
            if (typeof document.body.style.maxWidth != "undefined") {
                f.css({
                    top: 20 + b + "px",
                    "margin-top": "0"
                })
            }
        }
        return a("a.thickbox").each(function () {
            var g = a(this).attr("href");
            if (!g) {
                return
            }
            g = g.replace(/&width=[0-9]+/g, "");
            g = g.replace(/&height=[0-9]+/g, "");
            a(this).attr("href", g + "&width=" + (c - 80) + "&height=" + (d - 85 - b))
        })
    };
    a(window).resize(function () {
        tb_position()
    });
    a(document).ready(function (b) {
        b("a.thickbox").click(function () {
            var c;
            if (typeof (tinymce) != "undefined" && tinymce.isIE && (c = tinymce.get(imbullActiveEditor)) && !c.isHidden()) {
                c.focus();
                c.windowManager.insertimagebookmark = c.selection.getBookmark()
            }
        })
    })
})(jQuery);
(function (a) {
    imbullWordCount = {
        settings: {
            strip: /<[a-zA-Z\/][^<>]*>/g,
            clean: /[0-9.(),;:!?%#$¿'"_+=\\/-]+/g,
            count: /\S\s+/g
        },
        block: 0,
        wc: function (d) {
            var e = this,
                c = a(".word-count"),
                b = 0;
            if (e.block) {
                return
            }
            e.block = 1;
            setTimeout(function () {
                if (d) {
                    d = d.replace(e.settings.strip, " ").replace(/&nbsp;|&#160;/gi, " ");
                    d = d.replace(e.settings.clean, "");
                    d.replace(e.settings.count, function () {
                        b++
                    })
                }
                c.html(b.toString());
                setTimeout(function () {
                    e.block = 0
                }, 2000)
            }, 1)
        }
    };
    a(document).bind("imbullcountwords", function (c, b) {
        imbullWordCount.wc(b)
    })
}(jQuery));
var switchEditors = {
    switchto: function (b) {
        var c = b.id,
            a = c.length,
            e = c.substr(0, a - 5),
            d = c.substr(a - 4);
        this.go(e, d)
    },
    go: function (g, f) {
        g = g || "content";
        f = f || "toggle";
        var c = this,
            b = tinyMCE.get(g),
            a, d, e = tinymce.DOM;
        a = "imbull-" + g + "-wrap";
        d = e.get(g);
        if ("toggle" == f) {
            if (b && !b.isHidden()) {
                f = "html"
            } else {
                f = "tmce"
            }
        }
        if ("tmce" == f || "tinymce" == f) {
            if (b && !b.isHidden()) {
                return false
            }
            if (typeof (QTags) != "undefined") {
                QTags.closeAllTags(g)
            }
            if (tinyMCEPreInit.mceInit[g] && tinyMCEPreInit.mceInit[g].imbullautop) {
                d.value = c.imbullautop(d.value)
            }
            if (b) {
                b.show()
            } else {
                b = new tinymce.Editor(g, tinyMCEPreInit.mceInit[g]);
                b.render()
            }
            e.removeClass(a, "html-active");
            e.addClass(a, "tmce-active");
            setUserSetting("editor", "tinymce")
        } else {
            if ("html" == f) {
                if (b && b.isHidden()) {
                    return false
                }
                if (b) {
                    d.style.height = b.getContentAreaContainer().offsetHeight + 20 + "px";
                    b.hide()
                }
                e.removeClass(a, "tmce-active");
                e.addClass(a, "html-active");
                setUserSetting("editor", "html")
            }
        }
        return false
    },
    _imbull_Nop: function (b) {
        var c, a;
        if (b.indexOf("<pre") != -1 || b.indexOf("<script") != -1) {
            b = b.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function (d) {
                d = d.replace(/<br ?\/?>(\r\n|\n)?/g, "<imbull_temp>");
                return d.replace(/<\/?p( [^>]*)?>(\r\n|\n)?/g, "<imbull_temp>")
            })
        }
        c = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|div|h[1-6]|p|fieldset";
        b = b.replace(new RegExp("\\s*</(" + c + ")>\\s*", "g"), "</$1>\n");
        b = b.replace(new RegExp("\\s*<((?:" + c + ")(?: [^>]*)?)>", "g"), "\n<$1>");
        b = b.replace(/(<p [^>]+>.*?)<\/p>/g, "$1</p#>");
        b = b.replace(/<div( [^>]*)?>\s*<p>/gi, "<div$1>\n\n");
        b = b.replace(/\s*<p>/gi, "");
        b = b.replace(/\s*<\/p>\s*/gi, "\n\n");
        b = b.replace(/\n[\s\u00a0]+\n/g, "\n\n");
        b = b.replace(/\s*<br ?\/?>\s*/gi, "\n");
        b = b.replace(/\s*<div/g, "\n<div");
        b = b.replace(/<\/div>\s*/g, "</div>\n");
        b = b.replace(/\s*\[caption([^\[]+)\[\/caption\]\s*/gi, "\n\n[caption$1[/caption]\n\n");
        b = b.replace(/caption\]\n\n+\[caption/g, "caption]\n\n[caption");
        a = "blockquote|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|h[1-6]|pre|fieldset";
        b = b.replace(new RegExp("\\s*<((?:" + a + ")(?: [^>]*)?)\\s*>", "g"), "\n<$1>");
        b = b.replace(new RegExp("\\s*</(" + a + ")>\\s*", "g"), "</$1>\n");
        b = b.replace(/<li([^>]*)>/g, "\t<li$1>");
        if (b.indexOf("<hr") != -1) {
            b = b.replace(/\s*<hr( [^>]*)?>\s*/g, "\n\n<hr$1>\n\n")
        }
        if (b.indexOf("<object") != -1) {
            b = b.replace(/<object[\s\S]+?<\/object>/g, function (d) {
                return d.replace(/[\r\n]+/g, "")
            })
        }
        b = b.replace(/<\/p#>/g, "</p>\n");
        b = b.replace(/\s*(<p [^>]+>[\s\S]*?<\/p>)/g, "\n$1");
        b = b.replace(/^\s+/, "");
        b = b.replace(/[\s\u00a0]+$/, "");
        b = b.replace(/<imbull_temp>/g, "\n");
        return b
    },
    _imbull_Autop: function (a) {
        var b = "table|thead|tfoot|tbody|tr|td|th|caption|col|colgroup|div|dl|dd|dt|ul|ol|li|pre|select|form|blockquote|address|math|p|h[1-6]|fieldset|legend|hr|noscript|menu|samp|header|footer|article|section|hgroup|nav|aside|details|summary";
        if (a.indexOf("<object") != -1) {
            a = a.replace(/<object[\s\S]+?<\/object>/g, function (c) {
                return c.replace(/[\r\n]+/g, "")
            })
        }
        a = a.replace(/<[^<>]+>/g, function (c) {
            return c.replace(/[\r\n]+/g, " ")
        });
        if (a.indexOf("<pre") != -1 || a.indexOf("<script") != -1) {
            a = a.replace(/<(pre|script)[^>]*>[\s\S]+?<\/\1>/g, function (c) {
                return c.replace(/(\r\n|\n)/g, "<imbull_temp_br>")
            })
        }
        a = a + "\n\n";
        a = a.replace(/<br \/>\s*<br \/>/gi, "\n\n");
        a = a.replace(new RegExp("(<(?:" + b + ")(?: [^>]*)?>)", "gi"), "\n$1");
        a = a.replace(new RegExp("(</(?:" + b + ")>)", "gi"), "$1\n\n");
        a = a.replace(/<hr( [^>]*)?>/gi, "<hr$1>\n\n");
        a = a.replace(/\r\n|\r/g, "\n");
        a = a.replace(/\n\s*\n+/g, "\n\n");
        a = a.replace(/([\s\S]+?)\n\n/g, "<p>$1</p>\n");
        a = a.replace(/<p>\s*?<\/p>/gi, "");
        a = a.replace(new RegExp("<p>\\s*(</?(?:" + b + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1");
        a = a.replace(/<p>(<li.+?)<\/p>/gi, "$1");
        a = a.replace(/<p>\s*<blockquote([^>]*)>/gi, "<blockquote$1><p>");
        a = a.replace(/<\/blockquote>\s*<\/p>/gi, "</p></blockquote>");
        a = a.replace(new RegExp("<p>\\s*(</?(?:" + b + ")(?: [^>]*)?>)", "gi"), "$1");
        a = a.replace(new RegExp("(</?(?:" + b + ")(?: [^>]*)?>)\\s*</p>", "gi"), "$1");
        a = a.replace(/\s*\n/gi, "<br />\n");
        a = a.replace(new RegExp("(</?(?:" + b + ")[^>]*>)\\s*<br />", "gi"), "$1");
        a = a.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)>)/gi, "$1");
        a = a.replace(/(?:<p>|<br ?\/?>)*\s*\[caption([^\[]+)\[\/caption\]\s*(?:<\/p>|<br ?\/?>)*/gi, "[caption$1[/caption]");
        a = a.replace(/(<(?:div|th|td|form|fieldset|dd)[^>]*>)(.*?)<\/p>/g, function (e, d, f) {
            if (f.match(/<p( [^>]*)?>/)) {
                return e
            }
            return d + "<p>" + f + "</p>"
        });
        a = a.replace(/<imbull_temp_br>/g, "\n");
        return a
    },
    pre_imbullautop: function (b) {
        var a = this,
            d = {
                o: a,
                data: b,
                unfiltered: b
            },
            c = typeof (jQuery) != "undefined";
        if (c) {
            jQuery("body").trigger("beforePreimbullautop", [d])
        }
        d.data = a._imbull_Nop(d.data);
        if (c) {
            jQuery("body").trigger("afterPreimbullautop", [d])
        }
        return d.data
    },
    imbullautop: function (b) {
        var a = this,
            d = {
                o: a,
                data: b,
                unfiltered: b
            },
            c = typeof (jQuery) != "undefined";
        if (c) {
            jQuery("body").trigger("beforeimbullautop", [d])
        }
        d.data = a._imbull_Autop(d.data);
        if (c) {
            jQuery("body").trigger("afterimbullautop", [d])
        }
        return d.data
    }
};
/*
 * jQuery UI Resizable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */ (function (e) {
    e.widget("ui.resizable", e.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1E3
        },
        _create: function () {
            var b = this,
                a = this.options;
            this.element.addClass("ui-resizable");
            e.extend(this, {
                _aspectRatio: !! a.aspectRatio,
                aspectRatio: a.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: a.helper || a.ghost || a.animate ? a.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                /relative/.test(this.element.css("position")) && e.browser.opera && this.element.css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                });
                this.element.wrap(e('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = a.handles || (!e(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor == String) {
                if (this.handles == "all") this.handles = "n,e,s,w,se,sw,ne,nw";
                var c = this.handles.split(",");
                this.handles = {};
                for (var d = 0; d < c.length; d++) {
                    var f = e.trim(c[d]),
                        g = e('<div class="ui-resizable-handle ' + ("ui-resizable-" + f) + '"></div>');
                    /sw|se|ne|nw/.test(f) && g.css({
                        zIndex: ++a.zIndex
                    });
                    "se" == f && g.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
                    this.handles[f] = ".ui-resizable-" + f;
                    this.element.append(g)
                }
            }
            this._renderAxis = function (h) {
                h = h || this.element;
                for (var i in this.handles) {
                    if (this.handles[i].constructor == String) this.handles[i] = e(this.handles[i], this.element).show();
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var j = e(this.handles[i], this.element),
                            l = 0;
                        l = /sw|ne|nw|se|n|s/.test(i) ? j.outerHeight() : j.outerWidth();
                        j = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join("");
                        h.css(j, l);
                        this._proportionallyResize()
                    }
                    e(this.handles[i])
                }
            };
            this._renderAxis(this.element);
            this._handles = e(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!b.resizing) {
                    if (this.className) var h = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = h && h[1] ? h[1] : "se"
                }
            });
            if (a.autoHide) {
                this._handles.hide();
                e(this.element).addClass("ui-resizable-autohide").hover(function () {
                    if (!a.disabled) {
                        e(this).removeClass("ui-resizable-autohide");
                        b._handles.show()
                    }
                }, function () {
                    if (!a.disabled) if (!b.resizing) {
                        e(this).addClass("ui-resizable-autohide");
                        b._handles.hide()
                    }
                })
            }
            this._mouseInit()
        },
        destroy: function () {
            this._mouseDestroy();
            var b = function (c) {
                    e(c).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
                };
            if (this.elementIsWrapper) {
                b(this.element);
                var a = this.element;
                a.after(this.originalElement.css({
                    position: a.css("position"),
                    width: a.outerWidth(),
                    height: a.outerHeight(),
                    top: a.css("top"),
                    left: a.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            b(this.originalElement);
            return this
        },
        _mouseCapture: function (b) {
            var a = false;
            for (var c in this.handles) if (e(this.handles[c])[0] == b.target) a = true;
            return !this.options.disabled && a
        },
        _mouseStart: function (b) {
            var a = this.options,
                c = this.element.position(),
                d = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: e(document).scrollTop(),
                left: e(document).scrollLeft()
            };
            if (d.is(".ui-draggable") || /absolute/.test(d.css("position"))) d.css({
                position: "absolute",
                top: c.top,
                left: c.left
            });
            e.browser.opera && /relative/.test(d.css("position")) && d.css({
                position: "relative",
                top: "auto",
                left: "auto"
            });
            this._renderProxy();
            c = m(this.helper.css("left"));
            var f = m(this.helper.css("top"));
            if (a.containment) {
                c += e(a.containment).scrollLeft() || 0;
                f += e(a.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: c,
                top: f
            };
            this.size = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            } : {
                width: d.width(),
                height: d.height()
            };
            this.originalSize = this._helper ? {
                width: d.outerWidth(),
                height: d.outerHeight()
            } : {
                width: d.width(),
                height: d.height()
            };
            this.originalPosition = {
                left: c,
                top: f
            };
            this.sizeDiff = {
                width: d.outerWidth() - d.width(),
                height: d.outerHeight() - d.height()
            };
            this.originalMousePosition = {
                left: b.pageX,
                top: b.pageY
            };
            this.aspectRatio = typeof a.aspectRatio == "number" ? a.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            a = e(".ui-resizable-" + this.axis).css("cursor");
            e("body").css("cursor", a == "auto" ? this.axis + "-resize" : a);
            d.addClass("ui-resizable-resizing");
            this._propagate("start", b);
            return true
        },
        _mouseDrag: function (b) {
            var a = this.helper,
                c = this.originalMousePosition,
                d = this._change[this.axis];
            if (!d) return false;
            c = d.apply(this, [b, b.pageX - c.left || 0, b.pageY - c.top || 0]);
            this._updateVirtualBoundaries(b.shiftKey);
            if (this._aspectRatio || b.shiftKey) c = this._updateRatio(c, b);
            c = this._respectSize(c, b);
            this._propagate("resize", b);
            a.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            this._updateCache(c);
            this._trigger("resize", b, this.ui());
            return false
        },
        _mouseStop: function (b) {
            this.resizing = false;
            var a = this.options,
                c = this;
            if (this._helper) {
                var d = this._proportionallyResizeElements,
                    f = d.length && /textarea/i.test(d[0].nodeName);
                d = f && e.ui.hasScroll(d[0], "left") ? 0 : c.sizeDiff.height;
                f = f ? 0 : c.sizeDiff.width;
                f = {
                    width: c.helper.width() - f,
                    height: c.helper.height() - d
                };
                d = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null;
                var g = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
                a.animate || this.element.css(e.extend(f, {
                    top: g,
                    left: d
                }));
                c.helper.height(c.size.height);
                c.helper.width(c.size.width);
                this._helper && !a.animate && this._proportionallyResize()
            }
            e("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", b);
            this._helper && this.helper.remove();
            return false
        },
        _updateVirtualBoundaries: function (b) {
            var a = this.options,
                c, d, f;
            a = {
                minWidth: k(a.minWidth) ? a.minWidth : 0,
                maxWidth: k(a.maxWidth) ? a.maxWidth : Infinity,
                minHeight: k(a.minHeight) ? a.minHeight : 0,
                maxHeight: k(a.maxHeight) ? a.maxHeight : Infinity
            };
            if (this._aspectRatio || b) {
                b = a.minHeight * this.aspectRatio;
                d = a.minWidth / this.aspectRatio;
                c = a.maxHeight * this.aspectRatio;
                f = a.maxWidth / this.aspectRatio;
                if (b > a.minWidth) a.minWidth = b;
                if (d > a.minHeight) a.minHeight = d;
                if (c < a.maxWidth) a.maxWidth = c;
                if (f < a.maxHeight) a.maxHeight = f
            }
            this._vBoundaries = a
        },
        _updateCache: function (b) {
            this.offset = this.helper.offset();
            if (k(b.left)) this.position.left = b.left;
            if (k(b.top)) this.position.top = b.top;
            if (k(b.height)) this.size.height = b.height;
            if (k(b.width)) this.size.width = b.width
        },
        _updateRatio: function (b) {
            var a = this.position,
                c = this.size,
                d = this.axis;
            if (k(b.height)) b.width = b.height * this.aspectRatio;
            else if (k(b.width)) b.height = b.width / this.aspectRatio;
            if (d == "sw") {
                b.left = a.left + (c.width - b.width);
                b.top = null
            }
            if (d == "nw") {
                b.top = a.top + (c.height - b.height);
                b.left = a.left + (c.width - b.width)
            }
            return b
        },
        _respectSize: function (b) {
            var a = this._vBoundaries,
                c = this.axis,
                d = k(b.width) && a.maxWidth && a.maxWidth < b.width,
                f = k(b.height) && a.maxHeight && a.maxHeight < b.height,
                g = k(b.width) && a.minWidth && a.minWidth > b.width,
                h = k(b.height) && a.minHeight && a.minHeight > b.height;
            if (g) b.width = a.minWidth;
            if (h) b.height = a.minHeight;
            if (d) b.width = a.maxWidth;
            if (f) b.height = a.maxHeight;
            var i = this.originalPosition.left + this.originalSize.width,
                j = this.position.top + this.size.height,
                l = /sw|nw|w/.test(c);
            c = /nw|ne|n/.test(c);
            if (g && l) b.left = i - a.minWidth;
            if (d && l) b.left = i - a.maxWidth;
            if (h && c) b.top = j - a.minHeight;
            if (f && c) b.top = j - a.maxHeight;
            if ((a = !b.width && !b.height) && !b.left && b.top) b.top = null;
            else if (a && !b.top && b.left) b.left = null;
            return b
        },
        _proportionallyResize: function () {
            if (this._proportionallyResizeElements.length) for (var b = this.helper || this.element, a = 0; a < this._proportionallyResizeElements.length; a++) {
                var c = this._proportionallyResizeElements[a];
                if (!this.borderDif) {
                    var d = [c.css("borderTopWidth"), c.css("borderRightWidth"), c.css("borderBottomWidth"), c.css("borderLeftWidth")],
                        f = [c.css("paddingTop"), c.css("paddingRight"), c.css("paddingBottom"), c.css("paddingLeft")];
                    this.borderDif = e.map(d, function (g, h) {
                        g = parseInt(g, 10) || 0;
                        h = parseInt(f[h], 10) || 0;
                        return g + h
                    })
                }
                e.browser.msie && (e(b).is(":hidden") || e(b).parents(":hidden").length) || c.css({
                    height: b.height() - this.borderDif[0] - this.borderDif[2] || 0,
                    width: b.width() - this.borderDif[1] - this.borderDif[3] || 0
                })
            }
        },
        _renderProxy: function () {
            var b = this.options;
            this.elementOffset = this.element.offset();
            if (this._helper) {
                this.helper = this.helper || e('<div style="overflow:hidden;"></div>');
                var a = e.browser.msie && e.browser.version < 7,
                    c = a ? 1 : 0;
                a = a ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + a,
                    height: this.element.outerHeight() + a,
                    position: "absolute",
                    left: this.elementOffset.left - c + "px",
                    top: this.elementOffset.top - c + "px",
                    zIndex: ++b.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function (b, a) {
                return {
                    width: this.originalSize.width + a
                }
            },
            w: function (b, a) {
                return {
                    left: this.originalPosition.left + a,
                    width: this.originalSize.width - a
                }
            },
            n: function (b, a, c) {
                return {
                    top: this.originalPosition.top + c,
                    height: this.originalSize.height - c
                }
            },
            s: function (b, a, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function (b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            sw: function (b, a, c) {
                return e.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            },
            ne: function (b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, a, c]))
            },
            nw: function (b, a, c) {
                return e.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, a, c]))
            }
        },
        _propagate: function (b, a) {
            e.ui.plugin.call(this, b, [a, this.ui()]);
            b != "resize" && this._trigger(b, a, this.ui())
        },
        plugins: {},
        ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    e.extend(e.ui.resizable, {
        version: "1.8.16"
    });
    e.ui.plugin.add("resizable", "alsoResize", {
        start: function () {
            var b = e(this).data("resizable").options,
                a = function (c) {
                    e(c).each(function () {
                        var d = e(this);
                        d.data("resizable-alsoresize", {
                            width: parseInt(d.width(), 10),
                            height: parseInt(d.height(), 10),
                            left: parseInt(d.css("left"), 10),
                            top: parseInt(d.css("top"), 10),
                            position: d.css("position")
                        })
                    })
                };
            if (typeof b.alsoResize == "object" && !b.alsoResize.parentNode) if (b.alsoResize.length) {
                b.alsoResize = b.alsoResize[0];
                a(b.alsoResize)
            } else e.each(b.alsoResize, function (c) {
                a(c)
            });
            else a(b.alsoResize)
        },
        resize: function (b, a) {
            var c = e(this).data("resizable");
            b = c.options;
            var d = c.originalSize,
                f = c.originalPosition,
                g = {
                    height: c.size.height - d.height || 0,
                    width: c.size.width - d.width || 0,
                    top: c.position.top - f.top || 0,
                    left: c.position.left - f.left || 0
                },
                h = function (i, j) {
                    e(i).each(function () {
                        var l = e(this),
                            q = e(this).data("resizable-alsoresize"),
                            p = {},
                            r = j && j.length ? j : l.parents(a.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        e.each(r, function (n, o) {
                            if ((n = (q[o] || 0) + (g[o] || 0)) && n >= 0) p[o] = n || null
                        });
                        if (e.browser.opera && /relative/.test(l.css("position"))) {
                            c._revertToRelativePosition = true;
                            l.css({
                                position: "absolute",
                                top: "auto",
                                left: "auto"
                            })
                        }
                        l.css(p)
                    })
                };
            typeof b.alsoResize == "object" && !b.alsoResize.nodeType ? e.each(b.alsoResize, function (i, j) {
                h(i, j)
            }) : h(b.alsoResize)
        },
        stop: function () {
            var b = e(this).data("resizable"),
                a = b.options,
                c = function (d) {
                    e(d).each(function () {
                        var f = e(this);
                        f.css({
                            position: f.data("resizable-alsoresize").position
                        })
                    })
                };
            if (b._revertToRelativePosition) {
                b._revertToRelativePosition = false;
                typeof a.alsoResize == "object" && !a.alsoResize.nodeType ? e.each(a.alsoResize, function (d) {
                    c(d)
                }) : c(a.alsoResize)
            }
            e(this).removeData("resizable-alsoresize")
        }
    });
    e.ui.plugin.add("resizable", "animate", {
        stop: function (b) {
            var a = e(this).data("resizable"),
                c = a.options,
                d = a._proportionallyResizeElements,
                f = d.length && /textarea/i.test(d[0].nodeName),
                g = f && e.ui.hasScroll(d[0], "left") ? 0 : a.sizeDiff.height;
            f = {
                width: a.size.width - (f ? 0 : a.sizeDiff.width),
                height: a.size.height - g
            };
            g = parseInt(a.element.css("left"), 10) + (a.position.left - a.originalPosition.left) || null;
            var h = parseInt(a.element.css("top"), 10) + (a.position.top - a.originalPosition.top) || null;
            a.element.animate(e.extend(f, h && g ? {
                top: h,
                left: g
            } : {}), {
                duration: c.animateDuration,
                easing: c.animateEasing,
                step: function () {
                    var i = {
                        width: parseInt(a.element.css("width"), 10),
                        height: parseInt(a.element.css("height"), 10),
                        top: parseInt(a.element.css("top"), 10),
                        left: parseInt(a.element.css("left"), 10)
                    };
                    d && d.length && e(d[0]).css({
                        width: i.width,
                        height: i.height
                    });
                    a._updateCache(i);
                    a._propagate("resize", b)
                }
            })
        }
    });
    e.ui.plugin.add("resizable", "containment", {
        start: function () {
            var b = e(this).data("resizable"),
                a = b.element,
                c = b.options.containment;
            if (a = c instanceof e ? c.get(0) : /parent/.test(c) ? a.parent().get(0) : c) {
                b.containerElement = e(a);
                if (/document/.test(c) || c == document) {
                    b.containerOffset = {
                        left: 0,
                        top: 0
                    };
                    b.containerPosition = {
                        left: 0,
                        top: 0
                    };
                    b.parentData = {
                        element: e(document),
                        left: 0,
                        top: 0,
                        width: e(document).width(),
                        height: e(document).height() || document.body.parentNode.scrollHeight
                    }
                } else {
                    var d = e(a),
                        f = [];
                    e(["Top", "Right", "Left", "Bottom"]).each(function (i, j) {
                        f[i] = m(d.css("padding" + j))
                    });
                    b.containerOffset = d.offset();
                    b.containerPosition = d.position();
                    b.containerSize = {
                        height: d.innerHeight() - f[3],
                        width: d.innerWidth() - f[1]
                    };
                    c = b.containerOffset;
                    var g = b.containerSize.height,
                        h = b.containerSize.width;
                    h = e.ui.hasScroll(a, "left") ? a.scrollWidth : h;
                    g = e.ui.hasScroll(a) ? a.scrollHeight : g;
                    b.parentData = {
                        element: a,
                        left: c.left,
                        top: c.top,
                        width: h,
                        height: g
                    }
                }
            }
        },
        resize: function (b) {
            var a = e(this).data("resizable"),
                c = a.options,
                d = a.containerOffset,
                f = a.position;
            b = a._aspectRatio || b.shiftKey;
            var g = {
                top: 0,
                left: 0
            },
                h = a.containerElement;
            if (h[0] != document && /static/.test(h.css("position"))) g = d;
            if (f.left < (a._helper ? d.left : 0)) {
                a.size.width += a._helper ? a.position.left - d.left : a.position.left - g.left;
                if (b) a.size.height = a.size.width / c.aspectRatio;
                a.position.left = c.helper ? d.left : 0
            }
            if (f.top < (a._helper ? d.top : 0)) {
                a.size.height += a._helper ? a.position.top - d.top : a.position.top;
                if (b) a.size.width = a.size.height * c.aspectRatio;
                a.position.top = a._helper ? d.top : 0
            }
            a.offset.left = a.parentData.left + a.position.left;
            a.offset.top = a.parentData.top + a.position.top;
            c = Math.abs((a._helper ? a.offset.left - g.left : a.offset.left - g.left) + a.sizeDiff.width);
            d = Math.abs((a._helper ? a.offset.top - g.top : a.offset.top - d.top) + a.sizeDiff.height);
            f = a.containerElement.get(0) == a.element.parent().get(0);
            g = /relative|absolute/.test(a.containerElement.css("position"));
            if (f && g) c -= a.parentData.left;
            if (c + a.size.width >= a.parentData.width) {
                a.size.width = a.parentData.width - c;
                if (b) a.size.height = a.size.width / a.aspectRatio
            }
            if (d + a.size.height >= a.parentData.height) {
                a.size.height = a.parentData.height - d;
                if (b) a.size.width = a.size.height * a.aspectRatio
            }
        },
        stop: function () {
            var b = e(this).data("resizable"),
                a = b.options,
                c = b.containerOffset,
                d = b.containerPosition,
                f = b.containerElement,
                g = e(b.helper),
                h = g.offset(),
                i = g.outerWidth() - b.sizeDiff.width;
            g = g.outerHeight() - b.sizeDiff.height;
            b._helper && !a.animate && /relative/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            });
            b._helper && !a.animate && /static/.test(f.css("position")) && e(this).css({
                left: h.left - d.left - c.left,
                width: i,
                height: g
            })
        }
    });
    e.ui.plugin.add("resizable", "ghost", {
        start: function () {
            var b = e(this).data("resizable"),
                a = b.options,
                c = b.size;
            b.ghost = b.originalElement.clone();
            b.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: c.height,
                width: c.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof a.ghost == "string" ? a.ghost : "");
            b.ghost.appendTo(b.helper)
        },
        resize: function () {
            var b = e(this).data("resizable");
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            })
        },
        stop: function () {
            var b = e(this).data("resizable");
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
        }
    });
    e.ui.plugin.add("resizable", "grid", {
        resize: function () {
            var b = e(this).data("resizable"),
                a = b.options,
                c = b.size,
                d = b.originalSize,
                f = b.originalPosition,
                g = b.axis;
            a.grid = typeof a.grid == "number" ? [a.grid, a.grid] : a.grid;
            var h = Math.round((c.width - d.width) / (a.grid[0] || 1)) * (a.grid[0] || 1);
            a = Math.round((c.height - d.height) / (a.grid[1] || 1)) * (a.grid[1] || 1);
            if (/^(se|s|e)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a
            } else if (/^(ne)$/.test(g)) {
                b.size.width = d.width + h;
                b.size.height = d.height + a;
                b.position.top = f.top - a
            } else {
                if (/^(sw)$/.test(g)) {
                    b.size.width = d.width + h;
                    b.size.height = d.height + a
                } else {
                    b.size.width = d.width + h;
                    b.size.height = d.height + a;
                    b.position.top = f.top - a
                }
                b.position.left = f.left - h
            }
        }
    });
    var m = function (b) {
            return parseInt(b, 10) || 0
        },
        k = function (b) {
            return !isNaN(parseInt(b, 10))
        }
})(jQuery);

/*
 * jQuery UI Draggable 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.mouse.js
 *	jquery.ui.widget.js
 */ (function (d) {
    d.widget("ui.draggable", d.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position"))) this.element[0].style.position = "relative";
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        destroy: function () {
            if (this.element.data("draggable")) {
                this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
                this._mouseDestroy();
                return this
            }
        },
        _mouseCapture: function (a) {
            var b = this.options;
            if (this.helper || b.disabled || d(a.target).is(".ui-resizable-handle")) return false;
            this.handle = this._getHandle(a);
            if (!this.handle) return false;
            if (b.iframeFix) d(b.iframeFix === true ? "iframe" : b.iframeFix).each(function () {
                d('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(d(this).offset()).appendTo("body")
            });
            return true
        },
        _mouseStart: function (a) {
            var b = this.options;
            this.helper = this._createHelper(a);
            this._cacheHelperProportions();
            if (d.ui.ddmanager) d.ui.ddmanager.current = this;
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            d.extend(this.offset, {
                click: {
                    left: a.pageX - this.offset.left,
                    top: a.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(a);
            this.originalPageX = a.pageX;
            this.originalPageY = a.pageY;
            b.cursorAt && this._adjustOffsetFromHelper(b.cursorAt);
            b.containment && this._setContainment();
            if (this._trigger("start", a) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            d.ui.ddmanager && !b.dropBehaviour && d.ui.ddmanager.prepareOffsets(this, a);
            this.helper.addClass("ui-draggable-dragging");
            this._mouseDrag(a, true);
            d.ui.ddmanager && d.ui.ddmanager.dragStart(this, a);
            return true
        },
        _mouseDrag: function (a, b) {
            this.position = this._generatePosition(a);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!b) {
                b = this._uiHash();
                if (this._trigger("drag", a, b) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = b.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            d.ui.ddmanager && d.ui.ddmanager.drag(this, a);
            return false
        },
        _mouseStop: function (a) {
            var b = false;
            if (d.ui.ddmanager && !this.options.dropBehaviour) b = d.ui.ddmanager.drop(this, a);
            if (this.dropped) {
                b = this.dropped;
                this.dropped = false
            }
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return false;
            if (this.options.revert == "invalid" && !b || this.options.revert == "valid" && b || this.options.revert === true || d.isFunction(this.options.revert) && this.options.revert.call(this.element, b)) {
                var c = this;
                d(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    c._trigger("stop", a) !== false && c._clear()
                })
            } else this._trigger("stop", a) !== false && this._clear();
            return false
        },
        _mouseUp: function (a) {
            this.options.iframeFix === true && d("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            d.ui.ddmanager && d.ui.ddmanager.dragStop(this, a);
            return d.ui.mouse.prototype._mouseUp.call(this, a)
        },
        cancel: function () {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function (a) {
            var b = !this.options.handle || !d(this.options.handle, this.element).length ? true : false;
            d(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == a.target) b = true
            });
            return b
        },
        _createHelper: function (a) {
            var b = this.options;
            a = d.isFunction(b.helper) ? d(b.helper.apply(this.element[0], [a])) : b.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            a.parents("body").length || a.appendTo(b.appendTo == "parent" ? this.element[0].parentNode : b.appendTo);
            a[0] != this.element[0] && !/(fixed|absolute)/.test(a.css("position")) && a.css("position", "absolute");
            return a
        },
        _adjustOffsetFromHelper: function (a) {
            if (typeof a == "string") a = a.split(" ");
            if (d.isArray(a)) a = {
                left: +a[0],
                top: +a[1] || 0
            };
            if ("left" in a) this.offset.click.left = a.left + this.margins.left;
            if ("right" in a) this.offset.click.left = this.helperProportions.width - a.right + this.margins.left;
            if ("top" in a) this.offset.click.top = a.top + this.margins.top;
            if ("bottom" in a) this.offset.click.top = this.helperProportions.height - a.bottom + this.margins.top
        },
        _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var a = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                a.left += this.scrollParent.scrollLeft();
                a.top += this.scrollParent.scrollTop()
            }
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && d.browser.msie) a = {
                top: 0,
                left: 0
            };
            return {
                top: a.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: a.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function () {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function () {
            var a = this.options;
            if (a.containment == "parent") a.containment = this.helper[0].parentNode;
            if (a.containment == "document" || a.containment == "window") this.containment = [a.containment == "document" ? 0 : d(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a.containment == "document" ? 0 : d(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (a.containment == "document" ? 0 : d(window).scrollLeft()) + d(a.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (a.containment == "document" ? 0 : d(window).scrollTop()) + (d(a.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(a.containment) && a.containment.constructor != Array) {
                a = d(a.containment);
                var b = a[0];
                if (b) {
                    a.offset();
                    var c = d(b).css("overflow") != "hidden";
                    this.containment = [(parseInt(d(b).css("borderLeftWidth"), 10) || 0) + (parseInt(d(b).css("paddingLeft"), 10) || 0), (parseInt(d(b).css("borderTopWidth"), 10) || 0) + (parseInt(d(b).css("paddingTop"), 10) || 0), (c ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(d(b).css("borderLeftWidth"), 10) || 0) - (parseInt(d(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(d(b).css("borderTopWidth"), 10) || 0) - (parseInt(d(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                    this.relative_container = a
                }
            } else if (a.containment.constructor == Array) this.containment = a.containment
        },
        _convertPositionTo: function (a, b) {
            if (!b) b = this.position;
            a = a == "absolute" ? 1 : -1;
            var c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName);
            return {
                top: b.top + this.offset.relative.top * a + this.offset.parent.top * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()) * a),
                left: b.left + this.offset.relative.left * a + this.offset.parent.left * a - (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft()) * a)
            }
        },
        _generatePosition: function (a) {
            var b = this.options,
                c = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && d.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                f = /(html|body)/i.test(c[0].tagName),
                e = a.pageX,
                h = a.pageY;
            if (this.originalPosition) {
                var g;
                if (this.containment) {
                    if (this.relative_container) {
                        g = this.relative_container.offset();
                        g = [this.containment[0] + g.left, this.containment[1] + g.top, this.containment[2] + g.left, this.containment[3] + g.top]
                    } else g = this.containment;
                    if (a.pageX - this.offset.click.left < g[0]) e = g[0] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top < g[1]) h = g[1] + this.offset.click.top;
                    if (a.pageX - this.offset.click.left > g[2]) e = g[2] + this.offset.click.left;
                    if (a.pageY - this.offset.click.top > g[3]) h = g[3] + this.offset.click.top
                }
                if (b.grid) {
                    h = b.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / b.grid[1]) * b.grid[1] : this.originalPageY;
                    h = g ? !(h - this.offset.click.top < g[1] || h - this.offset.click.top > g[3]) ? h : !(h - this.offset.click.top < g[1]) ? h - b.grid[1] : h + b.grid[1] : h;
                    e = b.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / b.grid[0]) * b.grid[0] : this.originalPageX;
                    e = g ? !(e - this.offset.click.left < g[0] || e - this.offset.click.left > g[2]) ? e : !(e - this.offset.click.left < g[0]) ? e - b.grid[0] : e + b.grid[0] : e
                }
            }
            return {
                top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : f ? 0 : c.scrollTop()),
                left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (d.browser.safari && d.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : f ? 0 : c.scrollLeft())
            }
        },
        _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = false
        },
        _trigger: function (a, b, c) {
            c = c || this._uiHash();
            d.ui.plugin.call(this, a, [b, c]);
            if (a == "drag") this.positionAbs = this._convertPositionTo("absolute");
            return d.Widget.prototype._trigger.call(this, a, b, c)
        },
        plugins: {},
        _uiHash: function () {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    d.extend(d.ui.draggable, {
        version: "1.8.16"
    });
    d.ui.plugin.add("draggable", "connectToSortable", {
        start: function (a, b) {
            var c = d(this).data("draggable"),
                f = c.options,
                e = d.extend({}, b, {
                    item: c.element
                });
            c.sortables = [];
            d(f.connectToSortable).each(function () {
                var h = d.data(this, "sortable");
                if (h && !h.options.disabled) {
                    c.sortables.push({
                        instance: h,
                        shouldRevert: h.options.revert
                    });
                    h.refreshPositions();
                    h._trigger("activate", a, e)
                }
            })
        },
        stop: function (a, b) {
            var c = d(this).data("draggable"),
                f = d.extend({}, b, {
                    item: c.element
                });
            d.each(c.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    c.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) this.instance.options.revert = true;
                    this.instance._mouseStop(a);
                    this.instance.options.helper = this.instance.options._helper;
                    c.options.helper == "original" && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", a, f)
                }
            })
        },
        drag: function (a, b) {
            var c = d(this).data("draggable"),
                f = this;
            d.each(c.sortables, function () {
                this.instance.positionAbs = c.positionAbs;
                this.instance.helperProportions = c.helperProportions;
                this.instance.offset.click = c.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = d(f).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return b.helper[0]
                        };
                        a.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(a, true);
                        this.instance._mouseStart(a, true, true);
                        this.instance.offset.click.top = c.offset.click.top;
                        this.instance.offset.click.left = c.offset.click.left;
                        this.instance.offset.parent.left -= c.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= c.offset.parent.top - this.instance.offset.parent.top;
                        c._trigger("toSortable", a);
                        c.dropped = this.instance.element;
                        c.currentItem = c.element;
                        this.instance.fromOutside = c
                    }
                    this.instance.currentItem && this.instance._mouseDrag(a)
                } else if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    this.instance.cancelHelperRemoval = true;
                    this.instance.options.revert = false;
                    this.instance._trigger("out", a, this.instance._uiHash(this.instance));
                    this.instance._mouseStop(a, true);
                    this.instance.options.helper = this.instance.options._helper;
                    this.instance.currentItem.remove();
                    this.instance.placeholder && this.instance.placeholder.remove();
                    c._trigger("fromSortable", a);
                    c.dropped = false
                }

            })
        }
    });
    d.ui.plugin.add("draggable", "cursor", {
        start: function () {
            var a = d("body"),
                b = d(this).data("draggable").options;
            if (a.css("cursor")) b._cursor = a.css("cursor");
            a.css("cursor", b.cursor)
        },
        stop: function () {
            var a = d(this).data("draggable").options;
            a._cursor && d("body").css("cursor", a._cursor)
        }
    });
    d.ui.plugin.add("draggable", "opacity", {
        start: function (a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("opacity")) b._opacity = a.css("opacity");
            a.css("opacity", b.opacity)
        },
        stop: function (a, b) {
            a = d(this).data("draggable").options;
            a._opacity && d(b.helper).css("opacity", a._opacity)
        }
    });
    d.ui.plugin.add("draggable", "scroll", {
        start: function () {
            var a = d(this).data("draggable");
            if (a.scrollParent[0] != document && a.scrollParent[0].tagName != "HTML") a.overflowOffset = a.scrollParent.offset()
        },
        drag: function (a) {
            var b = d(this).data("draggable"),
                c = b.options,
                f = false;
            if (b.scrollParent[0] != document && b.scrollParent[0].tagName != "HTML") {
                if (!c.axis || c.axis != "x") if (b.overflowOffset.top + b.scrollParent[0].offsetHeight - a.pageY < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop + c.scrollSpeed;
                else if (a.pageY - b.overflowOffset.top < c.scrollSensitivity) b.scrollParent[0].scrollTop = f = b.scrollParent[0].scrollTop - c.scrollSpeed;
                if (!c.axis || c.axis != "y") if (b.overflowOffset.left + b.scrollParent[0].offsetWidth - a.pageX < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft + c.scrollSpeed;
                else if (a.pageX - b.overflowOffset.left < c.scrollSensitivity) b.scrollParent[0].scrollLeft = f = b.scrollParent[0].scrollLeft - c.scrollSpeed
            } else {
                if (!c.axis || c.axis != "x") if (a.pageY - d(document).scrollTop() < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() - c.scrollSpeed);
                else if (d(window).height() - (a.pageY - d(document).scrollTop()) < c.scrollSensitivity) f = d(document).scrollTop(d(document).scrollTop() + c.scrollSpeed);
                if (!c.axis || c.axis != "y") if (a.pageX - d(document).scrollLeft() < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() - c.scrollSpeed);
                else if (d(window).width() - (a.pageX - d(document).scrollLeft()) < c.scrollSensitivity) f = d(document).scrollLeft(d(document).scrollLeft() + c.scrollSpeed)
            }
            f !== false && d.ui.ddmanager && !c.dropBehaviour && d.ui.ddmanager.prepareOffsets(b, a)
        }
    });
    d.ui.plugin.add("draggable", "snap", {
        start: function () {
            var a = d(this).data("draggable"),
                b = a.options;
            a.snapElements = [];
            d(b.snap.constructor != String ? b.snap.items || ":data(draggable)" : b.snap).each(function () {
                var c = d(this),
                    f = c.offset();
                this != a.element[0] && a.snapElements.push({
                    item: this,
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: f.top,
                    left: f.left
                })
            })
        },
        drag: function (a, b) {
            for (var c = d(this).data("draggable"), f = c.options, e = f.snapTolerance, h = b.offset.left, g = h + c.helperProportions.width, n = b.offset.top, o = n + c.helperProportions.height, i = c.snapElements.length - 1; i >= 0; i--) {
                var j = c.snapElements[i].left,
                    l = j + c.snapElements[i].width,
                    k = c.snapElements[i].top,
                    m = k + c.snapElements[i].height;
                if (j - e < h && h < l + e && k - e < n && n < m + e || j - e < h && h < l + e && k - e < o && o < m + e || j - e < g && g < l + e && k - e < n && n < m + e || j - e < g && g < l + e && k - e < o && o < m + e) {
                    if (f.snapMode != "inner") {
                        var p = Math.abs(k - o) <= e,
                            q = Math.abs(m - n) <= e,
                            r = Math.abs(j - g) <= e,
                            s = Math.abs(l - h) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: k - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: m,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: j - c.helperProportions.width
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: l
                        }).left - c.margins.left
                    }
                    var t = p || q || r || s;
                    if (f.snapMode != "outer") {
                        p = Math.abs(k - n) <= e;
                        q = Math.abs(m - o) <= e;
                        r = Math.abs(j - h) <= e;
                        s = Math.abs(l - g) <= e;
                        if (p) b.position.top = c._convertPositionTo("relative", {
                            top: k,
                            left: 0
                        }).top - c.margins.top;
                        if (q) b.position.top = c._convertPositionTo("relative", {
                            top: m - c.helperProportions.height,
                            left: 0
                        }).top - c.margins.top;
                        if (r) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: j
                        }).left - c.margins.left;
                        if (s) b.position.left = c._convertPositionTo("relative", {
                            top: 0,
                            left: l - c.helperProportions.width
                        }).left - c.margins.left
                    }
                    if (!c.snapElements[i].snapping && (p || q || r || s || t)) c.options.snap.snap && c.options.snap.snap.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[i].item
                    }));
                    c.snapElements[i].snapping = p || q || r || s || t
                } else {
                    c.snapElements[i].snapping && c.options.snap.release && c.options.snap.release.call(c.element, a, d.extend(c._uiHash(), {
                        snapItem: c.snapElements[i].item
                    }));
                    c.snapElements[i].snapping = false
                }
            }
        }
    });
    d.ui.plugin.add("draggable", "stack", {
        start: function () {
            var a = d(this).data("draggable").options;
            a = d.makeArray(d(a.stack)).sort(function (c, f) {
                return (parseInt(d(c).css("zIndex"), 10) || 0) - (parseInt(d(f).css("zIndex"), 10) || 0)
            });
            if (a.length) {
                var b = parseInt(a[0].style.zIndex) || 0;
                d(a).each(function (c) {
                    this.style.zIndex = b + c
                });
                this[0].style.zIndex = b + a.length
            }
        }
    });
    d.ui.plugin.add("draggable", "zIndex", {
        start: function (a, b) {
            a = d(b.helper);
            b = d(this).data("draggable").options;
            if (a.css("zIndex")) b._zIndex = a.css("zIndex");
            a.css("zIndex", b.zIndex)
        },
        stop: function (a, b) {
            a = d(this).data("draggable").options;
            a._zIndex && d(b.helper).css("zIndex", a._zIndex)
        }
    })
})(jQuery);

/*
 * jQuery UI Button 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Button
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */ (function (b) {
    var h, i, j, g, l = function () {
            var a = b(this).find(":ui-button");
            setTimeout(function () {
                a.button("refresh")
            }, 1)
        },
        k = function (a) {
            var c = a.name,
                e = a.form,
                f = b([]);
            if (c) f = e ? b(e).find("[name='" + c + "']") : b("[name='" + c + "']", a.ownerDocument).filter(function () {
                return !this.form
            });
            return f
        };
    b.widget("ui.button", {
        options: {
            disabled: null,
            text: true,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function () {
            this.element.closest("form").unbind("reset.button").bind("reset.button", l);
            if (typeof this.options.disabled !== "boolean") this.options.disabled = this.element.propAttr("disabled");
            this._determineButtonType();
            this.hasTitle = !! this.buttonElement.attr("title");
            var a = this,
                c = this.options,
                e = this.type === "checkbox" || this.type === "radio",
                f = "ui-state-hover" + (!e ? " ui-state-active" : "");
            if (c.label === null) c.label = this.buttonElement.html();
            if (this.element.is(":disabled")) c.disabled = true;
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter.button", function () {
                if (!c.disabled) {
                    b(this).addClass("ui-state-hover");
                    this === h && b(this).addClass("ui-state-active")
                }
            }).bind("mouseleave.button", function () {
                c.disabled || b(this).removeClass(f)
            }).bind("click.button", function (d) {
                if (c.disabled) {
                    d.preventDefault();
                    d.stopImmediatePropagation()
                }
            });
            this.element.bind("focus.button", function () {
                a.buttonElement.addClass("ui-state-focus")
            }).bind("blur.button", function () {
                a.buttonElement.removeClass("ui-state-focus")
            });
            if (e) {
                this.element.bind("change.button", function () {
                    g || a.refresh()
                });
                this.buttonElement.bind("mousedown.button", function (d) {
                    if (!c.disabled) {
                        g = false;
                        i = d.pageX;
                        j = d.pageY
                    }
                }).bind("mouseup.button", function (d) {
                    if (!c.disabled) if (i !== d.pageX || j !== d.pageY) g = true
                })
            }
            if (this.type === "checkbox") this.buttonElement.bind("click.button", function () {
                if (c.disabled || g) return false;
                b(this).toggleClass("ui-state-active");
                a.buttonElement.attr("aria-pressed", a.element[0].checked)
            });
            else if (this.type === "radio") this.buttonElement.bind("click.button", function () {
                if (c.disabled || g) return false;
                b(this).addClass("ui-state-active");
                a.buttonElement.attr("aria-pressed", "true");
                var d = a.element[0];
                k(d).not(d).map(function () {
                    return b(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            });
            else {
                this.buttonElement.bind("mousedown.button", function () {
                    if (c.disabled) return false;
                    b(this).addClass("ui-state-active");
                    h = this;
                    b(document).one("mouseup", function () {
                        h = null
                    })
                }).bind("mouseup.button", function () {
                    if (c.disabled) return false;
                    b(this).removeClass("ui-state-active")
                }).bind("keydown.button", function (d) {
                    if (c.disabled) return false;
                    if (d.keyCode == b.ui.keyCode.SPACE || d.keyCode == b.ui.keyCode.ENTER) b(this).addClass("ui-state-active")
                }).bind("keyup.button", function () {
                    b(this).removeClass("ui-state-active")
                });
                this.buttonElement.is("a") && this.buttonElement.keyup(function (d) {
                    d.keyCode === b.ui.keyCode.SPACE && b(this).click()
                })
            }
            this._setOption("disabled", c.disabled);
            this._resetButton()
        },
        _determineButtonType: function () {
            this.type = this.element.is(":checkbox") ? "checkbox" : this.element.is(":radio") ? "radio" : this.element.is("input") ? "input" : "button";
            if (this.type === "checkbox" || this.type === "radio") {
                var a = this.element.parents().filter(":last"),
                    c = "label[for='" + this.element.attr("id") + "']";
                this.buttonElement = a.find(c);
                if (!this.buttonElement.length) {
                    a = a.length ? a.siblings() : this.element.siblings();
                    this.buttonElement = a.filter(c);
                    if (!this.buttonElement.length) this.buttonElement = a.find(c)
                }
                this.element.addClass("ui-helper-hidden-accessible");
                (a = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active");
                this.buttonElement.attr("aria-pressed", a)
            } else this.buttonElement = this.element
        },
        widget: function () {
            return this.buttonElement
        },
        destroy: function () {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title");
            b.Widget.prototype.destroy.call(this)
        },
        _setOption: function (a, c) {
            b.Widget.prototype._setOption.apply(this, arguments);
            if (a === "disabled") c ? this.element.propAttr("disabled", true) : this.element.propAttr("disabled", false);
            else this._resetButton()
        },
        refresh: function () {
            var a = this.element.is(":disabled");
            a !== this.options.disabled && this._setOption("disabled", a);
            if (this.type === "radio") k(this.element[0]).each(function () {
                b(this).is(":checked") ? b(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : b(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            });
            else if (this.type === "checkbox") this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false")
        },
        _resetButton: function () {
            if (this.type === "input") this.options.label && this.element.val(this.options.label);
            else {
                var a = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                    c = b("<span></span>").addClass("ui-button-text").html(this.options.label).appendTo(a.empty()).text(),
                    e = this.options.icons,
                    f = e.primary && e.secondary,
                    d = [];
                if (e.primary || e.secondary) {
                    if (this.options.text) d.push("ui-button-text-icon" + (f ? "s" : e.primary ? "-primary" : "-secondary"));
                    e.primary && a.prepend("<span class='ui-button-icon-primary ui-icon " + e.primary + "'></span>");
                    e.secondary && a.append("<span class='ui-button-icon-secondary ui-icon " + e.secondary + "'></span>");
                    if (!this.options.text) {
                        d.push(f ? "ui-button-icons-only" : "ui-button-icon-only");
                        this.hasTitle || a.attr("title", c)
                    }
                } else d.push("ui-button-text-only");
                a.addClass(d.join(" "))
            }
        }
    });
    b.widget("ui.buttonset", {
        options: {
            items: ":button, :submit, :reset, :checkbox, :radio, a, :data(button)"
        },
        _create: function () {
            this.element.addClass("ui-buttonset")
        },
        _init: function () {
            this.refresh()
        },
        _setOption: function (a, c) {
            a === "disabled" && this.buttons.button("option", a, c);
            b.Widget.prototype._setOption.apply(this, arguments)
        },
        refresh: function () {
            var a = this.element.css("direction") === "ltr";
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function () {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(a ? "ui-corner-left" : "ui-corner-right").end().filter(":last").addClass(a ? "ui-corner-right" : "ui-corner-left").end().end()
        },
        destroy: function () {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function () {
                return b(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy");
            b.Widget.prototype.destroy.call(this)
        }
    })
})(jQuery);

/*
 * jQuery UI Position 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Position
 */ (function (c) {
    c.ui = c.ui || {};
    var n = /left|center|right/,
        o = /top|center|bottom/,
        t = c.fn.position,
        u = c.fn.offset;
    c.fn.position = function (b) {
        if (!b || !b.of) return t.apply(this, arguments);
        b = c.extend({}, b);
        var a = c(b.of),
            d = a[0],
            g = (b.collision || "flip").split(" "),
            e = b.offset ? b.offset.split(" ") : [0, 0],
            h, k, j;
        if (d.nodeType === 9) {
            h = a.width();
            k = a.height();
            j = {
                top: 0,
                left: 0
            }
        } else if (d.setTimeout) {
            h = a.width();
            k = a.height();
            j = {
                top: a.scrollTop(),
                left: a.scrollLeft()
            }
        } else if (d.preventDefault) {
            b.at = "left top";
            h = k = 0;
            j = {
                top: b.of.pageY,
                left: b.of.pageX
            }
        } else {
            h = a.outerWidth();
            k = a.outerHeight();
            j = a.offset()
        }
        c.each(["my", "at"], function () {
            var f = (b[this] || "").split(" ");
            if (f.length === 1) f = n.test(f[0]) ? f.concat(["center"]) : o.test(f[0]) ? ["center"].concat(f) : ["center", "center"];
            f[0] = n.test(f[0]) ? f[0] : "center";
            f[1] = o.test(f[1]) ? f[1] : "center";
            b[this] = f
        });
        if (g.length === 1) g[1] = g[0];
        e[0] = parseInt(e[0], 10) || 0;
        if (e.length === 1) e[1] = e[0];
        e[1] = parseInt(e[1], 10) || 0;
        if (b.at[0] === "right") j.left += h;
        else if (b.at[0] === "center") j.left += h / 2;
        if (b.at[1] === "bottom") j.top += k;
        else if (b.at[1] === "center") j.top += k / 2;
        j.left += e[0];
        j.top += e[1];
        return this.each(function () {
            var f = c(this),
                l = f.outerWidth(),
                m = f.outerHeight(),
                p = parseInt(c.curCSS(this, "marginLeft", true)) || 0,
                q = parseInt(c.curCSS(this, "marginTop", true)) || 0,
                v = l + p + (parseInt(c.curCSS(this, "marginRight", true)) || 0),
                w = m + q + (parseInt(c.curCSS(this, "marginBottom", true)) || 0),
                i = c.extend({}, j),
                r;
            if (b.my[0] === "right") i.left -= l;
            else if (b.my[0] === "center") i.left -= l / 2;
            if (b.my[1] === "bottom") i.top -= m;
            else if (b.my[1] === "center") i.top -= m / 2;
            i.left = Math.round(i.left);
            i.top = Math.round(i.top);
            r = {
                left: i.left - p,
                top: i.top - q
            };
            c.each(["left", "top"], function (s, x) {
                c.ui.position[g[s]] && c.ui.position[g[s]][x](i, {
                    targetWidth: h,
                    targetHeight: k,
                    elemWidth: l,
                    elemHeight: m,
                    collisionPosition: r,
                    collisionWidth: v,
                    collisionHeight: w,
                    offset: e,
                    my: b.my,
                    at: b.at
                })
            });
            c.fn.bgiframe && f.bgiframe();
            f.offset(c.extend(i, {
                using: b.using
            }))
        })
    };
    c.ui.position = {
        fit: {
            left: function (b, a) {
                var d = c(window);
                d = a.collisionPosition.left + a.collisionWidth - d.width() - d.scrollLeft();
                b.left = d > 0 ? b.left - d : Math.max(b.left - a.collisionPosition.left, b.left)
            },
            top: function (b, a) {
                var d = c(window);
                d = a.collisionPosition.top + a.collisionHeight - d.height() - d.scrollTop();
                b.top = d > 0 ? b.top - d : Math.max(b.top - a.collisionPosition.top, b.top)
            }
        },
        flip: {
            left: function (b, a) {
                if (a.at[0] !== "center") {
                    var d = c(window);
                    d = a.collisionPosition.left + a.collisionWidth - d.width() - d.scrollLeft();
                    var g = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0,
                        e = a.at[0] === "left" ? a.targetWidth : -a.targetWidth,
                        h = -2 * a.offset[0];
                    b.left += a.collisionPosition.left < 0 ? g + e + h : d > 0 ? g + e + h : 0
                }
            },
            top: function (b, a) {
                if (a.at[1] !== "center") {
                    var d = c(window);
                    d = a.collisionPosition.top + a.collisionHeight - d.height() - d.scrollTop();
                    var g = a.my[1] === "top" ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0,
                        e = a.at[1] === "top" ? a.targetHeight : -a.targetHeight,
                        h = -2 * a.offset[1];
                    b.top += a.collisionPosition.top < 0 ? g + e + h : d > 0 ? g + e + h : 0
                }
            }
        }
    };
    if (!c.offset.setOffset) {
        c.offset.setOffset = function (b, a) {
            if (/static/.test(c.curCSS(b, "position"))) b.style.position = "relative";
            var d = c(b),
                g = d.offset(),
                e = parseInt(c.curCSS(b, "top", true), 10) || 0,
                h = parseInt(c.curCSS(b, "left", true), 10) || 0;
            g = {
                top: a.top - g.top + e,
                left: a.left - g.left + h
            };
            "using" in a ? a.using.call(b, g) : d.css(g)
        };
        c.fn.offset = function (b) {
            var a = this[0];
            if (!a || !a.ownerDocument) return null;
            if (b) return this.each(function () {
                c.offset.setOffset(this, b)
            });
            return u.call(this)
        }
    }
})(jQuery);

/*
 * jQuery UI Dialog 1.8.16
 *
 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *  jquery.ui.button.js
 *	jquery.ui.draggable.js
 *	jquery.ui.mouse.js
 *	jquery.ui.position.js
 *	jquery.ui.resizable.js
 */ (function (c, l) {
    var m = {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
    },
        n = {
            maxHeight: true,
            maxWidth: true,
            minHeight: true,
            minWidth: true
        },
        o = c.attrFn || {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true,
            click: true
        };
    c.widget("ui.dialog", {
        options: {
            autoOpen: true,
            buttons: {},
            closeOnEscape: true,
            closeText: "close",
            dialogClass: "",
            draggable: true,
            hide: null,
            height: "auto",
            maxHeight: false,
            maxWidth: false,
            minHeight: 150,
            minWidth: 150,
            modal: false,
            position: {
                my: "center",
                at: "center",
                collision: "fit",
                using: function (a) {
                    var b = c(this).css(a).offset().top;
                    b < 0 && c(this).css("top", a.top - b)
                }
            },
            resizable: true,
            show: null,
            stack: true,
            title: "",
            width: 300,
            zIndex: 1E3
        },
        _create: function () {
            this.originalTitle = this.element.attr("title");
            if (typeof this.originalTitle !== "string") this.originalTitle = "";
            this.options.title = this.options.title || this.originalTitle;
            var a = this,
                b = a.options,
                d = b.title || "&#160;",
                e = c.ui.dialog.getTitleId(a.element),
                g = (a.uiDialog = c("<div></div>")).appendTo(document.body).hide().addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + b.dialogClass).css({
                    zIndex: b.zIndex
                }).attr("tabIndex", -1).css("outline", 0).keydown(function (i) {
                    if (b.closeOnEscape && !i.isDefaultPrevented() && i.keyCode && i.keyCode === c.ui.keyCode.ESCAPE) {
                        a.close(i);
                        i.preventDefault()
                    }
                }).attr({
                    role: "dialog",
                    "aria-labelledby": e
                }).mousedown(function (i) {
                    a.moveToTop(false, i)
                });
            a.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g);
            var f = (a.uiDialogTitlebar = c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),
                h = c('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role", "button").hover(function () {
                    h.addClass("ui-state-hover")
                }, function () {
                    h.removeClass("ui-state-hover")
                }).focus(function () {
                    h.addClass("ui-state-focus")
                }).blur(function () {
                    h.removeClass("ui-state-focus")
                }).click(function (i) {
                    a.close(i);
                    return false
                }).appendTo(f);
            (a.uiDialogTitlebarCloseText = c("<span></span>")).addClass("ui-icon ui-icon-closethick").text(b.closeText).appendTo(h);
            c("<span></span>").addClass("ui-dialog-title").attr("id", e).html(d).prependTo(f);
            if (c.isFunction(b.beforeclose) && !c.isFunction(b.beforeClose)) b.beforeClose = b.beforeclose;
            f.find("*").add(f).disableSelection();
            b.draggable && c.fn.draggable && a._makeDraggable();
            b.resizable && c.fn.resizable && a._makeResizable();
            a._createButtons(b.buttons);
            a._isOpen = false;
            c.fn.bgiframe && g.bgiframe()
        },
        _init: function () {
            this.options.autoOpen && this.open()
        },
        destroy: function () {
            var a = this;
            a.overlay && a.overlay.destroy();
            a.uiDialog.hide();
            a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");
            a.uiDialog.remove();
            a.originalTitle && a.element.attr("title", a.originalTitle);
            return a
        },
        widget: function () {
            return this.uiDialog
        },
        close: function (a) {
            var b = this,
                d, e;
            if (false !== b._trigger("beforeClose", a)) {
                b.overlay && b.overlay.destroy();
                b.uiDialog.unbind("keypress.ui-dialog");
                b._isOpen = false;
                if (b.options.hide) b.uiDialog.hide(b.options.hide, function () {
                    b._trigger("close", a)
                });
                else {
                    b.uiDialog.hide();
                    b._trigger("close", a)
                }
                c.ui.dialog.overlay.resize();
                if (b.options.modal) {
                    d = 0;
                    c(".ui-dialog").each(function () {
                        if (this !== b.uiDialog[0]) {
                            e = c(this).css("z-index");
                            isNaN(e) || (d = Math.max(d, e))
                        }
                    });
                    c.ui.dialog.maxZ = d
                }
                return b
            }
        },
        isOpen: function () {
            return this._isOpen
        },
        moveToTop: function (a, b) {
            var d = this,
                e = d.options;
            if (e.modal && !a || !e.stack && !e.modal) return d._trigger("focus", b);
            if (e.zIndex > c.ui.dialog.maxZ) c.ui.dialog.maxZ = e.zIndex;
            if (d.overlay) {
                c.ui.dialog.maxZ += 1;
                d.overlay.$el.css("z-index", c.ui.dialog.overlay.maxZ = c.ui.dialog.maxZ)
            }
            a = {
                scrollTop: d.element.scrollTop(),
                scrollLeft: d.element.scrollLeft()
            };
            c.ui.dialog.maxZ += 1;
            d.uiDialog.css("z-index", c.ui.dialog.maxZ);
            d.element.attr(a);
            d._trigger("focus", b);
            return d
        },
        open: function () {
            if (!this._isOpen) {
                var a = this,
                    b = a.options,
                    d = a.uiDialog;
                a.overlay = b.modal ? new c.ui.dialog.overlay(a) : null;
                a._size();
                a._position(b.position);
                d.show(b.show);
                a.moveToTop(true);
                b.modal && d.bind("keypress.ui-dialog", function (e) {
                    if (e.keyCode === c.ui.keyCode.TAB) {
                        var g = c(":tabbable", this),
                            f = g.filter(":first");
                        g = g.filter(":last");
                        if (e.target === g[0] && !e.shiftKey) {
                            f.focus(1);
                            return false
                        } else if (e.target === f[0] && e.shiftKey) {
                            g.focus(1);
                            return false
                        }
                    }
                });
                c(a.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus();
                a._isOpen = true;
                a._trigger("open");
                return a
            }
        },
        _createButtons: function (a) {
            var b = this,
                d = false,
                e = c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
                g = c("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);
            b.uiDialog.find(".ui-dialog-buttonpane").remove();
            typeof a === "object" && a !== null && c.each(a, function () {
                return !(d = true)
            });
            if (d) {
                c.each(a, function (f, h) {
                    h = c.isFunction(h) ? {
                        click: h,
                        text: f
                    } : h;
                    var i = c('<button type="button"></button>').click(function () {
                        h.click.apply(b.element[0], arguments)
                    }).appendTo(g);
                    c.each(h, function (j, k) {
                        if (j !== "click") j in o ? i[j](k) : i.attr(j, k)
                    });
                    c.fn.button && i.button()
                });
                e.appendTo(b.uiDialog)
            }
        },
        _makeDraggable: function () {function a(f) {
                return {
                    position: f.position,
                    offset: f.offset
                }
            }
            var b = this,
                d = b.options,
                e = c(document),
                g;
            b.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function (f, h) {
                    g = d.height === "auto" ? "auto" : c(this).height();
                    c(this).height(c(this).height()).addClass("ui-dialog-dragging");
                    b._trigger("dragStart", f, a(h))
                },
                drag: function (f, h) {
                    b._trigger("drag", f, a(h))
                },
                stop: function (f, h) {
                    d.position = [h.position.left - e.scrollLeft(), h.position.top - e.scrollTop()];
                    c(this).removeClass("ui-dialog-dragging").height(g);
                    b._trigger("dragStop", f, a(h));
                    c.ui.dialog.overlay.resize()
                }
            })
        },
        _makeResizable: function (a) {function b(f) {
                return {
                    originalPosition: f.originalPosition,
                    originalSize: f.originalSize,
                    position: f.position,
                    size: f.size
                }
            }
            a = a === l ? this.options.resizable : a;
            var d = this,
                e = d.options,
                g = d.uiDialog.css("position");
            a = typeof a === "string" ? a : "n,e,s,w,se,sw,ne,nw";
            d.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: d.element,
                maxWidth: e.maxWidth,
                maxHeight: e.maxHeight,
                minWidth: e.minWidth,
                minHeight: d._minHeight(),
                handles: a,
                start: function (f, h) {
                    c(this).addClass("ui-dialog-resizing");
                    d._trigger("resizeStart", f, b(h))
                },
                resize: function (f, h) {
                    d._trigger("resize", f, b(h))
                },
                stop: function (f, h) {
                    c(this).removeClass("ui-dialog-resizing");
                    e.height = c(this).height();
                    e.width = c(this).width();
                    d._trigger("resizeStop", f, b(h));
                    c.ui.dialog.overlay.resize()
                }
            }).css("position", g).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")
        },
        _minHeight: function () {
            var a = this.options;
            return a.height === "auto" ? a.minHeight : Math.min(a.minHeight, a.height)
        },
        _position: function (a) {
            var b = [],
                d = [0, 0],
                e;
            if (a) {
                if (typeof a === "string" || typeof a === "object" && "0" in a) {
                    b = a.split ? a.split(" ") : [a[0], a[1]];
                    if (b.length === 1) b[1] = b[0];
                    c.each(["left", "top"], function (g, f) {
                        if (+b[g] === b[g]) {
                            d[g] = b[g];
                            b[g] = f
                        }
                    });
                    a = {
                        my: b.join(" "),
                        at: b.join(" "),
                        offset: d.join(" ")
                    }
                }
                a = c.extend({}, c.ui.dialog.prototype.options.position, a)
            } else a = c.ui.dialog.prototype.options.position;
            (e = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.css({
                top: 0,
                left: 0
            }).position(c.extend({
                of: window
            }, a));
            e || this.uiDialog.hide()
        },
        _setOptions: function (a) {
            var b = this,
                d = {},
                e = false;
            c.each(a, function (g, f) {
                b._setOption(g, f);
                if (g in m) e = true;
                if (g in n) d[g] = f
            });
            e && this._size();
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", d)
        },
        _setOption: function (a, b) {
            var d = this,
                e = d.uiDialog;
            switch (a) {
            case "beforeclose":
                a = "beforeClose";
                break;
            case "buttons":
                d._createButtons(b);
                break;
            case "closeText":
                d.uiDialogTitlebarCloseText.text("" + b);
                break;
            case "dialogClass":
                e.removeClass(d.options.dialogClass).addClass("ui-dialog ui-widget ui-widget-content ui-corner-all " + b);
                break;
            case "disabled":
                b ? e.addClass("ui-dialog-disabled") : e.removeClass("ui-dialog-disabled");
                break;
            case "draggable":
                var g = e.is(":data(draggable)");
                g && !b && e.draggable("destroy");
                !g && b && d._makeDraggable();
                break;
            case "position":
                d._position(b);
                break;
            case "resizable":
                (g = e.is(":data(resizable)")) && !b && e.resizable("destroy");
                g && typeof b === "string" && e.resizable("option", "handles", b);
                !g && b !== false && d._makeResizable(b);
                break;
            case "title":
                c(".ui-dialog-title", d.uiDialogTitlebar).html("" + (b || "&#160;"));
                break
            }
            c.Widget.prototype._setOption.apply(d, arguments)
        },
        _size: function () {
            var a = this.options,
                b, d, e = this.uiDialog.is(":visible");
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                height: 0
            });
            if (a.minWidth > a.width) a.width = a.minWidth;
            b = this.uiDialog.css({
                height: "auto",
                width: a.width
            }).height();
            d = Math.max(0, a.minHeight - b);
            if (a.height === "auto") if (c.support.minHeight) this.element.css({
                minHeight: d,
                height: "auto"
            });
            else {
                this.uiDialog.show();
                a = this.element.css("height", "auto").height();
                e || this.uiDialog.hide();
                this.element.height(Math.max(a, d))
            } else this.element.height(Math.max(a.height - b, 0));
            this.uiDialog.is(":data(resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        }
    });
    c.extend(c.ui.dialog, {
        version: "1.8.16",
        uuid: 0,
        maxZ: 0,
        getTitleId: function (a) {
            a = a.attr("id");
            if (!a) {
                this.uuid += 1;
                a = this.uuid
            }
            return "ui-dialog-title-" + a
        },
        overlay: function (a) {
            this.$el = c.ui.dialog.overlay.create(a)
        }
    });
    c.extend(c.ui.dialog.overlay, {
        instances: [],
        oldInstances: [],
        maxZ: 0,
        events: c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","), function (a) {
            return a + ".dialog-overlay"
        }).join(" "),
        create: function (a) {
            if (this.instances.length === 0) {
                setTimeout(function () {
                    c.ui.dialog.overlay.instances.length && c(document).bind(c.ui.dialog.overlay.events, function (d) {
                        if (c(d.target).zIndex() < c.ui.dialog.overlay.maxZ) return false
                    })
                }, 1);
                c(document).bind("keydown.dialog-overlay", function (d) {
                    if (a.options.closeOnEscape && !d.isDefaultPrevented() && d.keyCode && d.keyCode === c.ui.keyCode.ESCAPE) {
                        a.close(d);
                        d.preventDefault()
                    }
                });
                c(window).bind("resize.dialog-overlay", c.ui.dialog.overlay.resize)
            }
            var b = (this.oldInstances.pop() || c("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({
                width: this.width(),
                height: this.height()
            });
            c.fn.bgiframe && b.bgiframe();
            this.instances.push(b);
            return b
        },
        destroy: function (a) {
            var b = c.inArray(a, this.instances);
            b != -1 && this.oldInstances.push(this.instances.splice(b, 1)[0]);
            this.instances.length === 0 && c([document, window]).unbind(".dialog-overlay");
            a.remove();
            var d = 0;
            c.each(this.instances, function () {
                d = Math.max(d, this.css("z-index"))
            });
            this.maxZ = d
        },
        height: function () {
            var a, b;
            if (c.browser.msie && c.browser.version < 7) {
                a = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                b = Math.max(document.documentElement.offsetHeight, document.body.offsetHeight);
                return a < b ? c(window).height() + "px" : a + "px"
            } else return c(document).height() + "px"
        },
        width: function () {
            var a, b;
            if (c.browser.msie) {
                a = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
                b = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
                return a < b ? c(window).width() + "px" : a + "px"
            } else return c(document).width() + "px"
        },
        resize: function () {
            var a = c([]);
            c.each(c.ui.dialog.overlay.instances, function () {
                a = a.add(this)
            });
            a.css({
                width: 0,
                height: 0
            }).css({
                width: c.ui.dialog.overlay.width(),
                height: c.ui.dialog.overlay.height()
            })
        }
    });
    c.extend(c.ui.dialog.overlay.prototype, {
        destroy: function () {
            c.ui.dialog.overlay.destroy(this.$el)
        }
    })
})(jQuery);

(function (a) {
    a.ui.dialog.prototype.options.closeOnEscape = false;
    a.widget("imbull.imbulldialog", a.ui.dialog, {
        options: {
            closeOnEscape: false
        },
        open: function () {
            var b;
            if (tinyMCEPopup && typeof tinyMCE != "undefined" && (b = tinyMCE.activeEditor) && !b.isHidden()) {
                tinyMCEPopup.init()
            }
            if (this._isOpen || false === this._trigger("beforeOpen")) {
                return
            }
            a.ui.dialog.prototype.open.apply(this, arguments);
            this.element.focus();
            this._trigger("refresh")
        }
    })
})(jQuery);
var imbullLink;
(function (f) {
    var b = {},
        e = {},
        d, a, c;
    imbullLink = {
        timeToTriggerRiver: 150,
        minRiverAJAXDuration: 200,
        riverBottomThreshold: 5,
        keySensitivity: 100,
        lastSearch: "",
        textarea: "",
        init: function () {
            b.dialog = f("#imbull-link");
            b.submit = f("#imbull-link-submit");
            b.url = f("#url-field");
            b.nonce = f("#_ajax_linking_nonce");
            b.title = f("#link-title-field");
            b.openInNewTab = f("#link-target-checkbox");
            b.search = f("#search-field");
            e.search = new a(f("#search-results"));
            e.recent = new a(f("#most-recent-results"));
            e.elements = f(".query-results", b.dialog);
            b.dialog.keydown(imbullLink.keydown);
            b.dialog.keyup(imbullLink.keyup);
            b.submit.click(function (g) {
                g.preventDefault();
                imbullLink.update()
            });
            f("#imbull-link-cancel").click(function (g) {
                g.preventDefault();
                imbullLink.close()
            });
            f("#internal-toggle").click(imbullLink.toggleInternalLinking);
            e.elements.bind("river-select", imbullLink.updateFields);
            b.search.keyup(imbullLink.searchInternalLinks);
            b.dialog.bind("imbulldialogrefresh", imbullLink.refresh);
            b.dialog.bind("imbulldialogbeforeopen", imbullLink.beforeOpen);
            b.dialog.bind("imbulldialogclose", imbullLink.onClose)
        },
        beforeOpen: function () {
            imbullLink.range = null;
            if (!imbullLink.isMCE() && document.selection) {
                imbullLink.textarea.focus();
                imbullLink.range = document.selection.createRange()
            }
        },
        open: function () {
            if (!imbullActiveEditor) {
                return
            }
            this.textarea = f("#" + imbullActiveEditor).get(0);
            if (!b.dialog.data("imbulldialog")) {
                b.dialog.imbulldialog({
                    title: imbullLinkL10n.title,
                    width: 480,
                    height: "auto",
                    modal: true,
                    dialogClass: "imbull-dialog",
                    zIndex: 300000
                })
            }
            b.dialog.imbulldialog("open")
        },
        isMCE: function () {
            return tinyMCEPopup && (d = tinyMCEPopup.editor) && !d.isHidden()
        },
        refresh: function () {
            e.search.refresh();
            e.recent.refresh();
            if (imbullLink.isMCE()) {
                imbullLink.mceRefresh()
            } else {
                imbullLink.setDefaultValues()
            }
            b.url.focus()[0].select();
            if (!e.recent.ul.children().length) {
                e.recent.ajax()
            }
        },
        mceRefresh: function () {
            var g;
            d = tinyMCEPopup.editor;
            tinyMCEPopup.restoreSelection();
            if (g = d.dom.getParent(d.selection.getNode(), "A")) {
                b.url.val(d.dom.getAttrib(g, "href"));
                b.title.val(d.dom.getAttrib(g, "title"));
                if ("_blank" == d.dom.getAttrib(g, "target")) {
                    b.openInNewTab.prop("checked", true)
                }
                b.submit.val(imbullLinkL10n.update)
            } else {
                imbullLink.setDefaultValues()
            }
            tinyMCEPopup.storeSelection()
        },
        close: function () {
            if (imbullLink.isMCE()) {
                tinyMCEPopup.close()
            } else {
                b.dialog.imbulldialog("close")
            }
        },
        onClose: function () {
            if (!imbullLink.isMCE()) {
                imbullLink.textarea.focus();
                if (imbullLink.range) {
                    imbullLink.range.moveToBookmark(imbullLink.range.getBookmark());
                    imbullLink.range.select()
                }
            }
        },
        getAttrs: function () {
            return {
                href: b.url.val(),
                title: b.title.val(),
                target: b.openInNewTab.prop("checked") ? "_blank" : ""
            }
        },
        update: function () {
            if (imbullLink.isMCE()) {
                imbullLink.mceUpdate()
            } else {
                imbullLink.htmlUpdate()
            }
        },
        htmlUpdate: function () {
            var i, j, l, h, k, g = imbullLink.textarea;
            if (!g) {
                return
            }
            i = imbullLink.getAttrs();
            if (!i.href || i.href == "http://") {
                return
            }
            j = '<a href="' + i.href + '"';
            if (i.title) {
                j += ' title="' + i.title + '"'
            }
            if (i.target) {
                j += ' target="' + i.target + '"'
            }
            j += ">";
            if (typeof g.selectionStart !== "undefined") {
                l = g.selectionStart;
                h = g.selectionEnd;
                selection = g.value.substring(l, h);
                j = j + selection + "</a>";
                k = l + j.length;
                if (l == h) {
                    k -= "</a>".length
                }
                g.value = g.value.substring(0, l) + j + g.value.substring(h, g.value.length);
                g.selectionStart = g.selectionEnd = k
            } else {
                if (document.selection && imbullLink.range) {
                    g.focus();
                    imbullLink.range.text = j + imbullLink.range.text + "</a>";
                    imbullLink.range.moveToBookmark(imbullLink.range.getBookmark());
                    imbullLink.range.select();
                    imbullLink.range = null
                }
            }
            imbullLink.close();
            g.focus()
        },
        mceUpdate: function () {
            var h = tinyMCEPopup.editor,
                i = imbullLink.getAttrs(),
                j, g;
            tinyMCEPopup.restoreSelection();
            j = h.dom.getParent(h.selection.getNode(), "A");
            if (!i.href || i.href == "http://") {
                if (j) {
                    tinyMCEPopup.execCommand("mceBeginUndoLevel");
                    g = h.selection.getBookmark();
                    h.dom.remove(j, 1);
                    h.selection.moveToBookmark(g);
                    tinyMCEPopup.execCommand("mceEndUndoLevel");
                    imbullLink.close()
                }
                return
            }
            tinyMCEPopup.execCommand("mceBeginUndoLevel");
            if (j == null) {
                h.getDoc().execCommand("unlink", false, null);
                tinyMCEPopup.execCommand("CreateLink", false, "#mce_temp_url#", {
                    skip_undo: 1
                });
                tinymce.each(h.dom.select("a"), function (k) {
                    if (h.dom.getAttrib(k, "href") == "#mce_temp_url#") {
                        j = k;
                        h.dom.setAttribs(j, i)
                    }
                });
                if (f(j).text() == "#mce_temp_url#") {
                    h.dom.remove(j);
                    j = null
                }
            } else {
                h.dom.setAttribs(j, i)
            }
            if (j && (j.childNodes.length != 1 || j.firstChild.nodeName != "IMG")) {
                h.focus();
                h.selection.select(j);
                h.selection.collapse(0);
                tinyMCEPopup.storeSelection()
            }
            tinyMCEPopup.execCommand("mceEndUndoLevel");
            imbullLink.close()
        },
        updateFields: function (i, h, g) {
            b.url.val(h.children(".item-permalink").val());
            b.title.val(h.hasClass("no-title") ? "" : h.children(".item-title").text());
            if (g && g.type == "click") {
                b.url.focus()
            }
        },
        setDefaultValues: function () {
            b.url.val("http://");
            b.title.val("");
            b.submit.val(imbullLinkL10n.save)
        },
        searchInternalLinks: function () {
            var h = f(this),
                i, g = h.val();
            if (g.length > 2) {
                e.recent.hide();
                e.search.show();
                if (imbullLink.lastSearch == g) {
                    return
                }
                imbullLink.lastSearch = g;
                i = h.siblings("img.waiting").show();
                e.search.change(g);
                e.search.ajax(function () {
                    i.hide()
                })
            } else {
                e.search.hide();
                e.recent.show()
            }
        },
        next: function () {
            e.search.next();
            e.recent.next()
        },
        prev: function () {
            e.search.prev();
            e.recent.prev()
        },
        keydown: function (i) {
            var h, g = f.ui.keyCode;
            switch (i.which) {
            case g.UP:
                h = "prev";
            case g.DOWN:
                h = h || "next";
                clearInterval(imbullLink.keyInterval);
                imbullLink[h]();
                imbullLink.keyInterval = setInterval(imbullLink[h], imbullLink.keySensitivity);
                break;
            default:
                return
            }
            i.preventDefault()
        },
        keyup: function (h) {
            var g = f.ui.keyCode;
            switch (h.which) {
            case g.ESCAPE:
                h.stopImmediatePropagation();
                if (!f(document).triggerHandler("imbull_CloseOnEscape", [{
                    event: h,
                    what: "imbulllink",
                    cb: imbullLink.close
                }])) {
                    imbullLink.close()
                }
                return false;
                break;
            case g.UP:
            case g.DOWN:
                clearInterval(imbullLink.keyInterval);
                break;
            default:
                return
            }
            h.preventDefault()
        },
        delayedCallback: function (i, g) {
            var l, k, j, h;
            if (!g) {
                return i
            }
            setTimeout(function () {
                if (k) {
                    return i.apply(h, j)
                }
                l = true
            }, g);
            return function () {
                if (l) {
                    return i.apply(this, arguments)
                }
                j = arguments;
                h = this;
                k = true
            }
        },
        toggleInternalLinking: function (h) {
            var g = f("#search-panel"),
                i = b.dialog.imbulldialog("widget"),
                k = !g.is(":visible"),
                j = f(window);
            f(this).toggleClass("toggle-arrow-active", k);
            b.dialog.height("auto");
            g.slideToggle(300, function () {
                setUserSetting("imbulllink", k ? "1" : "0");
                b[k ? "search" : "url"].focus();
                var l = j.scrollTop(),
                    o = i.offset().top,
                    m = o + i.outerHeight(),
                    n = m - j.height();
                if (n > l) {
                    i.animate({
                        top: n < o ? o - n : l
                    }, 200)
                }
            });
            h.preventDefault()
        }
    };
    a = function (i, h) {
        var g = this;
        this.element = i;
        this.ul = i.children("ul");
        this.waiting = i.find(".river-waiting");
        this.change(h);
        this.refresh();
        i.scroll(function () {
            g.maybeLoad()
        });
        i.delegate("li", "click", function (j) {
            g.select(f(this), j)
        })
    };
    f.extend(a.prototype, {
        refresh: function () {
            this.deselect();
            this.visible = this.element.is(":visible")
        },
        show: function () {
            if (!this.visible) {
                this.deselect();
                this.element.show();
                this.visible = true
            }
        },
        hide: function () {
            this.element.hide();
            this.visible = false
        },
        select: function (h, k) {
            var j, i, l, g;
            if (h.hasClass("unselectable") || h == this.selected) {
                return
            }
            this.deselect();
            this.selected = h.addClass("selected");
            j = h.outerHeight();
            i = this.element.height();
            l = h.position().top;
            g = this.element.scrollTop();
            if (l < 0) {
                this.element.scrollTop(g + l)
            } else {
                if (l + j > i) {
                    this.element.scrollTop(g + l - i + j)
                }
            }
            this.element.trigger("river-select", [h, k, this])
        },
        deselect: function () {
            if (this.selected) {
                this.selected.removeClass("selected")
            }
            this.selected = false
        },
        prev: function () {
            if (!this.visible) {
                return
            }
            var g;
            if (this.selected) {
                g = this.selected.prev("li");
                if (g.length) {
                    this.select(g)
                }
            }
        },
        next: function () {
            if (!this.visible) {
                return
            }
            var g = this.selected ? this.selected.next("li") : f("li:not(.unselectable):first", this.element);
            if (g.length) {
                this.select(g)
            }
        },
        ajax: function (j) {
            var h = this,
                i = this.query.page == 1 ? 0 : imbullLink.minRiverAJAXDuration,
                g = imbullLink.delayedCallback(function (k, l) {
                    h.process(k, l);
                    if (j) {
                        j(k, l)
                    }
                }, i);
            this.query.ajax(g)
        },
        change: function (g) {
            if (this.query && this._search == g) {
                return
            }
            this._search = g;
            this.query = new c(g);
            this.element.scrollTop(0)
        },
        process: function (h, l) {
            var i = "",
                j = true,
                g = "",
                k = l.page == 1;
            if (!h) {
                if (k) {
                    i += '<li class="unselectable"><span class="item-title"><em>' + imbullLinkL10n.noMatchesFound + "</em></span></li>"
                }
            } else {
                f.each(h, function () {
                    g = j ? "alternate" : "";
                    g += this["title"] ? "" : " no-title";
                    i += g ? '<li class="' + g + '">' : "<li>";
                    i += '<input type="hidden" class="item-permalink" value="' + this["permalink"] + '" />';
                    i += '<span class="item-title">';
                    i += this["title"] ? this["title"] : imbullLinkL10n.noTitle;
                    i += '</span><span class="item-info">' + this["info"] + "</span></li>";
                    j = !j
                })
            }
            this.ul[k ? "html" : "append"](i)
        },
        maybeLoad: function () {
            var h = this,
                i = this.element,
                g = i.scrollTop() + i.height();
            if (!this.query.ready() || g < this.ul.height() - imbullLink.riverBottomThreshold) {
                return
            }
            setTimeout(function () {
                var j = i.scrollTop(),
                    k = j + i.height();
                if (!h.query.ready() || k < h.ul.height() - imbullLink.riverBottomThreshold) {
                    return
                }
                h.waiting.show();
                i.scrollTop(j + h.waiting.outerHeight());
                h.ajax(function () {
                    h.waiting.hide()
                })
            }, imbullLink.timeToTriggerRiver)
        }
    });
    c = function (g) {
        this.page = 1;
        this.allLoaded = false;
        this.querying = false;
        this.search = g
    };
    f.extend(c.prototype, {
        ready: function () {
            return !(this.querying || this.allLoaded)
        },
        ajax: function (i) {
            var g = this,
                h = {
                    action: "imbull-link-ajax",
                    page: this.page,
                    _ajax_linking_nonce: b.nonce.val()
                };
            if (this.search) {
                h.search = this.search
            }
            this.querying = true;
            f.post(ajaxurl, h, function (j) {
                g.page++;
                g.querying = false;
                g.allLoaded = !j;
                i(j, h)
            }, "json")
        }
    });
    f(document).ready(imbullLink.init)
})(jQuery);
var tinyMCEPopup = {
    init: function () {
        var b = this,
            a, c;
        a = b.getWin();
        tinymce = a.tinymce;
        tinyMCE = a.tinyMCE;
        b.editor = tinymce.EditorManager.activeEditor;
        b.params = b.editor.windowManager.params;
        b.features = b.editor.windowManager.features;
        b.dom = tinymce.dom;
        b.listeners = [];
        b.onInit = {
            add: function (e, d) {
                b.listeners.push({
                    func: e,
                    scope: d
                })
            }
        };
        b.isWindow = false;
        b.id = b.features.id;
        b.editor.windowManager.onOpen.dispatch(b.editor.windowManager, window)
    },
    getWin: function () {
        return window
    },
    getWindowArg: function (c, b) {
        var a = this.params[c];
        return tinymce.is(a) ? a : b
    },
    getParam: function (b, a) {
        return this.editor.getParam(b, a)
    },
    getLang: function (b, a) {
        return this.editor.getLang(b, a)
    },
    execCommand: function (d, c, e, b) {
        b = b || {};
        b.skip_focus = 1;
        this.restoreSelection();
        return this.editor.execCommand(d, c, e, b)
    },
    resizeToInnerSize: function () {
        var a = this;
        setTimeout(function () {
            var b = a.dom.getVieimbullort(window);
            a.editor.windowManager.resizeBy(a.getWindowArg("mce_width") - b.w, a.getWindowArg("mce_height") - b.h, a.id || window)
        }, 0)
    },
    executeOnLoad: function (s) {
        this.onInit.add(function () {
            eval(s)
        })
    },
    storeSelection: function () {
        this.editor.windowManager.bookmark = tinyMCEPopup.editor.selection.getBookmark(1)
    },
    restoreSelection: function () {
        var a = tinyMCEPopup;
        if (!a.isWindow && tinymce.isIE) {
            a.editor.selection.moveToBookmark(a.editor.windowManager.bookmark)
        }
    },
    requireLangPack: function () {
        var b = this,
            a = b.getWindowArg("plugin_url") || b.getWindowArg("theme_url");
        if (a && b.editor.settings.language && b.features.translate_i18n !== false) {
            a += "/langs/" + b.editor.settings.language + "_dlg.js";
            if (!tinymce.ScriptLoader.isDone(a)) {
                document.write('<script type="text/javascript" src="' + tinymce._addVer(a) + '"><\/script>');
                tinymce.ScriptLoader.markDone(a)
            }
        }
    },
    pickColor: function (b, a) {
        this.execCommand("mceColorPicker", true, {
            color: document.getElementById(a).value,
            func: function (e) {
                document.getElementById(a).value = e;
                try {
                    document.getElementById(a).onchange()
                } catch (d) {}
            }
        })
    },
    openBrowser: function (a, c, b) {
        tinyMCEPopup.restoreSelection();
        this.editor.execCallback("file_browser_callback", a, document.getElementById(a).value, c, window)
    },
    confirm: function (b, a, c) {
        this.editor.windowManager.confirm(b, a, c, window)
    },
    alert: function (b, a, c) {
        this.editor.windowManager.alert(b, a, c, window)
    },
    close: function () {
        var a = this;

        function b() {
            a.editor.windowManager.close(window);
            a.editor = null
        }
        if (tinymce.isOpera) {
            a.getWin().setTimeout(b, 0)
        } else {
            b()
        }
    },
    _restoreSelection: function () {
        var a = window.event.srcElement;
        if (a.nodeName == "INPUT" && (a.type == "submit" || a.type == "button")) {
            tinyMCEPopup.restoreSelection()
        }
    },
    _onDOMLoaded: function () {
        var b = tinyMCEPopup,
            d = document.title,
            e, c, a;
        if (b.domLoaded) {
            return
        }
        b.domLoaded = 1;
        tinyMCEPopup.init();
        if (b.features.translate_i18n !== false) {
            c = document.body.innerHTML;
            if (tinymce.isIE) {
                c = c.replace(/ (value|title|alt)=([^"][^\s>]+)/gi, ' $1="$2"')
            }
            document.dir = b.editor.getParam("directionality", "");
            if ((a = b.editor.translate(c)) && a != c) {
                document.body.innerHTML = a
            }
            if ((a = b.editor.translate(d)) && a != d) {
                document.title = d = a
            }
        }
        document.body.style.display = "";
        if (tinymce.isIE) {
            document.attachEvent("onmouseup", tinyMCEPopup._restoreSelection);
            b.dom.add(b.dom.select("head")[0], "base", {
                target: "_self"
            })
        }
        b.restoreSelection();
        if (!b.isWindow) {
            b.editor.windowManager.setTitle(window, d)
        } else {
            window.focus()
        }
        if (!tinymce.isIE && !b.isWindow) {
            tinymce.dom.Event._add(document, "focus", function () {
                b.editor.windowManager.focus(b.id)
            })
        }
        tinymce.each(b.dom.select("select"), function (f) {
            f.onkeydown = tinyMCEPopup._accessHandler
        });
        tinymce.each(b.listeners, function (f) {
            f.func.call(f.scope, b.editor)
        });
        if (b.getWindowArg("mce_auto_focus", true)) {
            window.focus();
            tinymce.each(document.forms, function (g) {
                tinymce.each(g.elements, function (f) {
                    if (b.dom.hasClass(f, "mceFocus") && !f.disabled) {
                        f.focus();
                        return false
                    }
                })
            })
        }
        document.onkeyup = tinyMCEPopup._closeWinKeyHandler
    },
    _accessHandler: function (a) {
        a = a || window.event;
        if (a.keyCode == 13 || a.keyCode == 32) {
            a = a.target || a.srcElement;
            if (a.onchange) {
                a.onchange()
            }
            return tinymce.dom.Event.cancel(a)
        }
    },
    _closeWinKeyHandler: function (a) {
        a = a || window.event;
        if (a.keyCode == 27) {
            tinyMCEPopup.close()
        }
    },
    _wait: function () {
        if (document.attachEvent) {
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    document.detachEvent("onreadystatechange", arguments.callee);
                    tinyMCEPopup._onDOMLoaded()
                }
            });
            if (document.documentElement.doScroll && window == window.top) {
                (function () {
                    if (tinyMCEPopup.domLoaded) {
                        return
                    }
                    try {
                        document.documentElement.doScroll("left")
                    } catch (a) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    tinyMCEPopup._onDOMLoaded()
                })()
            }
            document.attachEvent("onload", tinyMCEPopup._onDOMLoaded)
        } else {
            if (document.addEventListener) {
                window.addEventListener("DOMContentLoaded", tinyMCEPopup._onDOMLoaded, false);
                window.addEventListener("load", tinyMCEPopup._onDOMLoaded, false)
            }
        }
    }
};
var PubSub, fullscreen, imbulltitlehint;
PubSub = function () {
    this.topics = {}
};
PubSub.prototype.subscribe = function (a, b) {
    if (!this.topics[a]) {
        this.topics[a] = []
    }
    this.topics[a].push(b);
    return b
};
PubSub.prototype.unsubscribe = function (b, e) {
    var c, a, d = this.topics[b];
    if (!d) {
        return e || []
    }
    if (e) {
        for (c = 0, a = d.length; c < a; c++) {
            if (e == d[c]) {
                d.splice(c, 1)
            }
        }
        return e
    } else {
        this.topics[b] = [];
        return d
    }
};
PubSub.prototype.publish = function (c, b) {
    var d, a, e, f = this.topics[c];
    if (!f) {
        return
    }
    b = b || [];
    for (d = 0, a = f.length; d < a; d++) {
        e = (f[d].apply(null, b) === false || e)
    }
    return !e
};
(function (c) {
    var b, e, d, a;
    fullscreen = b = {};
    e = b.pubsub = new PubSub();
    timer = 0;
    block = false;
    a = b.settings = {
        visible: false,
        mode: "tinymce",
        editor_id: "content",
        title_id: "",
        timer: 0,
        toolbar_shown: false
    };
    d = b.bounder = function (l, h, g, j) {
        var k, i;
        g = g || 1250;
        if (j) {
            k = j.pageY || j.clientY || j.offsetY;
            i = c(document).scrollTop();
            if (!j.isDefaultPrevented) {
                k = 135 + k
            }
            if (k - i > 120) {
                return
            }
        }
        if (block) {
            return
        }
        block = true;
        setTimeout(function () {
            block = false
        }, 400);
        if (a.timer) {
            clearTimeout(a.timer)
        } else {
            e.publish(l)
        }function f() {
            e.publish(h);
            a.timer = 0
        }
        a.timer = setTimeout(f, g)
    };
    b.on = function () {
        if (a.visible) {
            return
        }
        if (typeof (imbull_fullscreen_settings) == "object") {
            c.extend(a, imbull_fullscreen_settings)
        }
        a.editor_id = imbullActiveEditor || "content";
        if (!a.title_id) {
            if (c("input#title").length && a.editor_id == "content") {
                a.title_id = "title"
            } else {
                if (c("input#" + a.editor_id + "-title").length) {
                    a.title_id = a.editor_id + "-title"
                } else {
                    c("#imbull-fullscreen-title, #imbull-fullscreen-title-prompt-text").hide()
                }
            }
        }
        a.mode = c("#" + a.editor_id).is(":hidden") ? "tinymce" : "html";
        a.qt_canvas = c("#" + a.editor_id).get(0);
        if (!a.element) {
            b.ui.init()
        }
        a.is_mce_on = a.has_tinymce && typeof (tinyMCE.get(a.editor_id)) != "undefined";
        b.ui.fade("show", "showing", "shown")
    };
    b.off = function () {
        if (!a.visible) {
            return
        }
        b.ui.fade("hide", "hiding", "hidden")
    };
    b.switchmode = function (g) {
        var f = a.mode;
        if (!g || !a.visible || !a.has_tinymce) {
            return f
        }
        if (f == g) {
            return f
        }
        e.publish("switchMode", [f, g]);
        a.mode = g;
        e.publish("switchedMode", [f, g]);
        return g
    };
    b.save = function () {
        var h = c("#hiddenaction"),
            f = h.val(),
            i = c("#imbull-fullscreen-save img"),
            g = c("#imbull-fullscreen-save span");
        i.show();
        b.savecontent();
        h.val("imbull-fullscreen-save-post");
        c.post(ajaxurl, c("form#post").serialize(), function (j) {
            i.hide();
            g.show();
            setTimeout(function () {
                g.fadeOut(1000)
            }, 3000);
            if (j.last_edited) {
                c("#imbull-fullscreen-save input").attr("title", j.last_edited)
            }
        }, "json");
        h.val(f)
    };
    b.savecontent = function () {
        var f, g;
        if (a.title_id) {
            c("#" + a.title_id).val(c("#imbull-fullscreen-title").val())
        }
        if (a.mode === "tinymce" && (f = tinyMCE.get("imbull_mce_fullscreen"))) {
            g = f.save()
        } else {
            g = c("#imbull_mce_fullscreen").val()
        }
        c("#" + a.editor_id).val(g);
        c(document).triggerHandler("imbullcountwords", [g])
    };
    set_title_hint = function (f) {
        if (!f.val().length) {
            f.siblings("label").css("visibility", "")
        } else {
            f.siblings("label").css("visibility", "hidden")
        }
    };
    b.dfw_width = function (h) {
        var g = c("#imbull-fullscreen-wrap"),
            f = g.width();
        if (!h) {
            g.width(c("#imbull-fullscreen-central-toolbar").width());
            deleteUserSetting("dfw_width");
            return
        }
        f = h + f;
        if (f < 200 || f > 1200) {
            return
        }
        g.width(f);
        setUserSetting("dfw_width", f)
    };
    e.subscribe("showToolbar", function () {
        a.toolbars.removeClass("fade-1000").addClass("fade-300");
        b.fade.In(a.toolbars, 300, function () {
            e.publish("toolbarShown")
        }, true);
        c("#imbull-fullscreen-body").addClass("imbull-fullscreen-focus");
        a.toolbar_shown = true
    });
    e.subscribe("hideToolbar", function () {
        a.toolbars.removeClass("fade-300").addClass("fade-1000");
        b.fade.Out(a.toolbars, 1000, function () {
            e.publish("toolbarHidden")
        }, true);
        c("#imbull-fullscreen-body").removeClass("imbull-fullscreen-focus")
    });
    e.subscribe("toolbarShown", function () {
        a.toolbars.removeClass("fade-300")
    });
    e.subscribe("toolbarHidden", function () {
        a.toolbars.removeClass("fade-1000");
        a.toolbar_shown = false
    });
    e.subscribe("show", function () {
        var f;
        if (a.title_id) {
            f = c("#imbull-fullscreen-title").val(c("#" + a.title_id).val());
            set_title_hint(f)
        }
        c("#imbull-fullscreen-save input").attr("title", c("#last-edit").text());
        a.textarea_obj.value = a.qt_canvas.value;
        if (a.has_tinymce && a.mode === "tinymce") {
            tinyMCE.execCommand("imbullFullScreenInit")
        }
        a.orig_y = c(window).scrollTop()
    });
    e.subscribe("showing", function () {
        c(document.body).addClass("fullscreen-active");
        b.refresh_buttons();
        c(document).bind("mousemove.fullscreen", function (f) {
            d("showToolbar", "hideToolbar", 2000, f)
        });
        d("showToolbar", "hideToolbar", 2000);
        b.bind_resize();
        setTimeout(b.resize_textarea, 200);
        scrollTo(0, 0);
        c("#imbulladminbar").hide()
    });
    e.subscribe("shown", function () {
        var f;
        a.visible = true;
        if (a.has_tinymce && !a.is_mce_on) {
            f = function (g, h) {
                var k = h.getElement(),
                    i = k.value,
                    j = tinyMCEPreInit.mceInit[a.editor_id];
                if (j && j.imbullautop && typeof (switchEditors) != "undefined") {
                    k.value = switchEditors.imbullautop(k.value)
                }
                h.onInit.add(function (l) {
                    l.hide();
                    l.getElement().value = i;
                    tinymce.onAddEditor.remove(f)
                })
            };
            tinymce.onAddEditor.add(f);
            tinyMCE.init(tinyMCEPreInit.mceInit[a.editor_id]);
            a.is_mce_on = true
        }
        imbullActiveEditor = "imbull_mce_fullscreen"
    });
    e.subscribe("hide", function () {
        var f = c("#" + a.editor_id).is(":hidden");
        if (a.has_tinymce && a.mode === "tinymce" && !f) {
            switchEditors.go(a.editor_id, "tmce")
        } else {
            if (a.mode === "html" && f) {
                switchEditors.go(a.editor_id, "html")
            }
        }
        b.savecontent();
        c(document).unbind(".fullscreen");
        c(a.textarea_obj).unbind(".grow");
        if (a.has_tinymce && a.mode === "tinymce") {
            tinyMCE.execCommand("imbullFullScreenSave")
        }
        if (a.title_id) {
            set_title_hint(c("#" + a.title_id))
        }
        a.qt_canvas.value = a.textarea_obj.value
    });
    e.subscribe("hiding", function () {
        c(document.body).removeClass("fullscreen-active");
        scrollTo(0, a.orig_y);
        c("#imbulladminbar").show()
    });
    e.subscribe("hidden", function () {
        a.visible = false;
        c("#imbull_mce_fullscreen, #imbull-fullscreen-title").removeAttr("style");
        if (a.has_tinymce && a.is_mce_on) {
            tinyMCE.execCommand("imbullFullScreenClose")
        }
        a.textarea_obj.value = "";
        b.oldheight = 0;
        imbullActiveEditor = a.editor_id
    });
    e.subscribe("switchMode", function (h, g) {
        var f;
        if (!a.has_tinymce || !a.is_mce_on) {
            return
        }
        f = tinyMCE.get("imbull_mce_fullscreen");
        if (h === "html" && g === "tinymce") {
            if (tinyMCE.get(a.editor_id).getParam("imbullautop") && typeof (switchEditors) != "undefined") {
                a.textarea_obj.value = switchEditors.imbullautop(a.textarea_obj.value)
            }
            if ("undefined" == typeof (f)) {
                tinyMCE.execCommand("imbullFullScreenInit")
            } else {
                f.show()
            }
        } else {
            if (h === "tinymce" && g === "html") {
                if (f) {
                    f.hide()
                }
            }
        }
    });
    e.subscribe("switchedMode", function (g, f) {
        b.refresh_buttons(true);
        if (f === "html") {
            setTimeout(b.resize_textarea, 200)
        }
    });
    b.b = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("Bold")
        }
    };
    b.i = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("Italic")
        }
    };
    b.ul = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("InsertUnorderedList")
        }
    };
    b.ol = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("InsertOrderedList")
        }
    };
    b.link = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("imbull_Link")
        } else {
            imbullLink.open()
        }
    };
    b.unlink = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("unlink")
        }
    };
    b.atd = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("mceWritingImprovementTool")
        }
    };
    b.help = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("imbull_Help")
        }
    };
    b.blockquote = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("mceBlockQuote")
        }
    };
    b.medialib = function () {
        if (a.has_tinymce && "tinymce" === a.mode) {
            tinyMCE.execCommand("imbull_Medialib")
        } else {
            var f = c("#imbull-" + a.editor_id + "-media-buttons a.thickbox").attr("href") || "";
            if (f) {
                tb_show("", f)
            }
        }
    };
    b.refresh_buttons = function (f) {
        f = f || false;
        if (a.mode === "html") {
            c("#imbull-fullscreen-mode-bar").removeClass("imbull-tmce-mode").addClass("imbull-html-mode");
            if (f) {
                c("#imbull-fullscreen-button-bar").fadeOut(150, function () {
                    c(this).addClass("imbull-html-mode").fadeIn(150)
                })
            } else {
                c("#imbull-fullscreen-button-bar").addClass("imbull-html-mode")
            }
        } else {
            if (a.mode === "tinymce") {
                c("#imbull-fullscreen-mode-bar").removeClass("imbull-html-mode").addClass("imbull-tmce-mode");
                if (f) {
                    c("#imbull-fullscreen-button-bar").fadeOut(150, function () {
                        c(this).removeClass("imbull-html-mode").fadeIn(150)
                    })
                } else {
                    c("#imbull-fullscreen-button-bar").removeClass("imbull-html-mode")
                }
            }
        }
    };
    b.ui = {
        init: function () {
            var f = c("#fullscreen-topbar"),
                h = c("#imbull_mce_fullscreen"),
                g = 0;
            a.toolbars = f.add(c("#imbull-fullscreen-status"));
            a.element = c("#fullscreen-fader");
            a.textarea_obj = h[0];
            a.has_tinymce = typeof (tinymce) != "undefined";
            if (!a.has_tinymce) {
                c("#imbull-fullscreen-mode-bar").hide()
            }
            if (imbulltitlehint && c("#imbull-fullscreen-title").length) {
                imbulltitlehint("imbull-fullscreen-title")
            }
            c(document).keyup(function (k) {
                var l = k.keyCode || k.charCode,
                    i, j;
                if (!fullscreen.settings.visible) {
                    return true
                }
                if (navigator.platform && navigator.platform.indexOf("Mac") != -1) {
                    i = k.ctrlKey
                } else {
                    i = k.altKey
                }
                if (27 == l) {
                    j = {
                        event: k,
                        what: "dfw",
                        cb: fullscreen.off,
                        condition: function () {
                            if (c("#TB_window").is(":visible") || c(".imbull-dialog").is(":visible")) {
                                return false
                            }
                            return true
                        }
                    };
                    if (!jQuery(document).triggerHandler("imbull_CloseOnEscape", [j])) {
                        fullscreen.off()
                    }
                }
                if (i && (61 == l || 107 == l || 187 == l)) {
                    b.dfw_width(25)
                }
                if (i && (45 == l || 109 == l || 189 == l)) {
                    b.dfw_width(-25)
                }
                if (i && 48 == l) {
                    b.dfw_width(0)
                }
                return false
            });
            if (typeof (imbullWordCount) != "undefined") {
                h.keyup(function (j) {
                    var i = j.keyCode || j.charCode;
                    if (i == g) {
                        return true
                    }
                    if (13 == i || 8 == g || 46 == g) {
                        c(document).triggerHandler("imbullcountwords", [h.val()])
                    }
                    g = i;
                    return true
                })
            }
            f.mouseenter(function (i) {
                a.toolbars.addClass("fullscreen-make-sticky");
                c(document).unbind(".fullscreen");
                clearTimeout(a.timer);
                a.timer = 0
            }).mouseleave(function (i) {
                a.toolbars.removeClass("fullscreen-make-sticky");
                if (a.visible) {
                    c(document).bind("mousemove.fullscreen", function (j) {
                        d("showToolbar", "hideToolbar", 2000, j)
                    })
                }
            })
        },
        fade: function (g, f, h) {
            if (!a.element) {
                b.ui.init()
            }
            if (g && !e.publish(g)) {
                return
            }
            b.fade.In(a.element, 600, function () {
                if (f) {
                    e.publish(f)
                }
                b.fade.Out(a.element, 600, function () {
                    if (h) {
                        e.publish(h)
                    }
                })
            })
        }
    };
    b.fade = {
        transitionend: "transitionend webkitTransitionEnd oTransitionEnd",
        sensitivity: 100,
        In: function (g, h, i, f) {
            i = i || c.noop;
            h = h || 400;
            f = f || false;
            if (b.fade.transitions) {
                if (g.is(":visible")) {
                    g.addClass("fade-trigger");
                    return g
                }
                g.show();
                g.first().one(this.transitionend, function () {
                    i()
                });
                setTimeout(function () {
                    g.addClass("fade-trigger")
                }, this.sensitivity)
            } else {
                if (f) {
                    g.stop()
                }
                g.css("opacity", 1);
                g.first().fadeIn(h, i);
                if (g.length > 1) {
                    g.not(":first").fadeIn(h)
                }
            }
            return g
        },
        Out: function (g, h, i, f) {
            i = i || c.noop;
            h = h || 400;
            f = f || false;
            if (!g.is(":visible")) {
                return g
            }
            if (b.fade.transitions) {
                g.first().one(b.fade.transitionend, function () {
                    if (g.hasClass("fade-trigger")) {
                        return
                    }
                    g.hide();
                    i()
                });
                setTimeout(function () {
                    g.removeClass("fade-trigger")
                }, this.sensitivity)
            } else {
                if (f) {
                    g.stop()
                }
                g.first().fadeOut(h, i);
                if (g.length > 1) {
                    g.not(":first").fadeOut(h)
                }
            }
            return g
        },
        transitions: (function () {
            var f = document.documentElement.style;
            return (typeof (f.WebkitTransition) == "string" || typeof (f.MozTransition) == "string" || typeof (f.OTransition) == "string" || typeof (f.transition) == "string")
        })()
    };
    b.bind_resize = function () {
        c(a.textarea_obj).bind("keypress.grow click.grow paste.grow", function () {
            setTimeout(b.resize_textarea, 200)
        })
    };
    b.oldheight = 0;
    b.resize_textarea = function () {
        var f = a.textarea_obj,
            g;
        g = f.scrollHeight > 300 ? f.scrollHeight : 300;
        if (g != b.oldheight) {
            f.style.height = g + "px";
            b.oldheight = g
        }
    }
})(jQuery);