/* eslint-disable */
/* global WebImporter */

import heroBannerParser from './parsers/hero-banner.js';
import cardsTeaserParser from './parsers/cards-teaser.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "form-page",
  "urls": [
    "https://preowned.ferrari.com/it-IT/value-your-car"
  ],
  "coverageGaps": [],
  "description": "Request page: left-aligned hero banner, a dark intro band with a call to action that opens a Ferrari Adaptive Form in a side drawer, and teaser cards on a dark-grey band",
  "blocks": [
    {
      "name": "hero-banner",
      "instances": [
        "[class*=\"HeroInfo__wrapper\"]"
      ]
    },
    {
      "name": "cards-teaser",
      "instances": [
        "[class*=\"BoxGrid__wrapper\"]"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Hero",
      "selector": [
        "[class*=\"HeroInfo__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "hero-banner"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "Intro with valuation request",
      "selector": [
        "[class*=\"TextBlock__container\"][class*=\"theme-ferrari-dark\"]"
      ],
      "style": "dark, spacious, lead",
      "blocks": [],
      "defaultContent": [
        "[class*=\"TextBlock__content\"]"
      ]
    },
    {
      "id": "section-3",
      "name": "Teasers",
      "selector": [
        "[class*=\"BoxGrid__wrapper\"]"
      ],
      "style": "dark-grey",
      "blocks": [
        "cards-teaser"
      ],
      "defaultContent": []
    }
  ]
};

const parsers = {
  'hero-banner': heroBannerParser,
  'cards-teaser': cardsTeaserParser,
};
const transformers = [cleanupTransformer, sectionsTransformer, linksTransformer];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((fn) => {
    try { fn(hookName, element, enhancedPayload); }
    catch (e) { console.error(`Transformer failed at ${hookName}:`, e); }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        pageBlocks.push({ name: blockDef.name, selector, element });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (!parser) return;
      try { parser(block.element, { document, url, params }); }
      catch (e) { console.error(`Failed to parse ${block.name} (${block.selector}):`, e); }
    });

    executeTransformers('afterTransform', main, payload);

    main.appendChild(document.createElement('hr'));
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // The Italian site is served from the root of the migrated site: /it-IT -> /index, /it-IT/x -> /x
    const rawPath = new URL(params.originalURL).pathname
      .replace(/^\/it-IT(?=\/|$)/i, '')
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
