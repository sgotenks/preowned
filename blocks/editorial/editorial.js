import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const LABELS = {
  it: { open: 'Scopri di più', close: 'Riduci testo', closeText: 'chiudi' },
  en: { open: 'Read more', close: 'Read less', closeText: 'close' },
};

let counter = 0;

function labels() {
  const lang = (document.documentElement.lang || 'en').slice(0, 2);
  return LABELS[lang] || LABELS.en;
}

/**
 * Optimize same-origin, non-SVG images only; migrated images keep their
 * absolute source URL until upload, and createOptimizedPicture keeps only the pathname.
 */
function optimizeImages(root) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 961px)', width: '900' }, { width: '750' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });
}

function toggleButton(moreId) {
  const text = labels();
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'editorial-toggle';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', moreId);
  button.setAttribute('aria-label', text.open);
  const label = document.createElement('span');
  label.className = 'editorial-toggle-label';
  label.textContent = text.closeText;
  const icon = document.createElement('span');
  icon.className = 'editorial-toggle-icon';
  button.append(label, icon);
  return button;
}

/**
 * Rows: image | text | more (optional, revealed by the expand button).
 * Options: `image-right` puts the image after the text on wide screens.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows.find((r) => r.querySelector('picture') && !r.textContent.trim());
  const [textRow, moreRow] = rows.filter((r) => r !== mediaRow && r.textContent.trim());

  const row = document.createElement('div');
  row.className = 'editorial-row';

  if (mediaRow) {
    const media = mediaRow.querySelector(':scope > div') || mediaRow;
    media.className = 'editorial-media';
    moveInstrumentation(mediaRow, media);
    row.append(media);
  }

  const text = document.createElement('div');
  text.className = 'editorial-text';
  if (textRow) {
    const cell = textRow.querySelector(':scope > div') || textRow;
    moveInstrumentation(textRow, text);
    text.append(...cell.childNodes);
  }
  row.append(text);

  const parts = [row];
  if (moreRow && moreRow.textContent.trim()) {
    counter += 1;
    const id = `editorial-more-${counter}`;
    const more = document.createElement('div');
    more.className = 'editorial-more';
    more.id = id;
    more.hidden = true;
    const inner = document.createElement('div');
    inner.className = 'editorial-more-inner';
    const cell = moreRow.querySelector(':scope > div') || moreRow;
    moveInstrumentation(moreRow, more);
    inner.append(...cell.childNodes);
    more.append(inner);

    const button = toggleButton(id);
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? labels().close : labels().open);
      more.hidden = !open;
    });
    text.append(button);
    parts.push(more);
  }

  optimizeImages(row);
  block.textContent = '';
  block.append(...parts);
}
