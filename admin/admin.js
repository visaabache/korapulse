/* KoraPulse admin dashboard (WordPress-style).
   Reads the site content (js/data.js), lets you edit it, saves the result in this browser,
   and exports a new js/data.js to upload ("Settings → Publish & Backup"). */
(function () {
  "use strict";
  const app = document.getElementById("app");
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clone = (o) => JSON.parse(JSON.stringify(o));
  const uid = (p) => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const today = () => new Date().toISOString().slice(0, 10);
  const nowIso = () => { const d = new Date(); return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19); };
  const slugify = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  const AL = (window.KP_ADMIN_I18N && window.KP_ADMIN_I18N.lang) || "en";
  const ALOC = { en: "en-US", fr: "fr-FR", ar: "ar-MA" }[AL];
  const fmtDate = (d) => d ? new Date(d.length <= 10 ? d + "T12:00:00" : d).toLocaleDateString(ALOC, { month: "short", day: "numeric", year: "numeric" }) : "";
  const fmtSlash = (d) => d ? d.slice(0, 10).replace(/-/g, "/") : "";
  const fmtTime = (d) => d && d.length > 10 ? new Date(d).toLocaleTimeString(AL === "en" ? "en-US" : "en-GB", { hour: "numeric", minute: "2-digit", hour12: AL === "en" }).toLowerCase() : "";
  const LANGS = { fr: "Français", ar: "العربية" };
  const ls = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
    del: (k) => { try { localStorage.removeItem(k); } catch (e) {} }
  };

  // ---------------- data ----------------
  function normalize(d) {
    d.site = d.site || { name: "KoraPulse", tagline: "" };
    d.site.social = d.site.social || {};
    ["categories", "articles", "comments", "media", "users", "scores", "topLinks", "pages"].forEach((k) => { d[k] = d[k] || []; });
    d.standings = d.standings || { title: "League table", rows: [] };
    d.articles.forEach((a) => { a.status = a.status || "publish"; a.tags = a.tags || []; a.body = a.body || []; });
    const names = new Set(d.users.map((u) => u.name));
    d.articles.forEach((a) => {
      if (a.author && !names.has(a.author)) { names.add(a.author); d.users.push({ id: uid("u"), name: a.author, role: "Author", bio: "" }); }
    });
    return d;
  }
  let D = normalize(clone(window.KP));

  function save(msg) {
    D.updated = new Date().toISOString();
    if (!ls.set("kp-data", JSON.stringify(D))) {
      flash = { type: "error", text: "Could not save: this browser's storage is full. Delete some images in Media, then try again." };
      return false;
    }
    if (msg) flash = { type: "success", text: msg };
    return true;
  }
  const unpublished = () => !!ls.get("kp-data") && ls.get("kp-exported") !== D.updated;
  const storageUsed = () => JSON.stringify(D).length;
  const STORAGE_MAX = 5000000;

  const commentsOn = () => !!D.site.comments;
  const catName = (slug) => (D.categories.find((c) => c.slug === slug) || { name: slug || "Uncategorized" }).name;
  const approvedCount = (id) => D.comments.filter((c) => c.post === id && c.status === "approved").length;
  const pendingCount = (id) => D.comments.filter((c) => c.status === "pending" && (!id || c.post === id)).length;
  const findPost = (id) => D.articles.find((a) => a.id === id);
  const mediaUrl = (u) => {
    if (u && u.startsWith("media:")) { const m = D.media.find((x) => x.id === u.slice(6)); return m ? m.url : ""; }
    return u || "";
  };
  const thumb = (a) => a.image && mediaUrl(a.image) ? `<img src="${esc(mediaUrl(a.image))}" alt="">` : window.coverArt({ ...a, id: a.id || "new", title: a.title || "New post", cat: a.cat || "news" });

  // ---------------- icons ----------------
  const I = (d, extra = "") => `<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;
  const icons = {
    logo: `<svg viewBox="0 0 64 64" width="20" height="20" aria-hidden="true"><circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" stroke-width="6"/><path d="M6 34 H19 L24 22 L31 44 L37 28 L41 34 H58" fill="none" stroke="#f2b705" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    dash: I('<path d="M3 14a7 7 0 1114 0"/><path d="M10 14l3.5-4.5"/><circle cx="10" cy="14" r="1.2" fill="currentColor"/>'),
    pin: I('<path d="M7 3h6l-1 5 3 3H5l3-3z"/><path d="M10 11v6"/>'),
    media: I('<rect x="3" y="4" width="14" height="12" rx="1.5"/><circle cx="7.5" cy="8.5" r="1.5"/><path d="M3 14l4-3 3 2 3-3 4 3"/>'),
    comment: I('<path d="M3 4h14v9H8l-4 3v-3H3z"/>'),
    ball: I('<circle cx="10" cy="10" r="7"/><path d="M10 6.5l3 2.2-1.1 3.6H8.1L7 8.7z"/><path d="M10 3v3.5M17 8.7l-4 0M14.5 15.5l-2.6-3.2M5.5 15.5l2.6-3.2M3 8.7h4"/>'),
    table: I('<path d="M3 5h14M3 10h14M3 15h14"/><path d="M6.5 3v14" opacity=".5"/>'),
    user: I('<circle cx="10" cy="7" r="3.5"/><path d="M3.5 17c.8-3.3 3.4-5 6.5-5s5.7 1.7 6.5 5"/>'),
    gear: I('<path d="M4 6h8M15 6h1M4 14h1M8 14h8"/><circle cx="13.5" cy="6" r="1.8"/><circle cx="6.5" cy="14" r="1.8"/>'),
    plus: I('<path d="M10 4v12M4 10h12"/>'),
    home: I('<path d="M3 9l7-6 7 6v8H3z"/><path d="M8 17v-5h4v5"/>'),
    menu: I('<path d="M3 5h14M3 10h14M3 15h14"/>'),
    collapse: I('<circle cx="10" cy="10" r="7"/><path d="M11.5 7L8.5 10l3 3"/>'),
    cal: I('<rect x="3" y="4" width="14" height="13" rx="1"/><path d="M3 8h14M7 2v4M13 2v4"/>'),
    eye: I('<path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10z"/><circle cx="10" cy="10" r="2.5"/>'),
    key: I('<circle cx="7" cy="12" r="3.5"/><path d="M9.5 9.5L16 3M13 6l2 2"/>'),
    edit: I('<path d="M4 16l1-4 8-8 3 3-8 8z"/>'),
    link: I('<path d="M8.5 11.5a3.5 3.5 0 005 0l2.5-2.5a3.5 3.5 0 00-5-5l-1 1M11.5 8.5a3.5 3.5 0 00-5 0L4 11a3.5 3.5 0 005 5l1-1"/>'),
    quote: I('<path d="M4 14c0-4 1-6 4-8M11 14c0-4 1-6 4-8"/><circle cx="5.5" cy="13" r="1.8" fill="currentColor"/><circle cx="12.5" cy="13" r="1.8" fill="currentColor"/>'),
    image: I('<rect x="3" y="4" width="14" height="12" rx="1.5"/><circle cx="7.5" cy="8.5" r="1.5"/><path d="M3 14l4-3 3 2 3-3 4 3"/>'),
    upload: I('<path d="M10 13V3M6 7l4-4 4 4M3 13v4h14v-4"/>'),
    download: I('<path d="M10 3v10M6 9l4 4 4-4M3 13v4h14v-4"/>'),
    star: I('<path d="M10 3l2.2 4.5 4.8.7-3.5 3.4.8 4.9L10 14.2l-4.3 2.3.8-4.9L3 8.2l4.8-.7z"/>'),
    page: I('<path d="M5 2h7l4 4v12H5z"/><path d="M12 2v4h4M8 10h5M8 13h5"/>'),
    mail: I('<rect x="2.5" y="4.5" width="15" height="11" rx="1.5"/><path d="M3 5.5l7 5.5 7-5.5"/>'),
    pen: I('<path d="M4 16l1-4 8-8 3 3-8 8z"/><path d="M11 6l3 3"/>'),
    qr: I('<rect x="3" y="3" width="5" height="5"/><rect x="12" y="3" width="5" height="5"/><rect x="3" y="12" width="5" height="5"/><path d="M12 12h2v2h-2zM15 15h2v2h-2zM12 16v1M16 12h1"/>')
  };

  // ---------------- auth (convenience lock, see README) ----------------
  const AUTH_KEY = "kp-admin-auth";
  const getAuth = () => { try { return JSON.parse(ls.get(AUTH_KEY)); } catch (e) { return null; } };
  async function hashPw(user, pw) {
    const txt = "kp:" + user.toLowerCase() + ":" + pw;
    if (window.crypto && crypto.subtle) {
      const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt));
      return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");
    }
    let h = 2166136261;
    for (let i = 0; i < txt.length; i++) { h ^= txt.charCodeAt(i); h = Math.imul(h, 16777619); }
    return "f" + (h >>> 0).toString(16);
  }
  // Signed in until the stored time: 12 hours, or 14 days with "Remember Me".
  // On the live site the Worker checks the password before this page loads (KP_SERVER_AUTH).
  const server = window.KP_SERVER_AUTH || null;
  const loggedIn = () => !!server || (+ls.get("kp-admin-session") || 0) > Date.now();
  const startSession = (days) => ls.set("kp-admin-session", String(Date.now() + days * 864e5));
  const currentUser = () => (server && server.user) || (getAuth() || {}).user || "admin";

  function renderLogin(msg) {
    const auth = getAuth();
    document.title = `Log In ‹ ${D.site.name} — Admin`;
    app.innerHTML = `
      <div class="login">
        <a class="login-logo" href="../index.html">${icons.logo.replace('width="20" height="20"', 'width="84" height="84" style="color:#1d2327"')}<b>${esc(D.site.name)}</b></a>
        ${msg ? `<div class="notice notice-${msg.type} msg"><p>${esc(msg.text)}</p></div>` : ""}
        ${auth ? `
        <form data-form="login">
          <label for="lu">Username</label><input type="text" id="lu" name="user" autocomplete="username" required autofocus>
          <label for="lp">Password</label><input type="password" id="lp" name="pw" autocomplete="current-password" required>
          <div class="login-submit"><label class="remember"><input type="checkbox" name="remember"> Remember Me</label><button class="button button-primary button-large">Log In</button></div>
        </form>` : `
        <div class="notice notice-warning msg"><p><b>Welcome!</b> Create the administrator account for this dashboard.</p></div>
        <form data-form="setup">
          <label for="su">Username</label><input type="text" id="su" name="user" autocomplete="username" required value="admin">
          <label for="sp">Password</label><input type="password" id="sp" name="pw" autocomplete="new-password" required minlength="8">
          <label for="sp2">Confirm password</label><input type="password" id="sp2" name="pw2" autocomplete="new-password" required minlength="8">
          <div class="login-submit"><span class="description">At least 8 characters.</span><button class="button button-primary button-large">Create account</button></div>
        </form>`}
        <p class="nav"><a href="../index.html">← Go to ${esc(D.site.name)}</a> <span class="ab-lang login-lang">${["en", "fr", "ar"].map((l) => `<button data-act="admin-lang" data-v="${l}" class="${l === AL ? "on" : ""}">${{ en: "EN", fr: "FR", ar: "ع" }[l]}</button>`).join("")}</span></p>
      </div>`;
  }

  // ---------------- routing ----------------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [path, query] = h.split("?");
    const parts = path.split("/").filter(Boolean);
    return { name: parts[0] || "dashboard", parts, q: new URLSearchParams(query || "") };
  }
  const go = (hash) => { if (location.hash === hash) render(); else location.hash = hash; };
  const qs = (base, obj) => { const p = new URLSearchParams(); Object.entries(obj).forEach(([k, v]) => { if (v) p.set(k, v); }); const s = p.toString(); return base + (s ? "?" + s : ""); };

  let flash = null;
  let dirty = false;
  let work = null; // working copy for the scores / table / editor pages
  let lastRoute = "";
  let replyTo = null;
  let editCat = null;
  let editUser = null;

  // ---------------- shell ----------------
  const MENU = [
    { id: "dashboard", label: "Dashboard", icon: "dash", href: "#/dashboard", subs: [["Home", "#/dashboard", "dashboard"]] },
    { sep: 1 },
    { id: "posts", label: "Posts", icon: "pin", href: "#/posts", subs: [["All Posts", "#/posts", "posts"], ["Add New Post", "#/post/new", "new"], ["Categories", "#/categories", "categories"]] },
    { id: "media", label: "Media", icon: "media", href: "#/media", subs: [["Library", "#/media", "media"]] },
    { id: "pages", label: "Pages", icon: "page", href: "#/pages", subs: [["All Pages", "#/pages", "pages"], ["Add New Page", "#/page/new", "newpage"]] },
    { id: "messages", label: "Messages", icon: "mail", href: "#/messages", badge: () => msgUnread },
    { id: "qr", label: "QR Codes", icon: "qr", href: "#/qr" },
    { id: "comments", label: "Comments", icon: "comment", href: "#/comments", badge: () => pendingCount(), when: commentsOn },
    { sep: 1 },
    { id: "scores", label: "Live Scores", icon: "ball", href: "#/scores" },
    { id: "table", label: "League Table", icon: "table", href: "#/table" },
    { sep: 1 },
    { id: "users", label: "Users", icon: "user", href: "#/users" },
    { id: "settings", label: "Settings", icon: "gear", href: "#/settings", subs: [["General", "#/settings", "settings"], ["Publish & Backup", "#/tools", "tools"]] }
  ];

  function adminbar() {
    const p = pendingCount();
    return `
      <div class="adminbar" role="navigation" aria-label="Toolbar">
        <button class="ab-menu-btn" data-act="menu-toggle" aria-label="Menu">${icons.menu}</button>
        <a class="ab-logo" href="#/dashboard" aria-label="Dashboard">${icons.logo}</a>
        <a href="../index.html" target="_blank" rel="noopener">${icons.home}<span class="ab-hide-sm">${esc(D.site.name)}</span></a>
        ${commentsOn() ? `<a href="#/comments?status=pending" aria-label="${p} comments in moderation">${icons.comment}<span class="ab-count ${p ? "hot" : ""}">${p}</span></a>` : ""}
        <a href="#/post/new">${icons.plus}<span class="ab-hide-sm">New</span></a>
        <div class="ab-right">
          <span class="ab-lang" role="group" aria-label="Language">${["en", "fr", "ar"].map((l) => `<button data-act="admin-lang" data-v="${l}" class="${l === AL ? "on" : ""}" lang="${l}">${{ en: "EN", fr: "FR", ar: "ع" }[l]}</button>`).join("")}</span>
          <a href="#/settings" class="ab-hide-sm">Howdy, ${esc(currentUser())} <span class="avatar-sm">${esc(currentUser()[0].toUpperCase())}</span></a>
          <button data-act="logout">Log Out</button>
        </div>
      </div>`;
  }

  function sidemenu(active, sub) {
    return `
      <nav class="sidemenu" aria-label="Main menu"><ul>
        ${MENU.map((m) => {
          if (m.sep) return '<li class="menu-sep"></li>';
          if (m.when && !m.when()) return "";
          const b = m.badge ? m.badge() : 0;
          return `<li class="menu-top ${m.id === active ? "current" : ""}">
            <a href="${m.href}" title="${esc(m.label)}">${icons[m.icon]}<span>${esc(m.label)}</span>${b ? `<span class="menu-badge">${b}</span>` : ""}</a>
            ${m.subs ? `<ul class="submenu">${m.subs.map(([l, h, id]) => `<li><a href="${h}" class="${id === sub ? "current" : ""}">${esc(l)}</a></li>`).join("")}</ul>` : ""}
          </li>`;
        }).join("")}
      </ul></nav>`;
  }

  function notices() {
    let out = "";
    if (flash) {
      out += `<div class="notice notice-${flash.type}"><p>${flash.html || esc(flash.text)}</p><button class="notice-dismiss" data-act="dismiss" aria-label="Dismiss">×</button></div>`;
      flash = null;
    }
    return out;
  }

  function render() {
    if (!loggedIn()) { renderLogin(); return; }
    const r = route();
    const key = r.parts.join("/");
    if (key !== lastRoute) { work = null; replyTo = null; editCat = null; editUser = null; if (!/^(post|page)\//.test(key) || key.split("/")[0] !== lastRoute.split("/")[0]) editLang = "en"; }
    const pages = { pages: pagesList, page: pageEditor, messages, qr: qrPage,  dashboard, posts, post: postEditor, categories, media, comments, scores, table: leagueTable, users, settings, tools };
    const pg = (pages[r.name] || dashboard)(r);
    document.title = `${pg.title} ‹ ${D.site.name} — Admin`;
    app.innerHTML = adminbar() + sidemenu(pg.menu, pg.sub) + `
      <main class="wpcontent" id="wpbody"><div class="wrap">
        ${notices()}
        ${pg.html}
        <p class="footer-note"><span>Thank you for creating with ${esc(D.site.name)}.</span><span>${unpublished() ? `<a href="#/tools">Unpublished changes: publish</a>` : "All changes published"}</span></p>
      </div></main>`;
    document.body.classList.remove("menu-open");
    if (key !== lastRoute) scrollTo(0, 0);
    lastRoute = key;
    if (pg.after) pg.after();
  }

  const pageHead = (title, action) => `<div class="page-head"><h1>${title}</h1>${action || ""}</div>`;

  // ---------------- dashboard ----------------
  function dashboard() {
    const pub = D.articles.filter((a) => a.status === "publish");
    const drafts = D.articles.filter((a) => a.status === "draft").sort((a, b) => (b.modified || b.date).localeCompare(a.modified || a.date));
    const pend = pendingCount();
    const approved = D.comments.filter((c) => c.status === "approved").length;
    const recent = pub.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
    const recentC = D.comments.filter((c) => c.status === "approved" || c.status === "pending").sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
    const perCat = D.categories.map((c) => [c, pub.filter((a) => a.cat === c.slug).length]);
    const max = Math.max(1, ...perCat.map((x) => x[1]));
    const showWelcome = ls.get("kp-welcome-hidden") !== "1";

    const html = `
      ${pageHead("Dashboard")}
      ${unpublished() ? `<div class="notice notice-warning"><p>You have changes saved in this browser that are not on the live site yet. <a href="#/tools">Publish them</a>.</p></div>` : ""}
      ${showWelcome ? `
      <section class="welcome">
        <button class="welcome-close" data-act="hide-welcome">✕ Dismiss</button>
        <h2>Welcome to ${esc(D.site.name)}!</h2>
        <p>Everything you need to run your football newsroom.</p>
        <div class="welcome-cols">
          <div><h3>${icons.pen} Write the news</h3><p>Publish match reports, transfer news and opinion pieces with photos.</p><a class="button button-primary" href="#/post/new">Write a new post</a></div>
          <div><h3>${icons.ball} Match day</h3><p>Update the <a href="#/scores">live score ticker</a> and the <a href="#/table">league table</a> as the results come in.</p></div>
          ${commentsOn() ? `<div><h3>${icons.comment} Your readers</h3><p>${pend ? `<a href="#/comments?status=pending">${pend} comment${pend === 1 ? "" : "s"}</a> waiting for approval.` : "No comments waiting for approval."} <br><a href="../index.html" target="_blank" rel="noopener">View your site</a></p></div>`
            : `<div><h3>${icons.link} Shared everywhere</h3><p>Readers share your articles on Facebook, X, WhatsApp and Instagram. Add your social pages in <a href="#/settings">Settings</a> so readers can follow you.<br><a href="../index.html" target="_blank" rel="noopener">View your site</a></p></div>`}
        </div>
      </section>` : ""}
      <div class="dash-cols">
        <div>
          <section class="postbox"><h2>At a Glance</h2><div class="inside">
            <ul class="glance">
              <li><a href="#/posts?status=publish">${icons.pin} ${pub.length} Posts</a></li>
              <li><a href="#/posts?status=draft">${icons.edit} ${drafts.length} Draft${drafts.length === 1 ? "" : "s"}</a></li>
              ${commentsOn() ? `<li><a href="#/comments">${icons.comment} ${approved} Comments</a></li>
              <li><a href="#/comments?status=pending" class="${pend ? "warn" : ""}">${icons.comment} ${pend} in moderation</a></li>` : ""}
              <li><a href="#/categories">${icons.table} ${D.categories.length} Categories</a></li>
              <li><a href="#/media">${icons.media} ${D.media.length} Images</a></li>
            </ul>
            <p class="glance-foot">${esc(D.site.name)} · ${D.users.length} authors · last change ${D.updated ? fmtDate(D.updated) + " " + fmtTime(D.updated) : "never"}</p>
          </div></section>
          <section class="postbox"><h2>Activity</h2><div class="inside">
            <div class="activity-block"><h3>Recently Published</h3>
              <ul class="activity-list">${recent.map((a) => `<li><span>${fmtDate(a.date)}</span><a href="#/post/${esc(a.id)}">${esc(a.title)}</a></li>`).join("")}</ul>
            </div>
            ${commentsOn() ? `
            <div class="activity-block"><h3>Recent Comments</h3>
              ${recentC.map((c) => {
                const p = findPost(c.post);
                return `<div class="act-comment ${c.status === "pending" ? "pending" : ""}">
                  <div><div class="meta">From <b>${esc(c.name)}</b> on <a href="#/post/${esc(c.post)}">${esc(p ? p.title : c.post)}</a>${c.status === "pending" ? " [Pending]" : ""}</div>
                  <p>${esc(c.text)}</p>
                  <div class="mini-actions">${c.status === "pending" ? `<button class="button-link" data-act="c-status" data-id="${c.id}" data-v="approved">Approve</button>` : `<button class="button-link" data-act="c-status" data-id="${c.id}" data-v="pending">Unapprove</button>`}<button class="button-link" data-act="c-status" data-id="${c.id}" data-v="spam">Spam</button><button class="button-link delete" data-act="c-status" data-id="${c.id}" data-v="trash">Trash</button></div></div>
                </div>`;
              }).join("") || "<p>No comments yet.</p>"}
              <p style="margin:10px 0 0"><a href="#/comments">All comments</a> | <a href="#/comments?status=pending">Pending (${pend})</a></p>
            </div>
            ` : ""}
          </div></section>
        </div>
        <div>
          <section class="postbox"><h2>Quick Draft</h2><div class="inside">
            <form class="quick-draft" data-form="quick-draft">
              <label for="qd-t">Title</label><input type="text" id="qd-t" name="title" required>
              <label for="qd-c">Content</label><textarea id="qd-c" name="content" rows="4" placeholder="What's happening on the pitch?"></textarea>
              <button class="button button-primary">Save Draft</button>
            </form>
            ${drafts.length ? `<ul class="draft-list"><li><b>Your Recent Drafts</b> <a href="#/posts?status=draft">View all drafts</a></li>${drafts.slice(0, 3).map((a) => `<li><a href="#/post/${esc(a.id)}">${esc(a.title)}</a><time>${fmtDate(a.modified || a.date)}</time></li>`).join("")}</ul>` : ""}
          </div></section>
          <section class="postbox"><h2>Posts by Category</h2><div class="inside"><div class="bars">
            ${perCat.map(([c, n]) => `<a class="bar-row" href="#/posts?cat=${esc(c.slug)}" style="text-decoration:none;color:inherit"><span>${esc(c.name)}</span><span class="bar"><i style="width:${(n / max) * 100}%"></i></span><b>${n}</b></a>`).join("")}
          </div></div></section>
          <section class="postbox"><h2>Live Scores <a href="#/scores" style="font-weight:400;font-size:13px">Edit</a></h2><div class="inside">
            <table class="mini-scores">${D.scores.map((m) => `<tr><td>${esc(m.home)}</td><td></td><td>${m.hs == null || m.hs === "" ? esc(m.status) : `${m.hs} - ${m.as}`}</td><td>${esc(m.away)}</td><td>${/LIVE/i.test(m.status) ? `<span class="live-pill">${esc(m.status)}</span>` : m.hs == null || m.hs === "" ? "" : esc(m.status)}</td></tr>`).join("") || "<tr><td>No matches.</td></tr>"}</table>
          </div></section>
        </div>
      </div>`;
    return { title: "Dashboard", menu: "dashboard", sub: "dashboard", html };
  }

  // ---------------- posts list ----------------
  function posts(r) {
    const q = r.q;
    const status = q.get("status") || "all";
    const cat = q.get("cat") || "";
    const author = q.get("author") || "";
    const s = (q.get("s") || "").trim();
    const paged = Math.max(1, +q.get("paged") || 1);
    const count = (st) => D.articles.filter((a) => (st === "all" ? a.status !== "trash" : a.status === st)).length;
    let list = D.articles.filter((a) => (status === "all" ? a.status !== "trash" : a.status === status));
    if (cat) list = list.filter((a) => a.cat === cat);
    if (author) list = list.filter((a) => a.author === author);
    if (s) list = list.filter((a) => (a.title + " " + a.excerpt + " " + a.body.join(" ")).toLowerCase().includes(s.toLowerCase()));
    list.sort((a, b) => (b.date + (b.modified || "")).localeCompare(a.date + (a.modified || "")));
    const per = 20, pages = Math.max(1, Math.ceil(list.length / per));
    const rows = list.slice((paged - 1) * per, paged * per);
    const link = (o) => qs("#/posts", { status: status === "all" ? "" : status, cat, author, s, ...o });
    const views = [["all", "All"], ["publish", "Published"], ["draft", "Drafts"], ["trash", "Trash"]].filter(([k]) => k === "all" || count(k));

    const head = `<tr><td class="check-column"><input type="checkbox" data-checkall aria-label="Select all"></td><th class="thumb hide-sm"></th><th>Title</th><th class="hide-sm">Author</th><th class="hide-sm">Category</th><th class="hide-sm">Tags</th>${commentsOn() ? `<th class="num">${icons.comment.replace('width="20" height="20"', 'width="16" height="16"')}</th>` : ""}<th>Date</th></tr>`;
    const html = `
      ${pageHead("Posts", `<a class="page-title-action" href="#/post/new">Add New Post</a>`)}
      ${s ? `<p class="description">Search results for: <b>${esc(s)}</b></p>` : ""}
      <div class="list-head">
        <ul class="subsubsub">${views.map(([k, l]) => `<li><a href="${qs("#/posts", { status: k === "all" ? "" : k })}" class="${status === k ? "current" : ""}">${l} <span class="count">(${count(k)})</span></a></li>`).join("")}</ul>
        <form class="search-box" data-form="post-search"><input type="search" name="s" value="${esc(s)}" aria-label="Search posts"><button class="button">Search Posts</button></form>
      </div>
      <form data-form="bulk-posts">
        <div class="tablenav">
          <div class="alignleft">
            <select name="action" aria-label="Bulk actions"><option value="">Bulk actions</option>${status === "trash" ? '<option value="restore">Restore</option><option value="delete">Delete permanently</option>' : '<option value="publish">Publish</option><option value="draft">Move to Drafts</option><option value="trash">Move to Trash</option>'}</select>
            <button class="button">Apply</button>
          </div>
          <div class="alignleft">
            <select name="cat" aria-label="Filter by category"><option value="">All Categories</option>${D.categories.map((c) => `<option value="${esc(c.slug)}" ${c.slug === cat ? "selected" : ""}>${esc(c.name)}</option>`).join("")}</select>
            <button type="button" class="button" data-act="filter-posts">Filter</button>
            ${status === "trash" && count("trash") ? `<button type="button" class="button" data-act="empty-trash">Empty Trash</button>` : ""}
          </div>
          <div class="tablenav-pages">${list.length} item${list.length === 1 ? "" : "s"}
            ${pages > 1 ? `<a class="button" href="${link({ paged: paged > 1 ? paged - 1 : 1 })}" aria-label="Previous page">‹</a> ${paged} of ${pages} <a class="button" href="${link({ paged: Math.min(pages, paged + 1) })}" aria-label="Next page">›</a>` : ""}
          </div>
        </div>
        <table class="list-table">
          <thead>${head}</thead>
          <tbody>${rows.map((a) => {
            const pc = pendingCount(a.id), ac = approvedCount(a.id);
            const actions = a.status === "trash"
              ? `<span><button type="button" data-act="post-status" data-id="${esc(a.id)}" data-v="draft">Restore</button></span><span class="delete"><button type="button" data-act="post-delete" data-id="${esc(a.id)}">Delete Permanently</button></span>`
              : `<span><a href="#/post/${esc(a.id)}">Edit</a></span><span class="delete"><button type="button" data-act="post-status" data-id="${esc(a.id)}" data-v="trash">Trash</button></span>
                 <span><a href="../article.html?id=${encodeURIComponent(a.id)}${a.status === "publish" ? "" : "&preview=1"}" target="_blank" rel="noopener">${a.status === "publish" ? "View" : "Preview"}</a></span>
                 ${a.status === "publish" && !a.featured ? `<span><button type="button" data-act="post-feature" data-id="${esc(a.id)}">Make headline</button></span>` : ""}`;
            return `<tr>
              <th class="check-column"><input type="checkbox" name="ids" value="${esc(a.id)}" aria-label="Select ${esc(a.title)}"></th>
              <td class="thumb hide-sm"><div class="tmb">${thumb(a)}</div></td>
              <td><strong><a class="row-title" href="#/post/${esc(a.id)}">${esc(a.title)}</a>${a.status === "draft" ? ' — <span class="post-state">Draft</span>' : ""}${a.featured ? ' — <span class="post-state">Headline</span>' : ""}</strong>
                <span class="lang-badges">${["fr", "ar"].map((l) => `<span class="lb ${a.tr && a.tr[l] && a.tr[l].title ? "ok" : ""}" title="${LANGS[l]}">${l.toUpperCase()}</span>`).join("")}</span>
                <div class="row-actions">${actions}</div></td>
              <td class="hide-sm"><a href="${qs("#/posts", { author: a.author })}">${esc(a.author)}</a></td>
              <td class="hide-sm"><a href="${qs("#/posts", { cat: a.cat })}">${esc(catName(a.cat))}</a></td>
              <td class="hide-sm">${a.tags.length ? a.tags.map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("") : "—"}</td>
              ${commentsOn() ? `<td class="num"><a class="comment-bubble ${pc ? "pending" : ac ? "" : "zero"}" href="#/comments?post=${encodeURIComponent(a.id)}" title="${ac} approved, ${pc} pending">${ac + pc}</a></td>` : ""}
              <td class="date-col">${a.status === "publish" ? "Published" : a.status === "draft" ? "Last Modified" : "Trashed"}<b>${fmtSlash(a.status === "publish" ? a.date : a.modified || a.date)}</b></td>
            </tr>`;
          }).join("") || `<tr class="empty"><td colspan="${commentsOn() ? 8 : 7}">No posts found.</td></tr>`}</tbody>
          <tfoot>${head}</tfoot>
        </table>
      </form>`;
    return { title: "Posts", menu: "posts", sub: "posts", html };
  }

  // ---------------- post editor ----------------
  function postEditor(r) {
    const id = r.parts[1] || "new";
    const isNew = id === "new";
    const orig = isNew ? null : findPost(id);
    if (!isNew && !orig) return { title: "Post not found", menu: "posts", sub: "posts", html: pageHead("Post not found") + `<p>This post no longer exists. <a href="#/posts">Back to Posts</a></p>` };
    if (!work) work = isNew
      ? { id: "", title: "", cat: D.categories[0] ? D.categories[0].slug : "news", tags: [], motif: "", author: (D.users[0] || {}).name || currentUser(), date: today(), excerpt: "", body: [], status: "draft", featured: false, image: "" }
      : clone(orig);
    const E = work;
    E.tr = E.tr || {};
    const EL = editLang;
    const F = EL === "en" ? E : (E.tr[EL] = E.tr[EL] || { title: "", excerpt: "", body: [] });
    F.body = F.body || [];
    const dirAttr = EL === "ar" ? 'dir="rtl" lang="ar"' : "";
    const words = F.body.join(" ").split(/\s+/).filter(Boolean).length;
    const statusLabel = { publish: "Published", draft: "Draft", trash: "In Trash" }[E.status] || "Draft";

    const html = `
      ${pageHead(isNew ? "Add New Post" : "Edit Post", isNew ? "" : `<a class="page-title-action" href="#/post/new">Add New Post</a>`)}
      <form class="edit-cols" data-form="post" autocomplete="off">
        <div>
          <div class="ed-langs" role="tablist" aria-label="Language">
            ${[["en", "English (original)"], ["fr", "Français"], ["ar", "العربية"]].map(([l, name]) => `<button type="button" role="tab" aria-selected="${l === EL}" class="${l === EL ? "on" : ""}" data-act="ed-lang" data-v="${l}" lang="${l}">${esc(name)}${l !== "en" ? ` <span class="lb ${E.tr[l] && E.tr[l].title ? "ok" : ""}">${E.tr[l] && E.tr[l].title ? "✓" : "–"}</span>` : ""}</button>`).join("")}
          </div>
          ${EL !== "en" ? `<p class="ed-lang-note"><span class="tr-note">Translation</span> <span class="no-tr">${esc(E.title || "")}</span></p>` : ""}
          <input type="text" class="title-input" name="title" value="${esc(F.title)}" placeholder="Add title" aria-label="Title" ${EL === "en" ? "required" : ""} ${dirAttr}>
          <div class="permalink" ${EL === "en" ? "" : "hidden"}><b>Permalink:</b> <span>article.html?id=</span><input type="text" name="slug" value="${esc(E.id)}" placeholder="generated from the title" aria-label="Slug">
            ${!isNew && E.status === "publish" ? `<a class="button" href="../article.html?id=${encodeURIComponent(E.id)}" target="_blank" rel="noopener">View Post</a>` : ""}</div>
          <div class="editor">
            <div class="editor-tools" role="toolbar" aria-label="Formatting">
              <button type="button" class="button" data-act="add-media">${icons.image.replace('width="20" height="20"', 'width="16" height="16"')} Add Media</button>
              <span class="ed-sep"></span>
              <button type="button" class="ed-btn" data-fmt="bold" title="Bold (Ctrl+B)"><b>B</b></button>
              <button type="button" class="ed-btn" data-fmt="italic" title="Italic (Ctrl+I)"><i style="font-family:Georgia">I</i></button>
              <button type="button" class="ed-btn" data-fmt="h2" title="Heading">H2</button>
              <button type="button" class="ed-btn" data-fmt="quote" title="Quote">${icons.quote.replace('width="20" height="20"', 'width="16" height="16"')}</button>
              <button type="button" class="ed-btn" data-fmt="link" title="Insert link">${icons.link.replace('width="20" height="20"', 'width="16" height="16"')}</button>
              <span class="editor-help">Leave an empty line between paragraphs.</span>
            </div>
            <textarea name="body" aria-label="Post content" placeholder="Start writing…" ${dirAttr}>${esc(F.body.join("\n\n"))}</textarea>
            <div class="editor-status"><span id="wc">Word count: ${words}</span><span>${E.modified ? "Last edited on " + fmtDate(E.modified) + " at " + fmtTime(E.modified) : ""}</span></div>
          </div>
          <section class="postbox"><h2>Excerpt</h2><div class="inside">
            <textarea name="excerpt" rows="3" class="large-text" aria-label="Excerpt" ${dirAttr}>${esc(F.excerpt)}</textarea>
            <p class="description">The summary shown on the homepage and category pages. Leave empty to use the first sentences of the post.</p>
          </div></section>
        </div>
        <div>
          <section class="postbox"><h2>Publish</h2>
            <div class="misc-top">
              <button type="button" class="button" data-act="save-post" data-v="draft">${E.status === "publish" ? "Switch to Draft" : "Save Draft"}</button>
              <button type="button" class="button" data-act="preview-post">Preview</button>
            </div>
            <div class="misc">
              <div class="misc-row">${icons.key} Status: <b>${statusLabel}</b></div>
              <div class="misc-row">${icons.eye} Visibility: <b>${E.status === "publish" ? "Public" : "Only you"}</b></div>
              <div class="misc-row">${icons.cal} <label for="pdate">${E.status === "publish" ? "Published on:" : "Publish date:"}</label> <input type="date" id="pdate" name="date" value="${esc(E.date)}"></div>
              <div class="misc-row">${icons.star} <label><input type="checkbox" name="featured" ${E.featured ? "checked" : ""}> Homepage headline</label></div>
            </div>
            <div class="major">
              ${isNew ? "<span></span>" : `<button type="button" class="button-link delete" data-act="post-status" data-id="${esc(E.id)}" data-v="trash">Move to Trash</button>`}
              <button type="button" class="button button-primary button-large" data-act="save-post" data-v="publish">${E.status === "publish" ? "Update" : "Publish"}</button>
            </div>
          </section>
          <section class="postbox"><h2>Category</h2><div class="inside">
            <ul class="cat-checklist">${D.categories.map((c) => `<li><label><input type="radio" name="cat" value="${esc(c.slug)}" ${c.slug === E.cat ? "checked" : ""}> ${esc(c.name)}</label></li>`).join("")}</ul>
            <p style="margin:10px 0 0"><a href="#/categories">+ Add New Category</a></p>
          </div></section>
          <section class="postbox"><h2>Tags</h2><div class="inside" id="tagbox"></div></section>
          <section class="postbox"><h2>Featured Image</h2><div class="inside" id="featbox"></div></section>
          <section class="postbox"><h2>Author</h2><div class="inside">
            <select name="author" class="full" aria-label="Author">${D.users.map((u) => `<option ${u.name === E.author ? "selected" : ""}>${esc(u.name)}</option>`).join("")}</select>
          </div></section>
        </div>
      </form>`;

    const after = () => {
      const form = $('form[data-form="post"]');
      const ta = form.body;
      const slugIn = form.slug;
      let slugTouched = !isNew || !!E.id;
      form.addEventListener("input", (e) => {
        dirty = true;
        if (e.target === form.title && !slugTouched) slugIn.value = slugify(form.title.value);
        if (e.target === slugIn) slugTouched = true;
        if (e.target === ta) $("#wc").textContent = "Word count: " + ta.value.split(/\s+/).filter(Boolean).length;
      });
      form.addEventListener("change", (e) => {
        dirty = true;
        if (e.target.name === "cat") { E.cat = e.target.value; tagBox(); featBox(); }
      });
      ta.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "i")) { e.preventDefault(); fmt(e.key === "b" ? "bold" : "italic"); }
      });
      $$("[data-fmt]", form).forEach((b) => b.addEventListener("click", () => fmt(b.dataset.fmt)));

      function fmt(kind) {
        const s = ta.selectionStart, e = ta.selectionEnd, sel = ta.value.slice(s, e);
        let ins, caret;
        if (kind === "bold" || kind === "italic") {
          const m = kind === "bold" ? "**" : "*";
          ins = m + (sel || (kind === "bold" ? "bold text" : "italic text")) + m;
        } else if (kind === "link") {
          const u = prompt("Link URL", "https://");
          if (!u || u === "https://") return;
          ins = `[${sel || "link text"}](${u})`;
        } else {
          const prefix = kind === "h2" ? "## " : "> ";
          const ls0 = ta.value.lastIndexOf("\n", s - 1) + 1;
          ta.setRangeText(prefix, ls0, ls0, "end");
          ta.focus(); dirty = true; return;
        }
        ta.setRangeText(ins, s, e, "select");
        caret = s + ins.length;
        ta.focus(); ta.setSelectionRange(caret, caret);
        dirty = true;
      }

      function tagBox() {
        const cat = D.categories.find((c) => c.slug === E.cat);
        const sugg = (cat ? cat.subs : []).filter((t) => !E.tags.includes(t));
        $("#tagbox").innerHTML = `
          <div style="display:flex;gap:4px"><input type="text" id="tag-in" aria-label="Add tag" style="flex:1;min-width:0"><button type="button" class="button" id="tag-add">Add</button></div>
          <p class="description">Tags matching the category's sub-sections (${esc(cat ? cat.subs.join(", ") || "none" : "none")}) appear in its menu filter.</p>
          ${sugg.length ? `<div class="tag-suggest">${sugg.map((t) => `<button type="button" data-t="${esc(t)}">+ ${esc(t)}</button>`).join("")}</div>` : ""}
          <div class="tag-current">${E.tags.map((t, i) => `<span><button type="button" data-rm="${i}" aria-label="Remove ${esc(t)}">×</button>${esc(t)}</span>`).join("")}</div>`;
        const add = (t) => { t = t.trim(); if (t && !E.tags.includes(t)) E.tags.push(t); dirty = true; tagBox(); };
        $("#tag-add").onclick = () => { $("#tag-in").value.split(",").forEach(add); };
        $("#tag-in").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); $("#tag-in").value.split(",").forEach(add); $("#tag-in").focus(); } };
        $$("[data-t]", $("#tagbox")).forEach((b) => (b.onclick = () => add(b.dataset.t)));
        $$("[data-rm]", $("#tagbox")).forEach((b) => (b.onclick = () => { E.tags.splice(+b.dataset.rm, 1); dirty = true; tagBox(); }));
      }
      function featBox() {
        const has = E.image && mediaUrl(E.image);
        $("#featbox").innerHTML = `
          <div class="feat-preview" data-act="set-featured" title="Set featured image">${thumb({ ...E, title: E.title || form.title.value || "New post" })}</div>
          ${has ? `<p style="margin:0"><button type="button" class="button-link" data-act="set-featured">Replace image</button> · <button type="button" class="button-link delete" id="rm-feat">Remove featured image</button></p>`
            : `<p style="margin:0 0 8px"><button type="button" class="button-link" data-act="set-featured">Set featured image</button></p>
               <label class="block" for="motif">Or use an illustration</label>
               <select id="motif" class="full">${["", "stadium", "pitch", "ball", "trophy", "net"].map((m) => `<option value="${m}" ${m === (E.motif || "") ? "selected" : ""}>${m ? m[0].toUpperCase() + m.slice(1) : "Automatic"}</option>`).join("")}</select>`}`;
        const rm = $("#rm-feat");
        if (rm) rm.onclick = () => { E.image = ""; dirty = true; featBox(); };
        const mo = $("#motif");
        if (mo) mo.onchange = () => { E.motif = mo.value; dirty = true; featBox(); };
      }
      editorApi = { featBox, insert: (txt) => { const p = ta.selectionStart; ta.setRangeText(txt, p, ta.selectionEnd, "end"); ta.focus(); dirty = true; } };
      tagBox(); featBox();
    };
    return { title: isNew ? "Add New Post" : "Edit Post", menu: "posts", sub: isNew ? "new" : "posts", html, after };
  }
  let editorApi = null;
  let editLang = "en";
  function captureEditor() {
    const form = $('form[data-form="post"]');
    if (!form || !work) return;
    const E = work;
    E.tr = E.tr || {};
    const body = form.body.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (editLang === "en") { E.title = form.title.value.trim(); E.body = body; E.excerpt = form.excerpt.value.trim(); work._slug = form.slug.value; }
    else E.tr[editLang] = { title: form.title.value.trim(), excerpt: form.excerpt.value.trim(), body };
    const c = form.querySelector('input[name="cat"]:checked');
    if (c) E.cat = c.value;
    E.author = form.author.value;
    E.date = form.date.value || E.date;
    E.featured = form.featured.checked;
  }
  let skipHash = false, prevHash = "";

  function savePost(mode, opts = {}) {
    const form = $('form[data-form="post"]');
    const E = work;
    const isNew = route().parts[1] === "new";
    const origId = isNew ? null : route().parts[1];
    captureEditor();
    if (!E.title) { alert("Please add a title first."); if (editLang !== "en") { editLang = "en"; render(); } else form.title.focus(); return null; }
    const autoExcerpt = (body) => { const first = (body.find((p) => !/^(##|>|!\[)/.test(p)) || "").replace(/\*|\[|\]\([^)]*\)/g, "").trim(); return first.length > 180 ? first.slice(0, 180).replace(/\s+\S*$/, "") + "…" : first; };
    E.excerpt = E.excerpt || autoExcerpt(E.body);
    Object.keys(E.tr || {}).forEach((l) => { const x = E.tr[l]; if (!x.title && !(x.body || []).length) delete E.tr[l]; else if (!x.excerpt) x.excerpt = autoExcerpt(x.body || []); });
    E.date = E.date || today();
    E.modified = nowIso();
    if (mode === "publish") E.status = "publish";
    else if (mode === "draft") E.status = "draft";
    let slug = slugify(work._slug || form.slug.value || E.title) || "post";
    delete E._slug;
    let n = 2; const base = slug;
    while (D.articles.some((a) => a.id === slug && a.id !== origId)) slug = base + "-" + n++;
    E.id = slug;
    if (E.featured) D.articles.forEach((a) => { if (a.id !== origId) a.featured = false; });
    if (isNew) D.articles.push(E);
    else {
      const i = D.articles.findIndex((a) => a.id === origId);
      D.articles[i] = E;
      if (origId !== slug) D.comments.forEach((cm) => { if (cm.post === origId) cm.post = slug; });
    }
    const viewUrl = `../article.html?id=${encodeURIComponent(E.id)}${E.status === "publish" ? "" : "&preview=1"}`;
    const msg = E.status === "publish" ? (isNew || mode === "publish" && opts.wasDraft ? "Post published." : "Post updated.") : "Draft saved.";
    if (!save()) { render(); return null; }
    flash = { type: "success", html: `${msg} <a href="${viewUrl}" target="_blank" rel="noopener">${E.status === "publish" ? "View post" : "Preview post"}</a>` };
    dirty = false;
    work = clone(E);
    lastRoute = "post/" + E.id;
    if (opts.silent) { flash = null; history.replaceState(null, "", "#/post/" + E.id); prevHash = location.hash; return E; }
    go("#/post/" + E.id);
    return E;
  }

  // ---------------- categories ----------------
  function categories() {
    const ed = editCat ? D.categories.find((c) => c.slug === editCat) : null;
    const html = `
      ${pageHead("Categories")}
      <div class="two-pane">
        <div class="form-wrap">
          <h2>${ed ? "Edit Category" : "Add New Category"}</h2>
          <form data-form="category">
            <div class="form-field"><label for="cn">Name</label><input type="text" id="cn" name="name" required value="${esc(ed ? ed.name : "")}"><p class="description">The name shown in the site menu.</p></div>
            <div class="form-field"><label for="cs">Slug</label><input type="text" id="cs" name="slug" value="${esc(ed ? ed.slug : "")}"><p class="description">The web address version of the name: lowercase letters, numbers and hyphens.</p></div>
            <div class="form-field"><label for="cu">Sub-sections</label><input type="text" id="cu" name="subs" value="${esc(ed ? ed.subs.join(", ") : "")}"><p class="description">Optional, separated by commas (e.g. Results, Clubs). They appear in the menu dropdown and filter posts by tag.</p></div>
            ${["fr", "ar"].map((l) => `<fieldset class="tr-fields" ${l === "ar" ? 'dir="rtl"' : ""}><legend>${LANGS[l]}</legend>
              <div class="form-field"><label for="cn-${l}">Name</label><input type="text" id="cn-${l}" name="name_${l}" value="${esc(ed && ed.tr && ed.tr[l] ? ed.tr[l].name : "")}"></div>
              <div class="form-field"><label for="cu-${l}">Sub-sections</label><input type="text" id="cu-${l}" name="subs_${l}" value="${esc(ed && ed.tr && ed.tr[l] && ed.tr[l].subs ? ed.tr[l].subs.join(", ") : "")}"><p class="description">In the same order as above.</p></div>
            </fieldset>`).join("")}
            <button class="button button-primary">${ed ? "Update" : "Add New Category"}</button>
            ${ed ? `<button type="button" class="button" data-act="cat-cancel">Cancel</button>` : ""}
          </form>
        </div>
        <div>
          <table class="list-table">
            <thead><tr><th>Name</th><th class="hide-sm">Slug</th><th class="hide-sm">Sub-sections</th><th class="num">Count</th><th class="num">Menu order</th></tr></thead>
            <tbody>${D.categories.map((c, i) => `<tr>
              <td><strong><a class="row-title" href="#" data-act="cat-edit" data-id="${esc(c.slug)}">${esc(c.name)}</a></strong>
                <div class="tr-names no-tr">${["fr", "ar"].map((l) => c.tr && c.tr[l] && c.tr[l].name ? `<span lang="${l}">${esc(c.tr[l].name)}</span>` : "").join(" · ")}</div>
                <div class="row-actions"><span><button data-act="cat-edit" data-id="${esc(c.slug)}">Edit</button></span><span class="delete"><button data-act="cat-delete" data-id="${esc(c.slug)}">Delete</button></span><span><a href="../category.html?c=${encodeURIComponent(c.slug)}" target="_blank" rel="noopener">View</a></span></div></td>
              <td class="hide-sm">${esc(c.slug)}</td>
              <td class="hide-sm">${c.subs.map((t) => `<span class="tag-chip">${esc(t)}</span>`).join("") || "—"}</td>
              <td class="num"><a href="#/posts?cat=${esc(c.slug)}">${D.articles.filter((a) => a.cat === c.slug && a.status !== "trash").length}</a></td>
              <td class="num" style="white-space:nowrap"><button class="button" data-act="cat-move" data-id="${i}" data-v="-1" ${i === 0 ? "disabled" : ""} aria-label="Move up">↑</button> <button class="button" data-act="cat-move" data-id="${i}" data-v="1" ${i === D.categories.length - 1 ? "disabled" : ""} aria-label="Move down">↓</button></td>
            </tr>`).join("")}</tbody>
          </table>
          <p class="description">Deleting a category moves its posts to the first category in the list. The order here is the order of the site menu.</p>
        </div>
      </div>`;
    return { title: "Categories", menu: "posts", sub: "categories", html };
  }

  // ---------------- media ----------------
  function storageMeter() {
    const used = storageUsed(), pct = Math.min(100, (used / STORAGE_MAX) * 100);
    return `<div class="storage-meter"><span>Storage used: ${(used / 1e6).toFixed(1)} MB of about ${(STORAGE_MAX / 1e6).toFixed(0)} MB</span><div class="bar"><i class="${pct > 90 ? "full" : pct > 70 ? "warn" : ""}" style="width:${pct.toFixed(1)}%"></i></div></div>`;
  }
  function processFile(file) {
    return new Promise((resolve, reject) => {
      if (!/^image\//.test(file.type)) { reject(new Error(file.name + " is not an image.")); return; }
      const fr = new FileReader();
      fr.onerror = () => reject(new Error("Could not read " + file.name));
      fr.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error("Could not open " + file.name));
        img.onload = () => {
          const max = 1600;
          let w = img.naturalWidth || 1200, h = img.naturalHeight || 675;
          if (w > max) { h = Math.round((h * max) / w); w = max; }
          const c = document.createElement("canvas");
          c.width = w; c.height = h;
          const ctx = c.getContext("2d");
          ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          // JPEG: shown by every browser and in Facebook / WhatsApp link previews
          const url = c.toDataURL("image/jpeg", 0.82);
          resolve({ id: uid("m"), name: file.name, url, w, h, size: Math.round(url.length * 0.75), date: nowIso(), alt: "" });
        };
        img.src = fr.result;
      };
      fr.readAsDataURL(file);
    });
  }
  async function upload(files) {
    const added = [], errors = [];
    for (const f of Array.from(files)) {
      try {
        const m = await processFile(f);
        D.media.unshift(m);
        if (!save()) { D.media.shift(); errors.push(f.name + ": storage is full"); flash = null; break; }
        added.push(m);
      } catch (e) { errors.push(e.message); }
    }
    flash = errors.length ? { type: "error", text: "Some files were not uploaded: " + errors.join("; ") } : added.length ? { type: "success", text: `${added.length} image${added.length === 1 ? "" : "s"} uploaded.` } : null;
    return added;
  }
  const usedIn = (m) => D.articles.filter((a) => a.image === "media:" + m.id || a.body.some((p) => p.includes("media:" + m.id)));

  function mediaGrid(sel) {
    return D.media.length
      ? `<div class="media-grid">${D.media.map((m) => `<button type="button" class="attachment ${m.id === sel ? "selected" : ""}" data-media="${m.id}" aria-label="${esc(m.name)}"><img src="${esc(m.url)}" alt="${esc(m.alt || m.name)}" loading="lazy"></button>`).join("")}</div>`
      : `<p class="description">No images yet. Upload your first photo above.</p>`;
  }
  function uploaderHtml() {
    return `<div class="uploader" data-drop>
      <h2>Drop files to upload</h2><p>or</p>
      <label class="button button-large">${icons.upload.replace('width="20" height="20"', 'width="16" height="16"')} Select Files<input type="file" accept="image/*" multiple hidden data-upload></label>
      <p class="description">Large photos are resized to 1600 px wide to save space.</p>
    </div>`;
  }
  function bindUploader(root, onDone) {
    const drop = $("[data-drop]", root);
    if (!drop) return;
    const run = async (files) => { drop.querySelector("h2").textContent = "Uploading…"; const a = await upload(files); onDone(a); };
    $("[data-upload]", root).addEventListener("change", (e) => run(e.target.files));
    ["dragenter", "dragover"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add("drag"); }));
    ["dragleave", "drop"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.remove("drag"); }));
    drop.addEventListener("drop", (e) => run(e.dataTransfer.files));
  }

  function media() {
    const html = `
      ${pageHead("Media Library")}
      ${uploaderHtml()}
      <div class="media-toolbar"><span>${D.media.length} image${D.media.length === 1 ? "" : "s"}</span>${storageMeter()}</div>
      ${mediaGrid()}`;
    const after = () => {
      bindUploader(app, () => render());
      $$("[data-media]").forEach((b) => b.addEventListener("click", () => mediaDetails(b.dataset.media)));
    };
    return { title: "Media Library", menu: "media", sub: "media", html, after };
  }

  function modal(title, body, foot) {
    const back = document.createElement("div");
    back.className = "modal-back";
    back.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2><button class="modal-close" aria-label="Close">×</button></div><div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ""}</div>`;
    document.body.appendChild(back);
    const close = () => { back.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    back.addEventListener("click", (e) => { if (e.target === back) close(); });
    $(".modal-close", back).addEventListener("click", close);
    return { el: back, close };
  }
  function detailsHtml(m) {
    const used = usedIn(m);
    return `<img src="${esc(m.url)}" alt="">
      <div>Uploaded on: <b>${fmtDate(m.date)}</b></div>
      <div>File name: <b>${esc(m.name)}</b></div>
      <div>Dimensions: <b>${m.w} by ${m.h} pixels</b></div>
      <div>File size: <b>${Math.round(m.size / 1024)} KB</b></div>
      <div>Used in: <b>${used.length ? used.map((a) => esc(a.title)).join(", ") : "not used yet"}</b></div>
      <label for="alt-${m.id}">Alternative text</label><input type="text" id="alt-${m.id}" data-alt="${m.id}" value="${esc(m.alt)}">
      <p class="description">Describe the photo for visually impaired readers.</p>`;
  }
  function mediaDetails(mid) {
    const m = D.media.find((x) => x.id === mid);
    if (!m) return;
    const md = modal("Attachment details", `<div class="modal-split"><div style="background:#f0f0f1;display:grid;place-items:center;min-height:300px"><img src="${esc(m.url)}" alt="" style="max-width:100%;max-height:60vh"></div><div class="attach-details">${detailsHtml(m)}</div></div>`,
      `<button class="button-link delete" data-del>Delete permanently</button><span style="flex:1"></span><button class="button button-primary" data-done>Done</button>`);
    $("[data-done]", md.el).onclick = () => { m.alt = $("[data-alt]", md.el).value.trim(); save(); md.close(); };
    $("[data-del]", md.el).onclick = () => {
      const used = usedIn(m);
      if (!confirm(`Delete "${m.name}" permanently?${used.length ? `\n\nIt is used in ${used.length} post(s); they will show their illustration instead.` : ""}`)) return;
      D.articles.forEach((a) => { if (a.image === "media:" + m.id) a.image = ""; a.body = a.body.filter((p) => !p.includes("media:" + m.id)); });
      D.media = D.media.filter((x) => x.id !== m.id);
      save("Image deleted.");
      md.close(); render();
    };
  }
  function pickMedia(title, button, onSelect) {
    let sel = null;
    const md = modal(title, `<div class="modal-split"><div>${uploaderHtml()}<div data-grid>${mediaGrid()}</div></div><div class="attach-details" data-details><p>Select an image, or upload a new one.</p></div></div>`,
      `<button class="button button-primary" data-choose disabled>${esc(button)}</button>`);
    const bindGrid = () => $$("[data-media]", md.el).forEach((b) => b.addEventListener("click", () => {
      sel = D.media.find((x) => x.id === b.dataset.media);
      $$("[data-media]", md.el).forEach((x) => x.classList.toggle("selected", x === b));
      $("[data-details]", md.el).innerHTML = detailsHtml(sel);
      $("[data-choose]", md.el).disabled = false;
    }));
    bindGrid();
    bindUploader(md.el, (added) => {
      $("[data-drop] h2", md.el).textContent = "Drop files to upload";
      $("[data-grid]", md.el).innerHTML = mediaGrid();
      bindGrid();
      if (flash && flash.type === "error") { alert(flash.text); flash = null; } else flash = null;
      if (added[0]) $(`[data-media="${added[0].id}"]`, md.el).click();
    });
    $("[data-choose]", md.el).onclick = () => {
      const a = $("[data-alt]", md.el);
      if (a) { sel.alt = a.value.trim(); save(); }
      md.close(); onSelect(sel);
    };
  }

  // ---------------- comments ----------------
  function comments(r) {
    const status = r.q.get("status") || "all";
    const post = r.q.get("post") || "";
    const count = (st) => D.comments.filter((c) => (st === "all" ? c.status === "approved" || c.status === "pending" : c.status === st) && (!post || c.post === post)).length;
    const list = D.comments.filter((c) => (status === "all" ? c.status === "approved" || c.status === "pending" : c.status === status) && (!post || c.post === post)).sort((a, b) => b.date.localeCompare(a.date));
    const p = post ? findPost(post) : null;
    const views = [["all", "All"], ["pending", "Pending"], ["approved", "Approved"], ["spam", "Spam"], ["trash", "Trash"]];
    const head = `<tr><td class="check-column"><input type="checkbox" data-checkall aria-label="Select all"></td><th>Author</th><th>Comment</th><th class="hide-sm">In response to</th></tr>`;
    const actions = (c) => {
      const b = (v, l, cls = "") => `<span class="${cls}"><button type="button" data-act="c-status" data-id="${c.id}" data-v="${v}">${l}</button></span>`;
      if (c.status === "spam") return b("pending", "Not Spam") + `<span class="delete"><button type="button" data-act="c-delete" data-id="${c.id}">Delete Permanently</button></span>`;
      if (c.status === "trash") return b("pending", "Restore") + `<span class="delete"><button type="button" data-act="c-delete" data-id="${c.id}">Delete Permanently</button></span>`;
      return (c.status === "pending" ? b("approved", "Approve") : b("pending", "Unapprove")) + `<span><button type="button" data-act="c-reply" data-id="${c.id}">Reply</button></span>` + b("spam", "Spam", "delete") + b("trash", "Trash", "delete");
    };
    const html = `
      ${pageHead(p ? `Comments on “${esc(p.title)}”` : "Comments")}
      <div class="list-head">
        <ul class="subsubsub">${views.map(([k, l]) => `<li><a href="${qs("#/comments", { status: k === "all" ? "" : k, post })}" class="${status === k ? "current" : ""}">${l} <span class="count">(${count(k)})</span></a></li>`).join("")}</ul>
        ${post ? `<a href="#/comments" class="button">Show all posts</a>` : ""}
      </div>
      <form data-form="bulk-comments">
        <div class="tablenav"><div class="alignleft">
          <select name="action" aria-label="Bulk actions"><option value="">Bulk actions</option>${status === "spam" || status === "trash" ? '<option value="pending">Restore</option><option value="delete">Delete permanently</option>' : '<option value="approved">Approve</option><option value="pending">Unapprove</option><option value="spam">Mark as spam</option><option value="trash">Move to Trash</option>'}</select>
          <button class="button">Apply</button>
          ${(status === "spam" || status === "trash") && list.length ? `<button type="button" class="button" data-act="c-empty" data-v="${status}">Empty ${status === "spam" ? "Spam" : "Trash"}</button>` : ""}
        </div><div class="tablenav-pages">${list.length} item${list.length === 1 ? "" : "s"}</div></div>
        <table class="list-table">
          <thead>${head}</thead>
          <tbody>${list.map((c) => {
            const ap = findPost(c.post);
            return `<tr class="${c.status === "pending" ? "unapproved" : ""}">
              <th class="check-column"><input type="checkbox" name="ids" value="${c.id}" aria-label="Select comment by ${esc(c.name)}"></th>
              <td style="width:20%"><strong>${esc(c.name)}</strong>${c.admin ? ' <span class="tag-chip">Staff</span>' : ""}${c.email ? `<br><a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ""}</td>
              <td><div class="description" style="margin:0 0 4px">Submitted on ${fmtSlash(c.date)}${fmtTime(c.date) ? " at " + fmtTime(c.date) : ""}${c.status === "pending" ? " · <b>Pending</b>" : ""}</div>
                <p style="margin:0 0 4px">${esc(c.text)}</p>
                <div class="row-actions">${actions(c)}</div></td>
              <td class="hide-sm" style="width:24%">${ap ? `<a href="#/post/${esc(ap.id)}"><b>${esc(ap.title)}</b></a><br><a href="../article.html?id=${encodeURIComponent(ap.id)}" target="_blank" rel="noopener">View Post</a> <a class="comment-bubble ${pendingCount(ap.id) ? "pending" : ""}" href="${qs("#/comments", { post: ap.id })}">${approvedCount(ap.id)}</a>` : "<i>Deleted post</i>"}</td>
            </tr>${replyTo === c.id ? `<tr class="reply-row"><td></td><td colspan="3"><form data-form="reply" data-id="${c.id}"><label class="description" for="rp">Reply to ${esc(c.name)} (published as ${esc(D.site.name)} staff, and approves the comment)</label><textarea id="rp" name="text" class="large-text" rows="3" required></textarea><p><button class="button button-primary">Reply</button> <button type="button" class="button" data-act="c-reply" data-id="">Cancel</button></p></form></td></tr>` : ""}`;
          }).join("") || `<tr class="empty"><td colspan="4">No comments found.</td></tr>`}</tbody>
          <tfoot>${head}</tfoot>
        </table>
      </form>
      <p class="description">Comments posted on the website reach this list only from this browser until the site has a server (see the README).</p>`;
    return { title: "Comments", menu: "comments", html, after: () => { const t = $("#rp"); if (t) t.focus(); } };
  }

  // ---------------- live scores ----------------
  const readRows = (form, fields) => $$("tbody tr", form).map((tr) => {
    const o = {};
    fields.forEach((f) => { const el = $(`[data-f="${f}"]`, tr); if (el) o[f] = el.value; });
    return o;
  });
  const numOrNull = (v) => (v === "" || v == null ? null : Math.max(0, parseInt(v, 10) || 0));

  function scores() {
    if (!work) work = clone(D.scores);
    const html = `
      ${pageHead("Live Scores", `<a class="page-title-action" href="../index.html#scores" target="_blank" rel="noopener">View ticker</a>`)}
      <form data-form="scores">
        <section class="postbox"><h2>What the score ticker shows</h2><div class="inside">
          <p><label><input type="radio" name="mode" value="auto" ${(D.site.ticker || "auto") === "auto" ? "checked" : ""}> <b>Live matches from around the world</b> (automatic). Today's live, finished and upcoming matches, Botola Pro and CAF first. The matches below are used if the score service is unavailable.</label></p>
          <p style="margin-bottom:0"><label><input type="radio" name="mode" value="manual" ${D.site.ticker === "manual" ? "checked" : ""}> <b>Only the matches I enter below</b></label></p>
          <p class="description">The full list with filters is on the <a href="../matches.html" target="_blank" rel="noopener">Live scores page</a>.</p>
        </div></section>
        <p class="description" style="margin:0 0 10px">Leave the score empty for matches that have not started, and put the kick-off time in Status.</p>
        <table class="list-table edit-table">
          <thead><tr><th>Competition</th><th>Home team</th><th>Score</th><th>Away team</th><th>Status</th><th></th></tr></thead>
          <tbody>${work.map((m, i) => `<tr>
            <td><input type="text" data-f="comp" value="${esc(m.comp)}" aria-label="Competition" list="comps"></td>
            <td><input type="text" data-f="home" value="${esc(m.home)}" aria-label="Home team" list="clubs"></td>
            <td style="white-space:nowrap"><input type="number" min="0" class="small-text" data-f="hs" value="${m.hs == null ? "" : m.hs}" aria-label="Home goals"> – <input type="number" min="0" class="small-text" data-f="as" value="${m.as == null ? "" : m.as}" aria-label="Away goals"></td>
            <td><input type="text" data-f="away" value="${esc(m.away)}" aria-label="Away team" list="clubs"></td>
            <td><input type="text" data-f="status" value="${esc(m.status)}" aria-label="Status" list="statuses"></td>
            <td><button type="button" class="button-link delete" data-act="row-del" data-id="${i}">Remove</button></td>
          </tr>`).join("") || `<tr class="empty"><td colspan="6">No matches. The ticker is hidden until you add one.</td></tr>`}</tbody>
        </table>
        <datalist id="statuses"><option value="FT"><option value="HT"><option value="LIVE 1'"><option value="LIVE 45'"><option value="LIVE 90+'"><option value="20:00"><option value="Postponed"></datalist>
        <datalist id="comps">${[...new Set(D.scores.map((m) => m.comp))].map((c) => `<option value="${esc(c)}">`).join("")}</datalist>
        <datalist id="clubs">${[...new Set(D.standings.rows.map((r) => r.club).concat(D.scores.flatMap((m) => [m.home, m.away])))].map((c) => `<option value="${esc(c)}">`).join("")}</datalist>
        <p><button type="button" class="button" data-act="row-add">+ Add match</button></p>
        <p><button class="button button-primary">Save Changes</button></p>
      </form>`;
    return { title: "Live Scores", menu: "scores", html, after: () => $('form[data-form="scores"]').addEventListener("input", () => (dirty = true)) };
  }
  const readScores = (form) => readRows(form, ["comp", "home", "hs", "as", "away", "status"]).map((m) => ({ ...m, hs: numOrNull(m.hs), as: numOrNull(m.as) }));

  // ---------------- league table ----------------
  function leagueTable() {
    if (!work) work = clone(D.standings);
    const T = work;
    const html = `
      ${pageHead("League Table")}
      <form data-form="table">
        <p><label for="tt"><b>Table title</b></label><br><input type="text" id="tt" name="title" class="regular-text" value="${esc(T.title)}">
          ${["fr", "ar"].map((l) => `<input type="text" name="title_${l}" class="regular-text" aria-label="${LANGS[l]}" placeholder="${LANGS[l]}" ${l === "ar" ? 'dir="rtl"' : ""} value="${esc(T.tr && T.tr[l] ? T.tr[l].title : "")}">`).join(" ")}</p>
        <table class="list-table edit-table">
          <thead><tr><th>#</th><th>Club</th><th>W</th><th>D</th><th>L</th><th>Played</th><th>Goal diff.</th><th>Points</th><th></th></tr></thead>
          <tbody>${T.rows.map((r, i) => `<tr>
            <td>${i + 1}</td>
            <td><input type="text" data-f="club" value="${esc(r.club)}" aria-label="Club" required></td>
            <td><input type="number" min="0" class="small-text" data-f="w" value="${r.w}" aria-label="Won"></td>
            <td><input type="number" min="0" class="small-text" data-f="d" value="${r.d}" aria-label="Drawn"></td>
            <td><input type="number" min="0" class="small-text" data-f="l" value="${r.l}" aria-label="Lost"></td>
            <td data-p>${r.p}</td>
            <td><input type="number" class="small-text" data-f="gd" value="${r.gd}" aria-label="Goal difference"></td>
            <td data-pts><b>${r.pts}</b></td>
            <td><button type="button" class="button-link delete" data-act="row-del" data-id="${i}">Remove</button></td>
          </tr>`).join("")}</tbody>
        </table>
        <p class="description">Played and points are calculated for you (3 points for a win, 1 for a draw). The table is sorted by points, then goal difference, when you save.</p>
        <p><button type="button" class="button" data-act="row-add">+ Add club</button></p>
        <p><button class="button button-primary">Save Changes</button></p>
      </form>`;
    const after = () => {
      const form = $('form[data-form="table"]');
      form.addEventListener("input", (e) => {
        dirty = true;
        const tr = e.target.closest("tr");
        if (!tr || !tr.querySelector("[data-p]")) return;
        const v = (f) => parseInt($(`[data-f="${f}"]`, tr).value, 10) || 0;
        tr.querySelector("[data-p]").textContent = v("w") + v("d") + v("l");
        tr.querySelector("[data-pts]").innerHTML = `<b>${3 * v("w") + v("d")}</b>`;
      });
    };
    return { title: "League Table", menu: "table", html, after };
  }
  const readTable = (form) => ({
    title: form.title.value.trim() || "League table",
    tr: { fr: { title: form.title_fr.value.trim() }, ar: { title: form.title_ar.value.trim() } },
    rows: readRows(form, ["club", "w", "d", "l", "gd"]).map((r) => {
      const w = parseInt(r.w, 10) || 0, d = parseInt(r.d, 10) || 0, l = parseInt(r.l, 10) || 0;
      return { club: r.club.trim(), p: w + d + l, w, d, l, gd: parseInt(r.gd, 10) || 0, pts: 3 * w + d };
    })
  });

  // ---------------- users ----------------
  const ROLES = ["Administrator", "Editor", "Author", "Contributor"];
  function users() {
    const ed = editUser ? D.users.find((u) => u.id === editUser) : null;
    const html = `
      ${pageHead("Users")}
      <p class="description" style="margin:-6px 0 14px">The writers credited on articles. Sign-in to this dashboard uses the administrator account in <a href="#/settings">Settings</a>.</p>
      <div class="two-pane">
        <div class="form-wrap">
          <h2>${ed ? "Edit User" : "Add New User"}</h2>
          <form data-form="user">
            <div class="form-field"><label for="un">Name</label><input type="text" id="un" name="name" required value="${esc(ed ? ed.name : "")}"></div>
            ${["fr", "ar"].map((l) => `<div class="form-field"><label for="un-${l}">Name (${LANGS[l]})</label><input type="text" id="un-${l}" name="name_${l}" ${l === "ar" ? 'dir="rtl"' : ""} value="${esc(ed && ed.tr ? ed.tr[l] || "" : "")}"></div>`).join("")}
            <div class="form-field"><label for="ur">Role</label><select id="ur" name="role">${ROLES.map((r) => `<option ${ed && ed.role === r ? "selected" : !ed && r === "Author" ? "selected" : ""}>${r}</option>`).join("")}</select></div>
            <div class="form-field"><label for="ub">Biographical info</label><textarea id="ub" name="bio" rows="3">${esc(ed ? ed.bio : "")}</textarea></div>
            <button class="button button-primary">${ed ? "Update User" : "Add New User"}</button>
            ${ed ? `<button type="button" class="button" data-act="user-cancel">Cancel</button>` : ""}
          </form>
        </div>
        <table class="list-table">
          <thead><tr><th>Name</th><th>Role</th><th class="hide-sm">Bio</th><th class="num">Posts</th></tr></thead>
          <tbody>${D.users.map((u) => `<tr>
            <td><strong><a class="row-title" href="#" data-act="user-edit" data-id="${u.id}">${esc(u.name)}</a></strong>
              <div class="row-actions"><span><button data-act="user-edit" data-id="${u.id}">Edit</button></span>${D.users.length > 1 ? `<span class="delete"><button data-act="user-delete" data-id="${u.id}">Delete</button></span>` : ""}</div></td>
            <td>${esc(u.role)}</td>
            <td class="hide-sm">${esc(u.bio || "—")}</td>
            <td class="num"><a href="${qs("#/posts", { author: u.name })}">${D.articles.filter((a) => a.author === u.name && a.status !== "trash").length}</a></td>
          </tr>`).join("")}</tbody>
        </table>
      </div>`;
    return { title: "Users", menu: "users", html };
  }

  // ---------------- settings ----------------
  function settings() {
    const s = D.site, so = s.social;
    const html = `
      ${pageHead("General Settings")}
      <form data-form="settings">
        <table class="form-table"><tbody>
          <tr><th><label for="st">Site Title</label></th><td><input type="text" id="st" name="name" class="regular-text" value="${esc(s.name)}" required></td></tr>
          <tr><th><label for="sg">Tagline</label></th><td><input type="text" id="sg" name="tagline" class="regular-text" value="${esc(s.tagline)}"><p class="description">In a few words, explain what this site is about. Shown under the logo.</p>
            ${["fr", "ar"].map((l) => `<p style="margin:8px 0 0"><label style="display:inline-block;width:90px" for="sg-${l}">${LANGS[l]}</label><input type="text" id="sg-${l}" name="tagline_${l}" class="regular-text" ${l === "ar" ? 'dir="rtl"' : ""} value="${esc(s.tr && s.tr[l] ? s.tr[l].tagline || "" : "")}"></p>`).join("")}</td></tr>
          <tr><th><label for="se">Contact email</label></th><td><input type="email" id="se" name="email" class="regular-text" value="${esc(s.email || "")}"></td></tr>
          <tr><th>Social media</th><td>${["instagram", "x", "facebook", "youtube", "tiktok", "linkedin"].map((k) => `<p style="margin:0 0 8px"><label style="display:inline-block;width:90px" for="so-${k}">${k === "x" ? "X" : k[0].toUpperCase() + k.slice(1)}</label><input type="url" id="so-${k}" name="so-${k}" class="regular-text" value="${esc(so[k] && so[k] !== "#" ? so[k] : "")}" placeholder="https://"></p>`).join("")}</td></tr>
          <tr><th>Comments</th><td><label><input type="checkbox" name="comments" ${commentsOn() ? "checked" : ""}> Allow readers to comment on articles</label><p class="description">When off, readers can only read and share. Comments then need moderation in the Comments menu.</p></td></tr>
          <tr><th><label for="tl">Top bar links</label></th><td><textarea id="tl" name="toplinks" rows="5" class="large-text" style="max-width:560px">${esc(D.topLinks.map((l) => [l.label, l.href, (l.tr && l.tr.fr) || "", (l.tr && l.tr.ar) || ""].join(" | ").replace(/( \| )+$/, "")).join("\n"))}</textarea><p class="description">One link per line: <code>Label | address | French label | Arabic label</code>, e.g. <code>Botola Pro | category.html?c=botola | Botola Pro | البطولة الاحترافية</code></p></td></tr>
        </tbody></table>
        <p><button class="button button-primary">Save Changes</button></p>
      </form>
      ${server ? `<h2 style="font-size:1.3em;margin:30px 0 10px">Advertising (Google AdSense)</h2><div id="ads-box"><p class="description">Loading…</p></div>` : ""}
      ${server ? `<h2 style="font-size:1.3em;margin:30px 0 10px">Live scores</h2><div id="scores-box"><p class="description">Loading…</p></div>` : ""}
      <h2 style="font-size:1.3em;margin:30px 0 0">Administrator account</h2>
      ${server ? (server.canChange ? `
      <form data-form="server-password" autocomplete="off">
        <table class="form-table"><tbody>
          <tr><th><label for="spu">Username</label></th><td><input type="text" id="spu" name="user" class="regular-text" value="${esc(server.user)}" required autocomplete="username"></td></tr>
          <tr><th><label for="spc">Current password</label></th><td><input type="password" id="spc" name="current" class="regular-text" required autocomplete="current-password"></td></tr>
          <tr><th><label for="spn">New password</label></th><td><input type="password" id="spn" name="pw" class="regular-text" minlength="10" required autocomplete="new-password"><p class="description">At least 10 characters. Mix words, numbers and symbols.</p></td></tr>
          <tr><th><label for="spn2">Confirm new password</label></th><td><input type="password" id="spn2" name="pw2" class="regular-text" minlength="10" required autocomplete="new-password">
            <p class="description">${server.changed ? `Password last changed on ${fmtDate(server.changed)}.` : "You are using the password set on Cloudflare."} After changing it, your browser asks you to log in again with the new one.</p></td></tr>
        </tbody></table>
        <p><button class="button button-primary">Change password</button></p>
      </form>` : `<p>You are signed in as <b>${esc(server.user)}</b>. The admin password is the <code>ADMIN_PASSWORD</code> secret on Cloudflare.</p>`) : `
      <form data-form="password">
        <table class="form-table"><tbody>
          <tr><th><label for="pu">Username</label></th><td><input type="text" id="pu" name="user" class="regular-text" value="${esc(currentUser())}" required autocomplete="username"></td></tr>
          <tr><th><label for="pn">New password</label></th><td><input type="password" id="pn" name="pw" class="regular-text" minlength="8" required autocomplete="new-password"><p class="description">This password locks the dashboard in this browser. See the README for protecting the admin on the live site.</p></td></tr>
        </tbody></table>
        <p><button class="button">Update account</button></p>
      </form>`}`;
    return { title: "General Settings", menu: "settings", sub: "settings", html, after: () => { if (server) { adsBox(); scoresBox(); } } };
  }

  // Google AdSense: publisher ID, on/off, ad unit IDs (stored on Cloudflare, used by the Worker)
  async function adsBox() {
    const box = $("#ads-box");
    if (!box) return;
    let a;
    try { const r = await fetch("api/ads", { cache: "no-store" }); a = await r.json(); if (!r.ok) throw new Error(); }
    catch (e) { box.innerHTML = `<div class="notice notice-error"><p>Could not load the advertising settings.</p></div>`; return; }
    const sl = a.slots || {};
    const row = (k, label, help) => `<tr><th><label for="ad-${k}">${label}</label></th><td><input type="text" inputmode="numeric" id="ad-${k}" name="slot_${k}" class="regular-text" value="${esc(sl[k] || "")}" placeholder="1234567890"><p class="description">${help}</p></td></tr>`;
    box.innerHTML = `
      <form data-form="ads" autocomplete="off">
        <table class="form-table"><tbody>
          <tr><th><label for="ad-client">Publisher ID</label></th><td><input type="text" id="ad-client" name="client" class="regular-text" value="${esc(a.client || "")}" placeholder="ca-pub-1234567890123456">
            <p class="description">From AdSense → Account → Account information. Saving it adds the verification tag to every page and creates <a href="../ads.txt" target="_blank" rel="noopener">ads.txt</a>, so you can request a review right away.</p></td></tr>
          <tr><th>Show ads</th><td><label><input type="checkbox" name="enabled" ${a.enabled ? "checked" : ""}> Load Google AdSense on the site</label>
            <p class="description">Turn this on to add the AdSense code (needed for the review and for Auto ads). Ads only appear once Google has approved the site.</p></td></tr>
          ${row("top", "Ad unit: top banner", "Optional. Under the menu on every page (data-ad-slot of a display ad unit).")}
          ${row("sidebar", "Ad unit: sidebar", "Optional. At the top of the sidebar.")}
          ${row("section", "Ad unit: homepage", "Optional. Between the homepage sections.")}
          ${row("article", "Ad unit: inside articles", "Optional. After the second paragraph of each article (in-article ad unit).")}
        </tbody></table>
        <p class="description">With Auto ads switched on in AdSense, Google places ads by itself and these fields can stay empty.</p>
        <p><button class="button button-primary">Save advertising settings</button></p>
      </form>`;
  }

  // Live scores provider: ESPN (free, no key) or API-Football (key, saved on Cloudflare).
  async function scoresBox(test) {
    const box = $("#scores-box");
    if (!box) return;
    let s;
    try { const r = await fetch("api/scores" + (test ? "?test=1" : ""), { cache: "no-store" }); s = await r.json(); if (!r.ok) throw new Error(s.error); }
    catch (e) { box.innerHTML = `<div class="notice notice-error"><p>Could not load the live scores settings.</p></div>`; return; }
    const t = s.test;
    const usage = s.usage ? `${s.usage.remaining} of ${s.usage.limit} requests left today (checked ${fmtTime(s.usage.at.slice(0, 19)) || fmtDate(s.usage.at)})` : "";
    box.innerHTML = `
      <form data-form="scores-provider">
        <table class="form-table"><tbody>
          <tr><th>Source</th><td>
            <p style="margin:0 0 6px"><label><input type="radio" name="provider" value="auto" ${s.wanted === "auto" ? "checked" : ""}> <b>Automatic</b>: API-Football when a key is saved, otherwise ESPN</label></p>
            <p style="margin:0 0 6px"><label><input type="radio" name="provider" value="apifootball" ${s.wanted === "apifootball" ? "checked" : ""}> <b>API-Football</b> (official, all competitions; needs a key)</label></p>
            <p style="margin:0"><label><input type="radio" name="provider" value="espn" ${s.wanted === "espn" ? "checked" : ""}> <b>ESPN</b> (free, no key, unofficial, 40 competitions)</label></p>
            <p class="description">Now using: <b>${s.provider === "apifootball" ? "API-Football" : "ESPN"}</b>. If API-Football fails (no data, daily limit or plan), the site uses ESPN.</p></td></tr>
          <tr><th><label for="af-key">API-Football key</label></th><td>
            <input type="password" id="af-key" name="apiKey" class="regular-text" autocomplete="off" placeholder="${s.hasKey ? "Saved (" + esc(s.keyHint) + "). Type a new key to replace it" : "Paste your key from dashboard.api-football.com"}">
            ${s.hasKey ? ` <button type="button" class="button-link delete" data-act="af-remove">Remove key</button>` : ""}
            <p class="description">Free key at <a href="https://dashboard.api-football.com/register" target="_blank" rel="noopener">dashboard.api-football.com</a> (My Account → API key). Saved on Cloudflare only, never in the site's files.</p></td></tr>
          <tr><th><label for="af-day">Requests per day in your plan</label></th><td>
            <input type="number" id="af-day" name="perDay" class="small-text" style="width:100px" min="10" value="${s.perDay}">
            <p class="description">Free plan: 100 (today's scores refresh every ${Math.max(1, Math.ceil(1440 / 75))} minutes). Pro: 7500 (every minute). Now: every <b>${s.refreshMinutes} minute${s.refreshMinutes === 1 ? "" : "s"}</b>.</p></td></tr>
          ${s.hasKey ? `<tr><th>Status</th><td>
            ${t ? (t.ok ? `<div class="notice notice-success"><p>Connected. Plan: <b>${esc(t.plan || "?")}</b>${t.active === false ? " (inactive)" : ""} · ${t.used ?? "?"} of ${t.limit ?? "?"} requests used today${t.end ? " · renews " + esc(fmtDate(t.end)) : ""}.</p></div>` : `<div class="notice notice-error"><p>${esc(t.error || "The key was not accepted.")}</p></div>`) : ""}
            ${usage ? `<p class="description">${esc(usage)}</p>` : ""}
            ${s.lastError ? `<p class="description" style="color:#b32d2e">Last error (${esc(fmtDate(s.lastError.at))} ${esc(fmtTime(s.lastError.at.slice(0, 19)))}): ${esc(s.lastError.error)}</p>` : ""}
            <button type="button" class="button" data-act="af-test">Test connection</button></td></tr>` : ""}
        </tbody></table>
        <p><button class="button button-primary">Save live scores settings</button> <a class="button" href="../matches.html" target="_blank" rel="noopener">Open live scores</a></p>
      </form>`;
  }

  // ---------------- pages (About, Contact, Privacy…) ----------------
  const PAGE_STATUS = { publish: "Published", soon: "Coming soon", draft: "Draft" };
  function pagesList() {
    const html = `
      ${pageHead("Pages", `<a class="page-title-action" href="#/page/new">Add New Page</a>`)}
      <table class="list-table">
        <thead><tr><th>Title</th><th>Status</th><th class="hide-sm">Address</th></tr></thead>
        <tbody>${D.pages.map((pg) => `<tr>
          <td><strong><a class="row-title" href="#/page/${esc(pg.slug)}">${esc(pg.title)}</a></strong>
            <span class="lang-badges">${["fr", "ar"].map((l) => `<span class="lb ${pg.tr && pg.tr[l] && pg.tr[l].title ? "ok" : ""}" title="${LANGS[l]}">${l.toUpperCase()}</span>`).join("")}</span>
            <div class="row-actions"><span><a href="#/page/${esc(pg.slug)}">Edit</a></span><span><a href="../page.html?p=${encodeURIComponent(pg.slug)}${pg.status === "draft" ? "&preview=1" : ""}" target="_blank" rel="noopener">View</a></span>${["about", "contact", "advertise", "careers", "privacy", "terms"].includes(pg.slug) ? "" : `<span class="delete"><button type="button" data-act="page-delete" data-id="${esc(pg.slug)}">Delete</button></span>`}</div></td>
          <td><span class="page-status st-${esc(pg.status)}">${PAGE_STATUS[pg.status] || pg.status}</span></td>
          <td class="hide-sm"><code>page.html?p=${esc(pg.slug)}</code></td>
        </tr>`).join("") || `<tr class="empty"><td colspan="3">No pages yet.</td></tr>`}</tbody>
      </table>
      <p class="description">The footer links to About, Contact, Advertise, Careers, Privacy Policy and Terms of Use. "Coming soon" pages show a short notice and a "Soon" badge in the footer.</p>`;
    return { title: "Pages", menu: "pages", sub: "pages", html };
  }

  function pageEditor(r) {
    const slug = r.parts[1] || "new";
    const isNew = slug === "new";
    const orig = isNew ? null : D.pages.find((x) => x.slug === slug);
    if (!isNew && !orig) return { title: "Page not found", menu: "pages", sub: "pages", html: pageHead("Page not found") + `<p><a href="#/pages">Back to Pages</a></p>` };
    if (!work) work = isNew ? { slug: "", title: "", status: "draft", body: [], tr: {} } : clone(orig);
    const P = work; P.tr = P.tr || {};
    const EL = editLang;
    const F = EL === "en" ? P : (P.tr[EL] = P.tr[EL] || { title: "", body: [] });
    const dirAttr = EL === "ar" ? 'dir="rtl" lang="ar"' : "";
    const html = `
      ${pageHead(isNew ? "Add New Page" : "Edit Page", `<a class="page-title-action" href="#/pages">All Pages</a>`)}
      <form class="edit-cols" data-form="page" autocomplete="off">
        <div>
          <div class="ed-langs" role="tablist" aria-label="Language">
            ${[["en", "English (original)"], ["fr", "Français"], ["ar", "العربية"]].map(([l, name]) => `<button type="button" role="tab" aria-selected="${l === EL}" class="${l === EL ? "on" : ""}" data-act="pg-lang" data-v="${l}" lang="${l}">${esc(name)}${l !== "en" ? ` <span class="lb ${P.tr[l] && P.tr[l].title ? "ok" : ""}">${P.tr[l] && P.tr[l].title ? "✓" : "–"}</span>` : ""}</button>`).join("")}
          </div>
          <input type="text" class="title-input" name="title" value="${esc(F.title)}" placeholder="Add title" aria-label="Title" ${dirAttr}>
          <div class="editor">
            <div class="editor-tools"><span class="editor-help">Leave an empty line between paragraphs. **bold**, *italic*, [link](address), "## " for a heading.</span></div>
            <textarea name="body" aria-label="Page content" placeholder="Start writing…" ${dirAttr}>${esc((F.body || []).join("\n\n"))}</textarea>
          </div>
          ${slug === "contact" ? `<p class="description">The contact form is added below this text automatically. Messages arrive in Messages.</p>` : ""}
        </div>
        <div>
          <section class="postbox"><h2>Publish</h2>
            <div class="misc">
              <div class="misc-row"><label for="pg-st">Status:</label> <select id="pg-st" name="status">${Object.entries(PAGE_STATUS).map(([k, v]) => `<option value="${k}" ${P.status === k ? "selected" : ""}>${v}</option>`).join("")}</select></div>
              ${isNew ? "" : `<div class="misc-row">Address: <code>page.html?p=${esc(P.slug)}</code></div>`}
            </div>
            <div class="major"><span></span><button type="button" class="button button-primary button-large" data-act="save-page">${isNew ? "Publish" : "Update"}</button></div>
          </section>
        </div>
      </form>`;
    const after = () => $('form[data-form="page"]').addEventListener("input", () => (dirty = true));
    return { title: isNew ? "Add New Page" : "Edit Page", menu: "pages", sub: isNew ? "newpage" : "pages", html, after };
  }
  function capturePage() {
    const f = $('form[data-form="page"]');
    if (!f || !work) return;
    const body = f.body.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    if (editLang === "en") { work.title = f.title.value.trim(); work.body = body; }
    else work.tr[editLang] = { title: f.title.value.trim(), body };
    work.status = f.status.value;
  }

  // ---------------- messages from the contact form ----------------
  let msgUnread = 0, msgOpen = null;
  const TOPICS = { general: "General question", correction: "Correction", story: "Story idea", partnership: "Partnership or advertising", other: "Other" };
  function messages() {
    const html = `
      ${pageHead("Messages")}
      ${server ? `<div id="msg-box"><p class="description">Loading…</p></div>` : `<div class="notice notice-warning"><p>Messages from the contact form are stored on Cloudflare and can be read on the live site's admin.</p></div>`}
      <p class="description">Messages are kept for 12 months, as stated in the privacy policy.</p>`;
    const after = async () => {
      const box = $("#msg-box");
      if (!box) return;
      let list = [];
      try { const r = await fetch("api/messages", { cache: "no-store" }); list = (await r.json()).messages || []; }
      catch (e) { box.innerHTML = `<div class="notice notice-error"><p>Could not load the messages.</p></div>`; return; }
      msgUnread = list.filter((m) => !m.read).length;
      const badge = $('.menu-top a[href="#/messages"] .menu-badge');
      if (badge) { if (msgUnread) badge.textContent = msgUnread; else badge.remove(); }
      if (!list.length) { box.innerHTML = `<p>No messages yet. Messages sent from the <a href="../page.html?p=contact" target="_blank" rel="noopener">contact page</a> appear here.</p>`; return; }
      box.innerHTML = `
        <table class="list-table msg-table">
          <thead><tr><th>From</th><th>Message</th><th class="hide-sm">Date</th></tr></thead>
          <tbody>${list.map((m) => `<tr class="${m.read ? "" : "unapproved"}" data-msg="${esc(m.id)}">
            <td style="width:24%"><strong class="no-tr">${esc(m.name || "—")}</strong><br><span class="description">${esc(TOPICS[m.topic] || m.topic || "")}</span></td>
            <td><p class="no-tr" style="margin:0 0 4px">${esc(m.preview || "")}${(m.preview || "").length >= 140 ? "…" : ""}</p>
              <div class="row-actions"><span><button type="button" data-act="msg-open" data-id="${esc(m.id)}">Open</button></span><span><button type="button" data-act="msg-read" data-id="${esc(m.id)}" data-v="${m.read ? "unread" : "read"}">${m.read ? "Mark as unread" : "Mark as read"}</button></span><span class="delete"><button type="button" data-act="msg-delete" data-id="${esc(m.id)}">Delete</button></span></div></td>
            <td class="hide-sm date-col">${fmtDate(m.date)}<b>${fmtTime(m.date.slice(0, 19))}</b></td>
          </tr>`).join("")}</tbody>
        </table>`;
    };
    return { title: "Messages", menu: "messages", html, after };
  }
  async function msgAction(id, action) {
    await fetch("api/messages", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, action }) });
  }
  async function openMessage(id) {
    let m;
    try { const r = await fetch("api/messages?id=" + encodeURIComponent(id), { cache: "no-store" }); m = await r.json(); if (!r.ok) throw new Error(); }
    catch (e) { alert("Could not open the message."); return; }
    const reply = m.reply || "";
    const isMail = /@/.test(reply), digits = reply.replace(/[^\d+]/g, "");
    const wa = digits.length >= 9 ? "https://wa.me/" + digits.replace(/^\+/, "").replace(/^0(\d{9})$/, "212$1") : "";
    const md = modal("Message", `
      <div class="msg-detail">
        <p><b>From:</b> <span class="no-tr">${esc(m.name || "—")}</span></p>
        <p><b>Reply to:</b> <span class="no-tr">${reply ? esc(reply) : "—"}</span></p>
        <p><b>Subject:</b> ${esc(TOPICS[m.topic] || m.topic)}</p>
        <p><b>Date:</b> ${fmtDate(m.date)} ${fmtTime(m.date.slice(0, 19))} · ${esc((m.lang || "en").toUpperCase())}</p>
        <div class="msg-text no-tr" dir="auto">${esc(m.message).replace(/\n/g, "<br>")}</div>
      </div>`,
      `${isMail ? `<a class="button" href="mailto:${esc(reply)}?subject=${encodeURIComponent("KoraPulse")}">Reply by email</a>` : ""}${wa ? `<a class="button" href="${esc(wa)}" target="_blank" rel="noopener">Reply on WhatsApp</a>` : ""}<span style="flex:1"></span><button class="button-link delete" data-del>Delete</button><button class="button button-primary" data-done>Done</button>`);
    $("[data-done]", md.el).onclick = () => { md.close(); render(); };
    $("[data-del]", md.el).onclick = async () => { if (!confirm("Delete this message permanently?")) return; await msgAction(id, "delete"); md.close(); flash = { type: "success", text: "Message deleted." }; render(); };
  }

  // ---------------- QR codes ----------------
  const SITE_URL = "https://korapulse.space";
  let qrState = null;
  function qrPage() {
    const S = qrState || (qrState = { kind: "home", article: "", page: "", custom: "", lang: "", style: "square", fg: "#0d4f34", bg: "#ffffff", logo: true, frame: true, caption: "Scan to read KoraPulse", size: "1024" });
    const arts = D.articles.filter((a) => a.status === "publish").sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    const pgs = (D.pages || []).filter((p) => p.status !== "draft");
    const opt = (v, l, cur) => `<option value="${esc(v)}" ${v === cur ? "selected" : ""}>${esc(l)}</option>`;
    const html = `
      ${pageHead("QR Codes")}
      <p class="description">Make a free QR code for the website, an article, a page or any link. Print it on posters, add it to Instagram posts and stories, or put it on match-day flyers.</p>
      <form data-form="qr" class="qr-tool">
        <div class="qr-cols">
          <section class="postbox"><h2>1. What should the QR code open?</h2><div class="inside">
            <p><label for="qr-kind"><b>Link to</b></label><br>
              <select id="qr-kind" name="kind">
                ${opt("home", "KoraPulse home page", S.kind)}${opt("article", "An article", S.kind)}${opt("page", "A page (About, Contact…)", S.kind)}${opt("matches", "Live scores", S.kind)}${opt("instagram", "Instagram account", S.kind)}${opt("custom", "Another link", S.kind)}
              </select></p>
            <p data-show="article"><label for="qr-article"><b>Article</b></label><br><select id="qr-article" name="article" class="qr-wide">${arts.map((a) => opt(a.id, a.title, S.article || (arts[0] && arts[0].id))).join("")}</select></p>
            <p data-show="page"><label for="qr-page"><b>Page</b></label><br><select id="qr-page" name="page">${pgs.map((p) => opt(p.slug, p.title, S.page)).join("")}</select></p>
            <p data-show="custom"><label for="qr-custom"><b>Link</b></label><br><input id="qr-custom" name="custom" type="url" class="qr-wide no-tr" placeholder="https://" value="${esc(S.custom)}"></p>
            <p data-hide="instagram custom"><label for="qr-lang"><b>Language of the page</b></label><br>
              <select id="qr-lang" name="lang">${opt("", "English", S.lang)}${opt("fr", "Français", S.lang)}${opt("ar", "العربية", S.lang)}</select></p>
          </div></section>

          <section class="postbox"><h2>2. Style</h2><div class="inside">
            <p><b>Colours</b></p>
            <p class="qr-presets">
              <button type="button" class="button" data-act="qr-preset" data-fg="#0d4f34" data-bg="#ffffff">Green</button>
              <button type="button" class="button" data-act="qr-preset" data-fg="#111111" data-bg="#ffffff">Black</button>
              <button type="button" class="button" data-act="qr-preset" data-fg="#0d4f34" data-bg="#fff8e1">Green on cream</button>
            </p>
            <p class="qr-colors"><label>Code <input type="color" name="fg" value="${esc(S.fg)}"></label> <label>Background <input type="color" name="bg" value="${esc(S.bg)}"></label></p>
            <p><label for="qr-style"><b>Shape</b></label><br><select id="qr-style" name="style">${opt("square", "Squares (classic)", S.style)}${opt("dots", "Dots with round corners", S.style)}</select></p>
            <p><label><input type="checkbox" name="logo" ${S.logo ? "checked" : ""}> KoraPulse logo in the middle</label></p>
            <p><label><input type="checkbox" name="frame" ${S.frame ? "checked" : ""}> Green frame with the KoraPulse name</label></p>
            <p data-frame><label for="qr-caption"><b>Text under the code</b></label><br><input id="qr-caption" name="caption" class="qr-wide no-tr" maxlength="40" value="${esc(S.caption)}"></p>
            <p class="description" data-frame>Ideas: “Scan to read KoraPulse”, “Scannez pour lire”, “امسح للقراءة”.</p>
          </div></section>
        </div>

        <section class="postbox qr-out"><h2>3. Download</h2><div class="inside">
          <div class="qr-preview" id="qr-preview" aria-live="polite"></div>
          <div class="qr-side">
            <p><b>Opens:</b><br><a id="qr-url" class="no-tr qr-url" href="#" target="_blank" rel="noopener"></a></p>
            <div id="qr-warn"></div>
            <p><label for="qr-size"><b>PNG size</b></label><br><select id="qr-size" name="size">${opt("512", "Small (512 px): web, WhatsApp", S.size)}${opt("1024", "Medium (1024 px): Instagram", S.size)}${opt("2048", "Large (2048 px): printing", S.size)}</select></p>
            <p class="qr-btns">
              <button type="button" class="button button-primary" data-act="qr-png">${icons.download.replace('width="20" height="20"', 'width="16" height="16"')} Download PNG</button>
              <button type="button" class="button" data-act="qr-svg">${icons.download.replace('width="20" height="20"', 'width="16" height="16"')} Download SVG</button>
              <button type="button" class="button" data-act="qr-copy">${icons.link.replace('width="20" height="20"', 'width="16" height="16"')} Copy link</button>
            </p>
            <p class="description">PNG works everywhere (Instagram, WhatsApp, Word). SVG stays sharp at any size, for printers and designers. Always test the code with your phone camera before printing.</p>
          </div>
        </div></section>
      </form>`;
    const after = () => { const f = $('form[data-form="qr"]'); f.addEventListener("input", qrUpdate); f.addEventListener("change", qrUpdate); qrUpdate(); };
    return { title: "QR Codes", menu: "qr", html, after };
  }
  function qrRead() {
    const f = $('form[data-form="qr"]');
    if (!f) return null;
    const S = qrState;
    ["kind", "article", "page", "custom", "lang", "style", "fg", "bg", "caption", "size"].forEach((k) => { if (f[k]) S[k] = f[k].value; });
    S.logo = f.logo.checked; S.frame = f.frame.checked;
    const lq = S.lang ? "lang=" + S.lang : "";
    let url = "";
    if (S.kind === "home") url = SITE_URL + "/" + (lq ? "?" + lq : "");
    else if (S.kind === "article") url = S.article ? `${SITE_URL}/article.html?id=${encodeURIComponent(S.article)}${lq ? "&" + lq : ""}` : "";
    else if (S.kind === "page") url = S.page ? `${SITE_URL}/page.html?p=${encodeURIComponent(S.page)}${lq ? "&" + lq : ""}` : "";
    else if (S.kind === "matches") url = SITE_URL + "/matches.html" + (lq ? "?" + lq : "");
    else if (S.kind === "instagram") url = (D.site.social && D.site.social.instagram) || "https://www.instagram.com/kora_pulsee/";
    else { const c = S.custom.trim(); url = !c ? "" : /^[a-z][a-z0-9+.-]*:/i.test(c) ? c : "https://" + c; }
    return { S, url, f };
  }
  let qrLast = null;
  function qrUpdate() {
    const st = qrRead();
    if (!st) return;
    const { S, url, f } = st;
    $$("[data-show]", f).forEach((el) => (el.hidden = el.dataset.show !== S.kind));
    $$("[data-hide]", f).forEach((el) => (el.hidden = el.dataset.hide.split(" ").includes(S.kind)));
    $$("[data-frame]", f).forEach((el) => (el.hidden = !S.frame));
    const a = $("#qr-url"), box = $("#qr-preview"), warn = $("#qr-warn");
    a.textContent = url || "—"; a.href = url || "#";
    const bad = S.kind === "custom" && url && !/^(https?:\/\/[^\s.]+\.[^\s]+|mailto:\S+|tel:[\d+ ]+)$/i.test(url);
    const ct = window.KPQR.contrast(S.fg, S.bg);
    const w = [];
    if (bad) w.push("This link does not look right. Check it before printing.");
    if (ct.inverted) w.push("The code is lighter than the background. Many phones cannot scan that: use a dark code on a light background.");
    else if (ct.ratio < 4) w.push("The colours are too close. Use a darker code or a lighter background so phones can scan it.");
    warn.innerHTML = w.map((x) => `<div class="notice notice-warning inline"><p>${esc(x)}</p></div>`).join("");
    if (!url) { box.innerHTML = `<p class="description">Choose what the QR code should open.</p>`; qrLast = null; return; }
    try {
      qrLast = window.KPQR.svg({ text: url, fg: S.fg, bg: S.bg, style: S.style, logo: S.logo, frame: S.frame, frameColor: S.fg, caption: S.caption, rtl: /[؀-ۿ]/.test(S.caption) });
      qrLast.url = url;
      box.innerHTML = qrLast.svg;
    } catch (e) { qrLast = null; box.innerHTML = `<div class="notice notice-error inline"><p>This link is too long for a QR code.</p></div>`; }
  }
  function qrName() {
    const S = qrState;
    const base = S.kind === "article" ? S.article : S.kind === "page" ? S.page : S.kind === "custom" ? "link" : S.kind;
    return "korapulse-qr-" + String(base).replace(/[^a-z0-9-]/gi, "-").slice(0, 60) + (S.lang ? "-" + S.lang : "");
  }

  function tools() {
    const pend = unpublished();
    const html = `
      ${pageHead("Publish & Backup")}
      <div class="dash-cols">
        <div>
          <section class="postbox"><h2>Publish to the live site</h2><div class="inside">
            <p>Your edits are saved in this browser${D.updated ? ` (last change ${fmtDate(D.updated)} at ${fmtTime(D.updated)})` : ""}, and you can see them on the site in this browser right away. Visitors see the copy on your web host, so you need to publish your changes:</p>
            <ol style="padding-left:18px;line-height:1.8">
              <li>Download your site content as <code>data.js</code>.</li>
              <li>Replace <code>js/data.js</code> with it (on GitHub: open the file, then upload the new one).</li>
              <li>Your host redeploys the site (Cloudflare Pages does this automatically).</li>
            </ol>
            <p><button class="button button-primary button-large" data-act="export-js">${icons.download.replace('width="20" height="20"', 'width="16" height="16"')} Download data.js</button></p>
            <p class="description">${pend ? "<b style='color:#b32d2e'>You have changes that are not published yet.</b>" : "Everything has been downloaded for publishing."} ${storageMeter()}</p>
          </div></section>
        </div>
        <div>
          <section class="postbox"><h2>Backup</h2><div class="inside">
            <p>Keep a copy of all your content, or move it to another computer.</p>
            <p><button class="button" data-act="export-json">${icons.download.replace('width="20" height="20"', 'width="16" height="16"')} Download backup</button>
               <label class="button">${icons.upload.replace('width="20" height="20"', 'width="16" height="16"')} Restore from file<input type="file" accept=".json,.js,application/json,text/javascript" hidden data-import></label></p>
            <p class="description">You can restore a backup or a data.js file downloaded from this dashboard.</p>
          </div></section>
          <section class="postbox"><h2>Discard local changes</h2><div class="inside">
            <p>Throw away everything saved in this browser and go back to the content of the published data.js.</p>
            <p><button class="button-link delete" data-act="reset-local">Discard changes saved in this browser</button></p>
          </div></section>
        </div>
      </div>`;
    const after = () => {
      $("[data-import]").addEventListener("change", async (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const txt = await f.text();
        let data = null;
        try {
          const start = txt.indexOf("{"), end = txt.lastIndexOf("}");
          data = JSON.parse(txt.slice(start, end + 1));
        } catch (err) { data = null; }
        if (!data || !Array.isArray(data.articles)) { flash = { type: "error", text: "This file could not be read. Only backups and data.js files downloaded from this dashboard can be restored." }; render(); return; }
        if (!confirm(`Replace all current content with "${f.name}" (${data.articles.length} posts)?`)) { e.target.value = ""; return; }
        D = normalize(data);
        save("Content restored from " + f.name + ".");
        render();
      });
    };
    return { title: "Publish & Backup", menu: "settings", sub: "tools", html, after };
  }

  function download(name, text, type) {
    const blob = new Blob([text], { type });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }

  // ---------------- actions ----------------
  const confirmLeave = () => !dirty || confirm("You have unsaved changes. Leave this page anyway?");

  const ACT = {
    "menu-toggle": () => document.body.classList.toggle("menu-open"),
    "admin-lang": (b) => { if (!confirmLeave()) return; dirty = false; ls.set("kp-admin-lang", b.dataset.v); location.reload(); },
    dismiss: (b) => b.closest(".notice").remove(),
    "qr-preset": (b) => { const f = $('form[data-form="qr"]'); f.fg.value = b.dataset.fg; f.bg.value = b.dataset.bg; qrUpdate(); },
    "qr-svg": () => { if (qrLast) download(qrName() + ".svg", qrLast.svg, "image/svg+xml"); },
    "qr-png": async () => {
      if (!qrLast) return;
      const width = parseInt(qrState.size, 10) || 1024;
      try {
        const blob = await window.KPQR.png(qrLast.svg, qrLast.w, qrLast.h, width);
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = qrName() + ".png";
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      } catch (e) { alert("Could not make the PNG. Try the SVG download."); }
    },
    "qr-copy": async (b) => {
      if (!qrLast) return;
      try { await navigator.clipboard.writeText(qrLast.url); const t = b.lastChild.textContent; b.lastChild.textContent = " Copied!"; setTimeout(() => (b.lastChild.textContent = t), 1500); }
      catch (e) { prompt("Copy this link:", qrLast.url); }
    },
    "hide-welcome": () => { ls.set("kp-welcome-hidden", "1"); render(); },
    logout: () => { if (!confirmLeave()) return; dirty = false; if (server) { location.href = "logout"; return; } ls.del("kp-admin-session"); location.hash = ""; renderLogin({ type: "success", text: "You are now logged out." }); },
    "c-status": (b) => {
      const c = D.comments.find((x) => x.id === b.dataset.id);
      if (!c) return;
      const labels = { approved: "Comment approved.", pending: c.status === "approved" ? "Comment unapproved." : "Comment restored.", spam: "Comment marked as spam.", trash: "Comment moved to the Trash." };
      c.status = b.dataset.v;
      save(labels[c.status]); render();
    },
    "c-delete": (b) => { if (!confirm("Delete this comment permanently?")) return; D.comments = D.comments.filter((x) => x.id !== b.dataset.id); save("Comment deleted permanently."); render(); },
    "c-empty": (b) => { const st = b.dataset.v; if (!confirm(`Permanently delete all comments in ${st}?`)) return; D.comments = D.comments.filter((x) => x.status !== st); save("Comments deleted permanently."); render(); },
    "c-reply": (b) => { replyTo = b.dataset.id || null; render(); },
    "post-status": (b) => {
      const a = findPost(b.dataset.id);
      if (!a) return;
      a.status = b.dataset.v; a.modified = nowIso();
      if (a.status === "trash") a.featured = false;
      const inEditor = route().name === "post";
      save(a.status === "trash" ? "1 post moved to the Trash." : "1 post restored from the Trash.");
      dirty = false;
      if (inEditor) go("#/posts"); else render();
    },
    "post-delete": (b) => { if (!confirm("Delete this post permanently? This cannot be undone.")) return; D.articles = D.articles.filter((a) => a.id !== b.dataset.id); D.comments = D.comments.filter((c) => c.post !== b.dataset.id); save("1 post permanently deleted."); render(); },
    "post-feature": (b) => { D.articles.forEach((a) => (a.featured = a.id === b.dataset.id)); save("Homepage headline changed."); render(); },
    "empty-trash": () => { const n = D.articles.filter((a) => a.status === "trash").length; if (!confirm(`Permanently delete ${n} post(s) in the Trash?`)) return; const ids = new Set(D.articles.filter((a) => a.status === "trash").map((a) => a.id)); D.articles = D.articles.filter((a) => !ids.has(a.id)); D.comments = D.comments.filter((c) => !ids.has(c.post)); save(`${n} posts permanently deleted.`); render(); },
    "filter-posts": (b) => { const r = route(); const f = b.form; go(qs("#/posts", { status: r.q.get("status"), cat: f.cat.value, s: r.q.get("s") })); },
    "pg-lang": (b) => { capturePage(); editLang = b.dataset.v; const keep = dirty; render(); dirty = keep; },
    "save-page": () => {
      capturePage();
      const P = work, isNew = route().parts[1] === "new";
      if (!P.title) { alert("Please add a title first."); if (editLang !== "en") { editLang = "en"; render(); } return; }
      Object.keys(P.tr).forEach((l) => { if (!P.tr[l].title && !(P.tr[l].body || []).length) delete P.tr[l]; });
      if (isNew) {
        let slug = slugify(P.title) || "page", n = 2; const base = slug;
        while (D.pages.some((x) => x.slug === slug)) slug = base + "-" + n++;
        P.slug = slug; D.pages.push(P);
      } else D.pages[D.pages.findIndex((x) => x.slug === P.slug)] = P;
      dirty = false;
      if (!save()) { render(); return; }
      flash = { type: "success", html: `Page saved. <a href="../page.html?p=${encodeURIComponent(P.slug)}" target="_blank" rel="noopener">View page</a>` };
      work = clone(P); lastRoute = "page/" + P.slug;
      go("#/page/" + P.slug);
    },
    "page-delete": (b) => { if (!confirm("Delete this page?")) return; D.pages = D.pages.filter((x) => x.slug !== b.dataset.id); save("Page deleted."); render(); },
    "msg-open": (b) => openMessage(b.dataset.id),
    "msg-read": async (b) => { await msgAction(b.dataset.id, b.dataset.v); render(); },
    "msg-delete": async (b) => { if (!confirm("Delete this message permanently?")) return; await msgAction(b.dataset.id, "delete"); flash = { type: "success", text: "Message deleted." }; render(); },
    "ed-lang": (b) => { captureEditor(); editLang = b.dataset.v; const keep = dirty; render(); dirty = keep; },
    "save-post": (b) => savePost(b.dataset.v, { wasDraft: work && work.status !== "publish" }),
    "preview-post": () => {
      const w = window.open("about:blank", "_blank");
      const E = savePost(work.status === "publish" ? "keep" : "draft", { silent: true });
      if (!E) { if (w) w.close(); return; }
      const u = `../article.html?id=${encodeURIComponent(E.id)}${E.status === "publish" ? "" : "&preview=1"}`;
      if (w) w.location.href = u; else window.open(u, "_blank");
      render();
    },
    "add-media": () => pickMedia("Add media", "Insert into post", (m) => editorApi && editorApi.insert(`\n\n![${m.alt || ""}](media:${m.id})\n\n`)),
    "set-featured": () => pickMedia("Featured image", "Set featured image", (m) => { work.image = "media:" + m.id; dirty = true; editorApi && editorApi.featBox(); }),
    "cat-edit": (b) => { editCat = b.dataset.id; render(); $("#cn").focus(); },
    "cat-cancel": () => { editCat = null; render(); },
    "cat-delete": (b) => {
      const slug = b.dataset.id;
      if (D.categories.length < 2) { alert("You need at least one category."); return; }
      const target = D.categories.find((c) => c.slug !== slug);
      const n = D.articles.filter((a) => a.cat === slug).length;
      if (!confirm(`Delete the category "${catName(slug)}"?${n ? `\n\nIts ${n} post(s) will move to "${target.name}".` : ""}`)) return;
      D.articles.forEach((a) => { if (a.cat === slug) a.cat = target.slug; });
      D.categories = D.categories.filter((c) => c.slug !== slug);
      if (editCat === slug) editCat = null;
      save("Category deleted."); render();
    },
    "cat-move": (b) => { const i = +b.dataset.id, j = i + +b.dataset.v; [D.categories[i], D.categories[j]] = [D.categories[j], D.categories[i]]; save(); render(); },
    "row-add": (b) => {
      const form = b.form;
      if (route().name === "scores") { work = readScores(form); work.push({ comp: "Botola", home: "", hs: null, as: null, away: "", status: "20:00" }); }
      else { work = readTable(form); work.rows.push({ club: "", p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0 }); }
      dirty = true; render();
      const rows = $$("tbody tr"); const last = rows[rows.length - 1]; if (last) { const inp = last.querySelector('input[type="text"]'); inp && inp.focus(); }
    },
    "row-del": (b) => {
      const form = b.form, i = +b.dataset.id;
      if (route().name === "scores") { work = readScores(form); work.splice(i, 1); }
      else { work = readTable(form); work.rows.splice(i, 1); }
      dirty = true; render();
    },
    "user-edit": (b) => { editUser = b.dataset.id; render(); $("#un").focus(); },
    "user-cancel": () => { editUser = null; render(); },
    "user-delete": (b) => {
      const u = D.users.find((x) => x.id === b.dataset.id);
      const heir = D.users.find((x) => x.id !== u.id && (x.role === "Administrator" || x.role === "Editor")) || D.users.find((x) => x.id !== u.id);
      const n = D.articles.filter((a) => a.author === u.name).length;
      if (!confirm(`Delete ${u.name}?${n ? `\n\nTheir ${n} post(s) will be credited to ${heir.name}.` : ""}`)) return;
      D.articles.forEach((a) => { if (a.author === u.name) a.author = heir.name; });
      D.users = D.users.filter((x) => x.id !== u.id);
      save("User deleted."); render();
    },
    "af-test": (b) => { b.disabled = true; b.textContent = "Testing…"; scoresBox(true); },
    "af-remove": () => { if (confirm("Remove the API-Football key? The site will use ESPN.")) saveScores({ removeKey: true }, "API-Football key removed."); },
    "export-js": () => {
      const txt = `/* ${D.site.name} — site content.\n   Exported from the admin dashboard on ${new Date().toLocaleString("en-GB")}.\n   Replace js/data.js with this file and redeploy the site. */\nwindow.KP = ${JSON.stringify(D, null, 2)};\n`;
      download("data.js", txt, "text/javascript");
      ls.set("kp-exported", D.updated || "");
      flash = { type: "success", text: "data.js downloaded. Upload it to replace js/data.js to publish your changes." };
      render();
    },
    "export-json": () => download(`korapulse-backup-${today()}.json`, JSON.stringify(D, null, 2), "application/json"),
    "reset-local": () => {
      if (!confirm("Discard all changes saved in this browser? Anything you have not downloaded will be lost.")) return;
      ls.del("kp-data"); ls.del("kp-exported");
      location.reload();
    }
  };

  async function saveScores(payload, msg) {
    try {
      const r = await fetch("api/scores", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || r.status);
      flash = { type: "success", text: msg };
    } catch (e) { flash = { type: "error", text: "Could not save: " + e.message }; }
    render();
  }

  const FORMS = {
    qr: () => {},
    ads: async (f) => {
      const slots = { top: f.slot_top.value, sidebar: f.slot_sidebar.value, section: f.slot_section.value, article: f.slot_article.value };
      try {
        const r = await fetch("api/ads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ client: f.client.value, enabled: f.enabled.checked, slots }) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || r.status);
        flash = { type: "success", text: "Advertising settings saved." };
      } catch (e) { flash = { type: "error", text: "Could not save: " + e.message }; }
      render();
    },
    "scores-provider": (f) => saveScores({ provider: f.provider.value, apiKey: f.apiKey.value, perDay: f.perDay.value }, "Live scores settings saved."),
    setup: async (f) => {
      if (f.pw.value !== f.pw2.value) { renderLogin({ type: "error", text: "The passwords do not match." }); return; }
      const user = f.user.value.trim();
      ls.set(AUTH_KEY, JSON.stringify({ user, hash: await hashPw(user, f.pw.value) }));
      startSession(0.5);
      flash = { type: "success", text: `Account created. Welcome, ${user}!` };
      render();
    },
    login: async (f) => {
      const auth = getAuth();
      const user = f.user.value.trim();
      if (!auth || auth.user.toLowerCase() !== user.toLowerCase() || auth.hash !== await hashPw(auth.user, f.pw.value)) {
        renderLogin({ type: "error", text: "The username or password you entered is incorrect." });
        return;
      }
      startSession(f.remember.checked ? 14 : 0.5);
      render();
    },
    "quick-draft": (f) => {
      const title = f.title.value.trim();
      let id = slugify(title) || "draft", n = 2; const base = id;
      while (findPost(id)) id = base + "-" + n++;
      const body = f.content.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
      D.articles.push({ id, title, cat: D.categories[0] ? D.categories[0].slug : "news", tags: [], author: (D.users[0] || {}).name || currentUser(), date: today(), modified: nowIso(), excerpt: "", body, status: "draft" });
      save("Draft saved."); render();
    },
    "post-search": (f) => { const r = route(); go(qs("#/posts", { status: r.q.get("status"), cat: r.q.get("cat"), s: f.s.value.trim() })); },
    "bulk-posts": (f) => {
      const act = f.action.value;
      const ids = $$('input[name="ids"]:checked', f).map((x) => x.value);
      if (!act || !ids.length) return;
      if (act === "delete") {
        if (!confirm(`Permanently delete ${ids.length} post(s)?`)) return;
        D.articles = D.articles.filter((a) => !ids.includes(a.id));
        D.comments = D.comments.filter((c) => !ids.includes(c.post));
      } else {
        D.articles.forEach((a) => { if (ids.includes(a.id)) { a.status = act === "restore" ? "draft" : act; a.modified = nowIso(); if (a.status === "trash") a.featured = false; } });
      }
      save(`${ids.length} post${ids.length === 1 ? "" : "s"} updated.`); render();
    },
    "bulk-comments": (f) => {
      const act = f.action.value;
      const ids = $$('input[name="ids"]:checked', f).map((x) => x.value);
      if (!act || !ids.length) return;
      if (act === "delete") { if (!confirm(`Permanently delete ${ids.length} comment(s)?`)) return; D.comments = D.comments.filter((c) => !ids.includes(c.id)); }
      else D.comments.forEach((c) => { if (ids.includes(c.id)) c.status = act; });
      save(`${ids.length} comment${ids.length === 1 ? "" : "s"} updated.`); render();
    },
    reply: (f) => {
      const parent = D.comments.find((c) => c.id === f.dataset.id);
      if (!parent) return;
      parent.status = "approved";
      D.comments.push({ id: uid("c"), post: parent.post, name: D.site.name, text: f.text.value.trim(), date: nowIso(), status: "approved", admin: true, parent: parent.id });
      replyTo = null;
      save("Reply published."); render();
    },
    category: (f) => {
      const name = f.name.value.trim();
      const slug = slugify(f.slug.value || name);
      const subs = f.subs.value.split(",").map((s) => s.trim()).filter(Boolean);
      const trc = {};
      ["fr", "ar"].forEach((l) => {
        const nm = f["name_" + l].value.trim(), sb = f["subs_" + l].value.split(/[,،]/).map((x) => x.trim()).filter(Boolean);
        if (nm || sb.length) trc[l] = { name: nm, subs: sb };
      });
      if (!slug) return;
      const clash = D.categories.find((c) => c.slug === slug && c.slug !== editCat);
      if (clash) { flash = { type: "error", text: `A category with the slug "${slug}" already exists.` }; render(); return; }
      if (editCat) {
        const c = D.categories.find((x) => x.slug === editCat);
        D.articles.forEach((a) => { if (a.cat === editCat) a.cat = slug; });
        Object.assign(c, { name, slug, subs, tr: trc });
        editCat = null;
        save("Category updated.");
      } else {
        D.categories.push({ slug, name, subs, tr: trc });
        save("Category added.");
      }
      render();
    },
    scores: (f) => {
      D.scores = readScores(f).filter((m) => m.home.trim() || m.away.trim());
      D.site.ticker = f.mode.value;
      work = null; dirty = false;
      save("Live scores updated."); render();
    },
    table: (f) => {
      const t = readTable(f);
      t.rows = t.rows.filter((r) => r.club).sort((a, b) => b.pts - a.pts || b.gd - a.gd || a.club.localeCompare(b.club));
      D.standings = t;
      work = null; dirty = false;
      save("League table updated."); render();
    },
    user: (f) => {
      const name = f.name.value.trim(), role = f.role.value, bio = f.bio.value.trim();
      const trn = { fr: f.name_fr.value.trim(), ar: f.name_ar.value.trim() };
      if (D.users.some((u) => u.name.toLowerCase() === name.toLowerCase() && u.id !== editUser)) { flash = { type: "error", text: `There is already a user called ${name}.` }; render(); return; }
      if (editUser) {
        const u = D.users.find((x) => x.id === editUser);
        D.articles.forEach((a) => { if (a.author === u.name) a.author = name; });
        Object.assign(u, { name, role, bio, tr: trn });
        editUser = null;
        save("User updated.");
      } else {
        D.users.push({ id: uid("u"), name, role, bio, tr: trn });
        save("New user created.");
      }
      render();
    },
    settings: (f) => {
      D.site.name = f.name.value.trim();
      D.site.tagline = f.tagline.value.trim();
      D.site.email = f.email.value.trim();
      D.site.comments = f.comments.checked;
      ["instagram", "x", "facebook", "youtube", "tiktok", "linkedin"].forEach((k) => { D.site.social[k] = f["so-" + k].value.trim() || "#"; });
      D.topLinks = f.toplinks.value.split("\n").map((l) => l.split("|").map((x) => x.trim())).filter((p) => p[0] && p[1]).map(([label, href, fr, ar]) => ({ label, href, tr: { fr: fr || label, ar: ar || label } }));
      D.site.tr = D.site.tr || {};
      ["fr", "ar"].forEach((l) => { D.site.tr[l] = { ...(D.site.tr[l] || {}), tagline: f["tagline_" + l].value.trim() }; });
      save("Settings saved."); render();
    },
    "server-password": async (f) => {
      if (f.pw.value !== f.pw2.value) { flash = { type: "error", text: "The new passwords do not match." }; render(); return; }
      const btn = f.querySelector("button");
      btn.disabled = true; btn.textContent = "Saving…";
      let res, data = {};
      try {
        res = await fetch("api/password", { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ user: f.user.value.trim(), current: f.current.value, password: f.pw.value }) });
        data = await res.json().catch(() => ({}));
      } catch (e) { data = { error: "Could not reach the server. Check your connection." }; }
      if (!res || !res.ok) { flash = { type: "error", text: data.error || "The password could not be changed." }; render(); return; }
      app.innerHTML = `<div class="login"><div class="notice notice-success msg"><p><b>Password changed.</b> Log in again with your new password.</p></div><p><a class="button button-primary button-large" href="./">Log in</a></p></div>`;
    },
    password: async (f) => {
      const user = f.user.value.trim();
      ls.set(AUTH_KEY, JSON.stringify({ user, hash: await hashPw(user, f.pw.value) }));
      flash = { type: "success", text: "Administrator account updated." };
      render();
    }
  };

  // ---------------- global listeners ----------------
  app.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b && ACT[b.dataset.act]) { e.preventDefault(); ACT[b.dataset.act](b); return; }
    const all = e.target.closest("[data-checkall]");
    if (all) $$('input[name="ids"]', all.closest("form")).forEach((x) => (x.checked = all.checked));
  });
  document.body.addEventListener("click", (e) => {
    // actions inside modals (outside #app)
    const b = e.target.closest(".modal [data-act]");
    if (b && ACT[b.dataset.act]) { e.preventDefault(); ACT[b.dataset.act](b); }
  });
  app.addEventListener("submit", (e) => {
    const fn = FORMS[e.target.dataset.form];
    if (fn) { e.preventDefault(); fn(e.target); }
  });
  skipHash = false; prevHash = location.hash;
  addEventListener("hashchange", () => {
    if (skipHash) { skipHash = false; return; }
    if (dirty && !confirm("You have unsaved changes. Leave this page anyway?")) { skipHash = true; location.hash = prevHash; return; }
    dirty = false;
    prevHash = location.hash;
    render();
  });
  addEventListener("beforeunload", (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } });
  // keep the dashboard in sync if another tab (or the site's comment form) saves
  addEventListener("storage", (e) => {
    if (e.key === "kp-data" && e.newValue && !dirty) { try { D = normalize(JSON.parse(e.newValue)); render(); } catch (err) {} }
  });

  render();
  if (server) fetch("api/messages", { cache: "no-store" }).then((r) => r.json()).then((d) => { msgUnread = (d.messages || []).filter((m) => !m.read).length; if (msgUnread && loggedIn()) render(); }).catch(() => {});
})();
