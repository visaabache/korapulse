// SEO for KoraPulse: titles, descriptions, canonical and hreflang links, structured data
// (schema.org), server-side content for search engines, sitemap.xml and robots.txt.
// The pages are built in the browser; the Worker adds all of this to the HTML it sends.

export const SITE = "https://korapulse.space"; // the official address (canonical URLs)
const LANGS = ["en", "fr", "ar"];
const LOCALE = { en: "en_GB", fr: "fr_FR", ar: "ar_MA" };

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const plain = (s) => String(s || "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*#>]/g, "").replace(/\s+/g, " ").trim();
const cut = (s, n) => { s = plain(s); return s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : s; };
const jsonld = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;

// Home page titles and descriptions, written for the searches people make
const HOME = {
  en: { title: "KoraPulse | Football News: Morocco, Botola Pro, Atlas Lions & Live Scores", desc: "Moroccan and African football news: Atlas Lions, Botola Pro, AFCON, CAF Champions League, transfers and live scores from around the world, in English, French and Arabic." },
  fr: { title: "KoraPulse | Actu foot : Maroc, Botola Pro, Lions de l'Atlas et scores en direct", desc: "L'actualité du football marocain et africain : Lions de l'Atlas, Botola Pro, CAN, Ligue des champions CAF, mercato et scores en direct du monde entier." },
  ar: { title: "كورابولس | أخبار كرة القدم المغربية: البطولة الاحترافية وأسود الأطلس والنتائج المباشرة", desc: "أخبار كرة القدم المغربية والإفريقية: أسود الأطلس، البطولة الاحترافية، كأس أمم إفريقيا، دوري أبطال إفريقيا، الانتقالات والنتائج المباشرة من كل أنحاء العالم." }
};
const LIVE = {
  en: { title: "Live Football Scores Today: Botola Pro, AFCON, Champions League | KoraPulse", desc: "Live football scores, results and fixtures from around the world: Botola Pro, Atlas Lions, CAF, Champions League, Premier League, LaLiga and more. Updated automatically." },
  fr: { title: "Scores foot en direct aujourd'hui : Botola Pro, CAN, Ligue des champions | KoraPulse", desc: "Scores, résultats et programme du football du monde entier : Botola Pro, Lions de l'Atlas, CAF, Ligue des champions, Premier League, LaLiga et plus. Mise à jour automatique." },
  ar: { title: "نتائج مباريات اليوم مباشرة: البطولة الاحترافية وأمم إفريقيا ودوري الأبطال | كورابولس", desc: "نتائج ومواعيد مباريات كرة القدم مباشرة من كل أنحاء العالم: البطولة الاحترافية، أسود الأطلس، إفريقيا، دوري الأبطال، الدوري الإنجليزي والإسباني وغيرها." }
};
const CATDESC = {
  en: (n) => `Latest ${n} news, results and analysis on KoraPulse, in English, French and Arabic.`,
  fr: (n) => `Les dernières actualités ${n} : infos, résultats et analyses sur KoraPulse.`,
  ar: (n) => `آخر أخبار ${n}: الأخبار والنتائج والتحليلات على كورابولس.`
};
const NAME = { en: "KoraPulse", fr: "KoraPulse", ar: "كورابولس" };
const HOMEWORD = { en: "Home", fr: "Accueil", ar: "الرئيسية" };

const tr = (obj, f, lang) => (obj && obj.tr && obj.tr[lang] && obj.tr[lang][f]) || (obj ? obj[f] : "");
const withLang = (path, lang) => SITE + path + (lang === "en" ? "" : (path.includes("?") ? "&" : "?") + "lang=" + lang);
// full date-time in Moroccan time (articles store "YYYY-MM-DD" and "YYYY-MM-DDTHH:MM:SS")
const MA = "+01:00";
const isoOf = (v) => { v = String(v || ""); return /T\d\d:\d\d/.test(v) ? (/[Z+-]\d\d:?\d\d$|Z$/.test(v.slice(10)) ? v : v.slice(0, 19) + MA) : v ? v.slice(0, 10) + "T08:00:00" + MA : ""; };
export const published = (a) => isoOf(a.published || (a.modified && String(a.modified).startsWith(a.date) ? a.modified : a.date));
export const modified = (a) => { const p = published(a), m = isoOf(a.modified || a.date); return m > p ? m : p; };
const isLive = (a) => (a.status || "publish") === "publish";
// languages an article or page really exists in (English is the original)
const langsOf = (o) => LANGS.filter((l) => l === "en" || (o && o.tr && o.tr[l] && o.tr[l].title));

// up to 6 other articles: same section first, then the newest
const related = (articles, a, lang) => { const ok = articles.filter((x) => x.id !== a.id && langsOf(x).includes(lang)); return [...ok.filter((x) => x.cat === a.cat), ...ok.filter((x) => x.cat !== a.cat)].slice(0, 6); };

// Describe the page being served: title, description, canonical path, structured data, crawlable body
export function describe(data, url, extra = {}) {
  const site = data.site || {};
  const lang = LANGS.includes(url.searchParams.get("lang")) ? url.searchParams.get("lang") : "en";
  const path = url.pathname.replace(/\.html$/, "").replace(/^\/index$/, "/");
  const articles = (data.articles || []).filter(isLive).sort((x, y) => String(y.date).localeCompare(String(x.date)));
  const cats = data.categories || [];
  const catName = (slug) => tr(cats.find((c) => c.slug === slug) || { name: slug }, "name", lang);
  const author = (name) => { const u = (data.users || []).find((x) => x.name === name); return (u && u.tr && u.tr[lang]) || name || NAME[lang]; };
  const out = { lang, langs: LANGS, robots: "index, follow, max-image-preview:large, max-snippet:-1", ld: [], body: "" };
  const crumbs = [[HOMEWORD[lang], withLang("/", lang)]];
  const org = { "@type": "NewsMediaOrganization", "@id": SITE + "/#org", name: "KoraPulse", alternateName: "كورابولس", url: SITE + "/", logo: { "@type": "ImageObject", url: SITE + "/icon-512.png", width: 512, height: 512 },
    sameAs: Object.values(site.social || {}).filter((v) => /^https?:/.test(v || "")) };

  if (path === "/article") {
    const a = articles.find((x) => x.id === url.searchParams.get("id"));
    if (!a) { out.robots = "noindex, follow"; out.title = NAME[lang]; out.desc = HOME[lang].desc; out.path = "/"; return out; }
    const title = tr(a, "title", lang), excerpt = tr(a, "excerpt", lang), body = tr(a, "body", lang) || [];
    out.title = `${title} | ${NAME[lang]}`;
    out.desc = cut(excerpt || body[0], 160);
    out.path = `/article?id=${encodeURIComponent(a.id)}`;
    out.type = "article";
    out.article = a;
    out.langs = langsOf(a);
    if (!out.langs.includes(lang)) { out.robots = "noindex, follow"; out.canonicalLang = "en"; }
    out.section = catName(a.cat);
    crumbs.push([out.section, withLang(`/category?c=${a.cat}`, lang)], [title, withLang(out.path, lang)]);
    out.ld.push({ "@context": "https://schema.org", "@type": "NewsArticle", headline: cut(title, 110), description: out.desc, inLanguage: lang,
      datePublished: published(a), dateModified: modified(a), articleSection: out.section, keywords: [out.section, ...(a.tags || [])].join(", "),
      wordCount: body.join(" ").split(/\s+/).filter(Boolean).length, isAccessibleForFree: true, copyrightYear: +String(a.date).slice(0, 4), copyrightHolder: { "@id": SITE + "/#org" },
      mainEntityOfPage: withLang(out.path, lang), author: { "@type": "Organization", name: author(a.author), url: withLang("/page?p=about", lang) }, publisher: org, image: "__IMAGE__" });
    out.body = `<article><p class="ssr-crumbs"><a href="${withLang("/", lang)}">${esc(HOMEWORD[lang])}</a> › <a href="${withLang(`/category?c=${a.cat}`, lang)}">${esc(out.section)}</a></p>
      <h1>${esc(title)}</h1><p><strong>${esc(plain(excerpt))}</strong></p><p>${esc(author(a.author))} · <time datetime="${esc(published(a))}">${esc(longDate(String(a.date).slice(0, 10), lang))}</time></p>
      ${body.map((p) => (p.startsWith("## ") ? `<h2>${esc(plain(p))}</h2>` : /^!\[/.test(p) ? "" : `<p>${esc(plain(p))}</p>`)).join("")}</article>
      <aside><h2>${esc({ en: "Read also", fr: "À lire aussi", ar: "اقرأ أيضا" }[lang])}</h2><ul>${related(articles, a, lang).map((x) => `<li><a href="${withLang(`/article?id=${encodeURIComponent(x.id)}`, lang)}">${esc(tr(x, "title", lang))}</a></li>`).join("")}
      <li><a href="${withLang("/matches", lang)}">${esc(RT[lang].todayT(longDate(moroccoDay(), lang, false)))}</a></li></ul></aside>`;
  } else if (path === "/category") {
    const q = (url.searchParams.get("q") || "").trim();
    const slug = url.searchParams.get("c");
    const c = cats.find((x) => x.slug === slug);
    if (q || !c || !articles.some((a) => a.cat === c.slug)) { out.robots = "noindex, follow"; }
    const name = c ? catName(c.slug) : NAME[lang];
    const tag = url.searchParams.get("t");
    if (tag) out.robots = "noindex, follow"; // sub-section filters: index the main category only
    out.title = c ? `${name}: ${{ en: "news, results and analysis", fr: "actualités, résultats et analyses", ar: "الأخبار والنتائج والتحليلات" }[lang]} | ${NAME[lang]}` : `${NAME[lang]}`;
    out.desc = c ? CATDESC[lang](name) : HOME[lang].desc;
    out.path = c ? `/category?c=${c.slug}` : "/";
    if (c) crumbs.push([name, withLang(out.path, lang)]);
    const list = c ? articles.filter((a) => a.cat === c.slug) : [];
    out.body = `<h1>${esc(name)}</h1><ul>${list.map((a) => `<li><a href="${withLang(`/article?id=${encodeURIComponent(a.id)}`, lang)}">${esc(tr(a, "title", lang))}</a> — ${esc(cut(tr(a, "excerpt", lang), 140))}</li>`).join("")}</ul>`;
    if (c) out.ld.push({ "@context": "https://schema.org", "@type": "CollectionPage", name, description: out.desc, url: withLang(out.path, lang), inLanguage: lang, isPartOf: { "@id": SITE + "/#website" } });
  } else if (path === "/matches") {
    results(out, url, lang, extra.matches, crumbs);
  } else if (path === "/page") {
    const p = (data.pages || []).find((x) => x.slug === url.searchParams.get("p") && x.status !== "draft");
    if (!p) { out.robots = "noindex, follow"; out.title = NAME[lang]; out.desc = HOME[lang].desc; out.path = "/"; return out; }
    const title = tr(p, "title", lang), body = tr(p, "body", lang) || [];
    out.title = `${title} | ${NAME[lang]}`;
    out.desc = cut(body[0] || HOME[lang].desc, 160);
    out.path = `/page?p=${p.slug}`;
    out.langs = langsOf(p);
    if (!out.langs.includes(lang)) { out.robots = "noindex, follow"; out.canonicalLang = "en"; }
    if (p.status === "soon") out.robots = "noindex, follow";
    crumbs.push([title, withLang(out.path, lang)]);
    out.body = `<h1>${esc(title)}</h1>${body.map((x) => (x.startsWith("## ") ? `<h2>${esc(plain(x))}</h2>` : `<p>${esc(plain(x))}</p>`)).join("")}`;
    if (p.slug === "about") out.ld.push({ "@context": "https://schema.org", "@type": "AboutPage", name: title, url: withLang(out.path, lang), about: { "@id": SITE + "/#org" } });
    if (p.slug === "contact") out.ld.push({ "@context": "https://schema.org", "@type": "ContactPage", name: title, url: withLang(out.path, lang) });
  } else {
    out.title = HOME[lang].title; out.desc = HOME[lang].desc; out.path = "/";
    out.ld.push({ "@context": "https://schema.org", ...org });
    out.ld.push({ "@context": "https://schema.org", "@type": "WebSite", "@id": SITE + "/#website", name: "KoraPulse", alternateName: ["كورابولس", "Kora Pulse"], url: SITE + "/",
      inLanguage: LANGS, publisher: { "@id": SITE + "/#org" },
      potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: SITE + "/category?q={search_term_string}" }, "query-input": "required name=search_term_string" } });
    out.body = `<h1>${esc(HOME[lang].title.split("|")[1] ? NAME[lang] + " — " + HOME[lang].title.split("|")[1].trim() : NAME[lang])}</h1><p>${esc(HOME[lang].desc)}</p>
      <h2>${esc({ en: "Latest news", fr: "Dernières actualités", ar: "آخر الأخبار" }[lang])}</h2>
      <ul>${articles.slice(0, 20).map((a) => `<li><a href="${withLang(`/article?id=${encodeURIComponent(a.id)}`, lang)}">${esc(tr(a, "title", lang))}</a></li>`).join("")}</ul>
      <h2>${esc({ en: "Sections", fr: "Rubriques", ar: "الأقسام" }[lang])}</h2>
      <ul>${cats.map((c) => `<li><a href="${withLang(`/category?c=${c.slug}`, lang)}">${esc(tr(c, "name", lang))}</a></li>`).join("")}<li><a href="${withLang("/matches", lang)}">${esc({ en: "Live scores", fr: "Scores en direct", ar: "النتائج المباشرة" }[lang])}</a></li></ul>
      <h2>${esc({ en: "Football results", fr: "Résultats foot", ar: "نتائج المباريات" }[lang])}</h2>
      <ul><li><a href="${withLang("/matches", lang)}">${esc(RT[lang].todayT(longDate(moroccoDay(), lang, false)))}</a></li><li><a href="${withLang(`/matches?date=${shiftDay(moroccoDay(), -1)}`, lang)}">${esc(RT[lang].yestT(longDate(shiftDay(moroccoDay(), -1), lang)))}</a></li></ul>`;
  }
  if (url.searchParams.get("preview") === "1") out.robots = "noindex, nofollow";
  if (crumbs.length > 1) out.ld.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) });
  return out;
}

