import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import commercialIcon from "../assets/images/icons/commercial.png";
import residentialIcon from "../assets/images/icons/residential.png";
import BrandMarquee from "../components/ui/BrandMarquee.jsx";
import ContactForm from "../components/contact/ContactForm.jsx";
import Button from "../components/ui/Button.jsx";
import { commercialBrands, residentialBrands } from "../data/brands.js";
import { normalizePlan } from "../data/servicePlans.js";

const RESIDENTIAL = "residential";
const COMMERCIAL = "commercial";

// Residential leads; ?type=commercial (QR codes, print) opens the other track.
const AUDIENCES = [
  {
    id: RESIDENTIAL,
    label: "Home",
    icon: residentialIcon,
    iconW: 58,
    iconH: 63,
  },
  {
    id: COMMERCIAL,
    label: "Cafe",
    icon: commercialIcon,
    iconW: 131,
    iconH: 70,
  },
];

// Three residential packages: reactive repair, flat-rate PM, remote guidance.
// Each card renders whichever pricing block it carries (rates / tiers / price).
const RESIDENTIAL_CARDS = [
  {
    id: "repair",
    title: "On-site diagnostics & repair",
    subtitle:
      "For machines experiencing active electrical, hydraulic, or brewing issues.",
    rates: [
      { label: "Rate", value: "$100 / hr", note: "+ OEM parts" },
      { label: "Travel fee", value: "$25 CAD Flat" },
    ],
    scopeNote:
      "Applies to Single Boiler, HX, and Dual Boiler prosumer units.",
    cta: { label: "Book Repair", plan: { location: "home", service: "repair" } },
    points: [
      "On-site electrical & thermal diagnostic troubleshooting",
      "Leak detection, pressure adjustment & seal overhauls",
      "Component replacement and flow recalibration",
    ],
  },
  {
    id: "maintenance",
    title: "Preventative maintenance",
    subtitle:
      "Flat-rate routine care to protect performance and machine longevity.",
    tiers: [
      {
        label: "Single boiler / Thermoblock",
        value: "$100 CAD",
        note: "+$25 Travel Fee",
      },
      {
        label: "Heat exchanger (HX)",
        value: "$150 CAD",
        note: "+$25 Travel Fee",
      },
      { label: "Dual boiler", value: "$200 CAD", note: "+$25 Travel Fee" },
    ],
    points: [
      "Group head overhaul (gasket & shower screen replacement)",
      "Internal health inspection (leak detection, rust, wiring checks)",
      "Pump pressure calibration & temperature check",
      "Maintenance system flush & scale check",
    ],
    cta: {
      label: "Select Maintenance",
      plan: { location: "home", service: "pm" },
    },
  },
  {
    id: "consultation",
    title: "DIY consultation",
    subtitle: "Remote expert guidance before you start a repair yourself.",
    rates: [
      { label: "Price", value: "$50 CAD Flat Rate", note: "Remote / Virtual" },
    ],
    steps: [
      {
        number: "01",
        title: "Free pre-screening",
        lead: "Email us first:",
        body: "Send brand, model, age, water source, and issue details (with photos/video). We'll confirm if it's safe for a home repair.",
      },
      {
        number: "02",
        title: "Paid consultation",
        points: [
          "30-min virtual diagnostic & tool suitability review",
          "Sourcing direct purchase links for exact OEM parts",
          "Custom step-by-step repair execution plan & safety pitfalls",
        ],
      },
    ],
    cta: {
      label: "Request DIY Guidance",
      plan: { location: "home", service: "diy" },
    },
  },
];

