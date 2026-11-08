/*
 * Header: corporate super-header (pillar buttons opening a full-screen menu) and the
 * channel bar (hamburger, wordmark, links, share). All copy, links and images come from
 * the nav fragment (content/nav.plain.html); this file only builds controls and behavior.
 *
 * Fragment sections, in order:
 *   1. brand: logo link
 *   2. menu: <ul> of pillars > categories > links (nested <ul>); a <strong> label marks an
 *      item that starts open/active; <p><img></p> after a label is its preview image(s),
 *      a following <p> of links is that preview's call-to-action(s)
 *   3. channel: wordmark link + <ul> of channel links
 *   4. channel menu: title, <ul> of links, preview image (opened by the hamburger)
 *   5. share: title, <ul> of share targets, close label
 */

const isDesktop = window.matchMedia('(width >= 900px)');

const ICONS = {
  chevronRight: '<svg width="8" height="16" viewBox="0 0 8 16" aria-hidden="true"><path d="M7.268 9.547L0 16l4-8-4-8 7.268 6.453C7.715 6.82 8 7.377 8 8c0 .623-.285 1.18-.732 1.547z"/></svg>',
  chevronDown: '<svg width="16" height="8" viewBox="0 0 16 8" aria-hidden="true"><path d="M9.547 7.268L16 0 8 4 0 0l6.453 7.268C6.82 7.715 7.377 8 8 8c.623 0 1.18-.285 1.547-.732z"/></svg>',
  hamburger: '<svg width="17" height="14" viewBox="0 0 17 14" aria-hidden="true"><path d="M.667 2.333h16v-2h-14a2 2 0 0 0-2 2zM.667 8h16V6h-14a2 2 0 0 0-2 2zm0 5.667h16v-2h-14a2 2 0 0 0-2 2z"/></svg>',
  close: '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.2" fill="none"/></svg>',
  share: '<svg width="12" height="13" viewBox="0 0 12 13" aria-hidden="true"><circle cx="10" cy="2" r="1.6"/><circle cx="2" cy="6.5" r="1.6"/><circle cx="10" cy="11" r="1.6"/><path d="M10 2L2 6.5 10 11" stroke="currentColor" stroke-width="1" fill="none"/></svg>',
  back: '<svg width="8" height="16" viewBox="0 0 8 16" aria-hidden="true"><path d="M.732 9.547L8 16 4 8l4-8L.732 6.453C.285 6.82 0 7.377 0 8c0 .623.285 1.18.732 1.547z"/></svg>',
  arrow: '<svg width="8" height="12" viewBox="0 0 8 16" aria-hidden="true"><path d="M7.268 9.547L0 16l4-8-4-8 7.268 6.453C7.715 6.82 8 7.377 8 8c0 .623-.285 1.18-.732 1.547z"/></svg>',
};

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html) node.innerHTML = html;
  return node;
}

/** Fetch the nav fragment: local preview serves it under /content, production at the root. */
async function fetchNav() {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) resp = await fetch('/nav.plain.html');
  if (!resp.ok) return null;
  const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
  // image paths in the fragment are relative to the fragment itself
  doc.querySelectorAll('img[src]').forEach((img) => {
    img.src = new URL(img.getAttribute('src'), resp.url).href;
  });
  return doc;
}

/** A link is "local" when it points to this site (relative in the fragment). */
const isLocalHref = (href) => !!href && href.startsWith('/');

/** Current page path as written in the fragment ("/" for the home page, no /content prefix). */
const currentPath = () => window.location.pathname
  .replace(/^\/content(?=\/)/, '')
  .replace(/\/index$/, '/')
  .replace(/(.)\/$/, '$1') || '/';

/** Labels for generated controls come from the brand section (e.g. "Discover more"). */
const labels = { more: '', menu: '' };

/* Label wrappers: <strong> = starts open/active, <em> = accordion on mobile (may be nested). */
function labelHead(li) {
  let head = li;
  let wrapper = li.querySelector(':scope > strong, :scope > em');
  while (wrapper) {
    head = wrapper;
    wrapper = wrapper.querySelector(':scope > strong, :scope > em');
  }
  return head;
}

function directLabel(li) {
  const head = labelHead(li);
  const a = head.querySelector(':scope > a');
  if (a) {
    const href = a.getAttribute('href');
    return { label: a.textContent.trim(), href: href && href !== '#' ? href : null };
  }
  const text = [...head.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent).join('').trim();
  return { label: text, href: null };
}

