/* eslint-disable */
/* global WebImporter */

/**
 * Parser for results-toolbar. Base: custom.
 * Source: https://preowned.ferrari.com/it-IT/r/... (search results) and /it-IT/favorites
 * Selectors: [class*="SearchRefine__wrapper"]:not([class*="SearchRefine__sticky"]) (results),
 *   [class*="FavoritesHeader__wrapper"] (favorites)
 * Model (xwalk): results-toolbar -> link (+linkText), actions (richtext), views_listLabel +
 *   views_gridLabel (grouped). Rows:
 *   1. main link: "Perfeziona la ricerca" (results; opens the live search filters) or
 *      "Torna alla ricerca" (favorites)
 *   2. actions (results only): "Confronta" link (live site), "Ordina" label and the sort options list
 *   3. list / grid view labels
 * Labels come from the page's message catalogue (__NEXT_DATA__), falling back to the Italian copy.
 */
export default function parse(element, { document, url, params }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  let messages = {};
  try {
    messages = JSON.parse(document.getElementById('__NEXT_DATA__')?.textContent || '{}').props?.messages || {};
  } catch (e) { /* fallbacks */ }
  const msg = (key, fallback) => {
    let v = messages[key];
    if (v === undefined) v = key.split('.').reduce((o, k) => (o && typeof o === 'object' ? o[k] : undefined), messages);
    return clean(typeof v === 'string' ? v : '') || fallback;
  };

  const pageUrl = (params && params.originalURL) || url
    || (document.defaultView && document.defaultView.location.href);
  const liveLink = (href, text) => {
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('data-keep-live', 'true');
    a.textContent = text;
    return a;
  };

  const cells = [];
  const isFavorites = /FavoritesHeader/.test(element.className);
  if (isFavorites) {
    const back = element.querySelector('a[href]');
    if (back) {
      const a = document.createElement('a');
      a.setAttribute('href', back.getAttribute('href'));
      a.textContent = clean(back.textContent) || msg('saved_vehicles.back_btn', 'Torna alla ricerca');
      cells.push([hinted('link', a)]);
    } else {
      cells.push(['']);
    }
    cells.push(['']);
  } else {
    const refineLabel = clean(element.querySelector('[class*="SearchRefine__refine__label"]')?.textContent)
      || msg('dealers.search_refine.label', 'Perfeziona la ricerca');
    const refine = liveLink(pageUrl, refineLabel);
    // short label shown on mobile ("Filtri"), authored as the link title
    refine.setAttribute('title', msg('dealers.search_refine.label_mobile', 'Filtri'));
    cells.push([hinted('link', refine)]);

    const actions = [];
    const compareLabel = clean(element.querySelector('[class*="SearchRefine__actBtns__compare"]')?.textContent)
      || msg('dealers.search_refine.compare_btn_label', 'Confronta');
    const pc = document.createElement('p');
    pc.append(liveLink(pageUrl, compareLabel));
    actions.push(pc);
    const order = element.querySelector('[class*="SearchRefine__actBtns__order"]');
    if (order) {
      const label = document.createElement('p');
      label.textContent = clean(order.querySelector('[class*="DropdownCustom__label"]')?.textContent)
        || msg('dealers.search_refine.order_label', 'Ordina');
      actions.push(label);
      const current = clean(order.querySelector('[class*="DropdownCustom__value-text"]')?.textContent);
      const ul = document.createElement('ul');
      [
        ['price_asc', 'Prezzo - crescente'],
        ['price_desc', 'Prezzo - decrescente'],
        ['year_asc', 'Anno - dal meno recente'],
        ['year_desc', 'Anno - dal più recente'],
        ['odometer_asc', 'Chilometraggio - crescente'],
        ['odometer_desc', 'Chilometraggio - decrescente'],
        ['publish_date_desc', 'Data di Pubblicazione - dal più recente'],
      ].forEach(([key, fallback]) => {
        const text = msg(`dealers.search_refine.order.${key}`, fallback);
        const li = document.createElement('li');
        // the selected option is authored in bold
        if (current && current === text) {
          const strong = document.createElement('strong');
          strong.textContent = text;
          li.append(strong);
        } else {
          li.textContent = text;
        }
        ul.append(li);
      });
      actions.push(ul);
    }
    cells.push([hinted('actions', ...actions)]);
  }

  // view toggle labels (icon buttons on the source; their aria-labels name the views)
  const viewButtons = [...element.querySelectorAll('[class*="ListView"] button, [class*="actBtnsListView"] button')];
  const ariaOf = (i) => clean(viewButtons[i]?.getAttribute('aria-label'));
  const listLabel = ariaOf(0) || 'Attiva/disattiva visualizzazione elenco';
  const gridLabel = ariaOf(1) || 'Attiva/disattiva visualizzazione griglia';
  const views = document.createDocumentFragment();
  views.appendChild(hinted('views_listLabel', listLabel));
  views.appendChild(hinted('views_gridLabel', gridLabel));
  cells.push([views]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'results-toolbar', cells });
  element.replaceWith(block);
}
