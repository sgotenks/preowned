import { moveInstrumentation } from '../../scripts/scripts.js';
import { carouselControls, el, optimizeImages } from '../../scripts/vehicle.js';

/*
 * cards-accessory: genuine accessories for the ad's model (source AccessoriesCarousel /
 * SquareImgCarousel + Tile square-img). One card per row: square image + text
 * (category eyebrow, name heading). Rendered as a swipeable row with arrows and bullets.
 */
export default function decorate(block) {
  const ul = el('ul', 'cards-accessory-track');
  [...block.children].forEach((row) => {
    const li = el('li', 'cards-accessory-card');
    moveInstrumentation(row, li);
    [...row.children].forEach((cell) => {
      const isImage = cell.querySelector('picture') && !cell.querySelector('h1, h2, h3, h4, h5, h6');
      cell.className = isImage ? 'cards-accessory-card-image' : 'cards-accessory-card-body';
      if (!isImage) {
        const eyebrow = cell.querySelector(':scope > p:first-child');
        if (eyebrow && eyebrow.nextElementSibling?.matches('h1, h2, h3, h4, h5, h6')) {
          eyebrow.classList.add('cards-accessory-eyebrow');
        }
      }
      li.append(cell);
    });
    ul.append(li);
  });
  optimizeImages(ul, '500');
  block.replaceChildren(ul, carouselControls(ul, { bullets: true }));
}
