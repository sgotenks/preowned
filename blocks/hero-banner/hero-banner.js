/**
 * Rows: background image | content (title - text or a logo image - and an intro paragraph).
 * Options: `text-left` aligns the content to the start instead of centering it.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const contentRow = rows.find((r) => r.querySelector('h1, h2, h3, h4, h5, h6, p')
    && r.textContent.trim());
  const mediaRow = rows.find((r) => r !== contentRow && r.querySelector('picture'));

  if (mediaRow) mediaRow.classList.add('hero-banner-media');
  if (contentRow) contentRow.classList.add('hero-banner-content');

  rows.forEach((r) => {
    if (r !== mediaRow && r !== contentRow && !r.textContent.trim() && !r.querySelector('picture')) r.remove();
  });
}