// ---------- football results pages (/matches and /matches?date=YYYY-MM-DD) ----------
export const TZ = "Africa/Casablanca"; // days and times in Moroccan time
export const moroccoDay = (d = new Date()) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(d);
const dayDiff = (a, b) => Math.round((Date.parse(a + "T12:00:00Z") - Date.parse(b + "T12:00:00Z")) / 864e5);
const shiftDay = (day, n) => new Date(Date.parse(day + "T12:00:00Z") + n * 864e5).toISOString().slice(0, 10);
const LOC = { en: "en-GB", fr: "fr-FR", ar: "ar-MA-u-nu-latn" };
const longDate = (day, lang, weekday = true) => new Intl.DateTimeFormat(LOC[lang], { ...(weekday ? { weekday: "long" } : {}), day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(day + "T12:00:00Z"));
const hhmm = (iso) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ }).format(new Date(iso));
// the day requested on the results page, or null for "today"
export function resultsDay(url) {
  const d = url.searchParams.get("date") || "";
  return /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(Date.parse(d + "T12:00:00Z")) ? d : null;
}
const RT = {
  en: { todayT: (d) => `Today's Football Results & Live Scores (${d})`, yestT: (d) => `Yesterday's Football Results (${d}): All Scores`, pastT: (d) => `Football Results ${d}: All Scores`, futT: (d) => `Football Fixtures ${d}: Match Times`,
    desc: (d, list, n) => `Football results and fixtures for ${d}${list ? ": " + list : ""}${n > 0 ? ` and ${n} more ${n === 1 ? "match" : "matches"}` : ""}. Botola Pro, Atlas Lions, CAF, Champions League, Premier League, LaLiga and more.`,
    empty: (d) => `Football results and fixtures for ${d}: Botola Pro, Atlas Lions, CAF, Champions League, Premier League, LaLiga and more.`,
    ft: "Full time", live: "Live", off: "Postponed", ht: "Half-time", times: "Times in Moroccan time.", prev: "Previous day's results", next: "Next day's fixtures", today: "Today's results", crumb: "Live scores", none: "No matches found for this day." },
  fr: { todayT: (d) => `Résultats foot du jour et scores en direct (${d})`, yestT: (d) => `Résultats foot d'hier (${d}) : tous les scores`, pastT: (d) => `Résultats foot du ${d} : tous les scores`, futT: (d) => `Programme foot du ${d} : horaires des matchs`,
    desc: (d, list, n) => `Résultats et programme du football du ${d}${list ? " : " + list : ""}${n > 0 ? (n === 1 ? " et 1 autre match" : ` et ${n} autres matchs`) : ""}. Botola Pro, Lions de l'Atlas, CAF, Ligue des champions, Premier League, LaLiga et plus.`,
    empty: (d) => `Résultats et programme du football du ${d} : Botola Pro, Lions de l'Atlas, CAF, Ligue des champions, Premier League, LaLiga et plus.`,
    ft: "Terminé", live: "En direct", off: "Reporté", ht: "Mi-temps", times: "Horaires à l'heure marocaine.", prev: "Résultats de la veille", next: "Programme du lendemain", today: "Résultats du jour", crumb: "Scores en direct", none: "Aucun match trouvé pour ce jour." },
  ar: { todayT: (d) => `نتائج مباريات اليوم مباشرة (${d})`, yestT: (d) => `نتائج مباريات الأمس (${d}): كل النتائج`, pastT: (d) => `نتائج مباريات ${d}: كل النتائج`, futT: (d) => `مواعيد مباريات ${d}`,
    desc: (d, list, n) => `نتائج ومواعيد مباريات كرة القدم ليوم ${d}${list ? ": " + list : ""}${n > 0 ? ` و${n} مباراة أخرى` : ""}. البطولة الاحترافية، أسود الأطلس، إفريقيا، دوري الأبطال، الدوري الإنجليزي والإسباني وغيرها.`,
    empty: (d) => `نتائج ومواعيد مباريات كرة القدم ليوم ${d}: البطولة الاحترافية، أسود الأطلس، إفريقيا، دوري الأبطال، الدوري الإنجليزي والإسباني وغيرها.`,
    ft: "انتهت", live: "مباشر", off: "تأجلت", ht: "بين الشوطين", times: "التوقيت بتوقيت المغرب.", prev: "نتائج اليوم السابق", next: "مواعيد اليوم التالي", today: "نتائج اليوم", crumb: "النتائج المباشرة", none: "لا توجد مباريات في هذا اليوم." }
};