/** A mobile thumbnail card image is marked by an alt text ending in "thumbnail". */
const isThumb = (img) => /thumbnail$/i.test(img.getAttribute('alt') || '');

function parsePreview(li) {
  const preview = [];
  li.querySelectorAll(':scope > p').forEach((p) => {
    const imgs = [...p.querySelectorAll('img')].filter((img) => !isThumb(img));
    if (imgs.length) preview.push({ imgs, ctas: [] });
    else if (!p.querySelector('img') && preview.length) preview[preview.length - 1].ctas.push(...p.querySelectorAll('a'));
  });
  return preview;
}

function parseItem(li) {
  const { label, href } = directLabel(li);
  const ul = li.querySelector(':scope > ul');
  const preview = parsePreview(li);
  const thumb = [...li.querySelectorAll(':scope > p img')].find(isThumb)
    || (preview[0]?.imgs.length > 1 ? preview[0].imgs[1] : null);
  return {
    label,
    href,
    open: !!li.querySelector(':scope > strong'),
    accordion: !!li.querySelector(':scope > em, :scope > strong > em'),
    preview,
    thumb,
    children: ul ? [...ul.children].map(parseItem) : [],
  };
}

const containsLocal = (item) => isLocalHref(item.href) || item.children.some(containsLocal);
const firstWithPreview = (item) => (item.preview.length
  ? item
  : item.children.map(firstWithPreview).find(Boolean));

/* ---------- full-screen menu overlay ---------- */

function buildPreview(item, wide) {
  const wrap = el('div', 'nav-preview');
  if (!item || !item.preview.length) return wrap;
  const [first] = item.preview;
  const isCar = first.imgs.length > 1;
  if (isCar) {
    wrap.classList.add('nav-preview-car');
    const [logo, car] = first.imgs;
    wrap.append(el('div', 'nav-preview-logo'), el('div', 'nav-preview-car-image'));
    wrap.children[0].append(logo.cloneNode());
    wrap.children[1].append(car.cloneNode());
    if (item.href) {
      const more = el('a', 'nav-preview-discover', labels.more);
      more.href = item.href;
      wrap.append(more);
    }
    if (first.ctas.length) {
      const ctas = el('p', 'nav-preview-ctas');
      first.ctas.forEach((a, i) => {
        if (i) ctas.append(el('span', 'nav-preview-sep', '|'));
        ctas.append(a.cloneNode(true));
      });
      wrap.append(ctas);
    }
    return wrap;
  }
  wrap.classList.add(item.preview.length > 1 ? 'nav-preview-banners' : 'nav-preview-photo');
  if (wide) wrap.classList.add('nav-preview-wide');
  item.preview.forEach((entry) => {
    const banner = el('div', 'nav-preview-banner');
    banner.append(entry.imgs[0].cloneNode());
    const cta = entry.ctas[0];
    if (cta) {
      const link = el('a', 'nav-preview-cta');
      link.href = cta.getAttribute('href');
      link.append(el('span', 'nav-preview-title', cta.textContent.trim()));
      link.append(el('span', 'nav-preview-more', `<span>${labels.more}</span><i>${ICONS.arrow}</i>`));
      banner.append(link);
    }
    wrap.append(banner);
  });
  return wrap;
}

/** Each category gets a pre-rendered pane (links + preview); the active one is shown. */
function setPreview(pane, item, wide) {
  pane.querySelector('.nav-overlay-preview').replaceChildren(buildPreview(item, wide));
}

