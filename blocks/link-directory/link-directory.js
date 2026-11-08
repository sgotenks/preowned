import { moveInstrumentation } from '../../scripts/scripts.js';

// links visible before "show all", as on the source (three rows of four)
const VISIBLE = 12;

/**
 * Rows, one per group: title | links (a list) | "show all" label (optional).
 * A group with more than 12 links shows the first 12 and a toggle that reveals the rest.
 */
function buildGroup(row) {
  const group = document.createElement('div');
  group.className = 'link-directory-group';
  moveInstrumentation(row, group);

  const cells = [...row.children];
  const listCell = cells.find((c) => c.querySelector('ul, ol'));
  const [titleCell, showAllCell] = cells.filter((c) => c !== listCell);

  const title = titleCell?.textContent.trim();
  if (title) {
    const heading = document.createElement('h2');
    heading.className = 'link-directory-title';
    heading.textContent = title;
    moveInstrumentation(titleCell, heading);
    group.append(heading);
  }

  const list = listCell?.querySelector('ul, ol');
  if (!list) return group;
  list.className = 'link-directory-list';
  group.append(list);

  const items = [...list.children];
  if (items.length > VISIBLE) {
    items.slice(VISIBLE).forEach((li) => { li.hidden = true; });
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'link-directory-more';
    button.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span');
    label.textContent = showAllCell?.textContent.trim() || 'Mostra tutti';
    button.append(label);
    button.addEventListener('click', () => {
      items.forEach((li) => { li.hidden = false; });
      button.remove();
      items[VISIBLE].querySelector('a')?.focus();
    });
    group.append(button);
  }
  return group;
}

export default function decorate(block) {
  const groups = [...block.children].map(buildGroup);
  block.textContent = '';
  block.append(...groups);
}
