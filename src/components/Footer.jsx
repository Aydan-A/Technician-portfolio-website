const navLinks = [
  { href: "#", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#journal", label: "Journal" },
];

const contactLinks = [
  { href: "mailto:hello@example.com", label: "Email" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "YouTube" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "GitHub" },
];

function LinkColumn({ heading, links }) {
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
  return (
    <footer className="border-t border-border bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-5 flex items-center gap-4">
            <span className="flex h-11 w-16 items-center justify-center rounded-full border border-border bg-stone-soft font-serif text-base font-semibold text-copper">
              VA
            </span>
            <span>
              <span className="block font-serif text-xl text-paper">
                VAGIF TECH
              </span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                Engineering & Repair
              </span>
            </span>
          </div>
        </div>
        <LinkColumn heading="Contact" links={contactLinks} />
      </div>
      <div className="border-t border-border px-5 py-5 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        © 2026 Coffee Machine Tech. All rights reserved.
      </div>
    </footer>
  );
}
