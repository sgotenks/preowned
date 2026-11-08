/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner. Base: hero.
 * Source: https://preowned.ferrari.com/it-IT/ferrari-approved
 * Selector: [class*="HeroInfo__wrapper"] (source HeroInfo: start-aligned title over a photo)
 * Model (xwalk): hero-banner -> image (+imageAlt), text, classes (text-left).
 * One column: row 1 = background image, row 2 = title (h1) and subtitle.
 * The photo is a CSS background-image on the live page; cached HTML may carry an <img>.
 */
export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  // background photo
  const bg = element.querySelector('[class*="BackgroundImage__background"]') || element;
  let img = bg.querySelector('img');
  if (!img) {
    const styled = [bg, ...bg.querySelectorAll('[style*="background-image"]')]
      .find((el) => /url\(/.test(el.getAttribute('style') || ''));
    const m = styled && styled.getAttribute('style').match(/url\(\s*(?:&quot;|["'])?(.*?)(?:&quot;|["'])?\s*\)/);
    if (m && m[1]) {
      img = document.createElement('img');
      img.src = m[1];
      img.alt = '';
    }
  }

  // title + subtitle (the source keeps an empty h4 eyebrow slot)
  const content = element.querySelector('[class*="HeroInfo__content"]') || element;
  const nodes = [];
  const eyebrow = content.querySelector('h4');
  if (eyebrow && clean(eyebrow.textContent)) {
    const p = document.createElement('p');
    p.textContent = clean(eyebrow.textContent);
    nodes.push(p);
  }
  const h1 = content.querySelector('h1');
  if (h1 && clean(h1.textContent)) {
    const h = document.createElement('h1');
    h.textContent = clean(h1.textContent);
    nodes.push(h);
  }
  content.querySelectorAll('h2, h3, p').forEach((el) => {
    const text = clean(el.textContent);
    if (!text) return;
    const p = document.createElement('p');
    p.textContent = text;
    nodes.push(p);
  });

  const cells = [];
  cells.push([img ? hinted('image', img) : '']);
  cells.push([nodes.length ? hinted('text', ...nodes) : '']);
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero Banner (text-left)', cells });
  element.replaceWith(block);
}
