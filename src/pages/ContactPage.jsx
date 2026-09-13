import { useState } from "react";
import ContactForm from "../components/ContactForm.jsx";
import FilmingGuide from "../components/FilmingGuide.jsx";
import { DEFAULT_PLAN } from "../data/servicePlans.js";

export default function ContactPage() {
  const [plan, setPlan] = useState(DEFAULT_PLAN);

  return (
    <main className="bg-page text-ink">
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.01em] text-ink sm:text-6xl lg:text-7xl">
            A machine talking back?
            <br />
            Let&rsquo;s listen.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
        <div className="border-t border-line pt-12 lg:pt-16">
          {/* Intro spans the full measure so the columns below start level. */}
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-bronze">
              Send a message
            </p>
            <h2 className="mt-4 font-display text-3xl uppercase leading-[0.95] tracking-[0.01em] text-ink sm:text-4xl">
              Tell me what the machine is doing.
            </h2>
            <p className="mt-5 text-sm leading-6 text-graphite sm:text-[15px] sm:leading-7">
              Diagnostics, repair, calibration, or a second opinion on an
              espresso machine or grinder. Four short sections — the more of it
              you fill in, the closer I am to an answer before I arrive.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-16">
            <ContactForm onPlanChange={setPlan} plan={plan} />

            {/* Sticky on desktop so the filming steps stay in view while the
                form is being filled in; a plain block below it on mobile. */}
            <aside className="lg:sticky lg:top-28">
              <FilmingGuide />
            </aside>
          </div>
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
