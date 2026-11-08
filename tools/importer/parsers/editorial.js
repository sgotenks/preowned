/* eslint-disable */
/* global WebImporter */

/**
 * Parser for editorial. Base: columns (custom block).
 * Source: https://preowned.ferrari.com/it-IT/ferrari-approved
 * Selector: [class*="Editorial__wrapper"]
 * Model (xwalk): editorial -> image (+imageAlt), text, more, classes (image-right).
 * One column: row 1 = image, row 2 = text, row 3 = more (optional expandable copy, empty when absent).
 * The chapter label (already normalized to <p><strong>N</strong> Label</p> by the cleanup
 * transformer) is kept as default content right before the block.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  // copy of a source rich-text container: keep p / lists / headings, wrap bare divs as p
  const copyNodes = (container) => {
    const out = [];
    if (!container) return out;
    [...container.children].forEach((child) => {
      const tag = child.tagName;
      if (/^(P|UL|OL)$/.test(tag)) {
        if (clean(child.textContent)) out.push(child.cloneNode(true));
      } else if (/^H[1-6]$/.test(tag)) {
        const text = clean(child.textContent);
        if (text) {
          const h = document.createElement('h3');
          h.textContent = text;
          out.push(h);
        }
      } else if (child.querySelector('p, ul, ol, h1, h2, h3, h4, h5, h6')) {
        out.push(...copyNodes(child));
      } else if (clean(child.textContent)) {
        const p = document.createElement('p');
        p.textContent = clean(child.textContent);
        out.push(p);
      }
    });
    return out;
  };

  // chapter label stays as default content before the block
  const chapterTitle = element.querySelector('[class*="Editorial__chapterTitle"]');
  if (chapterTitle) {
    const label = chapterTitle.querySelector('p') || chapterTitle;
    if (clean(label.textContent)) element.before(label);
    chapterTitle.remove();
  }

  const img = element.querySelector('[class*="Editorial__mediaPlaceholder"] img');
  const desc = element.querySelector('[class*="Editorial__text"] [class*="Editorial__desc"]');
  const more = element.querySelector('[class*="additional-content"]');
  // the band can open with a heading that sits beside (not inside) its Editorial__desc
  const moreNodes = copyNodes(more);
  const textNodes = copyNodes(desc);

  const cells = [
    [img ? hinted('image', img) : ''],
    [textNodes.length ? hinted('text', ...textNodes) : ''],
    [moreNodes.length ? hinted('more', ...moreNodes) : ''],
  ];

  const reverse = !!element.querySelector('[class*="reverse-flex"]');
  const name = reverse ? 'Editorial (image-right)' : 'Editorial';
  const block = WebImporter.Blocks.createBlock(document, { name, cells });
  element.replaceWith(block);
}
