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
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
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
        cell.className = 'cards-teaser-card-image';
      } else if (!cell.textContent.trim() && !cell.querySelector('picture')) {
        cell.remove();
      } else {
        cell.className = 'cards-teaser-card-body';
      }
    });
    // the last link in the body is the teaser call to action
    const links = li.querySelectorAll('.cards-teaser-card-body a');
    if (links.length) links[links.length - 1].classList.add('cards-teaser-card-cta');
    ul.append(li);
  });
  optimizeImages(ul);
  block.textContent = '';
  block.append(ul);
}
