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

/* Flat instrument bar: the hero's dock tone, one hairline, an amber key on the
 * active route. Styling hooks live in styles/nav.css. */
export default function Navbar({ theme, onThemeChange }) {
  return (
    <header className="site-nav">
      <div className="mx-auto flex max-w-[88rem] flex-col gap-4 px-5 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link className="flex items-center gap-3" to="/">
          <span aria-hidden className="site-nav-mark mech-data">
            VT
          </span>
          <span className="wordmark text-[17px] text-ink">
            Vagif Tech
          </span>
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:gap-7">
          {/* The links carry their own pill padding, so the flex gap only has to
              * keep the pills from touching — the old 1.5rem gap on top of that
              * padding left them reading as five separate islands. */}
          <nav className="-mx-2 flex flex-wrap items-center gap-x-0.5 gap-y-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `site-nav-link mech-focus ${isActive ? "is-active" : ""}`
                }
                end={item.to === "/"}
                key={item.label}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div aria-label="Theme" className="theme-switch" role="group">
            {themeOptions.map((option) => {
              const active = theme === option;
              return (
                <button
                  aria-pressed={active}
                  className={`theme-switch-option ${active ? "is-active" : ""}`}
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
    </header>
  );
}
