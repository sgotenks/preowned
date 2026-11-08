const PLUS_ICON = '<svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7.063 8.938L.5 8.5a.5.5 0 0 1 0-1l6.563-.438L7.5.5a.5.5 0 0 1 1 0l.438 6.563L15.5 7.5a.5.5 0 0 1 0 1l-6.563.438L8.5 15.5a.5.5 0 0 1-1 0l-.438-6.563z"/></svg>';
const CHEVRON_UP_ICON = '<svg class="footer-country-arrow" width="16" height="8" viewBox="0 0 16 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.547.732L16 8 8 4 0 8 6.453.732A1.996 1.996 0 0 1 8 0c.623 0 1.18.285 1.547.732z"/></svg>';
const ROW_NAMES = ['links', 'social', 'legal', 'bottom', 'partner'];
// the source footer switches to its desktop layout at 60.0625em
const DESKTOP_QUERY = window.matchMedia('(width >= 961px)');

/**
 * Fetches the footer fragment: /content first (local preview), then the site root (DA/EDS).
 * @returns {Promise<Element|null>} wrapper holding the fragment's top-level sections
 */
async function fetchFooterFragment() {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) resp = await fetch('/footer.plain.html');
  if (!resp.ok) return null;
  // Parse without loading images, then resolve them against the fragment's URL:
  // relative paths would otherwise point below the current page on nested pages.
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
  doc.querySelectorAll('img[src]').forEach((img) => {
    img.src = new URL(img.getAttribute('src'), resp.url).href;
  });
  const wrapper = document.createElement('div');
  wrapper.append(...doc.body.childNodes);
  return wrapper;
}

/**
 * Opens links to other sites in a new tab; links within the Ferrari main site stay in the tab.
 * @param {Element} root container whose links are updated
 */
function setLinkTargets(root) {
  root.querySelectorAll('a[href]').forEach((a) => {
    try {
      const { hostname } = new URL(a.href, window.location.href);
      if (hostname !== window.location.hostname && hostname !== 'www.ferrari.com') {
        a.target = '_blank';
        a.rel = 'noopener';
      }
    } catch (e) {
      // leave unparsable links as they are
    }
  });
}

/**
 * Pairs each title paragraph with the list that follows it.
 * @param {Element} section fragment section
 * @returns {{title: Element, list: Element|null}[]}
 */
function getGroups(section) {
  const groups = [];
  [...section.children].forEach((el) => {
    if (el.tagName === 'P') groups.push({ title: el, list: null });
    else if (el.tagName === 'UL' && groups.length) groups[groups.length - 1].list = el;
  });
  return groups;
}

function createContent(row) {
  const content = document.createElement('div');
  content.className = 'footer-content';
  row.append(content);
  return content;
}

function createPlusIcon(className) {
  const icon = document.createElement('i');
  icon.className = className;
  icon.setAttribute('aria-hidden', 'true');
  icon.innerHTML = PLUS_ICON;
  return icon;
}

/**
 * Makes a title expand/collapse the list that belongs to it (several can be open at once).
 * @param {Element} item element that receives the is-open state
 * @param {Element} trigger clickable title
 * @param {Element} list collapsible list
 * @returns {{enable: Function, disable: Function}} switches the toggle on/off
 */
