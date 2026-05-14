import { useState } from "react";
import Button from "../components/Button.jsx";
import SectionLabel from "../components/SectionLabel.jsx";

const CONTACT_EMAIL = "vaqif.aliyev.96@gmail.com";

const channels = [
  {
    key: "email",
    label: "Write",
    handle: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    note: "Diagnostics, repair quotes, second opinions, or just a coffee question.",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "linkedin.com/in/vaqif-aliyev",
    href: "https://www.linkedin.com/in/vaqif-aliyev/",
    note: "Background, references, the longer story.",
  },
];

function ChannelRow({ channel }) {
  const isExternal = channel.href.startsWith("http");

  return (
    <li className="contact-row group">
      <a
        className="grid items-baseline gap-x-6 gap-y-2 py-7 sm:grid-cols-[6rem_1fr_auto] sm:py-9"
        href={channel.href}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-bronze">
          {channel.label}
        </span>

        <div className="flex flex-col gap-2">
          <span className="font-display text-3xl uppercase leading-[0.95] tracking-[0.01em] text-ink transition-colors sm:text-4xl group-hover:text-bronze">
            {channel.handle}
          </span>
          <span className="max-w-xl text-sm leading-6 text-graphite">
            {channel.note}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="contact-arrow font-display text-3xl leading-none text-ink transition-transform sm:text-4xl group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </li>
  );
}

const initialFields = { name: "", email: "", subject: "", message: "" };

function ContactForm() {
  const [fields, setFields] = useState(initialFields);

  function update(key) {
    return (event) => setFields((prev) => ({ ...prev, [key]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const subject = fields.subject || "Hello from your portfolio";
    const body = `Hi Vagif,\n\n${fields.message}\n\n— ${fields.name}\n${fields.email}`;
    const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <form className="contact-form grid gap-5" noValidate onSubmit={handleSubmit}>
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

      <label className="contact-field">
        <span className="contact-field-label">Subject</span>
        <input
          className="contact-input"
          name="subject"
          onChange={update("subject")}
          placeholder="Repair, diagnostics, a question…"
          type="text"
          value={fields.subject}
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
          Submits via your mail client — no data leaves your device until you send.
        </p>
        <Button className="min-h-12 px-7 sm:w-auto" type="submit">
          Send message
        </Button>
      </div>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="bg-page text-ink">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <SectionLabel>05 — Contact</SectionLabel>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.01em] text-ink sm:text-6xl lg:text-7xl">
            A machine talking back?
            <br />
            Let&rsquo;s listen.
          </h1>

          <p className="max-w-xl font-sans text-[15px] leading-7 text-graphite lg:text-right">
            Diagnostics, repair, calibration, or a second opinion on an espresso
            machine or grinder. Send a note and Vagif will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8">
        <ul className="contact-list border-t border-line">
          {channels.map((channel) => (
            <ChannelRow channel={channel} key={channel.key} />
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-bronze">
              Or send a message
            </p>
            <h2 className="mt-4 font-display text-3xl uppercase leading-[0.95] tracking-[0.01em] text-ink sm:text-4xl">
              Tell me what the machine is doing.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-graphite sm:text-[15px] sm:leading-7">
              The more detail — model, age, symptoms, when it started — the
              faster the reply.
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8">
        <div className="contact-note flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-bronze">
            Response time
          </p>
          <p className="max-w-md font-sans text-sm leading-6 text-graphite sm:text-right">
            Usually replies within 48 hours. For urgent on-site issues, mention
            it in the subject line.
          </p>
        </div>
      </section>
    </main>
  );
}
