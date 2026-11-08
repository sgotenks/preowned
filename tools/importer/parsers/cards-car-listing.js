/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-car-listing. Base: cards.
 * Source: https://preowned.ferrari.com/it-IT
 * Selector: [class*="VehicleCarousel__wrapper"]
 * Model (xwalk): container cards-car-listing; item cards-car-listing-card ->
 *   image (+imageAlt), badge, text. One row per vehicle: image | badge | text.
 * Text: meta paragraph (year, mileage), heading (model), price paragraph,
 *   "Label: Value" spec list, links (Contattaci, Dettagli).
 * Iterates the <article> card wrappers (block-level, stable) rather than the
 * nested <a>/<button> CTAs, which are invalid nesting.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const textOf = (root, sel) => {
    const el = root.querySelector(sel);
    return el ? clean(el.textContent) : '';
  };

  const cards = [...element.querySelectorAll('article[class*="VehicleCard__wrapper"]')];
  const cells = [];

  cards.forEach((card) => {
    // Column 1: first gallery photo
    const img = card.querySelector('[class*="VehicleCardCarousel"] img[class*="Img__image"]')
      || card.querySelector('.carousel__item img');
    const imageCell = img ? hinted('image', img) : '';

    // Column 2: badge (e.g. "NUOVO")
    const badge = textOf(card, '[class*="VehicleCard__labelText"]');
    const badgeCell = badge ? hinted('badge', badge) : '';

    // Column 3: vehicle details
    const nodes = [];
    const year = textOf(card, '[class*="VehicleCard__year"]');
    const odometer = textOf(card, '[class*="VehicleCard__odometer"]');
    const meta = [year, odometer].filter(Boolean).join(' · ');
    if (meta) {
      const p = document.createElement('p');
      p.textContent = meta;
      nodes.push(p);
    }
    const name = textOf(card, '[class*="VehicleCard__carName"]');
    if (name) {
      const h = document.createElement('h3');
      h.textContent = name;
      nodes.push(h);
    }
    const price = textOf(card, '[class*="VehicleCard__specsHead__priceValue"]');
    if (price) {
      const p = document.createElement('p');
      p.textContent = price;
      nodes.push(p);
    }
    const specs = [...card.querySelectorAll('[class*="VehicleCard__specItem__"]')]
      .filter((el) => !/specItem__(label|value)/.test(el.className));
    if (specs.length) {
      const ul = document.createElement('ul');
      specs.forEach((spec) => {
        const label = textOf(spec, '[class*="VehicleCard__specItem__label"]');
        const value = textOf(spec, '[class*="VehicleCard__specItem__value"]');
        if (!label && !value) return;
        const li = document.createElement('li');
        li.textContent = label ? `${label.charAt(0).toUpperCase()}${label.slice(1)}: ${value}` : value;
        ul.appendChild(li);
      });
      if (ul.children.length) nodes.push(ul);
    }
    const detailsAnchor = card.querySelector('a[class*="VehicleCard__ctaDetails"]')
      || card.querySelector('[class*="VehicleCard__carousel"] a[href]');
    const detailsHref = detailsAnchor ? detailsAnchor.getAttribute('href') : '';
    if (detailsHref) {
      const ctaBox = card.querySelector('[class*="VehicleCard__content__ctas"]');
      const ctaTexts = ctaBox
        ? [...ctaBox.querySelectorAll('[class*="BtnCta__text"]')].map((t) => clean(t.textContent)).filter(Boolean)
        : [];
      // "Contattaci" is a JS button on the source (opens the contact form on the details page)
      const contactText = ctaTexts.length > 1 ? ctaTexts[0] : '';
      const detailsText = ctaTexts.length ? ctaTexts[ctaTexts.length - 1] : 'Dettagli';
      [contactText, detailsText].filter(Boolean).forEach((label) => {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.setAttribute('href', detailsHref);
        a.textContent = label;
        p.appendChild(a);
        nodes.push(p);
      });
    }
    const textCell = nodes.length ? hinted('text', ...nodes) : '';

    cells.push([imageCell, badgeCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-car-listing', cells });
  element.replaceWith(block);
}
