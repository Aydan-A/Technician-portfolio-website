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

// Radio pills — native inputs so arrow-key navigation and screen-reader
// grouping come for free; the visual state is driven by `is-active`.
function ChoiceGroup({ label, name, onChange, options, value }) {
  return (
    <fieldset className="contact-field">
      <legend className="contact-field-label">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
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
    <form
      className="contact-form grid gap-5"
      noValidate
      onSubmit={handleSubmit}
    >
      {/* Row 1 — who is writing */}
      <div className="grid gap-5 sm:grid-cols-2">
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

      {/* Row 2 — where the machine lives */}
      <ChoiceGroup
        label="Machine location"
        name="plan-location"
        onChange={(location) => updatePlan({ location })}
        options={PLAN_LOCATIONS}
        value={activePlan.location}
      />

      {/* Row 3 — services offered for that location; remounting on a location
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

      {/* Row 4 — where the visit happens. Remote DIY consultations do not
          need one, so it relaxes to optional rather than disappearing. */}
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

      {/* Row 5 — the machine itself */}
      <div className="grid gap-5 sm:grid-cols-[1.6fr_1fr]">
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

      {/* Row 6 — water, the usual culprit */}
      <div className="grid gap-5 sm:grid-cols-2">
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
            placeholder="e.g., BWT Bestmax, Softener pouch, Reverse Osmosis, Tap water…"
            type="text"
            value={fields.waterFilter}
          />
        </label>
      </div>

      {/* Row 7 — prefilled from the selection above, editable */}
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

      {/* Row 8 — evidence */}
      <MediaUpload
        items={media}
        onItemsChange={setMedia}
        onVideoLinkChange={setVideoLink}
        videoLink={videoLink}
      />

      {/* Row 9 — the symptom */}
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

      <div className="flex flex-col gap-4 sm:flex-row-reverse sm:items-center sm:justify-between">
        <Button
          className="h-12 min-h-12 min-w-[200px] px-8 font-mono text-[12px] uppercase tracking-[0.18em]"
          type="submit"
        >
          Send message →
        </Button>
      </div>
    </form>
  );
}
