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

/**
 * Parser for vehicle-details. Base: tabs / accordion (container).
 * Source: vehicle ad pages, https://preowned.ferrari.com/it-IT/a/...
 * Selectors:
 *   [class*="TabCarADDetails__wrapper"] -> vehicle-details (the four equipment / spec / notes tabs)
 *   [class*="AccordionConsumption__wrapper"] [class*="Accordion__accordion"] -> vehicle-details (consumption)
 * Model (xwalk): container vehicle-details; item vehicle-details-group -> tab, title, content.
 * One row per group: tab label | group title | content, where content is
 *   - a list of equipment items, or of "<strong>Label</strong> value unit" spec rows
 *   - the key figures row of the specs tab: "<strong>value</strong> unit <em>label</em>" items
 *   - a paragraph (dealer notes, consumption disclaimer)
 * The page renders only the selected tab, so the tabs come from the crawled snapshot below
 * (ads-crawl.js + gen-data.js); without a snapshot entry only the rendered tab is imported.
 */

// BEGIN vehicle-details-snapshot
// crawled 2026-11-08
const SNAPSHOT = {
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
      "Cerchi da 20\" forgiati diamantati"
     ]
    },
    {
     "title": "Interni",
     "items": [
      "Zona centrale sedili in Alcantara®",
      "Medaglione centrale pannello porta in Alcantara®",
      "Tappeti abitacolo in Alcantara®",
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
      "20\" alloy wheels",
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
     "value": "V12 - 65°",
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
       "value": "V12 - 65°",
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
       "label": "Capacità serbatoio",
       "value": "92",
       "unit": "l"
      },
      {
       "label": "Distribuzione dei pesi",
       "value": "47% Ant - 53% Post",
       "unit": ""
      },
      {
       "label": "Capacità del vano baule",
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
       "value": "275/35 ZR 20\" 10” J",
       "unit": "mm ; in (pollici)"
      },
      {
       "label": "Posteriori",
       "value": "315/35 ZR20; 11.5” J x 20”",
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
       "label": "Velocità massima",
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
     "text": "- esterni: Grigio GTS\n- interni: pelle/alcantara Cioccolato\n\n\nallestimento:\n\n- cronologia service completa (GTO Motors)\n\n- pinze freno di color nero lucido\n\n- battitacco esterno in fibra di carbonio\n\n- scudetti Scuderia Ferrari su parafanghi\n\n- colori speciali extracampionario GRIGIO GTS\n\n- cerchi da 20\" forgiati diamantati\n\n- zona centrale sedili in Alcantara CIOCCOLATO\n\n- medaglione centrale pannello porta in Alcantara CIOCCOLATO\n\n- tappeti abitacolo in Alcantara CIOCCOLATO\n\n- anelli Neri Bocchette Plancia\n\n- maniglioni Interni In carbonio\n\n- area guidatore in fibra di carbonio e LED su volante\n\n- consolle centrale in fibra di carbonio\n\n- tunnel centrale in pelle di un colore su richiesta CIOCCOLATO\n\n- inserti plancia in fibra di carbonio\n\n- fondo del contagiri giallo\n\n- sedili full-electric\n\n- AFS2 (Proiettori anteriori adattivi)\n\n- sollevatore anteriore di disimpegno\n\n- parabrezza termoassorbente\n\n- surround view"
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
      "Cerchi racing da 20\" forgiati di color Grigio Nürburgring opaco"
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
      "Cerchi in lega da 20\"",
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
     "value": "V12 - 65°",
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
       "value": "V12 - 65°",
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
       "label": "Capacità serbatoio",
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
       "value": "275/35 ZR20; 10” J x 20”",
       "unit": "mm ; in (pollici)"
      },
      {
       "label": "Posteriori",
       "value": "315/35 ZR20; 11.5” J x 20”",
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
       "label": "Velocità massima",
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
     "text": "- esterni: Rosso Corsa\n- interni: pelle Nera\n\n\nallestimento:\n\n- pinze freno di color Rosso Corsa\n\n- dettagli Abitacolo in pelle colorata ROSSO FERRARI\n\n- terminali di scarico in titanio\n\n- scudetti Scuderia Ferrari su parafanghi\n\n- cerchi racing da 20\" forgiati di color Grigio Nürburgring opaco\n\n- area guidatore in fibra di carbonio e LED su volante\n\n- cavallino ricamato su poggiatesta ROSSO\n\n- sovratappeti con logo vettura ricamato\n\n- fondo del contagiri giallo\n\n- sedili full-electric\n\n- cuciture standard di colore a richiesta ROSSO\n\n- AFS2 (Proiettori anteriori adattivi)\n\n- pellicola protettiva completa\n\n- sollevatore anteriore di disimpegno\n\n- parabrezza termoassorbente\n\n- sistema HELE (High Emotion Low Emission)\n\n- telecamera di parcheggio anteriore e posteriore"
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
      "Cerchi in lega da 20\" verniciati",
      "Quadro strumenti con RPM analagico e doppio schermo TFT da 5\"",
      "Sistema infotelematico con navigazione a mappe, presa USB su tunnel centrale, schermo touch-screen da 10,25\", Bluetooth audio streaming, radio DAB",
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
     "value": "V8 - 90°",
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
       "value": "V8 - 90°",
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
       "label": "Capacità serbatoio",
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
       "label": "Capacità del vano baule",
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
       "value": "245/35 ZR20; 8J x 20”",
       "unit": ""
      },
      {
       "label": "Posteriori",
       "value": "285/35 ZR20; 10J x 20”",
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
       "label": "Velocità massima",
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
// END vehicle-details-snapshot

export default function parse(element, { document }) {
  const clean = (s) => (s || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim();
  const hinted = (name, ...nodes) => {
    const frag = document.createDocumentFragment();
    frag.appendChild(document.createComment(` field:${name} `));
    nodes.forEach((n) => frag.appendChild(typeof n === 'string' ? document.createTextNode(n) : n));
    return frag;
  };
  const el = (tag, text) => { const e = document.createElement(tag); if (text != null) e.textContent = text; return e; };
  const row = (tab, title, ...content) => [
    tab ? hinted('tab', tab) : '',
    title ? hinted('title', title) : '',
    content.length ? hinted('content', ...content) : '',
  ];

  let data = {};
  try { data = nextData(document).props.pageProps; } catch (e) { /* none */ }
  const ad = data.initialProps?.adDetailsData?.ads?.[0] || {};
  const labels = {};
  (data.initialState?.channelVariables || []).filter((v) => v.id === 'labels').forEach((v) => String(v.content).split('\n').forEach((l) => {
    const i = l.indexOf('=');
    if (i > 0) labels[l.slice(0, i).trim()] = l.slice(i + 1).trim();
  }));

  // "<strong>label</strong> value unit" (spec row) or "<strong>value</strong> unit <em>label</em>" (key figure)
  const specItem = (strongText, rest, emText) => {
    const li = el('li');
    li.append(el('strong', strongText));
    if (rest) li.append(` ${rest}`);
    if (emText) { li.append(' '); li.append(el('em', emText)); }
    return li;
  };
  const list = (items) => {
    const ul = el('ul');
    items.forEach((it) => {
      if (typeof it === 'string') ul.append(el('li', it));
      else ul.append(specItem(it.label, [it.value, it.unit].filter(Boolean).join(' ')));
    });
    return ul;
  };

  // Consumption and emissions: one accordion, sub-tables, disclaimer
  if (/Accordion__accordion/.test(element.className || '')) {
    const tab = clean(element.querySelector('[class*="Accordion__title"]')?.textContent);
    const cells = [];
    // each sub-table: <div><h3>Consumi</h3><ul><li><strong>Low</strong><span>25.8l/100km</span></li>…</ul></div>
    element.querySelectorAll('ul[class*="AccordionConsumption__list"]').forEach((list) => {
      const title = clean(list.parentElement.querySelector('[class*="Title__title"]')?.textContent);
      const ul = el('ul');
      list.querySelectorAll(':scope > li').forEach((li) => {
        // value: everything but the <strong> label (spans may already be unwrapped by the importer)
        const strong = li.querySelector('strong');
        const value = clean([...li.childNodes].filter((n) => n !== strong).map((n) => n.textContent).join(' '));
        ul.append(specItem(clean(strong?.textContent), value));
      });
      cells.push(row(tab, title, ul));
    });
    const disclaimer = clean(element.querySelector('[class*="AccordionConsumption__grade"] [class*="Text__body"], [class*="Text__body"]')?.textContent);
    if (disclaimer) cells.push(row(tab, '', el('p', disclaimer)));
    if (!cells.length) { element.remove(); return; }
    element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-details (consumption)', cells }));
    return;
  }

  // Equipment / specs / notes tabs
  let tabs = SNAPSHOT[ad.id];
  if (!tabs) {
    const selected = clean(element.querySelector('[class*="TabsUnderline__-selected"], [class*="TabsUnderline__button"]')?.textContent);
    tabs = [{
      tab: selected,
      groups: [...element.querySelectorAll('[class*="Accordion__accordion"]')].map((acc) => ({
        title: clean(acc.querySelector('[class*="Accordion__title"]')?.textContent),
        items: [...acc.querySelectorAll('[class*="Accordion__body"] li')].map((li) => clean(li.textContent)),
      })),
    }];
  }
  const cells = [];
  tabs.forEach((t) => {
    if (t.primary && t.primary.length) {
      const ul = el('ul');
      t.primary.forEach((p) => ul.append(specItem(p.value, p.unit, p.label)));
      cells.push(row(t.tab, '', ul));
    }
    t.groups.forEach((g) => {
      if (g.text != null) {
        const text = clean(g.text);
        if (text) cells.push(row(t.tab, g.title, el('p', text)));
        return;
      }
      const content = [list(g.items)];
      // standard equipment: the long list is cut off behind "Vedi tutte le caratteristiche"
      if (t.groups.length === 1 && g.items.length > 12 && labels['ad.standard_equipment.view_all_features']) {
        content.push(el('p', labels['ad.standard_equipment.view_all_features']));
      }
      cells.push(row(t.tab, g.title, ...content));
    });
  });
  if (!cells.length) { element.remove(); return; }
  element.replaceWith(WebImporter.Blocks.createBlock(document, { name: 'vehicle-details', cells }));
}
