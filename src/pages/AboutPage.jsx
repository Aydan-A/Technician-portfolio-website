import { useEffect, useRef, useState } from "react";
import SectionLabel from "../components/SectionLabel.jsx";
import {
  aboutBackground,
  aboutHeadline,
  aboutStats,
  timeline,
} from "../data/timeline.js";

function ImageSlot({ image }) {
  if (image.src) {
    return (
      <figure className="image-slot image-slot--filled aspect-[16/10] overflow-hidden rounded-lg">
        <img
          alt={image.alt}
          className="h-full w-full object-cover"
          loading="lazy"
          src={image.src}
        />
      </figure>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="image-slot image-slot--empty flex aspect-[16/10] items-center justify-center rounded-lg"
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
        Image · to come
      </span>
    </div>
  );
}

function TimelineNode({ milestone, index, isVisible }) {
  const side = index % 2 === 0 ? "right" : "left";
  const singleImage = index === 0;
  const images = singleImage ? milestone.images.slice(0, 1) : milestone.images;

  return (
    <article
      className={`timeline-node timeline-node--${side} ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="timeline-node-dot" aria-hidden="true" />
      <span className="timeline-node-connector" aria-hidden="true" />

      <div className="timeline-node-content flex flex-col gap-4">
        <header>
          <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-bronze">
            {milestone.year}
          </span>
          <h3 className="mt-2 font-display text-3xl uppercase leading-[0.95] tracking-[0.02em] text-ink sm:text-4xl lg:text-[2.4rem]">
            {milestone.title}
          </h3>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.2em] text-graphite">
            {milestone.org}
          </p>
        </header>

        <p className="max-w-2xl font-sans text-base leading-7 text-ink/85 sm:text-[17px] sm:leading-8">
          {milestone.caption}
        </p>

        {milestone.tags?.length ? (
          <ul className="timeline-node-tags">
            {milestone.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}

        <div
          className={`grid gap-2.5 ${singleImage ? "grid-cols-1" : "grid-cols-2"}`}
        >
          {images.map((image, slot) => (
            <ImageSlot image={image} key={slot} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function AboutPage() {
  const trackRef = useRef(null);
  const [visibleIds, setVisibleIds] = useState(() => new Set());
  const [activeId, setActiveId] = useState(timeline[0]?.id ?? null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const entry of entries) {
            const id = entry.target.dataset.nodeId;
            if (entry.isIntersecting && !next.has(id)) {
              next.add(id);
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      { threshold: 0.2 },
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onScreen.length > 0) {
          setActiveId(onScreen[0].target.dataset.nodeId);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );

    const nodes = track.querySelectorAll("[data-node-id]");
    nodes.forEach((node) => {
      visibilityObserver.observe(node);
      activeObserver.observe(node);
    });

    return () => {
      visibilityObserver.disconnect();
      activeObserver.disconnect();
    };
  }, []);

  const fillPercent = Math.min(
    100,
    (visibleIds.size / timeline.length) * 100,
  );

  const handleRailClick = (id) => {
    const node = document.querySelector(`[data-node-id="${id}"]`);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="bg-page text-ink">
      <section className="about-inner px-5 pt-14 sm:px-6 lg:pt-20">
        <SectionLabel>04 — About</SectionLabel>

        <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] tracking-[0.01em] text-ink sm:text-6xl lg:text-[5rem] xl:text-[5.75rem]">
          Work
          <br />
          experiences.
        </h1>

        <div className="mt-9">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            At a glance
          </p>
          <ul className="about-stats about-stats--kpi mt-3">
            {aboutStats.map((stat) => (
              <li className="about-stats-cell" key={stat.label}>
                <span className="about-stats-value">{stat.value}</span>
                <span className="about-stats-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
            Background
          </p>
          <p className="about-bio mt-3 font-sans text-base leading-7 text-ink/80 sm:text-[17px] sm:leading-8">
            {aboutBackground}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-graphite">
          <span>
            {String(timeline.length).padStart(2, "0")} Stops · Newest first
          </span>
          <span className="h-px flex-1 bg-line" />
          <span className="hidden sm:inline">
            {String(visibleIds.size).padStart(2, "0")} of{" "}
            {String(timeline.length).padStart(2, "0")} seen
          </span>
        </div>
      </section>

      <section className="about-archive about-inner px-5 pb-24 pt-12 sm:px-6 lg:pt-16">
        <div className="about-archive-bg" aria-hidden="true">
          <span className="about-archive-arc about-archive-arc--1" />
          <span className="about-archive-arc about-archive-arc--2" />
          <span className="about-archive-grid" />
        </div>

        <div className="about-archive-grid-layout">
          <aside className="about-rail">
            <div className="about-rail-inner">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
                Career path
              </p>
              <ol className="about-rail-list mt-4">
                {timeline.map((milestone) => {
                  const isActive = milestone.id === activeId;
                  return (
                    <li key={milestone.id}>
                      <button
                        className={`about-rail-item ${isActive ? "is-active" : ""}`}
                        onClick={() => handleRailClick(milestone.id)}
                        type="button"
                      >
                        <span className="about-rail-year">{milestone.year}</span>
                        <span className="about-rail-title">
                          {milestone.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-8 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-bronze">
                {aboutHeadline.stat}
              </p>
              <p className="mt-1 font-sans text-sm leading-6 text-ink/75">
                {aboutHeadline.label}
              </p>
            </div>
          </aside>

          <div className="timeline-track" ref={trackRef}>
            <div className="timeline-spine" aria-hidden="true">
              <div
                className="timeline-spine-fill"
                style={{ height: `${fillPercent}%` }}
              />
            </div>

            <ol className="relative flex flex-col gap-10 sm:gap-12 md:gap-16">
              {timeline.map((milestone, index) => (
                <li data-node-id={milestone.id} key={milestone.id}>
                  <TimelineNode
                    index={index}
                    isVisible={visibleIds.has(milestone.id)}
                    milestone={milestone}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
