import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", index: "01" },
  { label: "About", to: "/about", index: "02" },
  { label: "Services", to: "/services", index: "03" },
  { label: "Journal", to: "/journal", index: "04" },
  { label: "Contact", to: "/contact", index: "05" },
];

const themeOptions = [
  { value: "dark", short: "DK" },
  { value: "light", short: "LT" },
];

// Nav cells are hard-edged and share hairlines, so the bar reads as one
// machined plate instead of a floating pill. Nothing here is rounded or blurred.
export default function NavbarIndustrial({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Route changes unmount the panel content, but a resize past the lg
  // breakpoint would otherwise leave the mobile panel stuck open.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => setMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-bronze bg-page">
      {/* ---------- STATUS RAIL ---------- */}
      <div className="hidden border-b border-line lg:block">
        <div className="mx-auto flex max-w-[110rem] items-stretch justify-between px-6 font-mono text-[10px] font-medium uppercase tracking-[0.3em] text-graphite xl:px-10">
          <div className="flex items-stretch divide-x divide-line">
            <span className="flex items-center gap-2.5 py-2 pr-6">
              <span aria-hidden className="h-[7px] w-[7px] bg-bronze" />
              <span className="text-ink">Status — accepting work</span>
            </span>
            <span className="flex items-center px-6 py-2">
              Toronto / GTA — on-site + bench
            </span>
          </div>
          <div className="flex items-stretch divide-x divide-line">
            <span className="mech-data flex items-center px-6 py-2">
              Calibration standard 9.0 bar
            </span>
            <a
              className="mech-focus mech-data flex items-center py-2 pl-6 text-ink transition-colors hover:text-bronze"
              href="tel:+14160000000"
            >
              Dispatch — 416.000.0000
            </a>
          </div>
        </div>
      </div>

      {/* ---------- MAIN BAR ---------- */}
      <div className="mx-auto flex max-w-[110rem] items-stretch px-6 xl:px-10">
        {/* Identity block: amber chip + condensed wordmark */}
        <Link
          className="mech-focus flex shrink-0 items-center gap-3.5 border-r border-line py-3.5 pr-5 sm:pr-7"
          to="/"
        >
          <span className="flex h-11 w-11 items-center justify-center bg-bronze font-mono text-[13px] font-bold tracking-tight text-[#181A1F]">
            VT
          </span>
          <span className="leading-none">
            <span className="block font-display text-[26px] uppercase leading-[0.85] tracking-[0.03em] text-ink">
              Vagif Tech
            </span>
            <span className="mt-1 block font-mono text-[9px] font-medium uppercase tracking-[0.28em] text-graphite">
              Espresso Service
            </span>
          </span>
        </Link>

        {/* Numbered nav cells — the year-selector rhythm from the spec sheet */}
        <nav className="ml-auto hidden items-stretch divide-x divide-line border-r border-line lg:flex">
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `mech-focus group relative flex items-center gap-2 px-6 font-mono text-[11px] font-bold uppercase tracking-[0.24em] transition-colors ${
                  isActive
                    ? "bg-surface text-bronze"
                    : "text-ink/75 hover:bg-surface hover:text-ink"
                }`
              }
              end={item.to === "/"}
              key={item.label}
              to={item.to}
            >
              {({ isActive }) => (
                <>
                  <span
                    aria-hidden
                    className={`mech-data text-[9px] tracking-normal ${
                      isActive ? "text-bronze" : "text-muted"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-[2px] h-[3px] bg-bronze"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Theme: two hard cells, no track, no thumb, no radius */}
        <div
          aria-label="Theme"
          className="hidden items-stretch divide-x divide-line border-r border-line lg:flex"
          role="group"
        >
          {themeOptions.map((option) => {
            const active = theme === option.value;
            return (
              <button
                aria-label={`${option.value} theme`}
                aria-pressed={active}
                className={`mech-focus px-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${
                  active
                    ? "bg-ink text-page"
                    : "text-graphite hover:bg-surface hover:text-ink"
                }`}
                key={option.value}
                onClick={() => onThemeChange(option.value)}
                type="button"
              >
                {option.short}
              </button>
            );
          })}
        </div>

        {/* Primary CTA: solid amber block, full bar height, hard ink type */}
        <Link
          className="mech-focus hidden items-center gap-3 bg-bronze px-8 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#181A1F] transition-colors hover:bg-ink hover:text-page lg:flex"
          to="/contact"
        >
          Book service
          <span aria-hidden className="text-[13px] leading-none">
            &rarr;
          </span>
        </Link>

        {/* Mobile trigger: two thick machined bars */}
        <button
          aria-controls="mech-mobile-nav"
          aria-expanded={menuOpen}
          aria-label="Menu"
          className="mech-focus ml-auto flex w-14 shrink-0 items-center justify-center border-l border-line lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span aria-hidden className="flex w-6 flex-col gap-[6px]">
            <span
              className={`block h-[3px] w-full bg-ink transition-transform ${
                menuOpen ? "translate-y-[4.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-full bg-bronze transition-transform ${
                menuOpen ? "-translate-y-[4.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* ---------- MOBILE PANEL ---------- */}
      {menuOpen && (
        <div
          className="border-t border-line bg-surface lg:hidden"
          id="mech-mobile-nav"
        >
          <nav className="flex flex-col divide-y divide-line">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `mech-focus flex items-center justify-between px-6 py-4 font-mono text-[12px] font-bold uppercase tracking-[0.24em] ${
                    isActive
                      ? "border-l-[3px] border-bronze bg-page text-bronze"
                      : "text-ink/80"
                  }`
                }
                end={item.to === "/"}
                key={item.label}
                onClick={() => setMenuOpen(false)}
                to={item.to}
              >
                <span>{item.label}</span>
                <span aria-hidden className="mech-data text-[10px] text-muted">
                  {item.index}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-stretch border-t border-line">
            <Link
              className="mech-focus flex flex-1 items-center justify-center gap-3 bg-bronze px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-[#181A1F]"
              onClick={() => setMenuOpen(false)}
              to="/contact"
            >
              Book service <span aria-hidden>&rarr;</span>
            </Link>
            <div
              aria-label="Theme"
              className="flex items-stretch divide-x divide-line border-l border-line"
              role="group"
            >
              {themeOptions.map((option) => (
                <button
                  aria-label={`${option.value} theme`}
                  aria-pressed={theme === option.value}
                  className={`mech-focus px-5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] ${
                    theme === option.value
                      ? "bg-ink text-page"
                      : "text-graphite"
                  }`}
                  key={option.value}
                  onClick={() => onThemeChange(option.value)}
                  type="button"
                >
                  {option.short}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
