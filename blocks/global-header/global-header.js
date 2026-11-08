/**
 * Rows:
 * 1. brand - wordmark link (text and/or logo image) to the home page
 * 2. navigation - a list of links
 * 3. share label (optional, e.g. "Condividi") - enables the share button
 *
 * The menu button toggles the navigation on narrow viewports.
 */
async function share(button) {
  const data = { title: document.title, url: window.location.href };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) {
      // user dismissed the share sheet
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(data.url);
    button.dataset.copied = 'true';
    setTimeout(() => delete button.dataset.copied, 2000);
  } catch (e) {
    // clipboard unavailable
  }
}

export default function decorate(block) {
  const rows = [...block.children];
  const navRow = rows.find((r) => r.querySelector('ul, ol'));
  const brandRow = rows.find((r) => r !== navRow && r.querySelector('a, picture'));
  const shareRow = rows.find((r) => r !== navRow && r !== brandRow && r.textContent.trim());

  const brand = document.createElement('div');
  brand.className = 'global-header-brand';
  if (brandRow) {
    const link = brandRow.querySelector('a');
    link?.classList.remove('button');
    link?.closest('.button-container')?.classList.remove('button-container');
    brand.append(...brandRow.firstElementChild?.childNodes || brandRow.childNodes);
  }

  const nav = document.createElement('nav');
  nav.className = 'global-header-nav';
  nav.id = `global-header-nav-${Math.random().toString(36).slice(2, 8)}`;
  const list = navRow?.querySelector('ul, ol');
  if (list) {
    list.className = 'global-header-links';
    list.querySelectorAll('a').forEach((a) => {
      a.classList.remove('button');
      a.closest('.button-container')?.classList.remove('button-container');
    });
    nav.append(list);
  }
  nav.setAttribute('aria-label', 'Main');

  const menu = document.createElement('button');
  menu.type = 'button';
  menu.className = 'global-header-menu';
  menu.setAttribute('aria-controls', nav.id);
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Menu');
  menu.innerHTML = '<span></span>';
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    block.classList.toggle('is-open', open);
  });

  const tools = document.createElement('div');
  tools.className = 'global-header-tools';
  tools.append(nav);
  const shareLabel = shareRow?.textContent.trim();
  if (shareLabel) {
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.className = 'global-header-share';
    shareButton.setAttribute('aria-label', shareLabel);
    shareButton.title = shareLabel;
    shareButton.addEventListener('click', () => share(shareButton));
    tools.append(shareButton);
  }

  block.textContent = '';
  block.append(menu, brand, tools);

  block.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && block.classList.contains('is-open')) {
      menu.click();
      menu.focus();
    }
  });
}
