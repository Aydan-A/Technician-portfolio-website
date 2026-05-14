import { Link } from "react-router-dom";

const navLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

const contactLinks = [
  { href: "mailto:vaqif.aliyev.96@gmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/vaqif-aliyev/", label: "LinkedIn" },
];

function NavColumn({ heading, links }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">
        {heading}
      </h2>
      <div className="mt-4 grid gap-3 text-sm text-ash">
        {links.map((link) => (
          <Link key={link.label} to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ExternalColumn({ heading, links }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-copper">
        {heading}
      </h2>
      <div className="mt-4 grid gap-3 text-sm text-ash">
        {links.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-11 w-16 items-center justify-center rounded-full border border-border bg-stone-soft font-display text-lg uppercase tracking-[0.06em] text-copper">
              VA
            </span>
            <span>
              <span className="block font-display text-xl uppercase tracking-[0.06em] text-paper">
                VAGIF TECH
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Coffee Machine Diagnostics
              </span>
            </span>
          </div>
        </div>
        <NavColumn heading="Site" links={navLinks} />
        <ExternalColumn heading="Contact" links={contactLinks} />
      </div>
      <div className="border-t border-border px-5 py-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        © {year} Vagif Tech. All rights reserved.
      </div>
    </footer>
  );
}
