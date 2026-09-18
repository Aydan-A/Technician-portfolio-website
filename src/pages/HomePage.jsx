import { useLayoutEffect, useRef, useState } from "react";
import contactImg from "../assets/images/home/bench.jpg";
import heroMachineImg from "../assets/images/home/hero-machine.png";
import Button from "../components/ui/Button.jsx";
import HeroVideo from "../components/home/HeroVideo.jsx";
import BrandMarquee from "../components/ui/BrandMarquee.jsx";
import JournalDispatchCard from "../components/journal/JournalDispatchCard.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import SkeletonBadge from "../components/ui/SkeletonBadge.jsx";
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
    // Webfont metrics change the track width, so re-measure once they land —
    // but fonts.ready can resolve after the page is gone, so it checks first.
    let live = true;
    document.fonts?.ready
      .then(() => {
        if (live) measure();
      })
      .catch(() => {});

    return () => {
      live = false;
      observer.disconnect();
    };
  }, []);
  // Three newest dispatches, same ordering the Journal index uses.
  const latestPosts = [...posts].sort((a, b) => b.number - a.number).slice(0, 3);

  return (
    <>
      <div
        aria-label="Coffee equipment facts"
        className="marquee-strip relative overflow-hidden border-b"
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
              className="hero-muted flex shrink-0 items-center gap-6 px-6 font-mono text-[12px] font-medium uppercase tracking-[0.18em]"
              key={`${fact}-${index}`}
            >
              <span className="h-1.5 w-1.5 shrink-0 bg-rule" />
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
          *   1. Main field         bg-page     the site's base surface
          *   2. Amber stat strip   bg-amber    the accent, rationed
          *   3. Telemetry dock     bg-surface  the alternating band tone
          * The amber strip is deliberately the thinnest band: it hugs its
          * own content instead of taking a share of the viewport, because a
          * full-height saturated block is tiring to sit under.
          * These are the same three tokens every other page is built from —
          * the hero is the palette stated plainly, not a one-off block.
          * Proportions are flex-grow ratios over a 100svh column, with
          * min-heights so the lower bands survive short viewports.
          * ============================================================ */}
        <section className="relative isolate flex min-h-[calc(100svh-7.5rem)] flex-col overflow-hidden">
          {/* ---- 1. PRIMARY BACKGROUND SECTION (Main Field) ---- */}
          <div className="relative flex flex-[70] flex-col justify-center bg-page px-5 pb-14 pt-14 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
            <div aria-hidden className="mech-grid pointer-events-none absolute inset-0" />
            <div className="relative mx-auto grid w-full max-w-[88rem] gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14">
              <div className="relative flex flex-col justify-center">
                <h1 className="headline text-[2.6rem] text-ink sm:text-[3.3rem] md:text-[3.6rem] lg:text-[3.5rem] xl:text-[4.1rem]">
                  Coffee Machine
                  <br />
                  Diagnostics with an
                  <br />
                  Engineer&rsquo;s Mindset.
                </h1>

                <p className="mt-6 font-mono text-[12px] font-medium uppercase tracking-[0.32em] text-graphite">
                  Vagif Aliyev — Espresso Repair &amp; Field Notes
                </p>

                <p className="mt-6 max-w-xl font-sans text-[15px] leading-7 text-graphite">
                  I repair, rebuild, and fine-tune espresso machines and grinders
                  for cafés, roasters, and home coffee lovers.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button to="/services">View Services</Button>
                  <Button to="/contact" variant="secondary">
                    Request a Consultation
                  </Button>
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
                    className="hero-machine-img relative z-10 mx-auto block w-full max-w-none object-contain"
                    src={heroMachineImg}
                  />
                </figure>
              </div>
            </div>
          </div>

          {/* ---- 2. SECONDARY SHARP HORIZONTAL BLOCK (Matte Amber Detail) ----
            * Full-width band cutting across the field. Razor-sharp top and
            * bottom edges — no border-radius, no border, no shadow. */}
          <div className="flex flex-none items-center bg-amber px-5 py-4 sm:px-6 lg:px-10">
            <dl className="mx-auto flex w-full max-w-[88rem] flex-wrap items-baseline gap-x-10 gap-y-3">
              {[
                { label: "field hours", value: "9,200+" },
                { label: "machines serviced", value: "640" },
              ].map((stat) => (
                <div className="flex items-baseline gap-3" key={stat.label}>
                  <dd className="figure-value text-[1.6rem] text-on-amber lg:text-[1.8rem]">
                    {stat.value}
                  </dd>
                  <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-on-amber">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- 3. TERTIARY TELEMETRY DOCK / FOOTER BLOCK ----
            * Bottom full-width spec bar. Hairline dividers, zero rounding. */}
          <div className="flex min-h-[6.5rem] flex-[12] items-center bg-surface px-5 py-5 sm:px-6 lg:px-10">
            <dl className="mx-auto grid w-full max-w-[88rem] grid-cols-2 gap-y-5 lg:grid-cols-4">
              {[
                { label: "brew pressure", value: "9.0", unit: "bar" },
                { label: "turnaround", value: "24–48", unit: "hr" },
                { label: "café accounts", value: "40", unit: "+" },
                { label: "coverage", value: "GTA", unit: "" },
              ].map((spec, index) => (
                <div
                  className={`px-0 lg:px-7 ${
                    index > 0 ? "lg:border-l lg:border-rule" : ""
                  }`}
                  key={spec.label}
                >
                  <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-muted">
                    {spec.label}
                  </dt>
                  <dd className="figure-value mt-2 flex items-baseline gap-1.5 text-[1.35rem] text-ink">
                    {spec.value}
                    {spec.unit && (
                      <span className="font-mono text-[12px] font-medium lowercase tracking-[0.08em] text-muted">
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
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black/5">
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
          *       <h2 className="headline mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">
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
                <h2 className="headline mt-3 text-[1.9rem] text-ink sm:text-[2.4rem]">
                  Reading from the workshop.
                </h2>
              </div>
              <Button to="/journal" variant="quiet">
                Visit Journal
              </Button>
            </div>
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                className="aspect-[4/5] w-full rounded-xl object-cover"
                loading="lazy"
                src={contactImg}
              />
              <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-on-amber/70">
                <span>Plate 04 — Bench</span>
                <span>Workshop · YYZ</span>
              </figcaption>
            </figure>
            <div>
              <SectionLabel>04 — Get in Touch</SectionLabel>
              <h2 className="headline mt-5 max-w-3xl text-[2rem] text-ink sm:text-[2.5rem] md:text-[2.9rem]">
                Need help understanding what your machine is doing?
              </h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/85">
                Send a message if you need help with diagnostics, repair,
                calibration, or a second opinion on your espresso machine or
                grinder. I&rsquo;ll reply with a clear next step within 48
                hours.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button to="/contact">Contact Me</Button>
                <Button to="/journal" variant="secondary">
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
