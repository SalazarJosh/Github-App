/*!
 * MotionPathPlugin 3.2.6
 * https://greensock.com
 * 
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(t) {
  "use strict";

  function p(t) {
    return "string" == typeof t
  }

  function x(t, e, n, r) {
    var a = t[e],
      o = 1 === r ? 6 : subdivideSegment(a, n, r);
    if (o && o + n + 2 < a.length) return t.splice(e, 0, a.slice(0, n + o + 2)), a.splice(0, n + o), 1
  }

  function A(t, e) {
    var n = t.length,
      r = t[n - 1] || [],
      a = r.length;
    e[0] === r[a - 2] && e[1] === r[a - 1] && (e = r.concat(e.slice(2)), n--), t[n] = e
  }
  var M = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    R = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
    L = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
    r = /(^[#\.][a-z]|[a-y][a-z])/i,
    F = Math.PI / 180,
    s = 180 / Math.PI,
    W = Math.sin,
    U = Math.cos,
    H = Math.abs,
    Z = Math.sqrt,
    S = Math.atan2,
    B = 1e8,
    l = function _isNumber(t) {
      return "number" == typeof t
    },
    N = {},
    _ = {},
    e = 1e5,
    d = function _wrapProgress(t) {
      return Math.round((t + B) % 1 * e) / e || (t < 0 ? 0 : 1)
    },
    C = function _round(t) {
      return Math.round(t * e) / e || 0
    },
    I = function _copyMetaData(t, e) {
      return e.totalLength = t.totalLength, t.samples ? (e.samples = t.samples.slice(0), e.lookup = t.lookup.slice(0), e.minLength = t.minLength, e.resolution = t.resolution) : e.totalPoints = t.totalPoints, e
    };

  function getRawPath(t) {
    var e, n = (t = p(t) && r.test(t) && document.querySelector(t) || t).getAttribute ? t : 0;
    return n && (t = t.getAttribute("d")) ? (n._gsPath || (n._gsPath = {}), (e = n._gsPath[t]) && !e._dirty ? e : n._gsPath[t] = stringToRawPath(t)) : t ? p(t) ? stringToRawPath(t) : l(t[0]) ? [t] : t : console.warn("Expecting a <path> element or an SVG path data string")
  }

  function reverseSegment(t) {
    var e, n = 0;
    for (t.reverse(); n < t.length; n += 2) e = t[n], t[n] = t[n + 1], t[n + 1] = e;
    t.reversed = !t.reversed
  }
  var D = {
    rect: "rx,ry,x,y,width,height",
    circle: "r,cx,cy",
    ellipse: "rx,ry,cx,cy",
    line: "x1,x2,y1,y2"
  };

  function convertToPath(t, e) {
    var n, r, a, o, i, s, l, h, u, g, f, p, c, d, m, v, x, y, P, w, b, M, L = t.tagName.toLowerCase(),
      T = .552284749831;
    return "path" !== L && t.getBBox ? (s = function _createPath(t, e) {
      var n, r = document.createElementNS("http://www.w3.org/2000/svg", "path"),
        a = [].slice.call(t.attributes),
        o = a.length;
      for (e = "," + e + ","; - 1 < --o;) n = a[o].nodeName.toLowerCase(), e.indexOf("," + n + ",") < 0 && r.setAttributeNS(null, n, a[o].nodeValue);
      return r
    }(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), M = function _attrToObj(t, e) {
      for (var n = e ? e.split(",") : [], r = {}, a = n.length; - 1 < --a;) r[n[a]] = +t.getAttribute(n[a]) || 0;
      return r
    }(t, D[L]), "rect" === L ? (o = M.rx, i = M.ry, r = M.x, a = M.y, g = M.width - 2 * o, f = M.height - 2 * i, n = o || i ? "M" + (v = (d = (c = r + o) + g) + o) + "," + (y = a + i) + " V" + (P = y + f) + " C" + [v, w = P + i * T, m = d + o * T, b = P + i, d, b, d - (d - c) / 3, b, c + (d - c) / 3, b, c, b, p = r + o * (1 - T), b, r, w, r, P, r, P - (P - y) / 3, r, y + (P - y) / 3, r, y, r, x = a + i * (1 - T), p, a, c, a, c + (d - c) / 3, a, d - (d - c) / 3, a, d, a, m, a, v, x, v, y].join(",") + "z" : "M" + (r + g) + "," + a + " v" + f + " h" + -g + " v" + -f + " h" + g + "z") : "circle" === L || "ellipse" === L ? (h = "circle" === L ? (o = i = M.r) * T : (o = M.rx, (i = M.ry) * T), n = "M" + ((r = M.cx) + o) + "," + (a = M.cy) + " C" + [r + o, a + h, r + (l = o * T), a + i, r, a + i, r - l, a + i, r - o, a + h, r - o, a, r - o, a - h, r - l, a - i, r, a - i, r + l, a - i, r + o, a - h, r + o, a].join(",") + "z") : "line" === L ? n = "M" + M.x1 + "," + M.y1 + " L" + M.x2 + "," + M.y2 : "polyline" !== L && "polygon" !== L || (n = "M" + (r = (u = (t.getAttribute("points") + "").match(R) || []).shift()) + "," + (a = u.shift()) + " L" + u.join(","), "polygon" === L && (n += "," + r + "," + a + "z")), s.setAttribute("d", rawPathToString(s._gsRawPath = stringToRawPath(n))), e && t.parentNode && (t.parentNode.insertBefore(s, t), t.parentNode.removeChild(t)), s) : t
  }

  function getRotationAtBezierT(t, e, n) {
    var r, a = t[e],
      o = t[e + 2],
      i = t[e + 4];
    return a += (o - a) * n, a += ((o += (i - o) * n) - a) * n, r = o + (i + (t[e + 6] - i) * n - o) * n - a, a = t[e + 1], a += ((o = t[e + 3]) - a) * n, a += ((o += ((i = t[e + 5]) - o) * n) - a) * n, C(S(o + (i + (t[e + 7] - i) * n - o) * n - a, r) * s)
  }

  function sliceRawPath(t, e, n) {
    ! function _isUndefined(t) {
      return void 0 === t
    }(n) || (n = 1);
    var r = n < (e = e || 0),
      a = Math.max(0, ~~(H(n - e) - 1e-8));
    if (r && (r = n, n = e, e = r, r = 1, a -= a ? 1 : 0), e < 0 || n < 0) {
      var o = 1 + ~~Math.min(e, n);
      e += o, n += o
    }
    var i, s, l, h, u, g, f, p = function copyRawPath(t) {
        for (var e = [], n = 0; n < t.length; n++) e[n] = I(t[n], t[n].slice(0));
        return I(t, e)
      }(t.totalLength ? t : cacheRawPathMeasurements(t)),
      c = 1 < n,
      d = getProgressData(p, e, N, !0),
      m = getProgressData(p, n, _),
      v = m.segment,
      y = d.segment,
      P = m.segIndex,
      w = d.segIndex,
      b = m.i,
      M = d.i,
      L = w === P,
      T = b === M && L,
      R = L && b < M || T && d.t > m.t;
    if (c || a) {
      if (x(p, w, M, d.t) && (i = 1, w++, T ? R ? m.t /= d.t : (m.t = (m.t - d.t) / (1 - d.t), P++, b = 0) : w <= P + 1 && !R && (P++, L && (b -= M))), m.t ? x(p, P, b, m.t) && (R && i && w++, r && P++) : (P--, r && w--), h = [], g = 1 + (u = p.length) * a, f = w, r)
        for (g += (u - (P = (P || u) - 1) + w) % u, l = 0; l < g; l++) A(h, p[f]), f = (f || u) - 1;
      else
        for (g += (u - w + P) % u, l = 0; l < g; l++) A(h, p[f++ % u]);
      p = h
    } else if (s = 1 === m.t ? 6 : subdivideSegment(v, b, m.t), e !== n)
      for (i = subdivideSegment(y, M, T ? d.t / m.t : d.t), L && (s += i), v.splice(b + s + 2), (i || M) && y.splice(0, M + i), l = p.length; l--;)(l < w || P < l) && p.splice(l, 1);
    else v.angle = getRotationAtBezierT(v, b + s, 0), d = v[b += s], m = v[b + 1], v.length = v.totalLength = 0, v.totalPoints = p.totalPoints = 8, v.push(d, m, d, m, d, m, d, m);
    return r && function _reverseRawPath(t, e) {
      var n = t.length;
      for (e || t.reverse(); n--;) t[n].reversed || reverseSegment(t[n])
    }(p, c || a), p.totalLength = 0, p
  }

  function measureSegment(t, e, n) {
    e = e || 0, t.samples || (t.samples = [], t.lookup = []);
    var r, a, o, i, s, l, h, u, g, f, p, c, d, m, v, x, y, P = ~~t.resolution || 12,
      w = 1 / P,
      b = n ? e + 6 * n + 1 : t.length,
      M = t[e],
      L = t[e + 1],
      T = e ? e / 6 * P : 0,
      R = t.samples,
      S = t.lookup,
      N = (e ? t.minLength : B) || B,
      _ = R[T + n * P - 1],
      C = e ? R[T - 1] : 0;
    for (R.length = S.length = 0, a = e + 2; a < b; a += 6) {
      if (o = t[a + 4] - M, i = t[a + 2] - M, s = t[a] - M, u = t[a + 5] - L, g = t[a + 3] - L, f = t[a + 1] - L, l = h = p = c = 0, H(o) < 1e-5 && H(u) < 1e-5 && H(s) + H(f) < 1e-5) 8 < t.length && (t.splice(a, 6), a -= 6, b -= 6);
      else
        for (r = 1; r <= P; r++) l = h - (h = ((m = w * r) * m * o + 3 * (d = 1 - m) * (m * i + d * s)) * m), p = c - (c = (m * m * u + 3 * d * (m * g + d * f)) * m), (x = Z(p * p + l * l)) < N && (N = x), C += x, R[T++] = C;
      M += o, L += u
    }
    if (_)
      for (_ -= C; T < R.length; T++) R[T] += _;
    if (R.length && N)
      for (t.totalLength = y = R[R.length - 1] || 0, t.minLength = N, x = v = 0, r = 0; r < y; r += N) S[x++] = R[v] < r ? ++v : v;
    else t.totalLength = R[0] = 0;
    return e ? C - R[e / 2 - 1] : C
  }

  function cacheRawPathMeasurements(t, e) {
    var n, r, a;
    for (a = n = r = 0; a < t.length; a++) t[a].resolution = ~~e || 12, r += t[a].length, n += measureSegment(t[a]);
    return t.totalPoints = r, t.totalLength = n, t
  }

  function subdivideSegment(t, e, n) {
    if (n <= 0 || 1 <= n) return 0;
    var r = t[e],
      a = t[e + 1],
      o = t[e + 2],
      i = t[e + 3],
      s = t[e + 4],
      l = t[e + 5],
      h = r + (o - r) * n,
      u = o + (s - o) * n,
      g = a + (i - a) * n,
      f = i + (l - i) * n,
      p = h + (u - h) * n,
      c = g + (f - g) * n,
      d = s + (t[e + 6] - s) * n,
      m = l + (t[e + 7] - l) * n;
    return u += (d - u) * n, f += (m - f) * n, t.splice(e + 2, 4, C(h), C(g), C(p), C(c), C(p + (u - p) * n), C(c + (f - c) * n), C(u), C(f), C(d), C(m)), t.samples && t.samples.splice(e / 6 * t.resolution | 0, 0, 0, 0, 0, 0, 0, 0), 6
  }

  function getProgressData(t, e, n, r) {
    n = n || {}, t.totalLength || cacheRawPathMeasurements(t), (e < 0 || 1 < e) && (e = d(e));
    var a, o, i, s, l, h, u, g = 0,
      f = t[0];
    if (1 < t.length) {
      for (i = t.totalLength * e, l = h = 0;
        (l += t[h++].totalLength) < i;) g = h;
      e = (i - (s = l - (f = t[g]).totalLength)) / (l - s) || 0
    }
    return a = f.samples, o = f.resolution, i = f.totalLength * e, s = (h = f.lookup[~~(i / f.minLength)] || 0) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), u = 1 / o * ((i - s) / (l - s) + h % o), h = 6 * ~~(h / o), r && 1 === u && (h + 6 < f.length ? (h += 6, u = 0) : g + 1 < t.length && (h = u = 0, f = t[++g])), n.t = u, n.i = h, n.path = t, n.segment = f, n.segIndex = g, n
  }

  function getPositionOnPath(t, e, n, r) {
    var a, o, i, s, l, h, u, g, f, p = t[0],
      c = r || {};
    if ((e < 0 || 1 < e) && (e = d(e)), 1 < t.length) {
      for (i = t.totalLength * e, l = h = 0;
        (l += t[h++].totalLength) < i;) p = t[h];
      e = (i - (s = l - p.totalLength)) / (l - s) || 0
    }
    return a = p.samples, o = p.resolution, i = p.totalLength * e, s = (h = p.lookup[~~(i / p.minLength)] || 0) ? a[h - 1] : 0, (l = a[h]) < i && (s = l, l = a[++h]), f = 1 - (u = 1 / o * ((i - s) / (l - s) + h % o) || 0), g = p[h = 6 * ~~(h / o)], c.x = C((u * u * (p[h + 6] - g) + 3 * f * (u * (p[h + 4] - g) + f * (p[h + 2] - g))) * u + g), c.y = C((u * u * (p[h + 7] - (g = p[h + 1])) + 3 * f * (u * (p[h + 5] - g) + f * (p[h + 3] - g))) * u + g), n && (c.angle = p.totalLength ? getRotationAtBezierT(p, h, 1 <= u ? 1 - 1e-9 : u || 1e-9) : p.angle || 0), c
  }

  function transformRawPath(t, e, n, r, a, o, i) {
    for (var s, l, h, u, g, f = t.length; - 1 < --f;)
      for (l = (s = t[f]).length, h = 0; h < l; h += 2) u = s[h], g = s[h + 1], s[h] = u * e + g * r + o, s[h + 1] = u * n + g * a + i;
    return t._dirty = 1, t
  }

  function arcToSegment(t, e, n, r, a, o, i, s, l) {
    if (t !== s || e !== l) {
      n = H(n), r = H(r);
      var h = a % 360 * F,
        u = U(h),
        g = W(h),
        f = Math.PI,
        p = 2 * f,
        c = (t - s) / 2,
        d = (e - l) / 2,
        m = u * c + g * d,
        v = -g * c + u * d,
        x = m * m,
        y = v * v,
        P = x / (n * n) + y / (r * r);
      1 < P && (n = Z(P) * n, r = Z(P) * r);
      var w = n * n,
        b = r * r,
        M = (w * b - w * y - b * x) / (w * y + b * x);
      M < 0 && (M = 0);
      var L = (o === i ? -1 : 1) * Z(M),
        T = n * v / r * L,
        R = -r * m / n * L,
        S = u * T - g * R + (t + s) / 2,
        N = g * T + u * R + (e + l) / 2,
        _ = (m - T) / n,
        C = (v - R) / r,
        A = (-m - T) / n,
        O = (-v - R) / r,
        B = _ * _ + C * C,
        I = (C < 0 ? -1 : 1) * Math.acos(_ / Z(B)),
        V = (_ * O - C * A < 0 ? -1 : 1) * Math.acos((_ * A + C * O) / Z(B * (A * A + O * O)));
      isNaN(V) && (V = f), !i && 0 < V ? V -= p : i && V < 0 && (V += p), I %= p, V %= p;
      var D, z = Math.ceil(H(V) / (p / 4)),
        E = [],
        G = V / z,
        j = 4 / 3 * W(G / 2) / (1 + U(G / 2)),
        Y = u * n,
        k = g * n,
        q = g * -r,
        X = u * r;
      for (D = 0; D < z; D++) m = U(a = I + D * G), v = W(a), _ = U(a += G), C = W(a), E.push(m - j * v, v + j * m, _ + j * C, C - j * _, _, C);
      for (D = 0; D < E.length; D += 2) m = E[D], v = E[D + 1], E[D] = m * Y + v * q + S, E[D + 1] = m * k + v * X + N;
      return E[D - 2] = s, E[D - 1] = l, E
    }
  }

  function stringToRawPath(t) {
    function qf(t, e, n, r) {
      u = (n - t) / 3, g = (r - e) / 3, s.push(t + u, e + g, n - u, r - g, n, r)
    }
    var e, n, r, a, o, i, s, l, h, u, g, f, p, c, d, m = (t + "").replace(L, function(t) {
        var e = +t;
        return e < 1e-4 && -1e-4 < e ? 0 : e
      }).match(M) || [],
      v = [],
      x = 0,
      y = 0,
      P = m.length,
      w = 0,
      b = "ERROR: malformed path: " + t;
    if (!t || !isNaN(m[0]) || isNaN(m[1])) return console.log(b), v;
    for (e = 0; e < P; e++)
      if (p = o, isNaN(m[e]) ? i = (o = m[e].toUpperCase()) !== m[e] : e--, r = +m[e + 1], a = +m[e + 2], i && (r += x, a += y), e || (l = r, h = a), "M" === o) s && (s.length < 8 ? --v.length : w += s.length), x = l = r, y = h = a, s = [r, a], v.push(s), e += 2, o = "L";
      else if ("C" === o) i || (x = y = 0), (s = s || [0, 0]).push(r, a, x + 1 * m[e + 3], y + 1 * m[e + 4], x += 1 * m[e + 5], y += 1 * m[e + 6]), e += 6;
    else if ("S" === o) u = x, g = y, "C" !== p && "S" !== p || (u += x - s[s.length - 4], g += y - s[s.length - 3]), i || (x = y = 0), s.push(u, g, r, a, x += 1 * m[e + 3], y += 1 * m[e + 4]), e += 4;
    else if ("Q" === o) u = x + 2 / 3 * (r - x), g = y + 2 / 3 * (a - y), i || (x = y = 0), x += 1 * m[e + 3], y += 1 * m[e + 4], s.push(u, g, x + 2 / 3 * (r - x), y + 2 / 3 * (a - y), x, y), e += 4;
    else if ("T" === o) u = x - s[s.length - 4], g = y - s[s.length - 3], s.push(x + u, y + g, r + 2 / 3 * (x + 1.5 * u - r), a + 2 / 3 * (y + 1.5 * g - a), x = r, y = a), e += 2;
    else if ("H" === o) qf(x, y, x = r, y), e += 1;
    else if ("V" === o) qf(x, y, x, y = r + (i ? y - x : 0)), e += 1;
    else if ("L" === o || "Z" === o) "Z" === o && (r = l, a = h, s.closed = !0), ("L" === o || .5 < H(x - r) || .5 < H(y - a)) && (qf(x, y, r, a), "L" === o && (e += 2)), x = r, y = a;
    else if ("A" === o) {
      if (c = m[e + 4], d = m[e + 5], u = m[e + 6], g = m[e + 7], n = 7, 1 < c.length && (c.length < 3 ? (g = u, u = d, n--) : (g = d, u = c.substr(2), n -= 2), d = c.charAt(1), c = c.charAt(0)), f = arcToSegment(x, y, +m[e + 1], +m[e + 2], +m[e + 3], +c, +d, (i ? x : 0) + 1 * u, (i ? y : 0) + 1 * g), e += n, f)
        for (n = 0; n < f.length; n++) s.push(f[n]);
      x = s[s.length - 2], y = s[s.length - 1]
    } else console.log(b);
    return (e = s.length) < 6 ? (v.pop(), e = 0) : s[0] === s[e - 2] && s[1] === s[e - 1] && (s.closed = !0), v.totalPoints = w + e, v
  }

  function flatPointsToSegment(t, e) {
    void 0 === e && (e = 1);
    for (var n = t[0], r = 0, a = [n, r], o = 2; o < t.length; o += 2) a.push(n, r, t[o], r = (t[o] - n) * e / 2, n = t[o], -r);
    return a
  }

  function pointsToSegment(t, e, n) {
    var r, a, o, i, s, l, h, u, g, f, p, c, d, m, v = t.length - 2,
      x = +t[0],
      y = +t[1],
      P = +t[2],
      w = +t[3],
      b = [x, y, x, y],
      M = P - x,
      L = w - y;
    for (isNaN(n) && (n = Math.PI / 10), e = e || 0 === e ? +e : 1, s = 2; s < v; s += 2) r = x, a = y, x = P, y = w, c = (l = M) * l + (u = L) * u, d = (M = (P = +t[s + 2]) - x) * M + (L = (w = +t[s + 3]) - y) * L, m = (h = P - r) * h + (g = w - a) * g, p = (o = Math.acos((c + d - m) / Z(4 * c * d))) / Math.PI * e, f = Z(c) * p, p *= Z(d), x === r && y === a || (n < o ? (i = S(g, h), b.push(C(x - U(i) * f), C(y - W(i) * f), C(x), C(y), C(x + U(i) * p), C(y + W(i) * p))) : (i = S(u, l), b.push(C(x - U(i) * f), C(y - W(i) * f)), i = S(L, M), b.push(C(x), C(y), C(x + U(i) * p), C(y + W(i) * p))));
    return b.push(C(P), C(w), C(P), C(w)), b
  }

  function rawPathToString(t) {
    l(t[0]) && (t = [t]);
    var e, n, r, a, o = "",
      i = t.length;
    for (n = 0; n < i; n++) {
      for (a = t[n], o += "M" + C(a[0]) + "," + C(a[1]) + " C", e = a.length, r = 2; r < e; r++) o += C(a[r++]) + "," + C(a[r++]) + " " + C(a[r++]) + "," + C(a[r++]) + " " + C(a[r++]) + "," + C(a[r]) + " ";
      a.closed && (o += "z")
    }
    return o
  }

  function O(t) {
    var e = t.ownerDocument || t;
    !(w in t.style) && "msTransform" in t.style && (b = (w = "msTransform") + "Origin");
    for (; e.parentNode && (e = e.parentNode););
    if (f = window, y = new G, e) {
      c = (g = e).documentElement, m = e.body;
      var n = e.createElement("div"),
        r = e.createElement("div");
      m.appendChild(n), n.appendChild(r), n.style.position = "static", n.style[w] = "translate3d(0,0,1px)", P = r.offsetParent !== n, m.removeChild(n)
    }
    return e
  }

  function T(t) {
    return t.ownerSVGElement || ("svg" === (t.tagName + "").toLowerCase() ? t : null)
  }

  function V(t, e) {
    if (t.parentNode && (g || O(t))) {
      var n = T(t),
        r = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml",
        a = n ? e ? "rect" : "g" : "div",
        o = 2 !== e ? 0 : 100,
        i = 3 === e ? 100 : 0,
        s = "position:absolute;display:block;pointer-events:none;",
        l = g.createElementNS ? g.createElementNS(r.replace(/^https/, "http"), a) : g.createElement(a);
      return e && (n ? (v = v || V(t), l.setAttribute("width", .01), l.setAttribute("height", .01), l.setAttribute("transform", "translate(" + o + "," + i + ")"), v.appendChild(l)) : (u || ((u = V(t)).style.cssText = s), l.style.cssText = s + "width:0.1px;height:0.1px;top:" + i + "px;left:" + o + "px", u.appendChild(l))), l
    }
    throw "Need document and parent."
  }

  function X(t, e) {
    var n, r, a, o, i, s = T(t),
      l = t === s,
      h = s ? z : E;
    if (t === f) return t;
    if (h.length || h.push(V(t, 1), V(t, 2), V(t, 3)), n = s ? v : u, s) a = l ? {
      x: 0,
      y: 0
    } : t.getBBox(), i = (r = t.transform ? t.transform.baseVal : {}).numberOfItems ? (o = (r = 1 < r.numberOfItems ? function _consolidate(t) {
      for (var e = new G, n = 0; n < t.numberOfItems; n++) e.multiply(t.getItem(n).matrix);
      return e
    }(r) : r.getItem(0).matrix).a * a.x + r.c * a.y, r.b * a.x + r.d * a.y) : (r = y, o = a.x, a.y), e && "g" === t.tagName.toLowerCase() && (o = i = 0), n.setAttribute("transform", "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + (r.e + o) + "," + (r.f + i) + ")"), (l ? s : t.parentNode).appendChild(n);
    else {
      if (o = i = 0, P)
        for (r = t.offsetParent, a = t;
          (a = a && a.parentNode) && a !== r && a.parentNode;) 4 < (f.getComputedStyle(a)[w] + "").length && (o = a.offsetLeft, i = a.offsetTop, a = 0);
      (a = n.style).top = t.offsetTop - i + "px", a.left = t.offsetLeft - o + "px", r = f.getComputedStyle(t), a[w] = r[w], a[b] = r[b], a.border = r.border, a.borderLeftStyle = r.borderLeftStyle, a.borderTopStyle = r.borderTopStyle, a.borderLeftWidth = r.borderLeftWidth, a.borderTopWidth = r.borderTopWidth, a.position = "fixed" === r.position ? "fixed" : "absolute", t.parentNode.appendChild(n)
    }
    return n
  }

  function Y(t, e, n, r, a, o, i) {
    return t.a = e, t.b = n, t.c = r, t.d = a, t.e = o, t.f = i, t
  }
  var g, f, c, m, u, v, y, P, n, w = "transform",
    b = w + "Origin",
    z = [],
    E = [],
    G = ((n = Matrix2D.prototype).inverse = function inverse() {
      var t = this.a,
        e = this.b,
        n = this.c,
        r = this.d,
        a = this.e,
        o = this.f,
        i = t * r - e * n;
      return Y(this, r / i, -e / i, -n / i, t / i, (n * o - r * a) / i, -(t * o - e * a) / i)
    }, n.multiply = function multiply(t) {
      var e = this.a,
        n = this.b,
        r = this.c,
        a = this.d,
        o = this.e,
        i = this.f,
        s = t.a,
        l = t.c,
        h = t.b,
        u = t.d,
        g = t.e,
        f = t.f;
      return Y(this, s * e + h * r, s * n + h * a, l * e + u * r, l * n + u * a, o + g * e + f * r, i + g * n + f * a)
    }, n.clone = function clone() {
      return new Matrix2D(this.a, this.b, this.c, this.d, this.e, this.f)
    }, n.equals = function equals(t) {
      var e = this.a,
        n = this.b,
        r = this.c,
        a = this.d,
        o = this.e,
        i = this.f;
      return e === t.a && n === t.b && r === t.c && a === t.d && o === t.e && i === t.f
    }, n.apply = function apply(t, e) {
      void 0 === e && (e = {});
      var n = t.x,
        r = t.y,
        a = this.a,
        o = this.b,
        i = this.c,
        s = this.d,
        l = this.e,
        h = this.f;
      return e.x = n * a + r * i + l || 0, e.y = n * o + r * s + h || 0, e
    }, Matrix2D);

  function Matrix2D(t, e, n, r, a, o) {
    void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === n && (n = 0), void 0 === r && (r = 1), void 0 === a && (a = 0), void 0 === o && (o = 0), Y(this, t, e, n, r, a, o)
  }

  function getGlobalMatrix(t, e, n) {
    if (!t || !t.parentNode || (g || O(t)).documentElement === t) return new G;
    var r = T(t) ? z : E,
      a = X(t, n),
      o = r[0].getBoundingClientRect(),
      i = r[1].getBoundingClientRect(),
      s = r[2].getBoundingClientRect(),
      l = a.parentNode,
      h = function _isFixed(t) {
        return "fixed" === f.getComputedStyle(t).position || ((t = t.parentNode) && 1 === t.nodeType ? _isFixed(t) : void 0)
      }(t),
      u = new G((i.left - o.left) / 100, (i.top - o.top) / 100, (s.left - o.left) / 100, (s.top - o.top) / 100, o.left + (h ? 0 : function _getDocScrollLeft() {
        return f.pageXOffset || g.scrollLeft || c.scrollLeft || m.scrollLeft || 0
      }()), o.top + (h ? 0 : function _getDocScrollTop() {
        return f.pageYOffset || g.scrollTop || c.scrollTop || m.scrollTop || 0
      }()));
    return l.removeChild(a), e ? u.inverse() : u
  }

  function ga(t, e, n, r) {
    for (var a = e.length, o = r, i = 0; i < a; i++) t[o] = parseFloat(e[i][n]), o += 2;
    return t
  }

  function ha(t, e, n) {
    return parseFloat(t._gsap.get(t, e, n || "px")) || 0
  }

  function ia(t) {
    var e, n = t[0],
      r = t[1];
    for (e = 2; e < t.length; e += 2) n = t[e] += n, r = t[e + 1] += r
  }

  function ja(t, e, n, r, a, o, i) {
    return e = "cubic" === i.type ? [e] : (e.unshift(ha(n, r, i.unitX), a ? ha(n, a, i.unitY) : 0), i.relative && ia(e), [(a ? pointsToSegment : flatPointsToSegment)(e, i.curviness)]), e = o(tt(e, n, i)), et(t, n, r, e, "x", i.unitX), a && et(t, n, a, e, "y", i.unitY), cacheRawPathMeasurements(e, i.resolution || (0 === i.curviness ? 20 : 12))
  }

  function ka(t) {
    return t
  }

  function ma(t, e, n) {
    var r, a, o, i = getGlobalMatrix(t);
    return "svg" === (t.tagName + "").toLowerCase() ? (a = (r = t.viewBox.baseVal).x, o = r.y, r.width || (r = {
      width: +t.getAttribute("width"),
      height: +t.getAttribute("height")
    })) : (r = e && t.getBBox && t.getBBox(), a = o = 0), e && "auto" !== e && (a += e.push ? e[0] * (r ? r.width : t.offsetWidth || 0) : e.x, o += e.push ? e[1] * (r ? r.height : t.offsetHeight || 0) : e.y), n.apply(a || o ? i.apply({
      x: a,
      y: o
    }) : {
      x: i.e,
      y: i.f
    })
  }

  function na(t, e, n, r) {
    var a, o = getGlobalMatrix(t.parentNode, !0, !0),
      i = o.clone().multiply(getGlobalMatrix(e)),
      s = ma(t, n, o),
      l = ma(e, r, o),
      h = l.x,
      u = l.y;
    return i.e = i.f = 0, "auto" === r && e.getTotalLength && "path" === e.tagName.toLowerCase() && (a = e.getAttribute("d").match(K) || [], h += (a = i.apply({
      x: +a[0],
      y: +a[1]
    })).x, u += a.y), (a || e.getBBox && t.getBBox) && (h -= (a = i.apply(e.getBBox())).x, u -= a.y), i.e = h - s.x, i.f = u - s.y, i
  }
  var j, k, q, Q, $ = ["x", "translateX", "left", "marginLeft"],
    J = ["y", "translateY", "top", "marginTop"],
    o = Math.PI / 180,
    K = /[-+\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/g,
    tt = function _align(t, e, n) {
      var r, a, o, i = n.align,
        s = n.matrix,
        l = n.offsetX,
        h = n.offsetY,
        u = n.alignOrigin,
        g = t[0][0],
        f = t[0][1],
        p = ha(e, "x"),
        c = ha(e, "y");
      return t && t.length ? (i && ("self" === i || (r = Q(i)[0] || e) === e ? transformRawPath(t, 1, 0, 0, 1, p - g, c - f) : (u && !1 !== u[2] ? j.set(e, {
        transformOrigin: 100 * u[0] + "% " + 100 * u[1] + "%"
      }) : u = [ha(e, "xPercent") / -100, ha(e, "yPercent") / -100], o = (a = na(e, r, u, "auto")).apply({
        x: g,
        y: f
      }), transformRawPath(t, a.a, a.b, a.c, a.d, p + a.e - (o.x - a.e), c + a.f - (o.y - a.f)))), s ? transformRawPath(t, s.a, s.b, s.c, s.d, s.e, s.f) : (l || h) && transformRawPath(t, 1, 0, 0, 1, l || 0, h || 0), t) : getRawPath("M0,0L0,0")
    },
    et = function _addDimensionalPropTween(t, e, n, r, a, o) {
      var i = e._gsap,
        s = i.harness,
        l = s && s.aliases && s.aliases[n],
        h = l && l.indexOf(",") < 0 ? l : n,
        u = t._pt = new k(t._pt, e, h, 0, 0, ka, 0, i.set(e, h, t));
      u.u = q(i.get(e, h, o)) || 0, u.path = r, u.pp = a, t._props.push(h)
    },
    a = {
      version: "3.2.6",
      name: "motionPath",
      register: function register(t, e, n) {
        q = (j = t).utils.getUnit, Q = j.utils.toArray, k = n
      },
      init: function init(t, e) {
        if (!j) return console.warn("Please gsap.registerPlugin(MotionPathPlugin)"), !1;
        "object" == typeof e && !e.style && e.path || (e = {
          path: e
        });
        var n, r, a, o, i = [],
          s = e.path,
          l = s[0],
          h = e.autoRotate,
          u = function _sliceModifier(e, n) {
            return function(t) {
              return e || 1 !== n ? sliceRawPath(t, e, n) : t
            }
          }(e.start, "end" in e ? e.end : 1);
        if (this.rawPaths = i, this.target = t, (this.rotate = h || 0 === h) && (this.rOffset = parseFloat(h) || 0, this.radians = !!e.useRadians, this.rProp = e.rotation || "rotation", this.rSet = t._gsap.set(t, this.rProp, this), this.ru = q(t._gsap.get(t, this.rProp)) || 0), !Array.isArray(s) || "closed" in s || "number" == typeof l) cacheRawPathMeasurements(n = u(tt(getRawPath(e.path), t, e)), e.resolution), i.push(n), et(this, t, e.x || "x", n, "x", e.unitX || "px"), et(this, t, e.y || "y", n, "y", e.unitY || "px");
        else {
          for (r in l) ~$.indexOf(r) ? a = r : ~J.indexOf(r) && (o = r);
          for (r in a && o ? i.push(ja(this, ga(ga([], s, a, 0), s, o, 1), t, e.x || a, e.y || o, u, e)) : a = o = 0, l) r !== a && r !== o && i.push(ja(this, ga([], s, r, 0), t, r, 0, u, e))
        }
      },
      render: function render(t, e) {
        var n = e.rawPaths,
          r = n.length,
          a = e._pt;
        for (1 < t ? t = 1 : t < 0 && (t = 0); r--;) getPositionOnPath(n[r], t, !r && e.rotate, n[r]);
        for (; a;) a.set(a.t, a.p, a.path[a.pp] + a.u, a.d, t), a = a._next;
        e.rotate && e.rSet(e.target, e.rProp, n[0].angle * (e.radians ? o : 1) + e.rOffset + e.ru, e, t)
      },
      getLength: function getLength(t) {
        return cacheRawPathMeasurements(getRawPath(t)).totalLength
      },
      sliceRawPath: sliceRawPath,
      getRawPath: getRawPath,
      pointsToSegment: pointsToSegment,
      stringToRawPath: stringToRawPath,
      rawPathToString: rawPathToString,
      transformRawPath: transformRawPath,
      getGlobalMatrix: getGlobalMatrix,
      getPositionOnPath: getPositionOnPath,
      cacheRawPathMeasurements: cacheRawPathMeasurements,
      convertToPath: function convertToPath$1(t, e) {
        return Q(t).map(function(t) {
          return convertToPath(t, !1 !== e)
        })
      },
      convertCoordinates: function convertCoordinates(t, e, n) {
        var r = getGlobalMatrix(e, !0, !0).multiply(getGlobalMatrix(t));
        return n ? r.apply(n) : r
      },
      getAlignMatrix: na,
      getRelativePosition: function getRelativePosition(t, e, n, r) {
        var a = na(t, e, n, r);
        return {
          x: a.e,
          y: a.f
        }
      },
      arrayToRawPath: function arrayToRawPath(t, e) {
        var n = ga(ga([], t, (e = e || {}).x || "x", 0), t, e.y || "y", 1);
        return e.relative && ia(n), ["cubic" === e.type ? n : pointsToSegment(n, e.curviness)]
      }
    };
  ! function _getGSAP() {
    return j || "undefined" != typeof window && (j = window.gsap) && j.registerPlugin && j
  }() || j.registerPlugin(a), t.MotionPathPlugin = a, t.default = a;
  if (typeof(window) === "undefined" || window !== t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    })
  } else {
    delete t.default
  }
});