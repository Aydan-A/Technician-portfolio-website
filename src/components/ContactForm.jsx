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
} from "../data/servicePlans.js";
import Button from "./Button.jsx";
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

/**
 * One grouped block of the form. The numbered header breaks the form into four
 * short tasks instead of one long scroll of inputs.
 */
function FormSection({ children, hint, index, title }) {
  return (
    <section className="form-section">
      <header className="form-section-head">
        <span aria-hidden="true" className="form-section-index">
          {index}
        </span>
        <h3 className="form-section-title">{title}</h3>
        {hint ? <p className="form-section-hint">{hint}</p> : null}
      </header>

      <div className="form-section-body">{children}</div>
    </section>
  );
}

// Radio pills — native inputs so arrow-key navigation and screen-reader
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

export default function ContactForm({ onPlanChange, plan }) {
  const [fields, setFields] = useState(initialFields);
  const [waterSource, setWaterSource] = useState(DEFAULT_WATER_SOURCE);
  const [media, setMedia] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  // Once the visitor types their own subject we stop overwriting it.
  const [subjectEdited, setSubjectEdited] = useState(false);

  const activePlan = normalizePlan(plan);
  const serviceOptions = servicesForLocation(activePlan.location);
  // DIY consultation is delivered remotely — no technician travels to it.
  const isRemote = activePlan.service === "diy";
  const subjectValue = subjectEdited
    ? fields.subject
    : planSubject(activePlan);

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
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectValue)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <form className="contact-form" noValidate onSubmit={handleSubmit}>
      <FormSection hint="So I know who I am replying to" index="01" title="Your details">
        <div className="field-row field-row-even">
          <label className="contact-field">
            <span className="contact-field-label">Name</span>
            <input
              autoComplete="name"
              className="contact-input"
              name="name"
              onChange={update("name")}
              placeholder="Your name"
              required
              type="text"
              value={fields.name}
            />
          </label>

          <label className="contact-field">
            <span className="contact-field-label">Email</span>
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
          </label>
        </div>
      </FormSection>

      <FormSection hint="What you need and where" index="02" title="The job">
        <ChoiceGroup
          label="Machine location"
          name="plan-location"
          onChange={(location) => updatePlan({ location })}
          options={PLAN_LOCATIONS}
          value={activePlan.location}
        />

        {/* Full width rather than paired: the service labels are long enough
            that a half column would stack them. Remounting on a location
            change replays the enter animation. */}
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
        <label className="contact-field">
          <span className="contact-field-label">
            {isRemote ? "Address (optional)" : "Service address"}
          </span>
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
          <span className="contact-field-hint">
            {isRemote
              ? "Not needed for a remote consultation — useful if you may book an on-site visit later."
              : "Used to confirm you are inside the travel radius and to plan the visit."}
          </span>
        </label>
      </FormSection>

      <FormSection hint="Optional, but it speeds things up" index="03" title="The machine">
        <div className="field-row field-row-wide">
          <label className="contact-field">
            <span className="contact-field-label">Machine name &amp; model</span>
            <input
              className="contact-input"
              name="machine"
              onChange={update("machine")}
              placeholder="e.g. La Marzocco Linea Mini"
              type="text"
              value={fields.machine}
            />
          </label>

          <label className="contact-field">
            <span className="contact-field-label">Age</span>
            <input
              className="contact-input"
              name="machineAge"
              onChange={update("machineAge")}
              placeholder="e.g. 4 years"
              type="text"
              value={fields.machineAge}
            />
          </label>
        </div>

        {/* Water is the usual culprit — pills get their own row so they never
            wrap against a neighbouring input. */}
        <ChoiceGroup
          label="Water source"
          name="water-source"
          onChange={setWaterSource}
          options={WATER_SOURCES}
          value={waterSource}
        />

        <label className="contact-field">
          <span className="contact-field-label">
            Water filtration system (optional)
          </span>
          <input
            className="contact-input"
            name="waterFilter"
            onChange={update("waterFilter")}
            placeholder="e.g. BWT Bestmax, softener pouch, reverse osmosis, tap water…"
            type="text"
            value={fields.waterFilter}
          />
        </label>
      </FormSection>

      <FormSection hint="The part I actually diagnose from" index="04" title="The symptom">
        {/* Prefilled from the selection above, editable. */}
        <label className="contact-field">
          <span className="contact-field-label">Subject</span>
          <input
            className="contact-input"
            name="subject"
            onChange={handleSubjectChange}
            placeholder="Repair, diagnostics, a question…"
            type="text"
            value={subjectValue}
          />
        </label>

        <label className="contact-field">
          <span className="contact-field-label">Message</span>
          <textarea
            className="contact-input contact-textarea"
            name="message"
            onChange={update("message")}
            placeholder="What's the machine doing — or not doing?"
            required
            rows={6}
            value={fields.message}
          />
        </label>

        <MediaUpload
          items={media}
          onItemsChange={setMedia}
          onVideoLinkChange={setVideoLink}
          videoLink={videoLink}
        />
      </FormSection>

      <div className="form-submit">
        <p className="form-submit-note">
          This opens your email client with everything filled in — nothing is
          sent until you press send there.
        </p>
        <Button
          className="h-12 min-h-12 w-full px-8 font-mono text-[12px] uppercase tracking-[0.18em] sm:w-auto sm:min-w-[200px]"
          type="submit"
        >
          Send message →
        </Button>
      </div>
    </form>
  );
}
