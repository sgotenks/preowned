/* eslint-disable */
// Crawl the full SearchHints link lists ("Mostra tutti" expanded) of every results-listing page.
// The lists past the first 12 links are fetched by the source app on click, so the importer can't
// see them; this snapshot is inlined into parsers/link-directory.js by gen-data.js.
// Usage: node tools/importer/scripts/hints-crawl.js [out.json]
const fs = require('fs');
const path = require('path');
const { chromium } = require('/home/node/.excat-marketplaces/excat-marketplace/excat/skills/excat-catalog-pages/scripts/node_modules/playwright');

const R = path.resolve(__dirname, '../../..');
const outFile = process.argv[2] || `${R}/migration-work/results-listing/hints.json`;
const pt = JSON.parse(fs.readFileSync(`${R}/tools/importer/page-templates.json`, 'utf8'));
const urls = pt.templates.find((t) => t.name === 'results-listing').urls.filter((u) => /\/r\//.test(u));

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' });
  const result = {};
  for (const url of urls) {
    const page = await ctx.newPage();
    page.setDefaultTimeout(20000);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(5000);
    await page.evaluate(() => document.querySelectorAll('#onetrust-consent-sdk').forEach((e) => e.remove()));
    const lang = await page.evaluate(() => document.documentElement.lang);
    if (lang !== 'it') throw new Error(`${url}: page language is "${lang}", expected "it"`);
    const ctas = page.locator('[class*="SearchHints__cta"] button');
    for (let i = (await ctas.count()) - 1; i >= 0; i -= 1) {
      await ctas.nth(i).scrollIntoViewIfNeeded();
      await ctas.nth(i).click();
      await page.waitForTimeout(2500);
    }
    result[new URL(url).pathname] = await page.evaluate(() => [...document.querySelectorAll('[class*="SearchHints__block"]')].map((b) => ({
      title: b.querySelector('[class*="SearchHints__title"]')?.textContent.replace(/\s+/g, ' ').trim(),
      links: [...b.querySelectorAll('li a')].map((a) => [a.textContent.replace(/\s+/g, ' ').trim(), a.href]),
    })));
    console.log(url, result[new URL(url).pathname].map((b) => `${b.title} (${b.links.length})`).join(' | '));
    await page.close();
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