// Commercial cards mirror the residential structure: a tiered rate box, a
// flat travel fee, then the scope of work included.
const COMMERCIAL_CARDS = [
  {
    id: "commercial-repair",
    title: "Commercial repair & emergency service",
    subtitle:
      "Rapid on-site troubleshooting and repair to minimize peak-hour caf\u00e9 downtime.",
    tiers: [
      { label: "Standard commercial", value: "$125 - $150 / hr" },
      { label: "Precision multi-boiler", value: "$175 - $200 / hr" },
    ],
    travelFee: "$25 CAD Flat Rate",
    points: [
      "On-site electrical, thermal, and hydraulic diagnostics",
      "Solenoid valve, flow meter, and pump replacements",
      "Commercial espresso machine & grinder calibrations",
      "Water filtration & line pressure troubleshooting",
    ],
    cta: {
      label: "Request Commercial Repair",
      plan: { location: "cafe", service: "repair" },
    },
  },
  {
    id: "commercial-pm",
    title: "Commercial PM program",
    subtitle:
      "Routine quarterly/semi-annual servicing to prevent unexpected breakdowns.",
    tiers: [
      { label: "1-2 group machines", value: "$200 - $250 CAD Flat" },
      { label: "3+ group / multi-boiler", value: "$275 - $300 CAD Flat" },
    ],
    travelFee: "$25 CAD Flat Rate",
    points: [
      "Full group head overhaul (silicone gaskets, shower screens, diffusers)",
      "Steam wand rebuild & anti-vacuum safety checks",
      "Pump pressure calibration & expansion valve check",
      "Water quality test & inline filter assessment",
      "Commercial grinder burr inspection & zero-point calibration",
    ],
    cta: {
      label: "Request Commercial PM",
      plan: { location: "cafe", service: "pm" },
    },
  },
];

const COMMERCIAL_SCOPE = [
  {
    number: "01",
    title: "Hydraulics",
    body: "Boiler pressure verification, vacuum seal checks, expansion valve calibration.",
  },
  {
    number: "02",
    title: "Group heads",
    body: "Food-grade silicone gaskets and precision shower screen installs.",
  },
  {
    number: "03",
    title: "Valves & steam",
    body: "Dismantling steam wands, replacing Teflon seals, shaft lubrication.",
  },
  {
    number: "04",
    title: "Water quality",
    body: "On-site titration testing of incoming water supply to prevent scale.",
  },
];