function buildGroupList(items, pane, depth = 0) {
  const ul = el('ul', `nav-links nav-links-depth-${depth}`);
  items.forEach((item) => {
    const li = el('li');
    if (item.children.length) {
      const btn = el('button', 'nav-group', `<span>${item.label}</span><i>${ICONS.chevronDown}</i>`);
      btn.type = 'button';
      btn.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      btn.addEventListener('click', () => btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'));
      li.append(btn, buildGroupList(item.children, pane, depth + 1));
    } else {
      const a = el('a', 'nav-link', item.label);
      a.href = item.href || '#';
      if (item.preview.length) {
        a.dataset.preview = item.preview[0].imgs.length > 1 ? 'car' : 'image';
        a.addEventListener('mouseenter', () => setPreview(pane, item, false));
      }
      li.append(a);
    }
    ul.append(li);
  });
  return ul;
}

function buildPane(item, previewItem) {
  const hasLinks = item.children.length > 0;
  const pane = el('div', hasLinks ? 'nav-pane has-links' : 'nav-pane');
  pane.inert = true;
  if (hasLinks) {
    const col2 = el('div', 'nav-overlay-links nav-submenu');
    col2.append(buildGroupList(item.children, pane));
    col2.addEventListener('mouseleave', () => setPreview(pane, previewItem, false));
    pane.append(col2);
  }
  pane.append(el('div', 'nav-overlay-preview'));
  setPreview(pane, previewItem, !hasLinks);
  return pane;
}

function showPane(overlay, index) {
  overlay.querySelectorAll('.nav-categories > li').forEach((li, i) => li.classList.toggle('is-active', i === index));
  overlay.querySelectorAll('.nav-pane').forEach((pane, i) => {
    pane.classList.toggle('is-shown', i === index);
    pane.inert = i !== index;
  });
}

function renderPillar(overlay, pillar) {
  overlay.querySelector('.nav-overlay-title').textContent = pillar.label;
  const col1 = overlay.querySelector('.nav-overlay-list');
  const detail = overlay.querySelector('.nav-overlay-detail');
  const categories = pillar.children;
  const flat = categories.every((c) => !c.children.length);
  const ul = el('ul', flat ? 'nav-categories nav-categories-flat' : 'nav-categories');
  categories.forEach((cat, i) => {
    const li = el('li');
    if (flat) {
      if (cat.href === currentPath()) li.classList.add('is-current');
    } else if (containsLocal(cat)) li.classList.add('is-current');
    if (flat || !cat.children.length) {
      const a = el('a', 'nav-category', `<span>${cat.label}</span>`);
      a.href = cat.href || '#';
      li.append(a);
    } else {
      const btn = el('button', 'nav-category', `<span>${cat.label}</span><i>${ICONS.chevronRight}</i>`);
      btn.type = 'button';
      li.append(btn);
    }
    if (!flat) {
      li.addEventListener('mouseenter', () => showPane(overlay, i));
      li.addEventListener('click', () => showPane(overlay, i));
    }
    ul.append(li);
  });
  ul.classList.toggle('has-current', !!ul.querySelector('.is-current'));
  col1.replaceChildren(ul);
  if (flat) {
    const previewItem = pillar.preview.length ? pillar : firstWithPreview(pillar);
    detail.replaceChildren(buildPane({ children: [] }, previewItem));
    showPane(overlay, 0);
    return;
  }
  detail.replaceChildren(...categories.map((cat) => buildPane(
    cat,
    cat.preview.length ? cat : firstWithPreview(cat),
  )));
  let active = categories.findIndex(containsLocal);
  if (active < 0) active = categories.findIndex((c) => c.open);
  showPane(overlay, Math.max(active, 0));
}

function buildOverlay(brandLink) {
  const overlay = el('div', 'nav-overlay');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.hidden = true;
  const rail = el('div', 'nav-overlay-rail');
  if (brandLink) rail.append(brandLink.cloneNode(true));
  const close = el('button', 'nav-overlay-close', `<span>${ICONS.close}</span>`);
  close.type = 'button';
  close.setAttribute('aria-label', 'Chiudi');
  rail.append(close);
  const col1 = el('div', 'nav-overlay-col');
  col1.append(el('div', 'nav-overlay-title'), el('div', 'nav-overlay-list'));
  overlay.append(rail, col1, el('div', 'nav-overlay-detail'));
  return overlay;
}

/* ---------- mobile drawer (slide-in levels) ---------- */

/** Path of nodes from the root to the deepest node whose direct links include the current page. */
function pathToCurrent(node, trail = []) {
  const here = [...trail, node];
  const linksHere = node.children.some((c) => !c.children.length && c.href === currentPath());
  let best = linksHere ? here : null;
  node.children.forEach((c) => {
    if (!c.children.length) return;
    const found = pathToCurrent(c, here);
    if (found && (!best || found.length > best.length)) best = found;
  });
  return best;
}

function buildCard(item) {
  const a = el('a', 'nav-drawer-card');
  a.href = item.href || '#';
  a.append(item.thumb.cloneNode());
  a.append(el('span', 'nav-drawer-card-bottom', `<span>${item.label}</span><i>${ICONS.arrow}</i>`));
  return a;
}

function renderDrawerLevel(drawer, stack) {
  const node = stack[stack.length - 1];
  const isRoot = stack.length === 1;
  drawer.querySelector('.nav-drawer-back').hidden = isRoot;
  const panel = el('div', `nav-drawer-panel${isRoot ? ' is-root' : ''}`);
  if (!isRoot) panel.append(el('p', 'nav-drawer-title', node.label));
  const ul = el('ul', 'nav-drawer-list');
  node.children.forEach((child) => {
    const li = el('li');
    if (isRoot && containsLocal(child)) li.classList.add('is-current');
    if (child.children.length && child.accordion) {
      const btn = el('button', 'nav-drawer-item nav-drawer-acc', `<span>${child.label}</span><i>${ICONS.chevronDown}</i>`);
      btn.type = 'button';
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', () => btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'));
      const sub = el('ul', 'nav-drawer-cards');
      child.children.forEach((item) => {
        const subLi = el('li');
        if (item.thumb) subLi.append(buildCard(item));
        else subLi.append(Object.assign(el('a', 'nav-drawer-link', item.label), { href: item.href || '#' }));
        sub.append(subLi);
      });
      li.append(btn, sub);
    } else if (child.children.length) {
      const btn = el('button', 'nav-drawer-item', `<span>${child.label}</span><i>${ICONS.chevronRight}</i>`);
      btn.type = 'button';
      btn.addEventListener('click', () => {
        stack.push(child);
        renderDrawerLevel(drawer, stack);
      });
      li.append(btn);
    } else {
      li.append(Object.assign(el('a', 'nav-drawer-item nav-drawer-link', child.label), { href: child.href || '#' }));
    }
    ul.append(li);
  });
  panel.append(ul);
  drawer.querySelector('.nav-drawer-panels').replaceChildren(panel);
}

