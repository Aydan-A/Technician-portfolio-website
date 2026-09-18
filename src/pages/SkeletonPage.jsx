import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import blackEdition from "../assets/images/skeleton/black_edition.png";
import whiteEdition from "../assets/images/skeleton/white_edition.png";
import dispensingIcon from "../assets/images/skeleton/icons/dispensing_icon.jpg";
import heatingIcon from "../assets/images/skeleton/icons/heating_icon.jpg";
import pumpIcon from "../assets/images/skeleton/icons/pump_icon.jpg";
import temperatureIcon from "../assets/images/skeleton/icons/temperature_icon.jpg";
import waterIcon from "../assets/images/skeleton/icons/water_icon.jpg";
import tankImg from "../assets/images/skeleton/subsections/Tank.png";
import plumbedImg from "../assets/images/skeleton/subsections/Plumbed.png";
import vibratoryPumpImg from "../assets/images/skeleton/subsections/vibratory_pump.png";
import rotaryPumpImg from "../assets/images/skeleton/subsections/rotary_pump.png";
import thermoblockImg from "../assets/images/skeleton/subsections/thermoblock.png";
import singleBoilerImg from "../assets/images/skeleton/subsections/single_boiler.png";
import heatExchangerImg from "../assets/images/skeleton/subsections/heat_exchanger.png";
import dualBoilerImg from "../assets/images/skeleton/subsections/dual_boiler.png";
import pressurestatImg from "../assets/images/skeleton/subsections/pressurestat.png";
import pidImg from "../assets/images/skeleton/subsections/PID.png";
import microcontrollerImg from "../assets/images/skeleton/subsections/micro_controller.jpeg";
import e61Img from "../assets/images/skeleton/subsections/E61.png";
import saturatedImg from "../assets/images/skeleton/subsections/saturated.png";

/* Diagram table for the semi-automatic machine.
 * Row 2 icon images (hand-drawn sketches on light paper, object-fit: contain
 * on a constant light chip so they read on both dark + light themes):
 *   Water source   → water_icon.jpg
 *   Pump           → pump_icon.jpg
 *   Heating system → heating_icon.jpg
 *   TC             → temperature_icon.jpg
 *   Dispensing     → dispensing_icon.jpg
 * Each slot keeps the filename in a `data-icon-slot` attribute. */
const COLUMNS = [
  {
    key: "waterSource",
    header: "Water Mode",
    iconSrc: waterIcon,
    iconFile: "water_icon.jpg",
    options: ["Water Tank", "Direct Plumb"],
  },
  {
    key: "pump",
    header: "Pump",
    iconSrc: pumpIcon,
    iconFile: "pump_icon.jpg",
    options: ["Vibratory Pump", "Rotary Pump"],
  },
  {
    key: "heating",
    header: "Heating system",
    iconSrc: heatingIcon,
    iconFile: "heating_icon.jpg",
    options: ["Thermoblock", "Single-boiler", "Heat exchanger", "Dual-boiler"],
  },
  {
    key: "tc",
    header: "Temperature Control",
    iconSrc: temperatureIcon,
    iconFile: "temperature_icon.jpg",
    options: [
      "Pressurestat",
      "PID",
      "Microcontroller-Based Temperature Controller",
    ],
  },
  {
    key: "dispensing",
    header: "Dispensing",
    iconSrc: dispensingIcon,
    iconFile: "dispensing_icon.jpg",
    options: ["E61 grouphead", "Saturated Grouphead"],
  },
];

/* Illustration shown in each option's pop-up (from Subsections/). Keyed by the
 * exact option label so the modal can look it up from `modalTitle`. */
const OPTION_IMAGES = {
  "Water Tank": tankImg,
  "Direct Plumb": plumbedImg,
  "Vibratory Pump": vibratoryPumpImg,
  "Rotary Pump": rotaryPumpImg,
  Thermoblock: thermoblockImg,
  "Single-boiler": singleBoilerImg,
  "Heat exchanger": heatExchangerImg,
  "Dual-boiler": dualBoilerImg,
  Pressurestat: pressurestatImg,
  PID: pidImg,
  "Microcontroller-Based Temperature Controller": microcontrollerImg,
  "E61 grouphead": e61Img,
  "Saturated Grouphead": saturatedImg,
};

/* Copy for each option's pop-up, from espresso_machine_features.md. Keyed by
 * the exact option label so the modal can look it up from `modalTitle`. */