function MicroLabel({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.22em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}

function PointList({ points, className = "" }) {
  return (
    <ul className={`service-points ${className}`}>
      {points.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

// Rate rows (label / big figure / note) — shared by the repair and
// consultation cards so their pricing bands line up across the row.
function RateBlock({ rates, note }) {
  return (
    <div className="mt-6 border-y border-line py-5">
      <dl className="flex flex-col gap-4">
        {rates.map((rate) => (
          <div key={rate.label}>
            <dt>
              <MicroLabel>{rate.label}</MicroLabel>
            </dt>
            <dd className="figure-value mt-1.5 text-[1.5rem] text-ink sm:text-[1.65rem]">
              {rate.value}
            </dd>
            {rate.note ? (
              <dd className="mt-1.5 font-sans text-sm leading-6 text-graphite">
                {rate.note}
              </dd>
            ) : null}
          </div>
        ))}
      </dl>
      {note ? (
        <p className="mt-4 font-sans text-sm italic leading-6 text-graphite">
          {note}
        </p>
      ) : null}
    </div>
  );
}

// Flat-rate tiers by boiler type.
function TierBlock({ tiers }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface">
      {tiers.map((tier, index) => (
        <div
          className={`flex items-baseline justify-between gap-4 px-4 py-3.5 ${
            index > 0 ? "border-t border-line" : ""
          }`}
          key={tier.label}
        >
          <div className="min-w-0">
            <MicroLabel>{tier.label}</MicroLabel>
            {tier.note ? (
              <p className="mt-1.5 font-sans text-xs leading-5 text-graphite">
                {tier.note}
              </p>
            ) : null}
          </div>
          <p className="figure-value whitespace-nowrap text-[1.35rem] text-ink">
            {tier.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// Numbered two-step flow for the remote consultation card.
function StepList({ steps }) {
  return (
    <div className="mt-6 flex flex-col gap-5">
      {steps.map((step) => (
        <div key={step.number}>
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {step.number}
            </span>
            <h4 className="headline-sm text-[1.05rem] text-ink">
              {step.title}
            </h4>
          </div>

          {step.body ? (
            <p className="mt-2.5 font-sans text-[0.9375rem] leading-6 text-ink/85">
              {step.lead ? (
                <span className="font-medium italic text-ink">
                  {step.lead}{" "}
                </span>
              ) : null}
              {step.body}
            </p>
          ) : null}

          {step.points ? (
            <PointList className="!mt-2.5" points={step.points} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ card, onSelectPlan }) {
  return (
    <article className="service-card h-full">
      <h3 className="service-card-title">{card.title}</h3>

      {card.subtitle ? (
        <p className="mt-3 font-sans text-sm leading-6 text-graphite">
          {card.subtitle}
        </p>
      ) : null}

      {card.rates ? (
        <RateBlock note={card.scopeNote} rates={card.rates} />
      ) : null}
      {card.tiers ? <TierBlock tiers={card.tiers} /> : null}

      {card.travelFee ? (
        <div className="mt-4 flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <MicroLabel>Travel fee</MicroLabel>
          <p className="figure-value whitespace-nowrap text-[1.15rem] text-ink">
            {card.travelFee}
          </p>
        </div>
      ) : null}

      {card.placeholder ? (
        <p className="mt-6 rounded-2xl border border-dashed border-line bg-surface px-4 py-6 text-center font-mono text-[11px] uppercase leading-5 tracking-[0.18em] text-muted">
          {card.placeholder}
        </p>
      ) : null}

      {card.points ? <PointList points={card.points} /> : null}
      {card.steps ? <StepList steps={card.steps} /> : null}

      {card.cta ? (
        <div className="mt-auto pt-7">
          <Button
            className="w-full"
            onClick={() => onSelectPlan(card.cta.plan)}
          >
            {card.cta.label}
          </Button>
        </div>
      ) : null}
    </article>
  );
}

function TrackHeader({ headline, subhead }) {
  return (
    <header className="mx-auto max-w-4xl text-center">
      <h2 className="headline text-[1.9rem] text-ink sm:text-[2.3rem] lg:text-[2.7rem]">
        {headline}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-7 text-graphite sm:text-lg sm:leading-8">
        {subhead}
      </p>
    </header>
  );
}

function ResidentialTrack({ onSelectPlan }) {
  return (
    <div className="flex flex-col gap-12">
      <TrackHeader
        headline="Repair, maintenance & remote guidance for prosumer machines."
        subhead="On-site diagnostics and repair when something fails, flat-rate preventative servicing to keep it from failing, and remote consultation if you would rather do the work yourself — across E61, heat exchanger, dual-boiler, and manual lever machines."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {RESIDENTIAL_CARDS.map((card) => (
          <ServiceCard card={card} key={card.id} onSelectPlan={onSelectPlan} />
        ))}
      </div>

      <BrandMarquee brands={residentialBrands} />

      <div>
        <Button
                    onClick={() => onSelectPlan({ location: "home", service: "repair" })}
        >
          Request residential repair
        </Button>
      </div>
    </div>
  );
}

function CommercialTrack({ onSelectPlan }) {
  return (
    <div className="flex flex-col gap-12">
      <TrackHeader
        headline="Commercial machine maintenance & dispatch."
        subhead="We protect high-volume espresso equipment across Toronto from unexpected peak-hour breakdowns with flat-rate preventative servicing and rapid local response."
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        {COMMERCIAL_CARDS.map((card) => (
          <ServiceCard card={card} key={card.id} onSelectPlan={onSelectPlan} />
        ))}
      </div>

      <div>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
          Scope of work
        </p>
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {COMMERCIAL_SCOPE.map((item) => (
            <div className="scope-cell" key={item.number}>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {item.number}
              </span>
              <h3 className="headline-sm mt-3 text-[1.1rem] text-ink">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-6 text-graphite">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BrandMarquee brands={commercialBrands} />

      <div>
        <Button
                    onClick={() => onSelectPlan({ location: "cafe", service: "repair" })}
        >
          Book on-site commercial dispatch
        </Button>
      </div>
    </div>
  );
}

const CONTACT_FORM_ID = "contact-form";

export default function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requested = searchParams.get("type");
  const audience = requested === COMMERCIAL ? COMMERCIAL : RESIDENTIAL;
  const activeIndex = AUDIENCES.findIndex((a) => a.id === audience);

  const [plan, setPlan] = useState(() =>
    normalizePlan({
      location: audience === COMMERCIAL ? "cafe" : "home",
      service: "repair",
    }),
  );

  function scrollToForm() {
    const node = document.getElementById(CONTACT_FORM_ID);
    if (!node) {
      return;
    }
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    node.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    // Land keyboard and screen-reader focus on the form without fighting the
    // smooth scroll that is already in flight.
    node.focus({ preventScroll: true });
  }

  // Card CTAs pre-select the plan, then bring the form to the reader.
  function selectPlan(next) {
    setPlan(normalizePlan(next));
    scrollToForm();
  }

  function selectAudience(id) {
    const next = new URLSearchParams(searchParams);
    if (id === COMMERCIAL) {
      next.set("type", COMMERCIAL);
    } else {
      next.delete("type");
    }
    setSearchParams(next, { replace: true });
    // Keep the form's location in step with the visible track.
    setPlan((prev) =>
      normalizePlan({
        ...prev,
        location: id === COMMERCIAL ? "cafe" : "home",
      }),
    );
  }

  return (
    <main className="bg-page text-ink">
      <section className="w-full px-5 pt-10 sm:px-6 lg:px-10 lg:pt-14 2xl:px-16">
        {/* Metadata line */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>Technical Services &amp; Diagnostics · Toronto, ON</span>
          <span className="hidden h-px flex-1 bg-line sm:block" />
          <span className="text-muted">Bench &amp; Field</span>
        </div>

        <div className="pt-10 text-center lg:pt-14">
          <h1 className="headline text-[2.6rem] text-ink sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]">
            Equipment service &amp; diagnostics.
          </h1>
        </div>

        {/* Segmented toggle */}
        <div
          aria-label="Choose a service track"
          className="segmented mx-auto mt-10"
          role="tablist"
          style={{ "--segment-count": AUDIENCES.length }}
        >
          <span
            aria-hidden="true"
            className="segmented-thumb"
            style={{ "--segment-index": activeIndex }}
          />
          {AUDIENCES.map((option) => {
            const isActive = option.id === audience;
            return (
              <button
                aria-controls="service-track"
                aria-selected={isActive}
                className={`segmented-option ${isActive ? "is-active" : ""}`}
                key={option.id}
                onClick={() => selectAudience(option.id)}
                role="tab"
                type="button"
              >
                <span className="segmented-label">{option.label}</span>
                <span aria-hidden="true" className="segmented-icon-slot">
                  <span
                    className="segmented-icon"
                    style={{
                      "--icon": `url(${option.icon})`,
                      "--icon-w": `${option.iconW}px`,
                      "--icon-h": `${option.iconH}px`,
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="w-full px-5 pb-24 pt-12 sm:px-6 lg:px-10 lg:pt-16 2xl:px-16"
        id="service-track"
        role="tabpanel"
      >
        {audience === COMMERCIAL ? (
          <CommercialTrack onSelectPlan={selectPlan} />
        ) : (
          <ResidentialTrack onSelectPlan={selectPlan} />
        )}
      </section>

      <section
        className="w-full border-t border-line bg-surface focus:outline-none"
        id={CONTACT_FORM_ID}
        tabIndex={-1}
      >
        <div className="w-full px-5 py-16 sm:px-6 lg:px-10 lg:py-20 2xl:px-16">
          <div className="grid gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:gap-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                Book this plan
              </p>
              <h2 className="headline-sm mt-4 text-[1.6rem] text-ink sm:text-[2rem]">
                Confirm the details and send it over.
              </h2>
              <p className="mt-5 max-w-md font-sans text-sm leading-6 text-graphite sm:text-[15px] sm:leading-7">
                Your selection above is already filled in below — add the
                machine and what it is doing, and the request comes straight to
                me. Usually a reply within 48 hours.
              </p>
            </div>

            <ContactForm heading={null} onPlanChange={setPlan} plan={plan} />
          </div>
        </div>
      </section>
    </main>
  );
}
