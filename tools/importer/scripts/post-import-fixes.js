/* eslint-disable */
// Fixes applied to imported pages after run-bulk-import.js, for things the importer itself mangles.
//  - Genuine accessory images (cards-accessory): the CDN image ids contain "|". The importer builds a
//    regular expression from every image URL without escaping it (and decodes %7C back to "|"), so the
//    parser double-encodes the pipes (%257C). This puts back the single encoding the CDN expects.
// usage: node tools/importer/scripts/post-import-fixes.js [content dir]
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || path.resolve(__dirname, '../../../content'));
const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) return walk(p);
  return e.name.endsWith('.plain.html') ? [p] : [];
});

let changed = 0;
walk(root).forEach((file) => {
  const html = fs.readFileSync(file, 'utf8');
  const fixed = html.replace(/(cdn\.ferrari\.com\/cms\/dws\/media\/ntw\/img\/resize\/[^"'\s)]*)/g, (m) => m.replace(/%257C/gi, '%7C'));
  if (fixed !== html) {
    fs.writeFileSync(file, fixed);
    changed += 1;
    console.log('fixed', path.relative(root, file));
  }
});
console.log(`${changed} file(s) changed`);
