/* KoraPulse QR codes: draws a branded QR code as SVG (and PNG through a canvas).
   Uses qrcode.js (qrcode-generator by Kazuhiko Arase, MIT licence), hosted on this site. */
window.KPQR = (function () {
  const xml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function matrix(text, ec) {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs["UTF-8"];
    const q = qrcode(0, ec);
    q.addData(text, "Byte");
    q.make();
    return { n: q.getModuleCount(), dark: (r, c) => q.isDark(r, c) };
  }

  // relative luminance and contrast, to warn about colours that phones cannot scan
  function lum(hex) {
    const v = hex.replace("#", "").match(/../g).map((x) => { const c = parseInt(x, 16) / 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); });
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  }
  function contrast(fg, bg) { const a = lum(fg), b = lum(bg); return { ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05), inverted: a > b }; }

  /* o = { text, fg, bg, accent, style: "square" | "dots", logo: bool, frame: bool, caption, rtl } */
  function svg(o) {
    const fg = o.fg || "#0d4f34", bg = o.bg || "#ffffff", accent = o.accent || "#f2b705";
    const m = matrix(o.text, o.logo ? "H" : "M");
    const n = m.n, cell = 10, quiet = 4;
    const qrSize = (n + quiet * 2) * cell;
    // area kept free for the logo (about 22% of the code)
    const logoMods = o.logo ? Math.max(5, Math.round(n * 0.22) | 1) : 0;
    const l0 = Math.floor((n - logoMods) / 2), l1 = l0 + logoMods;
    const inLogo = (r, c) => o.logo && r >= l0 && r < l1 && c >= l0 && c < l1;
    const inEye = (r, c) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);

    let mods = "";
    if (o.style === "dots") {
      for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
        if (!m.dark(r, c) || inEye(r, c) || inLogo(r, c)) continue;
        mods += `<circle cx="${(c + quiet) * cell + 5}" cy="${(r + quiet) * cell + 5}" r="4.6"/>`;
      }
      // rounded finder "eyes"
      for (const [r, c] of [[0, 0], [0, n - 7], [n - 7, 0]]) {
        const x = (c + quiet) * cell, y = (r + quiet) * cell;
        mods += `<path fill-rule="evenodd" d="M${x + 18} ${y}h34a18 18 0 0 1 18 18v34a18 18 0 0 1-18 18h-34a18 18 0 0 1-18-18v-34a18 18 0 0 1 18-18zM${x + 20} ${y + 10}a10 10 0 0 0-10 10v30a10 10 0 0 0 10 10h30a10 10 0 0 0 10-10v-30a10 10 0 0 0-10-10z"/>`;
        mods += `<rect x="${x + 20}" y="${y + 20}" width="30" height="30" rx="9" fill="${o.eye || fg}"/>`;
      }
    } else {
      let d = "";
      for (let r = 0; r < n; r++) {
        let c = 0;
        while (c < n) {
          if (m.dark(r, c) && !inLogo(r, c)) {
            let e = c;
            while (e < n && m.dark(r, e) && !inLogo(r, e)) e++;
            d += `M${(c + quiet) * cell} ${(r + quiet) * cell}h${(e - c) * cell}v${cell}h-${(e - c) * cell}z`;
            c = e;
          } else c++;
        }
      }
      mods = `<path d="${d}"/>`;
    }

    let logo = "";
    if (o.logo) {
      const box = logoMods * cell, x = (l0 + quiet) * cell, y = x, pad = box * 0.1;
      const s = (box - pad * 2) / 64;
      logo = `<rect x="${x + 2}" y="${y + 2}" width="${box - 4}" height="${box - 4}" rx="${box * 0.22}" fill="${bg}"/>
        <g transform="translate(${x + pad} ${y + pad}) scale(${s})"><circle cx="32" cy="32" r="28" fill="none" stroke="${fg}" stroke-width="6"/><path d="M6 34 H19 L24 22 L31 44 L37 28 L41 34 H58" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    }

    const code = (o.frame ? "" : `<rect width="${qrSize}" height="${qrSize}" fill="${bg}"/>`) + `<g fill="${fg}">${mods}</g>${logo}`;
    if (!o.frame) return { svg: `<svg xmlns="http://www.w3.org/2000/svg" direction="ltr" viewBox="0 0 ${qrSize} ${qrSize}" width="${qrSize}" height="${qrSize}" shape-rendering="${o.style === "dots" ? "auto" : "crispEdges"}">${code}</svg>`, w: qrSize, h: qrSize, version: (n - 17) / 4 };

    // frame: coloured card with the brand on top and a caption below
    const b = Math.round(qrSize * 0.07), top = Math.round(qrSize * 0.2), bottom = Math.round(qrSize * 0.24);
    const W = qrSize + b * 2, H = qrSize + top + bottom, r = Math.round(qrSize * 0.06);
    const brandY = top * 0.62, fs = Math.round(qrSize * 0.085);
    const cap = (o.caption || "").trim();
    const capFs = Math.round(Math.min(qrSize * 0.075, (W * 0.9) / Math.max(8, cap.length * 0.6)));
    const font = o.rtl ? "Cairo, Tahoma, Arial, sans-serif" : "Oswald, 'Arial Narrow', Arial, sans-serif";
    const out = `<svg xmlns="http://www.w3.org/2000/svg" direction="ltr" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
      <rect width="${W}" height="${H}" rx="${r}" fill="${o.frameColor || fg}"/>
      <g transform="translate(${W / 2 - fs * 2.9} ${brandY - fs * 0.88}) scale(${fs / 64})"><circle cx="32" cy="32" r="28" fill="none" stroke="#fff" stroke-width="6"/><path d="M6 34 H19 L24 22 L31 44 L37 28 L41 34 H58" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></g>
      <text x="${W / 2 - fs * 1.75}" y="${brandY}" font-family="Oswald, 'Arial Narrow', Arial, sans-serif" font-weight="700" font-size="${fs}" fill="#fff" textLength="${(fs * 4.6).toFixed(1)}" lengthAdjust="spacingAndGlyphs">KORA<tspan fill="${accent}">PULSE</tspan></text>
      <g transform="translate(${b} ${top})"><rect width="${qrSize}" height="${qrSize}" rx="${r * 0.6}" fill="${bg}"/>${code}</g>
      ${cap ? `<text x="${W / 2}" y="${top + qrSize + bottom * 0.58}" text-anchor="middle" font-family="${font}" font-weight="700" font-size="${capFs}" fill="#fff"${o.rtl ? ' direction="rtl"' : ""}>${xml(cap)}</text>` : ""}
    </svg>`;
    return { svg: out, w: W, h: H, version: (n - 17) / 4 };
  }

  // PNG of a given width, through an <img> and a <canvas>
  function png(svgText, w, h, width) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(new Blob([svgText], { type: "image/svg+xml" }));
      const img = new Image();
      img.onload = () => {
        const cv = document.createElement("canvas");
        cv.width = width; cv.height = Math.round((width * h) / w);
        const ctx = cv.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        cv.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("png"))), "image/png");
      };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("svg")); };
      img.src = url;
    });
  }

  return { svg, png, contrast };
})();
