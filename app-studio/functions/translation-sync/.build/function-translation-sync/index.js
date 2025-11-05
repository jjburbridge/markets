import crypto from "crypto";
const e = !(typeof navigator > "u") && "ReactNative" === navigator.product, t = { timeout: e ? 6e4 : 12e4 }, r = function(r2) {
  const a2 = { ...t, ..."string" == typeof r2 ? { url: r2 } : r2 };
  if (a2.timeout = n$1(a2.timeout), a2.query) {
    const { url: t2, searchParams: r3 } = function(t3) {
      const r4 = t3.indexOf("?");
      if (-1 === r4) return { url: t3, searchParams: new URLSearchParams() };
      const n2 = t3.slice(0, r4), a3 = t3.slice(r4 + 1);
      if (!e) return { url: n2, searchParams: new URLSearchParams(a3) };
      if ("function" != typeof decodeURIComponent) throw new Error("Broken `URLSearchParams` implementation, and `decodeURIComponent` is not defined");
      const s2 = new URLSearchParams();
      for (const e2 of a3.split("&")) {
        const [t4, r5] = e2.split("=");
        t4 && s2.append(o$1(t4), o$1(r5 || ""));
      }
      return { url: n2, searchParams: s2 };
    }(a2.url);
    for (const [e2, o2] of Object.entries(a2.query)) {
      if (void 0 !== o2) if (Array.isArray(o2)) for (const t3 of o2) r3.append(e2, t3);
      else r3.append(e2, o2);
      const n2 = r3.toString();
      n2 && (a2.url = `${t2}?${n2}`);
    }
  }
  return a2.method = a2.body && !a2.method ? "POST" : (a2.method || "GET").toUpperCase(), a2;
};
function o$1(e2) {
  return decodeURIComponent(e2.replace(/\+/g, " "));
}
function n$1(e2) {
  if (false === e2 || 0 === e2) return false;
  if (e2.connect || e2.socket) return e2;
  const r2 = Number(e2);
  return isNaN(r2) ? n$1(t.timeout) : { connect: r2, socket: r2 };
}
const a$2 = /^https?:\/\//i, s$2 = function(e2) {
  if (!a$2.test(e2.url)) throw new Error(`"${e2.url}" is not a valid URL`);
};
function c$3(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
const o = ["request", "response", "progress", "error", "abort"], n = ["processOptions", "validateOptions", "interceptRequest", "finalizeOptions", "onRequest", "onResponse", "onError", "onReturn", "onHeaders"];
function s$1(r$1, a2) {
  const i2 = [], u2 = n.reduce((e2, t2) => (e2[t2] = e2[t2] || [], e2), { processOptions: [r], validateOptions: [s$2] });
  function l3(e2) {
    const t2 = o.reduce((e3, t3) => (e3[t3] = /* @__PURE__ */ function() {
      const e4 = /* @__PURE__ */ Object.create(null);
      let t4 = 0;
      return { publish: function(t5) {
        for (const r3 in e4) e4[r3](t5);
      }, subscribe: function(r3) {
        const o2 = t4++;
        return e4[o2] = r3, function() {
          delete e4[o2];
        };
      } };
    }(), e3), {}), r2 = /* @__PURE__ */ ((e3) => function(t3, r3, ...o2) {
      const n3 = "onError" === t3;
      let s3 = r3;
      for (let r4 = 0; r4 < e3[t3].length && (s3 = (0, e3[t3][r4])(s3, ...o2), !n3 || s3); r4++) ;
      return s3;
    })(u2), n2 = r2("processOptions", e2);
    r2("validateOptions", n2);
    const s2 = { options: n2, channels: t2, applyMiddleware: r2 };
    let i3;
    const l4 = t2.request.subscribe((e3) => {
      i3 = a2(e3, (o2, n3) => ((e4, o3, n4) => {
        let s3 = e4, a3 = o3;
        if (!s3) try {
          a3 = r2("onResponse", o3, n4);
        } catch (e5) {
          a3 = null, s3 = e5;
        }
        s3 = s3 && r2("onError", s3, n4), s3 ? t2.error.publish(s3) : a3 && t2.response.publish(a3);
      })(o2, n3, e3));
    });
    t2.abort.subscribe(() => {
      l4(), i3 && i3.abort();
    });
    const c2 = r2("onReturn", t2, s2);
    return c2 === t2 && t2.request.publish(s2), c2;
  }
  return l3.use = function(e2) {
    if (!e2) throw new Error("Tried to add middleware that resolved to falsey value");
    if ("function" == typeof e2) throw new Error("Tried to add middleware that was a function. It probably expects you to pass options to it.");
    if (e2.onReturn && u2.onReturn.length > 0) throw new Error("Tried to add new middleware with `onReturn` handler, but another handler has already been registered for this event");
    return n.forEach((t2) => {
      e2[t2] && u2[t2].push(e2[t2]);
    }), i2.push(e2), l3;
  }, l3.clone = () => s$1(i2, a2), r$1.forEach(l3.use), l3;
}
var a$1, i, u$2 = /* @__PURE__ */ c$3(function() {
  if (i) return a$1;
  i = 1;
  var e2 = function(e3) {
    return e3.replace(/^\s+|\s+$/g, "");
  };
  return a$1 = function(t2) {
    if (!t2) return {};
    for (var r2 = {}, o2 = e2(t2).split("\n"), n2 = 0; n2 < o2.length; n2++) {
      var s2 = o2[n2], a2 = s2.indexOf(":"), i2 = e2(s2.slice(0, a2)).toLowerCase(), u2 = e2(s2.slice(a2 + 1));
      typeof r2[i2] > "u" ? r2[i2] = u2 : (l3 = r2[i2], "[object Array]" === Object.prototype.toString.call(l3) ? r2[i2].push(u2) : r2[i2] = [r2[i2], u2]);
    }
    var l3;
    return r2;
  };
}());
let l$1 = class l {
  onabort;
  onerror;
  onreadystatechange;
  ontimeout;
  readyState = 0;
  response;
  responseText = "";
  responseType = "";
  status;
  statusText;
  withCredentials;
  #e;
  #t;
  #r;
  #o = {};
  #n;
  #s = {};
  #a;
  open(e2, t2, r2) {
    this.#e = e2, this.#t = t2, this.#r = "", this.readyState = 1, this.onreadystatechange?.(), this.#n = void 0;
  }
  abort() {
    this.#n && this.#n.abort();
  }
  getAllResponseHeaders() {
    return this.#r;
  }
  setRequestHeader(e2, t2) {
    this.#o[e2] = t2;
  }
  setInit(e2, t2 = true) {
    this.#s = e2, this.#a = t2;
  }
  send(e2) {
    const t2 = "arraybuffer" !== this.responseType, r2 = { ...this.#s, method: this.#e, headers: this.#o, body: e2 };
    "function" == typeof AbortController && this.#a && (this.#n = new AbortController(), typeof EventTarget < "u" && this.#n.signal instanceof EventTarget && (r2.signal = this.#n.signal)), typeof document < "u" && (r2.credentials = this.withCredentials ? "include" : "omit"), fetch(this.#t, r2).then((e3) => (e3.headers.forEach((e4, t3) => {
      this.#r += `${t3}: ${e4}\r
`;
    }), this.status = e3.status, this.statusText = e3.statusText, this.readyState = 3, this.onreadystatechange?.(), t2 ? e3.text() : e3.arrayBuffer())).then((e3) => {
      "string" == typeof e3 ? this.responseText = e3 : this.response = e3, this.readyState = 4, this.onreadystatechange?.();
    }).catch((e3) => {
      "AbortError" !== e3.name ? this.onerror?.(e3) : this.onabort?.();
    });
  }
};
const c$2 = "function" == typeof XMLHttpRequest ? "xhr" : "fetch", h = "xhr" === c$2 ? XMLHttpRequest : l$1, d$1 = (e2, t2) => {
  const r2 = e2.options, o2 = e2.applyMiddleware("finalizeOptions", r2), n2 = {}, s2 = e2.applyMiddleware("interceptRequest", void 0, { adapter: c$2, context: e2 });
  if (s2) {
    const e3 = setTimeout(t2, 0, null, s2);
    return { abort: () => clearTimeout(e3) };
  }
  let a2 = new h();
  a2 instanceof l$1 && "object" == typeof o2.fetch && a2.setInit(o2.fetch, o2.useAbortSignal ?? true);
  const i2 = o2.headers, d2 = o2.timeout;
  let p2 = false, f2 = false, b = false;
  if (a2.onerror = (e3) => {
    m(a2 instanceof l$1 ? e3 instanceof Error ? e3 : new Error(`Request error while attempting to reach is ${o2.url}`, { cause: e3 }) : new Error(`Request error while attempting to reach is ${o2.url}${e3.lengthComputable ? `(${e3.loaded} of ${e3.total} bytes transferred)` : ""}`));
  }, a2.ontimeout = (e3) => {
    m(new Error(`Request timeout while attempting to reach ${o2.url}${e3.lengthComputable ? `(${e3.loaded} of ${e3.total} bytes transferred)` : ""}`));
  }, a2.onabort = () => {
    w(true), p2 = true;
  }, a2.onreadystatechange = function() {
    d2 && (w(), n2.socket = setTimeout(() => y("ESOCKETTIMEDOUT"), d2.socket)), !p2 && a2 && 4 === a2.readyState && 0 !== a2.status && function() {
      if (!(p2 || f2 || b)) {
        if (0 === a2.status) return void m(new Error("Unknown XHR error"));
        w(), f2 = true, t2(null, { body: a2.response || ("" === a2.responseType || "text" === a2.responseType ? a2.responseText : ""), url: o2.url, method: o2.method, headers: u$2(a2.getAllResponseHeaders()), statusCode: a2.status, statusMessage: a2.statusText });
      }
    }();
  }, a2.open(o2.method, o2.url, true), a2.withCredentials = !!o2.withCredentials, i2 && a2.setRequestHeader) for (const e3 in i2) i2.hasOwnProperty(e3) && a2.setRequestHeader(e3, i2[e3]);
  return o2.rawBody && (a2.responseType = "arraybuffer"), e2.applyMiddleware("onRequest", { options: o2, adapter: c$2, request: a2, context: e2 }), a2.send(o2.body || null), d2 && (n2.connect = setTimeout(() => y("ETIMEDOUT"), d2.connect)), { abort: function() {
    p2 = true, a2 && a2.abort();
  } };
  function y(t3) {
    b = true, a2.abort();
    const r3 = new Error("ESOCKETTIMEDOUT" === t3 ? `Socket timed out on request to ${o2.url}` : `Connection timed out on request to ${o2.url}`);
    r3.code = t3, e2.channels.error.publish(r3);
  }
  function w(e3) {
    (e3 || p2 || a2 && a2.readyState >= 2 && n2.connect) && clearTimeout(n2.connect), n2.socket && clearTimeout(n2.socket);
  }
  function m(e3) {
    if (f2) return;
    w(true), f2 = true, a2 = null;
    const r3 = e3 || new Error(`Network error while attempting to reach ${o2.url}`);
    r3.isNetworkError = true, r3.request = o2, t2(r3);
  }
}, p$1 = (e2 = [], t2 = d$1) => s$1(e2, t2);
var a, c$1, u$1, l2, p, d = { exports: {} };
/* @__PURE__ */ c$3((p || (p = 1, function(e2, t2) {
  t2.formatArgs = function(t3) {
    if (t3[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t3[0] + (this.useColors ? "%c " : " ") + "+" + e2.exports.humanize(this.diff), !this.useColors) return;
    const s3 = "color: " + this.color;
    t3.splice(1, 0, s3, "color: inherit");
    let n2 = 0, r2 = 0;
    t3[0].replace(/%[a-zA-Z%]/g, (e3) => {
      "%%" !== e3 && (n2++, "%c" === e3 && (r2 = n2));
    }), t3.splice(r2, 0, s3);
  }, t2.save = function(e3) {
    try {
      e3 ? t2.storage.setItem("debug", e3) : t2.storage.removeItem("debug");
    } catch {
    }
  }, t2.load = function() {
    let e3;
    try {
      e3 = t2.storage.getItem("debug");
    } catch {
    }
    return !e3 && typeof process < "u" && "env" in process && (e3 = process.env.DEBUG), e3;
  }, t2.useColors = function() {
    if (typeof window < "u" && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return true;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return false;
    let e3;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (e3 = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(e3[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, t2.storage = function() {
    try {
      return localStorage;
    } catch {
    }
  }(), t2.destroy = /* @__PURE__ */ (() => {
    let e3 = false;
    return () => {
      e3 || (e3 = true, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t2.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t2.log = console.debug || console.log || (() => {
  }), e2.exports = (l2 ? u$1 : (l2 = 1, u$1 = function(e3) {
    function t3(e4) {
      let n3, r2, o2, i2 = null;
      function a2(...e5) {
        if (!a2.enabled) return;
        const s4 = a2, r3 = Number(/* @__PURE__ */ new Date()), o3 = r3 - (n3 || r3);
        s4.diff = o3, s4.prev = n3, s4.curr = r3, n3 = r3, e5[0] = t3.coerce(e5[0]), "string" != typeof e5[0] && e5.unshift("%O");
        let i3 = 0;
        e5[0] = e5[0].replace(/%([a-zA-Z%])/g, (n4, r4) => {
          if ("%%" === n4) return "%";
          i3++;
          const o4 = t3.formatters[r4];
          if ("function" == typeof o4) {
            const t4 = e5[i3];
            n4 = o4.call(s4, t4), e5.splice(i3, 1), i3--;
          }
          return n4;
        }), t3.formatArgs.call(s4, e5), (s4.log || t3.log).apply(s4, e5);
      }
      return a2.namespace = e4, a2.useColors = t3.useColors(), a2.color = t3.selectColor(e4), a2.extend = s3, a2.destroy = t3.destroy, Object.defineProperty(a2, "enabled", { enumerable: true, configurable: false, get: () => null !== i2 ? i2 : (r2 !== t3.namespaces && (r2 = t3.namespaces, o2 = t3.enabled(e4)), o2), set: (e5) => {
        i2 = e5;
      } }), "function" == typeof t3.init && t3.init(a2), a2;
    }
    function s3(e4, s4) {
      const n3 = t3(this.namespace + (typeof s4 > "u" ? ":" : s4) + e4);
      return n3.log = this.log, n3;
    }
    function n2(e4, t4) {
      let s4 = 0, n3 = 0, r2 = -1, o2 = 0;
      for (; s4 < e4.length; ) if (n3 < t4.length && (t4[n3] === e4[s4] || "*" === t4[n3])) "*" === t4[n3] ? (r2 = n3, o2 = s4, n3++) : (s4++, n3++);
      else {
        if (-1 === r2) return false;
        n3 = r2 + 1, o2++, s4 = o2;
      }
      for (; n3 < t4.length && "*" === t4[n3]; ) n3++;
      return n3 === t4.length;
    }
    return t3.debug = t3, t3.default = t3, t3.coerce = function(e4) {
      return e4 instanceof Error ? e4.stack || e4.message : e4;
    }, t3.disable = function() {
      const e4 = [...t3.names, ...t3.skips.map((e5) => "-" + e5)].join(",");
      return t3.enable(""), e4;
    }, t3.enable = function(e4) {
      t3.save(e4), t3.namespaces = e4, t3.names = [], t3.skips = [];
      const s4 = ("string" == typeof e4 ? e4 : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const e5 of s4) "-" === e5[0] ? t3.skips.push(e5.slice(1)) : t3.names.push(e5);
    }, t3.enabled = function(e4) {
      for (const s4 of t3.skips) if (n2(e4, s4)) return false;
      for (const s4 of t3.names) if (n2(e4, s4)) return true;
      return false;
    }, t3.humanize = function() {
      if (c$1) return a;
      c$1 = 1;
      var e4 = 1e3, t4 = 60 * e4, s4 = 60 * t4, n3 = 24 * s4, r2 = 7 * n3;
      function o2(e5, t5, s5, n4) {
        var r3 = t5 >= 1.5 * s5;
        return Math.round(e5 / s5) + " " + n4 + (r3 ? "s" : "");
      }
      return a = function(i2, a2) {
        a2 = a2 || {};
        var c2, u2, l3 = typeof i2;
        if ("string" === l3 && i2.length > 0) return function(o3) {
          if (!((o3 = String(o3)).length > 100)) {
            var i3 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(o3);
            if (i3) {
              var a3 = parseFloat(i3[1]);
              switch ((i3[2] || "ms").toLowerCase()) {
                case "years":
                case "year":
                case "yrs":
                case "yr":
                case "y":
                  return 315576e5 * a3;
                case "weeks":
                case "week":
                case "w":
                  return a3 * r2;
                case "days":
                case "day":
                case "d":
                  return a3 * n3;
                case "hours":
                case "hour":
                case "hrs":
                case "hr":
                case "h":
                  return a3 * s4;
                case "minutes":
                case "minute":
                case "mins":
                case "min":
                case "m":
                  return a3 * t4;
                case "seconds":
                case "second":
                case "secs":
                case "sec":
                case "s":
                  return a3 * e4;
                case "milliseconds":
                case "millisecond":
                case "msecs":
                case "msec":
                case "ms":
                  return a3;
                default:
                  return;
              }
            }
          }
        }(i2);
        if ("number" === l3 && isFinite(i2)) return a2.long ? (c2 = i2, (u2 = Math.abs(c2)) >= n3 ? o2(c2, u2, n3, "day") : u2 >= s4 ? o2(c2, u2, s4, "hour") : u2 >= t4 ? o2(c2, u2, t4, "minute") : u2 >= e4 ? o2(c2, u2, e4, "second") : c2 + " ms") : function(r3) {
          var o3 = Math.abs(r3);
          return o3 >= n3 ? Math.round(r3 / n3) + "d" : o3 >= s4 ? Math.round(r3 / s4) + "h" : o3 >= t4 ? Math.round(r3 / t4) + "m" : o3 >= e4 ? Math.round(r3 / e4) + "s" : r3 + "ms";
        }(i2);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(i2));
      };
    }(), t3.destroy = function() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }, Object.keys(e3).forEach((s4) => {
      t3[s4] = e3[s4];
    }), t3.names = [], t3.skips = [], t3.formatters = {}, t3.selectColor = function(e4) {
      let s4 = 0;
      for (let t4 = 0; t4 < e4.length; t4++) s4 = (s4 << 5) - s4 + e4.charCodeAt(t4), s4 |= 0;
      return t3.colors[Math.abs(s4) % t3.colors.length];
    }, t3.enable(t3.load()), t3;
  }))(t2);
  const { formatters: s2 } = e2.exports;
  s2.j = function(e3) {
    try {
      return JSON.stringify(e3);
    } catch (e4) {
      return "[UnexpectedJSONParseError]: " + e4.message;
    }
  };
}(d, d.exports)), d.exports));
const F = typeof Buffer > "u" ? () => false : (e2) => Buffer.isBuffer(e2);
function O$1(e2) {
  return "[object Object]" === Object.prototype.toString.call(e2);
}
function j(e2) {
  if (false === O$1(e2)) return false;
  const t2 = e2.constructor;
  if (void 0 === t2) return true;
  const s2 = t2.prototype;
  return !(false === O$1(s2) || false === s2.hasOwnProperty("isPrototypeOf"));
}
const v = ["boolean", "string", "number"];
function x() {
  return { processOptions: (e2) => {
    const t2 = e2.body;
    return !t2 || "function" == typeof t2.pipe || F(t2) || -1 === v.indexOf(typeof t2) && !Array.isArray(t2) && !j(t2) ? e2 : Object.assign({}, e2, { body: JSON.stringify(e2.body), headers: Object.assign({}, e2.headers, { "Content-Type": "application/json" }) });
  } };
}
function E$1(e2) {
  return { onResponse: (s2) => {
    const n2 = s2.headers["content-type"] || "", r2 = e2 && e2.force || -1 !== n2.indexOf("application/json");
    return s2.body && n2 && r2 ? Object.assign({}, s2, { body: t2(s2.body) }) : s2;
  }, processOptions: (e3) => Object.assign({}, e3, { headers: Object.assign({ Accept: "application/json" }, e3.headers) }) };
  function t2(e3) {
    try {
      return JSON.parse(e3);
    } catch (e4) {
      throw e4.message = `Failed to parsed response body as JSON: ${e4.message}`, e4;
    }
  }
}
let R = {};
typeof globalThis < "u" ? R = globalThis : typeof window < "u" ? R = window : typeof global < "u" ? R = global : typeof self < "u" && (R = self);
var q = R;
function A(e2 = {}) {
  const t2 = e2.implementation || q.Observable;
  if (!t2) throw new Error("`Observable` is not available in global scope, and no implementation was passed");
  return { onReturn: (e3, s2) => new t2((t3) => (e3.error.subscribe((e4) => t3.error(e4)), e3.progress.subscribe((e4) => t3.next(Object.assign({ type: "progress" }, e4))), e3.response.subscribe((e4) => {
    t3.next(Object.assign({ type: "response" }, e4)), t3.complete();
  }), e3.request.publish(s2), () => e3.abort.publish())) };
}
function S$1() {
  return { onRequest: (e2) => {
    if ("xhr" !== e2.adapter) return;
    const t2 = e2.request, s2 = e2.context;
    function n2(e3) {
      return (t3) => {
        const n3 = t3.lengthComputable ? t3.loaded / t3.total * 100 : -1;
        s2.channels.progress.publish({ stage: e3, percent: n3, total: t3.total, loaded: t3.loaded, lengthComputable: t3.lengthComputable });
      };
    }
    "upload" in t2 && "onprogress" in t2.upload && (t2.upload.onprogress = n2("upload")), "onprogress" in t2 && (t2.onprogress = n2("download"));
  } };
}
var $ = (e2, t2, s2) => ("GET" === s2.method || "HEAD" === s2.method) && (e2.isNetworkError || false);
function _$1(e2) {
  return 100 * Math.pow(2, e2) + 100 * Math.random();
}
const P = (e2 = {}) => ((e3) => {
  const t2 = e3.maxRetries || 5, s2 = e3.retryDelay || _$1, n2 = e3.shouldRetry;
  return { onError: (e4, r2) => {
    const o2 = r2.options, i2 = o2.maxRetries || t2, a2 = o2.retryDelay || s2, c2 = o2.shouldRetry || n2, u2 = o2.attemptNumber || 0;
    if (null !== (l3 = o2.body) && "object" == typeof l3 && "function" == typeof l3.pipe || !c2(e4, u2, o2) || u2 >= i2) return e4;
    var l3;
    const p2 = Object.assign({}, r2, { options: Object.assign({}, o2, { attemptNumber: u2 + 1 }) });
    return setTimeout(() => r2.channels.request.publish(p2), a2(u2)), null;
  } };
})({ shouldRetry: $, ...e2 });
P.shouldRetry = $;
var cjs = {};
var Observable = {};
var Subscriber = {};
var isFunction = {};
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction;
  hasRequiredIsFunction = 1;
  Object.defineProperty(isFunction, "__esModule", { value: true });
  isFunction.isFunction = void 0;
  function isFunction$1(value) {
    return typeof value === "function";
  }
  isFunction.isFunction = isFunction$1;
  return isFunction;
}
var Subscription = {};
var UnsubscriptionError = {};
var createErrorClass = {};
var hasRequiredCreateErrorClass;
function requireCreateErrorClass() {
  if (hasRequiredCreateErrorClass) return createErrorClass;
  hasRequiredCreateErrorClass = 1;
  Object.defineProperty(createErrorClass, "__esModule", { value: true });
  createErrorClass.createErrorClass = void 0;
  function createErrorClass$1(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }
  createErrorClass.createErrorClass = createErrorClass$1;
  return createErrorClass;
}
var hasRequiredUnsubscriptionError;
function requireUnsubscriptionError() {
  if (hasRequiredUnsubscriptionError) return UnsubscriptionError;
  hasRequiredUnsubscriptionError = 1;
  Object.defineProperty(UnsubscriptionError, "__esModule", { value: true });
  UnsubscriptionError.UnsubscriptionError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  UnsubscriptionError.UnsubscriptionError = createErrorClass_1.createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i2) {
        return i2 + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });
  return UnsubscriptionError;
}
var arrRemove = {};
var hasRequiredArrRemove;
function requireArrRemove() {
  if (hasRequiredArrRemove) return arrRemove;
  hasRequiredArrRemove = 1;
  Object.defineProperty(arrRemove, "__esModule", { value: true });
  arrRemove.arrRemove = void 0;
  function arrRemove$1(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }
  arrRemove.arrRemove = arrRemove$1;
  return arrRemove;
}
var hasRequiredSubscription;
function requireSubscription() {
  if (hasRequiredSubscription) return Subscription;
  hasRequiredSubscription = 1;
  var __values = Subscription && Subscription.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read = Subscription && Subscription.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = Subscription && Subscription.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(Subscription, "__esModule", { value: true });
  Subscription.isSubscription = Subscription.EMPTY_SUBSCRIPTION = Subscription.Subscription = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var UnsubscriptionError_1 = /* @__PURE__ */ requireUnsubscriptionError();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  var Subscription$1 = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction_1.isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e2) {
            errors = e2 instanceof UnsubscriptionError_1.UnsubscriptionError ? e2.errors : [e2];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError_1.UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove_1.arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty2 = new Subscription2();
      empty2.closed = true;
      return empty2;
    }();
    return Subscription2;
  }();
  Subscription.Subscription = Subscription$1;
  Subscription.EMPTY_SUBSCRIPTION = Subscription$1.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription$1 || value && "closed" in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe);
  }
  Subscription.isSubscription = isSubscription;
  function execFinalizer(finalizer) {
    if (isFunction_1.isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }
  return Subscription;
}
var config = {};
var hasRequiredConfig;
function requireConfig() {
  if (hasRequiredConfig) return config;
  hasRequiredConfig = 1;
  Object.defineProperty(config, "__esModule", { value: true });
  config.config = void 0;
  config.config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };
  return config;
}
var reportUnhandledError = {};
var timeoutProvider = {};
var hasRequiredTimeoutProvider;
function requireTimeoutProvider() {
  if (hasRequiredTimeoutProvider) return timeoutProvider;
  hasRequiredTimeoutProvider = 1;
  (function(exports) {
    var __read = timeoutProvider && timeoutProvider.__read || function(o2, n2) {
      var m = typeof Symbol === "function" && o2[Symbol.iterator];
      if (!m) return o2;
      var i2 = m.call(o2), r2, ar = [], e2;
      try {
        while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
      } catch (error) {
        e2 = { error };
      } finally {
        try {
          if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
        } finally {
          if (e2) throw e2.error;
        }
      }
      return ar;
    };
    var __spreadArray = timeoutProvider && timeoutProvider.__spreadArray || function(to, from2) {
      for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
        to[j2] = from2[i2];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeoutProvider = void 0;
    exports.timeoutProvider = {
      setTimeout: function(handler2, timeout2) {
        var args2 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args2[_i - 2] = arguments[_i];
        }
        var delegate = exports.timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
          return delegate.setTimeout.apply(delegate, __spreadArray([handler2, timeout2], __read(args2)));
        }
        return setTimeout.apply(void 0, __spreadArray([handler2, timeout2], __read(args2)));
      },
      clearTimeout: function(handle) {
        var delegate = exports.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
      },
      delegate: void 0
    };
  })(timeoutProvider);
  return timeoutProvider;
}
var hasRequiredReportUnhandledError;
function requireReportUnhandledError() {
  if (hasRequiredReportUnhandledError) return reportUnhandledError;
  hasRequiredReportUnhandledError = 1;
  Object.defineProperty(reportUnhandledError, "__esModule", { value: true });
  reportUnhandledError.reportUnhandledError = void 0;
  var config_1 = /* @__PURE__ */ requireConfig();
  var timeoutProvider_1 = /* @__PURE__ */ requireTimeoutProvider();
  function reportUnhandledError$1(err) {
    timeoutProvider_1.timeoutProvider.setTimeout(function() {
      var onUnhandledError = config_1.config.onUnhandledError;
      if (onUnhandledError) {
        onUnhandledError(err);
      } else {
        throw err;
      }
    });
  }
  reportUnhandledError.reportUnhandledError = reportUnhandledError$1;
  return reportUnhandledError;
}
var noop = {};
var hasRequiredNoop;
function requireNoop() {
  if (hasRequiredNoop) return noop;
  hasRequiredNoop = 1;
  Object.defineProperty(noop, "__esModule", { value: true });
  noop.noop = void 0;
  function noop$1() {
  }
  noop.noop = noop$1;
  return noop;
}
var NotificationFactories = {};
var hasRequiredNotificationFactories;
function requireNotificationFactories() {
  if (hasRequiredNotificationFactories) return NotificationFactories;
  hasRequiredNotificationFactories = 1;
  Object.defineProperty(NotificationFactories, "__esModule", { value: true });
  NotificationFactories.createNotification = NotificationFactories.nextNotification = NotificationFactories.errorNotification = NotificationFactories.COMPLETE_NOTIFICATION = void 0;
  NotificationFactories.COMPLETE_NOTIFICATION = function() {
    return createNotification("C", void 0, void 0);
  }();
  function errorNotification(error) {
    return createNotification("E", void 0, error);
  }
  NotificationFactories.errorNotification = errorNotification;
  function nextNotification(value) {
    return createNotification("N", value, void 0);
  }
  NotificationFactories.nextNotification = nextNotification;
  function createNotification(kind, value, error) {
    return {
      kind,
      value,
      error
    };
  }
  NotificationFactories.createNotification = createNotification;
  return NotificationFactories;
}
var errorContext = {};
var hasRequiredErrorContext;
function requireErrorContext() {
  if (hasRequiredErrorContext) return errorContext;
  hasRequiredErrorContext = 1;
  Object.defineProperty(errorContext, "__esModule", { value: true });
  errorContext.captureError = errorContext.errorContext = void 0;
  var config_1 = /* @__PURE__ */ requireConfig();
  var context = null;
  function errorContext$1(cb) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling) {
      var isRoot = !context;
      if (isRoot) {
        context = { errorThrown: false, error: null };
      }
      cb();
      if (isRoot) {
        var _a = context, errorThrown = _a.errorThrown, error = _a.error;
        context = null;
        if (errorThrown) {
          throw error;
        }
      }
    } else {
      cb();
    }
  }
  errorContext.errorContext = errorContext$1;
  function captureError(err) {
    if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
      context.errorThrown = true;
      context.error = err;
    }
  }
  errorContext.captureError = captureError;
  return errorContext;
}
var hasRequiredSubscriber;
function requireSubscriber() {
  if (hasRequiredSubscriber) return Subscriber;
  hasRequiredSubscriber = 1;
  (function(exports) {
    var __extends = Subscriber && Subscriber.__extends || /* @__PURE__ */ function() {
      var extendStatics = function(d2, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
          d3.__proto__ = b2;
        } || function(d3, b2) {
          for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
        };
        return extendStatics(d2, b);
      };
      return function(d2, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d2, b);
        function __() {
          this.constructor = d2;
        }
        d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;
    var isFunction_1 = /* @__PURE__ */ requireIsFunction();
    var Subscription_1 = /* @__PURE__ */ requireSubscription();
    var config_1 = /* @__PURE__ */ requireConfig();
    var reportUnhandledError_1 = /* @__PURE__ */ requireReportUnhandledError();
    var noop_1 = /* @__PURE__ */ requireNoop();
    var NotificationFactories_1 = /* @__PURE__ */ requireNotificationFactories();
    var timeoutProvider_1 = /* @__PURE__ */ requireTimeoutProvider();
    var errorContext_1 = /* @__PURE__ */ requireErrorContext();
    var Subscriber$1 = function(_super) {
      __extends(Subscriber2, _super);
      function Subscriber2(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
          _this.destination = destination;
          if (Subscription_1.isSubscription(destination)) {
            destination.add(_this);
          }
        } else {
          _this.destination = exports.EMPTY_OBSERVER;
        }
        return _this;
      }
      Subscriber2.create = function(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
      };
      Subscriber2.prototype.next = function(value) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        } else {
          this._next(value);
        }
      };
      Subscriber2.prototype.error = function(err) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        } else {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber2.prototype.complete = function() {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        } else {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber2.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
          this.destination = null;
        }
      };
      Subscriber2.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber2.prototype._error = function(err) {
        try {
          this.destination.error(err);
        } finally {
          this.unsubscribe();
        }
      };
      Subscriber2.prototype._complete = function() {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      };
      return Subscriber2;
    }(Subscription_1.Subscription);
    exports.Subscriber = Subscriber$1;
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
      return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = function() {
      function ConsumerObserver2(partialObserver) {
        this.partialObserver = partialObserver;
      }
      ConsumerObserver2.prototype.next = function(value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
          try {
            partialObserver.next(value);
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      ConsumerObserver2.prototype.error = function(err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
          try {
            partialObserver.error(err);
          } catch (error) {
            handleUnhandledError(error);
          }
        } else {
          handleUnhandledError(err);
        }
      };
      ConsumerObserver2.prototype.complete = function() {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
          try {
            partialObserver.complete();
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      return ConsumerObserver2;
    }();
    var SafeSubscriber = function(_super) {
      __extends(SafeSubscriber2, _super);
      function SafeSubscriber2(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
          partialObserver = {
            next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
            error: error !== null && error !== void 0 ? error : void 0,
            complete: complete !== null && complete !== void 0 ? complete : void 0
          };
        } else {
          var context_1;
          if (_this && config_1.config.useDeprecatedNextContext) {
            context_1 = Object.create(observerOrNext);
            context_1.unsubscribe = function() {
              return _this.unsubscribe();
            };
            partialObserver = {
              next: observerOrNext.next && bind(observerOrNext.next, context_1),
              error: observerOrNext.error && bind(observerOrNext.error, context_1),
              complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
            };
          } else {
            partialObserver = observerOrNext;
          }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
      }
      return SafeSubscriber2;
    }(Subscriber$1);
    exports.SafeSubscriber = SafeSubscriber;
    function handleUnhandledError(error) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        errorContext_1.captureError(error);
      } else {
        reportUnhandledError_1.reportUnhandledError(error);
      }
    }
    function defaultErrorHandler(err) {
      throw err;
    }
    function handleStoppedNotification(notification, subscriber) {
      var onStoppedNotification = config_1.config.onStoppedNotification;
      onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function() {
        return onStoppedNotification(notification, subscriber);
      });
    }
    exports.EMPTY_OBSERVER = {
      closed: true,
      next: noop_1.noop,
      error: defaultErrorHandler,
      complete: noop_1.noop
    };
  })(Subscriber);
  return Subscriber;
}
var observable = {};
var hasRequiredObservable$1;
function requireObservable$1() {
  if (hasRequiredObservable$1) return observable;
  hasRequiredObservable$1 = 1;
  Object.defineProperty(observable, "__esModule", { value: true });
  observable.observable = void 0;
  observable.observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  return observable;
}
var pipe = {};
var identity = {};
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity;
  hasRequiredIdentity = 1;
  Object.defineProperty(identity, "__esModule", { value: true });
  identity.identity = void 0;
  function identity$1(x2) {
    return x2;
  }
  identity.identity = identity$1;
  return identity;
}
var hasRequiredPipe;
function requirePipe() {
  if (hasRequiredPipe) return pipe;
  hasRequiredPipe = 1;
  Object.defineProperty(pipe, "__esModule", { value: true });
  pipe.pipeFromArray = pipe.pipe = void 0;
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function pipe$1() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns);
  }
  pipe.pipe = pipe$1;
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity_1.identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }
  pipe.pipeFromArray = pipeFromArray;
  return pipe;
}
var hasRequiredObservable;
function requireObservable() {
  if (hasRequiredObservable) return Observable;
  hasRequiredObservable = 1;
  Object.defineProperty(Observable, "__esModule", { value: true });
  Observable.Observable = void 0;
  var Subscriber_1 = /* @__PURE__ */ requireSubscriber();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var observable_1 = /* @__PURE__ */ requireObservable$1();
  var pipe_1 = /* @__PURE__ */ requirePipe();
  var config_1 = /* @__PURE__ */ requireConfig();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var errorContext_1 = /* @__PURE__ */ requireErrorContext();
  var Observable$1 = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
      errorContext_1.errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable_1.observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipe_1.pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x2) {
          return value = x2;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  Observable.Observable = Observable$1;
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber_1.Subscriber || isObserver(value) && Subscription_1.isSubscription(value);
  }
  return Observable;
}
var ConnectableObservable = {};
var refCount = {};
var lift = {};
var hasRequiredLift;
function requireLift() {
  if (hasRequiredLift) return lift;
  hasRequiredLift = 1;
  Object.defineProperty(lift, "__esModule", { value: true });
  lift.operate = lift.hasLift = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function hasLift(source) {
    return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  lift.hasLift = hasLift;
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  lift.operate = operate;
  return lift;
}
var OperatorSubscriber = {};
var hasRequiredOperatorSubscriber;
function requireOperatorSubscriber() {
  if (hasRequiredOperatorSubscriber) return OperatorSubscriber;
  hasRequiredOperatorSubscriber = 1;
  var __extends = OperatorSubscriber && OperatorSubscriber.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(OperatorSubscriber, "__esModule", { value: true });
  OperatorSubscriber.OperatorSubscriber = OperatorSubscriber.createOperatorSubscriber = void 0;
  var Subscriber_1 = /* @__PURE__ */ requireSubscriber();
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber$1(destination, onNext, onComplete, onError, onFinalize);
  }
  OperatorSubscriber.createOperatorSubscriber = createOperatorSubscriber;
  var OperatorSubscriber$1 = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber_1.Subscriber);
  OperatorSubscriber.OperatorSubscriber = OperatorSubscriber$1;
  return OperatorSubscriber;
}
var hasRequiredRefCount;
function requireRefCount() {
  if (hasRequiredRefCount) return refCount;
  hasRequiredRefCount = 1;
  Object.defineProperty(refCount, "__esModule", { value: true });
  refCount.refCount = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function refCount$1() {
    return lift_1.operate(function(source, subscriber) {
      var connection = null;
      source._refCount++;
      var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
        if (!source || source._refCount <= 0 || 0 < --source._refCount) {
          connection = null;
          return;
        }
        var sharedConnection = source._connection;
        var conn = connection;
        connection = null;
        if (sharedConnection && (!conn || sharedConnection === conn)) {
          sharedConnection.unsubscribe();
        }
        subscriber.unsubscribe();
      });
      source.subscribe(refCounter);
      if (!refCounter.closed) {
        connection = source.connect();
      }
    });
  }
  refCount.refCount = refCount$1;
  return refCount;
}
var hasRequiredConnectableObservable;
function requireConnectableObservable() {
  if (hasRequiredConnectableObservable) return ConnectableObservable;
  hasRequiredConnectableObservable = 1;
  var __extends = ConnectableObservable && ConnectableObservable.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(ConnectableObservable, "__esModule", { value: true });
  ConnectableObservable.ConnectableObservable = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var refCount_1 = /* @__PURE__ */ requireRefCount();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var lift_1 = /* @__PURE__ */ requireLift();
  var ConnectableObservable$1 = function(_super) {
    __extends(ConnectableObservable2, _super);
    function ConnectableObservable2(source, subjectFactory) {
      var _this = _super.call(this) || this;
      _this.source = source;
      _this.subjectFactory = subjectFactory;
      _this._subject = null;
      _this._refCount = 0;
      _this._connection = null;
      if (lift_1.hasLift(source)) {
        _this.lift = source.lift;
      }
      return _this;
    }
    ConnectableObservable2.prototype._subscribe = function(subscriber) {
      return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable2.prototype.getSubject = function() {
      var subject = this._subject;
      if (!subject || subject.isStopped) {
        this._subject = this.subjectFactory();
      }
      return this._subject;
    };
    ConnectableObservable2.prototype._teardown = function() {
      this._refCount = 0;
      var _connection = this._connection;
      this._subject = this._connection = null;
      _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
    };
    ConnectableObservable2.prototype.connect = function() {
      var _this = this;
      var connection = this._connection;
      if (!connection) {
        connection = this._connection = new Subscription_1.Subscription();
        var subject_1 = this.getSubject();
        connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, void 0, function() {
          _this._teardown();
          subject_1.complete();
        }, function(err) {
          _this._teardown();
          subject_1.error(err);
        }, function() {
          return _this._teardown();
        })));
        if (connection.closed) {
          this._connection = null;
          connection = Subscription_1.Subscription.EMPTY;
        }
      }
      return connection;
    };
    ConnectableObservable2.prototype.refCount = function() {
      return refCount_1.refCount()(this);
    };
    return ConnectableObservable2;
  }(Observable_1.Observable);
  ConnectableObservable.ConnectableObservable = ConnectableObservable$1;
  return ConnectableObservable;
}
var animationFrames = {};
var performanceTimestampProvider = {};
var hasRequiredPerformanceTimestampProvider;
function requirePerformanceTimestampProvider() {
  if (hasRequiredPerformanceTimestampProvider) return performanceTimestampProvider;
  hasRequiredPerformanceTimestampProvider = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.performanceTimestampProvider = void 0;
    exports.performanceTimestampProvider = {
      now: function() {
        return (exports.performanceTimestampProvider.delegate || performance).now();
      },
      delegate: void 0
    };
  })(performanceTimestampProvider);
  return performanceTimestampProvider;
}
var animationFrameProvider = {};
var hasRequiredAnimationFrameProvider;
function requireAnimationFrameProvider() {
  if (hasRequiredAnimationFrameProvider) return animationFrameProvider;
  hasRequiredAnimationFrameProvider = 1;
  (function(exports) {
    var __read = animationFrameProvider && animationFrameProvider.__read || function(o2, n2) {
      var m = typeof Symbol === "function" && o2[Symbol.iterator];
      if (!m) return o2;
      var i2 = m.call(o2), r2, ar = [], e2;
      try {
        while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
      } catch (error) {
        e2 = { error };
      } finally {
        try {
          if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
        } finally {
          if (e2) throw e2.error;
        }
      }
      return ar;
    };
    var __spreadArray = animationFrameProvider && animationFrameProvider.__spreadArray || function(to, from2) {
      for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
        to[j2] = from2[i2];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.animationFrameProvider = void 0;
    var Subscription_1 = /* @__PURE__ */ requireSubscription();
    exports.animationFrameProvider = {
      schedule: function(callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports.animationFrameProvider.delegate;
        if (delegate) {
          request = delegate.requestAnimationFrame;
          cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function(timestamp2) {
          cancel = void 0;
          callback(timestamp2);
        });
        return new Subscription_1.Subscription(function() {
          return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
        });
      },
      requestAnimationFrame: function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args2)));
      },
      cancelAnimationFrame: function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        var delegate = exports.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args2)));
      },
      delegate: void 0
    };
  })(animationFrameProvider);
  return animationFrameProvider;
}
var hasRequiredAnimationFrames;
function requireAnimationFrames() {
  if (hasRequiredAnimationFrames) return animationFrames;
  hasRequiredAnimationFrames = 1;
  Object.defineProperty(animationFrames, "__esModule", { value: true });
  animationFrames.animationFrames = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var performanceTimestampProvider_1 = /* @__PURE__ */ requirePerformanceTimestampProvider();
  var animationFrameProvider_1 = /* @__PURE__ */ requireAnimationFrameProvider();
  function animationFrames$1(timestampProvider) {
    return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
  }
  animationFrames.animationFrames = animationFrames$1;
  function animationFramesFactory(timestampProvider) {
    return new Observable_1.Observable(function(subscriber) {
      var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
      var start = provider.now();
      var id = 0;
      var run = function() {
        if (!subscriber.closed) {
          id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function(timestamp2) {
            id = 0;
            var now = provider.now();
            subscriber.next({
              timestamp: timestampProvider ? now : timestamp2,
              elapsed: now - start
            });
            run();
          });
        }
      };
      run();
      return function() {
        if (id) {
          animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
        }
      };
    });
  }
  var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
  return animationFrames;
}
var Subject = {};
var ObjectUnsubscribedError = {};
var hasRequiredObjectUnsubscribedError;
function requireObjectUnsubscribedError() {
  if (hasRequiredObjectUnsubscribedError) return ObjectUnsubscribedError;
  hasRequiredObjectUnsubscribedError = 1;
  Object.defineProperty(ObjectUnsubscribedError, "__esModule", { value: true });
  ObjectUnsubscribedError.ObjectUnsubscribedError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  ObjectUnsubscribedError.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function(_super) {
    return function ObjectUnsubscribedErrorImpl() {
      _super(this);
      this.name = "ObjectUnsubscribedError";
      this.message = "object unsubscribed";
    };
  });
  return ObjectUnsubscribedError;
}
var hasRequiredSubject;
function requireSubject() {
  if (hasRequiredSubject) return Subject;
  hasRequiredSubject = 1;
  var __extends = Subject && Subject.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __values = Subject && Subject.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(Subject, "__esModule", { value: true });
  Subject.AnonymousSubject = Subject.Subject = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var ObjectUnsubscribedError_1 = /* @__PURE__ */ requireObjectUnsubscribedError();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  var errorContext_1 = /* @__PURE__ */ requireErrorContext();
  var Subject$1 = function(_super) {
    __extends(Subject2, _super);
    function Subject2() {
      var _this = _super.call(this) || this;
      _this.closed = false;
      _this.currentObservers = null;
      _this.observers = [];
      _this.isStopped = false;
      _this.hasError = false;
      _this.thrownError = null;
      return _this;
    }
    Subject2.prototype.lift = function(operator) {
      var subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    };
    Subject2.prototype._throwIfClosed = function() {
      if (this.closed) {
        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
      }
    };
    Subject2.prototype.next = function(value) {
      var _this = this;
      errorContext_1.errorContext(function() {
        var e_1, _a;
        _this._throwIfClosed();
        if (!_this.isStopped) {
          if (!_this.currentObservers) {
            _this.currentObservers = Array.from(_this.observers);
          }
          try {
            for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
              var observer = _c.value;
              observer.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }
      });
    };
    Subject2.prototype.error = function(err) {
      var _this = this;
      errorContext_1.errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.hasError = _this.isStopped = true;
          _this.thrownError = err;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().error(err);
          }
        }
      });
    };
    Subject2.prototype.complete = function() {
      var _this = this;
      errorContext_1.errorContext(function() {
        _this._throwIfClosed();
        if (!_this.isStopped) {
          _this.isStopped = true;
          var observers = _this.observers;
          while (observers.length) {
            observers.shift().complete();
          }
        }
      });
    };
    Subject2.prototype.unsubscribe = function() {
      this.isStopped = this.closed = true;
      this.observers = this.currentObservers = null;
    };
    Object.defineProperty(Subject2.prototype, "observed", {
      get: function() {
        var _a;
        return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
      },
      enumerable: false,
      configurable: true
    });
    Subject2.prototype._trySubscribe = function(subscriber) {
      this._throwIfClosed();
      return _super.prototype._trySubscribe.call(this, subscriber);
    };
    Subject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._checkFinalizedStatuses(subscriber);
      return this._innerSubscribe(subscriber);
    };
    Subject2.prototype._innerSubscribe = function(subscriber) {
      var _this = this;
      var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
      if (hasError || isStopped) {
        return Subscription_1.EMPTY_SUBSCRIPTION;
      }
      this.currentObservers = null;
      observers.push(subscriber);
      return new Subscription_1.Subscription(function() {
        _this.currentObservers = null;
        arrRemove_1.arrRemove(observers, subscriber);
      });
    };
    Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped) {
        subscriber.complete();
      }
    };
    Subject2.prototype.asObservable = function() {
      var observable2 = new Observable_1.Observable();
      observable2.source = this;
      return observable2;
    };
    Subject2.create = function(destination, source) {
      return new AnonymousSubject(destination, source);
    };
    return Subject2;
  }(Observable_1.Observable);
  Subject.Subject = Subject$1;
  var AnonymousSubject = function(_super) {
    __extends(AnonymousSubject2, _super);
    function AnonymousSubject2(destination, source) {
      var _this = _super.call(this) || this;
      _this.destination = destination;
      _this.source = source;
      return _this;
    }
    AnonymousSubject2.prototype.next = function(value) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    AnonymousSubject2.prototype.error = function(err) {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
    };
    AnonymousSubject2.prototype.complete = function() {
      var _a, _b;
      (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    AnonymousSubject2.prototype._subscribe = function(subscriber) {
      var _a, _b;
      return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
    };
    return AnonymousSubject2;
  }(Subject$1);
  Subject.AnonymousSubject = AnonymousSubject;
  return Subject;
}
var BehaviorSubject = {};
var hasRequiredBehaviorSubject;
function requireBehaviorSubject() {
  if (hasRequiredBehaviorSubject) return BehaviorSubject;
  hasRequiredBehaviorSubject = 1;
  var __extends = BehaviorSubject && BehaviorSubject.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(BehaviorSubject, "__esModule", { value: true });
  BehaviorSubject.BehaviorSubject = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var BehaviorSubject$1 = function(_super) {
    __extends(BehaviorSubject2, _super);
    function BehaviorSubject2(_value) {
      var _this = _super.call(this) || this;
      _this._value = _value;
      return _this;
    }
    Object.defineProperty(BehaviorSubject2.prototype, "value", {
      get: function() {
        return this.getValue();
      },
      enumerable: false,
      configurable: true
    });
    BehaviorSubject2.prototype._subscribe = function(subscriber) {
      var subscription = _super.prototype._subscribe.call(this, subscriber);
      !subscription.closed && subscriber.next(this._value);
      return subscription;
    };
    BehaviorSubject2.prototype.getValue = function() {
      var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
      if (hasError) {
        throw thrownError;
      }
      this._throwIfClosed();
      return _value;
    };
    BehaviorSubject2.prototype.next = function(value) {
      _super.prototype.next.call(this, this._value = value);
    };
    return BehaviorSubject2;
  }(Subject_1.Subject);
  BehaviorSubject.BehaviorSubject = BehaviorSubject$1;
  return BehaviorSubject;
}
var ReplaySubject = {};
var dateTimestampProvider = {};
var hasRequiredDateTimestampProvider;
function requireDateTimestampProvider() {
  if (hasRequiredDateTimestampProvider) return dateTimestampProvider;
  hasRequiredDateTimestampProvider = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.dateTimestampProvider = void 0;
    exports.dateTimestampProvider = {
      now: function() {
        return (exports.dateTimestampProvider.delegate || Date).now();
      },
      delegate: void 0
    };
  })(dateTimestampProvider);
  return dateTimestampProvider;
}
var hasRequiredReplaySubject;
function requireReplaySubject() {
  if (hasRequiredReplaySubject) return ReplaySubject;
  hasRequiredReplaySubject = 1;
  var __extends = ReplaySubject && ReplaySubject.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(ReplaySubject, "__esModule", { value: true });
  ReplaySubject.ReplaySubject = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var dateTimestampProvider_1 = /* @__PURE__ */ requireDateTimestampProvider();
  var ReplaySubject$1 = function(_super) {
    __extends(ReplaySubject2, _super);
    function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
      if (_bufferSize === void 0) {
        _bufferSize = Infinity;
      }
      if (_windowTime === void 0) {
        _windowTime = Infinity;
      }
      if (_timestampProvider === void 0) {
        _timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
      }
      var _this = _super.call(this) || this;
      _this._bufferSize = _bufferSize;
      _this._windowTime = _windowTime;
      _this._timestampProvider = _timestampProvider;
      _this._buffer = [];
      _this._infiniteTimeWindow = true;
      _this._infiniteTimeWindow = _windowTime === Infinity;
      _this._bufferSize = Math.max(1, _bufferSize);
      _this._windowTime = Math.max(1, _windowTime);
      return _this;
    }
    ReplaySubject2.prototype.next = function(value) {
      var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
      if (!isStopped) {
        _buffer.push(value);
        !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
      }
      this._trimBuffer();
      _super.prototype.next.call(this, value);
    };
    ReplaySubject2.prototype._subscribe = function(subscriber) {
      this._throwIfClosed();
      this._trimBuffer();
      var subscription = this._innerSubscribe(subscriber);
      var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
      var copy = _buffer.slice();
      for (var i2 = 0; i2 < copy.length && !subscriber.closed; i2 += _infiniteTimeWindow ? 1 : 2) {
        subscriber.next(copy[i2]);
      }
      this._checkFinalizedStatuses(subscriber);
      return subscription;
    };
    ReplaySubject2.prototype._trimBuffer = function() {
      var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
      var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
      _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
      if (!_infiniteTimeWindow) {
        var now = _timestampProvider.now();
        var last2 = 0;
        for (var i2 = 1; i2 < _buffer.length && _buffer[i2] <= now; i2 += 2) {
          last2 = i2;
        }
        last2 && _buffer.splice(0, last2 + 1);
      }
    };
    return ReplaySubject2;
  }(Subject_1.Subject);
  ReplaySubject.ReplaySubject = ReplaySubject$1;
  return ReplaySubject;
}
var AsyncSubject = {};
var hasRequiredAsyncSubject;
function requireAsyncSubject() {
  if (hasRequiredAsyncSubject) return AsyncSubject;
  hasRequiredAsyncSubject = 1;
  var __extends = AsyncSubject && AsyncSubject.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AsyncSubject, "__esModule", { value: true });
  AsyncSubject.AsyncSubject = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var AsyncSubject$1 = function(_super) {
    __extends(AsyncSubject2, _super);
    function AsyncSubject2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this._value = null;
      _this._hasValue = false;
      _this._isComplete = false;
      return _this;
    }
    AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
      var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
      if (hasError) {
        subscriber.error(thrownError);
      } else if (isStopped || _isComplete) {
        _hasValue && subscriber.next(_value);
        subscriber.complete();
      }
    };
    AsyncSubject2.prototype.next = function(value) {
      if (!this.isStopped) {
        this._value = value;
        this._hasValue = true;
      }
    };
    AsyncSubject2.prototype.complete = function() {
      var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
      if (!_isComplete) {
        this._isComplete = true;
        _hasValue && _super.prototype.next.call(this, _value);
        _super.prototype.complete.call(this);
      }
    };
    return AsyncSubject2;
  }(Subject_1.Subject);
  AsyncSubject.AsyncSubject = AsyncSubject$1;
  return AsyncSubject;
}
var asap = {};
var AsapAction = {};
var AsyncAction = {};
var Action = {};
var hasRequiredAction;
function requireAction() {
  if (hasRequiredAction) return Action;
  hasRequiredAction = 1;
  var __extends = Action && Action.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(Action, "__esModule", { value: true });
  Action.Action = void 0;
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var Action$1 = function(_super) {
    __extends(Action2, _super);
    function Action2(scheduler, work) {
      return _super.call(this) || this;
    }
    Action2.prototype.schedule = function(state, delay2) {
      return this;
    };
    return Action2;
  }(Subscription_1.Subscription);
  Action.Action = Action$1;
  return Action;
}
var intervalProvider = {};
var hasRequiredIntervalProvider;
function requireIntervalProvider() {
  if (hasRequiredIntervalProvider) return intervalProvider;
  hasRequiredIntervalProvider = 1;
  (function(exports) {
    var __read = intervalProvider && intervalProvider.__read || function(o2, n2) {
      var m = typeof Symbol === "function" && o2[Symbol.iterator];
      if (!m) return o2;
      var i2 = m.call(o2), r2, ar = [], e2;
      try {
        while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
      } catch (error) {
        e2 = { error };
      } finally {
        try {
          if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
        } finally {
          if (e2) throw e2.error;
        }
      }
      return ar;
    };
    var __spreadArray = intervalProvider && intervalProvider.__spreadArray || function(to, from2) {
      for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
        to[j2] = from2[i2];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.intervalProvider = void 0;
    exports.intervalProvider = {
      setInterval: function(handler2, timeout2) {
        var args2 = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args2[_i - 2] = arguments[_i];
        }
        var delegate = exports.intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
          return delegate.setInterval.apply(delegate, __spreadArray([handler2, timeout2], __read(args2)));
        }
        return setInterval.apply(void 0, __spreadArray([handler2, timeout2], __read(args2)));
      },
      clearInterval: function(handle) {
        var delegate = exports.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
      },
      delegate: void 0
    };
  })(intervalProvider);
  return intervalProvider;
}
var hasRequiredAsyncAction;
function requireAsyncAction() {
  if (hasRequiredAsyncAction) return AsyncAction;
  hasRequiredAsyncAction = 1;
  var __extends = AsyncAction && AsyncAction.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AsyncAction, "__esModule", { value: true });
  AsyncAction.AsyncAction = void 0;
  var Action_1 = /* @__PURE__ */ requireAction();
  var intervalProvider_1 = /* @__PURE__ */ requireIntervalProvider();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  var AsyncAction$1 = function(_super) {
    __extends(AsyncAction2, _super);
    function AsyncAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.pending = false;
      return _this;
    }
    AsyncAction2.prototype.schedule = function(state, delay2) {
      var _a;
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (this.closed) {
        return this;
      }
      this.state = state;
      var id = this.id;
      var scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay2);
      }
      this.pending = true;
      this.delay = delay2;
      this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay2);
      return this;
    };
    AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay2);
    };
    AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null && this.delay === delay2 && this.pending === false) {
        return id;
      }
      if (id != null) {
        intervalProvider_1.intervalProvider.clearInterval(id);
      }
      return void 0;
    };
    AsyncAction2.prototype.execute = function(state, delay2) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      var error = this._execute(state, delay2);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    };
    AsyncAction2.prototype._execute = function(state, _delay) {
      var errored = false;
      var errorValue;
      try {
        this.work(state);
      } catch (e2) {
        errored = true;
        errorValue = e2 ? e2 : new Error("Scheduled action threw falsy error");
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    };
    AsyncAction2.prototype.unsubscribe = function() {
      if (!this.closed) {
        var _a = this, id = _a.id, scheduler = _a.scheduler;
        var actions = scheduler.actions;
        this.work = this.state = this.scheduler = null;
        this.pending = false;
        arrRemove_1.arrRemove(actions, this);
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, null);
        }
        this.delay = null;
        _super.prototype.unsubscribe.call(this);
      }
    };
    return AsyncAction2;
  }(Action_1.Action);
  AsyncAction.AsyncAction = AsyncAction$1;
  return AsyncAction;
}
var immediateProvider = {};
var Immediate = {};
var hasRequiredImmediate;
function requireImmediate() {
  if (hasRequiredImmediate) return Immediate;
  hasRequiredImmediate = 1;
  Object.defineProperty(Immediate, "__esModule", { value: true });
  Immediate.TestTools = Immediate.Immediate = void 0;
  var nextHandle = 1;
  var resolved;
  var activeHandles = {};
  function findAndClearHandle(handle) {
    if (handle in activeHandles) {
      delete activeHandles[handle];
      return true;
    }
    return false;
  }
  Immediate.Immediate = {
    setImmediate: function(cb) {
      var handle = nextHandle++;
      activeHandles[handle] = true;
      if (!resolved) {
        resolved = Promise.resolve();
      }
      resolved.then(function() {
        return findAndClearHandle(handle) && cb();
      });
      return handle;
    },
    clearImmediate: function(handle) {
      findAndClearHandle(handle);
    }
  };
  Immediate.TestTools = {
    pending: function() {
      return Object.keys(activeHandles).length;
    }
  };
  return Immediate;
}
var hasRequiredImmediateProvider;
function requireImmediateProvider() {
  if (hasRequiredImmediateProvider) return immediateProvider;
  hasRequiredImmediateProvider = 1;
  (function(exports) {
    var __read = immediateProvider && immediateProvider.__read || function(o2, n2) {
      var m = typeof Symbol === "function" && o2[Symbol.iterator];
      if (!m) return o2;
      var i2 = m.call(o2), r2, ar = [], e2;
      try {
        while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
      } catch (error) {
        e2 = { error };
      } finally {
        try {
          if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
        } finally {
          if (e2) throw e2.error;
        }
      }
      return ar;
    };
    var __spreadArray = immediateProvider && immediateProvider.__spreadArray || function(to, from2) {
      for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
        to[j2] = from2[i2];
      return to;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.immediateProvider = void 0;
    var Immediate_1 = /* @__PURE__ */ requireImmediate();
    var setImmediate = Immediate_1.Immediate.setImmediate, clearImmediate = Immediate_1.Immediate.clearImmediate;
    exports.immediateProvider = {
      setImmediate: function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args2)));
      },
      clearImmediate: function(handle) {
        var delegate = exports.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
      },
      delegate: void 0
    };
  })(immediateProvider);
  return immediateProvider;
}
var hasRequiredAsapAction;
function requireAsapAction() {
  if (hasRequiredAsapAction) return AsapAction;
  hasRequiredAsapAction = 1;
  var __extends = AsapAction && AsapAction.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AsapAction, "__esModule", { value: true });
  AsapAction.AsapAction = void 0;
  var AsyncAction_1 = /* @__PURE__ */ requireAsyncAction();
  var immediateProvider_1 = /* @__PURE__ */ requireImmediateProvider();
  var AsapAction$1 = function(_super) {
    __extends(AsapAction2, _super);
    function AsapAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }
    AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 !== null && delay2 > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
      }
      scheduler.actions.push(this);
      return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
    };
    AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
      var _a;
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null ? delay2 > 0 : this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
      }
      var actions = scheduler.actions;
      if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
        immediateProvider_1.immediateProvider.clearImmediate(id);
        if (scheduler._scheduled === id) {
          scheduler._scheduled = void 0;
        }
      }
      return void 0;
    };
    return AsapAction2;
  }(AsyncAction_1.AsyncAction);
  AsapAction.AsapAction = AsapAction$1;
  return AsapAction;
}
var AsapScheduler = {};
var AsyncScheduler = {};
var Scheduler = {};
var hasRequiredScheduler;
function requireScheduler() {
  if (hasRequiredScheduler) return Scheduler;
  hasRequiredScheduler = 1;
  Object.defineProperty(Scheduler, "__esModule", { value: true });
  Scheduler.Scheduler = void 0;
  var dateTimestampProvider_1 = /* @__PURE__ */ requireDateTimestampProvider();
  var Scheduler$1 = function() {
    function Scheduler2(schedulerActionCtor, now) {
      if (now === void 0) {
        now = Scheduler2.now;
      }
      this.schedulerActionCtor = schedulerActionCtor;
      this.now = now;
    }
    Scheduler2.prototype.schedule = function(work, delay2, state) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      return new this.schedulerActionCtor(this, work).schedule(state, delay2);
    };
    Scheduler2.now = dateTimestampProvider_1.dateTimestampProvider.now;
    return Scheduler2;
  }();
  Scheduler.Scheduler = Scheduler$1;
  return Scheduler;
}
var hasRequiredAsyncScheduler;
function requireAsyncScheduler() {
  if (hasRequiredAsyncScheduler) return AsyncScheduler;
  hasRequiredAsyncScheduler = 1;
  var __extends = AsyncScheduler && AsyncScheduler.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AsyncScheduler, "__esModule", { value: true });
  AsyncScheduler.AsyncScheduler = void 0;
  var Scheduler_1 = /* @__PURE__ */ requireScheduler();
  var AsyncScheduler$1 = function(_super) {
    __extends(AsyncScheduler2, _super);
    function AsyncScheduler2(SchedulerAction, now) {
      if (now === void 0) {
        now = Scheduler_1.Scheduler.now;
      }
      var _this = _super.call(this, SchedulerAction, now) || this;
      _this.actions = [];
      _this._active = false;
      return _this;
    }
    AsyncScheduler2.prototype.flush = function(action) {
      var actions = this.actions;
      if (this._active) {
        actions.push(action);
        return;
      }
      var error;
      this._active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this._active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsyncScheduler2;
  }(Scheduler_1.Scheduler);
  AsyncScheduler.AsyncScheduler = AsyncScheduler$1;
  return AsyncScheduler;
}
var hasRequiredAsapScheduler;
function requireAsapScheduler() {
  if (hasRequiredAsapScheduler) return AsapScheduler;
  hasRequiredAsapScheduler = 1;
  var __extends = AsapScheduler && AsapScheduler.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AsapScheduler, "__esModule", { value: true });
  AsapScheduler.AsapScheduler = void 0;
  var AsyncScheduler_1 = /* @__PURE__ */ requireAsyncScheduler();
  var AsapScheduler$1 = function(_super) {
    __extends(AsapScheduler2, _super);
    function AsapScheduler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    AsapScheduler2.prototype.flush = function(action) {
      this._active = true;
      var flushId = this._scheduled;
      this._scheduled = void 0;
      var actions = this.actions;
      var error;
      action = action || actions.shift();
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while ((action = actions[0]) && action.id === flushId && actions.shift());
      this._active = false;
      if (error) {
        while ((action = actions[0]) && action.id === flushId && actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AsapScheduler2;
  }(AsyncScheduler_1.AsyncScheduler);
  AsapScheduler.AsapScheduler = AsapScheduler$1;
  return AsapScheduler;
}
var hasRequiredAsap;
function requireAsap() {
  if (hasRequiredAsap) return asap;
  hasRequiredAsap = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.asap = exports.asapScheduler = void 0;
    var AsapAction_1 = /* @__PURE__ */ requireAsapAction();
    var AsapScheduler_1 = /* @__PURE__ */ requireAsapScheduler();
    exports.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
    exports.asap = exports.asapScheduler;
  })(asap);
  return asap;
}
var async = {};
var hasRequiredAsync;
function requireAsync() {
  if (hasRequiredAsync) return async;
  hasRequiredAsync = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.async = exports.asyncScheduler = void 0;
    var AsyncAction_1 = /* @__PURE__ */ requireAsyncAction();
    var AsyncScheduler_1 = /* @__PURE__ */ requireAsyncScheduler();
    exports.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
    exports.async = exports.asyncScheduler;
  })(async);
  return async;
}
var queue = {};
var QueueAction = {};
var hasRequiredQueueAction;
function requireQueueAction() {
  if (hasRequiredQueueAction) return QueueAction;
  hasRequiredQueueAction = 1;
  var __extends = QueueAction && QueueAction.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(QueueAction, "__esModule", { value: true });
  QueueAction.QueueAction = void 0;
  var AsyncAction_1 = /* @__PURE__ */ requireAsyncAction();
  var QueueAction$1 = function(_super) {
    __extends(QueueAction2, _super);
    function QueueAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }
    QueueAction2.prototype.schedule = function(state, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 > 0) {
        return _super.prototype.schedule.call(this, state, delay2);
      }
      this.delay = delay2;
      this.state = state;
      this.scheduler.flush(this);
      return this;
    };
    QueueAction2.prototype.execute = function(state, delay2) {
      return delay2 > 0 || this.closed ? _super.prototype.execute.call(this, state, delay2) : this._execute(state, delay2);
    };
    QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null && delay2 > 0 || delay2 == null && this.delay > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
      }
      scheduler.flush(this);
      return 0;
    };
    return QueueAction2;
  }(AsyncAction_1.AsyncAction);
  QueueAction.QueueAction = QueueAction$1;
  return QueueAction;
}
var QueueScheduler = {};
var hasRequiredQueueScheduler;
function requireQueueScheduler() {
  if (hasRequiredQueueScheduler) return QueueScheduler;
  hasRequiredQueueScheduler = 1;
  var __extends = QueueScheduler && QueueScheduler.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(QueueScheduler, "__esModule", { value: true });
  QueueScheduler.QueueScheduler = void 0;
  var AsyncScheduler_1 = /* @__PURE__ */ requireAsyncScheduler();
  var QueueScheduler$1 = function(_super) {
    __extends(QueueScheduler2, _super);
    function QueueScheduler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    return QueueScheduler2;
  }(AsyncScheduler_1.AsyncScheduler);
  QueueScheduler.QueueScheduler = QueueScheduler$1;
  return QueueScheduler;
}
var hasRequiredQueue;
function requireQueue() {
  if (hasRequiredQueue) return queue;
  hasRequiredQueue = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.queue = exports.queueScheduler = void 0;
    var QueueAction_1 = /* @__PURE__ */ requireQueueAction();
    var QueueScheduler_1 = /* @__PURE__ */ requireQueueScheduler();
    exports.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
    exports.queue = exports.queueScheduler;
  })(queue);
  return queue;
}
var animationFrame = {};
var AnimationFrameAction = {};
var hasRequiredAnimationFrameAction;
function requireAnimationFrameAction() {
  if (hasRequiredAnimationFrameAction) return AnimationFrameAction;
  hasRequiredAnimationFrameAction = 1;
  var __extends = AnimationFrameAction && AnimationFrameAction.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AnimationFrameAction, "__esModule", { value: true });
  AnimationFrameAction.AnimationFrameAction = void 0;
  var AsyncAction_1 = /* @__PURE__ */ requireAsyncAction();
  var animationFrameProvider_1 = /* @__PURE__ */ requireAnimationFrameProvider();
  var AnimationFrameAction$1 = function(_super) {
    __extends(AnimationFrameAction2, _super);
    function AnimationFrameAction2(scheduler, work) {
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      return _this;
    }
    AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 !== null && delay2 > 0) {
        return _super.prototype.requestAsyncId.call(this, scheduler, id, delay2);
      }
      scheduler.actions.push(this);
      return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function() {
        return scheduler.flush(void 0);
      }));
    };
    AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
      var _a;
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (delay2 != null ? delay2 > 0 : this.delay > 0) {
        return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay2);
      }
      var actions = scheduler.actions;
      if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
        animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
        scheduler._scheduled = void 0;
      }
      return void 0;
    };
    return AnimationFrameAction2;
  }(AsyncAction_1.AsyncAction);
  AnimationFrameAction.AnimationFrameAction = AnimationFrameAction$1;
  return AnimationFrameAction;
}
var AnimationFrameScheduler = {};
var hasRequiredAnimationFrameScheduler;
function requireAnimationFrameScheduler() {
  if (hasRequiredAnimationFrameScheduler) return AnimationFrameScheduler;
  hasRequiredAnimationFrameScheduler = 1;
  var __extends = AnimationFrameScheduler && AnimationFrameScheduler.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(AnimationFrameScheduler, "__esModule", { value: true });
  AnimationFrameScheduler.AnimationFrameScheduler = void 0;
  var AsyncScheduler_1 = /* @__PURE__ */ requireAsyncScheduler();
  var AnimationFrameScheduler$1 = function(_super) {
    __extends(AnimationFrameScheduler2, _super);
    function AnimationFrameScheduler2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    AnimationFrameScheduler2.prototype.flush = function(action) {
      this._active = true;
      var flushId;
      if (action) {
        flushId = action.id;
      } else {
        flushId = this._scheduled;
        this._scheduled = void 0;
      }
      var actions = this.actions;
      var error;
      action = action || actions.shift();
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while ((action = actions[0]) && action.id === flushId && actions.shift());
      this._active = false;
      if (error) {
        while ((action = actions[0]) && action.id === flushId && actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    return AnimationFrameScheduler2;
  }(AsyncScheduler_1.AsyncScheduler);
  AnimationFrameScheduler.AnimationFrameScheduler = AnimationFrameScheduler$1;
  return AnimationFrameScheduler;
}
var hasRequiredAnimationFrame;
function requireAnimationFrame() {
  if (hasRequiredAnimationFrame) return animationFrame;
  hasRequiredAnimationFrame = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.animationFrame = exports.animationFrameScheduler = void 0;
    var AnimationFrameAction_1 = /* @__PURE__ */ requireAnimationFrameAction();
    var AnimationFrameScheduler_1 = /* @__PURE__ */ requireAnimationFrameScheduler();
    exports.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
    exports.animationFrame = exports.animationFrameScheduler;
  })(animationFrame);
  return animationFrame;
}
var VirtualTimeScheduler = {};
var hasRequiredVirtualTimeScheduler;
function requireVirtualTimeScheduler() {
  if (hasRequiredVirtualTimeScheduler) return VirtualTimeScheduler;
  hasRequiredVirtualTimeScheduler = 1;
  var __extends = VirtualTimeScheduler && VirtualTimeScheduler.__extends || /* @__PURE__ */ function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2) if (Object.prototype.hasOwnProperty.call(b2, p2)) d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  Object.defineProperty(VirtualTimeScheduler, "__esModule", { value: true });
  VirtualTimeScheduler.VirtualAction = VirtualTimeScheduler.VirtualTimeScheduler = void 0;
  var AsyncAction_1 = /* @__PURE__ */ requireAsyncAction();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var AsyncScheduler_1 = /* @__PURE__ */ requireAsyncScheduler();
  var VirtualTimeScheduler$1 = function(_super) {
    __extends(VirtualTimeScheduler2, _super);
    function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
      if (schedulerActionCtor === void 0) {
        schedulerActionCtor = VirtualAction;
      }
      if (maxFrames === void 0) {
        maxFrames = Infinity;
      }
      var _this = _super.call(this, schedulerActionCtor, function() {
        return _this.frame;
      }) || this;
      _this.maxFrames = maxFrames;
      _this.frame = 0;
      _this.index = -1;
      return _this;
    }
    VirtualTimeScheduler2.prototype.flush = function() {
      var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
      var error;
      var action;
      while ((action = actions[0]) && action.delay <= maxFrames) {
        actions.shift();
        this.frame = action.delay;
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      }
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    };
    VirtualTimeScheduler2.frameTimeFactor = 10;
    return VirtualTimeScheduler2;
  }(AsyncScheduler_1.AsyncScheduler);
  VirtualTimeScheduler.VirtualTimeScheduler = VirtualTimeScheduler$1;
  var VirtualAction = function(_super) {
    __extends(VirtualAction2, _super);
    function VirtualAction2(scheduler, work, index) {
      if (index === void 0) {
        index = scheduler.index += 1;
      }
      var _this = _super.call(this, scheduler, work) || this;
      _this.scheduler = scheduler;
      _this.work = work;
      _this.index = index;
      _this.active = true;
      _this.index = scheduler.index = index;
      return _this;
    }
    VirtualAction2.prototype.schedule = function(state, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      if (Number.isFinite(delay2)) {
        if (!this.id) {
          return _super.prototype.schedule.call(this, state, delay2);
        }
        this.active = false;
        var action = new VirtualAction2(this.scheduler, this.work);
        this.add(action);
        return action.schedule(state, delay2);
      } else {
        return Subscription_1.Subscription.EMPTY;
      }
    };
    VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay2) {
      if (delay2 === void 0) {
        delay2 = 0;
      }
      this.delay = scheduler.frame + delay2;
      var actions = scheduler.actions;
      actions.push(this);
      actions.sort(VirtualAction2.sortActions);
      return 1;
    };
    VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay2) {
      return void 0;
    };
    VirtualAction2.prototype._execute = function(state, delay2) {
      if (this.active === true) {
        return _super.prototype._execute.call(this, state, delay2);
      }
    };
    VirtualAction2.sortActions = function(a2, b) {
      if (a2.delay === b.delay) {
        if (a2.index === b.index) {
          return 0;
        } else if (a2.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      } else if (a2.delay > b.delay) {
        return 1;
      } else {
        return -1;
      }
    };
    return VirtualAction2;
  }(AsyncAction_1.AsyncAction);
  VirtualTimeScheduler.VirtualAction = VirtualAction;
  return VirtualTimeScheduler;
}
var Notification = {};
var empty = {};
var hasRequiredEmpty;
function requireEmpty() {
  if (hasRequiredEmpty) return empty;
  hasRequiredEmpty = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.empty = exports.EMPTY = void 0;
    var Observable_1 = /* @__PURE__ */ requireObservable();
    exports.EMPTY = new Observable_1.Observable(function(subscriber) {
      return subscriber.complete();
    });
    function empty2(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : exports.EMPTY;
    }
    exports.empty = empty2;
    function emptyScheduled(scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        return scheduler.schedule(function() {
          return subscriber.complete();
        });
      });
    }
  })(empty);
  return empty;
}
var of = {};
var args = {};
var isScheduler = {};
var hasRequiredIsScheduler;
function requireIsScheduler() {
  if (hasRequiredIsScheduler) return isScheduler;
  hasRequiredIsScheduler = 1;
  Object.defineProperty(isScheduler, "__esModule", { value: true });
  isScheduler.isScheduler = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isScheduler$1(value) {
    return value && isFunction_1.isFunction(value.schedule);
  }
  isScheduler.isScheduler = isScheduler$1;
  return isScheduler;
}
var hasRequiredArgs;
function requireArgs() {
  if (hasRequiredArgs) return args;
  hasRequiredArgs = 1;
  Object.defineProperty(args, "__esModule", { value: true });
  args.popNumber = args.popScheduler = args.popResultSelector = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var isScheduler_1 = /* @__PURE__ */ requireIsScheduler();
  function last2(arr) {
    return arr[arr.length - 1];
  }
  function popResultSelector(args2) {
    return isFunction_1.isFunction(last2(args2)) ? args2.pop() : void 0;
  }
  args.popResultSelector = popResultSelector;
  function popScheduler(args2) {
    return isScheduler_1.isScheduler(last2(args2)) ? args2.pop() : void 0;
  }
  args.popScheduler = popScheduler;
  function popNumber(args2, defaultValue) {
    return typeof last2(args2) === "number" ? args2.pop() : defaultValue;
  }
  args.popNumber = popNumber;
  return args;
}
var from = {};
var scheduled = {};
var scheduleObservable = {};
var innerFrom = {};
var isArrayLike = {};
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike;
  hasRequiredIsArrayLike = 1;
  Object.defineProperty(isArrayLike, "__esModule", { value: true });
  isArrayLike.isArrayLike = void 0;
  isArrayLike.isArrayLike = function(x2) {
    return x2 && typeof x2.length === "number" && typeof x2 !== "function";
  };
  return isArrayLike;
}
var isPromise = {};
var hasRequiredIsPromise;
function requireIsPromise() {
  if (hasRequiredIsPromise) return isPromise;
  hasRequiredIsPromise = 1;
  Object.defineProperty(isPromise, "__esModule", { value: true });
  isPromise.isPromise = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isPromise$1(value) {
    return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
  }
  isPromise.isPromise = isPromise$1;
  return isPromise;
}
var isInteropObservable = {};
var hasRequiredIsInteropObservable;
function requireIsInteropObservable() {
  if (hasRequiredIsInteropObservable) return isInteropObservable;
  hasRequiredIsInteropObservable = 1;
  Object.defineProperty(isInteropObservable, "__esModule", { value: true });
  isInteropObservable.isInteropObservable = void 0;
  var observable_1 = /* @__PURE__ */ requireObservable$1();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isInteropObservable$1(input) {
    return isFunction_1.isFunction(input[observable_1.observable]);
  }
  isInteropObservable.isInteropObservable = isInteropObservable$1;
  return isInteropObservable;
}
var isAsyncIterable = {};
var hasRequiredIsAsyncIterable;
function requireIsAsyncIterable() {
  if (hasRequiredIsAsyncIterable) return isAsyncIterable;
  hasRequiredIsAsyncIterable = 1;
  Object.defineProperty(isAsyncIterable, "__esModule", { value: true });
  isAsyncIterable.isAsyncIterable = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isAsyncIterable$1(obj) {
    return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }
  isAsyncIterable.isAsyncIterable = isAsyncIterable$1;
  return isAsyncIterable;
}
var throwUnobservableError = {};
var hasRequiredThrowUnobservableError;
function requireThrowUnobservableError() {
  if (hasRequiredThrowUnobservableError) return throwUnobservableError;
  hasRequiredThrowUnobservableError = 1;
  Object.defineProperty(throwUnobservableError, "__esModule", { value: true });
  throwUnobservableError.createInvalidObservableTypeError = void 0;
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }
  throwUnobservableError.createInvalidObservableTypeError = createInvalidObservableTypeError;
  return throwUnobservableError;
}
var isIterable = {};
var iterator = {};
var hasRequiredIterator;
function requireIterator() {
  if (hasRequiredIterator) return iterator;
  hasRequiredIterator = 1;
  Object.defineProperty(iterator, "__esModule", { value: true });
  iterator.iterator = iterator.getSymbolIterator = void 0;
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  iterator.getSymbolIterator = getSymbolIterator;
  iterator.iterator = getSymbolIterator();
  return iterator;
}
var hasRequiredIsIterable;
function requireIsIterable() {
  if (hasRequiredIsIterable) return isIterable;
  hasRequiredIsIterable = 1;
  Object.defineProperty(isIterable, "__esModule", { value: true });
  isIterable.isIterable = void 0;
  var iterator_1 = /* @__PURE__ */ requireIterator();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isIterable$1(input) {
    return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
  }
  isIterable.isIterable = isIterable$1;
  return isIterable;
}
var isReadableStreamLike = {};
var hasRequiredIsReadableStreamLike;
function requireIsReadableStreamLike() {
  if (hasRequiredIsReadableStreamLike) return isReadableStreamLike;
  hasRequiredIsReadableStreamLike = 1;
  var __generator = isReadableStreamLike && isReadableStreamLike.__generator || function(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t2[0] & 1) throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y, t2, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2) throw new TypeError("Generator is already executing.");
      while (_2) try {
        if (f2 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done) return t2;
        if (y = 0, t2) op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2]) _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y = 0;
      } finally {
        f2 = t2 = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __await = isReadableStreamLike && isReadableStreamLike.__await || function(v2) {
    return this instanceof __await ? (this.v = v2, this) : new __await(v2);
  };
  var __asyncGenerator = isReadableStreamLike && isReadableStreamLike.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i2, q2 = [];
    return i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2;
    function verb(n2) {
      if (g[n2]) i2[n2] = function(v2) {
        return new Promise(function(a2, b) {
          q2.push([n2, v2, a2, b]) > 1 || resume(n2, v2);
        });
      };
    }
    function resume(n2, v2) {
      try {
        step(g[n2](v2));
      } catch (e2) {
        settle(q2[0][3], e2);
      }
    }
    function step(r2) {
      r2.value instanceof __await ? Promise.resolve(r2.value.v).then(fulfill, reject) : settle(q2[0][2], r2);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f2, v2) {
      if (f2(v2), q2.shift(), q2.length) resume(q2[0][0], q2[0][1]);
    }
  };
  Object.defineProperty(isReadableStreamLike, "__esModule", { value: true });
  isReadableStreamLike.isReadableStreamLike = isReadableStreamLike.readableStreamLikeToAsyncGenerator = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done) return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  isReadableStreamLike.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
  function isReadableStreamLike$1(obj) {
    return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }
  isReadableStreamLike.isReadableStreamLike = isReadableStreamLike$1;
  return isReadableStreamLike;
}
var hasRequiredInnerFrom;
function requireInnerFrom() {
  if (hasRequiredInnerFrom) return innerFrom;
  hasRequiredInnerFrom = 1;
  var __awaiter = innerFrom && innerFrom.__awaiter || function(thisArg, _arguments, P2, generator) {
    function adopt(value) {
      return value instanceof P2 ? value : new P2(function(resolve) {
        resolve(value);
      });
    }
    return new (P2 || (P2 = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = innerFrom && innerFrom.__generator || function(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t2[0] & 1) throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y, t2, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2) throw new TypeError("Generator is already executing.");
      while (_2) try {
        if (f2 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done) return t2;
        if (y = 0, t2) op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2]) _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y = 0;
      } finally {
        f2 = t2 = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __asyncValues = innerFrom && innerFrom.__asyncValues || function(o2) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o2[Symbol.asyncIterator], i2;
    return m ? m.call(o2) : (o2 = typeof __values === "function" ? __values(o2) : o2[Symbol.iterator](), i2 = {}, verb("next"), verb("throw"), verb("return"), i2[Symbol.asyncIterator] = function() {
      return this;
    }, i2);
    function verb(n2) {
      i2[n2] = o2[n2] && function(v2) {
        return new Promise(function(resolve, reject) {
          v2 = o2[n2](v2), settle(resolve, reject, v2.done, v2.value);
        });
      };
    }
    function settle(resolve, reject, d2, v2) {
      Promise.resolve(v2).then(function(v3) {
        resolve({ value: v3, done: d2 });
      }, reject);
    }
  };
  var __values = innerFrom && innerFrom.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(innerFrom, "__esModule", { value: true });
  innerFrom.fromReadableStreamLike = innerFrom.fromAsyncIterable = innerFrom.fromIterable = innerFrom.fromPromise = innerFrom.fromArrayLike = innerFrom.fromInteropObservable = innerFrom.innerFrom = void 0;
  var isArrayLike_1 = /* @__PURE__ */ requireIsArrayLike();
  var isPromise_1 = /* @__PURE__ */ requireIsPromise();
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var isInteropObservable_1 = /* @__PURE__ */ requireIsInteropObservable();
  var isAsyncIterable_1 = /* @__PURE__ */ requireIsAsyncIterable();
  var throwUnobservableError_1 = /* @__PURE__ */ requireThrowUnobservableError();
  var isIterable_1 = /* @__PURE__ */ requireIsIterable();
  var isReadableStreamLike_1 = /* @__PURE__ */ requireIsReadableStreamLike();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var reportUnhandledError_1 = /* @__PURE__ */ requireReportUnhandledError();
  var observable_1 = /* @__PURE__ */ requireObservable$1();
  function innerFrom$1(input) {
    if (input instanceof Observable_1.Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable_1.isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike_1.isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise_1.isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable_1.isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable_1.isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike_1.isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
  }
  innerFrom.innerFrom = innerFrom$1;
  function fromInteropObservable(obj) {
    return new Observable_1.Observable(function(subscriber) {
      var obs = obj[observable_1.observable]();
      if (isFunction_1.isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  innerFrom.fromInteropObservable = fromInteropObservable;
  function fromArrayLike(array) {
    return new Observable_1.Observable(function(subscriber) {
      for (var i2 = 0; i2 < array.length && !subscriber.closed; i2++) {
        subscriber.next(array[i2]);
      }
      subscriber.complete();
    });
  }
  innerFrom.fromArrayLike = fromArrayLike;
  function fromPromise(promise) {
    return new Observable_1.Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError_1.reportUnhandledError);
    });
  }
  innerFrom.fromPromise = fromPromise;
  function fromIterable(iterable) {
    return new Observable_1.Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  innerFrom.fromIterable = fromIterable;
  function fromAsyncIterable(asyncIterable) {
    return new Observable_1.Observable(function(subscriber) {
      process2(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  innerFrom.fromAsyncIterable = fromAsyncIterable;
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
  }
  innerFrom.fromReadableStreamLike = fromReadableStreamLike;
  function process2(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2) throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }
  return innerFrom;
}
var observeOn = {};
var executeSchedule = {};
var hasRequiredExecuteSchedule;
function requireExecuteSchedule() {
  if (hasRequiredExecuteSchedule) return executeSchedule;
  hasRequiredExecuteSchedule = 1;
  Object.defineProperty(executeSchedule, "__esModule", { value: true });
  executeSchedule.executeSchedule = void 0;
  function executeSchedule$1(parentSubscription, scheduler, work, delay2, repeat2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    if (repeat2 === void 0) {
      repeat2 = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat2) {
        parentSubscription.add(this.schedule(null, delay2));
      } else {
        this.unsubscribe();
      }
    }, delay2);
    parentSubscription.add(scheduleSubscription);
    if (!repeat2) {
      return scheduleSubscription;
    }
  }
  executeSchedule.executeSchedule = executeSchedule$1;
  return executeSchedule;
}
var hasRequiredObserveOn;
function requireObserveOn() {
  if (hasRequiredObserveOn) return observeOn;
  hasRequiredObserveOn = 1;
  Object.defineProperty(observeOn, "__esModule", { value: true });
  observeOn.observeOn = void 0;
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function observeOn$1(scheduler, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return lift_1.operate(function(source, subscriber) {
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          return subscriber.next(value);
        }, delay2);
      }, function() {
        return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          return subscriber.complete();
        }, delay2);
      }, function(err) {
        return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          return subscriber.error(err);
        }, delay2);
      }));
    });
  }
  observeOn.observeOn = observeOn$1;
  return observeOn;
}
var subscribeOn = {};
var hasRequiredSubscribeOn;
function requireSubscribeOn() {
  if (hasRequiredSubscribeOn) return subscribeOn;
  hasRequiredSubscribeOn = 1;
  Object.defineProperty(subscribeOn, "__esModule", { value: true });
  subscribeOn.subscribeOn = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  function subscribeOn$1(scheduler, delay2) {
    if (delay2 === void 0) {
      delay2 = 0;
    }
    return lift_1.operate(function(source, subscriber) {
      subscriber.add(scheduler.schedule(function() {
        return source.subscribe(subscriber);
      }, delay2));
    });
  }
  subscribeOn.subscribeOn = subscribeOn$1;
  return subscribeOn;
}
var hasRequiredScheduleObservable;
function requireScheduleObservable() {
  if (hasRequiredScheduleObservable) return scheduleObservable;
  hasRequiredScheduleObservable = 1;
  Object.defineProperty(scheduleObservable, "__esModule", { value: true });
  scheduleObservable.scheduleObservable = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var observeOn_1 = /* @__PURE__ */ requireObserveOn();
  var subscribeOn_1 = /* @__PURE__ */ requireSubscribeOn();
  function scheduleObservable$1(input, scheduler) {
    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
  }
  scheduleObservable.scheduleObservable = scheduleObservable$1;
  return scheduleObservable;
}
var schedulePromise = {};
var hasRequiredSchedulePromise;
function requireSchedulePromise() {
  if (hasRequiredSchedulePromise) return schedulePromise;
  hasRequiredSchedulePromise = 1;
  Object.defineProperty(schedulePromise, "__esModule", { value: true });
  schedulePromise.schedulePromise = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var observeOn_1 = /* @__PURE__ */ requireObserveOn();
  var subscribeOn_1 = /* @__PURE__ */ requireSubscribeOn();
  function schedulePromise$1(input, scheduler) {
    return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
  }
  schedulePromise.schedulePromise = schedulePromise$1;
  return schedulePromise;
}
var scheduleArray = {};
var hasRequiredScheduleArray;
function requireScheduleArray() {
  if (hasRequiredScheduleArray) return scheduleArray;
  hasRequiredScheduleArray = 1;
  Object.defineProperty(scheduleArray, "__esModule", { value: true });
  scheduleArray.scheduleArray = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  function scheduleArray$1(input, scheduler) {
    return new Observable_1.Observable(function(subscriber) {
      var i2 = 0;
      return scheduler.schedule(function() {
        if (i2 === input.length) {
          subscriber.complete();
        } else {
          subscriber.next(input[i2++]);
          if (!subscriber.closed) {
            this.schedule();
          }
        }
      });
    });
  }
  scheduleArray.scheduleArray = scheduleArray$1;
  return scheduleArray;
}
var scheduleIterable = {};
var hasRequiredScheduleIterable;
function requireScheduleIterable() {
  if (hasRequiredScheduleIterable) return scheduleIterable;
  hasRequiredScheduleIterable = 1;
  Object.defineProperty(scheduleIterable, "__esModule", { value: true });
  scheduleIterable.scheduleIterable = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var iterator_1 = /* @__PURE__ */ requireIterator();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  function scheduleIterable$1(input, scheduler) {
    return new Observable_1.Observable(function(subscriber) {
      var iterator2;
      executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
        iterator2 = input[iterator_1.iterator]();
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          var _a;
          var value;
          var done;
          try {
            _a = iterator2.next(), value = _a.value, done = _a.done;
          } catch (err) {
            subscriber.error(err);
            return;
          }
          if (done) {
            subscriber.complete();
          } else {
            subscriber.next(value);
          }
        }, 0, true);
      });
      return function() {
        return isFunction_1.isFunction(iterator2 === null || iterator2 === void 0 ? void 0 : iterator2.return) && iterator2.return();
      };
    });
  }
  scheduleIterable.scheduleIterable = scheduleIterable$1;
  return scheduleIterable;
}
var scheduleAsyncIterable = {};
var hasRequiredScheduleAsyncIterable;
function requireScheduleAsyncIterable() {
  if (hasRequiredScheduleAsyncIterable) return scheduleAsyncIterable;
  hasRequiredScheduleAsyncIterable = 1;
  Object.defineProperty(scheduleAsyncIterable, "__esModule", { value: true });
  scheduleAsyncIterable.scheduleAsyncIterable = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  function scheduleAsyncIterable$1(input, scheduler) {
    if (!input) {
      throw new Error("Iterable cannot be null");
    }
    return new Observable_1.Observable(function(subscriber) {
      executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
        var iterator2 = input[Symbol.asyncIterator]();
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          iterator2.next().then(function(result) {
            if (result.done) {
              subscriber.complete();
            } else {
              subscriber.next(result.value);
            }
          });
        }, 0, true);
      });
    });
  }
  scheduleAsyncIterable.scheduleAsyncIterable = scheduleAsyncIterable$1;
  return scheduleAsyncIterable;
}
var scheduleReadableStreamLike = {};
var hasRequiredScheduleReadableStreamLike;
function requireScheduleReadableStreamLike() {
  if (hasRequiredScheduleReadableStreamLike) return scheduleReadableStreamLike;
  hasRequiredScheduleReadableStreamLike = 1;
  Object.defineProperty(scheduleReadableStreamLike, "__esModule", { value: true });
  scheduleReadableStreamLike.scheduleReadableStreamLike = void 0;
  var scheduleAsyncIterable_1 = /* @__PURE__ */ requireScheduleAsyncIterable();
  var isReadableStreamLike_1 = /* @__PURE__ */ requireIsReadableStreamLike();
  function scheduleReadableStreamLike$1(input, scheduler) {
    return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
  }
  scheduleReadableStreamLike.scheduleReadableStreamLike = scheduleReadableStreamLike$1;
  return scheduleReadableStreamLike;
}
var hasRequiredScheduled;
function requireScheduled() {
  if (hasRequiredScheduled) return scheduled;
  hasRequiredScheduled = 1;
  Object.defineProperty(scheduled, "__esModule", { value: true });
  scheduled.scheduled = void 0;
  var scheduleObservable_1 = /* @__PURE__ */ requireScheduleObservable();
  var schedulePromise_1 = /* @__PURE__ */ requireSchedulePromise();
  var scheduleArray_1 = /* @__PURE__ */ requireScheduleArray();
  var scheduleIterable_1 = /* @__PURE__ */ requireScheduleIterable();
  var scheduleAsyncIterable_1 = /* @__PURE__ */ requireScheduleAsyncIterable();
  var isInteropObservable_1 = /* @__PURE__ */ requireIsInteropObservable();
  var isPromise_1 = /* @__PURE__ */ requireIsPromise();
  var isArrayLike_1 = /* @__PURE__ */ requireIsArrayLike();
  var isIterable_1 = /* @__PURE__ */ requireIsIterable();
  var isAsyncIterable_1 = /* @__PURE__ */ requireIsAsyncIterable();
  var throwUnobservableError_1 = /* @__PURE__ */ requireThrowUnobservableError();
  var isReadableStreamLike_1 = /* @__PURE__ */ requireIsReadableStreamLike();
  var scheduleReadableStreamLike_1 = /* @__PURE__ */ requireScheduleReadableStreamLike();
  function scheduled$1(input, scheduler) {
    if (input != null) {
      if (isInteropObservable_1.isInteropObservable(input)) {
        return scheduleObservable_1.scheduleObservable(input, scheduler);
      }
      if (isArrayLike_1.isArrayLike(input)) {
        return scheduleArray_1.scheduleArray(input, scheduler);
      }
      if (isPromise_1.isPromise(input)) {
        return schedulePromise_1.schedulePromise(input, scheduler);
      }
      if (isAsyncIterable_1.isAsyncIterable(input)) {
        return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
      }
      if (isIterable_1.isIterable(input)) {
        return scheduleIterable_1.scheduleIterable(input, scheduler);
      }
      if (isReadableStreamLike_1.isReadableStreamLike(input)) {
        return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
      }
    }
    throw throwUnobservableError_1.createInvalidObservableTypeError(input);
  }
  scheduled.scheduled = scheduled$1;
  return scheduled;
}
var hasRequiredFrom;
function requireFrom() {
  if (hasRequiredFrom) return from;
  hasRequiredFrom = 1;
  Object.defineProperty(from, "__esModule", { value: true });
  from.from = void 0;
  var scheduled_1 = /* @__PURE__ */ requireScheduled();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function from$1(input, scheduler) {
    return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
  }
  from.from = from$1;
  return from;
}
var hasRequiredOf;
function requireOf() {
  if (hasRequiredOf) return of;
  hasRequiredOf = 1;
  Object.defineProperty(of, "__esModule", { value: true });
  of.of = void 0;
  var args_1 = /* @__PURE__ */ requireArgs();
  var from_1 = /* @__PURE__ */ requireFrom();
  function of$1() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args2);
    return from_1.from(args2, scheduler);
  }
  of.of = of$1;
  return of;
}
var throwError = {};
var hasRequiredThrowError;
function requireThrowError() {
  if (hasRequiredThrowError) return throwError;
  hasRequiredThrowError = 1;
  Object.defineProperty(throwError, "__esModule", { value: true });
  throwError.throwError = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function throwError$1(errorOrErrorFactory, scheduler) {
    var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
      return errorOrErrorFactory;
    };
    var init = function(subscriber) {
      return subscriber.error(errorFactory());
    };
    return new Observable_1.Observable(scheduler ? function(subscriber) {
      return scheduler.schedule(init, 0, subscriber);
    } : init);
  }
  throwError.throwError = throwError$1;
  return throwError;
}
var hasRequiredNotification;
function requireNotification() {
  if (hasRequiredNotification) return Notification;
  hasRequiredNotification = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.observeNotification = exports.Notification = exports.NotificationKind = void 0;
    var empty_1 = /* @__PURE__ */ requireEmpty();
    var of_1 = /* @__PURE__ */ requireOf();
    var throwError_1 = /* @__PURE__ */ requireThrowError();
    var isFunction_1 = /* @__PURE__ */ requireIsFunction();
    (function(NotificationKind) {
      NotificationKind["NEXT"] = "N";
      NotificationKind["ERROR"] = "E";
      NotificationKind["COMPLETE"] = "C";
    })(exports.NotificationKind || (exports.NotificationKind = {}));
    var Notification2 = function() {
      function Notification3(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === "N";
      }
      Notification3.prototype.observe = function(observer) {
        return observeNotification(this, observer);
      };
      Notification3.prototype.do = function(nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
      };
      Notification3.prototype.accept = function(nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
      };
      Notification3.prototype.toObservable = function() {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === "N" ? of_1.of(value) : kind === "E" ? throwError_1.throwError(function() {
          return error;
        }) : kind === "C" ? empty_1.EMPTY : 0;
        if (!result) {
          throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
      };
      Notification3.createNext = function(value) {
        return new Notification3("N", value);
      };
      Notification3.createError = function(err) {
        return new Notification3("E", void 0, err);
      };
      Notification3.createComplete = function() {
        return Notification3.completeNotification;
      };
      Notification3.completeNotification = new Notification3("C");
      return Notification3;
    }();
    exports.Notification = Notification2;
    function observeNotification(notification, observer) {
      var _a, _b, _c;
      var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
      if (typeof kind !== "string") {
        throw new TypeError('Invalid notification, missing "kind"');
      }
      kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
    }
    exports.observeNotification = observeNotification;
  })(Notification);
  return Notification;
}
var isObservable = {};
var hasRequiredIsObservable;
function requireIsObservable() {
  if (hasRequiredIsObservable) return isObservable;
  hasRequiredIsObservable = 1;
  Object.defineProperty(isObservable, "__esModule", { value: true });
  isObservable.isObservable = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function isObservable$1(obj) {
    return !!obj && (obj instanceof Observable_1.Observable || isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe));
  }
  isObservable.isObservable = isObservable$1;
  return isObservable;
}
var lastValueFrom = {};
var EmptyError = {};
var hasRequiredEmptyError;
function requireEmptyError() {
  if (hasRequiredEmptyError) return EmptyError;
  hasRequiredEmptyError = 1;
  Object.defineProperty(EmptyError, "__esModule", { value: true });
  EmptyError.EmptyError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  EmptyError.EmptyError = createErrorClass_1.createErrorClass(function(_super) {
    return function EmptyErrorImpl() {
      _super(this);
      this.name = "EmptyError";
      this.message = "no elements in sequence";
    };
  });
  return EmptyError;
}
var hasRequiredLastValueFrom;
function requireLastValueFrom() {
  if (hasRequiredLastValueFrom) return lastValueFrom;
  hasRequiredLastValueFrom = 1;
  Object.defineProperty(lastValueFrom, "__esModule", { value: true });
  lastValueFrom.lastValueFrom = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  function lastValueFrom$1(source, config2) {
    var hasConfig = typeof config2 === "object";
    return new Promise(function(resolve, reject) {
      var _hasValue = false;
      var _value;
      source.subscribe({
        next: function(value) {
          _value = value;
          _hasValue = true;
        },
        error: reject,
        complete: function() {
          if (_hasValue) {
            resolve(_value);
          } else if (hasConfig) {
            resolve(config2.defaultValue);
          } else {
            reject(new EmptyError_1.EmptyError());
          }
        }
      });
    });
  }
  lastValueFrom.lastValueFrom = lastValueFrom$1;
  return lastValueFrom;
}
var firstValueFrom = {};
var hasRequiredFirstValueFrom;
function requireFirstValueFrom() {
  if (hasRequiredFirstValueFrom) return firstValueFrom;
  hasRequiredFirstValueFrom = 1;
  Object.defineProperty(firstValueFrom, "__esModule", { value: true });
  firstValueFrom.firstValueFrom = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  var Subscriber_1 = /* @__PURE__ */ requireSubscriber();
  function firstValueFrom$1(source, config2) {
    var hasConfig = typeof config2 === "object";
    return new Promise(function(resolve, reject) {
      var subscriber = new Subscriber_1.SafeSubscriber({
        next: function(value) {
          resolve(value);
          subscriber.unsubscribe();
        },
        error: reject,
        complete: function() {
          if (hasConfig) {
            resolve(config2.defaultValue);
          } else {
            reject(new EmptyError_1.EmptyError());
          }
        }
      });
      source.subscribe(subscriber);
    });
  }
  firstValueFrom.firstValueFrom = firstValueFrom$1;
  return firstValueFrom;
}
var ArgumentOutOfRangeError = {};
var hasRequiredArgumentOutOfRangeError;
function requireArgumentOutOfRangeError() {
  if (hasRequiredArgumentOutOfRangeError) return ArgumentOutOfRangeError;
  hasRequiredArgumentOutOfRangeError = 1;
  Object.defineProperty(ArgumentOutOfRangeError, "__esModule", { value: true });
  ArgumentOutOfRangeError.ArgumentOutOfRangeError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  ArgumentOutOfRangeError.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function(_super) {
    return function ArgumentOutOfRangeErrorImpl() {
      _super(this);
      this.name = "ArgumentOutOfRangeError";
      this.message = "argument out of range";
    };
  });
  return ArgumentOutOfRangeError;
}
var NotFoundError = {};
var hasRequiredNotFoundError;
function requireNotFoundError() {
  if (hasRequiredNotFoundError) return NotFoundError;
  hasRequiredNotFoundError = 1;
  Object.defineProperty(NotFoundError, "__esModule", { value: true });
  NotFoundError.NotFoundError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  NotFoundError.NotFoundError = createErrorClass_1.createErrorClass(function(_super) {
    return function NotFoundErrorImpl(message) {
      _super(this);
      this.name = "NotFoundError";
      this.message = message;
    };
  });
  return NotFoundError;
}
var SequenceError = {};
var hasRequiredSequenceError;
function requireSequenceError() {
  if (hasRequiredSequenceError) return SequenceError;
  hasRequiredSequenceError = 1;
  Object.defineProperty(SequenceError, "__esModule", { value: true });
  SequenceError.SequenceError = void 0;
  var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
  SequenceError.SequenceError = createErrorClass_1.createErrorClass(function(_super) {
    return function SequenceErrorImpl(message) {
      _super(this);
      this.name = "SequenceError";
      this.message = message;
    };
  });
  return SequenceError;
}
var timeout = {};
var isDate = {};
var hasRequiredIsDate;
function requireIsDate() {
  if (hasRequiredIsDate) return isDate;
  hasRequiredIsDate = 1;
  Object.defineProperty(isDate, "__esModule", { value: true });
  isDate.isValidDate = void 0;
  function isValidDate(value) {
    return value instanceof Date && !isNaN(value);
  }
  isDate.isValidDate = isValidDate;
  return isDate;
}
var hasRequiredTimeout;
function requireTimeout() {
  if (hasRequiredTimeout) return timeout;
  hasRequiredTimeout = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeout = exports.TimeoutError = void 0;
    var async_1 = /* @__PURE__ */ requireAsync();
    var isDate_1 = /* @__PURE__ */ requireIsDate();
    var lift_1 = /* @__PURE__ */ requireLift();
    var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
    var createErrorClass_1 = /* @__PURE__ */ requireCreateErrorClass();
    var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
    var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
    exports.TimeoutError = createErrorClass_1.createErrorClass(function(_super) {
      return function TimeoutErrorImpl(info) {
        if (info === void 0) {
          info = null;
        }
        _super(this);
        this.message = "Timeout has occurred";
        this.name = "TimeoutError";
        this.info = info;
      };
    });
    function timeout2(config2, schedulerArg) {
      var _a = isDate_1.isValidDate(config2) ? { first: config2 } : typeof config2 === "number" ? { each: config2 } : config2, first2 = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
      if (first2 == null && each == null) {
        throw new TypeError("No timeout provided.");
      }
      return lift_1.operate(function(source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function(delay2) {
          timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            try {
              originalSourceSubscription.unsubscribe();
              innerFrom_1.innerFrom(_with({
                meta,
                lastValue,
                seen
              })).subscribe(subscriber);
            } catch (err) {
              subscriber.error(err);
            }
          }, delay2);
        };
        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          seen++;
          subscriber.next(lastValue = value);
          each > 0 && startTimer(each);
        }, void 0, void 0, function() {
          if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          }
          lastValue = null;
        }));
        !seen && startTimer(first2 != null ? typeof first2 === "number" ? first2 : +first2 - scheduler.now() : each);
      });
    }
    exports.timeout = timeout2;
    function timeoutErrorFactory(info) {
      throw new exports.TimeoutError(info);
    }
  })(timeout);
  return timeout;
}
var bindCallback = {};
var bindCallbackInternals = {};
var mapOneOrManyArgs = {};
var map = {};
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map;
  hasRequiredMap = 1;
  Object.defineProperty(map, "__esModule", { value: true });
  map.map = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function map$1(project, thisArg) {
    return lift_1.operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }
  map.map = map$1;
  return map;
}
var hasRequiredMapOneOrManyArgs;
function requireMapOneOrManyArgs() {
  if (hasRequiredMapOneOrManyArgs) return mapOneOrManyArgs;
  hasRequiredMapOneOrManyArgs = 1;
  var __read = mapOneOrManyArgs && mapOneOrManyArgs.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = mapOneOrManyArgs && mapOneOrManyArgs.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(mapOneOrManyArgs, "__esModule", { value: true });
  mapOneOrManyArgs.mapOneOrManyArgs = void 0;
  var map_1 = /* @__PURE__ */ requireMap();
  var isArray = Array.isArray;
  function callOrApply(fn, args2) {
    return isArray(args2) ? fn.apply(void 0, __spreadArray([], __read(args2))) : fn(args2);
  }
  function mapOneOrManyArgs$1(fn) {
    return map_1.map(function(args2) {
      return callOrApply(fn, args2);
    });
  }
  mapOneOrManyArgs.mapOneOrManyArgs = mapOneOrManyArgs$1;
  return mapOneOrManyArgs;
}
var hasRequiredBindCallbackInternals;
function requireBindCallbackInternals() {
  if (hasRequiredBindCallbackInternals) return bindCallbackInternals;
  hasRequiredBindCallbackInternals = 1;
  var __read = bindCallbackInternals && bindCallbackInternals.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = bindCallbackInternals && bindCallbackInternals.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(bindCallbackInternals, "__esModule", { value: true });
  bindCallbackInternals.bindCallbackInternals = void 0;
  var isScheduler_1 = /* @__PURE__ */ requireIsScheduler();
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var subscribeOn_1 = /* @__PURE__ */ requireSubscribeOn();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var observeOn_1 = /* @__PURE__ */ requireObserveOn();
  var AsyncSubject_1 = /* @__PURE__ */ requireAsyncSubject();
  function bindCallbackInternals$1(isNodeStyle, callbackFunc, resultSelector, scheduler) {
    if (resultSelector) {
      if (isScheduler_1.isScheduler(resultSelector)) {
        scheduler = resultSelector;
      } else {
        return function() {
          var args2 = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args2[_i] = arguments[_i];
          }
          return bindCallbackInternals$1(isNodeStyle, callbackFunc, scheduler).apply(this, args2).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
        };
      }
    }
    if (scheduler) {
      return function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return bindCallbackInternals$1(isNodeStyle, callbackFunc).apply(this, args2).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
      };
    }
    return function() {
      var _this = this;
      var args2 = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args2[_i] = arguments[_i];
      }
      var subject = new AsyncSubject_1.AsyncSubject();
      var uninitialized = true;
      return new Observable_1.Observable(function(subscriber) {
        var subs = subject.subscribe(subscriber);
        if (uninitialized) {
          uninitialized = false;
          var isAsync_1 = false;
          var isComplete_1 = false;
          callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args2)), [
            function() {
              var results = [];
              for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                results[_i2] = arguments[_i2];
              }
              if (isNodeStyle) {
                var err = results.shift();
                if (err != null) {
                  subject.error(err);
                  return;
                }
              }
              subject.next(1 < results.length ? results : results[0]);
              isComplete_1 = true;
              if (isAsync_1) {
                subject.complete();
              }
            }
          ]));
          if (isComplete_1) {
            subject.complete();
          }
          isAsync_1 = true;
        }
        return subs;
      });
    };
  }
  bindCallbackInternals.bindCallbackInternals = bindCallbackInternals$1;
  return bindCallbackInternals;
}
var hasRequiredBindCallback;
function requireBindCallback() {
  if (hasRequiredBindCallback) return bindCallback;
  hasRequiredBindCallback = 1;
  Object.defineProperty(bindCallback, "__esModule", { value: true });
  bindCallback.bindCallback = void 0;
  var bindCallbackInternals_1 = /* @__PURE__ */ requireBindCallbackInternals();
  function bindCallback$1(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
  }
  bindCallback.bindCallback = bindCallback$1;
  return bindCallback;
}
var bindNodeCallback = {};
var hasRequiredBindNodeCallback;
function requireBindNodeCallback() {
  if (hasRequiredBindNodeCallback) return bindNodeCallback;
  hasRequiredBindNodeCallback = 1;
  Object.defineProperty(bindNodeCallback, "__esModule", { value: true });
  bindNodeCallback.bindNodeCallback = void 0;
  var bindCallbackInternals_1 = /* @__PURE__ */ requireBindCallbackInternals();
  function bindNodeCallback$1(callbackFunc, resultSelector, scheduler) {
    return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
  }
  bindNodeCallback.bindNodeCallback = bindNodeCallback$1;
  return bindNodeCallback;
}
var combineLatest$1 = {};
var argsArgArrayOrObject = {};
var hasRequiredArgsArgArrayOrObject;
function requireArgsArgArrayOrObject() {
  if (hasRequiredArgsArgArrayOrObject) return argsArgArrayOrObject;
  hasRequiredArgsArgArrayOrObject = 1;
  Object.defineProperty(argsArgArrayOrObject, "__esModule", { value: true });
  argsArgArrayOrObject.argsArgArrayOrObject = void 0;
  var isArray = Array.isArray;
  var getPrototypeOf = Object.getPrototypeOf, objectProto = Object.prototype, getKeys = Object.keys;
  function argsArgArrayOrObject$1(args2) {
    if (args2.length === 1) {
      var first_1 = args2[0];
      if (isArray(first_1)) {
        return { args: first_1, keys: null };
      }
      if (isPOJO(first_1)) {
        var keys = getKeys(first_1);
        return {
          args: keys.map(function(key) {
            return first_1[key];
          }),
          keys
        };
      }
    }
    return { args: args2, keys: null };
  }
  argsArgArrayOrObject.argsArgArrayOrObject = argsArgArrayOrObject$1;
  function isPOJO(obj) {
    return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
  }
  return argsArgArrayOrObject;
}
var createObject = {};
var hasRequiredCreateObject;
function requireCreateObject() {
  if (hasRequiredCreateObject) return createObject;
  hasRequiredCreateObject = 1;
  Object.defineProperty(createObject, "__esModule", { value: true });
  createObject.createObject = void 0;
  function createObject$1(keys, values) {
    return keys.reduce(function(result, key, i2) {
      return result[key] = values[i2], result;
    }, {});
  }
  createObject.createObject = createObject$1;
  return createObject;
}
var hasRequiredCombineLatest$1;
function requireCombineLatest$1() {
  if (hasRequiredCombineLatest$1) return combineLatest$1;
  hasRequiredCombineLatest$1 = 1;
  Object.defineProperty(combineLatest$1, "__esModule", { value: true });
  combineLatest$1.combineLatestInit = combineLatest$1.combineLatest = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var argsArgArrayOrObject_1 = /* @__PURE__ */ requireArgsArgArrayOrObject();
  var from_1 = /* @__PURE__ */ requireFrom();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var args_1 = /* @__PURE__ */ requireArgs();
  var createObject_1 = /* @__PURE__ */ requireCreateObject();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  function combineLatest2() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args2);
    var resultSelector = args_1.popResultSelector(args2);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args2), observables = _a.args, keys = _a.keys;
    if (observables.length === 0) {
      return from_1.from([], scheduler);
    }
    var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
      return createObject_1.createObject(keys, values);
    } : identity_1.identity));
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
  }
  combineLatest$1.combineLatest = combineLatest2;
  function combineLatestInit(observables, scheduler, valueTransform) {
    if (valueTransform === void 0) {
      valueTransform = identity_1.identity;
    }
    return function(subscriber) {
      maybeSchedule(scheduler, function() {
        var length = observables.length;
        var values = new Array(length);
        var active = length;
        var remainingFirstValues = length;
        var _loop_1 = function(i3) {
          maybeSchedule(scheduler, function() {
            var source = from_1.from(observables[i3], scheduler);
            var hasFirstValue = false;
            source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
              values[i3] = value;
              if (!hasFirstValue) {
                hasFirstValue = true;
                remainingFirstValues--;
              }
              if (!remainingFirstValues) {
                subscriber.next(valueTransform(values.slice()));
              }
            }, function() {
              if (!--active) {
                subscriber.complete();
              }
            }));
          }, subscriber);
        };
        for (var i2 = 0; i2 < length; i2++) {
          _loop_1(i2);
        }
      }, subscriber);
    };
  }
  combineLatest$1.combineLatestInit = combineLatestInit;
  function maybeSchedule(scheduler, execute, subscription) {
    if (scheduler) {
      executeSchedule_1.executeSchedule(subscription, scheduler, execute);
    } else {
      execute();
    }
  }
  return combineLatest$1;
}
var concat$1 = {};
var concatAll = {};
var mergeAll = {};
var mergeMap = {};
var mergeInternals = {};
var hasRequiredMergeInternals;
function requireMergeInternals() {
  if (hasRequiredMergeInternals) return mergeInternals;
  hasRequiredMergeInternals = 1;
  Object.defineProperty(mergeInternals, "__esModule", { value: true });
  mergeInternals.mergeInternals = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function mergeInternals$1(source, subscriber, project, concurrent, onBeforeNext, expand2, innerSubScheduler, additionalFinalizer) {
    var buffer2 = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer2.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer2.push(value);
    };
    var doInnerSub = function(value) {
      expand2 && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand2) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer2.shift();
              if (innerSubScheduler) {
                executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer2.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }
  mergeInternals.mergeInternals = mergeInternals$1;
  return mergeInternals;
}
var hasRequiredMergeMap;
function requireMergeMap() {
  if (hasRequiredMergeMap) return mergeMap;
  hasRequiredMergeMap = 1;
  Object.defineProperty(mergeMap, "__esModule", { value: true });
  mergeMap.mergeMap = void 0;
  var map_1 = /* @__PURE__ */ requireMap();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var lift_1 = /* @__PURE__ */ requireLift();
  var mergeInternals_1 = /* @__PURE__ */ requireMergeInternals();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function mergeMap$1(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction_1.isFunction(resultSelector)) {
      return mergeMap$1(function(a2, i2) {
        return map_1.map(function(b, ii) {
          return resultSelector(a2, b, i2, ii);
        })(innerFrom_1.innerFrom(project(a2, i2)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return lift_1.operate(function(source, subscriber) {
      return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent);
    });
  }
  mergeMap.mergeMap = mergeMap$1;
  return mergeMap;
}
var hasRequiredMergeAll;
function requireMergeAll() {
  if (hasRequiredMergeAll) return mergeAll;
  hasRequiredMergeAll = 1;
  Object.defineProperty(mergeAll, "__esModule", { value: true });
  mergeAll.mergeAll = void 0;
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function mergeAll$1(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap_1.mergeMap(identity_1.identity, concurrent);
  }
  mergeAll.mergeAll = mergeAll$1;
  return mergeAll;
}
var hasRequiredConcatAll;
function requireConcatAll() {
  if (hasRequiredConcatAll) return concatAll;
  hasRequiredConcatAll = 1;
  Object.defineProperty(concatAll, "__esModule", { value: true });
  concatAll.concatAll = void 0;
  var mergeAll_1 = /* @__PURE__ */ requireMergeAll();
  function concatAll$1() {
    return mergeAll_1.mergeAll(1);
  }
  concatAll.concatAll = concatAll$1;
  return concatAll;
}
var hasRequiredConcat$1;
function requireConcat$1() {
  if (hasRequiredConcat$1) return concat$1;
  hasRequiredConcat$1 = 1;
  Object.defineProperty(concat$1, "__esModule", { value: true });
  concat$1.concat = void 0;
  var concatAll_1 = /* @__PURE__ */ requireConcatAll();
  var args_1 = /* @__PURE__ */ requireArgs();
  var from_1 = /* @__PURE__ */ requireFrom();
  function concat2() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return concatAll_1.concatAll()(from_1.from(args2, args_1.popScheduler(args2)));
  }
  concat$1.concat = concat2;
  return concat$1;
}
var connectable = {};
var defer = {};
var hasRequiredDefer;
function requireDefer() {
  if (hasRequiredDefer) return defer;
  hasRequiredDefer = 1;
  Object.defineProperty(defer, "__esModule", { value: true });
  defer.defer = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function defer$1(observableFactory) {
    return new Observable_1.Observable(function(subscriber) {
      innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
    });
  }
  defer.defer = defer$1;
  return defer;
}
var hasRequiredConnectable;
function requireConnectable() {
  if (hasRequiredConnectable) return connectable;
  hasRequiredConnectable = 1;
  Object.defineProperty(connectable, "__esModule", { value: true });
  connectable.connectable = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var defer_1 = /* @__PURE__ */ requireDefer();
  var DEFAULT_CONFIG = {
    connector: function() {
      return new Subject_1.Subject();
    },
    resetOnDisconnect: true
  };
  function connectable$1(source, config2) {
    if (config2 === void 0) {
      config2 = DEFAULT_CONFIG;
    }
    var connection = null;
    var connector = config2.connector, _a = config2.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
    var subject = connector();
    var result = new Observable_1.Observable(function(subscriber) {
      return subject.subscribe(subscriber);
    });
    result.connect = function() {
      if (!connection || connection.closed) {
        connection = defer_1.defer(function() {
          return source;
        }).subscribe(subject);
        if (resetOnDisconnect) {
          connection.add(function() {
            return subject = connector();
          });
        }
      }
      return connection;
    };
    return result;
  }
  connectable.connectable = connectable$1;
  return connectable;
}
var forkJoin = {};
var hasRequiredForkJoin;
function requireForkJoin() {
  if (hasRequiredForkJoin) return forkJoin;
  hasRequiredForkJoin = 1;
  Object.defineProperty(forkJoin, "__esModule", { value: true });
  forkJoin.forkJoin = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var argsArgArrayOrObject_1 = /* @__PURE__ */ requireArgsArgArrayOrObject();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var args_1 = /* @__PURE__ */ requireArgs();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var createObject_1 = /* @__PURE__ */ requireCreateObject();
  function forkJoin$1() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args2);
    var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args2), sources = _a.args, keys = _a.keys;
    var result = new Observable_1.Observable(function(subscriber) {
      var length = sources.length;
      if (!length) {
        subscriber.complete();
        return;
      }
      var values = new Array(length);
      var remainingCompletions = length;
      var remainingEmissions = length;
      var _loop_1 = function(sourceIndex2) {
        var hasValue = false;
        innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (!hasValue) {
            hasValue = true;
            remainingEmissions--;
          }
          values[sourceIndex2] = value;
        }, function() {
          return remainingCompletions--;
        }, void 0, function() {
          if (!remainingCompletions || !hasValue) {
            if (!remainingEmissions) {
              subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
            }
            subscriber.complete();
          }
        }));
      };
      for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
        _loop_1(sourceIndex);
      }
    });
    return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
  }
  forkJoin.forkJoin = forkJoin$1;
  return forkJoin;
}
var fromEvent = {};
var hasRequiredFromEvent;
function requireFromEvent() {
  if (hasRequiredFromEvent) return fromEvent;
  hasRequiredFromEvent = 1;
  var __read = fromEvent && fromEvent.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  Object.defineProperty(fromEvent, "__esModule", { value: true });
  fromEvent.fromEvent = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var isArrayLike_1 = /* @__PURE__ */ requireIsArrayLike();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var nodeEventEmitterMethods = ["addListener", "removeListener"];
  var eventTargetMethods = ["addEventListener", "removeEventListener"];
  var jqueryMethods = ["on", "off"];
  function fromEvent$1(target, eventName, options, resultSelector) {
    if (isFunction_1.isFunction(options)) {
      resultSelector = options;
      options = void 0;
    }
    if (resultSelector) {
      return fromEvent$1(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
      return function(handler2) {
        return target[methodName](eventName, handler2, options);
      };
    }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
    if (!add) {
      if (isArrayLike_1.isArrayLike(target)) {
        return mergeMap_1.mergeMap(function(subTarget) {
          return fromEvent$1(subTarget, eventName, options);
        })(innerFrom_1.innerFrom(target));
      }
    }
    if (!add) {
      throw new TypeError("Invalid event target");
    }
    return new Observable_1.Observable(function(subscriber) {
      var handler2 = function() {
        var args2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args2[_i] = arguments[_i];
        }
        return subscriber.next(1 < args2.length ? args2 : args2[0]);
      };
      add(handler2);
      return function() {
        return remove(handler2);
      };
    });
  }
  fromEvent.fromEvent = fromEvent$1;
  function toCommonHandlerRegistry(target, eventName) {
    return function(methodName) {
      return function(handler2) {
        return target[methodName](eventName, handler2);
      };
    };
  }
  function isNodeStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
  }
  function isJQueryStyleEventEmitter(target) {
    return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
  }
  function isEventTarget(target) {
    return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
  }
  return fromEvent;
}
var fromEventPattern = {};
var hasRequiredFromEventPattern;
function requireFromEventPattern() {
  if (hasRequiredFromEventPattern) return fromEventPattern;
  hasRequiredFromEventPattern = 1;
  Object.defineProperty(fromEventPattern, "__esModule", { value: true });
  fromEventPattern.fromEventPattern = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  function fromEventPattern$1(addHandler, removeHandler, resultSelector) {
    if (resultSelector) {
      return fromEventPattern$1(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
    }
    return new Observable_1.Observable(function(subscriber) {
      var handler2 = function() {
        var e2 = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          e2[_i] = arguments[_i];
        }
        return subscriber.next(e2.length === 1 ? e2[0] : e2);
      };
      var retValue = addHandler(handler2);
      return isFunction_1.isFunction(removeHandler) ? function() {
        return removeHandler(handler2, retValue);
      } : void 0;
    });
  }
  fromEventPattern.fromEventPattern = fromEventPattern$1;
  return fromEventPattern;
}
var generate = {};
var hasRequiredGenerate;
function requireGenerate() {
  if (hasRequiredGenerate) return generate;
  hasRequiredGenerate = 1;
  var __generator = generate && generate.__generator || function(thisArg, body) {
    var _2 = { label: 0, sent: function() {
      if (t2[0] & 1) throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y, t2, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2) throw new TypeError("Generator is already executing.");
      while (_2) try {
        if (f2 = 1, y && (t2 = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t2 = y["return"]) && t2.call(y), 0) : y.next) && !(t2 = t2.call(y, op[1])).done) return t2;
        if (y = 0, t2) op = [op[0] & 2, t2.value];
        switch (op[0]) {
          case 0:
          case 1:
            t2 = op;
            break;
          case 4:
            _2.label++;
            return { value: op[1], done: false };
          case 5:
            _2.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _2.ops.pop();
            _2.trys.pop();
            continue;
          default:
            if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _2 = 0;
              continue;
            }
            if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
              _2.label = op[1];
              break;
            }
            if (op[0] === 6 && _2.label < t2[1]) {
              _2.label = t2[1];
              t2 = op;
              break;
            }
            if (t2 && _2.label < t2[2]) {
              _2.label = t2[2];
              _2.ops.push(op);
              break;
            }
            if (t2[2]) _2.ops.pop();
            _2.trys.pop();
            continue;
        }
        op = body.call(thisArg, _2);
      } catch (e2) {
        op = [6, e2];
        y = 0;
      } finally {
        f2 = t2 = 0;
      }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(generate, "__esModule", { value: true });
  generate.generate = void 0;
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var isScheduler_1 = /* @__PURE__ */ requireIsScheduler();
  var defer_1 = /* @__PURE__ */ requireDefer();
  var scheduleIterable_1 = /* @__PURE__ */ requireScheduleIterable();
  function generate$1(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
    var _a, _b;
    var resultSelector;
    var initialState;
    if (arguments.length === 1) {
      _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler;
    } else {
      initialState = initialStateOrOptions;
      if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
        resultSelector = identity_1.identity;
        scheduler = resultSelectorOrScheduler;
      } else {
        resultSelector = resultSelectorOrScheduler;
      }
    }
    function gen() {
      var state;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            state = initialState;
            _a2.label = 1;
          case 1:
            if (!(!condition || condition(state))) return [3, 4];
            return [4, resultSelector(state)];
          case 2:
            _a2.sent();
            _a2.label = 3;
          case 3:
            state = iterate(state);
            return [3, 1];
          case 4:
            return [2];
        }
      });
    }
    return defer_1.defer(scheduler ? function() {
      return scheduleIterable_1.scheduleIterable(gen(), scheduler);
    } : gen);
  }
  generate.generate = generate$1;
  return generate;
}
var iif = {};
var hasRequiredIif;
function requireIif() {
  if (hasRequiredIif) return iif;
  hasRequiredIif = 1;
  Object.defineProperty(iif, "__esModule", { value: true });
  iif.iif = void 0;
  var defer_1 = /* @__PURE__ */ requireDefer();
  function iif$1(condition, trueResult, falseResult) {
    return defer_1.defer(function() {
      return condition() ? trueResult : falseResult;
    });
  }
  iif.iif = iif$1;
  return iif;
}
var interval = {};
var timer = {};
var hasRequiredTimer;
function requireTimer() {
  if (hasRequiredTimer) return timer;
  hasRequiredTimer = 1;
  Object.defineProperty(timer, "__esModule", { value: true });
  timer.timer = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var async_1 = /* @__PURE__ */ requireAsync();
  var isScheduler_1 = /* @__PURE__ */ requireIsScheduler();
  var isDate_1 = /* @__PURE__ */ requireIsDate();
  function timer$1(dueTime, intervalOrScheduler, scheduler) {
    if (dueTime === void 0) {
      dueTime = 0;
    }
    if (scheduler === void 0) {
      scheduler = async_1.async;
    }
    var intervalDuration = -1;
    if (intervalOrScheduler != null) {
      if (isScheduler_1.isScheduler(intervalOrScheduler)) {
        scheduler = intervalOrScheduler;
      } else {
        intervalDuration = intervalOrScheduler;
      }
    }
    return new Observable_1.Observable(function(subscriber) {
      var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
      if (due < 0) {
        due = 0;
      }
      var n2 = 0;
      return scheduler.schedule(function() {
        if (!subscriber.closed) {
          subscriber.next(n2++);
          if (0 <= intervalDuration) {
            this.schedule(void 0, intervalDuration);
          } else {
            subscriber.complete();
          }
        }
      }, due);
    });
  }
  timer.timer = timer$1;
  return timer;
}
var hasRequiredInterval;
function requireInterval() {
  if (hasRequiredInterval) return interval;
  hasRequiredInterval = 1;
  Object.defineProperty(interval, "__esModule", { value: true });
  interval.interval = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var timer_1 = /* @__PURE__ */ requireTimer();
  function interval$1(period, scheduler) {
    if (period === void 0) {
      period = 0;
    }
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    if (period < 0) {
      period = 0;
    }
    return timer_1.timer(period, period, scheduler);
  }
  interval.interval = interval$1;
  return interval;
}
var merge$1 = {};
var hasRequiredMerge$1;
function requireMerge$1() {
  if (hasRequiredMerge$1) return merge$1;
  hasRequiredMerge$1 = 1;
  Object.defineProperty(merge$1, "__esModule", { value: true });
  merge$1.merge = void 0;
  var mergeAll_1 = /* @__PURE__ */ requireMergeAll();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var empty_1 = /* @__PURE__ */ requireEmpty();
  var args_1 = /* @__PURE__ */ requireArgs();
  var from_1 = /* @__PURE__ */ requireFrom();
  function merge2() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args2);
    var concurrent = args_1.popNumber(args2, Infinity);
    var sources = args2;
    return !sources.length ? empty_1.EMPTY : sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
  }
  merge$1.merge = merge2;
  return merge$1;
}
var never = {};
var hasRequiredNever;
function requireNever() {
  if (hasRequiredNever) return never;
  hasRequiredNever = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.never = exports.NEVER = void 0;
    var Observable_1 = /* @__PURE__ */ requireObservable();
    var noop_1 = /* @__PURE__ */ requireNoop();
    exports.NEVER = new Observable_1.Observable(noop_1.noop);
    function never2() {
      return exports.NEVER;
    }
    exports.never = never2;
  })(never);
  return never;
}
var onErrorResumeNext = {};
var argsOrArgArray = {};
var hasRequiredArgsOrArgArray;
function requireArgsOrArgArray() {
  if (hasRequiredArgsOrArgArray) return argsOrArgArray;
  hasRequiredArgsOrArgArray = 1;
  Object.defineProperty(argsOrArgArray, "__esModule", { value: true });
  argsOrArgArray.argsOrArgArray = void 0;
  var isArray = Array.isArray;
  function argsOrArgArray$1(args2) {
    return args2.length === 1 && isArray(args2[0]) ? args2[0] : args2;
  }
  argsOrArgArray.argsOrArgArray = argsOrArgArray$1;
  return argsOrArgArray;
}
var hasRequiredOnErrorResumeNext;
function requireOnErrorResumeNext() {
  if (hasRequiredOnErrorResumeNext) return onErrorResumeNext;
  hasRequiredOnErrorResumeNext = 1;
  Object.defineProperty(onErrorResumeNext, "__esModule", { value: true });
  onErrorResumeNext.onErrorResumeNext = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function onErrorResumeNext$1() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return new Observable_1.Observable(function(subscriber) {
      var sourceIndex = 0;
      var subscribeNext = function() {
        if (sourceIndex < nextSources.length) {
          var nextSource = void 0;
          try {
            nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
          } catch (err) {
            subscribeNext();
            return;
          }
          var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, void 0, noop_1.noop, noop_1.noop);
          nextSource.subscribe(innerSubscriber);
          innerSubscriber.add(subscribeNext);
        } else {
          subscriber.complete();
        }
      };
      subscribeNext();
    });
  }
  onErrorResumeNext.onErrorResumeNext = onErrorResumeNext$1;
  return onErrorResumeNext;
}
var pairs = {};
var hasRequiredPairs;
function requirePairs() {
  if (hasRequiredPairs) return pairs;
  hasRequiredPairs = 1;
  Object.defineProperty(pairs, "__esModule", { value: true });
  pairs.pairs = void 0;
  var from_1 = /* @__PURE__ */ requireFrom();
  function pairs$1(obj, scheduler) {
    return from_1.from(Object.entries(obj), scheduler);
  }
  pairs.pairs = pairs$1;
  return pairs;
}
var partition$1 = {};
var not = {};
var hasRequiredNot;
function requireNot() {
  if (hasRequiredNot) return not;
  hasRequiredNot = 1;
  Object.defineProperty(not, "__esModule", { value: true });
  not.not = void 0;
  function not$1(pred, thisArg) {
    return function(value, index) {
      return !pred.call(thisArg, value, index);
    };
  }
  not.not = not$1;
  return not;
}
var filter = {};
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter) return filter;
  hasRequiredFilter = 1;
  Object.defineProperty(filter, "__esModule", { value: true });
  filter.filter = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function filter$1(predicate, thisArg) {
    return lift_1.operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return predicate.call(thisArg, value, index++) && subscriber.next(value);
      }));
    });
  }
  filter.filter = filter$1;
  return filter;
}
var hasRequiredPartition$1;
function requirePartition$1() {
  if (hasRequiredPartition$1) return partition$1;
  hasRequiredPartition$1 = 1;
  Object.defineProperty(partition$1, "__esModule", { value: true });
  partition$1.partition = void 0;
  var not_1 = /* @__PURE__ */ requireNot();
  var filter_1 = /* @__PURE__ */ requireFilter();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function partition2(source, predicate, thisArg) {
    return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
  }
  partition$1.partition = partition2;
  return partition$1;
}
var race$1 = {};
var hasRequiredRace$1;
function requireRace$1() {
  if (hasRequiredRace$1) return race$1;
  hasRequiredRace$1 = 1;
  Object.defineProperty(race$1, "__esModule", { value: true });
  race$1.raceInit = race$1.race = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function race2() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    sources = argsOrArgArray_1.argsOrArgArray(sources);
    return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
  }
  race$1.race = race2;
  function raceInit(sources) {
    return function(subscriber) {
      var subscriptions = [];
      var _loop_1 = function(i3) {
        subscriptions.push(innerFrom_1.innerFrom(sources[i3]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (subscriptions) {
            for (var s2 = 0; s2 < subscriptions.length; s2++) {
              s2 !== i3 && subscriptions[s2].unsubscribe();
            }
            subscriptions = null;
          }
          subscriber.next(value);
        })));
      };
      for (var i2 = 0; subscriptions && !subscriber.closed && i2 < sources.length; i2++) {
        _loop_1(i2);
      }
    };
  }
  race$1.raceInit = raceInit;
  return race$1;
}
var range = {};
var hasRequiredRange;
function requireRange() {
  if (hasRequiredRange) return range;
  hasRequiredRange = 1;
  Object.defineProperty(range, "__esModule", { value: true });
  range.range = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var empty_1 = /* @__PURE__ */ requireEmpty();
  function range$1(start, count2, scheduler) {
    if (count2 == null) {
      count2 = start;
      start = 0;
    }
    if (count2 <= 0) {
      return empty_1.EMPTY;
    }
    var end = count2 + start;
    return new Observable_1.Observable(scheduler ? function(subscriber) {
      var n2 = start;
      return scheduler.schedule(function() {
        if (n2 < end) {
          subscriber.next(n2++);
          this.schedule();
        } else {
          subscriber.complete();
        }
      });
    } : function(subscriber) {
      var n2 = start;
      while (n2 < end && !subscriber.closed) {
        subscriber.next(n2++);
      }
      subscriber.complete();
    });
  }
  range.range = range$1;
  return range;
}
var using = {};
var hasRequiredUsing;
function requireUsing() {
  if (hasRequiredUsing) return using;
  hasRequiredUsing = 1;
  Object.defineProperty(using, "__esModule", { value: true });
  using.using = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var empty_1 = /* @__PURE__ */ requireEmpty();
  function using$1(resourceFactory, observableFactory) {
    return new Observable_1.Observable(function(subscriber) {
      var resource = resourceFactory();
      var result = observableFactory(resource);
      var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
      source.subscribe(subscriber);
      return function() {
        if (resource) {
          resource.unsubscribe();
        }
      };
    });
  }
  using.using = using$1;
  return using;
}
var zip$1 = {};
var hasRequiredZip$1;
function requireZip$1() {
  if (hasRequiredZip$1) return zip$1;
  hasRequiredZip$1 = 1;
  var __read = zip$1 && zip$1.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = zip$1 && zip$1.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(zip$1, "__esModule", { value: true });
  zip$1.zip = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var empty_1 = /* @__PURE__ */ requireEmpty();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var args_1 = /* @__PURE__ */ requireArgs();
  function zip2() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args2);
    var sources = argsOrArgArray_1.argsOrArgArray(args2);
    return sources.length ? new Observable_1.Observable(function(subscriber) {
      var buffers = sources.map(function() {
        return [];
      });
      var completed = sources.map(function() {
        return false;
      });
      subscriber.add(function() {
        buffers = completed = null;
      });
      var _loop_1 = function(sourceIndex2) {
        innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          buffers[sourceIndex2].push(value);
          if (buffers.every(function(buffer2) {
            return buffer2.length;
          })) {
            var result = buffers.map(function(buffer2) {
              return buffer2.shift();
            });
            subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
            if (buffers.some(function(buffer2, i2) {
              return !buffer2.length && completed[i2];
            })) {
              subscriber.complete();
            }
          }
        }, function() {
          completed[sourceIndex2] = true;
          !buffers[sourceIndex2].length && subscriber.complete();
        }));
      };
      for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
        _loop_1(sourceIndex);
      }
      return function() {
        buffers = completed = null;
      };
    }) : empty_1.EMPTY;
  }
  zip$1.zip = zip2;
  return zip$1;
}
var types = {};
var hasRequiredTypes;
function requireTypes() {
  if (hasRequiredTypes) return types;
  hasRequiredTypes = 1;
  Object.defineProperty(types, "__esModule", { value: true });
  return types;
}
var audit = {};
var hasRequiredAudit;
function requireAudit() {
  if (hasRequiredAudit) return audit;
  hasRequiredAudit = 1;
  Object.defineProperty(audit, "__esModule", { value: true });
  audit.audit = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function audit$1(durationSelector) {
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      var durationSubscriber = null;
      var isComplete = false;
      var endDuration = function() {
        durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
        durationSubscriber = null;
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
        isComplete && subscriber.complete();
      };
      var cleanupDuration = function() {
        durationSubscriber = null;
        isComplete && subscriber.complete();
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        lastValue = value;
        if (!durationSubscriber) {
          innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
        }
      }, function() {
        isComplete = true;
        (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
      }));
    });
  }
  audit.audit = audit$1;
  return audit;
}
var auditTime = {};
var hasRequiredAuditTime;
function requireAuditTime() {
  if (hasRequiredAuditTime) return auditTime;
  hasRequiredAuditTime = 1;
  Object.defineProperty(auditTime, "__esModule", { value: true });
  auditTime.auditTime = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var audit_1 = /* @__PURE__ */ requireAudit();
  var timer_1 = /* @__PURE__ */ requireTimer();
  function auditTime$1(duration, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    return audit_1.audit(function() {
      return timer_1.timer(duration, scheduler);
    });
  }
  auditTime.auditTime = auditTime$1;
  return auditTime;
}
var buffer = {};
var hasRequiredBuffer;
function requireBuffer() {
  if (hasRequiredBuffer) return buffer;
  hasRequiredBuffer = 1;
  Object.defineProperty(buffer, "__esModule", { value: true });
  buffer.buffer = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function buffer$1(closingNotifier) {
    return lift_1.operate(function(source, subscriber) {
      var currentBuffer = [];
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return currentBuffer.push(value);
      }, function() {
        subscriber.next(currentBuffer);
        subscriber.complete();
      }));
      innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        var b = currentBuffer;
        currentBuffer = [];
        subscriber.next(b);
      }, noop_1.noop));
      return function() {
        currentBuffer = null;
      };
    });
  }
  buffer.buffer = buffer$1;
  return buffer;
}
var bufferCount = {};
var hasRequiredBufferCount;
function requireBufferCount() {
  if (hasRequiredBufferCount) return bufferCount;
  hasRequiredBufferCount = 1;
  var __values = bufferCount && bufferCount.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(bufferCount, "__esModule", { value: true });
  bufferCount.bufferCount = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  function bufferCount$1(bufferSize, startBufferEvery) {
    if (startBufferEvery === void 0) {
      startBufferEvery = null;
    }
    startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
    return lift_1.operate(function(source, subscriber) {
      var buffers = [];
      var count2 = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a, e_2, _b;
        var toEmit = null;
        if (count2++ % startBufferEvery === 0) {
          buffers.push([]);
        }
        try {
          for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
            var buffer2 = buffers_1_1.value;
            buffer2.push(value);
            if (bufferSize <= buffer2.length) {
              toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
              toEmit.push(buffer2);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        if (toEmit) {
          try {
            for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
              var buffer2 = toEmit_1_1.value;
              arrRemove_1.arrRemove(buffers, buffer2);
              subscriber.next(buffer2);
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
            } finally {
              if (e_2) throw e_2.error;
            }
          }
        }
      }, function() {
        var e_3, _a;
        try {
          for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
            var buffer2 = buffers_2_1.value;
            subscriber.next(buffer2);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
          } finally {
            if (e_3) throw e_3.error;
          }
        }
        subscriber.complete();
      }, void 0, function() {
        buffers = null;
      }));
    });
  }
  bufferCount.bufferCount = bufferCount$1;
  return bufferCount;
}
var bufferTime = {};
var hasRequiredBufferTime;
function requireBufferTime() {
  if (hasRequiredBufferTime) return bufferTime;
  hasRequiredBufferTime = 1;
  var __values = bufferTime && bufferTime.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(bufferTime, "__esModule", { value: true });
  bufferTime.bufferTime = void 0;
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  var async_1 = /* @__PURE__ */ requireAsync();
  var args_1 = /* @__PURE__ */ requireArgs();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  function bufferTime$1(bufferTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxBufferSize = otherArgs[1] || Infinity;
    return lift_1.operate(function(source, subscriber) {
      var bufferRecords = [];
      var restartOnEmit = false;
      var emit = function(record) {
        var buffer2 = record.buffer, subs = record.subs;
        subs.unsubscribe();
        arrRemove_1.arrRemove(bufferRecords, record);
        subscriber.next(buffer2);
        restartOnEmit && startBuffer();
      };
      var startBuffer = function() {
        if (bufferRecords) {
          var subs = new Subscription_1.Subscription();
          subscriber.add(subs);
          var buffer2 = [];
          var record_1 = {
            buffer: buffer2,
            subs
          };
          bufferRecords.push(record_1);
          executeSchedule_1.executeSchedule(subs, scheduler, function() {
            return emit(record_1);
          }, bufferTimeSpan);
        }
      };
      if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
        executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
      } else {
        restartOnEmit = true;
      }
      startBuffer();
      var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a2;
        var recordsCopy = bufferRecords.slice();
        try {
          for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
            var record = recordsCopy_1_1.value;
            var buffer2 = record.buffer;
            buffer2.push(value);
            maxBufferSize <= buffer2.length && emit(record);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }, function() {
        while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
          subscriber.next(bufferRecords.shift().buffer);
        }
        bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
        subscriber.complete();
        subscriber.unsubscribe();
      }, void 0, function() {
        return bufferRecords = null;
      });
      source.subscribe(bufferTimeSubscriber);
    });
  }
  bufferTime.bufferTime = bufferTime$1;
  return bufferTime;
}
var bufferToggle = {};
var hasRequiredBufferToggle;
function requireBufferToggle() {
  if (hasRequiredBufferToggle) return bufferToggle;
  hasRequiredBufferToggle = 1;
  var __values = bufferToggle && bufferToggle.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(bufferToggle, "__esModule", { value: true });
  bufferToggle.bufferToggle = void 0;
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var lift_1 = /* @__PURE__ */ requireLift();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  function bufferToggle$1(openings, closingSelector) {
    return lift_1.operate(function(source, subscriber) {
      var buffers = [];
      innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
        var buffer2 = [];
        buffers.push(buffer2);
        var closingSubscription = new Subscription_1.Subscription();
        var emitBuffer = function() {
          arrRemove_1.arrRemove(buffers, buffer2);
          subscriber.next(buffer2);
          closingSubscription.unsubscribe();
        };
        closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
      }, noop_1.noop));
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a;
        try {
          for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
            var buffer2 = buffers_1_1.value;
            buffer2.push(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }, function() {
        while (buffers.length > 0) {
          subscriber.next(buffers.shift());
        }
        subscriber.complete();
      }));
    });
  }
  bufferToggle.bufferToggle = bufferToggle$1;
  return bufferToggle;
}
var bufferWhen = {};
var hasRequiredBufferWhen;
function requireBufferWhen() {
  if (hasRequiredBufferWhen) return bufferWhen;
  hasRequiredBufferWhen = 1;
  Object.defineProperty(bufferWhen, "__esModule", { value: true });
  bufferWhen.bufferWhen = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function bufferWhen$1(closingSelector) {
    return lift_1.operate(function(source, subscriber) {
      var buffer2 = null;
      var closingSubscriber = null;
      var openBuffer = function() {
        closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
        var b = buffer2;
        buffer2 = [];
        b && subscriber.next(b);
        innerFrom_1.innerFrom(closingSelector()).subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop));
      };
      openBuffer();
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return buffer2 === null || buffer2 === void 0 ? void 0 : buffer2.push(value);
      }, function() {
        buffer2 && subscriber.next(buffer2);
        subscriber.complete();
      }, void 0, function() {
        return buffer2 = closingSubscriber = null;
      }));
    });
  }
  bufferWhen.bufferWhen = bufferWhen$1;
  return bufferWhen;
}
var catchError = {};
var hasRequiredCatchError;
function requireCatchError() {
  if (hasRequiredCatchError) return catchError;
  hasRequiredCatchError = 1;
  Object.defineProperty(catchError, "__esModule", { value: true });
  catchError.catchError = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var lift_1 = /* @__PURE__ */ requireLift();
  function catchError$1(selector) {
    return lift_1.operate(function(source, subscriber) {
      var innerSub = null;
      var syncUnsub = false;
      var handledResult;
      innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
        handledResult = innerFrom_1.innerFrom(selector(err, catchError$1(selector)(source)));
        if (innerSub) {
          innerSub.unsubscribe();
          innerSub = null;
          handledResult.subscribe(subscriber);
        } else {
          syncUnsub = true;
        }
      }));
      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      }
    });
  }
  catchError.catchError = catchError$1;
  return catchError;
}
var combineAll = {};
var combineLatestAll = {};
var joinAllInternals = {};
var toArray = {};
var reduce = {};
var scanInternals = {};
var hasRequiredScanInternals;
function requireScanInternals() {
  if (hasRequiredScanInternals) return scanInternals;
  hasRequiredScanInternals = 1;
  Object.defineProperty(scanInternals, "__esModule", { value: true });
  scanInternals.scanInternals = void 0;
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function scanInternals$1(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
    return function(source, subscriber) {
      var hasState = hasSeed;
      var state = seed;
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var i2 = index++;
        state = hasState ? accumulator(state, value, i2) : (hasState = true, value);
        emitOnNext && subscriber.next(state);
      }, emitBeforeComplete && function() {
        hasState && subscriber.next(state);
        subscriber.complete();
      }));
    };
  }
  scanInternals.scanInternals = scanInternals$1;
  return scanInternals;
}
var hasRequiredReduce;
function requireReduce() {
  if (hasRequiredReduce) return reduce;
  hasRequiredReduce = 1;
  Object.defineProperty(reduce, "__esModule", { value: true });
  reduce.reduce = void 0;
  var scanInternals_1 = /* @__PURE__ */ requireScanInternals();
  var lift_1 = /* @__PURE__ */ requireLift();
  function reduce$1(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
  }
  reduce.reduce = reduce$1;
  return reduce;
}
var hasRequiredToArray;
function requireToArray() {
  if (hasRequiredToArray) return toArray;
  hasRequiredToArray = 1;
  Object.defineProperty(toArray, "__esModule", { value: true });
  toArray.toArray = void 0;
  var reduce_1 = /* @__PURE__ */ requireReduce();
  var lift_1 = /* @__PURE__ */ requireLift();
  var arrReducer = function(arr, value) {
    return arr.push(value), arr;
  };
  function toArray$1() {
    return lift_1.operate(function(source, subscriber) {
      reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
    });
  }
  toArray.toArray = toArray$1;
  return toArray;
}
var hasRequiredJoinAllInternals;
function requireJoinAllInternals() {
  if (hasRequiredJoinAllInternals) return joinAllInternals;
  hasRequiredJoinAllInternals = 1;
  Object.defineProperty(joinAllInternals, "__esModule", { value: true });
  joinAllInternals.joinAllInternals = void 0;
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var pipe_1 = /* @__PURE__ */ requirePipe();
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var toArray_1 = /* @__PURE__ */ requireToArray();
  function joinAllInternals$1(joinFn, project) {
    return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function(sources) {
      return joinFn(sources);
    }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
  }
  joinAllInternals.joinAllInternals = joinAllInternals$1;
  return joinAllInternals;
}
var hasRequiredCombineLatestAll;
function requireCombineLatestAll() {
  if (hasRequiredCombineLatestAll) return combineLatestAll;
  hasRequiredCombineLatestAll = 1;
  Object.defineProperty(combineLatestAll, "__esModule", { value: true });
  combineLatestAll.combineLatestAll = void 0;
  var combineLatest_1 = /* @__PURE__ */ requireCombineLatest$1();
  var joinAllInternals_1 = /* @__PURE__ */ requireJoinAllInternals();
  function combineLatestAll$1(project) {
    return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
  }
  combineLatestAll.combineLatestAll = combineLatestAll$1;
  return combineLatestAll;
}
var hasRequiredCombineAll;
function requireCombineAll() {
  if (hasRequiredCombineAll) return combineAll;
  hasRequiredCombineAll = 1;
  Object.defineProperty(combineAll, "__esModule", { value: true });
  combineAll.combineAll = void 0;
  var combineLatestAll_1 = /* @__PURE__ */ requireCombineLatestAll();
  combineAll.combineAll = combineLatestAll_1.combineLatestAll;
  return combineAll;
}
var combineLatestWith = {};
var combineLatest = {};
var hasRequiredCombineLatest;
function requireCombineLatest() {
  if (hasRequiredCombineLatest) return combineLatest;
  hasRequiredCombineLatest = 1;
  var __read = combineLatest && combineLatest.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = combineLatest && combineLatest.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(combineLatest, "__esModule", { value: true });
  combineLatest.combineLatest = void 0;
  var combineLatest_1 = /* @__PURE__ */ requireCombineLatest$1();
  var lift_1 = /* @__PURE__ */ requireLift();
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var mapOneOrManyArgs_1 = /* @__PURE__ */ requireMapOneOrManyArgs();
  var pipe_1 = /* @__PURE__ */ requirePipe();
  var args_1 = /* @__PURE__ */ requireArgs();
  function combineLatest$12() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var resultSelector = args_1.popResultSelector(args2);
    return resultSelector ? pipe_1.pipe(combineLatest$12.apply(void 0, __spreadArray([], __read(args2))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : lift_1.operate(function(source, subscriber) {
      combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args2))))(subscriber);
    });
  }
  combineLatest.combineLatest = combineLatest$12;
  return combineLatest;
}
var hasRequiredCombineLatestWith;
function requireCombineLatestWith() {
  if (hasRequiredCombineLatestWith) return combineLatestWith;
  hasRequiredCombineLatestWith = 1;
  var __read = combineLatestWith && combineLatestWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = combineLatestWith && combineLatestWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(combineLatestWith, "__esModule", { value: true });
  combineLatestWith.combineLatestWith = void 0;
  var combineLatest_1 = /* @__PURE__ */ requireCombineLatest();
  function combineLatestWith$1() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
  }
  combineLatestWith.combineLatestWith = combineLatestWith$1;
  return combineLatestWith;
}
var concatMap = {};
var hasRequiredConcatMap;
function requireConcatMap() {
  if (hasRequiredConcatMap) return concatMap;
  hasRequiredConcatMap = 1;
  Object.defineProperty(concatMap, "__esModule", { value: true });
  concatMap.concatMap = void 0;
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function concatMap$1(project, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
  }
  concatMap.concatMap = concatMap$1;
  return concatMap;
}
var concatMapTo = {};
var hasRequiredConcatMapTo;
function requireConcatMapTo() {
  if (hasRequiredConcatMapTo) return concatMapTo;
  hasRequiredConcatMapTo = 1;
  Object.defineProperty(concatMapTo, "__esModule", { value: true });
  concatMapTo.concatMapTo = void 0;
  var concatMap_1 = /* @__PURE__ */ requireConcatMap();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function concatMapTo$1(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function() {
      return innerObservable;
    }, resultSelector) : concatMap_1.concatMap(function() {
      return innerObservable;
    });
  }
  concatMapTo.concatMapTo = concatMapTo$1;
  return concatMapTo;
}
var concatWith = {};
var concat = {};
var hasRequiredConcat;
function requireConcat() {
  if (hasRequiredConcat) return concat;
  hasRequiredConcat = 1;
  var __read = concat && concat.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = concat && concat.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(concat, "__esModule", { value: true });
  concat.concat = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var concatAll_1 = /* @__PURE__ */ requireConcatAll();
  var args_1 = /* @__PURE__ */ requireArgs();
  var from_1 = /* @__PURE__ */ requireFrom();
  function concat$12() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args2);
    return lift_1.operate(function(source, subscriber) {
      concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args2)), scheduler)).subscribe(subscriber);
    });
  }
  concat.concat = concat$12;
  return concat;
}
var hasRequiredConcatWith;
function requireConcatWith() {
  if (hasRequiredConcatWith) return concatWith;
  hasRequiredConcatWith = 1;
  var __read = concatWith && concatWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = concatWith && concatWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(concatWith, "__esModule", { value: true });
  concatWith.concatWith = void 0;
  var concat_1 = /* @__PURE__ */ requireConcat();
  function concatWith$1() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
  }
  concatWith.concatWith = concatWith$1;
  return concatWith;
}
var connect = {};
var fromSubscribable = {};
var hasRequiredFromSubscribable;
function requireFromSubscribable() {
  if (hasRequiredFromSubscribable) return fromSubscribable;
  hasRequiredFromSubscribable = 1;
  Object.defineProperty(fromSubscribable, "__esModule", { value: true });
  fromSubscribable.fromSubscribable = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  function fromSubscribable$1(subscribable) {
    return new Observable_1.Observable(function(subscriber) {
      return subscribable.subscribe(subscriber);
    });
  }
  fromSubscribable.fromSubscribable = fromSubscribable$1;
  return fromSubscribable;
}
var hasRequiredConnect;
function requireConnect() {
  if (hasRequiredConnect) return connect;
  hasRequiredConnect = 1;
  Object.defineProperty(connect, "__esModule", { value: true });
  connect.connect = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var lift_1 = /* @__PURE__ */ requireLift();
  var fromSubscribable_1 = /* @__PURE__ */ requireFromSubscribable();
  var DEFAULT_CONFIG = {
    connector: function() {
      return new Subject_1.Subject();
    }
  };
  function connect$1(selector, config2) {
    if (config2 === void 0) {
      config2 = DEFAULT_CONFIG;
    }
    var connector = config2.connector;
    return lift_1.operate(function(source, subscriber) {
      var subject = connector();
      innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
      subscriber.add(source.subscribe(subject));
    });
  }
  connect.connect = connect$1;
  return connect;
}
var count = {};
var hasRequiredCount;
function requireCount() {
  if (hasRequiredCount) return count;
  hasRequiredCount = 1;
  Object.defineProperty(count, "__esModule", { value: true });
  count.count = void 0;
  var reduce_1 = /* @__PURE__ */ requireReduce();
  function count$1(predicate) {
    return reduce_1.reduce(function(total, value, i2) {
      return !predicate || predicate(value, i2) ? total + 1 : total;
    }, 0);
  }
  count.count = count$1;
  return count;
}
var debounce = {};
var hasRequiredDebounce;
function requireDebounce() {
  if (hasRequiredDebounce) return debounce;
  hasRequiredDebounce = 1;
  Object.defineProperty(debounce, "__esModule", { value: true });
  debounce.debounce = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function debounce$1(durationSelector) {
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      var durationSubscriber = null;
      var emit = function() {
        durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
        durationSubscriber = null;
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
        hasValue = true;
        lastValue = value;
        durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
        innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
      }, function() {
        emit();
        subscriber.complete();
      }, void 0, function() {
        lastValue = durationSubscriber = null;
      }));
    });
  }
  debounce.debounce = debounce$1;
  return debounce;
}
var debounceTime = {};
var hasRequiredDebounceTime;
function requireDebounceTime() {
  if (hasRequiredDebounceTime) return debounceTime;
  hasRequiredDebounceTime = 1;
  Object.defineProperty(debounceTime, "__esModule", { value: true });
  debounceTime.debounceTime = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function debounceTime$1(dueTime, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    return lift_1.operate(function(source, subscriber) {
      var activeTask = null;
      var lastValue = null;
      var lastTime = null;
      var emit = function() {
        if (activeTask) {
          activeTask.unsubscribe();
          activeTask = null;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      };
      function emitWhenIdle() {
        var targetTime = lastTime + dueTime;
        var now = scheduler.now();
        if (now < targetTime) {
          activeTask = this.schedule(void 0, targetTime - now);
          subscriber.add(activeTask);
          return;
        }
        emit();
      }
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        lastValue = value;
        lastTime = scheduler.now();
        if (!activeTask) {
          activeTask = scheduler.schedule(emitWhenIdle, dueTime);
          subscriber.add(activeTask);
        }
      }, function() {
        emit();
        subscriber.complete();
      }, void 0, function() {
        lastValue = activeTask = null;
      }));
    });
  }
  debounceTime.debounceTime = debounceTime$1;
  return debounceTime;
}
var defaultIfEmpty = {};
var hasRequiredDefaultIfEmpty;
function requireDefaultIfEmpty() {
  if (hasRequiredDefaultIfEmpty) return defaultIfEmpty;
  hasRequiredDefaultIfEmpty = 1;
  Object.defineProperty(defaultIfEmpty, "__esModule", { value: true });
  defaultIfEmpty.defaultIfEmpty = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function defaultIfEmpty$1(defaultValue) {
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        subscriber.next(value);
      }, function() {
        if (!hasValue) {
          subscriber.next(defaultValue);
        }
        subscriber.complete();
      }));
    });
  }
  defaultIfEmpty.defaultIfEmpty = defaultIfEmpty$1;
  return defaultIfEmpty;
}
var delay = {};
var delayWhen = {};
var take = {};
var hasRequiredTake;
function requireTake() {
  if (hasRequiredTake) return take;
  hasRequiredTake = 1;
  Object.defineProperty(take, "__esModule", { value: true });
  take.take = void 0;
  var empty_1 = /* @__PURE__ */ requireEmpty();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function take$1(count2) {
    return count2 <= 0 ? function() {
      return empty_1.EMPTY;
    } : lift_1.operate(function(source, subscriber) {
      var seen = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        if (++seen <= count2) {
          subscriber.next(value);
          if (count2 <= seen) {
            subscriber.complete();
          }
        }
      }));
    });
  }
  take.take = take$1;
  return take;
}
var ignoreElements = {};
var hasRequiredIgnoreElements;
function requireIgnoreElements() {
  if (hasRequiredIgnoreElements) return ignoreElements;
  hasRequiredIgnoreElements = 1;
  Object.defineProperty(ignoreElements, "__esModule", { value: true });
  ignoreElements.ignoreElements = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  function ignoreElements$1() {
    return lift_1.operate(function(source, subscriber) {
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
    });
  }
  ignoreElements.ignoreElements = ignoreElements$1;
  return ignoreElements;
}
var mapTo = {};
var hasRequiredMapTo;
function requireMapTo() {
  if (hasRequiredMapTo) return mapTo;
  hasRequiredMapTo = 1;
  Object.defineProperty(mapTo, "__esModule", { value: true });
  mapTo.mapTo = void 0;
  var map_1 = /* @__PURE__ */ requireMap();
  function mapTo$1(value) {
    return map_1.map(function() {
      return value;
    });
  }
  mapTo.mapTo = mapTo$1;
  return mapTo;
}
var hasRequiredDelayWhen;
function requireDelayWhen() {
  if (hasRequiredDelayWhen) return delayWhen;
  hasRequiredDelayWhen = 1;
  Object.defineProperty(delayWhen, "__esModule", { value: true });
  delayWhen.delayWhen = void 0;
  var concat_1 = /* @__PURE__ */ requireConcat$1();
  var take_1 = /* @__PURE__ */ requireTake();
  var ignoreElements_1 = /* @__PURE__ */ requireIgnoreElements();
  var mapTo_1 = /* @__PURE__ */ requireMapTo();
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function delayWhen$1(delayDurationSelector, subscriptionDelay) {
    if (subscriptionDelay) {
      return function(source) {
        return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen$1(delayDurationSelector)));
      };
    }
    return mergeMap_1.mergeMap(function(value, index) {
      return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value));
    });
  }
  delayWhen.delayWhen = delayWhen$1;
  return delayWhen;
}
var hasRequiredDelay;
function requireDelay() {
  if (hasRequiredDelay) return delay;
  hasRequiredDelay = 1;
  Object.defineProperty(delay, "__esModule", { value: true });
  delay.delay = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var delayWhen_1 = /* @__PURE__ */ requireDelayWhen();
  var timer_1 = /* @__PURE__ */ requireTimer();
  function delay$1(due, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    var duration = timer_1.timer(due, scheduler);
    return delayWhen_1.delayWhen(function() {
      return duration;
    });
  }
  delay.delay = delay$1;
  return delay;
}
var dematerialize = {};
var hasRequiredDematerialize;
function requireDematerialize() {
  if (hasRequiredDematerialize) return dematerialize;
  hasRequiredDematerialize = 1;
  Object.defineProperty(dematerialize, "__esModule", { value: true });
  dematerialize.dematerialize = void 0;
  var Notification_1 = /* @__PURE__ */ requireNotification();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function dematerialize$1() {
    return lift_1.operate(function(source, subscriber) {
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(notification) {
        return Notification_1.observeNotification(notification, subscriber);
      }));
    });
  }
  dematerialize.dematerialize = dematerialize$1;
  return dematerialize;
}
var distinct = {};
var hasRequiredDistinct;
function requireDistinct() {
  if (hasRequiredDistinct) return distinct;
  hasRequiredDistinct = 1;
  Object.defineProperty(distinct, "__esModule", { value: true });
  distinct.distinct = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function distinct$1(keySelector, flushes) {
    return lift_1.operate(function(source, subscriber) {
      var distinctKeys = /* @__PURE__ */ new Set();
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var key = keySelector ? keySelector(value) : value;
        if (!distinctKeys.has(key)) {
          distinctKeys.add(key);
          subscriber.next(value);
        }
      }));
      flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        return distinctKeys.clear();
      }, noop_1.noop));
    });
  }
  distinct.distinct = distinct$1;
  return distinct;
}
var distinctUntilChanged = {};
var hasRequiredDistinctUntilChanged;
function requireDistinctUntilChanged() {
  if (hasRequiredDistinctUntilChanged) return distinctUntilChanged;
  hasRequiredDistinctUntilChanged = 1;
  Object.defineProperty(distinctUntilChanged, "__esModule", { value: true });
  distinctUntilChanged.distinctUntilChanged = void 0;
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function distinctUntilChanged$1(comparator, keySelector) {
    if (keySelector === void 0) {
      keySelector = identity_1.identity;
    }
    comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
    return lift_1.operate(function(source, subscriber) {
      var previousKey;
      var first2 = true;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var currentKey = keySelector(value);
        if (first2 || !comparator(previousKey, currentKey)) {
          first2 = false;
          previousKey = currentKey;
          subscriber.next(value);
        }
      }));
    });
  }
  distinctUntilChanged.distinctUntilChanged = distinctUntilChanged$1;
  function defaultCompare(a2, b) {
    return a2 === b;
  }
  return distinctUntilChanged;
}
var distinctUntilKeyChanged = {};
var hasRequiredDistinctUntilKeyChanged;
function requireDistinctUntilKeyChanged() {
  if (hasRequiredDistinctUntilKeyChanged) return distinctUntilKeyChanged;
  hasRequiredDistinctUntilKeyChanged = 1;
  Object.defineProperty(distinctUntilKeyChanged, "__esModule", { value: true });
  distinctUntilKeyChanged.distinctUntilKeyChanged = void 0;
  var distinctUntilChanged_1 = /* @__PURE__ */ requireDistinctUntilChanged();
  function distinctUntilKeyChanged$1(key, compare) {
    return distinctUntilChanged_1.distinctUntilChanged(function(x2, y) {
      return compare ? compare(x2[key], y[key]) : x2[key] === y[key];
    });
  }
  distinctUntilKeyChanged.distinctUntilKeyChanged = distinctUntilKeyChanged$1;
  return distinctUntilKeyChanged;
}
var elementAt = {};
var throwIfEmpty = {};
var hasRequiredThrowIfEmpty;
function requireThrowIfEmpty() {
  if (hasRequiredThrowIfEmpty) return throwIfEmpty;
  hasRequiredThrowIfEmpty = 1;
  Object.defineProperty(throwIfEmpty, "__esModule", { value: true });
  throwIfEmpty.throwIfEmpty = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function throwIfEmpty$1(errorFactory) {
    if (errorFactory === void 0) {
      errorFactory = defaultErrorFactory;
    }
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        subscriber.next(value);
      }, function() {
        return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
      }));
    });
  }
  throwIfEmpty.throwIfEmpty = throwIfEmpty$1;
  function defaultErrorFactory() {
    return new EmptyError_1.EmptyError();
  }
  return throwIfEmpty;
}
var hasRequiredElementAt;
function requireElementAt() {
  if (hasRequiredElementAt) return elementAt;
  hasRequiredElementAt = 1;
  Object.defineProperty(elementAt, "__esModule", { value: true });
  elementAt.elementAt = void 0;
  var ArgumentOutOfRangeError_1 = /* @__PURE__ */ requireArgumentOutOfRangeError();
  var filter_1 = /* @__PURE__ */ requireFilter();
  var throwIfEmpty_1 = /* @__PURE__ */ requireThrowIfEmpty();
  var defaultIfEmpty_1 = /* @__PURE__ */ requireDefaultIfEmpty();
  var take_1 = /* @__PURE__ */ requireTake();
  function elementAt$1(index, defaultValue) {
    if (index < 0) {
      throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
    }
    var hasDefaultValue = arguments.length >= 2;
    return function(source) {
      return source.pipe(filter_1.filter(function(v2, i2) {
        return i2 === index;
      }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
        return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
      }));
    };
  }
  elementAt.elementAt = elementAt$1;
  return elementAt;
}
var endWith = {};
var hasRequiredEndWith;
function requireEndWith() {
  if (hasRequiredEndWith) return endWith;
  hasRequiredEndWith = 1;
  var __read = endWith && endWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = endWith && endWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(endWith, "__esModule", { value: true });
  endWith.endWith = void 0;
  var concat_1 = /* @__PURE__ */ requireConcat$1();
  var of_1 = /* @__PURE__ */ requireOf();
  function endWith$1() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    return function(source) {
      return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values))));
    };
  }
  endWith.endWith = endWith$1;
  return endWith;
}
var every = {};
var hasRequiredEvery;
function requireEvery() {
  if (hasRequiredEvery) return every;
  hasRequiredEvery = 1;
  Object.defineProperty(every, "__esModule", { value: true });
  every.every = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function every$1(predicate, thisArg) {
    return lift_1.operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        if (!predicate.call(thisArg, value, index++, source)) {
          subscriber.next(false);
          subscriber.complete();
        }
      }, function() {
        subscriber.next(true);
        subscriber.complete();
      }));
    });
  }
  every.every = every$1;
  return every;
}
var exhaust = {};
var exhaustAll = {};
var exhaustMap = {};
var hasRequiredExhaustMap;
function requireExhaustMap() {
  if (hasRequiredExhaustMap) return exhaustMap;
  hasRequiredExhaustMap = 1;
  Object.defineProperty(exhaustMap, "__esModule", { value: true });
  exhaustMap.exhaustMap = void 0;
  var map_1 = /* @__PURE__ */ requireMap();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function exhaustMap$1(project, resultSelector) {
    if (resultSelector) {
      return function(source) {
        return source.pipe(exhaustMap$1(function(a2, i2) {
          return innerFrom_1.innerFrom(project(a2, i2)).pipe(map_1.map(function(b, ii) {
            return resultSelector(a2, b, i2, ii);
          }));
        }));
      };
    }
    return lift_1.operate(function(source, subscriber) {
      var index = 0;
      var innerSub = null;
      var isComplete = false;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(outerValue) {
        if (!innerSub) {
          innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
            innerSub = null;
            isComplete && subscriber.complete();
          });
          innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
        }
      }, function() {
        isComplete = true;
        !innerSub && subscriber.complete();
      }));
    });
  }
  exhaustMap.exhaustMap = exhaustMap$1;
  return exhaustMap;
}
var hasRequiredExhaustAll;
function requireExhaustAll() {
  if (hasRequiredExhaustAll) return exhaustAll;
  hasRequiredExhaustAll = 1;
  Object.defineProperty(exhaustAll, "__esModule", { value: true });
  exhaustAll.exhaustAll = void 0;
  var exhaustMap_1 = /* @__PURE__ */ requireExhaustMap();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function exhaustAll$1() {
    return exhaustMap_1.exhaustMap(identity_1.identity);
  }
  exhaustAll.exhaustAll = exhaustAll$1;
  return exhaustAll;
}
var hasRequiredExhaust;
function requireExhaust() {
  if (hasRequiredExhaust) return exhaust;
  hasRequiredExhaust = 1;
  Object.defineProperty(exhaust, "__esModule", { value: true });
  exhaust.exhaust = void 0;
  var exhaustAll_1 = /* @__PURE__ */ requireExhaustAll();
  exhaust.exhaust = exhaustAll_1.exhaustAll;
  return exhaust;
}
var expand = {};
var hasRequiredExpand;
function requireExpand() {
  if (hasRequiredExpand) return expand;
  hasRequiredExpand = 1;
  Object.defineProperty(expand, "__esModule", { value: true });
  expand.expand = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var mergeInternals_1 = /* @__PURE__ */ requireMergeInternals();
  function expand$1(project, concurrent, scheduler) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
    return lift_1.operate(function(source, subscriber) {
      return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
    });
  }
  expand.expand = expand$1;
  return expand;
}
var finalize = {};
var hasRequiredFinalize;
function requireFinalize() {
  if (hasRequiredFinalize) return finalize;
  hasRequiredFinalize = 1;
  Object.defineProperty(finalize, "__esModule", { value: true });
  finalize.finalize = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  function finalize$1(callback) {
    return lift_1.operate(function(source, subscriber) {
      try {
        source.subscribe(subscriber);
      } finally {
        subscriber.add(callback);
      }
    });
  }
  finalize.finalize = finalize$1;
  return finalize;
}
var find = {};
var hasRequiredFind;
function requireFind() {
  if (hasRequiredFind) return find;
  hasRequiredFind = 1;
  Object.defineProperty(find, "__esModule", { value: true });
  find.createFind = find.find = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function find$1(predicate, thisArg) {
    return lift_1.operate(createFind(predicate, thisArg, "value"));
  }
  find.find = find$1;
  function createFind(predicate, thisArg, emit) {
    var findIndex2 = emit === "index";
    return function(source, subscriber) {
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var i2 = index++;
        if (predicate.call(thisArg, value, i2, source)) {
          subscriber.next(findIndex2 ? i2 : value);
          subscriber.complete();
        }
      }, function() {
        subscriber.next(findIndex2 ? -1 : void 0);
        subscriber.complete();
      }));
    };
  }
  find.createFind = createFind;
  return find;
}
var findIndex = {};
var hasRequiredFindIndex;
function requireFindIndex() {
  if (hasRequiredFindIndex) return findIndex;
  hasRequiredFindIndex = 1;
  Object.defineProperty(findIndex, "__esModule", { value: true });
  findIndex.findIndex = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var find_1 = /* @__PURE__ */ requireFind();
  function findIndex$1(predicate, thisArg) {
    return lift_1.operate(find_1.createFind(predicate, thisArg, "index"));
  }
  findIndex.findIndex = findIndex$1;
  return findIndex;
}
var first = {};
var hasRequiredFirst;
function requireFirst() {
  if (hasRequiredFirst) return first;
  hasRequiredFirst = 1;
  Object.defineProperty(first, "__esModule", { value: true });
  first.first = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  var filter_1 = /* @__PURE__ */ requireFilter();
  var take_1 = /* @__PURE__ */ requireTake();
  var defaultIfEmpty_1 = /* @__PURE__ */ requireDefaultIfEmpty();
  var throwIfEmpty_1 = /* @__PURE__ */ requireThrowIfEmpty();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function first$1(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function(source) {
      return source.pipe(predicate ? filter_1.filter(function(v2, i2) {
        return predicate(v2, i2, source);
      }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
        return new EmptyError_1.EmptyError();
      }));
    };
  }
  first.first = first$1;
  return first;
}
var groupBy = {};
var hasRequiredGroupBy;
function requireGroupBy() {
  if (hasRequiredGroupBy) return groupBy;
  hasRequiredGroupBy = 1;
  Object.defineProperty(groupBy, "__esModule", { value: true });
  groupBy.groupBy = void 0;
  var Observable_1 = /* @__PURE__ */ requireObservable();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function groupBy$1(keySelector, elementOrOptions, duration, connector) {
    return lift_1.operate(function(source, subscriber) {
      var element;
      if (!elementOrOptions || typeof elementOrOptions === "function") {
        element = elementOrOptions;
      } else {
        duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
      }
      var groups = /* @__PURE__ */ new Map();
      var notify = function(cb) {
        groups.forEach(cb);
        cb(subscriber);
      };
      var handleError = function(err) {
        return notify(function(consumer) {
          return consumer.error(err);
        });
      };
      var activeGroups = 0;
      var teardownAttempted = false;
      var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function(value) {
        try {
          var key_1 = keySelector(value);
          var group_1 = groups.get(key_1);
          if (!group_1) {
            groups.set(key_1, group_1 = connector ? connector() : new Subject_1.Subject());
            var grouped = createGroupedObservable(key_1, group_1);
            subscriber.next(grouped);
            if (duration) {
              var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function() {
                group_1.complete();
                durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
              }, void 0, void 0, function() {
                return groups.delete(key_1);
              });
              groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
            }
          }
          group_1.next(element ? element(value) : value);
        } catch (err) {
          handleError(err);
        }
      }, function() {
        return notify(function(consumer) {
          return consumer.complete();
        });
      }, handleError, function() {
        return groups.clear();
      }, function() {
        teardownAttempted = true;
        return activeGroups === 0;
      });
      source.subscribe(groupBySourceSubscriber);
      function createGroupedObservable(key, groupSubject) {
        var result = new Observable_1.Observable(function(groupSubscriber) {
          activeGroups++;
          var innerSub = groupSubject.subscribe(groupSubscriber);
          return function() {
            innerSub.unsubscribe();
            --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
          };
        });
        result.key = key;
        return result;
      }
    });
  }
  groupBy.groupBy = groupBy$1;
  return groupBy;
}
var isEmpty = {};
var hasRequiredIsEmpty;
function requireIsEmpty() {
  if (hasRequiredIsEmpty) return isEmpty;
  hasRequiredIsEmpty = 1;
  Object.defineProperty(isEmpty, "__esModule", { value: true });
  isEmpty.isEmpty = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function isEmpty$1() {
    return lift_1.operate(function(source, subscriber) {
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        subscriber.next(false);
        subscriber.complete();
      }, function() {
        subscriber.next(true);
        subscriber.complete();
      }));
    });
  }
  isEmpty.isEmpty = isEmpty$1;
  return isEmpty;
}
var last = {};
var takeLast = {};
var hasRequiredTakeLast;
function requireTakeLast() {
  if (hasRequiredTakeLast) return takeLast;
  hasRequiredTakeLast = 1;
  var __values = takeLast && takeLast.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(takeLast, "__esModule", { value: true });
  takeLast.takeLast = void 0;
  var empty_1 = /* @__PURE__ */ requireEmpty();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function takeLast$1(count2) {
    return count2 <= 0 ? function() {
      return empty_1.EMPTY;
    } : lift_1.operate(function(source, subscriber) {
      var buffer2 = [];
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        buffer2.push(value);
        count2 < buffer2.length && buffer2.shift();
      }, function() {
        var e_1, _a;
        try {
          for (var buffer_1 = __values(buffer2), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
            var value = buffer_1_1.value;
            subscriber.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        subscriber.complete();
      }, void 0, function() {
        buffer2 = null;
      }));
    });
  }
  takeLast.takeLast = takeLast$1;
  return takeLast;
}
var hasRequiredLast;
function requireLast() {
  if (hasRequiredLast) return last;
  hasRequiredLast = 1;
  Object.defineProperty(last, "__esModule", { value: true });
  last.last = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  var filter_1 = /* @__PURE__ */ requireFilter();
  var takeLast_1 = /* @__PURE__ */ requireTakeLast();
  var throwIfEmpty_1 = /* @__PURE__ */ requireThrowIfEmpty();
  var defaultIfEmpty_1 = /* @__PURE__ */ requireDefaultIfEmpty();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function last$1(predicate, defaultValue) {
    var hasDefaultValue = arguments.length >= 2;
    return function(source) {
      return source.pipe(predicate ? filter_1.filter(function(v2, i2) {
        return predicate(v2, i2, source);
      }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
        return new EmptyError_1.EmptyError();
      }));
    };
  }
  last.last = last$1;
  return last;
}
var materialize = {};
var hasRequiredMaterialize;
function requireMaterialize() {
  if (hasRequiredMaterialize) return materialize;
  hasRequiredMaterialize = 1;
  Object.defineProperty(materialize, "__esModule", { value: true });
  materialize.materialize = void 0;
  var Notification_1 = /* @__PURE__ */ requireNotification();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function materialize$1() {
    return lift_1.operate(function(source, subscriber) {
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(Notification_1.Notification.createNext(value));
      }, function() {
        subscriber.next(Notification_1.Notification.createComplete());
        subscriber.complete();
      }, function(err) {
        subscriber.next(Notification_1.Notification.createError(err));
        subscriber.complete();
      }));
    });
  }
  materialize.materialize = materialize$1;
  return materialize;
}
var max = {};
var hasRequiredMax;
function requireMax() {
  if (hasRequiredMax) return max;
  hasRequiredMax = 1;
  Object.defineProperty(max, "__esModule", { value: true });
  max.max = void 0;
  var reduce_1 = /* @__PURE__ */ requireReduce();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function max$1(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x2, y) {
      return comparer(x2, y) > 0 ? x2 : y;
    } : function(x2, y) {
      return x2 > y ? x2 : y;
    });
  }
  max.max = max$1;
  return max;
}
var flatMap = {};
var hasRequiredFlatMap;
function requireFlatMap() {
  if (hasRequiredFlatMap) return flatMap;
  hasRequiredFlatMap = 1;
  Object.defineProperty(flatMap, "__esModule", { value: true });
  flatMap.flatMap = void 0;
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  flatMap.flatMap = mergeMap_1.mergeMap;
  return flatMap;
}
var mergeMapTo = {};
var hasRequiredMergeMapTo;
function requireMergeMapTo() {
  if (hasRequiredMergeMapTo) return mergeMapTo;
  hasRequiredMergeMapTo = 1;
  Object.defineProperty(mergeMapTo, "__esModule", { value: true });
  mergeMapTo.mergeMapTo = void 0;
  var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function mergeMapTo$1(innerObservable, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction_1.isFunction(resultSelector)) {
      return mergeMap_1.mergeMap(function() {
        return innerObservable;
      }, resultSelector, concurrent);
    }
    if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return mergeMap_1.mergeMap(function() {
      return innerObservable;
    }, concurrent);
  }
  mergeMapTo.mergeMapTo = mergeMapTo$1;
  return mergeMapTo;
}
var mergeScan = {};
var hasRequiredMergeScan;
function requireMergeScan() {
  if (hasRequiredMergeScan) return mergeScan;
  hasRequiredMergeScan = 1;
  Object.defineProperty(mergeScan, "__esModule", { value: true });
  mergeScan.mergeScan = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var mergeInternals_1 = /* @__PURE__ */ requireMergeInternals();
  function mergeScan$1(accumulator, seed, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return lift_1.operate(function(source, subscriber) {
      var state = seed;
      return mergeInternals_1.mergeInternals(source, subscriber, function(value, index) {
        return accumulator(state, value, index);
      }, concurrent, function(value) {
        state = value;
      }, false, void 0, function() {
        return state = null;
      });
    });
  }
  mergeScan.mergeScan = mergeScan$1;
  return mergeScan;
}
var mergeWith = {};
var merge = {};
var hasRequiredMerge;
function requireMerge() {
  if (hasRequiredMerge) return merge;
  hasRequiredMerge = 1;
  var __read = merge && merge.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = merge && merge.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(merge, "__esModule", { value: true });
  merge.merge = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var mergeAll_1 = /* @__PURE__ */ requireMergeAll();
  var args_1 = /* @__PURE__ */ requireArgs();
  var from_1 = /* @__PURE__ */ requireFrom();
  function merge$12() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(args2);
    var concurrent = args_1.popNumber(args2, Infinity);
    return lift_1.operate(function(source, subscriber) {
      mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args2)), scheduler)).subscribe(subscriber);
    });
  }
  merge.merge = merge$12;
  return merge;
}
var hasRequiredMergeWith;
function requireMergeWith() {
  if (hasRequiredMergeWith) return mergeWith;
  hasRequiredMergeWith = 1;
  var __read = mergeWith && mergeWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = mergeWith && mergeWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(mergeWith, "__esModule", { value: true });
  mergeWith.mergeWith = void 0;
  var merge_1 = /* @__PURE__ */ requireMerge();
  function mergeWith$1() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
  }
  mergeWith.mergeWith = mergeWith$1;
  return mergeWith;
}
var min = {};
var hasRequiredMin;
function requireMin() {
  if (hasRequiredMin) return min;
  hasRequiredMin = 1;
  Object.defineProperty(min, "__esModule", { value: true });
  min.min = void 0;
  var reduce_1 = /* @__PURE__ */ requireReduce();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function min$1(comparer) {
    return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x2, y) {
      return comparer(x2, y) < 0 ? x2 : y;
    } : function(x2, y) {
      return x2 < y ? x2 : y;
    });
  }
  min.min = min$1;
  return min;
}
var multicast = {};
var hasRequiredMulticast;
function requireMulticast() {
  if (hasRequiredMulticast) return multicast;
  hasRequiredMulticast = 1;
  Object.defineProperty(multicast, "__esModule", { value: true });
  multicast.multicast = void 0;
  var ConnectableObservable_1 = /* @__PURE__ */ requireConnectableObservable();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var connect_1 = /* @__PURE__ */ requireConnect();
  function multicast$1(subjectOrSubjectFactory, selector) {
    var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
      return subjectOrSubjectFactory;
    };
    if (isFunction_1.isFunction(selector)) {
      return connect_1.connect(selector, {
        connector: subjectFactory
      });
    }
    return function(source) {
      return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory);
    };
  }
  multicast.multicast = multicast$1;
  return multicast;
}
var onErrorResumeNextWith = {};
var hasRequiredOnErrorResumeNextWith;
function requireOnErrorResumeNextWith() {
  if (hasRequiredOnErrorResumeNextWith) return onErrorResumeNextWith;
  hasRequiredOnErrorResumeNextWith = 1;
  var __read = onErrorResumeNextWith && onErrorResumeNextWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = onErrorResumeNextWith && onErrorResumeNextWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(onErrorResumeNextWith, "__esModule", { value: true });
  onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith.onErrorResumeNextWith = void 0;
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var onErrorResumeNext_1 = /* @__PURE__ */ requireOnErrorResumeNext();
  function onErrorResumeNextWith$1() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
    return function(source) {
      return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
    };
  }
  onErrorResumeNextWith.onErrorResumeNextWith = onErrorResumeNextWith$1;
  onErrorResumeNextWith.onErrorResumeNext = onErrorResumeNextWith$1;
  return onErrorResumeNextWith;
}
var pairwise = {};
var hasRequiredPairwise;
function requirePairwise() {
  if (hasRequiredPairwise) return pairwise;
  hasRequiredPairwise = 1;
  Object.defineProperty(pairwise, "__esModule", { value: true });
  pairwise.pairwise = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function pairwise$1() {
    return lift_1.operate(function(source, subscriber) {
      var prev;
      var hasPrev = false;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var p2 = prev;
        prev = value;
        hasPrev && subscriber.next([p2, value]);
        hasPrev = true;
      }));
    });
  }
  pairwise.pairwise = pairwise$1;
  return pairwise;
}
var pluck = {};
var hasRequiredPluck;
function requirePluck() {
  if (hasRequiredPluck) return pluck;
  hasRequiredPluck = 1;
  Object.defineProperty(pluck, "__esModule", { value: true });
  pluck.pluck = void 0;
  var map_1 = /* @__PURE__ */ requireMap();
  function pluck$1() {
    var properties = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      properties[_i] = arguments[_i];
    }
    var length = properties.length;
    if (length === 0) {
      throw new Error("list of properties cannot be empty.");
    }
    return map_1.map(function(x2) {
      var currentProp = x2;
      for (var i2 = 0; i2 < length; i2++) {
        var p2 = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i2]];
        if (typeof p2 !== "undefined") {
          currentProp = p2;
        } else {
          return void 0;
        }
      }
      return currentProp;
    });
  }
  pluck.pluck = pluck$1;
  return pluck;
}
var publish = {};
var hasRequiredPublish;
function requirePublish() {
  if (hasRequiredPublish) return publish;
  hasRequiredPublish = 1;
  Object.defineProperty(publish, "__esModule", { value: true });
  publish.publish = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var multicast_1 = /* @__PURE__ */ requireMulticast();
  var connect_1 = /* @__PURE__ */ requireConnect();
  function publish$1(selector) {
    return selector ? function(source) {
      return connect_1.connect(selector)(source);
    } : function(source) {
      return multicast_1.multicast(new Subject_1.Subject())(source);
    };
  }
  publish.publish = publish$1;
  return publish;
}
var publishBehavior = {};
var hasRequiredPublishBehavior;
function requirePublishBehavior() {
  if (hasRequiredPublishBehavior) return publishBehavior;
  hasRequiredPublishBehavior = 1;
  Object.defineProperty(publishBehavior, "__esModule", { value: true });
  publishBehavior.publishBehavior = void 0;
  var BehaviorSubject_1 = /* @__PURE__ */ requireBehaviorSubject();
  var ConnectableObservable_1 = /* @__PURE__ */ requireConnectableObservable();
  function publishBehavior$1(initialValue) {
    return function(source) {
      var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
      return new ConnectableObservable_1.ConnectableObservable(source, function() {
        return subject;
      });
    };
  }
  publishBehavior.publishBehavior = publishBehavior$1;
  return publishBehavior;
}
var publishLast = {};
var hasRequiredPublishLast;
function requirePublishLast() {
  if (hasRequiredPublishLast) return publishLast;
  hasRequiredPublishLast = 1;
  Object.defineProperty(publishLast, "__esModule", { value: true });
  publishLast.publishLast = void 0;
  var AsyncSubject_1 = /* @__PURE__ */ requireAsyncSubject();
  var ConnectableObservable_1 = /* @__PURE__ */ requireConnectableObservable();
  function publishLast$1() {
    return function(source) {
      var subject = new AsyncSubject_1.AsyncSubject();
      return new ConnectableObservable_1.ConnectableObservable(source, function() {
        return subject;
      });
    };
  }
  publishLast.publishLast = publishLast$1;
  return publishLast;
}
var publishReplay = {};
var hasRequiredPublishReplay;
function requirePublishReplay() {
  if (hasRequiredPublishReplay) return publishReplay;
  hasRequiredPublishReplay = 1;
  Object.defineProperty(publishReplay, "__esModule", { value: true });
  publishReplay.publishReplay = void 0;
  var ReplaySubject_1 = /* @__PURE__ */ requireReplaySubject();
  var multicast_1 = /* @__PURE__ */ requireMulticast();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function publishReplay$1(bufferSize, windowTime2, selectorOrScheduler, timestampProvider) {
    if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
      timestampProvider = selectorOrScheduler;
    }
    var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
    return function(source) {
      return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime2, timestampProvider), selector)(source);
    };
  }
  publishReplay.publishReplay = publishReplay$1;
  return publishReplay;
}
var raceWith = {};
var hasRequiredRaceWith;
function requireRaceWith() {
  if (hasRequiredRaceWith) return raceWith;
  hasRequiredRaceWith = 1;
  var __read = raceWith && raceWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = raceWith && raceWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(raceWith, "__esModule", { value: true });
  raceWith.raceWith = void 0;
  var race_1 = /* @__PURE__ */ requireRace$1();
  var lift_1 = /* @__PURE__ */ requireLift();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function raceWith$1() {
    var otherSources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherSources[_i] = arguments[_i];
    }
    return !otherSources.length ? identity_1.identity : lift_1.operate(function(source, subscriber) {
      race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
    });
  }
  raceWith.raceWith = raceWith$1;
  return raceWith;
}
var repeat = {};
var hasRequiredRepeat;
function requireRepeat() {
  if (hasRequiredRepeat) return repeat;
  hasRequiredRepeat = 1;
  Object.defineProperty(repeat, "__esModule", { value: true });
  repeat.repeat = void 0;
  var empty_1 = /* @__PURE__ */ requireEmpty();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var timer_1 = /* @__PURE__ */ requireTimer();
  function repeat$1(countOrConfig) {
    var _a;
    var count2 = Infinity;
    var delay2;
    if (countOrConfig != null) {
      if (typeof countOrConfig === "object") {
        _a = countOrConfig.count, count2 = _a === void 0 ? Infinity : _a, delay2 = countOrConfig.delay;
      } else {
        count2 = countOrConfig;
      }
    }
    return count2 <= 0 ? function() {
      return empty_1.EMPTY;
    } : lift_1.operate(function(source, subscriber) {
      var soFar = 0;
      var sourceSub;
      var resubscribe = function() {
        sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
        sourceSub = null;
        if (delay2 != null) {
          var notifier = typeof delay2 === "number" ? timer_1.timer(delay2) : innerFrom_1.innerFrom(delay2(soFar));
          var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            notifierSubscriber_1.unsubscribe();
            subscribeToSource();
          });
          notifier.subscribe(notifierSubscriber_1);
        } else {
          subscribeToSource();
        }
      };
      var subscribeToSource = function() {
        var syncUnsub = false;
        sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
          if (++soFar < count2) {
            if (sourceSub) {
              resubscribe();
            } else {
              syncUnsub = true;
            }
          } else {
            subscriber.complete();
          }
        }));
        if (syncUnsub) {
          resubscribe();
        }
      };
      subscribeToSource();
    });
  }
  repeat.repeat = repeat$1;
  return repeat;
}
var repeatWhen = {};
var hasRequiredRepeatWhen;
function requireRepeatWhen() {
  if (hasRequiredRepeatWhen) return repeatWhen;
  hasRequiredRepeatWhen = 1;
  Object.defineProperty(repeatWhen, "__esModule", { value: true });
  repeatWhen.repeatWhen = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function repeatWhen$1(notifier) {
    return lift_1.operate(function(source, subscriber) {
      var innerSub;
      var syncResub = false;
      var completions$;
      var isNotifierComplete = false;
      var isMainComplete = false;
      var checkComplete = function() {
        return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
      };
      var getCompletionSubject = function() {
        if (!completions$) {
          completions$ = new Subject_1.Subject();
          innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
            if (innerSub) {
              subscribeForRepeatWhen();
            } else {
              syncResub = true;
            }
          }, function() {
            isNotifierComplete = true;
            checkComplete();
          }));
        }
        return completions$;
      };
      var subscribeForRepeatWhen = function() {
        isMainComplete = false;
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
          isMainComplete = true;
          !checkComplete() && getCompletionSubject().next();
        }));
        if (syncResub) {
          innerSub.unsubscribe();
          innerSub = null;
          syncResub = false;
          subscribeForRepeatWhen();
        }
      };
      subscribeForRepeatWhen();
    });
  }
  repeatWhen.repeatWhen = repeatWhen$1;
  return repeatWhen;
}
var retry = {};
var hasRequiredRetry;
function requireRetry() {
  if (hasRequiredRetry) return retry;
  hasRequiredRetry = 1;
  Object.defineProperty(retry, "__esModule", { value: true });
  retry.retry = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var timer_1 = /* @__PURE__ */ requireTimer();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function retry$1(configOrCount) {
    if (configOrCount === void 0) {
      configOrCount = Infinity;
    }
    var config2;
    if (configOrCount && typeof configOrCount === "object") {
      config2 = configOrCount;
    } else {
      config2 = {
        count: configOrCount
      };
    }
    var _a = config2.count, count2 = _a === void 0 ? Infinity : _a, delay2 = config2.delay, _b = config2.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
    return count2 <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
      var soFar = 0;
      var innerSub;
      var subscribeForRetry = function() {
        var syncUnsub = false;
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (resetOnSuccess) {
            soFar = 0;
          }
          subscriber.next(value);
        }, void 0, function(err) {
          if (soFar++ < count2) {
            var resub_1 = function() {
              if (innerSub) {
                innerSub.unsubscribe();
                innerSub = null;
                subscribeForRetry();
              } else {
                syncUnsub = true;
              }
            };
            if (delay2 != null) {
              var notifier = typeof delay2 === "number" ? timer_1.timer(delay2) : innerFrom_1.innerFrom(delay2(err, soFar));
              var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                notifierSubscriber_1.unsubscribe();
                resub_1();
              }, function() {
                subscriber.complete();
              });
              notifier.subscribe(notifierSubscriber_1);
            } else {
              resub_1();
            }
          } else {
            subscriber.error(err);
          }
        }));
        if (syncUnsub) {
          innerSub.unsubscribe();
          innerSub = null;
          subscribeForRetry();
        }
      };
      subscribeForRetry();
    });
  }
  retry.retry = retry$1;
  return retry;
}
var retryWhen = {};
var hasRequiredRetryWhen;
function requireRetryWhen() {
  if (hasRequiredRetryWhen) return retryWhen;
  hasRequiredRetryWhen = 1;
  Object.defineProperty(retryWhen, "__esModule", { value: true });
  retryWhen.retryWhen = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function retryWhen$1(notifier) {
    return lift_1.operate(function(source, subscriber) {
      var innerSub;
      var syncResub = false;
      var errors$;
      var subscribeForRetryWhen = function() {
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
          if (!errors$) {
            errors$ = new Subject_1.Subject();
            innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
              return innerSub ? subscribeForRetryWhen() : syncResub = true;
            }));
          }
          if (errors$) {
            errors$.next(err);
          }
        }));
        if (syncResub) {
          innerSub.unsubscribe();
          innerSub = null;
          syncResub = false;
          subscribeForRetryWhen();
        }
      };
      subscribeForRetryWhen();
    });
  }
  retryWhen.retryWhen = retryWhen$1;
  return retryWhen;
}
var sample = {};
var hasRequiredSample;
function requireSample() {
  if (hasRequiredSample) return sample;
  hasRequiredSample = 1;
  Object.defineProperty(sample, "__esModule", { value: true });
  sample.sample = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var lift_1 = /* @__PURE__ */ requireLift();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function sample$1(notifier) {
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      var lastValue = null;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        lastValue = value;
      }));
      innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        if (hasValue) {
          hasValue = false;
          var value = lastValue;
          lastValue = null;
          subscriber.next(value);
        }
      }, noop_1.noop));
    });
  }
  sample.sample = sample$1;
  return sample;
}
var sampleTime = {};
var hasRequiredSampleTime;
function requireSampleTime() {
  if (hasRequiredSampleTime) return sampleTime;
  hasRequiredSampleTime = 1;
  Object.defineProperty(sampleTime, "__esModule", { value: true });
  sampleTime.sampleTime = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var sample_1 = /* @__PURE__ */ requireSample();
  var interval_1 = /* @__PURE__ */ requireInterval();
  function sampleTime$1(period, scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    return sample_1.sample(interval_1.interval(period, scheduler));
  }
  sampleTime.sampleTime = sampleTime$1;
  return sampleTime;
}
var scan = {};
var hasRequiredScan;
function requireScan() {
  if (hasRequiredScan) return scan;
  hasRequiredScan = 1;
  Object.defineProperty(scan, "__esModule", { value: true });
  scan.scan = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var scanInternals_1 = /* @__PURE__ */ requireScanInternals();
  function scan$1(accumulator, seed) {
    return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
  }
  scan.scan = scan$1;
  return scan;
}
var sequenceEqual = {};
var hasRequiredSequenceEqual;
function requireSequenceEqual() {
  if (hasRequiredSequenceEqual) return sequenceEqual;
  hasRequiredSequenceEqual = 1;
  Object.defineProperty(sequenceEqual, "__esModule", { value: true });
  sequenceEqual.sequenceEqual = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function sequenceEqual$1(compareTo, comparator) {
    if (comparator === void 0) {
      comparator = function(a2, b) {
        return a2 === b;
      };
    }
    return lift_1.operate(function(source, subscriber) {
      var aState = createState();
      var bState = createState();
      var emit = function(isEqual) {
        subscriber.next(isEqual);
        subscriber.complete();
      };
      var createSubscriber = function(selfState, otherState) {
        var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(a2) {
          var buffer2 = otherState.buffer, complete = otherState.complete;
          if (buffer2.length === 0) {
            complete ? emit(false) : selfState.buffer.push(a2);
          } else {
            !comparator(a2, buffer2.shift()) && emit(false);
          }
        }, function() {
          selfState.complete = true;
          var complete = otherState.complete, buffer2 = otherState.buffer;
          complete && emit(buffer2.length === 0);
          sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
        });
        return sequenceEqualSubscriber;
      };
      source.subscribe(createSubscriber(aState, bState));
      innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
    });
  }
  sequenceEqual.sequenceEqual = sequenceEqual$1;
  function createState() {
    return {
      buffer: [],
      complete: false
    };
  }
  return sequenceEqual;
}
var share = {};
var hasRequiredShare;
function requireShare() {
  if (hasRequiredShare) return share;
  hasRequiredShare = 1;
  var __read = share && share.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = share && share.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(share, "__esModule", { value: true });
  share.share = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var Subscriber_1 = /* @__PURE__ */ requireSubscriber();
  var lift_1 = /* @__PURE__ */ requireLift();
  function share$1(options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.connector, connector = _a === void 0 ? function() {
      return new Subject_1.Subject();
    } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
    return function(wrapperSource) {
      var connection;
      var resetConnection;
      var subject;
      var refCount2 = 0;
      var hasCompleted = false;
      var hasErrored = false;
      var cancelReset = function() {
        resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
        resetConnection = void 0;
      };
      var reset = function() {
        cancelReset();
        connection = subject = void 0;
        hasCompleted = hasErrored = false;
      };
      var resetAndUnsubscribe = function() {
        var conn = connection;
        reset();
        conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
      };
      return lift_1.operate(function(source, subscriber) {
        refCount2++;
        if (!hasErrored && !hasCompleted) {
          cancelReset();
        }
        var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
        subscriber.add(function() {
          refCount2--;
          if (refCount2 === 0 && !hasErrored && !hasCompleted) {
            resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
          }
        });
        dest.subscribe(subscriber);
        if (!connection && refCount2 > 0) {
          connection = new Subscriber_1.SafeSubscriber({
            next: function(value) {
              return dest.next(value);
            },
            error: function(err) {
              hasErrored = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnError, err);
              dest.error(err);
            },
            complete: function() {
              hasCompleted = true;
              cancelReset();
              resetConnection = handleReset(reset, resetOnComplete);
              dest.complete();
            }
          });
          innerFrom_1.innerFrom(source).subscribe(connection);
        }
      })(wrapperSource);
    };
  }
  share.share = share$1;
  function handleReset(reset, on) {
    var args2 = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args2[_i - 2] = arguments[_i];
    }
    if (on === true) {
      reset();
      return;
    }
    if (on === false) {
      return;
    }
    var onSubscriber = new Subscriber_1.SafeSubscriber({
      next: function() {
        onSubscriber.unsubscribe();
        reset();
      }
    });
    return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args2)))).subscribe(onSubscriber);
  }
  return share;
}
var shareReplay = {};
var hasRequiredShareReplay;
function requireShareReplay() {
  if (hasRequiredShareReplay) return shareReplay;
  hasRequiredShareReplay = 1;
  Object.defineProperty(shareReplay, "__esModule", { value: true });
  shareReplay.shareReplay = void 0;
  var ReplaySubject_1 = /* @__PURE__ */ requireReplaySubject();
  var share_1 = /* @__PURE__ */ requireShare();
  function shareReplay$1(configOrBufferSize, windowTime2, scheduler) {
    var _a, _b, _c;
    var bufferSize;
    var refCount2 = false;
    if (configOrBufferSize && typeof configOrBufferSize === "object") {
      _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime2 = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount2 = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
    } else {
      bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
    }
    return share_1.share({
      connector: function() {
        return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime2, scheduler);
      },
      resetOnError: true,
      resetOnComplete: false,
      resetOnRefCountZero: refCount2
    });
  }
  shareReplay.shareReplay = shareReplay$1;
  return shareReplay;
}
var single = {};
var hasRequiredSingle;
function requireSingle() {
  if (hasRequiredSingle) return single;
  hasRequiredSingle = 1;
  Object.defineProperty(single, "__esModule", { value: true });
  single.single = void 0;
  var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
  var SequenceError_1 = /* @__PURE__ */ requireSequenceError();
  var NotFoundError_1 = /* @__PURE__ */ requireNotFoundError();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function single$1(predicate) {
    return lift_1.operate(function(source, subscriber) {
      var hasValue = false;
      var singleValue;
      var seenValue = false;
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        seenValue = true;
        if (!predicate || predicate(value, index++, source)) {
          hasValue && subscriber.error(new SequenceError_1.SequenceError("Too many matching values"));
          hasValue = true;
          singleValue = value;
        }
      }, function() {
        if (hasValue) {
          subscriber.next(singleValue);
          subscriber.complete();
        } else {
          subscriber.error(seenValue ? new NotFoundError_1.NotFoundError("No matching values") : new EmptyError_1.EmptyError());
        }
      }));
    });
  }
  single.single = single$1;
  return single;
}
var skip = {};
var hasRequiredSkip;
function requireSkip() {
  if (hasRequiredSkip) return skip;
  hasRequiredSkip = 1;
  Object.defineProperty(skip, "__esModule", { value: true });
  skip.skip = void 0;
  var filter_1 = /* @__PURE__ */ requireFilter();
  function skip$1(count2) {
    return filter_1.filter(function(_2, index) {
      return count2 <= index;
    });
  }
  skip.skip = skip$1;
  return skip;
}
var skipLast = {};
var hasRequiredSkipLast;
function requireSkipLast() {
  if (hasRequiredSkipLast) return skipLast;
  hasRequiredSkipLast = 1;
  Object.defineProperty(skipLast, "__esModule", { value: true });
  skipLast.skipLast = void 0;
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function skipLast$1(skipCount) {
    return skipCount <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
      var ring = new Array(skipCount);
      var seen = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var valueIndex = seen++;
        if (valueIndex < skipCount) {
          ring[valueIndex] = value;
        } else {
          var index = valueIndex % skipCount;
          var oldValue = ring[index];
          ring[index] = value;
          subscriber.next(oldValue);
        }
      }));
      return function() {
        ring = null;
      };
    });
  }
  skipLast.skipLast = skipLast$1;
  return skipLast;
}
var skipUntil = {};
var hasRequiredSkipUntil;
function requireSkipUntil() {
  if (hasRequiredSkipUntil) return skipUntil;
  hasRequiredSkipUntil = 1;
  Object.defineProperty(skipUntil, "__esModule", { value: true });
  skipUntil.skipUntil = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var noop_1 = /* @__PURE__ */ requireNoop();
  function skipUntil$1(notifier) {
    return lift_1.operate(function(source, subscriber) {
      var taking = false;
      var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
        taking = true;
      }, noop_1.noop);
      innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return taking && subscriber.next(value);
      }));
    });
  }
  skipUntil.skipUntil = skipUntil$1;
  return skipUntil;
}
var skipWhile = {};
var hasRequiredSkipWhile;
function requireSkipWhile() {
  if (hasRequiredSkipWhile) return skipWhile;
  hasRequiredSkipWhile = 1;
  Object.defineProperty(skipWhile, "__esModule", { value: true });
  skipWhile.skipWhile = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function skipWhile$1(predicate) {
    return lift_1.operate(function(source, subscriber) {
      var taking = false;
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
      }));
    });
  }
  skipWhile.skipWhile = skipWhile$1;
  return skipWhile;
}
var startWith = {};
var hasRequiredStartWith;
function requireStartWith() {
  if (hasRequiredStartWith) return startWith;
  hasRequiredStartWith = 1;
  Object.defineProperty(startWith, "__esModule", { value: true });
  startWith.startWith = void 0;
  var concat_1 = /* @__PURE__ */ requireConcat$1();
  var args_1 = /* @__PURE__ */ requireArgs();
  var lift_1 = /* @__PURE__ */ requireLift();
  function startWith$1() {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      values[_i] = arguments[_i];
    }
    var scheduler = args_1.popScheduler(values);
    return lift_1.operate(function(source, subscriber) {
      (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
    });
  }
  startWith.startWith = startWith$1;
  return startWith;
}
var switchAll = {};
var switchMap = {};
var hasRequiredSwitchMap;
function requireSwitchMap() {
  if (hasRequiredSwitchMap) return switchMap;
  hasRequiredSwitchMap = 1;
  Object.defineProperty(switchMap, "__esModule", { value: true });
  switchMap.switchMap = void 0;
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function switchMap$1(project, resultSelector) {
    return lift_1.operate(function(source, subscriber) {
      var innerSubscriber = null;
      var index = 0;
      var isComplete = false;
      var checkComplete = function() {
        return isComplete && !innerSubscriber && subscriber.complete();
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
        var innerIndex = 0;
        var outerIndex = index++;
        innerFrom_1.innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
          return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
        }, function() {
          innerSubscriber = null;
          checkComplete();
        }));
      }, function() {
        isComplete = true;
        checkComplete();
      }));
    });
  }
  switchMap.switchMap = switchMap$1;
  return switchMap;
}
var hasRequiredSwitchAll;
function requireSwitchAll() {
  if (hasRequiredSwitchAll) return switchAll;
  hasRequiredSwitchAll = 1;
  Object.defineProperty(switchAll, "__esModule", { value: true });
  switchAll.switchAll = void 0;
  var switchMap_1 = /* @__PURE__ */ requireSwitchMap();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function switchAll$1() {
    return switchMap_1.switchMap(identity_1.identity);
  }
  switchAll.switchAll = switchAll$1;
  return switchAll;
}
var switchMapTo = {};
var hasRequiredSwitchMapTo;
function requireSwitchMapTo() {
  if (hasRequiredSwitchMapTo) return switchMapTo;
  hasRequiredSwitchMapTo = 1;
  Object.defineProperty(switchMapTo, "__esModule", { value: true });
  switchMapTo.switchMapTo = void 0;
  var switchMap_1 = /* @__PURE__ */ requireSwitchMap();
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  function switchMapTo$1(innerObservable, resultSelector) {
    return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function() {
      return innerObservable;
    }, resultSelector) : switchMap_1.switchMap(function() {
      return innerObservable;
    });
  }
  switchMapTo.switchMapTo = switchMapTo$1;
  return switchMapTo;
}
var switchScan = {};
var hasRequiredSwitchScan;
function requireSwitchScan() {
  if (hasRequiredSwitchScan) return switchScan;
  hasRequiredSwitchScan = 1;
  Object.defineProperty(switchScan, "__esModule", { value: true });
  switchScan.switchScan = void 0;
  var switchMap_1 = /* @__PURE__ */ requireSwitchMap();
  var lift_1 = /* @__PURE__ */ requireLift();
  function switchScan$1(accumulator, seed) {
    return lift_1.operate(function(source, subscriber) {
      var state = seed;
      switchMap_1.switchMap(function(value, index) {
        return accumulator(state, value, index);
      }, function(_2, innerValue) {
        return state = innerValue, innerValue;
      })(source).subscribe(subscriber);
      return function() {
        state = null;
      };
    });
  }
  switchScan.switchScan = switchScan$1;
  return switchScan;
}
var takeUntil = {};
var hasRequiredTakeUntil;
function requireTakeUntil() {
  if (hasRequiredTakeUntil) return takeUntil;
  hasRequiredTakeUntil = 1;
  Object.defineProperty(takeUntil, "__esModule", { value: true });
  takeUntil.takeUntil = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var noop_1 = /* @__PURE__ */ requireNoop();
  function takeUntil$1(notifier) {
    return lift_1.operate(function(source, subscriber) {
      innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        return subscriber.complete();
      }, noop_1.noop));
      !subscriber.closed && source.subscribe(subscriber);
    });
  }
  takeUntil.takeUntil = takeUntil$1;
  return takeUntil;
}
var takeWhile = {};
var hasRequiredTakeWhile;
function requireTakeWhile() {
  if (hasRequiredTakeWhile) return takeWhile;
  hasRequiredTakeWhile = 1;
  Object.defineProperty(takeWhile, "__esModule", { value: true });
  takeWhile.takeWhile = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function takeWhile$1(predicate, inclusive) {
    if (inclusive === void 0) {
      inclusive = false;
    }
    return lift_1.operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var result = predicate(value, index++);
        (result || inclusive) && subscriber.next(value);
        !result && subscriber.complete();
      }));
    });
  }
  takeWhile.takeWhile = takeWhile$1;
  return takeWhile;
}
var tap = {};
var hasRequiredTap;
function requireTap() {
  if (hasRequiredTap) return tap;
  hasRequiredTap = 1;
  Object.defineProperty(tap, "__esModule", { value: true });
  tap.tap = void 0;
  var isFunction_1 = /* @__PURE__ */ requireIsFunction();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  function tap$1(observerOrNext, error, complete) {
    var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
    return tapObserver ? lift_1.operate(function(source, subscriber) {
      var _a;
      (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      var isUnsub = true;
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var _a2;
        (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
        subscriber.next(value);
      }, function() {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        subscriber.complete();
      }, function(err) {
        var _a2;
        isUnsub = false;
        (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
        subscriber.error(err);
      }, function() {
        var _a2, _b;
        if (isUnsub) {
          (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
        }
        (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
      }));
    }) : identity_1.identity;
  }
  tap.tap = tap$1;
  return tap;
}
var throttle = {};
var hasRequiredThrottle;
function requireThrottle() {
  if (hasRequiredThrottle) return throttle;
  hasRequiredThrottle = 1;
  Object.defineProperty(throttle, "__esModule", { value: true });
  throttle.throttle = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function throttle$1(durationSelector, config2) {
    return lift_1.operate(function(source, subscriber) {
      var _a = config2 !== null && config2 !== void 0 ? config2 : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
      var hasValue = false;
      var sendValue = null;
      var throttled = null;
      var isComplete = false;
      var endThrottling = function() {
        throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
        throttled = null;
        if (trailing) {
          send();
          isComplete && subscriber.complete();
        }
      };
      var cleanupThrottling = function() {
        throttled = null;
        isComplete && subscriber.complete();
      };
      var startThrottle = function(value) {
        return throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
      };
      var send = function() {
        if (hasValue) {
          hasValue = false;
          var value = sendValue;
          sendValue = null;
          subscriber.next(value);
          !isComplete && startThrottle(value);
        }
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        hasValue = true;
        sendValue = value;
        !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
      }, function() {
        isComplete = true;
        !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
      }));
    });
  }
  throttle.throttle = throttle$1;
  return throttle;
}
var throttleTime = {};
var hasRequiredThrottleTime;
function requireThrottleTime() {
  if (hasRequiredThrottleTime) return throttleTime;
  hasRequiredThrottleTime = 1;
  Object.defineProperty(throttleTime, "__esModule", { value: true });
  throttleTime.throttleTime = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var throttle_1 = /* @__PURE__ */ requireThrottle();
  var timer_1 = /* @__PURE__ */ requireTimer();
  function throttleTime$1(duration, scheduler, config2) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    var duration$ = timer_1.timer(duration, scheduler);
    return throttle_1.throttle(function() {
      return duration$;
    }, config2);
  }
  throttleTime.throttleTime = throttleTime$1;
  return throttleTime;
}
var timeInterval = {};
var hasRequiredTimeInterval;
function requireTimeInterval() {
  if (hasRequiredTimeInterval) return timeInterval;
  hasRequiredTimeInterval = 1;
  Object.defineProperty(timeInterval, "__esModule", { value: true });
  timeInterval.TimeInterval = timeInterval.timeInterval = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function timeInterval$1(scheduler) {
    if (scheduler === void 0) {
      scheduler = async_1.asyncScheduler;
    }
    return lift_1.operate(function(source, subscriber) {
      var last2 = scheduler.now();
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var now = scheduler.now();
        var interval2 = now - last2;
        last2 = now;
        subscriber.next(new TimeInterval(value, interval2));
      }));
    });
  }
  timeInterval.timeInterval = timeInterval$1;
  var TimeInterval = /* @__PURE__ */ function() {
    function TimeInterval2(value, interval2) {
      this.value = value;
      this.interval = interval2;
    }
    return TimeInterval2;
  }();
  timeInterval.TimeInterval = TimeInterval;
  return timeInterval;
}
var timeoutWith = {};
var hasRequiredTimeoutWith;
function requireTimeoutWith() {
  if (hasRequiredTimeoutWith) return timeoutWith;
  hasRequiredTimeoutWith = 1;
  Object.defineProperty(timeoutWith, "__esModule", { value: true });
  timeoutWith.timeoutWith = void 0;
  var async_1 = /* @__PURE__ */ requireAsync();
  var isDate_1 = /* @__PURE__ */ requireIsDate();
  var timeout_1 = /* @__PURE__ */ requireTimeout();
  function timeoutWith$1(due, withObservable, scheduler) {
    var first2;
    var each;
    var _with;
    scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
    if (isDate_1.isValidDate(due)) {
      first2 = due;
    } else if (typeof due === "number") {
      each = due;
    }
    if (withObservable) {
      _with = function() {
        return withObservable;
      };
    } else {
      throw new TypeError("No observable provided to switch to");
    }
    if (first2 == null && each == null) {
      throw new TypeError("No timeout provided.");
    }
    return timeout_1.timeout({
      first: first2,
      each,
      scheduler,
      with: _with
    });
  }
  timeoutWith.timeoutWith = timeoutWith$1;
  return timeoutWith;
}
var timestamp = {};
var hasRequiredTimestamp;
function requireTimestamp() {
  if (hasRequiredTimestamp) return timestamp;
  hasRequiredTimestamp = 1;
  Object.defineProperty(timestamp, "__esModule", { value: true });
  timestamp.timestamp = void 0;
  var dateTimestampProvider_1 = /* @__PURE__ */ requireDateTimestampProvider();
  var map_1 = /* @__PURE__ */ requireMap();
  function timestamp$1(timestampProvider) {
    if (timestampProvider === void 0) {
      timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
    }
    return map_1.map(function(value) {
      return { value, timestamp: timestampProvider.now() };
    });
  }
  timestamp.timestamp = timestamp$1;
  return timestamp;
}
var window$1 = {};
var hasRequiredWindow;
function requireWindow() {
  if (hasRequiredWindow) return window$1;
  hasRequiredWindow = 1;
  Object.defineProperty(window$1, "__esModule", { value: true });
  window$1.window = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function window2(windowBoundaries) {
    return lift_1.operate(function(source, subscriber) {
      var windowSubject = new Subject_1.Subject();
      subscriber.next(windowSubject.asObservable());
      var errorHandler = function(err) {
        windowSubject.error(err);
        subscriber.error(err);
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
      }, function() {
        windowSubject.complete();
        subscriber.complete();
      }, errorHandler));
      innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
        windowSubject.complete();
        subscriber.next(windowSubject = new Subject_1.Subject());
      }, noop_1.noop, errorHandler));
      return function() {
        windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
        windowSubject = null;
      };
    });
  }
  window$1.window = window2;
  return window$1;
}
var windowCount = {};
var hasRequiredWindowCount;
function requireWindowCount() {
  if (hasRequiredWindowCount) return windowCount;
  hasRequiredWindowCount = 1;
  var __values = windowCount && windowCount.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(windowCount, "__esModule", { value: true });
  windowCount.windowCount = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  function windowCount$1(windowSize, startWindowEvery) {
    if (startWindowEvery === void 0) {
      startWindowEvery = 0;
    }
    var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
    return lift_1.operate(function(source, subscriber) {
      var windows = [new Subject_1.Subject()];
      var count2 = 0;
      subscriber.next(windows[0].asObservable());
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a;
        try {
          for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
            var window_1 = windows_1_1.value;
            window_1.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        var c2 = count2 - windowSize + 1;
        if (c2 >= 0 && c2 % startEvery === 0) {
          windows.shift().complete();
        }
        if (++count2 % startEvery === 0) {
          var window_2 = new Subject_1.Subject();
          windows.push(window_2);
          subscriber.next(window_2.asObservable());
        }
      }, function() {
        while (windows.length > 0) {
          windows.shift().complete();
        }
        subscriber.complete();
      }, function(err) {
        while (windows.length > 0) {
          windows.shift().error(err);
        }
        subscriber.error(err);
      }, function() {
        windows = null;
      }));
    });
  }
  windowCount.windowCount = windowCount$1;
  return windowCount;
}
var windowTime = {};
var hasRequiredWindowTime;
function requireWindowTime() {
  if (hasRequiredWindowTime) return windowTime;
  hasRequiredWindowTime = 1;
  Object.defineProperty(windowTime, "__esModule", { value: true });
  windowTime.windowTime = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var async_1 = /* @__PURE__ */ requireAsync();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  var args_1 = /* @__PURE__ */ requireArgs();
  var executeSchedule_1 = /* @__PURE__ */ requireExecuteSchedule();
  function windowTime$1(windowTimeSpan) {
    var _a, _b;
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      otherArgs[_i - 1] = arguments[_i];
    }
    var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
    var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
    var maxWindowSize = otherArgs[1] || Infinity;
    return lift_1.operate(function(source, subscriber) {
      var windowRecords = [];
      var restartOnClose = false;
      var closeWindow = function(record) {
        var window2 = record.window, subs = record.subs;
        window2.complete();
        subs.unsubscribe();
        arrRemove_1.arrRemove(windowRecords, record);
        restartOnClose && startWindow();
      };
      var startWindow = function() {
        if (windowRecords) {
          var subs = new Subscription_1.Subscription();
          subscriber.add(subs);
          var window_1 = new Subject_1.Subject();
          var record_1 = {
            window: window_1,
            subs,
            seen: 0
          };
          windowRecords.push(record_1);
          subscriber.next(window_1.asObservable());
          executeSchedule_1.executeSchedule(subs, scheduler, function() {
            return closeWindow(record_1);
          }, windowTimeSpan);
        }
      };
      if (windowCreationInterval !== null && windowCreationInterval >= 0) {
        executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
      } else {
        restartOnClose = true;
      }
      startWindow();
      var loop = function(cb) {
        return windowRecords.slice().forEach(cb);
      };
      var terminate = function(cb) {
        loop(function(_a2) {
          var window2 = _a2.window;
          return cb(window2);
        });
        cb(subscriber);
        subscriber.unsubscribe();
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        loop(function(record) {
          record.window.next(value);
          maxWindowSize <= ++record.seen && closeWindow(record);
        });
      }, function() {
        return terminate(function(consumer) {
          return consumer.complete();
        });
      }, function(err) {
        return terminate(function(consumer) {
          return consumer.error(err);
        });
      }));
      return function() {
        windowRecords = null;
      };
    });
  }
  windowTime.windowTime = windowTime$1;
  return windowTime;
}
var windowToggle = {};
var hasRequiredWindowToggle;
function requireWindowToggle() {
  if (hasRequiredWindowToggle) return windowToggle;
  hasRequiredWindowToggle = 1;
  var __values = windowToggle && windowToggle.__values || function(o2) {
    var s2 = typeof Symbol === "function" && Symbol.iterator, m = s2 && o2[s2], i2 = 0;
    if (m) return m.call(o2);
    if (o2 && typeof o2.length === "number") return {
      next: function() {
        if (o2 && i2 >= o2.length) o2 = void 0;
        return { value: o2 && o2[i2++], done: !o2 };
      }
    };
    throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(windowToggle, "__esModule", { value: true });
  windowToggle.windowToggle = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var Subscription_1 = /* @__PURE__ */ requireSubscription();
  var lift_1 = /* @__PURE__ */ requireLift();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var arrRemove_1 = /* @__PURE__ */ requireArrRemove();
  function windowToggle$1(openings, closingSelector) {
    return lift_1.operate(function(source, subscriber) {
      var windows = [];
      var handleError = function(err) {
        while (0 < windows.length) {
          windows.shift().error(err);
        }
        subscriber.error(err);
      };
      innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
        var window2 = new Subject_1.Subject();
        windows.push(window2);
        var closingSubscription = new Subscription_1.Subscription();
        var closeWindow = function() {
          arrRemove_1.arrRemove(windows, window2);
          window2.complete();
          closingSubscription.unsubscribe();
        };
        var closingNotifier;
        try {
          closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
        } catch (err) {
          handleError(err);
          return;
        }
        subscriber.next(window2.asObservable());
        closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
      }, noop_1.noop));
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        var e_1, _a;
        var windowsCopy = windows.slice();
        try {
          for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
            var window_1 = windowsCopy_1_1.value;
            window_1.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }, function() {
        while (0 < windows.length) {
          windows.shift().complete();
        }
        subscriber.complete();
      }, handleError, function() {
        while (0 < windows.length) {
          windows.shift().unsubscribe();
        }
      }));
    });
  }
  windowToggle.windowToggle = windowToggle$1;
  return windowToggle;
}
var windowWhen = {};
var hasRequiredWindowWhen;
function requireWindowWhen() {
  if (hasRequiredWindowWhen) return windowWhen;
  hasRequiredWindowWhen = 1;
  Object.defineProperty(windowWhen, "__esModule", { value: true });
  windowWhen.windowWhen = void 0;
  var Subject_1 = /* @__PURE__ */ requireSubject();
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  function windowWhen$1(closingSelector) {
    return lift_1.operate(function(source, subscriber) {
      var window2;
      var closingSubscriber;
      var handleError = function(err) {
        window2.error(err);
        subscriber.error(err);
      };
      var openWindow = function() {
        closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
        window2 === null || window2 === void 0 ? void 0 : window2.complete();
        window2 = new Subject_1.Subject();
        subscriber.next(window2.asObservable());
        var closingNotifier;
        try {
          closingNotifier = innerFrom_1.innerFrom(closingSelector());
        } catch (err) {
          handleError(err);
          return;
        }
        closingNotifier.subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
      };
      openWindow();
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        return window2.next(value);
      }, function() {
        window2.complete();
        subscriber.complete();
      }, handleError, function() {
        closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
        window2 = null;
      }));
    });
  }
  windowWhen.windowWhen = windowWhen$1;
  return windowWhen;
}
var withLatestFrom = {};
var hasRequiredWithLatestFrom;
function requireWithLatestFrom() {
  if (hasRequiredWithLatestFrom) return withLatestFrom;
  hasRequiredWithLatestFrom = 1;
  var __read = withLatestFrom && withLatestFrom.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = withLatestFrom && withLatestFrom.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(withLatestFrom, "__esModule", { value: true });
  withLatestFrom.withLatestFrom = void 0;
  var lift_1 = /* @__PURE__ */ requireLift();
  var OperatorSubscriber_1 = /* @__PURE__ */ requireOperatorSubscriber();
  var innerFrom_1 = /* @__PURE__ */ requireInnerFrom();
  var identity_1 = /* @__PURE__ */ requireIdentity();
  var noop_1 = /* @__PURE__ */ requireNoop();
  var args_1 = /* @__PURE__ */ requireArgs();
  function withLatestFrom$1() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      inputs[_i] = arguments[_i];
    }
    var project = args_1.popResultSelector(inputs);
    return lift_1.operate(function(source, subscriber) {
      var len = inputs.length;
      var otherValues = new Array(len);
      var hasValue = inputs.map(function() {
        return false;
      });
      var ready = false;
      var _loop_1 = function(i3) {
        innerFrom_1.innerFrom(inputs[i3]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          otherValues[i3] = value;
          if (!ready && !hasValue[i3]) {
            hasValue[i3] = true;
            (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
          }
        }, noop_1.noop));
      };
      for (var i2 = 0; i2 < len; i2++) {
        _loop_1(i2);
      }
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
        if (ready) {
          var values = __spreadArray([value], __read(otherValues));
          subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
        }
      }));
    });
  }
  withLatestFrom.withLatestFrom = withLatestFrom$1;
  return withLatestFrom;
}
var zipAll = {};
var hasRequiredZipAll;
function requireZipAll() {
  if (hasRequiredZipAll) return zipAll;
  hasRequiredZipAll = 1;
  Object.defineProperty(zipAll, "__esModule", { value: true });
  zipAll.zipAll = void 0;
  var zip_1 = /* @__PURE__ */ requireZip$1();
  var joinAllInternals_1 = /* @__PURE__ */ requireJoinAllInternals();
  function zipAll$1(project) {
    return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
  }
  zipAll.zipAll = zipAll$1;
  return zipAll;
}
var zipWith = {};
var zip = {};
var hasRequiredZip;
function requireZip() {
  if (hasRequiredZip) return zip;
  hasRequiredZip = 1;
  var __read = zip && zip.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = zip && zip.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(zip, "__esModule", { value: true });
  zip.zip = void 0;
  var zip_1 = /* @__PURE__ */ requireZip$1();
  var lift_1 = /* @__PURE__ */ requireLift();
  function zip$12() {
    var sources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      sources[_i] = arguments[_i];
    }
    return lift_1.operate(function(source, subscriber) {
      zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
    });
  }
  zip.zip = zip$12;
  return zip;
}
var hasRequiredZipWith;
function requireZipWith() {
  if (hasRequiredZipWith) return zipWith;
  hasRequiredZipWith = 1;
  var __read = zipWith && zipWith.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = zipWith && zipWith.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(zipWith, "__esModule", { value: true });
  zipWith.zipWith = void 0;
  var zip_1 = /* @__PURE__ */ requireZip();
  function zipWith$1() {
    var otherInputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      otherInputs[_i] = arguments[_i];
    }
    return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
  }
  zipWith.zipWith = zipWith$1;
  return zipWith;
}
var hasRequiredCjs;
function requireCjs() {
  if (hasRequiredCjs) return cjs;
  hasRequiredCjs = 1;
  (function(exports) {
    var __createBinding = cjs && cjs.__createBinding || (Object.create ? function(o2, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o2, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o2, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o2[k2] = m[k];
    });
    var __exportStar = cjs && cjs.__exportStar || function(m, exports2) {
      for (var p2 in m) if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2)) __createBinding(exports2, m, p2);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.interval = exports.iif = exports.generate = exports.fromEventPattern = exports.fromEvent = exports.from = exports.forkJoin = exports.empty = exports.defer = exports.connectable = exports.concat = exports.combineLatest = exports.bindNodeCallback = exports.bindCallback = exports.UnsubscriptionError = exports.TimeoutError = exports.SequenceError = exports.ObjectUnsubscribedError = exports.NotFoundError = exports.EmptyError = exports.ArgumentOutOfRangeError = exports.firstValueFrom = exports.lastValueFrom = exports.isObservable = exports.identity = exports.noop = exports.pipe = exports.NotificationKind = exports.Notification = exports.Subscriber = exports.Subscription = exports.Scheduler = exports.VirtualAction = exports.VirtualTimeScheduler = exports.animationFrameScheduler = exports.animationFrame = exports.queueScheduler = exports.queue = exports.asyncScheduler = exports.async = exports.asapScheduler = exports.asap = exports.AsyncSubject = exports.ReplaySubject = exports.BehaviorSubject = exports.Subject = exports.animationFrames = exports.observable = exports.ConnectableObservable = exports.Observable = void 0;
    exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.combineLatestWith = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = exports.config = exports.NEVER = exports.EMPTY = exports.scheduled = exports.zip = exports.using = exports.timer = exports.throwError = exports.range = exports.race = exports.partition = exports.pairs = exports.onErrorResumeNext = exports.of = exports.never = exports.merge = void 0;
    exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.pairwise = exports.onErrorResumeNextWith = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = exports.mergeAll = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = void 0;
    exports.zipWith = exports.zipAll = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = void 0;
    var Observable_1 = /* @__PURE__ */ requireObservable();
    Object.defineProperty(exports, "Observable", { enumerable: true, get: function() {
      return Observable_1.Observable;
    } });
    var ConnectableObservable_1 = /* @__PURE__ */ requireConnectableObservable();
    Object.defineProperty(exports, "ConnectableObservable", { enumerable: true, get: function() {
      return ConnectableObservable_1.ConnectableObservable;
    } });
    var observable_1 = /* @__PURE__ */ requireObservable$1();
    Object.defineProperty(exports, "observable", { enumerable: true, get: function() {
      return observable_1.observable;
    } });
    var animationFrames_1 = /* @__PURE__ */ requireAnimationFrames();
    Object.defineProperty(exports, "animationFrames", { enumerable: true, get: function() {
      return animationFrames_1.animationFrames;
    } });
    var Subject_1 = /* @__PURE__ */ requireSubject();
    Object.defineProperty(exports, "Subject", { enumerable: true, get: function() {
      return Subject_1.Subject;
    } });
    var BehaviorSubject_1 = /* @__PURE__ */ requireBehaviorSubject();
    Object.defineProperty(exports, "BehaviorSubject", { enumerable: true, get: function() {
      return BehaviorSubject_1.BehaviorSubject;
    } });
    var ReplaySubject_1 = /* @__PURE__ */ requireReplaySubject();
    Object.defineProperty(exports, "ReplaySubject", { enumerable: true, get: function() {
      return ReplaySubject_1.ReplaySubject;
    } });
    var AsyncSubject_1 = /* @__PURE__ */ requireAsyncSubject();
    Object.defineProperty(exports, "AsyncSubject", { enumerable: true, get: function() {
      return AsyncSubject_1.AsyncSubject;
    } });
    var asap_1 = /* @__PURE__ */ requireAsap();
    Object.defineProperty(exports, "asap", { enumerable: true, get: function() {
      return asap_1.asap;
    } });
    Object.defineProperty(exports, "asapScheduler", { enumerable: true, get: function() {
      return asap_1.asapScheduler;
    } });
    var async_1 = /* @__PURE__ */ requireAsync();
    Object.defineProperty(exports, "async", { enumerable: true, get: function() {
      return async_1.async;
    } });
    Object.defineProperty(exports, "asyncScheduler", { enumerable: true, get: function() {
      return async_1.asyncScheduler;
    } });
    var queue_1 = /* @__PURE__ */ requireQueue();
    Object.defineProperty(exports, "queue", { enumerable: true, get: function() {
      return queue_1.queue;
    } });
    Object.defineProperty(exports, "queueScheduler", { enumerable: true, get: function() {
      return queue_1.queueScheduler;
    } });
    var animationFrame_1 = /* @__PURE__ */ requireAnimationFrame();
    Object.defineProperty(exports, "animationFrame", { enumerable: true, get: function() {
      return animationFrame_1.animationFrame;
    } });
    Object.defineProperty(exports, "animationFrameScheduler", { enumerable: true, get: function() {
      return animationFrame_1.animationFrameScheduler;
    } });
    var VirtualTimeScheduler_1 = /* @__PURE__ */ requireVirtualTimeScheduler();
    Object.defineProperty(exports, "VirtualTimeScheduler", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualTimeScheduler;
    } });
    Object.defineProperty(exports, "VirtualAction", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualAction;
    } });
    var Scheduler_1 = /* @__PURE__ */ requireScheduler();
    Object.defineProperty(exports, "Scheduler", { enumerable: true, get: function() {
      return Scheduler_1.Scheduler;
    } });
    var Subscription_1 = /* @__PURE__ */ requireSubscription();
    Object.defineProperty(exports, "Subscription", { enumerable: true, get: function() {
      return Subscription_1.Subscription;
    } });
    var Subscriber_1 = /* @__PURE__ */ requireSubscriber();
    Object.defineProperty(exports, "Subscriber", { enumerable: true, get: function() {
      return Subscriber_1.Subscriber;
    } });
    var Notification_1 = /* @__PURE__ */ requireNotification();
    Object.defineProperty(exports, "Notification", { enumerable: true, get: function() {
      return Notification_1.Notification;
    } });
    Object.defineProperty(exports, "NotificationKind", { enumerable: true, get: function() {
      return Notification_1.NotificationKind;
    } });
    var pipe_1 = /* @__PURE__ */ requirePipe();
    Object.defineProperty(exports, "pipe", { enumerable: true, get: function() {
      return pipe_1.pipe;
    } });
    var noop_1 = /* @__PURE__ */ requireNoop();
    Object.defineProperty(exports, "noop", { enumerable: true, get: function() {
      return noop_1.noop;
    } });
    var identity_1 = /* @__PURE__ */ requireIdentity();
    Object.defineProperty(exports, "identity", { enumerable: true, get: function() {
      return identity_1.identity;
    } });
    var isObservable_1 = /* @__PURE__ */ requireIsObservable();
    Object.defineProperty(exports, "isObservable", { enumerable: true, get: function() {
      return isObservable_1.isObservable;
    } });
    var lastValueFrom_1 = /* @__PURE__ */ requireLastValueFrom();
    Object.defineProperty(exports, "lastValueFrom", { enumerable: true, get: function() {
      return lastValueFrom_1.lastValueFrom;
    } });
    var firstValueFrom_1 = /* @__PURE__ */ requireFirstValueFrom();
    Object.defineProperty(exports, "firstValueFrom", { enumerable: true, get: function() {
      return firstValueFrom_1.firstValueFrom;
    } });
    var ArgumentOutOfRangeError_1 = /* @__PURE__ */ requireArgumentOutOfRangeError();
    Object.defineProperty(exports, "ArgumentOutOfRangeError", { enumerable: true, get: function() {
      return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    } });
    var EmptyError_1 = /* @__PURE__ */ requireEmptyError();
    Object.defineProperty(exports, "EmptyError", { enumerable: true, get: function() {
      return EmptyError_1.EmptyError;
    } });
    var NotFoundError_1 = /* @__PURE__ */ requireNotFoundError();
    Object.defineProperty(exports, "NotFoundError", { enumerable: true, get: function() {
      return NotFoundError_1.NotFoundError;
    } });
    var ObjectUnsubscribedError_1 = /* @__PURE__ */ requireObjectUnsubscribedError();
    Object.defineProperty(exports, "ObjectUnsubscribedError", { enumerable: true, get: function() {
      return ObjectUnsubscribedError_1.ObjectUnsubscribedError;
    } });
    var SequenceError_1 = /* @__PURE__ */ requireSequenceError();
    Object.defineProperty(exports, "SequenceError", { enumerable: true, get: function() {
      return SequenceError_1.SequenceError;
    } });
    var timeout_1 = /* @__PURE__ */ requireTimeout();
    Object.defineProperty(exports, "TimeoutError", { enumerable: true, get: function() {
      return timeout_1.TimeoutError;
    } });
    var UnsubscriptionError_1 = /* @__PURE__ */ requireUnsubscriptionError();
    Object.defineProperty(exports, "UnsubscriptionError", { enumerable: true, get: function() {
      return UnsubscriptionError_1.UnsubscriptionError;
    } });
    var bindCallback_1 = /* @__PURE__ */ requireBindCallback();
    Object.defineProperty(exports, "bindCallback", { enumerable: true, get: function() {
      return bindCallback_1.bindCallback;
    } });
    var bindNodeCallback_1 = /* @__PURE__ */ requireBindNodeCallback();
    Object.defineProperty(exports, "bindNodeCallback", { enumerable: true, get: function() {
      return bindNodeCallback_1.bindNodeCallback;
    } });
    var combineLatest_1 = /* @__PURE__ */ requireCombineLatest$1();
    Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function() {
      return combineLatest_1.combineLatest;
    } });
    var concat_1 = /* @__PURE__ */ requireConcat$1();
    Object.defineProperty(exports, "concat", { enumerable: true, get: function() {
      return concat_1.concat;
    } });
    var connectable_1 = /* @__PURE__ */ requireConnectable();
    Object.defineProperty(exports, "connectable", { enumerable: true, get: function() {
      return connectable_1.connectable;
    } });
    var defer_1 = /* @__PURE__ */ requireDefer();
    Object.defineProperty(exports, "defer", { enumerable: true, get: function() {
      return defer_1.defer;
    } });
    var empty_1 = /* @__PURE__ */ requireEmpty();
    Object.defineProperty(exports, "empty", { enumerable: true, get: function() {
      return empty_1.empty;
    } });
    var forkJoin_1 = /* @__PURE__ */ requireForkJoin();
    Object.defineProperty(exports, "forkJoin", { enumerable: true, get: function() {
      return forkJoin_1.forkJoin;
    } });
    var from_1 = /* @__PURE__ */ requireFrom();
    Object.defineProperty(exports, "from", { enumerable: true, get: function() {
      return from_1.from;
    } });
    var fromEvent_1 = /* @__PURE__ */ requireFromEvent();
    Object.defineProperty(exports, "fromEvent", { enumerable: true, get: function() {
      return fromEvent_1.fromEvent;
    } });
    var fromEventPattern_1 = /* @__PURE__ */ requireFromEventPattern();
    Object.defineProperty(exports, "fromEventPattern", { enumerable: true, get: function() {
      return fromEventPattern_1.fromEventPattern;
    } });
    var generate_1 = /* @__PURE__ */ requireGenerate();
    Object.defineProperty(exports, "generate", { enumerable: true, get: function() {
      return generate_1.generate;
    } });
    var iif_1 = /* @__PURE__ */ requireIif();
    Object.defineProperty(exports, "iif", { enumerable: true, get: function() {
      return iif_1.iif;
    } });
    var interval_1 = /* @__PURE__ */ requireInterval();
    Object.defineProperty(exports, "interval", { enumerable: true, get: function() {
      return interval_1.interval;
    } });
    var merge_1 = /* @__PURE__ */ requireMerge$1();
    Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var never_1 = /* @__PURE__ */ requireNever();
    Object.defineProperty(exports, "never", { enumerable: true, get: function() {
      return never_1.never;
    } });
    var of_1 = /* @__PURE__ */ requireOf();
    Object.defineProperty(exports, "of", { enumerable: true, get: function() {
      return of_1.of;
    } });
    var onErrorResumeNext_1 = /* @__PURE__ */ requireOnErrorResumeNext();
    Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function() {
      return onErrorResumeNext_1.onErrorResumeNext;
    } });
    var pairs_1 = /* @__PURE__ */ requirePairs();
    Object.defineProperty(exports, "pairs", { enumerable: true, get: function() {
      return pairs_1.pairs;
    } });
    var partition_1 = /* @__PURE__ */ requirePartition$1();
    Object.defineProperty(exports, "partition", { enumerable: true, get: function() {
      return partition_1.partition;
    } });
    var race_1 = /* @__PURE__ */ requireRace$1();
    Object.defineProperty(exports, "race", { enumerable: true, get: function() {
      return race_1.race;
    } });
    var range_1 = /* @__PURE__ */ requireRange();
    Object.defineProperty(exports, "range", { enumerable: true, get: function() {
      return range_1.range;
    } });
    var throwError_1 = /* @__PURE__ */ requireThrowError();
    Object.defineProperty(exports, "throwError", { enumerable: true, get: function() {
      return throwError_1.throwError;
    } });
    var timer_1 = /* @__PURE__ */ requireTimer();
    Object.defineProperty(exports, "timer", { enumerable: true, get: function() {
      return timer_1.timer;
    } });
    var using_1 = /* @__PURE__ */ requireUsing();
    Object.defineProperty(exports, "using", { enumerable: true, get: function() {
      return using_1.using;
    } });
    var zip_1 = /* @__PURE__ */ requireZip$1();
    Object.defineProperty(exports, "zip", { enumerable: true, get: function() {
      return zip_1.zip;
    } });
    var scheduled_1 = /* @__PURE__ */ requireScheduled();
    Object.defineProperty(exports, "scheduled", { enumerable: true, get: function() {
      return scheduled_1.scheduled;
    } });
    var empty_2 = /* @__PURE__ */ requireEmpty();
    Object.defineProperty(exports, "EMPTY", { enumerable: true, get: function() {
      return empty_2.EMPTY;
    } });
    var never_2 = /* @__PURE__ */ requireNever();
    Object.defineProperty(exports, "NEVER", { enumerable: true, get: function() {
      return never_2.NEVER;
    } });
    __exportStar(/* @__PURE__ */ requireTypes(), exports);
    var config_1 = /* @__PURE__ */ requireConfig();
    Object.defineProperty(exports, "config", { enumerable: true, get: function() {
      return config_1.config;
    } });
    var audit_1 = /* @__PURE__ */ requireAudit();
    Object.defineProperty(exports, "audit", { enumerable: true, get: function() {
      return audit_1.audit;
    } });
    var auditTime_1 = /* @__PURE__ */ requireAuditTime();
    Object.defineProperty(exports, "auditTime", { enumerable: true, get: function() {
      return auditTime_1.auditTime;
    } });
    var buffer_1 = /* @__PURE__ */ requireBuffer();
    Object.defineProperty(exports, "buffer", { enumerable: true, get: function() {
      return buffer_1.buffer;
    } });
    var bufferCount_1 = /* @__PURE__ */ requireBufferCount();
    Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function() {
      return bufferCount_1.bufferCount;
    } });
    var bufferTime_1 = /* @__PURE__ */ requireBufferTime();
    Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function() {
      return bufferTime_1.bufferTime;
    } });
    var bufferToggle_1 = /* @__PURE__ */ requireBufferToggle();
    Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function() {
      return bufferToggle_1.bufferToggle;
    } });
    var bufferWhen_1 = /* @__PURE__ */ requireBufferWhen();
    Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function() {
      return bufferWhen_1.bufferWhen;
    } });
    var catchError_1 = /* @__PURE__ */ requireCatchError();
    Object.defineProperty(exports, "catchError", { enumerable: true, get: function() {
      return catchError_1.catchError;
    } });
    var combineAll_1 = /* @__PURE__ */ requireCombineAll();
    Object.defineProperty(exports, "combineAll", { enumerable: true, get: function() {
      return combineAll_1.combineAll;
    } });
    var combineLatestAll_1 = /* @__PURE__ */ requireCombineLatestAll();
    Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function() {
      return combineLatestAll_1.combineLatestAll;
    } });
    var combineLatestWith_1 = /* @__PURE__ */ requireCombineLatestWith();
    Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function() {
      return combineLatestWith_1.combineLatestWith;
    } });
    var concatAll_1 = /* @__PURE__ */ requireConcatAll();
    Object.defineProperty(exports, "concatAll", { enumerable: true, get: function() {
      return concatAll_1.concatAll;
    } });
    var concatMap_1 = /* @__PURE__ */ requireConcatMap();
    Object.defineProperty(exports, "concatMap", { enumerable: true, get: function() {
      return concatMap_1.concatMap;
    } });
    var concatMapTo_1 = /* @__PURE__ */ requireConcatMapTo();
    Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function() {
      return concatMapTo_1.concatMapTo;
    } });
    var concatWith_1 = /* @__PURE__ */ requireConcatWith();
    Object.defineProperty(exports, "concatWith", { enumerable: true, get: function() {
      return concatWith_1.concatWith;
    } });
    var connect_1 = /* @__PURE__ */ requireConnect();
    Object.defineProperty(exports, "connect", { enumerable: true, get: function() {
      return connect_1.connect;
    } });
    var count_1 = /* @__PURE__ */ requireCount();
    Object.defineProperty(exports, "count", { enumerable: true, get: function() {
      return count_1.count;
    } });
    var debounce_1 = /* @__PURE__ */ requireDebounce();
    Object.defineProperty(exports, "debounce", { enumerable: true, get: function() {
      return debounce_1.debounce;
    } });
    var debounceTime_1 = /* @__PURE__ */ requireDebounceTime();
    Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function() {
      return debounceTime_1.debounceTime;
    } });
    var defaultIfEmpty_1 = /* @__PURE__ */ requireDefaultIfEmpty();
    Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function() {
      return defaultIfEmpty_1.defaultIfEmpty;
    } });
    var delay_1 = /* @__PURE__ */ requireDelay();
    Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
      return delay_1.delay;
    } });
    var delayWhen_1 = /* @__PURE__ */ requireDelayWhen();
    Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function() {
      return delayWhen_1.delayWhen;
    } });
    var dematerialize_1 = /* @__PURE__ */ requireDematerialize();
    Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function() {
      return dematerialize_1.dematerialize;
    } });
    var distinct_1 = /* @__PURE__ */ requireDistinct();
    Object.defineProperty(exports, "distinct", { enumerable: true, get: function() {
      return distinct_1.distinct;
    } });
    var distinctUntilChanged_1 = /* @__PURE__ */ requireDistinctUntilChanged();
    Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function() {
      return distinctUntilChanged_1.distinctUntilChanged;
    } });
    var distinctUntilKeyChanged_1 = /* @__PURE__ */ requireDistinctUntilKeyChanged();
    Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function() {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
    } });
    var elementAt_1 = /* @__PURE__ */ requireElementAt();
    Object.defineProperty(exports, "elementAt", { enumerable: true, get: function() {
      return elementAt_1.elementAt;
    } });
    var endWith_1 = /* @__PURE__ */ requireEndWith();
    Object.defineProperty(exports, "endWith", { enumerable: true, get: function() {
      return endWith_1.endWith;
    } });
    var every_1 = /* @__PURE__ */ requireEvery();
    Object.defineProperty(exports, "every", { enumerable: true, get: function() {
      return every_1.every;
    } });
    var exhaust_1 = /* @__PURE__ */ requireExhaust();
    Object.defineProperty(exports, "exhaust", { enumerable: true, get: function() {
      return exhaust_1.exhaust;
    } });
    var exhaustAll_1 = /* @__PURE__ */ requireExhaustAll();
    Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function() {
      return exhaustAll_1.exhaustAll;
    } });
    var exhaustMap_1 = /* @__PURE__ */ requireExhaustMap();
    Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function() {
      return exhaustMap_1.exhaustMap;
    } });
    var expand_1 = /* @__PURE__ */ requireExpand();
    Object.defineProperty(exports, "expand", { enumerable: true, get: function() {
      return expand_1.expand;
    } });
    var filter_1 = /* @__PURE__ */ requireFilter();
    Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
      return filter_1.filter;
    } });
    var finalize_1 = /* @__PURE__ */ requireFinalize();
    Object.defineProperty(exports, "finalize", { enumerable: true, get: function() {
      return finalize_1.finalize;
    } });
    var find_1 = /* @__PURE__ */ requireFind();
    Object.defineProperty(exports, "find", { enumerable: true, get: function() {
      return find_1.find;
    } });
    var findIndex_1 = /* @__PURE__ */ requireFindIndex();
    Object.defineProperty(exports, "findIndex", { enumerable: true, get: function() {
      return findIndex_1.findIndex;
    } });
    var first_1 = /* @__PURE__ */ requireFirst();
    Object.defineProperty(exports, "first", { enumerable: true, get: function() {
      return first_1.first;
    } });
    var groupBy_1 = /* @__PURE__ */ requireGroupBy();
    Object.defineProperty(exports, "groupBy", { enumerable: true, get: function() {
      return groupBy_1.groupBy;
    } });
    var ignoreElements_1 = /* @__PURE__ */ requireIgnoreElements();
    Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function() {
      return ignoreElements_1.ignoreElements;
    } });
    var isEmpty_1 = /* @__PURE__ */ requireIsEmpty();
    Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function() {
      return isEmpty_1.isEmpty;
    } });
    var last_1 = /* @__PURE__ */ requireLast();
    Object.defineProperty(exports, "last", { enumerable: true, get: function() {
      return last_1.last;
    } });
    var map_1 = /* @__PURE__ */ requireMap();
    Object.defineProperty(exports, "map", { enumerable: true, get: function() {
      return map_1.map;
    } });
    var mapTo_1 = /* @__PURE__ */ requireMapTo();
    Object.defineProperty(exports, "mapTo", { enumerable: true, get: function() {
      return mapTo_1.mapTo;
    } });
    var materialize_1 = /* @__PURE__ */ requireMaterialize();
    Object.defineProperty(exports, "materialize", { enumerable: true, get: function() {
      return materialize_1.materialize;
    } });
    var max_1 = /* @__PURE__ */ requireMax();
    Object.defineProperty(exports, "max", { enumerable: true, get: function() {
      return max_1.max;
    } });
    var mergeAll_1 = /* @__PURE__ */ requireMergeAll();
    Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function() {
      return mergeAll_1.mergeAll;
    } });
    var flatMap_1 = /* @__PURE__ */ requireFlatMap();
    Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
      return flatMap_1.flatMap;
    } });
    var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
    Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function() {
      return mergeMap_1.mergeMap;
    } });
    var mergeMapTo_1 = /* @__PURE__ */ requireMergeMapTo();
    Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function() {
      return mergeMapTo_1.mergeMapTo;
    } });
    var mergeScan_1 = /* @__PURE__ */ requireMergeScan();
    Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function() {
      return mergeScan_1.mergeScan;
    } });
    var mergeWith_1 = /* @__PURE__ */ requireMergeWith();
    Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function() {
      return mergeWith_1.mergeWith;
    } });
    var min_1 = /* @__PURE__ */ requireMin();
    Object.defineProperty(exports, "min", { enumerable: true, get: function() {
      return min_1.min;
    } });
    var multicast_1 = /* @__PURE__ */ requireMulticast();
    Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
      return multicast_1.multicast;
    } });
    var observeOn_1 = /* @__PURE__ */ requireObserveOn();
    Object.defineProperty(exports, "observeOn", { enumerable: true, get: function() {
      return observeOn_1.observeOn;
    } });
    var onErrorResumeNextWith_1 = /* @__PURE__ */ requireOnErrorResumeNextWith();
    Object.defineProperty(exports, "onErrorResumeNextWith", { enumerable: true, get: function() {
      return onErrorResumeNextWith_1.onErrorResumeNextWith;
    } });
    var pairwise_1 = /* @__PURE__ */ requirePairwise();
    Object.defineProperty(exports, "pairwise", { enumerable: true, get: function() {
      return pairwise_1.pairwise;
    } });
    var pluck_1 = /* @__PURE__ */ requirePluck();
    Object.defineProperty(exports, "pluck", { enumerable: true, get: function() {
      return pluck_1.pluck;
    } });
    var publish_1 = /* @__PURE__ */ requirePublish();
    Object.defineProperty(exports, "publish", { enumerable: true, get: function() {
      return publish_1.publish;
    } });
    var publishBehavior_1 = /* @__PURE__ */ requirePublishBehavior();
    Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function() {
      return publishBehavior_1.publishBehavior;
    } });
    var publishLast_1 = /* @__PURE__ */ requirePublishLast();
    Object.defineProperty(exports, "publishLast", { enumerable: true, get: function() {
      return publishLast_1.publishLast;
    } });
    var publishReplay_1 = /* @__PURE__ */ requirePublishReplay();
    Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function() {
      return publishReplay_1.publishReplay;
    } });
    var raceWith_1 = /* @__PURE__ */ requireRaceWith();
    Object.defineProperty(exports, "raceWith", { enumerable: true, get: function() {
      return raceWith_1.raceWith;
    } });
    var reduce_1 = /* @__PURE__ */ requireReduce();
    Object.defineProperty(exports, "reduce", { enumerable: true, get: function() {
      return reduce_1.reduce;
    } });
    var repeat_1 = /* @__PURE__ */ requireRepeat();
    Object.defineProperty(exports, "repeat", { enumerable: true, get: function() {
      return repeat_1.repeat;
    } });
    var repeatWhen_1 = /* @__PURE__ */ requireRepeatWhen();
    Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function() {
      return repeatWhen_1.repeatWhen;
    } });
    var retry_1 = /* @__PURE__ */ requireRetry();
    Object.defineProperty(exports, "retry", { enumerable: true, get: function() {
      return retry_1.retry;
    } });
    var retryWhen_1 = /* @__PURE__ */ requireRetryWhen();
    Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function() {
      return retryWhen_1.retryWhen;
    } });
    var refCount_1 = /* @__PURE__ */ requireRefCount();
    Object.defineProperty(exports, "refCount", { enumerable: true, get: function() {
      return refCount_1.refCount;
    } });
    var sample_1 = /* @__PURE__ */ requireSample();
    Object.defineProperty(exports, "sample", { enumerable: true, get: function() {
      return sample_1.sample;
    } });
    var sampleTime_1 = /* @__PURE__ */ requireSampleTime();
    Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function() {
      return sampleTime_1.sampleTime;
    } });
    var scan_1 = /* @__PURE__ */ requireScan();
    Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
      return scan_1.scan;
    } });
    var sequenceEqual_1 = /* @__PURE__ */ requireSequenceEqual();
    Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function() {
      return sequenceEqual_1.sequenceEqual;
    } });
    var share_1 = /* @__PURE__ */ requireShare();
    Object.defineProperty(exports, "share", { enumerable: true, get: function() {
      return share_1.share;
    } });
    var shareReplay_1 = /* @__PURE__ */ requireShareReplay();
    Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function() {
      return shareReplay_1.shareReplay;
    } });
    var single_1 = /* @__PURE__ */ requireSingle();
    Object.defineProperty(exports, "single", { enumerable: true, get: function() {
      return single_1.single;
    } });
    var skip_1 = /* @__PURE__ */ requireSkip();
    Object.defineProperty(exports, "skip", { enumerable: true, get: function() {
      return skip_1.skip;
    } });
    var skipLast_1 = /* @__PURE__ */ requireSkipLast();
    Object.defineProperty(exports, "skipLast", { enumerable: true, get: function() {
      return skipLast_1.skipLast;
    } });
    var skipUntil_1 = /* @__PURE__ */ requireSkipUntil();
    Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function() {
      return skipUntil_1.skipUntil;
    } });
    var skipWhile_1 = /* @__PURE__ */ requireSkipWhile();
    Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function() {
      return skipWhile_1.skipWhile;
    } });
    var startWith_1 = /* @__PURE__ */ requireStartWith();
    Object.defineProperty(exports, "startWith", { enumerable: true, get: function() {
      return startWith_1.startWith;
    } });
    var subscribeOn_1 = /* @__PURE__ */ requireSubscribeOn();
    Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function() {
      return subscribeOn_1.subscribeOn;
    } });
    var switchAll_1 = /* @__PURE__ */ requireSwitchAll();
    Object.defineProperty(exports, "switchAll", { enumerable: true, get: function() {
      return switchAll_1.switchAll;
    } });
    var switchMap_1 = /* @__PURE__ */ requireSwitchMap();
    Object.defineProperty(exports, "switchMap", { enumerable: true, get: function() {
      return switchMap_1.switchMap;
    } });
    var switchMapTo_1 = /* @__PURE__ */ requireSwitchMapTo();
    Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function() {
      return switchMapTo_1.switchMapTo;
    } });
    var switchScan_1 = /* @__PURE__ */ requireSwitchScan();
    Object.defineProperty(exports, "switchScan", { enumerable: true, get: function() {
      return switchScan_1.switchScan;
    } });
    var take_1 = /* @__PURE__ */ requireTake();
    Object.defineProperty(exports, "take", { enumerable: true, get: function() {
      return take_1.take;
    } });
    var takeLast_1 = /* @__PURE__ */ requireTakeLast();
    Object.defineProperty(exports, "takeLast", { enumerable: true, get: function() {
      return takeLast_1.takeLast;
    } });
    var takeUntil_1 = /* @__PURE__ */ requireTakeUntil();
    Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function() {
      return takeUntil_1.takeUntil;
    } });
    var takeWhile_1 = /* @__PURE__ */ requireTakeWhile();
    Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function() {
      return takeWhile_1.takeWhile;
    } });
    var tap_1 = /* @__PURE__ */ requireTap();
    Object.defineProperty(exports, "tap", { enumerable: true, get: function() {
      return tap_1.tap;
    } });
    var throttle_1 = /* @__PURE__ */ requireThrottle();
    Object.defineProperty(exports, "throttle", { enumerable: true, get: function() {
      return throttle_1.throttle;
    } });
    var throttleTime_1 = /* @__PURE__ */ requireThrottleTime();
    Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function() {
      return throttleTime_1.throttleTime;
    } });
    var throwIfEmpty_1 = /* @__PURE__ */ requireThrowIfEmpty();
    Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function() {
      return throwIfEmpty_1.throwIfEmpty;
    } });
    var timeInterval_1 = /* @__PURE__ */ requireTimeInterval();
    Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function() {
      return timeInterval_1.timeInterval;
    } });
    var timeout_2 = /* @__PURE__ */ requireTimeout();
    Object.defineProperty(exports, "timeout", { enumerable: true, get: function() {
      return timeout_2.timeout;
    } });
    var timeoutWith_1 = /* @__PURE__ */ requireTimeoutWith();
    Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function() {
      return timeoutWith_1.timeoutWith;
    } });
    var timestamp_1 = /* @__PURE__ */ requireTimestamp();
    Object.defineProperty(exports, "timestamp", { enumerable: true, get: function() {
      return timestamp_1.timestamp;
    } });
    var toArray_1 = /* @__PURE__ */ requireToArray();
    Object.defineProperty(exports, "toArray", { enumerable: true, get: function() {
      return toArray_1.toArray;
    } });
    var window_1 = /* @__PURE__ */ requireWindow();
    Object.defineProperty(exports, "window", { enumerable: true, get: function() {
      return window_1.window;
    } });
    var windowCount_1 = /* @__PURE__ */ requireWindowCount();
    Object.defineProperty(exports, "windowCount", { enumerable: true, get: function() {
      return windowCount_1.windowCount;
    } });
    var windowTime_1 = /* @__PURE__ */ requireWindowTime();
    Object.defineProperty(exports, "windowTime", { enumerable: true, get: function() {
      return windowTime_1.windowTime;
    } });
    var windowToggle_1 = /* @__PURE__ */ requireWindowToggle();
    Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function() {
      return windowToggle_1.windowToggle;
    } });
    var windowWhen_1 = /* @__PURE__ */ requireWindowWhen();
    Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function() {
      return windowWhen_1.windowWhen;
    } });
    var withLatestFrom_1 = /* @__PURE__ */ requireWithLatestFrom();
    Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function() {
      return withLatestFrom_1.withLatestFrom;
    } });
    var zipAll_1 = /* @__PURE__ */ requireZipAll();
    Object.defineProperty(exports, "zipAll", { enumerable: true, get: function() {
      return zipAll_1.zipAll;
    } });
    var zipWith_1 = /* @__PURE__ */ requireZipWith();
    Object.defineProperty(exports, "zipWith", { enumerable: true, get: function() {
      return zipWith_1.zipWith;
    } });
  })(cjs);
  return cjs;
}
var cjsExports = /* @__PURE__ */ requireCjs();
function isRecord(value) {
  return typeof value == "object" && value !== null && !Array.isArray(value);
}
var s = { 0: 8203, 1: 8204, 2: 8205, 3: 8290, 4: 8291, 5: 8288, 6: 65279, 7: 8289, 8: 119155, 9: 119156, a: 119157, b: 119158, c: 119159, d: 119160, e: 119161, f: 119162 }, c = { 0: 8203, 1: 8204, 2: 8205, 3: 65279 }, u = new Array(4).fill(String.fromCodePoint(c[0])).join("");
function E(t2) {
  let e2 = JSON.stringify(t2);
  return `${u}${Array.from(e2).map((r2) => {
    let n2 = r2.charCodeAt(0);
    if (n2 > 255) throw new Error(`Only ASCII edit info can be encoded. Error attempting to encode ${e2} on character ${r2} (${n2})`);
    return Array.from(n2.toString(4).padStart(4, "0")).map((o2) => String.fromCodePoint(c[o2])).join("");
  }).join("")}`;
}
function I(t2) {
  return !Number.isNaN(Number(t2)) || /[a-z]/i.test(t2) && !/\d+(?:[-:\/]\d+){2}(?:T\d+(?:[-:\/]\d+){1,2}(\.\d+)?Z?)?/.test(t2) ? false : !!Date.parse(t2);
}
function T(t2) {
  try {
    new URL(t2, t2.startsWith("/") ? "https://acme.com" : void 0);
  } catch {
    return false;
  }
  return true;
}
function C(t2, e2, r2 = "auto") {
  return r2 === true || r2 === "auto" && (I(t2) || T(t2)) ? t2 : `${t2}${E(e2)}`;
}
Object.fromEntries(Object.entries(c).map((t2) => t2.reverse()));
Object.fromEntries(Object.entries(s).map((t2) => t2.reverse()));
var S = `${Object.values(s).map((t2) => `\\u{${t2.toString(16)}}`).join("")}`, f = new RegExp(`[${S}]{4,}`, "gu");
function _(t2) {
  var e2;
  return { cleaned: t2.replace(f, ""), encoded: ((e2 = t2.match(f)) == null ? void 0 : e2[0]) || "" };
}
function O(t2) {
  return t2 && JSON.parse(_(JSON.stringify(t2)).cleaned);
}
function stegaClean(result) {
  return O(result);
}
var operators = {};
var partition = {};
var hasRequiredPartition;
function requirePartition() {
  if (hasRequiredPartition) return partition;
  hasRequiredPartition = 1;
  Object.defineProperty(partition, "__esModule", { value: true });
  partition.partition = void 0;
  var not_1 = /* @__PURE__ */ requireNot();
  var filter_1 = /* @__PURE__ */ requireFilter();
  function partition$12(predicate, thisArg) {
    return function(source) {
      return [filter_1.filter(predicate, thisArg)(source), filter_1.filter(not_1.not(predicate, thisArg))(source)];
    };
  }
  partition.partition = partition$12;
  return partition;
}
var race = {};
var hasRequiredRace;
function requireRace() {
  if (hasRequiredRace) return race;
  hasRequiredRace = 1;
  var __read = race && race.__read || function(o2, n2) {
    var m = typeof Symbol === "function" && o2[Symbol.iterator];
    if (!m) return o2;
    var i2 = m.call(o2), r2, ar = [], e2;
    try {
      while ((n2 === void 0 || n2-- > 0) && !(r2 = i2.next()).done) ar.push(r2.value);
    } catch (error) {
      e2 = { error };
    } finally {
      try {
        if (r2 && !r2.done && (m = i2["return"])) m.call(i2);
      } finally {
        if (e2) throw e2.error;
      }
    }
    return ar;
  };
  var __spreadArray = race && race.__spreadArray || function(to, from2) {
    for (var i2 = 0, il = from2.length, j2 = to.length; i2 < il; i2++, j2++)
      to[j2] = from2[i2];
    return to;
  };
  Object.defineProperty(race, "__esModule", { value: true });
  race.race = void 0;
  var argsOrArgArray_1 = /* @__PURE__ */ requireArgsOrArgArray();
  var raceWith_1 = /* @__PURE__ */ requireRaceWith();
  function race$12() {
    var args2 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args2[_i] = arguments[_i];
    }
    return raceWith_1.raceWith.apply(void 0, __spreadArray([], __read(argsOrArgArray_1.argsOrArgArray(args2))));
  }
  race.race = race$12;
  return race;
}
var hasRequiredOperators;
function requireOperators() {
  if (hasRequiredOperators) return operators;
  hasRequiredOperators = 1;
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mergeAll = exports.merge = exports.max = exports.materialize = exports.mapTo = exports.map = exports.last = exports.isEmpty = exports.ignoreElements = exports.groupBy = exports.first = exports.findIndex = exports.find = exports.finalize = exports.filter = exports.expand = exports.exhaustMap = exports.exhaustAll = exports.exhaust = exports.every = exports.endWith = exports.elementAt = exports.distinctUntilKeyChanged = exports.distinctUntilChanged = exports.distinct = exports.dematerialize = exports.delayWhen = exports.delay = exports.defaultIfEmpty = exports.debounceTime = exports.debounce = exports.count = exports.connect = exports.concatWith = exports.concatMapTo = exports.concatMap = exports.concatAll = exports.concat = exports.combineLatestWith = exports.combineLatest = exports.combineLatestAll = exports.combineAll = exports.catchError = exports.bufferWhen = exports.bufferToggle = exports.bufferTime = exports.bufferCount = exports.buffer = exports.auditTime = exports.audit = void 0;
    exports.timeInterval = exports.throwIfEmpty = exports.throttleTime = exports.throttle = exports.tap = exports.takeWhile = exports.takeUntil = exports.takeLast = exports.take = exports.switchScan = exports.switchMapTo = exports.switchMap = exports.switchAll = exports.subscribeOn = exports.startWith = exports.skipWhile = exports.skipUntil = exports.skipLast = exports.skip = exports.single = exports.shareReplay = exports.share = exports.sequenceEqual = exports.scan = exports.sampleTime = exports.sample = exports.refCount = exports.retryWhen = exports.retry = exports.repeatWhen = exports.repeat = exports.reduce = exports.raceWith = exports.race = exports.publishReplay = exports.publishLast = exports.publishBehavior = exports.publish = exports.pluck = exports.partition = exports.pairwise = exports.onErrorResumeNext = exports.observeOn = exports.multicast = exports.min = exports.mergeWith = exports.mergeScan = exports.mergeMapTo = exports.mergeMap = exports.flatMap = void 0;
    exports.zipWith = exports.zipAll = exports.zip = exports.withLatestFrom = exports.windowWhen = exports.windowToggle = exports.windowTime = exports.windowCount = exports.window = exports.toArray = exports.timestamp = exports.timeoutWith = exports.timeout = void 0;
    var audit_1 = /* @__PURE__ */ requireAudit();
    Object.defineProperty(exports, "audit", { enumerable: true, get: function() {
      return audit_1.audit;
    } });
    var auditTime_1 = /* @__PURE__ */ requireAuditTime();
    Object.defineProperty(exports, "auditTime", { enumerable: true, get: function() {
      return auditTime_1.auditTime;
    } });
    var buffer_1 = /* @__PURE__ */ requireBuffer();
    Object.defineProperty(exports, "buffer", { enumerable: true, get: function() {
      return buffer_1.buffer;
    } });
    var bufferCount_1 = /* @__PURE__ */ requireBufferCount();
    Object.defineProperty(exports, "bufferCount", { enumerable: true, get: function() {
      return bufferCount_1.bufferCount;
    } });
    var bufferTime_1 = /* @__PURE__ */ requireBufferTime();
    Object.defineProperty(exports, "bufferTime", { enumerable: true, get: function() {
      return bufferTime_1.bufferTime;
    } });
    var bufferToggle_1 = /* @__PURE__ */ requireBufferToggle();
    Object.defineProperty(exports, "bufferToggle", { enumerable: true, get: function() {
      return bufferToggle_1.bufferToggle;
    } });
    var bufferWhen_1 = /* @__PURE__ */ requireBufferWhen();
    Object.defineProperty(exports, "bufferWhen", { enumerable: true, get: function() {
      return bufferWhen_1.bufferWhen;
    } });
    var catchError_1 = /* @__PURE__ */ requireCatchError();
    Object.defineProperty(exports, "catchError", { enumerable: true, get: function() {
      return catchError_1.catchError;
    } });
    var combineAll_1 = /* @__PURE__ */ requireCombineAll();
    Object.defineProperty(exports, "combineAll", { enumerable: true, get: function() {
      return combineAll_1.combineAll;
    } });
    var combineLatestAll_1 = /* @__PURE__ */ requireCombineLatestAll();
    Object.defineProperty(exports, "combineLatestAll", { enumerable: true, get: function() {
      return combineLatestAll_1.combineLatestAll;
    } });
    var combineLatest_1 = /* @__PURE__ */ requireCombineLatest();
    Object.defineProperty(exports, "combineLatest", { enumerable: true, get: function() {
      return combineLatest_1.combineLatest;
    } });
    var combineLatestWith_1 = /* @__PURE__ */ requireCombineLatestWith();
    Object.defineProperty(exports, "combineLatestWith", { enumerable: true, get: function() {
      return combineLatestWith_1.combineLatestWith;
    } });
    var concat_1 = /* @__PURE__ */ requireConcat();
    Object.defineProperty(exports, "concat", { enumerable: true, get: function() {
      return concat_1.concat;
    } });
    var concatAll_1 = /* @__PURE__ */ requireConcatAll();
    Object.defineProperty(exports, "concatAll", { enumerable: true, get: function() {
      return concatAll_1.concatAll;
    } });
    var concatMap_1 = /* @__PURE__ */ requireConcatMap();
    Object.defineProperty(exports, "concatMap", { enumerable: true, get: function() {
      return concatMap_1.concatMap;
    } });
    var concatMapTo_1 = /* @__PURE__ */ requireConcatMapTo();
    Object.defineProperty(exports, "concatMapTo", { enumerable: true, get: function() {
      return concatMapTo_1.concatMapTo;
    } });
    var concatWith_1 = /* @__PURE__ */ requireConcatWith();
    Object.defineProperty(exports, "concatWith", { enumerable: true, get: function() {
      return concatWith_1.concatWith;
    } });
    var connect_1 = /* @__PURE__ */ requireConnect();
    Object.defineProperty(exports, "connect", { enumerable: true, get: function() {
      return connect_1.connect;
    } });
    var count_1 = /* @__PURE__ */ requireCount();
    Object.defineProperty(exports, "count", { enumerable: true, get: function() {
      return count_1.count;
    } });
    var debounce_1 = /* @__PURE__ */ requireDebounce();
    Object.defineProperty(exports, "debounce", { enumerable: true, get: function() {
      return debounce_1.debounce;
    } });
    var debounceTime_1 = /* @__PURE__ */ requireDebounceTime();
    Object.defineProperty(exports, "debounceTime", { enumerable: true, get: function() {
      return debounceTime_1.debounceTime;
    } });
    var defaultIfEmpty_1 = /* @__PURE__ */ requireDefaultIfEmpty();
    Object.defineProperty(exports, "defaultIfEmpty", { enumerable: true, get: function() {
      return defaultIfEmpty_1.defaultIfEmpty;
    } });
    var delay_1 = /* @__PURE__ */ requireDelay();
    Object.defineProperty(exports, "delay", { enumerable: true, get: function() {
      return delay_1.delay;
    } });
    var delayWhen_1 = /* @__PURE__ */ requireDelayWhen();
    Object.defineProperty(exports, "delayWhen", { enumerable: true, get: function() {
      return delayWhen_1.delayWhen;
    } });
    var dematerialize_1 = /* @__PURE__ */ requireDematerialize();
    Object.defineProperty(exports, "dematerialize", { enumerable: true, get: function() {
      return dematerialize_1.dematerialize;
    } });
    var distinct_1 = /* @__PURE__ */ requireDistinct();
    Object.defineProperty(exports, "distinct", { enumerable: true, get: function() {
      return distinct_1.distinct;
    } });
    var distinctUntilChanged_1 = /* @__PURE__ */ requireDistinctUntilChanged();
    Object.defineProperty(exports, "distinctUntilChanged", { enumerable: true, get: function() {
      return distinctUntilChanged_1.distinctUntilChanged;
    } });
    var distinctUntilKeyChanged_1 = /* @__PURE__ */ requireDistinctUntilKeyChanged();
    Object.defineProperty(exports, "distinctUntilKeyChanged", { enumerable: true, get: function() {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
    } });
    var elementAt_1 = /* @__PURE__ */ requireElementAt();
    Object.defineProperty(exports, "elementAt", { enumerable: true, get: function() {
      return elementAt_1.elementAt;
    } });
    var endWith_1 = /* @__PURE__ */ requireEndWith();
    Object.defineProperty(exports, "endWith", { enumerable: true, get: function() {
      return endWith_1.endWith;
    } });
    var every_1 = /* @__PURE__ */ requireEvery();
    Object.defineProperty(exports, "every", { enumerable: true, get: function() {
      return every_1.every;
    } });
    var exhaust_1 = /* @__PURE__ */ requireExhaust();
    Object.defineProperty(exports, "exhaust", { enumerable: true, get: function() {
      return exhaust_1.exhaust;
    } });
    var exhaustAll_1 = /* @__PURE__ */ requireExhaustAll();
    Object.defineProperty(exports, "exhaustAll", { enumerable: true, get: function() {
      return exhaustAll_1.exhaustAll;
    } });
    var exhaustMap_1 = /* @__PURE__ */ requireExhaustMap();
    Object.defineProperty(exports, "exhaustMap", { enumerable: true, get: function() {
      return exhaustMap_1.exhaustMap;
    } });
    var expand_1 = /* @__PURE__ */ requireExpand();
    Object.defineProperty(exports, "expand", { enumerable: true, get: function() {
      return expand_1.expand;
    } });
    var filter_1 = /* @__PURE__ */ requireFilter();
    Object.defineProperty(exports, "filter", { enumerable: true, get: function() {
      return filter_1.filter;
    } });
    var finalize_1 = /* @__PURE__ */ requireFinalize();
    Object.defineProperty(exports, "finalize", { enumerable: true, get: function() {
      return finalize_1.finalize;
    } });
    var find_1 = /* @__PURE__ */ requireFind();
    Object.defineProperty(exports, "find", { enumerable: true, get: function() {
      return find_1.find;
    } });
    var findIndex_1 = /* @__PURE__ */ requireFindIndex();
    Object.defineProperty(exports, "findIndex", { enumerable: true, get: function() {
      return findIndex_1.findIndex;
    } });
    var first_1 = /* @__PURE__ */ requireFirst();
    Object.defineProperty(exports, "first", { enumerable: true, get: function() {
      return first_1.first;
    } });
    var groupBy_1 = /* @__PURE__ */ requireGroupBy();
    Object.defineProperty(exports, "groupBy", { enumerable: true, get: function() {
      return groupBy_1.groupBy;
    } });
    var ignoreElements_1 = /* @__PURE__ */ requireIgnoreElements();
    Object.defineProperty(exports, "ignoreElements", { enumerable: true, get: function() {
      return ignoreElements_1.ignoreElements;
    } });
    var isEmpty_1 = /* @__PURE__ */ requireIsEmpty();
    Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function() {
      return isEmpty_1.isEmpty;
    } });
    var last_1 = /* @__PURE__ */ requireLast();
    Object.defineProperty(exports, "last", { enumerable: true, get: function() {
      return last_1.last;
    } });
    var map_1 = /* @__PURE__ */ requireMap();
    Object.defineProperty(exports, "map", { enumerable: true, get: function() {
      return map_1.map;
    } });
    var mapTo_1 = /* @__PURE__ */ requireMapTo();
    Object.defineProperty(exports, "mapTo", { enumerable: true, get: function() {
      return mapTo_1.mapTo;
    } });
    var materialize_1 = /* @__PURE__ */ requireMaterialize();
    Object.defineProperty(exports, "materialize", { enumerable: true, get: function() {
      return materialize_1.materialize;
    } });
    var max_1 = /* @__PURE__ */ requireMax();
    Object.defineProperty(exports, "max", { enumerable: true, get: function() {
      return max_1.max;
    } });
    var merge_1 = /* @__PURE__ */ requireMerge();
    Object.defineProperty(exports, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var mergeAll_1 = /* @__PURE__ */ requireMergeAll();
    Object.defineProperty(exports, "mergeAll", { enumerable: true, get: function() {
      return mergeAll_1.mergeAll;
    } });
    var flatMap_1 = /* @__PURE__ */ requireFlatMap();
    Object.defineProperty(exports, "flatMap", { enumerable: true, get: function() {
      return flatMap_1.flatMap;
    } });
    var mergeMap_1 = /* @__PURE__ */ requireMergeMap();
    Object.defineProperty(exports, "mergeMap", { enumerable: true, get: function() {
      return mergeMap_1.mergeMap;
    } });
    var mergeMapTo_1 = /* @__PURE__ */ requireMergeMapTo();
    Object.defineProperty(exports, "mergeMapTo", { enumerable: true, get: function() {
      return mergeMapTo_1.mergeMapTo;
    } });
    var mergeScan_1 = /* @__PURE__ */ requireMergeScan();
    Object.defineProperty(exports, "mergeScan", { enumerable: true, get: function() {
      return mergeScan_1.mergeScan;
    } });
    var mergeWith_1 = /* @__PURE__ */ requireMergeWith();
    Object.defineProperty(exports, "mergeWith", { enumerable: true, get: function() {
      return mergeWith_1.mergeWith;
    } });
    var min_1 = /* @__PURE__ */ requireMin();
    Object.defineProperty(exports, "min", { enumerable: true, get: function() {
      return min_1.min;
    } });
    var multicast_1 = /* @__PURE__ */ requireMulticast();
    Object.defineProperty(exports, "multicast", { enumerable: true, get: function() {
      return multicast_1.multicast;
    } });
    var observeOn_1 = /* @__PURE__ */ requireObserveOn();
    Object.defineProperty(exports, "observeOn", { enumerable: true, get: function() {
      return observeOn_1.observeOn;
    } });
    var onErrorResumeNextWith_1 = /* @__PURE__ */ requireOnErrorResumeNextWith();
    Object.defineProperty(exports, "onErrorResumeNext", { enumerable: true, get: function() {
      return onErrorResumeNextWith_1.onErrorResumeNext;
    } });
    var pairwise_1 = /* @__PURE__ */ requirePairwise();
    Object.defineProperty(exports, "pairwise", { enumerable: true, get: function() {
      return pairwise_1.pairwise;
    } });
    var partition_1 = /* @__PURE__ */ requirePartition();
    Object.defineProperty(exports, "partition", { enumerable: true, get: function() {
      return partition_1.partition;
    } });
    var pluck_1 = /* @__PURE__ */ requirePluck();
    Object.defineProperty(exports, "pluck", { enumerable: true, get: function() {
      return pluck_1.pluck;
    } });
    var publish_1 = /* @__PURE__ */ requirePublish();
    Object.defineProperty(exports, "publish", { enumerable: true, get: function() {
      return publish_1.publish;
    } });
    var publishBehavior_1 = /* @__PURE__ */ requirePublishBehavior();
    Object.defineProperty(exports, "publishBehavior", { enumerable: true, get: function() {
      return publishBehavior_1.publishBehavior;
    } });
    var publishLast_1 = /* @__PURE__ */ requirePublishLast();
    Object.defineProperty(exports, "publishLast", { enumerable: true, get: function() {
      return publishLast_1.publishLast;
    } });
    var publishReplay_1 = /* @__PURE__ */ requirePublishReplay();
    Object.defineProperty(exports, "publishReplay", { enumerable: true, get: function() {
      return publishReplay_1.publishReplay;
    } });
    var race_1 = /* @__PURE__ */ requireRace();
    Object.defineProperty(exports, "race", { enumerable: true, get: function() {
      return race_1.race;
    } });
    var raceWith_1 = /* @__PURE__ */ requireRaceWith();
    Object.defineProperty(exports, "raceWith", { enumerable: true, get: function() {
      return raceWith_1.raceWith;
    } });
    var reduce_1 = /* @__PURE__ */ requireReduce();
    Object.defineProperty(exports, "reduce", { enumerable: true, get: function() {
      return reduce_1.reduce;
    } });
    var repeat_1 = /* @__PURE__ */ requireRepeat();
    Object.defineProperty(exports, "repeat", { enumerable: true, get: function() {
      return repeat_1.repeat;
    } });
    var repeatWhen_1 = /* @__PURE__ */ requireRepeatWhen();
    Object.defineProperty(exports, "repeatWhen", { enumerable: true, get: function() {
      return repeatWhen_1.repeatWhen;
    } });
    var retry_1 = /* @__PURE__ */ requireRetry();
    Object.defineProperty(exports, "retry", { enumerable: true, get: function() {
      return retry_1.retry;
    } });
    var retryWhen_1 = /* @__PURE__ */ requireRetryWhen();
    Object.defineProperty(exports, "retryWhen", { enumerable: true, get: function() {
      return retryWhen_1.retryWhen;
    } });
    var refCount_1 = /* @__PURE__ */ requireRefCount();
    Object.defineProperty(exports, "refCount", { enumerable: true, get: function() {
      return refCount_1.refCount;
    } });
    var sample_1 = /* @__PURE__ */ requireSample();
    Object.defineProperty(exports, "sample", { enumerable: true, get: function() {
      return sample_1.sample;
    } });
    var sampleTime_1 = /* @__PURE__ */ requireSampleTime();
    Object.defineProperty(exports, "sampleTime", { enumerable: true, get: function() {
      return sampleTime_1.sampleTime;
    } });
    var scan_1 = /* @__PURE__ */ requireScan();
    Object.defineProperty(exports, "scan", { enumerable: true, get: function() {
      return scan_1.scan;
    } });
    var sequenceEqual_1 = /* @__PURE__ */ requireSequenceEqual();
    Object.defineProperty(exports, "sequenceEqual", { enumerable: true, get: function() {
      return sequenceEqual_1.sequenceEqual;
    } });
    var share_1 = /* @__PURE__ */ requireShare();
    Object.defineProperty(exports, "share", { enumerable: true, get: function() {
      return share_1.share;
    } });
    var shareReplay_1 = /* @__PURE__ */ requireShareReplay();
    Object.defineProperty(exports, "shareReplay", { enumerable: true, get: function() {
      return shareReplay_1.shareReplay;
    } });
    var single_1 = /* @__PURE__ */ requireSingle();
    Object.defineProperty(exports, "single", { enumerable: true, get: function() {
      return single_1.single;
    } });
    var skip_1 = /* @__PURE__ */ requireSkip();
    Object.defineProperty(exports, "skip", { enumerable: true, get: function() {
      return skip_1.skip;
    } });
    var skipLast_1 = /* @__PURE__ */ requireSkipLast();
    Object.defineProperty(exports, "skipLast", { enumerable: true, get: function() {
      return skipLast_1.skipLast;
    } });
    var skipUntil_1 = /* @__PURE__ */ requireSkipUntil();
    Object.defineProperty(exports, "skipUntil", { enumerable: true, get: function() {
      return skipUntil_1.skipUntil;
    } });
    var skipWhile_1 = /* @__PURE__ */ requireSkipWhile();
    Object.defineProperty(exports, "skipWhile", { enumerable: true, get: function() {
      return skipWhile_1.skipWhile;
    } });
    var startWith_1 = /* @__PURE__ */ requireStartWith();
    Object.defineProperty(exports, "startWith", { enumerable: true, get: function() {
      return startWith_1.startWith;
    } });
    var subscribeOn_1 = /* @__PURE__ */ requireSubscribeOn();
    Object.defineProperty(exports, "subscribeOn", { enumerable: true, get: function() {
      return subscribeOn_1.subscribeOn;
    } });
    var switchAll_1 = /* @__PURE__ */ requireSwitchAll();
    Object.defineProperty(exports, "switchAll", { enumerable: true, get: function() {
      return switchAll_1.switchAll;
    } });
    var switchMap_1 = /* @__PURE__ */ requireSwitchMap();
    Object.defineProperty(exports, "switchMap", { enumerable: true, get: function() {
      return switchMap_1.switchMap;
    } });
    var switchMapTo_1 = /* @__PURE__ */ requireSwitchMapTo();
    Object.defineProperty(exports, "switchMapTo", { enumerable: true, get: function() {
      return switchMapTo_1.switchMapTo;
    } });
    var switchScan_1 = /* @__PURE__ */ requireSwitchScan();
    Object.defineProperty(exports, "switchScan", { enumerable: true, get: function() {
      return switchScan_1.switchScan;
    } });
    var take_1 = /* @__PURE__ */ requireTake();
    Object.defineProperty(exports, "take", { enumerable: true, get: function() {
      return take_1.take;
    } });
    var takeLast_1 = /* @__PURE__ */ requireTakeLast();
    Object.defineProperty(exports, "takeLast", { enumerable: true, get: function() {
      return takeLast_1.takeLast;
    } });
    var takeUntil_1 = /* @__PURE__ */ requireTakeUntil();
    Object.defineProperty(exports, "takeUntil", { enumerable: true, get: function() {
      return takeUntil_1.takeUntil;
    } });
    var takeWhile_1 = /* @__PURE__ */ requireTakeWhile();
    Object.defineProperty(exports, "takeWhile", { enumerable: true, get: function() {
      return takeWhile_1.takeWhile;
    } });
    var tap_1 = /* @__PURE__ */ requireTap();
    Object.defineProperty(exports, "tap", { enumerable: true, get: function() {
      return tap_1.tap;
    } });
    var throttle_1 = /* @__PURE__ */ requireThrottle();
    Object.defineProperty(exports, "throttle", { enumerable: true, get: function() {
      return throttle_1.throttle;
    } });
    var throttleTime_1 = /* @__PURE__ */ requireThrottleTime();
    Object.defineProperty(exports, "throttleTime", { enumerable: true, get: function() {
      return throttleTime_1.throttleTime;
    } });
    var throwIfEmpty_1 = /* @__PURE__ */ requireThrowIfEmpty();
    Object.defineProperty(exports, "throwIfEmpty", { enumerable: true, get: function() {
      return throwIfEmpty_1.throwIfEmpty;
    } });
    var timeInterval_1 = /* @__PURE__ */ requireTimeInterval();
    Object.defineProperty(exports, "timeInterval", { enumerable: true, get: function() {
      return timeInterval_1.timeInterval;
    } });
    var timeout_1 = /* @__PURE__ */ requireTimeout();
    Object.defineProperty(exports, "timeout", { enumerable: true, get: function() {
      return timeout_1.timeout;
    } });
    var timeoutWith_1 = /* @__PURE__ */ requireTimeoutWith();
    Object.defineProperty(exports, "timeoutWith", { enumerable: true, get: function() {
      return timeoutWith_1.timeoutWith;
    } });
    var timestamp_1 = /* @__PURE__ */ requireTimestamp();
    Object.defineProperty(exports, "timestamp", { enumerable: true, get: function() {
      return timestamp_1.timestamp;
    } });
    var toArray_1 = /* @__PURE__ */ requireToArray();
    Object.defineProperty(exports, "toArray", { enumerable: true, get: function() {
      return toArray_1.toArray;
    } });
    var window_1 = /* @__PURE__ */ requireWindow();
    Object.defineProperty(exports, "window", { enumerable: true, get: function() {
      return window_1.window;
    } });
    var windowCount_1 = /* @__PURE__ */ requireWindowCount();
    Object.defineProperty(exports, "windowCount", { enumerable: true, get: function() {
      return windowCount_1.windowCount;
    } });
    var windowTime_1 = /* @__PURE__ */ requireWindowTime();
    Object.defineProperty(exports, "windowTime", { enumerable: true, get: function() {
      return windowTime_1.windowTime;
    } });
    var windowToggle_1 = /* @__PURE__ */ requireWindowToggle();
    Object.defineProperty(exports, "windowToggle", { enumerable: true, get: function() {
      return windowToggle_1.windowToggle;
    } });
    var windowWhen_1 = /* @__PURE__ */ requireWindowWhen();
    Object.defineProperty(exports, "windowWhen", { enumerable: true, get: function() {
      return windowWhen_1.windowWhen;
    } });
    var withLatestFrom_1 = /* @__PURE__ */ requireWithLatestFrom();
    Object.defineProperty(exports, "withLatestFrom", { enumerable: true, get: function() {
      return withLatestFrom_1.withLatestFrom;
    } });
    var zip_1 = /* @__PURE__ */ requireZip();
    Object.defineProperty(exports, "zip", { enumerable: true, get: function() {
      return zip_1.zip;
    } });
    var zipAll_1 = /* @__PURE__ */ requireZipAll();
    Object.defineProperty(exports, "zipAll", { enumerable: true, get: function() {
      return zipAll_1.zipAll;
    } });
    var zipWith_1 = /* @__PURE__ */ requireZipWith();
    Object.defineProperty(exports, "zipWith", { enumerable: true, get: function() {
      return zipWith_1.zipWith;
    } });
  })(operators);
  return operators;
}
var operatorsExports = /* @__PURE__ */ requireOperators();
const DRAFTS_FOLDER = "drafts", VERSION_FOLDER = "versions", PATH_SEPARATOR = ".", DRAFTS_PREFIX = `${DRAFTS_FOLDER}${PATH_SEPARATOR}`, VERSION_PREFIX = `${VERSION_FOLDER}${PATH_SEPARATOR}`;
function isDraftId(id) {
  return id.startsWith(DRAFTS_PREFIX);
}
function isVersionId(id) {
  return id.startsWith(VERSION_PREFIX);
}
function getDraftId(id) {
  if (isVersionId(id)) {
    const publishedId = getPublishedId(id);
    return DRAFTS_PREFIX + publishedId;
  }
  return isDraftId(id) ? id : DRAFTS_PREFIX + id;
}
function getVersionId(id, version) {
  if (version === "drafts" || version === "published")
    throw new Error('Version can not be "published" or "drafts"');
  return `${VERSION_PREFIX}${version}${PATH_SEPARATOR}${getPublishedId(id)}`;
}
function getVersionFromId(id) {
  if (!isVersionId(id)) return;
  const [_versionPrefix, versionId, ..._publishedId] = id.split(PATH_SEPARATOR);
  return versionId;
}
function getPublishedId(id) {
  return isVersionId(id) ? id.split(PATH_SEPARATOR).slice(2).join(PATH_SEPARATOR) : isDraftId(id) ? id.slice(DRAFTS_PREFIX.length) : id;
}
const POOL_SIZE_MULTIPLIER = 128;
let pool, poolOffset;
let fillPool = (bytes) => {
  if (!pool || pool.length < bytes) {
    pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
    crypto.randomFillSync(pool);
    poolOffset = 0;
  } else if (poolOffset + bytes > pool.length) {
    crypto.randomFillSync(pool);
    poolOffset = 0;
  }
  poolOffset += bytes;
};
let random = (bytes) => {
  fillPool(bytes |= 0);
  return pool.subarray(poolOffset - bytes, poolOffset);
};
let customRandom = (alphabet, defaultSize, getRandom) => {
  let mask = (2 << 31 - Math.clz32(alphabet.length - 1 | 1)) - 1;
  let step = Math.ceil(1.6 * mask * defaultSize / alphabet.length);
  return (size = defaultSize) => {
    let id = "";
    while (true) {
      let bytes = getRandom(step);
      let i2 = step;
      while (i2--) {
        id += alphabet[bytes[i2] & mask] || "";
        if (id.length === size) return id;
      }
    }
  };
};
let customAlphabet = (alphabet, size = 21) => customRandom(alphabet, size, random);
const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
function codeFrame(query, location2, message) {
  const lines = query.split(NEWLINE), loc = {
    start: columnToLine(location2.start, lines),
    end: location2.end ? columnToLine(location2.end, lines) : void 0
  }, { start, end, markerLines } = getMarkerLines(loc, lines), numberMaxWidth = `${end}`.length;
  return query.split(NEWLINE, end).slice(start, end).map((line, index) => {
    const number = start + 1 + index, gutter = ` ${` ${number}`.slice(-numberMaxWidth)} |`, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
    if (!hasMarker)
      return ` ${gutter}${line.length > 0 ? ` ${line}` : ""}`;
    let markerLine = "";
    if (Array.isArray(hasMarker)) {
      const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
      markerLine = [
        `
 `,
        gutter.replace(/\d/g, " "),
        " ",
        markerSpacing,
        "^".repeat(numberOfMarkers)
      ].join(""), lastMarkerLine && message && (markerLine += " " + message);
    }
    return [">", gutter, line.length > 0 ? ` ${line}` : "", markerLine].join("");
  }).join(`
`);
}
function getMarkerLines(loc, source) {
  const startLoc = { ...loc.start }, endLoc = { ...startLoc, ...loc.end }, linesAbove = 2, linesBelow = 3, startLine = startLoc.line ?? -1, startColumn = startLoc.column ?? 0, endLine = endLoc.line, endColumn = endLoc.column;
  let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
  startLine === -1 && (start = 0), endLine === -1 && (end = source.length);
  const lineDiff = endLine - startLine, markerLines = {};
  if (lineDiff)
    for (let i2 = 0; i2 <= lineDiff; i2++) {
      const lineNumber = i2 + startLine;
      if (!startColumn)
        markerLines[lineNumber] = true;
      else if (i2 === 0) {
        const sourceLength = source[lineNumber - 1].length;
        markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
      } else if (i2 === lineDiff)
        markerLines[lineNumber] = [0, endColumn];
      else {
        const sourceLength = source[lineNumber - i2].length;
        markerLines[lineNumber] = [0, sourceLength];
      }
    }
  else
    startColumn === endColumn ? startColumn ? markerLines[startLine] = [startColumn, 0] : markerLines[startLine] = true : markerLines[startLine] = [startColumn, endColumn - startColumn];
  return { start, end, markerLines };
}
function columnToLine(column, lines) {
  let offset = 0;
  for (let i2 = 0; i2 < lines.length; i2++) {
    const lineLength = lines[i2].length + 1;
    if (offset + lineLength > column)
      return {
        line: i2 + 1,
        // 1-based line
        column: column - offset
        // 0-based column
      };
    offset += lineLength;
  }
  return {
    line: lines.length,
    column: lines[lines.length - 1]?.length ?? 0
  };
}
const MAX_ITEMS_IN_ERROR_MESSAGE = 5;
class ClientError extends Error {
  response;
  statusCode = 400;
  responseBody;
  details;
  constructor(res, context) {
    const props = extractErrorProps(res, context);
    super(props.message), Object.assign(this, props);
  }
}
class ServerError extends Error {
  response;
  statusCode = 500;
  responseBody;
  details;
  constructor(res) {
    const props = extractErrorProps(res);
    super(props.message), Object.assign(this, props);
  }
}
function extractErrorProps(res, context) {
  const body = res.body, props = {
    response: res,
    statusCode: res.statusCode,
    responseBody: stringifyBody(body, res),
    message: "",
    details: void 0
  };
  if (!isRecord(body))
    return props.message = httpErrorMessage(res, body), props;
  const error = body.error;
  if (typeof error == "string" && typeof body.message == "string")
    return props.message = `${error} - ${body.message}`, props;
  if (typeof error != "object" || error === null)
    return typeof error == "string" ? props.message = error : typeof body.message == "string" ? props.message = body.message : props.message = httpErrorMessage(res, body), props;
  if (isMutationError(error) || isActionError(error)) {
    const allItems = error.items || [], items = allItems.slice(0, MAX_ITEMS_IN_ERROR_MESSAGE).map((item) => item.error?.description).filter(Boolean);
    let itemsStr = items.length ? `:
- ${items.join(`
- `)}` : "";
    return allItems.length > MAX_ITEMS_IN_ERROR_MESSAGE && (itemsStr += `
...and ${allItems.length - MAX_ITEMS_IN_ERROR_MESSAGE} more`), props.message = `${error.description}${itemsStr}`, props.details = body.error, props;
  }
  if (isQueryParseError(error)) {
    const tag = context?.options?.query?.tag;
    return props.message = formatQueryParseError(error, tag), props.details = body.error, props;
  }
  return "description" in error && typeof error.description == "string" ? (props.message = error.description, props.details = error, props) : (props.message = httpErrorMessage(res, body), props);
}
function isMutationError(error) {
  return "type" in error && error.type === "mutationError" && "description" in error && typeof error.description == "string";
}
function isActionError(error) {
  return "type" in error && error.type === "actionError" && "description" in error && typeof error.description == "string";
}
function isQueryParseError(error) {
  return isRecord(error) && error.type === "queryParseError" && typeof error.query == "string" && typeof error.start == "number" && typeof error.end == "number";
}
function formatQueryParseError(error, tag) {
  const { query, start, end, description } = error;
  if (!query || typeof start > "u")
    return `GROQ query parse error: ${description}`;
  const withTag = tag ? `

Tag: ${tag}` : "";
  return `GROQ query parse error:
${codeFrame(query, { start, end }, description)}${withTag}`;
}
function httpErrorMessage(res, body) {
  const details = typeof body == "string" ? ` (${sliceWithEllipsis(body, 100)})` : "", statusMessage = res.statusMessage ? ` ${res.statusMessage}` : "";
  return `${res.method}-request to ${res.url} resulted in HTTP ${res.statusCode}${statusMessage}${details}`;
}
function stringifyBody(body, res) {
  return (res.headers["content-type"] || "").toLowerCase().indexOf("application/json") !== -1 ? JSON.stringify(body, null, 2) : body;
}
function sliceWithEllipsis(str, max2) {
  return str.length > max2 ? `${str.slice(0, max2)}…` : str;
}
class CorsOriginError extends Error {
  projectId;
  addOriginUrl;
  constructor({ projectId: projectId2 }) {
    super("CorsOriginError"), this.name = "CorsOriginError", this.projectId = projectId2;
    const url = new URL(`https://sanity.io/manage/project/${projectId2}/api`);
    if (typeof location < "u") {
      const { origin } = location;
      url.searchParams.set("cors", "add"), url.searchParams.set("origin", origin), this.addOriginUrl = url, this.message = `The current origin is not allowed to connect to the Live Content API. Add it here: ${url}`;
    } else
      this.message = `The current origin is not allowed to connect to the Live Content API. Change your configuration here: ${url}`;
  }
}
const httpError = {
  onResponse: (res, context) => {
    if (res.statusCode >= 500)
      throw new ServerError(res);
    if (res.statusCode >= 400)
      throw new ClientError(res, context);
    return res;
  }
};
function printWarnings(config2 = {}) {
  const seen = {}, shouldIgnoreWarning = (message) => config2.ignoreWarnings === void 0 ? false : (Array.isArray(config2.ignoreWarnings) ? config2.ignoreWarnings : [config2.ignoreWarnings]).some((pattern) => typeof pattern == "string" ? message.includes(pattern) : pattern instanceof RegExp ? pattern.test(message) : false);
  return {
    onResponse: (res) => {
      const warn = res.headers["x-sanity-warning"], warnings = Array.isArray(warn) ? warn : [warn];
      for (const msg of warnings)
        !msg || seen[msg] || shouldIgnoreWarning(msg) || (seen[msg] = true, console.warn(msg));
      return res;
    }
  };
}
function defineHttpRequest(envMiddleware2, config2 = {}) {
  return p$1([
    P({ shouldRetry }),
    ...envMiddleware2,
    printWarnings(config2),
    x(),
    E$1(),
    S$1(),
    httpError,
    A({ implementation: cjsExports.Observable })
  ]);
}
function shouldRetry(err, attempt, options) {
  if (options.maxRetries === 0) return false;
  const isSafe = options.method === "GET" || options.method === "HEAD", isQuery2 = (options.uri || options.url).startsWith("/data/query"), isRetriableResponse = err.response && (err.response.statusCode === 429 || err.response.statusCode === 502 || err.response.statusCode === 503);
  return (isSafe || isQuery2) && isRetriableResponse ? true : P.shouldRetry(err, attempt, options);
}
const BASE_URL = "https://www.sanity.io/help/";
function generateHelpUrl(slug) {
  return BASE_URL + slug;
}
const VALID_ASSET_TYPES = ["image", "file"], VALID_INSERT_LOCATIONS = ["before", "after", "replace"], dataset = (name) => {
  if (!/^(~[a-z0-9]{1}[-\w]{0,63}|[a-z0-9]{1}[-\w]{0,63})$/.test(name))
    throw new Error(
      "Datasets can only contain lowercase characters, numbers, underscores and dashes, and start with tilde, and be maximum 64 characters"
    );
}, projectId = (id) => {
  if (!/^[-a-z0-9]+$/i.test(id))
    throw new Error("`projectId` can only contain only a-z, 0-9 and dashes");
}, validateAssetType = (type) => {
  if (VALID_ASSET_TYPES.indexOf(type) === -1)
    throw new Error(`Invalid asset type: ${type}. Must be one of ${VALID_ASSET_TYPES.join(", ")}`);
}, validateObject = (op, val) => {
  if (val === null || typeof val != "object" || Array.isArray(val))
    throw new Error(`${op}() takes an object of properties`);
}, validateDocumentId = (op, id) => {
  if (typeof id != "string" || !/^[a-z0-9_][a-z0-9_.-]{0,127}$/i.test(id) || id.includes(".."))
    throw new Error(`${op}(): "${id}" is not a valid document ID`);
}, requireDocumentId = (op, doc) => {
  if (!doc._id)
    throw new Error(`${op}() requires that the document contains an ID ("_id" property)`);
  validateDocumentId(op, doc._id);
}, validateDocumentType = (op, type) => {
  if (typeof type != "string")
    throw new Error(`\`${op}()\`: \`${type}\` is not a valid document type`);
}, requireDocumentType = (op, doc) => {
  if (!doc._type)
    throw new Error(`\`${op}()\` requires that the document contains a type (\`_type\` property)`);
  validateDocumentType(op, doc._type);
}, validateVersionIdMatch = (builtVersionId, document2) => {
  if (document2._id && document2._id !== builtVersionId)
    throw new Error(
      `The provided document ID (\`${document2._id}\`) does not match the generated version ID (\`${builtVersionId}\`)`
    );
}, validateInsert = (at, selector, items) => {
  const signature = "insert(at, selector, items)";
  if (VALID_INSERT_LOCATIONS.indexOf(at) === -1) {
    const valid = VALID_INSERT_LOCATIONS.map((loc) => `"${loc}"`).join(", ");
    throw new Error(`${signature} takes an "at"-argument which is one of: ${valid}`);
  }
  if (typeof selector != "string")
    throw new Error(`${signature} takes a "selector"-argument which must be a string`);
  if (!Array.isArray(items))
    throw new Error(`${signature} takes an "items"-argument which must be an array`);
}, hasDataset = (config2) => {
  if (!config2.dataset)
    throw new Error("`dataset` must be provided to perform queries");
  return config2.dataset || "";
}, requestTag = (tag) => {
  if (typeof tag != "string" || !/^[a-z0-9._-]{1,75}$/i.test(tag))
    throw new Error(
      "Tag can only contain alphanumeric characters, underscores, dashes and dots, and be between one and 75 characters long."
    );
  return tag;
}, resourceConfig = (config2) => {
  if (!config2["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config2["~experimental_resource"];
  switch (type) {
    case "dataset": {
      if (id.split(".").length !== 2)
        throw new Error('Dataset resource ID must be in the format "project.dataset"');
      return;
    }
    case "dashboard":
    case "media-library":
    case "canvas":
      return;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
}, resourceGuard = (service, config2) => {
  if (config2["~experimental_resource"])
    throw new Error(`\`${service}\` does not support resource-based operations`);
};
function once(fn) {
  let didCall = false, returnValue;
  return (...args2) => (didCall || (returnValue = fn(...args2), didCall = true), returnValue);
}
const createWarningPrinter = (message) => (
  // eslint-disable-next-line no-console
  once((...args2) => console.warn(message.join(" "), ...args2))
), printCdnAndWithCredentialsWarning = createWarningPrinter([
  "Because you set `withCredentials` to true, we will override your `useCdn`",
  "setting to be false since (cookie-based) credentials are never set on the CDN"
]), printCdnWarning = createWarningPrinter([
  "Since you haven't set a value for `useCdn`, we will deliver content using our",
  "global, edge-cached API-CDN. If you wish to have content delivered faster, set",
  "`useCdn: false` to use the Live API. Note: You may incur higher costs using the live API."
]), printCdnPreviewDraftsWarning = createWarningPrinter([
  "The Sanity client is configured with the `perspective` set to `drafts` or `previewDrafts`, which doesn't support the API-CDN.",
  "The Live API will be used instead. Set `useCdn: false` in your configuration to hide this warning."
]), printPreviewDraftsDeprecationWarning = createWarningPrinter([
  "The `previewDrafts` perspective has been renamed to  `drafts` and will be removed in a future API version"
]), printBrowserTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token in the browser. This may cause unintentional security issues.",
  `See ${generateHelpUrl(
    "js-client-browser-token"
  )} for more information and how to hide this warning.`
]), printCredentialedTokenWarning = createWarningPrinter([
  "You have configured Sanity client to use a token, but also provided `withCredentials: true`.",
  "This is no longer supported - only token will be used - remove `withCredentials: true`."
]), printNoApiVersionSpecifiedWarning = createWarningPrinter([
  "Using the Sanity client without specifying an API version is deprecated.",
  `See ${generateHelpUrl("js-client-api-version")}`
]), printCreateVersionWithBaseIdWarning = createWarningPrinter([
  "You have called `createVersion()` with a defined `document`. The recommended approach is to provide a `baseId` and `releaseId` instead."
]), defaultCdnHost = "apicdn.sanity.io", defaultConfig = {
  apiHost: "https://api.sanity.io",
  apiVersion: "1",
  useProjectHostname: true,
  stega: { enabled: false }
}, LOCALHOSTS = ["localhost", "127.0.0.1", "0.0.0.0"], isLocal = (host) => LOCALHOSTS.indexOf(host) !== -1;
function validateApiVersion(apiVersion) {
  if (apiVersion === "1" || apiVersion === "X")
    return;
  const apiDate = new Date(apiVersion);
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(apiVersion) && apiDate instanceof Date && apiDate.getTime() > 0))
    throw new Error("Invalid API version string, expected `1` or date in format `YYYY-MM-DD`");
}
function validateApiPerspective(perspective) {
  if (Array.isArray(perspective) && perspective.length > 1 && perspective.includes("raw"))
    throw new TypeError(
      'Invalid API perspective value: "raw". The raw-perspective can not be combined with other perspectives'
    );
}
const initConfig = (config2, prevConfig) => {
  const specifiedConfig = {
    ...prevConfig,
    ...config2,
    stega: {
      ...typeof prevConfig.stega == "boolean" ? { enabled: prevConfig.stega } : prevConfig.stega || defaultConfig.stega,
      ...typeof config2.stega == "boolean" ? { enabled: config2.stega } : config2.stega || {}
    }
  };
  specifiedConfig.apiVersion || printNoApiVersionSpecifiedWarning();
  const newConfig = {
    ...defaultConfig,
    ...specifiedConfig
  }, projectBased = newConfig.useProjectHostname && !newConfig["~experimental_resource"];
  if (typeof Promise > "u") {
    const helpUrl = generateHelpUrl("js-client-promise-polyfill");
    throw new Error(`No native Promise-implementation found, polyfill needed - see ${helpUrl}`);
  }
  if (projectBased && !newConfig.projectId)
    throw new Error("Configuration must contain `projectId`");
  if (newConfig["~experimental_resource"] && resourceConfig(newConfig), typeof newConfig.perspective < "u" && validateApiPerspective(newConfig.perspective), "encodeSourceMap" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMap' is not supported in '@sanity/client'. Did you mean 'stega.enabled'?"
    );
  if ("encodeSourceMapAtPath" in newConfig)
    throw new Error(
      "It looks like you're using options meant for '@sanity/preview-kit/client'. 'encodeSourceMapAtPath' is not supported in '@sanity/client'. Did you mean 'stega.filter'?"
    );
  if (typeof newConfig.stega.enabled != "boolean")
    throw new Error(`stega.enabled must be a boolean, received ${newConfig.stega.enabled}`);
  if (newConfig.stega.enabled && newConfig.stega.studioUrl === void 0)
    throw new Error("stega.studioUrl must be defined when stega.enabled is true");
  if (newConfig.stega.enabled && typeof newConfig.stega.studioUrl != "string" && typeof newConfig.stega.studioUrl != "function")
    throw new Error(
      `stega.studioUrl must be a string or a function, received ${newConfig.stega.studioUrl}`
    );
  const isBrowser = typeof window < "u" && window.location && window.location.hostname, isLocalhost = isBrowser && isLocal(window.location.hostname), hasToken = !!newConfig.token;
  newConfig.withCredentials && hasToken && (printCredentialedTokenWarning(), newConfig.withCredentials = false), isBrowser && isLocalhost && hasToken && newConfig.ignoreBrowserTokenWarning !== true ? printBrowserTokenWarning() : typeof newConfig.useCdn > "u" && printCdnWarning(), projectBased && projectId(newConfig.projectId), newConfig.dataset && dataset(newConfig.dataset), "requestTagPrefix" in newConfig && (newConfig.requestTagPrefix = newConfig.requestTagPrefix ? requestTag(newConfig.requestTagPrefix).replace(/\.+$/, "") : void 0), newConfig.apiVersion = `${newConfig.apiVersion}`.replace(/^v/, ""), newConfig.isDefaultApi = newConfig.apiHost === defaultConfig.apiHost, newConfig.useCdn === true && newConfig.withCredentials && printCdnAndWithCredentialsWarning(), newConfig.useCdn = newConfig.useCdn !== false && !newConfig.withCredentials, validateApiVersion(newConfig.apiVersion);
  const hostParts = newConfig.apiHost.split("://", 2), protocol = hostParts[0], host = hostParts[1], cdnHost = newConfig.isDefaultApi ? defaultCdnHost : host;
  return projectBased ? (newConfig.url = `${protocol}://${newConfig.projectId}.${host}/v${newConfig.apiVersion}`, newConfig.cdnUrl = `${protocol}://${newConfig.projectId}.${cdnHost}/v${newConfig.apiVersion}`) : (newConfig.url = `${newConfig.apiHost}/v${newConfig.apiVersion}`, newConfig.cdnUrl = newConfig.url), newConfig;
};
class ConnectionFailedError extends Error {
  name = "ConnectionFailedError";
}
class DisconnectError extends Error {
  name = "DisconnectError";
  reason;
  constructor(message, reason, options = {}) {
    super(message, options), this.reason = reason;
  }
}
class ChannelError extends Error {
  name = "ChannelError";
  data;
  constructor(message, data) {
    super(message), this.data = data;
  }
}
class MessageError extends Error {
  name = "MessageError";
  data;
  constructor(message, data, options = {}) {
    super(message, options), this.data = data;
  }
}
class MessageParseError extends Error {
  name = "MessageParseError";
}
const REQUIRED_EVENTS = ["channelError", "disconnect"];
function connectEventSource(initEventSource, events) {
  return cjsExports.defer(() => {
    const es = initEventSource();
    return cjsExports.isObservable(es) ? es : cjsExports.of(es);
  }).pipe(cjsExports.mergeMap((es) => connectWithESInstance(es, events)));
}
function connectWithESInstance(es, events) {
  return new cjsExports.Observable((observer) => {
    const emitOpen = events.includes("open"), emitReconnect = events.includes("reconnect");
    function onError(evt) {
      if ("data" in evt) {
        const [parseError, event] = parseEvent(evt);
        observer.error(
          parseError ? new MessageParseError("Unable to parse EventSource error message", { cause: event }) : new MessageError((event?.data).message, event)
        );
        return;
      }
      es.readyState === es.CLOSED ? observer.error(new ConnectionFailedError("EventSource connection failed")) : emitReconnect && observer.next({ type: "reconnect" });
    }
    function onOpen() {
      observer.next({ type: "open" });
    }
    function onMessage(message) {
      const [parseError, event] = parseEvent(message);
      if (parseError) {
        observer.error(
          new MessageParseError("Unable to parse EventSource message", { cause: parseError })
        );
        return;
      }
      if (message.type === "channelError") {
        const tag = new URL(es.url).searchParams.get("tag");
        observer.error(new ChannelError(extractErrorMessage(event?.data, tag), event.data));
        return;
      }
      if (message.type === "disconnect") {
        observer.error(
          new DisconnectError(
            `Server disconnected client: ${event.data?.reason || "unknown error"}`
          )
        );
        return;
      }
      observer.next({
        type: message.type,
        id: message.lastEventId,
        ...event.data ? { data: event.data } : {}
      });
    }
    es.addEventListener("error", onError), emitOpen && es.addEventListener("open", onOpen);
    const cleanedEvents = [.../* @__PURE__ */ new Set([...REQUIRED_EVENTS, ...events])].filter((type) => type !== "error" && type !== "open" && type !== "reconnect");
    return cleanedEvents.forEach((type) => es.addEventListener(type, onMessage)), () => {
      es.removeEventListener("error", onError), emitOpen && es.removeEventListener("open", onOpen), cleanedEvents.forEach((type) => es.removeEventListener(type, onMessage)), es.close();
    };
  });
}
function parseEvent(message) {
  try {
    const data = typeof message.data == "string" && JSON.parse(message.data);
    return [
      null,
      {
        type: message.type,
        id: message.lastEventId,
        ...isEmptyObject(data) ? {} : { data }
      }
    ];
  } catch (err) {
    return [err, null];
  }
}
function extractErrorMessage(err, tag) {
  const error = err.error;
  return error ? isQueryParseError(error) ? formatQueryParseError(error, tag) : error.description ? error.description : typeof error == "string" ? error : JSON.stringify(error, null, 2) : err.message || "Unknown listener error";
}
function isEmptyObject(data) {
  for (const _2 in data)
    return false;
  return true;
}
function getSelection(sel) {
  if (typeof sel == "string")
    return { id: sel };
  if (Array.isArray(sel))
    return { query: "*[_id in $ids]", params: { ids: sel } };
  if (typeof sel == "object" && sel !== null && "query" in sel && typeof sel.query == "string")
    return "params" in sel && typeof sel.params == "object" && sel.params !== null ? { query: sel.query, params: sel.params } : { query: sel.query };
  const selectionOpts = [
    "* Document ID (<docId>)",
    "* Array of document IDs",
    "* Object containing `query`"
  ].join(`
`);
  throw new Error(`Unknown selection - must be one of:

${selectionOpts}`);
}
class BasePatch {
  selection;
  operations;
  constructor(selection, operations = {}) {
    this.selection = selection, this.operations = operations;
  }
  /**
   * Sets the given attributes to the document. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  set(attrs) {
    return this._assign("set", attrs);
  }
  /**
   * Sets the given attributes to the document if they are not currently set. Does NOT merge objects.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to set. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "value"\}
   */
  setIfMissing(attrs) {
    return this._assign("setIfMissing", attrs);
  }
  /**
   * Performs a "diff-match-patch" operation on the string attributes provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attributes to perform operation on. To set a deep attribute, use JSONMatch, eg: \{"nested.prop": "dmp"\}
   */
  diffMatchPatch(attrs) {
    return validateObject("diffMatchPatch", attrs), this._assign("diffMatchPatch", attrs);
  }
  /**
   * Unsets the attribute paths provided.
   * The operation is added to the current patch, ready to be commited by `commit()`
   *
   * @param attrs - Attribute paths to unset.
   */
  unset(attrs) {
    if (!Array.isArray(attrs))
      throw new Error("unset(attrs) takes an array of attributes to unset, non-array given");
    return this.operations = Object.assign({}, this.operations, { unset: attrs }), this;
  }
  /**
   * Increment a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to increment, values representing the number to increment by.
   */
  inc(attrs) {
    return this._assign("inc", attrs);
  }
  /**
   * Decrement a numeric value. Each entry in the argument is either an attribute or a JSON path. The value may be a positive or negative integer or floating-point value. The operation will fail if target value is not a numeric value, or doesn't exist.
   *
   * @param attrs - Object of attribute paths to decrement, values representing the number to decrement by.
   */
  dec(attrs) {
    return this._assign("dec", attrs);
  }
  /**
   * Provides methods for modifying arrays, by inserting, appending and replacing elements via a JSONPath expression.
   *
   * @param at - Location to insert at, relative to the given selector, or 'replace' the matched path
   * @param selector - JSONPath expression, eg `comments[-1]` or `blocks[_key=="abc123"]`
   * @param items - Array of items to insert/replace
   */
  insert(at, selector, items) {
    return validateInsert(at, selector, items), this._assign("insert", { [at]: selector, items });
  }
  /**
   * Append the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to append to, eg `comments` or `person.hobbies`
   * @param items - Array of items to append to the array
   */
  append(selector, items) {
    return this.insert("after", `${selector}[-1]`, items);
  }
  /**
   * Prepend the given items to the array at the given JSONPath
   *
   * @param selector - Attribute/path to prepend to, eg `comments` or `person.hobbies`
   * @param items - Array of items to prepend to the array
   */
  prepend(selector, items) {
    return this.insert("before", `${selector}[0]`, items);
  }
  /**
   * Change the contents of an array by removing existing elements and/or adding new elements.
   *
   * @param selector - Attribute or JSONPath expression for array
   * @param start - Index at which to start changing the array (with origin 0). If greater than the length of the array, actual starting index will be set to the length of the array. If negative, will begin that many elements from the end of the array (with origin -1) and will be set to 0 if absolute value is greater than the length of the array.x
   * @param deleteCount - An integer indicating the number of old array elements to remove.
   * @param items - The elements to add to the array, beginning at the start index. If you don't specify any elements, splice() will only remove elements from the array.
   */
  splice(selector, start, deleteCount, items) {
    const delAll = typeof deleteCount > "u" || deleteCount === -1, startIndex = start < 0 ? start - 1 : start, delCount = delAll ? -1 : Math.max(0, start + deleteCount), delRange = startIndex < 0 && delCount >= 0 ? "" : delCount, rangeSelector = `${selector}[${startIndex}:${delRange}]`;
    return this.insert("replace", rangeSelector, items || []);
  }
  /**
   * Adds a revision clause, preventing the document from being patched if the `_rev` property does not match the given value
   *
   * @param rev - Revision to lock the patch to
   */
  ifRevisionId(rev) {
    return this.operations.ifRevisionID = rev, this;
  }
  /**
   * Return a plain JSON representation of the patch
   */
  serialize() {
    return { ...getSelection(this.selection), ...this.operations };
  }
  /**
   * Return a plain JSON representation of the patch
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the patch of all operations
   */
  reset() {
    return this.operations = {}, this;
  }
  _assign(op, props, merge2 = true) {
    return validateObject(op, props), this.operations = Object.assign({}, this.operations, {
      [op]: Object.assign({}, merge2 && this.operations[op] || {}, props)
    }), this;
  }
  _set(op, props) {
    return this._assign(op, props, false);
  }
}
class ObservablePatch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new ObservablePatch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
class Patch extends BasePatch {
  #client;
  constructor(selection, operations, client) {
    super(selection, operations), this.#client = client;
  }
  /**
   * Clones the patch
   */
  clone() {
    return new Patch(this.selection, { ...this.operations }, this.#client);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to patch, either provide one or pass the patch to a clients `mutate()` method"
      );
    const returnFirst = typeof this.selection == "string", opts = Object.assign({ returnFirst, returnDocuments: true }, options);
    return this.#client.mutate({ patch: this.serialize() }, opts);
  }
}
const defaultMutateOptions = { returnDocuments: false };
class BaseTransaction {
  operations;
  trxId;
  constructor(operations = [], transactionId) {
    this.operations = operations, this.trxId = transactionId;
  }
  /**
   * Creates a new Sanity document. If `_id` is provided and already exists, the mutation will fail. If no `_id` is given, one will automatically be generated by the database.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create. Requires a `_type` property.
   */
  create(doc) {
    return validateObject("create", doc), this._add({ create: doc });
  }
  /**
   * Creates a new Sanity document. If a document with the same `_id` already exists, the create operation will be ignored.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create if it does not already exist. Requires `_id` and `_type` properties.
   */
  createIfNotExists(doc) {
    const op = "createIfNotExists";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Creates a new Sanity document, or replaces an existing one if the same `_id` is already used.
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param doc - Document to create or replace. Requires `_id` and `_type` properties.
   */
  createOrReplace(doc) {
    const op = "createOrReplace";
    return validateObject(op, doc), requireDocumentId(op, doc), this._add({ [op]: doc });
  }
  /**
   * Deletes the document with the given document ID
   * The operation is added to the current transaction, ready to be commited by `commit()`
   *
   * @param documentId - Document ID to delete
   */
  delete(documentId) {
    return validateDocumentId("delete", documentId), this._add({ delete: { id: documentId } });
  }
  transactionId(id) {
    return id ? (this.trxId = id, this) : this.trxId;
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  serialize() {
    return [...this.operations];
  }
  /**
   * Return a plain JSON representation of the transaction
   */
  toJSON() {
    return this.serialize();
  }
  /**
   * Clears the transaction of all operations
   */
  reset() {
    return this.operations = [], this;
  }
  _add(mut) {
    return this.operations.push(mut), this;
  }
}
class Transaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new Transaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function", isPatch = typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof Patch, isMutationSelection = typeof patchOrDocumentId == "object" && ("query" in patchOrDocumentId || "id" in patchOrDocumentId);
    if (isPatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new Patch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof Patch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    if (isMutationSelection) {
      const patch = new Patch(patchOrDocumentId, patchOps || {}, this.#client);
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
class ObservableTransaction extends BaseTransaction {
  #client;
  constructor(operations, client, transactionId) {
    super(operations, transactionId), this.#client = client;
  }
  /**
   * Clones the transaction
   */
  clone() {
    return new ObservableTransaction([...this.operations], this.#client, this.trxId);
  }
  commit(options) {
    if (!this.#client)
      throw new Error(
        "No `client` passed to transaction, either provide one or pass the transaction to a clients `mutate()` method"
      );
    return this.#client.mutate(
      this.serialize(),
      Object.assign({ transactionId: this.trxId }, defaultMutateOptions, options || {})
    );
  }
  patch(patchOrDocumentId, patchOps) {
    const isBuilder = typeof patchOps == "function";
    if (typeof patchOrDocumentId != "string" && patchOrDocumentId instanceof ObservablePatch)
      return this._add({ patch: patchOrDocumentId.serialize() });
    if (isBuilder) {
      const patch = patchOps(new ObservablePatch(patchOrDocumentId, {}, this.#client));
      if (!(patch instanceof ObservablePatch))
        throw new Error("function passed to `patch()` must return the patch");
      return this._add({ patch: patch.serialize() });
    }
    return this._add({ patch: { id: patchOrDocumentId, ...patchOps } });
  }
}
const projectHeader = "X-Sanity-Project-ID";
function requestOptions(config2, overrides = {}) {
  const headers = {};
  config2.headers && Object.assign(headers, config2.headers);
  const token = overrides.token || config2.token;
  token && (headers.Authorization = `Bearer ${token}`), !overrides.useGlobalApi && !config2.useProjectHostname && config2.projectId && (headers[projectHeader] = config2.projectId);
  const withCredentials = !!(typeof overrides.withCredentials > "u" ? config2.withCredentials : overrides.withCredentials), timeout2 = typeof overrides.timeout > "u" ? config2.timeout : overrides.timeout;
  return Object.assign({}, overrides, {
    headers: Object.assign({}, headers, overrides.headers || {}),
    timeout: typeof timeout2 > "u" ? 5 * 60 * 1e3 : timeout2,
    proxy: overrides.proxy || config2.proxy,
    json: true,
    withCredentials,
    fetch: typeof overrides.fetch == "object" && typeof config2.fetch == "object" ? { ...config2.fetch, ...overrides.fetch } : overrides.fetch || config2.fetch
  });
}
const encodeQueryString = ({
  query,
  params = {},
  options = {}
}) => {
  const searchParams = new URLSearchParams(), { tag, includeMutations, returnQuery, ...opts } = options;
  tag && searchParams.append("tag", tag), searchParams.append("query", query);
  for (const [key, value] of Object.entries(params))
    value !== void 0 && searchParams.append(`$${key}`, JSON.stringify(value));
  for (const [key, value] of Object.entries(opts))
    value && searchParams.append(key, `${value}`);
  return returnQuery === false && searchParams.append("returnQuery", "false"), includeMutations === false && searchParams.append("includeMutations", "false"), `?${searchParams}`;
}, excludeFalsey = (param, defValue) => param === false ? void 0 : typeof param > "u" ? defValue : param, getMutationQuery = (options = {}) => ({
  dryRun: options.dryRun,
  returnIds: true,
  returnDocuments: excludeFalsey(options.returnDocuments, true),
  visibility: options.visibility || "sync",
  autoGenerateArrayKeys: options.autoGenerateArrayKeys,
  skipCrossDatasetReferenceValidation: options.skipCrossDatasetReferenceValidation
}), isResponse = (event) => event.type === "response", getBody = (event) => event.body, indexBy = (docs, attr) => docs.reduce((indexed, doc) => (indexed[attr(doc)] = doc, indexed), /* @__PURE__ */ Object.create(null)), getQuerySizeLimit = 11264;
function _fetch(client, httpRequest, _stega, query, _params = {}, options = {}) {
  const stega = "stega" in options ? {
    ..._stega || {},
    ...typeof options.stega == "boolean" ? { enabled: options.stega } : options.stega || {}
  } : _stega, params = stega.enabled ? stegaClean(_params) : _params, mapResponse = options.filterResponse === false ? (res) => res : (res) => res.result, { cache, next, ...opts } = {
    // Opt out of setting a `signal` on an internal `fetch` if one isn't provided.
    // This is necessary in React Server Components to avoid opting out of Request Memoization.
    useAbortSignal: typeof options.signal < "u",
    // Set `resultSourceMap' when stega is enabled, as it's required for encoding.
    resultSourceMap: stega.enabled ? "withKeyArraySelector" : options.resultSourceMap,
    ...options,
    // Default to not returning the query, unless `filterResponse` is `false`,
    // or `returnQuery` is explicitly set. `true` is the default in Content Lake, so skip if truthy
    returnQuery: options.filterResponse === false && options.returnQuery !== false
  }, reqOpts = typeof cache < "u" || typeof next < "u" ? { ...opts, fetch: { cache, next } } : opts, $request = _dataRequest(client, httpRequest, "query", { query, params }, reqOpts);
  return stega.enabled ? $request.pipe(
    operatorsExports.combineLatestWith(
      cjsExports.from(
        import("./assets/stegaEncodeSourceMap-CpgbwboV.js").then(function(n2) {
          return n2.stegaEncodeSourceMap$1;
        }).then(
          ({ stegaEncodeSourceMap }) => stegaEncodeSourceMap
        )
      )
    ),
    operatorsExports.map(
      ([res, stegaEncodeSourceMap]) => {
        const result = stegaEncodeSourceMap(res.result, res.resultSourceMap, stega);
        return mapResponse({ ...res, result });
      }
    )
  ) : $request.pipe(operatorsExports.map(mapResponse));
}
function _getDocument(client, httpRequest, id, opts = {}) {
  const docId = (() => {
    if (!opts.releaseId)
      return id;
    const versionId = getVersionFromId(id);
    if (!versionId) {
      if (isDraftId(id))
        throw new Error(
          `The document ID (\`${id}\`) is a draft, but \`options.releaseId\` is set as \`${opts.releaseId}\``
        );
      return getVersionId(id, opts.releaseId);
    }
    if (versionId !== opts.releaseId)
      throw new Error(
        `The document ID (\`${id}\`) is already a version of \`${versionId}\` release, but this does not match the provided \`options.releaseId\` (\`${opts.releaseId}\`)`
      );
    return id;
  })(), options = {
    uri: _getDataUrl(client, "doc", docId),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map((event) => event.body.documents && event.body.documents[0])
  );
}
function _getDocuments(client, httpRequest, ids, opts = {}) {
  const options = {
    uri: _getDataUrl(client, "doc", ids.join(",")),
    json: true,
    tag: opts.tag,
    signal: opts.signal
  };
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map((event) => {
      const indexed = indexBy(event.body.documents || [], (doc) => doc._id);
      return ids.map((id) => indexed[id] || null);
    })
  );
}
function _getReleaseDocuments(client, httpRequest, releaseId, opts = {}) {
  return _dataRequest(
    client,
    httpRequest,
    "query",
    {
      query: "*[sanity::partOfRelease($releaseId)]",
      params: {
        releaseId
      }
    },
    opts
  );
}
function _createIfNotExists(client, httpRequest, doc, options) {
  return requireDocumentId("createIfNotExists", doc), _create(client, httpRequest, doc, "createIfNotExists", options);
}
function _createOrReplace(client, httpRequest, doc, options) {
  return requireDocumentId("createOrReplace", doc), _create(client, httpRequest, doc, "createOrReplace", options);
}
function _createVersion(client, httpRequest, doc, publishedId, options) {
  return requireDocumentId("createVersion", doc), requireDocumentType("createVersion", doc), printCreateVersionWithBaseIdWarning(), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.create",
    publishedId,
    document: doc
  }, options);
}
function _createVersionFromBase(client, httpRequest, publishedId, baseId, releaseId, ifBaseRevisionId, options) {
  if (!baseId)
    throw new Error("`createVersion()` requires `baseId` when no `document` is provided");
  if (!publishedId)
    throw new Error("`createVersion()` requires `publishedId` when `baseId` is provided");
  validateDocumentId("createVersion", baseId), validateDocumentId("createVersion", publishedId);
  const createVersionAction = {
    actionType: "sanity.action.document.version.create",
    publishedId,
    baseId,
    versionId: releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId),
    ifBaseRevisionId
  };
  return _action(client, httpRequest, createVersionAction, options);
}
function _delete(client, httpRequest, selection, options) {
  return _dataRequest(
    client,
    httpRequest,
    "mutate",
    { mutations: [{ delete: getSelection(selection) }] },
    options
  );
}
function _discardVersion(client, httpRequest, versionId, purge = false, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.discard",
    versionId,
    purge
  }, options);
}
function _replaceVersion(client, httpRequest, doc, options) {
  return requireDocumentId("replaceVersion", doc), requireDocumentType("replaceVersion", doc), _action(client, httpRequest, {
    actionType: "sanity.action.document.version.replace",
    document: doc
  }, options);
}
function _unpublishVersion(client, httpRequest, versionId, publishedId, options) {
  return _action(client, httpRequest, {
    actionType: "sanity.action.document.version.unpublish",
    versionId,
    publishedId
  }, options);
}
function _mutate(client, httpRequest, mutations, options) {
  let mut;
  mutations instanceof Patch || mutations instanceof ObservablePatch ? mut = { patch: mutations.serialize() } : mutations instanceof Transaction || mutations instanceof ObservableTransaction ? mut = mutations.serialize() : mut = mutations;
  const muts = Array.isArray(mut) ? mut : [mut], transactionId = options && options.transactionId || void 0;
  return _dataRequest(client, httpRequest, "mutate", { mutations: muts, transactionId }, options);
}
function _action(client, httpRequest, actions, options) {
  const acts = Array.isArray(actions) ? actions : [actions], transactionId = options && options.transactionId || void 0, skipCrossDatasetReferenceValidation = options && options.skipCrossDatasetReferenceValidation || void 0, dryRun = options && options.dryRun || void 0;
  return _dataRequest(
    client,
    httpRequest,
    "actions",
    { actions: acts, transactionId, skipCrossDatasetReferenceValidation, dryRun },
    options
  );
}
function _dataRequest(client, httpRequest, endpoint, body, options = {}) {
  const isMutation = endpoint === "mutate", isAction = endpoint === "actions", isQuery2 = endpoint === "query", strQuery = isMutation || isAction ? "" : encodeQueryString(body), useGet = !isMutation && !isAction && strQuery.length < getQuerySizeLimit, stringQuery = useGet ? strQuery : "", returnFirst = options.returnFirst, { timeout: timeout2, token, tag, headers, returnQuery, lastLiveEventId, cacheMode } = options, uri = _getDataUrl(client, endpoint, stringQuery), reqOptions = {
    method: useGet ? "GET" : "POST",
    uri,
    json: true,
    body: useGet ? void 0 : body,
    query: isMutation && getMutationQuery(options),
    timeout: timeout2,
    headers,
    token,
    tag,
    returnQuery,
    perspective: options.perspective,
    resultSourceMap: options.resultSourceMap,
    lastLiveEventId: Array.isArray(lastLiveEventId) ? lastLiveEventId[0] : lastLiveEventId,
    cacheMode,
    canUseCdn: isQuery2,
    signal: options.signal,
    fetch: options.fetch,
    useAbortSignal: options.useAbortSignal,
    useCdn: options.useCdn
  };
  return _requestObservable(client, httpRequest, reqOptions).pipe(
    operatorsExports.filter(isResponse),
    operatorsExports.map(getBody),
    operatorsExports.map((res) => {
      if (!isMutation)
        return res;
      const results = res.results || [];
      if (options.returnDocuments)
        return returnFirst ? results[0] && results[0].document : results.map((mut) => mut.document);
      const key = returnFirst ? "documentId" : "documentIds", ids = returnFirst ? results[0] && results[0].id : results.map((mut) => mut.id);
      return {
        transactionId: res.transactionId,
        results,
        [key]: ids
      };
    })
  );
}
function _create(client, httpRequest, doc, op, options = {}) {
  const mutation = { [op]: doc }, opts = Object.assign({ returnFirst: true, returnDocuments: true }, options);
  return _dataRequest(client, httpRequest, "mutate", { mutations: [mutation] }, opts);
}
const hasDataConfig = (client) => client.config().dataset !== void 0 && client.config().projectId !== void 0 || client.config()["~experimental_resource"] !== void 0, isQuery = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "query")), isMutate = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "mutate")), isDoc = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "doc", "")), isListener = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "listen")), isHistory = (client, uri) => hasDataConfig(client) && uri.startsWith(_getDataUrl(client, "history", "")), isData = (client, uri) => uri.startsWith("/data/") || isQuery(client, uri) || isMutate(client, uri) || isDoc(client, uri) || isListener(client, uri) || isHistory(client, uri);
function _requestObservable(client, httpRequest, options) {
  const uri = options.url || options.uri, config2 = client.config(), canUseCdn = typeof options.canUseCdn > "u" ? ["GET", "HEAD"].indexOf(options.method || "GET") >= 0 && isData(client, uri) : options.canUseCdn;
  let useCdn = (options.useCdn ?? config2.useCdn) && canUseCdn;
  const tag = options.tag && config2.requestTagPrefix ? [config2.requestTagPrefix, options.tag].join(".") : options.tag || config2.requestTagPrefix;
  if (tag && options.tag !== null && (options.query = { tag: requestTag(tag), ...options.query }), ["GET", "HEAD", "POST"].indexOf(options.method || "GET") >= 0 && isQuery(client, uri)) {
    const resultSourceMap = options.resultSourceMap ?? config2.resultSourceMap;
    resultSourceMap !== void 0 && resultSourceMap !== false && (options.query = { resultSourceMap, ...options.query });
    const perspectiveOption = options.perspective || config2.perspective;
    typeof perspectiveOption < "u" && (perspectiveOption === "previewDrafts" && printPreviewDraftsDeprecationWarning(), validateApiPerspective(perspectiveOption), options.query = {
      perspective: Array.isArray(perspectiveOption) ? perspectiveOption.join(",") : perspectiveOption,
      ...options.query
    }, (Array.isArray(perspectiveOption) && perspectiveOption.length > 0 || // previewDrafts was renamed to drafts, but keep for backwards compat
    perspectiveOption === "previewDrafts" || perspectiveOption === "drafts") && useCdn && (useCdn = false, printCdnPreviewDraftsWarning())), options.lastLiveEventId && (options.query = { ...options.query, lastLiveEventId: options.lastLiveEventId }), options.returnQuery === false && (options.query = { returnQuery: "false", ...options.query }), useCdn && options.cacheMode == "noStale" && (options.query = { cacheMode: "noStale", ...options.query });
  }
  const reqOptions = requestOptions(
    config2,
    Object.assign({}, options, {
      url: _getUrl(client, uri, useCdn)
    })
  ), request = new cjsExports.Observable(
    (subscriber) => httpRequest(reqOptions, config2.requester).subscribe(subscriber)
  );
  return options.signal ? request.pipe(_withAbortSignal(options.signal)) : request;
}
function _request(client, httpRequest, options) {
  return _requestObservable(client, httpRequest, options).pipe(
    operatorsExports.filter((event) => event.type === "response"),
    operatorsExports.map((event) => event.body)
  );
}
function _getDataUrl(client, operation, path) {
  const config2 = client.config();
  if (config2["~experimental_resource"]) {
    resourceConfig(config2);
    const resourceBase = resourceDataBase(config2), uri2 = path !== void 0 ? `${operation}/${path}` : operation;
    return `${resourceBase}/${uri2}`.replace(/\/($|\?)/, "$1");
  }
  const catalog = hasDataset(config2), baseUri = `/${operation}/${catalog}`;
  return `/data${path !== void 0 ? `${baseUri}/${path}` : baseUri}`.replace(/\/($|\?)/, "$1");
}
function _getUrl(client, uri, canUseCdn = false) {
  const { url, cdnUrl } = client.config();
  return `${canUseCdn ? cdnUrl : url}/${uri.replace(/^\//, "")}`;
}
function _withAbortSignal(signal) {
  return (input) => new cjsExports.Observable((observer) => {
    const abort = () => observer.error(_createAbortError(signal));
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const subscription = input.subscribe(observer);
    return signal.addEventListener("abort", abort), () => {
      signal.removeEventListener("abort", abort), subscription.unsubscribe();
    };
  });
}
const isDomExceptionSupported = !!globalThis.DOMException;
function _createAbortError(signal) {
  if (isDomExceptionSupported)
    return new DOMException(signal?.reason ?? "The operation was aborted.", "AbortError");
  const error = new Error(signal?.reason ?? "The operation was aborted.");
  return error.name = "AbortError", error;
}
const resourceDataBase = (config2) => {
  if (!config2["~experimental_resource"])
    throw new Error("`resource` must be provided to perform resource queries");
  const { type, id } = config2["~experimental_resource"];
  switch (type) {
    case "dataset": {
      const segments = id.split(".");
      if (segments.length !== 2)
        throw new Error('Dataset ID must be in the format "project.dataset"');
      return `/projects/${segments[0]}/datasets/${segments[1]}`;
    }
    case "canvas":
      return `/canvases/${id}`;
    case "media-library":
      return `/media-libraries/${id}`;
    case "dashboard":
      return `/dashboards/${id}`;
    default:
      throw new Error(`Unsupported resource type: ${type.toString()}`);
  }
};
function _generate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/generate/${dataset2}`,
    body: request
  });
}
function _patch(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/patch/${dataset2}`,
    body: request
  });
}
function _prompt(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/prompt/${dataset2}`,
    body: request
  });
}
function _transform(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/transform/${dataset2}`,
    body: request
  });
}
function _translate(client, httpRequest, request) {
  const dataset2 = hasDataset(client.config());
  return _request(client, httpRequest, {
    method: "POST",
    uri: `/agent/action/translate/${dataset2}`,
    body: request
  });
}
class ObservableAgentsActionClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return _generate(this.#client, this.#httpRequest, request);
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return _transform(this.#client, this.#httpRequest, request);
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return _translate(this.#client, this.#httpRequest, request);
  }
}
class AgentActionsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Run an instruction to generate content in a target document.
   * @param request - instruction request
   */
  generate(request) {
    return cjsExports.lastValueFrom(_generate(this.#client, this.#httpRequest, request));
  }
  /**
   * Transform a target document based on a source.
   * @param request - translation request
   */
  transform(request) {
    return cjsExports.lastValueFrom(_transform(this.#client, this.#httpRequest, request));
  }
  /**
   * Translate a target document based on a source.
   * @param request - translation request
   */
  translate(request) {
    return cjsExports.lastValueFrom(_translate(this.#client, this.#httpRequest, request));
  }
  /**
   * Run a raw instruction and return the result either as text or json
   * @param request - prompt request
   */
  prompt(request) {
    return cjsExports.lastValueFrom(_prompt(this.#client, this.#httpRequest, request));
  }
  /**
   * Patch a document using a schema aware API.
   * Does not use an LLM, but uses the schema to ensure paths and values matches the schema.
   * @param request - instruction request
   */
  patch(request) {
    return cjsExports.lastValueFrom(_patch(this.#client, this.#httpRequest, request));
  }
}
class ObservableAssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    return _upload(this.#client, this.#httpRequest, assetType, body, options);
  }
}
class AssetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  upload(assetType, body, options) {
    const observable2 = _upload(this.#client, this.#httpRequest, assetType, body, options);
    return cjsExports.lastValueFrom(
      observable2.pipe(
        operatorsExports.filter((event) => event.type === "response"),
        operatorsExports.map(
          (event) => event.body.document
        )
      )
    );
  }
}
function _upload(client, httpRequest, assetType, body, opts = {}) {
  validateAssetType(assetType);
  let meta = opts.extract || void 0;
  meta && !meta.length && (meta = ["none"]);
  const config2 = client.config(), options = optionsFromFile(opts, body), { tag, label, title, description, creditLine, filename, source } = options, query = {
    label,
    title,
    description,
    filename,
    meta,
    creditLine
  };
  return source && (query.sourceId = source.id, query.sourceName = source.name, query.sourceUrl = source.url), _requestObservable(client, httpRequest, {
    tag,
    method: "POST",
    timeout: options.timeout || 0,
    uri: buildAssetUploadUrl(config2, assetType),
    headers: options.contentType ? { "Content-Type": options.contentType } : {},
    query,
    body
  });
}
function buildAssetUploadUrl(config2, assetType) {
  const assetTypeEndpoint = assetType === "image" ? "images" : "files";
  if (config2["~experimental_resource"]) {
    const { type, id } = config2["~experimental_resource"];
    switch (type) {
      case "dataset":
        throw new Error(
          "Assets are not supported for dataset resources, yet. Configure the client with `{projectId: <projectId>, dataset: <datasetId>}` instead."
        );
      case "canvas":
        return `/canvases/${id}/assets/${assetTypeEndpoint}`;
      case "media-library":
        return `/media-libraries/${id}/upload`;
      case "dashboard":
        return `/dashboards/${id}/assets/${assetTypeEndpoint}`;
      default:
        throw new Error(`Unsupported resource type: ${type.toString()}`);
    }
  }
  const dataset2 = hasDataset(config2);
  return `assets/${assetTypeEndpoint}/${dataset2}`;
}
function optionsFromFile(opts, file) {
  return typeof File > "u" || !(file instanceof File) ? opts : Object.assign(
    {
      filename: opts.preserveFilename === false ? void 0 : file.name,
      contentType: file.type
    },
    opts
  );
}
var defaults = (obj, defaults2) => Object.keys(defaults2).concat(Object.keys(obj)).reduce((target, prop) => (target[prop] = typeof obj[prop] > "u" ? defaults2[prop] : obj[prop], target), {});
const pick = (obj, props) => props.reduce((selection, prop) => (typeof obj[prop] > "u" || (selection[prop] = obj[prop]), selection), {}), eventSourcePolyfill = cjsExports.defer(() => import("./assets/node-CtsxRpIY.js").then((n2) => n2.n)).pipe(
  operatorsExports.map(({ default: EventSource2 }) => EventSource2),
  cjsExports.shareReplay(1)
);
function reconnectOnConnectionFailure() {
  return function(source) {
    return source.pipe(
      cjsExports.catchError((err, caught) => err instanceof ConnectionFailedError ? cjsExports.concat(cjsExports.of({ type: "reconnect" }), cjsExports.timer(1e3).pipe(cjsExports.mergeMap(() => caught))) : cjsExports.throwError(() => err))
    );
  };
}
const MAX_URL_LENGTH = 14800, possibleOptions = [
  "includePreviousRevision",
  "includeResult",
  "includeMutations",
  "includeAllVersions",
  "visibility",
  "effectFormat",
  "tag"
], defaultOptions = {
  includeResult: true
};
function _listen(query, params, opts = {}) {
  const { url, token, withCredentials, requestTagPrefix, headers: configHeaders } = this.config(), tag = opts.tag && requestTagPrefix ? [requestTagPrefix, opts.tag].join(".") : opts.tag, options = { ...defaults(opts, defaultOptions), tag }, listenOpts = pick(options, possibleOptions), qs = encodeQueryString({ query, params, options: { tag, ...listenOpts } }), uri = `${url}${_getDataUrl(this, "listen", qs)}`;
  if (uri.length > MAX_URL_LENGTH)
    return cjsExports.throwError(() => new Error("Query too large for listener"));
  const listenFor = options.events ? options.events : ["mutation"], esOptions = {};
  return withCredentials && (esOptions.withCredentials = true), (token || configHeaders) && (esOptions.headers = {}, token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders)), connectEventSource(() => (
    // use polyfill if there is no global EventSource or if we need to set headers
    (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjsExports.of(EventSource)).pipe(operatorsExports.map((EventSource2) => new EventSource2(uri, esOptions)))
  ), listenFor).pipe(
    reconnectOnConnectionFailure(),
    operatorsExports.filter((event) => listenFor.includes(event.type)),
    operatorsExports.map(
      (event) => ({
        type: event.type,
        ..."data" in event ? event.data : {}
      })
    )
  );
}
function shareReplayLatest(configOrPredicate, config2) {
  return _shareReplayLatest(
    typeof configOrPredicate == "function" ? { predicate: configOrPredicate, ...config2 } : configOrPredicate
  );
}
function _shareReplayLatest(config2) {
  return (source) => {
    let latest, emitted = false;
    const { predicate, ...shareConfig } = config2, wrapped = source.pipe(
      cjsExports.tap((value) => {
        config2.predicate(value) && (emitted = true, latest = value);
      }),
      cjsExports.finalize(() => {
        emitted = false, latest = void 0;
      }),
      cjsExports.share(shareConfig)
    ), emitLatest = new cjsExports.Observable((subscriber) => {
      emitted && subscriber.next(
        // this cast is safe because of the emitted check which asserts that we got T from the source
        latest
      ), subscriber.complete();
    });
    return cjsExports.merge(wrapped, emitLatest);
  };
}
const requiredApiVersion = "2021-03-25";
class LiveClient {
  #client;
  constructor(client) {
    this.#client = client;
  }
  /**
   * Requires `apiVersion` to be `2021-03-25` or later.
   */
  events({
    includeDrafts = false,
    tag: _tag
  } = {}) {
    resourceGuard("live", this.#client.config());
    const {
      projectId: projectId2,
      apiVersion: _apiVersion,
      token,
      withCredentials,
      requestTagPrefix,
      headers: configHeaders
    } = this.#client.config(), apiVersion = _apiVersion.replace(/^v/, "");
    if (apiVersion !== "X" && apiVersion < requiredApiVersion)
      throw new Error(
        `The live events API requires API version ${requiredApiVersion} or later. The current API version is ${apiVersion}. Please update your API version to use this feature.`
      );
    if (includeDrafts && !token && !withCredentials)
      throw new Error(
        "The live events API requires a token or withCredentials when 'includeDrafts: true'. Please update your client configuration. The token should have the lowest possible access role."
      );
    const path = _getDataUrl(this.#client, "live/events"), url = new URL(this.#client.getUrl(path, false)), tag = _tag && requestTagPrefix ? [requestTagPrefix, _tag].join(".") : _tag;
    tag && url.searchParams.set("tag", tag), includeDrafts && url.searchParams.set("includeDrafts", "true");
    const esOptions = {};
    includeDrafts && withCredentials && (esOptions.withCredentials = true), (includeDrafts && token || configHeaders) && (esOptions.headers = {}, includeDrafts && token && (esOptions.headers.Authorization = `Bearer ${token}`), configHeaders && Object.assign(esOptions.headers, configHeaders));
    const key = `${url.href}::${JSON.stringify(esOptions)}`, existing = eventsCache.get(key);
    if (existing)
      return existing;
    const events = connectEventSource(() => (
      // use polyfill if there is no global EventSource or if we need to set headers
      (typeof EventSource > "u" || esOptions.headers ? eventSourcePolyfill : cjsExports.of(EventSource)).pipe(operatorsExports.map((EventSource2) => new EventSource2(url.href, esOptions)))
    ), [
      "message",
      "restart",
      "welcome",
      "reconnect",
      "goaway"
    ]).pipe(
      reconnectOnConnectionFailure(),
      operatorsExports.map((event) => {
        if (event.type === "message") {
          const { data, ...rest } = event;
          return { ...rest, tags: data.tags };
        }
        return event;
      })
    ), checkCors = fetchObservable(url, {
      method: "OPTIONS",
      mode: "cors",
      credentials: esOptions.withCredentials ? "include" : "omit",
      headers: esOptions.headers
    }).pipe(
      cjsExports.mergeMap(() => cjsExports.EMPTY),
      cjsExports.catchError(() => {
        throw new CorsOriginError({ projectId: projectId2 });
      })
    ), observable2 = cjsExports.concat(checkCors, events).pipe(
      operatorsExports.finalize(() => eventsCache.delete(key)),
      shareReplayLatest({
        predicate: (event) => event.type === "welcome"
      })
    );
    return eventsCache.set(key, observable2), observable2;
  }
}
function fetchObservable(url, init) {
  return new cjsExports.Observable((observer) => {
    const controller = new AbortController(), signal = controller.signal;
    return fetch(url, { ...init, signal: controller.signal }).then(
      (response) => {
        observer.next(response), observer.complete();
      },
      (err) => {
        signal.aborted || observer.error(err);
      }
    ), () => controller.abort();
  });
}
const eventsCache = /* @__PURE__ */ new Map();
class ObservableDatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return _modify(this.#client, this.#httpRequest, "PUT", name, options);
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return _modify(this.#client, this.#httpRequest, "PATCH", name, options);
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return _modify(this.#client, this.#httpRequest, "DELETE", name);
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return _request(this.#client, this.#httpRequest, {
      uri: "/datasets",
      tag: null
    });
  }
}
class DatasetsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Create a new dataset with the given name
   *
   * @param name - Name of the dataset to create
   * @param options - Options for the dataset
   */
  create(name, options) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PUT", name, options)
    );
  }
  /**
   * Edit a dataset with the given name
   *
   * @param name - Name of the dataset to edit
   * @param options - New options for the dataset
   */
  edit(name, options) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _modify(this.#client, this.#httpRequest, "PATCH", name, options)
    );
  }
  /**
   * Delete a dataset with the given name
   *
   * @param name - Name of the dataset to delete
   */
  delete(name) {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(_modify(this.#client, this.#httpRequest, "DELETE", name));
  }
  /**
   * Fetch a list of datasets for the configured project
   */
  list() {
    return resourceGuard("dataset", this.#client.config()), cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: "/datasets", tag: null })
    );
  }
}
function _modify(client, httpRequest, method, name, options) {
  return resourceGuard("dataset", client.config()), dataset(name), _request(client, httpRequest, {
    method,
    uri: `/datasets/${name}`,
    body: options,
    tag: null
  });
}
class ObservableProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return _request(this.#client, this.#httpRequest, { uri });
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` });
  }
}
class ProjectsClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  list(options) {
    resourceGuard("projects", this.#client.config());
    const uri = options?.includeMembers === false ? "/projects?includeMembers=false" : "/projects";
    return cjsExports.lastValueFrom(_request(this.#client, this.#httpRequest, { uri }));
  }
  /**
   * Fetch a project by project ID
   *
   * @param projectId - ID of the project to fetch
   */
  getById(projectId2) {
    return resourceGuard("projects", this.#client.config()), cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, { uri: `/projects/${projectId2}` })
    );
  }
}
const generateReleaseId = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  8
), getDocumentVersionId = (publishedId, releaseId) => releaseId ? getVersionId(publishedId, releaseId) : getDraftId(publishedId);
function deriveDocumentVersionId(op, {
  releaseId,
  publishedId,
  document: document2
}) {
  if (publishedId && document2._id) {
    const versionId = getDocumentVersionId(publishedId, releaseId);
    return validateVersionIdMatch(versionId, document2), versionId;
  }
  if (document2._id) {
    const isDraft = isDraftId(document2._id), isVersion = isVersionId(document2._id);
    if (!isDraft && !isVersion)
      throw new Error(
        `\`${op}()\` requires a document with an \`_id\` that is a version or draft ID`
      );
    if (releaseId) {
      if (isDraft)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a draft ID, but a release ID (\`${releaseId}\`) was also provided.`
        );
      const builtVersionId = getVersionFromId(document2._id);
      if (builtVersionId !== releaseId)
        throw new Error(
          `\`${op}()\` was called with a document ID (\`${document2._id}\`) that is a version ID, but the release ID (\`${releaseId}\`) does not match the document's version ID (\`${builtVersionId}\`).`
        );
    }
    return document2._id;
  }
  if (publishedId)
    return getDocumentVersionId(publishedId, releaseId);
  throw new Error(`\`${op}()\` requires either a publishedId or a document with an \`_id\``);
}
const getArgs = (releaseOrOptions, maybeOptions) => {
  if (typeof releaseOrOptions == "object" && releaseOrOptions !== null && ("releaseId" in releaseOrOptions || "metadata" in releaseOrOptions)) {
    const { releaseId = generateReleaseId(), metadata = {} } = releaseOrOptions;
    return [releaseId, metadata, maybeOptions];
  }
  return [generateReleaseId(), {}, releaseOrOptions];
}, createRelease = (releaseOrOptions, maybeOptions) => {
  const [releaseId, metadata, options] = getArgs(releaseOrOptions, maybeOptions), finalMetadata = {
    ...metadata,
    releaseType: metadata.releaseType || "undecided"
  };
  return { action: {
    actionType: "sanity.action.release.create",
    releaseId,
    metadata: finalMetadata
  }, options };
};
class ObservableReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns An observable that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * client.observable.releases.get({releaseId: 'my-release'}).pipe(
   *   tap((release) => console.log(release)),
   *   // {
   *   //   _id: '_.releases.my-release',
   *   //   name: 'my-release'
   *   //   _type: 'system.release',
   *   //   metadata: {releaseType: 'asap'},
   *   //   _createdAt: '2021-01-01T00:00:00.000Z',
   *   //   ...
   *   // }
   * ).subscribe()
   * ```
   */
  get({ releaseId }, options) {
    return _getDocument(
      this.#client,
      this.#httpRequest,
      `_.releases.${releaseId}`,
      options
    );
  }
  create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return _action(this.#client, this.#httpRequest, action, options).pipe(
      cjsExports.map((actionResult) => ({
        ...actionResult,
        releaseId,
        metadata
      }))
    );
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return _action(this.#client, this.#httpRequest, editAction, options);
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, publishAction, options);
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, archiveAction, options);
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unarchiveAction, options);
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return _action(this.#client, this.#httpRequest, scheduleAction, options);
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, unscheduleAction, options);
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns An observable that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return _action(this.#client, this.#httpRequest, deleteAction, options);
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns An observable that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return _getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options);
  }
}
class ReleasesClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * @public
   *
   * Retrieve a release by id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to retrieve.
   * @param options - Additional query options including abort signal and query tag.
   * @returns A promise that resolves to the release document {@link ReleaseDocument}.
   *
   * @example Retrieving a release by id
   * ```ts
   * const release = await client.releases.get({releaseId: 'my-release'})
   * console.log(release)
   * // {
   * //   _id: '_.releases.my-release',
   * //   name: 'my-release'
   * //   _type: 'system.release',
   * //   metadata: {releaseType: 'asap'},
   * //   _createdAt: '2021-01-01T00:00:00.000Z',
   * //   ...
   * // }
   * ```
   */
  get({ releaseId }, options) {
    return cjsExports.lastValueFrom(
      _getDocument(
        this.#client,
        this.#httpRequest,
        `_.releases.${releaseId}`,
        options
      )
    );
  }
  async create(releaseOrOptions, maybeOptions) {
    const { action, options } = createRelease(releaseOrOptions, maybeOptions), { releaseId, metadata } = action;
    return { ...await cjsExports.lastValueFrom(
      _action(this.#client, this.#httpRequest, action, options)
    ), releaseId, metadata };
  }
  /**
   * @public
   *
   * Edits an existing release, updating the metadata.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to edit.
   *   - `patch` - The patch operation to apply on the release metadata {@link PatchMutationOperation}.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  edit({ releaseId, patch }, options) {
    const editAction = {
      actionType: "sanity.action.release.edit",
      releaseId,
      patch
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, editAction, options));
  }
  /**
   * @public
   *
   * Publishes all documents in a release at once. For larger releases the effect of the publish
   * will be visible immediately when querying but the removal of the `versions.<releasesId>.*`
   * documents and creation of the corresponding published documents with the new content may
   * take some time.
   *
   * During this period both the source and target documents are locked and cannot be
   * modified through any other means.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to publish.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  publish({ releaseId }, options) {
    const publishAction = {
      actionType: "sanity.action.release.publish",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, publishAction, options));
  }
  /**
   * @public
   *
   * An archive action removes an active release. The documents that comprise the release
   * are deleted and therefore no longer queryable.
   *
   * While the documents remain in retention the last version can still be accessed using document history endpoint.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to archive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  archive({ releaseId }, options) {
    const archiveAction = {
      actionType: "sanity.action.release.archive",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, archiveAction, options));
  }
  /**
   * @public
   *
   * An unarchive action restores an archived release and all documents
   * with the content they had just prior to archiving.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unarchive.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unarchive({ releaseId }, options) {
    const unarchiveAction = {
      actionType: "sanity.action.release.unarchive",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, unarchiveAction, options));
  }
  /**
   * @public
   *
   * A schedule action queues a release for publishing at the given future time.
   * The release is locked such that no documents in the release can be modified and
   * no documents that it references can be deleted as this would make the publish fail.
   * At the given time, the same logic as for the publish action is triggered.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to schedule.
   *   - `publishAt` - The serialised date and time to publish the release. If the `publishAt` is in the past, the release will be published immediately.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  schedule({ releaseId, publishAt }, options) {
    const scheduleAction = {
      actionType: "sanity.action.release.schedule",
      releaseId,
      publishAt
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, scheduleAction, options));
  }
  /**
   * @public
   *
   * An unschedule action stops a release from being published.
   * The documents in the release are considered unlocked and can be edited again.
   * This may fail if another release is scheduled to be published after this one and
   * has a reference to a document created by this one.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to unschedule.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  unschedule({ releaseId }, options) {
    const unscheduleAction = {
      actionType: "sanity.action.release.unschedule",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, unscheduleAction, options));
  }
  /**
   * @public
   *
   * A delete action removes a published or archived release.
   * The backing system document will be removed from the dataset.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to delete.
   * @param options - Additional action options.
   * @returns A promise that resolves to the `transactionId`.
   */
  delete({ releaseId }, options) {
    const deleteAction = {
      actionType: "sanity.action.release.delete",
      releaseId
    };
    return cjsExports.lastValueFrom(_action(this.#client, this.#httpRequest, deleteAction, options));
  }
  /**
   * @public
   *
   * Fetch the documents in a release by release id.
   *
   * @category Releases
   *
   * @param params - Release action parameters:
   *   - `releaseId` - The id of the release to fetch documents for.
   * @param options - Additional mutation options {@link BaseMutationOptions}.
   * @returns A promise that resolves to the documents in the release.
   */
  fetchDocuments({ releaseId }, options) {
    return cjsExports.lastValueFrom(_getReleaseDocuments(this.#client, this.#httpRequest, releaseId, options));
  }
}
class ObservableUsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return _request(
      this.#client,
      this.#httpRequest,
      { uri: `/users/${id}` }
    );
  }
}
class UsersClient {
  #client;
  #httpRequest;
  constructor(client, httpRequest) {
    this.#client = client, this.#httpRequest = httpRequest;
  }
  /**
   * Fetch a user by user ID
   *
   * @param id - User ID of the user to fetch. If `me` is provided, a minimal response including the users role is returned.
   */
  getById(id) {
    return cjsExports.lastValueFrom(
      _request(this.#client, this.#httpRequest, {
        uri: `/users/${id}`
      })
    );
  }
}
class ObservableSanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config2 = defaultConfig) {
    this.config(config2), this.#httpRequest = httpRequest, this.assets = new ObservableAssetsClient(this, this.#httpRequest), this.datasets = new ObservableDatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ObservableProjectsClient(this, this.#httpRequest), this.users = new ObservableUsersClient(this, this.#httpRequest), this.agent = {
      action: new ObservableAgentsActionClient(this, this.#httpRequest)
    }, this.releases = new ObservableReleasesClient(this, this.#httpRequest);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new ObservableSanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new ObservableSanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return _fetch(
      this,
      this.#httpRequest,
      this.#clientConfig.stega,
      query,
      params,
      options
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return _getDocument(this, this.#httpRequest, id, options);
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return _getDocuments(this, this.#httpRequest, ids, options);
  }
  create(document2, options) {
    return _create(this, this.#httpRequest, document2, "create", options);
  }
  createIfNotExists(document2, options) {
    return _createIfNotExists(this, this.#httpRequest, document2, options);
  }
  createOrReplace(document2, options) {
    return _createOrReplace(this, this.#httpRequest, document2, options);
  }
  createVersion({
    document: document2,
    publishedId,
    releaseId,
    baseId,
    ifBaseRevisionId
  }, options) {
    if (!document2)
      return _createVersionFromBase(
        this,
        this.#httpRequest,
        publishedId,
        baseId,
        releaseId,
        ifBaseRevisionId,
        options
      );
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return _createVersion(
      this,
      this.#httpRequest,
      documentVersion,
      versionPublishedId,
      options
    );
  }
  delete(selection, options) {
    return _delete(this, this.#httpRequest, selection, options);
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.observable.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return _discardVersion(this, this.#httpRequest, documentVersionId, purge, options);
  }
  replaceVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId };
    return _replaceVersion(this, this.#httpRequest, documentVersion, options);
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns an observable that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * client.observable.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options);
  }
  mutate(operations, options) {
    return _mutate(this, this.#httpRequest, operations, options);
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(selection, operations) {
    return new ObservablePatch(selection, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new ObservableTransaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return _action(this, this.#httpRequest, operations, options);
  }
  /**
   * Perform an HTTP request against the Sanity API
   *
   * @param options - Request options
   */
  request(options) {
    return _request(this, this.#httpRequest, options);
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
class SanityClient {
  assets;
  datasets;
  live;
  projects;
  users;
  agent;
  releases;
  /**
   * Observable version of the Sanity client, with the same configuration as the promise-based one
   */
  observable;
  /**
   * Private properties
   */
  #clientConfig;
  #httpRequest;
  /**
   * Instance properties
   */
  listen = _listen;
  constructor(httpRequest, config2 = defaultConfig) {
    this.config(config2), this.#httpRequest = httpRequest, this.assets = new AssetsClient(this, this.#httpRequest), this.datasets = new DatasetsClient(this, this.#httpRequest), this.live = new LiveClient(this), this.projects = new ProjectsClient(this, this.#httpRequest), this.users = new UsersClient(this, this.#httpRequest), this.agent = {
      action: new AgentActionsClient(this, this.#httpRequest)
    }, this.releases = new ReleasesClient(this, this.#httpRequest), this.observable = new ObservableSanityClient(httpRequest, config2);
  }
  /**
   * Clone the client - returns a new instance
   */
  clone() {
    return new SanityClient(this.#httpRequest, this.config());
  }
  config(newConfig) {
    if (newConfig === void 0)
      return { ...this.#clientConfig };
    if (this.#clientConfig && this.#clientConfig.allowReconfigure === false)
      throw new Error(
        "Existing client instance cannot be reconfigured - use `withConfig(newConfig)` to return a new client"
      );
    return this.observable && this.observable.config(newConfig), this.#clientConfig = initConfig(newConfig, this.#clientConfig || {}), this;
  }
  /**
   * Clone the client with a new (partial) configuration.
   *
   * @param newConfig - New client configuration properties, shallowly merged with existing configuration
   */
  withConfig(newConfig) {
    const thisConfig = this.config();
    return new SanityClient(this.#httpRequest, {
      ...thisConfig,
      ...newConfig,
      stega: {
        ...thisConfig.stega || {},
        ...typeof newConfig?.stega == "boolean" ? { enabled: newConfig.stega } : newConfig?.stega || {}
      }
    });
  }
  fetch(query, params, options) {
    return cjsExports.lastValueFrom(
      _fetch(
        this,
        this.#httpRequest,
        this.#clientConfig.stega,
        query,
        params,
        options
      )
    );
  }
  /**
   * Fetch a single document with the given ID.
   *
   * @param id - Document ID to fetch
   * @param options - Request options
   */
  getDocument(id, options) {
    return cjsExports.lastValueFrom(_getDocument(this, this.#httpRequest, id, options));
  }
  /**
   * Fetch multiple documents in one request.
   * Should be used sparingly - performing a query is usually a better option.
   * The order/position of documents is preserved based on the original array of IDs.
   * If any of the documents are missing, they will be replaced by a `null` entry in the returned array
   *
   * @param ids - Document IDs to fetch
   * @param options - Request options
   */
  getDocuments(ids, options) {
    return cjsExports.lastValueFrom(_getDocuments(this, this.#httpRequest, ids, options));
  }
  create(document2, options) {
    return cjsExports.lastValueFrom(
      _create(this, this.#httpRequest, document2, "create", options)
    );
  }
  createIfNotExists(document2, options) {
    return cjsExports.lastValueFrom(
      _createIfNotExists(this, this.#httpRequest, document2, options)
    );
  }
  createOrReplace(document2, options) {
    return cjsExports.lastValueFrom(
      _createOrReplace(this, this.#httpRequest, document2, options)
    );
  }
  createVersion({
    document: document2,
    publishedId,
    releaseId,
    baseId,
    ifBaseRevisionId
  }, options) {
    if (!document2)
      return cjsExports.firstValueFrom(
        _createVersionFromBase(
          this,
          this.#httpRequest,
          publishedId,
          baseId,
          releaseId,
          ifBaseRevisionId,
          options
        )
      );
    const documentVersionId = deriveDocumentVersionId("createVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId }, versionPublishedId = publishedId || getPublishedId(document2._id);
    return cjsExports.firstValueFrom(
      _createVersion(
        this,
        this.#httpRequest,
        documentVersion,
        versionPublishedId,
        options
      )
    );
  }
  delete(selection, options) {
    return cjsExports.lastValueFrom(_delete(this, this.#httpRequest, selection, options));
  }
  /**
   * @public
   *
   * Deletes the draft or release version of a document.
   *
   * @remarks
   * * Discarding a version with no `releaseId` will discard the draft version of the published document.
   * * If the draft or release version does not exist, any error will throw.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to discard the document from.
   *   - `publishedId` - The published ID of the document to discard.
   * @param purge - if `true` the document history is also discarded.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Discarding a release version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be discarded.
   * ```
   *
   * @example Discarding a draft version of a document
   * ```ts
   * client.discardVersion({publishedId: 'myDocument'})
   * // The document with the ID `drafts.myDocument` will be discarded.
   * ```
   */
  discardVersion({ releaseId, publishedId }, purge, options) {
    const documentVersionId = getDocumentVersionId(publishedId, releaseId);
    return cjsExports.lastValueFrom(
      _discardVersion(this, this.#httpRequest, documentVersionId, purge, options)
    );
  }
  replaceVersion({
    document: document2,
    publishedId,
    releaseId
  }, options) {
    const documentVersionId = deriveDocumentVersionId("replaceVersion", {
      document: document2,
      publishedId,
      releaseId
    }), documentVersion = { ...document2, _id: documentVersionId };
    return cjsExports.firstValueFrom(
      _replaceVersion(this, this.#httpRequest, documentVersion, options)
    );
  }
  /**
   * @public
   *
   * Used to indicate when a document within a release should be unpublished when
   * the release is run.
   *
   * @remarks
   * * If the published document does not exist, an error will be thrown.
   *
   * @param params - Version action parameters:
   *   - `releaseId` - The ID of the release to unpublish the document from.
   *   - `publishedId` - The published ID of the document to unpublish.
   * @param options - Additional action options.
   * @returns a promise that resolves to the `transactionId`.
   *
   * @example Unpublishing a release version of a published document
   * ```ts
   * await client.unpublishVersion({publishedId: 'myDocument', releaseId: 'myRelease'})
   * // The document with the ID `versions.myRelease.myDocument` will be unpublished. when `myRelease` is run.
   * ```
   */
  unpublishVersion({ releaseId, publishedId }, options) {
    const versionId = getVersionId(publishedId, releaseId);
    return cjsExports.lastValueFrom(
      _unpublishVersion(this, this.#httpRequest, versionId, publishedId, options)
    );
  }
  mutate(operations, options) {
    return cjsExports.lastValueFrom(_mutate(this, this.#httpRequest, operations, options));
  }
  /**
   * Create a new buildable patch of operations to perform
   *
   * @param selection - Document ID, an array of document IDs, or an object with `query` and optional `params`, defining which document(s) to patch
   * @param operations - Optional object of patch operations to initialize the patch instance with
   * @returns Patch instance - call `.commit()` to perform the operations defined
   */
  patch(documentId, operations) {
    return new Patch(documentId, operations, this);
  }
  /**
   * Create a new transaction of mutations
   *
   * @param operations - Optional array of mutation operations to initialize the transaction instance with
   */
  transaction(operations) {
    return new Transaction(operations, this);
  }
  /**
   * Perform action operations against the configured dataset
   * Returns a promise that resolves to the transaction result
   *
   * @param operations - Action operation(s) to execute
   * @param options - Action options
   */
  action(operations, options) {
    return cjsExports.lastValueFrom(_action(this, this.#httpRequest, operations, options));
  }
  /**
   * Perform a request against the Sanity API
   * NOTE: Only use this for Sanity API endpoints, not for your own APIs!
   *
   * @param options - Request options
   * @returns Promise resolving to the response body
   */
  request(options) {
    return cjsExports.lastValueFrom(_request(this, this.#httpRequest, options));
  }
  /**
   * Perform an HTTP request a `/data` sub-endpoint
   * NOTE: Considered internal, thus marked as deprecated. Use `request` instead.
   *
   * @deprecated - Use `request()` or your own HTTP library instead
   * @param endpoint - Endpoint to hit (mutate, query etc)
   * @param body - Request body
   * @param options - Request options
   * @internal
   */
  dataRequest(endpoint, body, options) {
    return cjsExports.lastValueFrom(_dataRequest(this, this.#httpRequest, endpoint, body, options));
  }
  /**
   * Get a Sanity API URL for the URI provided
   *
   * @param uri - URI/path to build URL for
   * @param canUseCdn - Whether or not to allow using the API CDN for this route
   */
  getUrl(uri, canUseCdn) {
    return _getUrl(this, uri, canUseCdn);
  }
  /**
   * Get a Sanity API URL for the data operation and path provided
   *
   * @param operation - Data operation (eg `query`, `mutate`, `listen` or similar)
   * @param path - Path to append after the operation
   */
  getDataUrl(operation, path) {
    return _getDataUrl(this, operation, path);
  }
}
function defineCreateClientExports(envMiddleware2, ClassConstructor) {
  return { requester: defineHttpRequest(envMiddleware2), createClient: (config2) => {
    const clientRequester = defineHttpRequest(envMiddleware2, {
      ignoreWarnings: config2.ignoreWarnings
    });
    return new ClassConstructor(
      (options, requester2) => (requester2 || clientRequester)({
        maxRedirects: 0,
        maxRetries: config2.maxRetries,
        retryDelay: config2.retryDelay,
        ...options
      }),
      config2
    );
  } };
}
var envMiddleware = [];
const exp = defineCreateClientExports(envMiddleware, SanityClient), createClient = exp.createClient;
function documentEventHandler(handler2) {
  if (typeof handler2 !== "function")
    throw new TypeError("`handler` must be a function");
  return handler2;
}
const handler = documentEventHandler(async ({ context, event }) => {
  const client = createClient({
    //create a client to get and edit linked docs
    ...context.clientOptions,
    apiVersion: "2025-05-08"
  });
  const { _id, before, after } = event.data;
  const translationsIds = await client.fetch(
    // fetch ids of all translations that are linked to the document
    `*[_type == "translation.metadata" && references($id)].translations[value._ref != $id].value._ref`,
    {
      id: _id
    }
  );
  console.log({ translationsIds, before, after });
  const navigationAfter = after?.navigation;
  const navigationBefore = before?.navigation;
  if (JSON.stringify(navigationBefore) === JSON.stringify(navigationAfter)) {
    console.log("No changes to navigation");
    return;
  }
  const navigationAfterKeys = navigationAfter.map((item, index) => ({ key: item._key, index }));
  const translatedDocs = await client.fetch(
    `*[_id in $ids]{_id, navigation}`,
    {
      ids: translationsIds
    },
    { perspective: "drafts" }
  );
  console.log({ translatedDocs });
  const patches = translatedDocs.map((translation) => {
    const { navigation: translatedNavigation } = translation;
    const newNavigation = navigationAfterKeys.map((item) => {
      const { key, index } = item;
      const translatedItem = translatedNavigation.find((item2) => item2._key === key) || navigationAfter[index];
      return translatedItem;
    });
    return { _id: translation._id, navigation: newNavigation };
  });
  console.log({ patches });
  const result = await Promise.all(
    patches.map(
      (patch) => client.action({
        actionType: "sanity.action.document.edit",
        draftId: `drafts.${patch._id}`,
        publishedId: patch._id,
        patch: {
          set: {
            navigation: patch.navigation
          }
        }
      }).then((res) => {
        console.log({ res });
        return res;
      }).catch((err) => {
        console.error({ err });
        return err;
      })
    )
  );
  console.log({ result });
});
export {
  C,
  handler,
  isRecord as i
};
//# sourceMappingURL=index.js.map
