// Contact form: POST /api/contact stores the message in KV (AUTH namespace) for 12 months.
// The admin reads them in Admin → Messages (/admin/api/messages, behind the admin password).
const MAX_PER_HOUR = 5;
const KEEP = 365 * 86400;
const json = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const clip = (v, n) => String(v == null ? "" : v).replace(/\u0000/g, "").trim().slice(0, n);

export async function handleContact(request, env) {
  if (request.method !== "POST") return json({ error: "Use POST." }, 405);
  if (!env.AUTH) return json({ error: "Not available." }, 503);
  if (+(request.headers.get("content-length") || 0) > 20000) return json({ error: "Too long." }, 413);
  let b;
  try { b = await request.json(); } catch (e) { return json({ error: "Invalid request." }, 400); }
  if (b.website) return json({ ok: true }); // hidden field filled in: a bot
  const message = clip(b.message, 4000);
  if (message.length < 10) return json({ error: "Message too short." }, 400);
  const ip = request.headers.get("cf-connecting-ip") || "unknown";
  const rk = "cfrate:" + ip;
  const n = +(await env.AUTH.get(rk)) || 0;
  if (n >= MAX_PER_HOUR) return json({ error: "Too many messages." }, 429);
  await env.AUTH.put(rk, String(n + 1), { expirationTtl: 3600 });
  const date = new Date().toISOString();
  const id = "msg:" + date.replace(/[-:.TZ]/g, "") + Math.random().toString(36).slice(2, 6);
  const rec = { date, name: clip(b.name, 100), reply: clip(b.reply, 150), topic: clip(b.topic, 20) || "general", message, lang: clip(b.lang, 2) || "en" };
  await env.AUTH.put(id, JSON.stringify(rec), {
    expirationTtl: KEEP,
    metadata: { date, name: rec.name.slice(0, 60), topic: rec.topic, read: false, preview: message.slice(0, 140) }
  });
  return json({ ok: true });
}

export async function handleMessages(request, env, url) {
  if (!env.AUTH) return json({ error: "Missing AUTH storage." }, 500);
  if (request.method === "GET") {
    const id = url.searchParams.get("id");
    if (id) {
      if (!/^msg:/.test(id)) return json({ error: "Not found." }, 404);
      const { value, metadata } = await env.AUTH.getWithMetadata(id, "json");
      if (!value) return json({ error: "Not found." }, 404);
      if (metadata && !metadata.read) await env.AUTH.put(id, JSON.stringify(value), { expirationTtl: KEEP, metadata: { ...metadata, read: true } });
      return json({ id, ...value, read: true });
    }
    const out = [];
    let cursor;
    do {
      const r = await env.AUTH.list({ prefix: "msg:", cursor });
      r.keys.forEach((k) => out.push({ id: k.name, ...(k.metadata || {}) }));
      cursor = r.list_complete ? null : r.cursor;
    } while (cursor && out.length < 1000);
    out.sort((a, b) => String(b.date).localeCompare(String(a.date)));
    return json({ messages: out });
  }
  if (request.method === "POST") {
    let b;
    try { b = await request.json(); } catch (e) { return json({ error: "Invalid request." }, 400); }
    const ids = (Array.isArray(b.ids) ? b.ids : [b.id]).filter((x) => /^msg:/.test(String(x)));
    for (const id of ids) {
      if (b.action === "delete") { await env.AUTH.delete(id); continue; }
      const { value, metadata } = await env.AUTH.getWithMetadata(id, "text");
      if (value) await env.AUTH.put(id, value, { expirationTtl: KEEP, metadata: { ...(metadata || {}), read: b.action === "read" } });
    }
    return json({ ok: true });
  }
  return json({ error: "Method not allowed." }, 405);
}
