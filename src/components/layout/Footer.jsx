import { Link } from "react-router-dom";
import Button from "../ui/Button.jsx";

/* Four columns that actually divide the width: the brand block takes the
 * space of two, then three equal link columns. Every entry below is a real
 * destination — the old "Focus" column was plain text that looked clickable. */
const siteLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

const serviceLinks = [
  { to: "/services", label: "Home machines" },
  { to: "/services?type=commercial", label: "Café & commercial" },
  { to: "/contact", label: "Book a visit" },
  { to: "/skeleton", label: "Machine anatomy" },
];

const CONTACT_EMAIL = "vaqif.aliyev.96@gmail.com";

function ColumnHeading({ children }) {
  return (
    <h2 className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
      {children}
    </h2>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[88rem] px-5 pb-8 pt-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 border-b border-line pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Brand — spans two columns so the three link lists sit evenly. */}
          <div>
            <Link className="flex items-center gap-3" to="/">
              <span aria-hidden className="site-nav-mark mech-data h-10 w-10">
                VT
              </span>
              <span className="wordmark text-[19px] text-ink">Vagif Tech</span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-graphite">
              Espresso machine and grinder diagnostics, repair, and calibration
              across Toronto and the GTA — plus the bench notes behind the work.
            </p>
            <Button className="mt-6" to="/contact">
              Request a diagnosis
            </Button>
          </div>

          <div>
            <ColumnHeading>Site</ColumnHeading>
            <ul className="mt-4 grid gap-2.5 text-[14px] text-ink/85">
              {siteLinks.map((link) => (
                <li key={link.label}>
                  <Link className="transition-colors hover:text-bronze" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-4 grid gap-2.5 text-[14px] text-ink/85">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link className="transition-colors hover:text-bronze" to={link.to}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact strip — the details people actually came looking for. */}
        <dl className="grid gap-6 border-b border-line py-8 sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              Email
            </dt>
            <dd className="mt-2 text-[14px] text-ink/85">
              <a
                className="transition-colors hover:text-bronze"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              Coverage
            </dt>
            <dd className="mt-2 text-[14px] text-ink/85">Toronto &amp; the GTA</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
              Response time
            </dt>
            <dd className="mt-2 text-[14px] text-ink/85">Within 48 hours</dd>
          </div>
        </dl>

        <div className="flex flex-col gap-2 pt-6 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Vagif Tech</span>
          <span>Espresso diagnostics with an engineer&rsquo;s mindset</span>
        </div>
      </div>
    </footer>
  );
}
