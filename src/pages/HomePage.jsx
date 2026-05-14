import contactImg from "../assets/images/Contactme.jpg";
import heroMachineImg from "../assets/images/heropageimg.png";
import Button from "../components/Button.jsx";
import JournalRow from "../components/JournalRow.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { posts } from "../data/posts.js";
import { projects } from "../data/projects.js";

const MARQUEE_PHRASES = [
  "Case Studies & Field Notes",
  "What to Buy & What to Avoid",
  "Grinder Alignment & Tuning",
  "Reviews, Repairs & Engineering Logic",
];

export default function HomePage() {
  const marqueeLoop = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES];

  return (
    <>
      <div
        aria-label="Service focus ticker"
        className="marquee-strip relative mt-10 overflow-hidden border-y sm:mt-12"
      >
        <div className="marquee-fade-left pointer-events-none absolute inset-y-0 left-0 z-10 w-24" />
        <div className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 z-10 w-24" />
        <div className="marquee-track py-3">
          {marqueeLoop.map((phrase, index) => (
            <div
              aria-hidden={index >= MARQUEE_PHRASES.length}
              className="hero-muted flex shrink-0 items-center gap-8 px-8 font-mono text-[12px] font-semibold uppercase tracking-[0.32em]"
              key={`${phrase}-${index}`}
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-ink/60" />
              <span>{phrase}</span>
            </div>
          ))}
        </div>
      </div>

      <main>
        <section className="hero-technical relative overflow-hidden px-5 pb-20 pt-14 sm:px-6 sm:pt-16 lg:px-10 lg:pt-20">
          <div className="hero-bg-layer pointer-events-none absolute inset-0" />
          <div className="noise-layer pointer-events-none absolute inset-0" />
          <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-32" />

          <div className="relative z-10 mx-auto grid max-w-[88rem] gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-14">
            <div className="relative flex flex-col justify-center">
              <p className="section-no hero-muted mb-7">
                <span>No. 01 — Technician Portfolio</span>
              </p>

              <h1 className="hero-text font-display text-[3.4rem] uppercase leading-[0.92] tracking-tight sm:text-[4.4rem] md:text-[5rem] lg:text-[4.6rem] xl:text-[5.4rem]">
                Coffee Machine
                <br />
                Diagnostics with an
                <br />
                Engineer&rsquo;s Mindset.
              </h1>

              <p className="hero-muted mt-6 font-mono text-[12px] font-semibold uppercase tracking-[0.32em]">
                Vagif Aliyev — Espresso Repair &amp; Field Notes
              </p>

              <p className="hero-text mt-6 max-w-xl font-sans text-[15px] leading-7 opacity-90">
                I repair, rebuild, and fine-tune espresso machines and grinders
                for cafés, roasters, and home coffee lovers. My work focuses on
                smooth equipment performance, consistent coffee quality, and
                clear diagnostic thinking.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button className="min-h-12 px-7" to="/projects">
                  View Case Studies
                </Button>
                <Button
                  className="min-h-12 px-7"
                  to="/contact"
                  variant="secondary"
                >
                  Request a Consultation
                </Button>
              </div>

              <dl className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-[12px] font-semibold uppercase tracking-[0.24em]">
                {[
                  { label: "field hours", value: "9,200+" },
                  { label: "machines serviced", value: "640" },
                ].map((stat, index) => (
                  <div className="flex items-baseline gap-2" key={stat.label}>
                    {index > 0 && (
                      <span aria-hidden className="hero-muted">
                        ·
                      </span>
                    )}
                    <dd className="hero-text font-display text-[1.05rem] tracking-normal">
                      {stat.value}
                    </dd>
                    <dt className="hero-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>
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
        </section>

        <section
          className="border-y border-line bg-surface px-5 py-16 sm:px-6 md:py-20 lg:px-10"
          id="projects"
        >
          <div className="mx-auto max-w-[88rem]">
            <div className="mb-10 max-w-2xl">
              <SectionLabel>02 — Selected Projects</SectionLabel>
              <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
                Case studies from the bench.
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

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
            <div>
              {posts.map((post) => (
                <JournalRow key={post.title} post={post} />
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
      </main>
    </>
  );
}
