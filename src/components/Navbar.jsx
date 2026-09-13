import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  // Temporarily hidden — restore this entry to bring the Projects tab back.
  // { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];
const themeOptions = ["dark", "light"];

export default function Navbar({ theme, onThemeChange }) {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="glass-nav mx-auto max-w-7xl rounded-full px-4 py-3 backdrop-blur-2xl sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link className="flex items-center gap-3" to="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[12px] font-bold text-page shadow-sm">
              VT
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] uppercase leading-none tracking-[0.06em] text-ink">
                VAGIF TECH
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-7">
            <nav className="flex flex-wrap gap-x-5 gap-y-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-ink">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `relative text-ink transition-colors hover:text-bronze ${
                      isActive
                        ? "after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-bronze"
                        : ""
                    }`
                  }
                  end={item.to === "/"}
                  key={item.label}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div
              aria-label="Theme"
              className="inline-flex min-h-10 rounded-full border border-ink/25 bg-ink/10 p-1"
              role="group"
            >
              {themeOptions.map((option) => {
                const active = theme === option;
                return (
                  <button
                    aria-pressed={active}
                    className={`rounded-full px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                      active
                        ? "bg-ink text-page shadow-sm"
                        : "text-ink/70 hover:text-ink"
                    }`}
                    key={option}
                    onClick={() => onThemeChange(option)}
                    type="button"
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
