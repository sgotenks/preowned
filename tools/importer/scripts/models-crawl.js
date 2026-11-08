/* eslint-disable */
// Collect every model tile across pagination pages, and which tiles each category tab shows.
const fs = require('fs');
const { chromium } = require('/home/node/.excat-marketplaces/excat-marketplace/excat/skills/excat-catalog-pages/scripts/node_modules/playwright');

const [, , url, outFile] = process.argv;
const cardsSel = '[class*="CardVehicleModel__wrapper"]';
const pagerSel = '[class*="Pagination__pagination"] ol button';

const readCards = (page) => page.$$eval(cardsSel, (els) => els.map((e) => ({
  name: e.querySelector('h3')?.textContent.trim(),
  count: e.querySelector('h4')?.textContent.trim(),
  href: e.querySelector('a')?.href,
  img: e.querySelector('img')?.getAttribute('src'),
})));

async function allPages(page) {
  const seen = [];
  const nums = await page.$$eval(pagerSel, (b) => b.map((x) => x.textContent.trim()));
  for (const n of (nums.length ? nums : [null])) {
    if (n) {
      await page.locator(pagerSel, { hasText: n }).first().click();
      await page.waitForTimeout(1500);
    }
    const got = await readCards(page);
    console.log(`  page ${n}: ${got.length} [${got[0]?.name} .. ${got[got.length - 1]?.name}] hrefs:${new Set(got.map((g) => g.href)).size}`);
    got.forEach((c) => { if (!seen.find((s) => s.name === c.name)) seen.push(c); });
  }
  return seen;
}

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' })).newPage();
  page.setDefaultTimeout(30000);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForSelector(cardsSel, { timeout: 60000 });
  await page.waitForTimeout(3000);
  const tabs = await page.$$eval('[class*="TabsUnderline__wrapper"] li', (lis) => lis.map((l) => l.textContent.trim()));
  const result = { tabs, all: [], byTab: {} };
  for (let i = 0; i < tabs.length; i += 1) {
    // The OneTrust consent overlay intercepts pointer events
    await page.evaluate(() => document.getElementById('onetrust-consent-sdk')?.remove());
    await page.locator('[class*="TabsUnderline__wrapper"] li').nth(i).click();
    await page.waitForTimeout(2000);
    const cards = await allPages(page);
    result.byTab[tabs[i]] = cards.map((c) => c.name);
    cards.forEach((c) => { if (!result.all.find((a) => a.name === c.name)) result.all.push(c); });
    console.log(tabs[i], cards.length);
  }
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