function results(out, url, lang, md, crumbs) {
  const R = RT[lang];
  const today = moroccoDay();
  const asked = resultsDay(url);
  const day = asked || today;
  const diff = dayDiff(day, today);
  out.path = day === today ? "/matches" : `/matches?date=${day}`;
  out.day = day;
  const d = longDate(day, lang);
  const head = diff === 0 ? R.todayT(longDate(day, lang, false)) : diff === -1 ? R.yestT(d) : diff < 0 ? R.pastT(d) : R.futT(d);
  out.title = `${head} | ${NAME[lang]}`;
  // index today, the last 60 days and the next 7; other days only if they are linked
  if (asked && (diff < -60 || diff > 7)) out.robots = "noindex, follow";
  crumbs.push([R.crumb, withLang("/matches", lang)]);
  if (day !== today) crumbs.push([d, withLang(out.path, lang)]);

  // matches of that day (Moroccan time), Moroccan and African football first
  const leagues = ((md && md.leagues) || []).map((l) => ({ ...l, matches: (l.matches || []).filter((m) => m.start && (md.dayFiltered || moroccoDay(new Date(m.start)) === day)).sort((a, b) => a.start.localeCompare(b.start)) })).filter((l) => l.matches.length);
  const all = leagues.flatMap((l) => l.matches.map((m) => ({ m, l })));
  const score = (m) => (m.home.score != null && m.away.score != null && m.state !== "pre" ? `${m.home.score}-${m.away.score}` : null);
  const line = ({ m }) => (score(m) ? `${m.home.name} ${score(m)} ${m.away.name}` : `${m.home.name} - ${m.away.name}`);
  const shown = [...all.filter(({ m }) => m.state === "post" || m.state === "in"), ...all.filter(({ m }) => m.state === "pre")].slice(0, 3);
  out.desc = all.length ? cut(R.desc(d, shown.map(line).join(", "), all.length - shown.length), 300) : R.empty(d);
  if (asked && md && !all.length) out.robots = "noindex, follow";

  const status = (m) => m.state === "post" ? R.ft : m.state === "in" ? (m.halftime ? R.ht : `${R.live}${m.clock ? " " + m.clock : ""}`) : m.state === "off" ? R.off : hhmm(m.start);
  const link = (dd, label) => `<a href="${esc(withLang(dd === today ? "/matches" : `/matches?date=${dd}`, lang))}">${esc(label)}</a>`;
  const nav = `<p class="ssr-days">${link(shiftDay(day, -1), R.prev)} · ${day !== today ? link(today, R.today) + " · " : ""}${link(shiftDay(day, 1), R.next)}</p>`;
  out.body = `<h1>${esc(head)}</h1><p>${esc(out.desc)} ${esc(R.times)}</p>${nav}
    ${all.length ? leagues.map((l) => `<section><h2>${esc(l.name)}${l.country ? ` (${esc(l.country)})` : ""}</h2><ul>${l.matches.map((m) => `<li><time datetime="${esc(m.start)}">${esc(hhmm(m.start))}</time> ${esc(m.home.name)} ${score(m) ? `<strong>${esc(m.home.score)} - ${esc(m.away.score)}</strong>` : "-"} ${esc(m.away.name)} · ${esc(status(m))}${m.venue ? ` · ${esc(m.venue)}` : ""}</li>`).join("")}</ul></section>`).join("") : `<p>${esc(R.none)}</p>`}${nav}`;

  // structured data: the day's matches as sports events
  if (all.length) out.ld.push({ "@context": "https://schema.org", "@type": "ItemList", name: head, url: withLang(out.path, lang), numberOfItems: Math.min(all.length, 60),
    itemListElement: all.slice(0, 60).map(({ m, l }, i) => ({ "@type": "ListItem", position: i + 1, item: {
      "@type": "SportsEvent", name: `${m.home.name} vs ${m.away.name}`, sport: "Soccer", startDate: m.start,
      eventStatus: m.state === "off" ? "https://schema.org/EventPostponed" : "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      ...(m.venue ? { location: { "@type": "Place", name: m.venue } } : {}),
      superEvent: { "@type": "SportsEvent", name: l.name },
      homeTeam: { "@type": "SportsTeam", name: m.home.name }, awayTeam: { "@type": "SportsTeam", name: m.away.name },
      competitor: [{ "@type": "SportsTeam", name: m.home.name }, { "@type": "SportsTeam", name: m.away.name }],
      ...(score(m) ? { description: `${m.home.name} ${score(m)} ${m.away.name}${m.state === "post" ? " (" + RT.en.ft + ")" : ""}` } : {})
    } })) });
}

