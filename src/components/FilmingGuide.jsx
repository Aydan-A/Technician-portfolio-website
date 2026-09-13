/**
 * Diagnostic filming guide — sits in the left column of the contact form and
 * tells people how to shoot a clip that is actually diagnosable.
 *
 * Image slot: drop a real framing photo at src/assets/images/filming-frame.jpg,
 * import it here and pass it as `image`. With no image the card falls back to
 * the framing diagram below, so the slot is never an empty box.
 */

const steps = [
  {
    title: "Frame the front panel",
    body: "Ensure your camera captures the PID display, pressure gauges, and group head in a single view.",
  },
  {
    title: "Kill background noise",
    body: "Turn off TV/music so we can hear pump engagement, solenoid clicks, or vacuum leaks.",
  },
  {
    title: "Run the cycle",
    body: "Record 5 seconds of idle state, then engage the brew switch/lever (ideally with a blind basket inserted).",
  },
];

const FRAMING_ALT =
  "Phone held square to the machine so the PID display, pressure gauges and group head all sit inside one shot.";

function FramingDiagram() {
  return (
    <svg
      aria-hidden="true"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 640 512"
    >
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      >
        {/* body sides and drip tray, cropped by the frame */}
        <g className="stroke-ink/45">
          <path d="M61 180V484M503 180V484" />
          <rect
            className="fill-ink/[0.05]"
            height="44"
            rx="10"
            width="507"
            x="31"
            y="484"
          />
          <g className="stroke-ink/20" strokeWidth="2">
            <path d="M54 498h186M54 510h186M400 498h116M400 510h116" />
          </g>
        </g>

        {/* Upper housing. Fill and outline are separate so the bottom edge can
            break around the steam knob instead of running through it. */}
        <rect className="fill-ink/[0.05]" height="181" rx="22" width="511" x="27" y="6" />
        <path
          className="stroke-ink/55"
          d="M246 187H49a22 22 0 01-22-22V28A22 22 0 0149 6h467a22 22 0 0122 22v137a22 22 0 01-22 22H308"
        />

        {/* PID readout */}
        <g>
          <rect
            className="fill-ink/[0.12] stroke-ink/55"
            height="70"
            rx="8"
            width="147"
            x="69"
            y="64"
          />
          <text
            className="fill-bronze font-mono"
            fontSize="40"
            stroke="none"
            textAnchor="middle"
            x="142"
            y="113"
          >
            93°
          </text>
        </g>

        {/* brew and boiler pressure gauges */}
        <g className="stroke-ink/55">
          <circle className="fill-ink/[0.04]" cx="331" cy="94" r="44" />
          <circle className="fill-ink/[0.04]" cx="445" cy="94" r="44" />
          <g className="stroke-ink/20" strokeWidth="1.5">
            <circle cx="331" cy="94" r="36" />
            <circle cx="445" cy="94" r="36" />
          </g>
          <g className="stroke-bronze">
            <path d="M331 94l21-24M445 94l-9-30" />
          </g>
          <g className="fill-bronze" stroke="none">
            <circle cx="331" cy="94" r="5" />
            <circle cx="445" cy="94" r="5" />
          </g>
        </g>

        {/* steam knob straddling the housing edge */}
        <g className="stroke-ink/50">
          <circle className="fill-ink/[0.08]" cx="277" cy="178" r="31" />
          <path d="M277 178v-19" />
        </g>

        {/* shoulders down to the group head */}
        <path className="stroke-ink/50" d="M140 187l41 38M437 187l-41 38" />

        {/* group head */}
        <g className="stroke-ink/55">
          <rect className="fill-ink/[0.08]" height="44" rx="6" width="215" x="181" y="225" />
          <path className="stroke-ink/25" d="M181 247h215" strokeWidth="1.5" />
        </g>

        {/* portafilter, collar and handle */}
        <g className="stroke-ink/60">
          <rect className="fill-ink/[0.10]" height="39" rx="5" width="123" x="209" y="269" />
          <g transform="rotate(-2 342 289)">
            <rect className="fill-ink/[0.12]" height="43" rx="5" width="24" x="330" y="267" />
            <rect className="fill-ink/[0.08]" height="30" rx="15" width="284" x="352" y="274" />
          </g>
          <path
            className="fill-ink/[0.08]"
            d="M248 308h72v6c0 20-16 30-26 30h-20c-10 0-26-10-26-30z"
          />
          <path className="stroke-ink/40" d="M263 344q21-16 42 0" strokeWidth="2" />
          <rect className="fill-ink/[0.12]" height="12" rx="2" width="13" x="266" y="344" />
          <rect className="fill-ink/[0.12]" height="12" rx="2" width="13" x="289" y="344" />
        </g>

        {/* two shots pulling */}
        <g className="stroke-bronze/70">
          <path d="M272 358c-2 12 0 19 4 24M296 358c2 12 0 19-4 24" />
          <path className="stroke-bronze/35" d="M248 364l-13-11M320 364l13-11" strokeWidth="2.5" />
        </g>

        {/* cup */}
        <g className="stroke-ink/55">
          <ellipse className="fill-bronze/20" cx="285" cy="385" rx="60" ry="9" stroke="none" />
          <path
            className="fill-ink/[0.05]"
            d="M215 384c2 58 17 100 43 100h54c26 0 41-42 43-100"
          />
          <ellipse className="fill-ink/[0.04]" cx="285" cy="384" rx="70" ry="13" />
          <path d="M356 402c30 6 28 46-8 50" />
        </g>

        {/* Technical callouts — names the three parts step 01 asks for, in the
            annotated-drawing style of the reference. */}
        <g>
          {/* Centreline, broken around the group head label. */}
          <g className="stroke-bronze/30" strokeDasharray="7 7" strokeWidth="2">
            <path d="M285 22v210M285 278v206" />
          </g>
          <g className="fill-bronze/50" stroke="none">
            <path d="M285 12l-5 11h10z" />
            <path d="M285 496l-5-11h10z" />
          </g>

          {/* Width dimension at group-head height. */}
          <g className="stroke-bronze/35" strokeWidth="2">
            <path d="M20 247h32M620 247h-108" />
          </g>
          <g className="fill-bronze/50" stroke="none">
            <path d="M57 247l-10-5v10z" />
            <path d="M508 247l10-5v10z" />
          </g>

          {/* Leader lines: PID stem, gauge bracket spanning both dials. */}
          <g className="stroke-bronze/60" strokeWidth="2">
            <path d="M136 140v16" />
            <path d="M331 144v8h114v-8" />
            <path d="M388 152v6" />
          </g>

          <g
            className="fill-bronze font-mono"
            letterSpacing="1.5"
            stroke="none"
          >
            <text fontSize="15" textAnchor="middle" x="136" y="172">
              PID
            </text>
            <text fontSize="15" textAnchor="middle" x="388" y="172">
              PRESSURE GAUGES
            </text>
            <text fontSize="15" textAnchor="middle" x="289" y="262">
              GROUP HEAD
            </text>
          </g>
        </g>

        {/* viewfinder corner brackets */}
        <path
          className="stroke-bronze"
          d="M24 68V24h44M572 24h44v44M616 444v44h-44M68 488H24v-44"
          strokeLinecap="square"
          strokeWidth="4"
        />
      </g>
    </svg>
  );
}

export default function FilmingGuide({ image, imageAlt = FRAMING_ALT }) {
  return (
    <section className="filming-card mt-10">
      <div className="filming-frame">
        {image ? (
          <img
            alt={imageAlt}
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
            src={image}
          />
        ) : (
          <FramingDiagram />
        )}
      </div>

      <h3 className="filming-title mt-6">
        How to film a 20-second diagnostic clip
      </h3>

      <ol className="filming-steps mt-5">
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
    </section>
  );
}
