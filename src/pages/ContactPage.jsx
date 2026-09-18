import { useState } from "react";
import ContactForm from "../components/contact/ContactForm.jsx";
import { DEFAULT_PLAN } from "../data/servicePlans.js";

/* One screen, one job: a headline, a single line of context, and the form.
 * The old page introduced the form three times (page title, eyebrow, section
 * heading) and ran a filming-guide column beside it — that copy now lives
 * inside the form, once. */
export default function ContactPage() {
  const [plan, setPlan] = useState(DEFAULT_PLAN);

  return (
    <main className="bg-page text-ink">
      <section className="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-6 lg:pt-20">
        <h1 className="headline text-[2.6rem] text-ink sm:text-[3.4rem]">
          A machine talking back? Let&rsquo;s listen.
        </h1>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-graphite sm:text-base">
          Diagnostics, repair, calibration, or a second opinion on an espresso
          machine or grinder — anywhere in Toronto and the GTA.
        </p>

        <div className="mt-10 lg:mt-12">
          <ContactForm onPlanChange={setPlan} plan={plan} />
        </div>
      </section>
    </main>
  );
}
