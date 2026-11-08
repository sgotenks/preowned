import { moveInstrumentation } from '../../scripts/scripts.js';
import { ICONS, el } from '../../scripts/vehicle.js';

/*
 * vehicle-details: the ad's detail tabs (source TabCarADDetails). One row per group:
 * tab | title | content. Rows sharing a tab form one panel; each group renders by its content:
 * - plain list, several titled groups in the tab: open accordion, 4 columns (optional equipment)
 * - plain list, the tab's only titled group: 2-column list, clipped behind a "see all" bar when the
 *   content ends with a paragraph holding its label (standard equipment)
 * - untitled list of <strong>value</strong> unit <em>label</em>: key figures (technical specs)
 * - list of <strong>label</strong> value: collapsed accordion of spec rows (technical specs)
 * - untitled copy: plain text (dealer notes)
 * Variant "consumption" (source AccordionConsumption): the single tab is an open accordion whose
 * groups are sub-headed label / value grids, followed by the untitled disclaimer.
 */

let uid = 0;

function cellText(cell) {
  return cell?.textContent.trim() || '';
}

function accordion(title, nodes, { open = false, className = '' } = {}) {
  uid += 1;
  const item = el('div', `vehicle-details-accordion ${className}`.trim());
  const heading = el('h3', 'vehicle-details-accordion-title');
  const head = el('button', 'vehicle-details-head');
  head.type = 'button';
  head.id = `vehicle-details-head-${uid}`;
  head.setAttribute('aria-controls', `vehicle-details-body-${uid}`);
  head.append(el('span', 'vehicle-details-title', title), el('span', 'vehicle-details-icon', ICONS.close));
  heading.append(head);
  const body = el('div', 'vehicle-details-body');
  body.id = `vehicle-details-body-${uid}`;
  body.setAttribute('role', 'region');
  body.setAttribute('aria-labelledby', head.id);
  body.append(...nodes);
  const set = (expanded) => {
    head.setAttribute('aria-expanded', String(expanded));
    item.classList.toggle('is-open', expanded);
    body.hidden = !expanded;
  };
  head.addEventListener('click', () => set(head.getAttribute('aria-expanded') !== 'true'));
  set(open);
  item.append(heading, body);
  return item;
}

/* <li><strong>label</strong> value</li> -> label / value spans */
function specRows(list, className) {
  list.className = className;
  list.querySelectorAll(':scope > li').forEach((li) => {
    const strong = li.querySelector(':scope > strong');
    if (!strong) return;
    const value = el('span', 'vehicle-details-value');
    while (strong.nextSibling) value.append(strong.nextSibling);
    value.textContent = value.textContent.trim();
    strong.classList.add('vehicle-details-label');
    li.append(value);
  });
  return list;
}

/* <li><strong>value</strong> unit <em>label</em></li> -> big value + unit over a small label */
function keyFigures(list) {
  list.className = 'vehicle-details-figures';
  list.querySelectorAll(':scope > li').forEach((li) => {
    const strong = li.querySelector('strong');
    const em = li.querySelector('em');
    const unit = [...li.childNodes]
      .filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join(' ').trim();
    const value = el('p', 'vehicle-details-figure-value', '');
    value.append(strong?.textContent.trim() || '');
    if (unit) value.append(' ', el('span', 'vehicle-details-figure-unit', unit));
    li.replaceChildren(value, el('p', 'vehicle-details-figure-label', em?.textContent.trim() || ''));
  });
  return list;
}

function standardEquipment(title, content) {
  const wrap = el('div', 'vehicle-details-equipment');
  wrap.append(el('h3', 'vehicle-details-heading', title));
  const list = content.querySelector('ul');
  const more = [...content.querySelectorAll(':scope > p')].pop();
  const box = el('div', 'vehicle-details-equipment-list');
  if (list) {
    list.className = 'vehicle-details-grid';
    box.append(list);
  }
  wrap.append(box);
  if (more && list) {
    const btn = el('button', 'vehicle-details-more');
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.append(el('span', '', more.textContent.trim()), el('span', 'vehicle-details-icon', ICONS.close));
    btn.addEventListener('click', () => {
      box.classList.add('is-expanded');
      btn.remove();
    });
    more.remove();
    box.classList.add('is-clipped');
    box.append(btn);
  }
  return wrap;
}

function buildGroup(group, siblings) {
  const { title, content } = group;
  const list = content?.querySelector(':scope > ul');
  const hasStrong = list?.querySelector(':scope > li > strong');
  if (!title) {
    if (list?.querySelector(':scope > li > em')) return keyFigures(list);
    const notes = el('div', 'vehicle-details-notes');
    notes.append(...(content?.childNodes ? [...content.childNodes] : []));
    return notes;
  }
  if (hasStrong) {
    return accordion(title, [specRows(list, 'vehicle-details-specs')], { className: 'techpanel' });
  }
  const titled = siblings.filter((g) => g.title).length;
  if (titled === 1) return standardEquipment(title, content);
  if (list) list.className = 'vehicle-details-optionals';
  return accordion(title, [...content.childNodes], { open: true });
}

function buildConsumption(block, tabs) {
  const [[name, groups]] = tabs;
  const nodes = groups.map(({ title, content, row }) => {
    const part = el('div', title ? 'vehicle-details-subcategory' : 'vehicle-details-disclaimer');
    moveInstrumentation(row, part);
    if (title) part.append(el('h4', 'vehicle-details-subtitle', title));
    const list = content?.querySelector(':scope > ul');
    if (list) part.append(specRows(list, 'vehicle-details-consumption'));
    else part.append(...(content?.childNodes ? [...content.childNodes] : []));
    return part;
  });
  block.replaceChildren(accordion(name, nodes, { open: true, className: 'consumption' }));
}

export default function decorate(block) {
  const tabs = new Map();
  [...block.children].forEach((row) => {
    const [tabCell, titleCell, contentCell] = [...row.children];
    const tab = cellText(tabCell);
    if (!tabs.has(tab)) tabs.set(tab, []);
    tabs.get(tab).push({ row, title: cellText(titleCell), content: contentCell });
  });
  if (!tabs.size) return;

  if (block.classList.contains('consumption')) {
    buildConsumption(block, [...tabs]);
    return;
  }

  uid += 1;
  const prefix = `vehicle-details-${uid}`;
  const tabList = el('div', 'vehicle-details-tabs');
  tabList.setAttribute('role', 'tablist');
  const panels = el('div', 'vehicle-details-panels');
  const buttons = [];
  [...tabs].forEach(([name, groups], i) => {
    const button = el('button', 'vehicle-details-tab', name);
    button.type = 'button';
    button.id = `${prefix}-tab-${i}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `${prefix}-panel-${i}`);
    const panel = el('div', 'vehicle-details-panel');
    panel.id = `${prefix}-panel-${i}`;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', button.id);
    groups.forEach((group) => {
      const node = buildGroup(group, groups);
      moveInstrumentation(group.row, node);
      panel.append(node);
    });
    tabList.append(button);
    panels.append(panel);
    buttons.push(button);
  });

  const select = (index) => {
    buttons.forEach((b, i) => {
      const selected = i === index;
      b.setAttribute('aria-selected', String(selected));
      b.tabIndex = selected ? 0 : -1;
      panels.children[i].hidden = !selected;
    });
  };
  buttons.forEach((b, i) => {
    b.addEventListener('click', () => select(i));
    b.addEventListener('keydown', (e) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!step) return;
      const next = (i + step + buttons.length) % buttons.length;
      select(next);
      buttons[next].focus();
    });
  });
  select(0);

  block.replaceChildren(tabList, panels);
}
