/* eslint-disable */

// Next.js page data: the #__NEXT_DATA__ script, or window.__NEXT_DATA__ once the importer has stripped scripts
function nextData(document) {
  try {
    const s = document.getElementById('__NEXT_DATA__');
    if (s) return JSON.parse(s.textContent);
  } catch (e) { /* fall through */ }
  return (typeof window !== 'undefined' && window.__NEXT_DATA__) || {};
}
/* global WebImporter */

/**
 * Vehicle ad pages (/it-IT/a/...): prepares the source before the block parsers run.
 * - drops the blurred hero backdrop, the sticky summary/enquiry bars (rebuilt by vehicle-summary)
 *   and the bookmark buttons (saved vehicles live in the source app's storage)
 * - "Torna alle vetture" (history back on the source) -> link to the Italian results listing
 * - "Contattaci" buttons -> links to the enquiry form the source opens in its popup
 * - related cars: title -> h2, the carousel's "Visualizza tutto" link -> a paragraph after it
 * - Ferrari Approved band call to action -> a plain link paragraph
 * Does nothing on other pages.
 */

const BACK_HREF = 'https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rfc';
const ENQUIRY_SLUG = 'new-enquiry-usato-preowned';
const ENQUIRY_FALLBACK = 'https://forms.ferrari.com/content/forms/af/ferrari/af/fcom/generic-r.html';

function enquiryUrl(document) {
  let base = ENQUIRY_FALLBACK;
  try {
    const data = nextData(document);
    const v = (data.props?.pageProps?.initialState?.channelVariables || []).find((x) => x.id === ENQUIRY_SLUG);
    if (v?.content?.url) base = v.content.url.trim();
  } catch (e) { /* fallback */ }
  const lang = (document.documentElement.getAttribute('lang') || 'it').slice(0, 2).toLowerCase();
  const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
  url.searchParams.set('form-slug', ENQUIRY_SLUG);
  return url.href;
}

function link(document, href, text) {
  const p = document.createElement('p');
  const a = document.createElement('a');
  a.setAttribute('href', href);
  a.textContent = text;
  p.append(a);
  return p;
}

const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

export default function transform(hookName, element, payload) {
  if (hookName !== 'beforeTransform') return;
  const { document } = payload;
  if (!element.querySelector('section[class*="HeroCarAD__wrapper"]')) return;

  WebImporter.DOMUtils.remove(element, [
    '[class*="HeroCarAD__photo"]',
    '[class*="HeroCarAD__sticky"]',
    '[class*="ADBookmarkBtn"]',
    '[class*="VehicleCard__bookmark"]',
  ]);

  const back = element.querySelector('[class*="HeroCarAD__navigation"]');
  if (back) back.replaceWith(link(document, BACK_HREF, clean(back.textContent) || 'Torna alle vetture'));

  const form = enquiryUrl(document);
  element.querySelectorAll('button[class*="HeroCarAD__enquire"], [class*="DealerFullInfo__links"] button').forEach((button) => {
    const a = document.createElement('a');
    a.setAttribute('href', form);
    a.textContent = clean(button.textContent);
    button.replaceWith(a);
  });

  const related = element.querySelector('[class*="ADRelated__wrapper"]');
  if (related) {
    const title = related.querySelector('[class*="ADRelated__title"]');
    if (title) {
      const h2 = document.createElement('h2');
      h2.textContent = clean(title.textContent);
      title.replaceWith(h2);
    }
    const all = related.querySelector('[class*="Carousel__pagination-link"] a[href]');
    const carousel = related.querySelector('[class*="VehicleCarousel__wrapper"]');
    if (all && carousel) carousel.after(link(document, all.getAttribute('href'), clean(all.textContent)));
    if (all) all.closest('[class*="Carousel__pagination-link"]').remove();
  }

  const cta = element.querySelector('[class*="ParagraphGrid__ctaWrapper"] a[href]');
  if (cta) cta.closest('[class*="ParagraphGrid__ctaWrapper"]').replaceWith(link(document, cta.getAttribute('href'), clean(cta.textContent)));
  element.querySelectorAll('[class*="ParagraphGrid__title"]').forEach((t) => {
    const h2 = document.createElement('h2');
    h2.textContent = clean(t.textContent);
    t.replaceWith(h2);
  });
}
