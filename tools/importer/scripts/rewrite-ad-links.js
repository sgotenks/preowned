/* eslint-disable */
// Point links to migrated vehicle ads at their migrated pages in already-imported content, without
// re-importing those pages (the homepage stock rotates and depends on the import's geolocation).
// Only hrefs that exactly equal a crawled ad URL (migration-work/vehicle-detail/ads.json) change.
// usage: node tools/importer/scripts/rewrite-ad-links.js <file.plain.html> [...]
const fs = require('fs');
const path = require('path');

const R = path.resolve(__dirname, '../../..');
const ads = Object.values(JSON.parse(fs.readFileSync(`${R}/migration-work/vehicle-detail/ads.json`, 'utf8')));
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

process.argv.slice(2).forEach((file) => {
  let html = fs.readFileSync(file, 'utf8');
  let n = 0;
  ads.forEach((ad) => {
    const re = new RegExp(`href="${escape(ad.url)}"`, 'g');
    html = html.replace(re, () => { n += 1; return `href="${ad.path}"`; });
  });
  fs.writeFileSync(file, html);
  console.log(`${path.relative(R, file)}: ${n} link(s) rewritten`);
});
