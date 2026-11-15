// API-Football (api-sports.io): all competitions worldwide with one request per day.
// Docs: https://www.api-football.com/documentation-v3
// The key is saved from Admin → Settings → Live scores (stored in KV, never in the repository),
// or set as the Worker secret APIFOOTBALL_KEY.
const BASE = "https://v3.football.api-sports.io";
export const SITE_TZ = "Africa/Casablanca"; // days are cut at midnight Moroccan time

const LIVE = new Set(["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"]);
const DONE = new Set(["FT", "AET", "PEN"]);
const OFF = new Set(["PST", "CANC", "ABD", "AWD", "WO"]);

// Competitions shown first (API-Football league ids), after Moroccan ones.
// AFCON, AFCON qualifiers, CAF CL, CAF Confederation Cup, World Cup, WC qualifiers (Africa, Europe,
// South America, Asia, CONCACAF), Champions League, Europa League, Conference League, Nations League,
// Euro, Copa America, Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Saudi Pro League, friendlies.
const PRIORITY = [6, 36, 12, 20, 1, 29, 32, 34, 30, 31, 2, 3, 848, 5, 4, 9, 39, 140, 135, 78, 61, 307, 10];
const REGION_ORDER = ["Morocco", "Africa", "Europe", "Middle East", "Americas", "Asia", "International"];
const AFRICA = new Set("Algeria Angola Benin Botswana Burkina-Faso Burundi Cameroon Cape-Verde-Islands Central-African-Republic Chad Comoros Congo Congo-DR Djibouti Egypt Equatorial-Guinea Eritrea Eswatini Ethiopia Gabon Gambia Ghana Guinea Guinea-Bissau Ivory-Coast Kenya Lesotho Liberia Libya Madagascar Malawi Mali Mauritania Mauritius Mozambique Namibia Niger Nigeria Rwanda Sao-Tome-and-Principe Senegal Seychelles Sierra-Leone Somalia South-Africa South-Sudan Sudan Tanzania Togo Tunisia Uganda Zambia Zimbabwe".split(" "));
const MIDEAST = new Set("Saudi-Arabia United-Arab-Emirates Qatar Kuwait Bahrain Oman Jordan Iraq Iran Syria Lebanon Palestine Yemen Israel".split(" "));
const AMERICAS = new Set("USA Mexico Canada Brazil Argentina Chile Colombia Peru Uruguay Paraguay Ecuador Bolivia Venezuela Costa-Rica Honduras Guatemala El-Salvador Panama Jamaica Nicaragua Dominican-Republic Haiti Trinidad-And-Tobago Cuba Suriname Bermuda".split(" "));
const ASIA = new Set("Japan South-Korea China India Australia Thailand Vietnam Indonesia Malaysia Singapore Uzbekistan Kazakhstan Hong-Kong Philippines Bangladesh Myanmar Cambodia Laos Nepal Tajikistan Kyrgyzstan Turkmenistan Mongolia Taiwan New-Zealand Fiji Sri-Lanka Pakistan Maldives Macao Bhutan Afghanistan".split(" "));
const regionOf = (c) => c === "Morocco" ? "Morocco" : c === "World" ? "International" : AFRICA.has(c) ? "Africa" : MIDEAST.has(c) ? "Middle East" : AMERICAS.has(c) ? "Americas" : ASIA.has(c) ? "Asia" : "Europe";

async function call(path, key) {
  const r = await fetch(BASE + path, { headers: { "x-apisports-key": key }, signal: AbortSignal.timeout(15000) });
  const remaining = r.headers.get("x-ratelimit-requests-remaining");
  const limit = r.headers.get("x-ratelimit-requests-limit");
  let json = null;
  try { json = await r.json(); } catch (e) {}
  const errs = json && json.errors && (Array.isArray(json.errors) ? json.errors : Object.values(json.errors));
  const error = !r.ok ? `API-Football answered ${r.status}` : errs && errs.length ? errs.join(" ") : null;
  return { json, error, remaining: remaining == null ? null : +remaining, limit: limit == null ? null : +limit };
}

export async function status(key) {
  const { json, error } = await call("/status", key);
  const res = json && json.response && !Array.isArray(json.response) ? json.response : null;
  return {
    ok: !error && !!res,
    error,
    plan: res && res.subscription ? res.subscription.plan : null,
    active: res && res.subscription ? res.subscription.active : null,
    end: res && res.subscription ? res.subscription.end : null,
    used: res && res.requests ? res.requests.current : null,
    limit: res && res.requests ? res.requests.limit_day : null
  };
}

export async function fetchDay(date, key) {
  const iso = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
  const { json, error, remaining, limit } = await call(`/fixtures?date=${iso}&timezone=${encodeURIComponent(SITE_TZ)}`, key);
  if (error || !json) return { error: error || "No answer from API-Football", remaining, limit };
  const byLeague = new Map();
  for (const f of json.response || []) {
    const lg = f.league || {}, fx = f.fixture || {}, st = fx.status || {}, t = f.teams || {}, g = f.goals || {};
    const short = st.short || "NS";
    const state = LIVE.has(short) ? "in" : DONE.has(short) ? "post" : OFF.has(short) ? "off" : "pre";
    const clock = st.elapsed != null ? `${st.elapsed}${st.extra ? "+" + st.extra : ""}'` : "";
    const id = "af" + lg.id;
    if (!byLeague.has(id)) {
      const country = lg.country || "";
      byLeague.set(id, { id, leagueId: lg.id, name: lg.name || "", short: "", region: regionOf(country), country: country === "World" ? "" : country.replace(/-/g, " "), logo: lg.logo || "", flag: lg.flag || "", matches: [] });
    }
    const side = (x, goals) => ({ name: (x && x.name) || "TBD", short: (x && x.name) || "TBD", logo: (x && x.logo) || "", score: goals == null ? null : String(goals), winner: !!(x && x.winner) });
    byLeague.get(id).matches.push({
      id: String(fx.id),
      start: fx.date,
      state,
      clock,
      detail: short === "PEN" ? "Pens" : short === "AET" ? "AET" : OFF.has(short) ? (st.long || short) : short,
      halftime: short === "HT",
      venue: fx.venue && fx.venue.name ? fx.venue.name : "",
      home: side(t.home, g.home),
      away: side(t.away, g.away)
    });
  }
  const rank = (l) => l.region === "Morocco" ? -1 : PRIORITY.includes(l.leagueId) ? PRIORITY.indexOf(l.leagueId) : 100 + REGION_ORDER.indexOf(l.region);
  const leagues = [...byLeague.values()].sort((a, b) => rank(a) - rank(b) || a.country.localeCompare(b.country) || a.name.localeCompare(b.name));
  leagues.forEach((l) => l.matches.sort((a, b) => a.start.localeCompare(b.start)));
  return { leagues, remaining, limit };
}
