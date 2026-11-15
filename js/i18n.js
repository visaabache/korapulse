/* KoraPulse — languages (English, Français, العربية).
   The language comes from ?lang=, then the visitor's last choice, then their browser, else English.
   UI text is translated with t("English text"); article/category text with tr(obj, field). */
(function () {
  const SUPPORTED = ["en", "fr", "ar"];
  const params = new URLSearchParams(location.search);
  let saved = null;
  try { saved = localStorage.getItem("kp-lang"); } catch (e) {}
  const browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  const lang = [params.get("lang"), saved, browser].find((l) => SUPPORTED.includes(l)) || "en";
  try { if (params.get("lang") && SUPPORTED.includes(params.get("lang"))) localStorage.setItem("kp-lang", lang); } catch (e) {}

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const S = {
    fr: {
      "Soon": "Bientôt", "Coming soon": "Bientôt disponible", "Your name": "Votre nom", "Email or phone (optional, to get a reply)": "E-mail ou téléphone (facultatif, pour recevoir une réponse)",
      "Subject": "Objet", "General question": "Question générale", "Correction": "Correction", "Story idea": "Idée de sujet", "Partnership or advertising": "Partenariat ou publicité", "Other": "Autre",
      "Message": "Message", "Send message": "Envoyer", "Please write a message of at least 10 characters.": "Écrivez un message d'au moins 10 caractères.",
      "Thank you! Your message has been sent to the KoraPulse team.": "Merci ! Votre message a été envoyé à l'équipe KoraPulse.", "Too many messages. Please try again later.": "Trop de messages. Réessayez plus tard.",
      "Your message could not be sent. Please try again later.": "Votre message n'a pas pu être envoyé. Réessayez plus tard.",
      "Skip to content": "Aller au contenu", "Live Scores": "Scores en direct", "Live": "Direct", "SCORES": "SCORES",
      "Open menu": "Ouvrir le menu", "Toggle dark mode": "Mode sombre", "Search": "Rechercher", "Close search": "Fermer la recherche",
      "Search players, clubs, competitions…": "Joueurs, clubs, compétitions…", "Home": "Accueil", "Language": "Langue",
      "Useful links": "Liens utiles", "About": "À propos", "Contact": "Contact", "Advertise": "Publicité", "Careers": "Carrières",
      "Privacy Policy": "Confidentialité", "Terms of Use": "Conditions d'utilisation", "Topics": "Rubriques", "Competitions": "Compétitions",
      "Botola Pro": "Botola Pro", "AFCON": "CAN", "CAF Champions League": "Ligue des champions CAF", "UEFA Champions League": "Ligue des champions UEFA", "World Cup 2030": "Mondial 2030",
      "Download our app": "Téléchargez notre appli", "GET IT ON": "DISPONIBLE SUR", "Download on the": "Télécharger dans l'",
      "All rights reserved.": "Tous droits réservés.", "{name} is not responsible for the content of external sites.": "{name} n'est pas responsable du contenu des sites externes.",
      "Back to top": "Haut de page", "Advertisement": "Publicité", "Opinion": "Opinion", "Read more": "Lire la suite", "Top stories": "À la une",
      "Follow {name}": "Suivez {name}", "Goals, transfers and breaking news on your favourite network.": "Buts, transferts et infos de dernière minute sur votre réseau préféré.",
      "Headlines": "À la une", "Latest news": "Dernières actualités", "See all →": "Tout voir →", "By {author}": "Par {author}", "{n} min read": "{n} min de lecture",
      "Illustration · {cat}": "Illustration · {cat}", "Preview: this draft is not visible to visitors.": "Aperçu : ce brouillon n'est pas visible par les lecteurs.",
      "Share": "Partager", "Share on Facebook": "Partager sur Facebook", "Share on X": "Partager sur X", "Share on WhatsApp": "Partager sur WhatsApp", "Share on Instagram": "Partager sur Instagram",
      "Copy link": "Copier le lien", "Link copied": "Lien copié", "Link copied: paste it in your Instagram story or message": "Lien copié : collez-le dans votre story ou message Instagram", "Copy this link:": "Copiez ce lien :",
      "Related": "À lire aussi", "{n} comments": "{n} commentaires", "1 comment": "1 commentaire", "Leave a comment": "Laisser un commentaire", "Join the conversation…": "Participez à la discussion…",
      "Name *": "Nom *", "Email (not published)": "E-mail (non publié)", "Post comment": "Publier", "Thanks! Your comment is awaiting moderation.": "Merci ! Votre commentaire est en attente de modération.",
      "Search results for “{q}”": "Résultats pour « {q} »", "All news": "Toutes les actualités", "{n} articles": "{n} articles", "1 article": "1 article", "All": "Tout",
      "No articles found. Try another search or": "Aucun article trouvé. Essayez une autre recherche ou", "go back to the homepage": "revenez à l'accueil", "Load more": "Plus d'articles",
      "Not yet translated: showing the original article.": "Pas encore traduit : article affiché dans sa version originale.",
      // live scores
      "Live scores": "Scores en direct", "Football from around the world": "Le football du monde entier", "loading…": "chargement…", "updated {t}": "mis à jour à {t}", "not available": "indisponible",
      "Day": "Jour", "Previous day": "Jour précédent", "Next day": "Jour suivant", "Choose a date": "Choisir une date", "Today": "Aujourd'hui", "Yesterday": "Hier", "Tomorrow": "Demain",
      "Search a team…": "Rechercher une équipe…", "Region": "Région", "Competition": "Compétition", "All regions": "Toutes les régions", "All competitions": "Toutes les compétitions",
      "Finished": "Terminés", "Upcoming": "À venir", "{n} live": "{n} en direct",
      "Morocco": "Maroc", "Africa": "Afrique", "Europe": "Europe", "Middle East": "Moyen-Orient", "Americas": "Amériques", "Asia": "Asie", "International": "International",
      "No matches are being played right now.": "Aucun match en cours pour le moment.", "No matches found.": "Aucun match trouvé.", "Try": "Essayez", "clearing the filters": "d'effacer les filtres", "or another day.": "ou un autre jour.", "Try another day.": "Essayez un autre jour.",
      "Live scores are not available right now.": "Les scores en direct sont indisponibles pour le moment.", "The score service did not answer. Please try again in a moment.": "Le service des scores ne répond pas. Réessayez dans un instant.", "Try again": "Réessayer",
      "Times are shown in your time zone.": "Heures affichées dans votre fuseau horaire.", "Scores refresh every {n} minutes.": "Scores actualisés toutes les {n} minutes.", "Scores update automatically while matches are live.": "Scores actualisés automatiquement pendant les matchs.", "Source: {s}.": "Source : {s}.",
      "HT": "MT", "FT": "Fin", "Postp.": "Reporté"
    },
    ar: {
      "Soon": "قريبا", "Coming soon": "قريبا", "Your name": "اسمك", "Email or phone (optional, to get a reply)": "البريد الإلكتروني أو الهاتف (اختياري، لتلقي الرد)",
      "Subject": "الموضوع", "General question": "سؤال عام", "Correction": "تصحيح", "Story idea": "فكرة موضوع", "Partnership or advertising": "شراكة أو إعلان", "Other": "أخرى",
      "Message": "الرسالة", "Send message": "إرسال", "Please write a message of at least 10 characters.": "اكتب رسالة من 10 أحرف على الأقل.",
      "Thank you! Your message has been sent to the KoraPulse team.": "شكرا! تم إرسال رسالتك إلى فريق كورابولس.", "Too many messages. Please try again later.": "رسائل كثيرة. حاول لاحقا.",
      "Your message could not be sent. Please try again later.": "تعذر إرسال رسالتك. حاول لاحقا.",
      "Skip to content": "انتقل إلى المحتوى", "Live Scores": "النتائج المباشرة", "Live": "مباشر", "SCORES": "النتائج",
      "Open menu": "فتح القائمة", "Toggle dark mode": "الوضع الداكن", "Search": "بحث", "Close search": "إغلاق البحث",
      "Search players, clubs, competitions…": "ابحث عن لاعبين وأندية ومسابقات…", "Home": "الرئيسية", "Language": "اللغة",
      "Useful links": "روابط مفيدة", "About": "من نحن", "Contact": "اتصل بنا", "Advertise": "أعلن معنا", "Careers": "وظائف",
      "Privacy Policy": "سياسة الخصوصية", "Terms of Use": "شروط الاستخدام", "Topics": "الأقسام", "Competitions": "المسابقات",
      "Botola Pro": "البطولة الاحترافية", "AFCON": "كأس أمم إفريقيا", "CAF Champions League": "دوري أبطال إفريقيا", "UEFA Champions League": "دوري أبطال أوروبا", "World Cup 2030": "مونديال 2030",
      "Download our app": "حمّل تطبيقنا", "GET IT ON": "متوفر على", "Download on the": "حمّله من",
      "All rights reserved.": "جميع الحقوق محفوظة.", "{name} is not responsible for the content of external sites.": "{name} غير مسؤول عن محتوى المواقع الخارجية.",
      "Back to top": "العودة إلى الأعلى", "Advertisement": "إعلان", "Opinion": "رأي", "Read more": "اقرأ المزيد", "Top stories": "أبرز الأخبار",
      "Follow {name}": "تابع {name}", "Goals, transfers and breaking news on your favourite network.": "الأهداف والانتقالات وآخر الأخبار على شبكتك المفضلة.",
      "Headlines": "عناوين", "Latest news": "آخر الأخبار", "See all →": "عرض الكل ←", "By {author}": "بقلم {author}", "{n} min read": "قراءة في {n} د",
      "Illustration · {cat}": "رسم توضيحي · {cat}", "Preview: this draft is not visible to visitors.": "معاينة: هذه المسودة غير ظاهرة للزوار.",
      "Share": "شارك", "Share on Facebook": "شارك على فيسبوك", "Share on X": "شارك على إكس", "Share on WhatsApp": "شارك على واتساب", "Share on Instagram": "شارك على إنستغرام",
      "Copy link": "نسخ الرابط", "Link copied": "تم نسخ الرابط", "Link copied: paste it in your Instagram story or message": "تم نسخ الرابط: الصقه في قصتك أو رسالتك على إنستغرام", "Copy this link:": "انسخ هذا الرابط:",
      "Related": "مقالات ذات صلة", "{n} comments": "{n} تعليقات", "1 comment": "تعليق واحد", "Leave a comment": "اترك تعليقا", "Join the conversation…": "شارك في النقاش…",
      "Name *": "الاسم *", "Email (not published)": "البريد الإلكتروني (لن يُنشر)", "Post comment": "نشر التعليق", "Thanks! Your comment is awaiting moderation.": "شكرا! تعليقك في انتظار المراجعة.",
      "Search results for “{q}”": "نتائج البحث عن «{q}»", "All news": "كل الأخبار", "{n} articles": "{n} مقالات", "1 article": "مقال واحد", "All": "الكل",
      "No articles found. Try another search or": "لم يتم العثور على مقالات. جرّب بحثا آخر أو", "go back to the homepage": "عد إلى الصفحة الرئيسية", "Load more": "المزيد من المقالات",
      "Not yet translated: showing the original article.": "لم يُترجم بعد: يُعرض المقال بلغته الأصلية.",
      "Live scores": "النتائج المباشرة", "Football from around the world": "كرة القدم من كل أنحاء العالم", "loading…": "جارٍ التحميل…", "updated {t}": "آخر تحديث {t}", "not available": "غير متاح",
      "Day": "اليوم", "Previous day": "اليوم السابق", "Next day": "اليوم التالي", "Choose a date": "اختر تاريخا", "Today": "اليوم", "Yesterday": "أمس", "Tomorrow": "غدا",
      "Search a team…": "ابحث عن فريق…", "Region": "المنطقة", "Competition": "المسابقة", "All regions": "كل المناطق", "All competitions": "كل المسابقات",
      "Finished": "انتهت", "Upcoming": "القادمة", "{n} live": "{n} مباشر",
      "Morocco": "المغرب", "Africa": "إفريقيا", "Europe": "أوروبا", "Middle East": "الشرق الأوسط", "Americas": "الأمريكيتان", "Asia": "آسيا", "International": "دولي",
      "No matches are being played right now.": "لا توجد مباريات جارية حاليا.", "No matches found.": "لم يتم العثور على مباريات.", "Try": "جرّب", "clearing the filters": "إزالة عوامل التصفية", "or another day.": "أو يوما آخر.", "Try another day.": "جرّب يوما آخر.",
      "Live scores are not available right now.": "النتائج المباشرة غير متاحة حاليا.", "The score service did not answer. Please try again in a moment.": "خدمة النتائج لم تستجب. حاول مجددا بعد قليل.", "Try again": "حاول مجددا",
      "Times are shown in your time zone.": "الأوقات معروضة حسب منطقتك الزمنية.", "Scores refresh every {n} minutes.": "تُحدَّث النتائج كل {n} دقيقة.", "Scores update automatically while matches are live.": "تُحدَّث النتائج تلقائيا أثناء المباريات.", "Source: {s}.": "المصدر: {s}.",
      "HT": "الاستراحة", "FT": "انتهت", "Postp.": "مؤجلة"
    }
  };
  const fill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v && v[k] != null ? v[k] : m));
  const t = (s, v) => fill((S[lang] && S[lang][s]) || s, v);
  // translated field of a content object (article, category…), falling back to the original
  const tr = (obj, field) => (obj && obj.tr && obj.tr[lang] && obj.tr[lang][field] != null && obj.tr[lang][field] !== "" ? obj.tr[lang][field] : obj ? obj[field] : "");
  const has = (obj) => lang === "en" || !!(obj && obj.tr && obj.tr[lang] && obj.tr[lang].title);
  const locale = { en: "en-GB", fr: "fr-FR", ar: "ar-MA" }[lang];
  // internal link in the current language
  const link = (href) => {
    if (lang === "en" || /^(https?:|mailto:|#)/.test(href)) return href;
    const [path, hash] = href.split("#");
    return path + (path.includes("?") ? "&" : "?") + "lang=" + lang + (hash ? "#" + hash : "");
  };
  window.KP_I18N = { lang, SUPPORTED, t, tr, has, locale, link, rtl: lang === "ar", names: { en: "English", fr: "Français", ar: "العربية" }, short: { en: "EN", fr: "FR", ar: "ع" } };
})();