// <head> tags: description, robots, canonical, hreflang, Open Graph, Twitter card, JSON-LD
export function headTags(d, image, hasPhoto) {
  const canonical = withLang(d.path, d.canonicalLang || d.lang);
  const alt = d.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(withLang(d.path, l))}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${esc(withLang(d.path, "en"))}">`;
  const a = d.article;
  const ld = d.ld.map((o) => (o.image === "__IMAGE__" ? { ...o, image: [image] } : o));
  return `
    <meta name="description" content="${esc(d.desc)}">
    <meta name="robots" content="${d.robots}">
    <link rel="canonical" href="${esc(canonical)}">${d.robots.startsWith("index") ? alt : ""}
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="alternate" type="application/rss+xml" title="${esc(NAME[d.lang])} RSS" href="${SITE}/feed.xml${d.lang === "en" ? "" : "?lang=" + d.lang}">
    <meta property="og:site_name" content="KoraPulse">
    <meta property="og:locale" content="${LOCALE[d.lang]}">${LANGS.filter((l) => l !== d.lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALE[l]}">`).join("")}
    <meta property="og:type" content="${a ? "article" : "website"}">
    <meta property="og:title" content="${esc(d.title)}">
    <meta property="og:description" content="${esc(d.desc)}">
    <meta property="og:url" content="${esc(canonical)}">
    <meta property="og:image" content="${esc(image)}">
    <meta property="og:image:alt" content="${esc(d.title)}">
    ${hasPhoto ? "" : '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'}
    ${a ? `<meta property="article:published_time" content="${esc(published(a))}"><meta property="article:modified_time" content="${esc(modified(a))}"><meta property="og:updated_time" content="${esc(modified(a))}"><meta property="article:section" content="${esc(d.section)}">` : ""}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(d.title)}">
    <meta name="twitter:description" content="${esc(d.desc)}">
    <meta name="twitter:image" content="${esc(image)}">
    ${ld.map(jsonld).join("")}`;
}

// Server-rendered content inside <main>, for search engines and readers without JavaScript.
// The browser replaces it with the full page as soon as the scripts run.
export const bodyHtml = (d) => `<div class="ssr" dir="${d.lang === "ar" ? "rtl" : "ltr"}">${d.body}</div>`;

export function sitemap(data) {
  const urls = [];
  const add = (path, lastmod, priority, freq, langs = LANGS) => urls.push({ path, lastmod, priority, freq, langs });
  const today = new Date().toISOString().slice(0, 10);
  const arts = (data.articles || []).filter(isLive);
  const latest = arts.map((a) => a.modified || a.date).sort().pop() || today;
  add("/", String(latest).slice(0, 10), "1.0", "hourly");
  add("/matches", today, "0.9", "always");
  // a results page for each of the last 14 days and the next 3
  const mday = moroccoDay();
  for (let i = -14; i <= 3; i++) if (i) add(`/matches?date=${shiftDay(mday, i)}`, i < 0 ? shiftDay(mday, Math.min(i + 1, 0)) : mday, i >= -2 ? "0.8" : "0.5", i < -2 ? "monthly" : "hourly");
  (data.categories || []).filter((c) => arts.some((a) => a.cat === c.slug)).forEach((c) => add(`/category?c=${c.slug}`, String(latest).slice(0, 10), "0.7", "daily"));
  arts.forEach((a) => add(`/article?id=${encodeURIComponent(a.id)}`, String(a.modified || a.date).slice(0, 10), "0.8", "weekly", langsOf(a)));
  (data.pages || []).filter((p) => p.status === "publish").forEach((p) => add(`/page?p=${p.slug}`, today, "0.3", "monthly", langsOf(p)));
  const loc = (p, l) => esc(withLang(p, l));
  const body = urls.flatMap((u) => u.langs.map((l) => `<url><loc>${loc(u.path, l)}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority>${u.langs.map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${loc(u.path, x)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${loc(u.path, "en")}"/></url>`)).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`, {
    headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" }
  });
}

