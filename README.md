# KoraPulse: football news website

Live: **https://korapulse.visa-abache.workers.dev** · Admin: **https://korapulse.visa-abache.workers.dev/admin/**

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
- **Admin login:** on the live site, `/admin/` is locked by the Worker (`worker/index.js`): the browser asks for a username (`admin`) and password before any admin file is sent. The password is the Cloudflare secret `ADMIN_PASSWORD` (Workers & Pages → korapulse → Settings → Variables and Secrets), never stored in this repository. To change it, edit that secret. When you open the site on your own computer without the Worker, the dashboard falls back to a password kept in that browser. For logins per writer with email codes, you can also turn on Cloudflare Access (Zero Trust) for `/admin/*`.
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
