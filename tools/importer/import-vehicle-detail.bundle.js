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

  // tools/importer/import-vehicle-detail.js
  var import_vehicle_detail_exports = {};
  __export(import_vehicle_detail_exports, {
    default: () => import_vehicle_detail_default
  });

  // tools/importer/parsers/vehicle-gallery.js
  function nextData(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  var SNAPSHOT = {
    "IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D": [
      "7cbf17a8-893b-4bc8-99f7-84ce3cfd94df",
      "ec167913-b2e1-4bfb-b2eb-8f2463e0edd9",
      "7f1d6cbe-f514-41c3-b229-b21d094faaf2",
      "4b6a87f9-d45a-436c-a1bb-1a02a57d0ec8",
      "c7c729ed-c54e-47e0-a1e9-c077401b919e",
      "92249f99-464f-45fc-a434-dda423616e2b",
      "7eff0c34-c7f0-4a32-8922-ed2a66771094",
      "fb5750b9-b755-4192-be1d-77f49d938c5f",
      "d27fd823-7dfe-4fd9-9da8-c0f0a6f215a2",
      "70500861-2919-4a2a-8235-ee09069cb2ed",
      "c0a37509-5346-4a07-afa9-c59d1b893a6a",
      "08b87493-e686-4c1c-ad73-6cee3bbd3310",
      "8b914ceb-7c81-43c3-b7b3-5f84d80a63bc"
    ],
    "IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D": [
      "36296a24-4bbb-4941-8457-5e68fe7f379d",
      "2c9e6918-4bc3-4950-ba71-4ecbda0a7746",
      "c63f217f-e1c8-408c-902c-26ef978115ef",
      "782ea3fa-b52e-4f5c-b734-cf3597918807",
      "fefb3fac-24d1-4d55-b902-ee62139f055d",
      "122321e6-3af9-4b30-8122-b15751b89ebb",
      "11b16cdc-36e3-4af0-b952-2d7ba4ce8d46",
      "b8907f31-3b54-4dc3-8829-65dcaf695a41",
      "9f4567e5-715c-4cfc-a761-f65b7265654b",
      "e431fe60-a365-4df8-8b4d-f004e81cd122",
      "69610ea7-6128-4025-a5aa-986535ef8aa6",
      "4d459499-0573-40de-a8b8-2594b999f6ad",
      "e0006d4c-55d8-4738-94c8-63c87c525eac"
    ],
    "IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D": [
      "1a9a07b0-a35f-437f-bd43-3fb31253ed2f",
      "732d4108-aa85-4f6c-8c1d-d3c03024f216",
      "80e85edd-5bd9-4029-9523-7e3be0aa0931",
      "fc1ecf58-d9d4-4d96-92c0-904c903dbc79",
      "18d9d345-18da-4b8a-bb83-7422a1cee2af",
      "19f4318f-9897-4998-9c9a-962895418486",
      "90d44d91-cdfc-4f23-ba7e-f391c916dc3a",
      "11cc649e-a8b9-4d30-a15f-fc534f09c4a8",
      "752d7411-720b-4baf-ab9d-e74ff6dd3a36",
      "efb794aa-b834-454b-985a-ee920deaf44c",
      "6d406e75-4614-4e57-b596-ef7a00162635",
      "71bf67da-0f2f-46b0-be08-c55ac7239557"
    ]
  };
  var photoUrl = (id) => `https://ferrari-cdn.thron.com/delivery/public/image/ferrari/${id}/3zayf6/std/0x1000/2264556?quality=auto-high&format=auto`;
  function parse(element, { document }) {
    var _a;
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    let ad = {};
    try {
      ad = nextData(document).props.pageProps.initialProps.adDetailsData.ads[0] || {};
    } catch (e) {
    }
    const alt = (ad.carName || ((_a = element.querySelector("img")) == null ? void 0 : _a.getAttribute("alt")) || "").trim();
    let srcs = (SNAPSHOT[ad.id] || []).map(photoUrl);
    if (!srcs.length) {
      srcs = [...new Set([...element.querySelectorAll("img")].map((img) => (img.getAttribute("src") || "").replace(/^\/\//, "https://").replace(/\/std\/0x\d+\//, "/std/0x1000/")))].filter(Boolean);
    }
    const cells = srcs.map((src) => {
      const img = document.createElement("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", alt);
      return [hinted("image", img)];
    });
    if (!cells.length) {
      element.remove();
      return;
    }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-gallery", cells }));
  }

  // tools/importer/parsers/vehicle-summary.js
  function nextData2(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  function enquiryUrl(document) {
    var _a;
    const slug = "new-enquiry-usato-preowned";
    let base = "https://forms.ferrari.com/content/forms/af/ferrari/af/fcom/generic-r.html";
    try {
      const vars = nextData2(document).props.pageProps.initialState.channelVariables;
      const v = vars.find((x) => x.id === slug);
      if ((_a = v == null ? void 0 : v.content) == null ? void 0 : _a.url) base = v.content.url.trim();
    } catch (e) {
    }
    const lang = (document.documentElement.getAttribute("lang") || "it").slice(0, 2).toLowerCase();
    const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
    url.searchParams.set("form-slug", slug);
    return url.href;
  }
  function parse2(element, { document }) {
    var _a, _b;
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name2, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name2} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const linkP = (href, text2) => {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.setAttribute("href", href);
      a.textContent = text2;
      p.append(a);
      return p;
    };
    const text = [];
    const name = clean3((_a = element.querySelector('[class*="HeroCarAD__name"]')) == null ? void 0 : _a.textContent);
    if (name) {
      const h1 = document.createElement("h1");
      h1.textContent = name;
      text.push(h1);
    }
    const ul = document.createElement("ul");
    const words = (node) => {
      const out = [];
      const walk = (n) => n.childNodes.forEach((c) => {
        if (c.nodeType === 3) {
          if (clean3(c.textContent)) out.push(clean3(c.textContent));
        } else if (c.nodeName !== "svg") walk(c);
      });
      walk(node);
      return out.join(" ");
    };
    element.querySelectorAll('ul[class*="HeroCarAD__listing"] > li').forEach((li) => {
      const value = words(li);
      if (!value) return;
      const item = document.createElement("li");
      if (/HeroCarAD__anchor/.test(li.className || "")) {
        const a = document.createElement("a");
        a.setAttribute("href", "#dealer");
        a.textContent = value;
        item.append(a);
      } else item.textContent = value;
      ul.append(item);
    });
    if (ul.children.length) text.push(ul);
    const price = clean3((_b = element.querySelector('[class*="HeroCarAD__price"] strong, [class*="HeroCarAD__price"]')) == null ? void 0 : _b.textContent);
    const cta = [];
    const contact = element.querySelector('[class*="HeroCarAD__buttons"] a[href], button[class*="HeroCarAD__enquire"]');
    if (contact) cta.push(linkP(contact.getAttribute("href") || enquiryUrl(document), clean3(contact.textContent)));
    const phone = document.querySelector('[class*="DealerFullInfo"] a[href^="tel:"]');
    if (phone) cta.push(linkP(phone.getAttribute("href"), clean3(phone.textContent)));
    element.querySelectorAll('[class*="Medias__btn"]').forEach((btn, i) => {
      const label = clean3(btn.textContent);
      if (label) cta.push(linkP(/360/.test(label) ? "#vehicle-360" : "#gallery", label));
    });
    const cells = [
      [text.length ? hinted("text", ...text) : ""],
      [price ? hinted("price", price) : ""],
      [cta.length ? hinted("cta", ...cta) : ""]
    ];
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-summary", cells }));
  }

  // tools/importer/parsers/vehicle-specs.js
  function nextData3(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  function parse3(element, { document }) {
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, text) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      frag.appendChild(document.createTextNode(text));
      return frag;
    };
    let utcDates = [];
    try {
      const ad = nextData3(document).props.pageProps.initialProps.adDetailsData.ads[0];
      utcDates = (ad.overviewData || []).map((o) => String(o.value || "")).filter((v) => /^\d{4}-\d{2}-\d{2}T/.test(v)).map((v) => v.slice(0, 10).split("-").reverse().join("/"));
    } catch (e) {
    }
    const dayOf = (dmy) => {
      const [d, m, y] = dmy.split("/").map(Number);
      return Date.UTC(y, m - 1, d) / 864e5;
    };
    const fixDate = (value) => {
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value) || utcDates.includes(value)) return value;
      return utcDates.find((u) => Math.abs(dayOf(u) - dayOf(value)) === 1) || value;
    };
    const cells = [...element.querySelectorAll('[class*="OverviewData__item"]')].map((li) => {
      var _a, _b;
      const label = clean3((_a = li.querySelector('[class*="OverviewData__label"]')) == null ? void 0 : _a.textContent);
      const value = fixDate(clean3((_b = li.querySelector('[class*="OverviewData__value"]')) == null ? void 0 : _b.textContent));
      return [label ? hinted("label", label) : "", value ? hinted("value", value) : ""];
    }).filter(([l, v]) => l || v);
    if (!cells.length) {
      element.remove();
      return;
    }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-specs", cells }));
  }

  // tools/importer/parsers/vehicle-360.js
  function nextData4(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  function parse4(element, { document }) {
    var _a, _b;
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, node) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      frag.appendChild(typeof node === "string" ? document.createTextNode(node) : node);
      return frag;
    };
    let ad = {};
    try {
      ad = nextData4(document).props.pageProps.initialProps.adDetailsData.ads[0] || {};
    } catch (e) {
    }
    const contentId = ((_a = ad.thronDeliveryId) == null ? void 0 : _a.thronGalleryId) || "";
    if (!contentId) {
      element.remove();
      return;
    }
    const poster = element.querySelector('img.th-image, img[class*="th-image"]');
    let img = null;
    if (poster && /^https?:|^\/\//.test(poster.getAttribute("src") || "")) {
      img = document.createElement("img");
      img.setAttribute("src", poster.getAttribute("src").replace(/^\/\//, "https://"));
      img.setAttribute("alt", ad.carName || "");
    }
    const label = clean3((_b = element.querySelector('[class*="BtnBigIcon__text"]')) == null ? void 0 : _b.textContent);
    const cells = [
      [img ? hinted("image", img) : ""],
      [hinted("contentId", contentId)],
      [label ? hinted("label", label) : ""]
    ];
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-360", cells }));
  }

  // tools/importer/parsers/vehicle-details.js
  function nextData5(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  var SNAPSHOT2 = {
    "IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D": [
      {
        "tab": "Equipaggiamenti opzionali",
        "primary": [],
        "groups": [
          {
            "title": "Esterni",
            "items": [
              "Pinze freno di color nero lucido",
              "Battitacco esterno in fibra di carbonio",
              "Scudetti Scuderia Ferrari su parafanghi",
              "Colori speciali",
              'Cerchi da 20" forgiati diamantati'
            ]
          },
          {
            "title": "Interni",
            "items": [
              "Zona centrale sedili in Alcantara\xAE",
              "Medaglione centrale pannello porta in Alcantara\xAE",
              "Tappeti abitacolo in Alcantara\xAE",
              "Anelli Neri Bocchette Plancia",
              "Maniglioni Interni In carbonio",
              "Area guidatore in fibra di carbonio e LED su volante",
              "Consolle centrale in fibra di carbonio",
              "Colore Dei Tappeti",
              "Tunnel centrale in pelle di un colore su richiesta",
              "Inserti plancia in fibra di carbonio",
              "Fondo del contagiri giallo",
              "Sedili full-electric"
            ]
          },
          {
            "title": "Tecnologia",
            "items": [
              "AFS2 (Proiettori anteriori adattivi)",
              "Sollevatore anteriore e posteriore di disimpegno",
              "Parabrezza termoassorbente",
              "Lingua Documentazione",
              "Ee Functionality",
              "Surround View"
            ]
          }
        ]
      },
      {
        "tab": "Equipaggiamento di serie",
        "groups": [
          {
            "title": "Caratteristiche",
            "items": [
              "Tyres pressure and temperature measurament sensor (TPMS)",
              "Tyre reparation emergency kit",
              '20" alloy wheels',
              "Full-LED headlights",
              "Dual round LED tail lights",
              "Engine start button on steering wheel",
              "Cruise control",
              "Rain and light sensors",
              "Dual-zone air conditioning system",
              "Antitheft system",
              "New key with transponder, antitheft system, remote control for doors and trunk, keyless start system",
              "Front and rear parking sensors",
              "Electrochromic heated side mirrors with automatic closure",
              "Inner electrochromic rear view mirror",
              "8-ways electric seats",
              "Infotelematic System with new HMI with navigation maps, USB port on central tunnel, Bluetooth audio streaming",
              "Car protection cover",
              "Battery maintainer",
              "Retractable hard-top",
              "Side Slip Control (SSC) 5.0",
              "E-Diff with SSC integration",
              "Traction control F1 with SSC integration",
              "Passo Corto Virtuale (PCV) with rear steering wheels",
              "Dynamic elecric power steering",
              "Manettino (Race Manettino)",
              "Magnetorheological suspension system (Magneride Gen 3) - control via Manettino",
              "Carbon ceramic brake system (CCM4)",
              "Performance Launch Control",
              "ESC (Electronic Stability Control)",
              "ABS/EBD - Performance anti-lock braking system with electronic brakeforce",
              "Two dual-stage front airbags",
              "Retractable side airbag on door panel for head protection"
            ]
          }
        ]
      },
      {
        "tab": "Specifiche tecniche",
        "primary": [
          {
            "value": "V12 - 65\xB0",
            "unit": "",
            "label": "Gruppo propulsore"
          },
          {
            "value": "<3.0",
            "unit": "sec",
            "label": "0-100 km/h"
          },
          {
            "value": "123",
            "unit": "CV/l",
            "label": "Potenza specifica"
          },
          {
            "value": "800 at 8500 rpm",
            "unit": "CV",
            "label": "Potenza massima"
          }
        ],
        "groups": [
          {
            "title": "Motore",
            "items": [
              {
                "label": "Tipo",
                "value": "V12 - 65\xB0",
                "unit": ""
              },
              {
                "label": "Cilindrata totale",
                "value": "6496",
                "unit": "cm3"
              },
              {
                "label": "Alesaggio e corsa",
                "value": "94 x 78",
                "unit": "mm"
              },
              {
                "label": "Potenza massima",
                "value": "800 at 8500 rpm",
                "unit": "CV"
              },
              {
                "label": "Coppia Massima",
                "value": "718 at 7000 rpm",
                "unit": "Nm"
              },
              {
                "label": "Potenza specifica",
                "value": "123",
                "unit": "CV/l"
              },
              {
                "label": "Regime massimo",
                "value": "8900",
                "unit": "rpm"
              },
              {
                "label": "Rapporto di compressione",
                "value": "13.6:1",
                "unit": ""
              },
              {
                "label": "Numero cilindri",
                "value": "12",
                "unit": ""
              },
              {
                "label": "Tipo di carburante",
                "value": "Benzina",
                "unit": ""
              }
            ]
          },
          {
            "title": "Dimensioni e peso",
            "items": [
              {
                "label": "Lunghezza",
                "value": "4693",
                "unit": "mm"
              },
              {
                "label": "Larghezza",
                "value": "1971",
                "unit": "mm"
              },
              {
                "label": "Altezza",
                "value": "1276",
                "unit": "mm"
              },
              {
                "label": "Passo",
                "value": "2720",
                "unit": "mm"
              },
              {
                "label": "Carreggiata anteriore",
                "value": "1672",
                "unit": "mm"
              },
              {
                "label": "Carreggiata posteriore",
                "value": "1645",
                "unit": "mm"
              },
              {
                "label": "Peso a secco",
                "value": "1645",
                "unit": "kg"
              },
              {
                "label": "Capacit\xE0 serbatoio",
                "value": "92",
                "unit": "l"
              },
              {
                "label": "Distribuzione dei pesi",
                "value": "47% Ant - 53% Post",
                "unit": ""
              },
              {
                "label": "Capacit\xE0 del vano baule",
                "value": "210",
                "unit": "l"
              }
            ]
          },
          {
            "title": "Pneumatici",
            "items": [
              {
                "label": "Anteriori",
                "value": '275/35 ZR 20" 10\u201D J',
                "unit": "mm ; in (pollici)"
              },
              {
                "label": "Posteriori",
                "value": "315/35 ZR20; 11.5\u201D J x 20\u201D",
                "unit": "mm ; in (pollici)"
              }
            ]
          },
          {
            "title": "Trasmissione e cambio",
            "items": [
              {
                "label": "Cambio",
                "value": "Cambio F1 doppia frizione a 7 marce",
                "unit": ""
              }
            ]
          },
          {
            "title": "Controlli elettronici",
            "items": [
              {
                "label": "Controlli elettronici",
                "value": "EPS, PCV 2.0, E-DIFF3, F1-TRAC, ABS/EBD WITH PRE-FILL, FRS SCM-E, SLIDE SLIP ANGLE CONTROL SSC 5.0",
                "unit": ""
              }
            ]
          },
          {
            "title": "Prestazioni",
            "items": [
              {
                "label": "0-100 km/h",
                "value": "<3.0",
                "unit": "sec"
              },
              {
                "label": "0-200 km/h",
                "value": "8.3",
                "unit": "sec"
              },
              {
                "label": "100-0 km/h",
                "value": "32",
                "unit": "m"
              },
              {
                "label": "Velocit\xE0 massima",
                "value": "340",
                "unit": "km/h"
              },
              {
                "label": "200-0 km/h",
                "value": "121",
                "unit": "m"
              }
            ]
          },
          {
            "title": "Emissioni co2",
            "items": [
              {
                "label": "Low",
                "value": "588",
                "unit": "g/km"
              },
              {
                "label": "Mid",
                "value": "360",
                "unit": "g/km"
              },
              {
                "label": "High",
                "value": "318",
                "unit": "g/km"
              },
              {
                "label": "Extra High",
                "value": "348",
                "unit": "g/km"
              },
              {
                "label": "Combinato",
                "value": "373",
                "unit": "g/km"
              }
            ]
          },
          {
            "title": "Consumi",
            "items": [
              {
                "label": "Low",
                "value": "25.8",
                "unit": "l/100km"
              },
              {
                "label": "Mid",
                "value": "15.8",
                "unit": "l/100km"
              },
              {
                "label": "High",
                "value": "14.0",
                "unit": "l/100km"
              },
              {
                "label": "Extra High",
                "value": "15.3",
                "unit": "l/100km"
              },
              {
                "label": "Combinato",
                "value": "16.4",
                "unit": "l/100km"
              }
            ]
          }
        ]
      },
      {
        "tab": "Nota della concessionaria",
        "groups": [
          {
            "title": "",
            "text": '- esterni: Grigio GTS\n- interni: pelle/alcantara Cioccolato\n\n\nallestimento:\n\n- cronologia service completa (GTO Motors)\n\n- pinze freno di color nero lucido\n\n- battitacco esterno in fibra di carbonio\n\n- scudetti Scuderia Ferrari su parafanghi\n\n- colori speciali extracampionario GRIGIO GTS\n\n- cerchi da 20" forgiati diamantati\n\n- zona centrale sedili in Alcantara CIOCCOLATO\n\n- medaglione centrale pannello porta in Alcantara CIOCCOLATO\n\n- tappeti abitacolo in Alcantara CIOCCOLATO\n\n- anelli Neri Bocchette Plancia\n\n- maniglioni Interni In carbonio\n\n- area guidatore in fibra di carbonio e LED su volante\n\n- consolle centrale in fibra di carbonio\n\n- tunnel centrale in pelle di un colore su richiesta CIOCCOLATO\n\n- inserti plancia in fibra di carbonio\n\n- fondo del contagiri giallo\n\n- sedili full-electric\n\n- AFS2 (Proiettori anteriori adattivi)\n\n- sollevatore anteriore di disimpegno\n\n- parabrezza termoassorbente\n\n- surround view'
          }
        ]
      }
    ],
    "IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D": [
      {
        "tab": "Equipaggiamenti opzionali",
        "primary": [],
        "groups": [
          {
            "title": "Esterni",
            "items": [
              "Pinze freno di color Rosso Corsa",
              "Dettagli Abitacolo In Pelle Colorata",
              "Terminali di scarico in titanio",
              "Scudetti Scuderia Ferrari su parafanghi",
              'Cerchi racing da 20" forgiati di color Grigio N\xFCrburgring opaco'
            ]
          },
          {
            "title": "Interni",
            "items": [
              "Area guidatore in fibra di carbonio e LED su volante",
              "Colore Dei Tappeti",
              "Cavallino ricamato su poggiatesta",
              "Sovratappeti con logo vettura ricamato",
              "Fondo del contagiri giallo",
              "Sedili full-electric",
              "Cuciture standard di colore a richiesta"
            ]
          },
          {
            "title": "Tecnologia",
            "items": [
              "AFS2 (Proiettori anteriori adattivi)",
              "Pellicola protettiva completa",
              "Sollevatore anteriore e posteriore di disimpegno",
              "Parabrezza termoassorbente",
              "Sistema HELE (High Emotion Low Emission)",
              "Lingua Documentazione",
              "Telecamera di parcheggio ant./post."
            ]
          }
        ]
      },
      {
        "tab": "Equipaggiamento di serie",
        "groups": [
          {
            "title": "Caratteristiche",
            "items": [
              "Side Slip Control (SSC) 5.0",
              "E-Diff con integrazione SSC",
              "Controllo trazione F1 con integrazione SSC",
              "Passo Corto Virtuale (PCV) con ruote posteriori sterzanti",
              "Servosterzo elettrico progressivo",
              "Comando integrato dinamica veicolo (Manettino Race)",
              "Sospensioni a controllo magnetoreologico (Magneride Gen 3) - gestione da manettino",
              "Impianto frenante in carboceramica (CCM4)",
              "Performance Launch Control",
              "ESC (Electronic Stability Control)",
              "ABS /EBD - Sistema frenata anti bloccaggio prestazionale con ripartitore elettronico di frenata",
              "Airbag frontali lato guida e passeggero a doppio stadio",
              "Airbag laterali a scomparsa su pannello porta per protezione testa",
              "Sistema controllo pressione e temperatura pneumatici (TPMS)",
              "Kit riparazione pneumatici con compressore",
              'Cerchi in lega da 20"',
              "Proiettori full-LED",
              "Fanali posteriori bi-corpo tondo a LED",
              "Pulsante accensione motore (Engine Start) su volante",
              "Cruise control",
              "Sensore pioggia e crepuscolare",
              "Climatizzatore bi-zona",
              "Sistema antifurto",
              "Nuova chiave con trasponder, antifurto, apertura/chiusura porte e baule, sistema keyless start",
              "Sensori di parcheggio anteriori e posteriori",
              "Specchi esterni elettrocromici, riscaldabili e ripiegabili elettricamente",
              "Specchio interno elettrocromico",
              "Sedili elettrificati 8 vie",
              "Sistema infotelematico con nuovo HMI con mappe di navigazione, porta USB su tunnel centrale, Bluetooth audio streaming",
              "Panchetta verticale posteriore ribaltabile",
              "Telo Copriauto",
              "Mantenitore di carica"
            ]
          }
        ]
      },
      {
        "tab": "Specifiche tecniche",
        "primary": [
          {
            "value": "V12 - 65\xB0",
            "unit": "",
            "label": "Gruppo propulsore"
          },
          {
            "value": "2.9",
            "unit": "sec",
            "label": "0-100 km/h"
          },
          {
            "value": "588 (800) a 8500 giri/min",
            "unit": "kW (CV)",
            "label": "Potenza massima"
          }
        ],
        "groups": [
          {
            "title": "Motore",
            "items": [
              {
                "label": "Tipo",
                "value": "V12 - 65\xB0",
                "unit": ""
              },
              {
                "label": "Cilindrata totale",
                "value": "6496",
                "unit": "cm3"
              },
              {
                "label": "Alesaggio e corsa",
                "value": "94 x 78",
                "unit": "mm"
              },
              {
                "label": "Potenza massima",
                "value": "588 (800) a 8500 giri/min",
                "unit": "kW (CV)"
              },
              {
                "label": "Coppia Massima",
                "value": "718 at 7000 rpm",
                "unit": "Nm"
              },
              {
                "label": "Regime massimo",
                "value": "8900",
                "unit": "rpm"
              },
              {
                "label": "Rapporto di compressione",
                "value": "13,6:1",
                "unit": ""
              },
              {
                "label": "Peso a secco/potenza",
                "value": "1.9",
                "unit": "kg/CV"
              },
              {
                "label": "Numero cilindri",
                "value": "12",
                "unit": ""
              },
              {
                "label": "Tipo di carburante",
                "value": "Benzina",
                "unit": ""
              }
            ]
          },
          {
            "title": "Freni",
            "items": [
              {
                "label": "Anteriori",
                "value": "398 x 38",
                "unit": "mm"
              },
              {
                "label": "Posteriori",
                "value": "360 x 32",
                "unit": "mm"
              }
            ]
          },
          {
            "title": "Dimensioni e peso",
            "items": [
              {
                "label": "Lunghezza",
                "value": "4657",
                "unit": "mm"
              },
              {
                "label": "Larghezza",
                "value": "1971",
                "unit": "mm"
              },
              {
                "label": "Altezza",
                "value": "1276",
                "unit": "mm"
              },
              {
                "label": "Passo",
                "value": "2720",
                "unit": "mm"
              },
              {
                "label": "Carreggiata anteriore",
                "value": "1672",
                "unit": "mm"
              },
              {
                "label": "Carreggiata posteriore",
                "value": "1645",
                "unit": "mm"
              },
              {
                "label": "Peso a secco",
                "value": "1525",
                "unit": "kg"
              },
              {
                "label": "Capacit\xE0 serbatoio",
                "value": "92",
                "unit": "l"
              },
              {
                "label": "Peso a vuoto in ordine di marcia",
                "value": "1630",
                "unit": "kg"
              },
              {
                "label": "Distribuzione dei pesi",
                "value": "47% Ant - 53% Post",
                "unit": ""
              }
            ]
          },
          {
            "title": "Pneumatici",
            "items": [
              {
                "label": "Anteriori",
                "value": "275/35 ZR20; 10\u201D J x 20\u201D",
                "unit": "mm ; in (pollici)"
              },
              {
                "label": "Posteriori",
                "value": "315/35 ZR20; 11.5\u201D J x 20\u201D",
                "unit": "mm ; in (pollici)"
              }
            ]
          },
          {
            "title": "Trasmissione e cambio",
            "items": [
              {
                "label": "Cambio",
                "value": "4WS/CAMBIO F1 DOPPIA FRIZIONE A 7 MARCE",
                "unit": ""
              }
            ]
          },
          {
            "title": "Controlli elettronici",
            "items": [
              {
                "label": "Controlli elettronici",
                "value": "ESP, ESC, CON SISTEMI F1-TRAC, E-DIFF 3, SCME CON DOPPIO SOLENOIDE",
                "unit": "mm"
              }
            ]
          },
          {
            "title": "Prestazioni",
            "items": [
              {
                "label": "0-100 km/h",
                "value": "2.9",
                "unit": "sec"
              },
              {
                "label": "0-200 km/h",
                "value": "7.9",
                "unit": "sec"
              },
              {
                "label": "100-0 km/h",
                "value": "32",
                "unit": "m"
              },
              {
                "label": "Velocit\xE0 massima",
                "value": "340",
                "unit": "km/h"
              }
            ]
          },
          {
            "title": "Emissioni co2",
            "items": [
              {
                "label": "Low",
                "value": "573",
                "unit": "g/km"
              },
              {
                "label": "Mid",
                "value": "345",
                "unit": "g/km"
              },
              {
                "label": "High",
                "value": "320",
                "unit": "g/km"
              },
              {
                "label": "Extra High",
                "value": "340",
                "unit": "g/km"
              },
              {
                "label": "Combinato",
                "value": "366",
                "unit": "g/km"
              }
            ]
          },
          {
            "title": "Consumi",
            "items": [
              {
                "label": "Low",
                "value": "25.2",
                "unit": "l/100km"
              },
              {
                "label": "Mid",
                "value": "15.2",
                "unit": "l/100km"
              },
              {
                "label": "High",
                "value": "14.1",
                "unit": "l/100km"
              },
              {
                "label": "Extra High",
                "value": "15",
                "unit": "l/100km"
              },
              {
                "label": "Combinato",
                "value": "16.1",
                "unit": "l/100km"
              }
            ]
          }
        ]
      },
      {
        "tab": "Nota della concessionaria",
        "groups": [
          {
            "title": "",
            "text": '- esterni: Rosso Corsa\n- interni: pelle Nera\n\n\nallestimento:\n\n- pinze freno di color Rosso Corsa\n\n- dettagli Abitacolo in pelle colorata ROSSO FERRARI\n\n- terminali di scarico in titanio\n\n- scudetti Scuderia Ferrari su parafanghi\n\n- cerchi racing da 20" forgiati di color Grigio N\xFCrburgring opaco\n\n- area guidatore in fibra di carbonio e LED su volante\n\n- cavallino ricamato su poggiatesta ROSSO\n\n- sovratappeti con logo vettura ricamato\n\n- fondo del contagiri giallo\n\n- sedili full-electric\n\n- cuciture standard di colore a richiesta ROSSO\n\n- AFS2 (Proiettori anteriori adattivi)\n\n- pellicola protettiva completa\n\n- sollevatore anteriore di disimpegno\n\n- parabrezza termoassorbente\n\n- sistema HELE (High Emotion Low Emission)\n\n- telecamera di parcheggio anteriore e posteriore'
          }
        ]
      }
    ],
    "IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D": [
      {
        "tab": "Equipaggiamenti opzionali",
        "primary": [],
        "groups": [
          {
            "title": "Esterni",
            "items": [
              "Pinze freno di color Rosso Corsa",
              "Griglia anteriore con profili cromati",
              "Scudetti Scuderia Ferrari su parafanghi",
              "Display passeggero"
            ]
          },
          {
            "title": "Interni",
            "items": [
              "Colore Dei Tappeti",
              "Cavallino ricamato su poggiatesta",
              "Fondo del contagiri in alluminio",
              "Sedili full-electric con fujnzione Memory",
              "Cuciture speciali di colore a richiesta"
            ]
          },
          {
            "title": "Tecnologia",
            "items": [
              "Sistema HELE (High Emotion Low Emission)",
              "Lingua Documentazione",
              "Sospensioni dual-mode MagneRide",
              "Specchi esterni elettrocromici",
              "Schienali posteriori ribaltabili (Ski passage)"
            ]
          }
        ]
      },
      {
        "tab": "Equipaggiamento di serie",
        "groups": [
          {
            "title": "Caratteristiche",
            "items": [
              "Airbag frontali lato guida e passeggero",
              "Airbag laterali su pannello porta per protezione testa",
              "ABS/EBD - Sistema di frenata anti-bloccaggio prestazionale con ripartitore elettronico",
              "ESC (Electronic Stability Control)",
              "Impianto frenante in carboceramico (CCM3)",
              "Differenziale elettronico di terza generazione",
              "Controllo Trazione F1 - Trac",
              "Performance Launch Control",
              "Electronic Power Steering (EPS)",
              "Comando integrato dinamica veicolo (Manettino a 3 posizioni: Comfort, Sport, ESC OFF)",
              "Cruise control",
              "Fari Full-LED",
              "Fanali posteriori a LED",
              'Cerchi in lega da 20" verniciati',
              'Quadro strumenti con RPM analagico e doppio schermo TFT da 5"',
              'Sistema infotelematico con navigazione a mappe, presa USB su tunnel centrale, schermo touch-screen da 10,25", Bluetooth audio streaming, radio DAB',
              "Climatizzatore automatico bi-zona",
              "Sensori pioggia e luci",
              "Specchi esterni riscaldabili e ripiegabili elettricamente",
              "Specchio interno elettrocromico",
              "Sensori di parcheggio anteriori e posteriori",
              "Sistema Keyless Engine Start",
              "Pulsante accensione motore (Engine Start) su volante",
              "Antifurto",
              "Kit riparazione pneumatici",
              "Mantenitore di carica",
              "Telo copriauto"
            ]
          }
        ]
      },
      {
        "tab": "Specifiche tecniche",
        "primary": [
          {
            "value": "V8 - 90\xB0",
            "unit": "",
            "label": "Gruppo propulsore"
          },
          {
            "value": "3.5",
            "unit": "sec",
            "label": "0-100 km/h"
          },
          {
            "value": "441 (600) a 7500 giri/min",
            "unit": "kW (CV)",
            "label": "Potenza massima"
          }
        ],
        "groups": [
          {
            "title": "Motore",
            "items": [
              {
                "label": "Tipo",
                "value": "V8 - 90\xB0",
                "unit": ""
              },
              {
                "label": "Cilindrata totale",
                "value": "3855",
                "unit": "cm3"
              },
              {
                "label": "Alesaggio e corsa",
                "value": "86.5 x 82",
                "unit": "mm"
              },
              {
                "label": "Potenza massima",
                "value": "441 (600) a 7500 giri/min",
                "unit": "kW (CV)"
              },
              {
                "label": "Coppia Massima",
                "value": "760 da 3000 a 5250 giri/min",
                "unit": "Nm"
              },
              {
                "label": "Regime massimo",
                "value": "7500",
                "unit": "giri/min"
              },
              {
                "label": "Rapporto di compressione",
                "value": "9.45:1",
                "unit": ""
              },
              {
                "label": "Numero cilindri",
                "value": "8",
                "unit": ""
              },
              {
                "label": "Tipo di carburante",
                "value": "Benzina",
                "unit": ""
              }
            ]
          },
          {
            "title": "Freni",
            "items": [
              {
                "label": "Anteriori Carbonceramici",
                "value": "390 x 34",
                "unit": "mm"
              },
              {
                "label": "Posteriori Carbonceramici",
                "value": "360 x 32",
                "unit": "mm"
              }
            ]
          },
          {
            "title": "Dimensioni e peso",
            "items": [
              {
                "label": "Lunghezza",
                "value": "4586",
                "unit": "mm"
              },
              {
                "label": "Larghezza",
                "value": "1938",
                "unit": "mm"
              },
              {
                "label": "Altezza",
                "value": "1318",
                "unit": "mm"
              },
              {
                "label": "Passo",
                "value": "2670",
                "unit": "mm"
              },
              {
                "label": "Carreggiata anteriore",
                "value": "1633",
                "unit": "mm"
              },
              {
                "label": "Carreggiata posteriore",
                "value": "1635",
                "unit": "mm"
              },
              {
                "label": "Peso a secco",
                "value": "1545",
                "unit": "kg"
              },
              {
                "label": "Capacit\xE0 serbatoio",
                "value": "80",
                "unit": "l"
              },
              {
                "label": "Peso a vuoto in ordine di marcia",
                "value": "1664",
                "unit": "kg"
              },
              {
                "label": "Distribuzione dei pesi",
                "value": "46-54% front/rear",
                "unit": ""
              },
              {
                "label": "Capacit\xE0 del vano baule",
                "value": "292",
                "unit": "l"
              }
            ]
          },
          {
            "title": "Pneumatici",
            "items": [
              {
                "label": "Anteriori",
                "value": "245/35 ZR20; 8J x 20\u201D",
                "unit": ""
              },
              {
                "label": "Posteriori",
                "value": "285/35 ZR20; 10J x 20\u201D",
                "unit": ""
              }
            ]
          },
          {
            "title": "Trasmissione e cambio",
            "items": [
              {
                "label": "Cambio",
                "value": "F1 doppia frizione a 7 marce",
                "unit": ""
              }
            ]
          },
          {
            "title": "Controlli elettronici",
            "items": [
              {
                "label": "Controlli elettronici",
                "value": "ESP, ESC, con sistemi F1-Trac, E-DIFF 3, SCM- E con doppio solenoide",
                "unit": ""
              }
            ]
          },
          {
            "title": "Prestazioni",
            "items": [
              {
                "label": "0-100 km/h",
                "value": "3.5",
                "unit": "sec"
              },
              {
                "label": "0-200 km/h",
                "value": "10.8",
                "unit": "sec"
              },
              {
                "label": "100-0 km/h",
                "value": "34",
                "unit": "m"
              },
              {
                "label": "Velocit\xE0 massima",
                "value": ">320",
                "unit": "km/h"
              }
            ]
          },
          {
            "title": "Emissioni co2",
            "items": [
              {
                "label": "Low",
                "value": "436",
                "unit": "g/km"
              },
              {
                "label": "Mid",
                "value": "258",
                "unit": "g/km"
              },
              {
                "label": "High",
                "value": "230",
                "unit": "g/km"
              },
              {
                "label": "Extra High",
                "value": "241",
                "unit": "g/km"
              },
              {
                "label": "Combinato",
                "value": "267",
                "unit": "g/km"
              }
            ]
          },
          {
            "title": "Consumi",
            "items": [
              {
                "label": "Low",
                "value": "19,2",
                "unit": "l/100km"
              },
              {
                "label": "Mid",
                "value": "11,3",
                "unit": "l/100km"
              },
              {
                "label": "High",
                "value": "10,1",
                "unit": "l/100km"
              },
              {
                "label": "Extra High",
                "value": "10,6",
                "unit": "l/100km"
              },
              {
                "label": "Combinato",
                "value": "11,7",
                "unit": "l/100km"
              }
            ]
          }
        ]
      },
      {
        "tab": "Nota della concessionaria",
        "groups": [
          {
            "title": "",
            "text": "- esterno: Rosso Corsa\n- interno: Nero\n\nallestimento:\n\n- pinze freno di color Rosso Corsa\n\n- griglia anteriore con profili cromati\n\n- scudetti Scuderia Ferrari su parafanghi\n\n- cavallino ricamato su poggiatesta ROSSO\n\n- fondo del contagiri in alluminio\n\n- sedili full-electric con funzione Memory\n\n- cuciture speciali di colore a richiesta FILO SPECIALE ROSSO\n\n- sistema HELE (High Emotion Low Emission)\n\n- sospensioni dual-mode MagneRide\n\n- specchi esterni elettrocromici\n\n- schienali posteriori ribaltabili (Ski passage)\n\n"
          }
        ]
      }
    ]
  };
  function parse5(element, { document }) {
    var _a, _b, _c, _d, _e, _f, _g;
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const el = (tag, text) => {
      const e = document.createElement(tag);
      if (text != null) e.textContent = text;
      return e;
    };
    const row = (tab, title, ...content) => [
      tab ? hinted("tab", tab) : "",
      title ? hinted("title", title) : "",
      content.length ? hinted("content", ...content) : ""
    ];
    let data = {};
    try {
      data = nextData5(document).props.pageProps;
    } catch (e) {
    }
    const ad = ((_c = (_b = (_a = data.initialProps) == null ? void 0 : _a.adDetailsData) == null ? void 0 : _b.ads) == null ? void 0 : _c[0]) || {};
    const labels = {};
    (((_d = data.initialState) == null ? void 0 : _d.channelVariables) || []).filter((v) => v.id === "labels").forEach((v) => String(v.content).split("\n").forEach((l) => {
      const i = l.indexOf("=");
      if (i > 0) labels[l.slice(0, i).trim()] = l.slice(i + 1).trim();
    }));
    const specItem = (strongText, rest, emText) => {
      const li = el("li");
      li.append(el("strong", strongText));
      if (rest) li.append(` ${rest}`);
      if (emText) {
        li.append(" ");
        li.append(el("em", emText));
      }
      return li;
    };
    const list = (items) => {
      const ul = el("ul");
      items.forEach((it) => {
        if (typeof it === "string") ul.append(el("li", it));
        else ul.append(specItem(it.label, [it.value, it.unit].filter(Boolean).join(" ")));
      });
      return ul;
    };
    if (/Accordion__accordion/.test(element.className || "")) {
      const tab = clean3((_e = element.querySelector('[class*="Accordion__title"]')) == null ? void 0 : _e.textContent);
      const cells2 = [];
      element.querySelectorAll('ul[class*="AccordionConsumption__list"]').forEach((list2) => {
        var _a2;
        const title = clean3((_a2 = list2.parentElement.querySelector('[class*="Title__title"]')) == null ? void 0 : _a2.textContent);
        const ul = el("ul");
        list2.querySelectorAll(":scope > li").forEach((li) => {
          const strong = li.querySelector("strong");
          const value = clean3([...li.childNodes].filter((n) => n !== strong).map((n) => n.textContent).join(" "));
          ul.append(specItem(clean3(strong == null ? void 0 : strong.textContent), value));
        });
        cells2.push(row(tab, title, ul));
      });
      const disclaimer = clean3((_f = element.querySelector('[class*="AccordionConsumption__grade"] [class*="Text__body"], [class*="Text__body"]')) == null ? void 0 : _f.textContent);
      if (disclaimer) cells2.push(row(tab, "", el("p", disclaimer)));
      if (!cells2.length) {
        element.remove();
        return;
      }
      element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-details (consumption)", cells: cells2 }));
      return;
    }
    let tabs = SNAPSHOT2[ad.id];
    if (!tabs) {
      const selected = clean3((_g = element.querySelector('[class*="TabsUnderline__-selected"], [class*="TabsUnderline__button"]')) == null ? void 0 : _g.textContent);
      tabs = [{
        tab: selected,
        groups: [...element.querySelectorAll('[class*="Accordion__accordion"]')].map((acc) => {
          var _a2;
          return {
            title: clean3((_a2 = acc.querySelector('[class*="Accordion__title"]')) == null ? void 0 : _a2.textContent),
            items: [...acc.querySelectorAll('[class*="Accordion__body"] li')].map((li) => clean3(li.textContent))
          };
        })
      }];
    }
    const cells = [];
    tabs.forEach((t) => {
      if (t.primary && t.primary.length) {
        const ul = el("ul");
        t.primary.forEach((p) => ul.append(specItem(p.value, p.unit, p.label)));
        cells.push(row(t.tab, "", ul));
      }
      t.groups.forEach((g) => {
        if (g.text != null) {
          const text = clean3(g.text);
          if (text) cells.push(row(t.tab, g.title, el("p", text)));
          return;
        }
        const content = [list(g.items)];
        if (t.groups.length === 1 && g.items.length > 12 && labels["ad.standard_equipment.view_all_features"]) {
          content.push(el("p", labels["ad.standard_equipment.view_all_features"]));
        }
        cells.push(row(t.tab, g.title, ...content));
      });
    });
    if (!cells.length) {
      element.remove();
      return;
    }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "vehicle-details", cells }));
  }

  // tools/importer/parsers/dealer-card.js
  function nextData6(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  function enquiryUrl2(document) {
    var _a;
    const slug = "new-enquiry-usato-preowned";
    let base = "https://forms.ferrari.com/content/forms/af/ferrari/af/fcom/generic-r.html";
    try {
      const vars = nextData6(document).props.pageProps.initialState.channelVariables;
      const v = vars.find((x) => x.id === slug);
      if ((_a = v == null ? void 0 : v.content) == null ? void 0 : _a.url) base = v.content.url.trim();
    } catch (e) {
    }
    const lang = (document.documentElement.getAttribute("lang") || "it").slice(0, 2).toLowerCase();
    const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
    url.searchParams.set("form-slug", slug);
    return url.href;
  }
  function parse6(element, { document }) {
    var _a, _b;
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name2, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name2} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const el = (tag, text2) => {
      const e = document.createElement(tag);
      if (text2 != null) e.textContent = text2;
      return e;
    };
    const photo = element.querySelector('[class*="DealerFullInfo__image"] img');
    let img = null;
    if (photo) {
      img = el("img");
      img.setAttribute("src", (photo.getAttribute("src") || "").replace(/^\/\//, "https://"));
      img.setAttribute("alt", photo.getAttribute("alt") || "");
    }
    const text = [];
    const type = clean3((_a = element.querySelector('[class*="DealerFullInfo__type"]')) == null ? void 0 : _a.textContent);
    if (type) text.push(el("p", type));
    const name = clean3((_b = element.querySelector('[class*="DealerFullInfo__name"]')) == null ? void 0 : _b.textContent);
    if (name) text.push(el("h2", name));
    element.querySelectorAll('dl[class*="DealerFullInfo__list"]').forEach((dl) => {
      var _a2;
      const title = clean3((_a2 = dl.querySelector("dt")) == null ? void 0 : _a2.textContent);
      if (title) text.push(el("h3", title));
      const ul = el("ul");
      dl.querySelectorAll("dd").forEach((dd) => {
        const li = el("li");
        const a = dd.querySelector("a[href]");
        const strong = dd.querySelector("strong");
        if (a) {
          const link2 = el("a", clean3(a.textContent));
          link2.setAttribute("href", a.getAttribute("href"));
          li.append(link2);
        } else if (strong) {
          li.append(el("strong", clean3(strong.textContent)));
          const rest = clean3([...dd.childNodes].filter((n) => n !== strong).map((n) => n.textContent).join(" "));
          if (rest) li.append(` ${rest}`);
        } else li.textContent = clean3(dd.textContent);
        if (clean3(li.textContent)) ul.append(li);
      });
      if (ul.children.length) text.push(ul);
    });
    element.querySelectorAll('[class*="DealerFullInfo__links"] li').forEach((li) => {
      var _a2;
      const a = li.querySelector("a[href]");
      const button = li.querySelector("button");
      const label = clean3((_a2 = a || button) == null ? void 0 : _a2.textContent);
      if (!label) return;
      const p = el("p");
      const link2 = el("a", label);
      link2.setAttribute("href", a ? a.getAttribute("href") : enquiryUrl2(document));
      p.append(link2);
      text.push(p);
    });
    const cells = [[img ? hinted("image", img) : ""], [text.length ? hinted("text", ...text) : ""]];
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "dealer-card", cells }));
  }

  // tools/importer/parsers/cards-accessory.js
  function nextData7(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  var imageUrl = (id) => `https://cdn.ferrari.com/cms/dws/media/ntw/img/resize/${id.replace(/\|/g, "%257C")}?bucket=genuine&width=500&height=500`;
  function parse7(element, { document }) {
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(n));
      return frag;
    };
    const el = (tag, text) => {
      const e = document.createElement(tag);
      if (text != null) e.textContent = text;
      return e;
    };
    const card = (src, category, name) => {
      const img = el("img");
      img.setAttribute("src", src);
      img.setAttribute("alt", name);
      const text = [];
      if (category) text.push(el("p", category));
      if (name) text.push(el("h3", name));
      return [hinted("image", img), text.length ? hinted("text", ...text) : ""];
    };
    let cells = [];
    try {
      const ad = nextData7(document).props.pageProps.initialProps.adDetailsData.ads[0];
      cells = (ad.genuineAccessories || []).filter((a) => {
        var _a, _b;
        return a.visible !== false && ((_b = (_a = a.image) == null ? void 0 : _a.landscapeBig) == null ? void 0 : _b.id);
      }).map((a) => card(imageUrl(a.image.landscapeBig.id), clean3(a.category), clean3(a.name)));
    } catch (e) {
    }
    if (!cells.length) {
      cells = [...element.querySelectorAll('[class*="Tile__tile"]')].map((tile) => {
        var _a, _b, _c;
        const src = (_a = tile.querySelector("img")) == null ? void 0 : _a.getAttribute("src");
        return src ? card(src.replace(/\|/g, "%257C"), clean3((_b = tile.querySelector('[class*="Tile__pre-title"]')) == null ? void 0 : _b.textContent), clean3((_c = tile.querySelector('[class*="Tile__title"]')) == null ? void 0 : _c.textContent)) : null;
      }).filter(Boolean);
    }
    if (!cells.length) {
      element.remove();
      return;
    }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "cards-accessory", cells }));
  }

  // tools/importer/parsers/cards-car-listing.js
  function parse8(element, { document }) {
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const hinted = (name, ...nodes) => {
      const frag = document.createDocumentFragment();
      frag.appendChild(document.createComment(` field:${name} `));
      nodes.forEach((n) => frag.appendChild(typeof n === "string" ? document.createTextNode(n) : n));
      return frag;
    };
    const textOf = (root, sel) => {
      const el = root.querySelector(sel);
      return el ? clean3(el.textContent) : "";
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
      const badges = [...card.querySelectorAll('[class*="VehicleCard__labelText"]')].map((el) => clean3(el.textContent)).filter(Boolean);
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
        const priceLabel = label ? clean3(label.textContent) : "";
        nodes.push(para(priceLabel ? `${priceLabel}: ${price}` : price));
        priceBox.querySelectorAll('[class*="VehicleCard__taxes"] > div').forEach((row) => {
          const l = textOf(row, '[class*="specItem__label"]');
          const v = textOf(row, '[class*="specItem__value"]');
          if (l || v) nodes.push(para(l ? `${l}: ${v}` : v));
        });
        const vat = textOf(card, '[class*="VehicleCard__specsHead__priceVat"]');
        if (vat) nodes.push(para(vat));
        const financing = card.querySelector('[class*="VehicleCard__specsHead__priceFinancing"] a[href]');
        if (financing && clean3(financing.textContent)) {
          const p = document.createElement("p");
          const a = document.createElement("a");
          a.setAttribute("href", financing.getAttribute("href"));
          a.textContent = clean3(financing.textContent);
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
        const ctaTexts = ctaBox ? [...ctaBox.querySelectorAll('[class*="BtnCta__text"]')].map((t) => clean3(t.textContent)).filter(Boolean) : [];
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
      const link2 = banner.querySelector("a[href]");
      if (link2 && clean3(link2.textContent)) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.setAttribute("href", link2.getAttribute("href"));
        a.textContent = clean3(link2.textContent);
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

  // tools/importer/parsers/hero-banner.js
  function parse9(element, { document }) {
    var _a, _b;
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
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
      const title = clean3((_a = element.querySelector('[class*="HeroLogoText__title"]')) == null ? void 0 : _a.textContent);
      if (title) {
        const h = document.createElement("h2");
        h.textContent = title;
        nodes2.push(h);
      }
      const textEl = element.querySelector('[class*="HeroLogoText__text"]');
      if (textEl) {
        const blocks = [...textEl.querySelectorAll("div, p")].filter((el) => !el.querySelector("div, p"));
        const texts = (blocks.length ? blocks : [textEl]).map((el) => clean3(el.textContent)).filter(Boolean);
        texts.forEach((t) => {
          const p = document.createElement("p");
          p.textContent = t;
          nodes2.push(p);
        });
      }
      const cta = element.querySelector('[class*="HeroLogoText__ctaWrapper"] a[href]');
      const ctaText = cta ? clean3(((_b = cta.querySelector('[class*="BtnAction__text"]')) == null ? void 0 : _b.textContent) || cta.textContent) : "";
      if (ctaText) {
        const p = document.createElement("p");
        const em = document.createElement("em");
        const a = document.createElement("a");
        a.setAttribute("href", cta.getAttribute("href"));
        a.textContent = ctaText;
        em.append(a);
        p.append(em);
        nodes2.push(p);
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
    if (eyebrow && clean3(eyebrow.textContent)) {
      const p = document.createElement("p");
      p.textContent = clean3(eyebrow.textContent);
      nodes.push(p);
    }
    const h1 = content.querySelector("h1");
    if (h1 && clean3(h1.textContent)) {
      const h = document.createElement("h1");
      h.textContent = clean3(h1.textContent);
      nodes.push(h);
    }
    content.querySelectorAll("h2, h3, p").forEach((el) => {
      const text = clean3(el.textContent);
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

  // tools/importer/parsers/columns.js
  function parse10(element, { document }) {
    const clean3 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
    const cols = [...element.querySelectorAll(':scope > [class*="ParagraphGrid__item"]')].map((item) => {
      var _a, _b;
      const frag = document.createDocumentFragment();
      const title = clean3((_a = item.querySelector('[class*="ParagraphGrid__item--title"], h3')) == null ? void 0 : _a.textContent);
      if (title) {
        const h = document.createElement("h3");
        h.textContent = title;
        frag.append(h);
      }
      const desc = clean3((_b = item.querySelector('[class*="ParagraphGrid__description"]')) == null ? void 0 : _b.textContent);
      if (desc) {
        const p = document.createElement("p");
        p.textContent = desc;
        frag.append(p);
      }
      return frag;
    });
    if (!cols.length) {
      element.remove();
      return;
    }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: "columns", cells: [cols] }));
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
      links.forEach((link2) => {
        const labelEl = link2.querySelector('[class*="BtnAction__text"]') || link2;
        const label = (labelEl.textContent || link2.getAttribute("title") || "").replace(/\s+/g, " ").trim();
        if (!label) return;
        const p = document.createElement("p");
        const em = document.createElement("em");
        const a = document.createElement("a");
        a.setAttribute("href", link2.getAttribute("href"));
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

  // tools/importer/transformers/ferrari-preowned-vehicle.js
  function nextData8(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  var BACK_HREF = "https://preowned.ferrari.com/it-IT/r/europa/usato-ferrari/italia/rfc";
  var ENQUIRY_SLUG = "new-enquiry-usato-preowned";
  var ENQUIRY_FALLBACK = "https://forms.ferrari.com/content/forms/af/ferrari/af/fcom/generic-r.html";
  function enquiryUrl3(document) {
    var _a, _b, _c, _d;
    let base = ENQUIRY_FALLBACK;
    try {
      const data = nextData8(document);
      const v = (((_c = (_b = (_a = data.props) == null ? void 0 : _a.pageProps) == null ? void 0 : _b.initialState) == null ? void 0 : _c.channelVariables) || []).find((x) => x.id === ENQUIRY_SLUG);
      if ((_d = v == null ? void 0 : v.content) == null ? void 0 : _d.url) base = v.content.url.trim();
    } catch (e) {
    }
    const lang = (document.documentElement.getAttribute("lang") || "it").slice(0, 2).toLowerCase();
    const url = new URL(base.replace(/(\.[a-z]{2})?\.html$/, `.${lang}.html`));
    url.searchParams.set("form-slug", ENQUIRY_SLUG);
    return url.href;
  }
  function link(document, href, text) {
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.setAttribute("href", href);
    a.textContent = text;
    p.append(a);
    return p;
  }
  var clean2 = (s) => (s || "").replace(/ /g, " ").replace(/\s+/g, " ").trim();
  function transform4(hookName, element, payload) {
    if (hookName !== "beforeTransform") return;
    const { document } = payload;
    if (!element.querySelector('section[class*="HeroCarAD__wrapper"]')) return;
    WebImporter.DOMUtils.remove(element, [
      '[class*="HeroCarAD__photo"]',
      '[class*="HeroCarAD__sticky"]',
      '[class*="ADBookmarkBtn"]',
      '[class*="VehicleCard__bookmark"]'
    ]);
    const back = element.querySelector('[class*="HeroCarAD__navigation"]');
    if (back) back.replaceWith(link(document, BACK_HREF, clean2(back.textContent) || "Torna alle vetture"));
    const form = enquiryUrl3(document);
    element.querySelectorAll('button[class*="HeroCarAD__enquire"], [class*="DealerFullInfo__links"] button').forEach((button) => {
      const a = document.createElement("a");
      a.setAttribute("href", form);
      a.textContent = clean2(button.textContent);
      button.replaceWith(a);
    });
    const related = element.querySelector('[class*="ADRelated__wrapper"]');
    if (related) {
      const title = related.querySelector('[class*="ADRelated__title"]');
      if (title) {
        const h2 = document.createElement("h2");
        h2.textContent = clean2(title.textContent);
        title.replaceWith(h2);
      }
      const all = related.querySelector('[class*="Carousel__pagination-link"] a[href]');
      const carousel = related.querySelector('[class*="VehicleCarousel__wrapper"]');
      if (all && carousel) carousel.after(link(document, all.getAttribute("href"), clean2(all.textContent)));
      if (all) all.closest('[class*="Carousel__pagination-link"]').remove();
    }
    const cta = element.querySelector('[class*="ParagraphGrid__ctaWrapper"] a[href]');
    if (cta) cta.closest('[class*="ParagraphGrid__ctaWrapper"]').replaceWith(link(document, cta.getAttribute("href"), clean2(cta.textContent)));
    element.querySelectorAll('[class*="ParagraphGrid__title"]').forEach((t) => {
      const h2 = document.createElement("h2");
      h2.textContent = clean2(t.textContent);
      t.replaceWith(h2);
    });
  }

  // tools/importer/transformers/ferrari-preowned-links.js
  var migratedPaths = [
    "/",
    "/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D",
    "/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D",
    "/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D",
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
  var adPaths = {
    "/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/812-gts/264983",
    "/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/812-superfast/244721",
    "/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D": "/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/251533"
  };
  var SOURCE_HOST = "preowned.ferrari.com";
  var LOCALE_PREFIX = /^\/it-IT(?=\/|$)/i;
  var MIGRATED = new Set(migratedPaths.map((p) => p.toLowerCase()));
  var sanitizeSegment = (s) => decodeURIComponent(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  var pagePath = (local) => local === "/" ? "/" : `/${local.split("/").filter(Boolean).map(sanitizeSegment).join("/")}`;
  function toMigratedPath(path) {
    const local = path.replace(LOCALE_PREFIX, "").replace(/\/$/, "") || "/";
    if (adPaths[local]) return adPaths[local];
    if (/^\/ferrari-approved\/share\//i.test(local)) return "/ferrari-approved";
    return MIGRATED.has(local.toLowerCase()) ? pagePath(local) : null;
  }
  function toLiveUrl(u) {
    const live = new URL(u.href);
    if (!LOCALE_PREFIX.test(live.pathname)) live.pathname = `/it-IT${live.pathname === "/" ? "" : live.pathname}`;
    return live.href;
  }
  function transform5(hookName, element, payload) {
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

  // tools/importer/import-vehicle-detail.js
  function nextData9(document) {
    try {
      const s = document.getElementById("__NEXT_DATA__");
      if (s) return JSON.parse(s.textContent);
    } catch (e) {
    }
    return typeof window !== "undefined" && window.__NEXT_DATA__ || {};
  }
  var PAGE_TEMPLATE = {
    "name": "vehicle-detail",
    "urls": [
      "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/812-gts/IljixbcgVnJGsKsQfDGsrpHUFx%2F7vEAuVIMGbLb8sD24YK%2FU3P5Vh8W9YLoU%2BSkLuIYTFSHG%2FxZEuEH%2BsfH5Ahy37ulmL38WaDWGFrxIGQ%3D%3D",
      "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/812-superfast/IljixbcgVnJGsKsQfDGsrkiIVRSF276pjIQmXsLES1Di%2BINvHn8uHNCVXGmyL2VouIYTFCXG%2FxZEuEH%2Bs%2FH3CB637ulnL30YaD6HHLhNEw%3D%3D",
      "https://preowned.ferrari.com/it-IT/a/europa/usato-ferrari/italia/gto-motors/ferrari-portofino/IljixbcgVnJGsKsQfDGsrr0PHybHs2emaMHOcg0rBWJrycRqjlroCNWMD4H7s1UauIYTFC%2FD4hZEuEH%2BsvT1CRy37ulnJXoeYD6DEbhJGA%3D%3D"
    ],
    "coverageGaps": [],
    "description": "Vehicle ad: photo gallery and summary over a dark hero, key data, 360\xB0 viewer, equipment/spec tabs, consumption, dealer card, accessories carousel, related cars, model banner and Ferrari Approved band",
    "blocks": [
      {
        "name": "vehicle-gallery",
        "instances": [
          'section[class*="HeroCarAD__wrapper"] [class*="GridImages__center-content"]'
        ]
      },
      {
        "name": "vehicle-summary",
        "instances": [
          'section[class*="HeroCarAD__wrapper"] > [class*="HeroCarAD__content"]'
        ]
      },
      {
        "name": "vehicle-specs",
        "instances": [
          '[class*="ADOverview__wrapper"] [class*="OverviewData__list"]'
        ]
      },
      {
        "name": "vehicle-360",
        "instances": [
          '[class*="ADHotspotPlayer__wrapper"]'
        ]
      },
      {
        "name": "vehicle-details",
        "instances": [
          '[class*="TabCarADDetails__wrapper"]',
          '[class*="AccordionConsumption__wrapper"] [class*="Accordion__accordion"]'
        ]
      },
      {
        "name": "dealer-card",
        "instances": [
          '[class*="DealerFullInfo__container"]'
        ]
      },
      {
        "name": "cards-accessory",
        "instances": [
          '[class*="AccessoriesCarousel__wrapper"] [class*="SquareImgCarousel__wrapper"]'
        ]
      },
      {
        "name": "cards-car-listing",
        "instances": [
          '[class*="ADRelated__wrapper"] [class*="VehicleCarousel__wrapper"]'
        ]
      },
      {
        "name": "hero-banner",
        "instances": [
          '[class*="ADRelatedBanner__wrapper"] [class*="HeroLogoText__wrapper"]'
        ]
      },
      {
        "name": "columns",
        "instances": [
          '[class*="ParagraphGrid__row"]'
        ]
      }
    ],
    "sections": [
      {
        "id": "section-1",
        "name": "Vehicle hero (gallery + summary)",
        "selector": [
          'section[class*="HeroCarAD__wrapper"]'
        ],
        "style": "vehicle-hero",
        "blocks": [
          "vehicle-gallery",
          "vehicle-summary"
        ],
        "defaultContent": [
          '[class*="HeroCarAD__navigation"]'
        ]
      },
      {
        "id": "section-2",
        "name": "Overview (Panoramica)",
        "selector": [
          '[class*="ADOverview__wrapper"]'
        ],
        "style": null,
        "blocks": [
          "vehicle-specs"
        ],
        "defaultContent": [
          '[class*="OverviewData__title"]'
        ]
      },
      {
        "id": "section-3",
        "name": "360 viewer",
        "selector": [
          '[class*="ADHotspotPlayer__wrapper"]'
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
          '[class*="TabCarADDetails__wrapper"]'
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
          '[class*="AccordionConsumption__wrapper"]'
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
          '[class*="AccessoriesCarousel__wrapper"]'
        ],
        "style": "dark",
        "blocks": [
          "cards-accessory"
        ],
        "defaultContent": [
          '[class*="AccessoriesCarousel__title"]'
        ]
      },
      {
        "id": "section-8",
        "name": "Other cars at the dealer",
        "selector": [
          '[class*="ADRelated__wrapper"]'
        ],
        "style": "related",
        "blocks": [
          "cards-car-listing"
        ],
        "defaultContent": [
          '[class*="ADRelated__title"]',
          '[class*="Carousel__pagination-link"]'
        ]
      },
      {
        "id": "section-9",
        "name": "Model banner",
        "selector": [
          '[class*="ADRelatedBanner__wrapper"]'
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
          '[class*="ParagraphGrid__wrapper"]'
        ],
        "style": "dark",
        "blocks": [
          "columns"
        ],
        "defaultContent": [
          '[class*="ParagraphGrid__title"]',
          '[class*="ParagraphGrid__ctaWrapper"]'
        ]
      }
    ]
  };
  var parsers = {
    "vehicle-gallery": parse,
    "vehicle-summary": parse2,
    "vehicle-specs": parse3,
    "vehicle-360": parse4,
    "vehicle-details": parse5,
    "dealer-card": parse6,
    "cards-accessory": parse7,
    "cards-car-listing": parse8,
    "hero-banner": parse9,
    "columns": parse10
  };
  var transformers = [transform, transform2, transform3, transform4, transform5];
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
  var import_vehicle_detail_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      let chassis = "";
      try {
        const ad = nextData9(document).props.pageProps.initialProps.adDetailsData.ads[0];
        chassis = String(ad.chassis || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
      } catch (e) {
      }
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
      let rawPath = new URL(params.originalURL).pathname.replace(/^\/it-IT(?=\/|$)/i, "").replace(/\/$/, "").replace(/\.html?$/, "");
      if (chassis) rawPath = `${rawPath.split("/").slice(0, -1).join("/")}/${chassis}`;
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: { title: document.title, template: PAGE_TEMPLATE.name, blocks: pageBlocks.map((b) => b.name) }
      }];
    }
  };
  return __toCommonJS(import_vehicle_detail_exports);
})();
