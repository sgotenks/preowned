/* eslint-disable */
/* global WebImporter */

/**
 * Cleanup transformer for preowned.ferrari.com (Next.js, CSS-module hashed classes).
 * Removes non-authorable chrome: Ferrari top bar (super header), the "Ferrari Approved"
 * channel header/nav, site footer (super footer), cookie/OneTrust, chat widgets,
 * accessibility widget, sticky scroll/chapter indicator, preloader, custom cursor,
 * scripts/styles and tracking iframes.
 */

const CHROME_BEFORE = [
  // Page preloader (Ferrari logo splash) and custom cursor
  '[class*="Preloader__"]',
  '[class*="MainCursor__"]',
  // Ferrari corporate top bar (super header) and "Ferrari Approved" channel header + nav
  '#sh-ntw-ferrari',
  '.fa-superheader',
  'header',
  '[class*="ChannelMenuHeader__"]',
  '[class*="MenuHeader__"]',
  'nav',
  '[class*="Breadcrumb"]',
  // Sticky chapter / scroll indicator
  '[class*="ScrollIndicatorLandscape"]',
  '[class*="ScrollIndicator__"]',
  // Floating share widget
  '[class*="Share__wrapper"]',
  // Site footer (Ferrari super footer + channel footer)
  '#sf-ntw-ferrari',
  '.fa-superfooter',
  'footer',
  '[class*="Footer__wrapper"]',
  '[class*="ChannelFooter__"]',
  // Cookie banner / OneTrust
  '#onetrust-consent-sdk',
  '#onetrust-banner-sdk',
  '#onetrust-pc-sdk',
  '[id^="onetrust-"]',
  '.optanon-alert-box-wrapper',
  '[class*="CookieBanner"]',
  '[class*="cookie-banner"]',
  // Chat widgets (Genesys messenger, Salesforce)
  '#genesys-thirdparty',
  '#genesys-messenger',
  '.genesys-app',
  '[id^="genesys-"]',
  '.embeddedServiceHelpButton',
  '.embeddedServiceSidebar',
  // Accessibility widget
  '#userwayAccessibilityIcon',
  '.uwy',
  '[class*="userway"]',
  '#accessibilityWidget',
  '[class*="accessibility-widget"]',
  '[class*="AccessibilityWidget"]',
  // accessiBe widget and its screen-reader hint ("Premi Opzione+1 per la modalità lettore...")
  '[class*="acsb"]',
  '[id^="acsb"]',
  '[data-acsb-hidden]',
  // Modals / popups
  '#popup-root',
  '[class*="Modal__"]',
  // Tracking / third-party iframes
  'iframe[title="GPP Locator"]',
  'iframe[src*="mypurecloud"]',
  'iframe:not([src])',
];

const CHROME_AFTER = [
  'script',
  'style',
  'noscript',
  'link',
  'source',
  'iframe:not([src*="youtube"]):not([src*="vimeo"])',
];

function removeEmptyPreloader(element) {
  // First child of the Next.js layout wrapper holds only the Ferrari logo splash (data: SVG).
  const preloader = element.querySelector('#__next > div > div:first-child');
  if (!preloader) return;
  const imgs = [...preloader.querySelectorAll('img')];
  const onlyDataSvg = imgs.length > 0 && imgs.every((img) => (img.getAttribute('src') || '').startsWith('data:image/svg'));
  if (onlyDataSvg && !preloader.textContent.trim() && !preloader.querySelector('.page-menu-hook')) {
    preloader.remove();
  }
}

function removeAccessibilityHints(element) {
  // The accessiBe hint has no stable class: find it by its link to accessibe.com.
  element.querySelectorAll('a[href*="accessibe.com"]').forEach((a) => {
    (a.closest('p, div, span') || a).remove();
  });
}

function normalizeChapterLabels(element, document) {
  // "1 —— PANORAMICA": number, decorative rule and title in separate nodes -> <p><strong>1</strong> Panoramica</p>
  element.querySelectorAll('[class*="Chapter__chapter"]').forEach((chapter) => {
    const num = chapter.querySelector('[class*="Chapter__prefix"]');
    const title = [...chapter.querySelectorAll('strong')].find((s) => s !== num);
    if (!num || !title) return;
    const p = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = num.textContent.trim();
    p.append(strong, ` ${title.textContent.trim()}`);
    chapter.replaceWith(p);
  });
}

// Ferrari Adaptive Forms opened by "#form-<slug>" CTAs. The page data (__NEXT_DATA__) maps each
// slug to its form URL; the fallback covers the forms seen on the site.
const FORM_FALLBACK = {
  'Form-enquiry-approved-valuemycar': 'https://forms.ferrari.com/content/forms/af/ferrari/af/dws/service.html',
};

