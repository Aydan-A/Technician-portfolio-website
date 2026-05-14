export default function ProjectCard({ project }) {
  return (
    <article className="group rounded-[2rem] border border-border bg-stone-soft p-5 shadow-soft transition-colors hover:border-copper/70">
      <div className="mb-6 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[2rem] border border-border bg-graphite">
        {project.image ? (
          <img
            alt={project.imageAlt ?? project.title}
            className="h-full w-full object-cover"
            src={project.image}
          />
        ) : (
          <>
            <div className="h-24 w-32 rounded-full border border-steel/25" />
            <div className="-ml-12 h-16 w-24 rounded-full border border-copper/35 bg-black/20" />
          </>
        )}
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{project.category}</span>
        <span className="h-px w-8 bg-border" />
        <span>{project.caseLabel}</span>
      </div>
      <h3 className="font-serif text-2xl text-paper">{project.title}</h3>
      <p className="mt-4 text-sm leading-7 text-ash">{project.description}</p>
      <a
        className="mt-6 inline-flex text-sm font-medium text-copper transition-colors group-hover:text-paper"
        href="#projects"
      >
        View case notes
      </a>
    </article>
  );
}
