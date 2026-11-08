/**
 * Rows (in this order):
 * 1. background image
 * 2. content - heading and intro paragraph
 * 3. model search placeholder (e.g. "Cerca per modello")
 * 4. location search placeholder (e.g. "Città o Concessionaria")
 * 5. call to action link - its URL is the results page the form submits to
 *    (e.g. "Visualizza 179 risultati"; a number in the label is emphasised)
 * 6. countries (optional, comma-separated codes, e.g. "IT, DE, FR")
 * 7. expand search label (optional, e.g. "Espandi la ricerca in Europa")
 *
 * The form submits as GET with `country`, `model`, `location`
 * (and `expand=true` when the expand toggle is pressed).
 */

const ICONS = {
  search: '<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M6.1 0c3.3 0 6.1 2.7 6.1 6.1 0 1.3-.4 2.5-1.1 3.5l4.9 5.5c.2.2.2.5 0 .7-.2.2-.5.2-.7 0L9.6 11c-1 .7-2.2 1.1-3.5 1.1-3.4 0-6.1-2.7-6.1-6S2.7 0 6.1 0zm0 1.4c-2.6 0-4.7 2.1-4.7 4.7s2.1 4.7 4.7 4.7 4.7-2.1 4.7-4.7-2.1-4.7-4.7-4.7z"/></svg>',
  location: '<svg viewBox="0 0 10 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M5 1.111A3.887 3.887 0 0 0 1.111 5c0 1.572.7 3.1 1.568 4.372.843 1.245 1.81 2.2 2.321 2.667a15.583 15.583 0 0 0 2.32-2.667C8.188 8.1 8.889 6.572 8.889 5A3.887 3.887 0 0 0 5 1.111zM0 5a5 5 0 0 1 10 0c0 1.889-.834 3.633-1.76 5a17.046 17.046 0 0 1-2.529 2.894 1.057 1.057 0 0 1-1.422 0A17.046 17.046 0 0 1 1.76 10C.834 8.633 0 6.889 0 5zm5-1.111c-.613 0-1.111.5-1.111 1.111S4.387 6.111 5 6.111 6.111 5.611 6.111 5 5.613 3.889 5 3.889zM2.778 5a2.222 2.222 0 1 1 4.444 0 2.222 2.222 0 0 1-4.444 0z"/></svg>',
  chevron: '<svg viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M9.547 7.268L16 0 8 4 0 0l6.453 7.268A1.996 1.996 0 008 8c.623 0 1.18-.285 1.547-.732z"/></svg>',
  filters: '<svg viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M8.75 2a2.668 2.668 0 0 1 5.166 0H16v1.333h-2.084a2.668 2.668 0 0 1-5.165 0H0C0 2.597.597 2 1.333 2h7.418zm2.583 2a1.333 1.333 0 1 0 0-2.667 1.333 1.333 0 0 0 0 2.667zM7.25 10a2.668 2.668 0 0 1-5.166 0H0V8.667h2.084a2.668 2.668 0 0 1 5.165 0H16C16 9.403 15.403 10 14.667 10H7.249zM4.666 8a1.333 1.333 0 1 0 0 2.667 1.333 1.333 0 0 0 0-2.667z"/></svg>',
  circle: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="11"/></svg>',
};

function icon(name, cls) {
  const i = document.createElement('i');
  i.className = cls;
  i.innerHTML = ICONS[name];
  return i;
}

function regionName(code) {
  try {
    const lang = document.documentElement.lang || navigator.language || 'en';
    return new Intl.DisplayNames([lang], { type: 'region' }).of(code.toUpperCase()) || code;
  } catch (e) {
    return code;
  }
}

function field(name, placeholder, iconName) {
  const wrap = document.createElement('label');
  wrap.className = `hero-search-field hero-search-${name}`;
  const input = document.createElement('input');
  input.type = 'text';
  input.name = name;
  input.placeholder = placeholder;
  input.autocomplete = 'off';
  input.setAttribute('aria-label', placeholder);
  wrap.append(icon(iconName, 'hero-search-field-icon'), input);
  return wrap;
}

