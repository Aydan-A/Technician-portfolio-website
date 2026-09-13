import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import contactImg from "../assets/images/Contactme.jpg";
import heroMachineImg from "../assets/images/heropageimg.png";
import Button from "../components/Button.jsx";
import HeroVideo from "../components/HeroVideo.jsx";
import BrandMarquee from "../components/BrandMarquee.jsx";
import JournalDispatchCard from "../components/JournalDispatchCard.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import SkeletonBadge from "../components/SkeletonBadge.jsx";
import { allBrands } from "../data/brands.js";
import { posts } from "../data/posts.js";

const TICKER_FACTS = [
  "Mahlkönig GbW load cells take 3,000 weight readings per second.",
  "9 bar espresso pressure equals 130 PSI—like being 90m underwater.",
  "Just 1mm of boiler scale cuts heating efficiency by 12%.",
  "A 10-micron burr tilt doubles fines and causes shot channeling.",
  "Coffee 'beans' are actually seeds inside a fruit cherry.",
  "E61 group heads heat 4kg of solid brass with zero electronics.",
  "3-way solenoids depressurize the portafilter in under 50ms.",
  "Light roasts contain slightly more caffeine by volume than dark roasts.",
  "The steam espresso machine was patented in 1901 to shorten worker breaks.",
  "PID controllers pulse SSRs in milliseconds for tight temp stability.",
];

// The strip scrolls two identical copies and resets at -50%, so the loop is
// seamless only while both copies stay the same width. Timing it by measured
// distance keeps the reading speed identical no matter how long the copy runs.
const TICKER_PX_PER_SECOND = 44;

