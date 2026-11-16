// KoraPulse Worker: serves the static site, and locks /admin/ behind a username and password.
//
// Password, in order of priority:
//   1. the one set in the dashboard (Settings → Administrator account), kept in the AUTH KV
//      namespace as a salted PBKDF2 hash, never in plain text;
//   2. otherwise the Cloudflare secret ADMIN_PASSWORD (username "admin", or ADMIN_USER).
// Forgot the password? Delete the "admin" key in the korapulse-auth KV namespace
// (Storage & Databases → KV) and log in with ADMIN_PASSWORD again.
import { handleMatches, scoresConfig } from "./matches.js";
import { status as apiFootballStatus } from "./apifootball.js";
import { handleContact, handleMessages } from "./contact.js";
import { SITE, describe, headTags, bodyHtml, sitemap, robots } from "./seo.js";
import { secure, sameOrigin, securityTxt } from "./security.js";

const REALM = 'Basic realm="KoraPulse admin", charset="UTF-8"';
const ITERATIONS = 100000;
const MAX_FAILS = 10;           // wrong passwords allowed per IP address...
const FAIL_WINDOW = 15 * 60;    // ...in this many seconds
const enc = new TextEncoder();

const hex = (buf) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
const unhex = (s) => new Uint8Array(s.match(/../g).map((h) => parseInt(h, 16)));

async function same(a, b) {
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(String(a))), crypto.subtle.digest("SHA-256", enc.encode(String(b)))]);
  return crypto.subtle.timingSafeEqual(x, y);
}
async function pbkdf2(password, saltHex, iterations) {
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  return hex(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: unhex(saltHex), iterations }, key, 256));
}

async function account(env) {
  const saved = env.AUTH ? await env.AUTH.get("admin", "json") : null;
  return saved || (env.ADMIN_PASSWORD ? { user: env.ADMIN_USER || "admin", secret: env.ADMIN_PASSWORD } : null);
}
async function checkPassword(acc, user, pass) {
  const okUser = await same(user.toLowerCase(), acc.user.toLowerCase());
  const okPass = acc.secret != null ? await same(pass, acc.secret) : await same(await pbkdf2(pass, acc.salt, acc.iterations), acc.hash);
  return okUser && okPass;
}
function credentials(request) {
  const [scheme, value] = (request.headers.get("authorization") || "").split(" ");
  if (scheme !== "Basic" || !value) return null;
  try {
    const decoded = new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0)));
    const i = decoded.indexOf(":");
    return i < 0 ? null : { user: decoded.slice(0, i), pass: decoded.slice(i + 1) };
  } catch (e) { return null; }
}

