import { createOptimizedPicture } from './aem.js';
import { moveInstrumentation } from './scripts.js';

/*
 * Shared helpers for the vehicle ad blocks (vehicle-gallery, vehicle-summary, vehicle-360,
 * vehicle-details, dealer-card, cards-accessory): source icons and the labels of the controls
 * the blocks build (the copy itself is authored).
 */

export const ICONS = {
  photo: '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M.375 16.125c0 .414.336.75.75.75h15.75a.75.75 0 0 0 .75-.75V5.746a.75.75 0 0 0-.471-.696l-3.502-1.4-.67-2.012a.75.75 0 0 0-.712-.513H5.73a.75.75 0 0 0-.712.513l-.67 2.011-3.502 1.4a.75.75 0 0 0-.471.697v10.379zM12.64 4.17a.75.75 0 0 0 .433.46L16.5 6v9.75h-15V6l3.427-1.37a.75.75 0 0 0 .433-.46L6 2.25h6l.64 1.92zm-1.015 5.58a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0zm1.125 0a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z" fill="currentColor"/></svg>',
  threesixty: '<svg width="26" height="17" viewBox="0 0 26 17" fill="currentColor" aria-hidden="true"><path d="M25.333 6.664c0-1.71-1.294-3.283-3.645-4.43C19.398 1.115 16.313.5 13 .5 6.084.5.667 3.208.667 6.664c0 2.345 2.69 5.389 7.191 6.42l.296.07-.028-2.084-.189-.043c-3.701-.849-6.188-2.603-6.188-4.363 0-2.616 5.257-4.91 11.251-4.91s11.252 2.294 11.252 4.91c0 1.576-1.35 2.619-4.496 3.45l.762-2.63.657-2.403L16.677 11l-.047.069c-.208.33-.282.716-.21 1.09.074.373.287.694.607.908l6.358 3.434-2-2.432-1.348-1.758c3.277-1.066 5.296-3.206 5.296-5.646"/></svg>',
  chevronLeft: '<svg viewBox="0 0 8 16" width="8" height="16" fill="currentColor" aria-hidden="true"><path d="M.732 9.547L8 16 4 8l4-8L.732 6.453A1.996 1.996 0 0 0 0 8c0 .623.285 1.18.732 1.547z"/></svg>',
  chevronRight: '<svg viewBox="0 0 8 16" width="8" height="16" fill="currentColor" aria-hidden="true"><path d="M7.268 9.547L0 16l4-8-4-8 7.268 6.453C7.715 6.82 8 7.377 8 8c0 .623-.285 1.18-.732 1.547z"/></svg>',
  pin: '<svg viewBox="184 7 10 14" width="10" height="14" fill="currentColor" aria-hidden="true"><path d="M189 7.111A3.887 3.887 0 0 0 185.111 11c0 1.572.7 3.1 1.568 4.372.843 1.245 1.81 2.2 2.321 2.667a15.583 15.583 0 0 0 2.32-2.667c.868-1.272 1.569-2.8 1.569-4.372A3.887 3.887 0 0 0 189 7.111zM184 11a5 5 0 0 1 10 0c0 1.889-.834 3.633-1.76 5a17.046 17.046 0 0 1-2.529 2.894 1.057 1.057 0 0 1-1.422 0A17.046 17.046 0 0 1 185.76 16c-.926-1.367-1.76-3.111-1.76-5zm5-1.111c-.613 0-1.111.5-1.111 1.111s.498 1.111 1.111 1.111 1.111-.5 1.111-1.111-.498-1.111-1.111-1.111zM186.778 11a2.222 2.222 0 1 1 4.444 0 2.222 2.222 0 0 1-4.444 0z"/></svg>',
  phone: '<svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M16 12.667V16C7.163 16 0 8.837 0 0h4a2.667 2.667 0 0 1 2.667 2.667v2.666H3c1.425 3.435 4.242 6.208 7.682 7.622a2.697 2.697 0 0 1-.015-.288V10h2.666A2.667 2.667 0 0 1 16 12.667z"/></svg>',
  close: '<svg viewBox="0 0 12 12" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4.674 6L.344 1.05A.5.5 0 0 1 1.05.343L6 4.674l4.95-4.33a.5.5 0 0 1 .707.706L7.326 6l4.33 4.95a.5.5 0 0 1-.706.707L6 7.326l-4.95 4.33a.5.5 0 0 1-.707-.706L4.674 6z"/></svg>',
  drag: '<svg viewBox="0 0 52 31" width="40" height="24" fill="currentColor" aria-hidden="true"><path d="M51.6 12c0-3.3-2.7-6.3-7.5-8.4C39.4 1.5 33 .3 26.1.3 11.8.2.6 5.4.6 12c0 4.5 5.6 10.3 14.9 12.2l.6.1-.1-4-.4-.1C8 18.7 2.9 15.4 2.9 12c0-5 10.9-9.4 23.3-9.4C38.5 2.6 49.4 7 49.4 12c0 3-2.8 5-9.3 6.6l1.6-5L43 9l-9.3 11.3-.1.1c-.4.6-.6 1.4-.4 2.1.2.7.6 1.3 1.3 1.7l13.1 6.5-4.1-4.6-2.8-3.4c6.8-2 10.9-6 10.9-10.7z"/></svg>',
  ring: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11"/></svg>',
  // lightbox view switches
  single: '<svg viewBox="0 0 18 14" width="18" height="14" fill="none" stroke="currentColor" aria-hidden="true"><rect x=".5" y=".5" width="17" height="13"/></svg>',
  grid: '<svg viewBox="0 0 18 14" width="18" height="14" fill="currentColor" aria-hidden="true"><rect width="4" height="3"/><rect x="7" width="4" height="3"/><rect x="14" width="4" height="3"/><rect y="5.5" width="4" height="3"/><rect x="7" y="5.5" width="4" height="3"/><rect x="14" y="5.5" width="4" height="3"/><rect y="11" width="4" height="3"/><rect x="7" y="11" width="4" height="3"/><rect x="14" y="11" width="4" height="3"/></svg>',
};

