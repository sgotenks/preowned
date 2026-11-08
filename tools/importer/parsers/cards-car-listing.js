/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-car-listing. Base: cards.
 * Source: https://preowned.ferrari.com/it-IT (homepage carousel) and /it-IT/r/... (search results)
 * Selectors: [class*="VehicleCarousel__wrapper"] (homepage), .search-result-listing (results: all
 *   result rows of the page, i.e. both grid <ol>s, become one block in source order)
 * Model (xwalk): container cards-car-listing; item cards-car-listing-card ->
 *   image (+imageAlt), badge, text. One row per card: image | badge | text.
 * Vehicle text: meta paragraph ("year · mileage · FERRARI APPROVED"), heading (model), price
 *   paragraph ("Label: price" when the source labels it, e.g. "Prezzo totale"), price notes
 *   (VAT, taxes, Financing link), "Label: Value" spec list, optional second list (consumption
 *   and emissions), links (Contattaci, Dettagli).
 * Promo tiles (SearchResultListing__bannerCard): image | (no badge) | heading, paragraph, link.
 * Iterates the <article> card wrappers (block-level, stable) rather than the nested
 * <a>/<button> CTAs, which are invalid nesting.
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

  const para = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  };

  const specList = (items) => {
    const ul = document.createElement('ul');
    items.forEach((spec) => {
      const label = textOf(spec, '[class*="VehicleCard__specItem__label"]');
      const value = textOf(spec, '[class*="VehicleCard__specItem__value"]');
      if (!label && !value) return;
      const li = document.createElement('li');
      li.textContent = label ? `${label.charAt(0).toUpperCase()}${label.slice(1)}: ${value}` : value;
      ul.appendChild(li);
    });
    return ul.children.length ? ul : null;
  };

  function vehicleRow(card) {
    // Column 1: first gallery photo
    const img = card.querySelector('[class*="VehicleCardCarousel"] img[class*="Img__image"]')
      || card.querySelector('.carousel__item img');
    const imageCell = img ? hinted('image', img) : '';

    // Column 2: badges (e.g. "NUOVO", "tailor made"), comma-separated
    const badges = [...card.querySelectorAll('[class*="VehicleCard__labelText"]')]
      .map((el) => clean(el.textContent)).filter(Boolean);
    const badgeCell = badges.length ? hinted('badge', badges.join(', ')) : '';

    // Column 3: vehicle details
    const nodes = [];
    const meta = [
      textOf(card, '[class*="VehicleCard__year"]'),
      textOf(card, '[class*="VehicleCard__odometer"]'),
      textOf(card, '[class*="VehicleCard__approved"]'),
    ].filter(Boolean).join(' · ');
    if (meta) nodes.push(para(meta));
    const name = textOf(card, '[class*="VehicleCard__carName"]');
    if (name) {
      const h = document.createElement('h3');
      h.textContent = name;
      nodes.push(h);
    }

    const priceBox = card.querySelector('[class*="VehicleCard__specsHead__price__"]') || card;
    const price = textOf(priceBox, '[class*="VehicleCard__specsHead__priceValue"]');
    if (price) {
      // "Prezzo totale" label above the price (markets that show taxes separately)
      const label = [...priceBox.children].find((c) => /specItem__label/.test(c.className || ''));
      const priceLabel = label ? clean(label.textContent) : '';
      nodes.push(para(priceLabel ? `${priceLabel}: ${price}` : price));
      // price notes: tax breakdown, VAT, financing
      priceBox.querySelectorAll('[class*="VehicleCard__taxes"] > div').forEach((row) => {
        const l = textOf(row, '[class*="specItem__label"]');
        const v = textOf(row, '[class*="specItem__value"]');
        if (l || v) nodes.push(para(l ? `${l}: ${v}` : v));
      });
      const vat = textOf(card, '[class*="VehicleCard__specsHead__priceVat"]');
      if (vat) nodes.push(para(vat));
      const financing = card.querySelector('[class*="VehicleCard__specsHead__priceFinancing"] a[href]');
      if (financing && clean(financing.textContent)) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.setAttribute('href', financing.getAttribute('href'));
        a.textContent = clean(financing.textContent);
        p.appendChild(a);
        nodes.push(p);
      }
    }

    // primary specs (colours, dealer), then consumption/emissions rows
    const specs = [...card.querySelectorAll('[class*="VehicleCard__specItem__"]')]
      .filter((el) => !/specItem__(label|value)/.test(el.className));
    const primary = specList(specs.filter((el) => !/VehicleCard__compact/.test(el.className)));
    const extra = specList(specs.filter((el) => /VehicleCard__compact/.test(el.className)));
    if (primary) nodes.push(primary);
    if (extra) nodes.push(extra);

    const detailsAnchor = card.querySelector('a[class*="VehicleCard__ctaDetails"]:not([href*="tab=financing"])')
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
    return [imageCell, badgeCell, nodes.length ? hinted('text', ...nodes) : ''];
  }

  function promoRow(banner) {
    const img = banner.querySelector('img');
    const nodes = [];
    const title = textOf(banner, '[class*="bannerCard__title"]');
    if (title) {
      const h = document.createElement('h3');
      h.textContent = title;
      nodes.push(h);
    }
    const text = textOf(banner, '[class*="bannerCard__text"]');
    if (text) nodes.push(para(text));
    const link = banner.querySelector('a[href]');
    if (link && clean(link.textContent)) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', link.getAttribute('href'));
      a.textContent = clean(link.textContent);
      p.appendChild(a);
      nodes.push(p);
    }
    return [img ? hinted('image', img) : '', '', nodes.length ? hinted('text', ...nodes) : ''];
  }

  // promo tiles: the bannerCard root only (its inner parts share the class prefix)
  const items = [...element.querySelectorAll('article[class*="VehicleCard__wrapper"], li > [class*="SearchResultListing__bannerCard"]')];
  const cells = items.map((item) => (item.tagName !== 'ARTICLE' ? promoRow(item) : vehicleRow(item)));

  if (!cells.length) {
    // e.g. the favorites page's empty saved-vehicles listing
    element.remove();
    return;
  }
  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-car-listing', cells });
  element.replaceWith(block);
}
