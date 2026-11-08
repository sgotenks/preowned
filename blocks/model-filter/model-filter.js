const toToken = (text) => text.trim().toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const SEARCH_ICON = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0m0 1.35c2.564 0 4.65 2.086 4.65 4.65S8.564 10.65 6 10.65 1.35 8.564 1.35 6 3.436 1.35 6 1.35"/><path d="M15.682 14.975a.5.5 0 0 1-.707.707l-5.657-4.95a1 1 0 1 1 1.414-1.414l4.95 5.657z"/></svg>';
const CLOSE_ICON = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M1.5 1.5l13 13m0-13l-13 13" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';

/**
 * Rows:
 * 1. filter labels - a list (or one paragraph per label). The first label shows everything;
 *    the others filter tiles whose category matches the slug of the label (e.g. "Serie speciali"
 *    -> "serie-speciali").
 * 2. search placeholder text (optional) - enables the search button, which opens a search row
 *    above the tabs.
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

  const bar = document.createElement('div');
  bar.className = 'model-filter-bar';

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
    button.setAttribute('aria-label', `Sfoglia ${label}`);
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    button.addEventListener('click', () => {
      tablist.querySelectorAll('.model-filter-tab').forEach((b) => b.setAttribute('aria-selected', 'false'));
      button.setAttribute('aria-selected', 'true');
      state.category = button.dataset.category;
      emit();
    });
    tablist.append(button);
  });
  bar.append(tablist);

  block.textContent = '';

  if (placeholder) {
    const search = document.createElement('div');
    search.className = 'model-filter-search';
    search.hidden = true;

    const icon = document.createElement('span');
    icon.className = 'model-filter-search-icon';
    icon.innerHTML = SEARCH_ICON;

    const input = document.createElement('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.className = 'model-filter-input';
    input.placeholder = placeholder;
    input.setAttribute('aria-label', placeholder);
    input.addEventListener('input', () => {
      state.query = input.value;
      emit();
    });

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'model-filter-search-close';
    close.setAttribute('aria-label', 'Chiudi');
    close.innerHTML = CLOSE_ICON;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'model-filter-search-toggle';
    toggle.setAttribute('aria-label', placeholder);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = SEARCH_ICON;

    const setOpen = (open) => {
      search.hidden = !open;
      toggle.hidden = open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) {
        input.focus();
      } else {
        if (input.value) {
          input.value = '';
          state.query = '';
          emit();
        }
        toggle.focus();
      }
    };
    toggle.addEventListener('click', () => setOpen(true));
    close.addEventListener('click', () => setOpen(false));
    input.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

    search.append(icon, input, close);
    bar.append(toggle);
    block.append(search);
  }

  block.append(bar);
}
