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

  // tools/importer/import-results-listing.js
  var import_results_listing_exports = {};
  __export(import_results_listing_exports, {
    default: () => import_results_listing_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    var _a;
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes2) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes2.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const bg = element.querySelector('[class*="BackgroundImage__background"]') || element;
    let img = bg.querySelector("img");
    if (!img) {
      const styled = [bg, ...bg.querySelectorAll('[style*="background-image"]')].find((el) => /url\(/.test(el.getAttribute("style") || ""));
      const m = styled && styled.getAttribute("style").match(/url\(\s*(?:&quot;|["'])?(.*?)(?:&quot;|["'])?\s*\)/);
      if (m && m[1]) {
        img = document.createElement("img");
        img.src = m[1];
        img.alt = "";
      }
    }
    if (/HeroLogoText__wrapper/.test(element.className || "")) {
      const nodes2 = [];
      const logo = element.querySelector('img[class*="HeroLogoText__logo"]');
      if (logo) {
        const p = document.createElement("p");
        p.appendChild(logo);
        nodes2.push(p);
      }
      const title = clean2((_a = element.querySelector('[class*="HeroLogoText__title"]')) == null ? void 0 : _a.textContent);
      if (title) {
        const h = document.createElement("h2");
        h.textContent = title;
        nodes2.push(h);
      }
      const textEl = element.querySelector('[class*="HeroLogoText__text"]');
      if (textEl) {
        const blocks = [...textEl.querySelectorAll("div, p")].filter((el) => !el.querySelector("div, p"));
        const texts = (blocks.length ? blocks : [textEl]).map((el) => clean2(el.textContent)).filter(Boolean);
        texts.forEach((t) => {
          const p = document.createElement("p");
          p.textContent = t;
          nodes2.push(p);
        });
      }
      const block2 = WebImporter.Blocks.createBlock(document, {
        name: "hero-banner",
        cells: [[img ? hinted("image", img) : ""], [nodes2.length ? hinted("text", ...nodes2) : ""]]
      });
      element.replaceWith(block2);
      return;
    }
    const content = element.querySelector('[class*="HeroInfo__content"]') || element;
    const nodes = [];
    const eyebrow = content.querySelector("h4");
    if (eyebrow && clean2(eyebrow.textContent)) {
      const p = document.createElement("p");
      p.textContent = clean2(eyebrow.textContent);
      nodes.push(p);
    }
    const h1 = content.querySelector("h1");
    if (h1 && clean2(h1.textContent)) {
      const h = document.createElement("h1");
      h.textContent = clean2(h1.textContent);
      nodes.push(h);
    }
    content.querySelectorAll("h2, h3, p").forEach((el) => {
      const text = clean2(el.textContent);
      if (!text) return;
      const p = document.createElement("p");
      p.textContent = text;
      nodes.push(p);
    });
    const cells = [];
    cells.push([img ? hinted("image", img) : ""]);
    cells.push([nodes.length ? hinted("text", ...nodes) : ""]);
    const block = WebImporter.Blocks.createBlock(document, { name: "Hero Banner (text-left)", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/results-toolbar.js
  function parse2(element, { document, url, params }) {
    var _a, _b, _c, _d, _e, _f;
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    let messages = {};
    try {
      messages = ((_b = JSON.parse(((_a = document.getElementById("__NEXT_DATA__")) == null ? void 0 : _a.textContent) || "{}").props) == null ? void 0 : _b.messages) || {};
    } catch (e) {
    }
    const msg = (key, fallback) => {
      let v = messages[key];
      if (v === void 0) v = key.split(".").reduce((o, k) => o && typeof o === "object" ? o[k] : void 0, messages);
      return clean2(typeof v === "string" ? v : "") || fallback;
    };
    const pageUrl = params && params.originalURL || url || document.defaultView && document.defaultView.location.href;
    const liveLink2 = (href, text) => {
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.setAttribute("data-keep-live", "true");
      a.textContent = text;
      return a;
    };
    const cells = [];
    const isFavorites = /FavoritesHeader/.test(element.className);
    if (isFavorites) {
      const back = element.querySelector("a[href]");
      if (back) {
        const a = document.createElement("a");
        a.setAttribute("href", back.getAttribute("href"));
        a.textContent = clean2(back.textContent) || msg("saved_vehicles.back_btn", "Torna alla ricerca");
        cells.push([hinted("link", a)]);
      } else {
        cells.push([""]);
      }
      cells.push([""]);
    } else {
      const refineLabel = clean2((_c = element.querySelector('[class*="SearchRefine__refine__label"]')) == null ? void 0 : _c.textContent) || msg("dealers.search_refine.label", "Perfeziona la ricerca");
      const refine = liveLink2(pageUrl, refineLabel);
      refine.setAttribute("title", msg("dealers.search_refine.label_mobile", "Filtri"));
      cells.push([hinted("link", refine)]);
      const actions = [];
      const compareLabel = clean2((_d = element.querySelector('[class*="SearchRefine__actBtns__compare"]')) == null ? void 0 : _d.textContent) || msg("dealers.search_refine.compare_btn_label", "Confronta");
      const pc = document.createElement("p");
      pc.append(liveLink2(pageUrl, compareLabel));
      actions.push(pc);
      const order = element.querySelector('[class*="SearchRefine__actBtns__order"]');
      if (order) {
        const label = document.createElement("p");
        label.textContent = clean2((_e = order.querySelector('[class*="DropdownCustom__label"]')) == null ? void 0 : _e.textContent) || msg("dealers.search_refine.order_label", "Ordina");
        actions.push(label);
        const current = clean2((_f = order.querySelector('[class*="DropdownCustom__value-text"]')) == null ? void 0 : _f.textContent);
        const ul = document.createElement("ul");
        [
          ["price_asc", "Prezzo - crescente"],
          ["price_desc", "Prezzo - decrescente"],
          ["year_asc", "Anno - dal meno recente"],
          ["year_desc", "Anno - dal pi\xF9 recente"],
          ["odometer_asc", "Chilometraggio - crescente"],
          ["odometer_desc", "Chilometraggio - decrescente"],
          ["publish_date_desc", "Data di Pubblicazione - dal pi\xF9 recente"]
        ].forEach(([key, fallback]) => {
          const text = msg(`dealers.search_refine.order.${key}`, fallback);
          const li = document.createElement("li");
          if (current && current === text) {
            const strong = document.createElement("strong");
            strong.textContent = text;
            li.append(strong);
          } else {
            li.textContent = text;
          }
          ul.append(li);
        });
        actions.push(ul);
      }
      cells.push([hinted("actions", ...actions)]);
    }
    const viewButtons = [...element.querySelectorAll('[class*="ListView"] button, [class*="actBtnsListView"] button')];
    const ariaOf = (i) => {
      var _a2;
      return clean2((_a2 = viewButtons[i]) == null ? void 0 : _a2.getAttribute("aria-label"));
    };
    const listLabel = ariaOf(0) || "Attiva/disattiva visualizzazione elenco";
    const gridLabel = ariaOf(1) || "Attiva/disattiva visualizzazione griglia";
    const views = document.createDocumentFragment();
    views.appendChild(hinted("views_listLabel", listLabel));
    views.appendChild(hinted("views_gridLabel", gridLabel));
    cells.push([views]);
    const block = WebImporter.Blocks.createBlock(document, { name: "results-toolbar", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/active-filters.js
  function parse3(element, { document, url, params }) {
    var _a;
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const pageUrl = params && params.originalURL || url || document.defaultView && document.defaultView.location.href;
    let broader = "";
    try {
      const u = new URL(pageUrl);
      const m = u.pathname.match(/^(.*\/r\/[^/]+\/[^/]+\/[^/]+)\/.+\/rfc[a-z]+\/?$/);
      if (m) broader = `${u.origin}${m[1]}/rfc`;
    } catch (e) {
    }
    const label = clean2((_a = element.querySelector('[class*="SearchResults__label"]')) == null ? void 0 : _a.textContent);
    const chips = [...element.querySelectorAll('[class*="FilterTag__text"]')].map((el) => clean2(el.textContent)).filter(Boolean);
    const save = element.querySelector('[class*="SaveCurrentSearch"] button, [class*="SaveCurrentSearch"] a, [class*="saveBtn"] button');
    const saveText = clean2(save == null ? void 0 : save.textContent);
    if (!label && !chips.length && !saveText) {
      element.remove();
      return;
    }
    const ul = document.createElement("ul");
    chips.forEach((chip) => {
      const li = document.createElement("li");
      if (broader) {
        const a = document.createElement("a");
        a.setAttribute("href", broader);
        a.textContent = chip;
        li.append(a);
      } else {
        li.textContent = chip;
      }
      ul.append(li);
    });
    let saveCell = "";
    if (saveText) {
      const a = document.createElement("a");
      a.setAttribute("href", pageUrl);
      a.setAttribute("data-keep-live", "true");
      a.textContent = saveText;
      saveCell = hinted("link", a);
    }
    const cells = [
      [label ? hinted("label", label) : ""],
      [chips.length ? hinted("filters", ul) : ""],
      [saveCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "active-filters", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-car-listing.js
  function parse4(element, { document }) {
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const textOf = (root, sel) => {
      const el = root.querySelector(sel);
      return el ? clean2(el.textContent) : "";
    };
    const para = (text) => {
      const p = document.createElement("p");
      p.textContent = text;
      return p;
    };
    const specList = (items2) => {
      const ul = document.createElement("ul");
      items2.forEach((spec) => {
        const label = textOf(spec, '[class*="VehicleCard__specItem__label"]');
        const value = textOf(spec, '[class*="VehicleCard__specItem__value"]');
        if (!label && !value) return;
        const li = document.createElement("li");
        li.textContent = label ? `${label.charAt(0).toUpperCase()}${label.slice(1)}: ${value}` : value;
        ul.appendChild(li);
      });
      return ul.children.length ? ul : null;
    };
    function vehicleRow(card) {
      const img = card.querySelector('[class*="VehicleCardCarousel"] img[class*="Img__image"]') || card.querySelector(".carousel__item img");
      const imageCell = img ? hinted("image", img) : "";
      const badges = [...card.querySelectorAll('[class*="VehicleCard__labelText"]')].map((el) => clean2(el.textContent)).filter(Boolean);
      const badgeCell = badges.length ? hinted("badge", badges.join(", ")) : "";
      const nodes = [];
      const meta = [
        textOf(card, '[class*="VehicleCard__year"]'),
        textOf(card, '[class*="VehicleCard__odometer"]'),
        textOf(card, '[class*="VehicleCard__approved"]')
      ].filter(Boolean).join(" \xB7 ");
      if (meta) nodes.push(para(meta));
      const name = textOf(card, '[class*="VehicleCard__carName"]');
      if (name) {
        const h = document.createElement("h3");
        h.textContent = name;
        nodes.push(h);
      }
      const priceBox = card.querySelector('[class*="VehicleCard__specsHead__price__"]') || card;
      const price = textOf(priceBox, '[class*="VehicleCard__specsHead__priceValue"]');
      if (price) {
        const label = [...priceBox.children].find((c) => /specItem__label/.test(c.className || ""));
        const priceLabel = label ? clean2(label.textContent) : "";
        nodes.push(para(priceLabel ? `${priceLabel}: ${price}` : price));
        priceBox.querySelectorAll('[class*="VehicleCard__taxes"] > div').forEach((row) => {
          const l = textOf(row, '[class*="specItem__label"]');
          const v = textOf(row, '[class*="specItem__value"]');
          if (l || v) nodes.push(para(l ? `${l}: ${v}` : v));
        });
        const vat = textOf(card, '[class*="VehicleCard__specsHead__priceVat"]');
        if (vat) nodes.push(para(vat));
        const financing = card.querySelector('[class*="VehicleCard__specsHead__priceFinancing"] a[href]');
        if (financing && clean2(financing.textContent)) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.setAttribute("href", financing.getAttribute("href"));
          a.textContent = clean2(financing.textContent);
          p.appendChild(a);
          nodes.push(p);
        }
      }
      const specs = [...card.querySelectorAll('[class*="VehicleCard__specItem__"]')].filter((el) => !/specItem__(label|value)/.test(el.className));
      const primary = specList(specs.filter((el) => !/VehicleCard__compact/.test(el.className)));
      const extra = specList(specs.filter((el) => /VehicleCard__compact/.test(el.className)));
      if (primary) nodes.push(primary);
      if (extra) nodes.push(extra);
      const detailsAnchor = card.querySelector('a[class*="VehicleCard__ctaDetails"]:not([href*="tab=financing"])') || card.querySelector('[class*="VehicleCard__carousel"] a[href]');
      const detailsHref = detailsAnchor ? detailsAnchor.getAttribute("href") : "";
      if (detailsHref) {
        const ctaBox = card.querySelector('[class*="VehicleCard__content__ctas"]');
        const ctaTexts = ctaBox ? [...ctaBox.querySelectorAll('[class*="BtnCta__text"]')].map((t) => clean2(t.textContent)).filter(Boolean) : [];
        const contactText = ctaTexts.length > 1 ? ctaTexts[0] : "";
        const detailsText = ctaTexts.length ? ctaTexts[ctaTexts.length - 1] : "Dettagli";
        [contactText, detailsText].filter(Boolean).forEach((label) => {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.setAttribute("href", detailsHref);
          a.textContent = label;
          p.appendChild(a);
          nodes.push(p);
        });
      }
      return [imageCell, badgeCell, nodes.length ? hinted("text", ...nodes) : ""];
    }
    function promoRow(banner) {
      const img = banner.querySelector("img");
      const nodes = [];
      const title = textOf(banner, '[class*="bannerCard__title"]');
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title;
        nodes.push(h);
      }
      const text = textOf(banner, '[class*="bannerCard__text"]');
      if (text) nodes.push(para(text));
      const link = banner.querySelector("a[href]");
      if (link && clean2(link.textContent)) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.setAttribute("href", link.getAttribute("href"));
        a.textContent = clean2(link.textContent);
        p.appendChild(a);
        nodes.push(p);
      }
      return [img ? hinted("image", img) : "", "", nodes.length ? hinted("text", ...nodes) : ""];
    }
    const items = [...element.querySelectorAll('article[class*="VehicleCard__wrapper"], li > [class*="SearchResultListing__bannerCard"]')];
    const cells = items.map((item) => item.tagName !== "ARTICLE" ? promoRow(item) : vehicleRow(item));
    if (!cells.length) {
      element.remove();
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-car-listing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs.js
  function parse5(element, { document }) {
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const labels = [...element.querySelectorAll("li")].map((li) => clean2(li.textContent)).filter(Boolean);
    const root = element.closest('[class*="Favorites__wrapper"]') || element.parentElement;
    const switcher = root && root.parentElement && root.parentElement.querySelector('[class*="ContentSwitcher__wrapper"]') || document.querySelector('[class*="ContentSwitcher__wrapper"]');
    const panels = switcher ? [...switcher.children] : [];
    const cells = labels.map((label, i) => {
      const panel = panels[i];
      const texts = panel ? [...panel.querySelectorAll("p, h1, h2, h3, h4")].map((el) => clean2(el.textContent)).filter(Boolean) : [];
      const content = texts.map((t) => {
        const p = document.createElement("p");
        p.textContent = t;
        return p;
      });
      const labelCell = hinted("title", label);
      const contentCell = content.length ? hinted("content_richtext", ...content) : "";
      return [labelCell, contentCell];
    });
    if (switcher) switcher.remove();
    if (!cells.length) {
      element.remove();
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/link-directory.js
  var SNAPSHOT = {
    "/it-IT/r/asia-pacifico/usato-ferrari/giappone/rfc": [
      {
        "title": "Scopri l'offerta dei concessionari ufficiali",
        "links": [
          [
            "Cornes Osaka Showroom",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/cornes-osaka-showroom/rfcd"
          ],
          [
            "Cornes Shiba Showroom",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/cornes-shiba-showroom/rfcd"
          ],
          [
            "Cornes Nagoya Showroom",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/cornes-nagoya-showroom/rfcd"
          ],
          [
            "Nicole Competizione",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/nicole-competizione/rfcd"
          ],
          [
            "Auto Cavallino",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/auto-cavallino/rfcd"
          ],
          [
            "European Version",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/european-version/rfcd"
          ],
          [
            "Rosso Scuderia",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/rosso-scuderia/rfcd"
          ],
          [
            "MID Sapporo",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/mid-sapporo/rfcd"
          ],
          [
            "Auto Speciale",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/auto-speciale/rfcd"
          ],
          [
            "YANASE Fiorano Motori",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/yanase-fiorano-motori/rfcd"
          ],
          [
            "M-Auto Italia",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/m-auto-italia/rfcd"
          ],
          [
            "Gran Testa Nagano",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/gran-testa-nagano/rfcd"
          ],
          [
            "Ideal",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ideal/rfcd"
          ]
        ]
      },
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "296 GTS",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/296-gts/rfcm"
          ],
          [
            "Ferrari Roma",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-roma/rfcm"
          ],
          [
            "Ferrari Purosangue",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-purosangue/rfcm"
          ],
          [
            "296 GTB",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/296-gtb/rfcm"
          ],
          [
            "Ferrari Roma Spider",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-roma-spider/rfcm"
          ],
          [
            "SF90 Spider",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/sf90-spider/rfcm"
          ],
          [
            "Ferrari Portofino",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-portofino/rfcm"
          ],
          [
            "SF90 Stradale",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/sf90-stradale/rfcm"
          ],
          [
            "Ferrari 12Cilindri",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-12cilindri/rfcm"
          ],
          [
            "Ferrari Portofino M",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-portofino-m/rfcm"
          ],
          [
            "F8 Spider",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/f8-spider/rfcm"
          ],
          [
            "812 GTS",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/812-gts/rfcm"
          ],
          [
            "488 Spider",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/488-spider/rfcm"
          ],
          [
            "488 GTB",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/488-gtb/rfcm"
          ],
          [
            "F8 Tributo",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/f8-tributo/rfcm"
          ],
          [
            "GTC4Lusso T",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/gtc4lusso-t/rfcm"
          ],
          [
            "812 Superfast",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/812-superfast/rfcm"
          ],
          [
            "GTC4Lusso",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/gtc4lusso/rfcm"
          ],
          [
            "Ferrari California T",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/ferrari-california-t/rfcm"
          ],
          [
            "458 Spider",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/458-spider/rfcm"
          ],
          [
            "F430",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/f430/rfcm"
          ],
          [
            "488 Pista",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/488-pista/rfcm"
          ],
          [
            "458 Italia",
            "https://preowned.ferrari.com/it-IT/r/asia-pacifico/usato-ferrari/giappone/458-italia/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/germania/rfc": [
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "Ferrari Purosangue",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-purosangue/rfcm"
          ],
          [
            "296 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/296-gts/rfcm"
          ],
          [
            "Ferrari Roma Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-roma-spider/rfcm"
          ],
          [
            "296 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/296-gtb/rfcm"
          ],
          [
            "SF90 Stradale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/sf90-stradale/rfcm"
          ],
          [
            "SF90 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/sf90-spider/rfcm"
          ],
          [
            "Ferrari Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-roma/rfcm"
          ],
          [
            "Ferrari 12Cilindri",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-12cilindri/rfcm"
          ],
          [
            "Ferrari Portofino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-portofino/rfcm"
          ],
          [
            "488 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/488-gtb/rfcm"
          ],
          [
            "F8 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f8-spider/rfcm"
          ],
          [
            "F8 Tributo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f8-tributo/rfcm"
          ],
          [
            "Ferrari Portofino M",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-portofino-m/rfcm"
          ],
          [
            "Ferrari California T",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-california-t/rfcm"
          ],
          [
            "F12berlinetta",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f12berlinetta/rfcm"
          ],
          [
            "SF90 XX Stradale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/sf90-xx-stradale/rfcm"
          ],
          [
            "812 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/812-gts/rfcm"
          ],
          [
            "Ferrari Amalfi",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-amalfi/rfcm"
          ],
          [
            "812 Superfast",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/812-superfast/rfcm"
          ],
          [
            "488 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/488-spider/rfcm"
          ],
          [
            "Ferrari California",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-california/rfcm"
          ],
          [
            "Ferrari 12Cilindri Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-12cilindri-spider/rfcm"
          ],
          [
            "458 Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/458-italia/rfcm"
          ],
          [
            "328 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/328-gts/rfcm"
          ],
          [
            "488 Pista Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/488-pista-spider/rfcm"
          ],
          [
            "GTC4Lusso",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/gtc4lusso/rfcm"
          ],
          [
            "458 Speciale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/458-speciale/rfcm"
          ],
          [
            "F430",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f430/rfcm"
          ],
          [
            "348 TB/TS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/348-tb-ts/rfcm"
          ],
          [
            "330 GT 2+2",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/330-gt-2+2/rfcm"
          ],
          [
            "GTC4Lusso T",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/gtc4lusso-t/rfcm"
          ],
          [
            "FF",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ff/rfcm"
          ],
          [
            "458 Challenge",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/458-challenge/rfcm"
          ],
          [
            "612 Scaglietti Sessanta",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/612-scaglietti-sessanta/rfcm"
          ],
          [
            "F430 Challenge",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f430-challenge/rfcm"
          ],
          [
            "612 Scaglietti",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/612-scaglietti/rfcm"
          ],
          [
            "575M Maranello",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/575m-maranello/rfcm"
          ],
          [
            "360 Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/360-modena/rfcm"
          ],
          [
            "F355 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/f355-gts/rfcm"
          ],
          [
            "348 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/348-spider/rfcm"
          ],
          [
            "456 GT",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/456-gt/rfcm"
          ],
          [
            "Testarossa",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/testarossa/rfcm"
          ],
          [
            "308 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/308-gtb/rfcm"
          ],
          [
            "365 GTB4",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/365-gtb4/rfcm"
          ]
        ]
      },
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "Germania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/rfc"
          ],
          [
            "Francia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/francia/rfc"
          ],
          [
            "Gran Bretagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/rfc"
          ],
          [
            "Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rfc"
          ],
          [
            "Svizzera",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svizzera/rfc"
          ],
          [
            "Olanda",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/olanda/rfc"
          ],
          [
            "Belgio",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/belgio/rfc"
          ],
          [
            "Spagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/spagna/rfc"
          ],
          [
            "Danimarca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/danimarca/rfc"
          ],
          [
            "Principato di Monaco",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/principato-di-monaco/rfc"
          ],
          [
            "Norvegia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/norvegia/rfc"
          ],
          [
            "Finlandia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/finlandia/rfc"
          ],
          [
            "Austria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/austria/rfc"
          ],
          [
            "Repubblica Ceca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/repubblica-ceca/rfc"
          ],
          [
            "Svezia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svezia/rfc"
          ],
          [
            "Lussemburgo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lussemburgo/rfc"
          ],
          [
            "Polonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/polonia/rfc"
          ],
          [
            "Ungheria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/ungheria/rfc"
          ],
          [
            "Portogallo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/portogallo/rfc"
          ],
          [
            "Lettonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lettonia/rfc"
          ],
          [
            "Romania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/romania/rfc"
          ],
          [
            "Cipro",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/cipro/rfc"
          ],
          [
            "Bulgaria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/bulgaria/rfc"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/italia/296-gtb/rfcm": [
      {
        "title": "296 GTB in vendita presso i concessionari ufficiali",
        "links": [
          [
            "Rossocorsa Milano",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-milano/296-gtb/rfcdm"
          ],
          [
            "Sa.Mo.Car Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sa-mo-car-roma/296-gtb/rfcdm"
          ],
          [
            "Ineco Auto Verona",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ineco-auto-verona/296-gtb/rfcdm"
          ],
          [
            "C.D.P.",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/c-d-p-/296-gtb/rfcdm"
          ],
          [
            "Rossocorsa Torino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-torino/296-gtb/rfcdm"
          ],
          [
            "Sa.Mo.Car Prato",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sa-mo-car-prato/296-gtb/rfcdm"
          ],
          [
            "Radicci Automobili Bari",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/radicci-automobili-bari/296-gtb/rfcdm"
          ],
          [
            "Ferrari Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-modena/296-gtb/rfcdm"
          ],
          [
            "Radicci Automobili Catania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/radicci-automobili-catania/296-gtb/rfcdm"
          ]
        ]
      },
      {
        "title": "296 GTB usate per paese",
        "links": [
          [
            "Germania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/296-gtb/rfcm"
          ],
          [
            "Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gtb/rfcm"
          ],
          [
            "Francia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/francia/296-gtb/rfcm"
          ],
          [
            "Svizzera",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svizzera/296-gtb/rfcm"
          ],
          [
            "Gran Bretagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/296-gtb/rfcm"
          ],
          [
            "Spagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/spagna/296-gtb/rfcm"
          ],
          [
            "Olanda",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/olanda/296-gtb/rfcm"
          ],
          [
            "Danimarca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/danimarca/296-gtb/rfcm"
          ],
          [
            "Norvegia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/norvegia/296-gtb/rfcm"
          ],
          [
            "Finlandia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/finlandia/296-gtb/rfcm"
          ],
          [
            "Repubblica Ceca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/repubblica-ceca/296-gtb/rfcm"
          ],
          [
            "Belgio",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/belgio/296-gtb/rfcm"
          ],
          [
            "Principato di Monaco",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/principato-di-monaco/296-gtb/rfcm"
          ],
          [
            "Svezia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svezia/296-gtb/rfcm"
          ],
          [
            "Austria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/austria/296-gtb/rfcm"
          ],
          [
            "Bulgaria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/bulgaria/296-gtb/rfcm"
          ],
          [
            "Cipro",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/cipro/296-gtb/rfcm"
          ],
          [
            "Lussemburgo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lussemburgo/296-gtb/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/italia/rfc": [
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "296 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gtb/rfcm"
          ],
          [
            "Ferrari Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma/rfcm"
          ],
          [
            "296 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/296-gts/rfcm"
          ],
          [
            "Ferrari Roma Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma-spider/rfcm"
          ],
          [
            "SF90 Stradale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-stradale/rfcm"
          ],
          [
            "Ferrari Purosangue",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-purosangue/rfcm"
          ],
          [
            "Ferrari Portofino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-portofino/rfcm"
          ],
          [
            "SF90 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-spider/rfcm"
          ],
          [
            "812 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/812-gts/rfcm"
          ],
          [
            "Ferrari Portofino M",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-portofino-m/rfcm"
          ],
          [
            "Ferrari 12Cilindri",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-12cilindri/rfcm"
          ],
          [
            "F8 Tributo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f8-tributo/rfcm"
          ],
          [
            "GTC4Lusso",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/gtc4lusso/rfcm"
          ],
          [
            "Ferrari California",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-california/rfcm"
          ],
          [
            "812 Superfast",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/812-superfast/rfcm"
          ],
          [
            "Ferrari California T",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-california-t/rfcm"
          ],
          [
            "F8 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f8-spider/rfcm"
          ],
          [
            "GTC4Lusso T",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/gtc4lusso-t/rfcm"
          ],
          [
            "488 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/488-gtb/rfcm"
          ],
          [
            "F430 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f430-spider/rfcm"
          ],
          [
            "612 Scaglietti",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/612-scaglietti/rfcm"
          ],
          [
            "F512 M",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f512-m/rfcm"
          ],
          [
            "488 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/488-spider/rfcm"
          ],
          [
            "F12berlinetta",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f12berlinetta/rfcm"
          ],
          [
            "FF",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ff/rfcm"
          ],
          [
            "612 Scaglietti Sessanta",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/612-scaglietti-sessanta/rfcm"
          ],
          [
            "575M Maranello",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/575m-maranello/rfcm"
          ],
          [
            "360 Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/360-modena/rfcm"
          ],
          [
            "550 Maranello",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/550-maranello/rfcm"
          ],
          [
            "F355 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/f355-gts/rfcm"
          ],
          [
            "GTS Turbo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/gts-turbo/rfcm"
          ],
          [
            "365 GTB4",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/365-gtb4/rfcm"
          ],
          [
            "Ferrari 12Cilindri Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-12cilindri-spider/rfcm"
          ]
        ]
      },
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "Germania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/rfc"
          ],
          [
            "Francia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/francia/rfc"
          ],
          [
            "Gran Bretagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/rfc"
          ],
          [
            "Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rfc"
          ],
          [
            "Svizzera",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svizzera/rfc"
          ],
          [
            "Olanda",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/olanda/rfc"
          ],
          [
            "Belgio",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/belgio/rfc"
          ],
          [
            "Spagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/spagna/rfc"
          ],
          [
            "Danimarca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/danimarca/rfc"
          ],
          [
            "Principato di Monaco",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/principato-di-monaco/rfc"
          ],
          [
            "Norvegia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/norvegia/rfc"
          ],
          [
            "Finlandia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/finlandia/rfc"
          ],
          [
            "Austria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/austria/rfc"
          ],
          [
            "Repubblica Ceca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/repubblica-ceca/rfc"
          ],
          [
            "Svezia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svezia/rfc"
          ],
          [
            "Lussemburgo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lussemburgo/rfc"
          ],
          [
            "Polonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/polonia/rfc"
          ],
          [
            "Ungheria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/ungheria/rfc"
          ],
          [
            "Portogallo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/portogallo/rfc"
          ],
          [
            "Lettonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lettonia/rfc"
          ],
          [
            "Romania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/romania/rfc"
          ],
          [
            "Cipro",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/cipro/rfc"
          ],
          [
            "Bulgaria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/bulgaria/rfc"
          ]
        ]
      }
    ],
    "/it-IT/r/nord-america/usato-ferrari/u-s-a-/rfc": [
      {
        "title": "Scopri l'offerta dei concessionari ufficiali",
        "links": [
          [
            "Ferrari of Fort Lauderdale",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-fort-lauderdale/rfcd"
          ],
          [
            "Ferrari of San Francisco",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-san-francisco/rfcd"
          ],
          [
            "Wide World Ferrari",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/wide-world-ferrari/rfcd"
          ],
          [
            "Ferrari Central Florida",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-central-florida/rfcd"
          ],
          [
            "Ferrari of Naples",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-naples/rfcd"
          ],
          [
            "Ferrari Dallas",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-dallas/rfcd"
          ],
          [
            "Ferrari of New England",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-new-england/rfcd"
          ],
          [
            "Scottsdale Ferrari",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/scottsdale-ferrari/rfcd"
          ],
          [
            "Ferrari Lake Forest",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-lake-forest/rfcd"
          ],
          [
            "Ferrari of Central New Jersey",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-central-new-jersey/rfcd"
          ],
          [
            "Ferrari of Houston",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-houston/rfcd"
          ],
          [
            "Continental Autosports",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/continental-autosports/rfcd"
          ],
          [
            "Ferrari of Palm Beach",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-palm-beach/rfcd"
          ],
          [
            "Miller Motorcars",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/miller-motorcars/rfcd"
          ],
          [
            "Ferrari of Long Island",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-long-island/rfcd"
          ],
          [
            "Cauley Ferrari of Detroit",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/cauley-ferrari-of-detroit/rfcd"
          ],
          [
            "Ferrari of Washington",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-washington-/rfcd"
          ],
          [
            "Ferrari of Charlotte",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-charlotte/rfcd"
          ],
          [
            "Cavallino Rosso St Louis",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/cavallino-rosso-st-louis/rfcd"
          ],
          [
            "Ferrari Silicon Valley",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-silicon-valley/rfcd"
          ],
          [
            "Ferrari of Newport Beach",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-newport-beach/rfcd"
          ],
          [
            "Ferrari of Salt Lake City",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-salt-lake-city/rfcd"
          ],
          [
            "Ferrari of Boca Raton",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-boca-raton/rfcd"
          ],
          [
            "Ferrari of Greensboro",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-greensboro/rfcd"
          ],
          [
            "Ferrari of San Antonio",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-san-antonio/rfcd"
          ],
          [
            "Ferrari Philadelphia",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-philadelphia/rfcd"
          ],
          [
            "Twin Cities Performance",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/twin-cities-performance/rfcd"
          ],
          [
            "Ferrari of San Diego",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-san-diego/rfcd"
          ],
          [
            "Ron Tonkin Gran Turismo",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ron-tonkin-gran-turismo/rfcd"
          ],
          [
            "Ferrari of Denver",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-denver-/rfcd"
          ],
          [
            "Ferrari of Las Vegas",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-las-vegas/rfcd"
          ],
          [
            "The Collection",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/the-collection/rfcd"
          ],
          [
            "Ferrari of Atlanta",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-atlanta/rfcd"
          ],
          [
            "Ferrari of Austin",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-austin/rfcd"
          ],
          [
            "Ferrari of Tampa Bay",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-tampa-bay/rfcd"
          ],
          [
            "Prancing Horse of Nashville",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/prancing-horse-of-nashville/rfcd"
          ],
          [
            "Ferrari Beverly Hills",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-beverly-hills/rfcd"
          ],
          [
            "Ferrari of Seattle",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-seattle/rfcd"
          ],
          [
            "Ferrari Westlake",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-westlake/rfcd"
          ],
          [
            "Ferrari South Bay",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-south-bay/rfcd"
          ],
          [
            "Ferrari of Rancho Mirage",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-rancho-mirage/rfcd"
          ],
          [
            "Ferrari of Hawaii",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-hawaii/rfcd"
          ],
          [
            "Ferrari Pasadena",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-pasadena/rfcd"
          ],
          [
            "Ferrari of Miami",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-miami/rfcd"
          ],
          [
            "Ferrari of Central Ohio",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-central-ohio/rfcd"
          ],
          [
            "Ferrari of San Francisco",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-of-san-francisco/rfcd"
          ],
          [
            "Maranello",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/maranello/rfcd"
          ]
        ]
      },
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "488 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/488-spider/rfcm"
          ],
          [
            "F8 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f8-spider/rfcm"
          ],
          [
            "812 GTS",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/812-gts/rfcm"
          ],
          [
            "Ferrari Roma Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-roma-spider/rfcm"
          ],
          [
            "296 GTS",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/296-gts/rfcm"
          ],
          [
            "296 GTB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/296-gtb/rfcm"
          ],
          [
            "SF90 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/sf90-spider/rfcm"
          ],
          [
            "F12berlinetta",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f12berlinetta/rfcm"
          ],
          [
            "Ferrari Purosangue",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-purosangue/rfcm"
          ],
          [
            "812 Superfast",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/812-superfast/rfcm"
          ],
          [
            "458 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/458-spider/rfcm"
          ],
          [
            "488 GTB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/488-gtb/rfcm"
          ],
          [
            "458 Italia",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/458-italia/rfcm"
          ],
          [
            "Ferrari Roma",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-roma/rfcm"
          ],
          [
            "Ferrari Portofino M",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-portofino-m/rfcm"
          ],
          [
            "F8 Tributo",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f8-tributo/rfcm"
          ],
          [
            "F430 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f430-spider/rfcm"
          ],
          [
            "488 Pista",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/488-pista/rfcm"
          ],
          [
            "SF90 Stradale",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/sf90-stradale/rfcm"
          ],
          [
            "360 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/360-spider/rfcm"
          ],
          [
            "Ferrari Portofino",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-portofino/rfcm"
          ],
          [
            "Ferrari 12Cilindri",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-12cilindri/rfcm"
          ],
          [
            "488 Pista Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/488-pista-spider/rfcm"
          ],
          [
            "Ferrari California T",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-california-t/rfcm"
          ],
          [
            "812 Competizione",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/812-competizione/rfcm"
          ],
          [
            "430 Scuderia",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/430-scuderia/rfcm"
          ],
          [
            "599 GTB Fiorano",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/599-gtb-fiorano/rfcm"
          ],
          [
            "550 Maranello",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/550-maranello/rfcm"
          ],
          [
            "296 Challenge",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/296-challenge/rfcm"
          ],
          [
            "458 Speciale",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/458-speciale/rfcm"
          ],
          [
            "458 Speciale A",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/458-speciale-a/rfcm"
          ],
          [
            "F12tdf",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f12tdf/rfcm"
          ],
          [
            "Scuderia Spider 16M",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/scuderia-spider-16m/rfcm"
          ],
          [
            "360 Modena",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/360-modena/rfcm"
          ],
          [
            "Ferrari California",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-california/rfcm"
          ],
          [
            "360 Challenge Stradale",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/360-challenge-stradale/rfcm"
          ],
          [
            "Ferrari 12Cilindri Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ferrari-12cilindri-spider/rfcm"
          ],
          [
            "GTC4Lusso",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/gtc4lusso/rfcm"
          ],
          [
            "F355 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f355-spider/rfcm"
          ],
          [
            "328 GTS",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/328-gts/rfcm"
          ],
          [
            "GTC4Lusso T",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/gtc4lusso-t/rfcm"
          ],
          [
            "F430",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f430/rfcm"
          ],
          [
            "550 Barchetta Pininfarina",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/550-barchetta-pininfarina/rfcm"
          ],
          [
            "F355 Berlinetta",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f355-berlinetta/rfcm"
          ],
          [
            "812 Competizione A",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/812-competizione-a/rfcm"
          ],
          [
            "F512 M",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f512-m/rfcm"
          ],
          [
            "308 GTSi",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/308-gtsi/rfcm"
          ],
          [
            "488 Challenge",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/488-challenge/rfcm"
          ],
          [
            "599 GTO",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/599-gto/rfcm"
          ],
          [
            "Superamerica",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/superamerica/rfcm"
          ],
          [
            "F355 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f355-spider/rfcm"
          ],
          [
            "512 TR",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/512-tr/rfcm"
          ],
          [
            "F40",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/f40/rfcm"
          ],
          [
            "Testarossa",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/testarossa/rfcm"
          ],
          [
            "308 GTB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/308-gtb/rfcm"
          ],
          [
            "400",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/400/rfcm"
          ],
          [
            "FF",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/ff/rfcm"
          ],
          [
            "458 Challenge",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/458-challenge/rfcm"
          ],
          [
            "575M Maranello",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/575m-maranello/rfcm"
          ],
          [
            "456M GT",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/456m-gt/rfcm"
          ],
          [
            "348 Spider",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/348-spider/rfcm"
          ],
          [
            "328 GTB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/328-gtb/rfcm"
          ],
          [
            "348 TB/TS",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/348-tb-ts/rfcm"
          ],
          [
            "195 Inter",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/195-inter/rfcm"
          ],
          [
            "275 GTB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/275-gtb/rfcm"
          ],
          [
            "330 GTC",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/330-gtc/rfcm"
          ],
          [
            "365 GT4 BB",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/365-gt4-bb/rfcm"
          ],
          [
            "365 GTB4",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/365-gtb4/rfcm"
          ],
          [
            "365 GTC4",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/365-gtc4/rfcm"
          ],
          [
            "365 GTS4",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/365-gts4/rfcm"
          ],
          [
            "Dino 206 GT",
            "https://preowned.ferrari.com/it-IT/r/nord-america/usato-ferrari/u-s-a-/dino-206-gt/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/gran-bretagna/812-superfast/rfcm": [
      {
        "title": "812 Superfast in vendita presso i concessionari ufficiali",
        "links": [
          [
            "Meridien Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/meridien-modena/812-superfast/rfcdm"
          ],
          [
            "Stratstone Colchester",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/stratstone-colchester/812-superfast/rfcdm"
          ]
        ]
      },
      {
        "title": "Tutti i modelli in vendita per paese",
        "links": [
          [
            "296 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/296-gts/rfcm"
          ],
          [
            "Ferrari Purosangue",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-purosangue/rfcm"
          ],
          [
            "Ferrari Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-roma/rfcm"
          ],
          [
            "Ferrari Portofino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-portofino/rfcm"
          ],
          [
            "488 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/488-spider/rfcm"
          ],
          [
            "Ferrari Roma Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-roma-spider/rfcm"
          ],
          [
            "Ferrari 12Cilindri",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-12cilindri/rfcm"
          ],
          [
            "296 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/296-gtb/rfcm"
          ],
          [
            "SF90 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/sf90-spider/rfcm"
          ],
          [
            "F8 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f8-spider/rfcm"
          ],
          [
            "488 GTB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/488-gtb/rfcm"
          ],
          [
            "812 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/812-gts/rfcm"
          ],
          [
            "GTC4Lusso",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/gtc4lusso/rfcm"
          ],
          [
            "Ferrari California T",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-california-t/rfcm"
          ],
          [
            "458 Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/458-italia/rfcm"
          ],
          [
            "Ferrari Portofino M",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-portofino-m/rfcm"
          ],
          [
            "F12berlinetta",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f12berlinetta/rfcm"
          ],
          [
            "F355 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f355-spider/rfcm"
          ],
          [
            "488 Pista",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/488-pista/rfcm"
          ],
          [
            "812 Superfast",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/812-superfast/rfcm"
          ],
          [
            "458 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/458-spider/rfcm"
          ],
          [
            "430 Scuderia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/430-scuderia/rfcm"
          ],
          [
            "Ferrari 12Cilindri Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-12cilindri-spider/rfcm"
          ],
          [
            "SF90 XX Stradale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/sf90-xx-stradale/rfcm"
          ],
          [
            "F8 Tributo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f8-tributo/rfcm"
          ],
          [
            "488 Pista Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/488-pista-spider/rfcm"
          ],
          [
            "458 Speciale A",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/458-speciale-a/rfcm"
          ],
          [
            "458 Speciale",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/458-speciale/rfcm"
          ],
          [
            "Ferrari California",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-california/rfcm"
          ],
          [
            "612 Scaglietti One To One",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/612-scaglietti-one-to-one/rfcm"
          ],
          [
            "F430",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f430/rfcm"
          ],
          [
            "360 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/360-spider/rfcm"
          ],
          [
            "F355 Spider",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f355-spider/rfcm"
          ],
          [
            "F512 M",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/f512-m/rfcm"
          ],
          [
            "328 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/328-gts/rfcm"
          ],
          [
            "512 BB",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/512-bb/rfcm"
          ],
          [
            "296 Challenge",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/296-challenge/rfcm"
          ],
          [
            "275 GTB4",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/275-gtb4/rfcm"
          ],
          [
            "365 GTB4",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/365-gtb4/rfcm"
          ],
          [
            "Dino 246 GTS",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/dino-246-gts/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/italia/ferrari-roma/rfcm": [
      {
        "title": "Ferrari Roma in vendita presso i concessionari ufficiali",
        "links": [
          [
            "Sa.Mo.Car Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sa-mo-car-roma/ferrari-roma/rfcdm"
          ],
          [
            "Rossocorsa Milano",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-milano/ferrari-roma/rfcdm"
          ],
          [
            "Ineco Auto Verona",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ineco-auto-verona/ferrari-roma/rfcdm"
          ],
          [
            "Rossocorsa Torino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-torino/ferrari-roma/rfcdm"
          ],
          [
            "Ferrari Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-modena/ferrari-roma/rfcdm"
          ],
          [
            "C.D.P.",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/c-d-p-/ferrari-roma/rfcdm"
          ],
          [
            "Sa.Mo.Car Napoli",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sa-mo-car-napoli/ferrari-roma/rfcdm"
          ],
          [
            "Scuderia Bolzano",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/scuderia-bolzano/ferrari-roma/rfcdm"
          ],
          [
            "Radicci Automobili Catania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/radicci-automobili-catania/ferrari-roma/rfcdm"
          ],
          [
            "Radicci Automobili Ancona",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/radicci-automobili-ancona/ferrari-roma/rfcdm"
          ]
        ]
      },
      {
        "title": "Ferrari Roma usate per paese",
        "links": [
          [
            "Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-roma/rfcm"
          ],
          [
            "Germania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/ferrari-roma/rfcm"
          ],
          [
            "Gran Bretagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/gran-bretagna/ferrari-roma/rfcm"
          ],
          [
            "Svizzera",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svizzera/ferrari-roma/rfcm"
          ],
          [
            "Francia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/francia/ferrari-roma/rfcm"
          ],
          [
            "Belgio",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/belgio/ferrari-roma/rfcm"
          ],
          [
            "Olanda",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/olanda/ferrari-roma/rfcm"
          ],
          [
            "Spagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/spagna/ferrari-roma/rfcm"
          ],
          [
            "Finlandia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/finlandia/ferrari-roma/rfcm"
          ],
          [
            "Polonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/polonia/ferrari-roma/rfcm"
          ],
          [
            "Repubblica Ceca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/repubblica-ceca/ferrari-roma/rfcm"
          ],
          [
            "Svezia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svezia/ferrari-roma/rfcm"
          ],
          [
            "Ungheria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/ungheria/ferrari-roma/rfcm"
          ],
          [
            "Cipro",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/cipro/ferrari-roma/rfcm"
          ],
          [
            "Lussemburgo",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/lussemburgo/ferrari-roma/rfcm"
          ],
          [
            "Norvegia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/norvegia/ferrari-roma/rfcm"
          ],
          [
            "Romania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/romania/ferrari-roma/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/italia/sf90-stradale/rfcm": [
      {
        "title": "SF90 Stradale in vendita presso i concessionari ufficiali",
        "links": [
          [
            "Rossocorsa Milano",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-milano/sf90-stradale/rfcdm"
          ],
          [
            "Rossocorsa Torino",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rossocorsa-torino/sf90-stradale/rfcdm"
          ],
          [
            "C.D.P.",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/c-d-p-/sf90-stradale/rfcdm"
          ],
          [
            "Ineco Auto Verona",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ineco-auto-verona/sf90-stradale/rfcdm"
          ],
          [
            "Sa.Mo.Car Roma",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sa-mo-car-roma/sf90-stradale/rfcdm"
          ],
          [
            "Ferrari Modena",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/ferrari-modena/sf90-stradale/rfcdm"
          ]
        ]
      },
      {
        "title": "SF90 Stradale usate per paese",
        "links": [
          [
            "Germania",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/germania/sf90-stradale/rfcm"
          ],
          [
            "Italia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/sf90-stradale/rfcm"
          ],
          [
            "Svizzera",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svizzera/sf90-stradale/rfcm"
          ],
          [
            "Belgio",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/belgio/sf90-stradale/rfcm"
          ],
          [
            "Francia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/francia/sf90-stradale/rfcm"
          ],
          [
            "Olanda",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/olanda/sf90-stradale/rfcm"
          ],
          [
            "Austria",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/austria/sf90-stradale/rfcm"
          ],
          [
            "Danimarca",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/danimarca/sf90-stradale/rfcm"
          ],
          [
            "Polonia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/polonia/sf90-stradale/rfcm"
          ],
          [
            "Spagna",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/spagna/sf90-stradale/rfcm"
          ],
          [
            "Finlandia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/finlandia/sf90-stradale/rfcm"
          ],
          [
            "Norvegia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/norvegia/sf90-stradale/rfcm"
          ],
          [
            "Svezia",
            "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/svezia/sf90-stradale/rfcm"
          ]
        ]
      }
    ],
    "/it-IT/r/europa/usato-ferrari/italia/c-d-p-/rfcd": [],
    "/it-IT/r/europa/usato-ferrari/italia/ferrari-modena/rfcd": [],
    "/it-IT/r/nord-america/usato-ferrari/u-s-a-/cauley-ferrari-of-detroit/rfcd": []
  };
  function parse6(element, { document, url, params }) {
    const clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const candidates = [params && params.originalURL, url, document.defaultView && document.defaultView.location.href];
    let snapshot = null;
    candidates.some((candidate) => {
      try {
        snapshot = SNAPSHOT[new URL(candidate).pathname.replace(/\/$/, "")] || null;
      } catch (e) {
      }
      return snapshot;
    });
    const blocks = [...element.querySelectorAll('[class*="SearchHints__block"]')];
    const cells = [];
    blocks.forEach((blockEl, i) => {
      var _a, _b;
      const title = clean2((_a = blockEl.querySelector('[class*="SearchHints__title"]')) == null ? void 0 : _a.textContent);
      const snap = snapshot && snapshot[i] && clean2(snapshot[i].title) === title ? snapshot[i] : null;
      const links = snap ? snap.links : [...blockEl.querySelectorAll("li a")].map((a) => [clean2(a.textContent), a.getAttribute("href")]);
      if (!links.length) return;
      const ul = document.createElement("ul");
      links.forEach(([text, href]) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.setAttribute("href", href);
        a.textContent = text;
        li.appendChild(a);
        ul.appendChild(li);
      });
      const showAll = clean2((_b = blockEl.querySelector('[class*="SearchHints__cta"]')) == null ? void 0 : _b.textContent);
      cells.push([
        title ? hinted("title", title) : "",
        hinted("links", ul),
        showAll && links.length > 12 ? hinted("showAllLabel", showAll) : ""
      ]);
    });
    if (!cells.length) {
      element.remove();
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "link-directory", cells });
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
    // (not the results listing "Stai ancora cercando…" call to action, SearchResultsFooter__wrapper)
    '[class*="Footer__wrapper"]:not([class*="SearchResultsFooter__"])',
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

  // tools/importer/transformers/ferrari-preowned-listing.js
  var APP_UI = [
    '[class*="SearchRefine__sticky"]',
    '[class*="SearchRefine__backToTop"]',
    '[class*="SearchRefine__expand-mobile"]',
    '[class*="SearchRefine__expander"]',
    '[class*="CompareRecap__"]',
    '[class*="VehicleCard__bookmark"]',
    '[class*="SearchResults__hero"][class*="isEmpty"]'
  ];
  var ENQUIRE_SLUG = "form-enquire-global-preowned-free-enquire";
  var ENQUIRE_FALLBACK = "https://forms.ferrari.com/content/forms/af/ferrari/af/dws/generic.html";
  var clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
  function enquireFormUrl(document, lang) {
    var _a, _b, _c, _d, _e;
    let base = ENQUIRE_FALLBACK;
    try {
      const data = JSON.parse(((_a = document.getElementById("__NEXT_DATA__")) == null ? void 0 : _a.textContent) || "{}");
      const vars = ((_d = (_c = (_b = data.props) == null ? void 0 : _b.pageProps) == null ? void 0 : _c.initialState) == null ? void 0 : _d.channelVariables) || [];
      const v = vars.find((x) => {
        var _a2;
        return ((_a2 = x == null ? void 0 : x.content) == null ? void 0 : _a2.slug) === ENQUIRE_SLUG;
      });
      if ((_e = v == null ? void 0 : v.content) == null ? void 0 : _e.url) base = v.content.url.trim();
    } catch (e) {
    }
    const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
    url.searchParams.set("form-slug", ENQUIRE_SLUG);
    return url.href;
  }
  function liveLink(document, href, text) {
    const a = document.createElement("a");
    a.setAttribute("href", href);
    a.setAttribute("data-keep-live", "true");
    a.textContent = text;
    return a;
  }
  function normalizeHeading(element, document) {
    element.querySelectorAll('[class*="SearchResults__title"]').forEach((title) => {
      const text = clean(title.textContent);
      if (!text) {
        title.remove();
        return;
      }
      const h1 = document.createElement("h1");
      h1.textContent = text;
      title.replaceWith(h1);
    });
  }
  function normalizeLoadMore(element, document, pageUrl) {
    element.querySelectorAll('[class*="SearchResultListing__loadMore"]').forEach((bar) => {
      var _a;
      const listing = bar.closest(".search-result-listing");
      const frag = document.createDocumentFragment();
      const seen = clean((_a = bar.querySelector("p")) == null ? void 0 : _a.textContent);
      if (seen) {
        const p = document.createElement("p");
        p.textContent = seen;
        frag.append(p);
      }
      const more = bar.querySelector("a[href]");
      if (more) {
        const p = document.createElement("p");
        p.append(liveLink(document, new URL(more.getAttribute("href"), pageUrl).href, clean(more.textContent)));
        frag.append(p);
      }
      bar.remove();
      if (!frag.childNodes.length) return;
      if (listing) listing.after(frag);
      else element.append(frag);
    });
  }
  function normalizeFooter(element, document, pageUrl, lang) {
    element.querySelectorAll('[class*="SearchResultsFooter__wrapper"]').forEach((footer) => {
      var _a, _b;
      const frag = document.createDocumentFragment();
      const title = clean((_a = footer.querySelector("h1, h2, h3, h4")) == null ? void 0 : _a.textContent);
      if (title) {
        const h2 = document.createElement("h2");
        h2.textContent = title;
        frag.append(h2);
      }
      const subtitle = clean((_b = footer.querySelector('[class*="Headline__subtitle"]')) == null ? void 0 : _b.textContent);
      if (subtitle) {
        const p = document.createElement("p");
        p.textContent = subtitle;
        frag.append(p);
      }
      const buttons = [...footer.querySelectorAll('[class*="SearchResultsFooter__ctas"] button, [class*="SearchResultsFooter__ctas"] a')];
      buttons.forEach((button, i) => {
        const label = clean(button.textContent);
        if (!label) return;
        const p = document.createElement("p");
        if (i === buttons.length - 1) {
          const strong = document.createElement("strong");
          const a = document.createElement("a");
          a.setAttribute("href", enquireFormUrl(document, lang));
          a.textContent = label;
          strong.append(a);
          p.append(strong);
        } else {
          p.append(liveLink(document, pageUrl, label));
        }
        frag.append(p);
      });
      footer.replaceChildren(frag);
    });
  }
  function transform2(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    const document = payload.document;
    const isListing = element.querySelector('[class*="SearchResults__wrapper"], [class*="Favorites__wrapper"]');
    if (!isListing) return;
    const pageUrl = payload.params && payload.params.originalURL || payload.url || document.defaultView && document.defaultView.location.href;
    const lang = (document.documentElement.getAttribute("lang") || "it").slice(0, 2).toLowerCase();
    WebImporter.DOMUtils.remove(element, APP_UI);
    [...element.querySelectorAll('[class*="SearchRefine__wrapper"]')].slice(1).forEach((el) => el.remove());
    normalizeHeading(element, document);
    normalizeLoadMore(element, document, pageUrl);
    normalizeFooter(element, document, pageUrl, lang);
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
  function transform3(hookName, element, payload) {
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
  var sanitizeSegment = (s) => decodeURIComponent(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  var pagePath = (local) => local === "/" ? "/" : `/${local.split("/").filter(Boolean).map(sanitizeSegment).join("/")}`;
  function toMigratedPath(path) {
    const local = path.replace(LOCALE_PREFIX, "").replace(/\/$/, "") || "/";
    if (/^\/ferrari-approved\/share\//i.test(local)) return "/ferrari-approved";
    return MIGRATED.has(local.toLowerCase()) ? pagePath(local) : null;
  }
  function toLiveUrl(u) {
    const live = new URL(u.href);
    if (!LOCALE_PREFIX.test(live.pathname)) live.pathname = `/it-IT${live.pathname === "/" ? "" : live.pathname}`;
    return live.href;
  }
  function transform4(hookName, element, payload) {
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
      const keepLive = a.hasAttribute("data-keep-live");
      a.removeAttribute("data-keep-live");
      if (u.hostname !== SOURCE_HOST) return;
      const migrated = keepLive ? null : toMigratedPath(u.pathname);
      a.setAttribute("href", migrated ? `${migrated}${u.search}${u.hash}` : toLiveUrl(u));
    });
  }

  // tools/importer/import-results-listing.js
  var PAGE_TEMPLATE = {
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
          '[class*="SearchResults__hero"]:not([class*="isEmpty"]) [class*="HeroLogoText__wrapper"]'
        ]
      },
      {
        "name": "results-toolbar",
        "instances": [
          '[class*="SearchRefine__wrapper"]:not([class*="SearchRefine__sticky"])',
          '[class*="FavoritesHeader__wrapper"]'
        ]
      },
      {
        "name": "active-filters",
        "instances": [
          '[class*="SearchResults__resultsWrapper"]'
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
          '[class*="Favorites__tabs"]'
        ]
      },
      {
        "name": "link-directory",
        "instances": [
          '[class*="SearchHints__wrapper"]'
        ]
      }
    ],
    "sections": [
      {
        "id": "section-1",
        "name": "Results",
        "selector": [
          '[class*="SearchResults__wrapper"]',
          '[class*="Favorites__wrapper"]'
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
          '[class*="SearchResults__title"]',
          '[class*="SearchResultListing__loadMore"]'
        ]
      },
      {
        "id": "section-2",
        "name": "Contact call to action",
        "selector": [
          '[class*="SearchResultsFooter__wrapper"]'
        ],
        "style": "cta",
        "blocks": [],
        "defaultContent": [
          '[class*="SearchResultsFooter__wrapper"]'
        ]
      },
      {
        "id": "section-3",
        "name": "Link directory",
        "selector": [
          '[class*="SearchHints__wrapper"]'
        ],
        "style": "dark-grey",
        "blocks": [
          "link-directory"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "results-toolbar": parse2,
    "active-filters": parse3,
    "cards-car-listing": parse4,
    "tabs": parse5,
    "link-directory": parse6
  };
  var transformers = [transform, transform2, transform3, transform4];
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
  var import_results_listing_default = {
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
  return __toCommonJS(import_results_listing_exports);
})();
