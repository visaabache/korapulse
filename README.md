# KoraPulse: football news website

Live: **https://korapulse.space** · Admin: **https://korapulse.space/admin/** (also at korapulse.visa-abache.workers.dev)

A football news site (Morocco, Africa, Europe), with a classic news-site layout: a top bar, a large centred logo, a menu bar that stays at the top with dropdowns, a live-score ticker, a featured story with a sidebar (opinion, league table, most read, newsletter), sections for each competition, ad slots and a large footer.

Plain HTML, CSS and JavaScript. No build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## Pages
| File | What it shows |
| --- | --- |
| `index.html` | Homepage |
| `article.html?id=<article id>` | One article: share buttons, comments box, related articles |
| `category.html?c=<category>` | A category, with sub-category chips (`&t=Results`) and "Load more" |
| `category.html?q=<words>` | Search results (search icon in the menu, or press `/`) |

## Languages: English, Français, العربية
- **Public site:** visitors switch language with **EN · FR · ع** in the top bar. The first visit follows the browser's language. Links carry the language (`?lang=fr`, `?lang=ar`) so shared links open in the right language, and link previews (Facebook, WhatsApp, X) use the translated title and summary. Arabic is shown right to left with Arabic fonts (Cairo, Noto Naskh Arabic).
- **Articles:** each article can have a French and an Arabic version (`tr.fr`, `tr.ar` in `js/data.js`). In the admin editor, use the **English (original) / Français / العربية** tabs above the title. Without a translation, the original is shown with a short notice. The posts list shows **FR** and **AR** badges in green when a translation exists.
- **Categories, tagline, top bar links, league table title:** translated in Admin → Categories, Settings and League Table.
- **Admin dashboard:** switch with **EN · FR · ع** in the admin bar (remembered on that browser). Arabic uses a right-to-left layout. The translations live in `admin/admin-i18n.js`; the public site's in `js/i18n.js`.
- Team and competition names in live scores come from the score provider and are not translated.

## Google AdSense
Set up in **Admin → Settings → Advertising** (stored on Cloudflare; code in `worker/ads.js`):
- **Publisher ID** (`ca-pub-…`): adds the `google-adsense-account` verification tag to every page and serves `/ads.txt` (`google.com, pub-…, DIRECT, f08c47fec0942fa0`).
- **Show ads**: loads the AdSense script on every page (needed for the review and for Auto ads) and lets Google's ad servers through the security rules of the pages only.
- **Ad units** (optional, `data-ad-slot` numbers): top banner, sidebar, homepage, and inside articles (after the 2nd paragraph). Without units, no ad space is shown; with Auto ads on in AdSense, Google places ads by itself.
- The Privacy Policy includes Google's required advertising-cookie disclosures and opt-out links; EEA/UK/Swiss visitors get Google's consent message (set it up in AdSense → Privacy & messaging).
- For approval: sections without articles are hidden from menus and kept out of Google, untranslated language versions are `noindex`, and the sample content was removed (backup: `marketing/sample-content-backup.json`).

