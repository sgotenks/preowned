/* eslint-disable */
/* global WebImporter */

/**
 * Parser for link-directory. Base: custom.
 * Source: https://preowned.ferrari.com/it-IT/r/... (results listings)
 * Selector: [class*="SearchHints__wrapper"]
 * Model (xwalk): container link-directory; item link-directory-group -> title, links, showAllLabel.
 * One row per group: title | links (list) | "show all" label.
 * The source shows 12 links and fetches the rest when "Mostra tutti" is clicked, so the full
 * lists come from a crawled snapshot (tools/importer/scripts/hints-crawl.js + gen-data.js);
 * pages missing from the snapshot, or whose group titles changed, fall back to the DOM links.
 */

// BEGIN link-directory-snapshot
const SNAPSHOT_DATE = '2026-11-08';
const SNAPSHOT = {
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
// END link-directory-snapshot

export default function parse(element, { document, url, params }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();

  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };

  const candidates = [params && params.originalURL, url, document.defaultView && document.defaultView.location.href];
  let snapshot = null;
  candidates.some((candidate) => {
    try {
      snapshot = SNAPSHOT[new URL(candidate).pathname.replace(/\/$/, '')] || null;
    } catch (e) { /* not a URL */ }
    return snapshot;
  });

  const blocks = [...element.querySelectorAll('[class*="SearchHints__block"]')];
  const cells = [];
  blocks.forEach((blockEl, i) => {
    const title = clean(blockEl.querySelector('[class*="SearchHints__title"]')?.textContent);
    const snap = snapshot && snapshot[i] && clean(snapshot[i].title) === title ? snapshot[i] : null;
    const links = snap
      ? snap.links
      : [...blockEl.querySelectorAll('li a')].map((a) => [clean(a.textContent), a.getAttribute('href')]);
    if (!links.length) return;

    const ul = document.createElement('ul');
    links.forEach(([text, href]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', href);
      a.textContent = text;
      li.appendChild(a);
      ul.appendChild(li);
    });
    const showAll = clean(blockEl.querySelector('[class*="SearchHints__cta"]')?.textContent);
    cells.push([
      title ? hinted('title', title) : '',
      hinted('links', ul),
      showAll && links.length > 12 ? hinted('showAllLabel', showAll) : '',
    ]);
  });

  if (!cells.length) {
    element.remove();
    return;
  }
  const block = WebImporter.Blocks.createBlock(document, { name: 'link-directory', cells });
  element.replaceWith(block);
}
