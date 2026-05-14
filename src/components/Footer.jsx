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
      <h2 className="font-mono text-[12px] uppercase tracking-[0.2em] text-bronze">
        {heading}
      </h2>
      <div className="mt-5 grid gap-3.5 text-[15px] text-ink/85">
        {links.map((link) => (
          <Link
            className="transition-colors hover:text-bronze"
            key={link.label}
            to={link.to}
          >
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
      <h2 className="font-mono text-[12px] uppercase tracking-[0.2em] text-bronze">
        {heading}
      </h2>
      <div className="mt-5 grid gap-3.5 text-[15px] text-ink/85">
        {links.map((link) => (
          <a
            className="transition-colors hover:text-bronze"
            href={link.href}
            key={link.label}
          >
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
    <footer className="border-t border-line bg-page">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-12 w-[4.25rem] items-center justify-center rounded-full border border-line bg-surface font-display text-xl uppercase tracking-[0.06em] text-bronze">
              VA
            </span>
            <span>
              <span className="block font-display text-2xl uppercase tracking-[0.06em] text-ink">
                VAGIF TECH
              </span>
              <span className="block font-mono text-[12px] uppercase tracking-[0.2em] text-graphite">
                Coffee Machine Diagnostics
              </span>
            </span>
          </div>
        </div>
        <NavColumn heading="Site" links={navLinks} />
        <ExternalColumn heading="Contact" links={contactLinks} />
      </div>
      <div className="border-t border-line px-5 py-6 text-center font-mono text-[12px] uppercase tracking-[0.16em] text-graphite">
        © {year} Vagif Tech. All rights reserved.
      </div>
    </footer>
  );
}
