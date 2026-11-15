// Live scores from around the world: GET /api/matches?date=YYYYMMDD
//
// Source: ESPN's public scoreboard feed (free, no key). It is not an official, documented API:
// if it changes, only `fetchLeague` and `normalize` below need updating, or swap in another
// provider (e.g. API-Football) behind the same output format.
//
// Output: { date, updated, leagues: [{ id, name, short, region, country, logo,
//           matches: [{ id, start, state: "pre"|"in"|"post", clock, detail, venue,
//                       home: { name, short, logo, score, winner }, away: {...} }] }] }

// [ESPN league code, region, country] — at most ~45 (Cloudflare allows 50 fetches per request).
export const LEAGUES = [
  ["mar.1", "Morocco", "Morocco"],
  ["caf.champions", "Africa", ""],
  ["caf.confed", "Africa", ""],
  ["caf.nations", "Africa", ""],
  ["fifa.worldq.caf", "Africa", ""],
  ["egy.1", "Africa", "Egypt"],
  ["rsa.1", "Africa", "South Africa"],
  ["uefa.champions", "Europe", ""],
  ["uefa.europa", "Europe", ""],
  ["uefa.europa.conf", "Europe", ""],
  ["uefa.nations", "Europe", ""],
  ["fifa.worldq.uefa", "Europe", ""],
  ["eng.1", "Europe", "England"],
  ["eng.2", "Europe", "England"],
  ["eng.fa", "Europe", "England"],
  ["eng.league_cup", "Europe", "England"],
  ["esp.1", "Europe", "Spain"],
  ["esp.copa_del_rey", "Europe", "Spain"],
  ["ita.1", "Europe", "Italy"],
  ["ita.coppa_italia", "Europe", "Italy"],
  ["ger.1", "Europe", "Germany"],
  ["ger.dfb_pokal", "Europe", "Germany"],
  ["fra.1", "Europe", "France"],
  ["fra.coupe_de_france", "Europe", "France"],
  ["por.1", "Europe", "Portugal"],
  ["ned.1", "Europe", "Netherlands"],
  ["bel.1", "Europe", "Belgium"],
  ["tur.1", "Europe", "Turkey"],
  ["sco.1", "Europe", "Scotland"],
  ["ksa.1", "Middle East", "Saudi Arabia"],
  ["afc.champions", "Middle East", ""],
  ["usa.1", "Americas", "USA"],
  ["mex.1", "Americas", "Mexico"],
  ["bra.1", "Americas", "Brazil"],
  ["arg.1", "Americas", "Argentina"],
  ["conmebol.libertadores", "Americas", ""],
  ["concacaf.champions", "Americas", ""],
  ["fifa.world", "International", ""],
  ["fifa.friendly", "International", ""],
  ["fifa.cwc", "International", ""]
];

const BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/";

const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
function dayRange(date) {
  // the requested day plus one day either side, so every time zone gets its full local day
  const d = new Date(Date.UTC(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8)));
  const before = new Date(d - 864e5), after = new Date(+d + 864e5);
  return `${ymd(before)}-${ymd(after)}`;
}

const logoOf = (x) => (x && (x.logo || (x.logos && x.logos[0] && x.logos[0].href))) || "";

function side(c) {
  if (!c) return { name: "TBD", short: "TBD", logo: "", score: null, winner: false };
  const t = c.team || {};
  const score = c.score == null || c.score === "" ? null : typeof c.score === "object" ? c.score.displayValue : String(c.score);
  return { name: t.displayName || t.name || "TBD", short: t.shortDisplayName || t.abbreviation || t.displayName || "", logo: logoOf(t), score, winner: !!c.winner };
}

export function normalize(json, [code, region, country]) {
  const lg = (json.leagues && json.leagues[0]) || {};
  const matches = (json.events || []).map((e) => {
    const comp = (e.competitions && e.competitions[0]) || {};
    const st = comp.status || e.status || {};
    const type = st.type || {};
    const cs = comp.competitors || [];
    const home = cs.find((c) => c.homeAway === "home") || cs[0];
    const away = cs.find((c) => c.homeAway === "away") || cs[1];
    let state = type.state === "in" ? "in" : type.state === "post" ? "post" : "pre";
    const name = type.name || "";
    if (/POSTPONED|CANCELED|CANCELLED|SUSPENDED|ABANDONED/.test(name)) state = "off";
    return {
      id: String(e.id),
      start: e.date || comp.date,
      state,
      clock: st.displayClock || "",
      detail: type.shortDetail || type.detail || type.description || "",
      halftime: /HALFTIME/.test(name),
      venue: (comp.venue && comp.venue.fullName) || "",
      home: side(home),
      away: side(away)
    };
  }).filter((m) => m.start);
  return {
    id: code,
    name: lg.name || code,
    short: lg.abbreviation || "",
    region,
    country,
    logo: logoOf(lg),
    matches
  };
}

async function fetchLeague(league, range) {
  try {
    const r = await fetch(`${BASE}${league[0]}/scoreboard?dates=${range}&limit=200`, {
      headers: { accept: "application/json", "user-agent": "KoraPulse/1.0 (+football news site)" },
      signal: AbortSignal.timeout(6000),
      cf: { cacheTtl: 20, cacheEverything: true }
    });
    if (!r.ok) return null;
    const out = normalize(await r.json(), league);
    return out.matches.length ? out : null;
  } catch (e) {
    return null;
  }
}

export async function handleMatches(request, ctx) {
  const url = new URL(request.url);
  const today = ymd(new Date());
  let date = (url.searchParams.get("date") || today).replace(/-/g, "");
  if (!/^\d{8}$/.test(date)) return Response.json({ error: "date must be YYYYMMDD" }, { status: 400 });

  // one cached answer per day for everyone: 30 s around today, longer for other days
  const diff = Math.abs(Date.UTC(+date.slice(0, 4), +date.slice(4, 6) - 1, +date.slice(6, 8)) - Date.UTC(+today.slice(0, 4), +today.slice(4, 6) - 1, +today.slice(6, 8))) / 864e5;
  const ttl = diff <= 1 ? 30 : 900;
  const cacheKey = new Request(`${url.origin}/api/matches?date=${date}`);
  const cache = caches.default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const range = dayRange(date);
  const results = await Promise.all(LEAGUES.map((l) => fetchLeague(l, range)));
  const leagues = results.filter(Boolean);
  const body = { date, updated: new Date().toISOString(), source: "ESPN", leagues };
  const res = new Response(JSON.stringify(body), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${Math.min(ttl, 60)}`,
      "access-control-allow-origin": "*"
    }
  });
  // don't keep an empty answer long (the source may have been briefly down)
  if (leagues.length || diff > 1) {
    const toCache = res.clone();
    toCache.headers.set("cache-control", `public, max-age=${leagues.length ? ttl : 15}`);
    ctx.waitUntil(cache.put(cacheKey, toCache));
  }
  return res;
}
