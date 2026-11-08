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
 * Rows:
 * 1. back link (e.g. "Torna alla ricerca")
 * 2. list view label (optional, defaults to "List")
 * 3. grid view label (optional, defaults to "Grid")
 *
 * The chosen view is written to body[data-results-view] so listing blocks can restyle.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const link = block.querySelector('a');
  const labelRows = rows.filter((r) => !r.querySelector('a'));
  const labels = VIEWS.map((v, i) => labelRows[i]?.textContent.trim() || (v === 'list' ? 'List' : 'Grid'));

  const back = document.createElement('div');
  back.className = 'results-toolbar-back';
  if (link) {
    link.classList.remove('button');
    link.classList.add('results-toolbar-back-link');
    back.append(link);
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

  block.textContent = '';
  block.append(back, toggle);

  let initial = 'grid';
  try {
    initial = sessionStorage.getItem(STORAGE_KEY) || initial;
  } catch (e) {
    // ignore
  }
  setView(VIEWS.includes(initial) ? initial : 'grid', buttons);
}
