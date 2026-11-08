import { moveInstrumentation } from '../../scripts/scripts.js';
import { el, optimizeImages } from '../../scripts/vehicle.js';

/*
 * dealer-card: the dealer selling the ad (source DealerFullInfo). Image cell + text cell:
 * type, name heading, one h3 + list per group (contacts, opening hours), then link paragraphs
 * (dealer stock, contact form). The section becomes the "#dealer" target of the summary link.
 */

export default function decorate(block) {
  // rows: image, text (a single image | text row is accepted too)
  const cells = [...block.children].flatMap((row) => [...row.children]);
  const imageCell = cells.find((c) => c.querySelector('picture') && !c.querySelector('h1, h2, h3'));
  const textCell = cells.find((c) => c !== imageCell && c.textContent.trim());
  if (!textCell) return;

  const card = el('div', 'dealer-card-container');
  moveInstrumentation(block.firstElementChild, card);

  const picture = imageCell?.querySelector('picture');
  if (picture) {
    const media = el('div', 'dealer-card-image');
    media.append(picture);
    optimizeImages(media);
    card.append(media);
    card.classList.add('with-image');
  }

  const body = el('div', 'dealer-card-body');
  const heading = el('div', 'dealer-card-heading');
  const content = el('div', 'dealer-card-content');
  const links = el('ul', 'dealer-card-links');
  let group = null;
  [...(textCell?.children || [])].forEach((node) => {
    if (node.matches('h3, h4')) {
      group = el('div', 'dealer-card-list');
      node.classList.add('dealer-card-list-title');
      group.append(node);
      content.append(group);
    } else if (node.matches('ul') && group) {
      group.append(node);
    } else if (node.matches('p') && node.querySelector('a') && node.textContent.trim() === node.querySelector('a').textContent.trim()) {
      const li = el('li');
      li.append(node.querySelector('a'));
      links.append(li);
    } else if (node.matches('h1, h2')) {
      node.classList.add('dealer-card-name');
      heading.append(node);
    } else if (!content.children.length) {
      node.classList.add('dealer-card-type');
      heading.append(node);
    } else {
      content.append(node);
    }
  });

  // opening hours: day label + time on one line
  content.querySelectorAll('li > strong:first-child').forEach((strong) => {
    const li = strong.parentElement;
    const time = el('span', 'dealer-card-time');
    while (strong.nextSibling) time.append(strong.nextSibling);
    time.textContent = time.textContent.trim();
    li.append(time);
    li.classList.add('dealer-card-hours');
  });

  // last link is the contact (red), the others are outlines
  [...links.querySelectorAll('a')].forEach((a, i, all) => {
    a.className = i === all.length - 1 ? 'button primary' : 'button secondary';
  });

  body.append(heading, content);
  if (links.children.length) body.append(links);
  card.append(body);
  block.replaceChildren(card);

  const section = block.closest('.section');
  if (section && !section.id && !document.getElementById('dealer')) section.id = 'dealer';
}
