// IndexNow: tells Bing, Yandex, Seznam, Naver and the other IndexNow search engines about new or
// updated pages within minutes (Google does not use IndexNow; it reads the sitemaps).
// Runs in the background when the site's content changes, and once a day for the results pages.
// The key is public by design: search engines check it at https://korapulse.space/<key>.txt
import { SITE, moroccoDay } from "./seo.js";

export const INDEXNOW_KEY = "b96f4201f8818d0e0e3308467c704d0f";
const LANGS = ["en", "fr", "ar"];
const link = (path, l) => SITE + path + (l === "en" ? "" : (path.includes("?") ? "&" : "?") + "lang=" + l);
const shift = (day, n) => new Date(Date.parse(day + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
let memo = "";

export async function indexNow(env, data) {
  if (!env.AUTH) return;
  const today = moroccoDay();
  const arts = (data.articles || []).filter((a) => (a.status || "publish") === "publish");
  const sig = today + "|" + arts.map((a) => a.id + "@" + (a.modified || a.date)).join("|");
  if (memo === sig) return; // nothing changed since this server last checked
  const prev = (await env.AUTH.get("indexnow", "json")) || { sent: {}, day: "" };
  const urls = [];
  const sent = {};
  for (const a of arts) {
    const v = String(a.modified || a.date);
    sent[a.id] = v;
    if (prev.sent[a.id] === v) continue;
    const langs = LANGS.filter((l) => l === "en" || (a.tr && a.tr[l] && a.tr[l].title));
    langs.forEach((l) => urls.push(link("/article?id=" + encodeURIComponent(a.id), l)));
  }
  if (urls.length) LANGS.forEach((l) => urls.push(link("/", l)));
  if (prev.day !== today) LANGS.forEach((l) => urls.push(link("/matches", l), link("/matches?date=" + shift(today, -1), l)));
  if (urls.length) {
    const r = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: new URL(SITE).hostname, key: INDEXNOW_KEY, keyLocation: SITE + "/" + INDEXNOW_KEY + ".txt", urlList: [...new Set(urls)].slice(0, 10000) }),
      signal: AbortSignal.timeout(8000)
    });
    if (!r.ok && r.status !== 202) return; // try again on a later visit
    await env.AUTH.put("indexnow", JSON.stringify({ sent, day: today, at: new Date().toISOString(), last: urls.length }));
  }
  memo = sig;
}
