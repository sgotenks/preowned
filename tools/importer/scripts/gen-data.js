/* eslint-disable */
// Regenerate the generated lists inside importer files (between BEGIN/END markers):
//  - parsers/cards-model.js "model-index-snapshot": every model tile (all pagination pages) with categories,
//    from migration-work/model-index/models.json (crawled with models-crawl.js)
//  - transformers/ferrari-preowned-links.js "migrated-paths": source paths of every page in page-templates.json
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
console.log('paths', paths.length);
