function CaseImage({ project }) {
  if (project.image) {
    return (
      <figure className="case-card-image case-card-image--filled">
        <img
          alt={project.imageAlt ?? project.title}
          className="h-full w-full object-cover"
          loading="lazy"
          src={project.image}
        />
      </figure>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="case-card-image case-card-image--empty flex items-center justify-center"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Image · to come
      </span>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div className="case-card-section">
      <p className="case-card-section-label">{label}</p>
      <div className="case-card-section-body">{children}</div>
    </div>
  );
}

export default function CaseStudyCard({ project, index }) {
  const orientation = index % 2 === 0 ? "left" : "right";

  return (
    <article
      className={`case-card case-card--${orientation}`}
      id={project.id}
    >
      <div className="case-card-media">
        <CaseImage project={project} />
        <div className="case-card-meta">
          {project.meta?.map((item) => (
            <div className="case-card-meta-item" key={item.label}>
              <span className="case-card-meta-label">{item.label}</span>
              <span className="case-card-meta-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="case-card-body">
        <header className="case-card-header">
          <div className="case-card-tags">
            <span>{project.category}</span>
            <span className="case-card-tag-divider" aria-hidden="true" />
            <span>{project.caseLabel}</span>
          </div>
          <h3 className="case-card-title">{project.title}</h3>
          <p className="case-card-summary">{project.summary}</p>
        </header>

        <Section label="Challenge">
          <p>{project.challenge}</p>
        </Section>

        <Section label="Process">
          <ol className="case-card-process">
            {project.process.map((step, i) => (
              <li key={i}>
                <span className="case-card-step" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section label="Solution">
          <p>{project.solution}</p>
        </Section>

        <Section label="Result">
          <p className="case-card-result">{project.result}</p>
        </Section>
      </div>
    </article>
  );
}