const OPTION_CONTENT = {
  "Water Tank": {
    description:
      "A tank machine draws water from a removable reservoir that you fill manually, typically holding 1-3 liters. There's no need to connect the machine to your home's plumbing; just refill the tank when it runs low.",
    whenToChoose:
      "Choose a tank machine if you want flexibility in where you place your espresso machine, don't have a nearby water line, are renting or don't want to modify your kitchen plumbing, or you're a home user who doesn't mind refilling the reservoir every few days.",
  },
  "Direct Plumb": {
    description:
      "A plumbed-in machine connects directly to your home's water line, giving it a continuous, unlimited water supply. No tank to refill; the machine draws water on demand.",
    whenToChoose:
      "Choose a plumbed machine if you have consistent, moderate-to-high daily usage, want zero maintenance around refilling water, and are able to install or already have a dedicated water line near the machine's location. For a commercial setup like a cafe, this is typically a must-have rather than an option.",
  },
  "Vibratory Pump": {
    description:
      "A vibratory pump uses an electromagnetic coil to push water through the system in rapid pulses. It's compact, affordable, and the most common pump type found in home espresso machines.",
    whenToChoose:
      "Choose a vibratory pump if you're a home user making a handful of drinks a day, want a more budget-friendly machine, and don't mind a bit more audible buzzing noise during extraction.",
  },
  "Rotary Pump": {
    description:
      "A rotary pump uses a motor-driven rotor to deliver a smooth, continuous flow of water at consistent pressure. It runs quieter than a vibratory pump and is built for more demanding, frequent use.",
    whenToChoose:
      "Choose a rotary pump if you want quieter operation, plan on back-to-back extractions without the pump straining, or are setting up a machine for a commercial environment where durability under heavy daily use matters.",
  },
  Thermoblock: {
    description:
      "A thermoblock heats water on demand as it passes through a small heating element, rather than storing hot water in a reservoir. It heats up quickly but doesn't hold a stable temperature as well as a boiler-based system.",
    whenToChoose:
      "Choose a thermoblock machine if you're new to espresso, want a compact and affordable entry point, and are okay with a slightly less consistent shot temperature.",
  },
  "Single-boiler": {
    description:
      "A single boiler machine uses one boiler to both brew espresso and produce steam for milk frothing. Since it's one shared boiler, you'll need to wait for it to shift temperature between brewing and steaming.",
    whenToChoose:
      "Choose a single boiler machine if you're a home user on a moderate budget, typically make one drink at a time, and don't mind a short wait between pulling a shot and steaming milk.",
  },
  "Heat exchanger": {
    description:
      "A heat exchanger machine has one large boiler set to steam temperature, with a thin tube (the heat exchanger) running through it that heats brew water on the way to the group head. This allows near-simultaneous brewing and steaming.",
    whenToChoose:
      "Choose a heat exchanger machine if you want to brew and steam back-to-back without long waits, are making multiple drinks in a row, and are comfortable managing a quick \"temperature surfing\" technique for consistent shots.",
  },
  "Dual-boiler": {
    description:
      "A dual boiler machine has two fully separate boilers, one dedicated to brewing and one to steaming, each independently controlled. This gives you stable, precise temperature for both at the same time.",
    whenToChoose:
      "Choose a dual boiler machine if you want the most consistent shot temperature, frequently brew and steam simultaneously, and are willing to pay a premium for a setup closer to commercial-grade performance.",
  },
  Pressurestat: {
    description:
      "A pressurestat is a mechanical switch that monitors the boiler's pressure rather than its temperature directly. When pressure drops below its set point, it activates the heating element to bring it back up, and since pressure and temperature are directly linked in a boiler, this indirectly keeps water temperature in a workable range.",
    whenToChoose:
      "Choose a pressurestat-controlled machine if you're comfortable with pressure-based control instead of a direct temperature reading, want a simple and reliable mechanical setup, and don't need precise, adjustable temperature settings.",
  },
  PID: {
    description:
      "A PID (Proportional-Integral-Derivative) is a digital controller that constantly adjusts heating power to hold the boiler at a precise, user-set temperature, usually shown on a display. It reacts faster and holds temperature far more tightly than a thermostat, and typically allows you to make fine 1 degree increments or decrements to dial in your exact target temperature.",
    whenToChoose:
      "Choose a PID-controlled machine if you want to dial in and adjust exact brew temperatures for different roasts, care about shot-to-shot consistency, and don't mind paying a bit more for the added control.",
  },
  "Microcontroller-Based Temperature Controller": {
    description:
      "A microcontroller-based temperature controller uses a dedicated electronic sensor (such as an NTC thermistor or RTD) placed directly in the boiler or group head to monitor water temperature in real time. The internal circuit board (PCB) processes this data to control the heating element via a solid-state relay. Unlike a traditional pressurestat that infers temperature indirectly through boiler pressure, this system measures water temperature directly, offering tighter thermal stability and multi-position preset options (such as Low, Medium, or High switches) without requiring a full numerical display.",
    whenToChoose:
      "Choose a microcontroller-controlled machine if you want the precision and direct feedback of electronic temperature sensing, prefer simplified preset options over managing exact degree-by-degree settings, and desire modern temperature stability without the visual clutter of a full LED PID screen on your machine's front panel.",
  },
  "E61 grouphead": {
    description:
      "The E61 is a classic, heavy brass group head design that draws heat from the boiler through a thermosiphon system. Its large thermal mass helps stabilize brew temperature, and it's become an industry-standard design used across many machine brands.",
    whenToChoose:
      "Choose an E61 grouphead if you value proven, widely-supported design (easy to find parts and accessories for), want good temperature stability without a dual boiler, and don't mind a longer warm-up time due to its thermal mass.",
  },
  "Saturated Grouphead": {
    description:
      "A saturated group head is built directly into the boiler itself, so the metal in contact with your coffee is constantly bathed in hot water at boiler temperature. This gives excellent temperature stability with a simpler design than an E61.",
    whenToChoose:
      "Choose a saturated group if you want strong temperature consistency shot after shot, prefer a design commonly found on higher-end prosumer and commercial machines, and are less concerned about the specific brand ecosystem that comes with an E61 setup.",
  },
};

