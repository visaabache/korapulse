// Admin sessions: after a successful login on /admin/login, the browser gets a random token in a
// secure cookie (HttpOnly, Secure, SameSite=Strict, only sent to /admin). Cloudflare KV keeps a
// SHA-256 hash of the token with its expiry, never the token itself.
const COOKIE = "kp_admin";
const SHORT = 12 * 3600;     // 12 hours
const LONG = 14 * 86400;     // "Remember me": 14 days

const hex = (buf) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
const sha = async (s) => hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)));

export function tokenFrom(request) {
  const m = /(?:^|;\s*)kp_admin=([a-f0-9]{64})(?:;|$)/.exec(request.headers.get("cookie") || "");
  return m ? m[1] : null;
}

export async function getSession(request, env) {
  const t = tokenFrom(request);
  if (!t || !env.AUTH) return null;
  const s = await env.AUTH.get("session:" + (await sha(t)), "json");
  return s && s.exp > Date.now() ? s : null;
}

export async function createSession(env, user, remember, secureCookie) {
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const ttl = remember ? LONG : SHORT;
  await env.AUTH.put("session:" + (await sha(token)), JSON.stringify({ user, exp: Date.now() + ttl * 1000, created: new Date().toISOString() }), { expirationTtl: ttl });
  return `${COOKIE}=${token}; Path=/admin; Max-Age=${ttl}; HttpOnly; SameSite=Strict${secureCookie ? "; Secure" : ""}`;
}

export async function endSession(request, env) {
  const t = tokenFrom(request);
  if (t && env.AUTH) await env.AUTH.delete("session:" + (await sha(t)));
  return `${COOKIE}=; Path=/admin; Max-Age=0; HttpOnly; SameSite=Strict`;
}

// after a password change: sign out every device
export async function endAllSessions(env) {
  let cursor;
  do {
    const r = await env.AUTH.list({ prefix: "session:", cursor });
    for (const k of r.keys) await env.AUTH.delete(k.name);
    cursor = r.list_complete ? null : r.cursor;
  } while (cursor);
}
