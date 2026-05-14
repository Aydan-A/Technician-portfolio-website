import { Link, NavLink } from "react-router-dom";
import Button from "./Button.jsx";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Journal", to: "/journal" },
  { label: "Contact", to: "/contact" },
];
const themeOptions = ["dark", "light"];

export default function Navbar({ theme, onThemeChange }) {
  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="glass-nav mx-auto max-w-7xl rounded-full border px-4 py-3 backdrop-blur-2xl sm:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link className="flex items-center gap-3" to="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper font-mono text-[12px] font-bold text-stone shadow-sm">
              VT
            </span>
            <span className="leading-none">
              <span className="block font-display text-[22px] uppercase leading-none tracking-[0.06em] text-paper">
                VAGIF TECH
              </span>
            </span>
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-7">
            <nav className="flex flex-wrap gap-x-5 gap-y-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-paper">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `transition-opacity ${
                      isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div
                aria-label="Theme"
                className="inline-flex min-h-10 rounded-full border border-paper/25 bg-paper/10 p-1"
                role="group"
              >
                {themeOptions.map((option) => {
                  const active = theme === option;
                  return (
                    <button
                      aria-pressed={active}
                      className={`rounded-full px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] transition-colors ${
                        active
                          ? "bg-paper text-stone shadow-sm"
                          : "text-paper/70 hover:text-paper"
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
              <Button
                className="w-full font-semibold sm:w-auto"
                href="/contact"
                variant="secondary"
              >
                Book Diagnostic
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
