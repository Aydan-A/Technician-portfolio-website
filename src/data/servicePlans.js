// Shared vocabulary for the services-page CTAs and the contact form, so a card
// button and the form's selection controls can never drift apart.

export const PLAN_LOCATIONS = [
  { id: "home", label: "Home" },
  { id: "cafe", label: "Cafe" },
];

export const PLAN_SERVICES = [
  { id: "repair", label: "Repair", locations: ["home", "cafe"] },
  {
    id: "pm",
    label: "Preventative Maintenance (PM)",
    locations: ["home", "cafe"],
  },
  { id: "diy", label: "DIY Consultation", locations: ["home"] },
];

export const WATER_SOURCES = [
  { id: "tank", label: "Water Tank" },
  { id: "plumbed", label: "Plumbed" },
  { id: "unknown", label: "Unknown" },
];

// Defaulting to "Unknown" keeps the field answerable for everyone — nobody is
// blocked from submitting because they cannot inspect their plumbing.
export const DEFAULT_WATER_SOURCE = "unknown";

// Subject lines offered per selection. Editable once shown in the field.
const PLAN_SUBJECTS = {
  "home:repair": "Home repair — on-site diagnostics",
  "home:pm": "Home preventative maintenance booking",
  "home:diy": "DIY consultation request",
  "cafe:repair": "Commercial repair & emergency service",
  "cafe:pm": "Commercial PM program enquiry",
};

export const DEFAULT_PLAN = { location: "home", service: "repair" };

export function servicesForLocation(location) {
  return PLAN_SERVICES.filter((service) =>
    service.locations.includes(location),
  );
}

// Keeps a plan internally consistent: DIY guidance is residential-only, so
// switching to the cafe track falls back to the first service it does offer.
export function normalizePlan(plan) {
  const location = PLAN_LOCATIONS.some((item) => item.id === plan?.location)
    ? plan.location
    : DEFAULT_PLAN.location;

  const allowed = servicesForLocation(location);
  const service = allowed.some((item) => item.id === plan?.service)
    ? plan.service
    : allowed[0].id;

  return { location, service };
}

// Human-readable summary used in the outgoing email subject and body.
export function planLabel(plan) {
  const { location, service } = normalizePlan(plan);
  const locationLabel = PLAN_LOCATIONS.find((item) => item.id === location);
  const serviceLabel = PLAN_SERVICES.find((item) => item.id === service);
  return `${locationLabel.label} · ${serviceLabel.label}`;
}

export function waterSourceLabel(id) {
  const match = WATER_SOURCES.find((item) => item.id === id);
  return match ? match.label : "Unknown";
}

// Suggested subject line for a plan, used to prefill the editable field.
export function planSubject(plan) {
  const { location, service } = normalizePlan(plan);
  return PLAN_SUBJECTS[`${location}:${service}`] ?? planLabel(plan);
}
