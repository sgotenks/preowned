/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-model-index.js
  var import_model_index_exports = {};
  __export(import_model_index_exports, {
    default: () => import_model_index_default
  });

  // tools/importer/parsers/model-filter.js
  function parse(element, { document }) {
    const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const labels = [...element.querySelectorAll('[class*="TabsUnderline__button"], [class*="TabsUnderline__list"]')].filter((el) => !el.querySelector('[class*="TabsUnderline__button"]')).map((el) => clean(el.textContent)).filter(Boolean);
    const cells = [];
    if (labels.length) {
      const ul = document.createElement("ul");
      labels.forEach((label) => {
        const li = document.createElement("li");
        li.textContent = label;
        ul.appendChild(li);
      });
      cells.push([hinted("filters", ul)]);
    } else {
      cells.push([""]);
    }
    const input = element.querySelector("input[placeholder]") || element.ownerDocument.querySelector('[class*="SearchByModels__search"] input[placeholder]');
    const placeholder = clean(input && input.getAttribute("placeholder")) || "FILTRA PER...";
    const hasSearch = !!(input || element.querySelector('[class*="SearchByModels__search-btn"]'));
    cells.push([hasSearch ? hinted("searchPlaceholder", placeholder) : ""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "model-filter", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-model.js
  var SNAPSHOT = [
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
  function parse2(element, { document }) {
    const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const fromDom = () => [...element.querySelectorAll('[class*="CardVehicleModel__wrapper"]')].map((card) => {
      var _a, _b;
      const a = card.querySelector("a[href]");
      const img = card.querySelector("img");
      return {
        name: clean((_a = card.querySelector("h3")) == null ? void 0 : _a.textContent),
        count: clean((_b = card.querySelector("h4")) == null ? void 0 : _b.textContent),
        href: a ? a.getAttribute("href") : "",
        image: img ? img.getAttribute("src") || img.getAttribute("data-src") : "",
        categories: []
      };
    });
    const tiles = typeof SNAPSHOT !== "undefined" && SNAPSHOT.length ? SNAPSHOT : fromDom();
    const cells = tiles.map((tile) => {
      let imageCell = "";
      if (tile.image) {
        const img = document.createElement("img");
        img.src = tile.image;
        img.alt = tile.name;
        imageCell = hinted("image", img);
      }
      const nodes = [];
      const h = document.createElement("h3");
      h.textContent = tile.name;
      nodes.push(h);
      if (tile.count) {
        const p = document.createElement("p");
        p.textContent = tile.count;
        nodes.push(p);
      }
      if (tile.href) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.setAttribute("href", tile.href);
        a.textContent = `Visualizza gli annunci per ${tile.name}`;
        p.appendChild(a);
        nodes.push(p);
      }
      if (tile.categories.length) {
        const ul = document.createElement("ul");
        tile.categories.forEach((c) => {
          const li = document.createElement("li");
          li.textContent = c;
          ul.appendChild(li);
        });
        nodes.push(ul);
      }
      return [imageCell, hinted("text", ...nodes)];
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-model", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ferrari-preowned-cleanup.js
  var CHROME_BEFORE = [
    // Page preloader (Ferrari logo splash) and custom cursor
    '[class*="Preloader__"]',
    '[class*="MainCursor__"]',
    // Ferrari corporate top bar (super header) and "Ferrari Approved" channel header + nav
    "#sh-ntw-ferrari",
    ".fa-superheader",
    "header",
    '[class*="ChannelMenuHeader__"]',
    '[class*="MenuHeader__"]',
    "nav",
    '[class*="Breadcrumb"]',
    // Sticky chapter / scroll indicator
    '[class*="ScrollIndicatorLandscape"]',
    '[class*="ScrollIndicator__"]',
    // Floating share widget
    '[class*="Share__wrapper"]',
    // Site footer (Ferrari super footer + channel footer)
    "#sf-ntw-ferrari",
    ".fa-superfooter",
    "footer",
    '[class*="Footer__wrapper"]',
    '[class*="ChannelFooter__"]',
    // Cookie banner / OneTrust
    "#onetrust-consent-sdk",
    "#onetrust-banner-sdk",
    "#onetrust-pc-sdk",
    '[id^="onetrust-"]',
    ".optanon-alert-box-wrapper",
    '[class*="CookieBanner"]',
    '[class*="cookie-banner"]',
    // Chat widgets (Genesys messenger, Salesforce)
    "#genesys-thirdparty",
    "#genesys-messenger",
    ".genesys-app",
    '[id^="genesys-"]',
    ".embeddedServiceHelpButton",
    ".embeddedServiceSidebar",
    // Accessibility widget
    "#userwayAccessibilityIcon",
    ".uwy",
    '[class*="userway"]',
    "#accessibilityWidget",
    '[class*="accessibility-widget"]',
    '[class*="AccessibilityWidget"]',
    // accessiBe widget and its screen-reader hint ("Premi Opzione+1 per la modalità lettore...")
    '[class*="acsb"]',
    '[id^="acsb"]',
    "[data-acsb-hidden]",
    // Modals / popups
    "#popup-root",
    '[class*="Modal__"]',
    // Tracking / third-party iframes
    'iframe[title="GPP Locator"]',
    'iframe[src*="mypurecloud"]',
    "iframe:not([src])"
  ];
  var CHROME_AFTER = [
    "script",
    "style",
    "noscript",
    "link",
    "source",
    'iframe:not([src*="youtube"]):not([src*="vimeo"])'
  ];
  function removeEmptyPreloader(element) {
    const preloader = element.querySelector("#__next > div > div:first-child");
    if (!preloader) return;
    const imgs = [...preloader.querySelectorAll("img")];
    const onlyDataSvg = imgs.length > 0 && imgs.every((img) => (img.getAttribute("src") || "").startsWith("data:image/svg"));
    if (onlyDataSvg && !preloader.textContent.trim() && !preloader.querySelector(".page-menu-hook")) {
      preloader.remove();
    }
  }
  function removeAccessibilityHints(element) {
    element.querySelectorAll('a[href*="accessibe.com"]').forEach((a) => {
      (a.closest("p, div, span") || a).remove();
    });
  }
  function normalizeChapterLabels(element, document) {
    element.querySelectorAll('[class*="Chapter__chapter"]').forEach((chapter) => {
      const num = chapter.querySelector('[class*="Chapter__prefix"]');
      const title = [...chapter.querySelectorAll("strong")].find((s) => s !== num);
      if (!num || !title) return;
      const p = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = num.textContent.trim();
      p.append(strong, ` ${title.textContent.trim()}`);
      chapter.replaceWith(p);
    });
  }
  var FORM_FALLBACK = {
    "Form-enquiry-approved-valuemycar": "https://forms.ferrari.com/content/forms/af/ferrari/af/dws/service.html"
  };
  function formUrls(document) {
    var _a;
    const urls = __spreadValues({}, FORM_FALLBACK);
    try {
      const data = JSON.parse(((_a = document.getElementById("__NEXT_DATA__")) == null ? void 0 : _a.textContent) || "{}");
      const walk = (o) => {
        var _a2, _b;
        if (!o || typeof o !== "object") return;
        if (Array.isArray(o)) {
          o.forEach(walk);
          return;
        }
        if (o.type === "AdobeForm" && ((_a2 = o.content) == null ? void 0 : _a2.slug) && ((_b = o.content) == null ? void 0 : _b.url)) urls[o.content.slug] = o.content.url.trim();
        Object.values(o).forEach(walk);
      };
      walk(data.props);
    } catch (e) {
    }
    return urls;
  }
  function formUrl(target, urls, lang) {
    const m = (target || "").match(/^#form-([^?&]+)/);
    if (!m || !urls[m[1]]) return null;
    const url = new URL(urls[m[1]].replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
    url.searchParams.set("form-slug", m[1]);
    return url.href;
  }
  function normalizeTextBlocks(element, document, lang) {
    const urls = formUrls(document);
    element.querySelectorAll('[class*="TextBlock__ctas"] button[data-event-target^="#form-"]').forEach((button) => {
      const href = formUrl(button.getAttribute("data-event-target"), urls, lang);
      if (!href) return;
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.innerHTML = button.innerHTML;
      button.replaceWith(a);
    });
    element.querySelectorAll('[class*="TextBlock__ctas"]').forEach((ctas) => {
      const links = [...ctas.querySelectorAll("a[href]")];
      if (!links.length) return;
      const frag = document.createDocumentFragment();
      links.forEach((link) => {
        const labelEl = link.querySelector('[class*="BtnAction__text"]') || link;
        const label = (labelEl.textContent || link.getAttribute("title") || "").replace(/\s+/g, " ").trim();
        if (!label) return;
        const p = document.createElement("p");
        const em = document.createElement("em");
        const a = document.createElement("a");
        a.setAttribute("href", link.getAttribute("href"));
        a.textContent = label;
        em.append(a);
        p.append(em);
        frag.append(p);
      });
      ctas.replaceWith(frag);
    });
    element.querySelectorAll('[class*="TextBlock__content"] div').forEach((div) => {
      const hasText = [...div.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!hasText) return;
      const out = document.createDocumentFragment();
      let p = null;
      let brRun = 0;
      const flush = () => {
        if (p && p.textContent.trim()) out.append(p);
        p = null;
      };
      [...div.childNodes].forEach((node) => {
        if (node.nodeName === "BR") {
          brRun += 1;
          if (brRun >= 2) flush();
          else if (p) p.append(document.createElement("br"));
          return;
        }
        if (node.nodeType === 3 && !node.textContent.trim()) return;
        if (brRun === 1 && p && p.lastChild && p.lastChild.nodeName === "BR" && node.nodeType === 1 && /^(UL|OL|P|DIV|H\d)$/.test(node.nodeName)) p.lastChild.remove();
        brRun = 0;
        if (node.nodeType === 1 && /^(UL|OL|P|H\d|TABLE)$/.test(node.nodeName)) {
          flush();
          out.append(node);
          return;
        }
        if (!p) p = document.createElement("p");
        p.append(node.nodeType === 3 ? node.textContent.replace(/^\s+/, p.childNodes.length ? " " : "") : node);
      });
      flush();
      div.replaceWith(out);
    });
  }
  function transform(hookName, element, payload) {
    if (hookName === "beforeTransform") {
      removeEmptyPreloader(element);
      WebImporter.DOMUtils.remove(element, CHROME_BEFORE);
      removeAccessibilityHints(element);
      normalizeChapterLabels(element, payload.document);
      const pageLang = (payload.document.documentElement.getAttribute("lang") || "it").slice(0, 2).toLowerCase();
      normalizeTextBlocks(element, payload.document, pageLang);
    }
    if (hookName === "afterTransform") {
      WebImporter.DOMUtils.remove(element, CHROME_AFTER);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
          const n = attr.name;
          if (n.startsWith("on") || n.startsWith("data-track") || n.startsWith("data-gtm") || n.startsWith("data-analytics") || n === "data-testid") {
            el.removeAttribute(n);
          }
        });
      });
    }
  }

  // tools/importer/transformers/ferrari-preowned-sections.js
  var MARKER = "data-excat-section-id";
  function findSectionElement(root, section) {
    const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
    for (const sel of selectors) {
      if (!sel) continue;
      try {
        const el = root.querySelector(sel);
        if (el) return el;
      } catch (e) {
      }
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const template = payload && payload.template;
    const sections = template && Array.isArray(template.sections) ? template.sections : [];
    if (!sections.length || sections.length === 1 && !sections[0].style) return;
    const document = element.ownerDocument;
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const el = findSectionElement(element, section);
        if (!el) continue;
        el.setAttribute(`${MARKER}-el`, section.id);
        if (i > 0 || section.style) {
          const hr = document.createElement("hr");
          if (section.style) hr.setAttribute(MARKER, section.id);
          if (i === 0) hr.setAttribute(`${MARKER}-first`, "true");
          el.parentNode.insertBefore(hr, el);
        }
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const marker = element.querySelector(`hr[${MARKER}="${section.id}"]`);
        const sectionEl = element.querySelector(`[${MARKER}-el="${section.id}"]`);
        if (section.style && (sectionEl || marker)) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
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
      element.querySelectorAll(`hr[${MARKER}-first]`).forEach((hr) => hr.remove());
    }
  }

  // tools/importer/transformers/ferrari-preowned-links.js
  var migratedPaths = [
    "/",
    "/ad",
    "/favorites",
    "/ferrari-approved",
    "/modelli-usato-ferrari",
    "/r/asia-pacifico/usato-ferrari/giappone/rfc",
    "/r/europa/usato-ferrari/germania/rfc",
    "/r/europa/usato-ferrari/gran-bretagna/812-superfast/rfcm",
    "/r/europa/usato-ferrari/italia/296-gtb/rfcm",
    "/r/europa/usato-ferrari/italia/c-d-p-/rfcd",
    "/r/europa/usato-ferrari/italia/ferrari-modena/rfcd",
    "/r/europa/usato-ferrari/italia/ferrari-roma/rfcm",
    "/r/europa/usato-ferrari/italia/rfc",
    "/r/europa/usato-ferrari/italia/sf90-stradale/rfcm",
    "/r/nord-america/usato-ferrari/u-s-a-/cauley-ferrari-of-detroit/rfcd",
    "/r/nord-america/usato-ferrari/u-s-a-/rfc",
    "/value-your-car"
  ];
  var SOURCE_HOST = "preowned.ferrari.com";
  var LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;
  var MIGRATED = new Set(migratedPaths.map((p) => p.toLowerCase()));
  function toMigratedPath(path) {
    const local = path.replace(LOCALE_PREFIX, "").replace(/\/$/, "") || "/";
    if (/^\/ferrari-approved\/share\//i.test(local)) return "/ferrari-approved";
    return MIGRATED.has(local.toLowerCase()) ? local.toLowerCase() : null;
  }
  function toLiveUrl(u) {
    const live = new URL(u.href);
    if (!LOCALE_PREFIX.test(live.pathname)) live.pathname = `/it-IT${live.pathname === "/" ? "" : live.pathname}`;
    return live.href;
  }
  function transform3(hookName, element, payload) {
    var _a;
    if (hookName !== "afterTransform") return;
    const base = ((_a = payload.params) == null ? void 0 : _a.originalURL) || payload.url;
    element.querySelectorAll("a[href]").forEach((a) => {
      const raw = (a.getAttribute("href") || "").trim();
      if (!raw || raw.startsWith("#") || /^(mailto|tel|javascript):/i.test(raw)) return;
      let u;
      try {
        u = new URL(raw, base);
      } catch (e) {
        return;
      }
      if (u.hostname !== SOURCE_HOST) return;
      const migrated = toMigratedPath(u.pathname);
      a.setAttribute("href", migrated ? `${migrated}${u.search}${u.hash}` : toLiveUrl(u));
    });
  }

  // tools/importer/import-model-index.js
  var PAGE_TEMPLATE = {
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
          '[class*="SearchByModels__tabsbar"]'
        ]
      },
      {
        "name": "cards-model",
        "instances": [
          '[class*="SearchByModels__content"]'
        ]
      }
    ],
    "sections": [
      {
        "id": "section-1",
        "name": "Model index: heading, category filter and model tiles",
        "selector": [
          '[class*="SearchByModels__wrapper"]',
          "#__next > div:nth-of-type(1) > div.page-menu-hook > div > div:nth-of-type(1)"
        ],
        "style": "eyebrow-title",
        "blocks": [
          "model-filter",
          "cards-model"
        ],
        "defaultContent": [
          '[class*="SearchByModels__wrapper"] .heading'
        ]
      }
    ]
  };
  var parsers = {
    "model-filter": parse,
    "cards-model": parse2
  };
  var transformers = [transform, transform2, transform3];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
    transformers.forEach((fn) => {
      try {
        fn(hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
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
  var import_model_index_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (!parser) return;
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      });
      executeTransformers("afterTransform", main, payload);
      main.appendChild(document.createElement("hr"));
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/^\/it-IT(?=\/|$)/i, "").replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_model_index_exports);
})();
