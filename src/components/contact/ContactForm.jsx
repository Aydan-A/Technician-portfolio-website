import { useState } from "react";
import {
  DEFAULT_WATER_SOURCE,
  PLAN_LOCATIONS,
  WATER_SOURCES,
  normalizePlan,
  planLabel,
  planSubject,
  servicesForLocation,
  waterSourceLabel,
} from "../../data/servicePlans.js";
import Button from "../ui/Button.jsx";
import FilmingGuide from "./FilmingGuide.jsx";
import MediaUpload from "./MediaUpload.jsx";

const CONTACT_EMAIL = "vaqif.aliyev.96@gmail.com";

const initialFields = {
  name: "",
  email: "",
  address: "",
  machine: "",
  machineAge: "",
  waterFilter: "",
  subject: "",
  message: "",
};

/* One field. Optional fields say so in the label — marking the optional few
 * reads faster than starring the required many. */
function Field({ children, hint, label, optional = false }) {
  return (
    <label className="contact-field">
      <span className="contact-field-label">
        {label}
        {optional ? (
          <span className="contact-field-optional">optional</span>
        ) : null}
      </span>
      {children}
      {hint ? <span className="contact-field-hint">{hint}</span> : null}
    </label>
  );
}

// Radio pills — native inputs, so arrow-key navigation and screen-reader
// grouping come for free; the visual state is driven by `is-active`.
function ChoiceGroup({ label, name, onChange, options, value }) {
  return (
    <fieldset className="contact-field">
      <legend className="contact-field-label">{label}</legend>
      <div className="plan-options">
        {options.map((option) => {
          const isActive = option.id === value;
          return (
            <label
              className={`plan-option ${isActive ? "is-active" : ""}`}
              key={option.id}
            >
              <input
                checked={isActive}
                className="sr-only"
                name={name}
                onChange={() => onChange(option.id)}
                type="radio"
                value={option.id}
              />
              <span aria-hidden="true" className="plan-option-dot" />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* One continuous request form: twelve fields in the order a technician would
 * ask them, on one card, with no numbered sections or per-section hints. The
 * only progressive disclosure left is the filming guide, which is folded away
 * beside the upload it belongs to.
 *
 * `heading` renders the form's own title; pages that already introduce the
 * form (Services) pass `heading={null}`. */
export default function ContactForm({
  heading = "Send a request",
  onPlanChange,
  plan,
}) {
  const [fields, setFields] = useState(initialFields);
  const [waterSource, setWaterSource] = useState(DEFAULT_WATER_SOURCE);
  const [media, setMedia] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  // Once the visitor types their own subject we stop overwriting it.
  const [subjectEdited, setSubjectEdited] = useState(false);
  // Set on submit so the hand-off stays on screen: a mailto: alone is silent
  // when no mail app is registered, which is most Gmail-in-a-browser visitors.
  const [handoff, setHandoff] = useState(null);
  const [copied, setCopied] = useState(false);

  const activePlan = normalizePlan(plan);
  const serviceOptions = servicesForLocation(activePlan.location);
  // DIY consultation is delivered remotely — no technician travels to it.
  const isRemote = activePlan.service === "diy";
  const subjectValue = subjectEdited ? fields.subject : planSubject(activePlan);

  function updatePlan(patch) {
    onPlanChange?.(normalizePlan({ ...activePlan, ...patch }));
  }

  function update(key) {
    return (event) =>
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
  }

  function handleSubjectChange(event) {
    const { value } = event.target;
    setFields((prev) => ({ ...prev, subject: value }));
    // Emptying the field hands control back to the suggested subject.
    setSubjectEdited(value.trim() !== "");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const details = [
      `Service requested: ${planLabel(activePlan)}`,
      fields.address && `Address: ${fields.address}`,
      fields.machine && `Machine: ${fields.machine}`,
      fields.machineAge && `Age: ${fields.machineAge}`,
      `Water source: ${waterSourceLabel(waterSource)}`,
      fields.waterFilter && `Water filtration: ${fields.waterFilter}`,
      videoLink && `Video link: ${videoLink}`,
      media.length &&
        `Media to attach (${media.length}): ${media
          .map((item) => item.name)
          .join(", ")}`,
    ]
      .filter(Boolean)
      .join("\n");
    const body = `Hi Vagif,\n\n${fields.message}\n\n${details}${details ? "\n\n" : ""}— ${fields.name}\n${fields.email}`;
    const subject = encodeURIComponent(subjectValue);
    const encodedBody = encodeURIComponent(body);

    setCopied(false);
    setHandoff({
      mailto: `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodedBody}`,
      // Web compose, for anyone whose mail lives in a browser tab.
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${subject}&body=${encodedBody}`,
      text: `To: ${CONTACT_EMAIL}\nSubject: ${subjectValue}\n\n${body}`,
    });

    // Try the visitor's mail app first; the panel below covers the case where
    // nothing is registered to handle it.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodedBody}`;
  }

  async function copyMessage() {
    if (!handoff) return;
    try {
      await navigator.clipboard.writeText(handoff.text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <div className="contact-form-card">
        {heading ? (
          <div className="contact-form-head">
            <h2 className="headline-sm text-[1.4rem] text-ink">{heading}</h2>
            <p className="contact-form-lede">
              The more of it you fill in, the closer I am to an answer before I
              arrive.
            </p>
          </div>
        ) : null}

        <div className="contact-fields">
          <div className="field-row field-row-even">
            <Field label="Name">
              <input
                autoComplete="name"
                className="contact-input"
                name="name"
                onChange={update("name")}
                required
                type="text"
                value={fields.name}
              />
            </Field>

            <Field label="Email">
              <input
                autoComplete="email"
                className="contact-input"
                name="email"
                onChange={update("email")}
                placeholder="you@domain.com"
                required
                type="email"
                value={fields.email}
              />
            </Field>
          </div>

          <ChoiceGroup
            label="Machine location"
            name="plan-location"
            onChange={(location) => updatePlan({ location })}
            options={PLAN_LOCATIONS}
            value={activePlan.location}
          />

          {/* Remounting on a location change replays the enter animation. */}
          <div className="plan-choice-swap" key={activePlan.location}>
            <ChoiceGroup
              label="Service type"
              name="plan-service"
              onChange={(service) => updatePlan({ service })}
              options={serviceOptions}
              value={activePlan.service}
            />
          </div>

          {/* Remote DIY consultations do not need an address, so it relaxes to
              optional rather than disappearing. */}
          <Field
            hint={
              isRemote
                ? undefined
                : "Confirms you are inside the travel radius."
            }
            label="Service address"
            optional={isRemote}
          >
            <input
              autoComplete="street-address"
              className="contact-input"
              name="address"
              onChange={update("address")}
              placeholder="Street, city, postal code"
              required={!isRemote}
              type="text"
              value={fields.address}
            />
          </Field>

          <div className="field-row field-row-wide">
            <Field label="Machine &amp; model" optional>
              <input
                className="contact-input"
                name="machine"
                onChange={update("machine")}
                placeholder="e.g. La Marzocco Linea Mini"
                type="text"
                value={fields.machine}
              />
            </Field>

            <Field label="Age" optional>
              <input
                className="contact-input"
                name="machineAge"
                onChange={update("machineAge")}
                placeholder="e.g. 4 years"
                type="text"
                value={fields.machineAge}
              />
            </Field>
          </div>

          {/* Water is the usual culprit, so it is asked for every request. */}
          <ChoiceGroup
            label="Water source"
            name="water-source"
            onChange={setWaterSource}
            options={WATER_SOURCES}
            value={waterSource}
          />

          <Field label="Water filtration" optional>
            <input
              className="contact-input"
              name="waterFilter"
              onChange={update("waterFilter")}
              placeholder="e.g. BWT Bestmax, softener pouch, reverse osmosis"
              type="text"
              value={fields.waterFilter}
            />
          </Field>

          <Field label="Subject">
            <input
              className="contact-input"
              name="subject"
              onChange={handleSubjectChange}
              type="text"
              value={subjectValue}
            />
          </Field>

          <Field label="What the machine is doing">
            <textarea
              className="contact-input contact-textarea"
              name="message"
              onChange={update("message")}
              placeholder="Symptoms, when they started, anything you have already tried…"
              required
              rows={6}
              value={fields.message}
            />
          </Field>

          <MediaUpload
            items={media}
            onItemsChange={setMedia}
            onVideoLinkChange={setVideoLink}
            videoLink={videoLink}
          />

          {/* Folded away next to the upload it serves, instead of running as a
              second column beside the form. */}
          <details className="contact-disclosure">
            <summary className="contact-disclosure-summary">
              How to film a 20-second diagnostic clip
            </summary>
            <div className="contact-disclosure-body">
              <FilmingGuide />
            </div>
          </details>
        </div>

        <div className="form-submit">
          <p className="form-submit-note">
            Sends to{" "}
            <a className="contact-email-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            — this opens your mail app with everything filled in, and nothing
            leaves your browser until you press send there. Reply within 48
            hours.
          </p>
          <Button className="w-full sm:w-auto sm:min-w-[220px]" type="submit">
            Send request →
          </Button>
        </div>

        {handoff ? (
          <div aria-live="polite" className="contact-handoff" role="status">
            <p className="contact-handoff-title">
              Your mail app should be opening, addressed to {CONTACT_EMAIL}.
            </p>
            <p className="contact-handoff-text">
              If nothing happened, your browser has no mail app registered —
              use one of these instead:
            </p>
            <div className="contact-handoff-actions">
              <a
                className="contact-handoff-action"
                href={handoff.gmail}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open in Gmail
              </a>
              <a className="contact-handoff-action" href={handoff.mailto}>
                Try mail app again
              </a>
              <button
                className="contact-handoff-action"
                onClick={copyMessage}
                type="button"
              >
                {copied ? "Message copied ✓" : "Copy the message"}
              </button>
            </div>
            {media.length > 0 ? (
              <p className="contact-handoff-text">
                Photos and video are not carried across automatically — attach
                the {media.length === 1 ? "file" : `${media.length} files`} in
                your mail app before sending.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  );
}
