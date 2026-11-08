import { moveInstrumentation } from '../../scripts/scripts.js';
import {
  ICONS, el, labels, ringed,
} from '../../scripts/vehicle.js';

/*
 * vehicle-gallery: the ad's photos.
 * Desktop: two large photos + a column of three and a "+N" button (source GridImages, 4:3 layout),
 * over a blurred copy of the first photo that fills the section (source HeroCarAD__photo).
 * Mobile: a swipeable slider with an "n / total" counter and a thumbnail strip.
 * Any photo, "+N", or a "#gallery" link elsewhere opens the fullscreen lightbox
 * (grid or single view).
 */

const GRID_PHOTOS = 5;

function photoSrc(photo) {
  return photo.img.currentSrc || photo.img.src;
}

function picture(photo, loading = 'lazy') {
  const img = el('img');
  img.src = photoSrc(photo);
  img.alt = photo.img.alt || '';
  img.loading = loading;
  return img;
}

/* ---------- lightbox ---------- */

let lightbox;

function buildLightbox(photos) {
  const text = labels();
  const box = el('div', 'vehicle-gallery-lightbox');
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', text.gallery);
  box.hidden = true;

  const close = el('button', 'vehicle-gallery-close');
  close.type = 'button';
  close.append(ringed(ICONS.close), el('span', 'vehicle-gallery-close-label', text.close));

  const views = el('div', 'vehicle-gallery-views');
  const singleBtn = el('button', 'vehicle-gallery-view-single', ICONS.single);
  singleBtn.type = 'button';
  singleBtn.setAttribute('aria-label', text.singleView);
  const gridBtn = el('button', 'vehicle-gallery-view-grid', ICONS.grid);
  gridBtn.type = 'button';
  gridBtn.setAttribute('aria-label', text.gridView);
  views.append(singleBtn, gridBtn);

  // single view: one photo at a time, arrows, counter
  const single = el('div', 'vehicle-gallery-single');
  const stage = el('div', 'vehicle-gallery-stage');
  const prev = el('button', 'vehicle-gallery-prev', ICONS.chevronLeft);
  prev.type = 'button';
  prev.setAttribute('aria-label', text.previous);
  const next = el('button', 'vehicle-gallery-next', ICONS.chevronRight);
  next.type = 'button';
  next.setAttribute('aria-label', text.next);
  const counter = el('p', 'vehicle-gallery-lightbox-counter');
  single.append(stage, prev, next, counter);

  // grid view: thumbnails, viewed ones marked
  const grid = el('div', 'vehicle-gallery-thumbs');
  const list = el('div', 'vehicle-gallery-thumbs-list');
  photos.forEach((photo, i) => {
    const btn = el('button', 'vehicle-gallery-thumb');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${text.photo} ${i + 1}`);
    btn.append(picture(photo));
    btn.addEventListener('click', () => box.show(i, 'single'));
    list.append(btn);
  });
  grid.append(list);
  box.append(close, views, single, grid);

  let current = 0;
  const render = () => {
    const img = picture(photos[current], 'eager');
    stage.replaceChildren(img);
    counter.textContent = `${current + 1} / ${photos.length}`;
    list.children[current]?.classList.add('is-viewed');
  };
  const setView = (view) => {
    const isGrid = view === 'grid';
    box.dataset.view = view;
    grid.hidden = !isGrid;
    single.hidden = isGrid;
    gridBtn.classList.toggle('is-active', isGrid);
    singleBtn.classList.toggle('is-active', !isGrid);
  };
  const go = (step) => {
    current = (current + step + photos.length) % photos.length;
    render();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') box.hide();
    if (box.dataset.view === 'single' && e.key === 'ArrowRight') go(1);
    if (box.dataset.view === 'single' && e.key === 'ArrowLeft') go(-1);
  };

  box.show = (index = 0, view = 'grid') => {
    current = Math.max(0, Math.min(index, photos.length - 1));
    render();
    setView(view);
    box.hidden = false;
    document.body.classList.add('vehicle-gallery-open');
    document.addEventListener('keydown', onKey);
    close.focus();
  };
  box.hide = () => {
    box.hidden = true;
    document.body.classList.remove('vehicle-gallery-open');
    document.removeEventListener('keydown', onKey);
  };
  close.addEventListener('click', () => box.hide());
  singleBtn.addEventListener('click', () => setView('single'));
  gridBtn.addEventListener('click', () => setView('grid'));
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));

  // swipe in single view
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX = null;
  });

  document.body.append(box);
  return box;
}

function openLightbox(photos, index, view) {
  if (!lightbox) lightbox = buildLightbox(photos);
  lightbox.show(index, view);
}

/* ---------- desktop grid ---------- */

function buildGrid(photos, open) {
  const grid = el('div', 'vehicle-gallery-grid');
  const tile = (photo, i, loading) => {
    const btn = el('button', 'vehicle-gallery-tile');
    btn.type = 'button';
    btn.setAttribute('aria-label', `${labels().photo} ${i + 1}`);
    btn.append(picture(photo, loading));
    btn.addEventListener('click', () => open(i, 'single'));
    return btn;
  };
  photos.slice(0, 2).forEach((p, i) => grid.append(tile(p, i, 'eager')));
  const side = el('div', 'vehicle-gallery-side');
  photos.slice(2, GRID_PHOTOS).forEach((p, i) => side.append(tile(p, i + 2)));
  if (photos.length > GRID_PHOTOS) {
    const more = el('button', 'vehicle-gallery-more', `+ ${photos.length - GRID_PHOTOS}`);
    more.type = 'button';
    more.setAttribute('aria-label', labels().gallery);
    more.addEventListener('click', () => open(0, 'grid'));
    side.append(more);
  } else side.classList.add('no-more');
  grid.append(side);
  return grid;
}

/* ---------- mobile slider ---------- */

function buildSlider(photos, open) {
  const slider = el('div', 'vehicle-gallery-slider');
  const track = el('div', 'vehicle-gallery-track');
  const counter = el('p', 'vehicle-gallery-counter', `1 / ${photos.length}`);
  photos.forEach((photo, i) => {
    const slide = el('button', 'vehicle-gallery-slide');
    slide.type = 'button';
    slide.setAttribute('aria-label', `${labels().photo} ${i + 1}`);
    slide.append(picture(photo, i === 0 ? 'eager' : 'lazy'));
    slide.addEventListener('click', () => open(i, 'single'));
    track.append(slide);
  });
  const strip = el('div', 'vehicle-gallery-strip');
  photos.forEach((photo, i) => {
    const thumb = el('button', 'vehicle-gallery-strip-thumb');
    thumb.type = 'button';
    thumb.setAttribute('aria-label', `${labels().photo} ${i + 1}`);
    thumb.append(picture(photo));
    thumb.addEventListener('click', () => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' }));
    strip.append(thumb);
  });
  track.addEventListener('scroll', () => {
    const i = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1));
    counter.textContent = `${i + 1} / ${photos.length}`;
    [...strip.children].forEach((t, n) => t.classList.toggle('is-active', n === i));
  }, { passive: true });
  strip.firstElementChild?.classList.add('is-active');
  slider.append(track, counter);
  return [slider, strip];
}

export default function decorate(block) {
  const photos = [...block.children].map((row) => {
    const img = row.querySelector('img');
    return img ? { img, row } : null;
  }).filter(Boolean);
  if (!photos.length) return;

  const open = (index, view) => openLightbox(photos, index, view);
  const grid = buildGrid(photos, open);
  const [slider, strip] = buildSlider(photos, open);

  // blurred first photo behind the whole hero section (desktop)
  const section = block.closest('.section');
  if (section && !section.querySelector(':scope > .vehicle-gallery-backdrop')) {
    const backdrop = el('div', 'vehicle-gallery-backdrop');
    backdrop.append(picture(photos[0], 'eager'));
    section.prepend(backdrop);
  }

  const items = el('ul', 'vehicle-gallery-items');
  photos.forEach((photo) => {
    const li = el('li');
    moveInstrumentation(photo.row, li);
    items.append(li);
  });
  block.replaceChildren(grid, slider, strip, items);

  // "#gallery" links (e.g. the summary's "Foto") open the lightbox grid
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#gallery"]');
    if (!link) return;
    e.preventDefault();
    open(0, 'grid');
  });
}
