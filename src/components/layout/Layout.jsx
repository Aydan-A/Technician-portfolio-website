import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/* Router navigation keeps the old scroll offset, so following a link from
 * halfway down the journal used to drop you halfway down the next page. Land
 * at the top on a route change, and honour `#section` links — nothing in
 * react-router scrolls to a hash on its own. */
function useRouteScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = reduceMotion ? "auto" : "smooth";

    if (hash) {
      // The target may belong to a route chunk that is still arriving.
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);
}

export default function Layout({ theme, onThemeChange }) {
  useRouteScroll();

  return (
    /* overflow-x-clip, not overflow-hidden: a hidden-overflow ancestor turns
     * into a scroll container and silently kills the nav's position: sticky. */
    <div className="min-h-screen overflow-x-clip bg-page text-ink">
      <Navbar onThemeChange={onThemeChange} theme={theme} />
      <Outlet context={{ theme }} />
      <Footer />
    </div>
  );
}