export default function HomePage() {
  const tickerLoop = [...TICKER_FACTS, ...TICKER_FACTS];
  const tickerRef = useRef(null);
  const [tickerDuration, setTickerDuration] = useState(null);

  // Measured before paint so the strip never starts at the wrong speed.
  useLayoutEffect(() => {
    const node = tickerRef.current;
    if (!node) {
      return undefined;
    }

    function measure() {
      const distance = node.scrollWidth / 2;
      if (distance > 0) {
        setTickerDuration(distance / TICKER_PX_PER_SECOND);
      }
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    // Webfont metrics change the track width, so re-measure once they land.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => observer.disconnect();
  }, []);
  // Three newest dispatches, same ordering the Journal index uses.
  const latestPosts = [...posts].sort((a, b) => b.number - a.number).slice(0, 3);

  return (
    <>
      <div
        aria-label="Coffee equipment facts"
        className="marquee-strip relative mt-10 overflow-hidden border-y sm:mt-12"
      >
        <div className="marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-24" />
        <div className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-24" />
        <div
          className="marquee-track py-3"
          ref={tickerRef}
          style={
            tickerDuration ? { animationDuration: `${tickerDuration}s` } : undefined
          }
        >
          {tickerLoop.map((fact, index) => (
            <div
              aria-hidden={index >= TICKER_FACTS.length}
              className="hero-muted flex shrink-0 items-center gap-6 px-6 font-mono text-[12px] font-semibold uppercase tracking-[0.18em]"
              key={`${fact}-${index}`}
            >
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-ink/60" />
              <span className="whitespace-nowrap">{fact}</span>
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* ============================================================
          * HERO — BACKGROUND ARCHITECTURE
          * Three stacked, full-width matte colour blocks. Sharp edges only:
          * no gradients, no fades, no rounding anywhere in this section.
          *   1. Main field       ~70%  #20242B  deep matte graphite
          *   2. Amber detail     ~18%  #E09B2D  matte industrial amber
          *   3. Telemetry dock   ~12%  #181A1F  darker matte charcoal
          * Proportions are flex-grow ratios over a 100svh column, with
          * min-heights so the lower bands survive short viewports.
          * ============================================================ */}
        <section className="relative isolate flex min-h-[calc(100svh-9.5rem)] flex-col overflow-hidden rounded-none">
          {/* ---- 1. PRIMARY BACKGROUND SECTION (Main Field) ---- */}
          <div className="flex flex-[70] flex-col justify-center rounded-none bg-[#20242B] px-5 pb-14 pt-14 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
            <div className="mx-auto grid w-full max-w-[88rem] gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14">
              <div className="relative flex flex-col justify-center">
                <h1 className="font-display text-[3.4rem] uppercase leading-[0.92] tracking-tight text-slate-100 sm:text-[4.4rem] md:text-[5rem] lg:text-[4.6rem] xl:text-[5.4rem]">
                  Coffee Machine
                  <br />
                  Diagnostics with an
                  <br />
                  Engineer&rsquo;s Mindset.
                </h1>

                <p className="mt-6 font-mono text-[12px] font-semibold uppercase tracking-[0.32em] text-slate-300">
                  Vagif Aliyev — Espresso Repair &amp; Field Notes
                </p>

                <p className="mt-6 max-w-xl font-sans text-[15px] leading-7 text-slate-300">
                  I repair, rebuild, and fine-tune espresso machines and grinders
                  for cafés, roasters, and home coffee lovers.
                </p>

                {/* Sharp rectangular CTAs. Built inline rather than with
                  * <Button>, whose base class is `rounded-full` — a
                  * `rounded-none` override loses on Tailwind's emit order. */}
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-none border border-[#E09B2D] bg-[#E09B2D] px-7 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-zinc-950 transition-colors duration-150 hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E09B2D]"
                    to="/services"
                  >
                    View Services
                  </Link>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-none border border-slate-100 bg-transparent px-7 py-3 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-slate-100 transition-colors duration-150 hover:bg-slate-100 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-100"
                    to="/contact"
                  >
                    Request a Consultation
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center lg:justify-end">
                <figure className="hero-machine-figure relative w-full max-w-[40rem]">
                  <span aria-hidden className="hero-machine-arcs">
                    <span className="hero-machine-arc hero-machine-arc--1" />
                    <span className="hero-machine-arc hero-machine-arc--2" />
                    <span className="hero-machine-arc hero-machine-arc--3" />
                  </span>
                  <img
                    alt="Espresso machine schematic"
                    className="hero-machine-img hero-machine-img--on-dark relative z-10 mx-auto block w-full max-w-none object-contain"
                    src={heroMachineImg}
                  />
                </figure>
              </div>
            </div>
          </div>

          {/* ---- 2. SECONDARY SHARP HORIZONTAL BLOCK (Matte Amber Detail) ----
            * Full-width band cutting across the field. Razor-sharp top and
            * bottom edges — no border-radius, no border, no shadow. */}
          <div className="flex min-h-[7rem] flex-[18] items-center rounded-none bg-[#E09B2D] px-5 py-6 sm:px-6 lg:px-10">
            <dl className="mx-auto flex w-full max-w-[88rem] flex-wrap items-baseline gap-x-10 gap-y-3">
              {[
                { label: "field hours", value: "9,200+" },
                { label: "machines serviced", value: "640" },
              ].map((stat) => (
                <div className="flex items-baseline gap-3" key={stat.label}>
                  <dd className="font-display text-[2.25rem] uppercase leading-none tracking-normal text-zinc-950 tabular-nums lg:text-[2.75rem]">
                    {stat.value}
                  </dd>
                  <dt className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-950">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- 3. TERTIARY TELEMETRY DOCK / FOOTER BLOCK ----
            * Bottom full-width spec bar. Hairline dividers, zero rounding. */}
          <div className="flex min-h-[6.5rem] flex-[12] items-center rounded-none bg-[#181A1F] px-5 py-5 sm:px-6 lg:px-10">
            <dl className="mx-auto grid w-full max-w-[88rem] grid-cols-2 gap-y-5 lg:grid-cols-4">
              {[
                { label: "brew pressure", value: "9.0", unit: "bar" },
                { label: "turnaround", value: "24–48", unit: "hr" },
                { label: "café accounts", value: "40", unit: "+" },
                { label: "coverage", value: "GTA", unit: "" },
              ].map((spec, index) => (
                <div
                  className={`px-0 lg:px-7 ${
                    index > 0 ? "lg:border-l lg:border-slate-100/20" : ""
                  }`}
                  key={spec.label}
                >
                  <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-2 flex items-baseline gap-1.5 font-display text-[1.6rem] uppercase leading-none text-slate-100 tabular-nums">
                    {spec.value}
                    {spec.unit && (
                      <span className="font-mono text-[12px] font-bold lowercase tracking-[0.08em] text-[#E09B2D]">
                        {spec.unit}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-surface px-5 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[88rem]">
            <div className="aspect-video w-full overflow-hidden bg-black/5">
              <HeroVideo />
            </div>
          </div>
        </section>

        {/* Temporarily hidden along with the Projects nav entry and page.
          * Restore this block (plus the ProjectCard and projects imports) to
          * bring "Case studies from the bench" back.
          *
          * <section
          *   className="border-y border-line bg-surface px-5 py-16 sm:px-6 md:py-20 lg:px-10"
          *   id="projects"
          * >
          *   <div className="mx-auto max-w-[88rem]">
          *     <div className="mb-10 max-w-2xl">
          *       <SectionLabel>02 — Selected Projects</SectionLabel>
          *       <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          *         Case studies from the bench.
          *       </h2>
          *     </div>
          *     <div className="grid gap-8 md:grid-cols-3">
          *       {projects.slice(0, 3).map((project) => (
          *         <ProjectCard key={project.title} project={project} />
          *       ))}
          *     </div>
          *   </div>
          * </section>
          */}

        <section
          className="border-y border-line bg-page px-5 py-14 sm:px-6 md:py-16 lg:px-8"
          id="journal"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 max-w-full">
              <div className="max-w-2xl">
                <SectionLabel>03 — Journal</SectionLabel>
                <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                  Reading from the workshop.
                </h2>
              </div>
              <Button to="/journal" variant="secondary">
                Visit Journal
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {latestPosts.map((post) => (
                <JournalDispatchCard key={post.id} post={post} variant="grid" />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-surface" id="contact">
          <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-16 sm:px-6 md:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:px-10">
            <figure className="panel registration relative p-3 sm:p-4">
              <img
                alt="Vagif at the workbench servicing an espresso machine"
                className="aspect-[4/5] w-full rounded-md object-cover"
                loading="lazy"
                src={contactImg}
              />
              <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-[#1f1f1f]/70">
                <span>Plate 04 — Bench</span>
                <span>Workshop · YYZ</span>
              </figcaption>
            </figure>
            <div>
              <SectionLabel>04 — Get in Touch</SectionLabel>
              <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] text-ink sm:text-5xl md:text-[3.4rem]">
                Need help understanding what your machine is doing?
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/85">
                Send a message if you need help with diagnostics, repair,
                calibration, or a second opinion on your espresso machine or
                grinder. I&rsquo;ll reply with a clear next step within 48
                hours.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="min-h-12 px-7"
                  href="mailto:vaqif.aliyev.96@gmail.com"
                >
                  Contact Me
                </Button>
                <Button
                  className="min-h-12 px-7"
                  to="/journal"
                  variant="secondary"
                >
                  Read the Journal
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="border-t border-line bg-page px-5 py-14 sm:px-6 md:py-16 lg:px-10">
          <div className="mx-auto max-w-[88rem]">
            <BrandMarquee brands={allBrands} />
          </div>
        </section>
      </main>
      <SkeletonBadge />
    </>
  );
}
