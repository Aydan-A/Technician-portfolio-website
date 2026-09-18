/**
 * Diagnostic filming guide — the three things that make a clip diagnosable.
 *
 * It lives inside the contact form's disclosure, next to the upload field it
 * serves, so it carries no card chrome or heading of its own: the <summary>
 * that reveals it is the heading.
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
    <>
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
    </>
  );
}
