/* eslint-disable */
/* global WebImporter */

import modelFilterParser from './parsers/model-filter.js';
import cardsModelParser from './parsers/cards-model.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "model-index",
  "urls": [
    "https://preowned.ferrari.com/it-IT/modelli-usato-ferrari"
  ],
  "coverageGaps": [],
  "description": "Index page with a category filter row above a grid of image tiles, one per model",
  "blocks": [
    {
      "name": "model-filter",
      "instances": [
        "[class*=\"SearchByModels__tabsbar\"]"
      ]
    },
    {
      "name": "cards-model",
      "instances": [
        "[class*=\"SearchByModels__content\"]"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Model index: heading, category filter and model tiles",
      "selector": [
        "[class*=\"SearchByModels__wrapper\"]",
        "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(1)"
      ],
      "style": "eyebrow-title",
      "blocks": [
        "model-filter",
        "cards-model"
      ],
      "defaultContent": [
        "[class*=\"SearchByModels__wrapper\"] .heading"
      ]
    }
  ]
};

const parsers = {
  'model-filter': modelFilterParser,
  'cards-model': cardsModelParser,
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
