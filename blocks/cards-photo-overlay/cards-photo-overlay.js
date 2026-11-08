import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Optimize same-origin, non-SVG images only; migrated images keep their
 * absolute source URL until upload, and createOptimizedPicture keeps only the pathname.
 */
function optimizeImages(root) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 900px)', width: '1200' }, { width: '750' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((cell) => {
      if (cell.children.length === 1 && cell.querySelector('picture')) {
        cell.className = 'cards-photo-overlay-card-image';
      } else if (!cell.textContent.trim() && !cell.querySelector('picture')) {
        cell.remove();
      } else {
        cell.className = 'cards-photo-overlay-card-body';
      }
    });
    const body = li.querySelector('.cards-photo-overlay-card-body');
    if (body) {
      // text before the heading is the eyebrow
      const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        let prev = heading.previousElementSibling;
        while (prev) {
          if (prev.textContent.trim()) prev.classList.add('cards-photo-overlay-card-eyebrow');
          prev = prev.previousElementSibling;
        }
      }
      // the last link in the body is the tile call to action
      const links = body.querySelectorAll('a');
      if (links.length) links[links.length - 1].classList.add('cards-photo-overlay-card-cta');
    }
    ul.append(li);
  });
  optimizeImages(ul);
  block.textContent = '';
  block.append(ul);
}