function formUrls(document) {
  const urls = { ...FORM_FALLBACK };
  try {
    const data = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '{}');
    const walk = (o) => {
      if (!o || typeof o !== 'object') return;
      if (Array.isArray(o)) { o.forEach(walk); return; }
      if (o.type === 'AdobeForm' && o.content?.slug && o.content?.url) urls[o.content.slug] = o.content.url.trim();
      Object.values(o).forEach(walk);
    };
    walk(data.props);
  } catch (e) { /* no page data: fallback only */ }
  return urls;
}

// "#form-<slug>?..." -> https://forms.ferrari.com/.../<form>.<lang>.html?form-slug=<slug>,
// the same URL the source popup loads
function formUrl(target, urls, lang) {
  const m = (target || '').match(/^#form-([^?&]+)/);
  if (!m || !urls[m[1]]) return null;
  const url = new URL(urls[m[1]].replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
  url.searchParams.set('form-slug', m[1]);
  return url.href;
}

function normalizeTextBlocks(element, document, lang) {
  // TextBlock CTA buttons that open an Adaptive Form popup -> links to the form (opened in a modal)
  const urls = formUrls(document);
  element.querySelectorAll('[class*="TextBlock__ctas"] button[data-event-target^="#form-"]').forEach((button) => {
    const href = formUrl(button.getAttribute('data-event-target'), urls, lang);
    if (!href) return;
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.innerHTML = button.innerHTML;
    button.replaceWith(a);
  });

  // TextBlock CTAs (BtnAction: label + ringed chevron) -> <p><em><a>Label</a></em></p> (secondary button)
  element.querySelectorAll('[class*="TextBlock__ctas"]').forEach((ctas) => {
    const links = [...ctas.querySelectorAll('a[href]')];
    if (!links.length) return;
    const frag = document.createDocumentFragment();
    links.forEach((link) => {
      const labelEl = link.querySelector('[class*="BtnAction__text"]') || link;
      const label = (labelEl.textContent || link.getAttribute('title') || '').replace(/\s+/g, ' ').trim();
      if (!label) return;
      const p = document.createElement('p');
      const em = document.createElement('em');
      const a = document.createElement('a');
      a.setAttribute('href', link.getAttribute('href'));
      a.textContent = label;
      em.append(a);
      p.append(em);
      frag.append(p);
    });
    ctas.replaceWith(frag);
  });

  // TextBlock body copy authored as bare text + <br><br> + lists -> paragraphs and lists
  element.querySelectorAll('[class*="TextBlock__content"] div').forEach((div) => {
    const hasText = [...div.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!hasText) return;
    const out = document.createDocumentFragment();
    let p = null;
    let brRun = 0;
    const flush = () => { if (p && p.textContent.trim()) out.append(p); p = null; };
    [...div.childNodes].forEach((node) => {
      if (node.nodeName === 'BR') {
        brRun += 1;
        if (brRun >= 2) flush();
        else if (p) p.append(document.createElement('br'));
        return;
      }
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      if (brRun === 1 && p && p.lastChild && p.lastChild.nodeName === 'BR' && node.nodeType === 1 && /^(UL|OL|P|DIV|H\d)$/.test(node.nodeName)) p.lastChild.remove();
      brRun = 0;
      if (node.nodeType === 1 && /^(UL|OL|P|H\d|TABLE)$/.test(node.nodeName)) {
        flush();
        out.append(node);
        return;
      }
      if (!p) p = document.createElement('p');
      p.append(node.nodeType === 3 ? node.textContent.replace(/^\s+/, p.childNodes.length ? ' ' : '') : node);
    });
    flush();
    div.replaceWith(out);
  });
}

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    removeEmptyPreloader(element);
    WebImporter.DOMUtils.remove(element, CHROME_BEFORE);
    removeAccessibilityHints(element);
    normalizeChapterLabels(element, payload.document);
    const pageLang = (payload.document.documentElement.getAttribute('lang') || 'it').slice(0, 2).toLowerCase();
    normalizeTextBlocks(element, payload.document, pageLang);
  }

  if (hookName === 'afterTransform') {
    WebImporter.DOMUtils.remove(element, CHROME_AFTER);
    // Strip tracking / inline-handler attributes
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const n = attr.name;
        if (n.startsWith('on') || n.startsWith('data-track') || n.startsWith('data-gtm')
          || n.startsWith('data-analytics') || n === 'data-testid') {
          el.removeAttribute(n);
        }
      });
    });
  }
}
