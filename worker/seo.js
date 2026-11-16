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
const isLive = (a) => (a.status || "publish") === "publish";

// Describe the page being served: title, description, canonical path, structured data, crawlable body
export function describe(data, url) {
  const site = data.site || {};
  const lang = LANGS.includes(url.searchParams.get("lang")) ? url.searchParams.get("lang") : "en";
  const path = url.pathname.replace(/\.html$/, "").replace(/^\/index$/, "/");
  const articles = (data.articles || []).filter(isLive).sort((x, y) => String(y.date).localeCompare(String(x.date)));
  const cats = data.categories || [];
  const catName = (slug) => tr(cats.find((c) => c.slug === slug) || { name: slug }, "name", lang);
  const author = (name) => { const u = (data.users || []).find((x) => x.name === name); return (u && u.tr && u.tr[lang]) || name || NAME[lang]; };
  const out = { lang, robots: "index, follow, max-image-preview:large, max-snippet:-1", ld: [], body: "" };
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
    out.section = catName(a.cat);
    crumbs.push([out.section, withLang(`/category?c=${a.cat}`, lang)], [title, withLang(out.path, lang)]);
    out.ld.push({ "@context": "https://schema.org", "@type": "NewsArticle", headline: cut(title, 110), description: out.desc, inLanguage: lang,
      datePublished: a.date, dateModified: (a.modified || a.date), articleSection: out.section, keywords: (a.tags || []).join(", ") || undefined,
      mainEntityOfPage: withLang(out.path, lang), author: { "@type": "Organization", name: author(a.author), url: SITE + "/" }, publisher: org, image: "__IMAGE__" });
    out.body = `<article><p class="ssr-crumbs"><a href="${withLang("/", lang)}">${esc(HOMEWORD[lang])}</a> › <a href="${withLang(`/category?c=${a.cat}`, lang)}">${esc(out.section)}</a></p>
      <h1>${esc(title)}</h1><p><strong>${esc(plain(excerpt))}</strong></p><p>${esc(author(a.author))} · <time datetime="${esc(a.date)}">${esc(a.date)}</time></p>
      ${body.map((p) => (p.startsWith("## ") ? `<h2>${esc(plain(p))}</h2>` : /^!\[/.test(p) ? "" : `<p>${esc(plain(p))}</p>`)).join("")}</article>`;
  } else if (path === "/category") {
    const q = (url.searchParams.get("q") || "").trim();
    const slug = url.searchParams.get("c");
    const c = cats.find((x) => x.slug === slug);
    if (q || !c) { out.robots = "noindex, follow"; }
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
    out.title = LIVE[lang].title; out.desc = LIVE[lang].desc; out.path = "/matches";
    crumbs.push([{ en: "Live scores", fr: "Scores en direct", ar: "النتائج المباشرة" }[lang], withLang(out.path, lang)]);
    out.body = `<h1>${esc(LIVE[lang].title.split("|")[0].trim())}</h1><p>${esc(LIVE[lang].desc)}</p>`;
  } else if (path === "/page") {
    const p = (data.pages || []).find((x) => x.slug === url.searchParams.get("p") && x.status !== "draft");
    if (!p) { out.robots = "noindex, follow"; out.title = NAME[lang]; out.desc = HOME[lang].desc; out.path = "/"; return out; }
    const title = tr(p, "title", lang), body = tr(p, "body", lang) || [];
    out.title = `${title} | ${NAME[lang]}`;
    out.desc = cut(body[0] || HOME[lang].desc, 160);
    out.path = `/page?p=${p.slug}`;
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
      <ul>${cats.map((c) => `<li><a href="${withLang(`/category?c=${c.slug}`, lang)}">${esc(tr(c, "name", lang))}</a></li>`).join("")}<li><a href="${withLang("/matches", lang)}">${esc({ en: "Live scores", fr: "Scores en direct", ar: "النتائج المباشرة" }[lang])}</a></li></ul>`;
  }
  if (url.searchParams.get("preview") === "1") out.robots = "noindex, nofollow";
  if (crumbs.length > 1) out.ld.push({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })) });
  return out;
}

// <head> tags: description, robots, canonical, hreflang, Open Graph, Twitter card, JSON-LD
export function headTags(d, image, hasPhoto) {
  const canonical = withLang(d.path, d.lang);
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${esc(withLang(d.path, l))}">`).join("") + `<link rel="alternate" hreflang="x-default" href="${esc(withLang(d.path, "en"))}">`;
  const a = d.article;
  const ld = d.ld.map((o) => (o.image === "__IMAGE__" ? { ...o, image: [image] } : o));
  return `
    <meta name="description" content="${esc(d.desc)}">
    <meta name="robots" content="${d.robots}">
    <link rel="canonical" href="${esc(canonical)}">${d.robots.startsWith("index") ? alt : ""}
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta property="og:site_name" content="KoraPulse">
    <meta property="og:locale" content="${LOCALE[d.lang]}">${LANGS.filter((l) => l !== d.lang).map((l) => `<meta property="og:locale:alternate" content="${LOCALE[l]}">`).join("")}
    <meta property="og:type" content="${a ? "article" : "website"}">
    <meta property="og:title" content="${esc(d.title)}">
    <meta property="og:description" content="${esc(d.desc)}">
    <meta property="og:url" content="${esc(canonical)}">
    <meta property="og:image" content="${esc(image)}">
    <meta property="og:image:alt" content="${esc(d.title)}">
    ${hasPhoto ? "" : '<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">'}
    ${a ? `<meta property="article:published_time" content="${esc(a.date)}"><meta property="article:modified_time" content="${esc(a.modified || a.date)}"><meta property="article:section" content="${esc(d.section)}">` : ""}
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
  const add = (path, lastmod, priority, freq) => urls.push({ path, lastmod, priority, freq });
  const today = new Date().toISOString().slice(0, 10);
  const arts = (data.articles || []).filter(isLive);
  const latest = arts.map((a) => a.modified || a.date).sort().pop() || today;
  add("/", String(latest).slice(0, 10), "1.0", "hourly");
  add("/matches", today, "0.9", "always");
  (data.categories || []).forEach((c) => add(`/category?c=${c.slug}`, String(latest).slice(0, 10), "0.7", "daily"));
  arts.forEach((a) => add(`/article?id=${encodeURIComponent(a.id)}`, String(a.modified || a.date).slice(0, 10), "0.8", "weekly"));
  (data.pages || []).filter((p) => p.status === "publish").forEach((p) => add(`/page?p=${p.slug}`, today, "0.3", "monthly"));
  const loc = (p, l) => esc(withLang(p, l));
  const body = urls.flatMap((u) => LANGS.map((l) => `<url><loc>${loc(u.path, l)}</loc><lastmod>${u.lastmod}</lastmod><changefreq>${u.freq}</changefreq><priority>${u.priority}</priority>${LANGS.map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${loc(u.path, x)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${loc(u.path, "en")}"/></url>`)).join("\n");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>\n`, {
    headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" }
  });
}

export function robots(url) {
  // only the official address is indexed; other addresses (workers.dev) ask not to be crawled
  const official = url.hostname === new URL(SITE).hostname;
  const txt = official
    ? `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /*?*preview=1\n\nSitemap: ${SITE}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
  return new Response(txt, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
