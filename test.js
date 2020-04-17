(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
    121 : function(e, t, r) {
        "use strict";
        r.d(t, "d",
        function() {
            return i
        }),
        r.d(t, "a",
        function() {
            return o
        }),
        r.d(t, "e",
        function() {
            return s
        }),
        r.d(t, "b",
        function() {
            return c
        }),
        r.d(t, "c",
        function() {
            return u
        });
        var n = r(261),
        i = Object({
            NODE_ENV: "production",
            PUBLIC_URL: "",
            REACT_APP_BUILD_DATE: "2019/07/23-16:26"
        }).REACT_APP_TEST_APPID || "d8lk7l4ed",
        a = Object({
            NODE_ENV: "production",
            PUBLIC_URL: "",
            REACT_APP_BUILD_DATE: "2019/07/23-16:26"
        }).REACT_APP_TEST_HOST || "https://api-demo.qnsdk.com",
        o = {
            LIST_ROOM: "/rooms/app/".concat(i),
            LIST_USERS: function(e, t) {
                return "".concat(a).concat("/v1/rtc", "/users/app/").concat(e || i, "/room/").concat(t)
            },
            GET_APP_CONFIG: function(e) {
                return "".concat(a).concat("/v1/rtc", "/app/").concat(e || i)
            },
            JOIN_ROOM_TOKEN: function(e, t, r) {
                return "".concat(a).concat("/v1/rtc", "/token/app/").concat(r || i, "/room/").concat(e, "/user/").concat(t)
            },
            CREATE_ROOM_TOKEN: function(e, t, r) {
                return "".concat(a).concat("/v1/rtc", "/token/admin/app/").concat(r || i, "/room/").concat(e, "/user/").concat(t)
            }
        },
        s = function(e, t, r) {
            var i = "admin" === r ? o.CREATE_ROOM_TOKEN: o.JOIN_ROOM_TOKEN,
            a = "".concat(i(t, r, e), "?bundleId=demo-rtc.qnsdk.com");
            return Object(n.a)(a, "GET")
        },
        c = function(e) {
            return "https://pili-hdl.qnsdk.com/sdk-live/".concat(e, ".flv")
        },
        u = function(e) {
            return "https://pili-hls.qnsdk.com/sdk-live/".concat(e, ".m3u8")
        }
    },
    174 : function(e, t, r) {
        e.exports = r.p + "static/media/niu.d5156685.svg"
    },
    259 : function(e, t, r) {
        "use strict";
        var n = r(162),
        i = r(163),
        a = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
        o = !!window.chrome,
        s = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i),
        c = n.detect() || {};

        function u() {
            try {
                return !! RTCPeerConnection && ( !! WebSocket && !!navigator.mediaDevices.getUserMedia)
            } catch(e) {
                return ! 1
            }
        }

        function d() {
            var e = navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia,
            t = navigator && navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().displaySurface;
            return a ? !!e && !!t: !!e
        }
        var p = function() {
            if (!c) return {
                support: u(),
                supportRestartICE: !0,
                getDisplayMedia: d(),
                disconnectAudioNode: !0
            };
            switch (c.name) {
            case "chrome":
                return {
                    support:
                    i.gte(c.version, "52.0.0"),
                    mediaStreamDest: i.gte(c.version, "55.0.0"),
                    replaceTrack: i.gte(c.version, "65.0.0"),
                    screenSharing: i.gte(c.version, "55.0.0"),
                    connectionState: !1,
                    stats: i.gte(c.version, "67.0.0"),
                    ondevicechange: i.gte(c.version, "57.0.0"),
                    minMaxWithIdeal: i.gte(c.version, "56.0.0"),
                    unifiedPlan: !1,
                    supportTransceivers: !0,
                    supportRestartICE: !0,
                    getReceivers: i.gte(c.version, "55.0.0"),
                    needH264FmtpLine: i.lte(c.version, "51.0.0"),
                    audioContextOptions: !0,
                    getDisplayMedia: d(),
                    disconnectAudioNode: !0
                };
            case "ios":
            case "safari":
                return {
                    support:
                    i.gte(c.version, "11.0.0"),
                    replaceTrack: i.gte(c.version, "11.0.0"),
                    stats: !1,
                    ondevicechange: !1,
                    connectionState: !0,
                    mediaStreamDest: i.gte(c.version, "12.0.0"),
                    screenSharing: !1,
                    unifiedPlan: i.gte(c.version, "12.1.0"),
                    supportTransceivers: !0,
                    minMaxWithIdeal: !1,
                    supportRestartICE: !0,
                    getReceivers: !0,
                    audioContextOptions: !0,
                    getDisplayMedia: d(),
                    disconnectAudioNode: !1
                };
            case "firefox":
                return {
                    support:
                    u() && i.gte(c.version, "52.0.0"),
                    replaceTrack: !0,
                    stats: !0,
                    ondevicechange: i.gte(c.version, "52.0.0"),
                    connectionState: !0,
                    mediaStreamDest: !0,
                    screenSharing: !0,
                    minMaxWithIdeal: !0,
                    unifiedPlan: !0,
                    supportTransceivers: i.gte(c.version, "59.0.0"),
                    supportRestartICE: !1,
                    getReceivers: !0,
                    audioContextOptions: i.gte(c.version, "55.0.0"),
                    getDisplayMedia: d(),
                    disconnectAudioNode: !0
                };
            default:
                return {
                    support:
                    u(),
                    supportRestartICE: !0,
                    getDisplayMedia: d(),
                    disconnectAudioNode: !0
                }
            }
        } ();

        t.browser = c,
        t.browserReport = p,
        t.isFirefox = a,
        t.isIOS = s,
        t.isChrome = o
    },
    261 : function(e, t, r) {
        "use strict";
        t.a = function(e, t, r) {
            return fetch(e, {
                headers: {
                    "Content-Type": "application/json"
                },
                method: t || "GET",
                body: r ? JSON.stringify(r) : null
            }).then(function(e) {
                if (!e.ok) return Promise.reject(new Error(e.statusText));
                var t = e.headers.get("content-type");
                return t ? t.includes("text/plain") ? e.text() : t.includes("application/json") ? e.json() : e.text() : void 0
            })
        }
    },
    288 : function(e, t, r) {
        e.exports = {
            input: "style_input__2nXE5"
        }
    },
    290 : function(e, t, r) {
        e.exports = r.p + "static/media/qiniu.622fb7e6.png"
    },
    292 : function(e, t, r) {
        e.exports = {
            input: "style_input__2muv3"
        }
    },
    36 : function(e, t, r) {
        "use strict";
        r.d(t, "c",
        function() {
            return c
        }),
        r.d(t, "h",
        function() {
            return u
        }),
        r.d(t, "g",
        function() {
            return d
        }),
        r.d(t, "b",
        function() {
            return p
        }),
        r.d(t, "a",
        function() {
            return l
        }),
        r.d(t, "f",
        function() {
            return f
        }),
        r.d(t, "e",
        function() {
            return h
        }),
        r.d(t, "d",
        function() {
            return m
        });
        var n = r(13),
        i = r.n(n),
        a = r(26),
        o = r(289),
        s = r.n(o);

        function c() {
            var e = new Uint8Array(1);
            return window.crypto.getRandomValues(e),
            e[0]
        }
        var u = function(e) {
            return /^[a-zA-Z0-9_-]{3,50}$/.test(e)
        },
        d = function(e) {
            return /^[a-zA-Z0-9_-]{3,64}$/.test(e)
        };

        function p(e) {
            switch (e.tag) {
            case "screen":
                return "\u5c4f\u5e55\u5171\u4eab";
            case "camera":
                return "\u6444\u50cf\u5934"
            }
            return "audio" === e.kind ? "\u97f3\u9891": "\u89c6\u9891"
        }

        function l(e) {
            var t = s()(e);
            return ["#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#009688", "#4caf50", "#ff9800", "#795548"][Math.min(Math.floor(8 * t()), 7)]
        }

        function f(e) {
            return new Promise(function(t) {
                setTimeout(function() {
                    t()
                },
                e)
            })
        }

        function h(e, t) {
            return new Promise(function() {
                var r = Object(a.a)(i.a.mark(function r(n, a) {
                    var o, s, c;
                    return i.a.wrap(function(r) {
                        for (;;) switch (r.prev = r.next) {
                        case 0:
                            o = !0,
                            s = function(e) {
                                o = !1,
                                a(e)
                            },
                            setTimeout(s, t, new Error("timeout!"));
                        case 3:
                            if (!o) {
                                r.next = 17;
                                break
                            }
                            return r.prev = 4,
                            r.next = 7,
                            e(s);
                        case 7:
                            return c = r.sent,
                            n(c),
                            r.abrupt("return");
                        case 12:
                            r.prev = 12,
                            r.t0 = r.
                            catch(4),
                            console.log("retrying", r.t0, o);
                        case 15:
                            r.next = 3;
                            break;
                        case 17:
                        case "end":
                            return r.stop()
                        }
                    },
                    r, this, [[4, 12]])
                }));
                return function(e, t) {
                    return r.apply(this, arguments)
                }
            } ())
        }

        function m() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
            t = new Uint8Array((e || 40) / 2);
            return window.crypto.getRandomValues(t),
            Array.from(t, v).join("")
        }

        function v(e) {
            return ("0" + e.toString(16)).substr( - 2)
        }
    },
    5569 : function(e, t, r) {
        e.exports = r(5926)
    },
    5632 : function(e, t, r) {},
    5637 : function(e, t, r) {},
    5646 : function(e, t) {},
    5802 : function(e, t, r) {
        "use strict";
        r(162);
        var n = r(163),
        i = r(259);
        "chrome" === i.browser.name &&
        function() {
            var e = function(e) {
                if ("object" !== typeof e || e.mandatory || e.optional) return e;
                var t = {};
                return Object.keys(e).forEach(function(r) {
                    if ("require" !== r && "advanced" !== r && "mediaSource" !== r) {
                        var n = "object" === typeof e[r] ? e[r] : {
                            ideal: e[r]
                        };
                        void 0 !== n.exact && "number" === typeof n.exact && (n.min = n.max = n.exact);
                        var i = function(e, t) {
                            return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId": t
                        };
                        if (void 0 !== n.ideal) {
                            t.optional = t.optional || [];
                            var a = {};
                            "number" === typeof n.ideal ? (a[i("min", r)] = n.ideal, t.optional.push(a), (a = {})[i("max", r)] = n.ideal, t.optional.push(a)) : (a[i("", r)] = n.ideal, t.optional.push(a))
                        }
                        void 0 !== n.exact && "number" !== typeof n.exact ? (t.mandatory = t.mandatory || {},
                        t.mandatory[i("", r)] = n.exact) : ["min", "max"].forEach(function(e) {
                            void 0 !== n[e] && (t.mandatory = t.mandatory || {},
                            t.mandatory[i(e, r)] = n[e])
                        })
                    }
                }),
                e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                t
            },
            t = function(t, r) {
                if (n.gt(i.browser.version, "61.0.0")) return r(t);
                if ((t = JSON.parse(JSON.stringify(t))) && "object" === typeof t.audio) {
                    var a = function(e, t, r) {
                        t in e && !(r in e) && (e[r] = e[t], delete e[t])
                    };
                    a((t = JSON.parse(JSON.stringify(t))).audio, "autoGainControl", "googAutoGainControl"),
                    a(t.audio, "noiseSuppression", "googNoiseSuppression"),
                    t.audio = e(t.audio)
                }
                if (t && "object" === typeof t.video) {
                    var o = t.video.facingMode;
                    o = o && ("object" === typeof o ? o: {
                        ideal: o
                    });
                    var s = n.lt(i.browser.version, "66.0.0");
                    if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) && (!navigator.mediaDevices.getSupportedConstraints || !navigator.mediaDevices.getSupportedConstraints().facingMode || s)) {
                        delete t.video.facingMode;
                        var c = void 0;
                        if ("environment" === o.exact || "environment" === o.ideal ? c = ["back", "rear"] : "user" !== o.exact && "user" !== o.ideal || (c = ["front"]), c) return navigator.mediaDevices.enumerateDevices().then(function(n) {
                            var i = (n = n.filter(function(e) {
                                return "videoinput" === e.kind
                            })).find(function(e) {
                                return c.some(function(t) {
                                    return e.label.toLowerCase().includes(t)
                                })
                            });
                            return ! i && n.length && c.includes("back") && (i = n[n.length - 1]),
                            i && (t.video.deviceId = o.exact ? {
                                exact: i.deviceId
                            }: {
                                ideal: i.deviceId
                            }),
                            t.video = e(t.video),
                            r(t)
                        })
                    }
                    t.video = e(t.video)
                }
                return r(t)
            };
            navigator.getUserMedia = function(e, r, n) {
                t(e,
                function(e) {
                    navigator.webkitGetUserMedia(e, r,
                    function(e) {
                        n && n(e)
                    })
                })
            };
            var r = function(e) {
                return new Promise(function(t, r) {
                    navigator.getUserMedia(e, t, r)
                })
            };
            if (navigator.mediaDevices || (navigator.mediaDevices = {
                getUserMedia: r,
                enumerateDevices: function() {
                    return new Promise(function(e) {
                        var t = {
                            audio: "audioinput",
                            video: "videoinput"
                        };
                        return window.MediaStreamTrack.getSources(function(r) {
                            e(r.map(function(e) {
                                return {
                                    label: e.label,
                                    kind: t[e.kind],
                                    deviceId: e.id,
                                    groupId: ""
                                }
                            }))
                        })
                    })
                }
            }), navigator.mediaDevices.getSupportedConstraints || (navigator.mediaDevices.getSupportedConstraints = function() {
                return {
                    deviceId: !0,
                    echoCancellation: !0,
                    facingMode: !0,
                    frameRate: !0,
                    height: !0,
                    width: !0
                }
            }), navigator.mediaDevices.getUserMedia) {
                var a = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
                navigator.mediaDevices.getUserMedia = function(e) {
                    return t(e,
                    function(e) {
                        return a(e).then(function(t) {
                            if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                                e.stop()
                            }),
                            new DOMException("", "NotFoundError");
                            return t
                        },
                        function(e) {
                            return Promise.reject(e)
                        })
                    })
                }
            } else navigator.mediaDevices.getUserMedia = function(e) {
                return r(e)
            }
        } (),
        "firefox" === i.browser.name && (navigator.mediaDevices || (navigator.mediaDevices = {
            getUserMedia: function(e) {
                return new Promise(function(t, r) { !
                    function(e, t, r) {
                        e = JSON.parse(JSON.stringify(e)),
                        navigator.mozGetUserMedia(e, t,
                        function(e) {
                            r(e)
                        })
                    } (e, t, r)
                })
            },
            addEventListener: function() {},
            removeEventListener: function() {}
        }), navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices ||
        function() {
            return new Promise(function(e) {
                e([{
                    kind: "audioinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                },
                {
                    kind: "videoinput",
                    deviceId: "default",
                    label: "",
                    groupId: ""
                }])
            })
        })
    },
    5919 : function(e, t, r) {},
    5926 : function(e, t, r) {
        "use strict";
        r.r(t);
        var n = {};
        r.r(n),
        r.d(n, "roomStore",
        function() {
            return ut
        }),
        r.d(n, "routerStore",
        function() {
            return at
        }),
        r.d(n, "messageStore",
        function() {
            return st
        }),
        r.d(n, "menuStore",
        function() {
            return dt
        }),
        r.d(n, "userStore",
        function() {
            return Ze
        });
        r(5570),
        r(5604),
        r(5611);
        var i = r(0),
        a = r.n(i),
        o = r(22),
        s = r.n(o),
        c = (r(5632), r(13)),
        u = r.n(c),
        d = r(81),
        p = r(26),
        l = r(25),
        f = r(23),
        h = r(84),
        m = r(83),
        v = r(85),
        k = r(20),
        y = r(5),
        g = r(120),
        b = r.n(g),
        T = r(288),
        S = r.n(T);

        function w(e) {
            return i.createElement("div", {
                className: S.a.input
            },
            i.createElement("input", {
                value: e.value,
                onChange: e.onChange,
                placeholder: e.placeholder,
                id: e.id || ""
            }))
        }
        r(5637);
        var C, _ = r(30),
        x = r(36),
        R = [{
            key: "288p",
            label: "342x288 , 15fps , 300kbps",
            selected: !0,
            config: {
                video: {
                    enabled: !0,
                    width: 352,
                    height: 288,
                    frameRate: 15,
                    bitrate: 300
                }
            }
        },
        {
            key: "480p",
            label: "640x480 , 15fps , 400kbps",
            selected: !0,
            config: {
                video: {
                    enabled: !0,
                    width: 640,
                    height: 480,
                    frameRate: 15,
                    bitrate: 400
                }
            }
        },
        {
            key: "540p",
            label: "960x544 , 15fps , 700kbps",
            selected: !0,
            config: {
                video: {
                    enabled: !0,
                    width: 960,
                    height: 544,
                    frameRate: 15,
                    bitrate: 700
                }
            }
        },
        {
            key: "720p",
            label: "1280x720 , 20fps , 1000kbps",
            config: {
                video: {
                    enabled: !0,
                    width: 1280,
                    height: 720,
                    frameRate: 20,
                    bitrate: 1e3
                }
            }
        }],
        E = [{
            key: "camera",
            label: "\u6444\u50cf\u5934",
            selected: !0,
            config: {
                video: Object(d.a)({
                    enabled: !0,
                    tag: "camera"
                },
                R[0].config.video)
            }
        },
        {
            key: "audio",
            label: "\u97f3\u9891\uff08\u9ea6\u514b\u98ce\uff09",
            selected: !0,
            config: {
                audio: {
                    enabled: !0,
                    tag: "audio"
                }
            }
        },
        {
            key: "buffer_audio",
            label: "\u97f3\u9891\uff08\u5916\u90e8\u6570\u636e\u5bfc\u5165\uff09",
            config: {}
        },
        {
            key: "screen_share",
            label: "\u5c4f\u5e55\u5171\u4eab",
            config: {
                screen: {
                    enabled: !0,
                    tag: "screen",
                    source: "screen"
                }
            }
        },
        {
            key: "window_share",
            label: "\u7a97\u53e3\u5171\u4eab",
            config: {
                screen: {
                    enabled: !0,
                    tag: "screen",
                    source: "window"
                }
            }
        }],
        I = (E.map(function(e) {
            return e.key
        }), r(6037)),
        P = r(174),
        O = r.n(P),
        M = r(290),
        A = r.n(M),
        j = Object(_.b)("routerStore", "userStore", "roomStore", "messageStore")(C = Object(_.c)(C = function(e) {
            function t(e) {
                var r;
                Object(l.a)(this, t),
                (r = Object(h.a)(this, Object(m.a)(t).call(this, e))).fileinput = a.a.createRef(),
                r.state = void 0,
                r.handleTrackChange = function(e) {
                    return function() {
                        var t = Object(p.a)(u.a.mark(function t(n, i) {
                            var a, o, s, c, p, l, f;
                            return u.a.wrap(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                case 0:
                                    if (a = E[e], o = a.key, s = a.config, c = r.state.selected ^ 1 << e, !i) {
                                        t.next = 12;
                                        break
                                    }
                                    if ("buffer_audio" !== o) {
                                        t.next = 11;
                                        break
                                    }
                                    if (!r.fileinput.current) {
                                        t.next = 11;
                                        break
                                    }
                                    return r.fileinput.current.value = "",
                                    r.fileinput.current.click(),
                                    t.next = 9,
                                    new Promise(function(e, t) {
                                        r.fileinput.current && r.fileinput.current.addEventListener("change",
                                        function(r) {
                                            r.target && r.target.files ? e(r.target.files[0]) : t()
                                        })
                                    });
                                case 9:
                                    p = t.sent,
                                    s.audio = {
                                        enabled: !0,
                                        source: p
                                    };
                                case 11:
                                    e < 1 || (c &= e < 3 ? ~ (6 ^ 1 << e) : ~ (24 ^ 1 << e));
                                case 12:
                                    for (l = 0; l < E.length; l++) r.props.roomStore.selectTracks[l] = c & 1 << l ? E[l].config: void 0; (f = Object(d.a)({},
                                    r.state)).selected = c,
                                    r.setState(f);
                                case 16:
                                case "end":
                                    return t.stop()
                                }
                            },
                            t, this)
                        }));
                        return function(e, r) {
                            return t.apply(this, arguments)
                        }
                    } ()
                },
                r.handleRadioChange = function() {
                    var e = Object(p.a)(u.a.mark(function e(t, n) {
                        var i, a, o, s, c, p, l;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                i = parseInt(n, 2),
                                a = 0;
                            case 2:
                                if (! (a < E.length)) {
                                    e.next = 20;
                                    break
                                }
                                if (o = E[a], s = o.key, c = o.config, !(i & 1 << a)) {
                                    e.next = 16;
                                    break
                                }
                                if ("buffer_audio" !== s) {
                                    e.next = 13;
                                    break
                                }
                                if (!r.fileinput.current) {
                                    e.next = 13;
                                    break
                                }
                                return r.fileinput.current.value = "",
                                r.fileinput.current.click(),
                                e.next = 11,
                                new Promise(function(e, t) {
                                    r.fileinput.current && r.fileinput.current.addEventListener("change",
                                    function(r) {
                                        r.target && r.target.files ? e(r.target.files[0]) : t()
                                    })
                                });
                            case 11:
                                p = e.sent,
                                c.audio = {
                                    enabled: !0,
                                    source: p
                                };
                            case 13:
                                r.props.roomStore.selectTracks[a] = c,
                                e.next = 17;
                                break;
                            case 16:
                                r.props.roomStore.selectTracks[a] = void 0;
                            case 17:
                                a++,
                                e.next = 2;
                                break;
                            case 20:
                                (l = Object(d.a)({},
                                r.state)).selected = i,
                                r.setState(l);
                            case 23:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } (),
                r.showMessage = r.props.messageStore.show,
                r.verifyState = function() {
                    var e = r.state,
                    t = e.userid,
                    n = e.roomid,
                    i = Object(x.h)(t),
                    a = Object(x.g)(n);
                    return ! i && a ? (r.showMessage("\u7528\u6237\u540d\u9650\u5236 3~50 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf"), !1) : !a && i ? (r.showMessage("\u623f\u95f4\u540d\u9650\u5236 3~64 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf"), !1) : !(!a && !i) || (r.showMessage("\u7528\u6237\u540d 3~50 \u4e2a\u5b57\u7b26\u3001\u623f\u95f4\u540d 3~64 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf"), !1)
                },
                r.handleLiveClick = function() {
                    var e = r.state,
                    t = e.userid,
                    n = e.roomid;
                    r.verifyState() && (r.props.userStore.setId(t), r.props.roomStore.setId(n))
                };
                for (var n = 0,
                i = 0; i < E.length; i++) r.props.roomStore.selectTracks[i] && (n |= 1 << i);
                return r.state = {
                    userid: e.userStore.id,
                    roomid: e.roomStore.id,
                    roomToken: "",
                    enhance: !1,
                    selected: n || 3,
                    joinRoomStep: e.userStore.id ? 1 : 0
                },
                r
            }
            return Object(v.a)(t, e),
            Object(f.a)(t, [{
                key: "handleNext",
                value: function(e, t) {
                    var r = this.state,
                    n = r.userid,
                    i = r.roomid,
                    a = r.roomToken;
                    return a ? this.props.routerStore.push("/room/?roomToken=" + a) : 0 === this.state.joinRoomStep ? Object(x.h)(n) ? (this.props.userStore.setId(n), void this.setState({
                        joinRoomStep: 1
                    })) : void this.showMessage("\u7528\u6237\u540d\u9650\u5236 3~50 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf") : void(Object(x.g)(i) ? (this.props.roomStore.setId(i), "room" === e ? (this.props.routerStore.push("/room/".concat(i)), this.props.messageStore.showLoading()) : "live" === e && (this.props.routerStore.push("/live/".concat(i)), this.props.messageStore.showLoading())) : this.showMessage("\u623f\u95f4\u540d\u9650\u5236 3~64 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf"))
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props.classes,
                    r = this.state.enhance;
                    return a.a.createElement("div", {
                        className: t.root
                    },
                    a.a.createElement(y.r, {
                        style: {
                            pointerEvents: 0 !== this.state.joinRoomStep ? "auto": "none",
                            opacity: 0 !== this.state.joinRoomStep ? 1 : 0,
                            zIndex: 10,
                            top: "16px",
                            right: "16px",
                            position: "absolute"
                        },
                        onClick: function() {
                            return e.props.routerStore.push("/settings")
                        }
                    },
                    a.a.createElement(b.a, {
                        color: "inherit"
                    })), a.a.createElement(y.p, {
                        container: !0,
                        direction: "column",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    this.props.userStore.id ? a.a.createElement(y.a, {
                        style: {
                            backgroundColor: Object(x.a)(this.props.userStore.id),
                            color: "#FAFAFA"
                        },
                        className: t.avatar
                    },
                    this.props.userStore.id[0].toUpperCase()) : a.a.createElement(y.a, {
                        className: t.avatar,
                        src: A.a
                    }), a.a.createElement("p", {
                        className: "home_user"
                    },
                    this.props.userStore.id ? "\u8d26\u6237\u540d\u79f0: ".concat(this.props.userStore.id) : ""))), "/roomtoken" === this.props.routerStore.location.pathname ? a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.l, {
                        className: t.formControl,
                        "aria-describedby": "roomid-text"
                    },
                    a.a.createElement(w, {
                        placeholder: "\u8bf7\u8f93\u5165 roomToken",
                        value: this.state.roomToken,
                        onChange: function(t) {
                            return e.setState({
                                roomToken: t.target.value
                            })
                        }
                    })))) : a.a.createElement(a.a.Fragment, null, 0 === this.state.joinRoomStep && a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.l, {
                        className: t.formControl,
                        "aria-describedby": "userid-text"
                    },
                    a.a.createElement(w, {
                        placeholder: "\u8bf7\u8f93\u5165\u7528\u6237\u540d",
                        value: this.state.userid,
                        onChange: function(t) {
                            return e.setState({
                                userid: t.target.value
                            })
                        }
                    }), a.a.createElement("p", {
                        className: "hint"
                    },
                    "\u540d\u79f0\u4e3a admin \u7684\u7528\u6237\u4f1a\u88ab\u81ea\u52a8\u5206\u914d\u7ba1\u7406\u5458\u6743\u9650")))), 1 === this.state.joinRoomStep && a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.l, {
                        className: t.formControl,
                        "aria-describedby": "roomid-text"
                    },
                    a.a.createElement(w, {
                        placeholder: "\u8bf7\u8f93\u5165\u623f\u95f4\u540d",
                        value: this.state.roomid,
                        onChange: function(t) {
                            return e.setState({
                                roomid: t.target.value
                            })
                        }
                    }), a.a.createElement("p", {
                        className: "hint"
                    },
                    "\u5982\u679c\u623f\u95f4\u5c1a\u672a\u521b\u5efa\uff0c\u5c06\u4f1a\u81ea\u52a8\u521b\u5efa\u4e00\u4e2a\u623f\u95f4"))))), 1 === this.state.joinRoomStep && a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.l, {
                        className: t.formControl
                    },
                    a.a.createElement(y.v, {
                        className: t.radioGroup,
                        name: "mode",
                        row: !0,
                        value: this.state.selected.toString(2).padStart(E.length, "0"),
                        onChange: this.handleRadioChange
                    },
                    a.a.createElement(y.m, {
                        value: "00010",
                        control: a.a.createElement(y.u, null),
                        label: "\u97f3\u9891\u901a\u8bdd"
                    }), a.a.createElement(y.m, {
                        value: "00011",
                        control: a.a.createElement(y.u, null),
                        label: "\u97f3\u89c6\u9891\u901a\u8bdd"
                    }), a.a.createElement(y.m, {
                        value: "00101",
                        control: a.a.createElement(y.u, null),
                        label: "\u89c6\u9891\u901a\u8bdd + \u97f3\u9891\u6587\u4ef6"
                    }), a.a.createElement(y.m, {
                        value: "01011",
                        control: a.a.createElement(y.u, null),
                        label: "\u97f3\u89c6\u9891\u901a\u8bdd + \u5c4f\u5e55\u5171\u4eab"
                    }), a.a.createElement(y.m, {
                        value: "10011",
                        control: a.a.createElement(y.u, null),
                        label: "\u97f3\u89c6\u9891\u901a\u8bdd + \u7a97\u53e3\u5171\u4eab"
                    }))), a.a.createElement(y.q, Object.assign({ in :r,
                        style: {
                            transformOrigin: "0 0 0",
                            display: r ? "flex": "none"
                        }
                    },
                    r ? {
                        timeout: 1e3
                    }: {}), a.a.createElement(y.l, null, a.a.createElement(y.o, {
                        className: t.formLabel
                    },
                    "\u9009\u62e9\u8981\u53d1\u5e03\u7684\u6d41"), a.a.createElement(y.n, {
                        row: !0,
                        className: t.radioGroup
                    },
                    E.map(function(t, r) {
                        return a.a.createElement(y.m, {
                            key: r,
                            control: a.a.createElement(y.w, {
                                checked: 0 !== (e.state.selected & 1 << r),
                                onChange: e.handleTrackChange(r),
                                value: r
                            }),
                            label: t.label
                        })
                    })))))), a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.c, {
                        focusRipple: !0,
                        onClick: this.handleNext.bind(this, "room"),
                        className: "home_btn"
                    },
                    0 === this.state.joinRoomStep ? "\u4e0b\u4e00\u6b65": "\u4f1a\u8bae\u623f\u95f4"))), 0 === this.state.joinRoomStep ? a.a.createElement(a.a.Fragment, null) : a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.c, {
                        focusRipple: !0,
                        onClick: this.handleNext.bind(this, "live"),
                        className: "home_btn"
                    },
                    "\u76f4\u64ad\u623f\u95f4")))), a.a.createElement("span", {
                        className: t.linkLeft
                    },
                    "\u6784\u5efa\u65f6\u95f4: ", "2019/07/23-16:26"), "/roomtoken" === this.props.routerStore.location.pathname ? a.a.createElement(I.a, {
                        className: t.linkRight,
                        to: "/"
                    },
                    "\u4f7f\u7528\u623f\u95f4\u540d") : a.a.createElement(I.a, {
                        className: t.linkRight,
                        to: "/roomtoken"
                    },
                    "\u4f7f\u7528 roomToken"), a.a.createElement("img", {
                        className: "niu",
                        src: O.a
                    }), a.a.createElement("input", {
                        ref: this.fileinput,
                        type: "file",
                        style: {
                            display: "none"
                        },
                        accept: ".mp3, .ogg"
                    }))
                }
            }]),
            t
        } (i.Component)) || C) || C,
        D = Object(k.withStyles)(function(e) {
            return Object(k.createStyles)({
                avatar: {
                    margin: 14,
                    width: 100,
                    height: 100,
                    fontSize: 32
                },
                button: {
                    margin: e.spacing.unit,
                    width: 500,
                    height: 55
                },
                root: {
                    overflowX: "hidden",
                    overflowY: "auto",
                    height: "100vh",
                    padding: "".concat(e.spacing.unit, "px")
                },
                wrapper: {
                    maxWidth: 400
                },
                formControl: {
                    margin: e.spacing.unit
                },
                formLabel: {
                    textAlign: "center"
                },
                radioGroup: {
                    justifyContent: "center",
                    width: 500
                },
                linkRight: {
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "10px",
                    lineHeight: "16px",
                    position: "absolute",
                    bottom: "16px",
                    right: "16px"
                },
                linkLeft: {
                    color: "rgba(255, 255, 255, 0.5)",
                    fontSize: "10px",
                    lineHeight: "16px",
                    position: "absolute",
                    bottom: "16px",
                    left: "16px"
                }
            })
        })(j),
        L = r(6042),
        N = r(6041),
        U = r(6043),
        F = r(6039),
        V = r(124),
        B = r(3);
        Object(B.f)({
            enforceActions: "observed"
        });
        var z, H, J, G, q, W, Q, K, $, X, Y, Z, ee, te, re, ne, ie, ae, oe, se, ce, ue, de, pe, le, fe, he, me, ve, ke, ye, ge, be, Te, Se, we, Ce, _e, xe, Re, Ee, Ie, Pe, Oe, Me, Ae, je, De, Le, Ne, Ue, Fe, Ve, Be, ze, He, Je, Ge, qe, We = r(287),
        Qe = r(11),
        Ke = r(4),
        $e = (r(56), r(82)),
        Xe = r(48),
        Ye = r.n(Xe),
        Ze = new(z = function() {
            function e() {
                Object(l.a)(this, e),
                Object(Qe.a)(this, "id", H, this)
            }
            return Object(f.a)(e, [{
                key: "setId",
                value: function(e) {
                    this.id = e,
                    Ye.a.set("userid", e)
                }
            },
            {
                key: "setIdNoStore",
                value: function(e) {
                    this.id = e
                }
            },
            {
                key: "isAdmin",
                get: function() {
                    return "admin" === this.id
                }
            }]),
            e
        } (), H = Object(Ke.a)(z.prototype, "id", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return Ye.a.get("userid") || ""
            }
        }), Object(Ke.a)(z.prototype, "isAdmin", [B.e], Object.getOwnPropertyDescriptor(z.prototype, "isAdmin"), z.prototype), Object(Ke.a)(z.prototype, "setId", [B.d], Object.getOwnPropertyDescriptor(z.prototype, "setId"), z.prototype), Object(Ke.a)(z.prototype, "setIdNoStore", [B.d], Object.getOwnPropertyDescriptor(z.prototype, "setIdNoStore"), z.prototype), z),
        et = r(121),
        tt = (J = function() {
            function e(t) {
                Object(l.a)(this, e),
                this.rtcUser = void 0,
                Object(Qe.a)(this, "id", G, this),
                Object(Qe.a)(this, "tracks", q, this),
                Object(Qe.a)(this, "publishedTrackInfo", W, this),
                this.rtcUser = t,
                this.id = t.userId,
                console.log("publishedTrackInfo:", t.publishedTrackInfo);
                var r = !0,
                n = !1,
                i = void 0;
                try {
                    for (var a, o = t.publishedTrackInfo[Symbol.iterator](); ! (r = (a = o.next()).done); r = !0) {
                        var s = a.value;
                        console.log("trackInfo:", s),
                        this.publishedTrackInfo.set(s.trackId, s)
                    }
                } catch(c) {
                    n = !0,
                    i = c
                } finally {
                    try {
                        r || null == o.
                        return || o.
                        return ()
                    } finally {
                        if (n) throw i
                    }
                }
            }
            return Object(f.a)(e, [{
                key: "updateUser",
                value: function() {
                    this.id = this.rtcUser.userId;
                    var e = new Map,
                    t = !0,
                    r = !1,
                    n = void 0;
                    try {
                        for (var i, a = this.rtcUser.publishedTrackInfo[Symbol.iterator](); ! (t = (i = a.next()).done); t = !0) {
                            var o = i.value;
                            e.set(o.trackId, o)
                        }
                    } catch(s) {
                        r = !0,
                        n = s
                    } finally {
                        try {
                            t || null == a.
                            return || a.
                            return ()
                        } finally {
                            if (r) throw n
                        }
                    }
                    this.publishedTrackInfo = e
                }
            },
            {
                key: "addPublishedTrackInfo",
                value: function(e) {
                    this.publishedTrackInfo.set(e.trackId, e)
                }
            },
            {
                key: "removePublishedTrackInfo",
                value: function(e) {
                    this.publishedTrackInfo.delete(e.trackId)
                }
            },
            {
                key: "updateTracks",
                value: function(e) {
                    var t = !0,
                    r = !1,
                    n = void 0;
                    try {
                        for (var i, a = e[Symbol.iterator](); ! (t = (i = a.next()).done); t = !0) {
                            var o = i.value;
                            this.tracks.set(o.trackId, o)
                        }
                    } catch(s) {
                        r = !0,
                        n = s
                    } finally {
                        try {
                            t || null == a.
                            return || a.
                            return ()
                        } finally {
                            if (r) throw n
                        }
                    }
                }
            },
            {
                key: "updateTrack",
                value: function(e, t) {
                    this.tracks.delete(e),
                    this.tracks.set(e, t)
                }
            }]),
            e
        } (), G = Object(Ke.a)(J.prototype, "id", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), q = Object(Ke.a)(J.prototype, "tracks", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return new Map
            }
        }), W = Object(Ke.a)(J.prototype, "publishedTrackInfo", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return new Map
            }
        }), Object(Ke.a)(J.prototype, "updateUser", [B.d], Object.getOwnPropertyDescriptor(J.prototype, "updateUser"), J.prototype), Object(Ke.a)(J.prototype, "addPublishedTrackInfo", [B.d], Object.getOwnPropertyDescriptor(J.prototype, "addPublishedTrackInfo"), J.prototype), Object(Ke.a)(J.prototype, "removePublishedTrackInfo", [B.d], Object.getOwnPropertyDescriptor(J.prototype, "removePublishedTrackInfo"), J.prototype), Object(Ke.a)(J.prototype, "updateTracks", [B.d], Object.getOwnPropertyDescriptor(J.prototype, "updateTracks"), J.prototype), Object(Ke.a)(J.prototype, "updateTrack", [B.d], Object.getOwnPropertyDescriptor(J.prototype, "updateTrack"), J.prototype), J),
        rt = (Q = B.d.bound, K = function() {
            function e(t) {
                Object(l.a)(this, e),
                this.rtcTrack = void 0,
                Object(Qe.a)(this, "muted", $, this),
                Object(Qe.a)(this, "trackId", X, this),
                Object(Qe.a)(this, "tag", Y, this),
                Object(Qe.a)(this, "userId", Z, this),
                Object(Qe.a)(this, "mediaTrack", ee, this),
                this.rtcTrack = t,
                this.muted = t.info.muted,
                this.trackId = t.info.trackId,
                this.tag = t.info.tag,
                this.userId = t.userId,
                this.mediaTrack = t.mediaTrack
            }
            return Object(f.a)(e, [{
                key: "updateTrack",
                value: function() {
                    this.muted = this.rtcTrack.info.muted,
                    this.trackId = this.rtcTrack.info.trackId,
                    this.tag = this.rtcTrack.info.tag,
                    this.userId = this.rtcTrack.userId,
                    this.mediaTrack = this.rtcTrack.mediaTrack
                }
            },
            {
                key: "toggleMute",
                value: function() {
                    ut.session.muteTracks([{
                        trackId: this.trackId,
                        muted: !this.muted
                    }]),
                    this.updateTrack()
                }
            }]),
            e
        } (), $ = Object(Ke.a)(K.prototype, "muted", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), X = Object(Ke.a)(K.prototype, "trackId", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), Y = Object(Ke.a)(K.prototype, "tag", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), Z = Object(Ke.a)(K.prototype, "userId", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), ee = Object(Ke.a)(K.prototype, "mediaTrack", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), Object(Ke.a)(K.prototype, "updateTrack", [B.d], Object.getOwnPropertyDescriptor(K.prototype, "updateTrack"), K.prototype), Object(Ke.a)(K.prototype, "toggleMute", [Q], Object.getOwnPropertyDescriptor(K.prototype, "toggleMute"), K.prototype), K),
        nt = r(175),
        it = r.n(nt),
        at = new V.RouterStore,
        ot = r(278),
        st = new(te = B.d.bound, re = B.d.bound, ne = B.d.bound, ie = B.d.bound, ae = B.d.bound, oe = B.d.bound, se = B.d.bound, ce = B.d.bound, ue = function() {
            function e() {
                Object(l.a)(this, e),
                this.stack = [],
                Object(Qe.a)(this, "alertMessage", de, this),
                Object(Qe.a)(this, "open", pe, this),
                Object(Qe.a)(this, "messageInfo", le, this),
                Object(Qe.a)(this, "loadingOpen", fe, this),
                Object(Qe.a)(this, "loadingText", he, this)
            }
            return Object(f.a)(e, [{
                key: "showAlert",
                value: function(e) {
                    var t = {
                        show: !0,
                        title: e.title || "\u6ce8\u610f",
                        content: e.content || ""
                    };
                    this.alertMessage = t
                }
            },
            {
                key: "closeAlert",
                value: function() {
                    this.alertMessage.show = !1,
                    this.alertMessage.onclose && this.alertMessage.onclose()
                }
            },
            {
                key: "close",
                value: function(e, t) {
                    "clickaway" !== t && (this.open = !1)
                }
            },
            {
                key: "show",
                value: function(e) {
                    var t = {
                        key: Object(x.c)(),
                        message: e
                    };
                    this.stack.push(t),
                    this.open ? this.open = !1 : this.processQueue()
                }
            },
            {
                key: "processQueue",
                value: function() {
                    this.stack.length > 0 && (this.messageInfo = this.stack.shift(), this.open = !0)
                }
            },
            {
                key: "showLoading",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "loading";
                    this.loadingOpen = !0,
                    this.loadingText = e
                }
            },
            {
                key: "hideLoading",
                value: function() {
                    this.loadingOpen = !1,
                    this.loadingText = ""
                }
            },
            {
                key: "setLoadingText",
                value: function(e) {
                    this.loadingText = e
                }
            }]),
            e
        } (), de = Object(Ke.a)(ue.prototype, "alertMessage", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return {
                    title: "",
                    content: "",
                    show: !1,
                    onclose: void 0
                }
            }
        }), pe = Object(Ke.a)(ue.prototype, "open", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return ! 1
            }
        }), le = Object(Ke.a)(ue.prototype, "messageInfo", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return {
                    key: 0,
                    message: ""
                }
            }
        }), Object(Ke.a)(ue.prototype, "showAlert", [te], Object.getOwnPropertyDescriptor(ue.prototype, "showAlert"), ue.prototype), Object(Ke.a)(ue.prototype, "closeAlert", [re], Object.getOwnPropertyDescriptor(ue.prototype, "closeAlert"), ue.prototype), Object(Ke.a)(ue.prototype, "close", [ne], Object.getOwnPropertyDescriptor(ue.prototype, "close"), ue.prototype), Object(Ke.a)(ue.prototype, "show", [ie], Object.getOwnPropertyDescriptor(ue.prototype, "show"), ue.prototype), Object(Ke.a)(ue.prototype, "processQueue", [ae], Object.getOwnPropertyDescriptor(ue.prototype, "processQueue"), ue.prototype), fe = Object(Ke.a)(ue.prototype, "loadingOpen", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return ! 1
            }
        }), he = Object(Ke.a)(ue.prototype, "loadingText", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return ""
            }
        }), Object(Ke.a)(ue.prototype, "showLoading", [oe], Object.getOwnPropertyDescriptor(ue.prototype, "showLoading"), ue.prototype), Object(Ke.a)(ue.prototype, "hideLoading", [se], Object.getOwnPropertyDescriptor(ue.prototype, "hideLoading"), ue.prototype), Object(Ke.a)(ue.prototype, "setLoadingText", [ce], Object.getOwnPropertyDescriptor(ue.prototype, "setLoadingText"), ue.prototype), ue),
        ct = Object(ot.a)(window.location.pathname, {
            path: "/room/:roomid",
            exact: !0,
            strict: !1
        }),
        ut = new(me = B.l.deep, ve = B.l.deep, ke = B.d.bound, ye = B.d.bound, ge = B.l.deep, be = B.d.bound, Te = B.d.bound, Se = B.d.bound, we = B.d.bound, Ce = B.d.bound, _e = B.d.bound, xe = B.d.bound, Re = B.d.bound, Ee = B.d.bound, Ie = B.d.bound, Pe = B.d.bound, Oe = function() {
            function e() {
                var t = this;
                Object(l.a)(this, e),
                Object(Qe.a)(this, "id", Me, this),
                Object(Qe.a)(this, "token", Ae, this),
                Object(Qe.a)(this, "appId", je, this),
                Object(Qe.a)(this, "users", De, this),
                this.selectTracks = [],
                Object(Qe.a)(this, "selectVideoConfig", Le, this),
                Object(Qe.a)(this, "publishedTracks", Ne, this),
                Object(Qe.a)(this, "subscribedTracks", Ue, this),
                Object(Qe.a)(this, "state", Fe, this),
                Object(Qe.a)(this, "publishTracksReport", Ve, this),
                this.session = new $e.TrackModeSession,
                this.publishedTrackInfos = new Map,
                this.localTracks = [],
                this.statusInterval = void 0,
                this.session.on("room-state-change", this.setState),
                this.session.on("user-join", this.addUser),
                this.session.on("user-leave", this.removeUser),
                this.session.on("track-add", this.addTracks),
                this.session.on("track-remove", this.removeTracks),
                this.session.on("mute-tracks", this.updateTracksMute),
                this.session.on("disconnect", this.handleDisconnect),
                this.selectTracks[1] = E[1].config,
                this.selectTracks[0] = E[0].config;
                var r = Ye.a.get("selectVideoConfig");
                r && (this.selectVideoConfig = r);
                var n = Ye.a.get("qnrtnAppID");
                n && this.setAppId(n),
                window.onbeforeunload = function() {
                    return t.leaveRoom()
                }
            }
            return Object(f.a)(e, [{
                key: "toggleMutePublishedVideo",
                value: function() {
                    var e = this.publishedVideoTracks;
                    this.muteTracks(e.map(function(e) {
                        return e.trackId
                    }), e.some(function(e) {
                        return ! e.muted
                    }))
                }
            },
            {
                key: "toggleMutePublishedAudio",
                value: function() {
                    var e = this.publishedAudioTracks;
                    this.muteTracks(e.map(function(e) {
                        return e.trackId
                    }), e.some(function(e) {
                        return ! e.muted
                    }))
                }
            },
            {
                key: "publishedAudioTracks",
                get: function() {
                    return Array.from(this.publishedTracks.values()).filter(function(e) {
                        return "audio" === e.rtcTrack.info.kind
                    })
                }
            },
            {
                key: "publishedVideoTracks",
                get: function() {
                    return Array.from(this.publishedTracks.values()).filter(function(e) {
                        return "video" === e.rtcTrack.info.kind
                    })
                }
            }]),
            Object(f.a)(e, [{
                key: "setId",
                value: function(e) {
                    this.id = e
                }
            },
            {
                key: "setToken",
                value: function(e) {
                    this.token = e
                }
            },
            {
                key: "fetchRoomToken",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t, r, n = this;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if ((t = Ze.id) && this.id) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return", "");
                            case 3:
                                return e.next = 5,
                                Object(et.e)(this.appId, this.id, t);
                            case 5:
                                return r = e.sent,
                                Object(B.m)(function() {
                                    n.token = r
                                }),
                                e.abrupt("return", r);
                            case 8:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "setAppId",
                value: function(e, t) {
                    this.appId = e,
                    t && Ye.a.set("qnrtnAppID", e)
                }
            },
            {
                key: "setState",
                value: function(e) {
                    console.log("room state change", e),
                    this.state = e
                }
            },
            {
                key: "addUser",
                value: function(e) {
                    this.users.has(e.userId) || this.users.set(e.userId, new tt(e))
                }
            },
            {
                key: "removeUser",
                value: function(e) {
                    this.users.delete(e.userId)
                }
            },
            {
                key: "addTracks",
                value: function(e) {
                    for (var t = it()(e, "userId"), r = Object.keys(t), n = 0; n < r.length; n++) {
                        var i = r[n],
                        a = t[i];
                        if (this.users.has(i)) {
                            var o = this.users.get(i),
                            s = !0,
                            c = !1,
                            u = void 0;
                            try {
                                for (var d, p = a[Symbol.iterator](); ! (s = (d = p.next()).done); s = !0) {
                                    var l = d.value;
                                    o.addPublishedTrackInfo(l),
                                    this.publishedTrackInfos.set(l.trackId, l)
                                }
                            } catch(f) {
                                c = !0,
                                u = f
                            } finally {
                                try {
                                    s || null == p.
                                    return || p.
                                    return ()
                                } finally {
                                    if (c) throw u
                                }
                            }
                        }
                    }
                    this.subscribe(e.map(function(e) {
                        return e.trackId
                    }))
                }
            },
            {
                key: "removeTracks",
                value: function(e) {
                    for (var t = it()(e, "userId"), r = Object.keys(t), n = 0; n < r.length; n++) {
                        var i = r[n],
                        a = t[i];
                        if (this.users.has(i)) {
                            var o = this.users.get(i),
                            s = !0,
                            c = !1,
                            u = void 0;
                            try {
                                for (var d, p = a[Symbol.iterator](); ! (s = (d = p.next()).done); s = !0) {
                                    var l = d.value,
                                    f = l.trackId;
                                    if (!f) return;
                                    o.tracks.delete(f),
                                    o.removePublishedTrackInfo(l),
                                    this.publishedTrackInfos.delete(f)
                                }
                            } catch(h) {
                                c = !0,
                                u = h
                            } finally {
                                try {
                                    s || null == p.
                                    return || p.
                                    return ()
                                } finally {
                                    if (c) throw u
                                }
                            }
                        }
                    }
                }
            },
            {
                key: "updateTracksMute",
                value: function(e) {
                    var t = !0,
                    r = !1,
                    n = void 0;
                    try {
                        for (var i, a = e[Symbol.iterator](); ! (t = (i = a.next()).done); t = !0) {
                            var o = i.value,
                            s = this.subscribedTracks.get(o.trackId);
                            if (s) {
                                console.log("set subTrack mute", s, o.muted),
                                s.muted = o.muted;
                                var c = this.users.get(s.userId);
                                c && c.updateTrack(s.trackId, s)
                            }
                        }
                    } catch(u) {
                        r = !0,
                        n = u
                    } finally {
                        try {
                            t || null == a.
                            return || a.
                            return ()
                        } finally {
                            if (r) throw n
                        }
                    }
                }
            },
            {
                key: "syncUserList",
                value: function(e) {
                    var t = this,
                    r = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, o = function() {
                            var r = a.value;
                            e.find(function(e) {
                                return e.userId === r
                            }) || t.users.delete(r)
                        },
                        s = this.users.keys()[Symbol.iterator](); ! (r = (a = s.next()).done); r = !0) o()
                    } catch(b) {
                        n = !0,
                        i = b
                    } finally {
                        try {
                            r || null == s.
                            return || s.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                    var c = !0,
                    u = !1,
                    d = void 0;
                    try {
                        for (var p, l = e[Symbol.iterator](); ! (c = (p = l.next()).done); c = !0) {
                            var f = p.value;
                            this.users.has(f.userId) || this.users.set(f.userId, new tt(f));
                            var h = !0,
                            m = !1,
                            v = void 0;
                            try {
                                for (var k, y = f.publishedTrackInfo[Symbol.iterator](); ! (h = (k = y.next()).done); h = !0) {
                                    var g = k.value;
                                    this.publishedTrackInfos.set(g.trackId, g)
                                }
                            } catch(b) {
                                m = !0,
                                v = b
                            } finally {
                                try {
                                    h || null == y.
                                    return || y.
                                    return ()
                                } finally {
                                    if (m) throw v
                                }
                            }
                        }
                    } catch(b) {
                        u = !0,
                        d = b
                    } finally {
                        try {
                            c || null == l.
                            return || l.
                            return ()
                        } finally {
                            if (u) throw d
                        }
                    }
                }
            },
            {
                key: "joinRoom",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t, r, n, i = this,
                        a = arguments;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t = a.length > 0 && void 0 !== a[0] ? a[0] : this.token, r = a.length > 1 ? a[1] : void 0, this.subscribedTracks.clear(), this.publishedTrackInfos.clear(), this.users.clear(), t) {
                                    e.next = 7;
                                    break
                                }
                                return e.abrupt("return");
                            case 7:
                                return e.next = 9,
                                this.session.joinRoomWithToken(t, r);
                            case 9:
                                n = e.sent,
                                this.setAppId(this.session.appId),
                                Ze.setIdNoStore(this.session.userId),
                                this.id !== this.session.roomName && Object(B.m)(function() {
                                    i.id = i.session.roomName
                                }),
                                "admin" === this.session.userId && this.session.setDefaultMergeStream(480, 848),
                                this.syncUserList(n);
                            case 15:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "publish",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t, r = this,
                        n = arguments;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = n.length > 0 && void 0 !== n[0] ? n[0] : [],
                                e.prev = 1,
                                e.next = 4,
                                this.session.publish(t);
                            case 4:
                                Object(B.m)(function() {
                                    var e = !0,
                                    n = !1,
                                    i = void 0;
                                    try {
                                        for (var a, o = t[Symbol.iterator](); ! (e = (a = o.next()).done); e = !0) {
                                            var s = a.value;
                                            s.info.trackId && r.publishedTracks.set(s.info.trackId, new rt(s))
                                        }
                                    } catch(c) {
                                        n = !0,
                                        i = c
                                    } finally {
                                        try {
                                            e || null == o.
                                            return || o.
                                            return ()
                                        } finally {
                                            if (n) throw i
                                        }
                                    }
                                }),
                                this.statusInterval && window.clearInterval(this.statusInterval),
                                this.statusInterval = window.setInterval(this.updateTrackStatusReport, 1e3),
                                e.next = 13;
                                break;
                            case 9:
                                throw e.prev = 9,
                                e.t0 = e.
                                catch(1),
                                t.map(function(e) {
                                    return e.release()
                                }),
                                e.t0;
                            case 13:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[1, 9]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "muteTracks",
                value: function(e, t) {
                    this.session.muteTracks(e.map(function(e) {
                        return {
                            trackId: e,
                            muted: t
                        }
                    }));
                    var r = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, o = e[Symbol.iterator](); ! (r = (a = o.next()).done); r = !0) {
                            var s = a.value,
                            c = this.publishedTracks.get(s);
                            c && (c.updateTrack(), this.publishedTracks.delete(s), this.publishedTracks.set(s, c))
                        }
                    } catch(u) {
                        n = !0,
                        i = u
                    } finally {
                        try {
                            r || null == o.
                            return || o.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                }
            },
            {
                key: "setSelectVideoConfig",
                value: function(e) {
                    this.selectVideoConfig = e,
                    Ye.a.set("selectVideoConfig", e)
                }
            },
            {
                key: "unpublish",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = Array.from(this.publishedTracks.keys()),
                                e.next = 3,
                                this.session.unpublish(t);
                            case 3:
                                this.publishedTracks.forEach(function(e) {
                                    return e.rtcTrack.release()
                                }),
                                this.publishedTracks.clear();
                            case 5:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "getSelectTracks",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t, r, n, i, a, o, s, c, d, l, f = this;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (! ((t = this.selectTracks.filter(function(e) {
                                    return e
                                })).length <= 3)) {
                                    e.next = 24;
                                    break
                                }
                                for (r = {},
                                n = !0, i = !1, a = void 0, e.prev = 6, o = t[Symbol.iterator](); ! (n = (s = o.next()).done); n = !0) c = s.value,
                                Object.assign(r, c);
                                e.next = 14;
                                break;
                            case 10:
                                e.prev = 10,
                                e.t0 = e.
                                catch(6),
                                i = !0,
                                a = e.t0;
                            case 14:
                                e.prev = 14,
                                e.prev = 15,
                                n || null == o.
                                return || o.
                                return ();
                            case 17:
                                if (e.prev = 17, !i) {
                                    e.next = 20;
                                    break
                                }
                                throw a;
                            case 20:
                                return e.finish(17);
                            case 21:
                                return e.finish(14);
                            case 22:
                                return r.video && Object.assign(r.video, (R.find(function(e) {
                                    return e.key === f.selectVideoConfig
                                }) || R[0]).config.video),
                                e.abrupt("return", $e.deviceManager.getLocalTracks(r).then(function() {
                                    var e = Object(p.a)(u.a.mark(function e(t) {
                                        var n, i, a, o, s, c;
                                        return u.a.wrap(function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                for (n = !0, i = !1, a = void 0, e.prev = 3, o = t[Symbol.iterator](); ! (n = (s = o.next()).done); n = !0)"audio" === (c = s.value).info.kind && r.audio && r.audio.source && (c.setLoop(!0), c.startAudioSource()),
                                                "camera" === c.info.tag && c.setMaster(!0),
                                                "audio" === c.info.kind && c.setMaster(!0),
                                                f.localTracks.push(c);
                                                e.next = 11;
                                                break;
                                            case 7:
                                                e.prev = 7,
                                                e.t0 = e.
                                                catch(3),
                                                i = !0,
                                                a = e.t0;
                                            case 11:
                                                e.prev = 11,
                                                e.prev = 12,
                                                n || null == o.
                                                return || o.
                                                return ();
                                            case 14:
                                                if (e.prev = 14, !i) {
                                                    e.next = 17;
                                                    break
                                                }
                                                throw a;
                                            case 17:
                                                return e.finish(14);
                                            case 18:
                                                return e.finish(11);
                                            case 19:
                                                return e.abrupt("return", t);
                                            case 20:
                                            case "end":
                                                return e.stop()
                                            }
                                        },
                                        e, this, [[3, 7, 11, 19], [12, , 14, 18]])
                                    }));
                                    return function(t) {
                                        return e.apply(this, arguments)
                                    }
                                } ()));
                            case 24:
                                return d = 0,
                                l = 0,
                                e.abrupt("return", Promise.all(t.map(function(e) {
                                    return e.video && Object.assign(e.video, (R.find(function(e) {
                                        return e.key === f.selectVideoConfig
                                    }) || R[0]).config.video),
                                    $e.deviceManager.getLocalTracks(e).then(function() {
                                        var t = Object(p.a)(u.a.mark(function t(r) {
                                            var n, i;
                                            return u.a.wrap(function(t) {
                                                for (;;) switch (t.prev = t.next) {
                                                case 0:
                                                    return n = Object(We.a)(r, 1),
                                                    i = n[0],
                                                    e.audio && e.audio.source && (i.setLoop(!0), i.startAudioSource()),
                                                    "video" === i.info.kind && 0 === d && (i.setMaster(!0), d++),
                                                    "audio" === i.info.kind && 0 === l && (i.setMaster(!0), l++),
                                                    f.localTracks.push(i),
                                                    t.abrupt("return", i);
                                                case 6:
                                                case "end":
                                                    return t.stop()
                                                }
                                            },
                                            t, this)
                                        }));
                                        return function(e) {
                                            return t.apply(this, arguments)
                                        }
                                    } ())
                                })));
                            case 27:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[6, 10, 14, 22], [15, , 17, 21]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "subscribe",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e(t) {
                        var r, n, i, a = this;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return n = new Promise(function(e, n) {
                                    r = function(e) {
                                        var r = !0,
                                        i = !1,
                                        a = void 0;
                                        try {
                                            for (var o, s = e[Symbol.iterator](); ! (r = (o = s.next()).done); r = !0) {
                                                var c = o.value;
                                                if (t.includes(c.trackId)) {
                                                    var u = new Error("\u8ba2\u9605\u5931\u8d25\uff0c\u8ba2\u9605\u7684track\u5df2\u79fb\u9664");
                                                    n(u)
                                                }
                                            }
                                        } catch(d) {
                                            i = !0,
                                            a = d
                                        } finally {
                                            try {
                                                r || null == s.
                                                return || s.
                                                return ()
                                            } finally {
                                                if (i) throw a
                                            }
                                        }
                                    },
                                    a.session.on("track-remove", r)
                                }),
                                e.prev = 1,
                                e.next = 4,
                                Promise.race([n, this.session.subscribe(t)]);
                            case 4:
                                i = e.sent,
                                r && this.session.off("track-remove", r),
                                Object(B.m)(function() {
                                    var e = !0,
                                    t = !1,
                                    r = void 0;
                                    try {
                                        for (var n, o = i[Symbol.iterator](); ! (e = (n = o.next()).done); e = !0) {
                                            var s = n.value,
                                            c = new rt(s);
                                            a.subscribedTracks.set(s.info.trackId, c);
                                            var u = a.users.get(s.userId);
                                            u && u.tracks.set(s.info.trackId, c)
                                        }
                                    } catch(d) {
                                        t = !0,
                                        r = d
                                    } finally {
                                        try {
                                            e || null == o.
                                            return || o.
                                            return ()
                                        } finally {
                                            if (t) throw r
                                        }
                                    }
                                }),
                                e.next = 13;
                                break;
                            case 9:
                                throw e.prev = 9,
                                e.t0 = e.
                                catch(1),
                                console.warn(e.t0),
                                e.t0;
                            case 13:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[1, 9]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "subscribeAll",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e() {
                        var t;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = Array.from(this.publishedTrackInfos.values()).map(function(e) {
                                    return e.trackId
                                }),
                                console.log("trackids" + t),
                                e.next = 4,
                                this.subscribe(t);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "unsubscribe",
                value: function() {
                    var e = Object(p.a)(u.a.mark(function e(t) {
                        var r = this;
                        return u.a.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.session.unsubscribe(t);
                            case 2:
                                Object(B.m)(function() {
                                    var e = !0,
                                    n = !1,
                                    i = void 0;
                                    try {
                                        for (var a, o = t[Symbol.iterator](); ! (e = (a = o.next()).done); e = !0) {
                                            var s = a.value,
                                            c = r.subscribedTracks.get(s);
                                            if (!c) return;
                                            r.subscribedTracks.delete(s);
                                            var u = r.users.get(c.userId);
                                            if (!u) return;
                                            u.tracks.delete(s)
                                        }
                                    } catch(d) {
                                        n = !0,
                                        i = d
                                    } finally {
                                        try {
                                            e || null == o.
                                            return || o.
                                            return ()
                                        } finally {
                                            if (n) throw i
                                        }
                                    }
                                });
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "releaseLocalTracks",
                value: function() {
                    0 !== this.localTracks.length && (this.localTracks.forEach(function(e) {
                        return e && e.release()
                    }), this.localTracks = [])
                }
            },
            {
                key: "leaveRoom",
                value: function() {
                    this.session.leaveRoom(),
                    this.publishedTracks.forEach(function(e) {
                        return e.rtcTrack.release()
                    }),
                    this.publishedTracks.clear(),
                    this.subscribedTracks.clear(),
                    this.publishedTrackInfos.clear(),
                    this.users.clear(),
                    this.releaseLocalTracks(),
                    this.token = "",
                    this.id = "",
                    at.push("/")
                }
            },
            {
                key: "updateTrackStatusReport",
                value: function() {
                    var e = Array.from(this.publishedTracks.values()),
                    t = e.find(function(e) {
                        return "audio" === e.mediaTrack.kind
                    }),
                    r = e.find(function(e) {
                        return "camera" === e.tag
                    }),
                    n = e.find(function(e) {
                        return "screen" === e.tag
                    });
                    this.publishTracksReport.audio = t ? t.rtcTrack.getStats() : null,
                    this.publishTracksReport.video = r ? r.rtcTrack.getStats() : null,
                    this.publishTracksReport.screen = n ? n.rtcTrack.getStats() : null
                }
            },
            {
                key: "handleDisconnect",
                value: function(e) {
                    var t = this;
                    switch (console.log("handleDiconnect", e), e.code) {
                    case 10006:
                        return this.leaveRoom(),
                        void st.showAlert({
                            show: !0,
                            title: "\u65ad\u5f00\u8fde\u63a5",
                            content: "\u88ab\u7ba1\u7406\u5458\u8e22\u51fa\u623f\u95f4"
                        });
                    case 10004:
                        return console.log("get 10004", this.publishedTracks, this.subscribedTracks),
                        this.users.clear(),
                        void this.joinRoom().then(function() {
                            var e = Array.from(t.publishedTracks.values()).map(function(e) {
                                return e.rtcTrack
                            });
                            return t.publishedTracks.clear(),
                            console.log("repub"),
                            t.publish(e)
                        }).then(function() {
                            return t.subscribeAll().
                            catch(function(e) {
                                console.log(e),
                                st.showAlert({
                                    show: !0,
                                    title: "\u8ba2\u9605\u5931\u8d25",
                                    content: "\u81ea\u52a8\u8ba2\u9605\u5931\u8d25\uff0c\u8bf7\u624b\u52a8\u8ba2\u9605"
                                })
                            })
                        }).
                        catch(function(e) {
                            console.log(e),
                            t.leaveRoom(),
                            st.showAlert({
                                show: !0,
                                title: "\u5c1d\u8bd5\u91cd\u8fde\u5931\u8d25",
                                content: "\u4e0e\u623f\u95f4\u65ad\u5f00\u94fe\u63a5\uff0c\u8bf7\u91cd\u65b0\u52a0\u5165\u623f\u95f4"
                            })
                        });
                    case 10011:
                        return this.leaveRoom(),
                        void st.showAlert({
                            show: !0,
                            title: "\u65ad\u5f00\u8fde\u63a5",
                            content: "\u623f\u95f4\u4eba\u6570\u5df2\u6ee1"
                        });
                    case 10022:
                        return this.leaveRoom(),
                        void st.showAlert({
                            show: !0,
                            title: "\u65ad\u5f00\u8fde\u63a5",
                            content: "\u8be5\u7528\u6237\u5728\u5176\u4ed6\u9875\u9762\u6216\u7ec8\u7aef\u767b\u5f55"
                        });
                    default:
                        return void this.leaveRoom()
                    }
                }
            }]),
            e
        } (), Me = Object(Ke.a)(Oe.prototype, "id", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return ct && ct.params.roomid || ""
            }
        }), Ae = Object(Ke.a)(Oe.prototype, "token", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return ""
            }
        }), je = Object(Ke.a)(Oe.prototype, "appId", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return et.d
            }
        }), De = Object(Ke.a)(Oe.prototype, "users", [me], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return new Map
            }
        }), Le = Object(Ke.a)(Oe.prototype, "selectVideoConfig", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return "480p"
            }
        }), Ne = Object(Ke.a)(Oe.prototype, "publishedTracks", [ve], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return new Map
            }
        }), Object(Ke.a)(Oe.prototype, "publishedAudioTracks", [B.e], Object.getOwnPropertyDescriptor(Oe.prototype, "publishedAudioTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "publishedVideoTracks", [B.e], Object.getOwnPropertyDescriptor(Oe.prototype, "publishedVideoTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "toggleMutePublishedVideo", [ke], Object.getOwnPropertyDescriptor(Oe.prototype, "toggleMutePublishedVideo"), Oe.prototype), Object(Ke.a)(Oe.prototype, "toggleMutePublishedAudio", [ye], Object.getOwnPropertyDescriptor(Oe.prototype, "toggleMutePublishedAudio"), Oe.prototype), Ue = Object(Ke.a)(Oe.prototype, "subscribedTracks", [ge], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return new Map
            }
        }), Fe = Object(Ke.a)(Oe.prototype, "state", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return $e.RoomState.Idle
            }
        }), Ve = Object(Ke.a)(Oe.prototype, "publishTracksReport", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return {
                    audio: null,
                    video: null,
                    screen: null
                }
            }
        }), Object(Ke.a)(Oe.prototype, "setId", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "setId"), Oe.prototype), Object(Ke.a)(Oe.prototype, "setToken", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "setToken"), Oe.prototype), Object(Ke.a)(Oe.prototype, "fetchRoomToken", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "fetchRoomToken"), Oe.prototype), Object(Ke.a)(Oe.prototype, "setAppId", [be], Object.getOwnPropertyDescriptor(Oe.prototype, "setAppId"), Oe.prototype), Object(Ke.a)(Oe.prototype, "setState", [Te], Object.getOwnPropertyDescriptor(Oe.prototype, "setState"), Oe.prototype), Object(Ke.a)(Oe.prototype, "addUser", [Se], Object.getOwnPropertyDescriptor(Oe.prototype, "addUser"), Oe.prototype), Object(Ke.a)(Oe.prototype, "removeUser", [we], Object.getOwnPropertyDescriptor(Oe.prototype, "removeUser"), Oe.prototype), Object(Ke.a)(Oe.prototype, "addTracks", [Ce], Object.getOwnPropertyDescriptor(Oe.prototype, "addTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "removeTracks", [_e], Object.getOwnPropertyDescriptor(Oe.prototype, "removeTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "updateTracksMute", [xe], Object.getOwnPropertyDescriptor(Oe.prototype, "updateTracksMute"), Oe.prototype), Object(Ke.a)(Oe.prototype, "syncUserList", [Re], Object.getOwnPropertyDescriptor(Oe.prototype, "syncUserList"), Oe.prototype), Object(Ke.a)(Oe.prototype, "joinRoom", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "joinRoom"), Oe.prototype), Object(Ke.a)(Oe.prototype, "publish", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "publish"), Oe.prototype), Object(Ke.a)(Oe.prototype, "muteTracks", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "muteTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "setSelectVideoConfig", [Ee], Object.getOwnPropertyDescriptor(Oe.prototype, "setSelectVideoConfig"), Oe.prototype), Object(Ke.a)(Oe.prototype, "unpublish", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "unpublish"), Oe.prototype), Object(Ke.a)(Oe.prototype, "getSelectTracks", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "getSelectTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "subscribe", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "subscribe"), Oe.prototype), Object(Ke.a)(Oe.prototype, "subscribeAll", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "subscribeAll"), Oe.prototype), Object(Ke.a)(Oe.prototype, "unsubscribe", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "unsubscribe"), Oe.prototype), Object(Ke.a)(Oe.prototype, "releaseLocalTracks", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "releaseLocalTracks"), Oe.prototype), Object(Ke.a)(Oe.prototype, "leaveRoom", [B.d], Object.getOwnPropertyDescriptor(Oe.prototype, "leaveRoom"), Oe.prototype), Object(Ke.a)(Oe.prototype, "updateTrackStatusReport", [Ie], Object.getOwnPropertyDescriptor(Oe.prototype, "updateTrackStatusReport"), Oe.prototype), Object(Ke.a)(Oe.prototype, "handleDisconnect", [Pe], Object.getOwnPropertyDescriptor(Oe.prototype, "handleDisconnect"), Oe.prototype), Oe),
        dt = new(Be = B.d.bound, ze = B.d.bound, He = function() {
            function e() {
                Object(l.a)(this, e),
                Object(Qe.a)(this, "list", Je, this),
                Object(Qe.a)(this, "anchorEl", Ge, this)
            }
            return Object(f.a)(e, [{
                key: "open",
                value: function(e, t) {
                    this.anchorEl = e,
                    this.list = t
                }
            },
            {
                key: "close",
                value: function() {
                    this.anchorEl = null,
                    this.list = []
                }
            }]),
            e
        } (), Je = Object(Ke.a)(He.prototype, "list", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: function() {
                return []
            }
        }), Ge = Object(Ke.a)(He.prototype, "anchorEl", [B.l], {
            configurable: !0,
            enumerable: !0,
            writable: !0,
            initializer: null
        }), Object(Ke.a)(He.prototype, "open", [Be], Object.getOwnPropertyDescriptor(He.prototype, "open"), He.prototype), Object(Ke.a)(He.prototype, "close", [ze], Object.getOwnPropertyDescriptor(He.prototype, "close"), He.prototype), He),
        pt = (r(5919), r(47)),
        lt = r(279),
        ft = r(292),
        ht = r.n(ft);

        function mt(e) {
            return i.createElement("div", {
                className: ht.a.input
            },
            i.createElement("select", {
                value: e.value,
                onChange: e.onChange,
                id: e.id || ""
            },
            e.children))
        }
        var vt = Object(_.b)("routerStore", "userStore", "roomStore", "messageStore")(qe = Object(_.c)(qe = function(e) {
            function t(e) {
                var r;
                return Object(l.a)(this, t),
                (r = Object(h.a)(this, Object(m.a)(t).call(this, e))).handleSave = function() {
                    if (r.state.userid) {
                        if (!Object(x.h)(r.state.userid)) return r.props.messageStore.show("\u7528\u6237\u540d\u6700\u5c11 3 \u4e2a\u5b57\u7b26\uff0c\u5e76\u4e14\u53ea\u80fd\u5305\u542b\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u4e0b\u5212\u7ebf");
                        r.props.userStore.setId(r.state.userid)
                    }
                    r.state.appid && r.props.roomStore.setAppId(r.state.appid, !0),
                    r.props.routerStore.push("/")
                },
                r.state = {
                    userid: "",
                    roomid: "",
                    appid: e.roomStore.appId,
                    videoConfig: e.roomStore.selectVideoConfig
                },
                r
            }
            return Object(v.a)(t, e),
            Object(f.a)(t, [{
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    n = t.classes,
                    i = t.roomStore;
                    return a.a.createElement("div", {
                        className: n.root
                    },
                    a.a.createElement(y.p, {
                        container: !0,
                        wrap: "nowrap",
                        justify: "flex-end",
                        spacing: 16
                    },
                    a.a.createElement(y.r, {
                        onClick: function() {
                            return e.props.routerStore.push("/")
                        }
                    },
                    a.a.createElement(lt.a, {
                        color: "inherit"
                    }))), a.a.createElement(y.p, {
                        style: {
                            marginTop: 80
                        },
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(w, {
                        placeholder: "\u4fee\u6539\u7528\u6237\u540d",
                        value: this.state.userid,
                        onChange: function(t) {
                            return e.setState({
                                userid: t.target.value
                            })
                        }
                    }))), a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(mt, {
                        value: i.selectVideoConfig,
                        onChange: function(e) {
                            return i.setSelectVideoConfig(e.target.value)
                        }
                    },
                    R.map(function(e, t) {
                        return a.a.createElement("option", {
                            key: t,
                            value: e.key
                        },
                        e.label)
                    })))), a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(w, {
                        placeholder: "\u4fee\u6539APP_ID",
                        value: this.state.appid,
                        onChange: function(t) {
                            return e.setState({
                                appid: t.target.value
                            })
                        }
                    }))), a.a.createElement(y.p, {
                        item: !0,
                        container: !0,
                        wrap: "nowrap",
                        justify: "center",
                        spacing: 16
                    },
                    a.a.createElement(y.p, {
                        item: !0
                    },
                    a.a.createElement(y.c, {
                        focusRipple: !0,
                        className: "home_btn",
                        onClick: this.handleSave
                    },
                    "\u5b8c\u6210"))), a.a.createElement("img", {
                        src: r(174),
                        className: "niu"
                    }))
                }
            }]),
            t
        } (i.Component)) || qe) || qe,
        kt = Object(k.withStyles)(function(e) {
            return Object(k.createStyles)({
                avatar: {
                    margin: 14,
                    width: 100,
                    height: 100,
                    fontSize: 32
                },
                button: {
                    margin: e.spacing.unit
                },
                root: {
                    overflow: "hidden",
                    padding: "".concat(3 * e.spacing.unit, "px")
                },
                wrapper: {
                    maxWidth: 400
                },
                formControl: {
                    margin: e.spacing.unit
                },
                formLabel: {
                    textAlign: "center"
                },
                radioGroup: {
                    justifyContent: "center"
                }
            })
        })(vt),
        yt = r(122),
        gt = r.n(yt),
        bt = r(78),
        Tt = r.n(bt),
        St = r(123),
        wt = r.n(St),
        Ct = Object(k.withStyles)(function(e) {
            return Object(k.createStyles)({
                close: {
                    padding: e.spacing.unit / 2
                }
            })
        })(Object(_.c)(function(e) {
            var t = e.classes,
            r = e.messageStore;
            return a.a.createElement(gt.a, {
                key: r.messageInfo.key,
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right"
                },
                open: r.open,
                autoHideDuration: 6e3,
                onClose: r.close,
                onExited: r.processQueue,
                ContentProps: {
                    "aria-describedby": "message-id"
                },
                message: a.a.createElement("span", {
                    id: "message-id"
                },
                r.messageInfo.message),
                action: [a.a.createElement(Tt.a, {
                    key: "close",
                    "aria-label": "Close",
                    color: "inherit",
                    className: t.close,
                    onClick: r.close
                },
                a.a.createElement(wt.a, null))]
            })
        })),
        _t = Object(k.withStyles)(function(e) {
            return Object(k.createStyles)({
                progress: {
                    margin: 2 * e.spacing.unit
                },
                dialogContentText: {
                    margin: 2 * e.spacing.unit,
                    lineHeight: "40px"
                }
            })
        })(Object(_.b)("messageStore", "menuStore")(Object(_.c)(function(e) {
            var t = e.classes,
            r = e.messageStore,
            n = e.menuStore;
            return i.createElement(i.Fragment, null, i.createElement(y.f, {
                open: r.alertMessage.show,
                onClose: r.closeAlert,
                id: "dialog"
            },
            i.createElement(y.j, null, r.alertMessage.title), i.createElement(y.h, null, i.createElement(y.i, null, r.alertMessage.content)), i.createElement(y.g, null, i.createElement(y.b, {
                onClick: r.closeAlert
            },
            "\u597d\u7684"))), i.createElement(y.f, {
                open: r.loadingOpen
            },
            i.createElement(y.h, null, i.createElement(y.p, {
                container: !0,
                spacing: 16,
                alignItems: "center"
            },
            i.createElement(y.p, {
                item: !0
            },
            i.createElement(y.e, {
                size: 40,
                className: t.progress
            })), i.createElement(y.p, {
                item: !0,
                xs: 12,
                sm: !0
            },
            i.createElement(y.i, {
                className: t.dialogContentText
            },
            r.loadingText))))), i.createElement(Ct, {
                messageStore: r
            }), i.createElement(y.s, {
                anchorEl: n.anchorEl,
                open: Boolean(n.anchorEl),
                onClose: n.close,
                id: "context_menu"
            },
            n.list.map(function(e, t) {
                return i.createElement(y.t, Object.assign({},
                e, {
                    className: "context_menuitem",
                    key: t
                }))
            })), e.children)
        }))),
        xt = r(75),
        Rt = r.n(xt),
        Et = r(115),
        It = r.n(Et),
        Pt = r(116),
        Ot = r.n(Pt),
        Mt = r(117),
        At = r.n(Mt),
        jt = r(118),
        Dt = r.n(jt),
        Lt = r(119),
        Nt = r.n(Lt),
        Ut = function(e) {
            var t, r = a.a.lazy(function() {
                return new Promise(function(e) {
                    t = e
                })
            }),
            n = function() {
                t && t(e.lazy)
            },
            o = function() {
                return a.a.createElement("div", null, a.a.createElement(It.a, {
                    open: !0,
                    onClose: n,
                    "aria-labelledby": "form-dialog-title"
                },
                a.a.createElement(Nt.a, {
                    id: "form-dialog-title"
                },
                " ", e.title), a.a.createElement(At.a, null, a.a.createElement(Dt.a, null, e.content)), a.a.createElement(Ot.a, null, a.a.createElement(Rt.a, {
                    onClick: n,
                    color: "primary"
                },
                "\u52a0\u5165"))))
            };
            return function(e) {
                return a.a.createElement(i.Suspense, {
                    fallback: a.a.createElement(o, null)
                },
                a.a.createElement(r, e))
            }
        },
        Ft = Ut({
            lazy: Promise.all([r.e(5), r.e(1)]).then(r.bind(null, 6038)),
            title: "\u52a0\u5165\u4f1a\u8bae\u623f\u95f4",
            content: "\u6211\u4eec\u5c06\u91c7\u96c6\u60a8\u7684\u6444\u50cf\u5934/\u9ea6\u514b\u98ce\u6570\u636e\u5e76\u4e0e\u623f\u95f4\u5176\u4ed6\u7528\u6237\u8fdb\u884c\u97f3\u89c6\u9891\u901a\u8bdd"
        }),
        Vt = Ut({
            lazy: Promise.all([r.e(4), r.e(2)]).then(r.bind(null, 6040)),
            title: "\u52a0\u5165\u76f4\u64ad\u623f\u95f4",
            content: "\u53ea\u6709\u540c\u540d\u4f1a\u8bae\u623f\u95f4\u6709\u4eba\u53d1\u5e03\u7684\u60c5\u51b5\u4e0b\u624d\u80fd\u89c2\u770b\u76f4\u64ad\uff0c\u8fdb\u5165\u524d\u8bf7\u786e\u8ba4\u8be5\u623f\u95f4\u5df2\u7ecf\u6709\u4eba\u53d1\u5e03"
        }),
        Bt = Object(k.createMuiTheme)({
            palette: {
                type: "dark",
                primary: {
                    main: "#34AADC",
                    contrastText: "#FAFAFA"
                },
                secondary: {
                    main: "#34AADC",
                    contrastText: "#FAFAFA"
                }
            },
            typography: {
                useNextVariants: !0
            }
        }),
        zt = Object(pt.a)(),
        Ht = Object(V.syncHistoryWithStore)(zt, at);
        var Jt = function() {
            return i.createElement(k.MuiThemeProvider, {
                theme: Bt
            },
            i.createElement(_.a, n, i.createElement(_t, {
                messageStore: st,
                menuStore: dt
            },
            i.createElement(L.a, {
                history: Ht
            },
            i.createElement(N.a, null, i.createElement(U.a, {
                path: "/",
                exact: !0,
                component: D
            }), i.createElement(U.a, {
                path: "/roomtoken",
                component: D,
                exact: !0
            }), i.createElement(U.a, {
                path: "/room/:roomid?",
                render: Ft
            }), i.createElement(U.a, {
                path: "/live/:roomid",
                render: Vt
            }), i.createElement(U.a, {
                path: "/settings",
                component: kt
            }), i.createElement(F.a, {
                to: "/"
            }))))))
        };
        s.a.render(i.createElement(Jt, null), document.getElementById("root"))
    },
    82 : function(e, t, r) {
        "use strict";
        var n = r(5791),
        i = r(258),
        a = r(5793),
        o = r(13),
        s = r(5796),
        c = r(5797),
        u = r(108),
        d = r(5799),
        p = r(5800),
        l = r(5801);

        function f(e) {
            return e && "object" === typeof e && "default" in e ? e.
        default:
            e
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
        r(162),
        r(163);
        var h = r(259);
        r(5802);
        var m = f(r(5803)),
        v = f(r(5804)),
        k = f(r(5805)),
        y = f(r(5806)),
        g = f(r(5807)),
        b = f(r(5808)),
        T = f(r(5813)),
        S = f(r(5814)),
        w = f(r(5815));
        var C = function(e, t, r) {
            return t in e ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = r,
            e
        };
        var _ = function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {},
                n = Object.keys(r);
                "function" === typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(e) {
                    return Object.getOwnPropertyDescriptor(r, e).enumerable
                }))),
                n.forEach(function(t) {
                    C(e, t, r[t])
                })
            }
            return e
        };

        function x() {
            throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
        }
        var R, E = function(e, t) {
            return e(t = {
                exports: {}
            },
            t.exports),
            t.exports
        } (function(e) { !
            function() {
                return function e(t, r, n) {
                    function i(o, s) {
                        if (!r[o]) {
                            if (!t[o]) {
                                if (!s && x) return x();
                                if (a) return a(o, !0);
                                var c = new Error("Cannot find module '" + o + "'");
                                throw c.code = "MODULE_NOT_FOUND",
                                c
                            }
                            var u = r[o] = {
                                exports: {}
                            };
                            t[o][0].call(u.exports,
                            function(e) {
                                return i(t[o][1][e] || e)
                            },
                            u, u.exports, e, t, r, n)
                        }
                        return r[o].exports
                    }
                    for (var a = x,
                    o = 0; o < n.length; o++) i(n[o]);
                    return i
                }
            } ()({
                1 : [function(e, t, r) {
                    var n = (0, e("./adapter_factory.js").adapterFactory)({
                        window: window
                    });
                    t.exports = n
                },
                {
                    "./adapter_factory.js": 2
                }],
                2 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.adapterFactory = function() {
                        var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).window,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            shimChrome: !0,
                            shimFirefox: !0,
                            shimEdge: !0,
                            shimSafari: !0
                        },
                        r = n.log,
                        u = n.detectBrowser(e),
                        d = {
                            browserDetails: u,
                            commonShim: c,
                            extractVersion: n.extractVersion,
                            disableLog: n.disableLog,
                            disableWarnings: n.disableWarnings
                        };
                        switch (u.browser) {
                        case "chrome":
                            if (!i || !i.shimPeerConnection || !t.shimChrome) return r("Chrome shim is not included in this adapter release."),
                            d;
                            r("adapter.js shimming chrome."),
                            d.browserShim = i,
                            i.shimGetUserMedia(e),
                            i.shimMediaStream(e),
                            i.shimPeerConnection(e),
                            i.shimOnTrack(e),
                            i.shimAddTrackRemoveTrack(e),
                            i.shimGetSendersWithDtmf(e),
                            i.shimSenderReceiverGetStats(e),
                            i.fixNegotiationNeeded(e),
                            c.shimRTCIceCandidate(e),
                            c.shimConnectionState(e),
                            c.shimMaxMessageSize(e),
                            c.shimSendThrowTypeError(e),
                            c.removeAllowExtmapMixed(e);
                            break;
                        case "firefox":
                            if (!o || !o.shimPeerConnection || !t.shimFirefox) return r("Firefox shim is not included in this adapter release."),
                            d;
                            r("adapter.js shimming firefox."),
                            d.browserShim = o,
                            o.shimGetUserMedia(e),
                            o.shimPeerConnection(e),
                            o.shimOnTrack(e),
                            o.shimRemoveStream(e),
                            o.shimSenderGetStats(e),
                            o.shimReceiverGetStats(e),
                            o.shimRTCDataChannel(e),
                            c.shimRTCIceCandidate(e),
                            c.shimConnectionState(e),
                            c.shimMaxMessageSize(e),
                            c.shimSendThrowTypeError(e);
                            break;
                        case "edge":
                            if (!a || !a.shimPeerConnection || !t.shimEdge) return r("MS edge shim is not included in this adapter release."),
                            d;
                            r("adapter.js shimming edge."),
                            d.browserShim = a,
                            a.shimGetUserMedia(e),
                            a.shimGetDisplayMedia(e),
                            a.shimPeerConnection(e),
                            a.shimReplaceTrack(e),
                            c.shimMaxMessageSize(e),
                            c.shimSendThrowTypeError(e);
                            break;
                        case "safari":
                            if (!s || !t.shimSafari) return r("Safari shim is not included in this adapter release."),
                            d;
                            r("adapter.js shimming safari."),
                            d.browserShim = s,
                            s.shimRTCIceServerUrls(e),
                            s.shimCreateOfferLegacy(e),
                            s.shimCallbacksAPI(e),
                            s.shimLocalStreamsAPI(e),
                            s.shimRemoteStreamsAPI(e),
                            s.shimTrackEventTransceiver(e),
                            s.shimGetUserMedia(e),
                            c.shimRTCIceCandidate(e),
                            c.shimMaxMessageSize(e),
                            c.shimSendThrowTypeError(e),
                            c.removeAllowExtmapMixed(e);
                            break;
                        default:
                            r("Unsupported browser!")
                        }
                        return d
                    };
                    var n = u(e("./utils")),
                    i = u(e("./chrome/chrome_shim")),
                    a = u(e("./edge/edge_shim")),
                    o = u(e("./firefox/firefox_shim")),
                    s = u(e("./safari/safari_shim")),
                    c = u(e("./common_shim"));

                    function u(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    }
                },
                {
                    "./chrome/chrome_shim": 3,
                    "./common_shim": 6,
                    "./edge/edge_shim": 12,
                    "./firefox/firefox_shim": 7,
                    "./safari/safari_shim": 10,
                    "./utils": 11
                }],
                3 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    },
                    i = e("./getusermedia");
                    Object.defineProperty(r, "shimGetUserMedia", {
                        enumerable: !0,
                        get: function() {
                            return i.shimGetUserMedia
                        }
                    });
                    var a = e("./getdisplaymedia");
                    Object.defineProperty(r, "shimGetDisplayMedia", {
                        enumerable: !0,
                        get: function() {
                            return a.shimGetDisplayMedia
                        }
                    }),
                    r.shimMediaStream = function(e) {
                        e.MediaStream = e.MediaStream || e.webkitMediaStream
                    },
                    r.shimOnTrack = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) o.wrapPeerConnectionEvent(e, "track",
                        function(e) {
                            return e.transceiver || Object.defineProperty(e, "transceiver", {
                                value: {
                                    receiver: e.receiver
                                }
                            }),
                            e
                        });
                        else {
                            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                                get: function() {
                                    return this._ontrack
                                },
                                set: function(e) {
                                    this._ontrack && this.removeEventListener("track", this._ontrack),
                                    this.addEventListener("track", this._ontrack = e)
                                },
                                enumerable: !0,
                                configurable: !0
                            });
                            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                                var r = this;
                                return this._ontrackpoly || (this._ontrackpoly = function(t) {
                                    t.stream.addEventListener("addtrack",
                                    function(n) {
                                        var i = void 0;
                                        i = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                                            return e.track && e.track.id === n.track.id
                                        }) : {
                                            track: n.track
                                        };
                                        var a = new Event("track");
                                        a.track = n.track,
                                        a.receiver = i,
                                        a.transceiver = {
                                            receiver: i
                                        },
                                        a.streams = [t.stream],
                                        r.dispatchEvent(a)
                                    }),
                                    t.stream.getTracks().forEach(function(n) {
                                        var i = void 0;
                                        i = e.RTCPeerConnection.prototype.getReceivers ? r.getReceivers().find(function(e) {
                                            return e.track && e.track.id === n.id
                                        }) : {
                                            track: n
                                        };
                                        var a = new Event("track");
                                        a.track = n,
                                        a.receiver = i,
                                        a.transceiver = {
                                            receiver: i
                                        },
                                        a.streams = [t.stream],
                                        r.dispatchEvent(a)
                                    })
                                },
                                this.addEventListener("addstream", this._ontrackpoly)),
                                t.apply(this, arguments)
                            }
                        }
                    },
                    r.shimGetSendersWithDtmf = function(e) {
                        if ("object" === ("undefined" === typeof e ? "undefined": n(e)) && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
                            var t = function(e, t) {
                                return {
                                    track: t,
                                    get dtmf() {
                                        return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null),
                                        this._dtmf
                                    },
                                    _pc: e
                                }
                            };
                            if (!e.RTCPeerConnection.prototype.getSenders) {
                                e.RTCPeerConnection.prototype.getSenders = function() {
                                    return this._senders = this._senders || [],
                                    this._senders.slice()
                                };
                                var r = e.RTCPeerConnection.prototype.addTrack;
                                e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                                    var i = r.apply(this, arguments);
                                    return i || (i = t(this, e), this._senders.push(i)),
                                    i
                                };
                                var i = e.RTCPeerConnection.prototype.removeTrack;
                                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                                    i.apply(this, arguments);
                                    var t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
                                }
                            }
                            var a = e.RTCPeerConnection.prototype.addStream;
                            e.RTCPeerConnection.prototype.addStream = function(e) {
                                var r = this;
                                this._senders = this._senders || [],
                                a.apply(this, [e]),
                                e.getTracks().forEach(function(e) {
                                    r._senders.push(t(r, e))
                                })
                            };
                            var o = e.RTCPeerConnection.prototype.removeStream;
                            e.RTCPeerConnection.prototype.removeStream = function(e) {
                                var t = this;
                                this._senders = this._senders || [],
                                o.apply(this, [e]),
                                e.getTracks().forEach(function(e) {
                                    var r = t._senders.find(function(t) {
                                        return t.track === e
                                    });
                                    r && t._senders.splice(t._senders.indexOf(r), 1)
                                })
                            }
                        } else if ("object" === ("undefined" === typeof e ? "undefined": n(e)) && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
                            var s = e.RTCPeerConnection.prototype.getSenders;
                            e.RTCPeerConnection.prototype.getSenders = function() {
                                var e = this,
                                t = s.apply(this, []);
                                return t.forEach(function(t) {
                                    return t._pc = e
                                }),
                                t
                            },
                            Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                                get: function() {
                                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null),
                                    this._dtmf
                                }
                            })
                        }
                    },
                    r.shimSenderReceiverGetStats = function(e) {
                        if (! ("object" === ("undefined" === typeof e ? "undefined": n(e)) && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return;
                        if (! ("getStats" in e.RTCRtpSender.prototype)) {
                            var t = e.RTCPeerConnection.prototype.getSenders;
                            t && (e.RTCPeerConnection.prototype.getSenders = function() {
                                var e = this,
                                r = t.apply(this, []);
                                return r.forEach(function(t) {
                                    return t._pc = e
                                }),
                                r
                            });
                            var r = e.RTCPeerConnection.prototype.addTrack;
                            r && (e.RTCPeerConnection.prototype.addTrack = function() {
                                var e = r.apply(this, arguments);
                                return e._pc = this,
                                e
                            }),
                            e.RTCRtpSender.prototype.getStats = function() {
                                var e = this;
                                return this._pc.getStats().then(function(t) {
                                    return s(t, e.track, !0)
                                })
                            }
                        }
                        if (! ("getStats" in e.RTCRtpReceiver.prototype)) {
                            var i = e.RTCPeerConnection.prototype.getReceivers;
                            i && (e.RTCPeerConnection.prototype.getReceivers = function() {
                                var e = this,
                                t = i.apply(this, []);
                                return t.forEach(function(t) {
                                    return t._pc = e
                                }),
                                t
                            }),
                            o.wrapPeerConnectionEvent(e, "track",
                            function(e) {
                                return e.receiver._pc = e.srcElement,
                                e
                            }),
                            e.RTCRtpReceiver.prototype.getStats = function() {
                                var e = this;
                                return this._pc.getStats().then(function(t) {
                                    return s(t, e.track, !1)
                                })
                            }
                        }
                        if (! ("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype)) return;
                        var a = e.RTCPeerConnection.prototype.getStats;
                        e.RTCPeerConnection.prototype.getStats = function() {
                            if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                                var t = arguments[0],
                                r = void 0,
                                n = void 0,
                                i = void 0;
                                return this.getSenders().forEach(function(e) {
                                    e.track === t && (r ? i = !0 : r = e)
                                }),
                                this.getReceivers().forEach(function(e) {
                                    return e.track === t && (n ? i = !0 : n = e),
                                    e.track === t
                                }),
                                i || r && n ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : r ? r.getStats() : n ? n.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"))
                            }
                            return a.apply(this, arguments)
                        }
                    },
                    r.shimAddTrackRemoveTrackWithNative = c,
                    r.shimAddTrackRemoveTrack = function(e) {
                        if (!e.RTCPeerConnection) return;
                        var t = o.detectBrowser(e);
                        if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return c(e);
                        var r = e.RTCPeerConnection.prototype.getLocalStreams;
                        e.RTCPeerConnection.prototype.getLocalStreams = function() {
                            var e = this,
                            t = r.apply(this);
                            return this._reverseStreams = this._reverseStreams || {},
                            t.map(function(t) {
                                return e._reverseStreams[t.id]
                            })
                        };
                        var n = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function(t) {
                            var r = this;
                            if (this._streams = this._streams || {},
                            this._reverseStreams = this._reverseStreams || {},
                            t.getTracks().forEach(function(e) {
                                var t = r.getSenders().find(function(t) {
                                    return t.track === e
                                });
                                if (t) throw new DOMException("Track already exists.", "InvalidAccessError")
                            }), !this._reverseStreams[t.id]) {
                                var i = new e.MediaStream(t.getTracks());
                                this._streams[t.id] = i,
                                this._reverseStreams[i.id] = t,
                                t = i
                            }
                            n.apply(this, [t])
                        };
                        var i = e.RTCPeerConnection.prototype.removeStream;

                        function a(e, t) {
                            var r = t.sdp;
                            return Object.keys(e._reverseStreams || []).forEach(function(t) {
                                var n = e._reverseStreams[t],
                                i = e._streams[n.id];
                                r = r.replace(new RegExp(i.id, "g"), n.id)
                            }),
                            new RTCSessionDescription({
                                type: t.type,
                                sdp: r
                            })
                        }
                        e.RTCPeerConnection.prototype.removeStream = function(e) {
                            this._streams = this._streams || {},
                            this._reverseStreams = this._reverseStreams || {},
                            i.apply(this, [this._streams[e.id] || e]),
                            delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id: e.id],
                            delete this._streams[e.id]
                        },
                        e.RTCPeerConnection.prototype.addTrack = function(t, r) {
                            var n = this;
                            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                            var i = [].slice.call(arguments, 1);
                            if (1 !== i.length || !i[0].getTracks().find(function(e) {
                                return e === t
                            })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
                            var a = this.getSenders().find(function(e) {
                                return e.track === t
                            });
                            if (a) throw new DOMException("Track already exists.", "InvalidAccessError");
                            this._streams = this._streams || {},
                            this._reverseStreams = this._reverseStreams || {};
                            var o = this._streams[r.id];
                            if (o) o.addTrack(t),
                            Promise.resolve().then(function() {
                                n.dispatchEvent(new Event("negotiationneeded"))
                            });
                            else {
                                var s = new e.MediaStream([t]);
                                this._streams[r.id] = s,
                                this._reverseStreams[s.id] = r,
                                this.addStream(s)
                            }
                            return this.getSenders().find(function(e) {
                                return e.track === t
                            })
                        },
                        ["createOffer", "createAnswer"].forEach(function(t) {
                            var r = e.RTCPeerConnection.prototype[t];
                            e.RTCPeerConnection.prototype[t] = function() {
                                var e = this,
                                t = arguments,
                                n = arguments.length && "function" === typeof arguments[0];
                                return n ? r.apply(this, [function(r) {
                                    var n = a(e, r);
                                    t[0].apply(null, [n])
                                },
                                function(e) {
                                    t[1] && t[1].apply(null, e)
                                },
                                arguments[2]]) : r.apply(this, arguments).then(function(t) {
                                    return a(e, t)
                                })
                            }
                        });
                        var s = e.RTCPeerConnection.prototype.setLocalDescription;
                        e.RTCPeerConnection.prototype.setLocalDescription = function() {
                            return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
                                var r = t.sdp;
                                return Object.keys(e._reverseStreams || []).forEach(function(t) {
                                    var n = e._reverseStreams[t],
                                    i = e._streams[n.id];
                                    r = r.replace(new RegExp(n.id, "g"), i.id)
                                }),
                                new RTCSessionDescription({
                                    type: t.type,
                                    sdp: r
                                })
                            } (this, arguments[0]), s.apply(this, arguments)) : s.apply(this, arguments)
                        };
                        var u = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
                        Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
                            get: function() {
                                var e = u.get.apply(this);
                                return "" === e.type ? e: a(this, e)
                            }
                        }),
                        e.RTCPeerConnection.prototype.removeTrack = function(e) {
                            var t = this;
                            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
                            if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
                            var r = e._pc === this;
                            if (!r) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
                            this._streams = this._streams || {};
                            var n = void 0;
                            Object.keys(this._streams).forEach(function(r) {
                                var i = t._streams[r].getTracks().find(function(t) {
                                    return e.track === t
                                });
                                i && (n = t._streams[r])
                            }),
                            n && (1 === n.getTracks().length ? this.removeStream(this._reverseStreams[n.id]) : n.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")))
                        }
                    },
                    r.shimPeerConnection = function(e) { ! e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection);
                        if (!e.RTCPeerConnection) return;
                        var t = e.RTCPeerConnection.prototype.getStats;
                        e.RTCPeerConnection.prototype.getStats = function(e, r, n) {
                            var i = this,
                            a = arguments;
                            if (arguments.length > 0 && "function" === typeof e) return t.apply(this, arguments);
                            if (0 === t.length && (0 === arguments.length || "function" !== typeof arguments[0])) return t.apply(this, []);
                            var o = function(e) {
                                var t = {},
                                r = e.result();
                                return r.forEach(function(e) {
                                    var r = {
                                        id: e.id,
                                        timestamp: e.timestamp,
                                        type: {
                                            localcandidate: "local-candidate",
                                            remotecandidate: "remote-candidate"
                                        } [e.type] || e.type
                                    };
                                    e.names().forEach(function(t) {
                                        r[t] = e.stat(t)
                                    }),
                                    t[r.id] = r
                                }),
                                t
                            },
                            s = function(e) {
                                return new Map(Object.keys(e).map(function(t) {
                                    return [t, e[t]]
                                }))
                            };
                            if (arguments.length >= 2) {
                                return t.apply(this, [function(e) {
                                    a[1](s(o(e)))
                                },
                                arguments[0]])
                            }
                            return new Promise(function(e, r) {
                                t.apply(i, [function(t) {
                                    e(s(o(t)))
                                },
                                r])
                            }).then(r, n)
                        },
                        ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                            var r = e.RTCPeerConnection.prototype[t];
                            e.RTCPeerConnection.prototype[t] = function() {
                                return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                                r.apply(this, arguments)
                            }
                        });
                        var r = e.RTCPeerConnection.prototype.addIceCandidate;
                        e.RTCPeerConnection.prototype.addIceCandidate = function() {
                            return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                        }
                    },
                    r.fixNegotiationNeeded = function(e) {
                        o.wrapPeerConnectionEvent(e, "negotiationneeded",
                        function(e) {
                            var t = e.target;
                            if ("stable" === t.signalingState) return e
                        })
                    };
                    var o = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("../utils.js"));

                    function s(e, t, r) {
                        var n = r ? "outbound-rtp": "inbound-rtp",
                        i = new Map;
                        if (null === t) return i;
                        var a = [];
                        return e.forEach(function(e) {
                            "track" === e.type && e.trackIdentifier === t.id && a.push(e)
                        }),
                        a.forEach(function(t) {
                            e.forEach(function(r) {
                                r.type === n && r.trackId === t.id &&
                                function e(t, r, n) {
                                    r && !n.has(r.id) && (n.set(r.id, r), Object.keys(r).forEach(function(i) {
                                        i.endsWith("Id") ? e(t, t.get(r[i]), n) : i.endsWith("Ids") && r[i].forEach(function(r) {
                                            e(t, t.get(r), n)
                                        })
                                    }))
                                } (e, r, i)
                            })
                        }),
                        i
                    }

                    function c(e) {
                        e.RTCPeerConnection.prototype.getLocalStreams = function() {
                            var e = this;
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                            Object.keys(this._shimmedLocalStreams).map(function(t) {
                                return e._shimmedLocalStreams[t][0]
                            })
                        };
                        var t = e.RTCPeerConnection.prototype.addTrack;
                        e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                            if (!r) return t.apply(this, arguments);
                            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
                            var n = t.apply(this, arguments);
                            return this._shimmedLocalStreams[r.id] ? -1 === this._shimmedLocalStreams[r.id].indexOf(n) && this._shimmedLocalStreams[r.id].push(n) : this._shimmedLocalStreams[r.id] = [r, n],
                            n
                        };
                        var r = e.RTCPeerConnection.prototype.addStream;
                        e.RTCPeerConnection.prototype.addStream = function(e) {
                            var t = this;
                            this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                            e.getTracks().forEach(function(e) {
                                if (t.getSenders().find(function(t) {
                                    return t.track === e
                                })) throw new DOMException("Track already exists.", "InvalidAccessError")
                            });
                            var n = this.getSenders();
                            r.apply(this, arguments);
                            var i = this.getSenders().filter(function(e) {
                                return - 1 === n.indexOf(e)
                            });
                            this._shimmedLocalStreams[e.id] = [e].concat(i)
                        };
                        var n = e.RTCPeerConnection.prototype.removeStream;
                        e.RTCPeerConnection.prototype.removeStream = function(e) {
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                            delete this._shimmedLocalStreams[e.id],
                            n.apply(this, arguments)
                        };
                        var i = e.RTCPeerConnection.prototype.removeTrack;
                        e.RTCPeerConnection.prototype.removeTrack = function(e) {
                            var t = this;
                            return this._shimmedLocalStreams = this._shimmedLocalStreams || {},
                            e && Object.keys(this._shimmedLocalStreams).forEach(function(r) {
                                var n = t._shimmedLocalStreams[r].indexOf(e); - 1 !== n && t._shimmedLocalStreams[r].splice(n, 1),
                                1 === t._shimmedLocalStreams[r].length && delete t._shimmedLocalStreams[r]
                            }),
                            i.apply(this, arguments)
                        }
                    }
                },
                {
                    "../utils.js": 11,
                    "./getdisplaymedia": 4,
                    "./getusermedia": 5
                }],
                4 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.shimGetDisplayMedia = function(e, t) {
                        if (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices) return;
                        if (!e.navigator.mediaDevices) return;
                        if ("function" !== typeof t) return void console.error("shimGetDisplayMedia: getSourceId argument is not a function");
                        e.navigator.mediaDevices.getDisplayMedia = function(r) {
                            return t(r).then(function(t) {
                                var n = r.video && r.video.width,
                                i = r.video && r.video.height,
                                a = r.video && r.video.frameRate;
                                return r.video = {
                                    mandatory: {
                                        chromeMediaSource: "desktop",
                                        chromeMediaSourceId: t,
                                        maxFrameRate: a || 3
                                    }
                                },
                                n && (r.video.mandatory.maxWidth = n),
                                i && (r.video.mandatory.maxHeight = i),
                                e.navigator.mediaDevices.getUserMedia(r)
                            })
                        }
                    }
                },
                {}],
                5 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    };
                    r.shimGetUserMedia = function(e) {
                        var t = e && e.navigator;
                        if (!t.mediaDevices) return;
                        var r = i.detectBrowser(e),
                        o = function(e) {
                            if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || e.mandatory || e.optional) return e;
                            var t = {};
                            return Object.keys(e).forEach(function(r) {
                                if ("require" !== r && "advanced" !== r && "mediaSource" !== r) {
                                    var i = "object" === n(e[r]) ? e[r] : {
                                        ideal: e[r]
                                    };
                                    void 0 !== i.exact && "number" === typeof i.exact && (i.min = i.max = i.exact);
                                    var a = function(e, t) {
                                        return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId": t
                                    };
                                    if (void 0 !== i.ideal) {
                                        t.optional = t.optional || [];
                                        var o = {};
                                        "number" === typeof i.ideal ? (o[a("min", r)] = i.ideal, t.optional.push(o), (o = {})[a("max", r)] = i.ideal, t.optional.push(o)) : (o[a("", r)] = i.ideal, t.optional.push(o))
                                    }
                                    void 0 !== i.exact && "number" !== typeof i.exact ? (t.mandatory = t.mandatory || {},
                                    t.mandatory[a("", r)] = i.exact) : ["min", "max"].forEach(function(e) {
                                        void 0 !== i[e] && (t.mandatory = t.mandatory || {},
                                        t.mandatory[a(e, r)] = i[e])
                                    })
                                }
                            }),
                            e.advanced && (t.optional = (t.optional || []).concat(e.advanced)),
                            t
                        },
                        s = function(e, i) {
                            if (r.version >= 61) return i(e);
                            if ((e = JSON.parse(JSON.stringify(e))) && "object" === n(e.audio)) {
                                var s = function(e, t, r) {
                                    t in e && !(r in e) && (e[r] = e[t], delete e[t])
                                };
                                e = JSON.parse(JSON.stringify(e)),
                                s(e.audio, "autoGainControl", "googAutoGainControl"),
                                s(e.audio, "noiseSuppression", "googNoiseSuppression"),
                                e.audio = o(e.audio)
                            }
                            if (e && "object" === n(e.video)) {
                                var c = e.video.facingMode;
                                c = c && ("object" === ("undefined" === typeof c ? "undefined": n(c)) ? c: {
                                    ideal: c
                                });
                                var u = r.version < 66;
                                if (c && ("user" === c.exact || "environment" === c.exact || "user" === c.ideal || "environment" === c.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || u)) {
                                    delete e.video.facingMode;
                                    var d = void 0;
                                    if ("environment" === c.exact || "environment" === c.ideal ? d = ["back", "rear"] : "user" !== c.exact && "user" !== c.ideal || (d = ["front"]), d) return t.mediaDevices.enumerateDevices().then(function(t) {
                                        var r = (t = t.filter(function(e) {
                                            return "videoinput" === e.kind
                                        })).find(function(e) {
                                            return d.some(function(t) {
                                                return e.label.toLowerCase().includes(t)
                                            })
                                        });
                                        return ! r && t.length && d.includes("back") && (r = t[t.length - 1]),
                                        r && (e.video.deviceId = c.exact ? {
                                            exact: r.deviceId
                                        }: {
                                            ideal: r.deviceId
                                        }),
                                        e.video = o(e.video),
                                        a("chrome: " + JSON.stringify(e)),
                                        i(e)
                                    })
                                }
                                e.video = o(e.video)
                            }
                            return a("chrome: " + JSON.stringify(e)),
                            i(e)
                        },
                        c = function(e) {
                            return r.version >= 64 ? e: {
                                name: {
                                    PermissionDeniedError: "NotAllowedError",
                                    PermissionDismissedError: "NotAllowedError",
                                    InvalidStateError: "NotAllowedError",
                                    DevicesNotFoundError: "NotFoundError",
                                    ConstraintNotSatisfiedError: "OverconstrainedError",
                                    TrackStartError: "NotReadableError",
                                    MediaDeviceFailedDueToShutdown: "NotAllowedError",
                                    MediaDeviceKillSwitchOn: "NotAllowedError",
                                    TabCaptureError: "AbortError",
                                    ScreenCaptureError: "AbortError",
                                    DeviceCaptureError: "AbortError"
                                } [e.name] || e.name,
                                message: e.message,
                                constraint: e.constraint || e.constraintName,
                                toString: function() {
                                    return this.name + (this.message && ": ") + this.message
                                }
                            }
                        };
                        t.getUserMedia = function(e, r, n) {
                            s(e,
                            function(e) {
                                t.webkitGetUserMedia(e, r,
                                function(e) {
                                    n && n(c(e))
                                })
                            })
                        }.bind(t);
                        var u = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
                        t.mediaDevices.getUserMedia = function(e) {
                            return s(e,
                            function(e) {
                                return u(e).then(function(t) {
                                    if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(function(e) {
                                        e.stop()
                                    }),
                                    new DOMException("", "NotFoundError");
                                    return t
                                },
                                function(e) {
                                    return Promise.reject(c(e))
                                })
                            })
                        }
                    };
                    var i = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("../utils.js"));
                    var a = i.log
                },
                {
                    "../utils.js": 11
                }],
                6 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    };
                    r.shimRTCIceCandidate = function(e) {
                        if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return;
                        var t = e.RTCIceCandidate;
                        e.RTCIceCandidate = function(e) {
                            if ("object" === ("undefined" === typeof e ? "undefined": n(e)) && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                                var r = new t(e),
                                i = o.
                            default.parseCandidate(e.candidate),
                                a = Object.assign(r, i);
                                return a.toJSON = function() {
                                    return {
                                        candidate: a.candidate,
                                        sdpMid: a.sdpMid,
                                        sdpMLineIndex: a.sdpMLineIndex,
                                        usernameFragment: a.usernameFragment
                                    }
                                },
                                a
                            }
                            return new t(e)
                        },
                        e.RTCIceCandidate.prototype = t.prototype,
                        s.wrapPeerConnectionEvent(e, "icecandidate",
                        function(t) {
                            return t.candidate && Object.defineProperty(t, "candidate", {
                                value: new e.RTCIceCandidate(t.candidate),
                                writable: "false"
                            }),
                            t
                        })
                    },
                    r.shimMaxMessageSize = function(e) {
                        if (e.RTCSctpTransport || !e.RTCPeerConnection) return;
                        var t = s.detectBrowser(e);
                        "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
                            get: function() {
                                return "undefined" === typeof this._sctp ? null: this._sctp
                            }
                        });
                        var r = e.RTCPeerConnection.prototype.setRemoteDescription;
                        e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                            if (this._sctp = null,
                            function(e) {
                                var t = o.
                            default.splitSections(e.sdp);
                                return t.shift(),
                                t.some(function(e) {
                                    var t = o.
                                default.parseMLine(e);
                                    return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
                                })
                            } (arguments[0])) {
                                var e = function(e) {
                                    var t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                                    if (null === t || t.length < 2) return - 1;
                                    var r = parseInt(t[1], 10);
                                    return r !== r ? -1 : r
                                } (arguments[0]),
                                n = function(e) {
                                    var r = 65536;
                                    "firefox" === t.browser && (r = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637);
                                    return r
                                } (e),
                                i = function(e, r) {
                                    var n = 65536;
                                    "firefox" === t.browser && 57 === t.version && (n = 65535);
                                    var i = o.
                                default.matchPrefix(e.sdp, "a=max-message-size:");
                                    i.length > 0 ? n = parseInt(i[0].substr(19), 10) : "firefox" === t.browser && -1 !== r && (n = 2147483637);
                                    return n
                                } (arguments[0], e),
                                a = void 0;
                                a = 0 === n && 0 === i ? Number.POSITIVE_INFINITY: 0 === n || 0 === i ? Math.max(n, i) : Math.min(n, i);
                                var s = {};
                                Object.defineProperty(s, "maxMessageSize", {
                                    get: function() {
                                        return a
                                    }
                                }),
                                this._sctp = s
                            }
                            return r.apply(this, arguments)
                        }
                    },
                    r.shimSendThrowTypeError = function(e) {
                        if (! (e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype)) return;

                        function t(e, t) {
                            var r = e.send;
                            e.send = function() {
                                var n = arguments[0],
                                i = n.length || n.size || n.byteLength;
                                if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                                return r.apply(e, arguments)
                            }
                        }
                        var r = e.RTCPeerConnection.prototype.createDataChannel;
                        e.RTCPeerConnection.prototype.createDataChannel = function() {
                            var e = r.apply(this, arguments);
                            return t(e, this),
                            e
                        },
                        s.wrapPeerConnectionEvent(e, "datachannel",
                        function(e) {
                            return t(e.channel, e.target),
                            e
                        })
                    },
                    r.shimConnectionState = function(e) {
                        if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return;
                        var t = e.RTCPeerConnection.prototype;
                        Object.defineProperty(t, "connectionState", {
                            get: function() {
                                return {
                                    completed: "connected",
                                    checking: "connecting"
                                } [this.iceConnectionState] || this.iceConnectionState
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        Object.defineProperty(t, "onconnectionstatechange", {
                            get: function() {
                                return this._onconnectionstatechange || null
                            },
                            set: function(e) {
                                this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange),
                                e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e)
                            },
                            enumerable: !0,
                            configurable: !0
                        }),
                        ["setLocalDescription", "setRemoteDescription"].forEach(function(e) {
                            var r = t[e];
                            t[e] = function() {
                                return this._connectionstatechangepoly || (this._connectionstatechangepoly = function(e) {
                                    var t = e.target;
                                    if (t._lastConnectionState !== t.connectionState) {
                                        t._lastConnectionState = t.connectionState;
                                        var r = new Event("connectionstatechange", e);
                                        t.dispatchEvent(r)
                                    }
                                    return e
                                },
                                this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)),
                                r.apply(this, arguments)
                            }
                        })
                    },
                    r.removeAllowExtmapMixed = function(e) {
                        if (!e.RTCPeerConnection) return;
                        var t = s.detectBrowser(e);
                        if ("chrome" === t.browser && t.version >= 71) return;
                        var r = e.RTCPeerConnection.prototype.setRemoteDescription;
                        e.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
                            return e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(function(e) {
                                return "a=extmap-allow-mixed" !== e.trim()
                            }).join("\n")),
                            r.apply(this, arguments)
                        }
                    };
                    var i, a = e("sdp"),
                    o = (i = a) && i.__esModule ? i: {
                    default:
                        i
                    },
                    s = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("./utils"))
                },
                {
                    "./utils": 11,
                    sdp: 13
                }],
                7 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.shimGetDisplayMedia = r.shimGetUserMedia = void 0;
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    },
                    i = e("./getusermedia");
                    Object.defineProperty(r, "shimGetUserMedia", {
                        enumerable: !0,
                        get: function() {
                            return i.shimGetUserMedia
                        }
                    });
                    var a = e("./getdisplaymedia");
                    Object.defineProperty(r, "shimGetDisplayMedia", {
                        enumerable: !0,
                        get: function() {
                            return a.shimGetDisplayMedia
                        }
                    }),
                    r.shimOnTrack = function(e) {
                        "object" === ("undefined" === typeof e ? "undefined": n(e)) && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                            get: function() {
                                return {
                                    receiver: this.receiver
                                }
                            }
                        })
                    },
                    r.shimPeerConnection = function(e) {
                        var t = o.detectBrowser(e);
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection && !e.mozRTCPeerConnection) return; ! e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection); ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
                            var r = e.RTCPeerConnection.prototype[t];
                            e.RTCPeerConnection.prototype[t] = function() {
                                return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate: e.RTCSessionDescription)(arguments[0]),
                                r.apply(this, arguments)
                            }
                        });
                        var r = e.RTCPeerConnection.prototype.addIceCandidate;
                        e.RTCPeerConnection.prototype.addIceCandidate = function() {
                            return arguments[0] ? r.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
                        };
                        var i = {
                            inboundrtp: "inbound-rtp",
                            outboundrtp: "outbound-rtp",
                            candidatepair: "candidate-pair",
                            localcandidate: "local-candidate",
                            remotecandidate: "remote-candidate"
                        },
                        a = e.RTCPeerConnection.prototype.getStats;
                        e.RTCPeerConnection.prototype.getStats = function(e, r, n) {
                            return a.apply(this, [e || null]).then(function(e) {
                                if (t.version < 53 && !r) try {
                                    e.forEach(function(e) {
                                        e.type = i[e.type] || e.type
                                    })
                                } catch(n) {
                                    if ("TypeError" !== n.name) throw n;
                                    e.forEach(function(t, r) {
                                        e.set(r, Object.assign({},
                                        t, {
                                            type: i[t.type] || t.type
                                        }))
                                    })
                                }
                                return e
                            }).then(r, n)
                        }
                    },
                    r.shimSenderGetStats = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection || !e.RTCRtpSender) return;
                        if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
                        var t = e.RTCPeerConnection.prototype.getSenders;
                        t && (e.RTCPeerConnection.prototype.getSenders = function() {
                            var e = this,
                            r = t.apply(this, []);
                            return r.forEach(function(t) {
                                return t._pc = e
                            }),
                            r
                        });
                        var r = e.RTCPeerConnection.prototype.addTrack;
                        r && (e.RTCPeerConnection.prototype.addTrack = function() {
                            var e = r.apply(this, arguments);
                            return e._pc = this,
                            e
                        });
                        e.RTCRtpSender.prototype.getStats = function() {
                            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map)
                        }
                    },
                    r.shimReceiverGetStats = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection || !e.RTCRtpSender) return;
                        if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
                        var t = e.RTCPeerConnection.prototype.getReceivers;
                        t && (e.RTCPeerConnection.prototype.getReceivers = function() {
                            var e = this,
                            r = t.apply(this, []);
                            return r.forEach(function(t) {
                                return t._pc = e
                            }),
                            r
                        });
                        o.wrapPeerConnectionEvent(e, "track",
                        function(e) {
                            return e.receiver._pc = e.srcElement,
                            e
                        }),
                        e.RTCRtpReceiver.prototype.getStats = function() {
                            return this._pc.getStats(this.track)
                        }
                    },
                    r.shimRemoveStream = function(e) {
                        if (!e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype) return;
                        e.RTCPeerConnection.prototype.removeStream = function(e) {
                            var t = this;
                            o.deprecated("removeStream", "removeTrack"),
                            this.getSenders().forEach(function(r) {
                                r.track && e.getTracks().includes(r.track) && t.removeTrack(r)
                            })
                        }
                    },
                    r.shimRTCDataChannel = function(e) {
                        e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
                    };
                    var o = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("../utils"))
                },
                {
                    "../utils": 11,
                    "./getdisplaymedia": 8,
                    "./getusermedia": 9
                }],
                8 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    }),
                    r.shimGetDisplayMedia = function(e, t) {
                        if (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices) return;
                        if (!e.navigator.mediaDevices) return;
                        e.navigator.mediaDevices.getDisplayMedia = function(r) {
                            if (!r || !r.video) {
                                var n = new DOMException("getDisplayMedia without video constraints is undefined");
                                return n.name = "NotFoundError",
                                n.code = 8,
                                Promise.reject(n)
                            }
                            return ! 0 === r.video ? r.video = {
                                mediaSource: t
                            }: r.video.mediaSource = t,
                            e.navigator.mediaDevices.getUserMedia(r)
                        }
                    }
                },
                {}],
                9 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    };
                    r.shimGetUserMedia = function(e) {
                        var t = i.detectBrowser(e),
                        r = e && e.navigator,
                        a = e && e.MediaStreamTrack;
                        if (r.getUserMedia = function(e, t, n) {
                            i.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"),
                            r.mediaDevices.getUserMedia(e).then(t, n)
                        },
                        !(t.version > 55 && "autoGainControl" in r.mediaDevices.getSupportedConstraints())) {
                            var o = function(e, t, r) {
                                t in e && !(r in e) && (e[r] = e[t], delete e[t])
                            },
                            s = r.mediaDevices.getUserMedia.bind(r.mediaDevices);
                            if (r.mediaDevices.getUserMedia = function(e) {
                                return "object" === ("undefined" === typeof e ? "undefined": n(e)) && "object" === n(e.audio) && (e = JSON.parse(JSON.stringify(e)), o(e.audio, "autoGainControl", "mozAutoGainControl"), o(e.audio, "noiseSuppression", "mozNoiseSuppression")),
                                s(e)
                            },
                            a && a.prototype.getSettings) {
                                var c = a.prototype.getSettings;
                                a.prototype.getSettings = function() {
                                    var e = c.apply(this, arguments);
                                    return o(e, "mozAutoGainControl", "autoGainControl"),
                                    o(e, "mozNoiseSuppression", "noiseSuppression"),
                                    e
                                }
                            }
                            if (a && a.prototype.applyConstraints) {
                                var u = a.prototype.applyConstraints;
                                a.prototype.applyConstraints = function(e) {
                                    return "audio" === this.kind && "object" === ("undefined" === typeof e ? "undefined": n(e)) && (e = JSON.parse(JSON.stringify(e)), o(e, "autoGainControl", "mozAutoGainControl"), o(e, "noiseSuppression", "mozNoiseSuppression")),
                                    u.apply(this, [e])
                                }
                            }
                        }
                    };
                    var i = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("../utils"))
                },
                {
                    "../utils": 11
                }],
                10 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    };
                    r.shimLocalStreamsAPI = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection) return;
                        "getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                            return this._localStreams || (this._localStreams = []),
                            this._localStreams
                        });
                        if (! ("addStream" in e.RTCPeerConnection.prototype)) {
                            var t = e.RTCPeerConnection.prototype.addTrack;
                            e.RTCPeerConnection.prototype.addStream = function(e) {
                                var r = this;
                                this._localStreams || (this._localStreams = []),
                                this._localStreams.includes(e) || this._localStreams.push(e),
                                e.getTracks().forEach(function(n) {
                                    return t.call(r, n, e)
                                })
                            },
                            e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                                return r && (this._localStreams ? this._localStreams.includes(r) || this._localStreams.push(r) : this._localStreams = [r]),
                                t.call(this, e, r)
                            }
                        }
                        "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                            var t = this;
                            this._localStreams || (this._localStreams = []);
                            var r = this._localStreams.indexOf(e);
                            if ( - 1 !== r) {
                                this._localStreams.splice(r, 1);
                                var n = e.getTracks();
                                this.getSenders().forEach(function(e) {
                                    n.includes(e.track) && t.removeTrack(e)
                                })
                            }
                        })
                    },
                    r.shimRemoteStreamsAPI = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection) return;
                        "getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                            return this._remoteStreams ? this._remoteStreams: []
                        });
                        if (! ("onaddstream" in e.RTCPeerConnection.prototype)) {
                            Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                                get: function() {
                                    return this._onaddstream
                                },
                                set: function(e) {
                                    var t = this;
                                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)),
                                    this.addEventListener("addstream", this._onaddstream = e),
                                    this.addEventListener("track", this._onaddstreampoly = function(e) {
                                        e.streams.forEach(function(e) {
                                            if (t._remoteStreams || (t._remoteStreams = []), !t._remoteStreams.includes(e)) {
                                                t._remoteStreams.push(e);
                                                var r = new Event("addstream");
                                                r.stream = e,
                                                t.dispatchEvent(r)
                                            }
                                        })
                                    })
                                }
                            });
                            var t = e.RTCPeerConnection.prototype.setRemoteDescription;
                            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                                var e = this;
                                return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t) {
                                    t.streams.forEach(function(t) {
                                        if (e._remoteStreams || (e._remoteStreams = []), !(e._remoteStreams.indexOf(t) >= 0)) {
                                            e._remoteStreams.push(t);
                                            var r = new Event("addstream");
                                            r.stream = t,
                                            e.dispatchEvent(r)
                                        }
                                    })
                                }),
                                t.apply(e, arguments)
                            }
                        }
                    },
                    r.shimCallbacksAPI = function(e) {
                        if ("object" !== ("undefined" === typeof e ? "undefined": n(e)) || !e.RTCPeerConnection) return;
                        var t = e.RTCPeerConnection.prototype,
                        r = t.createOffer,
                        i = t.createAnswer,
                        a = t.setLocalDescription,
                        o = t.setRemoteDescription,
                        s = t.addIceCandidate;
                        t.createOffer = function(e, t) {
                            var n = arguments.length >= 2 ? arguments[2] : arguments[0],
                            i = r.apply(this, [n]);
                            return t ? (i.then(e, t), Promise.resolve()) : i
                        },
                        t.createAnswer = function(e, t) {
                            var r = arguments.length >= 2 ? arguments[2] : arguments[0],
                            n = i.apply(this, [r]);
                            return t ? (n.then(e, t), Promise.resolve()) : n
                        };
                        var c = function(e, t, r) {
                            var n = a.apply(this, [e]);
                            return r ? (n.then(t, r), Promise.resolve()) : n
                        };
                        t.setLocalDescription = c,
                        c = function(e, t, r) {
                            var n = o.apply(this, [e]);
                            return r ? (n.then(t, r), Promise.resolve()) : n
                        },
                        t.setRemoteDescription = c,
                        c = function(e, t, r) {
                            var n = s.apply(this, [e]);
                            return r ? (n.then(t, r), Promise.resolve()) : n
                        },
                        t.addIceCandidate = c
                    },
                    r.shimGetUserMedia = function(e) {
                        var t = e && e.navigator;
                        if (t.mediaDevices && t.mediaDevices.getUserMedia) {
                            var r = t.mediaDevices,
                            n = r.getUserMedia.bind(r);
                            t.mediaDevices.getUserMedia = function(e) {
                                return n(a(e))
                            }
                        } ! t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, r, n) {
                            t.mediaDevices.getUserMedia(e).then(r, n)
                        }.bind(t))
                    },
                    r.shimConstraints = a,
                    r.shimRTCIceServerUrls = function(e) {
                        var t = e.RTCPeerConnection;
                        e.RTCPeerConnection = function(e, r) {
                            if (e && e.iceServers) {
                                for (var n = [], a = 0; a < e.iceServers.length; a++) {
                                    var o = e.iceServers[a]; ! o.hasOwnProperty("urls") && o.hasOwnProperty("url") ? (i.deprecated("RTCIceServer.url", "RTCIceServer.urls"), (o = JSON.parse(JSON.stringify(o))).urls = o.url, delete o.url, n.push(o)) : n.push(e.iceServers[a])
                                }
                                e.iceServers = n
                            }
                            return new t(e, r)
                        },
                        e.RTCPeerConnection.prototype = t.prototype,
                        "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
                            get: function() {
                                return t.generateCertificate
                            }
                        })
                    },
                    r.shimTrackEventTransceiver = function(e) {
                        "object" === ("undefined" === typeof e ? "undefined": n(e)) && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
                            get: function() {
                                return {
                                    receiver: this.receiver
                                }
                            }
                        })
                    },
                    r.shimCreateOfferLegacy = function(e) {
                        var t = e.RTCPeerConnection.prototype.createOffer;
                        e.RTCPeerConnection.prototype.createOffer = function(e) {
                            if (e) {
                                "undefined" !== typeof e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                                var r = this.getTransceivers().find(function(e) {
                                    return e.sender.track && "audio" === e.sender.track.kind
                                }); ! 1 === e.offerToReceiveAudio && r ? "sendrecv" === r.direction ? r.setDirection ? r.setDirection("sendonly") : r.direction = "sendonly": "recvonly" === r.direction && (r.setDirection ? r.setDirection("inactive") : r.direction = "inactive") : !0 !== e.offerToReceiveAudio || r || this.addTransceiver("audio"),
                                "undefined" !== typeof e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                                var n = this.getTransceivers().find(function(e) {
                                    return e.sender.track && "video" === e.sender.track.kind
                                }); ! 1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction = "sendonly": "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction = "inactive") : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video")
                            }
                            return t.apply(this, arguments)
                        }
                    };
                    var i = function(e) {
                        if (e && e.__esModule) return e;
                        var t = {};
                        if (null != e) for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
                        return t.
                    default = e,
                        t
                    } (e("../utils"));

                    function a(e) {
                        return e && void 0 !== e.video ? Object.assign({},
                        e, {
                            video: i.compactObject(e.video)
                        }) : e
                    }
                },
                {
                    "../utils": 11
                }],
                11 : [function(e, t, r) {
                    Object.defineProperty(r, "__esModule", {
                        value: !0
                    });
                    var n = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ?
                    function(e) {
                        return typeof e
                    }: function(e) {
                        return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
                    };
                    r.extractVersion = o,
                    r.wrapPeerConnectionEvent = function(e, t, r) {
                        if (!e.RTCPeerConnection) return;
                        var n = e.RTCPeerConnection.prototype,
                        i = n.addEventListener;
                        n.addEventListener = function(e, n) {
                            if (e !== t) return i.apply(this, arguments);
                            var a = function(e) {
                                var t = r(e);
                                t && n(t)
                            };
                            return this._eventMap = this._eventMap || {},
                            this._eventMap[n] = a,
                            i.apply(this, [e, a])
                        };
                        var a = n.removeEventListener;
                        n.removeEventListener = function(e, r) {
                            if (e !== t || !this._eventMap || !this._eventMap[r]) return a.apply(this, arguments);
                            var n = this._eventMap[r];
                            return delete this._eventMap[r],
                            a.apply(this, [e, n])
                        },
                        Object.defineProperty(n, "on" + t, {
                            get: function() {
                                return this["_on" + t]
                            },
                            set: function(e) {
                                this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]),
                                e && this.addEventListener(t, this["_on" + t] = e)
                            },
                            enumerable: !0,
                            configurable: !0
                        })
                    },
                    r.disableLog = function(e) {
                        if ("boolean" !== typeof e) return new Error("Argument type: " + ("undefined" === typeof e ? "undefined": n(e)) + ". Please use a boolean.");
                        return i = e,
                        e ? "adapter.js logging disabled": "adapter.js logging enabled"
                    },
                    r.disableWarnings = function(e) {
                        if ("boolean" !== typeof e) return new Error("Argument type: " + ("undefined" === typeof e ? "undefined": n(e)) + ". Please use a boolean.");
                        return a = !e,
                        "adapter.js deprecation warnings " + (e ? "disabled": "enabled")
                    },
                    r.log = function() {
                        if ("object" === ("undefined" === typeof window ? "undefined": n(window))) {
                            if (i) return;
                            "undefined" !== typeof console && "function" === typeof console.log && console.log.apply(console, arguments)
                        }
                    },
                    r.deprecated = function(e, t) {
                        if (!a) return;
                        console.warn(e + " is deprecated, please use " + t + " instead.")
                    },
                    r.detectBrowser = function(e) {
                        var t = e.navigator,
                        r = {
                            browser: null,
                            version: null
                        };
                        if ("undefined" === typeof e || !e.navigator) return r.browser = "Not a browser.",
                        r;
                        if (t.mozGetUserMedia) r.browser = "firefox",
                        r.version = o(t.userAgent, /Firefox\/(\d+)\./, 1);
                        else if (t.webkitGetUserMedia) r.browser = "chrome",
                        r.version = o(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
                        else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) r.browser = "edge",
                        r.version = o(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
                        else {
                            if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return r.browser = "Not a supported browser.",
                            r;
                            r.browser = "safari",
                            r.version = o(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
                        }
                        return r
                    },
                    r.compactObject = function e(t) {
                        if ("object" !== ("undefined" === typeof t ? "undefined": n(t))) return t;
                        return Object.keys(t).reduce(function(r, i) {
                            var a = "object" === n(t[i]),
                            o = a ? e(t[i]) : t[i],
                            s = a && !Object.keys(o).length;
                            return void 0 === o || s ? r: Object.assign(r,
                            function(e, t, r) {
                                t in e ? Object.defineProperty(e, t, {
                                    value: r,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = r;
                                return e
                            } ({},
                            i, o))
                        },
                        {})
                    };
                    var i = !0,
                    a = !0;

                    function o(e, t, r) {
                        var n = e.match(t);
                        return n && n.length >= r && parseInt(n[r], 10)
                    }
                },
                {}],
                12 : [function(e, t, r) {},
                {}],
                13 : [function(e, t, r) {
                    var n = {
                        generateIdentifier: function() {
                            return Math.random().toString(36).substr(2, 10)
                        }
                    };
                    n.localCName = n.generateIdentifier(),
                    n.splitLines = function(e) {
                        return e.trim().split("\n").map(function(e) {
                            return e.trim()
                        })
                    },
                    n.splitSections = function(e) {
                        return e.split("\nm=").map(function(e, t) {
                            return (t > 0 ? "m=" + e: e).trim() + "\r\n"
                        })
                    },
                    n.getDescription = function(e) {
                        var t = n.splitSections(e);
                        return t && t[0]
                    },
                    n.getMediaSections = function(e) {
                        var t = n.splitSections(e);
                        return t.shift(),
                        t
                    },
                    n.matchPrefix = function(e, t) {
                        return n.splitLines(e).filter(function(e) {
                            return 0 === e.indexOf(t)
                        })
                    },
                    n.parseCandidate = function(e) {
                        for (var t, r = {
                            foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
                            component: parseInt(t[1], 10),
                            protocol: t[2].toLowerCase(),
                            priority: parseInt(t[3], 10),
                            ip: t[4],
                            address: t[4],
                            port: parseInt(t[5], 10),
                            type: t[7]
                        },
                        n = 8; n < t.length; n += 2) switch (t[n]) {
                        case "raddr":
                            r.relatedAddress = t[n + 1];
                            break;
                        case "rport":
                            r.relatedPort = parseInt(t[n + 1], 10);
                            break;
                        case "tcptype":
                            r.tcpType = t[n + 1];
                            break;
                        case "ufrag":
                            r.ufrag = t[n + 1],
                            r.usernameFragment = t[n + 1];
                            break;
                        default:
                            r[t[n]] = t[n + 1]
                        }
                        return r
                    },
                    n.writeCandidate = function(e) {
                        var t = [];
                        t.push(e.foundation),
                        t.push(e.component),
                        t.push(e.protocol.toUpperCase()),
                        t.push(e.priority),
                        t.push(e.address || e.ip),
                        t.push(e.port);
                        var r = e.type;
                        return t.push("typ"),
                        t.push(r),
                        "host" !== r && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)),
                        e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)),
                        (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)),
                        "candidate:" + t.join(" ")
                    },
                    n.parseIceOptions = function(e) {
                        return e.substr(14).split(" ")
                    },
                    n.parseRtpMap = function(e) {
                        var t = e.substr(9).split(" "),
                        r = {
                            payloadType: parseInt(t.shift(), 10)
                        };
                        return t = t[0].split("/"),
                        r.name = t[0],
                        r.clockRate = parseInt(t[1], 10),
                        r.channels = 3 === t.length ? parseInt(t[2], 10) : 1,
                        r.numChannels = r.channels,
                        r
                    },
                    n.writeRtpMap = function(e) {
                        var t = e.payloadType;
                        void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
                        var r = e.channels || e.numChannels || 1;
                        return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== r ? "/" + r: "") + "\r\n"
                    },
                    n.parseExtmap = function(e) {
                        var t = e.substr(9).split(" ");
                        return {
                            id: parseInt(t[0], 10),
                            direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
                            uri: t[1]
                        }
                    },
                    n.writeExtmap = function(e) {
                        return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction: "") + " " + e.uri + "\r\n"
                    },
                    n.parseFmtp = function(e) {
                        for (var t, r = {},
                        n = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < n.length; i++) r[(t = n[i].trim().split("="))[0].trim()] = t[1];
                        return r
                    },
                    n.writeFmtp = function(e) {
                        var t = "",
                        r = e.payloadType;
                        if (void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
                            var n = [];
                            Object.keys(e.parameters).forEach(function(t) {
                                e.parameters[t] ? n.push(t + "=" + e.parameters[t]) : n.push(t)
                            }),
                            t += "a=fmtp:" + r + " " + n.join(";") + "\r\n"
                        }
                        return t
                    },
                    n.parseRtcpFb = function(e) {
                        var t = e.substr(e.indexOf(" ") + 1).split(" ");
                        return {
                            type: t.shift(),
                            parameter: t.join(" ")
                        }
                    },
                    n.writeRtcpFb = function(e) {
                        var t = "",
                        r = e.payloadType;
                        return void 0 !== e.preferredPayloadType && (r = e.preferredPayloadType),
                        e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
                            t += "a=rtcp-fb:" + r + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter: "") + "\r\n"
                        }),
                        t
                    },
                    n.parseSsrcMedia = function(e) {
                        var t = e.indexOf(" "),
                        r = {
                            ssrc: parseInt(e.substr(7, t - 7), 10)
                        },
                        n = e.indexOf(":", t);
                        return n > -1 ? (r.attribute = e.substr(t + 1, n - t - 1), r.value = e.substr(n + 1)) : r.attribute = e.substr(t + 1),
                        r
                    },
                    n.parseSsrcGroup = function(e) {
                        var t = e.substr(13).split(" ");
                        return {
                            semantics: t.shift(),
                            ssrcs: t.map(function(e) {
                                return parseInt(e, 10)
                            })
                        }
                    },
                    n.getMid = function(e) {
                        var t = n.matchPrefix(e, "a=mid:")[0];
                        if (t) return t.substr(6)
                    },
                    n.parseFingerprint = function(e) {
                        var t = e.substr(14).split(" ");
                        return {
                            algorithm: t[0].toLowerCase(),
                            value: t[1]
                        }
                    },
                    n.getDtlsParameters = function(e, t) {
                        return {
                            role: "auto",
                            fingerprints: n.matchPrefix(e + t, "a=fingerprint:").map(n.parseFingerprint)
                        }
                    },
                    n.writeDtlsParameters = function(e, t) {
                        var r = "a=setup:" + t + "\r\n";
                        return e.fingerprints.forEach(function(e) {
                            r += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
                        }),
                        r
                    },
                    n.getIceParameters = function(e, t) {
                        var r = n.splitLines(e);
                        return {
                            usernameFragment: (r = r.concat(n.splitLines(t))).filter(function(e) {
                                return 0 === e.indexOf("a=ice-ufrag:")
                            })[0].substr(12),
                            password: r.filter(function(e) {
                                return 0 === e.indexOf("a=ice-pwd:")
                            })[0].substr(10)
                        }
                    },
                    n.writeIceParameters = function(e) {
                        return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
                    },
                    n.parseRtpParameters = function(e) {
                        for (var t = {
                            codecs: [],
                            headerExtensions: [],
                            fecMechanisms: [],
                            rtcp: []
                        },
                        r = n.splitLines(e)[0].split(" "), i = 3; i < r.length; i++) {
                            var a = r[i],
                            o = n.matchPrefix(e, "a=rtpmap:" + a + " ")[0];
                            if (o) {
                                var s = n.parseRtpMap(o),
                                c = n.matchPrefix(e, "a=fmtp:" + a + " ");
                                switch (s.parameters = c.length ? n.parseFmtp(c[0]) : {},
                                s.rtcpFeedback = n.matchPrefix(e, "a=rtcp-fb:" + a + " ").map(n.parseRtcpFb), t.codecs.push(s), s.name.toUpperCase()) {
                                case "RED":
                                case "ULPFEC":
                                    t.fecMechanisms.push(s.name.toUpperCase())
                                }
                            }
                        }
                        return n.matchPrefix(e, "a=extmap:").forEach(function(e) {
                            t.headerExtensions.push(n.parseExtmap(e))
                        }),
                        t
                    },
                    n.writeRtpDescription = function(e, t) {
                        var r = "";
                        r += "m=" + e + " ",
                        r += t.codecs.length > 0 ? "9": "0",
                        r += " UDP/TLS/RTP/SAVPF ",
                        r += t.codecs.map(function(e) {
                            return void 0 !== e.preferredPayloadType ? e.preferredPayloadType: e.payloadType
                        }).join(" ") + "\r\n",
                        r += "c=IN IP4 0.0.0.0\r\n",
                        r += "a=rtcp:9 IN IP4 0.0.0.0\r\n",
                        t.codecs.forEach(function(e) {
                            r += n.writeRtpMap(e),
                            r += n.writeFmtp(e),
                            r += n.writeRtcpFb(e)
                        });
                        var i = 0;
                        return t.codecs.forEach(function(e) {
                            e.maxptime > i && (i = e.maxptime)
                        }),
                        i > 0 && (r += "a=maxptime:" + i + "\r\n"),
                        r += "a=rtcp-mux\r\n",
                        t.headerExtensions && t.headerExtensions.forEach(function(e) {
                            r += n.writeExtmap(e)
                        }),
                        r
                    },
                    n.parseRtpEncodingParameters = function(e) {
                        var t, r = [],
                        i = n.parseRtpParameters(e),
                        a = -1 !== i.fecMechanisms.indexOf("RED"),
                        o = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
                        s = n.matchPrefix(e, "a=ssrc:").map(function(e) {
                            return n.parseSsrcMedia(e)
                        }).filter(function(e) {
                            return "cname" === e.attribute
                        }),
                        c = s.length > 0 && s[0].ssrc,
                        u = n.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
                            return e.substr(17).split(" ").map(function(e) {
                                return parseInt(e, 10)
                            })
                        });
                        u.length > 0 && u[0].length > 1 && u[0][0] === c && (t = u[0][1]),
                        i.codecs.forEach(function(e) {
                            if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                                var n = {
                                    ssrc: c,
                                    codecPayloadType: parseInt(e.parameters.apt, 10)
                                };
                                c && t && (n.rtx = {
                                    ssrc: t
                                }),
                                r.push(n),
                                a && ((n = JSON.parse(JSON.stringify(n))).fec = {
                                    ssrc: c,
                                    mechanism: o ? "red+ulpfec": "red"
                                },
                                r.push(n))
                            }
                        }),
                        0 === r.length && c && r.push({
                            ssrc: c
                        });
                        var d = n.matchPrefix(e, "b=");
                        return d.length && (d = 0 === d[0].indexOf("b=TIAS:") ? parseInt(d[0].substr(7), 10) : 0 === d[0].indexOf("b=AS:") ? 1e3 * parseInt(d[0].substr(5), 10) * .95 - 16e3: void 0, r.forEach(function(e) {
                            e.maxBitrate = d
                        })),
                        r
                    },
                    n.parseRtcpParameters = function(e) {
                        var t = {},
                        r = n.matchPrefix(e, "a=ssrc:").map(function(e) {
                            return n.parseSsrcMedia(e)
                        }).filter(function(e) {
                            return "cname" === e.attribute
                        })[0];
                        r && (t.cname = r.value, t.ssrc = r.ssrc);
                        var i = n.matchPrefix(e, "a=rtcp-rsize");
                        t.reducedSize = i.length > 0,
                        t.compound = 0 === i.length;
                        var a = n.matchPrefix(e, "a=rtcp-mux");
                        return t.mux = a.length > 0,
                        t
                    },
                    n.parseMsid = function(e) {
                        var t, r = n.matchPrefix(e, "a=msid:");
                        if (1 === r.length) return {
                            stream: (t = r[0].substr(7).split(" "))[0],
                            track: t[1]
                        };
                        var i = n.matchPrefix(e, "a=ssrc:").map(function(e) {
                            return n.parseSsrcMedia(e)
                        }).filter(function(e) {
                            return "msid" === e.attribute
                        });
                        return i.length > 0 ? {
                            stream: (t = i[0].value.split(" "))[0],
                            track: t[1]
                        }: void 0
                    },
                    n.generateSessionId = function() {
                        return Math.random().toString().substr(2, 21)
                    },
                    n.writeSessionBoilerplate = function(e, t, r) {
                        var i = void 0 !== t ? t: 2;
                        return "v=0\r\no=" + (r || "thisisadapterortc") + " " + (e || n.generateSessionId()) + " " + i + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
                    },
                    n.writeMediaSection = function(e, t, r, i) {
                        var a = n.writeRtpDescription(e.kind, t);
                        if (a += n.writeIceParameters(e.iceGatherer.getLocalParameters()), a += n.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass": "active"), a += "a=mid:" + e.mid + "\r\n", e.direction ? a += "a=" + e.direction + "\r\n": e.rtpSender && e.rtpReceiver ? a += "a=sendrecv\r\n": e.rtpSender ? a += "a=sendonly\r\n": e.rtpReceiver ? a += "a=recvonly\r\n": a += "a=inactive\r\n", e.rtpSender) {
                            var o = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                            a += "a=" + o,
                            a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + o,
                            e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + o, a += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
                        }
                        return a += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n",
                        e.rtpSender && e.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"),
                        a
                    },
                    n.getDirection = function(e, t) {
                        for (var r = n.splitLines(e), i = 0; i < r.length; i++) switch (r[i]) {
                        case "a=sendrecv":
                        case "a=sendonly":
                        case "a=recvonly":
                        case "a=inactive":
                            return r[i].substr(2)
                        }
                        return t ? n.getDirection(t) : "sendrecv"
                    },
                    n.getKind = function(e) {
                        return n.splitLines(e)[0].split(" ")[0].substr(2)
                    },
                    n.isRejected = function(e) {
                        return "0" === e.split(" ", 2)[1]
                    },
                    n.parseMLine = function(e) {
                        var t = n.splitLines(e)[0].substr(2).split(" ");
                        return {
                            kind: t[0],
                            port: parseInt(t[1], 10),
                            protocol: t[2],
                            fmt: t.slice(3).join(" ")
                        }
                    },
                    n.parseOLine = function(e) {
                        var t = n.matchPrefix(e, "o=")[0].substr(2).split(" ");
                        return {
                            username: t[0],
                            sessionId: t[1],
                            sessionVersion: parseInt(t[2], 10),
                            netType: t[3],
                            addressType: t[4],
                            address: t[5]
                        }
                    },
                    n.isValidSDP = function(e) {
                        if ("string" !== typeof e || 0 === e.length) return ! 1;
                        for (var t = n.splitLines(e), r = 0; r < t.length; r++) if (t[r].length < 2 || "=" !== t[r].charAt(1)) return ! 1;
                        return ! 0
                    },
                    "object" === typeof t && (t.exports = n)
                },
                {}]
            },
            {},
            [1])
        }); (R = E) && R.__esModule && Object.prototype.hasOwnProperty.call(R, "default") && R.
    default;
        var I, P, O = function(e) {
            return !! e && !!e.audio && e.audio.enabled
        },
        M = function(e) {
            return !! e && !!e.video && e.video.enabled
        },
        A = function(e) {
            return !! e && !!e.screen && e.screen.enabled
        }; (I = t.TrackConnectStatus || (t.TrackConnectStatus = {}))[I.Idle = 0] = "Idle",
        I[I.Connecting = 1] = "Connecting",
        I[I.Connect = 2] = "Connect",
        (P = t.TrackSourceType || (t.TrackSourceType = {}))[P.NORMAL = 0] = "NORMAL",
        P[P.EXTERNAL = 1] = "EXTERNAL",
        P[P.MIXING = 2] = "MIXING";
        var j, D = {
            publishUrl: "",
            height: 720,
            width: 1080,
            fps: 25,
            kbps: 1e3,
            audioOnly: !1,
            stretchMode: "aspectFill"
        }; (j = t.AudioSourceState || (t.AudioSourceState = {})).IDLE = "idle",
        j.LOADING = "loading",
        j.PLAY = "play",
        j.PAUSE = "pause",
        j.END = "end";
        var L = {
            Init: 1,
            UnInit: 2,
            JoinRoom: 3,
            MCSAuth: 4,
            SignalAuth: 5,
            LeaveRoom: 6,
            PublisherPC: 7,
            PublishTracks: 8,
            UnPublishTracks: 9,
            SubscriberPC: 10,
            SubscribeTracks: 11,
            UnSubscribeTracks: 13,
            MuteTracks: 14,
            ICEConnectionState: 15,
            CallbackStatistics: 16,
            KickoutUser: 17,
            RoomStateChanged: 18,
            AudioDeviceInOut: 19,
            VideoDeviceInOut: 20,
            SDKError: 21,
            ApplicationState: 22,
            CreateMergeJob: 24,
            UpdateMergeTracks: 25,
            StopMerge: 26,
            DeviceChanged: 28
        },
        N = "2.2.5";

        function U() {
            var e = new Date;

            function t(e) {
                var t = e.toString();
                return t.length < 2 ? "0" + t: t
            }
            var r = t(e.getHours()),
            n = t(e.getMinutes()),
            i = t(e.getSeconds()),
            a = e.getMilliseconds();
            return "[".concat(r, ":").concat(n, ":").concat(i, ".").concat(a, "]")
        }
        var F = new(function() {
            function e(t) {
                p(this, e),
                this.level = t
            }
            return l(e, [{
                key: "setLevel",
                value: function(e) {
                    this.level = e
                }
            },
            {
                key: "log",
                value: function() {
                    var e;
                    if ("log" === this.level) {
                        for (var t = "".concat(U(), " %cLOG-QNRTC"), r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i]; (e = console).info.apply(e, [t, "color: #66ccff; font-weight: bold;"].concat(n))
                    }
                }
            },
            {
                key: "debug",
                value: function() {
                    var e;
                    if ("log" === this.level || "debug" === this.level) {
                        for (var t = "".concat(U(), " %cDEBUG-QNRTC"), r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i]; (e = console).info.apply(e, [t, "color: #A28148; font-weight: bold;"].concat(n))
                    }
                }
            },
            {
                key: "warning",
                value: function() {
                    var e;
                    if ("disable" !== this.level) {
                        for (var t = "".concat(U(), " %cWARNING-QNRTC"), r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i]; (e = console).warn.apply(e, [t, "color: #E44F44; font-weight: bold;"].concat(n))
                    }
                }
            }]),
            e
        } ())("log"),
        V = function(e) {
            function t(e) {
                var r, n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                return p(this, t),
                (r = c(this, u(t).call(this)))._closed = !1,
                r._busy = !1,
                r._queue = [],
                r.name = e || "TaskQueue",
                r.isDebug = n,
                r
            }
            return d(t, m),
            l(t, [{
                key: "close",
                value: function() {
                    this._closed = !0
                }
            },
            {
                key: "push",
                value: function(e, t) {
                    var r = this;
                    return this.isDebug && F.debug("".concat(this.name, " push()"), e, t),
                    new Promise(function(n, i) {
                        r._queue.push({
                            method: e,
                            data: t,
                            resolve: n,
                            reject: i
                        }),
                        r._handlePendingCommands()
                    })
                }
            },
            {
                key: "_handlePendingCommands",
                value: function() {
                    var e = this;
                    if (!this._busy) {
                        var t = this._queue,
                        r = t[0];
                        r && (this._busy = !0, this._handleCommand(r).then(function() {
                            e._busy = !1,
                            t.shift(),
                            e._handlePendingCommands()
                        }))
                    }
                }
            },
            {
                key: "_handleCommand",
                value: function(e) {
                    var t = this;
                    if (this.isDebug && F.debug("".concat(this.name, " _handleCommand() "), e.method, e.data), this._closed) return e.reject(new ce("closed")),
                    Promise.resolve();
                    var r = {
                        promise: null
                    };
                    return this.emit("exec", e, r),
                    Promise.resolve().then(function() {
                        return r.promise
                    }).then(function(r) {
                        t.isDebug && F.debug("".concat(t.name, " _handleCommand() | command succeeded"), e.method),
                        t._closed ? e.reject(new ce("closed")) : e.resolve(r)
                    }).
                    catch(function(r) {
                        t.isDebug && F.warning("".concat(t.name, " _handleCommand() | command failed [method:%s]: %o"), e.method, r),
                        e.reject(r)
                    })
                }
            }]),
            t
        } ();

        function B(e) {
            for (var t = [], r = 0; r < e.length; r++) {
                var n = e.charCodeAt(r);
                n < 128 ? t.push(n) : n < 2048 ? t.push(192 | n >> 6, 128 | 63 & n) : n < 55296 || n >= 57344 ? t.push(224 | n >> 12, 128 | n >> 6 & 63, 128 | 63 & n) : (r++, n = 65536 + ((1023 & n) << 10 | 1023 & e.charCodeAt(r)), t.push(240 | n >> 18, 128 | n >> 12 & 63, 128 | n >> 6 & 63, 128 | 63 & n))
            }
            return new Uint8Array(t)
        }
        var z = new(function() {
            function e() {
                var t = this;
                p(this, e),
                this.events = [],
                this.lastSubmitTime = Date.now(),
                this.submitQueue = new V("qossubmit", !1),
                new Promise(function(e, t) {
                    window.requestIdleCallback ? window.requestIdleCallback(function() {
                        y.get(function(t) {
                            var r = T(JSON.stringify(t));
                            e(r)
                        })
                    }) : setTimeout(function() {
                        y.get(function(t) {
                            var r = T(JSON.stringify(t));
                            e(r)
                        })
                    },
                    500)
                }).then(function(e) {
                    t.deviceId = e,
                    t.base.device_id = t.deviceId
                }),
                this.base = {
                    qos_version: "2.0",
                    device_id: "",
                    bundle_id: window.location.href,
                    app_version: "",
                    sdk_version: N,
                    device_model: "".concat(h.browser.name).concat(h.browser.version),
                    os_platform: h.browser.os,
                    os_version: ""
                },
                this.initSubmitQueue(),
                this.submitQueue.push("resume").
                catch(fe)
            }
            return l(e, [{
                key: "setSessionId",
                value: function(e) {
                    for (var t = this.events.length - 1; t >= 0; t -= 1) {
                        var r = this.events[t];
                        if (r.session_id) break;
                        r.session_id = e
                    }
                    this.sessionId = e
                }
            },
            {
                key: "setUserBase",
                value: function(e, t) {
                    this.userBase = {
                        user_id: e,
                        room_name: t,
                        app_id: ""
                    };
                    for (var r = this.events.length - 1; r >= 0; r -= 1) {
                        var n = this.events[r];
                        if (n.user_base) break;
                        n.user_base = this.userBase
                    }
                }
            },
            {
                key: "addEvent",
                value: function(e, t, r) {
                    var n = _({
                        timestamp: Date.now(),
                        event_id: L[e],
                        event_name: e
                    },
                    t);
                    this.submitQueue.push("add", n).
                    catch(fe),
                    this.submit(r)
                }
            },
            {
                key: "submit",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.submitQueue.push("submit", e).
                    catch(fe)
                }
            },
            {
                key: "initSubmitQueue",
                value: function() {
                    var e = this;
                    this.submitQueue.on("exec",
                    function(t, r) {
                        switch (t.method) {
                        case "submit":
                            return void(r.promise = e._submit(t.data));
                        case "add":
                            return void(r.promise = e._addEvent(t.data));
                        case "resume":
                            return void(r.promise = e._recoverStoredEvents())
                        }
                    })
                }
            },
            {
                key: "_recoverStoredEvents",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                g.getItem("qnrtcqosevents");
                            case 2:
                                return t = e.sent,
                                console.log("get item", t),
                                e.next = 6,
                                g.removeItem("qnrtcqosevents");
                            case 6:
                                if (t) {
                                    e.next = 8;
                                    break
                                }
                                return e.abrupt("return");
                            case 8:
                                this.events = JSON.parse(window.atob(decodeURIComponent(t))),
                                this.events = this.events.filter(function(e) {
                                    return !! e.session_id && !!e.user_base
                                }).sort(function(e, t) {
                                    return e.event.timestamp - t.event.timestamp
                                });
                            case 10:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_addEvent",
                value: function(e) {
                    return this.events.push({
                        user_base: this.userBase,
                        event: e,
                        session_id: this.sessionId
                    }),
                    this.submit(),
                    Promise.resolve()
                }
            },
            {
                key: "saveEvents",
                value: function() {
                    var e = encodeURIComponent(window.btoa(JSON.stringify(this.events)));
                    g.setItem("qnrtcqosevents", e).
                    catch(fe)
                }
            },
            {
                key: "submitCheck",
                value: function() {
                    return !! (this.sessionId && this.deviceId && this.userBase) && (Date.now() - this.lastSubmitTime > 3e5 || this.events.length >= 30)
                }
            },
            {
                key: "_submit",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t, r, n, i, a, s, c, u, d = arguments;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t = d.length > 0 && void 0 !== d[0] && d[0], !!t || this.submitCheck()) {
                                    e.next = 5;
                                    break
                                }
                                return this.saveEvents(),
                                e.abrupt("return");
                            case 5:
                                e.prev = 5,
                                r = this.encodeQosSubmitData(),
                                n = !0,
                                i = !1,
                                a = void 0,
                                e.prev = 10,
                                s = r[Symbol.iterator]();
                            case 12:
                                if (n = (c = s.next()).done) {
                                    e.next = 22;
                                    break
                                }
                                return u = c.value,
                                e.next = 16,
                                fetch("https://pili-rtc-qos.qiniuapi.com/v1/rtcevent", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/x-gzip"
                                    },
                                    body: u.buffer
                                });
                            case 16:
                                if (e.sent.ok) {
                                    e.next = 19;
                                    break
                                }
                                throw J("rtcevent error");
                            case 19:
                                n = !0,
                                e.next = 12;
                                break;
                            case 22:
                                e.next = 28;
                                break;
                            case 24:
                                e.prev = 24,
                                e.t0 = e.
                                catch(10),
                                i = !0,
                                a = e.t0;
                            case 28:
                                e.prev = 28,
                                e.prev = 29,
                                n || null == s.
                                return || s.
                                return ();
                            case 31:
                                if (e.prev = 31, !i) {
                                    e.next = 34;
                                    break
                                }
                                throw a;
                            case 34:
                                return e.finish(31);
                            case 35:
                                return e.finish(28);
                            case 36:
                                return this.lastSubmitTime = Date.now(),
                                this.events = [],
                                e.next = 40,
                                g.removeItem("qnrtcqosevents");
                            case 40:
                                e.next = 45;
                                break;
                            case 42:
                                e.prev = 42,
                                e.t1 = e.
                                catch(5),
                                F.log(e.t1);
                            case 45:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[5, 42], [10, 24, 28, 36], [29, , 31, 35]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "encodeQosSubmitData",
                value: function() {
                    var e = S(this.events,
                    function(e) {
                        return e.session_id || "" + JSON.stringify(e.user_base)
                    }),
                    t = [];
                    for (var r in e) {
                        var n = e[r];
                        if (0 !== n.length) {
                            var i = {
                                session_id: n[0].session_id,
                                user_base: n[0].user_base,
                                base: this.base,
                                items: n.map(function(e) {
                                    return e.event
                                })
                            };
                            console.log("encode", i);
                            var a = new Uint8Array(b.zip(B(JSON.stringify(i))));
                            t.push(a)
                        }
                    }
                    return t
                }
            }]),
            e
        } ()),
        H = function(e) {
            function t(e, r) {
                var n;
                return p(this, t),
                (n = c(this, u(t).call(this, r))).code = e,
                n.error = r,
                z.addEvent("SDKError", {
                    error_code: e,
                    error_msg: r
                }),
                n
            }
            return d(t, e),
            t
        } (a(Error)),
        J = function(e) {
            return new H(11e3, "piliRTC: unexpected error ".concat(e))
        },
        G = function(e) {
            return new H(11001, "enterRoom error, can not get accessToken. Error: ".concat(e, "\n please check enterRoom arguments"))
        },
        q = function(e, t) {
            return new H(e, "publish error, signaling code: ".concat(e, ", msg: ").concat(t))
        },
        W = function(e, t) {
            return new H(e, "create merge job error, signaling code: ".concat(e, ", msg: ").concat(t))
        },
        Q = function(e) {
            return new H(11005, "subscribe faild, can not create p2p connection, ".concat(e))
        },
        K = function(e) {
            return new H(11006, "publish faild, can not create p2p connection, ".concat(e))
        },
        $ = function(e) {
            return new H(11007, "media format not support, ".concat(e))
        },
        X = function(e, t) {
            return new H(e, "subscribe error, signaling code: ".concat(e, ", msg: ").concat(t))
        },
        Y = function(e, t) {
            return new H(e, "send control error, code: ".concat(e, ", msg: ").concat(t))
        },
        Z = function(e) {
            return new H(11008, "not support! ".concat(e))
        },
        ee = function() {
            return new H(10052, "server unavailable")
        },
        te = function(e) {
            return new H(11009, "plugin not avaliable! ".concat(e))
        },
        re = function(e) {
            return new H(11010, "NotAllowedError: no permission to access media device. ".concat(e))
        },
        ne = function(e) {
            return new H(11012, "can not set merge layout stream, no merge job id ".concat(e))
        },
        ie = function() {
            return new H(11013, "can not sharing screen/window on chrome")
        },
        ae = function() {
            return new H(11014, "subscribe/publish operation is aborted")
        },
        oe = function(e) {
            return new H(11015, "can not decode audio data, ".concat(e.toString()))
        },
        se = function() {
            return new H(30001, "websocket abort")
        },
        ce = function(e) {
            function t(e) {
                var r;
                return p(this, t),
                (r = c(this, u(t).call(this, e))).name = "InvalidStateError",
                Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(i(i(r)), t) : r.stack = new Error(e).stack,
                r
            }
            return d(t, e),
            t
        } (a(Error)),
        ue = Object.freeze({
            QNRTCError: H,
            UNEXPECTED_ERROR: J,
            AUTH_ENTER_ROOM_ERROR: G,
            PUBLISH_ERROR: q,
            CREATE_MERGE_JOB_ERROR: W,
            PUBLISH_ICE_ERROR: function() {
                return new H(11002, "publish faild, ice not ready")
            },
            SUB_ICE_ERROR: function() {
                return new H(11003, "subscribe faild, ice not ready")
            },
            SUB_ERROR_NO_STREAM: function(e) {
                return new H(11004, "subscribe faild, can not find this player in streams, userId: ".concat(e))
            },
            SUB_P2P_ERROR: Q,
            PUB_P2P_ERROR: K,
            UNSUPPORT_FMT: $,
            JOIN_ROOM_ERROR: function(e, t) {
                return new H(e, "joinRoom error, code: ".concat(e, ", ").concat(t))
            },
            SUB_ERROR: X,
            UNPUBLISH_ERROR: function(e, t) {
                return new H(e, "unpublish error, code: ${code}, msg: ${msg}")
            },
            UNSUB_ERROR: function(e, t) {
                return new H(e, "unsubscribe error, code: ${code}, msg: ${msg}")
            },
            CONTROL_ERROR: Y,
            NOT_SUPPORT_ERROR: Z,
            SERVER_UNAVAILABLE: ee,
            PLUGIN_NOT_AVALIABLE: te,
            DEVICE_NOT_ALLOWED: re,
            SUB_ERROR_NO_USER: function(e) {
                return new H(11011, "subscribe faild, can not find this user in room, userId: ".concat(e))
            },
            NO_MERGE_JOB: ne,
            SCREEN_PERMISSION_DENIED: ie,
            SUB_PUB_ABORT: ae,
            AUDIO_DECODE_ERROR: oe,
            AUTO_SWITCH_ERROR: function(e) {
                return new H(20001, "deviceManager auto switch error. ".concat(e))
            },
            WS_ABORT: se,
            InvalidStateError: ce
        });

        function de(e) {
            var t = e.split(".")[1];
            if (!t) throw new Error("parse jwt error, can not find payload string.");
            var r = atob(t);
            return JSON.parse(r)
        }

        function pe(e) {
            try {
                var t = e.split(":")[2],
                r = atob(t);
                return JSON.parse(r)
            } catch(n) {
                throw J("can not parse roomToken, ".concat(n))
            }
        }

        function le(e, t, r) {
            if (!r) return null;
            for (var n = 0; n < e.length; n += 1) {
                var i = e[n];
                if (i[t] === r) return i
            }
            return null
        }

        function fe() {}

        function he(e) {
            Promise.resolve().then(e)
        }

        function me(e, t, r, n, i) {
            var a = {
                join: [],
                leave: [],
                add: [],
                remove: [],
                mute: []
            },
            o = t.map(function(e) {
                return e.trackid
            }),
            s = r.map(function(e) {
                return e.trackid
            });
            return o.forEach(function(n, i) {
                if (t[i].playerid !== e) if ( - 1 === s.indexOf(n)) a.remove.push(t[i]);
                else {
                    var o = r.find(function(e) {
                        return e.trackid === n
                    }),
                    c = t[i];
                    o.versionid !== c.versionid && (a.remove.push(c), a.add.push(o))
                }
            }),
            s.forEach(function(n, i) {
                if (r[i].playerid !== e) {
                    var s = o.indexOf(n); - 1 === s ? (a.add.push(r[i]), a.mute.push({
                        trackid: n,
                        muted: r[i].muted
                    })) : r[i].muted !== t[s].muted && a.mute.push({
                        trackid: n,
                        muted: r[i].muted
                    })
                }
            }),
            n.forEach(function(t) {
                t !== e && -1 === i.indexOf(t) && a.leave.push({
                    playerid: t
                })
            }),
            i.forEach(function(t) {
                t !== e && -1 === n.indexOf(t) && a.join.push({
                    playerid: t
                })
            }),
            a
        }

        function ve(e) {
            return ("0" + e.toString(16)).substr( - 2)
        }

        function ke() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 5,
            t = new Uint8Array((e || 40) / 2);
            return window.crypto.getRandomValues(t),
            Array.from(t, ve).join("")
        }

        function ye(e) {
            return new Promise(function(t) {
                setTimeout(function() {
                    t()
                },
                e)
            })
        }
        var ge = {};

        function be(e, t) {
            if (!ge[t]) return ge[t] = !0,
            e()
        }

        function Te(e) {
            F.warning("play failed!", e),
            F.warning("play failed due to browser security policy, see: http://s.qnsdk.com/s/Txsdz")
        }

        function Se(e) {
            return we.apply(this, arguments)
        }

        function we() {
            return (we = s(o.mark(function e(t) {
                var r, n;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2,
                        fetch(t);
                    case 2:
                        if (! ((r = e.sent).status >= 400 && r.status < 500)) {
                            e.next = 5;
                            break
                        }
                        throw {
                            retry: !1,
                            message: r.status.toString()
                        };
                    case 5:
                        if (200 === r.status) {
                            e.next = 7;
                            break
                        }
                        throw {
                            retry: !0,
                            message: r.status.toString()
                        };
                    case 7:
                        return e.next = 9,
                        r.json();
                    case 9:
                        return n = e.sent,
                        e.abrupt("return", n);
                    case 11:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }

        function Ce(e) {
            return _e.apply(this, arguments)
        }

        function _e() {
            return (_e = s(o.mark(function e(t) {
                var r, n, i;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (r = t.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/), !t.match(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/) && !r) {
                            e.next = 4;
                            break
                        }
                        return e.abrupt("return", t);
                    case 4:
                        return e.prev = 4,
                        e.next = 7,
                        fetch("https://".concat(t, "/ip"));
                    case 7:
                        return n = e.sent,
                        e.next = 10,
                        n.json();
                    case 10:
                        return i = e.sent,
                        e.abrupt("return", i.ip);
                    case 14:
                        return e.prev = 14,
                        e.t0 = e.
                        catch(4),
                        F.warning("resolve ice failed, retry", e.t0),
                        e.next = 19,
                        ye(1e3);
                    case 19:
                        return e.next = 21,
                        Ce(t);
                    case 21:
                        return e.abrupt("return", e.sent);
                    case 22:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[4, 14]])
            }))).apply(this, arguments)
        }
        var xe = function() {
            return {
                packetLossRate: 0,
                bitrate: 0,
                bytes: 0,
                packets: 0,
                packetLoss: 0,
                timestamp: Date.now()
            }
        };

        function Re(e, t, r) {
            return Ee.apply(this, arguments)
        }

        function Ee() {
            return (Ee = s(o.mark(function e(t, r, n) {
                var i, a, s, c, u, d, p, l, f, h, m, v, k;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return i = xe(),
                        e.prev = 1,
                        e.next = 4,
                        t.getStats(r);
                    case 4:
                        a = e.sent,
                        e.next = 11;
                        break;
                    case 7:
                        return e.prev = 7,
                        e.t0 = e.
                        catch(1),
                        F.debug("get stats error, fallback to default", e.t0),
                        e.abrupt("return", xe());
                    case 11:
                        if (a) {
                            e.next = 14;
                            break
                        }
                        return F.debug("get null stats, fallback to default"),
                        e.abrupt("return", xe());
                    case 14:
                        for (s = !0, c = !1, u = void 0, e.prev = 17, d = a.values()[Symbol.iterator](); ! (s = (p = d.next()).done); s = !0) l = p.value,
                        ("send" === n && "outbound-rtp" === l.type && !l.isRemote || "recv" === n && "inbound-rtp" === l.type && !l.isRemote) && (f = a.get(l.remoteId), h = "send" === n ? l.packetsSent: l.packetsReceived, m = "send" === n ? l.bytesSent: l.bytesReceived, v = 0, f && (k = "send" === n ? f.packetsReceived: f.packetsSent, v = "send" === n ? f.packetsLost: k - h), i.bytes = m, i.packets = h, i.packetLoss = v);
                        e.next = 25;
                        break;
                    case 21:
                        e.prev = 21,
                        e.t1 = e.
                        catch(17),
                        c = !0,
                        u = e.t1;
                    case 25:
                        e.prev = 25,
                        e.prev = 26,
                        s || null == d.
                        return || d.
                        return ();
                    case 28:
                        if (e.prev = 28, !c) {
                            e.next = 31;
                            break
                        }
                        throw u;
                    case 31:
                        return e.finish(28);
                    case 32:
                        return e.finish(25);
                    case 33:
                        return e.abrupt("return", i);
                    case 34:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[1, 7], [17, 21, 25, 33], [26, , 28, 32]])
            }))).apply(this, arguments)
        }

        function Ie() {
            var e = {
                bundlePolicy: "max-bundle",
                rtcpMuxPolicy: "require",
                iceServers: []
            };
            return h.browserReport.unifiedPlan ? e.sdpSemantics = "unified-plan": e.sdpSemantics = "plan-b",
            new RTCPeerConnection(e)
        }

        function Pe(e, t) {
            return Oe.apply(this, arguments)
        }

        function Oe() {
            return (Oe = s(o.mark(function e(t, r) {
                var n;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (! (n = r.getTransceivers().find(function(e) {
                            return "inactive" === e.direction && e.receiver.track.kind === t.kind
                        }))) {
                            e.next = 8;
                            break
                        }
                        return n.direction = "sendonly",
                        e.next = 5,
                        n.sender.replaceTrack(t);
                    case 5:
                        return e.abrupt("return", n);
                    case 8:
                        return e.next = 10,
                        r.addTransceiver(t, {
                            direction: "sendonly"
                        });
                    case 10:
                        return e.abrupt("return", e.sent);
                    case 11:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }

        function Me(e, t, r, n) {
            return Ae.apply(this, arguments)
        }

        function Ae() {
            return (Ae = s(o.mark(function e(t, r, n, i) {
                var a;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (!h.browserReport.stats) {
                            e.next = 7;
                            break
                        }
                        return e.next = 3,
                        Re(t, r, n);
                    case 3:
                        return a = e.sent,
                        e.abrupt("return", je(a, i));
                    case 7:
                        return be(function() {
                            F.warning("your browser does not support getStats")
                        },
                        "not-support-stats-warning"),
                        e.abrupt("return", xe());
                    case 9:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }

        function je(e, t) {
            if (!t) return e;
            var r = _({},
            e),
            n = e.packets - t.packets,
            i = e.packetLoss - t.packetLoss;
            i > 0 && (r.packetLossRate = i / n, r.packetLossRate > 1 && (r.packetLossRate = 1));
            var a = (e.timestamp - t.timestamp) / 1e3;
            return a <= 0 ? e: (r.bitrate = 8 * (e.bytes - t.bytes) / a, r.bitrate < 0 ? t: r)
        }
        window.addEventListener("message",
        function(e) {
            e.origin === window.location.origin &&
            function(e) {
                if ("PermissionDeniedError" === e) {
                    if (Ne = "PermissionDeniedError", Le) return Le("PermissionDeniedError");
                    throw ie()
                }
                "qnrtc:rtcmulticonnection-extension-loaded" === e && (Ne = "desktop");
                "rtcmulticonnection-extension-loaded" === e && F.warning("your chrome screen sharing plugin is not the latest version, or you have other screen sharing plugins.");
                e.sourceId && Le && Le(De = e.sourceId, !0 === e.canRequestAudioTrack)
            } (e.data)
        });
        var De, Le, Ne = "screen";

        function Ue() {
            return Fe.apply(this, arguments)
        }

        function Fe() {
            return (Fe = s(o.mark(function e() {
                var t;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return t = function() {
                            return new Promise(function(e, t) {
                                "desktop" !== Ne ? (window.postMessage("qnrtc:are-you-there", "*"), setTimeout(function() {
                                    e("screen" !== Ne)
                                },
                                2e3)) : e(!0)
                            })
                        },
                        e.next = 3,
                        t();
                    case 3:
                        return e.abrupt("return", e.sent);
                    case 4:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }

        function Ve(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            Le = e,
            t ? window.postMessage("qnrtc:get-sourceId-screen", "*") : r ? window.postMessage("qnrtc:get-sourceId-window", "*") : window.postMessage("qnrtc:get-sourceId", "*")
        }

        function Be(e) {
            if (De) return e(De);
            Le = e,
            window.postMessage("qnrtc:audio-plus-tab", "*")
        }

        function ze(e, t) {
            return He.apply(this, arguments)
        }

        function He() {
            return (He = s(o.mark(function e(t, r) {
                var n, i;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return n = r.source,
                        i = function() {
                            return new Promise(function(e, i) {
                                var a = {
                                    mozMediaSource: n || "window",
                                    mediaSource: n || "window",
                                    height: r.height,
                                    width: r.width
                                };
                                if (h.isFirefox) e(a);
                                else {
                                    var o = {
                                        mandatory: {
                                            chromeMediaSource: Ne,
                                            maxWidth: ft(r.width),
                                            maxHeight: ft(r.height)
                                        },
                                        optional: []
                                    };
                                    "desktop" !== Ne ? e(o) : t ? Be(function(t, r) {
                                        o.mandatory.chromeMediaSourceId = t,
                                        r && (o.canRequestAudioTrack = !0),
                                        "PermissionDeniedError" !== t ? e(o) : i(ie())
                                    }) : Ve(function(t) {
                                        o.mandatory.chromeMediaSourceId = t,
                                        "PermissionDeniedError" !== t ? e(o) : i(ie())
                                    },
                                    "screen" === n, "window" === n)
                                }
                            })
                        },
                        e.next = 4,
                        i();
                    case 4:
                        return e.abrupt("return", e.sent);
                    case 5:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }
        var Je = function() {
            function e(t, r) {
                p(this, e),
                this.tracks = [],
                this.publishedTrackInfo = [],
                this.userId = t,
                this.userData = r
            }
            return l(e, [{
                key: "addTracks",
                value: function(e) {
                    var t = this;
                    this.tracks = this.tracks.concat(e),
                    this.tracks = v(this.tracks, "mediaTrack");
                    var r = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, o = function() {
                            var e = a.value;
                            e.once("release",
                            function() {
                                k(t.tracks,
                                function(t) {
                                    return t === e
                                })
                            })
                        },
                        s = this.tracks[Symbol.iterator](); ! (r = (a = s.next()).done); r = !0) o()
                    } catch(c) {
                        n = !0,
                        i = c
                    } finally {
                        try {
                            r || null == s.
                            return || s.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                }
            },
            {
                key: "removeTracksByTrackId",
                value: function(e) {
                    k(this.tracks,
                    function(t) {
                        return !! t.info.trackId && -1 !== e.indexOf(t.info.trackId)
                    })
                }
            },
            {
                key: "addPublishedTrackInfo",
                value: function(e) {
                    this.publishedTrackInfo = this.publishedTrackInfo.concat(e),
                    this.publishedTrackInfo = v(this.publishedTrackInfo, "trackId")
                }
            },
            {
                key: "removePublishedTrackInfo",
                value: function(e) {
                    k(this.publishedTrackInfo,
                    function(t) {
                        return - 1 !== e.indexOf(t.trackId)
                    })
                }
            },
            {
                key: "published",
                get: function() {
                    return this.publishedTrackInfo.length > 0
                }
            }]),
            e
        } ();

        function Ge(e) {
            var t = document.createElement("audio"),
            r = new MediaStream([e]);
            return t.style.visibility = "hidden",
            t.className = "qnrtc-audio-player qnrtc-stream-player",
            t.dataset.localid = e.id,
            t.srcObject = r,
            t.autoplay = !0,
            t
        }

        function qe(e) {
            var t = document.createElement("video"),
            r = new MediaStream([e]);
            return t.style.width = "100%",
            t.style.height = "100%",
            t.style.objectFit = "contain",
            t.muted = !0,
            t.className = "qnrtc-video-player qnrtc-stream-player",
            t.dataset.localid = e.id,
            t.setAttribute("playsinline", !0),
            t.autoplay = !0,
            t.srcObject = r,
            h.isIOS && (t.setAttribute("controls", !0), he(function() {
                t && t.srcObject && t.removeAttribute("controls")
            })),
            t
        }
        var We = function(e) {
            function t() {
                return p(this, t),
                c(this, u(t).apply(this, arguments))
            }
            return d(t, m),
            l(t, [{
                key: "safeEmit",
                value: function(e) {
                    try {
                        for (var t = arguments.length,
                        r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) r[n - 1] = arguments[n];
                        this.emit.apply(this, [e].concat(r))
                    } catch(ue) {
                        F.warning("safeEmit() | event listener threw an error [event:%s]:%o", e, ue)
                    }
                }
            },
            {
                key: "safeEmitAsPromise",
                value: function(e) {
                    for (var t = this,
                    r = arguments.length,
                    n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++) n[i - 1] = arguments[i];
                    return new Promise(function(r, i) {
                        var a = r;
                        t.safeEmit.apply(t, [e].concat(n, [a,
                        function(t) {
                            F.warning("safeEmitAsPromise() | errback called [event:%s]:%o", e, t),
                            i(t)
                        }]))
                    })
                }
            }]),
            t
        } (),
        Qe = function(e) {
            function r(e, n, i) {
                var a;
                return p(this, r),
                (a = c(this, u(r).call(this))).master = !1,
                a.stats = xe(),
                a.direction = "local",
                a.sourceType = t.TrackSourceType.NORMAL,
                a.onended = function(e) {
                    F.warning("track ended", a.mediaTrack, a.info.trackId),
                    "local" === a.direction ? a.emit("ended", e) : a.emit("@ended", e)
                },
                a.mediaTrack = e,
                a.mediaTrack.addEventListener("ended", a.onended),
                a.userId = n,
                i && (a.direction = i),
                a.info = {
                    kind: e.kind,
                    muted: !e.enabled,
                    userId: a.userId,
                    versionid: 0
                },
                a
            }
            return d(r, We),
            l(r, [{
                key: "play",
                value: function(e, t) {
                    this.removeMediaElement();
                    var r = "video" === this.info.kind ? qe: Ge;
                    this.mediaElement = r(this.mediaTrack),
                    "audio" === this.info.kind && t && (this.mediaElement.muted = !0),
                    e.appendChild(this.mediaElement),
                    this.mediaElement.play().
                    catch(Te)
                }
            },
            {
                key: "resume",
                value: function(e) {
                    if (this.mediaTrack.removeEventListener("ended", this.onended), this.mediaTrack.stop(), this.mediaTrack = e, this.mediaTrack.addEventListener("ended", this.onended), this.mediaElement) {
                        var t = new MediaStream([e]);
                        this.mediaElement.dataset.localid = e.id,
                        this.mediaElement.srcObject = t
                    }
                    this.removeEvent("@get-stats"),
                    this.resetStats()
                }
            },
            {
                key: "getStats",
                value: function() {
                    return this.statsInterval || this.startGetStatsInterval(),
                    this.stats
                }
            },
            {
                key: "getCurrentFrameDataURL",
                value: function() {
                    return this.mediaElement && this.mediaElement instanceof HTMLVideoElement ?
                    function(e) {
                        var t = document.createElement("canvas");
                        t.width = e.videoWidth,
                        t.height = e.videoHeight;
                        var r = t.getContext("2d");
                        return r ? (r.drawImage(e, 0, 0, e.videoWidth, e.videoHeight), t.toDataURL()) : "data:,"
                    } (this.mediaElement) : "data:,"
                }
            },
            {
                key: "setMaster",
                value: function(e) {
                    this.master = e
                }
            },
            {
                key: "setMute",
                value: function(e) {
                    this.info.muted = e,
                    this.mediaTrack.enabled = !e,
                    this.emit("mute", e)
                }
            },
            {
                key: "setKbps",
                value: function(e) {
                    this.info.kbps = e
                }
            },
            {
                key: "setInfo",
                value: function(e) {
                    this.info = _({},
                    this.info, e)
                }
            },
            {
                key: "removeMediaElement",
                value: function() {
                    this.mediaElement && (this.mediaElement.remove(), this.mediaElement = void 0)
                }
            },
            {
                key: "release",
                value: function() {
                    this.emit("release"),
                    this.removeEvent(),
                    this.statsInterval && window.clearInterval(this.statsInterval),
                    "local" !== this.direction && h.browserReport.unifiedPlan || this.mediaTrack.stop(),
                    this.removeMediaElement()
                }
            },
            {
                key: "reset",
                value: function() {
                    this.info.trackId = void 0,
                    this.info.userId = void 0,
                    this.info.versionid = 0,
                    this.userId = void 0,
                    this.resetStats()
                }
            },
            {
                key: "resetStats",
                value: function() {
                    this.stats = xe(),
                    this.lastStats = void 0
                }
            },
            {
                key: "startGetStatsInterval",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t, r = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                t = function() {
                                    var e = s(o.mark(function e() {
                                        var t;
                                        return o.wrap(function(e) {
                                            for (;;) switch (e.prev = e.next) {
                                            case 0:
                                                if ((t = r.getListeners("@get-stats")) && 0 !== t.length) {
                                                    e.next = 3;
                                                    break
                                                }
                                                return e.abrupt("return", xe());
                                            case 3:
                                                return e.next = 5,
                                                r.safeEmitAsPromise("@get-stats", r.lastStats);
                                            case 5:
                                                r.stats = e.sent,
                                                r.lastStats = _({},
                                                r.stats);
                                            case 7:
                                            case "end":
                                                return e.stop()
                                            }
                                        },
                                        e, this)
                                    }));
                                    return function() {
                                        return e.apply(this, arguments)
                                    }
                                } (),
                                this.statsInterval = window.setInterval(t, 1e3);
                            case 2:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "onAudioBuffer",
                value: function(e, t) {
                    F.warning("not implement")
                }
            },
            {
                key: "setVolume",
                value: function(e) {
                    F.warning("not implement")
                }
            },
            {
                key: "getCurrentTimeDomainData",
                value: function() {
                    return F.warning("not implement"),
                    new Uint8Array
                }
            },
            {
                key: "getCurrentFrequencyData",
                value: function() {
                    return F.warning("not implement"),
                    new Uint8Array
                }
            },
            {
                key: "getVolume",
                value: function() {
                    return F.warning("not implement"),
                    0
                }
            },
            {
                key: "getCurrentVolumeLevel",
                value: function() {
                    return F.warning("not implement"),
                    0
                }
            },
            {
                key: "setLoop",
                value: function(e) {
                    F.warning("not implement")
                }
            },
            {
                key: "startAudioSource",
                value: function() {
                    F.warning("not implement")
                }
            },
            {
                key: "pauseAudioSource",
                value: function() {
                    F.warning("not implement")
                }
            },
            {
                key: "resumeAudioSource",
                value: function() {
                    F.warning("not implement")
                }
            },
            {
                key: "stopAudioSource",
                value: function() {
                    F.warning("not implement")
                }
            },
            {
                key: "getCurrentTime",
                value: function() {
                    return F.warning("not implement"),
                    0
                }
            },
            {
                key: "setCurrentTime",
                value: function(e) {
                    F.warning("not implement")
                }
            },
            {
                key: "getDuration",
                value: function() {
                    return F.warning("not implement"),
                    0
                }
            }]),
            r
        } (),
        Ke = window.AudioContext || window.webkitAudioContext || window.Object,
        $e = h.browserReport.audioContextOptions ? new Ke({
            latencyHint: "interactive"
        }) : new Ke;
        if (window.audioContext = $e, window.Promise) {
            var Xe = function e() {
                var t; (t = $e, new Promise(function(e, r) {
                    if ("suspended" === t.state) {
                        F.log("audio context state is suspended");
                        var n = function n() {
                            t.resume().then(function() {
                                document.body.removeEventListener("touchstart", n),
                                document.body.removeEventListener("touchend", n),
                                document.body.removeEventListener("mousedown", n),
                                document.body.removeEventListener("mouseup", n),
                                e(!0)
                            }).
                            catch(r)
                        };
                        document.body.addEventListener("touchstart", n, !0),
                        document.body.addEventListener("touchend", n, !0),
                        document.body.addEventListener("mousedown", n, !0),
                        document.body.addEventListener("mouseup", n, !0)
                    } else e(!1)
                })).then(function(e) {
                    F.debug("web audio context unlocked", e)
                }).
                catch(function(e) {
                    F.warning("can not unlock web audio context", e)
                }),
                window.removeEventListener("load", e)
            };
            document.body ? Xe() : window.addEventListener("load", Xe)
        }
        var Ye = ["play", "playing", "pause", "ended", "waiting", "seeking"],
        Ze = function(e) {
            function r() {
                var e;
                return p(this, r),
                (e = c(this, u(r).call(this))).audioSource = null,
                e._audioSourceState = t.AudioSourceState.IDLE,
                e.bufferSourceDuration = {
                    startTime: 0,
                    pauseTime: 0,
                    lastPauseTime: 0,
                    offsetTime: 0,
                    stopTime: 0
                },
                e.handleMediaElementEvents = function(r) {
                    switch (r.type) {
                    case "playing":
                    case "play":
                        e.audioSourceState = t.AudioSourceState.PLAY;
                        break;
                    case "pause":
                        if (e.audioSourceState === t.AudioSourceState.END) break;
                        e.audioSourceState = t.AudioSourceState.PAUSE;
                        break;
                    case "waiting":
                    case "seeking":
                        e.audioSourceState = t.AudioSourceState.LOADING;
                        break;
                    case "ended":
                        e.audioSourceState = t.AudioSourceState.END
                    }
                },
                e
            }
            return d(r, We),
            l(r, [{
                key: "onAudioBuffer",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4096;
                    this.audioBufferCallback = e,
                    this.audioBufferSize = t
                }
            },
            {
                key: "initAudioContext",
                value: function() {
                    F.log("init audio context", $e.state),
                    "suspended" === $e.state && (F.log("audio context suspended"), $e.resume().
                    catch(function(e) {
                        F.warning("resume audiocontext failed! see: http://s.qnsdk.com/s/Txsdz", e)
                    })),
                    F.log("init audio finish", $e.state),
                    this.analyserNode = $e.createAnalyser(),
                    this.analyserNode.fftSize = 2048,
                    this.gainNode = $e.createGain(),
                    function(e) {
                        if (h.browserReport.disconnectAudioNode) return;
                        var t = e.connect,
                        r = e.disconnect;
                        e.connect = function(r, n, i) {
                            return e._inputNodes || (e._inputNodes = []),
                            r instanceof AudioNode ? (e._inputNodes.push(r), e._inputNodes = v(e._inputNodes,
                            function(e) {
                                return e
                            }), t.call(e, r, n, i)) : t.call(e, r, n),
                            e
                        },
                        e.disconnect = function(t, n, i) {
                            r.call(e, t, n, i),
                            t || (e._inputNodes = []),
                            k(e._inputNodes,
                            function(e) {
                                return e === t
                            });
                            var a = !0,
                            o = !1,
                            s = void 0;
                            try {
                                for (var c, u = e._inputNodes[Symbol.iterator](); ! (a = (c = u.next()).done); a = !0) {
                                    var d = c.value;
                                    e.connect(d)
                                }
                            } catch(p) {
                                o = !0,
                                s = p
                            } finally {
                                try {
                                    a || null == u.
                                    return || u.
                                    return ()
                                } finally {
                                    if (o) throw s
                                }
                            }
                        }
                    } (this.gainNode),
                    h.browserReport.mediaStreamDest && (this.audioStream = $e.createMediaStreamDestination()),
                    this.initScriptNode(4096)
                }
            },
            {
                key: "setMediaStreamSource",
                value: function(e) {
                    this.audioSource = $e.createMediaStreamSource(e),
                    this.connect()
                }
            },
            {
                key: "setAudioBufferSource",
                value: function() {
                    var e = this;
                    this.audioSource = $e.createBufferSource(),
                    this.audioSource.onended = function() {
                        return e.stopAudioSource()
                    },
                    this.connect()
                }
            },
            {
                key: "setMediaElementSource",
                value: function(e) {
                    this.audioSource = $e.createMediaElementSource(e),
                    this.audioSourceElement = e;
                    for (var t = 0; t < Ye.length; t++) {
                        var r = Ye[t];
                        this.audioSourceElement.addEventListener(r, this.handleMediaElementEvents)
                    }
                    this.connect()
                }
            },
            {
                key: "setAudioSourceLoop",
                value: function(e) {
                    this.audioSourceLoop = e,
                    this.audioSource instanceof AudioBufferSourceNode ? this.audioSource.loop = !!e: this.audioSourceElement && (this.audioSourceElement.loop = !!e)
                }
            },
            {
                key: "setAudioBuffer",
                value: function(e) {
                    this.audioSource instanceof AudioBufferSourceNode && (this.audioSource.buffer = e, this.audioSourceBuffer = e)
                }
            },
            {
                key: "playAudioSource",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                    if (this.audioSource instanceof AudioBufferSourceNode) {
                        this.resetBufferSourceDuration();
                        try {
                            this.audioSource.start(0, e),
                            this.bufferSourceDuration.startTime = $e.currentTime,
                            this.bufferSourceDuration.offsetTime = e,
                            this.audioSourceState = t.AudioSourceState.PLAY
                        } catch(r) {
                            this.stopAudioSource(),
                            this.playAudioSource(e)
                        }
                    } else this.audioSourceElement ? (this.audioSourceElement.currentTime = 0, this.audioSourceElement.play().
                    catch(Te)) : null === this.audioSource && this.audioSourceBuffer && (this.resetBufferSourceDuration(), this.setAudioBufferSource(), this.setAudioBuffer(this.audioSourceBuffer), this.setAudioSourceLoop( !! this.audioSourceLoop), this.audioSource.start(0, e), this.bufferSourceDuration.startTime = $e.currentTime, this.bufferSourceDuration.offsetTime = e, this.audioSourceState = t.AudioSourceState.PLAY)
                }
            },
            {
                key: "resumeAudioSource",
                value: function() {
                    if (this.audioSource instanceof AudioBufferSourceNode) {
                        if (this.audioSourceState !== t.AudioSourceState.PAUSE) return;
                        this.audioSource.playbackRate.value = 1,
                        this.bufferSourceDuration.pauseTime += $e.currentTime - this.bufferSourceDuration.lastPauseTime,
                        this.bufferSourceDuration.lastPauseTime = 0,
                        this.audioSourceState = t.AudioSourceState.PLAY
                    } else this.audioSourceElement && this.audioSourceElement.play().
                    catch(Te)
                }
            },
            {
                key: "pauseAudioSource",
                value: function() {
                    this.audioSource instanceof AudioBufferSourceNode ? (h.isFirefox ? this.audioSource.playbackRate.value = 1e-7: this.audioSource.playbackRate.value = Number.MIN_VALUE, this.bufferSourceDuration.lastPauseTime || (this.bufferSourceDuration.lastPauseTime = $e.currentTime), this.audioSourceState = t.AudioSourceState.PAUSE) : this.audioSourceElement && this.audioSourceElement.pause()
                }
            },
            {
                key: "stopAudioSource",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.audioSource instanceof AudioBufferSourceNode ? (this.audioSource.onended = null, this.audioSource.stop(), this.audioSource.disconnect(), this.audioSource = null, this.bufferSourceDuration.stopTime = $e.currentTime, e || (this.audioSourceState = t.AudioSourceState.END)) : this.audioSourceElement && (this.audioSourceState = t.AudioSourceState.END, this.audioSourceElement.pause(), this.audioSourceElement.currentTime = 0)
                }
            },
            {
                key: "getAudioSourceCurrentTime",
                value: function() {
                    if (this.audioSourceElement) return this.audioSourceElement.currentTime;
                    if (this.audioSource instanceof AudioBufferSourceNode) {
                        var e = $e.currentTime,
                        t = this.getAudioSourceDuration();
                        this.bufferSourceDuration.lastPauseTime && (e = this.bufferSourceDuration.lastPauseTime),
                        this.bufferSourceDuration.stopTime && (e = this.bufferSourceDuration.stopTime);
                        var r = this.bufferSourceDuration.offsetTime + e - this.bufferSourceDuration.startTime - this.bufferSourceDuration.pauseTime;
                        return Math.max(0, r % t)
                    }
                    return 0
                }
            },
            {
                key: "setAudioSourceCurrentTime",
                value: function(e) {
                    this.audioSourceElement ? this.audioSourceElement.currentTime = e: this.audioSource instanceof AudioBufferSourceNode && (this.stopAudioSource(!0), this.playAudioSource(e))
                }
            },
            {
                key: "getAudioSourceDuration",
                value: function() {
                    return this.audioSourceElement ? this.audioSourceElement.duration: this.audioSourceBuffer ? this.audioSourceBuffer.duration: 0
                }
            },
            {
                key: "release",
                value: function() {
                    if (this.audioSource instanceof MediaStreamAudioSourceNode && this.audioSource.mediaStream && this.audioSource.mediaStream.getTracks().map(function(e) {
                        return e.stop()
                    }), this.audioSource && this.audioSource.disconnect(), this.gainNode.disconnect(), this.audioSourceElement) {
                        for (var e = 0; e < Ye.length; e++) {
                            var t = Ye[e];
                            this.audioSourceElement.removeEventListener(t, this.handleMediaElementEvents)
                        }
                        this.audioSourceElement.src = "",
                        this.audioSourceElement.load(),
                        this.audioSourceElement.remove(),
                        this.audioSourceElement = void 0
                    }
                    this.scriptNode && this.scriptNode.disconnect()
                }
            },
            {
                key: "connect",
                value: function() {
                    this.audioSource ? (this.audioSource.connect(this.analyserNode), this.audioSource.connect(this.scriptNode), this.audioSource.connect(this.gainNode), this.audioStream && this.gainNode.connect(this.audioStream)) : F.warning("no audio source, can not connect")
                }
            },
            {
                key: "handleAudioBuffer",
                value: function(e) {
                    var t = e.inputBuffer;
                    this.audioBufferCallback && this.audioBufferCallback(t)
                }
            },
            {
                key: "initScriptNode",
                value: function(e) {
                    this.scriptNode = $e.createScriptProcessor(e),
                    this.scriptNode.onaudioprocess = this.handleAudioBuffer.bind(this)
                }
            },
            {
                key: "resetBufferSourceDuration",
                value: function() {
                    this.bufferSourceDuration = {
                        offsetTime: 0,
                        startTime: 0,
                        lastPauseTime: 0,
                        pauseTime: 0,
                        stopTime: 0
                    }
                }
            },
            {
                key: "audioSourceState",
                get: function() {
                    return this._audioSourceState
                },
                set: function(e) {
                    e !== this._audioSourceState && (this.emit("@audio-source-state-change", e, this._audioSourceState), this._audioSourceState = e)
                }
            }]),
            r
        } ();
        var et = function(e) {
            function t(e, r, n) {
                var i;
                if (p(this, t), "audio" !== e.kind) throw new Error("audio track only!");
                return (i = c(this, u(t).call(this, e, r, n))).mediaStream = new MediaStream,
                i.mediaStream.addTrack(e),
                i
            }
            return d(t, Qe),
            l(t, [{
                key: "resume",
                value: function(e) {
                    this.mediaTrack = e,
                    this.removeEvent("@get-stats"),
                    this.resetStats();
                    var t = new MediaStream([e]);
                    this.mediaStream = t,
                    this.mediaElement && (this.mediaElement.dataset.localid = e.id, this.mediaElement.srcObject = t),
                    this.audioManager && (this.audioManager.release(), this.initAudioManager())
                }
            },
            {
                key: "initAudioManager",
                value: function(e) {
                    this.audioManager = new Ze,
                    this.audioManager.initAudioContext(),
                    this.audioManager.setMediaStreamSource(this.mediaStream),
                    e && h.browserReport.mediaStreamDest && (this.mediaStream = this.audioManager.audioStream.stream, this.mediaTrack = this.mediaStream.getTracks()[0])
                }
            },
            {
                key: "onAudioBuffer",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4096;
                    this.audioManager.onAudioBuffer(e, t)
                }
            },
            {
                key: "setVolume",
                value: function(e) {
                    this.audioManager.gainNode.gain.setValueAtTime(e, $e.currentTime)
                }
            },
            {
                key: "getCurrentTimeDomainData",
                value: function() {
                    var e = new Uint8Array(2048);
                    return this.audioManager.analyserNode.getByteTimeDomainData(e),
                    e
                }
            },
            {
                key: "getCurrentFrequencyData",
                value: function() {
                    var e = new Uint8Array(this.audioManager.analyserNode.frequencyBinCount);
                    return this.audioManager.analyserNode.getByteFrequencyData(e),
                    e
                }
            },
            {
                key: "getVolume",
                value: function() {
                    return this.audioManager.gainNode.gain.value
                }
            },
            {
                key: "getCurrentVolumeLevel",
                value: function() {
                    var e = this.getCurrentFrequencyData(),
                    t = 0,
                    r = e.length;
                    return e.forEach(function(n, i) {
                        var a = i * ($e.sampleRate || 44100) / e.length;
                        if (a > 22050) r -= 1;
                        else {
                            var o = function(e) {
                                var t = e * e;
                                return 1.2588966 * 14884e4 * t * t / ((t + 424.36) * Math.sqrt((t + 11599.29) * (t + 544496.41)) * (t + 14884e4))
                            } (a) * n / 255;
                            o <= 0 ? r -= 1 : t += o * o
                        }
                    }),
                    Math.sqrt(t / r)
                }
            },
            {
                key: "release",
                value: function() {
                    this.emit("release"),
                    this.removeEvent(),
                    this.statsInterval && window.clearInterval(this.statsInterval),
                    this.mediaTrack.stop(),
                    this.removeMediaElement(),
                    this.audioManager && this.audioManager.release()
                }
            }]),
            t
        } (),
        tt = function(e) {
            function r(e, n) {
                var i;
                if (p(this, r), !h.browserReport.mediaStreamDest) throw Z("your browser does not support audio buffer input!");
                var a = new Ze;
                a.initAudioContext(),
                e instanceof AudioBuffer ? (a.setAudioBufferSource(), a.setAudioBuffer(e)) : e instanceof HTMLAudioElement && a.setMediaElementSource(e);
                var o = a.audioStream.stream.getTracks()[0];
                return (i = c(this, u(r).call(this, o, n, "local"))).sourceType = t.TrackSourceType.EXTERNAL,
                i.isLoop = !1,
                i.originSource = e,
                i.audioManager = a,
                i.handleAudioManagerEvents(),
                i
            }
            return d(r, et),
            l(r, [{
                key: "setLoop",
                value: function(e) {
                    this.isLoop = e,
                    this.audioManager.setAudioSourceLoop(e)
                }
            },
            {
                key: "startAudioSource",
                value: function() {
                    this.audioManager.playAudioSource()
                }
            },
            {
                key: "pauseAudioSource",
                value: function() {
                    this.audioManager.pauseAudioSource()
                }
            },
            {
                key: "resumeAudioSource",
                value: function() {
                    this.audioManager.resumeAudioSource()
                }
            },
            {
                key: "stopAudioSource",
                value: function() {
                    this.audioManager.stopAudioSource()
                }
            },
            {
                key: "getCurrentTime",
                value: function() {
                    return this.audioManager.getAudioSourceCurrentTime() || 0
                }
            },
            {
                key: "setCurrentTime",
                value: function(e) {
                    this.audioManager.setAudioSourceCurrentTime(e)
                }
            },
            {
                key: "getDuration",
                value: function() {
                    return this.audioManager.getAudioSourceDuration() || 0
                }
            },
            {
                key: "handleAudioManagerEvents",
                value: function() {
                    var e = this;
                    this.audioManager.on("@audio-source-state-change",
                    function(t, r) {
                        e.emit("audio-state-change", t, r)
                    })
                }
            }]),
            r
        } (),
        rt = function(e) {
            function t(e) {
                var r, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "send",
                i = arguments.length > 2 ? arguments[2] : void 0;
                return p(this, t),
                (r = c(this, u(t).call(this))).trackList = [],
                r.isDestroyed = !1,
                r.enableAudio = !0,
                r.enableVideo = !0,
                r.muteAudio = !1,
                r.muteVideo = !1,
                r.onAudioEnded = function(e) {
                    r.emit("audio-ended", e)
                },
                r.onVideoEnded = function(e) {
                    r.emit("video-ended", e)
                },
                r.onAudioSourceStateChange = function(e, t) {
                    r.emit("audio-source-state-change", e, t)
                },
                r.direction = n,
                r.userId = i,
                e.forEach(function(e) {
                    e.setMaster(!0),
                    e.on("mute",
                    function() {
                        r.updateTrackState()
                    }),
                    e.on("release",
                    function() {
                        k(r.trackList,
                        function(t) {
                            return t === e
                        }),
                        r.updateTrackState(),
                        0 === r.trackList.length && r.release()
                    }),
                    r.trackList.push(e)
                }),
                r.updateTrackState(),
                r
            }
            return d(t, m),
            l(t, [{
                key: "setVolume",
                value: function(e) {
                    this._audioTrack && this._audioTrack.setVolume(e)
                }
            },
            {
                key: "play",
                value: function(e, t) {
                    this.trackList.forEach(function(r) {
                        return r.play(e, t)
                    }),
                    this._audioTrack && (this.audio = this._audioTrack.mediaElement),
                    this._videoTrack && (this.video = this._videoTrack.mediaElement)
                }
            },
            {
                key: "onAudioBuffer",
                value: function(e, t) {
                    this._audioTrack && this._audioTrack.onAudioBuffer(e, t)
                }
            },
            {
                key: "getCurrentTimeDomainData",
                value: function() {
                    return this._audioTrack ? this._audioTrack.getCurrentTimeDomainData() : new Uint8Array(0)
                }
            },
            {
                key: "getCurrentFrequencyData",
                value: function() {
                    return this._audioTrack ? this._audioTrack.getCurrentFrequencyData() : new Uint8Array(0)
                }
            },
            {
                key: "getCurrentVolumeLevel",
                value: function() {
                    return this._audioTrack ? this._audioTrack.getCurrentVolumeLevel() : 0
                }
            },
            {
                key: "getStats",
                value: function() {
                    var e = this._audioTrack ? this._audioTrack.getStats() : xe(),
                    t = this._videoTrack ? this._videoTrack.getStats() : xe();
                    return {
                        timestamp: Date.now(),
                        videoBitrate: t.bitrate,
                        audioBitrate: e.bitrate,
                        videoPacketLoss: t.packetLoss,
                        audioPacketLoss: e.packetLoss,
                        videoPackets: t.packets,
                        audioPackets: e.packets,
                        videoPacketLossRate: t.packetLossRate,
                        audioPacketLossRate: e.packetLossRate,
                        videoBytes: t.bytes,
                        audioBytes: e.bytes,
                        pctype: this.direction
                    }
                }
            },
            {
                key: "getCurrentFrameDataURL",
                value: function() {
                    return this._videoTrack ? this._videoTrack.getCurrentFrameDataURL() : "data:,"
                }
            },
            {
                key: "setAudioSourceLoop",
                value: function(e) {
                    this._audioTrack instanceof tt && this._audioTrack.setLoop(e)
                }
            },
            {
                key: "startAudioSource",
                value: function() {
                    this._audioTrack instanceof tt && this._audioTrack.startAudioSource()
                }
            },
            {
                key: "pauseAudioSource",
                value: function() {
                    this._audioTrack instanceof tt && this._audioTrack.pauseAudioSource()
                }
            },
            {
                key: "resumeAudioSource",
                value: function() {
                    this._audioTrack instanceof tt && this._audioTrack.resumeAudioSource()
                }
            },
            {
                key: "stopAudioSource",
                value: function() {
                    this._audioTrack instanceof tt && this._audioTrack.stopAudioSource()
                }
            },
            {
                key: "getAudioSourceCurrentTime",
                value: function() {
                    return this._audioTrack instanceof tt ? this._audioTrack.getCurrentTime() : 0
                }
            },
            {
                key: "getAudioSourceDuration",
                value: function() {
                    return this._audioTrack instanceof tt ? this._audioTrack.getDuration() : 0
                }
            },
            {
                key: "setAudioSourceCurrentTime",
                value: function(e) {
                    if (this._audioTrack instanceof tt) return this._audioTrack.setCurrentTime(e)
                }
            },
            {
                key: "setKbps",
                value: function(e, t) {
                    e && this._videoTrack && this._videoTrack.setKbps(e),
                    t && this._audioTrack && this._audioTrack.setKbps(t)
                }
            },
            {
                key: "updateTrackState",
                value: function() {
                    var e = this;
                    this.trackList.forEach(function(t) {
                        "audio" === t.info.kind ? (e._audioTrack && (e._audioTrack.off("ended", e.onAudioEnded), e._audioTrack.off("audio-state-change", e.onAudioSourceStateChange)), e.audioTrack = t.mediaTrack, e._audioTrack = t, e._audioTrack.on("ended", e.onAudioEnded), e._audioTrack instanceof tt && e._audioTrack.on("audio-state-change", e.onAudioSourceStateChange)) : (e._videoTrack && e._videoTrack.off("ended", e.onVideoEnded), e.videoTrack = t.mediaTrack, e._videoTrack = t, e._videoTrack.on("ended", e.onVideoEnded))
                    }),
                    this.audioTrack ? (this.enableAudio = !0, this.muteAudio = !this.audioTrack.enabled) : this.enableAudio = !1,
                    this.videoTrack ? (this.enableVideo = !0, this.muteVideo = !this.videoTrack.enabled) : this.enableVideo = !1
                }
            },
            {
                key: "release",
                value: function() {
                    if (!this.isDestroyed) {
                        for (var e = 0; e < this.trackList.length; e += 1) {
                            var t = this.trackList[e];
                            t.removeAllListeners("release"),
                            t.release()
                        }
                        this.trackList = [],
                        this.isDestroyed = !0,
                        this.emit("release"),
                        this.removeEvent()
                    }
                }
            },
            {
                key: "releaseTrack",
                value: function(e) {
                    var t = function(e, t, r) {
                        for (var n = [], i = null, a = 0; a < e.length; a += 1) e[a][t] !== r ? n.push(e[a]) : i = e[a];
                        return {
                            removeElement: i,
                            newArray: n
                        }
                    } (this.trackList, "mediaTrack", e.mediaTrack),
                    r = t.removeElement,
                    n = t.newArray;
                    r && (e.release(), this.trackList = n, 0 === this.trackList.length && (this.isDestroyed = !0))
                }
            },
            {
                key: "audioSourceIsLoop",
                get: function() {
                    return this._audioTrack instanceof tt && this._audioTrack.isLoop
                }
            }]),
            t
        } ();

        function nt(e) {
            return {
                timestamp: e.msgts,
                data: e.text,
                userId: e.playerid,
                type: e.type
            }
        }

        function it(e) {
            return {
                trackId: e.trackid,
                tag: e.tag,
                mid: e.mid || void 0,
                kind: e.kind,
                userId: e.playerid,
                muted: e.muted,
                versionid: e.versionid
            }
        }

        function at(e, t) {
            return {
                trackid: e.trackId,
                mid: e.mid || void 0,
                kind: e.kind,
                master: t,
                muted: !!e.muted,
                playerid: e.userId,
                tag: e.tag || "",
                versionid: e.versionid
            }
        }

        function ot(e) {
            if (!e.info.mid && h.browserReport.unifiedPlan) throw J("can not find track mid!");
            return {
                localid: e.mediaTrack.id,
                localmid: e.info.mid || void 0,
                master: e.master,
                kind: e.info.kind,
                kbps: e.info.kbps,
                tag: e.info.tag
            }
        }

        function st(e) {
            return new Je(e.playerid, e.playerdata)
        }

        function ct(e, t, r) {
            var n;
            return "audio" === e.kind ? (n = new et(e)).initAudioManager(!0) : n = new Qe(e),
            r && n.setKbps(r),
            n.setInfo({
                tag: t
            }),
            n
        }

        function ut(e) {
            return dt.apply(this, arguments)
        }

        function dt() {
            return (dt = s(o.mark(function e(t) {
                var r, n, i, a;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        if (t) {
                            e.next = 2;
                            break
                        }
                        return e.abrupt("return", {
                            audio: !0,
                            video: !0
                        });
                    case 2:
                        if (!A(t)) {
                            e.next = 14;
                            break
                        }
                        if (!M(t)) {
                            e.next = 5;
                            break
                        }
                        throw J("can not get mediaStream with video and screen are all enabled");
                    case 5:
                        if (h.browserReport.screenSharing) {
                            e.next = 7;
                            break
                        }
                        throw Z("your browser can not share screen");
                    case 7:
                        if (r = t.screen, !h.isChrome || !r.forceChromePlugin && h.browserReport.getDisplayMedia) {
                            e.next = 14;
                            break
                        }
                        return e.next = 11,
                        Ue();
                    case 11:
                        if (e.sent) {
                            e.next = 14;
                            break
                        }
                        throw te("");
                    case 14:
                        if (n = !(!t.audio || !t.audio.enabled || t.audio.source) && {
                            deviceId: t.audio.deviceId,
                            sampleRate: t.audio.sampleRate,
                            sampleSize: t.audio.sampleSize,
                            channelCount: t.audio.channelCount,
                            autoGainControl: t.audio.autoGainControl,
                            echoCancellation: t.audio.echoCancellation,
                            noiseSuppression: t.audio.noiseSuppression
                        },
                        i = !(!t.video || !t.video.enabled) && {
                            frameRate: t.video.frameRate,
                            height: t.video.height,
                            width: t.video.width,
                            deviceId: t.video.deviceId
                        },
                        !A(t) || !t.screen) {
                            e.next = 23;
                            break
                        }
                        if (!h.browserReport.getDisplayMedia || t.screen.forceChromePlugin) {
                            e.next = 19;
                            break
                        }
                        return e.abrupt("return", lt({
                            audio: n,
                            video: {
                                displaySurface: pt(t.screen.source),
                                width: t.screen.width,
                                height: t.screen.height,
                                frameRate: t.screen.frameRate
                            }
                        }));
                    case 19:
                        return e.next = 21,
                        ze(!1, t.screen);
                    case 21:
                        return a = e.sent,
                        e.abrupt("return", lt({
                            audio: n,
                            video: a
                        }));
                    case 23:
                        return e.abrupt("return", lt({
                            audio: n,
                            video: i
                        }));
                    case 24:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }

        function pt(e) {
            switch (e) {
            case "window":
                return "application";
            case "screen":
                return ["window", "monitor"];
            default:
                return
            }
        }
        var lt = function(e) {
            return function(e) {
                0 === Object.keys(e.audio).length && "boolean" !== typeof e.audio && (e.audio = !0);
                0 === Object.keys(e.video).length && "boolean" !== typeof e.video && (e.video = !0);
                return e
            } (function(e) {
                if (h.browserReport.minMaxWithIdeal) return e;
                return ["video", "screen"].forEach(function(t) {
                    "object" === typeof e[t] && "object" === typeof e[t].width && e[t].width.ideal && delete e[t].width.ideal,
                    "object" === typeof e[t] && "object" === typeof e[t].height && e[t].height.ideal && delete e[t].height.ideal
                }),
                e
            } (function e(t) {
                var r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                if (r >= 4) return t;
                for (var n in t) void 0 === t[n] && delete t[n],
                "object" === typeof t[n] && (t[n] = e(t[n], r + 1));
                return t
            } (e)))
        };

        function ft(e) {
            if (e) return "number" === typeof e ? e: e.exact ? e.exact: e.max ? e.max: e.ideal ? e.ideal: e.min ? e.min: void 0
        }
        var ht = "\n",
        mt = "qiniu-rtc-client",
        vt = function() {
            function e(t, r) {
                p(this, e),
                this.lastSubMids = [],
                this.sessionVersion = 0,
                this.direction = t,
                this.extendedRtpCapabilities = r
            }
            return l(e, [{
                key: "setTransportRemoteParameters",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n, i, a, s, c;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                r = !0,
                                n = !1,
                                i = void 0,
                                e.prev = 3,
                                a = t.iceCandidates[Symbol.iterator]();
                            case 5:
                                if (r = (s = a.next()).done) {
                                    e.next = 13;
                                    break
                                }
                                return c = s.value,
                                e.next = 9,
                                Ce(c.ip);
                            case 9:
                                c.ip = e.sent;
                            case 10:
                                r = !0,
                                e.next = 5;
                                break;
                            case 13:
                                e.next = 19;
                                break;
                            case 15:
                                e.prev = 15,
                                e.t0 = e.
                                catch(3),
                                n = !0,
                                i = e.t0;
                            case 19:
                                e.prev = 19,
                                e.prev = 20,
                                r || null == a.
                                return || a.
                                return ();
                            case 22:
                                if (e.prev = 22, !n) {
                                    e.next = 25;
                                    break
                                }
                                throw i;
                            case 25:
                                return e.finish(22);
                            case 26:
                                return e.finish(19);
                            case 27:
                                this._transportRemoteParameters = t;
                            case 28:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[3, 15, 19, 27], [20, , 22, 26]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "createRemoteAnswer",
                value: function(e) {
                    if (!this.transportRemoteParameters) throw J("no transportRemoteParameters!");
                    return h.browserReport.unifiedPlan ?
                    function(e, t, r) {
                        var n = w.parse(r),
                        i = (n.media || []).filter(function(e) {
                            return e.hasOwnProperty("mid")
                        }).map(function(e) {
                            return String(e.mid)
                        }),
                        a = {
                            version: 0
                        };
                        a.origin = {
                            address: "0.0.0.0",
                            ipVer: 4,
                            netType: "IN",
                            sessionId: "5975129998295344376",
                            sessionVersion: 2,
                            username: mt
                        },
                        a.name = "-",
                        a.timing = {
                            start: 0,
                            stop: 0
                        },
                        a.icelite = t.iceParameters.iceLite ? "ice-lite": void 0,
                        a.msidSemantic = {
                            semantic: "WMS",
                            token: "*"
                        },
                        i.length > 0 && (a.groups = [{
                            type: "BUNDLE",
                            mids: i.join(" ")
                        }]);
                        a.media = [],
                        a.fingerprint = {
                            type: t.dtlsParameters.fingerprints[0].algorithm,
                            hash: t.dtlsParameters.fingerprints[0].value
                        };
                        var o = !0,
                        s = !1,
                        c = void 0;
                        try {
                            for (var u, d = function() {
                                var r = u.value,
                                n = (r.direction, r.type),
                                i = "audio" === n ? e.codecs[0] : e.codecs[1],
                                o = e.headerExtensions.filter(function(e) {
                                    return e.kind === n
                                }),
                                s = {
                                    type: r.type,
                                    port: 7,
                                    protocol: "RTP/SAVPF",
                                    connection: {
                                        ip: "127.0.0.1",
                                        version: 4
                                    },
                                    mid: r.mid,
                                    iceUfrag: t.iceParameters.usernameFragment,
                                    icePwd: t.iceParameters.password,
                                    candidates: t.iceCandidates.map(function(e) {
                                        return {
                                            component: 1,
                                            foundation: e.foundation,
                                            ip: e.ip,
                                            port: e.port,
                                            priority: e.priority,
                                            transport: e.protocol,
                                            type: e.type
                                        }
                                    }),
                                    endOfCandidates: "end-of-candidates",
                                    iceOptions: "renomination",
                                    setup: "server" === t.dtlsParameters.role ? "actpass": "active",
                                    direction: "sendonly" === r.direction || "sendrecv" === r.direction ? "recvonly": "inactive",
                                    rtp: [{
                                        payload: i.sendPayloadType,
                                        codec: i.name,
                                        rate: i.clockRate,
                                        encoding: i.channels > 1 ? i.channels: void 0
                                    }],
                                    rtcpFb: [],
                                    fmtp: [{
                                        payload: i.sendPayloadType,
                                        config: Object.keys(i.parameters).map(function(e) {
                                            return "".concat(e, "=").concat(i.parameters[e], ";")
                                        }).join("")
                                    }],
                                    payloads: i.sendPayloadType,
                                    rtcpMux: "rtcp-mux",
                                    rtcpRsize: "rtcp-rsize",
                                    ext: o.map(function(e) {
                                        return {
                                            uri: e.uri,
                                            value: e.sendId
                                        }
                                    })
                                };
                                i.rtcpFeedback && i.rtcpFeedback.length > 0 && i.rtcpFeedback.forEach(function(e) {
                                    s.rtcpFb.push({
                                        payload: i.sendPayloadType,
                                        type: e.type,
                                        subtype: e.parameter
                                    })
                                }),
                                i.sendRtxPayloadType && (s.rtp.push({
                                    payload: i.sendRtxPayloadType,
                                    codec: "rtx",
                                    rate: i.clockRate,
                                    encoding: i.channels > 1 ? i.channels: void 0
                                }), s.fmtp.push({
                                    payload: i.sendRtxPayloadType,
                                    config: "apt=".concat(i.sendPayloadType, ";")
                                }), s.payloads = "".concat(i.sendPayloadType, " ").concat(i.sendRtxPayloadType)),
                                a.media.push(s)
                            },
                            p = n.media[Symbol.iterator](); ! (o = (u = p.next()).done); o = !0) d()
                        } catch(l) {
                            s = !0,
                            c = l
                        } finally {
                            try {
                                o || null == p.
                                return || p.
                                return ()
                            } finally {
                                if (s) throw c
                            }
                        }
                        return w.write(a)
                    } (this.extendedRtpCapabilities, this.transportRemoteParameters, e) : function(e, t, r) {
                        var n = w.parse(r);
                        n.version = 0,
                        n.origin = {
                            address: "0.0.0.0",
                            ipVer: 4,
                            netType: "IN",
                            sessionId: "5975129998295344376",
                            sessionVersion: 2,
                            username: mt
                        },
                        n.name = "-",
                        n.timing = {
                            start: 0,
                            stop: 0
                        },
                        n.icelite = t.iceParameters.iceLite ? "ice-lite": void 0,
                        n.msidSemantic = {
                            semantic: "WMS",
                            token: "*"
                        },
                        n.fingerprint = {
                            type: t.dtlsParameters.fingerprints[0].algorithm,
                            hash: t.dtlsParameters.fingerprints[0].value
                        };
                        var i = [],
                        a = !0,
                        o = !1,
                        s = void 0;
                        try {
                            for (var c, u = function() {
                                var r = c.value,
                                n = r.type,
                                a = e.codecs.find(function(e) {
                                    return e.kind === n
                                }),
                                o = (e.headerExtensions || []).filter(function(e) {
                                    return e.kind === n
                                });
                                if (!a) throw J("can not find codec" + n);
                                var s = {
                                    type: n,
                                    mid: n,
                                    port: 7,
                                    protocol: "RTP/SAVPF",
                                    connection: {
                                        ip: "127.0.0.1",
                                        version: 4
                                    },
                                    iceUfrag: t.iceParameters.usernameFragment,
                                    icePwd: t.iceParameters.password,
                                    candidates: t.iceCandidates.map(function(e) {
                                        return {
                                            component: 1,
                                            foundation: e.foundation,
                                            ip: e.ip,
                                            port: e.port,
                                            priority: e.priority,
                                            transport: e.protocol,
                                            type: e.type
                                        }
                                    }),
                                    endOfCandidates: "end-of-candidates",
                                    iceOptions: "renomination",
                                    setup: "server" === t.dtlsParameters.role ? "actpass": "active",
                                    direction: "recvonly",
                                    rtp: [{
                                        payload: a.sendPayloadType,
                                        codec: a.name,
                                        rate: a.clockRate,
                                        encoding: a.channels > 1 ? a.channels: void 0
                                    }],
                                    rtcpFb: [],
                                    fmtp: [{
                                        payload: a.sendPayloadType,
                                        config: Object.keys(a.parameters).map(function(e) {
                                            return "".concat(e, "=").concat(a.parameters[e], ";")
                                        }).join("")
                                    }],
                                    payloads: a.sendPayloadType,
                                    rtcpMux: "rtcp-mux",
                                    rtcpRsize: "rtcp-rsize",
                                    ext: o.map(function(e) {
                                        return {
                                            uri: e.uri,
                                            value: e.sendId
                                        }
                                    })
                                };
                                a.rtcpFeedback && a.rtcpFeedback.length > 0 && a.rtcpFeedback.forEach(function(e) {
                                    s.rtcpFb.push({
                                        payload: a.sendPayloadType,
                                        type: e.type,
                                        subtype: e.parameter
                                    })
                                }),
                                a.sendRtxPayloadType && (s.rtp.push({
                                    payload: a.sendRtxPayloadType,
                                    codec: "rtx",
                                    rate: a.clockRate,
                                    encoding: a.channels > 1 ? a.channels: void 0
                                }), s.fmtp.push({
                                    payload: a.sendRtxPayloadType,
                                    config: "apt=".concat(a.sendPayloadType, ";")
                                }), s.payloads = "".concat(a.sendPayloadType, " ").concat(a.sendRtxPayloadType)),
                                i.push(s)
                            },
                            d = n.media[Symbol.iterator](); ! (a = (c = d.next()).done); a = !0) u()
                        } catch(p) {
                            o = !0,
                            s = p
                        } finally {
                            try {
                                a || null == d.
                                return || d.
                                return ()
                            } finally {
                                if (o) throw s
                            }
                        }
                        return n.media = i,
                        w.write(n)
                    } (this.extendedRtpCapabilities, this.transportRemoteParameters, e)
                }
            },
            {
                key: "createRemoteOffer",
                value: function(e) {
                    if (!this.transportRemoteParameters) throw J("no transportRemoteParameters!");
                    if (h.browserReport.unifiedPlan) {
                        var t = function(e, t) {
                            var r = [],
                            n = !0,
                            i = !1,
                            a = void 0;
                            try {
                                for (var o, s = function() {
                                    var t = o.value,
                                    n = k(e,
                                    function(e) {
                                        return e.mid === t
                                    })[0];
                                    if (!n) return "continue";
                                    r.push(n)
                                },
                                c = t[Symbol.iterator](); ! (n = (o = c.next()).done); n = !0) s()
                            } catch(u) {
                                i = !0,
                                a = u
                            } finally {
                                try {
                                    n || null == c.
                                    return || c.
                                    return ()
                                } finally {
                                    if (i) throw a
                                }
                            }
                            return r = r.concat(e),
                            t = r.map(function(e) {
                                return e.mid
                            }),
                            r
                        } (e, this.lastSubMids);
                        return this.lastSubMids = t.map(function(e) {
                            return e.mid
                        }),
                        this.sessionVersion += 1,
                        function(e, t, r, n) {
                            F.debug("consumerInfos", e);
                            var i = {},
                            a = e.map(function(e) {
                                return e.mid
                            });
                            i.version = 0,
                            i.origin = {
                                address: "0.0.0.0",
                                ipVer: 4,
                                netType: "IN",
                                sessionId: "5975129998295344377",
                                sessionVersion: n,
                                username: mt
                            },
                            i.name = "-",
                            i.timing = {
                                start: 0,
                                stop: 0
                            },
                            i.icelite = r.iceParameters.iceLite ? "ice-lite": void 0,
                            i.msidSemantic = {
                                semantic: "WMS",
                                token: "*"
                            },
                            a.length > 0 && (i.groups = [{
                                type: "BUNDLE",
                                mids: a.join(" ")
                            }]);
                            i.media = [],
                            i.fingerprint = {
                                type: r.dtlsParameters.fingerprints[0].algorithm,
                                hash: r.dtlsParameters.fingerprints[0].value
                            };
                            var o = !0,
                            s = !1,
                            c = void 0;
                            try {
                                for (var u, d = function() {
                                    var e = u.value,
                                    n = "audio" === e.kind ? t.codecs[0] : t.codecs[1],
                                    a = t.headerExtensions.filter(function(t) {
                                        return t.kind === e.kind
                                    }),
                                    o = {
                                        type: e.kind,
                                        port: 7,
                                        protocol: "RTP/SAVPF",
                                        connection: {
                                            ip: "127.0.0.1",
                                            version: 4
                                        },
                                        mid: e.mid,
                                        msid: "".concat(e.streamId, " ").concat(e.trackId),
                                        iceUfrag: r.iceParameters.usernameFragment,
                                        icePwd: r.iceParameters.password,
                                        candidates: r.iceCandidates.map(function(e) {
                                            return {
                                                component: 1,
                                                foundation: e.foundation,
                                                ip: e.ip,
                                                port: e.port,
                                                priority: e.priority,
                                                transport: e.protocol,
                                                type: e.type
                                            }
                                        }),
                                        endOfCandidates: "end-of-candidates",
                                        iceOptions: "renomination",
                                        setup: "server" === r.dtlsParameters.role ? "actpass": "active",
                                        direction: e.closed ? "inactive": "sendonly",
                                        rtp: [{
                                            payload: n.recvPayloadType,
                                            codec: n.name,
                                            rate: n.clockRate,
                                            encoding: n.channels > 1 ? n.channels: void 0
                                        }],
                                        rtcpFb: [],
                                        fmtp: [{
                                            payload: n.recvPayloadType,
                                            config: Object.keys(n.parameters).map(function(e) {
                                                return "".concat(e, "=").concat(n.parameters[e], ";")
                                            }).join("")
                                        }],
                                        payloads: n.recvPayloadType,
                                        rtcpMux: "rtcp-mux",
                                        rtcpRsize: "rtcp-rsize",
                                        ext: e.closed ? [] : a.map(function(e) {
                                            return {
                                                uri: e.uri,
                                                value: e.recvId
                                            }
                                        }),
                                        ssrcs: !e.closed && e.ssrc ? [{
                                            id: e.ssrc,
                                            attribute: "cname",
                                            value: e.cname
                                        }] : [],
                                        ssrcGroups: []
                                    };
                                    n.rtcpFeedback && n.rtcpFeedback.length > 0 && n.rtcpFeedback.forEach(function(e) {
                                        o.rtcpFb.push({
                                            payload: n.recvPayloadType,
                                            type: e.type,
                                            subtype: e.parameter
                                        })
                                    }),
                                    n.recvRtxPayloadType && (o.rtp.push({
                                        payload: n.recvRtxPayloadType,
                                        codec: "rtx",
                                        rate: n.clockRate,
                                        encoding: n.channels > 1 ? n.channels: void 0
                                    }), o.fmtp.push({
                                        payload: n.recvRtxPayloadType,
                                        config: "apt=".concat(n.recvPayloadType, ";")
                                    }), o.payloads = "".concat(n.recvPayloadType, " ").concat(n.recvRtxPayloadType)),
                                    e.rtxSsrc && !e.closed && (o.ssrcs = o.ssrcs.concat([{
                                        id: e.rtxSsrc,
                                        attribute: "cname",
                                        value: e.cname
                                    }]), o.ssrcGroups.push({
                                        semantics: "FID",
                                        ssrcs: "".concat(e.ssrc, " ").concat(e.rtxSsrc)
                                    })),
                                    i.media.push(o)
                                },
                                p = e[Symbol.iterator](); ! (o = (u = p.next()).done); o = !0) d()
                            } catch(l) {
                                s = !0,
                                c = l
                            } finally {
                                try {
                                    o || null == p.
                                    return || p.
                                    return ()
                                } finally {
                                    if (s) throw c
                                }
                            }
                            return w.write(i)
                        } (t, this.extendedRtpCapabilities, this.transportRemoteParameters, this.sessionVersion)
                    }
                    var r = new Set;
                    return e.forEach(function(e) {
                        return r.add(e.kind)
                    }),
                    0 === e.length && (r.add("audio"), r.add("video")),
                    function(e, t, r, n) {
                        e = ["audio", "video"];
                        var i = {
                            version: 0
                        };
                        i.origin = {
                            address: "0.0.0.0",
                            ipVer: 4,
                            netType: "IN",
                            sessionId: "5975129998295344377",
                            sessionVersion: 2,
                            username: mt
                        },
                        i.name = "-",
                        i.timing = {
                            start: 0,
                            stop: 0
                        },
                        i.icelite = n.iceParameters.iceLite ? "ice-lite": void 0,
                        i.msidSemantic = {
                            semantic: "WMS",
                            token: "*"
                        },
                        i.groups = [{
                            type: "BUNDLE",
                            mids: e.join(" ")
                        }],
                        i.media = [],
                        i.fingerprint = {
                            type: n.dtlsParameters.fingerprints[0].algorithm,
                            hash: n.dtlsParameters.fingerprints[0].value
                        };
                        var a = !0,
                        o = !1,
                        s = void 0;
                        try {
                            for (var c, u = function() {
                                var e = c.value,
                                a = t.filter(function(t) {
                                    return t.kind === e
                                }),
                                o = r.codecs.find(function(t) {
                                    return t.kind === e
                                }),
                                s = (r.headerExtensions || []).filter(function(t) {
                                    return t.kind === e
                                });
                                if (!o) throw J("no codec" + e);
                                var u = {
                                    type: e,
                                    port: 7,
                                    protocol: "RTP/SAVPF",
                                    connection: {
                                        ip: "127.0.0.1",
                                        version: 4
                                    },
                                    mid: e,
                                    iceUfrag: n.iceParameters.usernameFragment,
                                    icePwd: n.iceParameters.password,
                                    candidates: n.iceCandidates.map(function(e) {
                                        return {
                                            component: 1,
                                            foundation: e.foundation,
                                            ip: e.ip,
                                            port: e.port,
                                            priority: e.priority,
                                            transport: e.protocol,
                                            type: e.type
                                        }
                                    }),
                                    endOfCandidates: "end-of-candidates",
                                    iceOptions: "renomination",
                                    setup: "server" === n.dtlsParameters.role ? "actpass": "active",
                                    direction: "sendonly",
                                    rtp: [{
                                        payload: o.recvPayloadType,
                                        codec: o.name,
                                        rate: o.clockRate,
                                        encoding: o.channels > 1 ? o.channels: void 0
                                    }],
                                    rtcpFb: [],
                                    fmtp: [{
                                        payload: o.recvPayloadType,
                                        config: Object.keys(o.parameters).map(function(e) {
                                            return "".concat(e, "=").concat(o.parameters[e], ";")
                                        }).join("")
                                    }],
                                    payloads: o.recvPayloadType,
                                    rtcpMux: "rtcp-mux",
                                    rtcpRsize: "rtcp-rsize",
                                    ssrcs: [],
                                    ssrcGroups: [],
                                    ext: s.map(function(e) {
                                        return {
                                            uri: e.uri,
                                            value: e.recvId
                                        }
                                    })
                                };
                                o.rtcpFeedback && o.rtcpFeedback.length > 0 && o.rtcpFeedback.forEach(function(e) {
                                    u.rtcpFb.push({
                                        payload: o.recvPayloadType,
                                        type: e.type,
                                        subtype: e.parameter
                                    })
                                }),
                                o.recvRtxPayloadType && (u.rtp.push({
                                    payload: o.recvRtxPayloadType,
                                    codec: "rtx",
                                    rate: o.clockRate,
                                    encoding: o.channels > 1 ? o.channels: void 0
                                }), u.fmtp.push({
                                    payload: o.recvRtxPayloadType,
                                    config: "apt=".concat(o.recvPayloadType, ";")
                                }), u.payloads = "".concat(o.recvPayloadType, " ").concat(o.recvRtxPayloadType));
                                var d = !0,
                                p = !1,
                                l = void 0;
                                try {
                                    for (var f, h = a[Symbol.iterator](); ! (d = (f = h.next()).done); d = !0) {
                                        var m = f.value;
                                        u.ssrcs.push({
                                            id: m.ssrc,
                                            attribute: "msid",
                                            value: "".concat(m.streamId, " ").concat(m.trackId)
                                        }),
                                        u.ssrcs.push({
                                            id: m.ssrc,
                                            attribute: "mslabel",
                                            value: "".concat(m.streamId)
                                        }),
                                        u.ssrcs.push({
                                            id: m.ssrc,
                                            attribute: "label",
                                            value: "".concat(m.trackId)
                                        }),
                                        u.ssrcs.push({
                                            id: m.ssrc,
                                            attribute: "cname",
                                            value: "".concat(m.cname)
                                        }),
                                        m.rtxSsrc && (u.ssrcGroups.push({
                                            semantics: "FID",
                                            ssrcs: "".concat(m.ssrc, " ").concat(m.rtxSsrc)
                                        }), u.ssrcs.push({
                                            id: m.rtxSsrc,
                                            attribute: "msid",
                                            value: "".concat(m.streamId, " ").concat(m.trackId)
                                        }), u.ssrcs.push({
                                            id: m.rtxSsrc,
                                            attribute: "mslabel",
                                            value: "".concat(m.streamId)
                                        }), u.ssrcs.push({
                                            id: m.rtxSsrc,
                                            attribute: "label",
                                            value: "".concat(m.trackId)
                                        }), u.ssrcs.push({
                                            id: m.rtxSsrc,
                                            attribute: "cname",
                                            value: "".concat(m.cname)
                                        }))
                                    }
                                } catch(v) {
                                    p = !0,
                                    l = v
                                } finally {
                                    try {
                                        d || null == h.
                                        return || h.
                                        return ()
                                    } finally {
                                        if (p) throw l
                                    }
                                }
                                i.media.push(u)
                            },
                            d = e[Symbol.iterator](); ! (a = (c = d.next()).done); a = !0) u()
                        } catch(p) {
                            o = !0,
                            s = p
                        } finally {
                            try {
                                a || null == d.
                                return || d.
                                return ()
                            } finally {
                                if (o) throw s
                            }
                        }
                        return w.write(i)
                    } (Array.from(r), e, this.extendedRtpCapabilities, this.transportRemoteParameters)
                }
            },
            {
                key: "updateICEData",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        var n, i, a, s, c, u;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.transportRemoteParameters) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                n = !0,
                                i = !1,
                                a = void 0,
                                e.prev = 5,
                                s = r[Symbol.iterator]();
                            case 7:
                                if (n = (c = s.next()).done) {
                                    e.next = 15;
                                    break
                                }
                                return u = c.value,
                                e.next = 11,
                                Ce(u.ip);
                            case 11:
                                u.ip = e.sent;
                            case 12:
                                n = !0,
                                e.next = 7;
                                break;
                            case 15:
                                e.next = 21;
                                break;
                            case 17:
                                e.prev = 17,
                                e.t0 = e.
                                catch(5),
                                i = !0,
                                a = e.t0;
                            case 21:
                                e.prev = 21,
                                e.prev = 22,
                                n || null == s.
                                return || s.
                                return ();
                            case 24:
                                if (e.prev = 24, !i) {
                                    e.next = 27;
                                    break
                                }
                                throw a;
                            case 27:
                                return e.finish(24);
                            case 28:
                                return e.finish(21);
                            case 29:
                                this.transportRemoteParameters.iceCandidates = r,
                                this.transportRemoteParameters.iceParameters = t;
                            case 31:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[5, 17, 21, 29], [22, , 24, 28]])
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "transportRemoteParameters",
                get: function() {
                    return this._transportRemoteParameters
                }
            }]),
            e
        } ();

        function kt() {
            return yt.apply(this, arguments)
        }

        function yt() {
            return (yt = s(o.mark(function e() {
                var t, r, n, i;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return t = Ie(),
                        r = {
                            offerToReceiveAudio: !0,
                            offerToReceiveVideo: !0
                        },
                        e.next = 4,
                        t.createOffer(r);
                    case 4:
                        return n = e.sent,
                        h.browserReport.needH264FmtpLine && (n.sdp += "a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f".concat(ht)),
                        i = {
                            capsdp: n.sdp,
                            agent: navigator.userAgent
                        },
                        t.close(),
                        e.abrupt("return", i);
                    case 9:
                    case "end":
                        return e.stop()
                    }
                },
                e, this)
            }))).apply(this, arguments)
        }
        var gt = "https://rtc.qiniuapi.com";

        function bt(e, t) {
            return Tt.apply(this, arguments)
        }

        function Tt() {
            return (Tt = s(o.mark(function e(t, r) {
                var n, i, a, s, c, u;
                return o.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        n = t.appId,
                        i = t.roomName,
                        a = t.userId,
                        s = "".concat(gt, "/v3/apps/").concat(n, "/rooms/").concat(i, "/auth?user=").concat(a, "&token=").concat(r);
                    case 2:
                        return c = {
                            auth_start_time: Date.now(),
                            auth_dns_time: 0,
                            auth_server_ip: "",
                            room_token: r
                        },
                        e.prev = 4,
                        e.next = 7,
                        Se(s);
                    case 7:
                        return u = e.sent,
                        z.addEvent("MCSAuth", _({},
                        c, {
                            auth_take_time: Date.now() - c.auth_start_time,
                            auth_error_code: 0,
                            auth_error_message: "",
                            access_token: u.accessToken
                        })),
                        e.abrupt("return", u);
                    case 12:
                        if (e.prev = 12, e.t0 = e.
                        catch(4), z.addEvent("MCSAuth", _({},
                        c, {
                            auth_take_time: Date.now() - c.auth_start_time,
                            auth_error_code: void 0 === e.t0.retry ? -1 : Number(e.t0.message),
                            auth_error_message: void 0 === e.t0.retry ? e.t0.toString() : e.t0.message,
                            access_token: ""
                        })), !1 !== e.t0.retry) {
                            e.next = 17;
                            break
                        }
                        throw G(e.t0.message);
                    case 17:
                        return e.next = 19,
                        ye(1e3);
                    case 19:
                        F.warning("can not get accessToken, retry.", G(e.t0));
                    case 20:
                        e.next = 2;
                        break;
                    case 22:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[4, 12]])
            }))).apply(this, arguments)
        }
        var St, wt = ue.JOIN_ROOM_ERROR; !
        function(e) {
            e[e.CONNECTING = 0] = "CONNECTING",
            e[e.OPEN = 1] = "OPEN",
            e[e.CLOSING = 2] = "CLOSING",
            e[e.CLOSED = 3] = "CLOSED"
        } (St || (St = {}));
        var Ct, _t = function(e) {
            function t(e, r, n, a) {
                var o;
                return p(this, t),
                (o = c(this, u(t).call(this))).startAuthTime = 0,
                o.initWs = function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    return new Promise(function(t, r) {
                        o.ws && o.ws.readyState === WebSocket.OPEN && (o.ws.close(), o.ws.onclose = null),
                        o.startAuthTime = Date.now();
                        try {
                            o.ws = new WebSocket(o.url),
                            o._state = St.CONNECTING
                        } catch(n) {
                            throw J("init signaling websocket faild!\nError: ".concat(n))
                        }
                        o.ws.onerror = o.onWsError,
                        o.ws.onclose = o.onWsClose.bind(i(i(o)), t, r),
                        o.ws.onopen = function() {
                            o.emit("ws:onopen"),
                            F.log("signaling: websocket open", o.url),
                            o.ws.onmessage = o.onWsMsg;
                            var n = {
                                token: o.accessToken,
                                reconntoken: o.reconnectToken,
                                agent: "".concat(h.browser.name).concat(h.browser.version),
                                sdkversion: N,
                                capsdp: o.capsdp,
                                msgsn: o.customMsgNumber,
                                supportdomain: !0
                            };
                            o.playerdata && (n.playerdata = o.playerdata),
                            o.request("auth", n).then(function(n) {
                                switch (0 !== n.code && (z.addEvent("SignalAuth", {
                                    auth_start_time: o.startAuthTime,
                                    auth_dns_time: 0,
                                    auth_server_ip: "",
                                    auth_error_code: n.code,
                                    auth_error_message: n.error,
                                    auth_take_time: Date.now() - o.startAuthTime,
                                    access_token: o.accessToken
                                }), o.startAuthTime = 0), n.code) {
                                case 0:
                                    o.ws.onclose = o.onWsClose.bind(i(i(o)), null, null),
                                    o.reconnectToken = n.reconntoken,
                                    F.log("signaling: websocket authed"),
                                    o.emit("@signalingauth", n),
                                    o._state = St.OPEN,
                                    z.addEvent("SignalAuth", {
                                        auth_start_time: o.startAuthTime,
                                        auth_dns_time: 0,
                                        auth_server_ip: "",
                                        auth_error_code: 0,
                                        auth_error_message: "",
                                        auth_take_time: Date.now() - o.startAuthTime,
                                        access_token: o.accessToken
                                    }),
                                    o.startAuthTime = 0,
                                    t(n);
                                    break;
                                case 10001:
                                case 10002:
                                case 10011:
                                case 10022:
                                case 10004:
                                    o.emit("@error", n),
                                    r(wt(n.code, n.error));
                                    break;
                                case 10012:
                                    return void o.safeEmitAsPromise("@needupdateaccesstoken").then(function() {
                                        o.reconnect().then(t).
                                        catch(r)
                                    }).
                                    catch(function(e) {
                                        o.emit("@error", {
                                            code: 10002
                                        }),
                                        r(e)
                                    });
                                case 10052:
                                    if (F.debug("10052 auth, retry", e), o.reconnectToken = void 0, e) {
                                        r(wt(n.code, n.error));
                                        break
                                    }
                                    return void o.emit("@error", n);
                                case 10054:
                                    r($(n.error));
                                    break;
                                default:
                                    r(J(n.error))
                                }
                                0 !== n.code && (o.reconnectToken = void 0, o._state = St.CLOSED, o.release())
                            })
                        }
                    })
                },
                o.onWsMsg = function(e) {
                    var t = e.data;
                    o.emit("ws:onmessage", t);
                    var r = t.indexOf("=");
                    if (! (r > 0)) throw J("signaling model can not parse message: ".concat(t));
                    var n = t.substring(0, r),
                    i = JSON.parse(t.substring(r + 1));
                    o.receiveWsMsg(n, i)
                },
                o.onWsError = function(e) {
                    F.warning("signaling: websocket error", e),
                    o.emit("@ws:error", e)
                },
                o.sendWsMsg = function(e, t) {
                    if (o.ws.readyState !== WebSocket.OPEN) throw se();
                    var r = JSON.stringify(t);
                    try {
                        o.ws.send("".concat(e, "=").concat(r)),
                        o.emit("send", e, t)
                    } catch(n) {
                        throw F.warning("signaling: websocket send error", n),
                        o.reconnect().
                        catch(function(e) {
                            F.warning("signaling: reconnect error", e)
                        }),
                        se()
                    }
                },
                o.handlePing = function() {
                    o.sendWsMsg("pong", {}),
                    o.reconnectTimeoutID && clearTimeout(o.reconnectTimeoutID),
                    o.reconnectTimeoutID = setTimeout(function() {
                        F.debug("signaling: websocket heartbeat timeout"),
                        o.reconnect().
                        catch(function(e) {
                            F.debug(e)
                        })
                    },
                    9e3)
                },
                o.receiveWsMsg = function(e, t) {
                    switch (o.emit("receive", e, t), e) {
                    case "ping":
                        o.handlePing();
                        break;
                    case "auth-res":
                        o.emit("@auth-res", t);
                    case "pubpc-res":
                    case "subpc-res":
                    case "pub-tracks":
                    case "webrtc-candidate":
                    case "on-player-in":
                    case "on-player-out":
                    case "disconnect":
                    case "mute-tracks":
                    case "on-add-tracks":
                    case "on-remove-tracks":
                        o.emit(e, t);
                        break;
                    case "sub-res":
                    case "unsub-res":
                        o.emit(e, t),
                        o.emit("".concat(e, "-").concat(t.streamid), t);
                        break;
                    case "control-res":
                        o.emit(e, t),
                        o.emit("".concat(e, "-").concat(t.command, "-").concat(t.playerid), t);
                        break;
                    case "on-pubpc-connected":
                    case "on-pubpc-disconnected":
                        o.emit("on-pubpc-state", {
                            pcid: t.pcid,
                            connected: "on-pubpc-connected" === e
                        }),
                        o.emit("".concat(e, "-").concat(t.pcid), t);
                        break;
                    case "on-subpc-disconnected":
                    case "on-subpc-connected":
                        o.emit("on-subpc-state", {
                            pcid: t.pcid,
                            connected: "on-subpc-connected" === e
                        }),
                        o.emit(e, t);
                        break;
                    case "pub-tracks-res":
                        o.emit(e, t);
                        break;
                    case "on-messages":
                        t.messages = t.messages.sort(function(e, t) {
                            return e.msgsn - t.msgsn
                        }),
                        o.customMsgNumber = t.messages[t.messages.length - 1].msgsn,
                        o.emit(e, t);
                        break;
                    case "unpub-tracks-res":
                    case "sub-tracks-res":
                    case "unsub-tracks-res":
                    case "on-pubpc-restart-notify":
                    case "on-subpc-restart-notify":
                    case "pubpc-restart-res":
                    case "subpc-restart-res":
                    case "create-merge-job-res":
                        o.emit(e, t)
                    }
                },
                o.url = e,
                o.accessToken = r,
                o.capsdp = n,
                o.playerdata = a,
                o
            }
            return d(t, We),
            l(t, [{
                key: "onWsClose",
                value: function(e, t, r) {
                    this._state = St.CLOSED,
                    F.warning("signaling: websocket onclose", r),
                    this.startAuthTime && z.addEvent("SignalAuth", {
                        auth_start_time: this.startAuthTime,
                        auth_dns_time: 0,
                        auth_server_ip: "",
                        auth_error_code: r.code,
                        auth_error_message: r.toString(),
                        auth_take_time: Date.now() - this.startAuthTime,
                        access_token: this.accessToken
                    });
                    var n = this.reconnectPromise;
                    switch (r.code) {
                    case 1e3:
                        this.emit("@closed");
                        break;
                    case 1001:
                    case 1005:
                    case 1006:
                        n = this.reconnect();
                        break;
                    case 1007:
                    case 1008:
                    case 1009:
                    case 1010:
                        break;
                    case 1011:
                        n = this.reconnect();
                        break;
                    case 1012:
                        n = this.reconnect(5e3);
                        break;
                    case 1013:
                        n = this.reconnect();
                        break;
                    case 1014:
                        n = this.reconnect(5e3)
                    }
                    e && t && (n ? e(n) : t(r))
                }
            },
            {
                key: "sendDisconnect",
                value: function() {
                    if (this.state === St.OPEN) try {
                        this.sendWsMsg("disconnect", {})
                    } catch(ue) {}
                }
            },
            {
                key: "reconnect",
                value: function() {
                    var e = this,
                    t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1e3;
                    return this.reconnectTimeoutID && clearTimeout(this.reconnectTimeoutID),
                    this.reconnectPromise && this._state === St.CONNECTING ? this.reconnectPromise: (this._state = St.CONNECTING, F.debug("signaling: websocket reconnecting"), this.reconnectPromise = ye(t).then(function() {
                        return e.initWs()
                    }).then(function(t) {
                        return e.reconnectPromise = void 0,
                        t
                    }).
                    catch(function(t) {
                        return e._state = St.CLOSED,
                        e.emit("error", t),
                        Promise.reject(t)
                    }), this.reconnectPromise)
                }
            },
            {
                key: "request",
                value: function(e, t) {
                    var r = this,
                    n = ke(8);
                    return t.rpcid = n,
                    F.log("ws request", n, e, t),
                    this.sendWsMsg(e, t),
                    new Promise(function(t) {
                        r.on("".concat(e, "-res"),
                        function i(a) {
                            a.rpcid === n && (F.log("ws response", n, e, a), r.off("".concat(e, "-res"), i), t(a))
                        })
                    })
                }
            },
            {
                key: "release",
                value: function() {
                    this.reconnectTimeoutID && clearTimeout(this.reconnectTimeoutID),
                    this.removeEvent(),
                    this.ws.onclose = null,
                    this.ws.onerror = null,
                    this.ws.close()
                }
            },
            {
                key: "_state",
                set: function(e) {
                    this.emit("@ws-state-change", this.__state, e),
                    this.__state = e
                }
            },
            {
                key: "state",
                get: function() {
                    return this.__state
                }
            }]),
            t
        } (),
        xt = function e() {
            p(this, e)
        },
        Rt = function() {
            function e(t, r, n, i) {
                var a = this;
                p(this, e),
                this.videoTrackInfo = [],
                this.audioTrackInfo = [],
                this.layoutLevel = 0,
                this.width = t,
                this.height = r,
                this.jobId = i,
                this.controller = n,
                this.controller.getCurrentTracks().forEach(function(e) {
                    "audio" === e.kind ? a.audioTrackInfo.push(e) : a.videoTrackInfo.push(e)
                }),
                this.controller.addMergeTrack(this.audioTrackInfo.map(function(e) {
                    return {
                        trackId: e.trackId
                    }
                }), this.jobId),
                this.initLayout(),
                this.controller.onAddTracks = function(e) {
                    var t = e.filter(function(e) {
                        return "audio" === e.kind
                    }),
                    r = e.filter(function(e) {
                        return "video" === e.kind
                    });
                    a.controller.addMergeTrack(t.map(function(e) {
                        return {
                            trackId: e.trackId
                        }
                    }), a.jobId),
                    r.forEach(a.handleAddVideoTrack.bind(a))
                },
                this.controller.onRemoveTracks = function(e) {
                    e.filter(function(e) {
                        return "video" === e.kind
                    }).forEach(a.handleRemoveVideoTrack.bind(a))
                },
                F.log("init default merger, init layout: ", this.layout)
            }
            return l(e, [{
                key: "initLayout",
                value: function() {
                    var e = this.videoTrackInfo.length;
                    this.layoutLevel = 0,
                    this.layout = {
                        "level-0": {
                            items: {
                                "item-0": {
                                    x: 0,
                                    y: 0,
                                    isExpand: !1,
                                    isExpanded: !1,
                                    index: 0
                                }
                            },
                            itemWidth: this.width,
                            itemHeight: this.height,
                            maxItems: 1,
                            currentItems: 0,
                            splitWidthFlag: this.width < this.height
                        }
                    };
                    var t = this.width >= this.height;
                    if (0 !== e) {
                        for (; Math.pow(2, this.layoutLevel) < e;) this.updateLayoutLevel(t),
                        t = !t;
                        this.setLevelLayoutStream()
                    }
                }
            },
            {
                key: "updateLayoutLevel",
                value: function(e) {
                    var t = this,
                    r = this.layout["level-".concat(this.layoutLevel)],
                    n = r.itemWidth,
                    i = r.itemHeight;
                    this.layoutLevel += 1;
                    var a = Math.pow(2, this.layoutLevel),
                    o = e ? n / 2 : n,
                    s = e ? i: i / 2;
                    if (1 === this.layoutLevel) this.layout["level-".concat(this.layoutLevel)] = {
                        items: {
                            "item-0": {
                                x: 0,
                                y: 0,
                                isExpand: !1,
                                isExpanded: !1,
                                index: 0
                            },
                            "item-1": {
                                x: this.width >= this.height ? o: 0,
                                y: this.width < this.height ? s: 0,
                                isExpand: !1,
                                isExpanded: !1,
                                index: 1
                            }
                        },
                        maxItems: a,
                        currentItems: 0,
                        itemWidth: o,
                        itemHeight: s,
                        splitWidthFlag: e
                    };
                    else {
                        this.layout["level-".concat(this.layoutLevel)] = {
                            items: {},
                            maxItems: a,
                            currentItems: 0,
                            itemWidth: o,
                            itemHeight: s,
                            splitWidthFlag: e
                        };
                        var c = this.layout["level-".concat(this.layoutLevel)].items;
                        Object.keys(this.layout["level-".concat(this.layoutLevel - 1)].items).forEach(function(r) {
                            var n = t.layout["level-".concat(t.layoutLevel - 1)].items[r],
                            i = 2 * n.index;
                            c["item-".concat(i)] = {
                                x: n.x,
                                y: n.y,
                                isExpand: !1,
                                isExpanded: !1,
                                index: i
                            },
                            c["item-".concat(i + 1)] = e ? {
                                x: n.x + o,
                                y: n.y,
                                isExpand: !1,
                                isExpanded: !1,
                                index: i + 1
                            }: {
                                x: n.x,
                                y: n.y + s,
                                isExpand: !1,
                                isExpanded: !1,
                                index: i + 1
                            }
                        })
                    }
                    F.log("merger: increase layout level, current level: ".concat(this.layoutLevel), this.layout)
                }
            },
            {
                key: "setLevelLayoutStream",
                value: function() {
                    for (var e = this.videoTrackInfo.length,
                    t = this.layout["level-".concat(this.layoutLevel)], r = t.maxItems - e, n = 0, i = 0; i < t.maxItems; i += 1) r > 0 ? i % 2 === 0 ? (t.items["item-".concat(i)].isExpand = !0, t.items["item-".concat(i)].trackId = this.videoTrackInfo[n].trackId, this.sendMergeOpt(this.layoutLevel, i), n += 1) : (t.items["item-".concat(i)].isExpanded = !0, r -= 1) : (t.items["item-".concat(i)].trackId = this.videoTrackInfo[n].trackId, this.sendMergeOpt(this.layoutLevel, i), n += 1);
                    t.currentItems = e
                }
            },
            {
                key: "sendMergeOpt",
                value: function(e, t) {
                    var r = this.layout["level-".concat(e)],
                    n = r.items["item-".concat(t)];
                    if (n.trackId && !n.isExpanded) {
                        var i = r.itemWidth,
                        a = r.itemHeight;
                        n.isExpand && (r.splitWidthFlag ? i *= 2 : a *= 2);
                        var o = {
                            x: n.x,
                            y: n.y,
                            w: i,
                            h: a,
                            z: 0,
                            trackId: n.trackId
                        };
                        this.controller.addMergeTrack([o], this.jobId)
                    }
                }
            },
            {
                key: "handleRemoveVideoTrack",
                value: function(e) {
                    k(this.videoTrackInfo,
                    function(t) {
                        return t.trackId === e.trackId
                    });
                    var t = this.layout["level-".concat(this.layoutLevel)];
                    if (this.layoutLevel > 0 && this.videoTrackInfo.length <= this.layout["level-".concat(this.layoutLevel - 1)].maxItems) this.layoutLevel -= 1,
                    F.log("merger: reduce layout level, current level: ".concat(this.layoutLevel), this.layout),
                    this.setLevelLayoutStream();
                    else for (var r in t.items) {
                        var n = t.items[r];
                        if (n.trackId === e.trackId) {
                            n.index % 2 === 0 ? (t.items["item-".concat(n.index + 1)] ? (n.isExpand = !0, n.trackId = t.items["item-".concat(n.index + 1)].trackId, t.items["item-".concat(n.index + 1)].isExpanded = !0, t.items["item-".concat(n.index + 1)].trackId = void 0) : n.trackId = void 0, this.sendMergeOpt(this.layoutLevel, n.index)) : (n.isExpanded = !0, n.trackId = void 0, t.items["item-".concat(n.index - 1)].isExpand = !0, this.sendMergeOpt(this.layoutLevel, n.index - 1));
                            break
                        }
                    }
                }
            },
            {
                key: "handleAddVideoTrack",
                value: function(e) {
                    var t = this.videoTrackInfo.length;
                    if (this.videoTrackInfo.push(e), this.videoTrackInfo = v(this.videoTrackInfo, "trackId"), this.videoTrackInfo.length !== t) {
                        var r = this.layout["level-".concat(this.layoutLevel)];
                        if (this.videoTrackInfo.length <= r.maxItems) {
                            for (var n in r.items) {
                                var i = r.items[n];
                                if (!i.trackId) {
                                    i.trackId = e.trackId,
                                    i.isExpanded && (i.isExpanded = !1, r.items["item-".concat(i.index - 1)].isExpand = !1, this.sendMergeOpt(this.layoutLevel, i.index - 1)),
                                    this.sendMergeOpt(this.layoutLevel, i.index);
                                    break
                                }
                            }
                            r.currentItems = this.videoTrackInfo.length
                        } else this.updateLayoutLevel(!r.splitWidthFlag),
                        this.setLevelLayoutStream()
                    } else F.log("handle add video track ignore", e)
                }
            },
            {
                key: "release",
                value: function() {
                    this.controller.release()
                }
            }]),
            e
        } (),
        Et = function e(t, r, n, i) {
            p(this, e),
            this.id = t,
            this.mid = r,
            this.kind = n,
            this.rtpParameters = i,
            this.track = null
        },
        It = function() {
            function e(r, n, i, a, o) {
                p(this, e),
                this._connectStatus = t.TrackConnectStatus.Idle,
                this.track = i,
                this.trackId = a,
                this.mid = o,
                this.transport = r,
                this.direction = n
            }
            return l(e, [{
                key: "startConnect",
                value: function() {
                    var e = this;
                    return this.connectStatus = t.TrackConnectStatus.Connecting,
                    new Promise(function(r, n) {
                        e.onConnectStatusChange = function(e, i) {
                            i === t.TrackConnectStatus.Connect && r(),
                            i === t.TrackConnectStatus.Idle && n()
                        }
                    })
                }
            },
            {
                key: "appendConsumner",
                value: function(e, t) {
                    this.consumer = new Et(this.trackId, this.mid, t, e),
                    this.transport.appendConsumer(this.consumer)
                }
            },
            {
                key: "setMute",
                value: function(e) {
                    this.track && this.track.setMute(e)
                }
            },
            {
                key: "addTrackId",
                value: function(e) {
                    this.track && (this.trackId = e, this.track.setInfo({
                        trackId: e
                    }))
                }
            },
            {
                key: "release",
                value: function() {
                    this.consumer && this.transport ? (this.transport.recvHandler.isPcReady && this.transport.removeConsumers([this.consumer]), this.track && this.track.release()) : this.track && this.track.reset()
                }
            },
            {
                key: "connectStatus",
                get: function() {
                    return this._connectStatus
                },
                set: function(e) {
                    var t = this;
                    if (e !== this._connectStatus) {
                        var r = this._connectStatus;
                        this._connectStatus = e,
                        he(function() {
                            t.onConnectStatusChange && t.onConnectStatusChange(r, t._connectStatus)
                        })
                    }
                }
            }]),
            e
        } (),
        Pt = function(e) {
            function t(e, r, n) {
                var i;
                return p(this, t),
                (i = c(this, u(t).call(this)))._isRestartingICE = !1,
                i.isPcReady = !1,
                i._direction = e,
                i._pc = Ie(),
                i._extendedRtpCapabilities = r,
                i._remoteSdp = new vt(e, r),
                i._pc.addEventListener("iceconnectionstatechange",
                function() {
                    switch (i._pc.iceConnectionState) {
                    case "checking":
                        i.emit("@connectionstatechange", "connecting");
                        break;
                    case "connected":
                    case "completed":
                        i.emit("@connectionstatechange", "connected");
                        break;
                    case "failed":
                        i.emit("@connectionstatechange", "failed");
                        break;
                    case "disconnected":
                        i.emit("@connectionstatechange", "disconnected");
                        break;
                    case "closed":
                        i.emit("@connectionstatechange", "closed")
                    }
                }),
                i
            }
            return d(t, We),
            l(t, [{
                key: "getStats",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                Me(this._pc, t, this._direction, r);
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "getCurrentIceConnectionState",
                value: function() {
                    return this._pc.iceConnectionState
                }
            },
            {
                key: "close",
                value: function() {
                    F.log("handle", this._direction, "close"),
                    this.removeEvent(),
                    this._pc.close(),
                    this.isPcReady = !1
                }
            }]),
            t
        } (),
        Ot = function(e) {
            function t(e, r, n) {
                var i;
                return p(this, t),
                i = c(this, u(t).call(this, "send", e, n)),
                F.log("init send handler"),
                i._transportReady = !1,
                i._stream = new MediaStream,
                i._signaling = r,
                r.on("on-pubpc-state",
                function(e) {
                    i._remoteSdp.transportRemoteParameters && e.pcid === i._remoteSdp.transportRemoteParameters.pcid && (e.connected || i.emit("@connectionstatechange", "remote-disconnected"))
                }),
                i
            }
            return d(t, Pt),
            l(t, [{
                key: "getReady",
                value: function(e) {
                    var t = this;
                    return new Promise(function(r, n) {
                        t._signaling.on("on-pubpc-state",
                        function n(i) {
                            if (i.pcid === e.pcid) {
                                if (t._signaling.off("on-pubpc-state", n), !i.connected) return;
                                t.isPcReady = !0,
                                r()
                            }
                        })
                    })
                }
            },
            {
                key: "addProducerTracks",
                value: function(e) {
                    var t = this;
                    F.debug("add producer", e);
                    var r, n = e.map(function(e) {
                        return e.mediaTrack
                    }).filter(function(e) {
                        return ! t._stream.getTrackById(e.id)
                    });
                    if (0 === n.length) return Promise.reject(new Error("track already added"));
                    var i, a = [],
                    c = !0;
                    return Promise.resolve().then(s(o.mark(function e() {
                        var i, s, c, u, d, p, l;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (n.forEach(t._stream.addTrack, t._stream), !h.browserReport.unifiedPlan || !h.browserReport.supportTransceivers) {
                                    e.next = 33;
                                    break
                                }
                                i = !0,
                                s = !1,
                                c = void 0,
                                e.prev = 5,
                                u = n[Symbol.iterator]();
                            case 7:
                                if (i = (d = u.next()).done) {
                                    e.next = 17;
                                    break
                                }
                                return p = d.value,
                                e.next = 11,
                                Pe(p, t._pc);
                            case 11:
                                l = e.sent,
                                F.debug("add transceiver", l, l.mid),
                                a.push(l);
                            case 14:
                                i = !0,
                                e.next = 7;
                                break;
                            case 17:
                                e.next = 23;
                                break;
                            case 19:
                                e.prev = 19,
                                e.t0 = e.
                                catch(5),
                                s = !0,
                                c = e.t0;
                            case 23:
                                e.prev = 23,
                                e.prev = 24,
                                i || null == u.
                                return || u.
                                return ();
                            case 26:
                                if (e.prev = 26, !s) {
                                    e.next = 29;
                                    break
                                }
                                throw c;
                            case 29:
                                return e.finish(26);
                            case 30:
                                return e.finish(23);
                            case 31:
                                e.next = 35;
                                break;
                            case 33:
                                F.debug("add tracks", n),
                                r = n.map(function(e) {
                                    return t._pc.addTrack(e, t._stream)
                                });
                            case 35:
                                return e.abrupt("return", t._pc.createOffer());
                            case 36:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[5, 19, 23, 31], [24, , 26, 30]])
                    }))).then(function(e) {
                        var r;
                        return h.browserReport.unifiedPlan ? r = {
                            type: "offer",
                            sdp: e.sdp
                        }: (h.browserReport.needH264FmtpLine && (e.sdp += "a=fmtp:107 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f".concat(ht)), r = e),
                        i = r.sdp,
                        F.log("publish: set local offer", r),
                        t._pc.setLocalDescription(r)
                    }).then(function() {
                        for (var r = function() {
                            var t = a[n];
                            if (!t.sender.track) return "continue";
                            var r = e.find(function(e) {
                                return e.mediaTrack === t.sender.track
                            });
                            if (!r || !t.mid) throw J("can not get transceiver mid!");
                            r.setInfo({
                                mid: t.mid
                            })
                        },
                        n = 0; n < a.length; n++) r();
                        if (!t._transportReady) return c = !1,
                        t._setupTransport(e)
                    }).then(function() {
                        return t._remoteSdp.createRemoteAnswer(i)
                    }).then(function(e) {
                        var r = {
                            type: "answer",
                            sdp: e
                        };
                        return F.debug("addProducer answer", r),
                        t._pc.setRemoteDescription(r)
                    }).then(function() {
                        return t._pcReady
                    }).then(function() {
                        return c ? t.safeEmitAsPromise("@needpubtracks", e, i) : Promise.resolve(t._remoteSdp.transportRemoteParameters)
                    }).
                    catch(function(e) {
                        F.log("add producer error", e);
                        try {
                            var i = !0,
                            o = !1,
                            s = void 0;
                            try {
                                for (var c, u = r[Symbol.iterator](); ! (i = (c = u.next()).done); i = !0) {
                                    var d = c.value;
                                    t._pc.removeTrack(d)
                                }
                            } catch(y) {
                                o = !0,
                                s = y
                            } finally {
                                try {
                                    i || null == u.
                                    return || u.
                                    return ()
                                } finally {
                                    if (o) throw s
                                }
                            }
                            for (var p = 0; p < a.length; p++) {
                                a[p].direction = "inactive"
                            }
                        } catch(g) {}
                        var l = !0,
                        f = !1,
                        h = void 0;
                        try {
                            for (var m, v = n[Symbol.iterator](); ! (l = (m = v.next()).done); l = !0) {
                                var k = m.value;
                                t._stream.removeTrack(k)
                            }
                        } catch(y) {
                            f = !0,
                            h = y
                        } finally {
                            try {
                                l || null == v.
                                return || v.
                                return ()
                            } finally {
                                if (f) throw h
                            }
                        }
                        throw e instanceof H ? e: J(e)
                    })
                }
            },
            {
                key: "removeProducerTracks",
                value: function(e) {
                    var t = this;
                    F.debug("removeProducerTracks", e);
                    var r, n = e.filter(function(e) {
                        return !! e.track
                    }).map(function(e) {
                        return e.track.mediaTrack
                    }).filter(function(e) {
                        return t._stream.getTrackById(e.id)
                    });
                    return Promise.resolve().then(function() {
                        var e = t._pc.getSenders().filter(function(e) {
                            return e.track && n.includes(e.track)
                        });
                        if (0 === e.length) return F.warning("removeProducerTracks [nothing to remove]"),
                        Promise.reject("removeProducerTracks: nothing to remote");
                        var r = !0,
                        i = !1,
                        a = void 0;
                        try {
                            for (var o, s = e[Symbol.iterator](); ! (r = (o = s.next()).done); r = !0) {
                                var c = o.value;
                                t._pc.removeTrack(c)
                            }
                        } catch(m) {
                            i = !0,
                            a = m
                        } finally {
                            try {
                                r || null == s.
                                return || s.
                                return ()
                            } finally {
                                if (i) throw a
                            }
                        }
                        var u = !0,
                        d = !1,
                        p = void 0;
                        try {
                            for (var l, f = n[Symbol.iterator](); ! (u = (l = f.next()).done); u = !0) {
                                var h = l.value;
                                t._stream.removeTrack(h)
                            }
                        } catch(m) {
                            d = !0,
                            p = m
                        } finally {
                            try {
                                u || null == f.
                                return || f.
                                return ()
                            } finally {
                                if (d) throw p
                            }
                        }
                        return t._pc.createOffer()
                    }).then(function(e) {
                        var n = new RTCSessionDescription(e);
                        return r = n.sdp,
                        F.log("unpublish: set local offer", n),
                        t._pc.setLocalDescription(n)
                    }).then(function() {
                        var e = {
                            type: "answer",
                            sdp: t._remoteSdp.createRemoteAnswer(r)
                        };
                        return F.log("unpublish: set remote answer", e),
                        t._pc.setRemoteDescription(e)
                    }).
                    catch(function(e) {
                        if (0 !== t._stream.getTracks().length) throw e instanceof H ? e: J(e);
                        F.debug("removeProducer() | ignoring expected error due no sending tracks: %s", e.toString())
                    }).then(function() {
                        t.safeEmitAsPromise("@needunpubtracks", e)
                    })
                }
            },
            {
                key: "restartICE",
                value: function(e, t) {
                    var r = this;
                    return F.log("restart send ice"),
                    this._isRestartingICE = !0,
                    Promise.resolve().then(function() {
                        return r._remoteSdp.updateICEData(e, t)
                    }).then(function() {
                        return r._pc.createOffer({
                            iceRestart: !0
                        })
                    }).then(function(e) {
                        return r._pc.setLocalDescription(e)
                    }).then(function() {
                        var e = {
                            type: "answer",
                            sdp: r._remoteSdp.createRemoteAnswer(r._pc.localDescription.sdp)
                        };
                        return r._pc.setRemoteDescription(e)
                    })
                }
            },
            {
                key: "_setupTransport",
                value: function(e) {
                    var t = this,
                    r = Date.now();
                    return Promise.resolve().then(function() {
                        return t._pc.localDescription ? t._pc.localDescription: t._pc.createOffer()
                    }).then(function(r) {
                        return t.safeEmitAsPromise("@needpubpc", r.sdp, e)
                    }).then(function(n) {
                        return z.addEvent("PublisherPC", {
                            signal_take_time: Date.now() - r,
                            result_code: n.code,
                            tracks: n.tracks.map(function(t) {
                                var r = e.find(function(e) {
                                    return e.mediaTrack.id === t.localid
                                });
                                if (r) return {
                                    local_id: t.localid,
                                    track_id: t.trackid,
                                    source_type: r.sourceType,
                                    kind: r.info.kind,
                                    tag: r.info.tag || "",
                                    muted: !!r.info.muted,
                                    master: !!r.master,
                                    kbps: r.info.kbps || -1,
                                    encode_video_width: 0,
                                    encode_video_height: 0
                                }
                            }).filter(function(e) {
                                return void 0 !== e
                            })
                        }),
                        t.pcid = n.pcid,
                        t._transportReady = !0,
                        t._pcReady = t.getReady(n),
                        t._remoteSdp.setTransportRemoteParameters(n)
                    })
                }
            }]),
            t
        } (),
        Mt = function(e) {
            function t(e, r, n) {
                var a;
                return p(this, t),
                (a = c(this, u(t).call(this, "recv", e, n)))._transportCreated = !1,
                a._consumerInfos = new Map,
                a._signaling = r,
                r.on("on-subpc-state",
                function(e) {
                    a._remoteSdp.transportRemoteParameters && e.pcid === a._remoteSdp.transportRemoteParameters.pcid && (e.connected || a.emit("@connectionstatechange", "remote-disconnected"))
                }),
                F.log("init recvhandler", i(i(a))),
                a
            }
            return d(t, Pt),
            l(t, [{
                key: "getReady",
                value: function(e) {
                    var t = this;
                    return new Promise(function(r, n) {
                        t._signaling.on("on-subpc-state",
                        function n(i) {
                            if (i.pcid === e.pcid) {
                                if (t._signaling.off("on-subpc-state", n), !i.connected) return;
                                t.isPcReady = !0,
                                r()
                            }
                        })
                    })
                }
            },
            {
                key: "addConsumerTracks",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n, i, a, s, c, u, d, p, l, f, m, v, k, y, g, b = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!h.browserReport.unifiedPlan || !h.isFirefox) {
                                    e.next = 31;
                                    break
                                }
                                r = [],
                                n = !0,
                                i = !1,
                                a = void 0,
                                e.prev = 5,
                                s = t[Symbol.iterator]();
                            case 7:
                                if (n = (c = s.next()).done) {
                                    e.next = 16;
                                    break
                                }
                                return u = c.value,
                                e.next = 11,
                                this.addConsumerTrack(u);
                            case 11:
                                d = e.sent,
                                r.push(d);
                            case 13:
                                n = !0,
                                e.next = 7;
                                break;
                            case 16:
                                e.next = 22;
                                break;
                            case 18:
                                e.prev = 18,
                                e.t0 = e.
                                catch(5),
                                i = !0,
                                a = e.t0;
                            case 22:
                                e.prev = 22,
                                e.prev = 23,
                                n || null == s.
                                return || s.
                                return ();
                            case 25:
                                if (e.prev = 25, !i) {
                                    e.next = 28;
                                    break
                                }
                                throw a;
                            case 28:
                                return e.finish(25);
                            case 29:
                                return e.finish(22);
                            case 30:
                                return e.abrupt("return", r);
                            case 31:
                                for (F.log("add consumers", t), p = [], l = Array.from(this._consumerInfos.values()), f = !0, m = !1, v = void 0, e.prev = 37, k = function() {
                                    var e = g.value,
                                    t = l.find(function(t) {
                                        return t.consumerId === e.id
                                    });
                                    if (t && !t.closed) p.push(t);
                                    else {
                                        var r = b.genNewConsumerInfo(e);
                                        if (h.browserReport.unifiedPlan) {
                                            var n = e.mid;
                                            r.mid = n,
                                            b._consumerInfos.set(n, r)
                                        } else b._consumerInfos.set(e.id, r);
                                        p.push(r)
                                    }
                                },
                                y = t[Symbol.iterator](); ! (f = (g = y.next()).done); f = !0) k();
                                e.next = 46;
                                break;
                            case 42:
                                e.prev = 42,
                                e.t1 = e.
                                catch(37),
                                m = !0,
                                v = e.t1;
                            case 46:
                                e.prev = 46,
                                e.prev = 47,
                                f || null == y.
                                return || y.
                                return ();
                            case 49:
                                if (e.prev = 49, !m) {
                                    e.next = 52;
                                    break
                                }
                                throw v;
                            case 52:
                                return e.finish(49);
                            case 53:
                                return e.finish(46);
                            case 54:
                                return e.abrupt("return", Promise.resolve().then(function() {
                                    var e = {
                                        type: "offer",
                                        sdp: b._remoteSdp.createRemoteOffer(Array.from(b._consumerInfos.values()))
                                    };
                                    return F.debug("subscribe: set remote offer", e),
                                    b._pc.setRemoteDescription(e)
                                }).then(function() {
                                    return h.browserReport.unifiedPlan,
                                    b._pc.createAnswer()
                                }).then(function(e) {
                                    return F.debug("subscribe, set local answer", e),
                                    b._pc.setLocalDescription(e)
                                }).then(function() {
                                    return b._pcReady
                                }).then(function() {
                                    for (var e = function(e) {
                                        var r = p[e],
                                        n = t[e];
                                        if (n.track) return "continue";
                                        if (h.browserReport.unifiedPlan) {
                                            var i = b._pc.getTransceivers().find(function(e) {
                                                return !! e.receiver.track && (e.receiver.track.id === r.trackId || e.mid === r.mid)
                                            });
                                            i && (n.track = i.receiver.track)
                                        } else if (h.browserReport.getReceivers) {
                                            var a = b._pc.getReceivers().find(function(e) {
                                                var t = e.track;
                                                return !! t && r.trackId === t.id
                                            });
                                            a && (n.track = a.track)
                                        } else {
                                            var o = b._pc.getRemoteStreams().find(function(e) {
                                                return e.id === r.streamId
                                            });
                                            o && (n.track = o.getTrackById(r.trackId))
                                        }
                                        if (!n.track) throw J("remote track not found");
                                        F.log("subscribe: get new track", n.track)
                                    },
                                    r = 0; r < p.length; r += 1) e(r);
                                    return t.map(function(e) {
                                        return e.track
                                    })
                                }));
                            case 55:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[5, 18, 22, 30], [23, , 25, 29], [37, 42, 46, 54], [47, , 49, 53]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "genNewConsumerInfo",
                value: function(e) {
                    var t = e.rtpParameters.encodings[0],
                    r = e.rtpParameters.rtcp.cname,
                    n = e.mid;
                    return {
                        kind: e.kind,
                        streamId: h.browserReport.unifiedPlan ? "recv-stream-".concat(n) : "recv-stream-".concat(t.ssrc),
                        trackId: h.browserReport.unifiedPlan ? "consumer-".concat(e.kind, "-").concat(n) : "consumer-".concat(e.kind, "-").concat(t.ssrc),
                        ssrc: t.ssrc,
                        rtxSsrc: t.rtx ? t.rtx.ssrc: void 0,
                        cname: r,
                        consumerId: e.id,
                        closed: !1
                    }
                }
            },
            {
                key: "addConsumerTrack",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n, i, a, s, c = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return F.log("add consumer", t),
                                r = null,
                                n = Array.from(this._consumerInfos.values()),
                                (i = n.find(function(e) {
                                    return e.consumerId === t.id
                                })) && !i.closed ? r = i: (a = this.genNewConsumerInfo(t), h.browserReport.unifiedPlan ? (s = t.mid, a.mid = s, this._consumerInfos.set(s, a)) : this._consumerInfos.set(t.id, a), r = a),
                                e.abrupt("return", Promise.resolve().then(function() {
                                    var e = {
                                        type: "offer",
                                        sdp: c._remoteSdp.createRemoteOffer(Array.from(c._consumerInfos.values()))
                                    };
                                    return console.log("set ontrack"),
                                    c._pc.ontrack = function(e) {
                                        console.log("ontrack", e.receiver.track)
                                    },
                                    F.debug("subscribe: set remote offer", e),
                                    c._pc.setRemoteDescription(e)
                                }).then(function() {
                                    return c._pc.createAnswer()
                                }).then(function(e) {
                                    return F.debug("subscribe, set local answer", e),
                                    c._pc.setLocalDescription(e)
                                }).then(function() {
                                    return c._pcReady
                                }).then(function() {
                                    var e = null;
                                    if (h.browserReport.unifiedPlan && h.browserReport.supportTransceivers && t && r) {
                                        var n = c._pc.getTransceivers().find(function(e) {
                                            return !! e.receiver.track && ((e.receiver.track.id === r.trackId || e.mid === r.mid) && (t.track = e.receiver.track, !0))
                                        });
                                        n && (e = n.receiver.track)
                                    } else if (t && r) {
                                        var i = c._pc.getReceivers().find(function(e) {
                                            var n = e.track;
                                            return !! n && (r.trackId === n.id && (t.track = n, !0))
                                        });
                                        i && (e = i.track)
                                    }
                                    if (!e && t) throw J("remote track not found");
                                    return F.log("subscribe: get new track", e, e.readyState),
                                    e
                                }));
                            case 6:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "removeConsumerTracks",
                value: function(e) {
                    var t = this;
                    F.log("remove consumer", e);
                    var r = !1,
                    n = !0,
                    i = !1,
                    a = void 0;
                    try {
                        for (var o, s = function() {
                            var e = o.value,
                            n = Array.from(t._consumerInfos.values()).find(function(t) {
                                return t.consumerId === e.id && !t.closed
                            });
                            if (!n) return F.log("can not find unpublish track target, ignore"),
                            "continue";
                            r = !0,
                            h.browserReport.unifiedPlan ? (e.track = null, n.closed = !0) : t._consumerInfos.delete(e.id)
                        },
                        c = e[Symbol.iterator](); ! (n = (o = c.next()).done); n = !0) s()
                    } catch(u) {
                        i = !0,
                        a = u
                    } finally {
                        try {
                            n || null == c.
                            return || c.
                            return ()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r ? Promise.resolve().then(function() {
                        var e = {
                            type: "offer",
                            sdp: t._remoteSdp.createRemoteOffer(Array.from(t._consumerInfos.values()))
                        };
                        return F.log("unsubscribe set remote offer", e),
                        t._pc.setRemoteDescription(e)
                    }).then(function() {
                        return t._pc.createAnswer()
                    }).then(function(e) {
                        return F.log("unsubscribe set local answer", e),
                        t._pc.setLocalDescription(e)
                    }) : Promise.resolve()
                }
            },
            {
                key: "restartICE",
                value: function(e, t) {
                    var r = this;
                    return F.log("recv restart ice"),
                    this._isRestartingICE = !0,
                    Promise.resolve().then(function() {
                        return r._remoteSdp.updateICEData(e, t)
                    }).then(function() {
                        var e = {
                            type: "offer",
                            sdp: r._remoteSdp.createRemoteOffer(Array.from(r._consumerInfos.values()))
                        };
                        return r._pc.setRemoteDescription(e)
                    }).then(function() {
                        return r._pc.createAnswer()
                    }).then(function(e) {
                        r._pc.setLocalDescription(e)
                    })
                }
            },
            {
                key: "setupTransport",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!this._transportCreated) {
                                    e.next = 4;
                                    break
                                }
                                return e.next = 3,
                                this._pcReady;
                            case 3:
                                return e.abrupt("return", e.sent);
                            case 4:
                                return r = Date.now(),
                                e.next = 7,
                                this.safeEmitAsPromise("@needsubpc", t);
                            case 7:
                                return n = e.sent,
                                z.addEvent("SubscriberPC", {
                                    signal_take_time: Date.now() - r,
                                    result_code: n.code,
                                    tracks: n.tracks.map(function(e) {
                                        return {
                                            track_id: e.trackid,
                                            status: e.status
                                        }
                                    })
                                }),
                                this.pcid = n.pcid,
                                this._transportCreated = !0,
                                this._pcReady = this.getReady(n),
                                F.log("init subscribe, get transport remote", n),
                                e.next = 15,
                                this._remoteSdp.setTransportRemoteParameters(n);
                            case 15:
                                return e.abrupt("return", n);
                            case 16:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            }]),
            t
        } ();

        function At(e, t, r, n) {
            switch (e) {
            case "send":
                return new Ot(t, r, n);
            case "recv":
                return new Mt(t, r, n)
            }
        } !
        function(e) {
            e.SEND_TRACKS = "@transport:send-tracks",
            e.RESTART_SEND_ICE = "@transport:send-restart-ice",
            e.REMOVE_TRACKS = "@transport:remove-tracks",
            e.INIT_RECV = "@transport:init-recv",
            e.RESTART_RECV_ICE = "@transport:recv-restart-ice",
            e.ADD_CONUMERS = "@transport:add-consumers",
            e.REMOVE_CONSUMERS = "@transport:remove-consumers"
        } (Ct || (Ct = {}));
        var jt, Dt = function(e) {
            function r(e, t) {
                var n;
                return p(this, r),
                (n = c(this, u(r).call(this))).sendCommandQueue = new V("SendQueue"),
                n.recvCommandQueue = new V("RecvQueue"),
                n.recvInitCommandQueue = new V("RecvInitQueue"),
                n.sendTrackQueue = [],
                n.consumerQueue = [],
                n._publishTracks = new Map,
                n.extendedRtpCapabilities = e,
                n.signaling = t,
                n.sendHandler = At("send", e, t, {}),
                n.recvHandler = At("recv", e, t, {}),
                n.handleSendHandler(),
                n.handleRecvHandler(),
                n.sendCommandQueue.on("exec", n.handleSendCommandTask.bind(i(i(n)))),
                n.recvCommandQueue.on("exec", n.handleRecvCommandTask.bind(i(i(n)))),
                n.recvInitCommandQueue.on("exec", n.handleRecvInitCommandTask.bind(i(i(n)))),
                n.initSubPcPromise = new Promise(function(e) {
                    n.initSubPcPromiseResolve = e
                }),
                n
            }
            return d(r, We),
            l(r, [{
                key: "resolveInitSubPcPromise",
                value: function() {
                    this.initSubPcPromiseResolve && (this.initSubPcPromiseResolve(), this.initSubPcPromiseResolve = void 0)
                }
            },
            {
                key: "handleSendHandler",
                value: function() {
                    var e = this;
                    this.sendHandler.on("@needpubpc",
                    function(t, r, n, i) {
                        e.safeEmitAsPromise("@needpubpc", t, r).then(n).
                        catch(i)
                    }).on("@connectionstatechange",
                    function(t) {
                        switch (F.log("pubpc connectionstatechange", t), z.addEvent("ICEConnectionState", {
                            pc_type: 0,
                            state: t,
                            id: e.sendHandler.pcid
                        }), t) {
                        case "remote-disconnected":
                        case "closed":
                        case "failed":
                            e.signaling.state === St.OPEN ? e.reconnectProducer() : e.sendHandler.close();
                            break;
                        case "disconnected":
                            if (e.sendHandler._isRestartingICE || !e.sendHandler.pcid) return;
                            e.signaling.state === St.OPEN ? e.restartSendICE(e.sendHandler.pcid) : e.signaling.once("@signalingauth",
                            function(t) {
                                "disconnected" === e.sendHandler.getCurrentIceConnectionState() && (e.extendedRtpCapabilities = t.rtpcaps, e.restartSendICE(e.sendHandler.pcid))
                            })
                        }
                    }).on("@needpubtracks",
                    function(t, r, n, i) {
                        var a = t.map(ot),
                        o = Date.now();
                        e.signaling.request("pub-tracks", {
                            tracks: a,
                            sdp: r
                        }).then(function(r) {
                            switch (z.addEvent("PublishTracks", {
                                signal_take_time: Date.now() - o,
                                result_code: r.code,
                                tracks: r.tracks.map(function(e) {
                                    var r = t.find(function(t) {
                                        return t.mediaTrack.id === e.localid
                                    });
                                    if (r) return {
                                        local_id: e.localid,
                                        track_id: e.trackid,
                                        source_type: r.sourceType,
                                        kind: r.info.kind,
                                        tag: r.info.tag || "",
                                        muted: !!r.info.muted,
                                        master: !!r.master,
                                        kbps: r.info.kbps || -1,
                                        encode_video_width: 0,
                                        encode_video_height: 0
                                    }
                                }).filter(function(e) {
                                    return void 0 !== e
                                })
                            }), r.code) {
                            case 0:
                                break;
                            case 10052:
                                return i(ee());
                            case 10061:
                                return e.reconnectProducer(),
                                i(q(10061, r.error));
                            default:
                                return i(q(r.code, r.error))
                            }
                            var a = !0,
                            s = !1,
                            c = void 0;
                            try {
                                for (var u, d = r.tracks[Symbol.iterator](); ! (a = (u = d.next()).done); a = !0) {
                                    if (!u.value.status) return void i(q(r.code, r.error))
                                }
                            } catch(p) {
                                s = !0,
                                c = p
                            } finally {
                                try {
                                    a || null == d.
                                    return || d.
                                    return ()
                                } finally {
                                    if (s) throw c
                                }
                            }
                            n(r)
                        },
                        i)
                    }).on("@needunpubtracks",
                    function(t, r, n) {
                        z.addEvent("UnPublishTracks", {
                            tracks: t.map(function(e) {
                                return {
                                    track_id: e.trackId
                                }
                            })
                        }),
                        e.signaling.request("unpub-tracks", {
                            tracks: t.map(function(e) {
                                return {
                                    trackid: e.trackId
                                }
                            })
                        }).then(function(e) {
                            r(e)
                        })
                    })
                }
            },
            {
                key: "sendTracks",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (0 !== t.length) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", Promise.resolve());
                            case 2:
                                return e.abrupt("return", this.sendCommandQueue.push(Ct.SEND_TRACKS, t));
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "removeTracks",
                value: function(e) {
                    return 0 === e.length ? Promise.resolve() : this.sendCommandQueue.push(Ct.REMOVE_TRACKS, e)
                }
            },
            {
                key: "restartSendICE",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (h.browserReport.supportRestartICE) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", Promise.resolve(this.reconnectProducer()));
                            case 2:
                                return e.abrupt("return", this.sendCommandQueue.push(Ct.RESTART_SEND_ICE, t));
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "handleSendCommandTask",
                value: function(e, t) {
                    switch (e.method) {
                    case Ct.SEND_TRACKS:
                        return void(t.promise = this._execAddProducerTracks(e.data));
                    case Ct.REMOVE_TRACKS:
                        return void(t.promise = this._execRemoveTracks(e.data));
                    case Ct.RESTART_SEND_ICE:
                        return void(t.promise = this._execRestartSendICE(e.data))
                    }
                }
            },
            {
                key: "addTrackToPublishTracks",
                value: function(e) {
                    var t = this,
                    r = e.map(function(e) {
                        return new It(t, "send", e)
                    }),
                    n = !0,
                    i = !1,
                    a = void 0;
                    try {
                        for (var o, s = r[Symbol.iterator](); ! (n = (o = s.next()).done); n = !0) {
                            var c = o.value;
                            this._publishTracks.set(c.track.mediaTrack.id, c)
                        }
                    } catch(u) {
                        i = !0,
                        a = u
                    } finally {
                        try {
                            n || null == s.
                            return || s.
                            return ()
                        } finally {
                            if (i) throw a
                        }
                    }
                    return r
                }
            },
            {
                key: "removeTrackFromPublishTracks",
                value: function(e) {
                    var t = !0,
                    r = !1,
                    n = void 0;
                    try {
                        for (var i, a = e[Symbol.iterator](); ! (t = (i = a.next()).done); t = !0) {
                            var o = i.value;
                            this._publishTracks.delete(o.mediaTrack.id)
                        }
                    } catch(s) {
                        r = !0,
                        n = s
                    } finally {
                        try {
                            t || null == a.
                            return || a.
                            return ()
                        } finally {
                            if (r) throw n
                        }
                    }
                }
            },
            {
                key: "_execAddProducerTracks",
                value: function() {
                    var e = s(o.mark(function e(r) {
                        var n, i, a, s, c, u, d, p;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.sendHandler.addProducerTracks(r.map(function(e) {
                                    return e.track
                                }));
                            case 2:
                                for (n = e.sent, i = !0, a = !1, s = void 0, e.prev = 6, c = r[Symbol.iterator](); ! (i = (u = c.next()).done); i = !0) d = u.value,
                                (p = le(n.tracks, "localid", d.track.mediaTrack.id)) && (d.addTrackId(p.trackid), d.track.setInfo({
                                    versionid: p.versionid
                                }), d.track.resetStats());
                                e.next = 14;
                                break;
                            case 10:
                                e.prev = 10,
                                e.t0 = e.
                                catch(6),
                                a = !0,
                                s = e.t0;
                            case 14:
                                e.prev = 14,
                                e.prev = 15,
                                i || null == c.
                                return || c.
                                return ();
                            case 17:
                                if (e.prev = 17, !a) {
                                    e.next = 20;
                                    break
                                }
                                throw s;
                            case 20:
                                return e.finish(17);
                            case 21:
                                return e.finish(14);
                            case 22:
                                return r.map(function(e) {
                                    return e.connectStatus = t.TrackConnectStatus.Connect
                                }),
                                e.abrupt("return", n);
                            case 24:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[6, 10, 14, 22], [15, , 17, 21]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_execRemoveTracks",
                value: function(e) {
                    return this.removeTrackFromPublishTracks(e.map(function(e) {
                        return e.track
                    })),
                    e.map(function(e) {
                        return e.release()
                    }),
                    this.sendHandler.removeProducerTracks(e)
                }
            },
            {
                key: "_execRestartSendICE",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return this.sendHandler._isRestartingICE = !0,
                                e.next = 3,
                                this.signaling.request("pubpc-restart", {
                                    pcid: t
                                });
                            case 3:
                                if (0 === (r = e.sent).code) {
                                    e.next = 9;
                                    break
                                }
                                return this.sendHandler._isRestartingICE = !1,
                                F.debug("restart ice faild", r.code, r.error),
                                this.reconnectProducer(),
                                e.abrupt("return");
                            case 9:
                                return e.prev = 9,
                                e.next = 12,
                                this.sendHandler.restartICE(r.iceParameters, r.iceCandidates);
                            case 12:
                                this.sendHandler._isRestartingICE = !1,
                                e.next = 20;
                                break;
                            case 15:
                                e.prev = 15,
                                e.t0 = e.
                                catch(9),
                                F.debug("restart ice faild", r.code, r.error),
                                this.sendHandler._isRestartingICE = !1,
                                this.reconnectProducer();
                            case 20:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[9, 15]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "reconnectProducer",
                value: function() {
                    this.resetSendCommandQueue(),
                    this.sendHandler.close();
                    var e = this.publishTracks;
                    this.sendHandler = At("send", this.extendedRtpCapabilities, this.signaling, {}),
                    this.handleSendHandler(),
                    e.forEach(function(e) {
                        e.connectStatus = t.TrackConnectStatus.Connecting
                    }),
                    this.emit("@needrepub", e)
                }
            },
            {
                key: "handleRecvHandler",
                value: function() {
                    var e = this;
                    this.recvHandler.on("@needsubpc",
                    function(t, r, n) {
                        e.safeEmitAsPromise("@needsubpc", t).then(r, n)
                    }).on("@connectionstatechange",
                    function(t) {
                        switch (F.log("sub pc connection state change", t), z.addEvent("ICEConnectionState", {
                            pc_type: 1,
                            state: t,
                            id: e.recvHandler.pcid
                        }), t) {
                        case "remote-disconnected":
                        case "closed":
                        case "failed":
                            e.signaling.state === St.OPEN ? e.resetRecvHandler() : e.recvHandler.close();
                            break;
                        case "disconnected":
                            if (e.recvHandler._isRestartingICE || !e.recvHandler.pcid) return;
                            e.signaling.state === St.OPEN ? e.restartRecvICE(e.recvHandler.pcid) : e.signaling.once("@signalingauth",
                            function(t) {
                                "disconnected" === e.recvHandler.getCurrentIceConnectionState() && (e.extendedRtpCapabilities = t.rtpcaps, e.restartRecvICE(e.recvHandler.pcid))
                            })
                        }
                    })
                }
            },
            {
                key: "appendConsumer",
                value: function(e) {
                    this.consumerQueue.push(e)
                }
            },
            {
                key: "addConsumers",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = this.consumerQueue,
                                this.consumerQueue = [],
                                e.abrupt("return", this.recvCommandQueue.push(Ct.ADD_CONUMERS, t));
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "initRecvHandler",
                value: function(e) {
                    return this.recvInitCommandQueue.push(Ct.INIT_RECV, e)
                }
            },
            {
                key: "removeConsumers",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.recvCommandQueue.push(Ct.REMOVE_CONSUMERS, t);
                            case 2:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "restartRecvICE",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (h.browserReport.supportRestartICE) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", this.resetRecvHandler());
                            case 2:
                                return e.abrupt("return", this.recvCommandQueue.push(Ct.RESTART_RECV_ICE, t));
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_removeConsumers",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this.recvHandler.removeConsumerTracks(t);
                            case 2:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_initRecvHandler",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.recvHandler.isPcReady) {
                                    e.next = 4;
                                    break
                                }
                                return e.next = 3,
                                this.recvHandler.setupTransport(t);
                            case 3:
                                return e.abrupt("return", e.sent);
                            case 4:
                                return e.next = 6,
                                this.initSubPcPromise;
                            case 6:
                                return e.abrupt("return", null);
                            case 7:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_addConsumers",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (0 !== t.length) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return", Promise.resolve([]));
                            case 2:
                                return e.next = 4,
                                this.recvHandler.addConsumerTracks(t);
                            case 4:
                                return r = e.sent,
                                e.abrupt("return", r);
                            case 6:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_execRestartRecvICE",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return this.recvHandler._isRestartingICE = !0,
                                e.next = 3,
                                this.signaling.request("subpc-restart", {
                                    pcid: t
                                });
                            case 3:
                                if (0 === (r = e.sent).code) {
                                    e.next = 9;
                                    break
                                }
                                return this.recvHandler._isRestartingICE = !1,
                                F.debug("restart ice faild", r.code, r.error),
                                this.resetRecvHandler(),
                                e.abrupt("return");
                            case 9:
                                return e.prev = 9,
                                e.next = 12,
                                this.recvHandler.restartICE(r.iceParameters, r.iceCandidates);
                            case 12:
                                this.recvHandler._isRestartingICE = !1,
                                e.next = 20;
                                break;
                            case 15:
                                e.prev = 15,
                                e.t0 = e.
                                catch(9),
                                this.recvHandler._isRestartingICE = !1,
                                F.debug("restart ice faild", r.code, r.error),
                                this.resetRecvHandler();
                            case 20:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[9, 15]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "handleRecvCommandTask",
                value: function(e, t) {
                    switch (e.method) {
                    case Ct.ADD_CONUMERS:
                        return void(t.promise = this._addConsumers(e.data));
                    case Ct.REMOVE_CONSUMERS:
                        return void(t.promise = this._removeConsumers(e.data));
                    case Ct.RESTART_RECV_ICE:
                        return void(t.promise = this._execRestartRecvICE(e.data))
                    }
                }
            },
            {
                key: "handleRecvInitCommandTask",
                value: function(e, t) {
                    switch (e.method) {
                    case Ct.INIT_RECV:
                        return void(t.promise = this._initRecvHandler(e.data))
                    }
                }
            },
            {
                key: "resetSendCommandQueue",
                value: function() {
                    F.log("reset send queue"),
                    this.sendCommandQueue = new V("SendQueue"),
                    this.sendCommandQueue.on("exec", this.handleSendCommandTask.bind(this))
                }
            },
            {
                key: "resetRecvCommandQueue",
                value: function() {
                    F.log("reset recv queue"),
                    this.recvCommandQueue = new V("RecvQueue"),
                    this.recvInitCommandQueue = new V("RecvInitQueue"),
                    this.recvCommandQueue.on("exec", this.handleRecvCommandTask.bind(this)),
                    this.recvInitCommandQueue.on("exec", this.handleRecvInitCommandTask.bind(this))
                }
            },
            {
                key: "resetRecvHandler",
                value: function() {
                    var e = this;
                    this.resetRecvCommandQueue(),
                    this.emit("@needresetrecv"),
                    this.recvHandler.close(),
                    this.recvHandler = At("recv", this.extendedRtpCapabilities, this.signaling, {}),
                    this.initSubPcPromise = new Promise(function(t) {
                        e.initSubPcPromiseResolve = t
                    }),
                    this.handleRecvHandler(),
                    this.emit("@needresub")
                }
            },
            {
                key: "release",
                value: function() {
                    this.recvHandler.close(),
                    this.sendHandler.close(),
                    this.publishTracks.forEach(function(e) {
                        return e.release()
                    })
                }
            },
            {
                key: "publishTracks",
                get: function() {
                    return Array.from(this._publishTracks.values())
                }
            }]),
            r
        } (); (jt = t.RoomState || (t.RoomState = {}))[jt.Idle = 0] = "Idle",
        jt[jt.Connecting = 1] = "Connecting",
        jt[jt.Connected = 2] = "Connected",
        jt[jt.Reconnecting = 3] = "Reconnecting";
        var Lt = {
            transportPolicy: "forceUdp"
        },
        Nt = function(e) {
            function r() {
                var e, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Lt;
                return p(this, r),
                (e = c(this, u(r).call(this)))._trackInfo = [],
                e.subscribeTracks = [],
                e._users = new Map,
                e._roomState = t.RoomState.Idle,
                e.mergeJobMerger = {},
                e.defaultMergeJobTracks = [],
                e.mergeJobTracks = {},
                e._publish = function(r, n) {
                    return new Promise(function() {
                        var i = s(o.mark(function i(a, s) {
                            var c, u, d, p, l, f, h;
                            return o.wrap(function(i) {
                                for (;;) switch (i.prev = i.next) {
                                case 0:
                                    if (e.roomState === t.RoomState.Connected) {
                                        i.next = 3;
                                        break
                                    }
                                    return s(J("not connected to the room, please run joinRoom first")),
                                    i.abrupt("return");
                                case 3:
                                    if (0 === r.length && a(), r.forEach(function(t) {
                                        return t.userId = e.userId
                                    }), c = e.connectionTransport, u = e.signaling, !n) {
                                        i.next = 12;
                                        break
                                    }
                                    p = r.map(function(e) {
                                        return e.mediaTrack.id
                                    }),
                                    d = c.publishTracks.filter(function(e) {
                                        return - 1 !== p.indexOf(e.track.mediaTrack.id)
                                    }),
                                    i.next = 18;
                                    break;
                                case 12:
                                    if (l = c.publishTracks.map(function(e) {
                                        return e.track.mediaTrack.id
                                    }), r.filter(function(e) {
                                        return - 1 === l.indexOf(e.mediaTrack.id)
                                    }).length === r.length) {
                                        i.next = 17;
                                        break
                                    }
                                    return s(J("there are already published tracks in the provided tracks")),
                                    i.abrupt("return");
                                case 17:
                                    d = c.addTrackToPublishTracks(r);
                                case 18:
                                    return F.debug("start publish", d, n),
                                    n || (f = d.map(function(e) {
                                        return e.startConnect()
                                    }), Promise.all(f).then(function() {
                                        return a()
                                    }).
                                    catch(function() {
                                        s(ae())
                                    })),
                                    i.prev = 20,
                                    i.next = 23,
                                    c.sendTracks(d);
                                case 23:
                                    u.sendWsMsg("mute-tracks", {
                                        tracks: d.map(function(e) {
                                            return {
                                                trackid: e.trackId,
                                                muted: !!e.track.info.muted
                                            }
                                        })
                                    }),
                                    (h = le(e.users, "userId", e.userId)) && (h.addTracks(d.map(function(e) {
                                        return e.track
                                    })), h.addPublishedTrackInfo(d.map(function(t) {
                                        return {
                                            trackId: t.trackId,
                                            muted: !!t.track.info.muted,
                                            kind: t.track.info.kind,
                                            tag: t.track.info.tag,
                                            userId: e.userId,
                                            versionid: t.track.info.versionid
                                        }
                                    }))),
                                    r.forEach(function(t) {
                                        t.on("@get-stats",
                                        function(r, n, i) {
                                            if (!e.connectionTransport) return n(xe());
                                            e.connectionTransport.sendHandler.getStats(t.mediaTrack, r).then(n, i)
                                        })
                                    }),
                                    e.getAllMerger().forEach(function(e) {
                                        return e.controller.onAddTracks(r.map(function(e) {
                                            return e.info
                                        }))
                                    }),
                                    i.next = 46;
                                    break;
                                case 30:
                                    if (i.prev = 30, i.t0 = i.
                                    catch(20), !(i.t0 instanceof H)) {
                                        i.next = 44;
                                        break
                                    }
                                    i.t1 = i.t0.code,
                                    i.next = 10061 === i.t1 ? 36 : 30001 === i.t1 ? 36 : 10052 === i.t1 ? 37 : 40;
                                    break;
                                case 36:
                                    return i.abrupt("return");
                                case 37:
                                    return F.warning(i.t0, "republish"),
                                    setTimeout(function() {
                                        return e._publish(r, !0)
                                    },
                                    1e3),
                                    i.abrupt("return");
                                case 40:
                                    c.removeTrackFromPublishTracks(r),
                                    s(i.t0);
                                case 42:
                                    i.next = 46;
                                    break;
                                case 44:
                                    F.warning(i.t0, "republish"),
                                    setTimeout(function() {
                                        return e._publish(r, !0)
                                    },
                                    1e3);
                                case 46:
                                case "end":
                                    return i.stop()
                                }
                            },
                            i, this, [[20, 30]])
                        }));
                        return function(e, t) {
                            return i.apply(this, arguments)
                        }
                    } ())
                },
                e._subscribe = function(r, n) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    return new Promise(function() {
                        var a = s(o.mark(function a(c, u) {
                            var d, p, l, f, h, m, v, y, g, b, T, S, w, C, _, x, R, E, I, P, O, M, A, j, D;
                            return o.wrap(function(a) {
                                for (;;) switch (a.prev = a.next) {
                                case 0:
                                    if (e.roomState === t.RoomState.Connected) {
                                        a.next = 3;
                                        break
                                    }
                                    return u(J("can not connected to the room, please joinRoom first")),
                                    a.abrupt("return");
                                case 3:
                                    if (0 !== r.length) {
                                        a.next = 6;
                                        break
                                    }
                                    return c([]),
                                    a.abrupt("return");
                                case 6:
                                    if (F.debug("subscribe", r, n), (d = e._trackInfo.filter(function(e) {
                                        return r.includes(e.trackid)
                                    })).length === r.length) {
                                        a.next = 11;
                                        break
                                    }
                                    return u(X(10041, "can not find track in room ".concat(r))),
                                    a.abrupt("return");
                                case 11:
                                    return l = e.connectionTransport,
                                    f = e.signaling,
                                    n ? p = e.subscribeTracks.filter(function(e) {
                                        return - 1 !== r.indexOf(e.trackId)
                                    }) : (h = e.subscribeTracks.map(function(e) {
                                        return e.trackId
                                    }), m = d.filter(function(e) {
                                        return ! h.includes(e.trackid)
                                    }), p = m.map(function(e) {
                                        return new It(l, "recv", void 0, e.trackid, e.mid)
                                    }), e.subscribeTracks = e.subscribeTracks.concat(p)),
                                    F.log("sub tracks", p),
                                    a.prev = 15,
                                    n || (v = p.map(function(e) {
                                        return e.startConnect()
                                    }), Promise.all(v).then(function() {
                                        return c(p.map(function(e) {
                                            return e.track
                                        }))
                                    }).
                                    catch(function() {
                                        u(ae())
                                    })),
                                    a.next = 19,
                                    l.initRecvHandler(p.map(function(e) {
                                        return e.trackId
                                    }));
                                case 19:
                                    if (y = a.sent) {
                                        a.next = 26;
                                        break
                                    }
                                    return g = Date.now(),
                                    a.next = 24,
                                    f.request("sub-tracks", {
                                        tracks: p.map(function(e) {
                                            return {
                                                trackid: e.trackId
                                            }
                                        })
                                    });
                                case 24:
                                    y = a.sent,
                                    z.addEvent("SubscribeTracks", {
                                        result_code: y.code,
                                        signal_take_time: Date.now() - g,
                                        tracks: y.tracks.map(function(e) {
                                            return {
                                                track_id: e.trackid,
                                                status: e.status
                                            }
                                        })
                                    });
                                case 26:
                                    F.log("get sub res data", y),
                                    a.t0 = y.code,
                                    a.next = 0 === a.t0 ? 30 : 10052 === a.t0 ? 31 : 10062 === a.t0 ? 32 : 34;
                                    break;
                                case 30:
                                    return a.abrupt("break", 35);
                                case 31:
                                    throw ee();
                                case 32:
                                    throw l.resetRecvHandler(),
                                    X(10062, y.error);
                                case 34:
                                    throw X(y.code, y.error);
                                case 35:
                                    if (b = y.tracks.filter(function(e) {
                                        return !! e.status
                                    }), T = y.tracks.filter(function(e) {
                                        return ! e.status
                                    }).map(function(e) {
                                        return e.trackid
                                    }), !(b.length < y.tracks.length && i)) {
                                        a.next = 39;
                                        break
                                    }
                                    throw X(10041, "can not find target track id: ".concat(T.join(" ")));
                                case 39:
                                    b && !i && (F.debug("can not find target track id: ".concat(T.join(""), ", continue")), S = k(p,
                                    function(e) {
                                        return - 1 !== T.indexOf(e.trackId)
                                    }), k(e.subscribeTracks,
                                    function(e) {
                                        return - 1 !== T.indexOf(e.trackId)
                                    }), S.map(function(e) {
                                        return e.release()
                                    })),
                                    y.tracks = b,
                                    w = !0,
                                    C = !1,
                                    _ = void 0,
                                    a.prev = 44,
                                    x = function() {
                                        var e = E.value,
                                        t = p.find(function(t) {
                                            return t.trackId === e.trackid
                                        }),
                                        r = d.find(function(t) {
                                            return t.trackid === e.trackid
                                        });
                                        if (!t || !r) return "continue";
                                        var n = e.rtpparams;
                                        t.appendConsumner(n, r.kind)
                                    },
                                    R = (y.tracks || [])[Symbol.iterator]();
                                case 47:
                                    if (w = (E = R.next()).done) {
                                        a.next = 54;
                                        break
                                    }
                                    if ("continue" !== x()) {
                                        a.next = 51;
                                        break
                                    }
                                    return a.abrupt("continue", 51);
                                case 51:
                                    w = !0,
                                    a.next = 47;
                                    break;
                                case 54:
                                    a.next = 60;
                                    break;
                                case 56:
                                    a.prev = 56,
                                    a.t1 = a.
                                    catch(44),
                                    C = !0,
                                    _ = a.t1;
                                case 60:
                                    a.prev = 60,
                                    a.prev = 61,
                                    w || null == R.
                                    return || R.
                                    return ();
                                case 63:
                                    if (a.prev = 63, !C) {
                                        a.next = 66;
                                        break
                                    }
                                    throw _;
                                case 66:
                                    return a.finish(63);
                                case 67:
                                    return a.finish(60);
                                case 68:
                                    return a.next = 70,
                                    l.addConsumers();
                                case 70:
                                    l.resolveInitSubPcPromise(),
                                    I = !0,
                                    P = !1,
                                    O = void 0,
                                    a.prev = 74,
                                    M = function() {
                                        var t = j.value,
                                        r = t.consumer;
                                        if (!r || !r.track) return "continue";
                                        var n = r.track,
                                        i = t.track,
                                        a = d.find(function(e) {
                                            return e.trackid === r.id
                                        });
                                        if (!a) return "continue";
                                        i ? i.resume(n) : "audio" === n.kind ? (i = new et(n, a.playerid, "remote")).initAudioManager() : i = new Qe(n, a.playerid, "remote"),
                                        i.setInfo({
                                            trackId: a.trackid,
                                            userId: a.playerid,
                                            tag: a.tag,
                                            kind: a.kind,
                                            muted: a.muted,
                                            versionid: a.versionid
                                        }),
                                        i.setMaster(a.master),
                                        i.removeAllListeners("@get-stats"),
                                        i.removeAllListeners("@ended"),
                                        i.on("@get-stats",
                                        function(t, r, n) {
                                            if (!e.connectionTransport) return r(xe());
                                            e.connectionTransport.recvHandler.getStats(i.mediaTrack, t).then(r, n)
                                        }),
                                        i.once("@ended", s(o.mark(function t() {
                                            return o.wrap(function(t) {
                                                for (;;) switch (t.prev = t.next) {
                                                case 0:
                                                    if (i && i.info.trackId) {
                                                        t.next = 2;
                                                        break
                                                    }
                                                    return t.abrupt("return");
                                                case 2:
                                                    return F.warning("remote track ended, try to resubscribe"),
                                                    t.prev = 3,
                                                    t.next = 6,
                                                    e._unsubscribe([i.info.trackId], !0);
                                                case 6:
                                                    t.next = 10;
                                                    break;
                                                case 8:
                                                    t.prev = 8,
                                                    t.t0 = t.
                                                    catch(3);
                                                case 10:
                                                    return t.next = 12,
                                                    e._subscribe([i.info.trackId], !0);
                                                case 12:
                                                case "end":
                                                    return t.stop()
                                                }
                                            },
                                            t, this, [[3, 8]])
                                        }))),
                                        t.track = i;
                                        var c = e.users.find(function(e) {
                                            return e.userId === a.playerid
                                        });
                                        c && c.addTracks([i])
                                    },
                                    A = p[Symbol.iterator]();
                                case 77:
                                    if (I = (j = A.next()).done) {
                                        a.next = 84;
                                        break
                                    }
                                    if ("continue" !== M()) {
                                        a.next = 81;
                                        break
                                    }
                                    return a.abrupt("continue", 81);
                                case 81:
                                    I = !0,
                                    a.next = 77;
                                    break;
                                case 84:
                                    a.next = 90;
                                    break;
                                case 86:
                                    a.prev = 86,
                                    a.t2 = a.
                                    catch(74),
                                    P = !0,
                                    O = a.t2;
                                case 90:
                                    a.prev = 90,
                                    a.prev = 91,
                                    I || null == A.
                                    return || A.
                                    return ();
                                case 93:
                                    if (a.prev = 93, !P) {
                                        a.next = 96;
                                        break
                                    }
                                    throw O;
                                case 96:
                                    return a.finish(93);
                                case 97:
                                    return a.finish(90);
                                case 98:
                                    p.forEach(function(e) {
                                        return e.connectStatus = t.TrackConnectStatus.Connect
                                    }),
                                    e.handleMute({
                                        tracks: y.tracks
                                    }),
                                    a.next = 124;
                                    break;
                                case 102:
                                    return a.prev = 102,
                                    a.t3 = a.
                                    catch(15),
                                    F.log(a.t3),
                                    D = [],
                                    p.forEach(function(e) {
                                        e.consumer && D.push(e.consumer)
                                    }),
                                    a.next = 109,
                                    l.removeConsumers(D);
                                case 109:
                                    if (! (a.t3 instanceof H)) {
                                        a.next = 121;
                                        break
                                    }
                                    a.t4 = a.t3.code,
                                    a.next = 10062 === a.t4 ? 113 : 30001 === a.t4 ? 113 : 10052 === a.t4 ? 114 : 117;
                                    break;
                                case 113:
                                    return a.abrupt("return");
                                case 114:
                                    return F.warning(a.t3, "resubscribe"),
                                    setTimeout(function() {
                                        return e._subscribe(r, !0)
                                    },
                                    1e3),
                                    a.abrupt("return");
                                case 117:
                                    k(e.subscribeTracks,
                                    function(e) {
                                        return - 1 !== r.indexOf(e.trackId)
                                    }),
                                    u(a.t3);
                                case 119:
                                    a.next = 124;
                                    break;
                                case 121:
                                    return F.warning(a.t3, "resubscribe"),
                                    setTimeout(function() {
                                        return e._subscribe(r, !0)
                                    },
                                    1e3),
                                    a.abrupt("return");
                                case 124:
                                    c(p.map(function(e) {
                                        return e.track
                                    }));
                                case 125:
                                case "end":
                                    return a.stop()
                                }
                            },
                            a, this, [[15, 102], [44, 56, 60, 68], [61, , 63, 67], [74, 86, 90, 98], [91, , 93, 97]])
                        }));
                        return function(e, t) {
                            return a.apply(this, arguments)
                        }
                    } ())
                },
                e.config = n,
                F.log("version", N),
                F.log("browser report", h.browserReport, h.browser),
                e
            }
            return d(r, m),
            l(r, [{
                key: "joinRoomWithToken",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i, a;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Reconnecting) {
                                    e.next = 4;
                                    break
                                }
                                if (this.roomState === t.RoomState.Idle) {
                                    e.next = 3;
                                    break
                                }
                                throw J("roomState is not idle! Do not repeat join room, please run leaveRoom first");
                            case 3:
                                this.roomState = t.RoomState.Connecting;
                            case 4:
                                if (z.addEvent("JoinRoom", {
                                    room_token: r,
                                    user_data: n
                                }), e.prev = 5, this.roomToken = r, this.userData = n, i = pe(r), this.userId = i.userId, this.roomName = i.roomName, this.appId = i.appId, F.log("join room, token:", r), F.debug("join room, roomName: ".concat(this.roomName, ", userId: ").concat(this.userId)), this.roomName.match(/^[a-zA-Z0-9_-]{3,64}$/)) {
                                    e.next = 17;
                                    break
                                }
                                throw this.roomState = t.RoomState.Idle,
                                J("invalid roomname. roomname must match /^[a-zA-Z0-9_-]{3,64}$/");
                            case 17:
                                if (this.userId.match(/^[a-zA-Z0-9_-]{3,50}$/)) {
                                    e.next = 20;
                                    break
                                }
                                throw this.roomState = t.RoomState.Idle,
                                J("invalid userId. userId must match /^[a-zA-Z0-9_-]{3,50}$/");
                            case 20:
                                return e.prev = 20,
                                e.next = 23,
                                bt(i, r);
                            case 23:
                                a = e.sent,
                                this.accessToken = a.accessToken,
                                z.setSessionId(a.sessionId),
                                z.setUserBase(this.userId, this.roomName),
                                e.next = 32;
                                break;
                            case 29:
                                throw e.prev = 29,
                                e.t0 = e.
                                catch(20),
                                e.t0;
                            case 32:
                                return e.next = 34,
                                this.joinRoomWithAccess(this.accessToken);
                            case 34:
                                return e.abrupt("return", e.sent);
                            case 37:
                                throw e.prev = 37,
                                e.t1 = e.
                                catch(5),
                                this.roomState = t.RoomState.Idle,
                                e.t1;
                            case 41:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[5, 37], [20, 29]])
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "joinRoomWithAccess",
                value: function() {
                    var e = s(o.mark(function e(r) {
                        var n, i, a, s, c, u = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return n = de(r),
                                e.next = 3,
                                kt();
                            case 3:
                                if (i = e.sent, a = i.capsdp, this._roomState !== t.RoomState.Idle) {
                                    e.next = 7;
                                    break
                                }
                                throw J("roomState is idle, maybe because you left the room.");
                            case 7:
                                return (s = new _t(n.signalingurl2, r, a, this.userData)).on("@error", this.handleDisconnect.bind(this)).on("@ws-state-change",
                                function(e, r) {
                                    switch (r) {
                                    case St.CONNECTING:
                                        u.roomState === t.RoomState.Connected ? u.roomState = t.RoomState.Reconnecting: u.roomState !== t.RoomState.Reconnecting && (u.roomState = t.RoomState.Connecting)
                                    }
                                }).on("@needupdateaccesstoken",
                                function(e, t) {
                                    u.updateAccessToken().then(e).
                                    catch(t)
                                }).on("on-player-in", this.handlePlayerIn.bind(this)).on("on-player-out", this.handlePlayerOut.bind(this)).on("on-add-tracks",
                                function(e) {
                                    u.filterSignalTracks(e),
                                    u.handleAddTracks(e)
                                }).on("on-remove-tracks",
                                function(e) {
                                    u.filterSignalTracks(e),
                                    u.handleRemoveTracks(e)
                                }).on("mute-tracks",
                                function(e) {
                                    u.filterSignalTracks(e),
                                    u.handleMute(e)
                                }).on("on-messages", this.handleCustomMessages.bind(this)).on("on-pubpc-restart-notify",
                                function(e) {
                                    var t = u.connectionTransport;
                                    t && h.browserReport.supportRestartICE && t.restartSendICE(e.pcid).
                                    catch(F.debug)
                                }).on("on-subpc-restart-notify",
                                function(e) {
                                    var t = u.connectionTransport;
                                    t && h.browserReport.supportRestartICE && t.restartRecvICE(e.pcid).
                                    catch(F.debug)
                                }).on("disconnect", this.handleDisconnect.bind(this)),
                                F.log("init signaling websocket"),
                                this.signaling = s,
                                e.prev = 11,
                                e.next = 14,
                                s.initWs(!0);
                            case 14:
                                return c = e.sent,
                                s.on("@signalingauth", this.handleAuth.bind(this)),
                                e.next = 18,
                                this.handleAuth(c);
                            case 18:
                                e.next = 28;
                                break;
                            case 20:
                                if (e.prev = 20, e.t0 = e.
                                catch(11), this.signaling && (this.signaling.release(), this.signaling = void 0), 10052 !== e.t0.code) {
                                    e.next = 27;
                                    break
                                }
                                return e.next = 26,
                                ye(1e3);
                            case 26:
                                return e.abrupt("return", this.joinRoomWithToken(this.roomToken, this.userData));
                            case 27:
                                throw e.t0;
                            case 28:
                                return e.abrupt("return", this.users);
                            case 29:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[11, 20]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_unpublish",
                value: function() {
                    var e = s(o.mark(function e(r) {
                        var n, i, a;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("not connected to the room");
                            case 2:
                                if (0 !== r.length) {
                                    e.next = 4;
                                    break
                                }
                                return e.abrupt("return");
                            case 4:
                                if (F.debug("unpublish", r), n = this.connectionTransport, (i = n.publishTracks.filter(function(e) {
                                    return - 1 !== r.indexOf(e.trackId)
                                })).length === r.length) {
                                    e.next = 9;
                                    break
                                }
                                throw J("can not find target trackid to unpublish");
                            case 9:
                                return e.next = 11,
                                n.removeTracks(i);
                            case 11:
                                this.getAllMerger().forEach(function(e) {
                                    return e.controller.onRemoveTracks(i.map(function(e) {
                                        return e.track.info
                                    }))
                                }),
                                (a = le(this.users, "userId", this.userId)) && (a.removeTracksByTrackId(r), a.removePublishedTrackInfo(r)),
                                this.cleanTrackIdsFromMergeJobs(r);
                            case 15:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "createMergeJob",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i, a, s;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("can not createMergeJob, room state is not connected");
                            case 2:
                                return i = _({},
                                D, n, {
                                    id: r
                                }),
                                F.debug("send create merge job", i, r),
                                a = Date.now(),
                                e.next = 7,
                                this.signaling.request("create-merge-job", i);
                            case 7:
                                if (s = e.sent, z.addEvent("CreateMergeJob", {
                                    signal_take_time: Date.now() - a,
                                    id: r,
                                    result_code: s.code
                                }), 0 === s.code) {
                                    e.next = 11;
                                    break
                                }
                                throw W(s.code, s.error);
                            case 11:
                                this.mergeJobTracks[r] ? F.warning("merge job id already exist", r) : this.mergeJobTracks[r] = [];
                            case 12:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "setDefaultMergeStream",
                value: function(e, t, r) {
                    if (r && !this.mergeJobTracks[r]) throw ne(r);
                    this.merger && !r && (this.merger.release(), this.merger = void 0),
                    r && this.mergeJobMerger[r] && (this.mergeJobMerger[r].release(), delete this.mergeJobMerger[r]);
                    var n = this.CreateMergerSessionController();
                    r ? this.mergeJobMerger[r] = new Rt(e, t, n, r) : this.merger = new Rt(e, t, n, r)
                }
            },
            {
                key: "_stopMerge",
                value: function(e) {
                    if (this.roomState !== t.RoomState.Connected) throw J("can not addMergeTracks, room state is not connected");
                    if (e && !this.mergeJobTracks[e]) throw ne(e);
                    z.addEvent("StopMerge", {
                        id: e || ""
                    }),
                    this.signaling.sendWsMsg("stop-merge", {
                        id: e
                    }),
                    e ? (delete this.mergeJobTracks[e], this.mergeJobMerger[e] && (this.mergeJobMerger[e].release(), delete this.mergeJobMerger[e])) : (this.defaultMergeJobTracks = [], this.merger && (this.merger.release(), this.merger = void 0))
                }
            },
            {
                key: "_addMergeTracks",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i, a;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("can not addMergeTracks, room state is not connected");
                            case 2:
                                if (!n || this.mergeJobTracks[n]) {
                                    e.next = 4;
                                    break
                                }
                                throw ne(n);
                            case 4:
                                return i = r.map(function(e) {
                                    return {
                                        trackid: e.trackId,
                                        x: e.x,
                                        y: e.y,
                                        w: e.w,
                                        h: e.h,
                                        z: e.z
                                    }
                                }),
                                a = {
                                    id: n,
                                    add: i
                                },
                                F.debug("addMergeTracks", a),
                                n ? (this.mergeJobTracks[n] = this.mergeJobTracks[n].concat(r.map(function(e) {
                                    return e.trackId
                                })), this.mergeJobTracks[n] = v(this.mergeJobTracks[n],
                                function(e) {
                                    return e
                                })) : (this.defaultMergeJobTracks = this.defaultMergeJobTracks.concat(r.map(function(e) {
                                    return e.trackId
                                })), this.defaultMergeJobTracks = v(this.defaultMergeJobTracks,
                                function(e) {
                                    return e
                                })),
                                z.addEvent("UpdateMergeTracks", {
                                    id: n || "",
                                    add: i.map(function(e) {
                                        return {
                                            track_id: e.trackid,
                                            x: e.x || 0,
                                            y: e.y || 0,
                                            w: e.w || 0,
                                            h: e.h || 0,
                                            z: e.z || 0
                                        }
                                    })
                                }),
                                e.next = 11,
                                this.signaling.request("update-merge-tracks", a);
                            case 11:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_removeMergeTracks",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("can not addMergeTracks, room state is not connected");
                            case 2:
                                if (!n || this.mergeJobTracks[n]) {
                                    e.next = 4;
                                    break
                                }
                                throw ne(n);
                            case 4:
                                return i = {
                                    id: n,
                                    remove: r.map(function(e) {
                                        return {
                                            trackid: e
                                        }
                                    })
                                },
                                F.debug("removeMergeTracks", i),
                                k(n ? this.mergeJobTracks[n] : this.defaultMergeJobTracks,
                                function(e) {
                                    return - 1 !== r.indexOf(e)
                                }),
                                e.next = 9,
                                this.signaling.request("update-merge-tracks", i);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_unsubscribe",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("no signaling model, please run joinRoomWithToken first");
                            case 2:
                                if (i = this.subscribeTracks.filter(function(e) {
                                    return - 1 !== r.indexOf(e.trackId)
                                }), F.debug("unsubscribe", i), 0 !== i.length) {
                                    e.next = 6;
                                    break
                                }
                                return e.abrupt("return");
                            case 6:
                                return z.addEvent("UnSubscribeTracks", {
                                    tracks: r.map(function(e) {
                                        return {
                                            track_id: e
                                        }
                                    })
                                }),
                                this.signaling.request("unsub-tracks", {
                                    tracks: i.map(function(e) {
                                        return {
                                            trackid: e.trackId
                                        }
                                    })
                                }),
                                n || (i.forEach(function(e) {
                                    return e.release()
                                }), k(this.subscribeTracks,
                                function(e) {
                                    return - 1 !== r.indexOf(e.trackId)
                                })),
                                e.next = 11,
                                this.connectionTransport.removeConsumers(i.map(function(e) {
                                    return e.consumer
                                }));
                            case 11:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "_muteTracks",
                value: function(e) {
                    if (this.roomState !== t.RoomState.Connected) throw J("no signaling model, please run joinRoomWithToken first");
                    var r = this.connectionTransport,
                    n = {};
                    e.forEach(function(e) {
                        n[e.trackId] = e.muted
                    });
                    var i = r.publishTracks.filter(function(e) {
                        return void 0 !== n[e.trackId]
                    });
                    i.forEach(function(e) {
                        e.setMute(n[e.trackId])
                    }),
                    z.addEvent("MuteTracks", {
                        tracks: i.map(function(e) {
                            return {
                                track_id: e.trackId,
                                muted: e.track.info.muted,
                                kind: e.track.info.kind
                            }
                        })
                    }),
                    this.signaling.sendWsMsg("mute-tracks", {
                        tracks: e.map(function(e) {
                            return {
                                trackid: e.trackId,
                                muted: e.muted
                            }
                        })
                    })
                }
            },
            {
                key: "kickoutUser",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return F.log("kickoutUser", t),
                                e.next = 3,
                                this.control("kickplayer", t);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "sendCustomMessage",
                value: function(e, r) {
                    if (this.roomState !== t.RoomState.Connected) throw J("room state is not connected, can not send message");
                    this.signaling.sendWsMsg("send-message", {
                        msgid: ke(8),
                        target: r && 0 !== r.length ? r: void 0,
                        type: "normal",
                        text: e
                    }),
                    F.debug("send custom message", e, r)
                }
            },
            {
                key: "leaveRoom",
                value: function() {
                    this.roomState !== t.RoomState.Idle ? (F.log("leave room"), z.addEvent("LeaveRoom", {
                        leave_reason_code: 0
                    }), this.signaling && this.signaling.sendDisconnect(), this.releaseRoom()) : F.log("can not leave room, please join room first")
                }
            },
            {
                key: "_releasePublishTracks",
                value: function() {}
            },
            {
                key: "control",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i, a;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.roomState === t.RoomState.Connected) {
                                    e.next = 2;
                                    break
                                }
                                throw J("can not connected to the room, please run joinRoom first");
                            case 2:
                                return i = Date.now(),
                                e.next = 5,
                                this.signaling.request("control", {
                                    command: r,
                                    playerid: n
                                });
                            case 5:
                                if (a = e.sent, "kickplayer" === r && z.addEvent("KickoutUser", {
                                    signal_take_time: Date.now() - i,
                                    user_id: n,
                                    result_code: a.code
                                }), !a.error) {
                                    e.next = 9;
                                    break
                                }
                                throw Y(a.code, a.error);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "handlePlayerOut",
                value: function(e) {
                    var t = this,
                    r = this._users.get(e.playerid);
                    r && (this._users.delete(e.playerid), k(this._trackInfo,
                    function(t) {
                        return t.playerid === e.playerid
                    }), k(this.subscribeTracks,
                    function(e) {
                        return e.track.userId === r.userId
                    }).forEach(function(e) {
                        return e.release()
                    }), he(function() {
                        F.debug("user-leave", r),
                        t.emit("user-leave", r)
                    }))
                }
            },
            {
                key: "handlePlayerIn",
                value: function(e) {
                    var t = this,
                    r = st(e);
                    this._users.set(r.userId, r),
                    he(function() {
                        F.debug("user-join", r),
                        t.emit("user-join", r)
                    })
                }
            },
            {
                key: "handleAddTracks",
                value: function(e) {
                    var t = this,
                    r = e.tracks;
                    F.log("receive track-add", r, _({},
                    this._trackInfo));
                    var n = new Set,
                    i = !0,
                    a = !1,
                    o = void 0;
                    try {
                        for (var s, c = r[Symbol.iterator](); ! (i = (s = c.next()).done); i = !0) {
                            var u = s.value,
                            d = le(this.users, "userId", u.playerid);
                            if (d) if (d.published && !n.has(d.userId) && "stream" === this.sessionMode) {
                                var p = d.publishedTrackInfo.map(function(e) {
                                    return at(e, !0)
                                });
                                this.handleRemoveTracks({
                                    tracks: p
                                }),
                                p.push(u),
                                this.handleAddTracks({
                                    tracks: p
                                })
                            } else this._trackInfo.push(u),
                            d.addPublishedTrackInfo([it(u)]),
                            n.add(d.userId)
                        }
                    } catch(m) {
                        a = !0,
                        o = m
                    } finally {
                        try {
                            i || null == c.
                            return || c.
                            return ()
                        } finally {
                            if (a) throw o
                        }
                    }
                    if ("stream" === this.sessionMode) for (var l = Array.from(n), f = function() {
                        var e = l[h];
                        he(function() {
                            F.debug("user-publish", t._users.get(e)),
                            t.emit("user-publish", t._users.get(e))
                        })
                    },
                    h = 0; h < l.length; h++) f();
                    he(function() {
                        F.debug("track-add", r.map(it)),
                        t.emit("track-add", r.map(it))
                    })
                }
            },
            {
                key: "handleRemoveTracks",
                value: function(e) {
                    var t = this,
                    r = e.tracks;
                    F.log("receive track-remove", r, _({},
                    this._trackInfo));
                    var n = k(this._trackInfo,
                    function(e) {
                        return r.map(function(e) {
                            return e.trackid
                        }).includes(e.trackid)
                    }),
                    i = new Set,
                    a = !0,
                    o = !1,
                    s = void 0;
                    try {
                        for (var c, u = function() {
                            var e = c.value,
                            r = t._users.get(e.playerid);
                            if (!r) return "continue";
                            r.removePublishedTrackInfo([e.trackid]),
                            r.removeTracksByTrackId([e.trackid]),
                            i.add(r.userId);
                            var n = k(t.subscribeTracks,
                            function(t) {
                                return t.trackId === e.trackid
                            })[0];
                            n && n.release()
                        },
                        d = n[Symbol.iterator](); ! (a = (c = d.next()).done); a = !0) u()
                    } catch(h) {
                        o = !0,
                        s = h
                    } finally {
                        try {
                            a || null == d.
                            return || d.
                            return ()
                        } finally {
                            if (o) throw s
                        }
                    }
                    if (this.cleanTrackIdsFromMergeJobs(r.map(function(e) {
                        return e.trackid
                    })), "stream" === this.sessionMode) for (var p = Array.from(i), l = function() {
                        var e = p[f],
                        r = t._users.get(e);
                        if (r.published) {
                            var n = r.publishedTrackInfo.map(function(e) {
                                return at(e, !0)
                            });
                            t.handleRemoveTracks({
                                tracks: n
                            }),
                            t.handleAddTracks({
                                tracks: n
                            })
                        } else he(function() {
                            F.debug("user-unpublish", r),
                            t.emit("user-unpublish", r)
                        })
                    },
                    f = 0; f < p.length; f++) l();
                    he(function() {
                        F.debug("track-remove", n.map(it)),
                        t.emit("track-remove", n.map(it))
                    })
                }
            },
            {
                key: "handleMute",
                value: function(e) {
                    var t = this,
                    r = e.tracks,
                    n = !0,
                    i = !1,
                    a = void 0;
                    try {
                        for (var o, s = function() {
                            var e = o.value,
                            r = e.trackid,
                            n = e.muted,
                            i = le(t._trackInfo, "trackid", r);
                            if (!i) return {
                                v: void 0
                            };
                            var a = t._users.get(i.playerid);
                            if (!a) return {
                                v: void 0
                            };
                            var s = a.publishedTrackInfo.find(function(e) {
                                return e.trackId === r
                            });
                            s && (s.muted = n);
                            var c = a.tracks.find(function(e) {
                                return e.info.trackId === r
                            });
                            c && (c.info.muted = n, c.setMute(n)),
                            i.muted = n;
                            var u = t.subscribeTracks.filter(function(e) {
                                return e.trackId === r
                            })[0];
                            u && u.setMute(n);
                            for (var d = void 0,
                            p = 0; p < t._trackInfo.length; p += 1) t._trackInfo[p].playerid === i.playerid && t._trackInfo[p].kind !== i.kind && (d = t._trackInfo[p]);
                            var l = {
                                userId: i.playerid,
                                muteAudio: !1,
                                muteVideo: !1
                            };
                            "audio" === i.kind ? (l.muteAudio = n, l.muteVideo = !!d && d.muted) : (l.muteVideo = n, l.muteAudio = !!d && d.muted),
                            "stream" === t.sessionMode && he(function() {
                                F.log("user-mute", l),
                                t.emit("user-mute", l)
                            })
                        },
                        c = r[Symbol.iterator](); ! (n = (o = c.next()).done); n = !0) {
                            var u = s();
                            if ("object" === typeof u) return u.v
                        }
                    } catch(d) {
                        i = !0,
                        a = d
                    } finally {
                        try {
                            n || null == c.
                            return || c.
                            return ()
                        } finally {
                            if (i) throw a
                        }
                    }
                    he(function() {
                        F.log("mute-tracks", r.map(function(e) {
                            return {
                                trackId: e.trackid,
                                muted: e.muted
                            }
                        })),
                        t.emit("mute-tracks", r.map(function(e) {
                            return {
                                trackId: e.trackid,
                                muted: e.muted
                            }
                        }))
                    })
                }
            },
            {
                key: "handleCustomMessages",
                value: function(e) {
                    var t = e.messages;
                    F.debug("messages-received", t.map(nt)),
                    this.emit("messages-received", t.map(nt))
                }
            },
            {
                key: "handleDisconnect",
                value: function(e) {
                    var r = this;
                    if (F.log("handle disconnect", e), z.addEvent("LeaveRoom", {
                        leave_reason_code: e.code
                    }), 10052 === e.code && this.roomToken) return this.roomState = t.RoomState.Reconnecting,
                    void setTimeout(function() {
                        return r.signaling.initWs()
                    },
                    1e3);
                    switch (this.releaseRoom(), e.code) {
                    case 10006:
                        this.emit("disconnect", {
                            code: e.code,
                            data: {
                                userId: e.kickedid
                            }
                        });
                        break;
                    default:
                        this.emit("disconnect", {
                            code: e.code
                        })
                    }
                }
            },
            {
                key: "updateAccessToken",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t, r;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return t = pe(this.roomToken),
                                e.next = 3,
                                bt(t, this.roomToken);
                            case 3:
                                if (r = e.sent, z.setSessionId(r.sessionId), this.accessToken = r.accessToken, !this.signaling) {
                                    e.next = 10;
                                    break
                                }
                                this.signaling.accessToken = this.accessToken,
                                e.next = 11;
                                break;
                            case 10:
                                throw J("room state is idle");
                            case 11:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "handleAuth",
                value: function() {
                    var e = s(o.mark(function e(r) {
                        var n, i, a, s, c, u, d, p, l, f, h, m, v = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.filterSignalTracks(r), F.debug("handleAuth", r), !r.error) {
                                    e.next = 6;
                                    break
                                }
                                return e.next = 5,
                                this.joinRoomWithToken(this.roomToken, this.userData);
                            case 5:
                                return e.abrupt("return");
                            case 6:
                                if (r.tracks = r.tracks || [], r.tracks = r.tracks.filter(function(e) {
                                    return e.playerid !== v.userId
                                }), r.players = r.players || [], n = this.roomState === t.RoomState.Reconnecting, i = {
                                    join: [],
                                    leave: [],
                                    add: [],
                                    remove: [],
                                    mute: []
                                },
                                a = Array.from(this._users.keys()), s = r.players.map(function(e) {
                                    return e.playerid
                                }), i = me(this.userId, this._trackInfo, r.tracks, a, s), this.roomState = t.RoomState.Connected, n) {
                                    e.next = 40;
                                    break
                                }
                                for (this._trackInfo = r.tracks, this._users.clear(), c = !0, u = !1, d = void 0, e.prev = 21, p = function() {
                                    var e = st(f.value),
                                    t = v._trackInfo.filter(function(t) {
                                        return t.playerid === e.userId
                                    });
                                    e.addPublishedTrackInfo(t.map(it)),
                                    v._users.set(e.userId, e)
                                },
                                l = (r.players || [])[Symbol.iterator](); ! (c = (f = l.next()).done); c = !0) p();
                                e.next = 30;
                                break;
                            case 26:
                                e.prev = 26,
                                e.t0 = e.
                                catch(21),
                                u = !0,
                                d = e.t0;
                            case 30:
                                e.prev = 30,
                                e.prev = 31,
                                c || null == l.
                                return || l.
                                return ();
                            case 33:
                                if (e.prev = 33, !u) {
                                    e.next = 36;
                                    break
                                }
                                throw d;
                            case 36:
                                return e.finish(33);
                            case 37:
                                return e.finish(30);
                            case 38:
                                e.next = 46;
                                break;
                            case 40:
                                F.debug("get missing events", i),
                                i.remove.length > 0 && this.handleRemoveTracks({
                                    tracks: i.remove
                                }),
                                i.leave.length > 0 && i.leave.forEach(this.handlePlayerOut.bind(this)),
                                i.join.length > 0 && i.join.forEach(this.handlePlayerIn.bind(this)),
                                i.add.length > 0 && this.handleAddTracks({
                                    tracks: i.add
                                }),
                                i.mute.length > 0 && this.handleMute({
                                    tracks: i.mute
                                });
                            case 46:
                                this.connectionTransport ? (h = this.connectionTransport.publishTracks.filter(function(e) {
                                    return e.connectStatus === t.TrackConnectStatus.Connecting
                                }), m = this.subscribeTracks.filter(function(e) {
                                    return e.connectStatus === t.TrackConnectStatus.Connecting
                                }), this.connectionTransport.extendedRtpCapabilities = r.rtpcaps, (!this.connectionTransport.sendHandler.isPcReady || this.connectionTransport.sendHandler._isRestartingICE || h.length > 0) && this.connectionTransport.reconnectProducer(), (!this.connectionTransport.recvHandler.isPcReady || this.connectionTransport.recvHandler._isRestartingICE || m.length > 0) && this.connectionTransport.resetRecvHandler()) : this.connectionTransport = this.createConnectionTransport(r.rtpcaps);
                            case 47:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[21, 26, 30, 38], [31, , 33, 37]])
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "createConnectionTransport",
                value: function(e) {
                    var r = this,
                    n = this.signaling,
                    i = new Dt(e, n);
                    return i.on("@needpubpc",
                    function(e, t, i, a) {
                        n.request("pubpc", {
                            sdp: e,
                            tracks: t.map(ot),
                            policy: r.config.transportPolicy
                        }).then(function(e) {
                            switch (e.code) {
                            case 0:
                                return void i(e);
                            case 10052:
                                throw ee();
                            default:
                                throw K(e.error)
                            }
                        }).
                        catch(a)
                    }),
                    i.on("@needsubpc",
                    function(e, t, i) {
                        n.request("subpc", {
                            tracks: e.map(function(e) {
                                return {
                                    trackid: e
                                }
                            }),
                            policy: r.config.transportPolicy
                        }).then(function(e) {
                            switch (e.code) {
                            case 0:
                                return void t(e);
                            case 10052:
                                throw ee();
                            default:
                                throw Q(e.error)
                            }
                        }).
                        catch(i)
                    }).on("@needresub",
                    function() {
                        var e = r.subscribeTracks.map(function(e) {
                            return e.trackId
                        });
                        r.subscribeTracks.forEach(function(e) {
                            return e.connectStatus = t.TrackConnectStatus.Connecting
                        }),
                        r._subscribe(e, !0)
                    }).on("@needrepub",
                    function(e) {
                        r._publish(e.map(function(e) {
                            return e.track
                        }), !0)
                    }).on("@needresetrecv",
                    function() {
                        r.subscribeTracks.filter(function(e) {
                            return !! e.track
                        }).forEach(function(e) {
                            e.track.removeAllListeners("@ended")
                        })
                    }),
                    i
                }
            },
            {
                key: "cleanTrackIdsFromMergeJobs",
                value: function(e) {
                    for (var t in k(this.defaultMergeJobTracks,
                    function(t) {
                        return - 1 !== e.indexOf(t)
                    }), this.mergeJobTracks) k(t,
                    function(t) {
                        return - 1 !== e.indexOf(t)
                    })
                }
            },
            {
                key: "CreateMergerSessionController",
                value: function() {
                    var e = this,
                    t = new xt,
                    r = function(e) {
                        t.onAddTracks(e)
                    },
                    n = function(e) {
                        t.onRemoveTracks(e)
                    };
                    return this.on("track-add", r),
                    this.on("track-remove", n),
                    t.getCurrentTracks = function() {
                        if (!e.connectionTransport) return [];
                        var t = e._trackInfo.map(it),
                        r = e.connectionTransport.publishTracks.map(function(e) {
                            return e.track.info
                        });
                        return t.concat(r)
                    },
                    t.addMergeTrack = function(t, r) {
                        e._addMergeTracks(t, r)
                    },
                    t.release = function() {
                        e.off("track-add", r),
                        e.off("track-remove", n)
                    },
                    t
                }
            },
            {
                key: "getAllMerger",
                value: function() {
                    var e = [];
                    for (var t in this.merger && e.push(this.merger), this.mergeJobMerger) e.push(this.mergeJobMerger[t]);
                    return e
                }
            },
            {
                key: "releaseRoom",
                value: function() {
                    this.releaseSession(),
                    this.signaling && (this.signaling.release(), this.signaling = void 0),
                    z.addEvent("UnInit", {},
                    !0),
                    this.connectionTransport && (this.connectionTransport.release(), this.connectionTransport = void 0),
                    this.getAllMerger().map(function(e) {
                        e.release()
                    }),
                    this.defaultMergeJobTracks = [],
                    this.mergeJobTracks = {},
                    this.merger = void 0,
                    this.mergeJobMerger = {},
                    this.roomState = t.RoomState.Idle,
                    this._trackInfo = [],
                    this._users.clear(),
                    this.userId = void 0,
                    this.subscribeTracks.forEach(function(e) {
                        e.release()
                    }),
                    this.subscribeTracks = []
                }
            },
            {
                key: "users",
                get: function() {
                    return Array.from(this._users.values())
                }
            },
            {
                key: "trackInfoList",
                get: function() {
                    return this._trackInfo.map(it)
                }
            },
            {
                key: "roomState",
                get: function() {
                    return this._roomState
                },
                set: function(e) {
                    this._roomState !== e && (this._roomState = e, F.debug("roomState change", this._roomState), this.emit("room-state-change", this._roomState), z.addEvent("RoomStateChanged", {
                        room_state: e
                    }))
                }
            }]),
            r
        } (),
        Ut = function(e) {
            function t(e) {
                var r;
                return p(this, t),
                (r = c(this, u(t).call(this, e))).subscribedUsers = {},
                r.sessionMode = "stream",
                z.addEvent("Init", {
                    id: "".concat(r.sessionMode, "_").concat(Date.now())
                }),
                r
            }
            return d(t, Nt),
            l(t, [{
                key: "publish",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!this.stream) {
                                    e.next = 3;
                                    break
                                }
                                return F.warning("repeat publish, please unpublish first!"),
                                e.abrupt("return");
                            case 3:
                                return t.userId = this.userId,
                                this.stream = t,
                                e.next = 7,
                                this._publish(t.trackList);
                            case 7:
                                return e.abrupt("return", e.sent);
                            case 8:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "unpublish",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.connectionTransport) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                return t = this.connectionTransport.publishTracks.map(function(e) {
                                    return e.trackId
                                }),
                                e.next = 5,
                                this._unpublish(t);
                            case 5:
                                this.stream = void 0;
                            case 6:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "setMergeStreamLayout",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        var n, i, a, s, c, u, d, p, l, f, h, m, v;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (void 0, r.id ? this.mergeJobTracks[r.id] : this.defaultMergeJobTracks) {
                                    e.next = 4;
                                    break
                                }
                                throw ne(r.id);
                            case 4:
                                if ((n = le(this.users, "userId", t)) && n.published) {
                                    e.next = 8;
                                    break
                                }
                                return F.warning("can not setMergeOption, user ".concat(t, " is published ?")),
                                e.abrupt("return");
                            case 8:
                                for (i = r, !1 === r.visible && (i.hidden = !0), a = i.id, s = !!i.hidden, c = !!i.muted, delete i.id, delete i.hidden, delete i.muted, u = [], d = [], p = !0, l = !1, f = void 0, e.prev = 21, h = n.publishedTrackInfo[Symbol.iterator](); ! (p = (m = h.next()).done); p = !0)"audio" === (v = m.value).kind && c ? d.push(v.trackId) : "audio" === v.kind && u.push({
                                    trackId: v.trackId
                                }),
                                "video" === v.kind && s ? d.push(v.trackId) : "video" === v.kind && u.push(_({},
                                i, {
                                    trackId: v.trackId
                                }));
                                e.next = 29;
                                break;
                            case 25:
                                e.prev = 25,
                                e.t0 = e.
                                catch(21),
                                l = !0,
                                f = e.t0;
                            case 29:
                                e.prev = 29,
                                e.prev = 30,
                                p || null == h.
                                return || h.
                                return ();
                            case 32:
                                if (e.prev = 32, !l) {
                                    e.next = 35;
                                    break
                                }
                                throw f;
                            case 35:
                                return e.finish(32);
                            case 36:
                                return e.finish(29);
                            case 37:
                                return e.next = 39,
                                this._addMergeTracks(u, a);
                            case 39:
                                return e.next = 41,
                                this._removeMergeTracks(d, a);
                            case 41:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[21, 25, 29, 37], [30, , 32, 36]])
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "stopMergeStream",
                value: function(e) {
                    this._stopMerge(e)
                }
            },
            {
                key: "subscribe",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n, i, a = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (t !== this.userId) {
                                    e.next = 2;
                                    break
                                }
                                throw X(10044, "can not subscribe yourself");
                            case 2:
                                if (0 !== (r = this._trackInfo.filter(function(e) {
                                    return e.playerid === t && e.master
                                })).length) {
                                    e.next = 5;
                                    break
                                }
                                throw X(10041, "subscribe user ".concat(t, " is not published"));
                            case 5:
                                return n = r.map(function(e) {
                                    return e.trackid
                                }),
                                e.next = 8,
                                this._subscribe(n, !1, !0);
                            case 8:
                                return i = e.sent,
                                this.subscribedUsers[t] = new rt(i, "recv", t),
                                this.subscribedUsers[t].once("release",
                                function() {
                                    delete a.subscribedUsers[t]
                                }),
                                e.abrupt("return", this.subscribedUsers[t]);
                            case 12:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "unsubscribe",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (this.subscribedUsers[t]) {
                                    e.next = 3;
                                    break
                                }
                                return F.warning("user", t, "is not in subscribedUsers"),
                                e.abrupt("return");
                            case 3:
                                return e.next = 5,
                                this._unsubscribe(this.subscribedUsers[t].trackList.map(function(e) {
                                    return e.info.trackId
                                }));
                            case 5:
                                delete this.subscribedUsers[t];
                            case 6:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "mute",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    if (this.stream) {
                        var r = [];
                        this.stream._audioTrack && this.stream._audioTrack.info.muted !== e && r.push({
                            trackId: this.stream._audioTrack.info.trackId,
                            muted: e
                        }),
                        this.stream._videoTrack && this.stream._videoTrack.info.muted !== t && r.push({
                            trackId: this.stream._videoTrack.info.trackId,
                            muted: t
                        }),
                        this._muteTracks(r)
                    } else F.warning("can not mute, please run publish first")
                }
            },
            {
                key: "filterSignalTracks",
                value: function(e) {
                    var t = this;
                    e.tracks && (e.tracks = e.tracks.filter(function(e) {
                        if (void 0 !== e.master && null !== e.master) return e.master;
                        var r = t._trackInfo.find(function(t) {
                            return t.trackid === e.trackid
                        });
                        return !! r && r.master
                    }))
                }
            },
            {
                key: "releaseSession",
                value: function() {
                    for (var e in this.stream && (this.stream.release(), this.stream = void 0), this.subscribedUsers) this.subscribedUsers[e].release();
                    this.subscribedUsers = {}
                }
            }]),
            t
        } (),
        Ft = function(e) {
            function r(e) {
                var t;
                return p(this, r),
                (t = c(this, u(r).call(this, e))).sessionMode = "track",
                z.addEvent("Init", {
                    id: "".concat(t.sessionMode, "_").concat(Date.now())
                }),
                t
            }
            return d(r, Nt),
            l(r, [{
                key: "publishedTracks",
                get: function() {
                    return this.connectionTransport ? this.connectionTransport.publishTracks.filter(function(e) {
                        return e.connectStatus === t.TrackConnectStatus.Connect
                    }).map(function(e) {
                        return e.track
                    }) : []
                }
            },
            {
                key: "subscribedTracks",
                get: function() {
                    return this.subscribeTracks.filter(function(e) {
                        return e.connectStatus === t.TrackConnectStatus.Connect
                    }).map(function(e) {
                        return e.track
                    })
                }
            },
            {
                key: "mergeStreamTracks",
                get: function() {
                    return this.defaultMergeJobTracks
                }
            },
            {
                key: "mergeStreamJobTracks",
                get: function() {
                    return this.mergeJobTracks
                }
            }]),
            l(r, [{
                key: "publish",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this._publish(t);
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "unpublish",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this._unpublish(t);
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "subscribe",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r, n = arguments;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return r = n.length > 1 && void 0 !== n[1] && n[1],
                                e.next = 3,
                                this._subscribe(t, !1, r);
                            case 3:
                                return e.abrupt("return", e.sent);
                            case 4:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "unsubscribe",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this._unsubscribe(t);
                            case 2:
                                return e.abrupt("return", e.sent);
                            case 3:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "muteTracks",
                value: function(e) {
                    this._muteTracks(e)
                }
            },
            {
                key: "addMergeStreamTracks",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this._addMergeTracks(t, r);
                            case 2:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "removeMergeStreamTracks",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                this._removeMergeTracks(t, r);
                            case 2:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "stopMergeStream",
                value: function(e) {
                    this._stopMerge(e)
                }
            },
            {
                key: "filterSignalTracks",
                value: function() {}
            },
            {
                key: "releaseSession",
                value: function() {}
            }]),
            r
        } (),
        Vt = function(e) {
            function r(e) {
                var n;
                p(this, r);
                var i = $e.createMediaStreamDestination(),
                a = i.stream.getAudioTracks()[0];
                return (n = c(this, u(r).call(this, a, e, "local"))).sourceType = t.TrackSourceType.MIXING,
                n.initAudioManager(!0),
                n.destination = i,
                n.inputList = [],
                n
            }
            return d(r, et),
            l(r, [{
                key: "appendAudioSource",
                value: function(e) {
                    this.inputList.find(function(t) {
                        return t.track === e
                    }) ? F.warning("track is already in the track list") : (this.inputList.push({
                        track: e
                    }), e.audioManager.gainNode.connect(this.destination))
                }
            },
            {
                key: "removeAudioSource",
                value: function(e) {
                    var t = this.inputList.find(function(t) {
                        return t.track === e
                    });
                    t && (t.track.audioManager.gainNode.disconnect(this.destination), k(this.inputList,
                    function(e) {
                        return e === t
                    }))
                }
            },
            {
                key: "release",
                value: function() {
                    var e = !0,
                    t = !1,
                    i = void 0;
                    try {
                        for (var a, o = this.inputList[Symbol.iterator](); ! (e = (a = o.next()).done); e = !0) {
                            var s = a.value;
                            this.removeAudioSource(s.track)
                        }
                    } catch(c) {
                        t = !0,
                        i = c
                    } finally {
                        try {
                            e || null == o.
                            return || o.
                            return ()
                        } finally {
                            if (t) throw i
                        }
                    }
                    n(u(r.prototype), "release", this).call(this)
                }
            }]),
            r
        } (),
        Bt = function() {
            function e(t, r) {
                p(this, e),
                this.effectSourceMap = new Map,
                this.playback = !0,
                this.output = t,
                this.playbackEngine = r
            }
            return l(e, [{
                key: "getEffectTrack",
                value: function(e) {
                    return this.effectSourceMap.get(e)
                }
            },
            {
                key: "playEffect",
                value: function(e, t) {
                    var r = this.effectSourceMap.get(e);
                    r ? (t && r.setVolume(t), this.playback && r.audioManager.audioSource && this.playbackEngine.addAudioNode(r.audioManager.gainNode), r.startAudioSource()) : F.warning("can not find target effect", e)
                }
            },
            {
                key: "addEffectSource",
                value: function() {
                    var e = s(o.mark(function e(r, n) {
                        var i;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!this.effectSourceMap.has(n)) {
                                    e.next = 3;
                                    break
                                }
                                return F.warning("duplicate effect key!", n),
                                e.abrupt("return");
                            case 3:
                                return e.next = 5,
                                t.AudioUtils.createAudioTrackFromSource(r);
                            case 5:
                                i = e.sent,
                                this.effectSourceMap.set(n, i),
                                this.output.appendAudioSource(i);
                            case 8:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "removeEffectSource",
                value: function(e) {
                    var t = [];
                    t = e ? [e] : Array.from(this.effectSourceMap.keys());
                    var r = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, o = t[Symbol.iterator](); ! (r = (a = o.next()).done); r = !0) {
                            var s = a.value,
                            c = this.effectSourceMap.get(s);
                            if (!c) return;
                            this.output.removeAudioSource(c),
                            c.release(),
                            this.effectSourceMap.delete(s)
                        }
                    } catch(u) {
                        n = !0,
                        i = u
                    } finally {
                        try {
                            r || null == o.
                            return || o.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                }
            },
            {
                key: "effectList",
                get: function() {
                    return Array.from(this.effectSourceMap.keys())
                }
            }]),
            e
        } (),
        zt = function(e) {
            function r(e, t) {
                var n;
                return p(this, r),
                (n = c(this, u(r).call(this))).musicOption = {
                    loop: !1,
                    volume: 1
                },
                n.playback = !0,
                n.output = e,
                n.playbackEngine = t,
                n
            }
            return d(r, m),
            l(r, [{
                key: "setMusicOption",
                value: function(e) {
                    this.musicOption = Object.assign(this.musicOption, e),
                    this.musicTrack && (this.musicTrack.setVolume(this.musicOption.volume), this.musicTrack.setLoop(this.musicOption.loop))
                }
            },
            {
                key: "startMusicMixing",
                value: function() {
                    var e = s(o.mark(function e(r) {
                        var n = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!this.musicTrack) {
                                    e.next = 5;
                                    break
                                }
                                return this.stopMusicMixing(),
                                e.next = 4,
                                this.startMusicMixing(r);
                            case 4:
                                return e.abrupt("return", e.sent);
                            case 5:
                                return e.next = 7,
                                t.AudioUtils.createAudioTrackFromSource(r);
                            case 7:
                                if (this.musicTrack = e.sent, this.output.appendAudioSource(this.musicTrack), this.setMusicOption({}), this.musicTrack.audioManager.audioSource) {
                                    e.next = 12;
                                    break
                                }
                                throw J("can not find audio source");
                            case 12:
                                this.playback && this.audioNode && this.playbackEngine.addAudioNode(this.audioNode),
                                this.musicTrack.on("audio-state-change",
                                function(e, t) {
                                    n.emit("music-state-change", e, t)
                                }),
                                this.musicTrack.startAudioSource();
                            case 15:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "pauseMusicMixing",
                value: function() {
                    this.musicTrack ? this.musicTrack.pauseAudioSource() : F.warning("can not find target music, please run startAudioMixing")
                }
            },
            {
                key: "resumeMusicMixing",
                value: function() {
                    this.musicTrack ? this.musicTrack.resumeAudioSource() : F.warning("can not find target music, please run startAudioMixing")
                }
            },
            {
                key: "stopMusicMixing",
                value: function() {
                    this.musicTrack && (this.musicTrack.stopAudioSource(), this.output.removeAudioSource(this.musicTrack), this.musicTrack.release(), this.musicTrack = void 0)
                }
            },
            {
                key: "getMusicDuration",
                value: function() {
                    return this.musicTrack ? this.musicTrack.getDuration() : 0
                }
            },
            {
                key: "getMusicCurrentTime",
                value: function() {
                    return this.musicTrack ? this.musicTrack.getCurrentTime() : 0
                }
            },
            {
                key: "setMusicCurrentTime",
                value: function(e) {
                    if (this.musicTrack && (this.musicTrack.setCurrentTime(e), !this.musicTrack.audioManager.audioSource)) throw J("can not find audio source")
                }
            },
            {
                key: "audioNode",
                get: function() {
                    return this.musicTrack ? this.musicTrack.audioManager.gainNode: null
                }
            }]),
            r
        } (),
        Ht = function() {
            function e() {
                p(this, e),
                this.volume = 1,
                this.gainNode = $e.createGain(),
                this.gainNode.connect($e.destination)
            }
            return l(e, [{
                key: "addAudioNode",
                value: function(e) {
                    e.connect(this.gainNode)
                }
            },
            {
                key: "removeAudioNode",
                value: function(e) {
                    e.disconnect(this.gainNode)
                }
            },
            {
                key: "release",
                value: function() {
                    this.gainNode.disconnect()
                }
            }]),
            e
        } (),
        Jt = function() {
            function e(t) {
                if (p(this, e), this.playbackEngine = new Ht, this.sourcePlayebackState = !1, !(t instanceof et)) throw J("audio mixing manager: origin track is not audio track");
                this.outputTrack = new Vt,
                this.outputTrack.appendAudioSource(t),
                this.source = t,
                this.effectManager = new Bt(this.outputTrack, this.playbackEngine),
                this.musicManager = new zt(this.outputTrack, this.playbackEngine)
            }
            return l(e, [{
                key: "getMusicPlaybackState",
                value: function() {
                    return this.musicManager.playback
                }
            },
            {
                key: "setMusicPlaybackState",
                value: function(e) {
                    this.musicManager.playback !== e && (this.musicManager.playback = e, this.musicManager.audioNode && (e ? this.playbackEngine.addAudioNode(this.musicManager.audioNode) : this.playbackEngine.removeAudioNode(this.musicManager.audioNode)))
                }
            },
            {
                key: "getSourcePlaybackState",
                value: function() {
                    return this.sourcePlayebackState
                }
            },
            {
                key: "setSourcePlaybackState",
                value: function(e) {
                    this.sourcePlayebackState !== e && (this.sourcePlayebackState = e, this.source.audioManager.audioSource && (e ? this.playbackEngine.addAudioNode(this.source.audioManager.gainNode) : this.playbackEngine.removeAudioNode(this.source.audioManager.gainNode)))
                }
            },
            {
                key: "getEffectPlaybackState",
                value: function() {
                    return this.effectManager.playback
                }
            },
            {
                key: "setEffectPlaybackState",
                value: function(e) {
                    var t = this;
                    this.effectManager.playback !== e && (this.effectManager.playback = e, this.effectManager.effectSourceMap.forEach(function(r, n) {
                        r.audioManager.audioSource && (e ? t.playbackEngine.addAudioNode(r.audioManager.gainNode) : t.playbackEngine.removeAudioNode(r.audioManager.gainNode))
                    }))
                }
            },
            {
                key: "setBitrate",
                value: function(e) {
                    this.outputTrack.setInfo({
                        kbps: e
                    })
                }
            },
            {
                key: "setTag",
                value: function(e) {
                    this.outputTrack.setInfo({
                        tag: e
                    })
                }
            },
            {
                key: "release",
                value: function() {
                    this.effectManager.removeEffectSource(),
                    this.musicManager.stopMusicMixing(),
                    this.outputTrack.removeAudioSource(this.source),
                    this.outputTrack.release(),
                    this.playbackEngine.release()
                }
            }]),
            e
        } (),
        Gt = function(e) {
            function t(e) {
                var r;
                if (p(this, t), !e._audioTrack) throw J("input stream do not have audio track"); (r = c(this, u(t).call(this, e._audioTrack))).input = e;
                var n = [r.outputTrack];
                return r.input._videoTrack && n.push(r.input._videoTrack),
                r.outputStream = new rt(n, "send", r.input.userId),
                r
            }
            return d(t, Jt),
            l(t, [{
                key: "setBitrate",
                value: function(e, t) {
                    e && this.outputStream._audioTrack && this.outputStream._audioTrack.setKbps(e),
                    t && this.outputStream._videoTrack && this.outputStream._videoTrack.setKbps(t)
                }
            }]),
            t
        } (); !
        function(e) {
            function t(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "anonymous",
                r = arguments.length > 2 ? arguments[2] : void 0,
                n = arguments.length > 3 ? arguments[3] : void 0,
                i = document.createElement("audio");
                i.preload = "auto",
                i.src = e,
                i.crossOrigin = t;
                var a = new tt(i);
                return n && a.setKbps(n),
                a.setInfo({
                    tag: r
                }),
                a
            }

            function r(e, t, r) {
                return new Promise(function(n, i) {
                    var o = new FileReader;
                    o.onload = function(e) {
                        a(e.target.result).then(function(e) {
                            var i = new tt(e);
                            r && i.setKbps(r),
                            i.setInfo({
                                tag: t
                            }),
                            n(i)
                        }).
                        catch(i)
                    },
                    o.readAsArrayBuffer(e)
                })
            }

            function n(e, t, r) {
                var n = new tt(e);
                return r && n.setKbps(r),
                n.setInfo({
                    tag: t
                }),
                n
            }

            function i() {
                return (i = s(o.mark(function e(i, a, s) {
                    return o.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (! (i instanceof File)) {
                                e.next = 6;
                                break
                            }
                            return e.next = 3,
                            r(i, a, s);
                        case 3:
                            return e.abrupt("return", e.sent);
                        case 6:
                            if (! (i instanceof AudioBuffer)) {
                                e.next = 8;
                                break
                            }
                            return e.abrupt("return", n(i, a, s));
                        case 8:
                            return e.abrupt("return", t(i, "anonymous", a, s));
                        case 9:
                        case "end":
                            return e.stop()
                        }
                    },
                    e, this)
                }))).apply(this, arguments)
            }

            function a(e) {
                return c.apply(this, arguments)
            }

            function c() {
                return (c = s(o.mark(function e(t) {
                    var r;
                    return o.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                        case 0:
                            if ("suspended" !== $e.state) {
                                e.next = 3;
                                break
                            }
                            return e.next = 3,
                            $e.resume();
                        case 3:
                            return r = function() {
                                return new Promise(function(e, r) {
                                    $e.decodeAudioData(t,
                                    function(t) {
                                        e(t)
                                    },
                                    function(e) {
                                        r(oe(e))
                                    })
                                })
                            },
                            e.next = 6,
                            r();
                        case 6:
                            return e.abrupt("return", e.sent);
                        case 7:
                        case "end":
                            return e.stop()
                        }
                    },
                    e, this)
                }))).apply(this, arguments)
            }
            e.createAudioTrackFromURL = t,
            e.createAudioTrackFromFile = r,
            e.createAudioTrackFromBuffer = n,
            e.createAudioTrackFromSource = function(e, t, r) {
                return i.apply(this, arguments)
            },
            e.decodeAudioData = a,
            e.createAudioMixingManagerFromTrack = function(e) {
                return new Jt(e)
            },
            e.createAudioMixingManagerFromStream = function(e) {
                return new Gt(e)
            }
        } (t.AudioUtils || (t.AudioUtils = {}));
        var qt = {
            audio: {
                enabled: !0
            },
            video: {
                enabled: !0,
                bitrate: 600
            }
        },
        Wt = function(e) {
            function r() {
                var e;
                return p(this, r),
                (e = c(this, u(r).call(this))).deviceMap = {},
                h.browserReport.support ? (e.updateDeivceInfo(), h.browserReport.ondevicechange || window.setInterval(e.updateDeivceInfo.bind(i(i(e))), 1e3), h.browserReport.ondevicechange && (navigator.mediaDevices.ondevicechange = e.updateDeivceInfo.bind(i(i(e)))), e) : c(e)
            }
            return d(r, m),
            l(r, [{
                key: "getLocalTracks",
                value: function() {
                    var e = s(o.mark(function e() {
                        var r, n, i, a, s, c, u, d, p, l, f, h, m, v, k, y, g, b, T, S, w = arguments;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (r = w.length > 0 && void 0 !== w[0] ? w[0] : qt, F.debug("get local tracks", r), !A(r) || !M(r)) {
                                    e.next = 9;
                                    break
                                }
                                return n = {
                                    screen: r.screen
                                },
                                i = {
                                    video: r.video,
                                    audio: r.audio
                                },
                                e.next = 7,
                                Promise.all([this.getLocalTracks(n), this.getLocalTracks(i)]);
                            case 7:
                                return a = e.sent,
                                e.abrupt("return", a[0].concat(a[1]));
                            case 9:
                                return e.next = 11,
                                ut(r);
                            case 11:
                                return (s = e.sent).video && "object" === typeof s.video && s.video.deviceId && z.addEvent("DeviceChanged", {
                                    type: 0,
                                    desc: s.video.deviceId
                                }),
                                s.audio && "object" === typeof s.audio && s.audio.deviceId && z.addEvent("DeviceChanged", {
                                    type: 1,
                                    desc: s.audio.deviceId
                                }),
                                e.prev = 14,
                                e.next = 17,
                                this.getUserMedia(r, s, !0);
                            case 17:
                                c = e.sent,
                                e.next = 27;
                                break;
                            case 20:
                                if (e.prev = 20, e.t0 = e.
                                catch(14), "NotAllowedError" !== e.t0.name) {
                                    e.next = 26;
                                    break
                                }
                                throw re("");
                            case 26:
                                throw e.t0;
                            case 27:
                                for (u = void 0, d = void 0, p = void 0, l = void 0, O(r) && (d = r.audio.bitrate, l = r.audio.tag), A(r) && (u = r.screen.bitrate, p = r.screen.tag), M(r) && (u = r.video.bitrate, p = r.video.tag), f = c ? c.getTracks() : [], h = [], m = !0, v = !1, k = void 0, e.prev = 39, y = f[Symbol.iterator](); ! (m = (g = y.next()).done); m = !0) b = g.value,
                                T = void 0,
                                T = "audio" === b.kind ? ct(b, l, d) : ct(b, p, u),
                                h.push(T);
                                e.next = 47;
                                break;
                            case 43:
                                e.prev = 43,
                                e.t1 = e.
                                catch(39),
                                v = !0,
                                k = e.t1;
                            case 47:
                                e.prev = 47,
                                e.prev = 48,
                                m || null == y.
                                return || y.
                                return ();
                            case 50:
                                if (e.prev = 50, !v) {
                                    e.next = 53;
                                    break
                                }
                                throw k;
                            case 53:
                                return e.finish(50);
                            case 54:
                                return e.finish(47);
                            case 55:
                                if (!r.audio || !r.audio.source) {
                                    e.next = 60;
                                    break
                                }
                                return e.next = 58,
                                t.AudioUtils.createAudioTrackFromSource(r.audio.source, l, d);
                            case 58:
                                S = e.sent,
                                h.push(S);
                            case 60:
                                return e.abrupt("return", h);
                            case 61:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this, [[14, 20], [39, 43, 47, 55], [48, , 50, 54]])
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "getLocalStream",
                value: function() {
                    var e = s(o.mark(function e(t) {
                        var r;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (! (t && A(t) && M(t))) {
                                    e.next = 2;
                                    break
                                }
                                throw J("can not get local stream with video and screen");
                            case 2:
                                return e.next = 4,
                                this.getLocalTracks(t);
                            case 4:
                                return r = e.sent,
                                e.abrupt("return", new rt(r, "send"));
                            case 6:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "getUserMedia",
                value: function() {
                    var e = s(o.mark(function e(t, r, n) {
                        var i;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (F.debug("request to get user media", r, t), r.audio || r.video) {
                                    e.next = 3;
                                    break
                                }
                                return e.abrupt("return", null);
                            case 3:
                                if (!A(t)) {
                                    e.next = 9;
                                    break
                                }
                                return e.next = 6,
                                this.getDisplayMedia(r, t);
                            case 6:
                                i = e.sent,
                                e.next = 12;
                                break;
                            case 9:
                                return e.next = 11,
                                navigator.mediaDevices.getUserMedia(r);
                            case 11:
                                i = e.sent;
                            case 12:
                                return e.abrupt("return", i);
                            case 13:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r, n) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "getDisplayMedia",
                value: function() {
                    var e = s(o.mark(function e(t, r) {
                        var n, i;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                if (!t.audio) {
                                    e.next = 4;
                                    break
                                }
                                return e.next = 3,
                                navigator.mediaDevices.getUserMedia({
                                    audio: t.audio
                                });
                            case 3:
                                n = e.sent;
                            case 4:
                                if (!h.browserReport.getDisplayMedia || !r.screen || r.screen.forceChromePlugin) {
                                    e.next = 10;
                                    break
                                }
                                return e.next = 7,
                                navigator.mediaDevices.getDisplayMedia({
                                    video: t.video
                                });
                            case 7:
                                i = e.sent,
                                e.next = 13;
                                break;
                            case 10:
                                return e.next = 12,
                                navigator.mediaDevices.getUserMedia({
                                    video: t.video
                                });
                            case 12:
                                i = e.sent;
                            case 13:
                                return n && i.addTrack(n.getAudioTracks()[0]),
                                e.abrupt("return", i);
                            case 15:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function(t, r) {
                        return e.apply(this, arguments)
                    }
                } ()
            },
            {
                key: "updateDeivceInfo",
                value: function() {
                    var e = s(o.mark(function e() {
                        var t, r, n, i = this;
                        return o.wrap(function(e) {
                            for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2,
                                navigator.mediaDevices.enumerateDevices();
                            case 2:
                                this.deviceInfo = e.sent,
                                t = this.deviceInfo.map(function(e) {
                                    return e.deviceId
                                }),
                                r = Object.keys(this.deviceMap),
                                n = !1,
                                r.forEach(function(e) {
                                    if ( - 1 === t.indexOf(e) && "@default" !== e) {
                                        i.emit("device-remove", i.deviceMap[e].device);
                                        var r = i.deviceMap[e].device;
                                        z.addEvent("audioinput" === r.kind || "audiooutput" === r.kind ? "AudioDeviceInOut": "VideoDeviceInOut", {
                                            device_type: "audiooutput" === r.kind ? 1 : 0,
                                            device_state: 0,
                                            device_label: r.label,
                                            device_id: r.deviceId
                                        }),
                                        delete i.deviceMap[e],
                                        n = !0
                                    } else i.deviceMap[e].tick += 1
                                }),
                                t.forEach(function(e, t) {
                                    if ( - 1 === r.indexOf(e) && "@default" !== e) {
                                        i.deviceMap[e] = {
                                            device: i.deviceInfo[t],
                                            tick: 0
                                        };
                                        var a = i.deviceMap[e].device;
                                        i.emit("device-add", a),
                                        z.addEvent("audioinput" === a.kind || "audiooutput" === a.kind ? "AudioDeviceInOut": "VideoDeviceInOut", {
                                            device_type: "audiooutput" === a.kind ? 1 : 0,
                                            device_state: 1,
                                            device_label: a.label,
                                            device_id: a.deviceId
                                        }),
                                        n = !0
                                    }
                                }),
                                n && this.emit("device-update", this.deviceInfo);
                            case 9:
                            case "end":
                                return e.stop()
                            }
                        },
                        e, this)
                    }));
                    return function() {
                        return e.apply(this, arguments)
                    }
                } ()
            }]),
            r
        } (),
        Qt = new Wt;
        t.browserReport = h.browserReport,
        t.StreamModeSession = Ut,
        t.TrackModeSession = Ft,
        t.version = N,
        t.log = F,
        t.User = Je,
        t.Stream = rt,
        t.Track = Qe,
        t.AudioTrack = et,
        t.isChromeExtensionAvailable = Ue,
        t.createCustomTrack = ct,
        t.REC_AUDIO_ENABLE = O,
        t.REC_VIDEO_ENABLE = M,
        t.REC_SCREEN_ENABLE = A,
        t.defaultMergeJob = D,
        t.QosEventType = L,
        t.DeviceManager = Wt,
        t.deviceManager = Qt,
        t.AudioSourceTrack = tt,
        t.TrackMixingManager = Jt,
        t.StreamMixingManager = Gt,
        t.AudioEffectManager = Bt,
        t.AudioMusicManager = zt
    }
},
[[5569, 6, 3]]]
);
//# sourceMappingURL=main.866d025d.chunk.js.map
