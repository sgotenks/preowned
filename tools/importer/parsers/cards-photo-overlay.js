/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-photo-overlay. Base: cards.
 * Source: https://preowned.ferrari.com/it-IT
 * Selector: [class*="SplitBanner__wrapper"]
 * Model (xwalk): container cards-photo-overlay; item cards-photo-overlay-card ->
 *   image (+imageAlt), text. One row per tile: image | text (eyebrow, heading, CTA link).
 * The empty full-tile overlay links are dropped by the importer, so the CTA link is
 * rebuilt from the visible action button (falling back to any tile href).
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  const items = [...element.querySelectorAll('[class*="SplitBanner__item__"]')];
  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('[class*="SplitBanner__content-media"] img');
    const imageCell = img ? hinted('image', img) : '';

    const nodes = [];
    const pre = item.querySelector('[class*="SplitBanner__pre-title"]');
    const preText = pre ? clean(pre.textContent) : '';
    if (preText) {
      const p = document.createElement('p');
      p.textContent = preText;
      nodes.push(p);
    }
    const title = item.querySelector('[class*="SplitBanner__content-inside"] [class*="Title__title"]');
    const titleText = title ? clean(title.textContent) : '';
    if (titleText) {
      const h = document.createElement('h3');
      h.textContent = titleText;
      nodes.push(h);
    }
    const cta = item.querySelector('[class*="SplitBanner__actions"] a[class*="BtnAction"]');
    const hrefSource = cta || item.querySelector('a[href]');
    const href = hrefSource ? hrefSource.getAttribute('href') : '';
    if (href) {
      const textEl = cta && cta.querySelector('[class*="BtnAction__text"]');
      const label = clean(textEl ? textEl.textContent : (cta ? cta.textContent : ''))
        || (cta && clean(cta.getAttribute('title'))) || titleText || href;
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.textContent = label;
      p.appendChild(a);
      nodes.push(p);
    }
    const textCell = nodes.length ? hinted('text', ...nodes) : '';

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-photo-overlay', cells });
  element.replaceWith(block);
}
