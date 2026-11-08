const toToken = (text) => text.trim().toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

/**
 * Rows:
 * 1. filter labels - a list (or one paragraph per label). The first label shows everything;
 *    the others filter tiles whose category matches the slug of the label (e.g. "Serie speciali"
 *    -> "serie-speciali").
 * 2. search placeholder text (optional) - enables the search toggle.
 *
 * State is broadcast as a `model-filter:change` event ({ category, query }) on document.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [filtersRow, searchRow] = rows;
  const labelEls = filtersRow
    ? [...filtersRow.querySelectorAll('li')].filter((li) => li.textContent.trim())
    : [];
  const labels = (labelEls.length
    ? labelEls
    : [...(filtersRow?.querySelectorAll('p') || [])]).map((el) => el.textContent.trim()).filter(Boolean);
  const placeholder = searchRow?.textContent.trim() || '';

  const state = { category: 'all', query: '' };
  const emit = () => document.dispatchEvent(new CustomEvent('model-filter:change', { detail: { ...state } }));

  const tablist = document.createElement('div');
  tablist.className = 'model-filter-tabs';
  tablist.setAttribute('role', 'tablist');

  labels.forEach((label, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'model-filter-tab';
    button.setAttribute('role', 'tab');
    button.dataset.category = i === 0 ? 'all' : toToken(label);
    button.textContent = label;
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    button.addEventListener('click', () => {
      tablist.querySelectorAll('.model-filter-tab').forEach((b) => b.setAttribute('aria-selected', 'false'));
      button.setAttribute('aria-selected', 'true');
      state.category = button.dataset.category;
      emit();
    });
    tablist.append(button);
  });

  block.textContent = '';
  block.append(tablist);

  if (placeholder) {
    const search = document.createElement('div');
    search.className = 'model-filter-search';

    const input = document.createElement('input');
    input.type = 'search';
    input.className = 'model-filter-input';
    input.placeholder = placeholder;
    input.setAttribute('aria-label', placeholder);
    input.hidden = true;
    input.addEventListener('input', () => {
      state.query = input.value;
      emit();
    });

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'model-filter-search-toggle';
    toggle.setAttribute('aria-label', placeholder);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      input.hidden = !open;
      if (open) input.focus();
      else if (input.value) {
        input.value = '';
        state.query = '';
        emit();
      }
    });

    search.append(input, toggle);
    block.append(search);
  }
}
