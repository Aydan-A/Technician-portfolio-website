import { Link } from "react-router-dom";
import heroMachineImg from "../assets/images/heropageimg.png";
import TelemetryDock from "./TelemetryDock.jsx";

const SPEC_ROW = [
  { label: "Discipline", value: "Espresso + grinder" },
  { label: "Scope", value: "Diagnose / rebuild / calibrate" },
  { label: "Basis", value: "Field + bench" },
];

// Three bands, stacked hard: dark plate, amber action block, telemetry dock.
// The seam between band 1 and 2 is a real element boundary, so the machine
// image can cross it without any risk of dark-ink-on-dark-slate copy.
export default function HeroIndustrial() {
  return (
    <>
      {/* ============ BAND 01 — DARK PLATE ============ */}
      <section className="relative overflow-hidden bg-page pb-0 pt-10 lg:pt-14">
        <div aria-hidden className="mech-grid pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="noise-layer pointer-events-none absolute inset-0"
        />

        <div className="relative mx-auto max-w-[110rem] px-6 xl:px-10">
          {/* Registration marks — drafting corner brackets */}
          <span
            aria-hidden
            className="absolute left-6 top-0 h-4 w-4 border-l-2 border-t-2 border-bronze xl:left-10"
          />
          <span
            aria-hidden
            className="absolute right-6 top-0 h-4 w-4 border-r-2 border-t-2 border-bronze xl:right-10"
          />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-8">
            {/* ---------- TYPE COLUMN ---------- */}
            <div className="relative pb-10 lg:pb-16">
              {/* Rotated edge rail, spec-sheet style */}
              <span
                aria-hidden
                className="absolute -left-1 top-1 hidden font-mono text-[10px] font-bold uppercase tracking-[0.42em] text-graphite [writing-mode:vertical-rl] lg:block"
                style={{ transform: "rotate(180deg)" }}
              >
                Commercial &amp; prosumer service — Toronto
              </span>

              <div className="lg:pl-12">
                {/* Eyebrow: hard bordered tag, not faint gray mono */}
                <p className="mech-data inline-flex items-center gap-3 border border-rule bg-surface px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-ink">
                  <span aria-hidden className="h-[7px] w-[7px] bg-bronze" />
                  No. 01
                  <span aria-hidden className="h-3 w-px bg-rule" />
                  <span className="text-graphite">Technician dossier</span>
                </p>

                <h1 className="mt-7 font-display text-[3.6rem] uppercase leading-[0.86] tracking-[0.005em] text-ink sm:text-[4.8rem] lg:text-[5.4rem] xl:text-[6.4rem]">
                  Espresso
                  <br />
                  Diagnostics
                  <br />
                  <span className="relative inline-block">
                    <span className="relative z-10 px-3 text-[#181A1F]">
                      Under Load
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-[0.1em] top-[0.12em] z-0 bg-bronze"
                    />
                  </span>
                </h1>

                {/* Spec strip — flat, divided, no bubbles */}
                <dl className="mt-9 grid max-w-2xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                  {SPEC_ROW.map((spec) => (
                    <div className="px-0 py-4 sm:px-5 sm:first:pl-0" key={spec.label}>
                      <dt className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-muted">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {/* ---------- MACHINE PLATE ---------- */}
            <figure className="relative z-20 -mb-14 lg:-mb-24">
              {/* Frame, not a card: hairline box with amber corner keys */}
              <div className="relative border border-rule bg-panel/10">
                <span
                  aria-hidden
                  className="absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 border-bronze"
                />
                <span
                  aria-hidden
                  className="absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 border-bronze"
                />
                <img
                  alt="Espresso machine schematic"
                  className="hero-machine-img mx-auto block w-full max-w-[34rem] object-contain px-6 py-6"
                  loading="eager"
                  src={heroMachineImg}
                />
                {/* Plate ID, bottom-left, like a chassis stamp */}
                <figcaption className="mech-data absolute bottom-3 left-4 font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-graphite">
                  Plate ref. E61 / HX-02
                </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ BAND 02 — AMBER ACTION BLOCK ============ */}
      <section className="relative bg-bronze text-[#181A1F]">
        <div className="mx-auto max-w-[110rem] px-6 pb-12 pt-20 lg:px-10 lg:pb-14 lg:pt-16">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="lg:pl-12">
              <p className="max-w-xl font-sans text-[15px] font-medium leading-7 text-[#181A1F]/85">
                I repair, rebuild, and calibrate espresso machines and grinders
                for cafés, roasters, and home operators across Toronto and the
                GTA — E61 group rebuilds, 3-way solenoid service, pressurestat
                and PID calibration, and OPV set to 9 bar under measurement, not
                estimate.
              </p>

              {/* CTA blocks: sharp, weighted, no pills */}
              <div className="mt-8 flex flex-col sm:flex-row">
                <Link
                  className="mech-focus inline-flex min-h-[3.25rem] items-center justify-center gap-3 border-2 border-[#181A1F] bg-[#181A1F] px-8 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-page transition-colors hover:bg-transparent hover:text-[#181A1F]"
                  to="/services"
                >
                  View services <span aria-hidden>&rarr;</span>
                </Link>
                <Link
                  className="mech-focus inline-flex min-h-[3.25rem] items-center justify-center gap-3 border-2 border-[#181A1F] px-8 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#181A1F] transition-colors hover:bg-[#181A1F] hover:text-page sm:-ml-[2px]"
                  to="/contact"
                >
                  Request diagnosis
                </Link>
              </div>
            </div>

            {/* Index rail — flat numerals, replaces the round radio dots */}
            <div className="flex items-end justify-between gap-6 lg:justify-end">
              <ul className="flex items-stretch divide-x divide-[#181A1F]/25 border border-[#181A1F]/25">
                {["01", "02", "03", "04"].map((n, i) => (
                  <li key={n}>
                    <span
                      className={`mech-data flex h-11 w-11 items-center justify-center font-mono text-[10px] font-bold tracking-[0.1em] ${
                        i === 0
                          ? "bg-[#181A1F] text-page"
                          : "text-[#181A1F]/55"
                      }`}
                    >
                      {n}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mech-data font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-[#181A1F]/70">
                Water basis 120–135 mg/L TDS
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BAND 03 — TELEMETRY DOCK ============ */}
      <TelemetryDock />
    </>
  );
}