export function robots(url) {
  // only the official address is indexed; other addresses (workers.dev) ask not to be crawled
  const official = url.hostname === new URL(SITE).hostname;
  const txt = official
    ? `User-agent: *\nAllow: /\nAllow: /api/matches\nDisallow: /admin/\nDisallow: /api/\nDisallow: /*?*preview=1\n\nSitemap: ${SITE}/sitemap.xml\nSitemap: ${SITE}/news-sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}

// Google News sitemap: articles from the last 2 days, in every language they exist in
export function newsSitemap(data) {
  const since = Date.now() - 2 * 864e5;
  const arts = (data.articles || []).filter(isLive).filter((a) => Date.parse(published(a)) >= since);
  const body = arts.flatMap((a) => langsOf(a).map((l) => `<url><loc>${esc(withLang(`/article?id=${encodeURIComponent(a.id)}`, l))}</loc><news:news><news:publication><news:name>KoraPulse</news:name><news:language>${l}</news:language></news:publication><news:publication_date>${published(a)}</news:publication_date><news:title>${esc(tr(a, "title", l))}</news:title></news:news></url>`)).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${body}\n</urlset>\n`, {
    headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=600" }
  });
}

// RSS feed of the latest articles: /feed.xml, /feed.xml?lang=fr, /feed.xml?lang=ar
export function rss(data, url) {
  const lang = LANGS.includes(url.searchParams.get("lang")) ? url.searchParams.get("lang") : "en";
  const cats = data.categories || [];
  const arts = (data.articles || []).filter(isLive).filter((a) => langsOf(a).includes(lang)).sort((x, y) => published(y).localeCompare(published(x))).slice(0, 30);
  const rfc = (iso) => new Date(iso).toUTCString();
  const img = (a) => { const u = a.image || ""; return u && !u.startsWith("data:") && !u.startsWith("media:") ? new URL(u, SITE).href : ""; };
  const items = arts.map((a) => { const link = withLang(`/article?id=${encodeURIComponent(a.id)}`, lang); const c = cats.find((x) => x.slug === a.cat); const im = img(a);
    return `<item><title>${esc(tr(a, "title", lang))}</title><link>${esc(link)}</link><guid isPermaLink="true">${esc(link)}</guid><pubDate>${rfc(published(a))}</pubDate>${c ? `<category>${esc(tr(c, "name", lang))}</category>` : ""}<dc:creator>${esc(NAME[lang])}</dc:creator><description>${esc(plain(tr(a, "excerpt", lang)))}</description>${im ? `<media:content url="${esc(im)}" medium="image"/>` : ""}</item>`; }).join("\n");
  const self = SITE + "/feed.xml" + (lang === "en" ? "" : "?lang=" + lang);
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel>
<title>${esc(NAME[lang])}</title><link>${esc(withLang("/", lang))}</link><description>${esc(HOME[lang].desc)}</description><language>${lang}</language>
<atom:link href="${esc(self)}" rel="self" type="application/rss+xml"/><image><url>${SITE}/icon-512.png</url><title>${esc(NAME[lang])}</title><link>${esc(withLang("/", lang))}</link></image>
${arts[0] ? `<lastBuildDate>${rfc(modified(arts[0]))}</lastBuildDate>` : ""}
${items}
</channel></rss>\n`, { headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=600" } });
}
