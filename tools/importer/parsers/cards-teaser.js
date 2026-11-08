/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-teaser. Base: cards.
 * Source: https://preowned.ferrari.com/it-IT
 * Selector: [class*="BoxGrid__wrapper"]
 * Model (xwalk): container cards-teaser; item cards-teaser-card -> image (+imageAlt), text.
 * One row per teaser: image | text (heading, paragraph, CTA link).
 * Items contain an invalid <button> inside <a>, so parts are paired by document order.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  const images = [...element.querySelectorAll('[class*="BoxGrid__image"] img')];
  const titles = [...element.querySelectorAll('[class*="BoxGrid__itemTitle"]')];
  const descs = [...element.querySelectorAll('[class*="BoxGrid__description"]')];
  const ctas = [...element.querySelectorAll('[class*="BoxGrid__cta"]')];
  const anchors = [...element.querySelectorAll('a[class*="BoxGrid__item__"]')];

  const count = Math.max(images.length, titles.length, descs.length);
  const cells = [];

  for (let i = 0; i < count; i += 1) {
    const img = images[i];
    const imageCell = img ? hinted('image', img) : '';

    const nodes = [];
    const titleText = titles[i] ? clean(titles[i].textContent) : '';
    if (titleText) {
      const h = document.createElement('h3');
      h.textContent = titleText;
      nodes.push(h);
    }
    const descText = descs[i] ? clean(descs[i].textContent) : '';
    if (descText) {
      const p = document.createElement('p');
      p.textContent = descText;
      nodes.push(p);
    }
    const href = anchors[i] ? anchors[i].getAttribute('href') : '';
    const ctaText = ctas[i] ? clean(ctas[i].textContent) : '';
    if (href) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.textContent = ctaText || titleText || href;
      p.appendChild(a);
      nodes.push(p);
    }
    const textCell = nodes.length ? hinted('text', ...nodes) : '';

    cells.push([imageCell, textCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-teaser', cells });
  element.replaceWith(block);
}
