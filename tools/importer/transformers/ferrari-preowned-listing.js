/* eslint-disable */
/* global WebImporter */

/**
 * Results-listing transformer for preowned.ferrari.com search result pages (/r/.../rfc|rfcd|rfcm)
 * and the favorites page. Every selector here only exists on those pages, so other templates
 * are unaffected.
 * beforeTransform:
 *  - removes search-app UI with no authorable content (sticky toolbar copy, compare bar,
 *    back-to-top, mobile expanders, card bookmarks, the empty hero placeholder)
 *  - results heading "<span>23</span><h1> Ferrari Roma usate…</h1>" -> one h1
 *  - load-more bar -> "Hai visto 11 di 23 veicoli" + "Mostra altri" link (live next page),
 *    moved after the vehicle listing so the cards parser can replace the listing
 *  - "Stai ancora cercando…" footer: h2 + text + "Espandi la ricerca" (live search) and
 *    "Richiedi" (Ferrari enquiry form, opened in a drawer by scripts.js)
 * Links marked data-keep-live stay on the live site (see ferrari-preowned-links.js): the search
 * app's filtering, pagination, comparing and saving only exist there.
 */

const APP_UI = [
  '[class*="SearchRefine__sticky"]',
  '[class*="SearchRefine__backToTop"]',
  '[class*="SearchRefine__expand-mobile"]',
  '[class*="SearchRefine__expander"]',
  '[class*="CompareRecap__"]',
  '[class*="VehicleCard__bookmark"]',
  '[class*="SearchResults__hero"][class*="isEmpty"]',
];

const ENQUIRE_SLUG = 'form-enquire-global-preowned-free-enquire';
const ENQUIRE_FALLBACK = 'https://forms.ferrari.com/content/forms/af/ferrari/af/dws/generic.html';

const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

function enquireFormUrl(document, lang) {
  let base = ENQUIRE_FALLBACK;
  try {
    const data = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '{}');
    const vars = data.props?.pageProps?.initialState?.channelVariables || [];
    const v = vars.find((x) => x?.content?.slug === ENQUIRE_SLUG);
    if (v?.content?.url) base = v.content.url.trim();
  } catch (e) { /* fallback */ }
  const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
  url.searchParams.set('form-slug', ENQUIRE_SLUG);
  return url.href;
}

function liveLink(document, href, text) {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('data-keep-live', 'true');
  a.textContent = text;
  return a;
}

function normalizeHeading(element, document) {
  element.querySelectorAll('[class*="SearchResults__title"]').forEach((title) => {
    const text = clean(title.textContent);
    if (!text) { title.remove(); return; }
    const h1 = document.createElement('h1');
    h1.textContent = text;
    title.replaceWith(h1);
  });
}

function normalizeLoadMore(element, document, pageUrl) {
  element.querySelectorAll('[class*="SearchResultListing__loadMore"]').forEach((bar) => {
    const listing = bar.closest('.search-result-listing');
    const frag = document.createDocumentFragment();
    const seen = clean(bar.querySelector('p')?.textContent);
    if (seen) {
      const p = document.createElement('p');
      p.textContent = seen;
      frag.append(p);
    }
    const more = bar.querySelector('a[href]');
    if (more) {
      const p = document.createElement('p');
      p.append(liveLink(document, new URL(more.getAttribute('href'), pageUrl).href, clean(more.textContent)));
      frag.append(p);
    }
    bar.remove();
    if (!frag.childNodes.length) return;
    if (listing) listing.after(frag);
    else element.append(frag);
  });
}

function normalizeFooter(element, document, pageUrl, lang) {
  element.querySelectorAll('[class*="SearchResultsFooter__wrapper"]').forEach((footer) => {
    const frag = document.createDocumentFragment();
    const title = clean(footer.querySelector('h1, h2, h3, h4')?.textContent);
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = title;
      frag.append(h2);
    }
    const subtitle = clean(footer.querySelector('[class*="Headline__subtitle"]')?.textContent);
    if (subtitle) {
      const p = document.createElement('p');
      p.textContent = subtitle;
      frag.append(p);
    }
    const buttons = [...footer.querySelectorAll('[class*="SearchResultsFooter__ctas"] button, [class*="SearchResultsFooter__ctas"] a')];
    buttons.forEach((button, i) => {
      const label = clean(button.textContent);
      if (!label) return;
      const p = document.createElement('p');
      if (i === buttons.length - 1) {
        // last CTA ("Richiedi") opens the Ferrari enquiry form: primary button
        const strong = document.createElement('strong');
        const a = document.createElement('a');
        a.setAttribute('href', enquireFormUrl(document, lang));
        a.textContent = label;
        strong.append(a);
        p.append(strong);
      } else {
        // "Espandi la ricerca" opens the search filters: hand off to the live search
        p.append(liveLink(document, pageUrl, label));
      }
      frag.append(p);
    });
    // keep the wrapper: it is the section boundary for the sections transformer
    footer.replaceChildren(frag);
  });
}

export default function transform(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;
  const document = payload.document;
  const isListing = element.querySelector('[class*="SearchResults__wrapper"], [class*="Favorites__wrapper"]');
  if (!isListing) return;
  const pageUrl = (payload.params && payload.params.originalURL) || payload.url
    || (document.defaultView && document.defaultView.location.href);
  const lang = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2).toLowerCase();
  WebImporter.DOMUtils.remove(element, APP_UI);
  // the toolbar is rendered twice (inline + sticky copy); before scrolling the copy may not
  // carry its sticky class yet, so keep only the first one
  [...element.querySelectorAll('[class*="SearchRefine__wrapper"]')].slice(1).forEach((el) => el.remove());
  normalizeHeading(element, document);
  normalizeLoadMore(element, document, pageUrl);
  normalizeFooter(element, document, pageUrl, lang);
}
