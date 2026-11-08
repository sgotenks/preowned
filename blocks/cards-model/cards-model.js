import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

// Tiles per page, as on the source model index
const PAGE_SIZE = 18;

const toToken = (text) => text.trim().toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const CHEVRON = '<svg viewBox="0 0 8 16" width="8" height="16" aria-hidden="true"><path d="M.732 9.547L8 16 4 8l4-8L.732 6.453A1.996 1.996 0 0 0 0 8c0 .623.285 1.18.732 1.547z"/></svg>';

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
 * Cells per card: image | text (model name, availability count, link to the model's results,
 * then a list of the filter categories the tile belongs to, e.g. "V12", "Serie Speciali").
 * Older content may carry the categories in their own comma-separated cell between the two.
 */
function buildCard(row) {
  const li = document.createElement('li');
  moveInstrumentation(row, li);
  const cells = [...row.children];
  const imageCell = cells.find((c) => c.querySelector('picture') && !c.querySelector('h1, h2, h3, h4, h5, h6, a'));
  const textCells = cells.filter((c) => c !== imageCell);
  const body = textCells.pop();
  const categories = textCells.flatMap((c) => c.textContent.split(','));

  if (imageCell) {
    imageCell.className = 'cards-model-card-image';
    li.append(imageCell);
  }
  if (body) {
    body.className = 'cards-model-card-body';
    // a trailing list holds the tile's categories: filter data, not visible copy
    const list = body.querySelector(':scope > ul:last-child');
    if (list) {
      categories.push(...[...list.children].map((item) => item.textContent));
      list.remove();
    }
    const heading = body.querySelector('h1, h2, h3, h4, h5, h6') || body.querySelector('p');
    if (heading) heading.classList.add('cards-model-card-title');
    const link = body.querySelector('a');
    if (link) {
      link.classList.add('cards-model-card-link');
      // the whole tile is clickable; keep the link text for assistive tech
      link.classList.remove('button');
      link.closest('.button-container')?.classList.remove('button-container');
      if (!link.textContent.trim() && heading) link.textContent = heading.textContent;
    } else {
      li.classList.add('cards-model-card-unavailable');
    }
    li.append(body);
  }
  li.dataset.category = categories.map(toToken).filter(Boolean).join(' ');
  return li;
}

function arrowButton(label, direction) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `cards-model-pagination-arrow cards-model-pagination-${direction}`;
  button.setAttribute('aria-label', label);
  button.innerHTML = CHEVRON;
  return button;
}

/**
 * Pages through the tiles that match the current filter, PAGE_SIZE at a time.
 */
function setupPagination(block, ul) {
  const nav = document.createElement('nav');
  nav.className = 'cards-model-pagination';
  nav.setAttribute('aria-label', 'Pagine');
  const prev = arrowButton('Pagina precedente', 'prev');
  const next = arrowButton('Successiva', 'next');
  const pages = document.createElement('ol');
  pages.className = 'cards-model-pagination-pages';
  nav.append(prev, pages, next);
  block.append(nav);

  let page = 0;
  let matching = [...ul.children];

  const render = (scroll) => {
    const count = Math.max(1, Math.ceil(matching.length / PAGE_SIZE));
    page = Math.min(page, count - 1);
    const shown = matching.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
    [...ul.children].forEach((li) => { li.hidden = !shown.includes(li); });

    pages.textContent = '';
    for (let i = 0; i < count; i += 1) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'cards-model-pagination-page';
      button.dataset.page = i;
      button.textContent = i + 1;
      button.setAttribute('aria-label', `Vai alla pagina ${i + 1}`);
      if (i === page) button.setAttribute('aria-current', 'page');
      item.append(button);
      pages.append(item);
    }
    prev.disabled = page === 0;
    next.disabled = page === count - 1;
    nav.hidden = count < 2;
    if (scroll) block.closest('.section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  pages.addEventListener('click', (e) => {
    const button = e.target.closest('.cards-model-pagination-page');
    if (!button) return;
    page = Number(button.dataset.page);
    render(true);
  });
  prev.addEventListener('click', () => { page -= 1; render(true); });
  next.addEventListener('click', () => { page += 1; render(true); });

  // model-filter broadcasts its state; listen so the two blocks stay decoupled
  document.addEventListener('model-filter:change', ({ detail: { category = 'all', query = '' } = {} }) => {
    const q = query.trim().toLowerCase();
    matching = [...ul.children].filter((li) => {
      const tokens = (li.dataset.category || '').split(' ');
      const title = li.querySelector('.cards-model-card-title')?.textContent.toLowerCase() || '';
      return (category === 'all' || tokens.includes(category)) && (!q || title.includes(q));
    });
    page = 0;
    render(false);
  });

  render(false);
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => ul.append(buildCard(row)));
  optimizeImages(ul);
  block.textContent = '';
  block.append(ul);
  setupPagination(block, ul);
}
