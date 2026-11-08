/* eslint-disable */
// Crawl vehicle ad pages (/it-IT/a/...) for the parts the importer can't read from the page DOM:
//  - the full photo gallery (the page renders 5 photos; the rest load from the gallery playlist API)
//  - the four equipment tabs (only the selected tab is rendered; the others render on click)
//  - the chassis number, used as the ad's migrated page name
// Writes migration-work/vehicle-detail/ads.json, which gen-data.js inlines into the parsers and the
// links transformer.
// usage: node tools/importer/scripts/ads-crawl.js <urls.txt>
const fs = require('fs');
const path = require('path');
const { chromium } = require('/home/node/.excat-marketplaces/excat-marketplace/excat/skills/excat-catalog-pages/scripts/node_modules/playwright');

const R = path.resolve(__dirname, '../../..');
const OUT = `${R}/migration-work/vehicle-detail/ads.json`;
const urls = fs.readFileSync(process.argv[2], 'utf8').split('\n').map((u) => u.trim()).filter(Boolean);

const sanitize = (s) => decodeURIComponent(s).toLowerCase().normalize('NFD')
  .replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

(async () => {
  const out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const browser = await chromium.launch();
  for (const url of urls) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' });
    const page = await ctx.newPage();
    page.setDefaultTimeout(30000);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForTimeout(6000);
    await page.evaluate(() => document.querySelectorAll('#onetrust-consent-sdk, .onetrust-pc-dark-filter').forEach((e) => e.remove()));

    const data = await page.evaluate(() => {
      const nd = JSON.parse(document.getElementById('__NEXT_DATA__').textContent);
      const ad = nd.props.pageProps.initialProps.adDetailsData.ads[0];
      return { id: ad.id, chassis: String(ad.chassis || ''), galleryId: ad.heroImages?.thronGalleryId, locale: nd.props.pageProps.initialState.locale.locale };
    });
    if (data.locale !== 'it-IT') throw new Error(`${url}: page locale is ${data.locale}, expected it-IT`);

    // full gallery, in the playlist order the source lightbox uses
    const gallery = await page.evaluate(async (gid) => {
      const r = await fetch(`/api/v1/thron/playlist-content?xcontentId=${gid}`);
      const list = await r.json();
      return list.filter((x) => x.contentType === 'IMAGE').map((x) => x.xcontentId);
    }, data.galleryId);

    // equipment tabs, rendered one by one
    const tabs = [];
    const buttons = page.locator('[class*="TabCarADDetails__wrapper"] [class*="TabsUnderline__button"]');
    const n = await buttons.count();
    for (let i = 0; i < n; i += 1) {
      await buttons.nth(i).click({ force: true });
      await page.waitForTimeout(900);
      // "Vedi tutte le caratteristiche": the standard equipment list is truncated until expanded
      const more = page.locator('[class*="TabCarADDetails__content"] button:has-text("Vedi tutte")');
      if (await more.count()) { await more.first().click({ force: true }); await page.waitForTimeout(600); }
      const tab = await page.evaluate(() => {
        const root = document.querySelector('[class*="TabCarADDetails__content"]');
        const leafs = (el) => [...el.querySelectorAll('*')].filter((e) => !e.children.length)
          .map((e) => e.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean);
        const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim() : '');
        // value text without its unit span ("6496" + <span>cm3</span>)
        const ownText = (el) => (el ? [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim() : '');
        const accs = [...root.querySelectorAll('[class*="Accordion__accordion"]')];
        if (accs.length) {
          // technical specs: key figures row (value, unit, label) above the accordions
          const primary = [...root.querySelectorAll('[class*="TechnicalDetails__primaryData"] li')].map((li) => ({
            value: ownText(li.querySelector('[class*="Specs__value"]')),
            unit: txt(li.querySelector('[class*="Specs__unit"]')),
            label: txt(li.querySelector('[class*="Specs__label"]')),
          }));
          return {
            primary,
            groups: accs.map((acc) => ({
              title: txt(acc.querySelector('[class*="Accordion__title"]')),
              items: [...acc.querySelectorAll('[class*="Accordion__body"] li')].map((li) => {
                const value = li.querySelector('[class*="TechSpecs__value"]');
                if (!value) return leafs(li).join(' ');
                return { label: txt(li.querySelector('strong')), value: ownText(value), unit: txt(value.querySelector('[class*="TechSpecs__unit"]')) };
              }),
            })),
          };
        }
        const std = root.querySelector('[class*="StandardEquipment__wrapper"]');
        if (std) {
          return {
            groups: [{
              title: std.querySelector('h1, h2, h3, h4')?.textContent.replace(/\s+/g, ' ').trim() || '',
              items: [...std.querySelectorAll('li')].map((li) => li.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean),
            }],
          };
        }
        const notes = root.querySelector('[class*="DealerNotes__text"]');
        return { groups: [{ title: '', text: notes ? notes.textContent : root.innerText }] };
      });
      tabs.push({ tab: (await buttons.nth(i).textContent()).replace(/\s+/g, ' ').trim(), ...tab });
    }

    const segs = new URL(url).pathname.replace(/^\/it-IT/i, '').split('/').filter(Boolean); // a/region/usato-ferrari/country/dealer/model/id
    const migratedPath = `/${[...segs.slice(0, -1).map(sanitize), data.chassis || sanitize(segs[segs.length - 1]).slice(0, 12)].join('/')}`;
    out[data.id] = {
      url,
      sourcePath: `/${segs.join('/')}`,
      chassis: data.chassis,
      path: migratedPath,
      crawled: new Date().toISOString().slice(0, 10),
      gallery,
      tabs,
    };
    console.log(migratedPath, 'gallery', gallery.length, 'tabs', tabs.map((t) => `${t.tab}(${t.groups.length})`).join(', '));
    await ctx.close();
  }
  await browser.close();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
})().catch((e) => { console.error(e); process.exit(1); });
