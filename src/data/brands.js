// Brand logos for the two service tracks.
//
// Sources live in assets/images/Logos/{commercial,residential} and are used
// respectively by each track. The files under Logos/trimmed are the same art
// with its baked-in whitespace cropped away — the originals carry wildly
// different margins (Profitec's mark filled 14% of its canvas height, Quick
// Mill's filled 100%), so object-fit alone rendered them at anything from 7px
// to 48px tall. Trimming makes the art itself the bounding box.
//
// `w`/`h` are the display box in CSS px. They hold sqrt(w*h) roughly constant
// so a long wordmark and a square emblem carry the same optical weight, then
// clamp to the chip (max 120x48). Re-derive them if you swap a logo.

import commercialLaMarzocco from "../assets/images/logos/commercial/la-marzocco-logo-vector.svg";
import commercialSynesso from "../assets/images/logos/commercial/synesso-logo.png";
import commercialVictoriaArduino from "../assets/images/logos/commercial/Victoria_Arduino_Logo_375x.png";
import commercialSlayer from "../assets/images/logos/commercial/Slayer-logo.png";
import commercialNuovaSimonelli from "../assets/images/logos/commercial/NS-logo.png";
import commercialRocket from "../assets/images/logos/commercial/Rocket-Logo.png";
import commercialRancilio from "../assets/images/logos/commercial/Rancillio-logo.png";
import commercialLelit from "../assets/images/logos/commercial/lelit-logo.png";

import residentialRocket from "../assets/images/logos/residential/Rocket-Logo.png";
import residentialProfitec from "../assets/images/logos/residential/Profitec-logo.png";
import residentialEcm from "../assets/images/logos/residential/ECM-logo.png";
import residentialBezzera from "../assets/images/logos/residential/bezzera-logo.png";
import residentialLelit from "../assets/images/logos/residential/lelit-logo.png";
import residentialLaPavoni from "../assets/images/logos/residential/Lapavoni-logo.png";
import residentialQuickMill from "../assets/images/logos/residential/QM-logo.png";
import residentialNuovaSimonelli from "../assets/images/logos/residential/NS-logo.png";
import residentialLaMarzocco from "../assets/images/logos/residential/la-marzocco-logo-vector.svg";

export const residentialBrands = [
  { name: "Rocket Espresso", logo: residentialRocket, w: 104, h: 20 },
  { name: "Profitec", logo: residentialProfitec, w: 120, h: 17 },
  { name: "ECM", logo: residentialEcm, w: 66, h: 32 },
  { name: "Bezzera", logo: residentialBezzera, w: 29, h: 48 },
  { name: "Lelit", logo: residentialLelit, w: 106, h: 20 },
  { name: "La Pavoni", logo: residentialLaPavoni, w: 102, h: 21 },
  { name: "Quick Mill", logo: residentialQuickMill, w: 56, h: 38 },
  { name: "Nuova Simonelli", logo: residentialNuovaSimonelli, w: 112, h: 19 },
  { name: "La Marzocco", logo: residentialLaMarzocco, w: 65, h: 33 },
];

export const commercialBrands = [
  { name: "La Marzocco", logo: commercialLaMarzocco, w: 65, h: 33 },
  { name: "Synesso", logo: commercialSynesso, w: 45, h: 47 },
  { name: "Victoria Arduino", logo: commercialVictoriaArduino, w: 89, h: 24 },
  { name: "Slayer", logo: commercialSlayer, w: 109, h: 19 },
  { name: "Nuova Simonelli", logo: commercialNuovaSimonelli, w: 112, h: 19 },
  { name: "Rocket Espresso", logo: commercialRocket, w: 104, h: 20 },
  { name: "Rancilio", logo: commercialRancilio, w: 103, h: 20 },
  { name: "Lelit", logo: commercialLelit, w: 106, h: 20 },
];

// Every brand across both tracks, deduped by name for the home page, which
// isn't split residential/commercial. Shared brands keep their commercial
// import; the files are byte-identical, so Vite emits one asset either way.
export const allBrands = [
  ...commercialBrands,
  ...residentialBrands.filter(
    (brand) => !commercialBrands.some((c) => c.name === brand.name),
  ),
];
