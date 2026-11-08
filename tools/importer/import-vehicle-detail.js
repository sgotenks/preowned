/* eslint-disable */

// Next.js page data: the #__NEXT_DATA__ script, or window.__NEXT_DATA__ once the importer has stripped scripts
function nextData(document) {
  try {
    const s = document.getElementById('__NEXT_DATA__');
    if (s) return JSON.parse(s.textContent);
  } catch (e) { /* fall through */ }
  return (typeof window !== 'undefined' && window.__NEXT_DATA__) || {};
}
/* global WebImporter */

import vehicleGalleryParser from './parsers/vehicle-gallery.js';
import vehicleSummaryParser from './parsers/vehicle-summary.js';
import vehicleSpecsParser from './parsers/vehicle-specs.js';
import vehicle360Parser from './parsers/vehicle-360.js';
import vehicleDetailsParser from './parsers/vehicle-details.js';
import dealerCardParser from './parsers/dealer-card.js';
import cardsAccessoryParser from './parsers/cards-accessory.js';
import cardsCarListingParser from './parsers/cards-car-listing.js';
import heroBannerParser from './parsers/hero-banner.js';
import columnsParser from './parsers/columns.js';
import cleanupTransformer from './transformers/ferrari-preowned-cleanup.js';
import listingTransformer from './transformers/ferrari-preowned-listing.js';
import sectionsTransformer from './transformers/ferrari-preowned-sections.js';
import vehicleTransformer from './transformers/ferrari-preowned-vehicle.js';
import linksTransformer from './transformers/ferrari-preowned-links.js';

