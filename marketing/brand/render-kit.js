// Renders every asset in kit.html to PNG: node render-kit.js
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 2560, height: 1920 } });
  await p.goto('file://' + path.join(__dirname, 'kit.html'), { waitUntil: 'networkidle' });
  for (const k of await p.evaluate(() => window.KIT)) {
    const a = await p.evaluate((x) => show(x), k);
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(__dirname, k + '.png'), clip: { x: 0, y: 0, width: a.w, height: a.h }, omitBackground: a.t });
  }
  await b.close(); console.log('done');
})();