function countryPicker(countries) {
  const wrap = document.createElement('div');
  wrap.className = 'hero-search-country';

  const select = document.createElement('select');
  select.name = 'country';
  select.setAttribute('aria-label', 'Country');
  countries.forEach((c) => select.append(new Option(regionName(c), c.toLowerCase())));

  const display = document.createElement('span');
  display.className = 'hero-search-country-value';
  display.setAttribute('aria-hidden', 'true');
  const code = document.createElement('span');
  code.className = 'hero-search-country-code';
  const name = document.createElement('span');
  name.className = 'hero-search-country-name';
  display.append(code, name, icon('chevron', 'hero-search-country-chevron'));

  const sync = () => {
    const value = select.value.toUpperCase();
    code.textContent = value;
    name.textContent = regionName(value);
  };
  select.addEventListener('change', sync);
  sync();

  wrap.append(display, select);
  return wrap;
}

function submitButton(label) {
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.className = 'hero-search-submit';
  const span = document.createElement('span');
  // emphasise the result count, as on the source ("visualizza <strong>179</strong> risultati")
  label.split(/(\d[\d.,]*)/).filter(Boolean).forEach((part) => {
    if (/^\d/.test(part)) {
      const strong = document.createElement('strong');
      strong.textContent = part;
      span.append(strong);
    } else {
      span.append(document.createTextNode(part));
    }
  });
  submit.append(span);
  return submit;
}

function expandToggle(label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'hero-search-expand';
  button.setAttribute('aria-pressed', 'false');
  const i = icon('filters', 'hero-search-expand-icon');
  i.querySelector('svg').classList.add('hero-search-expand-glyph');
  const circle = document.createElement('span');
  circle.className = 'hero-search-expand-circle';
  circle.innerHTML = ICONS.circle;
  circle.querySelector('svg').classList.add('hero-search-expand-ring');
  i.prepend(circle);
  const text = document.createElement('span');
  text.className = 'hero-search-expand-label';
  text.textContent = label;
  button.append(i, text);

  const hidden = document.createElement('input');
  hidden.type = 'hidden';
  hidden.name = 'expand';
  hidden.value = 'true';
  hidden.disabled = true;

  button.addEventListener('click', () => {
    const pressed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(pressed));
    hidden.disabled = !pressed;
  });
  return [button, hidden];
}

export default function decorate(block) {
  const rows = [...block.children];
  const mediaRow = rows.find((r) => r.querySelector('picture') && !r.querySelector('h1, h2, h3, h4, h5, h6'));
  const contentRow = rows.find((r) => r.querySelector('h1, h2, h3, h4, h5, h6'));
  const ctaRow = rows.find((r) => r !== contentRow && r.querySelector('a'));
  const textRows = rows.filter((r) => ![mediaRow, contentRow, ctaRow].includes(r));
  // The search fields are authored in one grouped cell: AEM renders one paragraph per field,
  // imported content keeps them as separate text nodes. Older content has one row per field.
  const groupedValues = (row) => {
    const paras = [...row.querySelectorAll('p')];
    if (paras.length) return paras;
    const cell = row.querySelector(':scope > div') || row;
    return [...cell.childNodes]
      .filter((n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
      .map((n) => ({ textContent: n.textContent }));
  };
  const searchFields = textRows.length === 1 ? groupedValues(textRows[0]) : textRows;
  const [modelRow, locationRow, countriesRow, expandRow] = searchFields;
  const text = (row) => row?.textContent.trim() || '';

  if (mediaRow) mediaRow.className = 'hero-search-media';
  if (contentRow) contentRow.className = 'hero-search-content';

  const cta = ctaRow?.querySelector('a');
  const form = document.createElement('form');
  form.className = 'hero-search-form';
  form.method = 'get';
  form.action = cta?.href || window.location.pathname;
  form.setAttribute('role', 'search');

  const bar = document.createElement('div');
  bar.className = 'hero-search-bar';

  const countries = text(countriesRow).split(',').map((c) => c.trim()).filter(Boolean);
  if (countries.length) bar.append(countryPicker(countries));
  if (text(modelRow)) bar.append(field('model', text(modelRow), 'search'));
  if (text(locationRow)) bar.append(field('location', text(locationRow), 'location'));
  bar.append(submitButton(cta?.textContent.trim() || 'Search'));
  if (text(expandRow)) bar.append(...expandToggle(text(expandRow)));
  form.append(bar);

  const panel = document.createElement('div');
  panel.className = 'hero-search-box';
  if (contentRow) panel.append(contentRow);
  panel.append(form);

  block.textContent = '';
  if (mediaRow) block.append(mediaRow);
  block.append(panel);
}
