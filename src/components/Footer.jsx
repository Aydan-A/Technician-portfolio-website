import { Link } from "react-router-dom";

const exploreLinks = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

const focusTopics = ["Diagnostics", "Calibration", "Repairs", "Bench Notes"];

const contactLinks = [
  { href: "mailto:vaqif.aliyev.96@gmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/vaqif-aliyev/", label: "LinkedIn" },
];

function ColumnHeading({ children }) {
  return (
    <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-bronze">
      {children}
    </h2>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface">
      <div className="w-full px-6 pt-10 pb-6 sm:px-10 lg:px-16">
        <div className="grid gap-10 pb-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-page font-display text-lg uppercase tracking-[0.06em] text-bronze">
                VA
              </span>
              <span className="block font-display text-2xl uppercase tracking-[0.06em] text-ink">
                Vagif Tech
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-graphite">
              Coffee machine diagnostics, repair stories, and technical field
              notes for espresso machines and grinders.
            </p>
          </div>
          <div>
            <ColumnHeading>Explore</ColumnHeading>
            <div className="mt-4 grid gap-2.5 text-[14px] text-ink/85">
              {exploreLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="transition-colors hover:text-bronze"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <ColumnHeading>Focus</ColumnHeading>
            <div className="mt-4 grid gap-2.5 text-[14px] text-ink/85">
              {focusTopics.map((topic) => (
                <span key={topic}>{topic}</span>
              ))}
            </div>
          </div>
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <div className="mt-4 grid gap-2.5 text-[14px] text-ink/85">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-bronze"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-graphite sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Vagif Tech</span>
          <span>Espresso diagnostics with an engineer's mindset</span>
        </div>
      </div>
    </footer>
  );
}
