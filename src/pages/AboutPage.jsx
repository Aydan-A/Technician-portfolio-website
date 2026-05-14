import { useEffect, useRef, useState } from "react";
import SectionLabel from "../components/SectionLabel.jsx";
import { aboutHeadline, timeline } from "../data/timeline.js";

function ImageSlot({ image }) {
  if (image.src) {
    return (
      <figure className="image-slot image-slot--filled aspect-[4/3] overflow-hidden rounded-xl">
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
      className="image-slot image-slot--empty flex aspect-[4/3] items-center justify-center rounded-xl"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        Image · to come
      </span>
    </div>
  );
}

function TimelineNode({ milestone, index, isVisible }) {
  const side = index % 2 === 0 ? "right" : "left";

  return (
    <article
      className={`timeline-node timeline-node--${side} ${isVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <span className="timeline-node-dot" aria-hidden="true" />

      <div className="timeline-node-content flex flex-col gap-5">
        <header>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper">
            {milestone.year}
          </span>
          <h3 className="mt-2 font-display text-3xl uppercase leading-[0.95] tracking-[0.02em] text-paper sm:text-4xl">
            {milestone.title}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {milestone.org}
          </p>
        </header>

        <p className="max-w-2xl text-sm leading-6 text-ash sm:text-[15px] sm:leading-7">
          {milestone.caption}
        </p>

        <div className="grid grid-cols-2 gap-3">
          {milestone.images.map((image, slot) => (
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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
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

    const nodes = track.querySelectorAll("[data-node-id]");
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const fillPercent = Math.min(
    100,
    (visibleIds.size / timeline.length) * 100,
  );

  return (
    <main className="bg-stone text-paper">
      <section className="mx-auto max-w-7xl px-5 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <SectionLabel>04 — About</SectionLabel>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl uppercase leading-[0.9] tracking-[0.01em] text-paper sm:text-6xl lg:text-7xl">
              A path through
              <br />
              rigs and benches.
            </h1>
            <p className="mt-6 max-w-xl font-sans text-[15px] leading-7 text-ash">
              From offshore drilling to the coffee bench. Newest first; scroll
              down to walk back through the work.
            </p>
          </div>

          <div className="about-stat flex shrink-0 items-baseline gap-3 self-start rounded-2xl border border-border bg-stone-soft px-6 py-5 lg:self-end">
            <span className="font-display text-5xl leading-none text-paper">
              {aboutHeadline.stat}
            </span>
            <span className="max-w-[9rem] font-mono text-[11px] uppercase leading-tight tracking-[0.18em] text-copper">
              {aboutHeadline.label}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 pb-24 sm:mt-20 sm:px-6 lg:mt-24 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            Newest <span className="text-copper">↓</span> oldest
          </p>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:inline">
            {visibleIds.size} / {timeline.length} seen
          </span>
        </div>

        <div className="timeline-track" ref={trackRef}>
          <div className="timeline-spine" aria-hidden="true">
            <div
              className="timeline-spine-fill"
              style={{ height: `${fillPercent}%` }}
            />
          </div>

          <ol className="relative flex flex-col gap-16 sm:gap-20 md:gap-24">
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
      </section>
    </main>
  );
}
