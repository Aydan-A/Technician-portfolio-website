import { useMemo, useState } from "react";
import JournalArchiveRow from "../components/JournalArchiveRow.jsx";
import JournalDispatchCard from "../components/JournalDispatchCard.jsx";
import SectionLabel from "../components/SectionLabel.jsx";
import { posts, VERDICTS } from "../data/posts.js";

const ALL = "All";

export default function JournalPage() {
  const verdictFilters = useMemo(
    () => [ALL, ...Object.keys(VERDICTS)],
    [],
  );
  const categoryFilters = useMemo(
    () => [ALL, ...Array.from(new Set(posts.map((p) => p.category)))],
    [],
  );

  const [activeVerdict, setActiveVerdict] = useState(ALL);
  const [activeCategory, setActiveCategory] = useState(ALL);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.number - a.number),
    [],
  );

  const visible = sorted.filter((p) => {
    const verdictOk = activeVerdict === ALL || p.verdict === activeVerdict;
    const categoryOk = activeCategory === ALL || p.category === activeCategory;
    return verdictOk && categoryOk;
  });

  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const grid = visible.filter((p) => p.id !== featured?.id);

  // Archive = anything beyond the first 6 visible cards (or all if user filtered)
  const archiveStart = activeVerdict === ALL && activeCategory === ALL ? 6 : grid.length;
  const gridPosts = grid.slice(0, archiveStart);
  const archivePosts = grid.slice(archiveStart);

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
        <SectionLabel>04 — Journal</SectionLabel>

        <div className="mt-5 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
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
              aria-label="Filter dispatches by verdict"
              className="mt-3 flex flex-wrap gap-2"
              role="tablist"
            >
              {verdictFilters.map((label) => {
                const isActive = label === activeVerdict;
                const display = label === ALL ? "All verdicts" : VERDICTS[label].label;
                return (
                  <button
                    aria-selected={isActive}
                    className={`project-filter ${isActive ? "is-active" : ""}`}
                    key={`v-${label}`}
                    onClick={() => setActiveVerdict(label)}
                    role="tab"
                    type="button"
                  >
                    {display}
                  </button>
                );
              })}
            </div>

            <div
              aria-label="Filter dispatches by category"
              className="mt-3 flex flex-wrap gap-2"
              role="tablist"
            >
              {categoryFilters.map((label) => {
                const isActive = label === activeCategory;
                return (
                  <button
                    aria-selected={isActive}
                    className={`project-filter ${isActive ? "is-active" : ""}`}
                    key={`c-${label}`}
                    onClick={() => setActiveCategory(label)}
                    role="tab"
                    type="button"
                  >
                    {label}
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

      {/* Featured */}
      {featured && visible.includes(featured) && (
        <section className="w-full px-5 pt-10 sm:px-6 lg:px-10 2xl:px-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            Latest dispatch
          </p>
          <div className="mt-4">
            <JournalDispatchCard post={featured} variant="featured" />
          </div>
        </section>
      )}

      {/* Grid */}
      {gridPosts.length > 0 && (
        <section className="w-full px-5 pt-12 sm:px-6 lg:px-10 2xl:px-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            More dispatches
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {gridPosts.map((post) => (
              <JournalDispatchCard key={post.id} post={post} variant="grid" />
            ))}
          </div>
        </section>
      )}

      {/* Archive */}
      {archivePosts.length > 0 && (
        <section className="w-full px-5 pb-24 pt-14 sm:px-6 lg:px-10 2xl:px-16">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            The archive
          </p>
          <div className="mt-4 border-t border-line">
            {archivePosts.map((post) => (
              <JournalArchiveRow key={post.id} post={post} />
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

      {/* Bottom padding when there's no archive section */}
      {archivePosts.length === 0 && <div className="pb-24" />}
    </main>
  );
}
