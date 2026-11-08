/* eslint-disable */
/* global WebImporter */

import heroSearchParser from './parsers/hero-search.js';
import cardsTeaserParser from './parsers/cards-teaser.js';
import cardsCarListingParser from './parsers/cards-car-listing.js';
import cardsPhotoOverlayParser from './parsers/cards-photo-overlay.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "hero-landing",
  "urls": [
    "https://preowned.ferrari.com/it-IT"
  ],
  "coverageGaps": [],
  "description": "Homepage: full-width hero with an embedded vehicle search form, followed by a dark overview band with teaser cards, a featured-vehicles grid and full-bleed photo promo tiles",
  "blocks": [
    {
      "name": "hero-search",
      "instances": [
        "[class*=\"SearchModelsBox__wrapper\"]"
      ]
    },
    {
      "name": "cards-teaser",
      "instances": [
        "[class*=\"BoxGrid__wrapper\"]"
      ]
    },
    {
      "name": "cards-car-listing",
      "instances": [
        "[class*=\"VehicleCarousel__wrapper\"]"
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
      "name": "Hero with car search",
      "selector": [
        ".page-menu-hook > div > div:has([class*=\"SearchModelsBox__wrapper\"])",
        "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(1)"
      ],
      "style": null,
      "blocks": [
        "hero-search"
      ],
      "defaultContent": []
    },
    {
      "id": "section-2",
      "name": "Panoramica (overview) with teasers",
      "selector": [
        ".page-menu-hook > div > div:has([class*=\"BoxGrid__wrapper\"])",
        "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(2)"
      ],
      "style": "dark",
      "blocks": [
        "cards-teaser"
      ],
      "defaultContent": [
        "[class*=\"TextBlock__container\"]"
      ]
    },
    {
      "id": "section-3",
      "name": "Veicoli in evidenza (featured vehicles)",
      "selector": [
        ".page-menu-hook > div > div > div > div:has([class*=\"VehicleCarousel__wrapper\"])",
        "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(3) > div > div:nth-of-type(1)"
      ],
      "style": "centered",
      "blocks": [
        "cards-car-listing"
      ],
      "defaultContent": [
        "[class*=\"TextBlock__text_centered\"]",
        "[class*=\"style__footer\"]"
      ]
    },
    {
      "id": "section-4",
      "name": "Dealer and accessories promo tiles",
      "selector": [
        ".page-menu-hook > div > div > div > div:has(> [class*=\"SplitBanner__wrapper\"])",
        "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(3) > div > div:nth-of-type(2)"
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
  'hero-search': heroSearchParser,
  'cards-teaser': cardsTeaserParser,
  'cards-car-listing': cardsCarListingParser,
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
