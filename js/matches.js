/* KoraPulse — live scores page (matches.html). Data: /api/matches (see worker/matches.js). */
(function () {
  const main = document.getElementById("main");
  const L = window.KP_I18N, t = L.t;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const localDay = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (day, n) => { const d = new Date(day + "T12:00:00"); d.setDate(d.getDate() + n); return localDay(d); };
  const today = localDay(new Date());
  const timeOf = (iso) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  const dayLabel = (day) => day === today ? t("Today") : day === addDays(today, -1) ? t("Yesterday") : day === addDays(today, 1) ? t("Tomorrow")
    : new Date(day + "T12:00:00").toLocaleDateString(L.locale, { weekday: "short", day: "numeric", month: "short" });

  const p = new URLSearchParams(location.search);
  const state = {
    date: /^\d{4}-\d{2}-\d{2}$/.test(p.get("date") || "") ? p.get("date") : today,
    filter: ["all", "live", "post", "pre"].includes(p.get("f")) ? p.get("f") : "all",
    region: p.get("r") || "",
    league: p.get("c") || "",
    q: p.get("q") || ""
  };
  let data = null, error = false, loading = true, timer = null;
  // the heading written by the server for this day ("Football results Saturday 21 November 2026"…)
  const ssrH = main.querySelector(".ssr h1");
  const first = { date: state.date, h1: ssrH ? ssrH.textContent.trim() : "", title: document.title };
  const heading = () => (state.date === first.date && first.h1 ? first.h1 : `${t("Live scores")} · ${dayLabel(state.date)}`);

  function saveUrl() {
    const q = new URLSearchParams();
    if (state.date !== today) q.set("date", state.date);
    if (state.filter !== "all") q.set("f", state.filter);
    if (state.region) q.set("r", state.region);
    if (state.league) q.set("c", state.league);
    if (state.q) q.set("q", state.q);
    if (L.lang !== "en") q.set("lang", L.lang);
    history.replaceState(null, "", location.pathname + (q.toString() ? "?" + q : ""));
  }

  // matches of the chosen local day, per league
  function leaguesOfDay() {
    if (!data) return [];
    return data.leagues.map((l) => ({ ...l, matches: l.matches.filter((m) => data.dayFiltered || localDay(new Date(m.start)) === state.date || (state.date === today && m.state === "in")).sort((a, b) => a.start.localeCompare(b.start)) }))
      .filter((l) => l.matches.length);
  }
  const isLive = (m) => m.state === "in";
  const passes = (m) => state.filter === "all" || (state.filter === "live" ? isLive(m) : state.filter === "post" ? m.state === "post" || m.state === "off" : m.state === "pre");

  function shell() {
    main.innerHTML = `
      <div class="container ms">
        <header class="ms-head">
          <nav class="crumbs" aria-label="Breadcrumb"><a href="${L.link("index.html")}">${t("Home")}</a> › ${t("Live scores")}</nav>
          <h1 class="h-serif" id="ms-h1">${esc(heading())}</h1>
          <p class="ms-sub">${t("Football from around the world")} · <span id="ms-updated">${t("loading…")}</span></p>
        </header>
        <div class="ms-dates" role="group" aria-label="${t("Day")}">
          <button class="ms-arrow" data-day="-1" aria-label="${t("Previous day")}">${L.rtl ? "›" : "‹"}</button>
          <div class="ms-daylist" id="ms-days"></div>
          <button class="ms-arrow" data-day="1" aria-label="${t("Next day")}">${L.rtl ? "‹" : "›"}</button>
          <label class="ms-pick" title="${t("Choose a date")}"><input type="date" id="ms-date" aria-label="${t("Choose a date")}"></label>
        </div>
        <div class="ms-bar">
          <div class="ms-tabs" role="tablist" id="ms-tabs"></div>
          <div class="ms-filters">
            <input type="search" id="ms-q" placeholder="${t("Search a team…")}" aria-label="${t("Search a team…")}">
            <select id="ms-region" aria-label="${t("Region")}"></select>
            <select id="ms-league" aria-label="${t("Competition")}"></select>
          </div>
        </div>
        <div id="ms-list" aria-live="polite"></div>
        <p class="ms-foot" id="ms-foot"></p>
      </div>`;
    main.querySelectorAll("[data-day]").forEach((b) => b.addEventListener("click", () => setDate(addDays(state.date, +b.dataset.day))));
    const di = document.getElementById("ms-date");
    di.value = state.date;
    di.addEventListener("change", () => di.value && setDate(di.value));
    const q = document.getElementById("ms-q");
    q.value = state.q;
    q.addEventListener("input", () => { state.q = q.value.trim(); saveUrl(); draw(); });
    document.getElementById("ms-region").addEventListener("change", (e) => { state.region = e.target.value; state.league = ""; saveUrl(); draw(); });
    document.getElementById("ms-league").addEventListener("change", (e) => { state.league = e.target.value; saveUrl(); draw(); });
  }

  function setDate(day) {
    state.date = day;
    document.getElementById("ms-date").value = day;
    document.getElementById("ms-h1").textContent = heading();
    document.title = state.date === first.date ? first.title : `${heading()} | ${first.title.split(" | ").pop() || "KoraPulse"}`;
    saveUrl();
    load();
  }

  function draw() {
    // day buttons
    document.getElementById("ms-days").innerHTML = [-2, -1, 0, 1, 2].map((n) => {
      const d = addDays(state.date, n);
      return `<button class="${d === state.date ? "on" : ""}" data-set="${d}">${esc(dayLabel(d))}</button>`;
    }).join("");
    document.querySelectorAll("[data-set]").forEach((b) => b.addEventListener("click", () => setDate(b.dataset.set)));

    const all = leaguesOfDay();
    const regions = [...new Set(all.map((l) => l.region))];
    const inRegion = all.filter((l) => !state.region || l.region === state.region);
    const regionSel = document.getElementById("ms-region");
    regionSel.innerHTML = `<option value="">${t("All regions")}</option>` + regions.map((r) => `<option value="${esc(r)}" ${r === state.region ? "selected" : ""}>${esc(t(r))}</option>`).join("");
    const leagueSel = document.getElementById("ms-league");
    leagueSel.innerHTML = `<option value="">${t("All competitions")}</option>` + inRegion.map((l) => `<option value="${esc(l.id)}" ${l.id === state.league ? "selected" : ""}>${esc(l.country ? `${l.country}: ${l.name}` : l.name)}</option>`).join("");

    const q = state.q.toLowerCase();
    const scoped = inRegion.filter((l) => !state.league || l.id === state.league)
      .map((l) => ({ ...l, matches: l.matches.filter((m) => !q || (m.home.name + " " + m.away.name + " " + m.home.short + " " + m.away.short).toLowerCase().includes(q)) }))
      .filter((l) => l.matches.length);
    const count = (f) => scoped.reduce((n, l) => n + l.matches.filter((m) => f === "all" || (f === "live" ? isLive(m) : f === "post" ? m.state === "post" || m.state === "off" : m.state === "pre")).length, 0);
    document.getElementById("ms-tabs").innerHTML = [["all", t("All")], ["live", t("Live")], ["post", t("Finished")], ["pre", t("Upcoming")]].map(([k, l]) =>
      `<button role="tab" aria-selected="${state.filter === k}" class="${state.filter === k ? "on" : ""} ${k === "live" ? "tab-live" : ""}" data-f="${k}">${k === "live" ? '<span class="dot"></span>' : ""}${l} <span class="n">${count(k)}</span></button>`).join("");
    document.querySelectorAll("[data-f]").forEach((b) => b.addEventListener("click", () => { state.filter = b.dataset.f; saveUrl(); draw(); }));

    const shown = scoped.map((l) => ({ ...l, matches: l.matches.filter(passes) })).filter((l) => l.matches.length);
    const list = document.getElementById("ms-list");
    if (loading && !data) { list.innerHTML = `<div class="ms-skel">${'<div class="sk"></div>'.repeat(6)}</div>`; return; }
    if (error && !data) {
      list.innerHTML = `<div class="ms-empty"><p><b>${t("Live scores are not available right now.")}</b></p><p>${t("The score service did not answer. Please try again in a moment.")}</p><button class="btn" id="ms-retry">${t("Try again")}</button></div>`;
      document.getElementById("ms-retry").onclick = load;
      return;
    }
    if (!shown.length) {
      const why = state.filter === "live" ? t("No matches are being played right now.") : t("No matches found.");
      list.innerHTML = `<div class="ms-empty"><p><b>${why}</b></p><p>${state.filter !== "all" || state.q || state.region || state.league ? `${t("Try")} <button class="link" id="ms-clear">${t("clearing the filters")}</button> ${t("or another day.")}` : t("Try another day.")}</p></div>`;
      const c = document.getElementById("ms-clear");
      if (c) c.onclick = () => { Object.assign(state, { filter: "all", region: "", league: "", q: "" }); document.getElementById("ms-q").value = ""; saveUrl(); draw(); };
      return;
    }
    list.innerHTML = shown.map((l) => {
      const live = l.matches.filter(isLive).length;
      return `<section class="ms-league">
        <header>${l.logo ? `<img src="${esc(l.logo)}" alt="" loading="lazy" width="24" height="24">` : '<span class="ms-nologo"></span>'}
          <div><h2>${esc(l.name)}</h2><span>${esc(l.country || t(l.region))}</span></div>${live ? `<span class="ms-livecount"><span class="dot"></span>${t("{n} live", { n: live })}</span>` : ""}</header>
        ${l.matches.map(row).join("")}
      </section>`;
    }).join("");
  }

  function row(m) {
    const st = m.state;
    const time = st === "in" ? (m.halftime ? t("HT") : esc(m.clock || m.detail || t("Live"))) : st === "post" ? esc(/AET|Pen/i.test(m.detail) ? m.detail : t("FT")) : st === "off" ? t("Postp.") : timeOf(m.start);
    const team = (t) => `<div class="ms-team ${t.winner ? "win" : ""}">${t.logo ? `<img src="${esc(t.logo)}" alt="" loading="lazy" width="20" height="20">` : '<span class="ms-nologo sm"></span>'}<span>${esc(t.name)}</span></div>`;
    const score = (t) => `<b>${st === "pre" || st === "off" || t.score == null ? "" : esc(t.score)}</b>`;
    return `<div class="ms-row st-${st}" title="${esc(m.venue)}">
      <span class="ms-time">${time}</span>
      <div class="ms-teams">${team(m.home)}${team(m.away)}</div>
      <div class="ms-scores">${score(m.home)}${score(m.away)}</div>
    </div>`;
  }

  async function load() {
    clearTimeout(timer);
    loading = true; draw();
    try {
      const r = await fetch(`/api/matches?date=${state.date.replace(/-/g, "")}`, { cache: "no-store" });
      if (!r.ok) throw new Error(r.status);
      data = await r.json();
      error = false;
    } catch (e) {
      error = true;
      if (data && data.date !== state.date.replace(/-/g, "")) data = null;
    }
    loading = false;
    const foot = document.getElementById("ms-foot");
    if (foot) foot.textContent = data ? `${t("Times are shown in your time zone.")} ${data.refresh > 1 ? t("Scores refresh every {n} minutes.", { n: data.refresh }) : t("Scores update automatically while matches are live.")} ${t("Source: {s}.", { s: data.source || "ESPN" })}` : "";
    const up = document.getElementById("ms-updated");
    if (up) up.textContent = data ? t("updated {t}", { t: new Date(data.updated).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }) }) : t("not available");
    draw();
    // refresh while the chosen day is today (or matches are live)
    const anyLive = leaguesOfDay().some((l) => l.matches.some(isLive));
    if (state.date === today || anyLive) timer = setTimeout(() => { if (!document.hidden) load(); else timer = setTimeout(load, 30000); }, 30000);
  }
  document.addEventListener("visibilitychange", () => { if (!document.hidden && state.date === today && !loading) load(); });

  shell();
  load();
})();