## Security
- **Headers on every response** (`worker/security.js` for pages, API and admin; `_headers` for static files): Content-Security-Policy (only the site's own scripts can run; no framing), HSTS (HTTPS only, 1 year), nosniff, `X-Frame-Options: DENY`, strict referrer, Permissions-Policy (no camera, microphone, location…), cross-origin isolation of windows.
- **HTTPS only:** plain HTTP is redirected to HTTPS.
- **Forged requests blocked (CSRF):** every change (`POST`) to `/api/*` and `/admin/*` must come from this website, as JSON; requests from other sites, bots without an Origin, and plain HTML forms are refused with 403.
- **Admin:** branded login page with secure session cookies, checked on Cloudflare before any admin file is sent, salted PBKDF2 password hash, 10 wrong passwords → 15-minute block, admin never indexed.
- **Contact form:** hidden anti-bot field, 5 messages per hour per connection, strict field limits.
- **Live scores API:** dates limited to ±60 days (no cache-busting abuse of the score providers).
- `/.well-known/security.txt` tells security researchers how to contact you.
- No inline scripts, no `eval`, no third-party scripts (only Google Fonts).

## SEO (search engines)
Handled by the Worker (`worker/seo.js`) on every page:
- **Titles and descriptions** in English, French and Arabic, written for real searches ("football news Morocco", "Botola Pro", "Atlas Lions", "live scores").
- **Canonical address** `https://korapulse.space` (constant `SITE`), with `hreflang` links between the three languages; other addresses (workers.dev) are marked `noindex`.
- **Content in the HTML** for search engines (headline, text, links), replaced by the full page when the scripts run.
- **Structured data** (schema.org): NewsMediaOrganization, WebSite with search box, NewsArticle, BreadcrumbList, CollectionPage, About and Contact pages.
- **`/sitemap.xml`** (all articles, categories and pages in 3 languages) and **`/robots.txt`** (admin, API and previews excluded).
- Search results, sub-section filters, "Coming soon" pages and previews are `noindex`.

After connecting the domain, add it to **Google Search Console** and **Bing Webmaster Tools**, and submit `https://korapulse.space/sitemap.xml`.

## Pages and contact form
- **Pages** (Admin → Pages): About, Contact, Advertise, Careers, Privacy Policy and Terms of Use, in English, French and Arabic, at `page.html?p=<name>`. Each page is **Published**, **Coming soon** (a short notice and a "Soon" badge in the footer; Advertise and Careers start like this) or **Draft**. You can add your own pages.
- **Contact form** (on the Contact page): name, a way to reply (optional), subject and message. Messages are stored on Cloudflare (KV) for 12 months and read in **Admin → Messages**, with buttons to reply by email or WhatsApp. Spam protection: a hidden field that bots fill in, and at most 5 messages per hour from the same connection.
- The Privacy Policy and Terms of Use describe how this site actually works (no accounts, browser storage for language and theme, contact form, Cloudflare hosting, live score providers, Moroccan law 09-08). They are a starting point, not legal advice: have them checked before relying on them, and update them if you add advertising or analytics.

## Reading and sharing
Readers don't need an account: they read, and share articles with the buttons at the top and bottom of each article: **Facebook, X, WhatsApp, Instagram** and **copy link**. Instagram has no "share a link" address on the web, so on phones its button opens the phone's share menu (Instagram is in it), and on computers it copies the link to paste into a story or message.

When a link is shared, the Worker adds the article's title, summary and picture to the page (Open Graph tags), so Facebook, WhatsApp and X show a preview card. Articles without an uploaded photo use `og-image.png`. Facebook keeps previews for a while: after changing an article, refresh its preview at developers.facebook.com/tools/debug.

Comments are switched off. To turn them on: Admin → Settings → "Allow readers to comment".

## Live scores from around the world
`matches.html` ("Live" in the menu) lists the day's matches, with **All / Live / Finished / Upcoming** tabs, region and competition filters, team search and a day picker. Times are in the visitor's time zone.

The data comes from `/api/matches?date=YYYYMMDD`, served by the Worker. Choose the source in **Admin → Settings → Live scores**:

| Source | Cost | Coverage | Freshness |
| --- | --- | --- | --- |
| **API-Football** (`worker/apifootball.js`) | Free plan: 100 requests a day; Pro about $19/month: 7500 a day | Every competition in the world, one request per day of matches | Today refreshes every `1440 / (75% of daily requests)` minutes: 20 min on Free, 1 min on Pro |
| **ESPN** (`worker/matches.js`) | Free, no key, unofficial | The 40 competitions in `LEAGUES` | Every 30 seconds |

- **API-Football key:** create a free account at dashboard.api-football.com and paste the key in Admin → Settings → Live scores. It is saved on Cloudflare (KV), never in this repository. **Test connection** shows your plan and today's usage. Note: the free plan may not include the current season; the error is shown in Settings, and the site keeps using ESPN until it works.
- **Quota protection:** results are kept in KV and shared by all visitors and Cloudflare locations, so the number of visitors does not change the number of requests. Only today ±7 days use API-Football; other days use ESPN.
- **Fallback:** if API-Football fails (daily limit reached, plan, outage), the site uses ESPN; if both fail, the page says scores are unavailable and the ticker shows the matches entered in the admin.
- The score ticker under the menu shows today's live matches automatically (Moroccan and African competitions first). Switch it to your own list in Admin → Live Scores.

## Editing content
Everything is in **`js/data.js`**: site name, menu, top links, live scores, the league table and the articles.
To add an article, copy one object in `articles` and change `id`, `cat`, `title`, `author`, `date`, `excerpt` and `body`.
Put a photo path in `image` (e.g. `"images/derby.jpg"`) to replace the generated illustration. Set `featured: true` on the article that should lead the homepage.

The articles, clubs, players and scores in `data.js` are **sample content** for the demo. Replace them before going live.

## Admin dashboard (`admin/`)
A WordPress-style dashboard at **`/admin/`** (also linked from "Login" in the site's top bar).
The first time you open it, you create the administrator username and password.

| Menu | What you can do |
| --- | --- |
| **Dashboard** | At a Glance, recent activity, Quick Draft, posts per category, today's scores |
| **Posts** | All Posts (search, filter, bulk actions, Trash), Add New Post with a formatting toolbar, Add Media, category, tags, featured image, author, homepage headline, preview. Categories (add, edit, delete, menu order) |
| **Media** | Upload photos (drag and drop); large photos are resized to 1600 px |
| **Comments** | Approve, unapprove, reply, spam, trash, bulk actions |
| **Live Scores** | Edit the matches in the score ticker |
| **League Table** | Edit wins/draws/losses; played and points are calculated and the table re-sorted |
| **Users** | The writers credited on articles, with roles |
| **Settings** | Site name, tagline, social links, top bar links, admin password, and **Publish & Backup** |

Editor formatting: `**bold**`, `*italic*`, `[link](https://…)`, a line starting with `## ` for a heading, `> ` for a quote, and images inserted with **Add Media**.

### How publishing works
The site has no server or database. Your changes are saved **in your browser**, so you see them on the site right away on that computer. To put them live:
1. **Settings → Publish & Backup → Download data.js**
2. Replace `js/data.js` in the repository with the downloaded file (on GitHub: Add file → Upload files).
3. The host redeploys (automatic on Cloudflare Pages).

Use **Download backup** regularly: clearing your browser data also clears unpublished changes.

### Limits of this version (important)
- **Admin login:** on the live site, `/admin/` is locked by the Worker (`worker/index.js`, `worker/session.js`): any admin address sends you to the KoraPulse login page **`/admin/login`** (EN · FR · ع, show/hide password, Caps Lock warning, "Keep me logged in for 14 days"). A successful login gives the browser a random session cookie (HttpOnly, Secure, SameSite=Strict, valid 12 hours or 14 days); Cloudflare KV keeps only a hash of it. **Log out** ends the session; changing the password signs out every device. Change the username and password in the dashboard: **Settings → Administrator account**. The new password is stored on Cloudflare as a salted hash (KV namespace `korapulse-auth`), never in this repository. The Cloudflare secret `ADMIN_PASSWORD` is the starting password and the fallback: if you forget your password, delete the `admin` key in the `korapulse-auth` KV namespace (Cloudflare → Storage & Databases → KV) and log in with `admin` and `ADMIN_PASSWORD`. After 10 wrong passwords, an address is blocked for 15 minutes. When you open the site on your own computer without the Worker, the dashboard falls back to a password kept in that browser. For logins per writer with email codes, you can also turn on Cloudflare Access (Zero Trust) for `/admin/*`.
- **One editor, one computer at a time.** Several journalists working at once need a shared database.
- **Visitor comments don't reach you yet.** The comment form works, but without a server a comment stays in the visitor's browser. The moderation screen works for comments that are in `data.js`.
- **Photos are stored inside `data.js`** (about 5 MB in total, shown in Media). For a big photo library, store images as files in `images/` and use those paths.

The next step for a real newsroom is a small backend (e.g. a Cloudflare Worker with a D1 database and R2 for images): real logins for each writer, instant publishing, and visitor comments. The dashboard was built so it can switch to that without being redesigned.

## Design
- Colours: `--brand` (green) and `--accent` (gold) at the top of `css/style.css`.
- Dark mode follows the visitor's device, and the switch in the menu bar overrides it (remembered on that browser).
- Ad slots are grey placeholders (`.ad-leader` 970×90, `.ad-box` 300×250, `.ad-banner` 728×90): paste your ad code (e.g. Google AdSense) in their place in `js/app.js`.

## Going further
For a newsroom publishing every day, connect this design to a CMS (WordPress, Ghost or a headless CMS) so writers can publish without editing code, and to a football data API for real live scores and tables.

## Deploying
The site runs on Cloudflare Workers (static assets), configured in `wrangler.jsonc`:

```bash
npx wrangler deploy
```

This repository is connected to the `korapulse` Worker (Workers Builds): every push to `main` deploys automatically, including a new `js/data.js` from the admin.
