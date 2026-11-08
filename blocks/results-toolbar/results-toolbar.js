const STORAGE_KEY = 'results-view';
const VIEWS = ['list', 'grid'];

function setView(view, buttons) {
  document.body.dataset.resultsView = view;
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
  try {
    sessionStorage.setItem(STORAGE_KEY, view);
  } catch (e) {
    // storage unavailable (private mode); the view still applies for this page
  }
  document.dispatchEvent(new CustomEvent('results-toolbar:view', { detail: { view } }));
}

/**
 * Sort option label -> { field, dir }. Fields: price, year, km; anything else (publication date)
 * keeps the authored order.
 */
function sortKey(label) {
  const text = label.toLowerCase();
  let field = 'default';
  if (/prezzo|price|preis|prix|precio/.test(text)) field = 'price';
  else if (/anno|year|jahr|année|año/.test(text)) field = 'year';
  else if (/chilometr|kilom|mileage|odometer|km/.test(text)) field = 'km';
  const dir = /decresc|desc|più recente|newest|absteig|décroiss/.test(text) ? 'desc' : 'asc';
  return { field, dir };
}

let dropdownCount = 0;

function buildSort(labelText, list) {
  const options = [...list.querySelectorAll('li')].map((li) => ({
    label: li.textContent.trim(),
    selected: !!li.querySelector('strong, b'),
  })).filter((o) => o.label);
  if (!options.length) return null;
  const selected = options.find((o) => o.selected) || options[options.length - 1];

  dropdownCount += 1;
  const id = `results-toolbar-sort-${dropdownCount}`;
  const wrapper = document.createElement('div');
  wrapper.className = 'results-toolbar-sort';

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'results-toolbar-sort-button';
  button.setAttribute('aria-haspopup', 'listbox');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', id);
  const label = document.createElement('span');
  label.className = 'results-toolbar-sort-label';
  label.textContent = labelText;
  const value = document.createElement('span');
  value.className = 'results-toolbar-sort-value';
  value.textContent = selected.label;
  button.append(label, value);

  const listbox = document.createElement('ul');
  listbox.className = 'results-toolbar-sort-options';
  listbox.id = id;
  listbox.setAttribute('role', 'listbox');
  listbox.setAttribute('aria-label', labelText);
  listbox.hidden = true;

  const close = () => {
    listbox.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  };
  options.forEach((option) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'option');
    li.tabIndex = -1;
    li.textContent = option.label;
    li.setAttribute('aria-selected', String(option === selected));
    li.addEventListener('click', () => {
      listbox.querySelectorAll('[role="option"]').forEach((o) => o.setAttribute('aria-selected', String(o === li)));
      value.textContent = option.label;
      close();
      button.focus();
      document.dispatchEvent(new CustomEvent('results-toolbar:sort', {
        detail: { label: option.label, ...sortKey(option.label) },
      }));
    });
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); li.nextElementSibling?.focus(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); li.previousElementSibling?.focus(); }
      if (e.key === 'Escape') { close(); button.focus(); }
    });
    listbox.append(li);
  });

  button.addEventListener('click', () => {
    const open = listbox.hidden;
    listbox.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    if (open) listbox.querySelector('[aria-selected="true"]')?.focus();
  });
  document.addEventListener('click', (e) => { if (!wrapper.contains(e.target)) close(); });

  wrapper.append(button, listbox);
  return wrapper;
}

/**
 * Rows:
 * 1. main link: back to search (favorites) or refine search (results listings)
 * 2. actions (results listings): compare link; sort label paragraph + list of sort options
 *    (the selected option in bold)
 * 3. list / grid view labels (one paragraph each; older content has one row per label)
 *
 * The chosen view is written to body[data-results-view] so listing blocks can restyle; a sort
 * choice is announced with the `results-toolbar:sort` event ({ label, field, dir }).
 */
export default function decorate(block) {
  const rows = [...block.children];
  const mainRow = rows.find((r) => r.querySelector('a'));
  const actionsRow = rows.find((r) => r !== mainRow && r.querySelector('ul, ol, a'));
  const labelTexts = rows
    .filter((r) => r !== mainRow && r !== actionsRow)
    .flatMap((r) => {
      // grouped labels: one paragraph each, or separate text nodes in one cell
      const paras = [...r.querySelectorAll('p')];
      if (paras.length) return paras.map((p) => p.textContent.trim());
      const cell = r.querySelector(':scope > div') || r;
      return [...cell.childNodes]
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent.trim());
    })
    .filter(Boolean);
  const labels = VIEWS.map((v, i) => labelTexts[i] || (v === 'list' ? 'List' : 'Grid'));

  const main = document.createElement('div');
  main.className = 'results-toolbar-main';
  const link = mainRow?.querySelector('a');
  if (link) {
    link.classList.remove('button', 'primary', 'secondary');
    link.classList.add(actionsRow ? 'results-toolbar-refine' : 'results-toolbar-back-link');
    // the link title is the short label shown on small screens (e.g. "Filtri")
    const short = link.title?.trim();
    if (short && short !== link.textContent.trim()) {
      const full = document.createElement('span');
      full.className = 'results-toolbar-label';
      full.textContent = link.textContent.trim();
      const compact = document.createElement('span');
      compact.className = 'results-toolbar-label-short';
      compact.textContent = short;
      link.setAttribute('aria-label', full.textContent);
      link.replaceChildren(full, compact);
      link.removeAttribute('title');
    }
    main.append(link);
  }

  const tools = document.createElement('div');
  tools.className = 'results-toolbar-tools';
  if (actionsRow) {
    const actions = document.createElement('div');
    actions.className = 'results-toolbar-actions';
    actionsRow.querySelectorAll('a').forEach((a) => {
      a.classList.remove('button', 'primary', 'secondary');
      a.classList.add('results-toolbar-compare');
      actions.append(a);
    });
    const list = actionsRow.querySelector('ul, ol');
    if (list) {
      const sortLabel = [...actionsRow.querySelectorAll('p')]
        .map((p) => p.textContent.trim()).find(Boolean) || 'Sort';
      const sort = buildSort(sortLabel, list);
      if (sort) actions.append(sort);
    }
    tools.append(actions);
  }

  const toggle = document.createElement('div');
  toggle.className = 'results-toolbar-views';
  toggle.setAttribute('role', 'group');
  const buttons = VIEWS.map((view, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `results-toolbar-view results-toolbar-view-${view}`;
    button.dataset.view = view;
    button.setAttribute('aria-label', labels[i]);
    button.title = labels[i];
    toggle.append(button);
    return button;
  });
  buttons.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view, buttons)));
  tools.append(toggle);

  block.textContent = '';
  block.append(main, tools);

  let initial = 'grid';
  try {
    initial = sessionStorage.getItem(STORAGE_KEY) || initial;
  } catch (e) {
    // ignore
  }
  setView(VIEWS.includes(initial) ? initial : 'grid', buttons);
}
