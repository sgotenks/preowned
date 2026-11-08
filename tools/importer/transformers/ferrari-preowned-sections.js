/* eslint-disable */
/* global WebImporter */

/**
 * Section transformer for preowned.ferrari.com.
 * beforeTransform: inserts <hr> section breaks (while parser targets still exist) and
 * marks styled sections with a temporary data-excat-section-id.
 * afterTransform: adds Section Metadata blocks for styled sections and removes markers.
 */

const MARKER = 'data-excat-section-id';

function findSectionElement(root, section) {
  const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
  for (const sel of selectors) {
    if (!sel) continue;
    try {
      const el = root.querySelector(sel);
      if (el) return el;
    } catch (e) {
      // invalid selector in this DOM implementation, try next
    }
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const template = payload && payload.template;
  const sections = template && Array.isArray(template.sections) ? template.sections : [];
  // One unstyled section needs neither breaks nor metadata
  if (!sections.length || (sections.length === 1 && !sections[0].style)) return;
  const document = element.ownerDocument;

  if (hookName === 'beforeTransform') {
    // Reverse order so earlier insertions don't affect later lookups
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const el = findSectionElement(element, section);
      if (!el) continue;
      // Remember the section element for afterTransform
      el.setAttribute(`${MARKER}-el`, section.id);
      if (i > 0 || section.style) {
        const hr = document.createElement('hr');
        if (section.style) hr.setAttribute(MARKER, section.id);
        if (i === 0) hr.setAttribute(`${MARKER}-first`, 'true');
        el.parentNode.insertBefore(hr, el);
      }
    }
  }

  if (hookName === 'afterTransform') {
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const marker = element.querySelector(`hr[${MARKER}="${section.id}"]`);
      const sectionEl = element.querySelector(`[${MARKER}-el="${section.id}"]`);
      if (section.style && (sectionEl || marker)) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        // Place at the end of the section: right after the surviving section element,
        // otherwise right after the section break marker.
        const anchor = sectionEl || marker;
        anchor.after(metaBlock);
      }
      if (marker) {
        if (marker.hasAttribute(`${MARKER}-first`)) {
          marker.remove();
        } else {
          marker.removeAttribute(MARKER);
        }
      }
      if (sectionEl) sectionEl.removeAttribute(`${MARKER}-el`);
    }
    // Safety: drop any leftover first-section temporary breaks
    element.querySelectorAll(`hr[${MARKER}-first]`).forEach((hr) => hr.remove());
  }
}
