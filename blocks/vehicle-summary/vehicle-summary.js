import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  ICONS, el, labels, ringed,
} from '../../scripts/vehicle.js';

/*
 * vehicle-summary: the ad's name, year / mileage / dealer line, price and calls to action
 * (source HeroCarAD__content). Authored as three rows: text (heading + list), price, cta links
 * (contact form, dealer phone, "#gallery" photos, "#vehicle-360" player).
 * Also builds the bars the source shows once the summary scrolls away: a sticky top bar on
 * desktop (back, name, price, contact) and a sticky contact + call bar at the bottom on mobile.
 */

function linkWithIcon(link, icon, className) {
  const a = el('a', className);
  a.href = link.getAttribute('href');
  a.innerHTML = `${icon}<span>${link.textContent.trim()}</span>`;
  return a;
}

function decorateListing(list) {
  if (!list) return null;
  list.className = 'vehicle-summary-listing';
  list.querySelectorAll(':scope > li').forEach((li) => {
    const a = li.querySelector('a');
    if (!a) return;
    li.classList.add('vehicle-summary-anchor');
    a.innerHTML = `${ICONS.pin}<span>${a.textContent.trim()}</span>`;
  });
  return list;
}

function enquireButton(link, className = 'vehicle-summary-enquire') {
  const a = el('a', className);
  a.href = link.href;
  a.textContent = link.textContent.trim();
  return a;
}

function buildStickyTop(name, listing, price, enquire, back) {
  const bar = el('div', 'vehicle-summary-sticky');
  bar.setAttribute('aria-hidden', 'true');
  if (back) {
    const a = el('a', 'vehicle-summary-sticky-back');
    a.href = back.href;
    a.tabIndex = -1;
    a.setAttribute('aria-label', back.textContent.trim() || labels().back);
    a.append(ringed(ICONS.chevronLeft));
    bar.append(a);
  }
  const left = el('div', 'vehicle-summary-sticky-left');
  left.append(el('p', 'vehicle-summary-sticky-name', name.textContent.trim()));
  if (listing) left.append(listing.cloneNode(true));
  const right = el('div', 'vehicle-summary-sticky-right');
  if (price) right.append(el('p', 'vehicle-summary-sticky-price', price.textContent.trim()));
  if (enquire) {
    const btn = enquireButton(enquire);
    btn.tabIndex = -1;
    right.append(btn);
  }
  bar.append(left, right);
  return bar;
}

function buildStickyBottom(enquire, phone) {
  const bar = el('div', 'vehicle-summary-sticky-enquire');
  bar.setAttribute('aria-hidden', 'true');
  if (enquire) {
    const btn = enquireButton(enquire);
    btn.tabIndex = -1;
    bar.append(btn);
  }
  if (phone) {
    const call = el('a', 'vehicle-summary-call', ICONS.phone);
    call.href = phone.href;
    call.tabIndex = -1;
    call.setAttribute('aria-label', `${labels().call} ${phone.textContent.trim()}`);
    bar.append(call);
  }
  return bar;
}

export default function decorate(block) {
  const [textRow, priceRow, ctaRow] = [...block.children];
  const textCell = textRow?.firstElementChild;
  const name = textCell?.querySelector('h1, h2, h3');
  if (!name) return;
  name.classList.add('vehicle-summary-name');
  const listing = decorateListing(textCell.querySelector('ul'));

  const priceText = priceRow?.textContent.trim();
  const links = [...(ctaRow?.querySelectorAll('a') || [])];
  const media = links.filter((a) => a.getAttribute('href')?.startsWith('#'));
  const phone = links.find((a) => a.href.startsWith('tel:'));
  const enquire = links.find((a) => !media.includes(a) && a !== phone);

  // left column: name + listing
  const left = el('div', 'vehicle-summary-left');
  left.append(name);
  if (listing) left.append(listing);
  moveInstrumentation(textRow, left);

  // right column: photo / 360 links, price, contact button
  const right = el('div', 'vehicle-summary-right');
  if (media.length) {
    const medias = el('div', 'vehicle-summary-medias');
    media.forEach((a) => {
      const is360 = a.getAttribute('href') === '#vehicle-360';
      medias.append(linkWithIcon(a, is360 ? ICONS.threesixty : ICONS.photo, 'vehicle-summary-media'));
    });
    right.append(medias);
  }
  let price;
  if (priceText) {
    price = el('p', 'vehicle-summary-price');
    price.append(el('strong', '', priceText));
    moveInstrumentation(priceRow, price);
    right.append(price);
  }
  if (enquire) {
    const buttons = el('div', 'vehicle-summary-buttons');
    buttons.append(enquireButton(enquire));
    moveInstrumentation(ctaRow, buttons);
    right.append(buttons);
  }
  block.replaceChildren(left, right);

  // sticky bars, shown once the summary has scrolled out of view
  const section = block.closest('.section');
  const back = section?.querySelector('.default-content-wrapper a');
  const top = buildStickyTop(name, listing, price, enquire, back);
  const bottom = buildStickyBottom(enquire, phone);
  block.append(top, bottom);

  const setShown = (shown) => {
    [top, bottom].forEach((bar) => {
      bar.classList.toggle('is-shown', shown);
      bar.setAttribute('aria-hidden', String(!shown));
      bar.querySelectorAll('a').forEach((a) => { a.tabIndex = shown ? 0 : -1; });
    });
  };
  const observer = new IntersectionObserver(([entry]) => {
    setShown(!entry.isIntersecting && entry.boundingClientRect.top < 0);
  });
  observer.observe(right);
}
