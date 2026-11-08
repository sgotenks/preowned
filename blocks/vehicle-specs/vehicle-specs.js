import { moveInstrumentation } from '../../scripts/scripts.js';
import { el } from '../../scripts/vehicle.js';

/*
 * vehicle-specs: the ad's overview figures (source OverviewData): one row per figure,
 * label + value, laid out as a 2 / 4 column grid of uppercase label-over-value items.
 */
export default function decorate(block) {
  const list = el('ul', 'vehicle-specs-list');
  [...block.children].forEach((row) => {
    const [label, value] = [...row.children];
    const li = el('li', 'vehicle-specs-item');
    moveInstrumentation(row, li);
    li.append(
      el('p', 'vehicle-specs-label', label?.textContent.trim() || ''),
      el('p', 'vehicle-specs-value', value?.textContent.trim() || ''),
    );
    list.append(li);
  });
  block.replaceChildren(list);
}
