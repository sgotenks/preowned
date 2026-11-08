/**
 * Rows:
 * 1. label (e.g. "Filtri attivi:")
 * 2. active filter chips - a list, one item per filter (optional; chips can also be added
 *    at runtime with the `active-filters:set` event, detail: { filters: [{ label, value }] })
 * 3. save-search call to action link (e.g. "Salva la ricerca")
 *
 * Removing a chip dispatches `active-filters:remove` ({ label, value }) on document. A chip
 * authored as a link (the search without that filter) navigates there instead.
 */
const REMOVE_LABEL = document.documentElement.lang === 'it' ? 'Rimuovi' : 'Remove';

function createChip(label, value, href) {
  const li = document.createElement('li');
  li.className = 'active-filters-chip';
  li.dataset.value = value || label;

  const text = document.createElement('span');
  text.className = 'active-filters-chip-label';
  text.textContent = label;

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'active-filters-chip-remove';
  remove.setAttribute('aria-label', `${REMOVE_LABEL} ${label}`);
  remove.addEventListener('click', () => {
    if (href) {
      window.location.href = href;
      return;
    }
    const list = li.parentElement;
    li.remove();
    document.dispatchEvent(new CustomEvent('active-filters:remove', {
      detail: { label, value: li.dataset.value },
    }));
    if (list && !list.children.length) list.closest('.active-filters')?.classList.add('is-empty');
  });

  li.append(text, remove);
  return li;
}

export default function decorate(block) {
  const rows = [...block.children];
  const listRow = rows.find((r) => r.querySelector('ul, ol'));
  const ctaRow = rows.find((r) => r !== listRow && r.querySelector('a'));
  const labelRow = rows.find((r) => r !== listRow && r !== ctaRow);

  const filters = document.createElement('div');
  filters.className = 'active-filters-list';

  if (labelRow?.textContent.trim()) {
    const label = document.createElement('span');
    label.className = 'active-filters-label';
    label.textContent = labelRow.textContent.trim();
    filters.append(label);
  }

  const chips = document.createElement('ul');
  chips.className = 'active-filters-chips';
  listRow?.querySelectorAll('li').forEach((item) => {
    const text = item.textContent.trim();
    if (text) chips.append(createChip(text, text, item.querySelector('a')?.href));
  });
  filters.append(chips);

  block.textContent = '';
  block.append(filters);

  const cta = ctaRow?.querySelector('a');
  if (cta) {
    const actions = document.createElement('div');
    actions.className = 'active-filters-actions';
    cta.classList.add('active-filters-save');
    actions.append(cta);
    block.append(actions);
  }

  block.classList.toggle('is-empty', !chips.children.length);

  document.addEventListener('active-filters:set', (e) => {
    const list = e.detail?.filters || [];
    chips.replaceChildren(...list.map((f) => createChip(f.label, f.value)));
    block.classList.toggle('is-empty', !chips.children.length);
  });
}
