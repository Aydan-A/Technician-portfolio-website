import CaseStudyCard from "../components/CaseStudyCard.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { projects } from "../data/projects.js";

const DISCIPLINES = [
  "Machine Diagnostics",
  "Repair Stories",
  "Grinder Calibration",
  "Technical Modifications",
  "Workflow Improvements",
  "Product Teardowns",
];

export default function ProjectsPage() {
  return (
    <main className="bg-stone text-paper">
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <SectionLabel>02 — Projects</SectionLabel>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.01em] text-paper sm:text-6xl lg:text-7xl">
              A technical portfolio,
              <br />
              not a gallery.
            </h1>
            <p className="mt-6 max-w-xl font-sans text-[15px] leading-7 text-ash">
              I help people understand coffee equipment from the inside out.
              Each case file walks through the machine that came in, the
              thinking that isolated the cause, the fix, and how it held up.
            </p>
          </div>

          <ul className="grid grid-cols-2 gap-3 self-end font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            {DISCIPLINES.map((label) => (
              <li
                className="rounded-full border border-border bg-stone-soft px-4 py-2 text-center text-ash"
                key={label}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex items-center gap-4 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>{String(projects.length).padStart(2, "0")} Case Files</span>
          <span className="h-px flex-1 bg-border" />
          <span>Newest first</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 sm:gap-16">
          {projects.map((project, index) => (
            <CaseStudyCard
              index={index}
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