function makeToggle(item, trigger, list) {
  let enabled = false;
  const setOpen = (open) => {
    item.classList.toggle('is-open', open);
    if (enabled) trigger.setAttribute('aria-expanded', String(open));
    list.inert = enabled && !open;
  };
  trigger.addEventListener('click', (e) => {
    if (!enabled) return;
    e.preventDefault();
    setOpen(!item.classList.contains('is-open'));
  });
  trigger.addEventListener('keydown', (e) => {
    if (!enabled || (e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    setOpen(!item.classList.contains('is-open'));
  });
  return {
    enable() {
      enabled = true;
      trigger.setAttribute('role', 'button');
      trigger.tabIndex = 0;
      trigger.setAttribute('aria-controls', list.id);
      setOpen(item.classList.contains('is-open'));
    },
    disable() {
      enabled = false;
      ['role', 'tabindex', 'aria-controls', 'aria-expanded'].forEach((a) => trigger.removeAttribute(a));
      setOpen(false);
    },
  };
}

/**
 * Link columns: a title (text or link) above a list of links.
 * Below the desktop breakpoint each column is an accordion, as on the source.
 * @param {Element} section fragment section
 * @param {Element} content target container
 */
function buildColumns(section, content) {
  const toggles = [];
  getGroups(section).forEach(({ title, list }, i) => {
    const col = document.createElement('div');
    col.className = 'footer-col';
    const heading = document.createElement('div');
    heading.className = 'footer-col-title';
    const link = title.querySelector('a');
    if (link) {
      heading.append(link);
    } else {
      const label = document.createElement('span');
      label.textContent = title.textContent.trim();
      heading.append(label);
    }
    heading.append(createPlusIcon('footer-col-icon'));
    col.append(heading);
    if (list) {
      list.id = `footer-col-${i}`;
      col.append(list);
      toggles.push(makeToggle(col, heading, list));
    }
    content.append(col);
  });
  const applyMode = () => toggles.forEach((t) => {
    if (DESKTOP_QUERY.matches) t.disable();
    else t.enable();
  });
  applyMode();
  DESKTOP_QUERY.addEventListener('change', applyMode);
}

/**
 * Social networks: icon + label; a network whose title is not a link toggles its account list.
 * @param {Element} section fragment section
 * @param {Element} content target container
 */
function buildSocial(section, content) {
  getGroups(section).forEach(({ title, list }, i) => {
    const item = document.createElement('div');
    item.className = 'footer-social-item';
    const link = title.querySelector('a');
    const img = title.querySelector('img');

    const label = document.createElement('span');
    label.className = 'footer-social-label';
    if (img) label.append(img);
    const name = document.createElement('span');
    name.className = 'footer-social-name';
    name.textContent = title.textContent.trim();
    label.append(name);

    let trigger;
    if (link) {
      trigger = link;
      trigger.textContent = '';
      trigger.append(label);
    } else {
      trigger = document.createElement('div');
      trigger.append(label, createPlusIcon('footer-social-icon'));
    }
    trigger.classList.add('footer-social-title');
    item.append(trigger);

    if (list) {
      list.className = 'footer-social-accounts';
      list.id = `footer-social-${i}`;
      item.append(list);
      if (link) list.inert = true;
      else makeToggle(item, trigger, list).enable();
    }
    content.append(item);
  });
}

/**
 * Bottom bar: service links and the country chooser (above the links on mobile, right on desktop).
 * @param {Element} section fragment section
 * @param {Element} content target container
 */
function buildBottom(section, content) {
  const list = section.querySelector('ul');
  if (list) {
    list.className = 'footer-service-links';
    content.append(list);
  }
  const country = section.querySelector('p a');
  if (country) {
    const right = document.createElement('div');
    right.className = 'footer-country';
    const label = document.createElement('span');
    label.textContent = country.textContent.trim();
    country.textContent = '';
    country.append(label);
    country.insertAdjacentHTML('beforeend', CHEVRON_UP_ICON);
    if (country.title) country.setAttribute('aria-label', country.title);
    right.append(country);
    content.append(right);
  }
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await fetchFooterFragment();
  block.textContent = '';
  if (!fragment) return;

  const sections = [...fragment.children].filter((el) => el.tagName === 'DIV');
  const rows = sections.map((section, i) => {
    const row = document.createElement('div');
    row.className = `footer-row footer-${ROW_NAMES[i] || `row-${i}`}`;
    const content = createContent(row);
    if (i === 0) buildColumns(section, content);
    else if (i === 1) buildSocial(section, content);
    else if (i === 3) buildBottom(section, content);
    else content.append(...section.childNodes);
    return row;
  });

  rows.forEach((row) => {
    // the China ICP registration link is only shown on the China site
    row.querySelectorAll('a[href*="beian.miit.gov.cn"]').forEach((a) => a.closest('p')?.classList.add('footer-icp'));
    setLinkTargets(row);
  });

  // like the source, the five bands are the footer's own children; the block element stays empty
  const footer = block.closest('footer') || block.parentElement;
  footer.append(...rows);
}
