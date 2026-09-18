import { useMemo, useState } from "react";
import CaseStudyCard from "../components/projects/CaseStudyCard.jsx";
import SectionLabel from "../components/ui/SectionLabel.jsx";
import { projects } from "../data/projects.js";

const ALL = "All";

export default function ProjectsPage() {
  const filters = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))],
    [],
  );

  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="bg-page text-ink">
      <section className="w-full px-5 pt-14 sm:px-6 lg:px-10 lg:pt-20 2xl:px-16">
        <SectionLabel>02 — Projects</SectionLabel>

        <div className="mt-5 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h1 className="headline text-[2.6rem] text-ink sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.5rem]">
              Case files from
              <br />
              the workshop.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-graphite sm:text-lg sm:leading-8">
              I help people understand coffee equipment from the inside out.
              Each case walks through the machine that came in, the thinking
              that isolated the cause, the fix, and how it held up.
            </p>
          </div>
          <div className="lg:pb-2">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              Filter by discipline
            </p>
            <div
              aria-label="Filter case studies by discipline"
              className="mt-3 flex flex-wrap gap-2"
              role="tablist"
            >
              {filters.map((label) => {
                const isActive = label === active;
                return (
                  <button
                    aria-selected={isActive}
                    className={`project-filter ${isActive ? "is-active" : ""}`}
                    key={label}
                    onClick={() => setActive(label)}
                    role="tab"
                    type="button"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>
            {String(visible.length).padStart(2, "0")} of{" "}
            {String(projects.length).padStart(2, "0")} Case Files
          </span>
          <span className="h-px flex-1 bg-line" />
          <span>Newest first</span>
        </div>
      </section>

      <section className="w-full px-5 pb-24 pt-10 sm:px-6 lg:px-10 2xl:px-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {visible.map((project) => (
            <CaseStudyCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
