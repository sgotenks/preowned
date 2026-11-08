/* eslint-disable */
/* global WebImporter */

import heroBannerParser from './parsers/hero-banner.js';
import editorialParser from './parsers/editorial.js';
import cardsPhotoOverlayParser from './parsers/cards-photo-overlay.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "content-page",
  "urls": [
    "https://preowned.ferrari.com/it-IT/ferrari-approved"
  ],
  "coverageGaps": [],
  "description": "Editorial page opening with a left-aligned hero banner, then numbered chapter sections of image + text with expandable copy, and a closing list",
  "blocks": [
    {
      "name": "hero-banner",
      "instances": [
        "[class*=\"HeroInfo__wrapper\"]"
      ]
    },
    {
      "name": "editorial",
      "instances": [
        "[class*=\"Editorial__wrapper\"]"
      ]
    },
    {
      "name": "cards-photo-overlay",
      "instances": [
        "[class*=\"SplitBanner__wrapper\"]"
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
      "name": "Welcome to uniqueness",
      "selector": [
        "[class*=\"TextBlock__container\"][class*=\"theme-ferrari-812-gts\"]:not([class*=\"text_centered\"])"
      ],
      "style": "light-grey",
      "blocks": [],
      "defaultContent": [
        "[class*=\"TextBlock__content\"]"
      ]
    },
    {
      "id": "section-3",
      "name": "1 Dettagli",
      "selector": [
        ".page-menu-hook > div > div:nth-child(2)"
      ],
      "style": "dark, text-large, spacious",
      "blocks": [],
      "defaultContent": [
        "[class*=\"TextBlock__chapterTitle\"]",
        "[class*=\"TextBlock__content\"]"
      ]
    },
    {
      "id": "section-4",
      "name": "2 Ispezione tecnica",
      "selector": [
        ".page-menu-hook > div > div:nth-child(3)"
      ],
      "style": "dark-grey",
      "blocks": [
        "editorial"
      ],
      "defaultContent": [
        "[class*=\"Editorial__chapterTitle\"]"
      ]
    },
    {
      "id": "section-5",
      "name": "3 Provenienza e preparazione",
      "selector": [
        ".page-menu-hook > div > div:nth-child(4)"
      ],
      "style": "dark",
      "blocks": [
        "editorial"
      ],
      "defaultContent": [
        "[class*=\"Editorial__chapterTitle\"]"
      ]
    },
    {
      "id": "section-6",
      "name": "4 Garanzia e assistenza",
      "selector": [
        ".page-menu-hook > div > div:nth-child(5)"
      ],
      "style": "dark-grey",
      "blocks": [
        "editorial"
      ],
      "defaultContent": [
        "[class*=\"Editorial__chapterTitle\"]"
      ]
    },
    {
      "id": "section-7",
      "name": "5 Servizi finanziari",
      "selector": [
        ".page-menu-hook > div > div:nth-child(6) > div > div:first-child"
      ],
      "style": "dark",
      "blocks": [
        "editorial"
      ],
      "defaultContent": [
        "[class*=\"Editorial__chapterTitle\"]"
      ]
    },
    {
      "id": "section-8",
      "name": "Disclaimer",
      "selector": [
        "[class*=\"TextBlock__text_centered\"]"
      ],
      "style": "light-grey, centered, spacious",
      "blocks": [],
      "defaultContent": [
        "[class*=\"TextBlock__content\"]"
      ]
    },
    {
      "id": "section-9",
      "name": "Programma Ferrari Approved",
      "selector": [
        "[class*=\"SplitBanner__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "cards-photo-overlay"
      ],
      "defaultContent": []
    }
  ]
};

const parsers = {
  'hero-banner': heroBannerParser,
  'editorial': editorialParser,
  'cards-photo-overlay': cardsPhotoOverlayParser,
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
