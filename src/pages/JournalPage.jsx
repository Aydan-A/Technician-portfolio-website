import { useMemo, useState } from "react";
import JournalDispatchCard from "../components/JournalDispatchCard.jsx";
import { posts, VERDICTS } from "../data/posts.js";

const ALL = "All";

// Single unified filter group — exactly one chip active at a time.
// Verdicts and categories share one selection: picking any chip clears the rest.
const FILTER_DEFS = [
  { id: "v:WORTH_IT", axis: "verdict", value: "WORTH_IT" },
  { id: "v:OVERRATED", axis: "verdict", value: "OVERRATED" },
  { id: "v:DEPENDS", axis: "verdict", value: "DEPENDS" },
  { id: "c:Engineering", axis: "category", value: "Engineering" },
  { id: "c:Diagnostics", axis: "category", value: "Diagnostics" },
];

export default function JournalPage() {
  const filters = useMemo(() => {
    const categories = new Set(posts.map((p) => p.category));
    const available = FILTER_DEFS.filter((f) =>
      f.axis === "verdict" ? f.value in VERDICTS : categories.has(f.value),
    ).map((f) => ({
      ...f,
      label: f.axis === "verdict" ? VERDICTS[f.value].label : f.value,
    }));
    return [{ id: ALL, axis: "all", label: "All verdicts" }, ...available];
  }, []);

  const [active, setActive] = useState(ALL);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.number - a.number),
    [],
  );

  const activeFilter = filters.find((f) => f.id === active) ?? filters[0];

  const visible = sorted.filter((p) => {
    if (activeFilter.axis === "all") return true;
    if (activeFilter.axis === "verdict") return p.verdict === activeFilter.value;
    return p.category === activeFilter.value;
  });

  return (
    <main className="bg-page text-ink">
      {/* Masthead */}
      <section className="w-full px-5 pt-10 sm:px-6 lg:px-10 lg:pt-14 2xl:px-16">
        <div className="dispatch-masthead">
          <div className="dispatch-masthead-rule" />
          <div className="dispatch-masthead-row">
            <span className="dispatch-masthead-title">
              The Workshop Dispatch
            </span>
            <span className="dispatch-masthead-meta">
              Vol. I · {posts.length} filed · Filed from the bench
            </span>
          </div>
          <div className="dispatch-masthead-rule" />
        </div>
      </section>

      {/* Headline */}
      <section className="w-full px-5 pt-10 sm:px-6 lg:px-10 2xl:px-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h1 className="font-display text-5xl uppercase leading-[0.92] tracking-[0.01em] text-ink sm:text-6xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Verdicts from
              <br />
              the bench.
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-graphite sm:text-lg sm:leading-8">
              I review the machines, grinders, and ideas that come across my
              workbench. No review units. No sponsorships. No hedging. If a
              thing is overrated, I&rsquo;ll say so — and show the receipts.
            </p>
          </div>

          {/* Filters */}
          <div className="lg:pb-2">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
              Filter
            </p>

            <div
              aria-label="Filter dispatches"
              className="mt-3 flex flex-wrap gap-2"
              role="tablist"
            >
              {filters.map((f) => {
                const isActive = f.id === active;
                return (
                  <button
                    aria-selected={isActive}
                    className={`project-filter ${isActive ? "is-active" : ""}`}
                    key={f.id}
                    onClick={() => setActive(f.id)}
                    role="tab"
                    type="button"
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          <span>
            {String(visible.length).padStart(2, "0")} of{" "}
            {String(posts.length).padStart(2, "0")} Dispatches
          </span>
          <span className="h-px flex-1 bg-line" />
          <span>Newest first</span>
        </div>
      </section>

      {/* Grid — 3 per row */}
      {visible.length > 0 && (
        <section className="w-full px-5 pb-24 pt-12 sm:px-6 lg:px-10 2xl:px-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {visible.map((post) => (
              <JournalDispatchCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
        </section>
      )}

      {visible.length === 0 && (
        <section className="w-full px-5 pb-24 pt-10 sm:px-6 lg:px-10 2xl:px-16">
          <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-graphite">
            No dispatches match this filter. Try another verdict.
          </p>
        </section>
      )}
    </main>
  );
}
