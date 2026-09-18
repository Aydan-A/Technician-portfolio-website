import { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";

/* Only the landing route ships in the first chunk. Everything else — and in
 * particular the Skeleton explorer, which pulls in ~20 diagram images and its
 * own modal machinery — is fetched when the visitor actually navigates there. */
const AboutPage = lazy(() => import("./pages/AboutPage.jsx"));
const ContactPage = lazy(() => import("./pages/ContactPage.jsx"));
const JournalArticlePage = lazy(() => import("./pages/JournalArticlePage.jsx"));
const JournalPage = lazy(() => import("./pages/JournalPage.jsx"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage.jsx"));
const ServicesPage = lazy(() => import("./pages/ServicesPage.jsx"));
const SkeletonPage = lazy(() => import("./pages/SkeletonPage.jsx"));

const themes = ["dark", "light"];

/* Holds the page area while a route chunk loads. Deliberately quiet: a spinner
 * would flash for longer than most of these chunks take to arrive. */
function RouteFallback() {
  return (
    <main className="min-h-[60svh] bg-page px-5 py-20 sm:px-6 lg:px-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
        Loading…
      </p>
    </main>
  );
}

/* Dark is the identity, so it is the default for every first-time visitor —
 * the OS `prefers-color-scheme` is deliberately ignored here. Light is opt-in
 * through the nav switch, and that choice is what gets remembered. */
const DEFAULT_THEME = "dark";

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return DEFAULT_THEME;
    }
    let savedTheme = null;
    try {
      savedTheme = window.localStorage.getItem("theme");
    } catch {
      // Private mode / blocked storage: fall back to the default.
    }
    return themes.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Not being able to remember the choice must not break the toggle.
    }
  }, [theme]);

  function handleThemeChange(nextTheme) {
    if (themes.includes(nextTheme)) {
      setTheme(nextTheme);
    }
  }

  return (
    /* BASE_URL is '/' everywhere except GitHub Pages, where the site lives
     * under /<repo-name>/ — passing it through keeps every <Link> correct on
     * both without a second build of the routes. */
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          element={<Layout onThemeChange={handleThemeChange} theme={theme} />}
        >
          <Route element={<HomePage />} index />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <AboutPage />
              </Suspense>
            }
            path="about"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <ProjectsPage />
              </Suspense>
            }
            path="projects"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServicesPage />
              </Suspense>
            }
            path="services"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <JournalPage />
              </Suspense>
            }
            path="journal"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <JournalArticlePage />
              </Suspense>
            }
            path="journal/:slug"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            }
            path="contact"
          />
          <Route
            element={
              <Suspense fallback={<RouteFallback />}>
                <SkeletonPage />
              </Suspense>
            }
            path="skeleton"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
