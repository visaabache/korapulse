import { ADS_CSP } from "./ads.js";

// Security for KoraPulse: headers on every response, HTTPS, and protection of the forms and
// admin actions against requests sent from other websites (CSRF).

// What the pages are allowed to load. Only the site itself, plus Google Fonts.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests"
].join("; ");

export const SECURITY_HEADERS = {
  "Content-Security-Policy": CSP,
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Permitted-Cross-Domain-Policies": "none"
};

// Add the security headers to any response (responses can be read-only, so copy them).
export function secure(res) {
  const out = new Response(res.body, res);
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) out.headers.set(k, v);
  // pages showing Google ads need Google's ad servers allowed
  if (out.headers.get("x-kp-csp") === "ads") out.headers.set("Content-Security-Policy", ADS_CSP);
  out.headers.delete("x-kp-csp");
  out.headers.delete("x-powered-by");
  return out;
}

// Changes (POST, PUT, DELETE…) must come from this website, as JSON.
// A form or script on another site cannot pass this check.
export function sameOrigin(request, url) {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return true;
  const origin = request.headers.get("origin");
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  if (!origin || origin !== url.origin) return false;
  return (request.headers.get("content-type") || "").toLowerCase().startsWith("application/json");
}

export const securityTxt = (site) => new Response(
  `Contact: ${site}/page?p=contact\nExpires: ${new Date(Date.now() + 365 * 864e5).toISOString()}\nPreferred-Languages: en, fr, ar\nCanonical: ${site}/.well-known/security.txt\n`,
  { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=86400" } }
);
