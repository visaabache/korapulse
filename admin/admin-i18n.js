/* KoraPulse admin — interface in English, Français or العربية (switch in the admin bar).
   The dashboard is written in English; this file translates what it shows on screen
   (texts, placeholders, tooltips, messages and confirmations) using the tables below.
   Texts not listed stay in English. Articles and other content are never changed. */
(function () {
  let lang = "en";
  try { lang = localStorage.getItem("kp-admin-lang") || ""; } catch (e) {}
  if (!["en", "fr", "ar"].includes(lang)) lang = ((navigator.language || "en").slice(0, 2) === "fr" ? "fr" : (navigator.language || "").slice(0, 2) === "ar" ? "ar" : "en");
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  window.KP_ADMIN_I18N = { lang };
  if (lang === "en") return;

  // [English, Français, العربية]
  const ROWS = [
    // QR codes
    ["QR Codes", "Codes QR", "رموز QR"],
    ["Make a free QR code for the website, an article, a page or any link. Print it on posters, add it to Instagram posts and stories, or put it on match-day flyers.", "Créez gratuitement un code QR pour le site, un article, une page ou n'importe quel lien. Imprimez-le sur des affiches, ajoutez-le à vos publications et stories Instagram ou à vos flyers de match.", "أنشئ مجانا رمز QR للموقع أو لمقال أو صفحة أو أي رابط. اطبعه على الملصقات، أو أضفه إلى منشورات وقصص إنستغرام، أو إلى منشورات أيام المباريات."],
    ["1. What should the QR code open?", "1. Que doit ouvrir le code QR ?", "1. ماذا يفتح رمز QR؟"],
    ["Link to", "Lien vers", "رابط إلى"],
    ["KoraPulse home page", "Page d'accueil KoraPulse", "الصفحة الرئيسية لكورابولس"],
    ["An article", "Un article", "مقال"],
    ["A page (About, Contact…)", "Une page (À propos, Contact…)", "صفحة (من نحن، اتصل بنا…)"],
    ["Instagram account", "Compte Instagram", "حساب إنستغرام"],
    ["Another link", "Un autre lien", "رابط آخر"],
    ["Article", "Article", "المقال"],
    ["Page", "Page", "الصفحة"],
    ["Link", "Lien", "الرابط"],
    ["Language of the page", "Langue de la page", "لغة الصفحة"],
    ["2. Style", "2. Style", "2. التصميم"],
    ["Colours", "Couleurs", "الألوان"],
    ["Green", "Vert", "أخضر"],
    ["Black", "Noir", "أسود"],
    ["Green on cream", "Vert sur crème", "أخضر على كريمي"],
    ["Code", "Code", "الرمز"],
    ["Background", "Fond", "الخلفية"],
    ["Shape", "Forme", "الشكل"],
    ["Squares (classic)", "Carrés (classique)", "مربعات (كلاسيكي)"],
    ["Dots with round corners", "Points et coins arrondis", "نقاط بزوايا دائرية"],
    ["KoraPulse logo in the middle", "Logo KoraPulse au centre", "شعار كورابولس في الوسط"],
    ["Green frame with the KoraPulse name", "Cadre vert avec le nom KoraPulse", "إطار أخضر مع اسم كورابولس"],
    ["Text under the code", "Texte sous le code", "النص أسفل الرمز"],
    ["Ideas: “Scan to read KoraPulse”, “Scannez pour lire”, “امسح للقراءة”.", "Idées : « Scan to read KoraPulse », « Scannez pour lire », « امسح للقراءة ».", "أفكار: «Scan to read KoraPulse»، «Scannez pour lire»، «امسح للقراءة»."],
    ["3. Download", "3. Télécharger", "3. التحميل"],
    ["Opens:", "Ouvre :", "يفتح:"],
    ["PNG size", "Taille du PNG", "حجم PNG"],
    ["Small (512 px): web, WhatsApp", "Petit (512 px) : web, WhatsApp", "صغير (512 بكسل): الويب وواتساب"],
    ["Medium (1024 px): Instagram", "Moyen (1024 px) : Instagram", "متوسط (1024 بكسل): إنستغرام"],
    ["Large (2048 px): printing", "Grand (2048 px) : impression", "كبير (2048 بكسل): الطباعة"],
    ["Download PNG", "Télécharger en PNG", "تحميل PNG"],
    ["Download SVG", "Télécharger en SVG", "تحميل SVG"],
    ["Copy link", "Copier le lien", "نسخ الرابط"],
    ["Copied!", "Copié !", "تم النسخ!"],
    ["PNG works everywhere (Instagram, WhatsApp, Word). SVG stays sharp at any size, for printers and designers. Always test the code with your phone camera before printing.", "Le PNG fonctionne partout (Instagram, WhatsApp, Word). Le SVG reste net à toutes les tailles, pour les imprimeurs et graphistes. Testez toujours le code avec l'appareil photo de votre téléphone avant d'imprimer.", "يعمل PNG في كل مكان (إنستغرام، واتساب، وورد)، ويبقى SVG واضحا بأي حجم للمطابع والمصممين. اختبر الرمز دائما بكاميرا هاتفك قبل الطباعة."],
    ["Choose what the QR code should open.", "Choisissez ce que le code QR doit ouvrir.", "اختر ما يجب أن يفتحه رمز QR."],
    ["This link does not look right. Check it before printing.", "Ce lien semble incorrect. Vérifiez-le avant d'imprimer.", "يبدو أن هذا الرابط غير صحيح. تحقق منه قبل الطباعة."],
    ["The code is lighter than the background. Many phones cannot scan that: use a dark code on a light background.", "Le code est plus clair que le fond. Beaucoup de téléphones ne peuvent pas le lire : utilisez un code foncé sur un fond clair.", "الرمز أفتح من الخلفية، ولا تستطيع هواتف كثيرة قراءته: استعمل رمزا داكنا على خلفية فاتحة."],
    ["The colours are too close. Use a darker code or a lighter background so phones can scan it.", "Les couleurs sont trop proches. Utilisez un code plus foncé ou un fond plus clair pour que les téléphones puissent le lire.", "الألوان متقاربة جدا. استعمل رمزا أغمق أو خلفية أفتح حتى تتمكن الهواتف من قراءته."],
    ["This link is too long for a QR code.", "Ce lien est trop long pour un code QR.", "هذا الرابط طويل جدا بالنسبة لرمز QR."],
    ["Could not make the PNG. Try the SVG download.", "Impossible de créer le PNG. Essayez le téléchargement SVG.", "تعذر إنشاء ملف PNG. جرّب تحميل SVG."],
    ["Copy this link:", "Copiez ce lien :", "انسخ هذا الرابط:"],
    // shell
    ["Advertising (Google AdSense)", "Publicité (Google AdSense)", "الإعلانات (Google AdSense)"], ["Publisher ID", "ID d'éditeur", "معرّف الناشر"], ["Show ads", "Afficher les annonces", "عرض الإعلانات"],
    ["Load Google AdSense on the site", "Charger Google AdSense sur le site", "تحميل Google AdSense في الموقع"], ["Ad unit: top banner", "Bloc d'annonces : bannière du haut", "وحدة إعلانية: الشريط العلوي"],
    ["Ad unit: sidebar", "Bloc d'annonces : colonne", "وحدة إعلانية: العمود الجانبي"], ["Ad unit: homepage", "Bloc d'annonces : accueil", "وحدة إعلانية: الصفحة الرئيسية"], ["Ad unit: inside articles", "Bloc d'annonces : dans les articles", "وحدة إعلانية: داخل المقالات"],
    ["Save advertising settings", "Enregistrer les réglages publicitaires", "حفظ إعدادات الإعلانات"], ["Advertising settings saved.", "Réglages publicitaires enregistrés.", "تم حفظ إعدادات الإعلانات."], ["Could not load the advertising settings.", "Impossible de charger les réglages publicitaires.", "تعذر تحميل إعدادات الإعلانات."],
    ["Turn this on to add the AdSense code (needed for the review and for Auto ads). Ads only appear once Google has approved the site.", "Activez cette option pour ajouter le code AdSense (nécessaire pour l'examen et les annonces automatiques). Les annonces n'apparaissent qu'après l'approbation du site par Google.", "فعّل هذا الخيار لإضافة كود AdSense (ضروري للمراجعة وللإعلانات التلقائية). لا تظهر الإعلانات إلا بعد موافقة Google على الموقع."],
    ["With Auto ads switched on in AdSense, Google places ads by itself and these fields can stay empty.", "Avec les annonces automatiques activées dans AdSense, Google place les annonces lui-même et ces champs peuvent rester vides.", "عند تفعيل الإعلانات التلقائية في AdSense، تضع Google الإعلانات بنفسها ويمكن ترك هذه الحقول فارغة."],
    ["Pages", "Pages", "الصفحات"], ["All Pages", "Toutes les pages", "كل الصفحات"], ["Add New Page", "Ajouter une page", "إضافة صفحة"], ["Edit Page", "Modifier la page", "تعديل الصفحة"],
    ["Coming soon", "Bientôt disponible", "قريبا"], ["Address", "Adresse", "العنوان"], ["Address:", "Adresse :", "العنوان:"], ["No pages yet.", "Aucune page.", "لا توجد صفحات."], ["Page content", "Contenu de la page", "محتوى الصفحة"],
    ["The footer links to About, Contact, Advertise, Careers, Privacy Policy and Terms of Use. \"Coming soon\" pages show a short notice and a \"Soon\" badge in the footer.", "Le pied de page renvoie vers À propos, Contact, Publicité, Carrières, Confidentialité et Conditions d'utilisation. Les pages « Bientôt disponible » affichent un court message et un badge « Bientôt » dans le pied de page.", "يتضمن أسفل الموقع روابط من نحن واتصل بنا والإعلان والوظائف وسياسة الخصوصية وشروط الاستخدام. وتعرض صفحات «قريبا» رسالة قصيرة وشارة «قريبا» في أسفل الموقع."],
    ["Leave an empty line between paragraphs. **bold**, *italic*, [link](address), \"## \" for a heading.", "Laissez une ligne vide entre les paragraphes. **gras**, *italique*, [lien](adresse), « ## » pour un intertitre.", "اترك سطرا فارغا بين الفقرات. **غامق**، *مائل*، [رابط](العنوان)، و«## » لعنوان فرعي."],
    ["The contact form is added below this text automatically. Messages arrive in Messages.", "Le formulaire de contact s'ajoute automatiquement sous ce texte. Les messages arrivent dans Messages.", "يُضاف نموذج الاتصال تلقائيا أسفل هذا النص، وتصل الرسائل إلى قسم الرسائل."],
    ["Page saved.", "Page enregistrée.", "تم حفظ الصفحة."], ["View page", "Voir la page", "عرض الصفحة"], ["Page deleted.", "Page supprimée.", "تم حذف الصفحة."], ["Delete this page?", "Supprimer cette page ?", "حذف هذه الصفحة؟"], ["Page not found", "Page introuvable", "الصفحة غير موجودة"], ["Back to Pages", "Retour aux pages", "العودة إلى الصفحات"],
    ["Messages", "Messages", "الرسائل"], ["From", "De", "من"], ["Message", "Message", "الرسالة"], ["Open", "Ouvrir", "فتح"], ["Mark as read", "Marquer comme lu", "تحديد كمقروءة"], ["Mark as unread", "Marquer comme non lu", "تحديد كغير مقروءة"],
    ["From:", "De :", "من:"], ["Reply to:", "Répondre à :", "الرد على:"], ["Subject:", "Objet :", "الموضوع:"], ["Date:", "Date :", "التاريخ:"], ["Reply by email", "Répondre par e-mail", "الرد بالبريد"], ["Reply on WhatsApp", "Répondre sur WhatsApp", "الرد عبر واتساب"],
    ["General question", "Question générale", "سؤال عام"], ["Story idea", "Idée de sujet", "فكرة موضوع"], ["Partnership or advertising", "Partenariat ou publicité", "شراكة أو إعلان"], ["Other", "Autre", "أخرى"],
    ["Message deleted.", "Message supprimé.", "تم حذف الرسالة."], ["Delete this message permanently?", "Supprimer définitivement ce message ?", "حذف هذه الرسالة نهائيا؟"], ["Could not open the message.", "Impossible d'ouvrir le message.", "تعذر فتح الرسالة."], ["Could not load the messages.", "Impossible de charger les messages.", "تعذر تحميل الرسائل."],
    ["No messages yet. Messages sent from the", "Aucun message. Les messages envoyés depuis la", "لا توجد رسائل بعد. الرسائل المرسلة من"], ["contact page", "page contact", "صفحة الاتصال"], ["appear here.", "apparaissent ici.", "تظهر هنا."],
    ["Messages are kept for 12 months, as stated in the privacy policy.", "Les messages sont conservés 12 mois, comme indiqué dans la politique de confidentialité.", "تُحفظ الرسائل 12 شهرا كما تنص على ذلك سياسة الخصوصية."],
    ["Messages from the contact form are stored on Cloudflare and can be read on the live site's admin.", "Les messages du formulaire sont enregistrés sur Cloudflare et se lisent dans l'admin du site en ligne.", "تُحفظ رسائل نموذج الاتصال على Cloudflare وتُقرأ في لوحة تحكم الموقع المنشور."],
    ["New", "Créer", "جديد"], ["Log Out", "Se déconnecter", "تسجيل الخروج"], ["Dashboard", "Tableau de bord", "لوحة التحكم"], ["Home", "Accueil", "الرئيسية"],
    ["Posts", "Articles", "المقالات"], ["All Posts", "Tous les articles", "كل المقالات"], ["Add New Post", "Ajouter un article", "إضافة مقال"], ["Categories", "Catégories", "التصنيفات"],
    ["Media", "Médias", "الوسائط"], ["Library", "Bibliothèque", "المكتبة"], ["Live Scores", "Scores en direct", "النتائج المباشرة"], ["League Table", "Classement", "جدول الترتيب"],
    ["Users", "Utilisateurs", "المستخدمون"], ["Settings", "Réglages", "الإعدادات"], ["General", "Général", "عام"], ["Publish & Backup", "Publication et sauvegarde", "النشر والنسخ الاحتياطي"],
    ["Comments", "Commentaires", "التعليقات"], ["Toolbar", "Barre d'outils", "شريط الأدوات"], ["Menu", "Menu", "القائمة"], ["Main menu", "Menu principal", "القائمة الرئيسية"], ["Language", "Langue", "اللغة"],
    ["Thank you for creating with KoraPulse.", "Merci de créer avec KoraPulse.", "شكرا لاستخدامك KoraPulse."], ["All changes published", "Toutes les modifications sont publiées", "تم نشر جميع التعديلات"],
    ["Unpublished changes: publish", "Modifications non publiées : publier", "تعديلات غير منشورة: انشرها"], ["Dismiss", "Fermer", "إغلاق"], ["✕ Dismiss", "✕ Fermer", "✕ إغلاق"],
    // dashboard
    ["Welcome to KoraPulse!", "Bienvenue sur KoraPulse !", "مرحبا بك في KoraPulse!"], ["Everything you need to run your football newsroom.", "Tout ce qu'il faut pour gérer votre rédaction football.", "كل ما تحتاجه لإدارة غرفة أخبارك الكروية."],
    ["Write the news", "Écrire l'actualité", "اكتب الأخبار"], ["Publish match reports, transfer news and opinion pieces with photos.", "Publiez comptes rendus, infos mercato et tribunes avec photos.", "انشر تقارير المباريات وأخبار الانتقالات ومقالات الرأي مع الصور."],
    ["Write a new post", "Écrire un article", "اكتب مقالا جديدا"], ["Match day", "Jour de match", "يوم المباراة"], ["Update the", "Mettez à jour le", "حدّث"], ["live score ticker", "bandeau des scores", "شريط النتائج"],
    ["and the", "et le", "و"], ["league table", "classement", "جدول الترتيب"], ["as the results come in.", "au fil des résultats.", "مع توالي النتائج."],
    ["Shared everywhere", "Partagé partout", "مشاركة في كل مكان"], ["Readers share your articles on Facebook, X, WhatsApp and Instagram. Add your social pages in", "Les lecteurs partagent vos articles sur Facebook, X, WhatsApp et Instagram. Ajoutez vos pages sociales dans les", "يشارك القراء مقالاتك على فيسبوك وإكس وواتساب وإنستغرام. أضف صفحاتك الاجتماعية في"],
    ["so readers can follow you.", "pour que les lecteurs vous suivent.", "ليتابعك القراء."], ["View your site", "Voir le site", "عرض الموقع"],
    ["Your readers", "Vos lecteurs", "قراؤك"], ["No comments waiting for approval.", "Aucun commentaire en attente.", "لا توجد تعليقات في انتظار الموافقة."],
    ["At a Glance", "D'un coup d'œil", "نظرة سريعة"], ["Activity", "Activité", "النشاط"], ["Recently Published", "Publiés récemment", "نُشر مؤخرا"], ["Recent Comments", "Commentaires récents", "أحدث التعليقات"],
    ["All comments", "Tous les commentaires", "كل التعليقات"], ["No comments yet.", "Aucun commentaire.", "لا توجد تعليقات بعد."],
    ["Quick Draft", "Brouillon rapide", "مسودة سريعة"], ["Title", "Titre", "العنوان"], ["Content", "Contenu", "المحتوى"], ["What's happening on the pitch?", "Que se passe-t-il sur le terrain ?", "ماذا يحدث على أرضية الملعب؟"],
    ["Save Draft", "Enregistrer le brouillon", "حفظ المسودة"], ["Your Recent Drafts", "Vos brouillons récents", "مسوداتك الأخيرة"], ["View all drafts", "Voir tous les brouillons", "عرض كل المسودات"],
    ["Posts by Category", "Articles par catégorie", "المقالات حسب التصنيف"], ["Edit", "Modifier", "تعديل"],
    ["You have changes saved in this browser that are not on the live site yet.", "Des modifications enregistrées dans ce navigateur ne sont pas encore en ligne.", "لديك تعديلات محفوظة في هذا المتصفح لم تُنشر بعد على الموقع."], ["Publish them", "Les publier", "انشرها"],
    // posts list
    ["Posts", "Articles", "المقالات"], ["All", "Tous", "الكل"], ["Published", "Publié", "منشورة"], ["none", "aucune", "لا شيء"], ["Drafts", "Brouillons", "المسودات"], ["Trash", "Corbeille", "المهملات"],
    ["Search Posts", "Rechercher", "بحث في المقالات"], ["Search posts", "Rechercher des articles", "ابحث في المقالات"], ["Bulk actions", "Actions groupées", "إجراءات جماعية"], ["Publish", "Publier", "نشر"],
    ["Move to Drafts", "Passer en brouillon", "نقل إلى المسودات"], ["Move to Trash", "Mettre à la corbeille", "نقل إلى المهملات"], ["Restore", "Restaurer", "استعادة"], ["Delete permanently", "Supprimer définitivement", "حذف نهائي"], ["Delete Permanently", "Supprimer définitivement", "حذف نهائي"],
    ["Apply", "Appliquer", "تطبيق"], ["All Categories", "Toutes les catégories", "كل التصنيفات"], ["Filter", "Filtrer", "تصفية"], ["Filter by category", "Filtrer par catégorie", "تصفية حسب التصنيف"], ["Empty Trash", "Vider la corbeille", "إفراغ المهملات"],
    ["Author", "Auteur", "الكاتب"], ["Category", "Catégorie", "التصنيف"], ["Tags", "Étiquettes", "الوسوم"], ["Date", "Date", "التاريخ"], ["Headline", "À la une", "العنوان الرئيسي"], ["Draft", "Brouillon", "مسودة"],
    ["View", "Voir", "عرض"], ["Preview", "Aperçu", "معاينة"], ["Make headline", "Mettre à la une", "اجعله العنوان الرئيسي"], ["Last Modified", "Modifié", "آخر تعديل"], ["Trashed", "Supprimé", "محذوف"],
    ["Previous page", "Page précédente", "الصفحة السابقة"], ["Next page", "Page suivante", "الصفحة التالية"], ["Select all", "Tout sélectionner", "تحديد الكل"], ["No posts found.", "Aucun article trouvé.", "لم يتم العثور على مقالات."],
    ["Search results for:", "Résultats pour :", "نتائج البحث عن:"], ["Français", "Français", "الفرنسية"], ["العربية", "العربية", "العربية"],
    // editor
    ["Edit Post", "Modifier l'article", "تعديل المقال"], ["Add title", "Saisissez le titre", "أضف عنوانا"], ["Permalink:", "Lien :", "الرابط:"], ["generated from the title", "créé à partir du titre", "يُنشأ من العنوان"], ["Slug", "Identifiant", "المعرّف"],
    ["View Post", "Voir l'article", "عرض المقال"], ["Add Media", "Ajouter un média", "إضافة وسائط"], ["Formatting", "Mise en forme", "التنسيق"], ["Bold (Ctrl+B)", "Gras (Ctrl+B)", "غامق (Ctrl+B)"], ["Italic (Ctrl+I)", "Italique (Ctrl+I)", "مائل (Ctrl+I)"],
    ["Heading", "Intertitre", "عنوان فرعي"], ["Quote", "Citation", "اقتباس"], ["Insert link", "Insérer un lien", "إدراج رابط"], ["Leave an empty line between paragraphs.", "Laissez une ligne vide entre les paragraphes.", "اترك سطرا فارغا بين الفقرات."],
    ["Start writing…", "Commencez à écrire…", "ابدأ الكتابة…"], ["Post content", "Contenu de l'article", "محتوى المقال"], ["Excerpt", "Extrait", "المقتطف"],
    ["The summary shown on the homepage and category pages. Leave empty to use the first sentences of the post.", "Le résumé affiché en page d'accueil et dans les rubriques. Laissez vide pour reprendre les premières phrases.", "الملخص المعروض في الصفحة الرئيسية وصفحات الأقسام. اتركه فارغا لاستعمال الجمل الأولى من المقال."],
    ["Status:", "État :", "الحالة:"], ["Visibility:", "Visibilité :", "الظهور:"], ["Only you", "Vous seul", "أنت فقط"], ["Public", "Public", "عام"], ["Publish date:", "Date de publication :", "تاريخ النشر:"], ["Published on:", "Publié le :", "نُشر في:"],
    ["Homepage headline", "À la une de l'accueil", "عنوان الصفحة الرئيسية"], ["Switch to Draft", "Repasser en brouillon", "تحويل إلى مسودة"], ["Update", "Mettre à jour", "تحديث"], ["In Trash", "Dans la corbeille", "في المهملات"],
    ["+ Add New Category", "+ Ajouter une catégorie", "+ إضافة تصنيف"], ["Add", "Ajouter", "إضافة"], ["Add tag", "Ajouter une étiquette", "إضافة وسم"], ["Featured Image", "Image mise en avant", "الصورة البارزة"],
    ["Set featured image", "Définir l'image mise en avant", "تعيين الصورة البارزة"], ["Replace image", "Remplacer l'image", "استبدال الصورة"], ["Remove featured image", "Retirer l'image", "إزالة الصورة البارزة"],
    ["Or use an illustration", "Ou utilisez une illustration", "أو استعمل رسما توضيحيا"], ["Automatic", "Automatique", "تلقائي"], ["Stadium", "Stade", "ملعب"], ["Pitch", "Terrain", "أرضية الملعب"], ["Ball", "Ballon", "كرة"], ["Trophy", "Trophée", "كأس"], ["Net", "Filet", "شباك"],
    ["New post", "Nouvel article", "مقال جديد"], ["English (original)", "Anglais (original)", "الإنجليزية (الأصل)"], ["Translation", "Traduction de :", "ترجمة لـ:"],
    ["Add media", "Ajouter un média", "إضافة وسائط"], ["Insert into post", "Insérer dans l'article", "إدراج في المقال"], ["Select an image, or upload a new one.", "Choisissez une image ou importez-en une.", "اختر صورة أو ارفع صورة جديدة."],
    ["Post not found", "Article introuvable", "المقال غير موجود"], ["This post no longer exists.", "Cet article n'existe plus.", "هذا المقال لم يعد موجودا."], ["Back to Posts", "Retour aux articles", "العودة إلى المقالات"],
    // categories
    ["Add New Category", "Ajouter une catégorie", "إضافة تصنيف"], ["Edit Category", "Modifier la catégorie", "تعديل التصنيف"], ["Name", "Nom", "الاسم"], ["The name shown in the site menu.", "Le nom affiché dans le menu du site.", "الاسم الظاهر في قائمة الموقع."],
    ["The web address version of the name: lowercase letters, numbers and hyphens.", "La version du nom pour l'adresse web : minuscules, chiffres et tirets.", "صيغة الاسم في عنوان الصفحة: حروف لاتينية صغيرة وأرقام وشرطات."], ["Sub-sections", "Sous-rubriques", "الأقسام الفرعية"],
    ["Optional, separated by commas (e.g. Results, Clubs). They appear in the menu dropdown and filter posts by tag.", "Facultatif, séparées par des virgules (ex. : Résultats, Clubs). Elles apparaissent dans le menu déroulant et filtrent les articles par étiquette.", "اختياري، مفصولة بفواصل (مثال: النتائج، الأندية). تظهر في القائمة المنسدلة وتصفي المقالات حسب الوسم."],
    ["In the same order as above.", "Dans le même ordre que ci-dessus.", "بنفس الترتيب أعلاه."], ["Cancel", "Annuler", "إلغاء"], ["Count", "Nombre", "العدد"], ["Menu order", "Ordre du menu", "ترتيب القائمة"], ["Delete", "Supprimer", "حذف"],
    ["Move up", "Monter", "نقل للأعلى"], ["Move down", "Descendre", "نقل للأسفل"],
    ["Deleting a category moves its posts to the first category in the list. The order here is the order of the site menu.", "Supprimer une catégorie déplace ses articles vers la première de la liste. L'ordre ici est celui du menu du site.", "حذف تصنيف ينقل مقالاته إلى أول تصنيف في اللائحة. الترتيب هنا هو ترتيب قائمة الموقع."],
    // media
    ["Media Library", "Médiathèque", "مكتبة الوسائط"], ["Drop files to upload", "Déposez des fichiers à importer", "أفلت الملفات لرفعها"], ["Uploading…", "Import en cours…", "جارٍ الرفع…"], ["or", "ou", "أو"], ["Select Files", "Choisir des fichiers", "اختر ملفات"],
    ["Large photos are resized to 1600 px wide to save space.", "Les grandes photos sont réduites à 1600 px de large pour gagner de la place.", "تُصغَّر الصور الكبيرة إلى عرض 1600 بكسل لتوفير المساحة."], ["No images yet. Upload your first photo above.", "Aucune image. Importez votre première photo ci-dessus.", "لا توجد صور بعد. ارفع صورتك الأولى أعلاه."],
    ["Attachment details", "Détails du fichier", "تفاصيل الملف"], ["Uploaded on:", "Importé le :", "تاريخ الرفع:"], ["File name:", "Nom du fichier :", "اسم الملف:"], ["Dimensions:", "Dimensions :", "الأبعاد:"], ["File size:", "Taille :", "الحجم:"],
    ["Used in:", "Utilisé dans :", "مستخدم في:"], ["not used yet", "pas encore utilisé", "غير مستخدم بعد"], ["Alternative text", "Texte alternatif", "النص البديل"], ["Describe the photo for visually impaired readers.", "Décrivez la photo pour les lecteurs malvoyants.", "صف الصورة للقراء ضعاف البصر."],
    ["Done", "Terminé", "تم"], ["Close", "Fermer", "إغلاق"], ["Featured image", "Image mise en avant", "الصورة البارزة"],
    // scores & table
    ["View ticker", "Voir le bandeau", "عرض الشريط"], ["What the score ticker shows", "Contenu du bandeau des scores", "ما يعرضه شريط النتائج"], ["Live matches from around the world", "Les matchs en direct du monde entier", "المباريات المباشرة من كل أنحاء العالم"],
    ["(automatic). Today's live, finished and upcoming matches, Botola Pro and CAF first. The matches below are used if the score service is unavailable.", "(automatique). Matchs du jour en direct, terminés et à venir, Botola Pro et CAF en premier. Les matchs ci-dessous servent si le service des scores est indisponible.", "(تلقائي). مباريات اليوم المباشرة والمنتهية والقادمة، مع البطولة الاحترافية وإفريقيا أولا. تُستعمل المباريات أدناه إذا تعذرت خدمة النتائج."],
    ["Only the matches I enter below", "Uniquement les matchs que je saisis ci-dessous", "فقط المباريات التي أدخلها أدناه"], ["The full list with filters is on the", "La liste complète avec filtres est sur la", "اللائحة الكاملة مع عوامل التصفية في"], ["Live scores page", "page des scores en direct", "صفحة النتائج المباشرة"],
    ["Leave the score empty for matches that have not started, and put the kick-off time in Status.", "Laissez le score vide pour les matchs non commencés et indiquez l'heure du coup d'envoi dans État.", "اترك النتيجة فارغة للمباريات التي لم تبدأ، وضع موعد الانطلاق في خانة الحالة."],
    ["Competition", "Compétition", "المسابقة"], ["Home team", "Équipe à domicile", "الفريق المضيف"], ["Score", "Score", "النتيجة"], ["Away team", "Équipe à l'extérieur", "الفريق الضيف"], ["Status", "État", "الحالة"], ["Remove", "Retirer", "إزالة"],
    ["+ Add match", "+ Ajouter un match", "+ إضافة مباراة"], ["Save Changes", "Enregistrer", "حفظ التغييرات"], ["Home goals", "Buts à domicile", "أهداف المضيف"], ["Away goals", "Buts à l'extérieur", "أهداف الضيف"],
    ["No matches. The ticker is hidden until you add one.", "Aucun match. Le bandeau est masqué tant qu'il est vide.", "لا توجد مباريات. يبقى الشريط مخفيا حتى تضيف واحدة."],
    ["Table title", "Titre du classement", "عنوان الجدول"], ["Club", "Club", "النادي"], ["W", "G", "ف"], ["D", "N", "ت"], ["L", "P", "خ"], ["Played", "Joués", "لعب"], ["Goal diff.", "Diff.", "الفارق"], ["Points", "Points", "النقاط"],
    ["Played and points are calculated for you (3 points for a win, 1 for a draw). The table is sorted by points, then goal difference, when you save.", "Les matchs joués et les points sont calculés automatiquement (3 points pour une victoire, 1 pour un nul). Le classement est trié par points puis différence de buts à l'enregistrement.", "تُحسب المباريات الملعوبة والنقاط تلقائيا (3 نقاط للفوز ونقطة للتعادل)، ويُرتب الجدول حسب النقاط ثم فارق الأهداف عند الحفظ."],
    ["+ Add club", "+ Ajouter un club", "+ إضافة ناد"], ["Won", "Gagnés", "فاز"], ["Drawn", "Nuls", "تعادل"], ["Lost", "Perdus", "خسر"], ["Goal difference", "Différence de buts", "فارق الأهداف"],
    // users
    ["The writers credited on articles. Sign-in to this dashboard uses the administrator account in", "Les auteurs crédités sur les articles. La connexion au tableau de bord utilise le compte administrateur dans les", "الكتّاب المذكورون في المقالات. الدخول إلى لوحة التحكم يتم بحساب المدير في"],
    ["Add New User", "Ajouter un utilisateur", "إضافة مستخدم"], ["Edit User", "Modifier l'utilisateur", "تعديل المستخدم"], ["Update User", "Mettre à jour", "تحديث المستخدم"], ["Role", "Rôle", "الدور"],
    ["Administrator", "Administrateur", "مدير"], ["Editor", "Éditeur", "محرر"], ["Contributor", "Contributeur", "مساهم"], ["Biographical info", "Biographie", "نبذة"], ["Name (Français)", "Nom (français)", "الاسم (بالفرنسية)"], ["Name (العربية)", "Nom (arabe)", "الاسم (بالعربية)"], ["KoraPulse Administration", "Administration KoraPulse", "إدارة كورابولس"], ["Bio", "Bio", "نبذة"],
    // settings
    ["General Settings", "Réglages généraux", "الإعدادات العامة"], ["Site Title", "Titre du site", "اسم الموقع"], ["Tagline", "Slogan", "الشعار"],
    ["In a few words, explain what this site is about. Shown under the logo.", "En quelques mots, décrivez le site. Affiché sous le logo.", "بكلمات قليلة، عرّف بالموقع. يظهر تحت الشعار."],
    ["Contact email", "E-mail de contact", "البريد الإلكتروني للتواصل"], ["Social media", "Réseaux sociaux", "شبكات التواصل"],
    ["Allow readers to comment on articles", "Autoriser les commentaires des lecteurs", "السماح للقراء بالتعليق على المقالات"],
    ["When off, readers can only read and share. Comments then need moderation in the Comments menu.", "Désactivé, les lecteurs peuvent seulement lire et partager. Activé, les commentaires sont à modérer dans le menu Commentaires.", "عند الإيقاف، يكتفي القراء بالقراءة والمشاركة. وعند التفعيل تحتاج التعليقات إلى مراجعة في قائمة التعليقات."],
    ["Top bar links", "Liens de la barre du haut", "روابط الشريط العلوي"], ["One link per line:", "Un lien par ligne :", "رابط في كل سطر:"], ["e.g.", "ex. :", "مثال:"],
    ["Live scores", "Scores en direct", "النتائج المباشرة"], ["Source", "Source", "المصدر"], ["Automatic", "Automatique", "تلقائي"], [": API-Football when a key is saved, otherwise ESPN", " : API-Football si une clé est enregistrée, sinon ESPN", ": API-Football عند حفظ مفتاح، وإلا ESPN"],
    ["(official, all competitions; needs a key)", "(officiel, toutes les compétitions ; nécessite une clé)", "(رسمي، كل المسابقات؛ يتطلب مفتاحا)"], ["(free, no key, unofficial, 40 competitions)", "(gratuit, sans clé, non officiel, 40 compétitions)", "(مجاني، بدون مفتاح، غير رسمي، 40 مسابقة)"],
    ["Now using:", "Source actuelle :", "المصدر الحالي:"], [". If API-Football fails (no data, daily limit or plan), the site uses ESPN.", ". Si API-Football échoue (pas de données, limite journalière ou forfait), le site utilise ESPN.", ". إذا تعذر API-Football (لا بيانات أو الحد اليومي أو الباقة)، يستعمل الموقع ESPN."],
    ["API-Football key", "Clé API-Football", "مفتاح API-Football"], ["Remove key", "Supprimer la clé", "حذف المفتاح"], ["Free key at", "Clé gratuite sur", "مفتاح مجاني على"],
    ["(My Account → API key). Saved on Cloudflare only, never in the site's files.", "(Mon compte → clé API). Enregistrée uniquement sur Cloudflare, jamais dans les fichiers du site.", "(حسابي ← مفتاح API). يُحفظ على Cloudflare فقط، وليس في ملفات الموقع."],
    ["Paste your key from dashboard.api-football.com", "Collez votre clé depuis dashboard.api-football.com", "الصق مفتاحك من dashboard.api-football.com"], ["Requests per day in your plan", "Requêtes par jour de votre forfait", "عدد الطلبات اليومية في باقتك"],
    ["Test connection", "Tester la connexion", "اختبار الاتصال"], ["Testing…", "Test en cours…", "جارٍ الاختبار…"], ["Save live scores settings", "Enregistrer les réglages des scores", "حفظ إعدادات النتائج"], ["Open live scores", "Ouvrir les scores", "فتح النتائج المباشرة"],
    ["Loading…", "Chargement…", "جارٍ التحميل…"], ["Could not load the live scores settings.", "Impossible de charger les réglages des scores.", "تعذر تحميل إعدادات النتائج."],
    ["Administrator account", "Compte administrateur", "حساب المدير"], ["Username", "Identifiant", "اسم المستخدم"], ["Current password", "Mot de passe actuel", "كلمة المرور الحالية"], ["New password", "Nouveau mot de passe", "كلمة المرور الجديدة"],
    ["At least 10 characters. Mix words, numbers and symbols.", "Au moins 10 caractères. Mélangez mots, chiffres et symboles.", "10 أحرف على الأقل. امزج كلمات وأرقاما ورموزا."], ["Confirm new password", "Confirmer le mot de passe", "تأكيد كلمة المرور"],
    ["You are using the password set on Cloudflare. After changing it, your browser asks you to log in again with the new one.", "Vous utilisez le mot de passe défini sur Cloudflare. Après modification, le navigateur vous demandera de vous reconnecter.", "أنت تستعمل كلمة المرور المحددة في Cloudflare. بعد تغييرها سيطلب منك المتصفح الدخول من جديد."],
    ["After changing it, your browser asks you to log in again with the new one.", "Après modification, le navigateur vous demandera de vous reconnecter.", "بعد تغييرها سيطلب منك المتصفح الدخول من جديد."],
    ["Change password", "Changer le mot de passe", "تغيير كلمة المرور"], ["Saving…", "Enregistrement…", "جارٍ الحفظ…"], ["Update account", "Mettre à jour le compte", "تحديث الحساب"],
    ["Password changed.", "Mot de passe modifié.", "تم تغيير كلمة المرور."], ["Log in again with your new password.", "Reconnectez-vous avec votre nouveau mot de passe.", "سجّل الدخول من جديد بكلمة المرور الجديدة."], ["Log in", "Se connecter", "تسجيل الدخول"],
    // tools
    ["Publish to the live site", "Publier sur le site", "النشر على الموقع"], ["Download your site content as", "Téléchargez le contenu du site au format", "حمّل محتوى الموقع بصيغة"], ["Replace", "Remplacez", "استبدل"],
    ["with it (on GitHub: open the file, then upload the new one).", "par ce fichier (sur GitHub : ouvrez le fichier, puis importez le nouveau).", "به (على GitHub: افتح الملف ثم ارفع الملف الجديد)."],
    ["Your host redeploys the site (Cloudflare Pages does this automatically).", "Votre hébergeur redéploie le site (automatique avec Cloudflare).", "يعيد المستضيف نشر الموقع (يتم تلقائيا مع Cloudflare)."],
    ["Download data.js", "Télécharger data.js", "تحميل data.js"], ["Everything has been downloaded for publishing.", "Tout a été téléchargé pour publication.", "تم تحميل كل شيء للنشر."], ["You have changes that are not published yet.", "Des modifications ne sont pas encore publiées.", "لديك تعديلات لم تُنشر بعد."],
    ["Backup", "Sauvegarde", "النسخ الاحتياطي"], ["Keep a copy of all your content, or move it to another computer.", "Gardez une copie de tout votre contenu, ou transférez-le sur un autre ordinateur.", "احتفظ بنسخة من كل المحتوى أو انقله إلى حاسوب آخر."],
    ["Download backup", "Télécharger une sauvegarde", "تحميل نسخة احتياطية"], ["Restore from file", "Restaurer depuis un fichier", "الاستعادة من ملف"], ["You can restore a backup or a data.js file downloaded from this dashboard.", "Vous pouvez restaurer une sauvegarde ou un fichier data.js téléchargé depuis ce tableau de bord.", "يمكنك استعادة نسخة احتياطية أو ملف data.js محمّل من هذه اللوحة."],
    ["Discard local changes", "Annuler les modifications locales", "تجاهل التعديلات المحلية"], ["Throw away everything saved in this browser and go back to the content of the published data.js.", "Effacer tout ce qui est enregistré dans ce navigateur et revenir au contenu publié (data.js).", "احذف كل ما حُفظ في هذا المتصفح وارجع إلى محتوى data.js المنشور."],
    ["Discard changes saved in this browser", "Annuler les modifications de ce navigateur", "تجاهل التعديلات المحفوظة في هذا المتصفح"],
    // comments
    ["Pending", "En attente", "في الانتظار"], ["Approved", "Approuvés", "مقبولة"], ["Spam", "Indésirables", "مزعج"], ["Approve", "Approuver", "قبول"], ["Unapprove", "Désapprouver", "إلغاء القبول"], ["Mark as spam", "Marquer comme indésirable", "تحديد كمزعج"],
    ["Not Spam", "Pas indésirable", "ليس مزعجا"], ["Reply", "Répondre", "رد"], ["Comment", "Commentaire", "التعليق"], ["In response to", "En réponse à", "ردا على"], ["Show all posts", "Tous les articles", "عرض كل المقالات"], ["No comments found.", "Aucun commentaire.", "لا توجد تعليقات."],
    ["Deleted post", "Article supprimé", "مقال محذوف"], ["Staff", "Rédaction", "الطاقم"],
    ["Comments posted on the website reach this list only from this browser until the site has a server (see the README).", "Les commentaires publiés sur le site n'arrivent ici que depuis ce navigateur tant que le site n'a pas de serveur (voir le README).", "التعليقات المنشورة في الموقع لا تصل إلى هذه اللائحة إلا من هذا المتصفح ما دام الموقع بلا خادم (راجع README)."],
    // login (local mode)
    ["Username or Email Address", "Identifiant ou e-mail", "اسم المستخدم أو البريد"], ["Password", "Mot de passe", "كلمة المرور"], ["Remember Me", "Se souvenir de moi", "تذكرني"], ["Log In", "Se connecter", "دخول"],
    ["Create account", "Créer le compte", "إنشاء الحساب"], ["Confirm password", "Confirmer le mot de passe", "تأكيد كلمة المرور"], ["At least 8 characters.", "Au moins 8 caractères.", "8 أحرف على الأقل."],
    ["Create the administrator account for this dashboard.", "Créez le compte administrateur de ce tableau de bord.", "أنشئ حساب المدير لهذه اللوحة."], ["Welcome!", "Bienvenue !", "مرحبا!"],
    // messages
    ["Post published.", "Article publié.", "تم نشر المقال."], ["Post updated.", "Article mis à jour.", "تم تحديث المقال."], ["Draft saved.", "Brouillon enregistré.", "تم حفظ المسودة."], ["View post", "Voir l'article", "عرض المقال"], ["Preview post", "Prévisualiser", "معاينة المقال"],
    ["1 post moved to the Trash.", "1 article mis à la corbeille.", "تم نقل مقال واحد إلى المهملات."], ["1 post restored from the Trash.", "1 article restauré.", "تمت استعادة مقال واحد."], ["1 post permanently deleted.", "1 article supprimé définitivement.", "تم حذف مقال واحد نهائيا."],
    ["Homepage headline changed.", "Article à la une modifié.", "تم تغيير العنوان الرئيسي."], ["Category added.", "Catégorie ajoutée.", "تمت إضافة التصنيف."], ["Category updated.", "Catégorie mise à jour.", "تم تحديث التصنيف."], ["Category deleted.", "Catégorie supprimée.", "تم حذف التصنيف."],
    ["Image deleted.", "Image supprimée.", "تم حذف الصورة."], ["Live scores updated.", "Scores mis à jour.", "تم تحديث النتائج."], ["League table updated.", "Classement mis à jour.", "تم تحديث جدول الترتيب."],
    ["New user created.", "Utilisateur créé.", "تم إنشاء المستخدم."], ["User updated.", "Utilisateur mis à jour.", "تم تحديث المستخدم."], ["User deleted.", "Utilisateur supprimé.", "تم حذف المستخدم."], ["Settings saved.", "Réglages enregistrés.", "تم حفظ الإعدادات."],
    ["Live scores settings saved.", "Réglages des scores enregistrés.", "تم حفظ إعدادات النتائج."], ["API-Football key removed.", "Clé API-Football supprimée.", "تم حذف مفتاح API-Football."], ["Administrator account updated.", "Compte administrateur mis à jour.", "تم تحديث حساب المدير."],
    ["Comment approved.", "Commentaire approuvé.", "تم قبول التعليق."], ["Comment unapproved.", "Commentaire désapprouvé.", "تم إلغاء قبول التعليق."], ["Comment restored.", "Commentaire restauré.", "تمت استعادة التعليق."], ["Comment marked as spam.", "Commentaire marqué comme indésirable.", "تم تحديد التعليق كمزعج."],
    ["Comment moved to the Trash.", "Commentaire mis à la corbeille.", "تم نقل التعليق إلى المهملات."], ["Comment deleted permanently.", "Commentaire supprimé définitivement.", "تم حذف التعليق نهائيا."], ["Comments deleted permanently.", "Commentaires supprimés définitivement.", "تم حذف التعليقات نهائيا."], ["Reply published.", "Réponse publiée.", "تم نشر الرد."],
    ["The new passwords do not match.", "Les nouveaux mots de passe ne correspondent pas.", "كلمتا المرور الجديدتان غير متطابقتين."], ["The passwords do not match.", "Les mots de passe ne correspondent pas.", "كلمتا المرور غير متطابقتين."],
    ["Your current password is incorrect.", "Votre mot de passe actuel est incorrect.", "كلمة المرور الحالية غير صحيحة."], ["The new password must be at least 10 characters.", "Le nouveau mot de passe doit contenir au moins 10 caractères.", "يجب أن تتكون كلمة المرور الجديدة من 10 أحرف على الأقل."],
    ["The password cannot be the same as the username.", "Le mot de passe ne peut pas être identique à l'identifiant.", "لا يمكن أن تكون كلمة المرور مطابقة لاسم المستخدم."], ["The password could not be changed.", "Le mot de passe n'a pas pu être modifié.", "تعذر تغيير كلمة المرور."],
    ["Could not reach the server. Check your connection.", "Serveur injoignable. Vérifiez votre connexion.", "تعذر الاتصال بالخادم. تحقق من اتصالك."], ["The username or password you entered is incorrect.", "L'identifiant ou le mot de passe est incorrect.", "اسم المستخدم أو كلمة المرور غير صحيحة."], ["You are now logged out.", "Vous êtes déconnecté.", "تم تسجيل خروجك."],
    ["data.js downloaded. Upload it to replace football-news/js/data.js to publish your changes.", "data.js téléchargé. Importez-le à la place de js/data.js pour publier vos modifications.", "تم تحميل data.js. ارفعه مكان js/data.js لنشر تعديلاتك."],
    ["data.js downloaded. Upload it to replace js/data.js to publish your changes.", "data.js téléchargé. Importez-le à la place de js/data.js pour publier vos modifications.", "تم تحميل data.js. ارفعه مكان js/data.js لنشر تعديلاتك."],
    ["Could not save: this browser's storage is full. Delete some images in Media, then try again.", "Enregistrement impossible : le stockage du navigateur est plein. Supprimez des images dans Médias puis réessayez.", "تعذر الحفظ: مساحة تخزين المتصفح ممتلئة. احذف بعض الصور من الوسائط ثم أعد المحاولة."],
    // dialogs
    ["Please add a title first.", "Ajoutez d'abord un titre.", "أضف عنوانا أولا."], ["You have unsaved changes. Leave this page anyway?", "Des modifications ne sont pas enregistrées. Quitter quand même ?", "لديك تعديلات غير محفوظة. هل تريد المغادرة رغم ذلك؟"],
    ["Delete this post permanently? This cannot be undone.", "Supprimer définitivement cet article ? Action irréversible.", "حذف هذا المقال نهائيا؟ لا يمكن التراجع."], ["Delete this comment permanently?", "Supprimer définitivement ce commentaire ?", "حذف هذا التعليق نهائيا؟"],
    ["Link URL", "Adresse du lien", "عنوان الرابط"], ["You need at least one category.", "Il faut au moins une catégorie.", "تحتاج إلى تصنيف واحد على الأقل."],
    ["Remove the API-Football key? The site will use ESPN.", "Supprimer la clé API-Football ? Le site utilisera ESPN.", "حذف مفتاح API-Football؟ سيستعمل الموقع ESPN."],
    ["Discard all changes saved in this browser? Anything you have not downloaded will be lost.", "Annuler toutes les modifications de ce navigateur ? Tout ce qui n'a pas été téléchargé sera perdu.", "تجاهل كل التعديلات المحفوظة في هذا المتصفح؟ سيضيع كل ما لم يتم تحميله."]
  ];
  const col = lang === "fr" ? 1 : 2;
  const DICT = new Map(ROWS.map((r) => [r[0], r[col]]));
  // content names from the site data (categories, sub-sections) use their own translations
  try {
    (window.KP.categories || []).forEach((c) => {
      const x = c.tr && c.tr[lang];
      if (!x) return;
      if (x.name && !DICT.has(c.name)) DICT.set(c.name, x.name);
      (c.subs || []).forEach((s, i) => { if (x.subs && x.subs[i] && !DICT.has(s)) DICT.set(s, x.subs[i]); });
    });
  } catch (e) {}

  const F = lang === "fr";
  // texts with numbers, names or dates: [pattern, French, Arabic] ($1, $2… are kept)
  const PATTERNS = [
    [/^Howdy, (.+)$/, "Bonjour, $1", "مرحبا، $1"],
    [/^(\d+) Posts?$/, "$1 articles", "$1 مقالات"], [/^(\d+) Drafts?$/, "$1 brouillons", "$1 مسودات"], [/^(\d+) Categories$/, "$1 catégories", "$1 تصنيفات"],
    [/^(\d+) Images?$/, "$1 images", "$1 صور"], [/^(\d+) images?$/, "$1 images", "$1 صور"], [/^(\d+) Comments$/, "$1 commentaires", "$1 تعليقات"], [/^(\d+) in moderation$/, "$1 en attente", "$1 في الانتظار"],
    [/^(\d+) items?$/, "$1 éléments", "$1 عناصر"], [/^(\d+) of (\d+)$/, "$1 sur $2", "$1 من $2"], [/^Word count: (\d+)$/, "Nombre de mots : $1", "عدد الكلمات: $1"],
    [/^Select comment by (.+)$/, "Sélectionner le commentaire de $1", "تحديد تعليق $1"], [/^Select (.+)$/, "Sélectionner « $1 »", "تحديد «$1»"],
    [/^Storage used: ([\d.]+) MB of about (\d+) MB$/, "Stockage utilisé : $1 Mo sur environ $2 Mo", "المساحة المستعملة: $1 م.ب من حوالي $2 م.ب"],
    [/^Submitted on (.+?) at (.+?)( ·)?$/, "Envoyé le $1 à $2$3", "أُرسل في $1 على $2$3"],
    [/^(.+) · (\d+) authors · last change (.+)$/, "$1 · $2 auteurs · dernière modification $3", "$1 · $2 كتّاب · آخر تعديل $3"],
    [/^(\d+) of (\d+) requests left today \(checked (.+)\)$/, "$1 requêtes sur $2 restantes aujourd'hui (vérifié à $3)", "تبقى $1 من $2 طلبا اليوم (تحقق على $3)"],
    [/^(\d+) minutes?$/, "$1 minutes", "$1 دقيقة"], [/^Last edited on (.+) at (.+)$/, "Modifié le $1 à $2", "آخر تعديل في $1 على $2"],
    [/^Comments on “(.+)”$/, "Commentaires sur « $1 »", "التعليقات على «$1»"], [/^Pending \((\d+)\)$/, "En attente ($1)", "في الانتظار ($1)"],
    [/^Tags matching the category's sub-sections \((.*)\) appear in its menu filter\.$/, "Les étiquettes correspondant aux sous-rubriques ($1) apparaissent dans le filtre du menu.", "الوسوم المطابقة للأقسام الفرعية ($1) تظهر في تصفية القائمة."],
    [/^Free plan: 100 \(today's scores refresh every (\d+) minutes\)\. Pro: 7500 \(every minute\)\. Now: every$/, "Forfait gratuit : 100 (scores du jour actualisés toutes les $1 minutes). Pro : 7500 (chaque minute). Actuellement : toutes les", "الباقة المجانية: 100 (تحديث نتائج اليوم كل $1 دقيقة). Pro: 7500 (كل دقيقة). حاليا: كل"],
    [/^Connected\. Plan:$/, "Connecté. Forfait :", "متصل. الباقة:"], [/^· (\d+) of (\d+) requests used today( · renews (.+))?\.$/, "· $1 requêtes sur $2 utilisées aujourd'hui$3.", "· استُعمل $1 من $2 طلبا اليوم$3."],
    [/^Last error \((.+)\): (.+)$/, "Dernière erreur ($1) : $2", "آخر خطأ ($1): $2"], [/^Password last changed on (.+)\. After changing it, your browser asks you to log in again with the new one\.$/, "Mot de passe modifié le $1. Après modification, le navigateur vous demandera de vous reconnecter.", "آخر تغيير لكلمة المرور في $1. بعد تغييرها سيطلب منك المتصفح الدخول من جديد."],
    [/^Saved \((.+)\)\. Type a new key to replace it$/, "Enregistrée ($1). Saisissez une nouvelle clé pour la remplacer", "محفوظ ($1). اكتب مفتاحا جديدا لاستبداله"],
    [/^Your edits are saved in this browser(.*)$/, "Vos modifications sont enregistrées dans ce navigateur$1", "تعديلاتك محفوظة في هذا المتصفح$1"],
    [/^You are signed in as$/, "Connecté en tant que", "أنت متصل باسم"],
    [/^(\d+) posts? updated\.$/, "$1 article(s) mis à jour.", "تم تحديث $1 مقال."], [/^(\d+) comments? updated\.$/, "$1 commentaire(s) mis à jour.", "تم تحديث $1 تعليق."],
    [/^(\d+) images? uploaded\.$/, "$1 image(s) importée(s).", "تم رفع $1 صورة."], [/^(\d+) posts permanently deleted\.$/, "$1 articles supprimés définitivement.", "تم حذف $1 مقالات نهائيا."],
    [/^Some files were not uploaded: (.+)$/, "Certains fichiers n'ont pas été importés : $1", "لم يتم رفع بعض الملفات: $1"], [/^Content restored from (.+)\.$/, "Contenu restauré depuis $1.", "تمت استعادة المحتوى من $1."],
    [/^Account created\. Welcome, (.+)!$/, "Compte créé. Bienvenue, $1 !", "تم إنشاء الحساب. مرحبا، $1!"], [/^Could not save: (.+)$/, "Enregistrement impossible : $1", "تعذر الحفظ: $1"],
    [/^Delete "(.+)" permanently\?([\s\S]*)$/, "Supprimer définitivement « $1 » ?$2", "حذف «$1» نهائيا؟$2"], [/^Delete the category "(.+)"\?([\s\S]*)$/, "Supprimer la catégorie « $1 » ?$2", "حذف التصنيف «$1»؟$2"],
    [/^Delete (.+)\?([\s\S]*)$/, "Supprimer $1 ?$2", "حذف $1؟$2"], [/^Permanently delete (\d+) post\(s\)( in the Trash)?\?$/, "Supprimer définitivement $1 article(s) ?", "حذف $1 مقال نهائيا؟"],
    [/^Permanently delete (\d+) comment\(s\)\?$/, "Supprimer définitivement $1 commentaire(s) ?", "حذف $1 تعليق نهائيا؟"], [/^Permanently delete all comments in (.+)\?$/, "Supprimer définitivement tous les commentaires ($1) ?", "حذف كل التعليقات ($1) نهائيا؟"],
    [/^Replace all current content with "(.+)" \((\d+) posts\)\?$/, "Remplacer tout le contenu par « $1 » ($2 articles) ?", "استبدال كل المحتوى بـ«$1» ($2 مقالات)؟"],
    [/^There is already a user called (.+)\.$/, "Un utilisateur nommé $1 existe déjà.", "يوجد مستخدم باسم $1."], [/^A category with the slug "(.+)" already exists\.$/, "Une catégorie avec l'identifiant « $1 » existe déjà.", "يوجد تصنيف بالمعرّف «$1»."],
    [/^Its (\d+) post\(s\) will move to "(.+)"\.$/, "Ses $1 article(s) iront dans « $2 ».", "ستنتقل مقالاته ($1) إلى «$2»."],
    [/^Their (\d+) post\(s\) will be credited to (.+)\.$/, "Ses $1 article(s) seront attribués à $2.", "ستُنسب مقالاته ($1) إلى $2."],
    [/^It is used in (\d+) post\(s\); they will show their illustration instead\.$/, "Elle est utilisée dans $1 article(s), qui afficheront leur illustration.", "إنها مستعملة في $1 مقال، وستظهر الرسوم التوضيحية مكانها."],
    [/^Reply to (.+) \(published as (.+) staff, and approves the comment\)$/, "Répondre à $1 (publié au nom de la rédaction $2, approuve le commentaire)", "الرد على $1 (يُنشر باسم طاقم $2 ويقبل التعليق)"]
  ];
  const fill = (tpl, m) => tpl.replace(/\$(\d)/g, (x, i) => m[+i] || "");
  function T(s) {
    if (!s) return s;
    const key = s.trim();
    if (!key) return s;
    const lead = s.slice(0, s.indexOf(key)), trail = s.slice(s.indexOf(key) + key.length);
    if (DICT.has(key)) return lead + DICT.get(key) + trail;
    for (const [re, fr, ar] of PATTERNS) {
      const m = key.match(re);
      if (m) return lead + fill(F ? fr : ar, m.map((g) => (g && DICT.has(g) ? DICT.get(g) : g))) + trail;
    }
    // messages made of two sentences ("Post published. View post")
    return s;
  }
  window.KP_ADMIN_I18N.t = T;

  const SKIP = "textarea, script, style, .no-tr, .row-title, .act-comment p, .list-table td p, .categories-orig, .mini-scores, .tr-names";
  const ATTRS = ["placeholder", "title", "aria-label"];
  function translate(root) {
    if (!root) return;
    if (root.nodeType === 3) { if (!root.parentElement || !root.parentElement.closest(SKIP)) { const v = T(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; } return; }
    if (root.nodeType !== 1 || root.closest(SKIP)) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach((t) => { if (!t.parentElement.closest(SKIP)) { const v = T(t.nodeValue); if (v !== t.nodeValue) t.nodeValue = v; } });
    [root, ...root.querySelectorAll("[placeholder],[title],[aria-label]")].forEach((el) => {
      if (el.closest && el.closest(SKIP) && el.tagName !== "TEXTAREA") return;
      ATTRS.forEach((a) => { const v = el.getAttribute && el.getAttribute(a); if (v) { const t2 = T(v); if (t2 !== v) el.setAttribute(a, t2); } });
    });
  }
  const start = () => {
    translate(document.body);
    new MutationObserver((list) => list.forEach((m) => m.addedNodes.forEach(translate))).observe(document.body, { childList: true, subtree: true });
  };
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);

  // confirmation boxes and alerts
  const c = window.confirm.bind(window), a = window.alert.bind(window), p = window.prompt.bind(window);
  const TT = (m) => String(m).split("\n\n").map((part) => T(part)).join("\n\n");
  window.confirm = (m) => c(TT(m));
  window.alert = (m) => a(TT(m));
  window.prompt = (m, d) => p(TT(m), d);
})();
