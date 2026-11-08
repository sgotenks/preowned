import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

function optimizeImages(root) {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });
}

const isImageCell = (cell) => cell.querySelector('picture')
  && !cell.querySelector('h1, h2, h3, h4, h5, h6, ul, ol, a');

const isPlainParagraph = (el) => el && el.tagName === 'P' && !el.querySelector('a, picture');

// spec rows whose value is the selling dealer (rendered full-row, highlighted)
const DEALER_LABEL = /concessionari|dealer|händler|concesionari|concessionnaire|revendedor/i;

/**
 * Turn "Label: Value" list items into a label/value pair.
 */
function decorateSpecs(list, isPrimary) {
  list.classList.add('cards-car-listing-specs');
  if (!isPrimary) list.classList.add('cards-car-listing-specs-extra');
  const items = [...list.children];
  items.forEach((li) => {
    const text = li.textContent;
    const idx = text.indexOf(':');
    if (idx < 0 || li.children.length) return;
    const label = document.createElement('span');
    label.className = 'cards-car-listing-spec-label';
    label.textContent = text.slice(0, idx).trim();
    const value = document.createElement('span');
    value.className = 'cards-car-listing-spec-value';
    value.textContent = text.slice(idx + 1).trim();
    li.replaceChildren(label, value);
  });
  if (!isPrimary) return;
  let dealer = items.find((li) => DEALER_LABEL.test(li.querySelector('.cards-car-listing-spec-label')?.textContent || ''));
  if (!dealer && items.length === 3) [, , dealer] = items;
  dealer?.classList.add('cards-car-listing-spec-dealer');
}

/**
 * "2021 · 17.002 km · Ferrari Approved" -> one span per item, approved as a pill.
 */
function decorateMeta(p) {
  p.classList.add('cards-car-listing-card-meta');
  const parts = p.textContent.split('·').map((s) => s.trim()).filter(Boolean);
  p.replaceChildren(...parts.map((part) => {
    const span = document.createElement('span');
    span.className = /approved/i.test(part)
      ? 'cards-car-listing-card-approved'
      : 'cards-car-listing-card-meta-item';
    span.textContent = part;
    return span;
  }));
}

/**
 * Price paragraph plus optional breakdown (e.g. "IVA esposta", financing link)
 * authored as the paragraphs between the price and the spec list.
 */
function decoratePrice(price) {
  price.classList.add('cards-car-listing-card-price');
  const row = document.createElement('div');
  row.className = 'cards-car-listing-card-price-row';
  price.before(row);
  row.append(price);
  const extras = [];
  let next = row.nextElementSibling;
  while (next && next.tagName === 'P') {
    extras.push(next);
    next = next.nextElementSibling;
  }
  if (!extras.length) return;
  const extra = document.createElement('div');
  extra.className = 'cards-car-listing-card-price-extra';
  extras.forEach((p) => {
    if (isPlainParagraph(p)) p.classList.add('cards-car-listing-card-price-note');
    p.classList.remove('button-container');
    p.querySelectorAll('a').forEach((a) => {
      a.classList.remove('button', 'primary', 'secondary');
      a.classList.add('cards-car-listing-card-price-link');
    });
    extra.append(p);
  });
  row.append(extra);
}

function decorateActions(body, isVehicle) {
  const links = [...body.querySelectorAll(':scope > p > a, :scope > a')];
  if (!links.length) return null;
  const actions = document.createElement('div');
  actions.className = 'cards-car-listing-card-actions';
  links.forEach((a, i) => {
    const holder = a.closest('p');
    a.classList.add('button');
    a.classList.add(isVehicle && links.length > 1 && i === 0 ? 'primary' : 'secondary');
    actions.append(a);
    if (holder && !holder.textContent.trim() && !holder.children.length) holder.remove();
  });
  body.append(actions);
  return links[links.length - 1];
}

function decorateBody(body) {
  body.className = 'cards-car-listing-card-body';
  const lists = [...body.querySelectorAll(':scope > ul')];
  const isVehicle = lists.length > 0;
  const heading = body.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    heading.classList.add('cards-car-listing-card-title');
    // paragraphs before the title carry year / mileage (and the approved label)
    let prev = heading.previousElementSibling;
    while (prev) {
      if (isPlainParagraph(prev)) decorateMeta(prev);
      prev = prev.previousElementSibling;
    }
    // only vehicle cards (those with a spec list) carry a price
    const next = heading.nextElementSibling;
    if (isVehicle && isPlainParagraph(next)) decoratePrice(next);
  }
  lists.forEach((list, i) => decorateSpecs(list, i === 0));
  return { isVehicle, detailsLink: decorateActions(body, isVehicle) };
}

function buildBadges(badgeCell) {
  const paragraphs = [...badgeCell.querySelectorAll('p')];
  const labels = (paragraphs.length > 1
    ? paragraphs.map((p) => p.textContent)
    : badgeCell.textContent.split(/[,|\n]/))
    .map((s) => s.trim())
    .filter(Boolean);
  const badges = document.createElement('div');
  badges.className = 'cards-car-listing-card-badges';
  labels.forEach((label, i) => {
    const badge = document.createElement('span');
    badge.className = `cards-car-listing-card-badge${i ? ' cards-car-listing-card-badge-secondary' : ''}`;
    badge.textContent = label;
    badges.append(badge);
  });
  return badges;
}

/**
 * Cells per card: image | badge (optional, e.g. "Nuovo") | body.
 * A card whose body carries no spec list is a promo tile (image + heading + text + CTA).
 */
function buildCard(row) {
  const li = document.createElement('li');
  moveInstrumentation(row, li);
  const cells = [...row.children];
  const imageCell = cells.find(isImageCell);
  const textCells = cells.filter((c) => c !== imageCell && (c.textContent.trim() || c.querySelector('picture')));
  const body = textCells.pop();
  const badgeCell = textCells.find((c) => c.textContent.trim());

  let card = { isVehicle: false, detailsLink: null };
  if (body) card = decorateBody(body);

  if (imageCell) {
    imageCell.className = 'cards-car-listing-card-image';
    const picture = imageCell.querySelector('picture');
    if (card.isVehicle && card.detailsLink && picture) {
      // the photo opens the vehicle details, like the source card
      const link = document.createElement('a');
      link.className = 'cards-car-listing-card-image-link';
      link.href = card.detailsLink.href;
      link.tabIndex = -1;
      link.setAttribute('aria-hidden', 'true');
      picture.before(link);
      link.append(picture);
    }
    if (badgeCell) imageCell.append(buildBadges(badgeCell));
    li.append(imageCell);
  }
  if (body) li.append(body);
  li.classList.add(card.isVehicle ? 'cards-car-listing-vehicle' : 'cards-car-listing-promo');
  return li;
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => ul.append(buildCard(row)));
  optimizeImages(ul);
  block.textContent = '';
  block.append(ul);
}
