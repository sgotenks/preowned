/* eslint-disable */
/* global WebImporter */

import heroBannerParser from './parsers/hero-banner.js';
import resultsToolbarParser from './parsers/results-toolbar.js';
import activeFiltersParser from './parsers/active-filters.js';
import cardsCarListingParser from './parsers/cards-car-listing.js';
import tabsParser from './parsers/tabs.js';
import linkDirectoryParser from './parsers/link-directory.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import listingTransformer from './transformers/ferrari-preowned-listing.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "results-listing",
  "urls": [
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma/rfcm",
    "https://preowned.ferrari.com/it-IT/favorites",
    "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/rfc",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/rfc",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gtb/rfcm",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rfc",
    "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/rfc",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/812-superfast/rfcm",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-stradale/rfcm",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/c-d-p-/rfcd",
    "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-modena/rfcd",
    "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/cauley-ferrari-of-detroit/rfcd"
  ],
  "coverageGaps": [],
  "description": "Vehicle search results (country, dealer and model listings) and the favorites page: optional hero banner, results toolbar, results heading, active filter chips, a grid of vehicle cards with promo tiles and a load-more bar, a contact call-to-action and a dark link directory of dealers, models and countries",
  "blocks": [
    {
      "name": "hero-banner",
      "instances": [
        "[class*=\"SearchResults__hero\"]:not([class*=\"isEmpty\"]) [class*=\"HeroLogoText__wrapper\"]"
      ]
    },
    {
      "name": "results-toolbar",
      "instances": [
        "[class*=\"SearchRefine__wrapper\"]:not([class*=\"SearchRefine__sticky\"])",
        "[class*=\"FavoritesHeader__wrapper\"]"
      ]
    },
    {
      "name": "active-filters",
      "instances": [
        "[class*=\"SearchResults__resultsWrapper\"]"
      ]
    },
    {
      "name": "cards-car-listing",
      "instances": [
        ".search-result-listing"
      ]
    },
    {
      "name": "tabs",
      "instances": [
        "[class*=\"Favorites__tabs\"]"
      ]
    },
    {
      "name": "link-directory",
      "instances": [
        "[class*=\"SearchHints__wrapper\"]"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Results",
      "selector": [
        "[class*=\"SearchResults__wrapper\"]",
        "[class*=\"Favorites__wrapper\"]"
      ],
      "style": "results",
      "blocks": [
        "hero-banner",
        "results-toolbar",
        "active-filters",
        "cards-car-listing",
        "tabs"
      ],
      "defaultContent": [
        "[class*=\"SearchResults__title\"]",
        "[class*=\"SearchResultListing__loadMore\"]"
      ]
    },
    {
      "id": "section-2",
      "name": "Contact call to action",
      "selector": [
        "[class*=\"SearchResultsFooter__wrapper\"]"
      ],
      "style": "cta",
      "blocks": [],
      "defaultContent": [
        "[class*=\"SearchResultsFooter__wrapper\"]"
      ]
    },
    {
      "id": "section-3",
      "name": "Link directory",
      "selector": [
        "[class*=\"SearchHints__wrapper\"]"
      ],
      "style": "dark-grey",
      "blocks": [
        "link-directory"
      ],
      "defaultContent": []
    }
  ]
};

const parsers = {
  'hero-banner': heroBannerParser,
  'results-toolbar': resultsToolbarParser,
  'active-filters': activeFiltersParser,
  'cards-car-listing': cardsCarListingParser,
  'tabs': tabsParser,
  'link-directory': linkDirectoryParser,
};
const transformers = [cleanupTransformer, listingTransformer, sectionsTransformer, linksTransformer];

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
