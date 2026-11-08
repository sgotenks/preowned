import { loadScript } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';
import { ICONS, el } from '../../scripts/vehicle.js';

/*
 * vehicle-360: the ad's interactive 360° view (source ADHotspotPlayer, THRON content experience).
 * Rows: poster image, THRON content id, button label. The player loads under the poster once the
 * block nears the viewport; a dimmed "Click and Drag" layer covers it until it is clicked.
 */

const THRON_SCRIPT = 'https://ferrari-cdn.thron.com/shared/ce/bootstrap/1/scripts/embeds-min.js';
const THRON_OPTIONS = {
  clientId: 'ferrari',
  sessId: '3zayf6',
  tokenId: '',
  cdnBaseUrl: 'https://cdn.ferrari.com/cms/dws/media',
  mouseWheelZoom: false,
  showHotspots: true,
  preloadFrames: true,
};

let count = 0;

async function startPlayer(media, contentId) {
  count += 1;
  const id = `vehicle-360-player-${count}`;
  const player = el('div', 'vehicle-360-player');
  player.id = id;
  media.append(player);
  try {
    await loadScript(THRON_SCRIPT);
    window.THRONContentExperience(id, {
      ...THRON_OPTIONS,
      xcontentId: contentId,
      language: (document.documentElement.lang || 'it').slice(0, 2).toUpperCase(),
    });
    media.classList.add('is-playing');
  } catch (e) {
    player.remove();
    throw e;
  }
}

export default function decorate(block) {
  const [imageRow, idRow, labelRow] = [...block.children];
  const picture = imageRow?.querySelector('picture');
  const contentId = idRow?.textContent.trim();
  const label = labelRow?.textContent.trim() || 'Click and Drag';

  const media = el('div', 'vehicle-360-media');
  if (picture) {
    const poster = el('div', 'vehicle-360-poster');
    poster.append(picture);
    moveInstrumentation(imageRow, poster);
    media.append(poster);
  }

  const layer = el('div', 'vehicle-360-layer');
  const button = el('button', 'vehicle-360-button', ICONS.drag);
  button.type = 'button';
  button.append(el('span', 'vehicle-360-label', label));
  layer.append(button);
  let started;
  const start = () => {
    if (started || !contentId) return;
    started = startPlayer(media, contentId).catch(() => { started = null; });
  };
  layer.addEventListener('click', () => {
    layer.remove();
    start();
  });
  media.append(layer);
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      observer.disconnect();
      start();
    }
  }, { rootMargin: '200px' });
  observer.observe(media);
  block.replaceChildren(media);

  const section = block.closest('.section');
  if (section && !document.getElementById('vehicle-360')) section.id = 'vehicle-360';
}