const LABELS = {
  it: {
    close: 'chiudi',
    gallery: 'Galleria',
    singleView: 'Visualizzazione singola',
    gridView: 'Visualizzazione a griglia',
    previous: 'Precedente',
    next: 'Successiva',
    photo: 'Foto',
    back: 'Indietro',
    call: 'Chiamaci',
    expand: 'Espandi',
    collapse: 'Comprimi',
  },
  en: {
    close: 'close',
    gallery: 'Gallery',
    singleView: 'Single view',
    gridView: 'Grid view',
    previous: 'Previous',
    next: 'Next',
    photo: 'Photo',
    back: 'Back',
    call: 'Call us',
    expand: 'Expand',
    collapse: 'Collapse',
  },
};

export function labels() {
  const lang = (document.documentElement.lang || 'it').slice(0, 2);
  return LABELS[lang] || LABELS.en;
}

/**
 * Swaps same-origin pictures for optimized renditions (external CDN images are kept as authored).
 * @param {Element} root container
 * @param {string} width rendition width
 */
export function optimizeImages(root, width = '750') {
  root.querySelectorAll('picture > img').forEach((img) => {
    const url = new URL(img.src, window.location.href);
    if (url.origin !== window.location.origin || /\.svg$/i.test(url.pathname)) return;
    const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width }]);
    moveInstrumentation(img, optimized.querySelector('img'));
    img.closest('picture').replaceWith(optimized);
  });
}

/** Creates an element with an optional class name and inner HTML. */
export function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

/** A ringed icon (source Icon__icon: 1px ring + glyph). */
export function ringed(glyph, className = '') {
  return el('span', `vehicle-ringed ${className}`.trim(), `${ICONS.ring}${glyph}`);
}

/**
 * Controls row under a horizontally scrolling track (source Carousel with outside arrows):
 * prev arrow, then dynamic bullets or a centre element (e.g. a "Visualizza tutto" link), then next.
 * Arrows move one slide; the bullets follow the first visible slide.
 * @param {Element} track scroll container whose children are the slides
 * @param {{ bullets?: boolean, center?: Element }} options
 * @returns {Element} the controls row
 */
export function carouselControls(track, { bullets = false, center } = {}) {
  const text = labels();
  const nav = el('div', 'vehicle-carousel-nav');
  const prev = el('button', 'vehicle-carousel-prev', ICONS.chevronLeft);
  prev.type = 'button';
  prev.setAttribute('aria-label', text.previous);
  const next = el('button', 'vehicle-carousel-next', ICONS.chevronRight);
  next.type = 'button';
  next.setAttribute('aria-label', text.next);
  const slides = [...track.children];

  const step = () => {
    const [first, second] = slides;
    if (!first) return track.clientWidth;
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
  };
  const index = () => Math.round(track.scrollLeft / Math.max(step(), 1));
  const go = (i) => track.scrollTo({ left: Math.max(0, i) * step(), behavior: 'smooth' });
  prev.addEventListener('click', () => go(index() - 1));
  next.addEventListener('click', () => go(index() + 1));

  const middle = el('div', 'vehicle-carousel-middle');
  let dots = [];
  if (bullets && slides.length > 1) {
    const list = el('div', 'vehicle-carousel-bullets');
    dots = slides.map((slide, i) => {
      const dot = el('button', 'vehicle-carousel-bullet');
      dot.type = 'button';
      dot.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
      dot.addEventListener('click', () => go(i));
      list.append(dot);
      return dot;
    });
    middle.append(list);
  }
  if (center) middle.append(center);

  const update = () => {
    const i = index();
    const max = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max - 1;
    // dynamic bullets: the active one is a ring, the next ones fade out
    dots.forEach((dot, n) => {
      const distance = Math.abs(n - i);
      dot.classList.toggle('is-active', distance === 0);
      dot.dataset.distance = Math.min(distance, 6);
    });
  };
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  requestAnimationFrame(update);

  nav.append(prev, middle, next);
  return nav;
}
