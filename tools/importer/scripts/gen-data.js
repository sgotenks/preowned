/* eslint-disable */
// Regenerate the generated lists inside importer files (between BEGIN/END markers):
//  - parsers/cards-model.js "model-index-snapshot": every model tile (all pagination pages) with categories,
//    from migration-work/model-index/models.json (crawled with models-crawl.js)
//  - transformers/ferrari-preowned-links.js "migrated-paths": source paths of every page in page-templates.json
//  - parsers/link-directory.js "link-directory-snapshot": the full ("Mostra tutti") SearchHints link
//    lists of every results-listing page, from migration-work/results-listing/hints.json (hints-crawl.js)
// Lists are inlined because the parser/transformer validation hooks load each file standalone (no imports).
const fs = require('fs');

const R = require('path').resolve(__dirname, '../../..');

function replaceBlock(file, name, body) {
  const src = fs.readFileSync(file, 'utf8');
  const re = new RegExp(`(// BEGIN ${name}\\n)[\\s\\S]*?(// END ${name})`);
  if (!re.test(src)) throw new Error(`markers for ${name} not found in ${file}`);
  fs.writeFileSync(file, src.replace(re, `$1${body}\n$2`));
}

const pt = JSON.parse(fs.readFileSync(`${R}/tools/importer/page-templates.json`, 'utf8'));
const paths = [...new Set(pt.templates.flatMap((t) => t.urls)
  .map((u) => new URL(u).pathname.replace(/^\/it-IT(?=\/|$)/i, '').replace(/\/$/, '') || '/'))].sort();
replaceBlock(`${R}/tools/importer/transformers/ferrari-preowned-links.js`, 'migrated-paths',
  `const migratedPaths = [\n${paths.map((p) => `  '${p}',`).join('\n')}\n];`);

const parser = `${R}/tools/importer/parsers/cards-model.js`;
if (fs.existsSync(parser) && fs.readFileSync(parser, 'utf8').includes('BEGIN model-index-snapshot')) {
  const crawl = JSON.parse(fs.readFileSync(`${R}/migration-work/model-index/models.json`, 'utf8'));
  const tabs = crawl.tabs.slice(1); // the first tab shows everything
  const models = crawl.all.map((m) => ({
    name: m.name,
    count: m.count,
    href: m.href || '',
    image: m.img,
    categories: tabs.filter((t) => (crawl.byTab[t] || []).includes(m.name)),
  }));
  replaceBlock(parser, 'model-index-snapshot',
    `const SNAPSHOT_DATE = '${new Date().toISOString().slice(0, 10)}';\nconst SNAPSHOT = ${JSON.stringify(models, null, 2)};`);
  console.log('models', models.length);
}
const hintsParser = `${R}/tools/importer/parsers/link-directory.js`;
const hintsFile = `${R}/migration-work/results-listing/hints.json`;
if (fs.existsSync(hintsParser) && fs.existsSync(hintsFile)
  && fs.readFileSync(hintsParser, 'utf8').includes('BEGIN link-directory-snapshot')) {
  const hints = JSON.parse(fs.readFileSync(hintsFile, 'utf8'));
  replaceBlock(hintsParser, 'link-directory-snapshot',
    `const SNAPSHOT_DATE = '${new Date().toISOString().slice(0, 10)}';\nconst SNAPSHOT = ${JSON.stringify(hints, null, 2)};`);
  console.log('link-directory pages', Object.keys(hints).length);
}
// Vehicle ads (ads-crawl.js): migrated page per ad, full gallery and equipment tabs
const adsFile = `${R}/migration-work/vehicle-detail/ads.json`;
if (fs.existsSync(adsFile)) {
  const ads = JSON.parse(fs.readFileSync(adsFile, 'utf8'));
  const adPaths = Object.fromEntries(Object.values(ads).map((a) => [a.sourcePath, a.path]));
  replaceBlock(`${R}/tools/importer/transformers/ferrari-preowned-links.js`, 'ad-paths',
    `const adPaths = ${JSON.stringify(adPaths, null, 2)};`);
  const gallery = Object.fromEntries(Object.entries(ads).map(([id, a]) => [id, a.gallery]));
  replaceBlock(`${R}/tools/importer/parsers/vehicle-gallery.js`, 'vehicle-gallery-snapshot',
    `// crawled ${Object.values(ads).map((a) => a.crawled).sort().pop()}\nconst SNAPSHOT = ${JSON.stringify(gallery, null, 2)};`);
  const detailsParser = `${R}/tools/importer/parsers/vehicle-details.js`;
  if (fs.existsSync(detailsParser)) {
    const tabs = Object.fromEntries(Object.entries(ads).map(([id, a]) => [id, a.tabs]));
    replaceBlock(detailsParser, 'vehicle-details-snapshot',
      `// crawled ${Object.values(ads).map((a) => a.crawled).sort().pop()}\nconst SNAPSHOT = ${JSON.stringify(tabs, null, 1)};`);
  }
  console.log('ads', Object.keys(ads).length);
}
console.log('paths', paths.length);