function buildDrawer(brandLink, root) {
  const drawer = el('div', 'nav-drawer');
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.hidden = true;
  const bar = el('div', 'nav-drawer-bar');
  const back = el('button', 'nav-drawer-back', ICONS.back);
  back.type = 'button';
  back.setAttribute('aria-label', 'Indietro');
  const close = el('button', 'nav-drawer-close', ICONS.close);
  close.type = 'button';
  close.setAttribute('aria-label', 'Chiudi');
  bar.append(back);
  if (brandLink) bar.append(brandLink.cloneNode(true));
  bar.append(close);
  drawer.append(bar, el('div', 'nav-drawer-panels'));
  const stack = [root];
  back.addEventListener('click', () => {
    if (stack.length > 1) stack.pop();
    renderDrawerLevel(drawer, stack);
  });
  drawer.open = () => {
    stack.splice(0, stack.length, ...(pathToCurrent(root) || [root]));
    renderDrawerLevel(drawer, stack);
    drawer.hidden = false;
    document.body.classList.add('nav-open');
    close.focus();
  };
  drawer.close = () => {
    drawer.hidden = true;
    document.body.classList.remove('nav-open');
  };
  close.addEventListener('click', () => drawer.close());
  return drawer;
}

/* ---------- decorate ---------- */