const PAGE_TEMPLATE = {
  "name": "vehicle-detail",
  "urls": [
    "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D",
    "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D",
    "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D"
  ],
  "coverageGaps": [],
  "description": "Vehicle ad: photo gallery and summary over a dark hero, key data, 360° viewer, equipment/spec tabs, consumption, dealer card, accessories carousel, related cars, model banner and Ferrari Approved band",
  "blocks": [
    {
      "name": "vehicle-gallery",
      "instances": [
        "section[class*=\"HeroCarAD__wrapper\"] [class*=\"GridImages__center-content\"]"
      ]
    },
    {
      "name": "vehicle-summary",
      "instances": [
        "section[class*=\"HeroCarAD__wrapper\"] > [class*=\"HeroCarAD__content\"]"
      ]
    },
    {
      "name": "vehicle-specs",
      "instances": [
        "[class*=\"ADOverview__wrapper\"] [class*=\"OverviewData__list\"]"
      ]
    },
    {
      "name": "vehicle-360",
      "instances": [
        "[class*=\"ADHotspotPlayer__wrapper\"]"
      ]
    },
    {
      "name": "vehicle-details",
      "instances": [
        "[class*=\"TabCarADDetails__wrapper\"]",
        "[class*=\"AccordionConsumption__wrapper\"] [class*=\"Accordion__accordion\"]"
      ]
    },
    {
      "name": "dealer-card",
      "instances": [
        "[class*=\"DealerFullInfo__container\"]"
      ]
    },
    {
      "name": "cards-accessory",
      "instances": [
        "[class*=\"AccessoriesCarousel__wrapper\"] [class*=\"SquareImgCarousel__wrapper\"]"
      ]
    },
    {
      "name": "cards-car-listing",
      "instances": [
        "[class*=\"ADRelated__wrapper\"] [class*=\"VehicleCarousel__wrapper\"]"
      ]
    },
    {
      "name": "hero-banner",
      "instances": [
        "[class*=\"ADRelatedBanner__wrapper\"] [class*=\"HeroLogoText__wrapper\"]"
      ]
    },
    {
      "name": "columns",
      "instances": [
        "[class*=\"ParagraphGrid__row\"]"
      ]
    }
  ],
  "sections": [
    {
      "id": "section-1",
      "name": "Vehicle hero (gallery + summary)",
      "selector": [
        "section[class*=\"HeroCarAD__wrapper\"]"
      ],
      "style": "vehicle-hero",
      "blocks": [
        "vehicle-gallery",
        "vehicle-summary"
      ],
      "defaultContent": [
        "[class*=\"HeroCarAD__navigation\"]"
      ]
    },
    {
      "id": "section-2",
      "name": "Overview (Panoramica)",
      "selector": [
        "[class*=\"ADOverview__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "vehicle-specs"
      ],
      "defaultContent": [
        "[class*=\"OverviewData__title\"]"
      ]
    },
    {
      "id": "section-3",
      "name": "360 viewer",
      "selector": [
        "[class*=\"ADHotspotPlayer__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "vehicle-360"
      ],
      "defaultContent": []
    },
    {
      "id": "section-4",
      "name": "Equipment and specification tabs",
      "selector": [
        "[class*=\"TabCarADDetails__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "vehicle-details"
      ],
      "defaultContent": []
    },
    {
      "id": "section-5",
      "name": "Consumption and emissions",
      "selector": [
        "[class*=\"AccordionConsumption__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "vehicle-details"
      ],
      "defaultContent": []
    },
    {
      "id": "section-6",
      "name": "Dealer",
      "selector": [
        "#ADDealer-anchor"
      ],
      "style": null,
      "blocks": [
        "dealer-card"
      ],
      "defaultContent": []
    },
    {
      "id": "section-7",
      "name": "Genuine accessories",
      "selector": [
        "[class*=\"AccessoriesCarousel__wrapper\"]"
      ],
      "style": "dark",
      "blocks": [
        "cards-accessory"
      ],
      "defaultContent": [
        "[class*=\"AccessoriesCarousel__title\"]"
      ]
    },
    {
      "id": "section-8",
      "name": "Other cars at the dealer",
      "selector": [
        "[class*=\"ADRelated__wrapper\"]"
      ],
      "style": "related",
      "blocks": [
        "cards-car-listing"
      ],
      "defaultContent": [
        "[class*=\"ADRelated__title\"]",
        "[class*=\"Carousel__pagination-link\"]"
      ]
    },
    {
      "id": "section-9",
      "name": "Model banner",
      "selector": [
        "[class*=\"ADRelatedBanner__wrapper\"]"
      ],
      "style": null,
      "blocks": [
        "hero-banner"
      ],
      "defaultContent": []
    },
    {
      "id": "section-10",
      "name": "Ferrari Approved band",
      "selector": [
        "[class*=\"ParagraphGrid__wrapper\"]"
      ],
      "style": "dark",
      "blocks": [
        "columns"
      ],
      "defaultContent": [
        "[class*=\"ParagraphGrid__title\"]",
        "[class*=\"ParagraphGrid__ctaWrapper\"]"
      ]
    }
  ]
};

const parsers = {
  'vehicle-gallery': vehicleGalleryParser,
  'vehicle-summary': vehicleSummaryParser,
  'vehicle-specs': vehicleSpecsParser,
  'vehicle-360': vehicle360Parser,
  'vehicle-details': vehicleDetailsParser,
  'dealer-card': dealerCardParser,
  'cards-accessory': cardsAccessoryParser,
  'cards-car-listing': cardsCarListingParser,
  'hero-banner': heroBannerParser,
  'columns': columnsParser,
};
const transformers = [cleanupTransformer, listingTransformer, sectionsTransformer, vehicleTransformer, linksTransformer];

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

    // Ads are named after the car's chassis number (the source ID is a long case-sensitive token):
    // /it-IT/a/<region>/usato-ferrari/<country>/<dealer>/<model>/<id> -> /a/.../<model>/<chassis>
    let chassis = '';
    try {
      const ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0];
      chassis = String(ad.chassis || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
    } catch (e) { /* no page data: fall back to the sanitized source path */ }

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
    let rawPath = new URL(params.originalURL).pathname
      .replace(/^\/it-IT(?=\/|$)/i, '')
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    if (chassis) rawPath = `${rawPath.split('/').slice(0, -1).join('/')}/${chassis}`;
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) },
    }];
  },
};
