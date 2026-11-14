// KoraPulse Worker: serves the static site, and locks /admin/ behind a username and password.
// The password is a Cloudflare secret (never in this repository):
//   npx wrangler secret put ADMIN_PASSWORD      (username: "admin", or set ADMIN_USER)
const REALM = 'Basic realm="KoraPulse admin", charset="UTF-8"';
const enc = new TextEncoder();

async function same(a, b) {
  const [x, y] = await Promise.all([crypto.subtle.digest("SHA-256", enc.encode(a)), crypto.subtle.digest("SHA-256", enc.encode(b))]);
  return crypto.subtle.timingSafeEqual(x, y);
}

async function authorized(request, env) {
  const [scheme, value] = (request.headers.get("authorization") || "").split(" ");
  if (scheme !== "Basic" || !value) return null;
  let decoded;
  try { decoded = new TextDecoder().decode(Uint8Array.from(atob(value), (c) => c.charCodeAt(0))); } catch (e) { return null; }
  const i = decoded.indexOf(":");
  if (i < 0) return null;
  const user = decoded.slice(0, i), pass = decoded.slice(i + 1);
  const okUser = await same(user.toLowerCase(), (env.ADMIN_USER || "admin").toLowerCase());
  const okPass = await same(pass, env.ADMIN_PASSWORD);
  return okUser && okPass ? user : null;
}

const page = (title, text, status, extra = {}) => new Response(
  `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
  <body style="font:16px system-ui,sans-serif;background:#f0f0f1;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center">
  <div><h1 style="font-weight:400">${title}</h1><p>${text}</p><p><a href="/">← Back to KoraPulse</a></p></div>`,
  { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", ...extra } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/admin") return Response.redirect(url.origin + "/admin/", 301);
    if (!url.pathname.startsWith("/admin/")) return env.ASSETS.fetch(request);

    if (!env.ADMIN_PASSWORD) return page("Admin locked", "The ADMIN_PASSWORD secret is not set on this Worker.", 503);
    if (url.pathname === "/admin/logout") {
      return page("Logged out", 'You are logged out. If your browser still remembers the password, close the browser. <a href="/admin/">Log in again</a>', 401, { "www-authenticate": REALM });
    }
    const user = await authorized(request, env);
    if (!user) return page("Log in required", "Enter the admin username and password to open the dashboard.", 401, { "www-authenticate": REALM });

    if (url.pathname === "/admin/server-auth.js") {
      return new Response(`window.KP_SERVER_AUTH = ${JSON.stringify({ user })};`, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "no-store" } });
    }
    const res = await env.ASSETS.fetch(request);
    const out = new Response(res.body, res);
    out.headers.set("cache-control", "no-store");
    out.headers.set("x-robots-tag", "noindex, nofollow");
    return out;
  }
};
