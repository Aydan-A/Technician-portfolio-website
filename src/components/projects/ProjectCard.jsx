import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-shell p-5 transition-colors hover:border-rule">
      <figure className="panel mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden">
        {project.image ? (
          <img
            alt={project.imageAlt ?? project.title}
            className="h-full w-full object-cover"
            src={project.image}
          />
        ) : (
          <div aria-hidden className="relative flex h-full w-full items-center justify-center">
            <div className="h-24 w-32 rounded-full border border-on-amber/30" />
            <div className="-ml-12 h-16 w-24 rounded-full border border-on-amber/35" />
          </div>
        )}
      </figure>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-graphite">
        <span className="text-muted">{project.category}</span>
        <span className="h-px w-8 bg-line" />
        <span>{project.caseLabel}</span>
      </div>
      <h3 className="font-sans text-[1.5rem] font-extrabold leading-tight tracking-[-0.025em] text-ink">
        {project.title}
      </h3>
      <p className="mt-4 text-[15px] leading-7 text-ink/80">
        {project.summary ?? project.description}
      </p>
      <Link
        className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.26em] text-ink transition-colors group-hover:text-bronze"
        to={`/projects#${project.id}`}
      >
        View case notes
        <span
          aria-hidden
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </article>
  );
}
