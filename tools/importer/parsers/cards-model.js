/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-model. Base: cards.
 * Source: https://preowned.ferrari.com/it-IT/modelli-usato-ferrari
 * Selector: [class*="SearchByModels__content"]
 * Model (xwalk): container cards-model; item cards-model-card -> image (+imageAlt), text.
 * One row per model tile: image | text (h3 name, "N Disponibili", link to the model's results
 * when there is stock, then a list of the filter categories the tile belongs to).
 *
 * The source loads its tiles from an inventory API and paginates them (18 per page) with no
 * category data in the DOM, so the page only holds the first page. SNAPSHOT is every tile of
 * every page and tab, crawled from the live Italian page (regenerate with gen-data.js); the
 * parser falls back to the tiles in the DOM when the snapshot is empty.
 */

// BEGIN model-index-snapshot
const SNAPSHOT_DATE = '2026-11-08';
const SNAPSHOT = [
  {
    "name": "296 GTB",
    "count": "27 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gtb/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/4fea8f96-59d9-4662-9a37-c7c26f534777/3zayf6/std/384x288/4fea8f96-59d9-4662-9a37-c7c26f534777?scalemode=auto",
    "categories": [
      "V6",
      "Ibrido"
    ]
  },
  {
    "name": "Ferrari Roma",
    "count": "23 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/554ed5f4-87b0-43e8-a63f-f280edfd8b7f/3zayf6/std/384x288/554ed5f4-87b0-43e8-a63f-f280edfd8b7f?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "296 GTS",
    "count": "18 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gts/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/b1198bf4-7bb8-49e8-9505-51da107a34de/3zayf6/std/384x288/b1198bf4-7bb8-49e8-9505-51da107a34de?scalemode=auto",
    "categories": [
      "V6"
    ]
  },
  {
    "name": "Ferrari Roma Spider",
    "count": "13 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/f7469d08-8e42-4464-bb0b-2f347994ff5b/3zayf6/std/384x288/f7469d08-8e42-4464-bb0b-2f347994ff5b?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "SF90 Stradale",
    "count": "12 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-stradale/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/b7b09b9a-04ff-4b6e-b81d-f630c950d3e2/3zayf6/std/384x288/b7b09b9a-04ff-4b6e-b81d-f630c950d3e2?scalemode=auto",
    "categories": [
      "V8",
      "Ibrido"
    ]
  },
  {
    "name": "Ferrari Purosangue",
    "count": "10 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-purosangue/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/5737731b-d7b7-4297-8704-745d25101869/3zayf6/std/384x288/5737731b-d7b7-4297-8704-745d25101869?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "Ferrari Portofino",
    "count": "9 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-portofino/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/06609605-f130-46fd-bb2b-812db7ed5667/3zayf6/std/384x288/06609605-f130-46fd-bb2b-812db7ed5667?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "SF90 Spider",
    "count": "8 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/1050c70c-c7b2-476c-b0d1-04fe60cad471/3zayf6/std/384x288/1050c70c-c7b2-476c-b0d1-04fe60cad471?scalemode=auto",
    "categories": [
      "V8",
      "Ibrido"
    ]
  },
  {
    "name": "812 GTS",
    "count": "6 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/812-gts/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/f21097a0-ab5c-42cc-8f3f-9932f95d6602/3zayf6/std/384x288/f21097a0-ab5c-42cc-8f3f-9932f95d6602?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "Ferrari Portofino M",
    "count": "6 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-portofino-m/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/025bb672-5b20-48ad-b7ee-83b2e3de4cab/3zayf6/std/384x288/025bb672-5b20-48ad-b7ee-83b2e3de4cab?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "Ferrari 12Cilindri",
    "count": "6 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-12cilindri/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/ca2416c9-bda8-4a0f-a495-7001b6c94385/3zayf6/std/384x288/ca2416c9-bda8-4a0f-a495-7001b6c94385?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "F8 Tributo",
    "count": "4 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f8-tributo/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/c067f37f-9c1e-451a-9548-d75b615219eb/3zayf6/std/384x288/c067f37f-9c1e-451a-9548-d75b615219eb?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "GTC4Lusso",
    "count": "4 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/gtc4lusso/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/6228a312-d63a-4ac3-965f-4a17a0e0a9ca/3zayf6/std/384x288/6228a312-d63a-4ac3-965f-4a17a0e0a9ca?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "Ferrari California",
    "count": "4 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-california/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/1d5b9884-3989-4370-8a47-2f70224598f3/3zayf6/std/384x288/1d5b9884-3989-4370-8a47-2f70224598f3?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "812 Superfast",
    "count": "3 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/812-superfast/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/e91a8132-a8ef-4f89-b119-55bbbf809a51/3zayf6/std/384x288/e91a8132-a8ef-4f89-b119-55bbbf809a51?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "Ferrari California T",
    "count": "3 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-california-t/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/1f44666c-8fa8-4ee1-a0c7-a32923d2758e/3zayf6/std/384x288/1f44666c-8fa8-4ee1-a0c7-a32923d2758e?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "F8 Spider",
    "count": "2 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f8-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/81a1c53d-5cfa-4a6e-bcb5-46fbbf572597/3zayf6/std/384x288/81a1c53d-5cfa-4a6e-bcb5-46fbbf572597?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "GTC4Lusso T",
    "count": "2 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/gtc4lusso-t/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/a14d6095-4bde-4c56-b6ad-0a85b42ac1a3/3zayf6/std/384x288/a14d6095-4bde-4c56-b6ad-0a85b42ac1a3?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "488 GTB",
    "count": "2 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/488-gtb/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/16a78a7e-bd22-4d96-a8ae-0d4d4b08d2af/3zayf6/std/384x288/16a78a7e-bd22-4d96-a8ae-0d4d4b08d2af?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "F430 Spider",
    "count": "2 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f430-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/acac0a1e-4e20-4f92-9c67-20e3a49fcf80/3zayf6/std/384x288/acac0a1e-4e20-4f92-9c67-20e3a49fcf80?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "612 Scaglietti",
    "count": "2 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/612-scaglietti/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/d89dab47-5c6e-498c-9f2f-61074f436aec/3zayf6/std/384x288/d89dab47-5c6e-498c-9f2f-61074f436aec?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "488 Spider",
    "count": "1 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/488-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/db1bd4ee-9914-4f23-9b97-d0175766f200/3zayf6/std/384x288/db1bd4ee-9914-4f23-9b97-d0175766f200?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "F12berlinetta",
    "count": "1 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f12berlinetta/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/c630f6ca-fac9-43fb-b37e-702bf367ea01/3zayf6/std/384x288/c630f6ca-fac9-43fb-b37e-702bf367ea01?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "FF",
    "count": "1 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ff/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/f0a2ecf6-94d9-452b-ab49-a2cde86143da/3zayf6/std/384x288/f0a2ecf6-94d9-452b-ab49-a2cde86143da?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "360 Modena",
    "count": "1 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/360-modena/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/65f4113d-8ace-4689-88f1-649b035ca07e/3zayf6/std/384x288/65f4113d-8ace-4689-88f1-649b035ca07e?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "Ferrari 12Cilindri Spider",
    "count": "1 Disponibili",
    "href": "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-12cilindri-spider/rfcm",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/bf0bc037-1b6f-41d6-96da-c1ba375d1b84/3zayf6/std/384x288/bf0bc037-1b6f-41d6-96da-c1ba375d1b84?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "SF90 XX Spider",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/b745947b-07d5-43da-8262-3387d69a9517/3zayf6/std/384x288/b745947b-07d5-43da-8262-3387d69a9517?scalemode=auto",
    "categories": [
      "V8",
      "Serie Speciali"
    ]
  },
  {
    "name": "SF90 XX Stradale",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/394df686-7f86-4ed5-a73a-c71484ce2053/3zayf6/std/384x288/394df686-7f86-4ed5-a73a-c71484ce2053?scalemode=auto",
    "categories": [
      "V8",
      "Serie Speciali"
    ]
  },
  {
    "name": "Ferrari Daytona SP3",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/bc2dcdf6-9001-446c-b5c9-b937fc95f33c/3zayf6/std/384x288/bc2dcdf6-9001-446c-b5c9-b937fc95f33c?scalemode=auto",
    "categories": [
      "V12",
      "Serie Speciali"
    ]
  },
  {
    "name": "812 Competizione A",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/e721022c-2c30-4ad5-8739-7ba269cd3846/3zayf6/std/384x288/e721022c-2c30-4ad5-8739-7ba269cd3846?scalemode=auto",
    "categories": [
      "V12",
      "Serie Speciali"
    ]
  },
  {
    "name": "812 Competizione",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/d6db0818-5996-40da-858a-7e719a33fccb/3zayf6/std/384x288/d6db0818-5996-40da-858a-7e719a33fccb?scalemode=auto",
    "categories": [
      "V12",
      "Serie Speciali"
    ]
  },
  {
    "name": "Monza SP1 / SP2",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/2238352d-9e37-4786-a234-9fa25b82858b/3zayf6/std/384x288/2238352d-9e37-4786-a234-9fa25b82858b?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "488 Pista Spider",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/f97e4937-a791-4d14-8ca3-33ea13bc044d/3zayf6/std/384x288/f97e4937-a791-4d14-8ca3-33ea13bc044d?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "488 Pista",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/778ac171-ac0b-4f87-917a-b42ac43e915d/3zayf6/std/384x288/778ac171-ac0b-4f87-917a-b42ac43e915d?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "LaFerrari Aperta",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/ece7c16a-98f1-4228-b7a5-86de7f3c3eed/3zayf6/std/384x288/ece7c16a-98f1-4228-b7a5-86de7f3c3eed?scalemode=auto",
    "categories": [
      "V12",
      "Ibrido"
    ]
  },
  {
    "name": "F12tdf",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/9c69ca98-6d88-4476-8774-1adce09d607f/3zayf6/std/384x288/9c69ca98-6d88-4476-8774-1adce09d607f?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "458 Speciale A",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/c9265e52-cc73-4a8f-a3c9-001917d58aa7/3zayf6/std/384x288/c9265e52-cc73-4a8f-a3c9-001917d58aa7?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "LaFerrari",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/326ff5c0-18d0-46bf-a065-c73629bae583/3zayf6/std/384x288/326ff5c0-18d0-46bf-a065-c73629bae583?scalemode=auto",
    "categories": [
      "V12",
      "Ibrido"
    ]
  },
  {
    "name": "458 Speciale",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/a8355e7e-be35-455f-affe-d650227c4660/3zayf6/std/384x288/a8355e7e-be35-455f-affe-d650227c4660?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "SA Aperta",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/63febd34-af57-4858-b449-52b8dffe236e/3zayf6/std/384x288/63febd34-af57-4858-b449-52b8dffe236e?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "458 Spider",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/17df1a88-014f-49f3-9b83-0d21aa8155f6/3zayf6/std/384x288/17df1a88-014f-49f3-9b83-0d21aa8155f6?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "599 GTO",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/d35360f5-4784-4cd5-b187-c0276ba0746f/3zayf6/std/384x288/d35360f5-4784-4cd5-b187-c0276ba0746f?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "458 Italia",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/502fa35b-6305-4d04-acbd-29a31bb79bcb/3zayf6/std/384x288/502fa35b-6305-4d04-acbd-29a31bb79bcb?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "430 Scuderia",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/8313232b-2e4b-4497-9501-35e551217c91/3zayf6/std/384x288/8313232b-2e4b-4497-9501-35e551217c91?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "F430",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/bff748cc-aa58-488a-95a0-9e9203b8e4e2/3zayf6/std/384x288/bff748cc-aa58-488a-95a0-9e9203b8e4e2?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "360 Challenge Stradale",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/73e11170-e50a-4cf6-ab93-dd1ed328573d/3zayf6/std/384x288/73e11170-e50a-4cf6-ab93-dd1ed328573d?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "ENZO FERRARI",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/9b1d5b86-eae2-4502-a6db-46f3f1da4362/3zayf6/std/384x288/9b1d5b86-eae2-4502-a6db-46f3f1da4362?scalemode=auto",
    "categories": [
      "V12"
    ]
  },
  {
    "name": "360 Spider",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/f0b03754-606a-43ac-8bad-14f3b638b6a8/3zayf6/std/384x288/f0b03754-606a-43ac-8bad-14f3b638b6a8?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "360 Challenge",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/a4b7c51d-cbaf-49b7-a1a2-6e01fadb0db9/3zayf6/std/384x288/a4b7c51d-cbaf-49b7-a1a2-6e01fadb0db9?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "328 GTS",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/a76833b8-a3e2-4d50-bea0-94c6fb714e67/3zayf6/std/384x288/a76833b8-a3e2-4d50-bea0-94c6fb714e67?scalemode=auto",
    "categories": [
      "V8"
    ]
  },
  {
    "name": "296 Speciale",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/d9d37e15-7e01-437d-9721-edc9e8f1cee8/3zayf6/std/384x288/d9d37e15-7e01-437d-9721-edc9e8f1cee8?scalemode=auto",
    "categories": [
      "V6"
    ]
  },
  {
    "name": "296 Speciale A",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/d289f793-f5bc-4804-98bb-f1de31096881/3zayf6/std/384x288/d289f793-f5bc-4804-98bb-f1de31096881?scalemode=auto",
    "categories": [
      "V6",
      "Serie Speciali"
    ]
  },
  {
    "name": "Ferrari F80",
    "count": "0 Disponibili",
    "href": "",
    "image": "https://ferrari-cdn.thron.com/delivery/public/thumbnail/ferrari/33bdd019-afd5-4adb-8429-650cb0ae9ebe/3zayf6/std/384x288/33bdd019-afd5-4adb-8429-650cb0ae9ebe?scalemode=auto",
    "categories": [
      "V6",
      "Serie Speciali"
    ]
  }
];
// END model-index-snapshot

