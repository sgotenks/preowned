/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns (boilerplate block). Columns convention: one row after the block name,
 * one cell per column; cells hold page text.
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/... (Ferrari Approved band, ParagraphGrid)
 * Selector: [class*="ParagraphGrid__row"]
 * Model (xwalk): core columns. Each cell: h3 title, paragraph description.
 * The band's heading and call to action stay page text around the block.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const cols = [...element.querySelectorAll(':scope > [class*="ParagraphGrid__item"]')].map((item) => {
    const frag = document.createDocumentFragment();
    const title = clean(item.querySelector('[class*="ParagraphGrid__item--title"], h3')?.textContent);
    if (title) { const h = document.createElement('h3'); h.textContent = title; frag.append(h); }
    const desc = clean(item.querySelector('[class*="ParagraphGrid__description"]')?.textContent);
    if (desc) { const p = document.createElement('p'); p.textContent = desc; frag.append(p); }
    return frag;
  });
  if (!cols.length) { element.remove(); return; }
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'columns', cells: [cols] }));
}
