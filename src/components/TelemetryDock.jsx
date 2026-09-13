// Automotive spec bar. Rigid grid, hairline dividers, tabular numerals.
// Replaces the old rounded stat bubbles — no radius, no shadow, no gradient.
const DEFAULT_METRICS = [
  {
    label: "Brew pressure",
    value: "9.0",
    unit: "bar",
    note: "Calibration standard",
  },
  {
    label: "Turnaround",
    value: "24–48",
    unit: "hr",
    note: "Bench + on-site",
  },
  {
    label: "Café accounts",
    value: "40",
    unit: "+",
    note: "Active service contracts",
  },
  {
    label: "Coverage",
    value: "GTA",
    unit: "",
    note: "Toronto + surrounding region",
  },
];

export default function TelemetryDock({
  metrics = DEFAULT_METRICS,
  className = "",
}) {
  return (
    <section
      aria-label="Service telemetry"
      className={`relative border-y border-rule bg-shell ${className}`}
    >
      {/* Ruler ticks read as an instrument bezel along the top edge. */}
      <div aria-hidden className="mech-ticks h-[6px] w-full opacity-40" />

      <div className="mx-auto max-w-[110rem] px-6 xl:px-10">
        {/* Explicit per-cell borders, not `divide-*`: on a multi-row grid the
            divide utilities key off DOM order and leave stray edges. */}
        <div className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              className="group relative border-b border-r border-line px-5 py-6 lg:px-7 lg:py-7"
              key={metric.label}
            >
              <span
                aria-hidden
                className="mech-data absolute right-4 top-4 text-[9px] font-medium text-muted"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-graphite">
                {metric.label}
              </p>

              <p className="mech-data mt-3 flex items-baseline gap-1.5 font-display text-[2.75rem] uppercase leading-[0.8] tracking-[0.01em] text-ink lg:text-[3.25rem]">
                {metric.value}
                {metric.unit && (
                  <span className="font-mono text-[13px] font-bold lowercase tracking-[0.08em] text-bronze">
                    {metric.unit}
                  </span>
                )}
              </p>

              <p className="mt-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                {metric.note}
              </p>

              {/* 3px amber index bar on hover — mechanical, not a lift/glow. */}
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-bronze transition-[width] duration-200 ease-out group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
