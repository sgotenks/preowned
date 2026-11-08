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

export default function transform(hookName, element, payload) {
  if (hookName === 'beforeTransform') {
    removeEmptyPreloader(element);
    WebImporter.DOMUtils.remove(element, CHROME_BEFORE);
    removeAccessibilityHints(element);
    normalizeChapterLabels(element, payload.document);
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