const HEADER_BY_KEY = Object.fromEntries(
  COLUMNS.map((column) => [column.key, column.header]),
);

const EMPTY_SELECTION = Object.fromEntries(
  COLUMNS.map((column) => [column.key, null]),
);

/* Intro paragraph — typed out character-by-character when the page mounts. */
const INTRO_TEXT =
  "At its core, a semi-automatic espresso machine relies on five interconnected systems: water intake, pressure generation, heating, thermal regulation, and extraction. Click through the sections below to explore how these components work together.";

/* Numbered circles drawn on the banner illustration.
 * x/y     — hotspot center as a % of the image (also the click target).
 * ringD   — ring diameter, and ringDx/ringDy the ring-center nudge, all in cqw
 *           (% of the banner width) so they scale WITH the responsive image and
 *           stay correctly sized/centered at any viewport width. Each ring is
 *           ~1.4× its hand-drawn circle (which vary in size), centered on the
 *           number (drawn up/right of the click target). */
const HOTSPOTS = [
  { n: 1, columnKey: "waterSource", x: 18, y: 58, ringD: 6.4, ringDx: 1.1, ringDy: -2.8 },
  { n: 2, columnKey: "pump", x: 38, y: 80, ringD: 6.7, ringDx: 1.6, ringDy: -2.8 },
  { n: 3, columnKey: "heating", x: 44, y: 22, ringD: 5.7, ringDx: 0.7, ringDy: -0.6 },
  { n: 4, columnKey: "tc", x: 67, y: 20, ringD: 6.1, ringDx: 1.8, ringDy: -1.0 },
  { n: 5, columnKey: "dispensing", x: 85, y: 62, ringD: 6.4, ringDx: 0.9, ringDy: -2.1 },
];

/* Compatibility rules. Only constraint so far:
 * A direct-plumb water mode is incompatible with a vibratory pump. */
function isIncompatible(columnKey, option, selected) {
  return (
    columnKey === "pump" &&
    option === "Vibratory Pump" &&
    selected.waterSource === "Direct Plumb"
  );
}

