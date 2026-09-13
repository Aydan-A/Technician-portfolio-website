/**
 * Diagnostic filming guide — a sidebar card next to the contact form that
 * tells people how to shoot a clip that is actually diagnosable.
 *
 * Deliberately text-only: the card sits beside a long form, so it stays a
 * scannable checklist rather than competing with the form for attention.
 */

const steps = [
  {
    title: "Frame the front panel",
    body: "PID display, pressure gauges and group head all inside a single shot.",
  },
  {
    title: "Kill background noise",
    body: "TV and music off, so pump engagement, solenoid clicks and vacuum leaks are audible.",
  },
  {
    title: "Run the cycle",
    body: "Five seconds of idle, then engage the brew switch — ideally with a blind basket in.",
  },
];

export default function FilmingGuide() {
  return (
    <section className="filming-card" aria-labelledby="filming-guide-title">
      <p className="filming-eyebrow">Before you send</p>

      <h3 className="filming-title" id="filming-guide-title">
        How to film a 20-second diagnostic clip
      </h3>

      <ol className="filming-steps">
        {steps.map((step, index) => (
          <li className="filming-step" key={step.title}>
            <span aria-hidden="true" className="filming-step-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="filming-step-body">
              <p className="filming-step-title">{step.title}</p>
              <p className="filming-step-text">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="filming-tip">
        <span className="filming-tip-label">Tip</span>
        Twenty seconds of the machine misbehaving beats a paragraph describing
        it. Sound matters as much as the picture.
      </p>
    </section>
  );
}
