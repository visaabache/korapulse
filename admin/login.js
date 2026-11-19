/* KoraPulse admin login: sends the username and password to /admin/api/login, which sets
   a secure session cookie, then opens the dashboard (or the page that was asked for). */
(function () {
  const T = {
    en: { tagline: "Football news from Morocco, Africa and the world", p1: "Write and publish articles in three languages", p2: "Live scores, pages, messages and settings", p3: "Protected by a secure, encrypted login",
      title: "Welcome back", sub: "Log in to the KoraPulse dashboard", user: "Username", pass: "Password", show: "Show password", hide: "Hide password", caps: "Caps Lock is on",
      remember: "Keep me logged in for 14 days", login: "Log in", help: "Forgot your password? Ask the site owner to reset it in Cloudflare (see the README).", back: "← Back to KoraPulse",
      empty: "Enter your username and password.", wrong: "The username or password is incorrect.", left: "{n} attempts left before a 15-minute lock.", left1: "Last attempt before a 15-minute lock.", locked: "Too many wrong attempts. Try again in {n} minutes.",
      network: "Could not reach the server. Check your connection and try again.", out: "You are logged out. See you soon!", pageTitle: "Log in · KoraPulse admin" },
    fr: { tagline: "L'actualité du football au Maroc, en Afrique et dans le monde", p1: "Rédigez et publiez des articles en trois langues", p2: "Scores en direct, pages, messages et réglages", p3: "Protégé par une connexion sécurisée et chiffrée",
      title: "Bon retour", sub: "Connectez-vous au tableau de bord KoraPulse", user: "Identifiant", pass: "Mot de passe", show: "Afficher le mot de passe", hide: "Masquer le mot de passe", caps: "Verr. Maj activé",
      remember: "Rester connecté pendant 14 jours", login: "Se connecter", help: "Mot de passe oublié ? Demandez au propriétaire du site de le réinitialiser dans Cloudflare (voir le README).", back: "← Retour à KoraPulse",
      empty: "Saisissez votre identifiant et votre mot de passe.", wrong: "Identifiant ou mot de passe incorrect.", left: "Encore {n} essais avant un blocage de 15 minutes.", left1: "Dernier essai avant un blocage de 15 minutes.", locked: "Trop d'essais incorrects. Réessayez dans {n} minutes.",
      network: "Serveur injoignable. Vérifiez votre connexion et réessayez.", out: "Vous êtes déconnecté. À bientôt !", pageTitle: "Connexion · Admin KoraPulse" },
    ar: { tagline: "أخبار كرة القدم من المغرب وإفريقيا والعالم", p1: "اكتب وانشر المقالات بثلاث لغات", p2: "النتائج المباشرة والصفحات والرسائل والإعدادات", p3: "محمي بتسجيل دخول آمن ومشفر",
      title: "مرحبا بعودتك", sub: "سجّل الدخول إلى لوحة تحكم كورابولس", user: "اسم المستخدم", pass: "كلمة المرور", show: "إظهار كلمة المرور", hide: "إخفاء كلمة المرور", caps: "زر الأحرف الكبيرة مفعّل",
      remember: "إبقائي متصلا لمدة 14 يوما", login: "تسجيل الدخول", help: "نسيت كلمة المرور؟ اطلب من مالك الموقع إعادة تعيينها في Cloudflare (راجع README).", back: "← العودة إلى كورابولس",
      empty: "أدخل اسم المستخدم وكلمة المرور.", wrong: "اسم المستخدم أو كلمة المرور غير صحيحة.", left: "تبقى {n} محاولات قبل الحظر لمدة 15 دقيقة.", left1: "هذه آخر محاولة قبل الحظر لمدة 15 دقيقة.", locked: "محاولات خاطئة كثيرة. حاول مجددا بعد {n} دقيقة.",
      network: "تعذر الاتصال بالخادم. تحقق من اتصالك وحاول مجددا.", out: "تم تسجيل خروجك. إلى اللقاء!", pageTitle: "تسجيل الدخول · لوحة كورابولس" }
  };
  let lang = "en";
  try { lang = localStorage.getItem("kp-admin-lang") || ""; } catch (e) {}
  if (!T[lang]) { const b = (navigator.language || "en").slice(0, 2); lang = T[b] ? b : "en"; }
  const t = (k, v) => (T[lang][k] || T.en[k]).replace("{n}", v);

  const $ = (s) => document.querySelector(s);
  const form = $("#login"), msg = $("#msg"), btn = $("#submit"), eye = $("#eye");
  const params = new URLSearchParams(location.search);
  let lastMsg = params.get("out") ? ["ok", "out"] : null;

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("pageTitle");
    document.querySelectorAll("[data-t]").forEach((el) => (el.textContent = t(el.dataset.t)));
    eye.setAttribute("aria-label", t(eye.getAttribute("aria-pressed") === "true" ? "hide" : "show"));
    document.querySelectorAll("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
    if (lastMsg) show(lastMsg[0], lastMsg[1], lastMsg[2]);
  }
  function show(kind, key, n) {
    lastMsg = [kind, key, n];
    msg.hidden = false;
    msg.className = "msg " + kind;
    msg.textContent = key === "wrong" && n != null && n <= 5 ? t("wrong") + " " + (n == 1 ? t("left1") : t("left", n)) : t(key, n);
  }
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("kp-admin-lang", lang); } catch (e) {}
    apply();
  }));

  eye.addEventListener("click", () => {
    const on = eye.getAttribute("aria-pressed") !== "true";
    eye.setAttribute("aria-pressed", on);
    form.pass.type = on ? "text" : "password";
    eye.setAttribute("aria-label", t(on ? "hide" : "show"));
    form.pass.focus();
  });
  const caps = $("#caps");
  form.pass.addEventListener("keyup", (e) => { caps.hidden = !(e.getModifierState && e.getModifierState("CapsLock")); });
  [form.user, form.pass].forEach((i) => i.addEventListener("input", () => i.removeAttribute("aria-invalid")));

  // where to go after logging in (only pages of this admin)
  const next = (() => { const n = params.get("next") || ""; return /^\/admin\/(?!\/)/.test(n) && !/^\/admin\/(login|logout)/.test(n) ? n : "/admin/"; })();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = form.user.value.trim(), pass = form.pass.value;
    if (!user || !pass) {
      if (!user) form.user.setAttribute("aria-invalid", "true");
      if (!pass) form.pass.setAttribute("aria-invalid", "true");
      show("err", "empty");
      (user ? form.pass : form.user).focus();
      return;
    }
    btn.disabled = true;
    try {
      const r = await fetch("/admin/api/login", { method: "POST", headers: { "content-type": "application/json" }, credentials: "same-origin", body: JSON.stringify({ user, pass, remember: form.remember.checked }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) { location.replace(next); return; }
      if (r.status === 429) show("err", "locked", d.minutes || 15);
      else { show("err", "wrong", d.left); form.pass.value = ""; form.pass.setAttribute("aria-invalid", "true"); form.pass.focus(); }
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
    } catch (err) {
      show("err", "network");
    }
    btn.disabled = false;
  });

  apply();
})();