export default async function decorate(block) {
  const doc = await fetchNav();
  block.textContent = '';
  if (!doc) return;
  const [brandSec, menuSec, channelSec, channelMenuSec, shareSec] = [...doc.body.children];
  const plainLabels = brandSec ? [...brandSec.querySelectorAll(':scope > p:not(:has(a))')] : [];
  labels.more = plainLabels[0]?.textContent.trim() || '';
  labels.menu = plainLabels[1]?.textContent.trim() || '';

  const nav = el('nav', 'nav');
  nav.id = 'nav';
  nav.setAttribute('aria-label', 'Main');

  // row 0: super-header
  const superOuter = el('div', 'nav-super');
  const superBar = el('div', 'nav-super-inner');
  superOuter.append(superBar);
  const brandLink = brandSec?.querySelector('a');
  if (brandLink) superBar.append(Object.assign(brandLink.cloneNode(true), { className: 'nav-super-brand' }));
  const pillars = menuSec ? [...menuSec.querySelectorAll(':scope > ul > li')].map(parseItem) : [];
  const pillarList = el('ul', 'nav-pillars');
  const overlay = buildOverlay(brandLink);
  const openOverlay = (pillar, trigger) => {
    renderPillar(overlay, pillar);
    overlay.hidden = false;
    document.body.classList.add('nav-open');
    nav.querySelectorAll('[aria-expanded]').forEach((b) => b.closest('.nav-pillars, .nav-channel') && b.setAttribute('aria-expanded', 'false'));
    trigger?.setAttribute('aria-expanded', 'true');
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    overlay.querySelector('.nav-overlay-close').focus();
  };
  const closeOverlay = () => {
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    document.body.classList.remove('nav-open');
    nav.querySelectorAll('.nav-pillars [aria-expanded], .nav-hamburger').forEach((b) => b.setAttribute('aria-expanded', 'false'));
  };
  pillars.forEach((pillar) => {
    const li = el('li');
    const btn = el('button', 'nav-pillar', pillar.label);
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    if (containsLocal(pillar)) btn.classList.add('is-active');
    btn.addEventListener('click', () => openOverlay(pillar, btn));
    li.append(btn);
    pillarList.append(li);
  });
  superBar.append(pillarList);

  // mobile: MENU opens the slide-in drawer at the level of the current page
  const drawer = buildDrawer(brandLink, { label: '', href: null, children: pillars });
  const menuToggle = el('button', 'nav-menu-toggle', labels.menu);
  menuToggle.type = 'button';
  menuToggle.setAttribute('aria-haspopup', 'dialog');
  menuToggle.addEventListener('click', () => drawer.open());
  superBar.prepend(menuToggle);

  // row 1: channel bar
  const channelOuter = el('div', 'nav-channel');
  const channel = el('div', 'nav-channel-inner');
  channelOuter.append(channel);
  const hamburger = el('button', 'nav-hamburger', ICONS.hamburger);
  hamburger.type = 'button';
  hamburger.setAttribute('aria-label', 'Apri menu');
  hamburger.setAttribute('aria-expanded', 'false');
  const channelMenu = channelMenuSec ? {
    label: channelMenuSec.querySelector(':scope > p')?.textContent.trim() || '',
    href: null,
    open: false,
    preview: [...channelMenuSec.querySelectorAll(':scope > p')].filter((p) => p.querySelector('img')).map((p) => ({ imgs: [...p.querySelectorAll('img')], ctas: [] })),
    children: [...channelMenuSec.querySelectorAll(':scope > ul > li')].map(parseItem),
  } : null;
  if (channelMenu) hamburger.addEventListener('click', () => openOverlay(channelMenu, hamburger));
  channel.append(hamburger);
  const wordmark = channelSec?.querySelector(':scope > p a');
  if (wordmark) channel.append(Object.assign(wordmark.cloneNode(true), { className: 'nav-channel-brand' }));
  const channelLinks = channelSec?.querySelector(':scope > ul');
  if (channelLinks) {
    const links = channelLinks.cloneNode(true);
    links.className = 'nav-channel-links';
    channel.append(links);
  }

  // share
  if (shareSec) {
    const share = el('div', 'nav-share');
    const closeLabel = shareSec.querySelector(':scope > p:last-of-type')?.textContent.trim() || '';
    const shareLabel = shareSec.querySelector(':scope > p')?.textContent.trim() || '';
    const toggle = el('button', 'nav-share-toggle', `<span class="nav-share-label">${closeLabel}</span><i>${ICONS.share}${ICONS.close}</i>`);
    toggle.type = 'button';
    toggle.setAttribute('aria-label', shareLabel);
    toggle.setAttribute('aria-expanded', 'false');
    const list = shareSec.querySelector(':scope > ul').cloneNode(true);
    list.className = 'nav-share-list';
    list.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', async (e) => {
        const page = encodeURIComponent(window.location.href);
        const base = a.getAttribute('href');
        if (isLocalHref(base)) {
          e.preventDefault();
          await navigator.clipboard?.writeText(window.location.href).catch(() => {});
          return;
        }
        e.preventDefault();
        const param = /facebook/.test(base) ? 'u' : 'url';
        window.open(`${base}?${param}=${page}`, '_blank', 'noopener');
      });
    });
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      share.classList.toggle('is-open', open);
    });
    share.append(toggle, list);
    channel.append(share);
  }

  overlay.querySelector('.nav-overlay-close').addEventListener('click', closeOverlay);
  window.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    if (!overlay.hidden) closeOverlay();
    if (!drawer.hidden) drawer.close();
    const share = nav.querySelector('.nav-share.is-open');
    if (share) share.querySelector('.nav-share-toggle').click();
  });
  // leaving the desktop layout closes anything that is open
  isDesktop.addEventListener('change', () => {
    closeOverlay();
    drawer.close();
    const share = nav.querySelector('.nav-share.is-open');
    if (share) share.querySelector('.nav-share-toggle').click();
  });

  nav.append(superOuter, channelOuter);
  const wrapper = el('div', 'nav-wrapper');
  wrapper.append(nav, overlay, drawer);
  block.append(wrapper);
}