const page = (title, text, status, extra = {}) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
  <body style="font:16px system-ui,sans-serif;background:#f0f0f1;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center">
  <div><h1 style="font-weight:400">${title}</h1><p>${text}</p><p><a href="/">← Back to KoraPulse</a></p></div>`,
  { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...extra } });
// ---------- link previews (Facebook, WhatsApp, X, Instagram) ----------
// The pages are built in the browser, so the Worker adds the title, summary and picture
// of each page to its HTML for the apps that read them when a link is shared.
let cache = { tag: null, data: null };
async function siteData(env, origin) {
  const res = await env.ASSETS.fetch(new Request(origin + "/js/data.js"));
  const tag = res.headers.get("etag") || res.headers.get("last-modified");
  if (tag && cache.tag === tag) return cache.data;
  const text = await res.text();
  let data = null;
  try { data = JSON.parse(text.slice(text.indexOf("{", text.indexOf("window.KP")), text.lastIndexOf("}") + 1)); } catch (e) {}
  cache = { tag, data };
  return data;
}
const attr = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const imageOf = (data, a) => {
  const u = a && a.image;
  if (!u) return null;
  if (u.startsWith("media:")) { const m = (data.media || []).find((x) => x.id === u.slice(6)); return m ? m.url : null; }
  return u;
};

async function withPreview(request, env, url) {
  const res = await env.ASSETS.fetch(request);
  if (!res.ok || !(res.headers.get("content-type") || "").includes("text/html")) return res;
  const data = await siteData(env, url.origin);
  if (!data) return res;
  const d = describe(data, url);
  const img = d.article ? imageOf(data, d.article) : null;
  const image = img ? (img.startsWith("data:") ? `${SITE}/og/${encodeURIComponent(d.article.id)}` : new URL(img, SITE).href) : `${SITE}/og-image.png`;
  const out = new HTMLRewriter()
    .on("html", { element(el) { el.setAttribute("lang", d.lang); el.setAttribute("dir", d.lang === "ar" ? "rtl" : "ltr"); } })
    .on("title", { element(el) { el.setInnerContent(d.title); } })
    .on('meta[name="description"]', { element(el) { el.remove(); } })
    .on("head", { element(el) { el.append(headTags(d, image, !!img), { html: true }); } })
    .on("main#main", { element(el) { el.setInnerContent(bodyHtml(d), { html: true }); } })
    .transform(res);
  const r = new Response(out.body, out);
  r.headers.set("cache-control", "public, max-age=60");
  if (url.hostname !== new URL(SITE).hostname) r.headers.set("x-robots-tag", "noindex");
  return r;
}

async function previewImage(env, url) {
  const data = await siteData(env, url.origin);
  const a = data && (data.articles || []).find((x) => x.id === decodeURIComponent(url.pathname.slice(4)));
  const img = a && imageOf(data, a);
  const m = img && img.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
  if (!m) return Response.redirect(url.origin + "/og-image.png", 302);
  const bytes = Uint8Array.from(atob(m[2]), (c) => c.charCodeAt(0));
  return new Response(bytes, { headers: { "content-type": m[1], "cache-control": "public, max-age=3600" } });
}

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    // HTTPS only
    if (url.protocol === "http:" && !/^(localhost|127\.0\.0\.1)$/.test(url.hostname)) { url.protocol = "https:"; return Response.redirect(url.toString(), 301); }
    // changes must come from this website (blocks forged requests from other sites)
    if ((url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin/")) && !sameOrigin(request, url)) {
      return secure(new Response(JSON.stringify({ error: "Request refused." }), { status: 403, headers: { "content-type": "application/json" } }));
    }
    try {
      return secure(await route(request, env, ctx, url));
    } catch (e) {
      return secure(new Response("Something went wrong. Please try again.", { status: 500, headers: { "content-type": "text/plain; charset=utf-8" } }));
    }
  }
};

async function route(request, env, ctx, url) {
  {
    // one address for everyone: www.korapulse.space → korapulse.space
    if (url.hostname === "www.korapulse.space") { url.hostname = "korapulse.space"; return Response.redirect(url.toString(), 301); }
    if (url.pathname === "/api/matches") return handleMatches(request, env, ctx);
    if (url.pathname === "/api/contact") return handleContact(request, env);
    if (url.pathname === "/robots.txt") return robots(url);
    if (url.pathname === "/.well-known/security.txt") return securityTxt(SITE);
    if (url.pathname === "/sitemap.xml") { const data = await siteData(env, url.origin); return data ? sitemap(data) : new Response("Not found", { status: 404 }); }
    if (url.pathname === "/admin") return Response.redirect(url.origin + "/admin/", 301);
    if (url.pathname.startsWith("/og/")) return previewImage(env, url);
    if (!url.pathname.startsWith("/admin/")) {
      if (/^\/(index\.html|article(\.html)?|category(\.html)?|matches(\.html)?|page(\.html)?)?$/.test(url.pathname)) return withPreview(request, env, url);
      return env.ASSETS.fetch(request);
    }

    const acc = await account(env);
    if (!acc) return page("Admin locked", "No admin password is set on this Worker (secret ADMIN_PASSWORD).", 503);
    if (url.pathname === "/admin/logout") {
      return page("Logged out", 'You are logged out. If your browser still remembers the password, close the browser. <a href="/admin/">Log in again</a>', 401, { "www-authenticate": REALM });
    }

    // too many wrong passwords from this address: wait a while
    const ip = request.headers.get("cf-connecting-ip") || "unknown";
    const failKey = "fails:" + ip;
    const fails = env.AUTH ? +(await env.AUTH.get(failKey)) || 0 : 0;
    if (fails >= MAX_FAILS) return page("Too many attempts", "Too many wrong passwords. Try again in 15 minutes.", 429, { "retry-after": String(FAIL_WINDOW) });

    const cred = credentials(request);
    const ok = cred && await checkPassword(acc, cred.user, cred.pass);
    if (!ok) {
      if (cred && env.AUTH) await env.AUTH.put(failKey, String(fails + 1), { expirationTtl: FAIL_WINDOW });
      return page("Log in required", "Enter the admin username and password to open the dashboard.", 401, { "www-authenticate": REALM });
    }

    if (url.pathname === "/admin/server-auth.js") {
      const info = { user: acc.user, canChange: !!env.AUTH, changed: acc.secret == null ? acc.changed || null : null };
      return new Response(`window.KP_SERVER_AUTH = ${JSON.stringify(info)};`, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" } });
    }

    if (url.pathname === "/admin/api/messages") return handleMessages(request, env, url);

    // live scores provider (Admin → Settings → Live scores)
    if (url.pathname === "/admin/api/scores") {
      if (!env.AUTH) return json({ error: "Missing AUTH storage." }, 500);
      const cfg = await scoresConfig(env);
      if (request.method === "POST") {
        let body;
        try { body = await request.json(); } catch (e) { return json({ error: "Invalid request." }, 400); }
        const saved = (await env.AUTH.get("scores-config", "json")) || {};
        const next = { ...saved };
        if (["auto", "espn", "apifootball"].includes(body.provider)) next.provider = body.provider;
        if (typeof body.apiKey === "string" && body.apiKey.trim()) next.apiKey = body.apiKey.trim();
        if (body.removeKey) delete next.apiKey;
        if (body.perDay) next.perDay = Math.max(10, Math.min(1000000, parseInt(body.perDay, 10) || 100));
        await env.AUTH.put("scores-config", JSON.stringify(next));
        // drop cached days so the new settings apply at once
        for (const k of (await env.AUTH.list({ prefix: "af:" })).keys) if (/^af:\d{8}$/.test(k.name)) await env.AUTH.delete(k.name);
        return json({ ok: true });
      }
      const usage = await env.AUTH.get("af:usage", "json");
      const lastError = await env.AUTH.get("af:lastError", "json");
      let test = null;
      if (url.searchParams.get("test") === "1" && cfg.key) test = await apiFootballStatus(cfg.key);
      return json({
        wanted: cfg.wanted, provider: cfg.provider, perDay: cfg.perDay,
        hasKey: !!cfg.key, keyHint: cfg.key ? "••••" + cfg.key.slice(-4) : "",
        refreshMinutes: Math.max(1, Math.ceil(1440 / (cfg.perDay * 0.75))),
        usage, lastError, test
      });
    }

    if (url.pathname === "/admin/api/password") {
      if (request.method !== "POST") return json({ error: "Use POST." }, 405);
      if (!env.AUTH) return json({ error: "Password changes are not set up (missing AUTH storage)." }, 500);
      let body;
      try { body = await request.json(); } catch (e) { return json({ error: "Invalid request." }, 400); }
      const user = String(body.user || "").trim();
      const next = String(body.password || "");
      if (!(await checkPassword(acc, acc.user, String(body.current || "")))) {
        await env.AUTH.put(failKey, String(fails + 1), { expirationTtl: FAIL_WINDOW });
        return json({ error: "Your current password is incorrect." }, 403);
      }
      if (!/^[\w.@-]{3,40}$/.test(user)) return json({ error: "The username must be 3 to 40 letters, numbers or . _ @ -" }, 400);
      if (next.length < 10) return json({ error: "The new password must be at least 10 characters." }, 400);
      if (next.toLowerCase() === user.toLowerCase()) return json({ error: "The password cannot be the same as the username." }, 400);
      const salt = hex(crypto.getRandomValues(new Uint8Array(16)));
      await env.AUTH.put("admin", JSON.stringify({ user, salt, iterations: ITERATIONS, hash: await pbkdf2(next, salt, ITERATIONS), changed: new Date().toISOString() }));
      return json({ ok: true, user });
    }

    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set("cache-control", "no-store");
    out.headers.set("x-robots-tag", "noindex, nofollow");
    return out;
  }
}
