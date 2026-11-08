import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

const toToken = (text) => text.trim().toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

function optimizeImages(root) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });
}

/**
 * Cells per card: image | category (optional, comma-separated, e.g. "v12, serie-speciali")
 * | body (model name, availability count, link). The last non-image cell is the body;
 * any other text cell is read as the category list.
 */
function buildCard(row) {
  const li = document.createElement('li');
  moveInstrumentation(row, li);
  const cells = [...row.children];
  const imageCell = cells.find((c) => c.querySelector('picture') && !c.querySelector('h1, h2, h3, h4, h5, h6, a'));
  const textCells = cells.filter((c) => c !== imageCell);
  const body = textCells.pop();
  const categories = textCells
    .flatMap((c) => c.textContent.split(','))
    .map(toToken)
    .filter(Boolean);
  li.dataset.category = categories.join(' ');

  if (imageCell) {
    imageCell.className = 'cards-model-card-image';
    li.append(imageCell);
  }
  if (body) {
    body.className = 'cards-model-card-body';
    const heading = body.querySelector('h1, h2, h3, h4, h5, h6') || body.querySelector('p');
    if (heading) heading.classList.add('cards-model-card-title');
    const link = body.querySelector('a');
    if (link) {
      link.classList.add('cards-model-card-link');
      // the whole tile is clickable; keep the link text for assistive tech
      link.classList.remove('button');
      link.closest('.button-container')?.classList.remove('button-container');
      if (!link.textContent.trim() && heading) link.textContent = heading.textContent;
    }
    li.append(body);
  }
  return li;
}

function applyFilter(ul, { category = 'all', query = '' } = {}) {
  const q = query.trim().toLowerCase();
  [...ul.children].forEach((li) => {
    const tokens = (li.dataset.category || '').split(' ');
    const matchesCategory = category === 'all' || tokens.includes(category);
    const matchesQuery = !q || li.textContent.toLowerCase().includes(q);
    li.hidden = !(matchesCategory && matchesQuery);
  });
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => ul.append(buildCard(row)));
  optimizeImages(ul);
  block.textContent = '';
  block.append(ul);

  // model-filter broadcasts its state; listen so the two blocks stay decoupled
  document.addEventListener('model-filter:change', (e) => applyFilter(ul, e.detail));
}
