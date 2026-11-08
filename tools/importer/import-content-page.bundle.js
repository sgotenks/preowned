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

  // tools/importer/import-content-page.js
  var import_content_page_exports = {};
  __export(import_content_page_exports, {
    default: () => import_content_page_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
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
    const content = element.querySelector('[class*="HeroInfo__content"]') || element;
    const nodes = [];
    const eyebrow = content.querySelector("h4");
    if (eyebrow && clean(eyebrow.textContent)) {
      const p = document.createElement("p");
      p.textContent = clean(eyebrow.textContent);
      nodes.push(p);
    }
    const h1 = content.querySelector("h1");
    if (h1 && clean(h1.textContent)) {
      const h = document.createElement("h1");
      h.textContent = clean(h1.textContent);
      nodes.push(h);
    }
    content.querySelectorAll("h2, h3, p").forEach((el) => {
      const text = clean(el.textContent);
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

  // tools/importer/parsers/editorial.js
  function parse2(element, { document }) {
    const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name2, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name2} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const copyNodes = (container) => {
      const out = [];
      if (!container) return out;
      [...container.children].forEach((child) => {
        const tag = child.tagName;
        if (/^(P|UL|OL)$/.test(tag)) {
          if (clean(child.textContent)) out.push(child.cloneNode(true));
        } else if (/^H[1-6]$/.test(tag)) {
          const text = clean(child.textContent);
          if (text) {
            const h = document.createElement("h3");
            h.textContent = text;
            out.push(h);
          }
        } else if (child.querySelector("p, ul, ol, h1, h2, h3, h4, h5, h6")) {
          out.push(...copyNodes(child));
        } else if (clean(child.textContent)) {
          const p = document.createElement("p");
          p.textContent = clean(child.textContent);
          out.push(p);
        }
      });
      return out;
    };
    const chapterTitle = element.querySelector('[class*="Editorial__chapterTitle"]');
    if (chapterTitle) {
      const label = chapterTitle.querySelector("p") || chapterTitle;
      if (clean(label.textContent)) element.before(label);
      chapterTitle.remove();
    }
    const img = element.querySelector('[class*="Editorial__mediaPlaceholder"] img');
    const desc = element.querySelector('[class*="Editorial__text"] [class*="Editorial__desc"]');
    const more = element.querySelector('[class*="additional-content"]');
    const moreNodes = copyNodes(more);
    const textNodes = copyNodes(desc);
    const cells = [
      [img ? hinted("image", img) : ""],
      [textNodes.length ? hinted("text", ...textNodes) : ""],
      [moreNodes.length ? hinted("more", ...moreNodes) : ""]
    ];
    const reverse = !!element.querySelector('[class*="reverse-flex"]');
    const name = reverse ? "Editorial (image-right)" : "Editorial";
    const block = WebImporter.Blocks.createBlock(document, { name, cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-photo-overlay.js
  function parse3(element, { document }) {
    const clean = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const items = [...element.querySelectorAll('[class*="SplitBanner__item__"]')];
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector('[class*="SplitBanner__content-media"] img');
      const imageCell = img ? hinted("image", img) : "";
      const nodes = [];
      const pre = item.querySelector('[class*="SplitBanner__pre-title"]');
      const preText = pre ? clean(pre.textContent) : "";
      if (preText) {
        const p = document.createElement("p");
        p.textContent = preText;
        nodes.push(p);
      }
      const title = item.querySelector('[class*="SplitBanner__content-inside"] [class*="Title__title"]');
      const titleText = title ? clean(title.textContent) : "";
      if (titleText) {
        const h = document.createElement("h3");
        h.textContent = titleText;
        nodes.push(h);
      }
      const cta = item.querySelector('[class*="SplitBanner__actions"] a[class*="BtnAction"]');
      const hrefSource = cta || item.querySelector("a[href]");
      const href = hrefSource ? hrefSource.getAttribute("href") : "";
      if (href) {
        const textEl = cta && cta.querySelector('[class*="BtnAction__text"]');
        const label = clean(textEl ? textEl.textContent : cta ? cta.textContent : "") || cta && clean(cta.getAttribute("title")) || titleText || href;
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.setAttribute("href", href);
        a.textContent = label;
        p.appendChild(a);
        nodes.push(p);
      }
      const textCell = nodes.length ? hinted("text", ...nodes) : "";
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-photo-overlay", cells });
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
  function normalizeTextBlocks(element, document) {
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
      normalizeTextBlocks(element, payload.document);
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
    if (sections.length < 2) return;
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
  var SOURCE_HOST = "preowned.ferrari.com";
  var LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;
  var MIGRATED = /^\/(|ferrari-approved(\/share\/.*)?|modelli-usato-ferrari|value-your-car|favorites|ad|r\/.+)$/i;
  function toMigratedPath(path) {
    const local = path.replace(LOCALE_PREFIX, "").replace(/\/$/, "") || "/";
    if (!MIGRATED.test(local)) return null;
    if (/^\/ferrari-approved\/share\//i.test(local)) return "/ferrari-approved";
    return local.toLowerCase();
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
      a.setAttribute("href", migrated ? `${migrated}${u.search}${u.hash}` : u.href);
    });
  }

  // tools/importer/import-content-page.js
  var PAGE_TEMPLATE = {
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
          '[class*="HeroInfo__wrapper"]'
        ]
      },
      {
        "name": "editorial",
        "instances": [
          '[class*="Editorial__wrapper"]'
        ]
      },
      {
        "name": "cards-photo-overlay",
        "instances": [
          '[class*="SplitBanner__wrapper"]'
        ]
      }
    ],
    "sections": [
      {
        "id": "section-1",
        "name": "Hero",
        "selector": [
          '[class*="HeroInfo__wrapper"]'
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
          '[class*="TextBlock__container"][class*="theme-ferrari-812-gts"]:not([class*="text_centered"])'
        ],
        "style": "light-grey",
        "blocks": [],
        "defaultContent": [
          '[class*="TextBlock__content"]'
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
          '[class*="TextBlock__chapterTitle"]',
          '[class*="TextBlock__content"]'
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
          '[class*="Editorial__chapterTitle"]'
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
          '[class*="Editorial__chapterTitle"]'
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
          '[class*="Editorial__chapterTitle"]'
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
          '[class*="Editorial__chapterTitle"]'
        ]
      },
      {
        "id": "section-8",
        "name": "Disclaimer",
        "selector": [
          '[class*="TextBlock__text_centered"]'
        ],
        "style": "light-grey, centered, spacious",
        "blocks": [],
        "defaultContent": [
          '[class*="TextBlock__content"]'
        ]
      },
      {
        "id": "section-9",
        "name": "Programma Ferrari Approved",
        "selector": [
          '[class*="SplitBanner__wrapper"]'
        ],
        "style": null,
        "blocks": [
          "cards-photo-overlay"
        ],
        "defaultContent": []
      }
    ]
  };
  var parsers = {
    "hero-banner": parse,
    "editorial": parse2,
    "cards-photo-overlay": parse3
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
  var import_content_page_default = {
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
  return __toCommonJS(import_content_page_exports);
})();
