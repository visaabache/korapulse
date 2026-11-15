/* KoraPulse — builds the shared header/footer and each page from js/data.js. */
(function () {
  const D = window.KP;
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;

  const preview = params.get("preview") === "1";
  const L = window.KP_I18N, t = L.t, lang = L.lang;
  // content in the visitor's language (falls back to the original when not translated)
  D.categories = D.categories.map((c) => ({ ...c, name: L.tr(c, "name"), subLabels: (c.tr && c.tr[lang] && c.tr[lang].subs) || c.subs }));
  const catBySlug = Object.fromEntries(D.categories.map((c) => [c.slug, c]));
  const subLabel = (slug, s) => { const c = catBySlug[slug]; const i = c ? c.subs.indexOf(s) : -1; return i >= 0 && c.subLabels[i] ? c.subLabels[i] : s; };
  D.site.tagline = L.tr(D.site, "tagline") || D.site.tagline;
  D.standings.title = L.tr(D.standings, "title") || D.standings.title;
  D.topLinks = (D.topLinks || []).map((l) => ({ ...l, label: (l.tr && l.tr[lang]) || l.label }));
  const byline = (name) => { const u = (D.users || []).find((x) => x.name === name); return (u && u.tr && u.tr[lang]) || name; };
  D.articles = D.articles.map((a) => ({ ...a, author: byline(a.author), title: L.tr(a, "title"), excerpt: L.tr(a, "excerpt"), body: L.tr(a, "body"), untranslated: !L.has(a) }));
  D.articles.forEach((a) => { a.tags = a.tags || []; if (!catBySlug[a.cat]) catBySlug[a.cat] = { slug: a.cat, name: a.cat, subs: [], subLabels: [] }; });
  const articles = D.articles.filter((a) => (a.status || "publish") === "publish").sort((a, b) => b.date.localeCompare(a.date));
  const byId = Object.fromEntries(articles.map((a) => [a.id, a]));
  // Comments are off unless switched on in Admin → Settings ("Allow comments").
  const commentsOn = !!(D.site && D.site.comments);
  const comments = D.comments || [];
  const ccount = (id) => comments.filter((c) => c.post === id && c.status === "approved").length;

  // Light formatting written in the admin editor: **bold**, *italic*, [link](url),
  // "## " headings, "> " quotes and ![caption](image) on their own line.
  const safeUrl = (u) => (/^(https?:|data:image\/|\/|\.|#|[\w-]+(\/|\.))/i.test(u) && !/^javascript:/i.test(u) ? u : "#");
  const inline = (t) => esc(t)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (m, txt, u) => { u = u.replace(/&amp;/g, "&"); return /^https?:/i.test(u) ? `<a href="${esc(safeUrl(u))}" target="_blank" rel="noopener">${txt}</a>` : `<a href="${esc(safeUrl(/lang=/.test(u) ? u : L.link(u)))}">${txt}</a>`; });
  const block = (p) => {
    const img = p.match(/^!\[(.*?)\]\((.+?)\)$/);
    if (img) return `<figure><img src="${esc(safeUrl(src(img[2])))}" alt="${esc(img[1])}" loading="lazy">${img[1] ? `<figcaption>${esc(img[1])}</figcaption>` : ""}</figure>`;
    if (p.startsWith("## ")) return `<h2>${inline(p.slice(3))}</h2>`;
    if (p.startsWith("> ")) return `<blockquote>${inline(p.slice(2))}</blockquote>`;
    return `<p>${inline(p)}</p>`;
  };

  const fmtDate = (d) => { const s = new Date(d + "T12:00:00").toLocaleDateString(L.locale, { month: "long", day: "numeric", year: "numeric" }); return lang === "ar" ? s : s.toUpperCase(); };
  const url = (a) => L.link(`article.html?id=${encodeURIComponent(a.id)}`);
  const catUrl = (slug, tag) => L.link(`category.html?c=${slug}` + (tag ? `&t=${encodeURIComponent(tag)}` : ""));
  const home = L.link("index.html"), liveUrl = L.link("matches.html");
  const pageUrl = (slug) => L.link(`page.html?p=${slug}`);
  const readTime = (a) => Math.max(1, Math.round((a.body || []).join(" ").split(/\s+/).length / 200));

  // ---------- icons ----------
  const icon = {
    search: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chat: '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    chev: '<svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>',
    up: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 15l6-6 6 6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    user: '<svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M7 10V7a5 5 0 0110 0v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1zm2 0h6V7a3 3 0 00-6 0z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    x: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.5V11H7v4h3v7h4v-7h3l1-4h-4V8.8c0-.5.3-.8 1-.8z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 002 8.2 31 31 0 001.6 12 31 31 0 002 15.8a3 3 0 002.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 002.1-2.1 31 31 0 00.4-3.8 31 31 0 00-.4-3.8zM10 15V9l5.2 3z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M16.6 3c.4 2.2 1.8 3.6 4 3.8v3.1a7.4 7.4 0 01-4-1.2V15a6 6 0 11-6-6v3.2a2.8 2.8 0 102.8 2.8V3z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M4 9h3.5v11H4zM5.8 3.5a2 2 0 110 4 2 2 0 010-4zM10 9h3.3v1.5c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.3 4.3 5.4V20h-3.5v-5.2c0-1.3 0-2.9-1.8-2.9s-2.1 1.4-2.1 2.8V20H10z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.4 5 5.1-1.3A10 10 0 1012 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2.1 1-2.4c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.3z"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>'
  };

  const logo = (cls = "") => `
    <a class="logo ${cls}" href="${home}" aria-label="${esc(D.site.name)} home">
      <svg class="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" stroke-width="5"/>
        <path d="M5 34 H19 L24 22 L31 44 L37 28 L41 34 H59" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="logo-text"><b>KORA</b><span>PULSE</span></span>
    </a>`;

  // ---------- media ----------
  const src = (u) => (u && u.startsWith("media:") ? ((D.media || []).find((m) => m.id === u.slice(6)) || {}).url || "" : u);
  const media = (a, cls = "") => `<div class="media ${cls}">${a.image && src(a.image) ? `<img src="${esc(src(a.image))}" alt="${esc(a.title)}" loading="lazy">` : window.coverArt(a)}</div>`;
  const tag = (a) => `<a class="tag" href="${catUrl(a.cat)}">${esc(catBySlug[a.cat].name)}</a>`;
  const meta = (a, opts = {}) => `
    <div class="meta">
      ${opts.noAuthor ? "" : `<span class="author">${esc(a.author)}</span>`}
      <span>${icon.clock} ${fmtDate(a.date)}</span>
      ${opts.noComments || !commentsOn ? "" : `<span>${icon.chat} ${ccount(a.id)}</span>`}
    </div>`;

  // ---------- header ----------
  function renderHeader() {
    const nav = D.categories.map((c) => `
      <li class="${c.subs.length ? "has-sub" : ""}">
        <a href="${catUrl(c.slug)}">${esc(c.name)}${c.subs.length ? icon.chev : ""}</a>
        ${c.subs.length ? `<ul class="sub">${c.subs.map((s) => `<li><a href="${catUrl(c.slug, s)}">${esc(subLabel(c.slug, s))}</a></li>`).join("")}</ul>` : ""}
      </li>`).join("");
    const liveItem = `<li><a href="${liveUrl}" class="nav-live ${page === "matches" ? "current" : ""}"><span class="dot"></span>${t("Live")}</a></li>`;
    const langs = L.SUPPORTED.map((l) => {
      const q = new URLSearchParams(location.search); q.set("lang", l);
      return `<a href="?${q}" hreflang="${l}" lang="${l}" class="${l === lang ? "on" : ""}" title="${L.names[l]}" data-lang="${l}">${L.short[l]}</a>`;
    }).join("");

    $("#site-header").innerHTML = `
      <a class="skip" href="#main">${t("Skip to content")}</a>
      <div class="topbar">
        <div class="container topbar-in">
          <a href="${liveUrl}" class="tb-live"><span class="dot"></span> ${t("Live Scores")}</a>
          <nav class="tb-links" aria-label="Featured">${D.topLinks.map((l) => `<a href="${L.link(l.href)}">${esc(l.label)}</a>`).join("")}</nav>
          <div class="tb-right"><span class="tb-date">${new Date().toLocaleDateString(L.locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</span>
          <nav class="lang-switch" aria-label="${t("Language")}">${langs}</nav></div>
        </div>
      </div>
      <header class="masthead">
        <div class="container">${logo("logo-lg")}<p class="tagline">${esc(D.site.tagline)}</p></div>
      </header>
      <div class="navbar" id="navbar">
        <div class="container navbar-in">
          <button class="icon-btn menu-btn" aria-label="${t("Open menu")}" aria-expanded="false" aria-controls="mainmenu">${icon.menu}</button>
          ${logo("logo-sm")}
          <nav aria-label="Main"><ul class="menu" id="mainmenu">${liveItem}${nav}</ul></nav>
          <div class="nav-tools">
            <button class="theme-toggle" aria-label="${t("Toggle dark mode")}"><span class="knob"></span></button>
            <button class="icon-btn search-btn" aria-label="${t("Search")}">${icon.search}</button>
          </div>
        </div>
        <div class="ticker" id="scores" aria-label="${t("Live scores")}" ${D.scores.length ? "" : "hidden"}>
          <a class="ticker-label" href="${liveUrl}">${t("SCORES")}</a>
          <div class="ticker-track"><div class="ticker-row">${tickerItems()}${tickerItems(true)}</div></div>
        </div>
      </div>
      <div class="search-overlay" hidden>
        <form class="search-box" action="category.html" role="search">
          ${lang !== "en" ? `<input type="hidden" name="lang" value="${lang}">` : ""}
          <input type="search" name="q" placeholder="${t("Search players, clubs, competitions…")}" aria-label="${t("Search")}" autocomplete="off">
          <button type="submit" class="icon-btn">${icon.search}</button>
          <button type="button" class="icon-btn search-close" aria-label="${t("Close search")}">${icon.close}</button>
        </form>
      </div>`;
  }

  function tickerItems(dup, list = D.scores) {
    return list.map((m) => {
      const live = /LIVE/.test(m.status);
      const shown = live ? t("Live").toUpperCase() + m.status.slice(4) : m.status;
      const score = m.hs == null ? `<span class="ko">${esc(m.status)}</span>` : `<b>${m.hs}</b><i>-</i><b>${m.as}</b>`;
      return `<a href="${liveUrl}" class="match ${live ? "is-live" : ""}" ${dup ? 'aria-hidden="true" tabindex="-1"' : ""}>
        <span class="comp">${esc(m.comp)}</span>
        <span class="team">${esc(m.home)}</span>${score}<span class="team">${esc(m.away)}</span>
        ${m.hs != null ? `<span class="status">${esc(shown)}</span>` : ""}
      </a>`;
    }).join("");
  }

  // Ticker: live matches from around the world (Admin → Live Scores → "automatic"),
  // falling back to the matches entered in the admin if the score service is unavailable.
  const PRIORITY = ["af200", "af6", "af12", "af20", "af2", "af3", "af39", "af140", "af135", "af78", "af61", "af307", "mar.1", "caf.champions", "caf.confed", "caf.nations", "uefa.champions", "uefa.europa", "eng.1", "esp.1", "ita.1", "ger.1", "fra.1", "ksa.1"];
  async function liveTicker() {
    if ((D.site && D.site.ticker) === "manual") return;
    const pad = (n) => String(n).padStart(2, "0");
    const d = new Date(), day = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    try {
      const r = await fetch(`/api/matches?date=${day}`);
      if (!r.ok) return;
      const data = await r.json();
      const rank = (id) => { const i = PRIORITY.indexOf(id); return i < 0 ? 99 : i; };
      const order = { in: 0, post: 1, pre: 2 };
      const list = [];
      data.leagues.forEach((l) => l.matches.forEach((m) => {
        const local = new Date(m.start);
        // today's matches, plus any still being played after midnight
        if ((!data.dayFiltered && `${local.getFullYear()}${pad(local.getMonth() + 1)}${pad(local.getDate())}` !== day && m.state !== "in") || m.state === "off") return;
        list.push({ m, l, k: [order[m.state] ?? 3, rank(l.id), m.start] });
      }));
      list.sort((a, b) => a.k[0] - b.k[0] || a.k[1] - b.k[1] || a.k[2].localeCompare(b.k[2]));
      const items = list.slice(0, 18).map(({ m, l }) => ({
        comp: l.short || l.name.split(" ").slice(0, 2).join(" "),
        home: m.home.short || m.home.name, away: m.away.short || m.away.name,
        hs: m.state === "pre" ? null : m.home.score, as: m.state === "pre" ? null : m.away.score,
        status: m.state === "in" ? (m.halftime ? `LIVE ${t("HT")}` : `LIVE ${m.clock}`) : m.state === "post" ? t("FT") : new Date(m.start).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })
      }));
      if (!items.length) return;
      const row = document.querySelector(".ticker-row");
      if (!row) return;
      row.innerHTML = tickerItems(false, items) + tickerItems(true, items);
      document.getElementById("scores").hidden = false;
      if (list.some((x) => x.m.state === "in")) setTimeout(liveTicker, 60000);
    } catch (e) {}
  }

  // ---------- footer ----------
  function renderFooter() {
    const s = D.site.social;
    $("#site-footer").innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div>
            <h3>${t("Useful links")}</h3>
            <ul>${[["about", "About"], ["contact", "Contact"], ["advertise", "Advertise"], ["careers", "Careers"], ["privacy", "Privacy Policy"], ["terms", "Terms of Use"]].map(([slug, x]) => `<li><a href="${pageUrl(slug)}">${t(x)}</a>${(D.pages || []).some((pg) => pg.slug === slug && pg.status === "soon") ? ` <span class="soon-badge">${t("Soon")}</span>` : ""}</li>`).join("")}</ul>
          </div>
          <div>
            <h3>${t("Topics")}</h3>
            <ul>${D.categories.slice(1, 7).map((c) => `<li><a href="${catUrl(c.slug)}">${esc(c.name)}</a></li>`).join("")}</ul>
          </div>
          <div>
            <h3>${t("Competitions")}</h3>
            <ul><li><a href="${catUrl("botola")}">${t("Botola Pro")}</a></li><li><a href="${catUrl("africa", "AFCON")}">${t("AFCON")}</a></li><li><a href="${catUrl("africa", "CAF Champions League")}">${t("CAF Champions League")}</a></li><li><a href="${catUrl("europe", "Champions League")}">${t("UEFA Champions League")}</a></li><li><a href="${catUrl("world-cup-2030")}">${t("World Cup 2030")}</a></li></ul>
          </div>
          <div class="footer-brand">
            ${logo("logo-footer")}
            <div class="socials">
              ${["instagram", "x", "linkedin", "facebook", "youtube", "tiktok"].filter((k) => s[k] && s[k] !== "#").map((k) => `<a href="${esc(s[k])}" target="_blank" rel="noopener" aria-label="${k}">${icon[k]}</a>`).join("")}
            </div>
            <p class="app-title">${t("Download our app")}</p>
            <div class="stores">
              <a href="#" class="store"><svg viewBox="0 0 24 24" width="20" height="20"><path fill="#34d27b" d="M4 3l10 9-10 9z"/><path fill="#ffcb30" d="M14 12l3-3 4 2.3c.8.5.8 1 0 1.4L17 15z"/><path fill="#ff4b5c" d="M4 21l10-9 3 3-11 6.3c-.9.5-1.6.3-2-.3z"/><path fill="#3bb7ff" d="M4 3c.4-.6 1.1-.8 2-.3L17 9l-3 3z"/></svg><span><small>${t("GET IT ON")}</small>Google Play</span></a>
              <a href="#" class="store"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6a4.5 4.5 0 00-3.5-1.9c-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.8-3.2-.8A4.8 4.8 0 004 9.7c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4a10 10 0 001.3-2.8 4.3 4.3 0 01-2.4-4.1zM14 5.4A4.4 4.4 0 0015 2a4.4 4.4 0 00-2.9 1.5A4.1 4.1 0 0011 6.8a3.7 3.7 0 003-1.4z"/></svg><span><small>${t("Download on the")}</small>App Store</span></a>
            </div>
          </div>
        </div>
        <div class="container copyright">
          <p>Copyright ${new Date().getFullYear()} <b>${esc(D.site.name)}</b>. ${t("All rights reserved.")} ${t("{name} is not responsible for the content of external sites.", { name: esc(D.site.name) })}</p>
        </div>
      </footer>
      <button class="to-top" aria-label="${t("Back to top")}">${icon.up}</button>`;
  }

  // ---------- shared blocks ----------
  const rowCard = (a) => `
    <article class="row-card">
      <a href="${url(a)}" class="row-media" tabindex="-1" aria-hidden="true">${media(a)}</a>
      <div>
        <h3 class="h-serif"><a href="${url(a)}">${esc(a.title)}</a></h3>
        ${meta(a)}
        <p class="excerpt">${esc(a.excerpt)}</p>
      </div>
    </article>`;

  const overlayCard = (a) => `
    <article class="ov-card">
      <a href="${url(a)}">
        ${media(a)}
        <span class="tag tag-abs">${esc(catBySlug[a.cat].name)}</span>
        <div class="ov-text"><h3 class="h-serif">${esc(a.title)}</h3><span class="ov-date">${icon.clock} ${fmtDate(a.date)}</span></div>
      </a>
    </article>`;

  const smallCard = (a) => `
    <article class="sm-card">
      <a href="${url(a)}" class="sm-media" tabindex="-1" aria-hidden="true">${media(a)}<span class="tag tag-abs">${esc(catBySlug[a.cat].name)}</span></a>
      <h4 class="h-serif"><a href="${url(a)}">${esc(a.title)}</a></h4>
      ${meta(a, { noComments: true, noAuthor: true })}
    </article>`;

  const ad = (size, label = t("Advertisement")) => `<div class="ad ad-${size}"><span>${label}</span><small>${size === "leader" ? "970 × 90" : size === "box" ? "300 × 250" : "728 × 90"}</small></div>`;

  function sidebar(excludeId) {
    const op = articles.filter((a) => a.cat === "opinion" && a.id !== excludeId);
    const [first, ...rest] = op;
    const popular = articles.filter((a) => a.id !== excludeId && a.cat !== "opinion").slice(0, 5);
    const follow = ["instagram", "facebook", "x", "youtube", "tiktok"].filter((k) => D.site.social && D.site.social[k] && D.site.social[k] !== "#");
    return `
      ${ad("box")}
      ${first ? `
      <section class="side-sec">
        <h2 class="sec-title"><a href="${catUrl("opinion")}">${esc(catBySlug.opinion ? catBySlug.opinion.name : t("Opinion"))}</a></h2>
        <article class="op-lead">
          <a href="${url(first)}" class="op-media" tabindex="-1" aria-hidden="true">${media(first)}<span class="tag tag-abs">${esc(catBySlug.opinion ? catBySlug.opinion.name : t("Opinion"))}</span></a>
          <h3 class="h-serif"><a href="${url(first)}">${esc(first.title)}</a></h3>
          ${meta(first, { noComments: true })}
          <p class="excerpt">${esc(first.excerpt)}</p>
          <a class="btn-outline" href="${url(first)}">${t("Read more")}</a>
        </article>
        <div class="two-col">${rest.slice(0, 2).map(smallCard).join("")}</div>
      </section>` : ""}
      <section class="side-sec">
        <h2 class="sec-title"><a href="${catUrl("botola")}">${esc(D.standings.title)}</a></h2>
        <table class="table">
          <thead><tr><th>#</th><th class="l">${lang === "ar" ? "النادي" : "Club"}</th><th>P</th><th>GD</th><th>Pts</th></tr></thead>
          <tbody>${D.standings.rows.map((r, i) => `<tr class="${i < 2 ? "top" : ""}"><td>${i + 1}</td><td class="l">${esc(r.club)}</td><td>${r.p}</td><td>${r.gd > 0 ? "+" + r.gd : r.gd}</td><td><b>${r.pts}</b></td></tr>`).join("")}</tbody>
        </table>
      </section>
      <section class="side-sec">
        <h2 class="sec-title">${t("Top stories")}</h2>
        <ol class="popular">${popular.map((a, i) => `<li><span class="num">${i + 1}</span><a href="${url(a)}">${esc(a.title)}</a></li>`).join("")}</ol>
      </section>
      ${follow.length ? `
      <section class="side-sec newsletter">
        <h2>${t("Follow {name}", { name: esc(D.site.name) })}</h2>
        <p>${t("Goals, transfers and breaking news on your favourite network.")}</p>
        <div class="follow">${follow.map((k) => `<a href="${esc(D.site.social[k])}" target="_blank" rel="noopener" aria-label="${k}">${icon[k]}</a>`).join("")}</div>
      </section>` : ""}`;
  }

  // ---------- pages ----------
  function renderHome() {
    const featured = articles.find((a) => a.featured) || articles[0];
    const latest = articles.filter((a) => a.id !== featured.id && a.cat !== "opinion").slice(0, 6);
    const sections = ["atlas-lions", "botola", "europe", "africa", "women", "transfers"].map((slug) => {
      const list = articles.filter((a) => a.cat === slug).slice(0, 3);
      if (!list.length) return "";
      return `
        <section class="cat-sec container">
          <h2 class="sec-title"><a href="${catUrl(slug)}">${esc(catBySlug[slug].name)}</a><a class="see-all" href="${catUrl(slug)}">${t("See all →")}</a></h2>
          <div class="ov-grid">${list.map(overlayCard).join("")}</div>
        </section>`;
    });
    sections.splice(2, 0, `<div class="container">${ad("banner")}</div>`);

    $("#main").innerHTML = `
      <div class="container">${ad("leader")}</div>
      <div class="container layout">
        <div class="col-main">
          <article class="featured">
            <h1 class="h-serif"><a href="${url(featured)}">${esc(featured.title)}</a></h1>
            ${meta(featured)}
            <a href="${url(featured)}" class="feat-media" tabindex="-1" aria-hidden="true">${media(featured)}<span class="tag tag-abs">${t("Headlines")}</span></a>
            <p class="excerpt">${esc(featured.excerpt)}</p>
          </article>
          <h2 class="sec-title">${t("Latest news")}</h2>
          <div class="rows">${latest.map(rowCard).join("")}</div>
        </div>
        <aside class="col-side">${sidebar()}</aside>
      </div>
      ${sections.join("")}`;
  }

  function renderArticle() {
    const a = byId[params.get("id")] || (preview && D.articles.find((x) => x.id === params.get("id"))) || articles[0];
    const approved = commentsOn ? comments.filter((c) => c.post === a.id && c.status === "approved").sort((x, y) => x.date.localeCompare(y.date)) : [];
    const cat = catBySlug[a.cat];
    document.title = `${a.title} | ${D.site.name}`;
    const related = articles.filter((x) => x.id !== a.id && x.cat === a.cat).concat(articles.filter((x) => x.id !== a.id && x.cat !== a.cat)).slice(0, 3);
    const shareUrl = `${location.origin}${location.pathname}?id=${encodeURIComponent(a.id)}${lang !== "en" ? "&lang=" + lang : ""}`;
    const share = encodeURIComponent(shareUrl), title = encodeURIComponent(a.title);
    const shareBar = (cls) => `
          <div class="share ${cls}" data-id="${esc(a.id)}">
            <span>${t("Share")}</span>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${share}" target="_blank" rel="noopener" aria-label="${t("Share on Facebook")}" class="sh-fb">${icon.facebook}</a>
            <a href="https://x.com/intent/post?url=${share}&text=${title}" target="_blank" rel="noopener" aria-label="${t("Share on X")}" class="sh-x">${icon.x}</a>
            <a href="https://wa.me/?text=${title}%20${share}" target="_blank" rel="noopener" aria-label="${t("Share on WhatsApp")}" class="sh-wa">${icon.whatsapp}</a>
            <button type="button" class="sh-ig" aria-label="${t("Share on Instagram")}">${icon.instagram}</button>
            <button type="button" class="sh-copy" aria-label="${t("Copy link")}">${icon.link}</button>
          </div>`;

    $("#main").innerHTML = `
      <div class="container">${ad("leader")}</div>
      <div class="container layout">
        <article class="col-main article">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="${home}">${t("Home")}</a> › <a href="${catUrl(a.cat)}">${esc(cat.name)}</a>${a.tags[0] ? ` › <a href="${catUrl(a.cat, a.tags[0])}">${esc(subLabel(a.cat, a.tags[0]))}</a>` : ""}</nav>
          ${tag(a)}
          <h1 class="h-serif article-title">${esc(a.title)}</h1>
          <p class="standfirst">${esc(a.excerpt)}</p>
          <div class="article-meta">
            <span class="avatar avatar-logo" aria-hidden="true"><svg viewBox="0 0 64 64" width="26" height="26"><circle cx="32" cy="32" r="27" fill="none" stroke="#fff" stroke-width="6"/><path d="M7 34 H19 L24 22 L31 44 L37 28 L41 34 H57" fill="none" stroke="#f2b705" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <div><span class="author">${t("By {author}", { author: esc(a.author) })}</span>${meta(a, { noAuthor: true })}</div>
            <span class="read">${t("{n} min read", { n: readTime(a) })}</span>
          </div>
          ${shareBar("share-top")}
          <figure class="article-media">${media(a)}${a.image && src(a.image) ? "" : `<figcaption>${t("Illustration · {cat}", { cat: esc(cat.name) })}</figcaption>`}</figure>
          ${preview && a.status !== "publish" && a.status ? `<p class="preview-note">${t("Preview: this draft is not visible to visitors.")}</p>` : ""}
          ${a.untranslated ? `<p class="preview-note">${t("Not yet translated: showing the original article.")}</p>` : ""}
          <div class="article-body" ${a.untranslated ? 'dir="auto"' : ""}>${(a.body || []).map(block).join("")}</div>
          ${a.tags.length ? `<div class="tag-list">${a.tags.map((tg) => `<a href="${catUrl(a.cat, tg)}">#${esc(subLabel(a.cat, tg))}</a>`).join("")}</div>` : ""}
          ${shareBar("")}
          ${commentsOn ? `<section class="comments-box">
            <h2 class="sec-title">${approved.length === 1 ? t("1 comment") : t("{n} comments", { n: approved.length })}</h2>
            <ol class="comment-list">${approved.map((c) => `
              <li><span class="avatar">${esc(c.name.trim()[0] || "?")}</span><div><b>${esc(c.name)}</b>${c.admin ? ' <span class="staff">KoraPulse</span>' : ""}<time>${fmtDate(c.date.slice(0, 10))}</time><p>${esc(c.text)}</p></div></li>`).join("")}</ol>
            <form class="comment-form">
              <h3>${t("Leave a comment")}</h3>
              <textarea name="text" required placeholder="${t("Join the conversation…")}" aria-label="Comment" rows="4"></textarea>
              <div class="cf-row"><input name="name" required placeholder="${t("Name *")}" aria-label="Name"><input name="email" type="email" placeholder="${t("Email (not published)")}" aria-label="Email"></div>
              <button class="btn">${t("Post comment")}</button>
            </form>
            <p class="cf-ok" hidden>${t("Thanks! Your comment is awaiting moderation.")}</p>
          </section>` : ""}
          <section>
            <h2 class="sec-title">${t("Related")}</h2>
            <div class="ov-grid">${related.map(overlayCard).join("")}</div>
          </section>
        </article>
        <aside class="col-side">${sidebar(a.id)}</aside>
      </div>`;

    const copy = async () => {
      try { await navigator.clipboard.writeText(shareUrl); return true; }
      catch (e) { prompt(t("Copy this link:"), shareUrl); return false; }
    };
    document.querySelectorAll(".sh-copy").forEach((b) => b.addEventListener("click", async () => {
      if (await copy()) toast(t("Link copied"));
    }));
    // Instagram has no web share link: use the phone's share menu (Instagram is in it),
    // otherwise copy the link to paste into a story or message.
    document.querySelectorAll(".sh-ig").forEach((b) => b.addEventListener("click", async () => {
      if (navigator.share) {
        try { await navigator.share({ title: a.title, text: a.title, url: shareUrl }); } catch (e) {}
        return;
      }
      if (await copy()) toast(t("Link copied: paste it in your Instagram story or message"));
    }));
  }

  function renderCategory() {
    const q = (params.get("q") || "").trim();
    const slug = params.get("c");
    const tg = params.get("t");
    const cat = catBySlug[slug];
    let list, heading, subs = "";

    if (q) {
      const terms = q.toLowerCase().split(/\s+/);
      list = articles.filter((a) => {
        const orig = D.articles.find((x) => x.id === a.id) || a;
        const hay = [a.title, a.excerpt, a.author, catBySlug[a.cat].name, ...(a.tags || []), ...(a.body || []), ...Object.values(orig.tr || {}).flatMap((v) => [v.title, v.excerpt, ...(v.body || [])])].join(" ").toLowerCase();
        return terms.every((w) => hay.includes(w));
      });
      heading = t("Search results for “{q}”", { q: esc(q) });
      document.title = `Search: ${q} | ${D.site.name}`;
    } else if (cat) {
      list = articles.filter((a) => a.cat === slug && (!tg || (a.tags || []).includes(tg)));
      heading = esc(tg ? `${cat.name}: ${subLabel(slug, tg)}` : cat.name);
      document.title = `${tg ? subLabel(slug, tg) : cat.name} | ${D.site.name}`;
      if (cat.subs.length) {
        subs = `<div class="chips"><a href="${catUrl(slug)}" class="${!tg ? "on" : ""}">${t("All")}</a>${cat.subs.map((s) => `<a href="${catUrl(slug, s)}" class="${tg === s ? "on" : ""}">${esc(subLabel(slug, s))}</a>`).join("")}</div>`;
      }
    } else {
      list = articles;
      heading = t("All news");
    }

    const PAGE = 6;
    let shown = PAGE;
    $("#main").innerHTML = `
      <div class="container">${ad("leader")}</div>
      <div class="container layout">
        <div class="col-main">
          <header class="cat-head">
            <nav class="crumbs" aria-label="Breadcrumb"><a href="${home}">${t("Home")}</a> › ${q ? t("Search") : esc(cat ? cat.name : t("All news"))}</nav>
            <h1 class="h-serif">${heading}</h1>
            <p class="count">${list.length === 1 ? t("1 article") : t("{n} articles", { n: list.length })}</p>
            ${subs}
          </header>
          ${q ? `<form class="inline-search" action="category.html" role="search">${lang !== "en" ? `<input type="hidden" name="lang" value="${lang}">` : ""}<input type="search" name="q" value="${esc(q)}" aria-label="${t("Search")}"><button class="btn">${t("Search")}</button></form>` : ""}
          <div class="rows" id="cat-rows"></div>
          ${list.length ? "" : `<p class="empty">${t("No articles found. Try another search or")} <a href="${home}">${t("go back to the homepage")}</a>.</p>`}
          <button class="btn btn-wide load-more" hidden>${t("Load more")}</button>
        </div>
        <aside class="col-side">${sidebar()}</aside>
      </div>`;

    const rows = $("#cat-rows"), more = $(".load-more");
    const draw = () => {
      rows.innerHTML = list.slice(0, shown).map(rowCard).join("");
      more.hidden = shown >= list.length;
    };
    more.addEventListener("click", () => { shown += PAGE; draw(); });
    draw();
  }

  // static pages (About, Contact, Privacy…), edited in Admin → Pages
  function renderPage() {
    const slug = params.get("p") || "about";
    const pg = (D.pages || []).find((x) => x.slug === slug && (x.status !== "draft" || preview));
    if (!pg) { location.replace(home); return; }
    const title = L.tr(pg, "title") || pg.title, body = L.tr(pg, "body") || pg.body || [];
    document.title = `${title} | ${D.site.name}`;
    const soon = pg.status === "soon";
    $("#main").innerHTML = `
      <div class="container layout page-layout">
        <article class="col-main static-page">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="${home}">${t("Home")}</a> › ${esc(title)}</nav>
          ${soon ? `<span class="tag soon-tag">${t("Coming soon")}</span>` : ""}
          <h1 class="h-serif article-title">${esc(title)}</h1>
          ${!L.has(pg) ? `<p class="preview-note">${t("Not yet translated: showing the original article.")}</p>` : ""}
          <div class="article-body page-body">${body.map(block).join("")}</div>
          ${slug === "contact" ? contactForm() : ""}
        </article>
        <aside class="col-side">${sidebar()}</aside>
      </div>`;
    if (slug === "contact") wireContact();
  }

  function contactForm() {
    return `
      <form class="contact-form" novalidate>
        <div class="cf-grid">
          <label>${t("Your name")}<input name="name" maxlength="100" autocomplete="name"></label>
          <label>${t("Email or phone (optional, to get a reply)")}<input name="reply" maxlength="150" autocomplete="email"></label>
        </div>
        <label>${t("Subject")}<select name="topic">
          ${[["general", "General question"], ["correction", "Correction"], ["story", "Story idea"], ["partnership", "Partnership or advertising"], ["other", "Other"]].map(([v, l]) => `<option value="${v}">${t(l)}</option>`).join("")}
        </select></label>
        <label>${t("Message")} *<textarea name="message" rows="6" required minlength="10" maxlength="4000"></textarea></label>
        <label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label>
        <button class="btn">${t("Send message")}</button>
        <p class="cf-status" role="status" hidden></p>
      </form>`;
  }

  function wireContact() {
    const f = $(".contact-form"), st = f.querySelector(".cf-status"), btn = f.querySelector("button");
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = f.message.value.trim();
      const show = (txt, ok) => { st.hidden = false; st.textContent = txt; st.className = "cf-status " + (ok ? "ok" : "err"); };
      if (msg.length < 10) { show(t("Please write a message of at least 10 characters."), false); f.message.focus(); return; }
      btn.disabled = true;
      try {
        const r = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: f.name.value.trim(), reply: f.reply.value.trim(), topic: f.topic.value, message: msg, website: f.website.value, lang }) });
        if (r.status === 429) throw new Error("limit");
        if (!r.ok) throw new Error("fail");
        f.querySelectorAll("input, textarea, select").forEach((x) => (x.disabled = true));
        btn.hidden = true;
        show(t("Thank you! Your message has been sent to the KoraPulse team."), true);
      } catch (err) {
        btn.disabled = false;
        show(err.message === "limit" ? t("Too many messages. Please try again later.") : t("Your message could not be sent. Please try again later."), false);
      }
    });
  }

  function toast(text) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  // ---------- behaviour ----------
  function wire() {
    document.querySelectorAll("[data-lang]").forEach((a) => a.addEventListener("click", () => { try { localStorage.setItem("kp-lang", a.dataset.lang); } catch (e) {} }));
    // dark mode
    const root = document.documentElement;
    const tgl = $(".theme-toggle");
    const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    const sync = () => tgl.setAttribute("aria-pressed", isDark());
    sync();
    tgl.addEventListener("click", () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("kp-theme", next); } catch (e) {}
      sync();
    });

    // compact logo once the masthead scrolls away
    const nb = $("#navbar"), mast = $(".masthead");
    new IntersectionObserver(([e]) => nb.classList.toggle("is-stuck", !e.isIntersecting), { threshold: 0 }).observe(mast);

    // mobile menu
    const mb = $(".menu-btn"), menu = $("#mainmenu");
    mb.addEventListener("click", () => {
      menu.style.top = nb.getBoundingClientRect().bottom + "px";
      const open = menu.classList.toggle("open");
      mb.setAttribute("aria-expanded", open);
      mb.innerHTML = open ? icon.close : icon.menu;
      document.body.classList.toggle("no-scroll", open);
    });
    menu.querySelectorAll(".has-sub > a").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (matchMedia("(max-width: 1100px)").matches) {
          e.preventDefault();
          a.parentElement.classList.toggle("expanded");
        }
      });
    });

    // search
    const ov = $(".search-overlay"), input = $(".search-box input");
    const openS = () => { ov.hidden = false; requestAnimationFrame(() => ov.classList.add("show")); input.focus(); };
    const closeS = () => { ov.classList.remove("show"); setTimeout(() => (ov.hidden = true), 200); };
    $(".search-btn").addEventListener("click", openS);
    $(".search-close").addEventListener("click", closeS);
    ov.addEventListener("click", (e) => { if (e.target === ov) closeS(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !ov.hidden) closeS();
      if (e.key === "/" && ov.hidden && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); openS(); }
    });

    // back to top
    const top = $(".to-top");
    addEventListener("scroll", () => top.classList.toggle("show", scrollY > 700), { passive: true });
    top.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

    // comments go to moderation (Admin → Comments). Without a server they are kept in this browser.
    document.querySelectorAll(".comment-form").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const id = params.get("id") || (articles[0] && articles[0].id);
      try {
        const data = JSON.parse(localStorage.getItem("kp-data") || "null") || JSON.parse(JSON.stringify(D));
        data.comments = data.comments || [];
        data.comments.push({ id: "c" + Date.now(), post: id, name: f.name.value.trim(), email: f.email.value.trim(), text: f.text.value.trim(), date: new Date().toISOString().slice(0, 19), status: "pending" });
        data.updated = new Date().toISOString();
        localStorage.setItem("kp-data", JSON.stringify(data));
      } catch (err) {}
      f.hidden = true;
      f.nextElementSibling.hidden = false;
    }));
  }

  renderHeader();
  if (page === "home") renderHome();
  else if (page === "article") renderArticle();
  else if (page === "page") renderPage();
  else if (page !== "matches") renderCategory();
  renderFooter();
  wire();
  liveTicker();
})();