export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(n));
    return frag;
  };

  const fromDom = () => [...element.querySelectorAll('[class*="CardVehicleModel__wrapper"]')].map((card) => {
    const a = card.querySelector('a[href]');
    const img = card.querySelector('img');
    return {
      name: clean(card.querySelector('h3')?.textContent),
      count: clean(card.querySelector('h4')?.textContent),
      href: a ? a.getAttribute('href') : '',
      image: img ? (img.getAttribute('src') || img.getAttribute('data-src')) : '',
      categories: [],
    };
  });
  const tiles = (typeof SNAPSHOT !== 'undefined' && SNAPSHOT.length) ? SNAPSHOT : fromDom();

  const cells = tiles.map((tile) => {
    let imageCell = '';
    if (tile.image) {
      const img = document.createElement('img');
      img.src = tile.image;
      img.alt = tile.name;
      imageCell = hinted('image', img);
    }

    const nodes = [];
    const h = document.createElement('h3');
    h.textContent = tile.name;
    nodes.push(h);
    if (tile.count) {
      const p = document.createElement('p');
      p.textContent = tile.count;
      nodes.push(p);
    }
    if (tile.href) {
      const p = document.createElement('p');
      const a = document.createElement('a');
      a.setAttribute('href', tile.href);
      a.textContent = `Visualizza gli annunci per ${tile.name}`;
      p.appendChild(a);
      nodes.push(p);
    }
    if (tile.categories.length) {
      const ul = document.createElement('ul');
      tile.categories.forEach((c) => {
        const li = document.createElement('li');
        li.textContent = c;
        ul.appendChild(li);
      });
      nodes.push(ul);
    }
    return [imageCell, hinted('text', ...nodes)];
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-model', cells });
  element.replaceWith(block);
}
