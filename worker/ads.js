// Google AdSense: set up in Admin → Settings → Advertising (stored in the AUTH KV namespace).
// - adds the AdSense verification tag and script to every page,
// - serves /ads.txt with your publisher ID,
// - passes the ad unit IDs to the pages (js/app.js shows the ads),
// - lets Google's ad servers through the Content-Security-Policy.
export async function adsConfig(env) {
  const c = (env.AUTH && (await env.AUTH.get("ads-config", "json"))) || {};
  const pub = /^ca-pub-\d{10,20}$/.test(c.client || "") ? c.client : "";
  return { client: pub, enabled: !!(pub && c.enabled), slots: c.slots || {} };
}

export const ADS_CSP = [
  "default-src 'self'",
  "script-src 'self' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.gstatic.com https://*.googleadservices.com https://*.googletagservices.com https://fundingchoicesmessages.google.com https://*.adtrafficquality.google",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.gstatic.com https://fundingchoicesmessages.google.com https://*.adtrafficquality.google",
  "frame-src https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://fundingchoicesmessages.google.com https://*.adtrafficquality.google",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join("; ");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// tags for <head>: verification (always, once the ID is saved) + the AdSense script (when ads are on)
export function adsHead(cfg) {
  if (!cfg.client) return "";
  const slots = Object.fromEntries(Object.entries(cfg.slots).filter(([k, v]) => /^\d{6,20}$/.test(String(v))));
  return `<meta name="google-adsense-account" content="${esc(cfg.client)}">`
    + (cfg.enabled ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${esc(cfg.client)}" crossorigin="anonymous"></script>`
      + `<script type="application/json" id="kp-ads">${JSON.stringify({ client: cfg.client, slots }).replace(/</g, "\\u003c")}</script>` : "");
}

export function adsTxt(cfg) {
  const id = cfg.client ? cfg.client.replace(/^ca-/, "") : "";
  const body = id
    ? `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`
    : "# No advertising account set up yet. Add your AdSense publisher ID in Admin → Settings → Advertising.\n";
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
