/* eslint-disable */
// Post-import check for results-listing pages: every page must be Italian-locale content (an
// import run geolocated elsewhere can get another market's copy). Fails loudly on any page whose
// heading, labels or CTAs are not the Italian ones.
// Usage: node tools/importer/scripts/check-listing-locale.js
const fs = require('fs');
const path = require('path');

const R = path.resolve(__dirname, '../../..');
const files = [];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p); else if (e.name.endsWith('.plain.html')) files.push(p);
});
walk(path.join(R, 'content/r'));

let bad = 0;
files.forEach((f) => {
  const html = fs.readFileSync(f, 'utf8');
  const checks = {
    heading: /<h1[^>]*>[^<]*(usate in vendita|in vendita a)/i.test(html),
    toolbar: /Perfeziona la ricerca/.test(html) && /Ordina/.test(html),
    cards: /Concessionaria:/.test(html) && /Contattaci/.test(html),
    cta: /Stai ancora cercando la Ferrari che desideri\?/.test(html),
  };
  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([k]) => k);
  if (failed.length) bad += 1;
  console.log(`${failed.length ? '✗' : '✓'} ${path.relative(R, f)}${failed.length ? `  (not Italian: ${failed.join(', ')})` : ''}`);
});
console.log(`${files.length - bad}/${files.length} listing pages are Italian-locale content`);
process.exit(bad ? 1 : 0);
