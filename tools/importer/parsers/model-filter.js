/* eslint-disable */
/* global WebImporter */

/**
 * Parser for model-filter. Base: custom.
 * Source: https://preowned.ferrari.com/it-IT/modelli-usato-ferrari
 * Selector: [class*="SearchByModels__tabsbar"]
 * Model (xwalk): model-filter -> filters (richtext list of tab labels; the first shows all),
 *   searchPlaceholder. Two rows.
 * The search input only exists after the search button is clicked, so its placeholder falls back
 * to the site copy.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const labels = [...element.querySelectorAll('[class*="TabsUnderline__button"], [class*="TabsUnderline__list"]')]
    .filter((el) => !el.querySelector('[class*="TabsUnderline__button"]'))
    .map((el) => clean(el.textContent))
    .filter(Boolean);

  const cells = [];
  if (labels.length) {
    const ul = document.createElement('ul');
    labels.forEach((label) => {
      const li = document.createElement('li');
      li.textContent = label;
      ul.appendChild(li);
    });
    cells.push([hinted('filters', ul)]);
  } else {
    cells.push(['']);
  }

  const input = element.querySelector('input[placeholder]')
    || element.ownerDocument.querySelector('[class*="SearchByModels__search"] input[placeholder]');
  const placeholder = clean(input && input.getAttribute('placeholder')) || 'FILTRA PER...';
  const hasSearch = !!(input || element.querySelector('[class*="SearchByModels__search-btn"]'));
  cells.push([hasSearch ? hinted('searchPlaceholder', placeholder) : '']);

  const block = WebImporter.Blocks.createBlock(document, { name: 'model-filter', cells });
  element.replaceWith(block);
}