function EyeIcon() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="15"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="15"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export default function SkeletonPage() {
  // Current theme from the shared nav toggle (via Layout's Outlet context).
  // Default to dark to match the site's :root defaults. Both editions are
  // rendered so they preload; the class just toggles which one paints.
  const { theme } = useOutletContext() ?? {};
  const isDark = theme !== "light";
  const [selected, setSelected] = useState(EMPTY_SELECTION);
  const [activeColumn, setActiveColumn] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [typedCount, setTypedCount] = useState(0);

  // Typewriter for the intro paragraph: reveal one character at a time on
  // mount. Users who prefer reduced motion get the full text immediately.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setTypedCount(INTRO_TEXT.length);
      return undefined;
    }
    setTypedCount(0);
    const id = setInterval(() => {
      setTypedCount((count) => {
        if (count >= INTRO_TEXT.length) {
          clearInterval(id);
          return count;
        }
        return count + 1;
      });
    }, 10);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!modalTitle) {
      return;
    }
    function handleKey(event) {
      if (event.key === "Escape") {
        setModalTitle(null);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalTitle]);

  // While a section is highlighted, a click/tap anywhere outside the table
  // (page background, banner, nav, etc.) clears the selection. Clicks inside
  // the table, on a picture hotspot, or in the modal are left alone.
  useEffect(() => {
    if (!activeColumn) {
      return undefined;
    }
    function handleOutsideClick(event) {
      const target = event.target;
      if (
        target.closest?.(".skeleton-diagram-scroll") ||
        target.closest?.(".skeleton-hotspot") ||
        target.closest?.(".skeleton-modal-overlay")
      ) {
        return;
      }
      setActiveColumn(null);
      setSelected(EMPTY_SELECTION);
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activeColumn]);

  function selectOption(columnKey, option) {
    // Clicking the already-selected option clears it (and the highlight).
    const willDeselect = selected[columnKey] === option;
    setSelected((prev) => {
      const next = {
        ...prev,
        [columnKey]: prev[columnKey] === option ? null : option,
      };
      // Drop any selection that the new choice makes incompatible.
      for (const column of COLUMNS) {
        if (next[column.key] && isIncompatible(column.key, next[column.key], next)) {
          next[column.key] = null;
        }
      }
      return next;
    });
    setActiveColumn(willDeselect ? null : columnKey);
  }

  // Image hotspots highlight a whole section without picking a sub-option.
  function toggleColumn(columnKey) {
    setActiveColumn((prev) => (prev === columnKey ? null : columnKey));
  }

  // Clicking anywhere in a column's cells highlights that section (no option).
  function activateColumn(columnKey) {
    setActiveColumn(columnKey);
  }

  function cellClass(base, columnKey) {
    if (activeColumn === columnKey) {
      return `${base} is-col-active`;
    }
    if (activeColumn) {
      return `${base} is-col-dim`;
    }
    return base;
  }

  return (
    <main className="bg-page text-ink">
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <h1 className="skeleton-headline headline text-center text-[2.6rem] text-ink sm:text-[3.2rem] lg:text-[3.8rem]">
          Skeleton of semi-automatic machine.
        </h1>

        <p
          aria-label={INTRO_TEXT}
          className="typewriter mx-auto mt-6 max-w-2xl text-center font-sans text-base leading-relaxed text-graphite sm:text-lg"
        >
          {/* Hidden full-length copy reserves the final space so wrapping text
              never reflows/jumps as it types in. */}
          <span aria-hidden="true" className="typewriter-sizer">
            {INTRO_TEXT}
          </span>
          <span aria-hidden="true" className="typewriter-typed">
            {INTRO_TEXT.slice(0, typedCount)}
            {typedCount < INTRO_TEXT.length ? (
              <span className="typewriter-caret" />
            ) : null}
          </span>
        </p>

        <div className="skeleton-diagram mt-12 sm:mt-16">
          {/* Banner illustration with clickable numbered hotspots */}
          <figure className="skeleton-figure">
            <div className="skeleton-figure-inner">
              <img
                alt="Hand-drawn schematic of a semi-automatic espresso machine with five numbered sections: water source, pump, heating system, temperature control, and dispensing"
                className={`skeleton-figure-img${isDark ? " is-hidden" : " is-visible"}`}
                src={whiteEdition}
              />
              <img
                alt="Hand-drawn schematic of a semi-automatic espresso machine with five numbered sections: water source, pump, heating system, temperature control, and dispensing"
                className={`skeleton-figure-img${isDark ? " is-visible" : " is-hidden"}`}
                src={blackEdition}
              />
              {HOTSPOTS.map((spot) => (
                <button
                  aria-label={`Highlight ${HEADER_BY_KEY[spot.columnKey]}`}
                  aria-pressed={activeColumn === spot.columnKey}
                  className={`skeleton-hotspot${
                    activeColumn === spot.columnKey ? " is-active" : ""
                  }`}
                  key={spot.n}
                  onClick={() => toggleColumn(spot.columnKey)}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    "--ring-d": `${spot.ringD}cqw`,
                    "--ring-dx": `${spot.ringDx}cqw`,
                    "--ring-dy": `${spot.ringDy}cqw`,
                  }}
                  type="button"
                />
              ))}
            </div>
          </figure>

          <div className="skeleton-diagram-scroll">
            <div className="skeleton-grid">
              {/* Row 1 — column headers */}
              {COLUMNS.map((column, index) => (
                <div
                  className={cellClass(
                    "skeleton-cell skeleton-col-header",
                    column.key,
                  )}
                  key={`head-${column.key}`}
                  onClick={() => activateColumn(column.key)}
                >
                  <span className="skeleton-col-num">{index + 1}.</span>{" "}
                  {column.header}
                </div>
              ))}

              {/* Row 2 — icon images */}
              {COLUMNS.map((column) => (
                <div
                  className={cellClass(
                    "skeleton-cell skeleton-icon-cell",
                    column.key,
                  )}
                  key={`icon-${column.key}`}
                  onClick={() => activateColumn(column.key)}
                >
                  <div className="skeleton-icon-slot" data-icon-slot={column.iconFile}>
                    <img
                      alt={`${column.header} icon`}
                      loading="lazy"
                      src={column.iconSrc}
                    />
                  </div>
                </div>
              ))}

              {/* Row 3 — options with eye buttons */}
              {COLUMNS.map((column) => (
                <div
                  className={cellClass(
                    "skeleton-cell skeleton-options-cell",
                    column.key,
                  )}
                  key={`opts-${column.key}`}
                  onClick={() => activateColumn(column.key)}
                >
                  <ul className="skeleton-options">
                    {column.options.map((option) => {
                      const incompatible = isIncompatible(
                        column.key,
                        option,
                        selected,
                      );
                      const isSelected = selected[column.key] === option;
                      return (
                        <li className="skeleton-option-row" key={option}>
                          <button
                            aria-pressed={isSelected}
                            className={`skeleton-option${
                              isSelected ? " is-selected" : ""
                            }${incompatible ? " is-incompatible" : ""}`}
                            disabled={incompatible}
                            onClick={(event) => {
                              event.stopPropagation();
                              selectOption(column.key, option);
                            }}
                            title={
                              incompatible
                                ? "Incompatible with a plumbed water source"
                                : undefined
                            }
                            type="button"
                          >
                            {option}
                          </button>
                          <button
                            aria-label={`Learn about ${option}`}
                            className="skeleton-eye"
                            onClick={(event) => {
                              event.stopPropagation();
                              setModalTitle(option);
                            }}
                            type="button"
                          >
                            <EyeIcon />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {modalTitle ? (
        <div
          className="skeleton-modal-overlay"
          onClick={() => setModalTitle(null)}
        >
          <div
            aria-labelledby="skeleton-modal-title"
            aria-modal="true"
            className="skeleton-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <button
              aria-label="Close"
              className="skeleton-modal-close"
              onClick={() => setModalTitle(null)}
              type="button"
            >
              ×
            </button>

            <div className="skeleton-modal-grid">
              {/* Left column — text, split into two numbered sections */}
              <div className="skeleton-modal-text">
                <header className="skeleton-modal-head">
                  <p className="skeleton-modal-eyebrow">Component</p>
                  <h2 className="skeleton-modal-title" id="skeleton-modal-title">
                    {modalTitle}
                  </h2>
                </header>

                <div className="skeleton-modal-block">
                  <h3 className="skeleton-modal-subhead">
                    <span className="skeleton-modal-num">1.</span> Description
                  </h3>
                  <p className="skeleton-modal-body">
                    {OPTION_CONTENT[modalTitle]?.description ??
                      "Explanation coming soon."}
                  </p>
                </div>

                <div className="skeleton-modal-block skeleton-modal-block--rule">
                  <h3 className="skeleton-modal-subhead">
                    <span className="skeleton-modal-num">2.</span> When to choose it
                  </h3>
                  <p className="skeleton-modal-body">
                    {OPTION_CONTENT[modalTitle]?.whenToChoose ??
                      "Guidance coming soon."}
                  </p>
                </div>
              </div>

              {/* Right column — component illustration */}
              <div className="skeleton-modal-figure">
                {OPTION_IMAGES[modalTitle] ? (
                  <img
                    alt={modalTitle}
                    className="skeleton-modal-figure-img"
                    src={OPTION_IMAGES[modalTitle]}
                  />
                ) : (
                  <span className="skeleton-modal-figure-label" aria-hidden="true">
                    Placeholder for picture
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
