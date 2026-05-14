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
              className="hero-muted flex shrink-0 items-center gap-8 px-8 font-mono text-[12px] uppercase tracking-[0.32em]"
              key={`${phrase}-${index}`}
            >
              <span className="h-1.5 w-1.5 rotate-45 bg-copper" />
              <span>{phrase}</span>
            </div>
          ))}
        </div>
      </div>

      <main>
        <section className="hero-technical relative overflow-hidden px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="hero-bg-layer pointer-events-none absolute inset-0" />
          <div className="noise-layer pointer-events-none absolute inset-0" />
          <div className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-32" />

          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.4fr_1.3fr_1.3fr] lg:items-stretch lg:gap-8">
            <aside className="relative hidden lg:flex lg:flex-col lg:justify-between lg:pl-6">
              <div className="flex justify-center">
                <div
                  aria-label="Coffee Machine Diagnostics With Engineering Logic"
                  className="paper-tag relative w-44 -rotate-[6deg] rounded-md px-4 pb-4 pt-7"
                >
                  <span className="paper-tag-eyelet absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full" />

                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-[#555555]">
                    <span>No. 014</span>
                    <span>YYZ</span>
                  </div>

                  <div className="mt-3 font-display text-[1.3rem] uppercase leading-[1.02] tracking-[0.02em] text-[#1f1812]">
                    Coffee
                    <br />
                    Machine
                    <br />
                    Diagnostics
                  </div>

                  <div className="mt-3 h-px w-full bg-[#7a5a32]/35" />

                  <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-[#333333]">
                    With Engineering
                    <br />
                    Logic
                  </div>

                  <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-[#555555]">
                    <span>Est. 2025</span>
                    <span>Stamped</span>
                  </div>
                </div>
              </div>
            </aside>

            <div className="relative flex flex-col justify-center lg:pl-8">
              <div className="hero-glass hero-text mb-7 inline-flex items-center gap-3 self-start rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                01 — Technician Portfolio
              </div>

              <h1 className="hero-text font-display text-[5.4rem] uppercase leading-[0.86] tracking-tight sm:text-[7.6rem] md:text-[8.2rem] lg:text-[6.4rem] xl:text-[7.2rem]">
                I&rsquo;m Vagif.
              </h1>

              <p className="hero-text mt-6 max-w-xl font-sans text-lg font-medium leading-snug tracking-[-0.005em] sm:text-xl">
                Coffee technician, repair specialist, and espresso systems
                troubleshooter.
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
                  Book a Diagnostic
                </Button>
              </div>

              <dl className="mt-12 flex max-w-xl flex-row items-center gap-5">
                {[
                  { label: "Field Hours", value: "9,200+" },
                  { label: "Machines Serviced", value: "640" },
                  { label: "Avg. Turnaround", value: "48h" },
                ].map((stat) => (
                  <div
                    className="hero-glass flex h-28 w-28 flex-col items-center justify-center rounded-full border text-center backdrop-blur-sm"
                    key={stat.label}
                  >
                    <dd className="hero-text font-display text-2xl leading-none tracking-normal">
                      {stat.value}
                    </dd>
                    <dt className="hero-text mt-1.5 max-w-[5.5rem] px-1 font-mono text-[9.5px] font-medium uppercase leading-[1.15] tracking-[0.16em] opacity-80">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative flex overflow-visible lg:items-center lg:justify-center lg:pl-4">
              <img
                alt="Espresso machine schematic"
                className="hero-machine-img w-full max-w-none origin-center object-contain lg:scale-125"
                src={heroMachineImg}
              />
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-stone-soft px-5 py-16 sm:px-6 md:py-20 lg:px-8"
          id="projects"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <SectionLabel>02 — Selected Projects</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl text-paper sm:text-4xl">
                Case studies from the bench.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="border-y border-border bg-black px-5 py-16 sm:px-6 md:py-20 lg:px-8"
          id="journal"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 max-w-2xl">
              <SectionLabel>03 — Journal</SectionLabel>
              <h2 className="mt-4 font-serif text-3xl text-paper sm:text-4xl">
                Reading from the workshop.
              </h2>
            </div>
            <div>
              {posts.map((post) => (
                <JournalRow key={post.title} post={post} />
              ))}
            </div>
            <div className="border-t border-border pt-7">
              <Button to="/journal">Visit Journal</Button>
            </div>
          </div>
        </section>

        <section
          className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8"
          id="contact"
        >
          <img
            alt="Vagif at the workbench servicing an espresso machine"
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
            loading="lazy"
            src={contactImg}
          />
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-paper sm:text-4xl">
              Have a machine issue or a question?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ash">
              Send a message if you need help with diagnostics, repair,
              calibration, or a second opinion on your espresso machine or
              grinder.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="mailto:vaqif.aliyev.96@gmail.com">
                Contact Me
              </Button>
              <Button to="/journal" variant="secondary">
                Read the Journal
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
