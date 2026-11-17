// Renders the posts in posts.json to 1080x1350 PNG files: node render.js
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const posts = JSON.parse(fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf8'));
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'template.html'), { waitUntil: 'networkidle' });
  for (const post of posts) {
    await p.evaluate((x) => render(x), post);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `post-${post.n}.png`) });
  }
  await b.close();
  console.log('rendered', posts.length);
})();
